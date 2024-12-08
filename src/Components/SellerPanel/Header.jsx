const Header = () => {
  return (
    <>
      {/* <!--**********************************
            Nav header start
        ***********************************--> */}
      <div className="nav-header">
        <div className="brand-logo">
          <a href="index.html">
            <b className="logo-abbr">
              <img src="/src/assets/seller/images/logo.png" alt="" />{" "}
            </b>
            <span className="logo-compact">
              <img src="/src/assets/seller/images/logo-compact.png" alt="" />
            </span>
            <span className="brand-title">
              <img src="/src/assets/seller/images/logo-text.png" alt="" />
            </span>
          </a>
        </div>
      </div>
      {/* <!--**********************************
            Nav header end
        ***********************************--> */}

      {/* <!--**********************************
            Header start
        ***********************************--> */}
      <div className="header">
        <div className="header-content clearfix">
          <div className="nav-control">
            <div className="hamburger">
              <span className="toggle-icon">
                <i className="icon-menu"></i>
              </span>
            </div>
          </div>
          <div className="header-left">
            <div className="input-group icons">
              <div className="input-group-prepend">
                <span
                  className="input-group-text bg-transparent border-0 pr-2 pr-sm-3"
                  id="basic-addon1"
                >
                  <i className="mdi mdi-magnify"></i>
                </span>
              </div>
              <input
                type="search"
                className="form-control"
                placeholder="Search Dashboard"
                aria-label="Search Dashboard"
              />
              <div className="drop-down animated flipInX d-md-none">
                <form action="#">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="header-right">
            <ul className="clearfix">
              <li className="icons dropdown">
                {/* javascript:void(0) */}
                <a href="!#" data-toggle="dropdown">
                  <i className="mdi mdi-email-outline"></i>
                  <span className="badge badge-pill gradient-1">3</span>
                </a>
                <div className="drop-down animated fadeIn dropdown-menu">
                  <div className="dropdown-content-heading d-flex justify-content-between">
                    <span className="">3 New Messages</span>
                    <a href="!#" className="d-inline-block">
                      <span className="badge badge-pill gradient-1">3</span>
                    </a>
                  </div>
                  <div className="dropdown-content-body">
                    <ul>
                      <li className="notification-unread">
                        <a href="!#">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="src/assets/seller/images/avatar/1.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Saiful Islam
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Hi Teddy, Just wanted to let you ...
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-unread">
                        <a href="!#">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="src/assets/seller/images/avatar/2.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Adam Smith
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Can you do me a favour?
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="!#">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="src/assets/seller/images/avatar/3.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Barak Obama
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Hi Teddy, Just wanted to let you ...
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="!#">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="src/assets/seller/images/avatar/4.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Hilari Clinton
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">Hello</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="icons dropdown">
                <a href="!#" data-toggle="dropdown">
                  <i className="mdi mdi-bell-outline"></i>
                  <span className="badge badge-pill gradient-2">3</span>
                </a>
                <div className="drop-down animated fadeIn dropdown-menu dropdown-notfication">
                  <div className="dropdown-content-heading d-flex justify-content-between">
                    <span className="">2 New Notifications</span>
                    <a href="!#" className="d-inline-block">
                      <span className="badge badge-pill gradient-2">5</span>
                    </a>
                  </div>
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="!#">
                          <span className="mr-3 avatar-icon bg-success-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Events near you
                            </h6>
                            <span className="notification-text">
                              Within next 5 days
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="!#">
                          <span className="mr-3 avatar-icon bg-danger-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Event Started
                            </h6>
                            <span className="notification-text">
                              One hour ago
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="!#">
                          <span className="mr-3 avatar-icon bg-success-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Event Ended Successfully
                            </h6>
                            <span className="notification-text">
                              One hour ago
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="!#">
                          <span className="mr-3 avatar-icon bg-danger-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Events to Join
                            </h6>
                            <span className="notification-text">
                              After two days
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="icons dropdown d-none d-md-flex">
                <a href="!#" className="log-user" data-toggle="dropdown">
                  <span>English</span>{" "}
                  <i className="fa fa-angle-down f-s-14" aria-hidden="true"></i>
                </a>
                <div className="drop-down dropdown-language animated fadeIn  dropdown-menu">
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="!#">English</a>
                      </li>
                      <li>
                        <a href="!#">Dutch</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="icons dropdown">
                <div
                  className="user-img c-pointer position-relative"
                  data-toggle="dropdown"
                >
                  <span className="activity active"></span>
                  <img
                    src="src/assets/seller/images/user/1.png"
                    height="40"
                    width="40"
                    alt=""
                  />
                </div>
                <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="app-profile.html">
                          <i className="icon-user"></i> <span>Profile</span>
                        </a>
                      </li>
                      <li>
                        <a href="!#">
                          <i className="icon-envelope-open"></i>{" "}
                          <span>Inbox</span>{" "}
                          <div className="badge gradient-3 badge-pill gradient-1">
                            3
                          </div>
                        </a>
                      </li>

                      <hr className="my-2" />
                      <li>
                        <a href="page-lock.html">
                          <i className="icon-lock"></i> <span>Lock Screen</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-login.html">
                          <i className="icon-key"></i> <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--**********************************
            Header end ti-comment-alt
        ***********************************--> */}
    </>
  );
};

export default Header;
