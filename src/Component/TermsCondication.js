import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        These Terms and Conditions ("Terms") govern your use of the Packnd mobile application (the "App").
        By using the App, you agree to comply with these Terms. If you do not agree, please refrain from using Packnd.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of the App</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>You must be at least 18 years old or have parental/guardian consent to use the App.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders and Payment</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>All orders placed through the App are subject to acceptance.</li>
          <li>Prices displayed in the App are final and inclusive of taxes.</li>
          <li>Payments must be made at the time of placing an order using approved payment methods.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Delivery times are estimates and may vary due to unforeseen circumstances.</li>
          <li>It is your responsibility to provide accurate delivery details.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Plan</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Subscription plans can be customized or paused as per App features.</li>
          <li>Any changes to subscription plans must be made at least 24 hours in advance.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refunds and Cancellation</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li className="font-semibold text-red-600">No refunds will be issued unless the order was incorrect or undelivered.</li>
          <li className="font-semibold text-red-600">All refund requests must be raised within 2 hours of the scheduled delivery time.</li>
          <li>Cancellations are allowed if made within the specified timeframe before order preparation begins.</li>
          <li>Once order preparation has started, cancellations are no longer permitted.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>All content, trademarks, and logos in the App are owned by Packnd and protected under intellectual property laws.</li>
          <li>You may not copy, modify, or distribute any App content without prior permission.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prohibited Activities</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Misusing the App for fraudulent purposes.</li>
          <li>Attempting to disrupt the App's functionality.</li>
          <li>Violating any applicable laws or regulations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          Packnd will not be held liable for any indirect, incidental, or consequential damages
          arising from the use of the App or services provided.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Termination</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to terminate your access to the App for violations of these Terms or misuse of our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update these Terms from time to time. Continued use of the App constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts in Nashik.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-700">Email: <a href="mailto:support@packnd.com" className="text-blue-600 hover:underline">support@packnd.com</a></p>
      </section>
    </div>
  );
};

export default TermsAndConditions;