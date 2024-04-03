---
bundle: com.datadoghq.datatransformation
bundle_title: Data Transformation
description: 'Use JavaScript expression to apply transformations on data or objects.
  An *expression* is any valid unit of code that resolves to a value.


  **Examples**:

  - `1 + 2`

  - `[1, 2, 3].filter(x => x < 3)`


  **Note**: Lodash is available through the variable `_`.'
icon:
  icon_name: Api
  type: icon
input: '#/$defs/ExpressionInputs'
inputFieldOrder:
- script
- context
keywords:
- function
- script
- expression
- javascript
- js
- func
output: '#/$defs/ExpressionOutputs'
source: javascript
title: Expression
---

Use JavaScript expression to apply transformations on data or objects. An *expression* is any valid unit of code that resolves to a value.

**Examples**:
- `1 + 2`
- `[1, 2, 3].filter(x => x < 3)`

**Note**: Lodash is available through the variable `_`.

{{< workflows >}}
