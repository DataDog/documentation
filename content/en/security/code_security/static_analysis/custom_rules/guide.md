---
description: A complete guide to writing custom rules for Datadog.
title: Static Code Analysis Custom Rule Guide
---

This guide builds on the [Static Analysis Custom Rules Tutorial][1], providing a full description of how to write custom rules, along with tips, tricks, and common pitfalls to avoid.

## Overview

A static analyzer rule consists of three parts: a Tree-sitter query to find relevant code constructs, a JavaScript function to analyze the code and generate findings, and tests that verify the rule works correctly.

When you run a static analysis, the analyzer takes each file in your code repository, checks its filename extension to determine its language, parses the file with Tree Sitter, and then executes the rules for that language.

To execute a rule, the analyzer queries the generated parse tree using the [Tree Sitter query][3] provided by the rule. This yields zero or more Tree Sitter nodes. Then, for each node, the analyzer executes the `visit()` function from the rule's JavaScript code. This function may call `addError()` to generate findings for that rule.

## The Tree Sitter Query

A query contains one or more patterns, where each pattern is an expression that declares the shape of the nodes it matches. The query engine walks the parse tree looking for nodes that match the pattern and returns each occurrence.

### Node patterns

The basic pattern consists of a node type between parentheses. This pattern matches all nodes that belong to that type.

The following example shows a query that matches nodes of type `func-decl`:

```scheme
(func-decl)
```

You can add patterns after the node type and before the closing parenthesis. The resulting pattern will match nodes with children that match those patterns.

```scheme
(func-decl (arg-list) (body))
```

This example matches nodes of type `func-decl` containing a node of type `arg-list`, followed by a node of type `body`, possibly with other nodes in between. In the following parse tree, this query would match the subtrees outlined in blue, but not the subtree outlined in orange.

{{< img src="/security/code_security/custom_rule_guide_parse_trees.png" alt="An example parse tree with two examples highlighted." style="height:20em;" >}}

You can nest child patterns as deep as you need.

```scheme
(func-decl
  (arg-list
    (argument)
  )
  (body
    (statement
      (function-call)
    )
  )
)
```

As you see, you can add white space and line breaks to your Tree Sitter query. You can adjust them to make your query more readable. You can also add comments, which start with a semicolon and run to the end of the line.

```scheme
; Another way to format the previous example
(func-decl
  (arg-list (argument)) ; The arg-list contains at least one argument
  (body
    (statement (function-call)) ; The body contains a function call
  )
)
```

You can use periods (`.`) to specify that two sibling nodes must appear together; otherwise, they will match even if there are other nodes between them. You can also use periods to specify that a node must be the first or last child.

```scheme
(func-decl (arg-list) . (body))
; The `func-decl` contains an `arg-list` followed immediately by a `body`.

(func-decl . (body))
; The first child of the `func-decl` is a `body`.

(func-decl (return-type) . )
; The last child of the `func-decl` is a `return-type`.
```

Some nodes have fields, which you can match by specifying the field's name, a colon, and then a pattern for the content of the field.

```scheme
(unary-operator
  operand: (identifier))
; Matches `unary-operator` nodes with a field `operand`
; that contains an `identifier`
```

You can also match nodes that lack a field by specifying an exclamation point (`!`) followed by the field's name.

```scheme
(if-statement
  !else)
; Matches an `if-statement` that doesn't have an `else` field.
```

So far we've seen "named nodes", which are nodes that have a type. Tree Sitter also adds "anonymous nodes" to parse trees. Those nodes don't have a type and often contain syntactic elements; for example, the "`+`" or "`/`" operators, parentheses, colons, etc.

You can match anonymous nodes by specifying their text between double quotes.

```scheme
(binary-operation
  (identifier)
  "+"
  (binary-operation)
)
; Matches a `binary-operation` that contains an `identifier`,
; a "+" token, and another `binary-operation`.
```

### Wildcards

You can use an underscore (`_`) as a wildcard. An underscore by itself matches any node whether it's named or anonymous; an underscore as the name of a node matches any named node but not anonymous nodes.

