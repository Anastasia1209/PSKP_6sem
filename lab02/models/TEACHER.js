module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TEACHER', {
    TEACHER: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    TEACHER_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PULPIT: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      references: {
        model: 'PULPIT',
        key: 'PULPIT'
      }
    }
  }, {
    sequelize,
    tableName: 'TEACHER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TEACHER" },
        ]
      },
      {
        name: "FK_TEACHER_PULPIT",
        using: "BTREE",
        fields: [
          { name: "PULPIT" },
        ]
      },
    ]
  });
};
