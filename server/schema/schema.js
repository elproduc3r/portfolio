const {
  GraphQLObjectType, 
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');
const Interview = require('../models/Interview.js');
const Client = require('../models/Client.js');

const InterviewType = new GraphQLObjectType({
  name: 'Interview',
  fields: () => ({
    id: {type: GraphQLID},
    clientId: {type: GraphQLString},
    name: {type: GraphQLString},
    type: {type: GraphQLString},
    status: {type: GraphQLString},
    time: {type: GraphQLString},
    date: {type: GraphQLString},
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
    interviews: {
      type: new GraphQLList(InterviewType),
      resolve(parent, args) {
        return Interview.find();
      },
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    interview: {
      type: InterviewType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Interview.findById(args.id);
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
        person: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve (parent, args) {
        const {name, email, person} = args;
        const client = new Client({
          name,
          email,
          person,
        })
        return client.save();
      },
    },
    addInterview: {
      type: InterviewType,
      args: {
        type: {type: GraphQLNonNull(GraphQLString)},
        status: {
          type: new GraphQLEnumType({
            name: 'InterviewStatus',
            values: {
              'upcoming': {value: 'upcoming'},
              'completed': {value: 'completed'},
            },
          }),
          defaultValue: 'upcoming',
        },
        time: {type: GraphQLNonNull(GraphQLString)},
        date: {type: GraphQLNonNull(GraphQLString)},
        clientId: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve (parent, args) {
        const {clientId, type, status, time, date} = args;
        const interview = new Interview({
          clientId,
          type,
          time,
          date,
          status,
        });
        return interview.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    deleteInterview: {
      type: InterviewType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Interview.findByIdAndRemove(args.id);
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        person: {type: GraphQLString},
      },
      resolve(parent, args){
        const {id, name, person, email} = args;
        return Client.findByIdAndUpdate(args.id, {
          $set: {
            name,
            person,
            email
          }
        },
        {
          new: true
        });
      },
    },
    updateInterview: {
      type: InterviewType,
      args: {
        id: {type: GraphQLID},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        date: {type: GraphQLString},
        clientId: {type: GraphQLID},
        status: {
          type: new GraphQLEnumType({
            name: 'InterviewStatusUpdate',
            values: {
              'upcoming': {value: 'upcoming'},
              'completed': {value: 'completed'},
            },
          }),
        },
      },
      resolve(parent, args){
        const {id, type, time, status, clientId} = args;
        return Interview.findByIdAndUpdate(args.id, {
          $set: {
            id,
            type,
            status,
            time,
            date,
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
