module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AUDITORIUM_TYPE', {
    AUDITORIUM_TYPE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    AUDITORIUM_TYPENAME: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'AUDITORIUM_TYPE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AUDITORIUM_TYPE" },
        ]
      },
    ]
  });
};
