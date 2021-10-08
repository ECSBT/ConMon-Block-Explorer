import React from 'react';
import DataCard from '../comps/DataCard';
import Navbar from '../comps/Navbar';

export default function Demo() {
    const env = process.env.NODE_ENV

    var DataCards = []

    

    return (
        <>
            <h1>{env}</h1>
            <Navbar />
            <DataCard  />
        </>
    );
}
