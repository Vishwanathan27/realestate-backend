/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
const { Property } = require("@models");

module.exports = {
  async createProperty(property) {
    try {
      await Property.create(property);
      return { message: "Created Successfully" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async updateProperty(id, property) {
    try {
      await Property.findByIdAndUpdate(id, property, { new: true });
      return { message: "Updated Successfully" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async deleteProperty(id) {
    try {
      await Property.findByIdAndRemove(id);
      return { message: "Successfully Deleted" };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async getPropertyById(id) {
    try {
      const property = await Property.findById(id);
      return { property };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async getProperties(
    page = 1,
    itemsPerPage = 10,
    searchTerm = "",
    sort = { _id: -1 }
  ) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      let query = {};
      if (searchTerm) {
        query = {
          $text: {
            $search: searchTerm,
          },
        };
      }
      const properties = await Property.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      return { properties };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  async provideUnitsToUser(property, sqFt) {
    try {
      const { units } = property;

      const matchingUnits = units.filter((unit) => unit.squareFeet <= sqFt);

      if (matchingUnits.length === 0) {
        return [];
      }

      matchingUnits.sort((a, b) => {
        // First, sort by plotNumber in ascending order
        if (a.plotNumber < b.plotNumber) return -1;
        if (a.plotNumber > b.plotNumber) return 1;
        // If plotNumbers are the same, sort by floor in ascending order
        if (a.plotNumber === b.plotNumber) {
          if (a.floor < b.floor) return -1;
          if (a.floor > b.floor) return 1;
        }
        return 0;
      });

      const { selUnits: selectedUnits, totalSqFeet: totalSquareFeet } =
        matchingUnits.reduce(
          ({ selUnits, totalSqFeet }, unit) => {
            if (totalSqFeet + unit.squareFeet <= sqFt) {
              selUnits.push(unit);
              totalSqFeet += unit.squareFeet;
            }
            return { selUnits, totalSqFeet };
          },
          { selUnits: [], totalSqFeet: 0 }
        );

      if (
        selectedUnits.reduce((total, unit) => total + unit.squareFeet, 0) ===
        sqFt
      ) {
        return { selectedUnits };
      }

      return [];
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};
