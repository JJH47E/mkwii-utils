import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import BackButton from '../Shared/back-button.component';
import '../../Root.scss';
import HomeButton from '../Shared/home-button.component';
import { getPageTitle } from '../../Services/page-title.service';
import NavBarHeader from './navbar/nav-bar-header.component';
import { isCookieConsent } from '../../Services/cookie.service';
import CookieConsent from '../CookieConsent/cookie-consent.component';

function Layout() {
  const location = useLocation();
  const url = location.pathname;

  const [cookieConsent, setCookieConsent] = useState(isCookieConsent());
  const setConsent = (value: boolean) => {
    setCookieConsent(value);
  };

  return (
    <div className="layout">
      <div className="d-block">
        <Container fluid className="position-fixed always-on-top">
          <Row className="navbar">
            <Col xs xl="1">
              <BackButton />
            </Col>
            <Col>
              <NavBarHeader title={getPageTitle(url)} />
            </Col>
            <Col xs xl="1">
              <HomeButton />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="outlet">
        {cookieConsent ? <Outlet /> : <CookieConsent setConsent={setConsent} />}
      </div>
    </div>
  );
}

export default Layout;
