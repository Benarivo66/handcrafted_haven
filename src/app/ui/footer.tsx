import React from "react";
import FooterElement from './component/footer-elements';

export function Footer(){
return (
    <footer className="bg-gray-100 text-gray-600 mt-10 py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Team5 Handcraft Haven</h3>
          <p>Connecting you with skilled artisan for all your handyman</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#products" className="hover:underline">Shop</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Connect</h4>
          <p>Email: support@handcrafthaven.com</p>
          <p>Instagram: @team5handcraft</p>
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-gray-500">
        © {new Date().getFullYear()} Team5 Handcraft Haven. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;