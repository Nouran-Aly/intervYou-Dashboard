import React from "react";
import {
  CDBNavLink,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  // CDBSidebarSubMenu,
} from "cdbreact";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: "100vh",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar
        textColor="#ffffff"
        backgroundColor="#152a4c"
      // className="h-100"
      >
        <CDBSidebarHeader prefix={<i className="fa-solid fa-bars"></i>}>
          <Link
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img src={logo} className={styles.logo} alt="Interview logo" />
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="nav-item mb-5">
            {/* main */}
            <NavLink className={styles.navLink}>
              <CDBSidebarMenuItem
                icon="fa-regular fa-clipboard"
                className={styles.navbarItem}
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            {/* students */}
            <NavLink className={styles.navLink} to="/students">
              <CDBSidebarMenuItem
                icon="fa-solid fa-users"
                className={styles.navbarItem}
              >
                Students
              </CDBSidebarMenuItem>
            </NavLink>

            {/* Mock interviews */}
            <NavLink to="mock-interview" className={styles.navLink}>
              <CDBSidebarMenuItem
                icon="fa-solid fa-clipboard-question"
                className={styles.navbarItem}
              >
                Mock Interviews
              </CDBSidebarMenuItem>
            </NavLink>

            {/* Create Interviews */}
            <NavLink className={styles.navLink} to="/create-interview">
              <CDBSidebarMenuItem
                icon="fa-solid fa-circle-plus"
                className={styles.navbarItem}
              >
                Create Interviews
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

      {/* /navbar */}
      <div className={`${styles.pageBody} w-100 bg`}>
        <div className="container d-flex flex-column">
          <nav className="navbar w-100 top-0 align-self-start mb-5">
            <div className="container-fluid">
              <a className="navbar-brand fw-bold">Dashboard</a>
              <div className="navbar-content d-flex align-items-center gap-3">
                content
              </div>
            </div>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
