import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,

} from "@/components/ui";
import { Building2, DoorOpen,  Hotel, Users } from "lucide-react";
import Link from "next/link";

// Menu items.
const items = [
	{
		title: "Hotels",
		href: "/admin/hotels",
		icon: Hotel,
	},
	{
		title: "Rooms",
		href: "/admin/rooms",
		icon: DoorOpen,
	},
	{
		title: "Users",
		href: "/admin/users",
		icon: Users,
	},
	{
		title: "Bookings",
		href: "/admin/bookings",
		icon: Building2,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.href}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		{/* 	<SidebarFooter className="border-t border-border p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div>
							<p className="text-sm font-medium">Admin User</p>
							<p className="text-xs text-muted-foreground">admin@example.com</p>
						</div>
					</div>
					<Button variant="ghost" size="icon">
						<LogOut className="h-5 w-5" />
					</Button>
				</div>
			</SidebarFooter> */}
		</Sidebar>
	);
}
