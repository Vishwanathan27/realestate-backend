const { landlordService } = require("@services");
const { dataConfig } = require("@config");

const createLandlord = async (req, res) => {
  try {
    const { body } = req;
    const landlord = await landlordService.createLandlord(body);

    res.status(201).send({ success: true, landlord });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updateLandlord = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const landlord = await landlordService.updateLandlord(id, body);

    res.status(200).send({ success: true, landlord });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteLandlord = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const landlord = await landlordService.deleteLandlord(id);

    res.status(200).send({ success: true, landlord });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getLandlordById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const landlord = await landlordService.getLandlordById(id);

    res.status(200).send({ success: true, landlord });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getAllLandlords = async (req, res) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.limit;
    const sort = query.sort || dataConfig.sort;
    const search = query.search || "";

    const properties = await landlordService.getProperties(
      page,
      limit,
      search,
      sort
    );

    res.status(200).send({ success: true, properties });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllLandlords,
  getLandlordById,
  createLandlord,
  updateLandlord,
  deleteLandlord,
};
