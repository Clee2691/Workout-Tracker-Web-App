import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`} className="text-decoration-none">
      <div className="card mb-2 border ms-2 me-2 mt-3">
        <div className="row g-0">
          <div className="col-md-5 col-lg-4 d-flex align-self-center">
            <img
              className="img-fluid rounded-circle p-2"
              src="../images/avatars/maleprof2.jpg"
            ></img>
          </div>
          <div className="col-md d-flex">
            <div className="card-body text-center p-1">
              <h2 className="card-title">
                <div className="mt-4">{user.username}</div>
              </h2>
              <div className="text-muted">
                Joined: {format(parseISO(user.dateJoined), "dd MMM yyy")}
              </div>
              <hr className="ms-5 me-5 text-white"></hr>
              <h4>Role: {user.userRole}</h4>
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