```scheme
(binary-operation . (_) "+" (identifier) . )
; Matches a `binary-operation` node where the first child node
; is a named node of any type.

(binary-operation . (identifier) _ (identifier) . )
; Matches a `binary-operation` node where the middle child node
; can be any node, anonymous or not.

(_ . (identifier) "+" (identifier) . )
; Matches a named node of any type that contains an `identifier`,
; a "+" anonymous node, and another `identifier`.
```

### Alternatives

If you specify more than one pattern in the top level of your Tree Sitter query, the query will find nodes that match any of the patterns.

```scheme
(program)
(module)
; Matches nodes of type `program` or `module`
```

If you want to specify alternative matches for child nodes, write your alternatives between square brackets (`[]`). Note that the alternatives are listed one after another, without commas in between.

```scheme
(func-decl
  [
    (func-prototype)
    (func-definition)
  ]
)
; Matches nodes of type `func-decl` that contain a child
; of type `func-prototype` or `func-definition`.
```

If a node contains children that could fulfill several alternatives, the query engine will return one result for each matching alternative. If you have several alternatives in a single query, this could result in a combinatorial explosion as the query engine returns matches for every combination of alternatives. As a result, your static analysis runs will take longer and the rule may time out.

### Captures

You can "capture" matched nodes to make them available in the rule's JavaScript code or to use them in predicates (described below.) To capture a node, add an at-sign (`@`) followed by a capture name after the pattern you want to capture.

```scheme
(binary-operation
  (identifier) @id
  "+" @op
  _ @operand
) @operation
; Matches `binary-operation` nodes (captured under the name `operation`)
; that contain an `identifier` (captured as `id`), an anonymous node
; containing "+" (captured as `op`), and any other child node
; (captured as `operand`.)
```

### Optional and repeated matches

You can indicate that a node may appear optionally by specifying the question mark (`?`) modifier after its pattern.

```scheme
(exit-statement
  (integer)?
)
; Matches an `exit-statement` node containing an optional `integer` node.
```

You can capture an optional node; the capture will be empty if the node is not present.

```scheme
(exit-statement
  (integer)? @retCode
)
; If the `integer` exists, `retCode` will contain the node;
; otherwise it will be empty.
```

You can indicate that a node may appear zero or more times by specifying the asterisk (`*`) modifier after its pattern.

```scheme
(list
  _* @items
)
; Matches a `list` node with zero or more children, capturing them as `items`.
```

As you can see, these modifiers are most useful with captures. If you were not interested in capturing the child nodes, you could rewrite the above query as simply "`(list)`".

You can indicate that a node must appear one or more times by specifying the plus sign (`+`) modifier after its pattern.

```scheme
(array-index
  (integer)+ @indices
)
; Matches an `array-index` node that contains one or more `integer` nodes,
; capturing them as `indices`.
```

You can also apply these modifiers to groups of patterns. To do it, surround the group in parentheses and then apply the modifier after the closing parenthesis.

```scheme
(array-dimensions
  (integer)
  ("," integer)*
)
; Matches an `array-dimensions` node that contains an `integer` node
; followed by zero or more `integer` nodes preceded by commas.
```

The differences between all three modifiers may be subtle, so let's look at them again from a different point of view.

* The difference between "`?`" and "`*`" is that, when there are repeated nodes that match a pattern, "`*`" will produce a single result that contains all repetitions but "`?`" will produce one result for each repetition.

For example, if the parse tree had a `list` node with five child nodes, a "`(list _?)`" pattern would produce five different results, one for each child node, while a "`(list _*)`" pattern would produce only one result for the whole list of child nodes.

* The difference between "`*`" and "`+`" is that, when there are no matching nodes, the "`*`" pattern will return a result while the "`+`" pattern will not return a result.

For example, if the parse tree had a `list` node with no children, a "`(list _*)`" pattern would produce one result, while a "`(list _+)`" pattern would produce zero results.

### Predicates

