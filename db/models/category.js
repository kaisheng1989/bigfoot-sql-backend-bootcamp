"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.sighting, { through: "sightingCategories" });
    }
  }
  /*The static associate method is used to define associations between models. In this case, the "category" model has a many-to-many association with the "sighting" model using a junction table named "sightingCategories." This means that a category can be associated with multiple sightings, and a sighting can be associated with multiple categories. The belongsToMany method sets up this many-to-many relationship. */
  category.init(
    {
      name: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },

    /**The category.init() method initializes the model with its attributes and options. Here's what each attribute does:

name: DataTypes.STRING: This defines the "name" attribute as a string data type.
createdAt and updatedAt: These are timestamp fields that get automatically populated with the creation and update timestamps when a new record is created or updated.
The second argument of category.init() is an options object with two properties:

sequelize: This property specifies the Sequelize instance, which is used to connect the model to the database.
modelName: "category": This sets the model name to "category." The underscored: true option indicates that you want the table name to be in snake_case ("categories" in this case). */
    {
      sequelize,
      modelName: "category",
      underscored: true,
    }
  );
  return category;
};
