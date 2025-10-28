"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequireRole } from "@/components/auth/RequireRole";
import { trpc } from "@/components/providers/trpc-provider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AdminAppSettingsPage() {
  const [isSeeding, setIsSeeding] = React.useState(false);
  const [seedProgress, setSeedProgress] = React.useState<string[]>([]);

  const seedMockDataMutation = trpc.admin.seedMockData.useMutation({
    onSuccess: (data) => {
      toast.success("Tạo dữ liệu test thành công!");
      setSeedProgress([]);
      setIsSeeding(false);
    },
    onError: (error) => {
      toast.error(`Lỗi: ${error.message}`);
      setIsSeeding(false);
    },
  });

  const handleSeedMockData = async () => {
    if (!confirm("Bạn có chắc chắn muốn tạo dữ liệu test? Thao tác này sẽ thêm nhiều dữ liệu vào database.")) {
      return;
    }

    setIsSeeding(true);
    setSeedProgress(["Đang bắt đầu tạo dữ liệu test..."]);

    try {
      await seedMockDataMutation.mutateAsync();
    } catch (error) {
      console.error("Seed error:", error);
    }
  };

  return (
    <RequireRole allowedRoles={["admin"]}>
      <PageHeader title="Cài đặt ứng dụng" backHref="/admin" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>Thiết lập cấu hình cho ứng dụng</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Đây là trang tạm cho phần Cài đặt Ứng dụng. Tôi sẽ thêm các
                  mục cấu hình (ví dụ: tên ứng dụng, chế độ bảo trì, tích hợp 3rd
                  party) khi có yêu cầu.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin hệ thống</CardTitle>
                <CardDescription>Trạng thái và thông tin hữu ích</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium">Phiên bản</div>
                    <div className="text-sm text-muted-foreground">0.0.0-dev</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Môi trường</div>
                    <div className="text-sm text-muted-foreground">local</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dữ liệu Test</CardTitle>
                <CardDescription>
                  Tạo dữ liệu mẫu từ file mock-data.json để test hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 border border-amber-200">
                  <p className="font-medium mb-2">⚠️ Lưu ý quan trọng:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Tạo dữ liệu test theo thứ tự: Staff Users → Physical Warehouses → Virtual Warehouses → Brands → Parts → Products → Physical Products → Task Types → Task Templates</li>
                    <li>Virtual Warehouses giờ là các thực thể riêng biệt với ID duy nhất (không còn nested trong Physical Warehouses)</li>
                    <li>Dữ liệu được đọc từ <code className="bg-amber-100 px-1 rounded">docs/data/mock-data.json</code> (v2.0.0)</li>
                    <li>Chỉ dùng trong môi trường development để test</li>
                  </ul>
                </div>

                {seedProgress.length > 0 && (
                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-2">Tiến trình:</p>
                    <div className="space-y-1 text-xs text-blue-800 max-h-40 overflow-y-auto">
                      {seedProgress.map((msg, idx) => (
                        <div key={idx}>• {msg}</div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSeedMockData}
                  disabled={isSeeding}
                  className="w-full"
                >
                  {isSeeding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang tạo dữ liệu...
                    </>
                  ) : (
                    "Tạo dữ liệu test"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