You can specify extra conditions that the nodes must fulfill to be matched. These conditions are expressed in the form of predicates added inside the parentheses of a pattern.

```scheme
(binary-operator
  (identifier) @id
  (#match? @id "[a-z]+([A-Z][a-z]*)*")
)
; Matches a `binary-operator` node that contains an `identifier` node
; whose content matches the provided regular expression.
```

Predicates have the form `(#pred? arg1 arg2)`, where `#pred?` is the name of a predicate, `arg1` is a capture, and `arg2` may be another capture or a string.

```scheme
(assign-statement
  left: _ @target
  right: _ @source
  (#eq? @target @source)
)
; Matches `assign-statement` nodes whose `left` and `right` fields are equal.
```

Some common predicates are:

* `#eq?`, `#not-eq?` --- the capture is equal to / is not equal to the second argument.
* `#match?`, `#not-match?` --- the capture matches / does not match the regular expression provided as the second argument.

If your capture contains multiple nodes (for example, if you used the `*` or `?` modifiers), you can use the following predicates:

* `#any-eq?`, `#any-not-eq?` --- any of the captured nodes is equal to / is not equal to the second argument.
* `#any-match?`, `#any-not-match?` --- any of the captured nodes matches / does not match the regular expression provided as the second argument.

```scheme
(array-index
  (identifier)* @ids
  (#any-eq? @ids "exit")
)
; Matches `array-index` nodes with an `identifier` child node
; that contains "exit".
```

If you need to check if an argument is equal to one of several values, there is a predicate for that too:

* `#any-of?`, `#not-any-of?` --- the capture is equal / is not equal to any of the second, third, fourth, etc., argument.

```scheme
(function-call
  name: _ @fn
  (#any-of? @fn "system" "exit" "quit")
)
; Matches `function-call` nodes whose name field is equal
; to "system", "exit", or "quit".
```

## The JavaScript Code

Your rule's JavaScript code will typically look like this:

```javascript
function visit(query, filename, code) {
  const { cap1, cap2, cap3 } = query.captures;
  const { cap4, cap5, cap6 } = query.capturesList;
  /* check the captured nodes */
  const err = /* generate a message for a finding */;
  addError(err);
}
```

### The `visit()` Function

After executing the query, the static analyzer executes the `visit()` function for each match. This function receives three arguments:

* `query` --- information about the current match.
* `filename` --- the name of the file being analyzed.
* `code` --- the content of the file being analyzed.

The `filename` and `code` arguments are strings; the `query` argument, however, is an object that contains the following properties:

* `captures` --- an object that contains the nodes captured by the query, keyed by the capture name. If a capture contains more than one node, only the first node appears here.
* `capturesList` --- similar to `captures` but contains lists of all nodes captured under a name. This is suitable for captures of repeated nodes via the `+` and `*` modifiers.

For example, with a query like this:

```scheme
(var-assignment
  left: (identifier)+ @ids
  right: _ @expr
) @assignment
```

the `query` argument would contain something similar to this:

```javascript
query = {
  captures: {
    ids: /* the first `identifier` node in field `left` */,
    expr: /* the node in field `right` */
  },
  capturesList: {
    ids: [
      /* first `identifier` node from `left` */,
      /* second `identifier` node from `left` */,
      /* etc */
    ],
    expr: [
      /* the node in field `right` */
    ]
  }
}
```

### Working with Captures

The names of the captures are used as the keys in the `query.captures` and `query.capturesList` objects. If you assign those captures names that are compatible with JavaScript variable names, you can retrieve them easily:

```javascript
const { id, expr, node } = query.captures;
```

The above code extracts the properties `id`, `expr`, and `node` from `query.captures` and assigns them to constants with the same names.

If the capture names are not compatible with JavaScript variable names, you can still extract them but a little less conveniently.

```javascript
const id = query.captures["id-node"];
const expr = query.captures["20394];
```

A captured node is represented by an object that contains the following properties:

* `cstType` --- the node's type.
* `start` --- an object that contains the starting position of the node in the source code.
* `end` --- an object that contains the position of the character that follows the end of the node.
* `text` --- the content of the node.

