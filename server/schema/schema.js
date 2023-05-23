const {
  GraphQLObjectType, 
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');
const Project = require('../models/Project.js');
const Client = require('../models/Client.js');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLID},
    clientId: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString},
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      }
    }
  })
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve (parent, args) {
        const {name, email, phone} = args;
        const client = new Client({
          name,
          email,
          phone,
        })
        return client.save();
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              'new': {value: 'Not Started'},
              'progress': {value: 'In Progress'},
              'completed': {value: 'Complete'},
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve (parent, args) {
        const {clientId, name, description, status} = args;
        const project = new Project({
          clientId,
          name,
          description,
          status,
        });
        return project.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
      },
      resolve(parent, args){
        const {id, name, phone, email} = args;
        return Client.findByIdAndUpdate(args.id, {
          $set: {
            name,
            phone,
            email
          }
        },
        {
          new: true
        });
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        clientId: {type: GraphQLID},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              'new': {value: 'Not Started'},
              'progress': {value: 'In Progress'},
              'completed': {value: 'Complete'},
            },
          }),
        },
      },
      resolve(parent, args){
        const {id, name, description, status, clientId} = args;
        return Project.findByIdAndUpdate(args.id, {
          $set: {
            id,
            name,
            description,
            status,
            clientId,
          }
        },
        {
          new: true
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
