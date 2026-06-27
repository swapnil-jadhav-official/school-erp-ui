"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeft, PanelRight, Search, LogOut } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useDashboardLayout } from "@/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Div } from "@/components/ui/layout";
import { P } from "@/components/ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "./GlobalSearch";

const SPRING = { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.9 };

export function AppHeader() {
  const { state, toggleSidebar } = useSidebar();
  const { userInfo, logout } = useDashboardLayout();
  const [searchOpen, setSearchOpen] = useState(false);
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-30 flex items-center gap-2.5 px-4 h-[54px] shrink-0 backdrop-blur-[20px] backdrop-saturate-[180%]"
        style={{
          background: "var(--glass-bg)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Gradient bottom line */}
        <Div
          className="absolute bottom-0 left-0 right-0 h-px opacity-35"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--theme-gradient-from) 30%, var(--theme-gradient-to) 70%, transparent 100%)",
          }}
        />

        {/* Sidebar toggle */}
        <motion.div
          whileHover={{ backgroundColor: "var(--accent)" }}
          whileTap={{ scale: 0.92 }}
          transition={SPRING}
          className="rounded-lg"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleSidebar}
            className="text-muted-foreground rounded-lg"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isCollapsed ? (
                <motion.span
                  key="expand"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  <PanelRight size={17} />
                </motion.span>
              ) : (
                <motion.span
                  key="collapse"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  <PanelLeft size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Search trigger — icon-only on mobile, full bar on sm+ */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setSearchOpen(true)}
          className="sm:hidden text-muted-foreground rounded-lg min-w-[48px] min-h-[48px]"
          aria-label="Search"
        >
          <Search size={17} />
        </Button>
        <Button
          variant="outline"
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex flex-1 max-w-[440px] justify-start gap-2 text-muted-foreground font-normal text-[13px] h-9 rounded-xl"
        >
          <Search size={13} className="shrink-0" />
          <span className="flex-1 text-left opacity-70">Search...</span>
          <Div type="row" className="hidden sm:flex gap-0.5 shrink-0">
            <kbd className="px-[5px] py-px rounded bg-background border border-border/50 text-[10px] leading-relaxed">
              ⌘
            </kbd>
            <kbd className="px-[5px] py-px rounded bg-background border border-border/50 text-[10px] leading-relaxed">
              K
            </kbd>
          </Div>
        </Button>

        <Div className="flex-1" />

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 h-auto py-[5px] rounded-xl"
            >
              <Avatar className="size-[30px]">
                <AvatarFallback className="text-[11px]">{userInfo.initials}</AvatarFallback>
              </Avatar>
              <Div className="hidden sm:block text-left">
                <P color="default" size="sm" weight="medium" noWrap>
                  {userInfo.fullName}
                </P>
                <P color="muted" size="xs" noWrap>
                  {userInfo.email}
                </P>
              </Div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuLabel>
              <Div type="row" align="center" gap="sm">
                <Avatar>
                  <AvatarFallback>{userInfo.initials}</AvatarFallback>
                </Avatar>
                <Div>
                  <P color="default" weight="medium">{userInfo.fullName}</P>
                  <P color="muted" size="xs">{userInfo.email}</P>
                </Div>
              </Div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut size={14} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
