import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      className="text-decoration-none"
      key={user._id}
    >
      <div className="card mb-2 border ms-2 me-2 mt-3">
        <div className="row g-0 mb-2">
          <div className="col-md-5 col-lg-4 d-flex align-self-center justify-content-center">
            <img
              className="img-fluid rounded-circle p-2 w-75"
              src={user.userProfImgLink}
            ></img>
          </div>
          <div className="col-md d-flex">
            <div className="card-body text-center p-1">
              <h3 className="card-title">
                <div className="mt-2">{user.username}</div>
              </h3>
              <div className="text-muted">
                Joined: {format(parseISO(user.dateJoined), "dd MMM yyy")}
              </div>
              <hr className="ms-5 me-5 text-white"></hr>
              <h5>Role: {user.userRole}</h5>
              {user.aboutUser && (
                <div className="text-white">About: {user.aboutUser}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
