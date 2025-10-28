# Inventory Management System - UI/UX Design

**Version:** 1.0
**Date:** 2025-01-27
**Designer:** Winston (Architect Mode)
**Status:** Design Phase

---

## 1. Overview

This document defines the complete UI/UX design for the merged inventory management interface that consolidates `/inventory/products` and `/inventory/stock-levels` into a unified experience.

### 1.1 Design Goals
- **Unified Interface**: Single page for all inventory operations
- **Context-Aware**: Show relevant data based on selected warehouse context
- **Progressive Disclosure**: Show complexity only when needed
- **Mobile-Friendly**: Responsive design for warehouse staff on tablets
- **Fast Data Entry**: Optimize for bulk serial number entry
- **Visual Hierarchy**: Clear distinction between declared vs actual stock

---

## 2. Page Structure

### 2.1 URL & Route
```
/inventory/overview
```
**Previous routes deprecated:**
- ~~`/inventory/products`~~ → Redirect to `/inventory/overview`
- ~~`/inventory/stock-levels`~~ → Redirect to `/inventory/overview`

### 2.2 Page Layout Hierarchy
```
┌─────────────────────────────────────────────────────────────┐
│ Page Header: "Tổng Quan Kho Hàng"                          │
├─────────────────────────────────────────────────────────────┤
│ [Alert Banner - Low Stock Warnings] (conditional)          │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│ │ Card 1   │  │ Card 2   │  │ Card 3   │  (Stat Cards)    │
│ └──────────┘  └──────────┘  └──────────┘                  │
├─────────────────────────────────────────────────────────────┤
│ Action Bar: [Filters] [Create Receipt] [Create Issue] [...] │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────┐  │
│ │ Tabs: [Tất Cả Kho] [Kho Vật Lý] [Kho Ảo]            │  │
│ ├───────────────────────────────────────────────────────┤  │
│ │ Tab-specific Controls (warehouse selector, etc.)      │  │
│ ├───────────────────────────────────────────────────────┤  │
│ │ Data Table                                            │  │
│ │ [Columns based on active tab]                         │  │
│ │ [Row actions: View, Edit, Update Stock, ...]         │  │
│ └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ Pagination Controls                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Component Designs

### 3.1 Stat Cards (Top Section)

**Card 1: Tổng Số SKU**
```
┌─────────────────────────────────────┐
│ Tổng Số SKU                         │
│                                     │
│     156                             │
│     ─────                           │
│     loại sản phẩm                   │
│                                     │
│ 📦 +8 từ tháng trước                │
└─────────────────────────────────────┘
```

**Card 2: Tổng Số Sản Phẩm**
```
┌─────────────────────────────────────┐
│ Tổng Số Sản Phẩm                    │
│                                     │
│     2,458 / 2,380                   │
│     ─────   ─────                   │
│     khai báo  thực tế               │
│                                     │
│ ⚠️  78 thiếu số serial               │
└─────────────────────────────────────┘
```

**Card 3: Cảnh Báo Hết Hàng**
```
┌─────────────────────────────────────┐
│ Cảnh Báo Tồn Kho                    │
│                                     │
│     12      23                      │
│     ──      ──                      │
│     Hết     Sắp hết                 │
│                                     │
│ 🔴 Cần xử lý gấp                    │
└─────────────────────────────────────┘
```

**Design Notes:**
- Cards use gradient backgrounds (subtle)
- Numbers use large, bold fonts (3xl)
- Secondary info in muted text
- Icons for visual interest
- Click cards to filter table (e.g., click "Hết hàng" → filter to out-of-stock items)

---

### 3.2 Alert Banner (Conditional)

Shown only when critical/warning stock levels detected:

```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️  Cảnh Báo Tồn Kho Thấp                                   │
│                                                             │
│ 12 sản phẩm hết hàng • 23 sản phẩm sắp hết                 │
│                                          [Xem Chi Tiết →]  │
└─────────────────────────────────────────────────────────────┘
```

**Variants:**
- **Critical** (red/destructive): Any products with 0 stock
- **Warning** (yellow): Products below threshold but not 0

---

### 3.3 Action Bar

```
┌─────────────────────────────────────────────────────────────┐
│ [🔍 Tìm kiếm...]  [Lọc: Kho ▼]  [Tình trạng ▼]            │
│                                                             │
│                              [📦 Phiếu Nhập]  [📤 Phiếu Xuất]  [🔄 Chuyển Kho]  [⚙️ Cột] │
└─────────────────────────────────────────────────────────────┘
```

**Components:**
1. **Search Input**: Full-text search (product name, SKU, serial)
2. **Filter Dropdowns**:
   - Warehouse filter
   - Condition filter
   - Status filter (in stock, low stock, out of stock)
3. **Action Buttons**:
   - `Phiếu Nhập` (Stock Receipt) - Opens receipt creation drawer
   - `Phiếu Xuất` (Stock Issue) - Opens issue creation drawer
   - `Chuyển Kho` (Transfer) - Opens transfer creation drawer
   - `Cột` (Column Visibility) - Toggle table columns

**RBAC:**
- Admin/Manager: See all action buttons
- Technician/Reception: Only see search/filter (read-only)

---

### 3.4 Tab Navigation

```
┌─────────────────────────────────────────────────────────────┐
│ [Tất Cả Kho]  [Kho Vật Lý]  [Kho Ảo]                       │
└─────────────────────────────────────────────────────────────┘
```

**Tab Behavior:**
- Active tab highlighted with underline + bold
- URL updates on tab change: `?tab=all`, `?tab=physical`, `?tab=virtual`
- Table columns change based on active tab
- Filters persist across tab switches

---

### 3.5 Tab 1: "Tất Cả Kho" (All Warehouses)

**Purpose:** Aggregate view of all stock across all warehouses

**Table Columns:**
| Sản Phẩm | SKU | Tổng Khai Báo | Tổng Thực Tế | Thiếu Serial | Trạng Thái | Hành Động |
|----------|-----|---------------|--------------|--------------|------------|-----------|
| RTX 5090 FE | GPU-5090 | 50 | 48 | 2 | ✅ Đủ hàng | [•••] |
| RTX 4090 | GPU-4090 | 20 | 20 | 0 | ⚠️ Sắp hết | [•••] |
| RTX 4080 | GPU-4080 | 0 | 0 | 0 | 🔴 Hết hàng | [•••] |

**Column Details:**
1. **Sản Phẩm**: Product name + thumbnail (if available)
2. **SKU**: Product SKU code
3. **Tổng Khai Báo**: Sum of `declared_quantity` across all warehouses
4. **Tổng Thực Tế**: Sum of `actual_serial_count` across all warehouses
5. **Thiếu Serial**: Gap = Declared - Actual (highlighted if > 0)
6. **Trạng Thái**: Visual badge (OK/Warning/Critical based on threshold)
7. **Hành Động**: Dropdown menu with:
   - `Xem Chi Tiết` → Expands row to show warehouse breakdown
   - `Tạo Phiếu Nhập` → Opens receipt drawer pre-filled with this product
   - `Xem Lịch Sử` → Opens modal with stock movement history

**Expandable Row (on "Xem Chi Tiết"):**
```
┌─────────────────────────────────────────────────────────────┐
│ RTX 5090 FE - Phân Bổ Theo Kho                              │
├─────────────────────────────────────────────────────────────┤
│ Kho Ảo           Kho Vật Lý    Khai Báo  Thực Tế  Thiếu   │
│ Warranty Stock   Kệ A1         30        29        1        │
│ Warranty Stock   Kệ B2         10        10        0        │
│ Parts            Kệ C3         10        9         1        │
└─────────────────────────────────────────────────────────────┘
```

---

### 3.6 Tab 2: "Kho Vật Lý" (Physical Warehouse View)

**Tab-Specific Controls:**
```
┌─────────────────────────────────────────────────────────────┐
│ Chọn Kho:  [Kệ A1 ▼]                              [⚙️ Cột] │
└─────────────────────────────────────────────────────────────┘
```

**Warehouse Selector:**
- Dropdown showing all physical warehouses
- Shows warehouse name + location
- Updates table to show only stock in selected warehouse

**Table Columns:**
| Sản Phẩm | SKU | Kho Ảo | Khai Báo | Thực Tế | Thiếu Serial | Trạng Thái | Hành Động |
|----------|-----|---------|----------|---------|--------------|------------|-----------|
| RTX 5090 | GPU-5090 | Warranty Stock | 30 | 29 | 1 | ✅ | [•••] |
| RTX 4090 | GPU-4090 | Warranty Stock | 15 | 15 | 0 | ⚠️ | [•••] |

**Row Actions:**
- `Cập Nhật Hàng` → Opens serial entry drawer for this product + warehouse combo
- `Xem Serial` → Shows list of all serials in this location
- `Chuyển Kho` → Initiate transfer from this warehouse

---

### 3.7 Tab 3: "Kho Ảo" (Virtual Warehouse View)

**Tab-Specific Controls:**
```
┌─────────────────────────────────────────────────────────────┐
│ Chọn Kho Ảo:  [Warranty Stock ▼]                  [⚙️ Cột] │
└─────────────────────────────────────────────────────────────┘
```

**Virtual Warehouse Selector:**
- Dropdown showing all virtual warehouse types
- Options: Warranty Stock, RMA Staging, Dead Stock, In Service, Parts

**Table Columns:**
| Sản Phẩm | SKU | Kho Vật Lý | Khai Báo | Thực Tế | Thiếu Serial | Ngưỡng | Trạng Thái | Hành Động |
|----------|-----|------------|----------|---------|--------------|--------|------------|-----------|
| RTX 5090 | GPU-5090 | Kệ A1 | 30 | 29 | 1 | 20 | ✅ | [•••] |
| RTX 5090 | GPU-5090 | Kệ B2 | 10 | 10 | 0 | 20 | ⚠️ | [•••] |

**Additional Column:**
- **Ngưỡng**: Minimum threshold from `product_stock_thresholds` table
- **Trạng Thái**: Compares actual stock vs threshold

---

## 4. Serial Entry Drawer

### 4.1 Trigger Points
- Click "Cập Nhật Hàng" button in action dropdown
- Click header "Cập Nhật Hàng" (creates new stock receipt)
- Click "Bổ Sung Serial" in pending stock receipt

### 4.2 Drawer Layout

```
┌─────────────────────────────────────────────────────────────┐
│ ✕                  Nhập Số Serial                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Sản Phẩm:  RTX 5090 Founders Edition                       │
│ SKU:       GPU-5090                                         │
│ Kho Đích:  Warranty Stock → Kệ A1                          │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ Số Lượng Khai Báo:  30 cái                                 │
│ Đã Nhập Serial:     29 cái  (97%)                          │
│ Còn Thiếu:          1 cái                                  │
│                                                             │
│ [████████████████████████████░░] 97%                       │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ Nhập Danh Sách Serial:                                     │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ SN123456789                                           │ │
│ │ SN123456790                                           │ │
│ │ SN123456791                                           │ │
│ │                                                       │ │
│ │ [Mỗi dòng 1 serial, hoặc dùng dấu phây/khoảng trắng] │ │
│ │ [Hỗ trợ paste từ Excel hoặc scan barcode]            │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│ ☑️ Tự động tính bảo hành từ sản phẩm (36 tháng)           │
│                                                             │
│ Hoặc nhập thủ công:                                        │
│ Ngày Bắt Đầu BH:  [2025-01-27]  Thời Hạn: [36] tháng     │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ Kết Quả Kiểm Tra:                                          │
│ ✅ 3 serial hợp lệ                                         │
│ ❌ 1 serial trùng: SN123456789 (đã có trong hệ thống)     │
│                                                             │
│                                     [Hủy]  [Xác Nhận Nhập] │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Serial Entry Features

