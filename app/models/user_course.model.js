module.exports = (sequelize, Sequelize) => {
    const learning = sequelize.define(
      "user_courses",
      {
        _id: {
          type: Sequelize.INTEGER,
          autoIncrement: true, //
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        courseId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return learning;
  };
  