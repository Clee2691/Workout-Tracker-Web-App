import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar";
const PrivacyPolicy = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container col-md-5 mt-3">
        <h1 className="text-center">Privacy Policy</h1>
        <h3>What Data Is Collected?</h3>
        <p>
          The information SwoleMate collects is dependent on your role. There
          are 3 roles, Client, Trainer, Nutritionist. For every role, we collect
          your username, password, and email. We also collect your first and
          last name, date of birth, and phone number. We collect your weight and
          height. We collect your workout habits along with any meal plans or
          workout plans created.
        </p>
        <h3>Why Do We Collect This Data?</h3>
        <p>
          We want to provide personalized training and meal plans for your
          fitness goals as well as targeted fitness advertisements that pertain
          to your goals.
        </p>
        <h3>How Will It Be Used?</h3>
        <p>
          This data is for internal use only and we will never sell or give away your data.
          It is for internal analytics to provide the best client/trainer/nutritionist relationships
          as well as to give the best possible user interface interactions.
        </p>
      </div>

      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 -
        <Link to="/privacypol" className="text-decoration-none">
          <span className="ms-2">Privacy Policy</span>
        </Link>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