**Input Parsing:**
- Accepts multiple formats:
  - One serial per line: `SN123\nSN124\nSN125`
  - Comma-separated: `SN123, SN124, SN125`
  - Space-separated: `SN123 SN124 SN125`
  - Tab-separated (from Excel paste)
  - Mixed delimiters (auto-detect)

**Real-time Validation:**
- Check against existing `physical_products.serial_number`
- Highlight duplicates in red
- Show validation errors inline
- Disable submit if errors exist

**Warranty Options:**
1. **Auto (Recommended)**: Use `products.default_warranty_months`
2. **Manual Override**: Specify custom warranty period
3. **CSV Import with Warranty**: Upload CSV with columns `[serial, warranty_start, warranty_months]`

**Progress Indicator:**
- Show completion percentage: `actual_serial_count / declared_quantity * 100%`
- Visual progress bar
- Highlight when 100% complete

**Barcode Scanner Support:**
- Input field supports hardware barcode scanners
- Auto-advance to next line after scan (if configured)
- Beep/vibrate on successful scan (mobile)

---

## 5. Stock Receipt Form (Phiếu Nhập Kho)

### 5.1 Form Layout

```
┌─────────────────────────────────────────────────────────────┐
│ ✕                  Tạo Phiếu Nhập Kho                       │
├─────────────────────────────────────────────────────────────┤
│ Step 1/3: Thông Tin Chung                                   │
│                                                             │
│ Loại Phiếu:                                                 │
│ ○ Nhập từ nhà cung cấp                                     │
│ ○ Nhập lại từ RMA                                          │
│ ○ Nhập từ rã hàng                                          │
│ ○ Điều chỉnh tồn kho                                       │
│                                                             │
│ Kho Đích:                                                   │
│ Kho Ảo:    [Warranty Stock ▼]                              │
│ Kho Vật Lý: [Kệ A1 ▼]                                      │
│                                                             │
│ Ngày Nhập:  [2025-01-27]                                   │
│                                                             │
│ Nhà Cung Cấp: [Chọn NCC ▼]  (optional)                     │
│ Số Chứng Từ:  [PO-2025-001] (optional)                     │
│                                                             │
│ Ghi Chú:                                                    │
│ ┌───────────────────────────────────────────────────────┐ │
│ │                                                       │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│ Đính Kèm: [📎 Upload Files]                                │
│                                                             │
│                                     [Hủy]  [Tiếp Theo →]   │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Step 2: Add Products

```
┌─────────────────────────────────────────────────────────────┐
│ Step 2/3: Thêm Sản Phẩm                                     │
│                                                             │
│ [🔍 Tìm sản phẩm...]                          [+ Thêm SP]  │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ Sản Phẩm         SKU      Số Lượng   Đơn Giá  Xóa    │ │
│ ├───────────────────────────────────────────────────────┤ │
│ │ RTX 5090 FE     GPU-5090    [20]    [25,000]  [×]    │ │
│ │ RTX 4090        GPU-4090    [10]    [22,000]  [×]    │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│ Tổng Số Lượng:  30 cái                                     │
│ Tổng Giá Trị:   720,000,000 VND                            │
│                                                             │
│                                [← Quay Lại]  [Tiếp Theo →] │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Step 3: Review & Submit

