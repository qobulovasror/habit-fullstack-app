import "../../assets/styles/vendor/fonts/boxicons.css"
import "../../assets/styles/vendor/css/core.css"
import "../../assets/styles/vendor/css/theme-default.css"
import "../../assets/styles/css/demo.css"
import "../../assets/styles/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
import "../../assets/styles/vendor/libs/apex-charts/apex-charts.css"


import Menu from "./components/menu"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import HabitList from "./components/HabitList"
interface IHomeProps {
    token: string | null;
    setToken: (token: string)=>void;
    user: {name: string, email: string, role: string}; 
    setUser: (user: {name: string, email: string, role: string})=>void
}


const Home = (props: IHomeProps) => {
  const { user, setToken, setUser } = props;
  const logout = () => {
    // eslint-disable-next-line no-restricted-globals
    const res = confirm("Do you want to go out");
    if (res) {
      localStorage.removeItem("user-auth");
      setToken("");
      setUser({
        name: "",
        email: "",
        role: "",
      });
    }
  };
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Menu/>
        <div className="layout-page">
        <Nav/>
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <HabitList/>
            </div>
            <Footer/>
          </div>
        </div>
      </div>

      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
};

export default Home;
