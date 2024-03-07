export default function Menu(props) {
    const {changeMenu, activeMenu} = props;
    return (
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
        >
            <div className="app-brand demo">
                <a href="/" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="400"
                            height="400"
                            viewBox="0 0 430 430"
                            version="1.1"
                        >
                            <path
                                d="M 140.342 61.465 C 107.769 67.442, 79.238 90.679, 67.074 121.137 C 60.091 138.621, 60.500 130.229, 60.500 256 L 60.500 369.500 62.731 377.866 C 72.208 413.400, 98.077 439.635, 133.067 449.196 L 141.500 451.500 256 451.500 L 370.500 451.500 378.750 449.298 C 395.551 444.814, 411.464 435.681, 423.572 423.572 C 435.681 411.464, 444.814 395.551, 449.298 378.750 L 451.500 370.500 451.500 256 L 451.500 141.500 449.196 133.067 C 439.701 98.318, 414.058 72.850, 378.408 62.761 L 370.500 60.523 259 60.337 C 170.580 60.190, 146.018 60.423, 140.342 61.465 M 147.251 101.093 C 123.173 105.175, 103.784 125.975, 100.495 151.250 L 99.877 156 256.054 156 L 412.230 156 411.514 150.267 C 408.752 128.161, 393.186 109.753, 371 102.357 C 365.817 100.630, 359.360 100.515, 259 100.364 C 200.425 100.276, 150.138 100.604, 147.251 101.093 M 100.233 280.750 C 100.518 359.640, 100.666 365.880, 102.365 371 C 105.416 380.192, 110.193 388.157, 116.500 394.567 C 123.153 401.330, 128.972 405.062, 138.880 408.921 L 145.500 411.500 252 411.787 C 328.502 411.993, 360.429 411.752, 365.348 410.930 C 381.192 408.283, 397.506 396.170, 405.311 381.257 C 412.055 368.371, 411.963 369.785, 411.983 278.250 L 412 196 255.963 196 L 99.925 196 100.233 280.750 M 341.250 210.041 C 338.379 211.505, 316.832 232.691, 274.822 275.354 C 240.624 310.084, 211.899 339.035, 210.990 339.689 C 209.529 340.739, 208.307 338.642, 200.496 321.689 C 180.915 279.191, 176.471 270.597, 172.519 267.582 C 158.576 256.947, 140.131 263.334, 135.940 280.250 C 135.034 283.907, 135.037 286.093, 135.956 289.750 C 137.366 295.367, 179.143 382.503, 183.500 388.916 C 185.372 391.671, 188.569 394.492, 192 396.416 C 196.602 398.997, 198.561 399.495, 204 399.470 C 208.111 399.451, 211.970 398.769, 214.500 397.613 C 217.302 396.334, 240.885 373.281, 293.241 320.643 C 376.018 237.420, 373.568 240.254, 372.827 228.618 C 372.521 223.821, 371.752 221.223, 369.732 218.172 C 363.904 209.364, 350.229 205.460, 341.250 210.041"
                                stroke="none"
                                fill="#3694ed"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </span>
                    <span className="app-brand-text demo menu-text fw-bold ms-2"
                    >Habit</span
                    >
                </a>

                <a
                    href="javascript:void(0);"
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                >
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1">
                {/* <!-- Dashboards --> */}
                <li className={(activeMenu=="todayHabit")? "menu-item active": "menu-item "}>
                    <a href="##" className="menu-link" onClick={()=>changeMenu("todayHabit")}>
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Analytics">Today's habits</div>
                    </a>
                </li>
                <li className={(activeMenu=="allHabit")? "menu-item active": "menu-item "}>
                    <a href="##" className="menu-link" onClick={()=>changeMenu("allHabit")}>
                        <i className="menu-icon tf-icons bx bx-list-ul"></i>
                        <div data-i18n="Analytics">All Habits</div>
                    </a>
                </li>
                <li className={(activeMenu=="statistic")? "menu-item active": "menu-item "}>
                    <a href="##" className="menu-link" onClick={()=>changeMenu("statistic")}>
                        <i className="menu-icon tf-icons bx bx-bar-chart-square"></i>
                        <div data-i18n="Analytics">Statistic</div>
                    </a>
                </li>
                {/* <!-- Layouts --> */}
                <li className={"menu-item"}>
                    <a href="javascript:void(0);" className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons bx bx-cog"></i>
                        <div data-i18n="Layouts">Setting</div>
                    </a>

                    <ul className="menu-sub">
                        <li className={(activeMenu=="todayHabit")? "menu-item active": "menu-item "}>
                            <a href="layouts-without-menu.html" className="menu-link">
                                <div data-i18n="Without menu">Profile</div>
                            </a>
                        </li>
                        <li className={(activeMenu=="todayHabit")? "menu-item active": "menu-item "}>
                            <a href="layouts-without-navbar.html" className="menu-link">
                                <div data-i18n="Without navbar">Logout</div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    )
}
