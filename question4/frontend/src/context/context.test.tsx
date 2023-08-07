import { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { UserListingProvider, userListingContext } from "./userListingContext";

const TestCardList = () => {
  const { user } = useContext(userListingContext);
  return (
    <div>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <p>{user.firstNames}</p>
      <p>{user.lastName}</p>
      <p>{user.bio}</p>
    </div>
  );
};

describe("<UserListingProvider />", () => {
  test("provides expected userListingContext obj to child elements", () => {
    [
      {
        user: {
          id: 1,
          username: "test1",
          email: "test@test1.com",
          role: "admin",
          firstNames: "test1",
          lastName: "test1",
          bio: "test1",
        },
      },
      {
        user: {
          id: 2,
          username: "test2",
          email: "test@test2.com",
          role: "admin",
          firstNames: "test2",
          lastName: "test2",
          bio: "test2",
        },
      },
      {
        user: {
          id: 3,
          username: "test3",
          email: "test@test3.com",
          role: "admin",
          firstNames: "test3",
          lastName: "test3",
          bio: "test3",
        },
      },
    ].forEach(async ({ user }) => {
      render(
        <UserListingProvider>
          <TestCardList />
        </UserListingProvider>
      );
      const templateExpect = async (text: string) => {
        const test = await screen.findByText(text);
        expect(test).toBeInTheDocument();
      };
      await templateExpect(user.username);
      await templateExpect(user.email);
      await templateExpect(user.role);
      await templateExpect(user.firstNames);
      await templateExpect(user.lastName);
      await templateExpect(user.bio);
    });
  });
});
