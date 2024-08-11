const Customer = require("../../models/Customer");
const PullList = require("../../models/PullList");
const Series = require("../../models/Series");
const Comics = require("../../models/Comic");

const customer_resolvers = {
  Query: {
    // fetch all customers
    async customers(parent, args, context, info) {
      try {
        const customers = await Customer.find().populate("pullList");
        return customers;
      } catch (error) {
        console.log("error fetcing customers");
      }
    },

    async customer(parent, { id }, context, info) {
      try {
        const customer = await Customer.findById(id).populate("pullList");
        if (!customer) {
          console.log("no customer found by that id");
        }
        return customer;
      } catch (error) {
        console.log("error retriving customer");
      }
    },
  },

  Customer: {
    async PullList(customer) {
      try {
        const pullList = await PullList.findById(customer.pullList).populate(
          "comics"
        );
        if (!pullList) {
          console.log("could not find pull list for this customer");
        }
        return pullList;
      } catch (error) {
        console.log("server Error retriving pull list");
      }
    },
  },
};

module.exports = customer_resolvers;
