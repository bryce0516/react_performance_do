const person = {
  firstName: "hyesung",
  lastName: "park",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};

person.fullName = "hyemin Jeon";
console.log(person);

console.log(person.fullName);

let desciptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log("desciptor", desciptor);

desciptor = Object.getOwnPropertyDescriptor(person, "fullName");

console.log("desciptor for fullname", desciptor);
