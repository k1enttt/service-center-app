"use client";

/**
 * Receipt Detail Page
 * Allows viewing and editing stock receipt details
 */

import { use } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/components/providers/trpc-provider";
import { PageHeader } from "@/components/page-header";
import { ReceiptDetailHeader } from "@/components/inventory/documents/receipt-detail-header";
import { ReceiptItemsTable } from "@/components/inventory/documents/receipt-items-table";
import { SerialEntryCard, SerialEntryStatus } from "@/components/inventory/serials";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, CheckCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ReceiptDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ReceiptDetailPage({ params }: ReceiptDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { data: receipt, isLoading, refetch } = trpc.inventory.receipts.getById.useQuery({ id });
  const submitForApproval = trpc.inventory.receipts.submitForApproval.useMutation();
  const deleteReceipt = trpc.inventory.receipts.delete.useMutation();

  const utils = trpc.useUtils();

  const handleSubmitForApproval = async () => {
    try {
      await submitForApproval.mutateAsync({ id });
      toast.success("Đã gửi phiếu nhập để duyệt");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Không thể gửi phiếu nhập");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa phiếu nhập này?")) {
      return;
    }

    try {
      await deleteReceipt.mutateAsync({ id });
      toast.success("Đã xóa phiếu nhập");
      router.push("/inventory/documents");
    } catch (error: any) {
      toast.error(error.message || "Không thể xóa phiếu nhập");
    }
  };

  if (isLoading) {
    return (
      <>
        <PageHeader title="Chi tiết phiếu nhập" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="text-center py-8 text-muted-foreground">
                  Đang tải...
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!receipt) {
    return (
      <>
        <PageHeader title="Chi tiết phiếu nhập" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="text-center py-8 text-muted-foreground">
                  Không tìm thấy phiếu nhập
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Calculate serial entry progress
  const totalDeclaredQuantity = receipt.items?.reduce((sum, item) => sum + item.declared_quantity, 0) || 0;
  const totalSerialCount = receipt.items?.reduce((sum, item) => sum + (item.serials?.length || 0), 0) || 0;
  const allItemsComplete = totalDeclaredQuantity > 0 && totalSerialCount === totalDeclaredQuantity;

  // Allow submission even with partial serials (business requirement change)
  const canSubmitForApproval = receipt.status === "draft";
  const canDelete = receipt.status === "draft";

  // Determine serial entry status
  const getSerialEntryStatus = (): SerialEntryStatus => {
    if (allItemsComplete) return "complete";
    if (totalSerialCount === 0) return "pending";
    // Check if task is overdue (> 7 days) - placeholder logic
    const createdAt = new Date(receipt.created_at);
    const daysSinceCreation = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceCreation > 7 && !allItemsComplete) return "overdue";
    return "in-progress";
  };

  const serialEntryStatus = getSerialEntryStatus();
  const showSerialEntryCard = (receipt.status === "approved" || receipt.status === "completed") && !allItemsComplete;

  return (
    <>
      <PageHeader title="Chi tiết phiếu nhập" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Back Button and Actions */}
            <div className="flex items-center justify-between px-4 lg:px-6">
              <Link href="/inventory/documents">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  Quay lại
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                {canDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleteReceipt.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden lg:inline">Xóa phiếu</span>
                  </Button>
                )}

                {canSubmitForApproval && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSubmitForApproval}
                    disabled={submitForApproval.isPending}
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden lg:inline">Gửi duyệt</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-4 lg:px-6 space-y-4">
              <ReceiptDetailHeader receipt={receipt} />

              {/* Serial Entry Status Card - shown after approval if serials incomplete */}
              {showSerialEntryCard && receipt.created_by && (
                <SerialEntryCard
                  receiptId={receipt.id}
                  status={serialEntryStatus}
                  progress={{
                    current: totalSerialCount,
                    total: totalDeclaredQuantity,
                  }}
                  lastUpdated={receipt.updated_at ? new Date(receipt.updated_at) : undefined}
                  assignedTo={{
                    id: typeof receipt.created_by === 'string' ? receipt.created_by : receipt.created_by?.id || "",
                    full_name: typeof receipt.created_by === 'object' && receipt.created_by?.full_name ? receipt.created_by.full_name : "Unknown User",
                  }}
                  taskAge={Math.floor((Date.now() - new Date(receipt.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                  onContinue={() => {
                    // Scroll to items table where serials can be added
                    document.querySelector('[data-serial-entry]')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  canEdit={receipt.status === "approved" || receipt.status === "completed"}
                />
              )}

              <div data-serial-entry>
                <ReceiptItemsTable receipt={receipt} onSerialsAdded={() => refetch()} />
              </div>

              {!allItemsComplete && receipt.status === "draft" && totalDeclaredQuantity > 0 && (
                <div className="rounded-md border border-blue-300 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700 p-4">
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    💡 <strong>Lưu ý:</strong> Bạn có thể gửi duyệt ngay cả khi chưa nhập đủ serial.
                    Stock sẽ được cập nhật ngay sau khi duyệt, còn serial có thể nhập tiếp sau.
                    Tiến độ: {totalSerialCount}/{totalDeclaredQuantity} serial ({Math.round((totalSerialCount / totalDeclaredQuantity) * 100)}%)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
