import { ZodError } from "zod";
const e = new ZodError([]);
console.log("Has issues:", "issues" in e);
console.log("Has errors:", "errors" in e);
console.log("Keys:", Object.keys(e));
console.log("Prototype keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(e)));
