'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Link from "next/link";
import PropertySearchForm from "@/components/PropertySearchForm";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get('location'));
  console.log(searchParams.get('propertyType'));

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    const fetchSearchResults = async () => {
        try {
            const res = await fetch(`/api/properties/search/?location=${location}&propertyType=${propertyType}`);

            console.log('res:', res);
            if (res.status === 200) {
                const data = await res.json();
                console.log('data:', data);
                setProperties(data);
            } else {
                setProperties([]);
            };
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        };
    };

    fetchSearchResults();
  }, [location, propertyType]);

  console.log('properties:', properties);

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4-flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href='/properties' className="flex items-center text-blue-500 hover:underline mb-3">
                        <FaArrowAltCircleLeft className="mr-2 mb-1" /> 
                            Back to properties
                    </Link>
                    <h2 className="text-2xl mb-4">Search Results</h2>
                    {properties.length === 0 ? (
                        <p>No search results found...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties?.map((property) => (
                                <PropertyCard 
                                    key={property._id}
                                    property={property}
                                />
                            ))}
                        </div>  
                    )}
                </div>
            </section>
        </>
    )
};

export default SearchResultsPage;