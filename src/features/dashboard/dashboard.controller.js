const { getDashboardData } = require('./dashboard.service');

const getDashboard = async (req, res) => {
    try {
        const { id_profile } = req.params;
        const { monthYear } = req.body;

        if (!id_profile || !monthYear) {
            return res.status(400).json({ error: "id_profile and monthYear are required" });
        }

        const result = await getDashboardData(id_profile, monthYear);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
};

module.exports = { getDashboard };
