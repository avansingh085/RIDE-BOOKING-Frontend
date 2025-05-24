// pages/Home.jsx
import React from 'react';
import Hero from "../../components/Home/Hero";
import SearchForm from "../../components/Home/Search";
import WhyChooseUs from '../../components/Home/WhyChoose';
import RentOptions from '../../components/Home/Options';
import CustomerTestimonials from '../../components/Home/Reviews';
import LocalServiceCarousel from '../../components/Home/LocalService';
import FAQ from '../../components/Home/FAQ';

const Home = () => {
    return (
        <>
            <div className="min-h-screen">
                <div className="relative">
                    <Hero />
                    <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                        <div className="max-w-6xl mx-auto px-4">
                            {/* <SearchForm 
                                containerStyles={{
                                    margin: 'auto',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }} 
                                buttonStyles={{}}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="pt-24">
                    <WhyChooseUs />
                    <RentOptions />
                    <CustomerTestimonials />
                    <LocalServiceCarousel/>
                    <FAQ/>
                </div>
            </div>
        </>
    );
};

export default Home;