```
┌─────────────────────────────────────────────────────────────┐
│ Step 3/3: Xác Nhận                                          │
│                                                             │
│ Loại Phiếu:      Nhập từ nhà cung cấp                     │
│ Kho Đích:        Warranty Stock → Kệ A1                    │
│ Ngày Nhập:       27/01/2025                                │
│ Nhà Cung Cấp:    NVIDIA Vietnam                            │
│                                                             │
│ Danh Sách Sản Phẩm:                                        │
│ • RTX 5090 FE: 20 cái × 25,000,000 = 500,000,000 VND      │
│ • RTX 4090: 10 cái × 22,000,000 = 220,000,000 VND         │
│                                                             │
│ Tổng Giá Trị: 720,000,000 VND                              │
│                                                             │
│ ☑️ Gửi phê duyệt ngay (Trạng thái: Pending Approval)      │
│ ☐ Lưu nháp (Có thể chỉnh sửa sau)                         │
│                                                             │
│                        [← Quay Lại]  [Tạo Phiếu Nhập]     │
└─────────────────────────────────────────────────────────────┘
```

### 5.4 After Creation - Serial Entry Prompt

After receipt is created/approved, show modal:

```
┌─────────────────────────────────────────────────────────────┐
│            Phiếu Nhập PN-2025-0042 Đã Tạo                   │
│                                                             │
│ ✅ Phiếu nhập đã được tạo và gửi phê duyệt                 │
│                                                             │
│ Bạn có muốn nhập số serial ngay bây giờ không?             │
│                                                             │
│ 💡 Bạn có thể nhập sau trong trang chi tiết phiếu nhập     │
│                                                             │
│                           [Để Sau]  [Nhập Serial Ngay]     │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Stock Issue Form (Phiếu Xuất Kho)

### 6.1 Key Differences from Receipt

**Serial Selection (not entry):**
- User **selects** existing serials from available stock
- Cannot issue if no serials available
- Show dropdown/search for serial selection

**Example Serial Selector:**
```
┌─────────────────────────────────────────────────────────────┐
│ Chọn Serial Xuất Kho - RTX 5090 (20 serial khả dụng)       │
│                                                             │
│ [🔍 Tìm serial...]                                          │
│                                                             │
│ ☐ SN123456789 - Kệ A1 - BH: 30/06/2027                     │
│ ☐ SN123456790 - Kệ A1 - BH: 30/06/2027                     │
│ ☑️ SN123456791 - Kệ A1 - BH: 30/06/2027  [Đã chọn]         │
│ ☐ SN123456792 - Kệ B2 - BH: 15/08/2027                     │
│ ☐ SN123456793 - Kệ B2 - BH: 15/08/2027                     │
│                                                             │
│ Đã chọn: 1 / 5 cần xuất                                    │
│                                                             │
│                                     [Hủy]  [Xác Nhận]      │
└─────────────────────────────────────────────────────────────┘
```

**Smart Serial Suggestions:**
- Default: FIFO (First-In-First-Out) - Oldest serials first
- Option: FEFO (First-Expired-First-Out) - Shortest warranty first
- Option: By location (same physical warehouse)

---

## 7. Stock Transfer Form (Phiếu Chuyển Kho)

### 7.1 Unique Features

**Dual Warehouse Selection:**
```
┌─────────────────────────────────────────────────────────────┐
│                  Tạo Phiếu Chuyển Kho                       │
│                                                             │
│ Từ Kho:                                                     │
│ Kho Ảo:    [Warranty Stock ▼]                              │
│ Kho Vật Lý: [Kệ A1 ▼]                                      │
│                                                             │
│               ↓ ↓ ↓ (arrow visualization)                   │
│                                                             │
│ Đến Kho:                                                    │
│ Kho Ảo:    [Parts ▼]                                       │
│ Kho Vật Lý: [Kệ C3 ▼]                                      │
│                                                             │
│ ⚠️ Lưu ý: Chuyển kho sẽ thay đổi trạng thái sản phẩm      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**In-Transit Status Tracking:**
After approval, show tracking view:
```
┌─────────────────────────────────────────────────────────────┐
│            Phiếu Chuyển Kho PC-2025-0015                    │
│                                                             │
│ ○────────●────────○  Trạng thái: Đang Vận Chuyển          │
│ Approved  In Transit  Completed                             │
│                                                             │
│ Ngày Xuất Phát:    27/01/2025 10:30                        │
│ Dự Kiến Đến:       28/01/2025                              │
│ Người Vận Chuyển:  Nguyễn Văn A                            │
│                                                             │
│                              [Xác Nhận Đã Nhận]            │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Document Detail View

### 8.1 Receipt Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back              Phiếu Nhập PN-2025-0042                 │
├─────────────────────────────────────────────────────────────┤
│ Status: [🟡 Pending Approval]              [Actions ▼]      │
├─────────────────────────────────────────────────────────────┤
│ Thông Tin Phiếu                                             │
│ • Loại: Nhập từ nhà cung cấp                               │
│ • Ngày tạo: 27/01/2025 09:15                               │
│ • Người tạo: Nguyễn Văn B                                  │
│ • Kho đích: Warranty Stock → Kệ A1                         │
│ • Nhà cung cấp: NVIDIA Vietnam                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Danh Sách Sản Phẩm                                          │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ RTX 5090 FE                                           │ │
│ │ Số lượng: 20    Serial đã nhập: 18/20 (90%)          │ │
│ │ [████████████████████░░] 90%                          │ │
│ │                                [Bổ Sung Serial]      │ │
│ ├───────────────────────────────────────────────────────┤ │
│ │ RTX 4090                                              │ │
│ │ Số lượng: 10    Serial đã nhập: 10/10 (100%)         │ │
│ │ [██████████████████████] 100%                         │ │
│ │                                [Xem Serial]          │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ File Đính Kèm                                               │
│ 📎 invoice-nvidia-2025-01.pdf (2.4 MB)                     │
│ 📎 packing-list.xlsx (156 KB)                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Timeline                                                    │
│ ○ 27/01 09:15 - Tạo phiếu (Nguyễn Văn B)                  │
│ ○ 27/01 09:20 - Gửi phê duyệt                             │
│ ● 27/01 10:00 - Đang chờ Manager duyệt                    │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Actions Dropdown (Status-Dependent)

**When status = 'pending_approval' (for Manager):**
```
[Actions ▼]
  ✅ Phê Duyệt
  ❌ Từ Chối
  📝 Chỉnh Sửa
  🗑️ Hủy Phiếu
