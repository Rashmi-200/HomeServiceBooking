const providerList = {
    cleaning: [
        { name: "Saman Perera (4.7⭐)", price: 1200 },
        { name: "Ruwan Fernando (4.2⭐)", price: 1000 },
        { name: "Dilani Wickramasinghe (3.8⭐)", price: 900 }
    ],
    painting: [
        { name: "Kumarasinghe Jayawardena (4.6⭐)", price: 1500 },
        { name: "Amila Bandara (4.3⭐)", price: 1300 },
        { name: "Nadeesha Weerasinghe (3.9⭐)", price: 1100 }
    ],
    repair: [
        { name: "Chathura de Silva (4.8⭐)", price: 2000 },
        { name: "Nuwan Wickramasinghe (4.5⭐)", price: 1800 },
        { name: "Shanika Herath (3.7⭐)", price: 1600 }
    ],
    electric: [
        { name: "Pasindu Rajapaksha (4.9⭐)", price: 2500 },
        { name: "Isuru Gunawardena (4.4⭐)", price: 2300 },
        { name: "Suneth Perera (3.9⭐)", price: 2100 }
    ],
    plumbing: [
        { name: "Lahiru Dissanayake (4.9⭐)", price: 1800 },
        { name: "Kasun Ratnayake (4.5⭐)", price: 1600 },
        { name: "Harsha Jayasundara (3.8⭐)", price: 1400 }
    ]
};

function calculatePrice(serviceType, provider, hours) {
    const providerData = providerList[serviceType]?.find(p => p.name === provider);
    return providerData ? providerData.price * hours : 0;
}

module.exports = { calculatePrice, providerList };
