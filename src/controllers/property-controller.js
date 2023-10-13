const { propertyService } = require("@services");
const { dataConfig } = require("@config");

const createProperty = async (req, res) => {
  const { body } = req;
  const { message, error } = await propertyService.createProperty(body);
  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
  return res.status(201).send({ success: true, message });
};

const updateProperty = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const { message, error } = await propertyService.updateProperty(id, body);
  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
  return res.status(200).send({ success: true, message });
};

const deleteProperty = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { message, error } = await propertyService.deleteProperty(id);
  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
  return res.status(200).send({ success: true, message });
};

const getPropertyById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { property, error } = await propertyService.getPropertyById(id);
  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
  if (!property) {
    return res.status(404).send({
      success: false,
      error: "Property not found",
    });
  }
  return res.status(200).send({ success: true, property });
};

const getAllProperties = async (req, res) => {
  const { query } = req;
  const page = parseInt(query.page) || dataConfig.page;
  const limit = parseInt(query.limit) || dataConfig.limit;
  const sort = query.sort || dataConfig.sort;
  const search = query.search || "";

  const { properties, error } = await propertyService.getProperties(
    page,
    limit,
    search,
    sort
  );

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(200).send({ success: true, properties });
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
