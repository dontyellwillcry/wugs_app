import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Wugs On-Boarding</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/getmoreinfo">
              Interested Page
            </Link>
            <Link className="navLink" to="/priming">
              (0) Priming
            </Link>
            <Link className="navLink" to="/servicechoice">
              (1) Service Choice
            </Link>
            <Link className="navLink" to="/clientlocationinfo">
              (2) Client Location Info
            </Link>
            <Link className="navLink" to="/demographics">
              (3) Demographics
            </Link>
            <Link className="navLink" to="/foodpreferences">
              (4) Food Preferences
            </Link>
            <Link className="navLink" to="/additionalinfo">
              (5) Addl Info
            </Link>
            <Link className="navLink" to="/review">
              (6) Review and Schedule
            </Link>
            <Link className="navLink" to="/clientstatus">
              Client Status Page
            </Link>
            <Link className="navLink" to="/admin">
              Admin View Page
            </Link> */}
            
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
