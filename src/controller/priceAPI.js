/*
Note : we can use axios package to fetch data to mimic the required output but after searching I did not find any
       free API which mimic the required output so I randomly generate the required output to match with the output.

       Additonally I make the frontend which is mentioned in the assignment by choice and also for implementing 
       the Authentication part & to save user data in Database I used MongoDB so indirectly this project converts 
       into a MERN stack project.
*/

const fetchData = async function (req, res) {
    try {
        const { Source, Destination, Date } = req.query;

        // Perform necessary input validation
        if (!Source || !Destination || !Date) {
            return res.status(400).send({ status: false, error: 'Missing required parameters' });
        }

        const airlines = ['indigo', 'airAsia', 'vistara'];
        const prices = {};

        airlines.forEach((airline) => {
            const minPrice = 1000; // Assuming Minimum price
            const maxPrice = 5000; // Assuming Maximum price
            const randomPrice = Source==Destination ? 0 : Math.floor(Math.random() * (maxPrice - minPrice))+ minPrice;
            prices[airline] = `₹${randomPrice}`;
        });

        return res.status(200).send(prices);
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { fetchData };
