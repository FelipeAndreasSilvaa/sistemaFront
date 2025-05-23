"use client"

import * as React from "react"
import axios from "axios"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  UserRound,
  Users,
  ShoppingCart,
  Plus,
  HomeIcon,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"


const defaultNav = [
  {
    title: "Login",
    url: "/login",
    icon: UserRound,
  },
  {
    title: "Register",
    url: "/register",
    icon: Users,
  },

]

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
]

type User = {
  name: string;
  email: string;
  avatar: string;
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session`, { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setIsLoggedIn(true)
          setUser({
            name: res.data.user.name,
            email: res.data.user.email,
            avatar: "/avatars/shadcn.jpg", // ajuste se tiver
          })
        }
      })
  }, [])


  const filteredNav = (isLoggedIn
    ? [
        ...defaultNav.filter(item => item.title !== "Login" && item.title !== "Register"),
        {
          title: "Principal",
          url: "/",
          icon: HomeIcon,
        },
        {
          title: "Adicionar produto",
          url: "/addProduto",
          icon: Plus,
        },
        {
          title: "Carrinho",
          url: "/Carrinho",
          icon: ShoppingCart,
        }
      ]
    : defaultNav
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        {isLoggedIn && user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
