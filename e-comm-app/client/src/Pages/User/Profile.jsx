import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1>profile</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
