module.exports = (sequelize, Sequelize) => {
  const course = sequelize.define("courses", {
    _id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coverphoto: {
      type: Sequelize.STRING,
      defaultValue: "/images/course-image.png",
    },
    previewvideo: {
      type: Sequelize.STRING,
    },
    cost: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    revenue: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    star: {
      type: Sequelize.INTEGER,
    },
    review: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    public: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    numberofstudent: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    numberofreviews: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    targetstudent: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    needtoknow: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    willableto:{
      type: Sequelize.JSON,
      allowNull: true,
    }
  });
  return course;
};
