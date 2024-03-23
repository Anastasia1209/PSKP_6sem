module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AUDITORIUM', {
    AUDITORIUM: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    AUDITORIUM_NAME: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    AUDITORIUM_CAPACITY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AUDITORIUM_TYPE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      references: {
        model: 'AUDITORIUM_TYPE',
        key: 'AUDITORIUM_TYPE'
      }
    }
  }, {
    sequelize,
    tableName: 'AUDITORIUM',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AUDITORIUM" },
        ]
      },
      {
        name: "AUDITORIUM_AUDITORIUM_TYPE_AUDITORIUM_TYPE_fk",
        using: "BTREE",
        fields: [
          { name: "AUDITORIUM_TYPE" },
        ]
      },
    ]
  });
};
