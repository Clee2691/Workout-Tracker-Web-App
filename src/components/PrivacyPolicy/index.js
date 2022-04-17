import NavigationBar from "../NavigationBar";
const PrivacyPolicy = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container col-md-5 mt-3">
        <h1 className="text-center">Privacy Policy</h1>
        <h3>What is collected?</h3>
        <p>
          The information SwoleMate collects is dependent on your role. There
          are 3 roles, Client, Trainer, Nutritionist. For every role, we collect
          your username, password, and email. We also collect your first and
          last name, date of birth, and phone number. We collect your weight and
          height. We collect your workout habits along with any meal plans or
          workout plans created.
        </p>
        <h3>Why we collect it?</h3>
        <p>
          We want to provide personalized training and meal plans for your
          fitness goals as well as targeted fitness advertisements that pertain
          to your goals. We will not sell your data and only use it for internal
          analytics to provide the best possible experience.
        </p>
      </div>

      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 - <a href="/privacypol">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
