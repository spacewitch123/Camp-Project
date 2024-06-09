import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import SearchLocationInput from '../components/GooglePlcasesApi';
import { useNavigate } from 'react-router-dom';

function CamperHomePage() {
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });
    const [numPeople, setNumPeople] = useState(1);
    const [reservation, setReservation] = useState({ success: false, message: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/getcamps', {
                checkInDate: checkInDate.toISOString().split('T')[0],
                checkOutDate: checkOutDate.toISOString().split('T')[0],
                location: selectedLocation,
                numPeople,
            });
            if (response.data.success) {
                setReservation({ success: true, message: 'Looking for Camps' });
                navigate('/campsfound', {
                    state: {
                        camps: response.data.camps,
                        city: response.data.city,
                        checkInDate: checkInDate.toISOString().split('T')[0],
                        checkOutDate: checkOutDate.toISOString().split('T')[0],
                        location: selectedLocation,
                        numPeople,
                    }
                });
            } else {
                setReservation({ success: false, message: 'Reservation failed. Try again.' });
            }
        } catch (error) {
            setReservation({ success: false, message: 'Error occurred. Try again later.' });
        }
    };

    console.log('checkInDate:', checkInDate);
    console.log('checkOutDate:', checkOutDate);
    console.log('numPeople:', numPeople);


    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 p-4 shadow-lg">
                <div className="container mx-auto">
                    <h1 className="text-white text-2xl">Camping Reservation System</h1>
                </div>
            </nav>
            <div className="container mx-auto py-8">
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-2xl font-bold mb-4">Welcome to Camper</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Check-in Date:
                            </label>
                            <DatePicker
                                selected={checkInDate}
                                onChange={date => setCheckInDate(date)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Check-out Date:
                            </label>
                            <DatePicker
                                selected={checkOutDate}
                                onChange={date => setCheckOutDate(date)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Location:
                            </label>
                            <SearchLocationInput setSelectedLocation={setSelectedLocation} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Number of People:
                            </label>
                            <input
                                type="number"
                                value={numPeople}
                                onChange={(e) => setNumPeople(e.target.value)}
                                min="1"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                            Find Camps
                        </button>
                    </form>
                    {reservation.message && (
                        <p className={`mt-4 ${reservation.success ? 'text-green-500' : 'text-red-500'}`}>
                            {reservation.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CamperHomePage;
