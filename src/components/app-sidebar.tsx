"use client";

import {
  IconClipboardList,
  IconComponents,
  IconDashboard,
  IconDevices,
  IconHelp,
  IconInnerShadowTop,
  IconPhone,
  IconPlus,
  IconReport,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import type * as React from "react";

import { trpc } from "@/components/providers/trpc-provider";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Phiếu dịch vụ",
      url: "/tickets",
      icon: IconClipboardList,
    },
    {
      title: "Khách hàng",
      url: "/customers",
      icon: IconUser,
    },
  ],
  navSecondary: [
    {
      title: "Thiết lập",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Hướng dẫn",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Gọi hỗ trợ",
      url: "#",
      icon: IconPhone,
    },
  ],
  documents: [
    {
      name: "Sản phẩm dịch vụ",
      url: "/products",
      icon: IconDevices,
    },
    {
      name: "Kho linh kiện",
      url: "/parts",
      icon: IconComponents,
    },
    {
      name: "Quản lý nhãn hàng (TODOS)",
      url: "/brands",
      icon: IconComponents,
    },
    {
      name: "Quản lý nhân sự",
      url: "/team",
      icon: IconUsers,
    },
    {
      name: "Báo cáo (TODOS)",
      url: "/report",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = trpc.profile.getCurrentUser.useQuery();
  
  // Check if user is admin or manager
  const isAdminOrManager = currentUser?.roles?.some((role: string) => 
    role === 'admin' || role === 'manager'
  ) ?? false;

  // Filter documents based on user role
  const filteredDocuments = data.documents.filter(doc => {
    // Hide "Sản phẩm dịch vụ" and "Kho linh kiện" for non-admin/manager users
    if (!isAdminOrManager && (doc.url === '/products' || doc.url === '/parts')) {
      return false;
    }
    return true;
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  SSTC Service Center
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={filteredDocuments} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
