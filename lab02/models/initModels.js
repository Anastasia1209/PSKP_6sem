const DataTypes = require("sequelize").DataTypes;
const {Op} = require("sequelize");
const _AUDITORIUM = require("./AUDITORIUM");
const _AUDITORIUM_TYPE = require("./AUDITORIUM_TYPE");
const _FACULTY = require("./FACULTY");
const _PULPIT = require("./PULPIT");
const _SUBJECT = require("./SUBJECT");
const _TEACHER = require("./TEACHER");

function initModels(sequelize) {
  const AUDITORIUM = _AUDITORIUM(sequelize, DataTypes);
  const AUDITORIUM_TYPE = _AUDITORIUM_TYPE(sequelize, DataTypes);
  const FACULTY = _FACULTY(sequelize, DataTypes);
  const PULPIT = _PULPIT(sequelize, DataTypes);
  const SUBJECT = _SUBJECT(sequelize, DataTypes);
  const TEACHER = _TEACHER(sequelize, DataTypes);

  AUDITORIUM.addScope('capacityRange', {
    where: {
      AUDITORIUM_CAPACITY: {
        [Op.between]: [10, 60]
      }
    }
  });

  FACULTY.addHook('beforeCreate','bcf',()=>{
    console.log("Before Create")
  });

  FACULTY.addHook('afterCreate','acf',()=>{
    console.log("After Create")
  });

  AUDITORIUM.belongsTo(AUDITORIUM_TYPE, { as: "AUDITORIUM_TYPE_AUDITORIUM_TYPE", foreignKey: "AUDITORIUM_TYPE"});
  AUDITORIUM_TYPE.hasMany(AUDITORIUM, { as: "AUDITORIa", foreignKey: "AUDITORIUM_TYPE"});
  PULPIT.belongsTo(FACULTY, { as: "FACULTY_FACULTY", foreignKey: "FACULTY"});
  FACULTY.hasMany(PULPIT, { as: "PULPITs", foreignKey: "FACULTY"});
  SUBJECT.belongsTo(PULPIT, { as: "PULPIT_PULPIT", foreignKey: "PULPIT"});
  PULPIT.hasMany(SUBJECT, { as: "SUBJECTs", foreignKey: "PULPIT"});
  TEACHER.belongsTo(PULPIT, { as: "PULPIT_PULPIT", foreignKey: "PULPIT"});
  PULPIT.hasMany(TEACHER, { as: "TEACHERs", foreignKey: "PULPIT"});

  return {
    AUDITORIUM,
    AUDITORIUM_TYPE,
    FACULTY,
    PULPIT,
    SUBJECT,
    TEACHER,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
