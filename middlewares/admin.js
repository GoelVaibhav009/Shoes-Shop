const User = require('../models/User')

module.exports = {
    adminAccess: async (req, res, next) => {
    let user = await User
      if (req.user.adminUser) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }