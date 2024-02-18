import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const UserProfile = ({ data = {} }) => {
  let userInfo = data.length && data[0];
  let userName = userInfo?.firstName + " " + userInfo?.lastName;
  return (
    <Card className="h-100 align-items-start justify-content-between profile-card">
      <CardBody className="w-100">
        <CardTitle tag="h5" className="text-center text-primary">
          My Profile
        </CardTitle>
        <CardText>
          <h6>
            <b className="me-2">User Name:</b> {userName}
          </h6>
          <h6>
            {" "}
            <b className="me-2">Email: </b> {userInfo?.email}
          </h6>
        </CardText>
      </CardBody>
    </Card>
  );
};
export default UserProfile;
