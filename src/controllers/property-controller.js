const { propertyService } = require("@services");
const { dataConfig } = require("@config");

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
};
