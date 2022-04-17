import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import UserCard from "./UserCard";

import { GetAllUsers } from "../../actions/user-actions";

const AllUserScreen = () => {
  const [allUsers, setAllUsers] = useState();

  const [searchFilter, setSearchFilter] = useState('');

  const getUsers = async () => {
    const users = await GetAllUsers();
    setAllUsers(users);
  };

  const searchHandler = (event) => {
      setSearchFilter(event.target.value);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <NavigationBar currScreen={"USERS"} />
      <div className="container">
        <h1 className="text-center mt-2">All Users</h1>
        <h4 className="mt-4 ms-2">
          Search for a User by Username:{" "}
          <span className="ms-2">
            <input
              type="text"
              placeholder="Search by username"
              onChange={(e) => {
                searchHandler(e);
              }}
            />
          </span>
        </h4>

        {allUsers &&
          allUsers
            .filter((user) => user.username.includes(searchFilter))
            .map((user) => {
              return <UserCard user={user} key={user._id} />;
            })}
      </div>
      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 -
        <Link to="/privacypol" className="text-decoration-none">
          <span className="ms-2">Privacy Policy</span>
        </Link>
      </footer>
    </>
  );
};

export default AllUserScreen;
