import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our application.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address, phone number, and location when you register or use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To provide and maintain our service</li>
        <li>To notify you about changes to our service</li>
        <li>To allow participation in interactive features</li>
        <li>To provide customer support</li>
        <li>To monitor usage and improve our service</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We take appropriate measures to protect your personal information from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services for analytics, payment processing, or other features. These providers are obligated to protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. We encourage you to review this page periodically.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
