// import { coins, Home, users, archive,tickets, wallet, handshake, nfc, chart-spline} from "lucide-react";
import {
  FaCoins,
  FaHome,
  FaUsers,
  FaArchive,
  FaTicketAlt,
  FaWallet,
  FaHandshake,
  FaCreativeCommonsSampling,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { title: "Accueil", url: "/", icon: FaHome },
  { title: "Caisse", url: "/caisse", icon: FaArchive },
  { title: "Client Canal +", url: "/clientCanal", icon: FaUsers },
  { title: "Mes commissions", url: "/commission", icon: FaCoins },
  { title: "Credit Entreprise", url: "/CreditEntreprise", icon: FaWallet },
  { title: "Prepayer", url: "/prepayee", icon: FaChartLine },
  {
    title: "Les services de l'entreprise",
    url: "/serviceEntreprise",
    icon: FaHandshake,
  },
  { title: "Transfert International", url: "/transInter", icon: FaTicketAlt },
  {
    title: "Uv D'abonnement",
    url: "/uvAbonnement",
    icon: FaCreativeCommonsSampling,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="h-screen w-64 bg-gray-800 text-gray-500">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-bold text-center mb-6">
            YAFFA
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-5">
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <item.icon className="text-xl" />{" "}
                      {/* Taille de l'icône */}
                      <span className="text-xl font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
