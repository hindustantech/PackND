import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-red-50 rounded-lg shadow-md mt-10 text-gray-800">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-red-600 mb-4">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Packnd</strong> ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App"). Please read this policy carefully to understand our views and practices regarding your information and how we will treat it. By using the App, you agree to the terms of this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment details.</li>
        <li><strong>Usage Information:</strong> Details of your interactions with the App, such as order history, preferences, and app usage patterns.</li>
        <li><strong>Device Information:</strong> IP address, operating system, browser type, and app version.</li>
        <li><strong>Location Information:</strong> If you allow, we collect your precise location for delivery purposes.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To process orders and deliver meals.</li>
        <li>To provide customer support.</li>
        <li>To improve the App and user experience.</li>
        <li>To send notifications about your orders or promotional offers (you can opt-out at any time).</li>
        <li>To ensure compliance with applicable laws and regulations.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal information to third parties. However, we may share your information:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>With third-party service providers for payment processing, delivery services, and technical support.</li>
        <li>If required by law or in response to legal requests.</li>
        <li>To protect our rights and ensure user safety.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">Data Security</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to secure your information. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">Your Rights</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Access, update, or delete your personal information.</li>
        <li>Opt-out of receiving promotional communications.</li>
        <li>Withdraw consent for location tracking.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted within the App, and your continued use signifies acceptance of the changes.
      </p>

      <h2 className="text-2xl font-semibold text-red-500 mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@packnd.com" className="text-red-600 underline">support@packnd.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
