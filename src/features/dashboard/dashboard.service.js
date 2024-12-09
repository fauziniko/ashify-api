const prisma = require('../../global/prisma');
const axios = require('axios');

const getDashboardData = async (id_profile, monthYear) => {
    const [month, year] = monthYear.split('-').map(Number);

    if (!month || !year) {
        throw new Error("Invalid date format. Please use MM-YYYY.");
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const dataKeuangan = await prisma.dataKeuangan.findMany({
        where: {
            id_profile: parseInt(id_profile),
            dateAdded: {
                gte: startDate,
                lte: endDate
            }
        }
    });

    if (!dataKeuangan.length) {
        return {
            revenue: 0,
            expenses: 0,
            net_margin: 0,
            net_balance: 0,
            hasil_prediksi: "Tidak ada prediksi pada bulan ini"
        };
    }

    const totals = dataKeuangan.reduce((acc, item) => {
        acc.labaKotor += item.labaKotor || 0;
        acc.bayarGaji += item.bayarGaji || 0;
        acc.bayarAir += item.bayarAir || 0;
        acc.biayaListrik += item.biayaListrik || 0;
        acc.biayaTransport += item.biayaTransport || 0;
        acc.biayaPromosi += item.biayaPromosi || 0;
        acc.biayaPackaging += item.biayaPackaging || 0;
        acc.biayaPajak += item.biayaPajak || 0;
        return acc;
    }, {
        labaKotor: 0,
        bayarGaji: 0,
        bayarAir: 0,
        biayaListrik: 0,
        biayaTransport: 0,
        biayaPromosi: 0,
        biayaPackaging: 0,
        biayaPajak: 0
    });

    const { labaKotor, bayarGaji, bayarAir, biayaListrik, biayaTransport, biayaPromosi, biayaPackaging, biayaPajak } = totals;

    const mlResponse = await axios.post('http://localhost:8080/process', {
        labaKotor,
        bayarGaji,
        bayarAir,
        biayaListrik,
        biayaTransport,
        biayaPromosi,
        biayaPackaging,
        biayaPajak
    });

    const { prediction, revenue, expenses, net_margin, net_balance } = mlResponse.data;

    await prisma.dashboardData.upsert({
        where: {
            id_profile: parseInt(id_profile)
        },
        update: {
            revenue,
            expenses,
            net_margin,
            net_balance,
            hasilPrediksi: prediction,
            updatedAt: new Date()
        },
        create: {
            id_profile: parseInt(id_profile),
            revenue,
            expenses,
            net_margin,
            net_balance,
            hasilPrediksi: prediction
        }
    });

    return {
        revenue,
        expenses,
        net_margin,
        net_balance,
        hasil_prediksi: prediction
    };
};

module.exports = { getDashboardData };
