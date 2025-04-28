const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>Web Development</li>
            <li>Design</li>
            <li>Marketing</li>
            <li>Writing</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>How it Works</li>
            <li>Trust & Safety</li>
            <li>Help & Support</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Terms</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Copyright Policy</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>Forum</li>
            <li>Community Standards</li>
            <li>Success Stories</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t">
        <p>© 2025 Waseelty. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
