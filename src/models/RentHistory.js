module.exports = (sequelize, DataTypes) => {
  const RentStatus = sequelize.define('RentHistory', {
    serial_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })

  return RentStatus
}