The `start` and `end` properties are objects that contain `line` and `col` properties. Those properties are 1-based: the first line of a file and the first column of a line are number 1. The position in the `start` property is inclusive: it points to the first character in the node. The position in the `end` property ie exclusive: it points to the first character after the node.

You can use the `start` and `end` property to check the length of a node or the relative positions of two nodes. For example, if a node's `start` and `end` properties have the same values, the node is empty. If a node's `end` property has the same values as another node's `start` property, the nodes follow each other immediately.

(Note about old code: you may see some rules that use the `astType` property instead of `cstType`. Those rules are old, and you should use `cstType`. You may also see some rules that use `getCodeForNode(node, code)` or `getCodeForNode(node)` instead of `node.text`. You should use `node.text`.)

### Navigating the Parse Tree

You can use the `ddsa.getParent(node)` and `ddsa.getChildren(node)` functions to get a node's parent and children, respectively.

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  const parent = ddsa.getParent(funcDecl);
  // Do something with the `funcDecl` node's parent
  const children = ddsa.getChildren(funcDecl);
  for (let child of children) {
    // Do something with the `funcDecl` node's children
  }
}
```

You can continue calling `ddsa.getParent(node)` and `ddsa.getChildren(node)` on the nodes returned by these functions to navigate the parse tree. Calling `ddsa.getParent()` on the root node returns `undefined`, while calling `ddsa.getChildren()` on a leaf tree returns an empty list.

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  let root = getRoot(funcDecl);
  // Now `root` contains the parse tree's root
  displayLeaves(root);
}

function getRoot(node) {
  let parent = ddsa.getParent(node);
  while (parent) {
    node = parent;
    parent = ddsa.getParent(node);
  }
  return node;
}

function displayLeaves(node) {
  let children = ddsa.getChildren(root);
  if (children.length == 0) console.log(node);
  for (let child of children) {
    displayLeaves(child);
  }
}
```

If you call `ddsa.getChildren(node)` on a node with fields, the nodes contained in those fields will be returned among the children and will contain an additional `fieldName` property.

```javascript
// Get the content of the `then` and `else` fields of an `if_statement` node.
let children = ddsa.getChildren(ifStatementNode);
let thenField = children.find(n => n.fieldName === 'then');
let elseField = children.find(n => n.fieldName === 'else');
```

You can compare two node objects with `==` to know if they point to the same node.

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  displaySiblings(funcDecl);
}