```

**When status = 'approved':**
```
[Actions ▼]
  ✅ Hoàn Thành Nhập Kho
  📸 Thêm Ảnh
  ❌ Hủy Phiếu
```

**When status = 'completed':**
```
[Actions ▼]
  📄 Xuất PDF
  📧 Gửi Email
  🔗 Copy Link
```

---

## 9. Approval Dashboard (for Managers)

### 9.1 Dedicated Page

```
/inventory/approvals
```

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│              Phê Duyệt Phiếu Kho                            │
├─────────────────────────────────────────────────────────────┤
│ [Pending: 15] [Approved: 42] [Rejected: 3]                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Phiếu Đang Chờ Duyệt                                       │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ PN-2025-0042  Nhập từ NCC    720M VND   [Duyệt] [Từ Chối] │
│ │ Nguyễn Văn B • 2 giờ trước • 30 sản phẩm             │ │
│ ├───────────────────────────────────────────────────────┤ │
│ │ PX-2025-0128  Xuất trả BH    15M VND    [Duyệt] [Từ Chối] │
│ │ Trần Thị C • 5 giờ trước • 1 sản phẩm                │ │
│ └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Quick Approval Modal

```
┌─────────────────────────────────────────────────────────────┐
│            Phê Duyệt Phiếu Nhập PN-2025-0042                │
│                                                             │
│ Tóm Tắt:                                                    │
│ • Loại: Nhập từ nhà cung cấp (NVIDIA)                     │
│ • Giá trị: 720,000,000 VND                                 │
│ • Số lượng: 30 sản phẩm                                    │
│ • Kho đích: Warranty Stock → Kệ A1                         │
│                                                             │
│ [Xem Chi Tiết Đầy Đủ]                                      │
│                                                             │
│ Lý Do Phê Duyệt: (optional)                                │
│ ┌───────────────────────────────────────────────────────┐ │
│ │                                                       │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│                                     [Hủy]  [Xác Nhận Duyệt] │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Mobile Responsive Design

