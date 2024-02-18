import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import UserFiles from "../components/UserFiles";
import UserProfile from "../components/UserProfile";
import { api } from "../utilities/api";
import Upload from "./Upload";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [fileData, setFileData] = useState({});

  const getUserDetails = async () => {
    let userID = localStorage.getItem("userID");
    try {
      const { data } = await api.post("/api/getUserDetails", { userID });
      setUserData(data?.userData?.userInfo||"");
      setFileData(data?.userData?.files||"");
    } catch (err) {
      console.log("error", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="container my-5">
      <Row>
        <Col md={6}>
          <UserProfile data={userData} />
        </Col>
        <Col md={6}>
          <Upload getUserDetails={getUserDetails} />
        </Col>
        <Col md={12}>
          <UserFiles data={fileData} getUserDetails={getUserDetails} />
        </Col>
      </Row>
    </div>
  );
};
export default Profile;
