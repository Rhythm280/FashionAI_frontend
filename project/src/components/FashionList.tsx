import { useEffect, useState } from 'react';
import axios from '../api/axios'; // adjust path if needed

interface FashionItem {
    name: string;
    category: string;
    description: string;
    imageUrl: string;
}

const FashionList = () => {
    const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);

    useEffect(() => {
        axios.get('/fashion')  // This hits your backend API at /api/fashion
            .then((res) => {
                setFashionItems(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch fashion items:', err);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {fashionItems.map((item, idx) => (
                <div key={idx} className="border rounded-xl p-4 shadow-md">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-60 object-cover rounded-xl" />
                    <h2 className="text-xl font-bold mt-2">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-gray-800">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default FashionList;
