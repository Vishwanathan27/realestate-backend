const { propertyService } = require("@services");
const { dataConfig } = require("@config");

const createProperty = async (req, res) => {
  try {
    const { body } = req;
    const property = await propertyService.createProperty(body);

    res.status(201).send({ success: true, property });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const property = await propertyService.updateProperty(id, body);

    res.status(200).send({ success: true, property });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const property = await propertyService.deleteProperty(id);

    res.status(200).send({ success: true, property });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const property = await propertyService.getPropertyById(id);

    res.status(200).send({ success: true, property });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.limit;
    const sort = query.sort || dataConfig.sort;
    const search = query.search || "";

    const properties = await propertyService.getProperties(
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
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