### 10.1 Mobile Table View (Stacked Cards)

On mobile (< 768px), table becomes card list:

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ RTX 5090 FE                     │ │
│ │ GPU-5090                        │ │
│ │                                 │ │
│ │ Khai Báo: 50   Thực Tế: 48     │ │
│ │ Thiếu: 2       [✅ Đủ hàng]    │ │
│ │                                 │ │
│ │              [Chi Tiết] [•••]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ RTX 4090                        │ │
│ │ GPU-4090                        │ │
│ │ ...                             │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 10.2 Mobile Serial Entry

- Full-screen drawer on mobile
- Larger input area
- Camera button for barcode scanning
- Haptic feedback on scan success

---

## 11. Advanced Features

### 11.1 Bulk Operations

**Multi-select Mode:**
```
[☑️ 5 items selected]  [Tạo Phiếu Xuất]  [Chuyển Kho]  [Export]
```

Enable checkboxes in table for bulk actions:
- Create stock issue for multiple products at once
- Bulk transfer to another warehouse
- Export selected items to CSV

### 11.2 Stock Movement History

**Product-level history view:**
```
┌─────────────────────────────────────────────────────────────┐
│          Lịch Sử Luân Chuyển - RTX 5090 (SN123456789)      │
├─────────────────────────────────────────────────────────────┤
│ 27/01 10:30  Nhập Kho      PN-2025-0042                    │
│              → Warranty Stock (Kệ A1)                       │
│                                                             │
│ 28/01 14:15  Chuyển Kho    PC-2025-0015                    │
│              Warranty Stock → Parts (Kệ C3)                 │
│                                                             │
│ 30/01 09:00  Xuất Kho      PX-2025-0128                    │
│              → Trả bảo hành (Ticket SV-2025-1234)          │
└─────────────────────────────────────────────────────────────┘
```

