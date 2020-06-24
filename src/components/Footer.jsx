import React from "react";
import momo from "../assets/icons/momo.png";
import viettelpay from "../assets/icons/viettelpay.png";
import vtcpay from "../assets/icons/vtcpay.png";

export default function Footer() {
  return (
    <footer className="footer noise">
      <div className="footer__container">
        <div className="footer__info">
          <h3 className="footer__heading">Liên hệ với chúng tôi</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <i className="fab fa-facebook-square" aria-hidden="true"></i>
              Facebook: Lê Văn Nam
            </li>
            <li className="footer__item">
              <i className="fas fa-phone-square-alt" aria-hidden="true"></i>Điện
              thoại: 0985784219
            </li>
            <li className="footer__item">
              <i className="fas fa-map-marked-alt" aria-hidden="true"></i>Địa
              chỉ: Đại học công nghiệp Hà Nội
            </li>
          </ul>
        </div>
        <div className="footer__info">
          <h3 className="footer__heading">Các sản phẩm khác</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <i className="fas fa-mobile-alt" aria-hidden="true"></i>Điện thoại
              di động
            </li>
            <li className="footer__item">
              <i className="fas fa-laptop" aria-hidden="true"></i>Máy tính xách
              tay
            </li>
            <li className="footer__item">
              <i className="fas fa-headphones-alt" aria-hidden="true"></i>Tai
              nghe cao cấp
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__payment-method">
        <p className="footer__additional-info">
          Chúng tôi chấp nhận thanh toán qua các hình thức giao dịch phổ biến
          hiện nay
        </p>
        <img src={momo} alt="momo" />
        <img src={viettelpay} alt="viettelpay" />
        <img src={vtcpay} alt="vtcpay" />
        <hr />
        <i>Powered by Group 1</i>
      </div>
    </footer>
  );
}
