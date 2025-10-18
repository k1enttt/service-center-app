# Hướng Dẫn Triển Khai Production

Tài liệu này hướng dẫn triển khai Service Center Management lên production server.

## 🌟 Ưu Điểm

✅ **Docker-based**: Dễ dàng deploy và scale
✅ **Isolated instances**: Mỗi khách hàng có database riêng
✅ **Multi-tenant ready**: Chạy nhiều instances trên 1 server
✅ **Self-contained**: Tất cả services trong Docker
✅ **Easy backup**: Database và files dễ dàng backup

---

## Mục Lục

- [Yêu Cầu](#yêu-cầu)
- [Bước 1: Clone và Cấu Hình](#bước-1-clone-và-cấu-hình)
- [Bước 2: Deploy Docker Stack](#bước-2-deploy-docker-stack)
- [Bước 3: Deploy Database Schema](#bước-3-deploy-database-schema)
- [Bước 4: Initial Setup](#bước-4-initial-setup)
- [Bước 5: Bảo Mật Supabase Studio](#bước-5-bảo-mật-supabase-studio)
- [Multi-Instance Deployment](#multi-instance-deployment)
- [Quản Lý](#quản-lý)
- [Backup & Monitoring](#backup--monitoring)
- [Troubleshooting](#troubleshooting)

---

## Yêu Cầu

### Server Specifications
- **OS**: Ubuntu 22.04 LTS hoặc mới hơn
- **CPU**: 2+ cores (khuyến nghị 4+)
- **RAM**: 4GB minimum (khuyến nghị 8GB+)
- **Disk**: 40GB+ SSD
- **Network**: Internet connection
- **Access**: SSH access với sudo privileges

### Phần Mềm Cần Cài Đặt Trước

**QUAN TRỌNG:** Các phần mềm sau phải được cài đặt trên server trước khi bắt đầu deployment:

#### 1. Docker & Docker Compose
```bash

# Verify installation
docker --version
docker compose version
```

#### 2. Git
```bash
# Verify
git --version
```

#### 3. Node.js 18+ (để generate API keys)
```bash
# Verify
node --version  # Should show v22.x.x
npm --version
```

#### 4. User Setup (Recommended)
```bash
# Tạo deploy user (optional nhưng recommended)
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo usermod -aG docker deploy

# Switch to deploy user
su - deploy
```

### URL Architecture & Access Modes

Hệ thống hỗ trợ **2 deployment modes** với URL architecture khác nhau:

#### 🏠 Local Development Mode
**Dùng khi:** Test local trên máy development, không cần public domain

**URLs:**
- App: `http://localhost:3025`
- Supabase API: `http://localhost:8000` (Kong Gateway)
- Supabase Studio: `http://localhost:3000`

**Không cần:** Cloudflare Tunnel

**Server-side (internal Docker):** `http://kong:8000`

---

#### 🌐 Production Mode
**Dùng khi:** Deploy lên server production với public domain

**YÊU CẦU:** Phải setup Cloudflare Tunnel trước khi deploy

**URLs (Numbered Pattern):**
URL pattern: `subdomain` + `port last digit` + `base domain`

1. **Main Application Domain**
   - Ví dụ: `https://sv.tantran.dev`
   - Tunnel: `sv.tantran.dev` → `localhost:3025`

2. **Supabase API Domain** ⚠️ **BẮT BUỘC**
   - Ví dụ: `https://sv8.tantran.dev` (sv + 8 from port 8000)
   - Tunnel: `sv8.tantran.dev` → `localhost:8000`
   - Browser cần access Kong để sử dụng auth, storage, realtime, REST API

3. **Supabase Studio Domain**
   - Ví dụ: `https://sv3.tantran.dev` (sv + 3 from port 3000)
   - Tunnel: `sv3.tantran.dev` → `localhost:3000`

**Server-side (internal Docker):** `http://kong:8000` (unchanged)

**Port Auto-calculation:**
- `STUDIO_PORT = 3000 + (APP_PORT - 3025) × 100`
- `KONG_PORT = 8000 + (APP_PORT - 3025)`

---

## Bước 1: Clone và Cấu Hình

### 1.1 Clone Repository
```bash
cd ~
git clone https://github.com/tant/service-center-app.git
cd service-center-app
```

### 1.2 Setup Configuration

**1. Edit configuration trong script:**
```bash
nano docker/scripts/setup-instance.sh
```

Chỉnh sửa các giá trị trong phần `CONFIGURATION`:

**⚠️ QUAN TRỌNG: Chọn Deployment Mode**

```bash
# Deployment Mode
# Choose between 'local' for local development or 'production' for public domain
# - local: Uses http://localhost with port numbers (no Cloudflare Tunnel needed)
# - production: Uses https:// with your domain (requires Cloudflare Tunnel setup)
DEPLOYMENT_MODE=production  # Change to 'local' for local testing

# Instance Information
CENTER_NAME="SSTC Service Center"
APP_PORT=3025          # App runs on http://localhost:3025

# Production Domain (only used when DEPLOYMENT_MODE=production)
# IMPORTANT: Enter DOMAIN ONLY - do NOT include http:// or https://
# Examples:
#   ✓ Correct: dichvu.sstc.cloud
#   ✗ Wrong: https://dichvu.sstc.cloud
PRODUCTION_DOMAIN="dichvu.sstc.cloud"

# Setup Password (leave empty to auto-generate)
SETUP_PASSWORD=""

# Admin Account Configuration
# These credentials will be used to create the first admin account via /setup endpoint
ADMIN_EMAIL="admin@sstc.cloud"
ADMIN_PASSWORD="YourSecurePassword123!"
ADMIN_NAME="System Administrator"

# Supabase Studio Authentication (leave password empty to auto-generate)
STUDIO_USERNAME="supabase"
STUDIO_PASSWORD=""  # Auto-generated if empty

# SMTP Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="noreply@sstc.cloud"
SMTP_PASS="your-smtp-password"
SMTP_ADMIN_EMAIL="admin@sstc.cloud"
SMTP_SENDER_NAME="SSTC Service Center"
```

**Lưu ý về Deployment Modes:**

**🏠 Local Mode (`DEPLOYMENT_MODE=local`)**
- ✅ Dùng để test local, không cần Cloudflare Tunnel
- ✅ Access qua `http://localhost` với port numbers
- URLs generated:
  - App: `http://localhost:3025`
  - API: `http://localhost:8000`
  - Studio: `http://localhost:3000`

**🌐 Production Mode (`DEPLOYMENT_MODE=production`)**
- ✅ Dùng cho production với public domain
- ⚠️ **YÊU CẦU** Cloudflare Tunnel đã được setup
- URLs generated:
  - App: `https://dichvu.sstc.cloud`
  - API: `https://api.dichvu.sstc.cloud`
  - Studio: `https://supabase.dichvu.sstc.cloud`

**Auto-calculated Ports:**
- Chỉ cần config `APP_PORT` duy nhất - tất cả ports khác tự động tính!
- Script tự động tạo:
  - `STUDIO_PORT = 3000 + (APP_PORT - 3025) × 100` (3025→3000, 3026→3100, 3027→3200...)
  - `KONG_PORT = 8000 + (APP_PORT - 3025)` (3025→8000, 3026→8001, 3027→8002...)

**2. Chạy script:**
```bash
chmod +x docker/scripts/setup-instance.sh
./docker/scripts/setup-instance.sh
```

Script sẽ tự động:
- ✅ Generate tất cả secrets (hex format, URL-safe)
- ✅ Copy configuration files từ `docs/references/volumes`
- ✅ Tạo .env file với tất cả cấu hình (bao gồm admin credentials)
- ✅ Generate Supabase API keys
- ✅ Tạo INSTANCE_INFO.txt với tất cả thông tin (URLs, secrets, admin credentials)
- ✅ Hiển thị setup password

**Output mẫu (Production Mode):**
```
🚀 Service Center - Instance Setup
=====================================

📋 Configuration Summary:

Deployment Mode:
  Production (requires Cloudflare Tunnel)

Instance:
  Center Name: SSTC Service Center
  App Port: 3025
  Studio Port: 3000 (auto-calculated)
  Kong Port: 8000 (auto-calculated)

URLs:
  Site: https://dichvu.sstc.cloud
  API: https://api.dichvu.sstc.cloud
  Studio: https://supabase.dichvu.sstc.cloud

SMTP:
  Host: smtp.gmail.com:587
  Admin: admin@sstc.cloud

⚠️  Cloudflare Tunnel Required:
  Configure these tunnels pointing to localhost:
    dichvu.sstc.cloud → localhost:3025
    api.dichvu.sstc.cloud → localhost:8000
    supabase.dichvu.sstc.cloud → localhost:3000

🔑 Step 1.2: Generating secrets...
  ✓ Generated SETUP_PASSWORD
  ✓ Generated POSTGRES_PASSWORD
  ✓ Generated JWT_SECRET
  ...

📦 Step 1.4: Setting up volume directories...
  ✓ Copied configuration files
  ✓ vector.yml OK
```

**Output mẫu (Local Mode):**
```
🚀 Service Center - Instance Setup
=====================================

📋 Configuration Summary:

Deployment Mode:
  Local Development (no Cloudflare Tunnel needed)

Instance:
  Center Name: SSTC Service Center
  App Port: 3025
  Studio Port: 3000 (auto-calculated)
  Kong Port: 8000 (auto-calculated)

URLs:
  Site: http://localhost:3025
  API: http://localhost:8000
  Studio: http://localhost:3000

SMTP:
  Host: supabase-mail:2500
  Admin: admin@example.com
  ✓ kong.yml OK

⚙️  Step 1.5: Creating .env file...
  ✓ .env file created

🔧 Step 1.6: Installing dependencies & generating API keys...
  ✓ API keys generated

📝 Step 1.7: Generating instance info file...
  ✓ Instance info saved to INSTANCE_INFO.txt

✅ Setup completed successfully!

📋 Summary:

Instance Configuration:
  Center Name: SSTC Service Center
  App Port: 3025
  Studio Port: 3000 (auto-calculated)
  Kong Port: 8000 (auto-calculated)
  Site URL: https://dichvu.sstc.cloud

Setup Password: a1b2c3d4e5f6...

⚠️  IMPORTANT:
  • All credentials saved to INSTANCE_INFO.txt
  • Keep this file secure - do NOT commit to git!
  • Review with: cat INSTANCE_INFO.txt
```

**INSTANCE_INFO.txt** chứa:
- ✅ Tất cả URLs và domains
- ✅ Tất cả secrets và passwords
- ✅ Supabase API keys
- ✅ Database credentials
- ✅ SMTP configuration
- ✅ Cloudflare Tunnel config (nếu production)
- ✅ Access information

---

### 1.3 Review Configuration (Optional)

Nếu cần, bạn có thể review lại .env file đã được tạo:

```bash
nano .env
```

File .env đã chứa:
- ✅ Tất cả secrets (hex format, URL-safe)
- ✅ APP_PORT và STUDIO_PORT
- ✅ SITE_URL và API_EXTERNAL_URL
- ✅ SMTP configuration
- ✅ Supabase API keys (ANON và SERVICE_ROLE)

---

## Bước 2: Deploy Docker Stack

### 2.1 Deploy với Script (Automated)

**Cách dễ nhất** - Chạy 1 script tự động cho toàn bộ quá trình:

```bash
chmod +x docker/scripts/deploy.sh
./docker/scripts/deploy.sh

# Chọn option 1: Complete fresh deployment
```

Script này sẽ tự động:
- ✅ **Step 1/4**: Run setup-instance.sh để tạo .env và INSTANCE_INFO.txt
- ✅ **Step 2/4**: Build Docker images
- ✅ **Step 3/4**: Start all services và đợi database ready
- ✅ **Step 4/4**: Apply database schema automatically
- ✅ Display access information và next steps

**Output mẫu:**
```
🚀 Service Center Management - Docker Deployment
==================================================

Select deployment action:
  1) 🆕 Complete fresh deployment (setup + build + deploy + schema)
  2) 🏗️  Build and deploy only (requires existing .env)
  3) 🔄 Update application only (rebuild app container)
  4) ♻️  Restart all services
  5) 📋 View logs
  6) 🛑 Stop all services
  7) 🧹 Clean up (remove containers and volumes)

Enter choice [1-7]: 1

==========================================
🆕 COMPLETE FRESH DEPLOYMENT
==========================================

📝 Step 1/4: Running instance setup...
[setup-instance.sh output...]
✅ Step 1/4: Instance setup complete!

🏗️  Step 2/4: Building Docker images...
[docker build output...]
✅ Step 2/4: Build complete!

🚀 Step 3/4: Starting all services...
⏳ Waiting for database to be ready...
✅ Database is ready!
✅ Step 3/4: All services started!

📊 Step 4/4: Applying database schema...
[apply-schema.sh output...]
✅ Step 4/4: Schema applied successfully!

==========================================
🎉 DEPLOYMENT COMPLETE!
==========================================

📋 Access Information:

  🌐 Application:
     https://dichvu.sstc.cloud

  🔧 Supabase API:
     https://api.dichvu.sstc.cloud

  📊 Supabase Studio (with authentication):
     https://supabase.dichvu.sstc.cloud

==========================================
📝 Next Steps:
==========================================

1️⃣  Access the setup page:
   https://dichvu.sstc.cloud/setup
   Password: [from INSTANCE_INFO.txt]

2️⃣  This will create your admin account with:
   Email: admin@sstc.cloud
   Password: [from INSTANCE_INFO.txt]

3️⃣  Login to the application:
   https://dichvu.sstc.cloud/login

📄 For more details, see: INSTANCE_INFO.txt

🔍 Check status: docker compose ps
📋 View logs:    docker compose logs -f
```

**Các options khác:**
- **Option 2**: Build and deploy only (khi đã có .env)
- **Option 3**: Update application only (rebuild app container)
- **Option 4**: Restart all services
- **Option 5**: View logs
- **Option 6**: Stop all services
- **Option 7**: Clean up (xóa containers, volumes, .env, INSTANCE_INFO.txt)

### 2.2 Verify Services
```bash
# All containers should be running and healthy
docker compose ps

# Test locally
curl http://localhost:3025/api/health   # ✅ App health check
curl http://localhost:3000              # ✅ Supabase Studio (nếu đã expose port)
```

**Expected Ports:**

| Service | Internal Port | Host Port | Status |
|---------|--------------|-----------|---------|
| App | 3025 | ✅ 3025 | Exposed to host |
| Supabase Studio | 3000 | ✅ 3000 | Exposed to host |
| Kong (Supabase API) | 8000 | ✅ 8000 | Exposed to host (required for browser) |
| PostgreSQL | 5432 | ❌ Internal | App connects internally |

**Cloudflare Tunnel Setup:**
- `dichvu.sstc.cloud` → `localhost:3025` (Main App)
- `api.dichvu.sstc.cloud` → `localhost:8000` (Supabase API - Kong)
- `supabase.dichvu.sstc.cloud` → `localhost:3000` (Supabase Studio)

**Common Issues:**

1. **realtime-dev hiển thị "unhealthy"**
   - Có thể mất 1-2 phút để healthy
   - Check logs: `docker logs realtime-dev.supabase-realtime --tail 20`
   - Miễn là app responding, không critical

**Lưu ý về Supavisor Pooler:**
- Supavisor pooler đã được **disabled** trong docker-compose.yml
- Lý do: Encryption key compatibility issues với Supabase version hiện tại
- App kết nối trực tiếp đến PostgreSQL qua `postgresql://db:5432`
- Connection pooling không cần thiết cho deployment này

---

## Bước 3: Deploy Database Schema

**⚠️ IMPORTANT**: Database schema đã được apply tự động bởi `deploy.sh` option 1!

Nếu bạn đã chạy `./docker/scripts/deploy.sh` với option 1 (Complete fresh deployment), schema đã được apply và bạn có thể **skip bước này**.

### Manual Schema Deployment (Optional)

Nếu cần apply schema manually hoặc update schema:

```bash
# Make script executable (chỉ cần 1 lần)
chmod +x docker/scripts/apply-schema.sh

# Run schema deployment script
./docker/scripts/apply-schema.sh
```

Script này sẽ:
- ✅ Kiểm tra database đang chạy
- ✅ Apply tất cả schema files theo đúng thứ tự
- ✅ Tạo storage buckets
- ✅ Verify deployment thành công

**Output mẫu:**
```
🚀 Service Center - Schema Deployment
======================================

📊 Database Status:
NAME             IMAGE                           STATUS
supabase-db      supabase/postgres:15.1.1.54    Up (healthy)

⚠️  This will apply schema files to the production database
   Make sure you have a backup before proceeding!

Continue? [y/N]: y

📦 Applying schema files...

→ Applying 00_base_types.sql...
  ✓ 00_base_types.sql applied successfully
→ Applying 00_base_functions.sql...
  ✓ 00_base_functions.sql applied successfully
...

🪣 Creating storage buckets...
  ✓ Storage buckets created

🔍 Verifying deployment...

Tables created:
  profiles, customers, products, parts, service_tickets...

Storage policies:
  Found 6 storage policies

🎉 Schema deployment completed!
```

### Manual Verification (Optional)

Nếu muốn kiểm tra manual:

```bash
# Check tables
docker compose exec db psql -U postgres -c "\dt"

# Check RLS policies
docker compose exec db psql -U postgres -c "SELECT tablename, policyname FROM pg_policies;"

# Connect to database
docker compose exec db psql -U postgres
```

---

## Bước 4: Initial Setup

### 4.1 Access Setup Page
Mở browser và truy cập domain đã config:
```
https://dichvu.sstc.cloud/setup
```

### 4.2 Create Admin User
1. Nhập `SETUP_PASSWORD` (từ INSTANCE_INFO.txt hoặc .env)
2. Click "Complete Setup"
3. Hệ thống sẽ tự động tạo admin account với credentials đã config trong `setup-instance.sh`:
   - Email: `ADMIN_EMAIL` (vd: admin@sstc.cloud)
   - Password: `ADMIN_PASSWORD` (vd: YourSecurePassword123!)
   - Name: `ADMIN_NAME` (vd: System Administrator)

**Lưu ý:** Admin credentials được lấy từ file `.env` (đã được tạo bởi setup script)

### 4.3 Login
Truy cập trang login:
```
https://dichvu.sstc.cloud/login
```

Đăng nhập với admin credentials:
- Email: `admin@sstc.cloud` (hoặc email bạn đã config)
- Password: Mật khẩu bạn đã config trong `ADMIN_PASSWORD`

Test đầy đủ các chức năng:
- ✅ Create service ticket
- ✅ Upload images
- ✅ Add customer
- ✅ Add parts
- ✅ Check dashboard

---

## Bước 5: Bảo Mật Supabase Studio

### Studio Authentication

Supabase Studio được bảo vệ bằng **HTTP Basic Authentication** khi truy cập qua Kong Gateway.

**Credentials:**
- Username: `DASHBOARD_USERNAME` (mặc định: `supabase`)
- Password: `DASHBOARD_PASSWORD` (tự động generate bởi setup script)
- Xem credentials trong file `INSTANCE_INFO.txt`

**URLs:**
- ✅ **Production (có authentication):** `https://sv3.tantran.dev` (qua Kong Gateway)
- ⚠️ **Direct access (không có authentication):** `http://localhost:3000` (chỉ dùng local)

### Khuyến Nghị Bảo Mật Production

1. **Chỉ truy cập Studio qua Kong Gateway URL**
   - ✅ Có authentication (HTTP Basic Auth)
   - ✅ Được bảo vệ bởi Cloudflare
   - ✅ Có SSL/TLS

2. **Firewall direct port access (STUDIO_PORT)**
   ```bash
   # Chỉ cho phép localhost access STUDIO_PORT
   sudo ufw deny 3000
   sudo ufw allow from 127.0.0.1 to any port 3000
   ```

3. **Thêm Cloudflare Access (Optional nhưng khuyến nghị)**
   - Thêm layer authentication thứ 2
   - Control ai được phép truy cập Studio
   - Logs và monitoring

4. **Rotate password định kỳ**
   ```bash
   # Generate password mới
   NEW_PASSWORD=$(openssl rand -hex 16)

   # Update .env
   sed -i "s/^DASHBOARD_PASSWORD=.*/DASHBOARD_PASSWORD=${NEW_PASSWORD}/" .env

   # Restart Kong để apply
   docker compose restart kong
   ```

5. **Monitor Studio access**
   ```bash
   # Xem Kong logs để monitor Studio access
   docker compose logs -f kong | grep dashboard
   ```

---

## Quản Lý

### Docker Services

**View Status:**
```bash
docker compose ps
docker compose logs -f
```

**Restart:**
```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart app
```

**Update Application:**
```bash
git pull
docker compose build app
docker compose up -d app
```

**Stop/Start:**
```bash
# Stop all
docker compose stop

# Start all
docker compose up -d
```


---

## Backup & Monitoring

### Automated Backup
```bash
# Run backup script
./docker/scripts/backup.sh

# Setup cron for daily backup
crontab -e

# Add line:
0 2 * * * cd /home/deploy/service-center-app && ./docker/scripts/backup.sh >> logs/backup.log 2>&1
```

### Manual Backup

**Database:**
```bash
docker compose exec -T db pg_dump -U postgres postgres | gzip > backup_$(date +%Y%m%d).sql.gz
```

**Uploads:**
```bash
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz ./uploads
```

**Config:**
```bash
cp .env .env.backup
```

### Monitoring

**Docker Stats:**
```bash
docker stats
```

**Disk Usage:**
```bash
df -h
docker system df
```

**Application Logs:**
```bash
docker compose logs -f app
docker compose logs --tail=100 app
```

---

## Troubleshooting

### Application Errors

**Check logs:**
```bash
docker compose logs app
docker compose logs db
docker compose logs kong
```

**Database connection issues:**
```bash
# Verify database is running
docker compose ps db

# Test connection
docker compose exec db psql -U postgres -c "SELECT version();"
```

**Kong/Supabase API errors:**
```bash
# Check Kong logs
docker compose logs kong

# Verify Kong config
docker compose exec kong cat /var/lib/kong/kong.yml

# Restart Kong
docker compose restart kong
```

### Cannot Access Studio

**Check if Studio is running:**
```bash
docker compose ps studio
docker compose logs studio
```

**Verify port exposure:**
```bash
# Check if port 3000 is exposed
docker compose ps studio

# Test locally
curl http://localhost:3000

# If not accessible, verify docker-compose.yml has:
# studio:
#   ports:
#     - "3000:3000"
```

**Verify Cloudflare Tunnel configuration:**
- Check your Cloudflare Tunnel config đã setup đúng chưa
- Example: `supabase.dichvu.sstc.cloud` → `http://localhost:3000`
- Verify tunnel is running: `cloudflared tunnel info`

### Vector Container Không Start

**Symptom:**
```bash
docker compose ps
# Shows: supabase-vector is unhealthy hoặc restarting
```

**Check logs:**
```bash
docker logs supabase-vector --tail 20
# Error: Configuration error. error=Is a directory (os error 21)
```

**Nguyên nhân:** Thiếu hoặc sai file `volumes/logs/vector.yml`

**Giải pháp:**
```bash
# Stop containers
docker compose down

# Verify vector.yml tồn tại và là FILE, không phải directory
ls -lh volumes/logs/vector.yml

# Nếu là directory hoặc không tồn tại:
rm -rf volumes/logs/vector.yml  # Remove nếu là directory
mkdir -p volumes/logs

# Copy từ docs/references trong repository
cp docs/references/volumes/logs/vector.yml volumes/logs/

# Verify là file
test -f volumes/logs/vector.yml && echo "OK" || echo "FAILED"

# Start containers
docker compose up -d

# Check vector status
docker compose ps vector
docker logs supabase-vector --tail 10
```

### Pooler Container Issues

**Lưu ý:** Supavisor pooler đã được **disabled** trong phiên bản hiện tại.

**Root Cause:**
- Supavisor 2.7.0 có encryption key compatibility issue
- Error: `Unknown cipher or invalid key size` khi sử dụng VAULT_ENC_KEY
- Pooler expects binary decoded key nhưng nhận base64 string

**Impact:**
- **KHÔNG ảnh hưởng** đến application functionality
- App kết nối trực tiếp đến PostgreSQL: `postgresql://db:5432`
- Connection pooling không cần thiết cho deployment scale hiện tại

**Nếu muốn enable lại:**
```bash
# Uncomment supavisor service trong docker-compose.yml
# Sau đó restart:
docker compose up -d
```

### SSL/Certificate Errors

**Nếu sử dụng Cloudflare Tunnel**, kiểm tra SSL configuration:

1. **Verify Cloudflare Tunnel đang chạy**:
   ```bash
   ps aux | grep cloudflared
   cloudflared tunnel list
   ```
2. **Check tunnel config** trong `~/.cloudflared/config.yml`
3. **Verify DNS settings** trong Cloudflare dashboard
4. **Check browser console for errors**

### Out of Memory/Disk

**Check resources:**
```bash
free -h
df -h
```

**Clean up Docker:**
```bash
docker system prune -a
docker volume prune
```

**Restart services:**
```bash
docker compose restart
```

---

## FAQ

**Q: Cần expose ports nào?**
A: Cần expose 3 ports: APP_PORT (3025, 3026...), KONG_PORT (8000, 8001...), và STUDIO_PORT (3000, 3100...). Kong port required để browser access Supabase.

**Q: Có thể chạy nhiều instances không?**
A: Có! Mỗi instance chỉ cần thay đổi APP_PORT, KONG_PORT, và STUDIO_PORT. Sử dụng setup script để tự động configure.

**Q: Database có share giữa các instances không?**
A: Không! Mỗi instance có database riêng, hoàn toàn isolated với Docker network riêng.

**Q: Cần setup Cloudflare Tunnel như thế nào?**
A: Mỗi instance cần 2 domains trong Cloudflare Tunnel config - một cho app, một cho studio. Xem section "Multi-Instance Deployment" để biết config example.

**Q: Secrets có cần URL-safe không?**
A: Có! Setup script tự động generate tất cả secrets ở hex format (only 0-9a-f), hoàn toàn URL-safe.

**Q: Downtime khi update?**
A: Minimal. Build image mới, sau đó restart container với `docker compose up -d`.

**Q: Có thể restrict access không?**
A: Có! Dùng Cloudflare Access hoặc firewall rules để restrict access theo IP/email.

---

## Commands Reference

```bash
# ⭐ Main Deployment Script (Recommended)
./docker/scripts/deploy.sh                 # Interactive deployment menu
# Options:
#   1) Complete fresh deployment (setup + build + deploy + schema)
#   2) Build and deploy only (requires existing .env)
#   3) Update application only (rebuild app container)
#   4) Restart all services
#   5) View logs
#   6) Stop all services
#   7) Clean up (remove containers and volumes)

# Individual Scripts (Advanced)
./docker/scripts/setup-instance.sh         # Setup new instance (automated)
./docker/scripts/apply-schema.sh           # Apply database schema (manual)
./docker/scripts/backup.sh                 # Backup script

# Docker Management
docker compose ps                          # Status
docker compose logs -f app                 # Logs
docker compose restart app                 # Restart

# Troubleshooting specific services
docker logs supabase-vector --tail 50      # Vector logs
docker logs service-center-app --tail 100  # App logs
docker logs supabase-auth --tail 50        # Auth logs

# Database
docker compose exec db psql -U postgres    # Connect to DB
docker compose exec -T db pg_dump -U postgres postgres > backup.sql  # Backup
cat backup.sql | docker compose exec -T db psql -U postgres  # Restore

# Update application
git pull && ./docker/scripts/deploy.sh     # Use deploy.sh option 3
# Or manually:
git pull && docker compose build app && docker compose up -d app

# Clean restart (nếu có issues)
./docker/scripts/deploy.sh                 # Use option 7 then option 1
# Or manually:
docker compose down
docker compose up -d
docker compose ps  # Verify all healthy
```

---

## Multi-Instance Deployment

### Overview

Bạn có thể chạy nhiều Service Center instances trên cùng 1 server để phục vụ nhiều khách hàng. Mỗi instance chỉ cần thay đổi **3 ports**: `APP_PORT`, `STUDIO_PORT`, và `KONG_PORT`.

**Tất cả các services khác (database, API, auth, storage, etc.) đều internal và không xung đột!**

### Ports Configuration

**Cần configure 3 ports cho mỗi instance:**
- ✅ `APP_PORT` - Port của Next.js application (3025, 3026, 3027, ...)
- ✅ `STUDIO_PORT` - Port của Supabase Studio (3000, 3100, 3200, ...)
- ✅ `KONG_PORT` - Port của Kong API Gateway (8000, 8001, 8002, ...)
  - **Required** - Browser cần access Kong để sử dụng Supabase auth, realtime, storage

**Các services internal (KHÔNG cần configure):**
- ✅ PostgreSQL - Kết nối qua `postgresql://db:5432` (internal)
- ✅ Analytics, Realtime, Auth - Tất cả đều internal, access qua Kong

### Cách Deploy Multiple Instances

#### Instance 1 - Customer A

```bash
# 1. Clone repository
cd /home/deploy
git clone https://github.com/your-org/service-center.git customer-a
cd customer-a

# 2. Configure instance
nano docker/scripts/setup-instance.sh

# Edit configuration:
CENTER_NAME="Customer A Service Center"
APP_PORT=3025
DEPLOYMENT_MODE=production
PRODUCTION_DOMAIN="customer-a.yourdomain.com"

# Admin credentials for first admin account
ADMIN_EMAIL="admin@customer-a.com"
ADMIN_PASSWORD="SecurePassword123!"
ADMIN_NAME="Customer A Admin"

# SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-smtp-password"
SMTP_ADMIN_EMAIL="admin@yourdomain.com"
SMTP_SENDER_NAME="Customer A Service Center"

# URLs auto-derived (numbered pattern):
# - App: https://customer-a.yourdomain.com
# - API: https://customer-a8.yourdomain.com  (subdomain + 8 from port 8000)
# - Studio: https://customer-a3.yourdomain.com  (subdomain + 3 from port 3000)

# 3. Deploy with automated script (ONE COMMAND!)
chmod +x docker/scripts/deploy.sh
docker compose -p customer-a exec bash -c './docker/scripts/deploy.sh'
# Or run deploy.sh and select option 1

# This will automatically:
# - Run setup-instance.sh (generate secrets, create .env, INSTANCE_INFO.txt)
# - Build Docker images
# - Start all services with project name
# - Wait for database to be ready
# - Apply database schema
# - Display access information and next steps

# Alternatively (manual steps):
./docker/scripts/setup-instance.sh         # Step 1: Setup
docker compose -p customer-a build          # Step 2: Build
docker compose -p customer-a up -d          # Step 3: Start
./docker/scripts/apply-schema.sh            # Step 4: Schema

# 4. Setup application
# Visit: https://customer-a.yourdomain.com/setup
# Enter setup password (from INSTANCE_INFO.txt)
# This will create admin account with credentials from step 2

# 5. Login
# Visit: https://customer-a.yourdomain.com/login
# Email: admin@customer-a.com
# Password: SecurePassword123!
```

#### Instance 2 - Customer B

```bash
# Tương tự, nhưng dùng ports và domains khác
cd /home/deploy
git clone https://github.com/your-org/service-center.git customer-b
cd customer-b

# Configure với ports và admin credentials khác
nano docker/scripts/setup-instance.sh
# Set: CENTER_NAME="Customer B Service Center"
# Set: APP_PORT=3026 (auto-derives STUDIO_PORT=3100, KONG_PORT=8001)
# Set: DEPLOYMENT_MODE=production
# Set: PRODUCTION_DOMAIN="customer-b.yourdomain.com"
# Set: ADMIN_EMAIL="admin@customer-b.com"
# Set: ADMIN_PASSWORD="AnotherSecurePassword!"
# Set: ADMIN_NAME="Customer B Admin"
# URLs auto-derived (numbered): customer-b8.yourdomain.com, customer-b3.yourdomain.com

# Deploy (automated - ONE COMMAND!)
chmod +x docker/scripts/deploy.sh
./docker/scripts/deploy.sh  # Select option 1

# Or manual:
./docker/scripts/setup-instance.sh
docker compose -p customer-b build
docker compose -p customer-b up -d
./docker/scripts/apply-schema.sh

# Setup and login with admin@customer-b.com
```

#### Instance 3 - Customer C

```bash
cd /home/deploy
git clone https://github.com/your-org/service-center.git customer-c
cd customer-c

# Configure
nano docker/scripts/setup-instance.sh
# Set: CENTER_NAME="Customer C Service Center"
# Set: APP_PORT=3027 (auto-derives STUDIO_PORT=3200, KONG_PORT=8002)
# Set: DEPLOYMENT_MODE=production
# Set: PRODUCTION_DOMAIN="customer-c.yourdomain.com"
# Set: ADMIN_EMAIL="admin@customer-c.com"
# Set: ADMIN_PASSWORD="YetAnotherPassword!"
# Set: ADMIN_NAME="Customer C Admin"
# URLs auto-derived (numbered): customer-c8.yourdomain.com, customer-c3.yourdomain.com

# Deploy (automated - ONE COMMAND!)
chmod +x docker/scripts/deploy.sh
./docker/scripts/deploy.sh  # Select option 1

# Or manual:
./docker/scripts/setup-instance.sh
docker compose -p customer-c build
docker compose -p customer-c up -d
./docker/scripts/apply-schema.sh

# Setup and login with admin@customer-c.com
```

### Cloudflare Tunnel Configuration

Mỗi instance cần **2 domains** (app + studio) được configure trong Cloudflare Tunnel:

**Ví dụ Cloudflare Tunnel config (`config.yml`):**
```yaml
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  # Customer A - Main App
  - hostname: customer-a.yourdomain.com
    service: http://localhost:3025

  # Customer A - Supabase API (Kong)
  - hostname: api-a.yourdomain.com
    service: http://localhost:8000

  # Customer A - Supabase Studio
  - hostname: supabase-a.yourdomain.com
    service: http://localhost:3000

  # Customer B - Main App
  - hostname: customer-b.yourdomain.com
    service: http://localhost:3026

  # Customer B - Supabase API (Kong)
  - hostname: api-b.yourdomain.com
    service: http://localhost:8001

  # Customer B - Supabase Studio
  - hostname: supabase-b.yourdomain.com
    service: http://localhost:3100

  # Customer C - Main App
  - hostname: customer-c.yourdomain.com
    service: http://localhost:3027

  # Customer C - Supabase API (Kong)
  - hostname: api-c.yourdomain.com
    service: http://localhost:8002

  # Customer C - Supabase Studio
  - hostname: supabase-c.yourdomain.com
    service: http://localhost:3200

  # Catch-all
  - service: http_status:404
```

**Lưu ý:**
- Mỗi instance cần unique **APP_PORT**, **STUDIO_PORT**, và **KONG_PORT**
- Mỗi instance cần **3 domains** trong Cloudflare Tunnel:
  - App domain (customer-a.yourdomain.com)
  - API domain (api-a.yourdomain.com) - **Required for browser access**
  - Studio domain (supabase-a.yourdomain.com)
- Setup script tự động generate tất cả secrets ở hex format (URL-safe)
- Tất cả configuration được set trong script, không cần manual editing .env

### Quản Lý Instances

```bash
# Start/Stop/Restart instance
docker compose -p customer-a up -d
docker compose -p customer-a down
docker compose -p customer-a restart

# View status
docker compose -p customer-a ps
docker compose -p customer-b ps

# View logs
docker compose -p customer-a logs -f app

# Access database
docker compose -p customer-a exec db psql -U postgres

# Backup database
docker compose -p customer-a exec db pg_dump -U postgres postgres > backup-customer-a.sql
```

### Network Isolation

Mỗi instance có Docker network riêng:
- `customer-a_default`
- `customer-b_default`
- `customer-c_default`

**Hoàn toàn isolated!** Không có data/service nào share giữa các instances.

### Resource Planning

Mỗi instance sử dụng khoảng:
- **RAM**: 2-3 GB
- **Disk**: 500 MB + data growth
- **CPU**: Moderate

**Khuyến nghị:**
- 8 GB RAM → 1-2 instances
- 16 GB RAM → 4-6 instances
- 32 GB RAM → 10-12 instances
- 64 GB RAM → 20-25 instances

### Port Allocation Pattern

```
Customer A:
  - APP_PORT=3025     → https://customer-a.yourdomain.com
  - KONG_PORT=8000    → https://api-a.yourdomain.com
  - STUDIO_PORT=3000  → https://supabase-a.yourdomain.com

Customer B:
  - APP_PORT=3026     → https://customer-b.yourdomain.com
  - KONG_PORT=8001    → https://api-b.yourdomain.com
  - STUDIO_PORT=3100  → https://supabase-b.yourdomain.com

Customer C:
  - APP_PORT=3027     → https://customer-c.yourdomain.com
  - KONG_PORT=8002    → https://api-c.yourdomain.com
  - STUDIO_PORT=3200  → https://supabase-c.yourdomain.com
...
```

**Lưu ý:**
- Kong port **REQUIRED** - Browser phải access được để dùng Supabase features
- Tất cả ports đã được configure trong docker-compose.yml với environment variables

---

## Support

**Application:**
- Issues: Report issues to your development team
- Logs: `docker compose logs`

---

**Chúc mừng! 🎉**

Bạn đã triển khai thành công Service Center Management lên production!

**Benefits:**
- ✅ Docker-based deployment
- ✅ Multi-instance ready
- ✅ Isolated databases per customer
- ✅ Easy to scale và manage
- ✅ Simple port configuration

Enjoy! 🚀
