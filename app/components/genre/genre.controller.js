const db = require("../../models/db.config");

const Genre = db.genres;
const Subgenre = db.subGenres;

exports.getAllGenre = async (req, res) => {
  const genres = await Genre.findAll({
    include: {
      model: Subgenre,
      as: "subgenres",
    },
  });
  console.log(typeof genres)
  res.json(JSON.stringify(genres));
};
