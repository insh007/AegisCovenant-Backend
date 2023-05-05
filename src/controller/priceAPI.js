const fetchData = async function (req, res) {
    try {
        const { Source, Destination, Date } = req.body;

        // Perform any necessary input validation
        if (!Source || !Destination || !Date) {
            return res.status(400).send({ status: false, error: 'Missing required parameters' });
        }

        const airlines = ['indigo', 'airAsia', 'vistara'];
        const prices = {};

        airlines.forEach((airline) => {
            const minPrice = 1000; // Minimum price
            const maxPrice = 5000; // Maximum price
            const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
            prices[airline] = `₹${randomPrice}`;
        });

        return res.status(200).send(prices);
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { fetchData };