### 11.3 Low Stock Notifications

**In-app notification badge:**
```
┌─────────────────────────────────────┐
│ 🔔 [3]                              │
│                                     │
│ • RTX 4080 - Hết hàng (0 còn lại)  │
│ • RTX 3090 - Sắp hết (5 còn lại)   │
│ • Thermal Paste - Sắp hết          │
└─────────────────────────────────────┘
```

**Email digest (daily for Manager/Admin):**
Subject: "Báo Cáo Tồn Kho Thấp - 27/01/2025"

---

## 12. Color Coding & Visual Language

### 12.1 Status Colors

**Stock Status:**
- 🟢 Green (OK): Stock >= threshold
- 🟡 Yellow (Warning): 0 < stock < threshold
- 🔴 Red (Critical): Stock = 0

**Document Status:**
- 🔵 Blue (Draft): Being edited
- 🟡 Yellow (Pending): Awaiting approval
- 🟢 Green (Approved): Ready to execute
- ✅ Checkmark (Completed): Executed
- ⚫ Gray (Cancelled): Cancelled

### 12.2 Typography Hierarchy

- **Page Title**: 3xl bold
- **Section Headers**: xl semibold
- **Card Titles**: sm uppercase tracking-wide
- **Numbers (stats)**: 4xl bold
- **Table Headers**: xs uppercase
- **Body Text**: sm regular

