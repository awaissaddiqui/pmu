import React, { useState } from "react";
import HREF from "../assets/7.jpg";
import Phases from "../assets/4.jpg";
import { Link } from "react-router";

function Research() {

    return (
        <div className="p-8 md:p-12 font-sans">
            {/* First Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Higher Education Research Endowment Fund (HEREF)
                    </h1>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The research grants are offered to qualified scholars/researchers in Khyber Pakhtunkhwa...
                    </p>
                </div>
                <div className="flex-1">
                    <img src={HREF} alt="HEREF" className="w-full max-w-3xl rounded-lg shadow-lg" />
                </div>
            </div>

            {/* Second Section */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 mb-12">
                <div className="flex-1">
                    <img src={Phases} alt="Phases" className="w-full max-w-3xl rounded-lg shadow-lg" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Phases</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        In phase 1 of the scheme, 22 research grants were awarded...
                    </p>
                </div>
            </div>

            {/* Apply Button */}
            <div className="text-center">
                <p className="text-gray-700 mt-6">Please read the instructions carefully before submitting the form.</p>
                <p className="text-blue-600 underline cursor-pointer mb-6">Download Instructions</p>
                <Link
                    className="px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition"
                    to="/research/registration"
                >
                    Apply Here
                </Link>
            </div>
        </div>
    );
}

export default Research;
