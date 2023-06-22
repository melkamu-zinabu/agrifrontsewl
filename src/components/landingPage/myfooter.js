import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import SubscribeForm from './subscribeform';

import Footer from './copyright';

const MyFooter = () => {
  return (
    <div className="mt-5 border-top pt-4">
      <footer className="text-center text-lg-start" style={{ backgroundColor: "white", color: "black" }}>
        <section className="d-flex justify-content-between p-1" id="footer" style={{ backgroundColor: "" }}>
          <div style={{ marginLeft: "4rem"}}>
            <h2>Contact</h2>
          </div>
          <div>
            <a href="" className="text-purple me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="text-purple me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="text-green me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-black me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="text-purple me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="text-purple me-4">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start">
            <div className="row mt-3">
              <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">AISS</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                <p>
                  AISS is a web application that aims to solve the urgent problem of getting reliable and quick information to our farmers.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                <p><a href="/sign-in" className="text-black">Profile</a></p>
                <p><a href="#!" className="text-black">FAQ</a></p>
                <p><a href="/" className="text-black">Home</a></p>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                <p><i className="fas fa-home mr-3"></i>Adiss Ababa, 4 killo, Ethiopia</p>
                <p><i className="fas fa-envelope mr-3"></i>aiss@gmail.com</p>
                <p><i className="fas fa-phone mr-3"></i>09 11 22 33 44</p>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <SubscribeForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </footer>
    </div>
  );
};

export default MyFooter;
