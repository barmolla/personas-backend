const mongoose     = require('mongoose')
const port         = 8081;
const express      = require('express')
const app          = express()

// middlewares
const bodyParser   = require('body-parser')
const cors         = require('cors')
//const authValid    = require('./middleware/auth-validation')
// routes
const peopleRoutes   = require('./route/person')
const projectRoutes  = require('./route/project') 
const providerRoutes = require('./route/provider')
const roleRoutes     = require('./route/role')
const superiorRoutes = require('./route/superior') 

const { ApolloServer } = require('apollo-server-express')
const bookSchema   = require('./graphql/schema/bookSchema')
const roleSchema   = require('./graphql/schema/roleSchema')
const bookResolver = require('./graphql/resolver/bookResolver')
const roleResolver = require('./graphql/resolver/roleResolver')

app.use(cors())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: [bookSchema, roleSchema],
    resolvers: [bookResolver, roleResolver],
    /*formatError: error => {
      // remove the internal sequelize error message
      // leave only the important validation error
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');
  
      return {
        ...error,
        message,
      };
    },
    context: async ({ req, connection }) => {
      if (connection) {
        return {
          models,
          loaders: {
            user: new DataLoader(keys =>
              loaders.user.batchUsers(keys, models),
            ),
          },
        };
      }
  
      if (req) {
        const me = await getMe(req);
  
        return {
          models,
          me,
          secret: process.env.SECRET,
          loaders: {
            user: new DataLoader(keys =>
              loaders.user.batchUsers(keys, models),
            ),
          },
        };
      }
    },*/
  });
  
server.applyMiddleware({ app, path: '/graphql' });

mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost:27017/personas')
    .then(() => {
        console.log("La conexión a la base de datos personas se ha realizado correctamente")
        app.listen(port, () => console.log("servidor corriendo en http://localhost:8081"))
    })
    .catch(err => console.log(err));

[peopleRoutes, projectRoutes,
 providerRoutes, roleRoutes,
 superiorRoutes].forEach(r => {
     //app.use('/api/v1/', authValid, r)
     app.use('/api/v1/', r)
 })