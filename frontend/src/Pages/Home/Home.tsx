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
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <button className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="row mt-4">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <div className="card p-3">
                    {
                        user &&
                        <div>
                            <h2>Name: {user.name}</h2>
                            <h2>Email: {user.email}</h2>
                            <h2>Role: {user.role}</h2>
                        </div>
                    }   
                </div>
            </div>
            <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
