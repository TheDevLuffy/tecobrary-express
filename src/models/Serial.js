module.exports = (sequelize, DataTypes) => {
  const Serial = sequelize.define('Serial', {
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
   }, {
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })

  return Serial
}