// Prints out all siblings of this node, not counting itself
function displaySiblings(node) {
  let parent = ddsa.getParent(node);
  if (!parent) return;
  let allSiblings = ddsa.getChildren(parent);
  for (let sibling of allSiblings) {
    if (sibling != node) console.log(sibling);
  }
}
```

### Reporting Findings and Offering Suggestions

Use the `addError()` function to report a finding to the user. This function takes a `Violation` object that you can build with the `buildError()` function. This function takes five arguments: `startLine`, `startCol`, `endLine`, `endCol`, and `message`. Generally, you would use a node's `start` and `end` properties to get the values for the first four arguments.

```javascript
function visit(query, filename, code) {
  const { funcCall } = query.captures;
  addError(
    buildError(
      funcCall.start.line, funcCall.start.col,
      funcCall.end.line, funcCall.end.col,
      "Function calls are not allowed"
    )
  );
}
```

You can, however, use `start` and `end` positions from several nodes, or even compute your own, if needed.

The `message` you provide will be shown to the user.

You can also attach proposed fixes to the error message. To do that, call the `Violation` object's `addFix()` method. This method takes a `Fix` object that you can build with the `buildFix()` function. This function takes two arguments: a `description` and `edits`, an array of proposed edits.

You can build the proposed edits with the `buildEditAdd()`, `buildEditRemove()`, and `buildEditUpdate()` functions.

* `buildEditAdd()` generates a suggestion to insert text. It takes three arguments: `startLine`, `startCol`, and `newContent`.
* `buildEditRemove()` generates a suggestion to delete text. It takes four arguments: `startLine`, `startCol`, `endLine`, and `endCol`.
* `buildEditUpdate()` generates a suggestion to modify text. It takes five arguments: `startLine`, `startCol`, `endLine`, `endCol`, and `newContent`.

```javascript
function visit(query, filename, code) {
  const { fname } = query.captures;
  if (fname.text != "oldFunction") return;
  addError(
    buildError(
      fname.start.line, fname.start.col,
      fname.end.line, fname.end.col,
      "This function is deprecated"
    ).addFix(
      buildFix(
        "Use the new function instead",
        [
          buildEditUpdate(
            fname.start.line, fname.start.col,
            fname.end.line, fname.end.col,
            "newFunction")
        ]
      )
    )
  );
}
```

## Tips and Tricks

### Matching a node that does not have a particular child

While you can use an exclamation point (`!`) to match a node that does not have a particular field, there is no way to write a query for a node that does not have a particular child. For example, you cannot write a query for "a `function_declaration` node that does not contain a `return_statement` child node".

However, you can combine a query and JavaScript code to achieve that result.

To do that, use the question mark (`?`) modifier and a capture on the child node that you want to exclude, and then your JavaScript code can check whether the node was captured. If it was not captured, that means that the node is not present.

```scheme
; Query:
(function_declaration
  name: (identifier) @id
  result: _
  body:
    (block
      (return_statement)? @ret ; This is the node we want to exclude
    )
)
```

```javascript
// Code:
function visit(query, filename, code) {
  const { id, ret } = query.captures;
  if (ret) return; // The return statement is present, so exit
  addError(
    buildError(
      id.start.line, id.start.col,
      id.end.line, id.end.col,
      "Missing return statement"
    )
  );
}
```

### Navigate the parse tree to search for nodes

It is tempting to try to write a query that selects and captures all the nodes you need, but sometimes it's easier to find one node and then use `ddsa.getParent()` and `ddsa.getChildren()` to locate the rest.

For example, if you want to find a function definition that contains a function call, you can't do that in a Tree Sitter query without specifying patterns for the function call at different nesting levels. However, you can do it very easily if you search for the function call in the Tree Sitter query and then, in your JavaScript code, you climb up the parse tree using `ddsa.getParent()` to find the function definition.

```scheme
; Query:
(call_expression
  function:
    (_ field: _ @methodName
       (@eq? @methodName "DoSomething")
    )
) @fn
```

```javascript
// Code:
function visit(query, filename, code) {
  const { fn } = query.captures;
  let decl = ddsa.getParent(fn);
  while (decl && decl.cstType != 'function_declaration')
    decl = ddsa.getParent(decl);
  // `decl` is now the `function_declaration` or undefined
}
```

You can do many things with `ddsa.getParent()` and `ddsa.getChildren()`. For example, you can examine a node's siblings:

```javascript
function getSiblings(node) {
  return ddsa.getChildren(ddsa.getParent(node)).filter(n => n != node);
}

function getSiblingsAfter(node) {
  return ddsa.getChildren(ddsa.getParent(node)).
      reduce((a, n) => n == node ? [] : a && a.concat([n]), undefined);
}

