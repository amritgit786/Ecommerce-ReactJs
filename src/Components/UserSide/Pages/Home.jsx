import { useEffect } from "react";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";

import Feature from "../Feature";
import Categories from "../Categories";
import OfferStart from "../OfferStart";
import TrendingProducts from "../TrendingProducts";
import Subscribe from "../Subscribe";
import JustArrivedProducts from "../JustArrivedProducts";
import VendorList from "../VendorList";

import CarouselHome from "../CarouselHome";

// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
const Home = () => {
  useEffect(() => {
    (function ($) {
      "use strict";

      // Dropdown on mouse hover
      $(document).ready(function () {
        function toggleNavbarMethod() {
          if ($(window).width() > 992) {
            $(".navbar .dropdown")
              .on("mouseover", function () {
                $(".dropdown-toggle", this).trigger("click");
              })
              .on("mouseout", function () {
                $(".dropdown-toggle", this).trigger("click").blur();
              });
          } else {
            $(".navbar .dropdown").off("mouseover").off("mouseout");
          }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
      });

      // Back to top button
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $(".back-to-top").fadeIn("slow");
        } else {
          $(".back-to-top").fadeOut("slow");
        }
      });
      $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
      });

      // Vendor carousel
      $(".vendor-carousel").owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
          0: {
            items: 2,
          },
          576: {
            items: 3,
          },
          768: {
            items: 4,
          },
          992: {
            items: 5,
          },
          1200: {
            items: 6,
          },
        },
      });

      // Related carousel
      $(".related-carousel").owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
          0: {
            items: 1,
          },
          576: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
      });

      // Product Quantity
      $(".quantity button").on("click", function () {
        var button = $(this);
        var oldValue = button.parent().parent().find("input").val();
        if (button.hasClass("btn-plus")) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 0;
          }
        }
        button.parent().parent().find("input").val(newVal);
      });
    })(jQuery);
  }, []);
  return (
    <>
      {/* Topbar Start */}
      {/* <Header /> */}
      {/* Topbar End */}

      {/* Navbar Start */}
      {/* <Navbar /> */}
      <CarouselHome />
      {/* Navbar End */}

      {/* Featured Start */}
      <Feature />
      {/* Featured End */}

      {/* Categories Start */}
      <Categories />
      {/* Categories End */}

      {/* Offer Start */}
      <OfferStart />
      {/* Offer End */}

      {/* Products Start */}
      <TrendingProducts />
      {/* Products End */}

      {/* Subscribe Start */}
      <Subscribe />
      {/* Subscribe End */}

      {/* Products Start */}
      <JustArrivedProducts />
      {/* Products End */}

      {/* Vendor Start */}
      {/* <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col">
            <OwlCarousel
              className="owl-theme vendor-carousel"
              loop
              margin={10}
              nav
            >
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-1.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-2.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-3.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-4.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-5.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-6.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-7.jpg" alt="" />
              </div>
              <div className="vendor-item border p-4">
                <img src="src/assets/user/img/vendor-8.jpg" alt="" />
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div> */}

      <VendorList />
      {/* Vendor End */}

      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}

      {/* Back to Top */}
    </>
  );
};

export default Home;
