module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SUBJECT', {
    SUBJECT: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    SUBJECT_NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
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
    tableName: 'SUBJECT',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SUBJECT" },
        ]
      },
      {
        name: "FK_SUBJECT_PULPIT",
        using: "BTREE",
        fields: [
          { name: "PULPIT" },
        ]
      },
    ]
  });
};
