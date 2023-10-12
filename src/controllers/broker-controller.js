const { brokerService } = require("@services");
const { dataConfig } = require("@config");

const registerUserAsBroker = async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;

    const broker = await brokerService.registerUserAsBroker(userId);

    res.status(201).send({ success: true, broker });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const createBroker = async (req, res) => {
  try {
    const { body } = req;
    const broker = await brokerService.createBroker(body);

    res.status(201).send({ success: true, broker });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteBroker = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const broker = await brokerService.deleteBroker(id);

    res.status(200).send({ success: true, broker });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getBrokerById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const broker = await brokerService.getBrokerById(id);

    res.status(200).send({ success: true, broker });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addPropertyToBroker = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const broker = await brokerService.addPropertyToBroker(id, body);

    res.status(200).send({ success: true, broker });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const removePropertyFromBroker = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const broker = await brokerService.removePropertyFromBroker(id, body);

    res.status(200).send({ success: true, broker });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
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
