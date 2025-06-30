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
import logo from "../../assets/no-bg-logo.png";
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
            // href="/"
            to="mock-interview"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img src={logo} className={styles.logo} alt="Interview logo" />
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="nav-item mb-5">
            {/* main */}
            {/* <NavLink className={styles.navLink}>
              <CDBSidebarMenuItem
                icon="fa-solid fa-chart-line"
                className={styles.navbarItem}
              >
                <i className="fa-solid fa-chart-line ms-1 me-3"></i>
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink> */}

            {/* students */}
            {/* <NavLink className={styles.navLink} to="/students">
              <CDBSidebarMenuItem
                icon="fa-solid fa-user-plus"
                className={styles.navbarItem}
              >
                <i className="fa-solid fa-user-plus ms-1 me-3"></i>

                Students
              </CDBSidebarMenuItem>
            </NavLink> */}

            {/* Mock interviews */}
            <NavLink to="mock-interview" className={styles.navLink}>
              <CDBSidebarMenuItem
                icon="fa-solid fa-scroll"
                className={styles.navbarItem}
              >
                {/* <i className="fa-solid fa-scroll ms-1 me-3"></i> */}
                Mock Interviews
              </CDBSidebarMenuItem>
            </NavLink>

            {/* Create Interviews */}
            <div
              className="accordion accordion-flush bg-transparent"
              id="accordionFlushExample"
            >
              <div className="accordion-item bg-transparent">
                <div className="accordion-header w-100" id="flush-headingOne">
                  <div
                    className="collapsed w-100 text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <NavLink to="create-interview" className={`${styles.navLink} bg-warning`}>
                      <CDBSidebarMenuItem
                        icon="fa-solid fa-plus"
                        className={styles.navbarItem}
                      >
                        <div className="d-flex align-items-center bg-">
                          <div className="d-flex flex-row justify-content-between align-items-center w-100">
                            <p className="mb-0">Create Interview</p>
                            <i className="fa-solid fa-chevron-down text-white pe-4 nav-link"></i>
                          </div>
                        </div>
                      </CDBSidebarMenuItem>
                    </NavLink>
                  </div>
                </div>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body p-0">
                    <NavLink to="/mcqQuestion" className={styles.navLink}>
                      <CDBSidebarMenuItem
                        icon="fa-solid fa-chevron-right"
                        className={styles.navbarItem}
                      >
                        Create MCQ Question
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/essayQuestion" className={styles.navLink}>
                      <CDBSidebarMenuItem
                        icon="fa-solid fa-chevron-right"
                        className={styles.navbarItem}
                      >
                        Create Essay Question
                      </CDBSidebarMenuItem>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar >

      {/* /navbar */}
      < div className={`${styles.pageBody} w-100 bg`
      }>
        <div className="container d-flex flex-column py-5">
          {/* <nav className="navbar w-100 top-0 align-self-start mb-5">
            <div className="container-fluid">
              <a className="navbar-brand fw-bold">Dashboard</a>
              <div className="navbar-content d-flex align-items-center gap-3">
                content
              </div>
            </div>
          </nav> */}

          <Outlet />
        </div>
      </div>
    </div >
  );
}
