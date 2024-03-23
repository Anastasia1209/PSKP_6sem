module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FACULTY', {
    FACULTY: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    FACULTY_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FACULTY',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "FACULTY" },
        ]
      },
    ]
  });

};
