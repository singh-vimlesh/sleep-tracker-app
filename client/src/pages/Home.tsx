import React from 'react';
import SleepForm from '../components/SleepForm';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto p-3 min-w-36">
            <h1 className="text-2xl font-bold mb-4 text-center">Sleep Tracker</h1>
            <SleepForm />
        </div>
    );
};

export default Home;
