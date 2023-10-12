/* eslint-disable operator-linebreak */
const { landlordService } = require("@services");
const { dataConfig } = require("@config");

const registerUserAsLandlord = async (req, res) => {
  const {
    params: { userId },
  } = req;

  const { message, error } = await landlordService.registerUserAsLandlord(
    userId
  );

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(201).send({ success: true, message });
};

const createLandlord = async (req, res) => {
  const { body } = req;
  const { message, error } = await landlordService.createLandlord(body);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(201).send({ success: true, message });
};

const deleteLandlord = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { message, error } = await landlordService.deleteLandlord(id);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(200).send({ success: true, message });
};

const getLandlordById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { landlord, error } = await landlordService.getLandlordById(id);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!landlord) {
    return res
      .status(404)
      .send({ success: false, message: "Landlord not found" });
  }

  return res.status(200).send({ success: true, landlord });
};

const addPropertyToLandlord = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const { landlord, error: landlordError } =
    await landlordService.getLandlordById(id);

  if (landlordError) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!landlord) {
    return res
      .status(404)
      .send({ success: false, message: "Landlord not found" });
  }

  const { message, error } = await landlordService.addPropertyToLandlord(
    landlord,
    body
  );

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(200).send({ success: true, message });
};

const removePropertyFromLandlord = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const { landlord, error: landlordError } =
    await landlordService.getLandlordById(id);

  if (landlordError) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!landlord) {
    return res
      .status(404)
      .send({ success: false, message: "Landlord not found" });
  }

  const { message, error } = await landlordService.removePropertyFromLandlord(
    landlord,
    body
  );

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(200).send({ success: true, message });
};

const getAllLandlords = async (req, res) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.limit;
    const sort = query.sort || dataConfig.sort;
    const search = query.search || "";

    const landlords = await landlordService.getLandlords(
      page,
      limit,
      search,
      sort
    );

    res.status(200).send({ success: true, landlords });
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
  registerUserAsLandlord,
  deleteLandlord,
  createLandlord,
  addPropertyToLandlord,
  removePropertyFromLandlord,
};
