import { useContext, useEffect, useState } from "react";
import { ListUser } from "../../models/model";
import { userListingContext } from "../../context/userListingContext";
import { Button, Col, Image } from "react-bootstrap";
import { BsArrowUpRight } from "react-icons/bs";

import "./cardList.css";

export default function CardList() {
  const { users, setUserId, user, close, setClose, defaultImage } =
    useContext(userListingContext);

  const [size, setSize] = useState([3, 4]);

  useEffect(() => {
    console.log(user);
    if (close) {
      setSize([0, 0]);
    } else {
      setSize([4, 5]);
    }
    console.log(user);
  }, [close]);

  return (
    <Col
      md={size[0]}
      lg={size[1]}
      className={size[0] == 0 ? "" : "card-list scroll"}
    >
      <div className="card-list">
        {users?.reverse().map((user: ListUser) => (
          <div className="card" key={user.id}>
            <div className="card-body">
              <div className="card-content">
                <span className="left">
                  <Image
                    src={defaultImage}
                    roundedCircle
                    width={"50px"}
                    height={"50px"}
                  />
                </span>
                <span className="right">
                  <h5 className="card-title">{user.username}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {user.email}
                  </h6>
                  <p className="card-text">{user.role}</p>
                </span>
              </div>
              <div>
                <span className="bottom"></span>
                <span className="right-span"></span>
                <Button
                  test-id="more-btn"
                  className="more-btn"
                  onClick={() => {
                    setUserId(user.id);
                    setClose(false);
                  }}
                >
                  <BsArrowUpRight />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Col>
  );
}