function getSiblingsBefore(node) {
  return ddsa.getChildren(ddsa.getParent(node)).
      reduceRight((a, n) => n == node ? [] : a && [n].concat(a), undefined);
}
```

You can then inspect and select the nodes you are interested in by checking their `cstType` and `text` properties.

## Pitfalls

### Adding predicates doesn't speed up the query

If your Tree Sitter query is slow, you might try to speed it up by adding predicates to prune the search tree. However, this method doesn't work with the Tree Sitter query engine. The engine ignores all predicates when it walks the tree in search of nodes that match the pattern, and it only applies those predicates at the end to filter the results list.

Therefore, while adding predicates might reduce the number of times that your `visit()` function is called, it won't reduce the amount of work that the static analyzer will do at query time.

Also note that query predicates are not necessarily faster than filtering nodes in the `visit()` function. Sometimes it's easier to do filtering in the code than to write a complicated predicate in the query, and you won't get a performance penalty for it as long as you make sure to do that filtering as early as possible in your code.

### Possible combinatorial explosion

The Tree Sitter query engine tries to return every possible combination of nodes that satisfies the query. This means that complicated queries with two or more alternatives could cause a combinatorial explosion as the query engine explores every possibility for every alternative.

Note that adding predicates won't help as they are only checked after the nodes are selected.

Some causes are explored below.

#### Two similar child node patterns

Some rule authors try to match two nodes at once using the same, or very similar, patterns. This could cause problems if the file has many nodes that match all of those patterns.

For example, you might write a query like this one to capture pairs of methods in a class declaration:

```scheme
(class_declaration
  (method_declaration) @method1
  (method_declaration) @method2
)
```

For a class with only two methods, this query will only return one node; however, for a class with 10 methods, it will return 45. For a class with 100 methods, it will return 4950 nodes!

To avoid this problem, use modifiers like `+` or `*` to capture the whole list of methods in one single query result. Alternatively, use `.` to indicate that the child nodes must appear next to each other.

```scheme
(class_declaration
  (method_declaration)+ @methods
)

; or

(class_declaration
  (method_declaration) @method1
  .
  (method_declaration) @method2
)
```

#### Trying to match up two nodes in the query

A common type of rule tries to find variables of a particular type that are used in a particular way. People tend to write the query as "find all variable definitions and capture the name, find all variable usages, capture the name, and check that the names match".

```scheme
(_
  (var_declaration
    (var_spec
      name: _ @varName
      type: _ @typeName
    )
  )

  (_
    (call_expression
      function:
        (_
          operand: _ @opName
          field: _ @methodName
        )
    )
  )

  (#eq? @typeName "myType")
  (#eq? @methodName "DoSomething")
  (#eq? @varName @opName)
)
```

The problem is that the Tree Sitter query engine will get every `var_declaration` node and every `call_expression` node, match them up pairwise, and then check the predicates for every pair. This results in an O(nm) operation.

One solution is to write a query that finds one of the nodes and then use `ddsa.getParent()` and `ddsa.getChildren()` to find the other node.

Another potential solution is to gather all candidate nodes without trying to pair them up, and then process them in the JavaScript code.

#### Trying to match a pattern at several nesting levels

You can write a pattern to find a node containing a child node that matches a pattern. However, you cannot write a pattern to find a node containing a descendent at an arbitrary nesting level.

Some rule writers tried to solve this by specifying several alternatives, each one with the pattern of interest at a different nesting level.

```scheme
; Query:
(function_declaration
  [
    ; Find the same pattern at nesting levels 1 through 4
    (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    )

    (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    ))

    (_ (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    )))

    (_ (_ (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    ))))
  ]

  (#eq? @methodName "DoSomething")
) @decl
```

```javascript
// Code:
function visit(query, filename, code) {
  const { decl, fn } = query.captures;
  // ... do something with decl and fn
}
```

We've already mentioned the problems with this approach. First, the query engine goes down every branch of the parse tree to try and match the pattern, which might take a long time. Additionally, if there are two or more alternatives, the query engine will return one match for every set of nodes that matches one combination of choices.

A solution for this problem is to write a query for the child node and then use `ddsa.getParent()` to locate the ancestor node. This also has the advantage that it gives us unlimited nesting levels.

```scheme
; Query:
(call_expression
  function: (_field: _ @methodName (#eq? @methodName "doSomething))
)
```

```javascript
// Code:
function visit(query, filename, code) {
  const { fn } = query.captures;
  let decl = ddsa.getParent(fn);
  while (decl && decl.cstType != 'function_declaration') {
    decl = ddsa.getParent(decl);
  }
  // ... do something with decl and fn
}
```



[1]: /security/code_security/static_analysis/custom_rules/tutorial/
[2]: https://tree-sitter.github.io/
[3]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html
