export interface Review {
    id: number;
    name: string;
    rating: number;
    text: string;
    date: string;
    verified: boolean;
}

export interface Product {
    id: string;
    name: string;
    image: string;
    images?: string[];
    colorImages?: { [key: string]: string[] };
    rating: number;
    price: number;
    originalPrice?: number;
    discount?: string;
    category: 'new' | 'top';
    type: 't-shirts' | 'shorts' | 'shirts' | 'hoodie' | 'jeans' | 'pant' | 'dresses';
    style: 'casual' | 'formal' | 'party' | 'gym';
    gender: 'men' | 'women' | 'kids';
    color: string;
    size: string;
    details?: string[];
    reviews?: Review[];
}

export const products: Product[] = [
    {
        id: '1',
        name: 'T-shirt with Tape Details',
        image: '/products/black-rules-front.png',
        images: [
            '/products/black-rules-front.png',
            '/products/black-rules-back.png',
        ],
        colorImages: {
            '#000000': [
                '/products/black-rules-front.png',
                '/products/black-rules-back.png',
            ]
        },
        rating: 4.5,
        price: 120,
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: 'Black',
        size: 'Medium',
        details: [
            "Heavyweight 100% Cotton",
            "Contrast tape detailing on sleeves",
            "Relaxed boxy fit",
            "Signature 'New Rules' screen print"
        ],
        reviews: [
            { id: 101, name: "Jordan K.", rating: 5, text: "The quality of the cotton is amazing. Thick and sturdy.", date: "Jan 12, 2024", verified: true },
            { id: 102, name: "Sarah L.", rating: 4, text: "Love the tape detail, gives it a unique look.", date: "Feb 05, 2024", verified: true }
        ]
    },
    {
        id: '2',
        name: 'Skinny Fit Jeans',
        image: '/products/product2-1.png',
        images: [
            '/products/product2-1.png',
            '/products/product2-2.png',
            '/products/product2-3.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product2-1.png',
                '/products/product2-2.png',
                '/products/product2-3.png',
            ]
        },
        rating: 3.5,
        price: 240,
        originalPrice: 260,
        discount: '-20%',
        category: 'new',
        type: 'jeans',
        style: 'casual',
        gender: 'men',
        color: 'Vintage Denim',
        size: 'Large',
        details: [
            "Stretch denim (98% Cotton, 2% Elastane)",
            "Classic 5-pocket design",
            "Faded vintage wash",
            "Reinforced belt loops"
        ],
        reviews: [
            { id: 201, name: "Mike T.", rating: 5, text: "Best skinny jeans I've bought in years. Perfect stretch.", date: "Dec 20, 2023", verified: true }
        ]
    },
    {
        id: '3',
        name: 'Checkered Shirt',
        image: '/products/product3-1.png',
        images: [
            '/products/product3-1.png',
            '/products/product3-2.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product3-1.png',
                '/products/product3-2.png',
            ]
        },
        rating: 4.5,
        price: 180,
        category: 'new',
        type: 'shirts',
        style: 'casual',
        gender: 'men',
        color: 'red',
        size: 'Large',
        details: [
            "Soft flannel finish",
            "Double-button adjustable cuffs",
            "Chest pocket with reinforced stitching",
            "Timeless buffalo check pattern"
        ],
        reviews: [
            { id: 301, name: "Emma W.", rating: 5, text: "So cozy for the winter months!", date: "Jan 15, 2024", verified: true }
        ]
    },
    {
        id: '4',
        name: 'Sleeve Striped T-shirt',
        image: '/products/product4-1.png',
        images: [
            '/products/product4-1.png',
            '/products/product4-2.png',
        ],
        colorImages: {
            '#E97451': [
                '/products/product4-1.png',
                '/products/product4-2.png',
            ]
        },
        rating: 4.5,
        price: 130,
        originalPrice: 160,
        discount: '-30%',
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: 'orange',
        size: 'Large'
    },

    {
        id: '5',
        name: 'Vertical Striped Shirt',
        image: '/products/product5-1.png',
        images: [
            '/products/product5-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product5-1.png',
            ]
        },
        rating: 5.0,
        price: 212,
        originalPrice: 235,
        discount: '-20%',
        category: 'top',
        type: 'shirts',
        style: 'formal',
        gender: 'men',
        color: 'green',
        size: 'Large'
    },
    {
        id: '6',
        name: 'Courage Graphic T-shirt',
        image: '/products/product6-1.png',
        images: [
            '/products/product6-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product6-1.png',
            ]
        },
        rating: 4.0,
        price: 145,
        category: 'top',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: 'orange',
        size: 'Medium'
    },
    {
        id: '7',
        name: 'Loose Fit Bermuda Shorts',
        image: '/products/product7-1.png',
        images: [
            '/products/product7-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product7-1.png',
            ]
        },
        rating: 3.0,
        price: 80,
        category: 'top',
        type: 'shorts',
        style: 'casual',
        gender: 'men',
        color: 'blue',
        size: 'Large'
    },
    {
        id: '8',
        name: 'Faded Skinny Jeans',
        image: '/products/product8-1.png',
        images: [
            '/products/product8-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product8-1.png',
            ]
        },
        rating: 4.5,
        price: 210,
        category: 'top',
        type: 'jeans',
        style: 'casual',
        gender: 'men',
        color: 'blue',
        size: 'Medium'
    },
    {
        id: '9',
        name: 'Gradient Graphic T-shirt',
        image: '/products/product9-1.png',
        images: [
            '/products/product9-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product9-1.png',
            ]
        },
        rating: 3.5,
        price: 145,
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: 'white',
        size: 'Large'
    },
    {
        id: '10',
        name: 'Polo with Tipping Details',
        image: '/products/product10-1.png',
        images: [
            '/products/product10-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product10-1.png',
            ]
        },
        rating: 4.5,
        price: 180,
        category: 'top',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: 'red',
        size: 'Medium'
    },
    {
        id: '11',
        name: 'Black Striped T-shirt',
        image: '/products/product11-1.png',
        images: [
            '/products/product11-1.png',
        ],
        colorImages: {
            '#3c567f': [
                '/products/product11-1.png',
            ]
        },
        rating: 5.0,
        price: 120,
        originalPrice: 150,
        discount: '-30%',
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: 'white',
        size: 'Large'
    },
    {
        id: '12',
        name: 'Casual Floral Dress',
        image: '/products/product12-1.png',
        images: [
            '/products/product12-1.png',
            '/products/product12-2.png',
            '/products/product12-3.png',
        ],
        colorImages: {
            '#EADDCA': [
                '/products/product12-1.png',
                '/products/product12-2.png',
                '/products/product12-3.png',
            ]
        },
        rating: 4.8,
        price: 250,
        category: 'new',
        type: 'dresses',
        style: 'party',
        gender: 'women',
        color: 'red',
        size: 'Medium'
    },
    {
        id: '13',
        name: 'ONE LIFE GRAPHIC T-SHIRT',
        image: '/products/navy-front.png',
        images: [
            '/products/navy-front.png',
            '/products/navy-back.png',
            '/products/navy-model.png',
            '/products/olive-front.png',
            '/products/olive-back.png',
            '/products/olive-model.png',
            '/products/teal-front.png',
            '/products/teal-back.png',
            '/products/teal-model.png'
        ],
        colorImages: {
            '#31344f': [
                '/products/navy-front.png',
                '/products/navy-back.png',
                '/products/navy-model.png'
            ],
            '#4F4631': [
                '/products/olive-front.png',
                '/products/olive-back.png',
                '/products/olive-model.png'
            ],
            '#314F4A': [
                '/products/teal-front.png',
                '/products/teal-back.png',
                '/products/teal-model.png'
            ]
        },
        rating: 4.5,
        price: 260,
        originalPrice: 300,
        discount: '-40%',
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'men',
        color: '#31344f',
        size: 'Large'
    },
    {
        id: '14',
        name: "FUBAR Men's Formal Pant",
        image: '/products/product14-1.png',
        images: [
            '/products/product14-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product14-1.png',
            ]
        },
        rating: 4.9,
        price: 320,
        originalPrice: 400,
        discount: '-20%',
        category: 'new',
        type: 'pant',
        style: 'formal',
        gender: 'men',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '15',
        name: "Men's Trackpants",
        image: '/products/product15-1.png',
        images: [
            '/products/product15-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product15-1.png',
            ]
        },
        rating: 4.9,
        price: 320,
        originalPrice: 400,
        discount: '-20%',
        category: 'new',
        type: 'pant',
        style: 'gym',
        gender: 'men',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '16',
        name: "Multi Coloured Checkered Shirt",
        image: '/products/product16-1.png',
        images: [
            '/products/product16-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product16-1.png',
            ]
        },
        rating: 4.9,
        price: 120,
        originalPrice: 150,
        discount: '-20%',
        category: 'new',
        type: 'shirts',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '17',
        name: "Max Boy's Solid Polo T-Shirt",
        image: '/products/product17-1.png',
        images: [
            '/products/product17-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product17-1.png',
            ]
        },
        rating: 4,
        price: 120,
        originalPrice: 150,
        discount: '-20%',
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '18',
        name: "Max Girl's Printed Cotton T-Shirt",
        image: '/products/product18-1.png',
        images: [
            '/products/product18-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product18-1.png',
            ]
        },
        rating: 4,
        price: 150,
        originalPrice: 180,
        discount: '-20%',
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '19',
        name: "Wear Your Mind Boys Graphic T-Shirt",
        image: '/products/product19-1.png',
        images: [
            '/products/product19-1.png',
            '/products/product19-2.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product19-1.png',
                '/products/product19-2.png',
            ]
        },
        rating: 4.5,
        price: 150,
        originalPrice: 180,
        discount: '-20%',
        category: 'new',
        type: 't-shirts',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '20',
        name: "H&M Girl's Printed cotton Dress",
        image: '/products/product20-1.png',
        images: [
            '/products/product20-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product20-1.png',
            ]
        },
        rating: 4.5,
        price: 180,
        originalPrice: 200,
        discount: '-10%',
        category: 'new',
        type: 'dresses',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '21',
        name: "Hopscotch Floral Applique Party Dress ",
        image: '/products/product21-1.png',
        images: [
            '/products/product21-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product21-1.png',
            ]
        },
        rating: 4.5,
        price: 180,
        originalPrice: 200,
        discount: '-10%',
        category: 'new',
        type: 'dresses',
        style: 'party',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '22',
        name: "H&M Girls' Glittery Plissé Tulle Dress",
        image: '/products/product22-1.png',
        images: [
            '/products/product22-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product22-1.png',
            ]
        },
        rating: 4.5,
        price: 250,
        originalPrice: 300,
        discount: '-16%',
        category: 'new',
        type: 'dresses',
        style: 'party',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '23',
        name: "Tagas Boys' Casual Vacation Half Sleeve Shirt",
        image: '/products/product23-1.png',
        images: [
            '/products/product23-1.png',
            '/products/product23-2.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product23-1.png',
                '/products/product23-2.png',
            ]
        },
        rating: 4.5,
        price: 210,
        originalPrice: 250,
        discount: '-10%',
        category: 'new',
        type: 'shirts',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '24',
        name: "YB DNMX Boys Striped Boxy Fit Shirt",
        image: '/products/product24-1.png',
        images: [
            '/products/product24-1.png',
            '/products/product24-2.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product24-1.png',
                '/products/product24-2.png',
            ]
        },
        rating: 4.5,
        price: 190,
        originalPrice: 250,
        discount: '-24%',
        category: 'new',
        type: 'shirts',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '25',
        name: "Urbano Juniors Boys Loose Fit Jeans",
        image: '/products/product25-1.png',
        images: [
            '/products/product25-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product25-1.png',
            ]
        },
        rating: 4.5,
        price: 190,
        originalPrice: 250,
        discount: '-24%',
        category: 'new',
        type: 'jeans',
        style: 'casual',
        gender: 'kids',
        color: '#1A1A1A',
        size: 'One Size'
    },
    {
        id: '26',
        name: "H&M Ladies Oxford Shirt",
        image: '/products/product26-1.png',
        images: [
            '/products/product26-1.png',
        ],
        colorImages: {
            '#1A1A1A': [
                '/products/product26-1.png',
            ]
        },
        rating: 4.5,
        price: 190,
        originalPrice: 250,
        discount: '-24%',
        category: 'new',
        type: 'shirts',
        style: 'casual',
        gender: 'women',
        color: '#1A1A1A',
        size: 'One Size'
    },
];
