module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PULPIT', {
    PULPIT: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    PULPIT_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FACULTY: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      references: {
        model: 'FACULTY',
        key: 'FACULTY'
      }
    }
  }, {
    sequelize,
    tableName: 'PULPIT',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PULPIT" },
        ]
      },
      {
        name: "FK_PULPIT_FACULTY",
        using: "BTREE",
        fields: [
          { name: "FACULTY" },
        ]
      },
    ]
  });
};
