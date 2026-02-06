import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-2 md:text-5xl">
        Passive Income Strategist
      </h1>
      <p className="text-lg md:text-xl opacity-90">
        Unlock your potential in the Indian tech market.
      </p>
    </header>
  );
};

export default Header;
