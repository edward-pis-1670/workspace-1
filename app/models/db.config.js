const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully");
} catch (error) {
  console.log("Connection failed");
}

let db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require("./course.model.js")(sequelize, Sequelize);
db.subGenres = require("./subGenre.model.js")(sequelize, Sequelize);
db.genres = require("./genre.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);
db.lectures = require("./lecture.model.js")(sequelize, Sequelize);
db.wishlists = require("./wishlist.model")(sequelize,Sequelize)
db.userCourse = require('./user_course.model')(sequelize,Sequelize)

db.genres.hasMany(db.subGenres, {
  foreignKey: "genreId",
  as: "subgenres",
});

db.subGenres.belongsTo(db.genres, {
  foreignKey: "genreId",
  as: "subgenres1",
});

db.lectures.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "lectures1",
});

db.courses.hasMany(db.lectures, {
  foreignKey: "courseId",
  as: "lectures",
});


db.reviews.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.reviews, {
  foreignKey: "userId",
  as: "Review_User",
});

db.users.belongsToMany(db.courses, {
  foreignKey: "userId",
  through: "user_courses",
  timestamps: false,
  as: "mylearningcourses",
});

db.courses.belongsToMany(db.users, {
  foreignKey: "courseId",
  through: "user_courses",
  timestamps: false,
  as: "Student",
});

db.users.belongsToMany(db.courses, {
  foreignKey: "userId",
  through: "wishlists",
  timestamps: false,
  as: "isWishlist",
});

db.courses.belongsToMany(db.users, {
  foreignKey: "courseId",
  through: "wishlists",
  timestamps: false,
  as: "mywishlist",
});



db.courses.belongsTo(db.subGenres, {
  foreignKey: "subGenreId",
  as: "subgenre",
  ondelete:"CASCADE",
  onupdate: "CASCADE"
});

db.subGenres.hasMany(db.courses, {
  foreignKey: "subGenreId",
  as: "subgenre",
  ondelete:"CASCADE",
  onupdate: "CASCADE"
});

db.courses.belongsTo(db.users, {
  foreignKey: "userId",
  as: "lecturer",
});

db.users.hasMany(db.courses, {
  foreignKey: "userId",
  as: "lecturer",
});

db.genres.hasMany(db.courses, {
  foreignKey: "genreId",
  as: "genre",
  ondelete:"CASCADE",
  onupdate: "CASCADE"
});

db.courses.belongsTo(db.genres, {
  foreignKey: "genreId",
  as: "genre",
  ondelete:"CASCADE",
  onupdate: "CASCADE"
});

db.courses.hasMany(db.reviews, {
  foreignKey: "courseId",
  as: "post",
});

db.reviews.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "comment",
});

db.users;

module.exports = db;
