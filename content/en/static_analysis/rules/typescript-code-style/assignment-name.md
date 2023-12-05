---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-code-style/assignment-name
  language: TypeScript
  severity: Notice
title: Assigment name should use camelCase
---
## Metadata
**ID:** `typescript-code-style/assignment-name`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that variables and properties names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```typescript
var a = {
    MyProp: "should be camelCase",
    #Priv: 2,
};
const my_var = {};
let FooBar = {};
const { a_b, ...Bla } = c;
const [a_b, ...Bla] = c;

```

## Compliant Code Examples
```typescript
/* The BenefitsDAO must be constructed with a connected database object */
function BenefitsDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof BenefitsDAO)) {
        console.log("Warning: BenefitsDAO constructor called without 'new' operator");
        return new BenefitsDAO(db);
    }

    const usersCol = db.collection("users");
    const UsersCol = db.collection("users");
    const {foo_bar} = bla;
    this.getAllNonAdminUsers = callback => {
        usersCol.find({
            "isAdmin": {
                $ne: true
            }
        }).toArray((err, users) => callback(null, users));
    };

    this.updateBenefits = (userId, startDate, callback) => {
        usersCol.update({
                _id: parseInt(userId)
            }, {
                $set: {
                    benefitStartDate: startDate
                }
            },
            (err, result) => {
                if (!err) {
                    console.log("Updated benefits");
                    return callback(null, result);
                }

                return callback(err, null);
            }
        );
    };
}

module.exports = { BenefitsDAO };
```

```typescript
const a = { myProp: "", #priv: 1 };
const myVar = {};
const { a } = c;
const { a, ...b } = c;
const [a, ...b] = c;
process.env.PCKG_OS_NAME;
const md5 = 'foo';
const PCKG_OS_NAME = 'foo';
```
