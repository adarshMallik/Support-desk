const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

//creating a post method
// router.post('/', (req,res) => {
//     res.send('Register Route')
// })
router.post('/', registerUser)
router.post('/login', loginUser)
//to authorize a route we need to add the authorization function as the second element 
router.get('/me',protect,getMe )



module.exports = router