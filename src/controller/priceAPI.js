/*
Note: Due to the unavailability of a suitable API to mimic the required output, the data has been randomly generated to match the expected output.
Additionally, as a personal choice, I have created a frontend for this project as mentioned in the assignment.
Furthermore, for the implementation of authentication and user data storage, I have utilized MongoDB, thereby transforming this project into a MERN stack application.

we can use axios like this:
    axios.get('https://dummy/data');
*/


/**
 * Fetches flight prices for a given source, destination, and date
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.query.Source - Source city code
 * @param {string} req.query.Destination - Destination city code
 * @param {string} req.query.Date - Departure date
 *
 * @returns {Object} Object containing airline prices
 * @throws {Object} Error object containing message property if any error occurs
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
            const randomPrice = Source == Destination ? 0 : Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
            prices[airline] = `₹${randomPrice}`;
        });

        return res.status(200).send(prices);
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { fetchData };
