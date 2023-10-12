const { brokerService } = require("@services");
const { dataConfig } = require("@config");

const registerUserAsBroker = async (req, res) => {
  const {
    params: { userId },
  } = req;

  const { message, error } = await brokerService.registerUserAsBroker(userId);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(201).send({ success: true, message });
};

const createBroker = async (req, res) => {
  const { body } = req;
  const { message, error } = await brokerService.createBroker(body);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(201).send({ success: true, message });
};

const deleteBroker = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { message, error } = await brokerService.deleteBroker(id);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.status(200).send({ success: true, message });
};

const getBrokerById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { broker, error } = await brokerService.getBrokerById(id);

  if (error) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!broker) {
    return res
      .status(404)
      .send({ success: false, message: "Broker not found" });
  }

  return res.status(200).send({ success: true, broker });
};

const addPropertyToBroker = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const { broker, error: brokerError } = await brokerService.getBrokerById(id);

  if (brokerError) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!broker) {
    return res
      .status(404)
      .send({ success: false, message: "Broker not found" });
  }

  const { message, error } = await brokerService.addPropertyToBroker(
    broker,
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

const removePropertyFromBroker = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const { broker, error: brokerError } = await brokerService.getBrokerById(id);

  if (brokerError) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!broker) {
    return res
      .status(404)
      .send({ success: false, message: "Broker not found" });
  }

  const { message, error } = await brokerService.removePropertyFromBroker(
    broker,
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

const getAllBrokers = async (req, res) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.limit;
    const sort = query.sort || dataConfig.sort;
    const search = query.search || "";

    const brokers = await brokerService.getBrokers(page, limit, search, sort);

    res.status(200).send({ success: true, brokers });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllBrokers,
  getBrokerById,
  registerUserAsBroker,
  deleteBroker,
  createBroker,
  addPropertyToBroker,
  removePropertyFromBroker,
};
