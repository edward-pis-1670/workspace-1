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
      allowNull: true,
    },
    coverphoto: {
      type: Sequelize.STRING,
      defaultValue: "https://storage.googleapis.com/fake_api_course/course-photos/course-image.png",
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
      defaultValue: [],
    },
    needtoknow: {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    },
    willableto:{
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    },
    level:{
      type:Sequelize.INTEGER,
      defaultValue:0
    }
  });
  return course;
};
