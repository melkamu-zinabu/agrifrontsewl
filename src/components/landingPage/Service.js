import React from 'react';
import './style.css';

function Service() {
  return (
    <section className="services section-padding" id="services">
      <div className="container container  border-top pt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header text-center pb-5">
              <h2>Our Services</h2>
              <p>
                We intend to advance the flow of technology reaching farmers. To that end, we have focused on making our
                product.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-12 col-lg-4 zoom-out">
            <div className="card text-center pb-2">
              <div className="card-body">
                <h3 className="card-title">RELIABLE</h3>
                <p className="lead">
                  We strive to provide accurate and trustworthy information through our app. Our data is sourced from
                  reliable agricultural sources, ensuring that farmers can rely on the information they receive.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-4 zoom-out">
            <div className="card text-center pb-2">
              <div className="card-body">
                <h3 className="card-title">RELEVANT</h3>
                <p className="lead">
                  We offer a range of features and tools that are relevant to various aspects of agriculture, including
                  crop management, pest control, weather forecasting, market prices, and agricultural best practices.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-4 zoom-out">
            <div className="card text-center pb-2">
              <div className="card-body">
                <h3 className="card-title">FREE</h3>
                <p className="lead">
                  Our app is offered completely free of charge, ensuring that farmers from all backgrounds can benefit
                  from our reliable and relevant information without any financial barriers. We serve our community
                  freely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
