const prisma = require("../../global/prisma");

const createDataKeuangan = async (id_profile, data) => {
  return prisma.dataKeuangan.create({
    data: {
      id_profile,
      labaKotor: data.labaKotor,
      bayarGaji: data.bayarGaji || 0,
      bayarAir: data.bayarAir || 0,
      biayaListrik: data.biayaListrik || 0,
      biayaTransport: data.biayaTransport || 0,
      biayaPromosi: data.biayaPromosi || 0,
      biayaPackaging: data.biayaPackaging || 0,
      biayaPajak: data.biayaPajak || 0,
    },
  });
};

const getHistory = async (id_profile, dateTime) => {
  const [month, year] = dateTime.split("-");

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const result = await prisma.dataKeuangan.findMany({
    where: {
      id_profile,
      dateAdded: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (result.length === 0) {
    throw new Error("Tidak ada data");
  }

  return result;
};

const getHistoryDetails = async (id_profile, id_data) => {
  const idProfile = parseInt(id_profile, 10);
  const idData = parseInt(id_data, 10);
  if (isNaN(idProfile) || isNaN(idData)) {
    throw new Error("Invalid parameter values");
  }
  return prisma.dataKeuangan.findUnique({
    where: {
      id: idData,
      id_profile: idProfile,
    },
  });
};

module.exports = { createDataKeuangan, getHistory, getHistoryDetails };
