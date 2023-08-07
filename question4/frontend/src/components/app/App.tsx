import {
  userListingContext,
  UserListingProvider,
} from "../../context/userListingContext";
import CardList from "../cards/CardList";
import UserForm from "../modals/Form";
import NavBar from "../Nav/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserProfile from "../profile/profile";
import { Row } from "react-bootstrap";
import { useContext } from "react";

function App() {
  const { user } = useContext(userListingContext);

  return (
    <div className="App" data-testid="app">
      <UserListingProvider>
        <NavBar />
        <div className="container">
          <Row>
            <CardList />
            <UserProfile />
          </Row>
        </div>
        <UserForm />
      </UserListingProvider>
    </div>
  );
}

export default App;
