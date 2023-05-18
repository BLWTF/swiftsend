import Country from "./country";
import State from "./state";
import City from "./city";
import Customer from "./customer";
import User from "./user";
import Package from "./package";

Country.hasMany(State, { foreignKey: "country_id", as: "state" });
State.belongsTo(Country, { foreignKey: "country_id", as: "country" });

State.hasMany(City, { foreignKey: "state_id", as: "city" });
City.belongsTo(State, { foreignKey: "state_id", as: "state" });

User.hasOne(Customer);
Customer.belongsTo(User);

Customer.belongsTo(City, { as: "city" });
City.hasMany(Customer, { as: "customer" })

Customer.hasMany(Package, { as: "sentPackages", foreignKey: "fromCustomerId" });
Customer.hasMany(Package, { as: "receivedPackages", foreignKey: "toCustomerId" });

Package.belongsTo(Customer, { as: "sender", foreignKey: "fromCustomerId" });
Package.belongsTo(Customer, { as: "receiver", foreignKey: "toCustomerId" });

export { User, Country, State, City };
