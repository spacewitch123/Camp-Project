import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function CampDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { camp, reservationData } = location.state || {};
    console.log(reservationData);


    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', rating: '', text: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };
    const handleReserveClick = () => {
        // Navigate to the reservation page
        navigate('/reservation', { state: { camp, reservationData } });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setReviews([...reviews, newReview]);
        setNewReview({ name: '', rating: '', text: '' });
    };

    if (!camp) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 p-4 shadow-lg">
                <div className="container mx-auto">
                    <h1 className="text-white text-2xl">Camping Reservation System</h1>
                </div>
            </nav>

            <div className="container mx-auto p-8">
                {/* Image Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 row-span-2">
                        <img
                            src={`http://localhost:3001${camp.images[0]}`}
                            alt={`Camp ${camp.campName} - Image 0`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="md:col-span-1 row-span-1">
                        {camp.images.slice(1, 3).map((image, index) => (
                            <div key={index + 1}>
                                <img
                                    src={`http://localhost:3001${image}`}
                                    alt={`Camp ${camp.campName} - Image ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    {camp.images.length > 3 && (
                        <div className="md:col-span-3 text-center mt-4">
                            <button className="text-blue-600">Show all photos</button>
                        </div>
                    )}
                </div>

                {/* Camp Details Section */}
                <div className="bg-white p-8 rounded-lg shadow-xl mt-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{camp.campName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {/* Camp Details */}
                            <div className="flex items-center">
                                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/person-male.png" alt="person-male" />
                                <p className="text-gray-700 ml-2"><strong>Capacity:</strong> {camp.capacity} Persons</p>
                            </div>
                            <div className="flex items-center">
                                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/price-tag-usd.png" alt="price-tag-usd" />
                                <p className="text-gray-700 ml-2"><strong>Price:</strong> {camp.price} RM</p>
                            </div>
                            <div className="flex items-center">
                                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/home.png" alt="home" />
                                <p className="text-gray-700 ml-2"><strong>Type:</strong> {camp.campType}</p>
                            </div>
                            <div className="flex items-center">
                                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/phone.png" alt="phone" />
                                <p className="text-gray-700 ml-2"><strong>Phone Number:</strong> {camp.phoneNumber}</p>
                            </div>
                            {camp.socialMedia && (
                                <div className="flex items-center">
                                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/instagram-new.png" alt="instagram" />
                                    <a href={camp.socialMedia} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                                        <strong>Social Media:</strong> {camp.socialMedia}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 md:self-start"> {/* Right Column */}
                            {/* Amenities */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h3>
                            <ul className="text-gray-700 list-disc list-inside pl-4">
                                {camp.amenities.map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                            {/* Description */}
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Description</h3>
                            <p className="text-gray-700">{camp.description}</p>
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleReserveClick}
                            >
                                Reserve Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white p-8 rounded-lg shadow-xl mt-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h3>
                    {reviews !== null && reviews.length > 0 ? (
                        <div className="mt-8 space-y-4">
                            {reviews.map((review, index) => (
                                <div key={index} className="border p-4 rounded-lg shadow-sm">
                                    <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
                                    <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                                    <p className="text-gray-700">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700">No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CampDetails;