### 12.3 Spacing & Layout

- **Card Padding**: 6 (24px)
- **Section Gaps**: 6 (24px)
- **Form Field Gaps**: 4 (16px)
- **Table Row Height**: 16 (64px)
- **Mobile Touch Targets**: Minimum 44px

---

## 13. Accessibility (a11y)

### 13.1 Keyboard Navigation

- All drawers/modals: Close with `ESC`
- Tab navigation through all interactive elements
- Table rows: Navigate with arrow keys (optional enhancement)
- Serial entry: `Enter` to submit, `Shift+Enter` for new line

### 13.2 Screen Reader Support

- ARIA labels on all icon buttons
- Status announcements on form submission
- Table headers properly associated
- Form validation errors announced

### 13.3 Color Contrast

- All text meets WCAG AA standards (4.5:1 minimum)
- Status indicators have both color + icon
- Focus indicators visible on all interactive elements

---

## 14. Implementation Checklist

### Phase 1: Core UI (Week 1-2)
- [ ] Create merged inventory overview page
- [ ] Implement 3 stat cards with real-time data
- [ ] Build 3-tab table structure
- [ ] Implement responsive table/card views
- [ ] Add column visibility toggle

### Phase 2: Serial Management (Week 2-3)
- [ ] Serial entry drawer with validation
- [ ] Serial selection drawer (for issues)
- [ ] Serial import from CSV
- [ ] Barcode scanner integration
- [ ] Serial history view

### Phase 3: Stock Documents (Week 3-4)
- [ ] Stock receipt form (3-step wizard)
- [ ] Stock issue form
- [ ] Stock transfer form
- [ ] Document detail pages
- [ ] File attachment upload

### Phase 4: Approval Workflow (Week 4-5)
- [ ] Approval dashboard for managers
- [ ] Quick approval modal
- [ ] Rejection flow with reasons
- [ ] Status timeline visualization
- [ ] Email notifications

### Phase 5: Advanced Features (Week 5-6)
- [ ] Bulk operations
- [ ] Stock movement history
- [ ] Low stock alerts
- [ ] Export to CSV/PDF
- [ ] Mobile optimization

---

**End of UI/UX Design Document**
