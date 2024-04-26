const express = require('express')
const app = express()
const cors = require('cors')

const port = 3100;
const musikRoutes = require('./routes/musikRoutes')


app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use('/ressources', express.static('ressources'))

app.get("/", (req, res) => {
    res.json({
        message: "Vous êtes dans le back nodeJS"
    })
})

app.use('/users', musikRoutes)
// const server = https.createServer(options, app);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


