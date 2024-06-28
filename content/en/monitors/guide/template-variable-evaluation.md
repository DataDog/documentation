---
title: Template Variable Evaluation
---

In monitor notification messages, you can modify the output of template variables using the `eval` syntax, which enables several different mathematical operations and functions on template variables with a numerical value.

## Operators

Evaluation operators allow you to perform basic arithmetic operations on a numerical template variable. The syntax uses the following format. **Note**: The expressions must be wrapped in quotation marks (`"`).

```text
{{eval "TEMPLATE_VARIABLE_NAME+1-2*3/4"}}
```

The following operators are supported:

| Operator | Description    |
|----------|----------------|
| +        | Addition       |
| -        | Subtraction    |
| *        | Multiplication |
| /        | Division       |
| ^        | Exponentiation |
| %        | Modulo         |

### Example

The `{{last_triggered_at_epoch}}` template variable returns the UTC time when a monitor last triggered in milliseconds epoch format. 

### Scope links to specific times

Evaluation operators can be used to subtract 15 minutes (15 * 60 * 1000 milliseconds) with the following:

```
{{eval "last_triggered_at_epoch-15*60*1000"}}
```

This is useful for creating time-scoped links in your monitor notification message to other pages in Datadog or other workflow tools. For instance, use the evaluation operators on `{{last_triggered_at_epoch}}` to create a time-scoped link to the [Datadog Log Explorer][1]:

```
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-15*60*1000"}}&to_ts={{last_triggered_at_epoch}}&live=false
```

### Routing notifications to different teams based on time of day

You can combine a modulo `%` evaluation of the `last_triggered_at_epoch` variable with `{{#is_match}}{{/is_match}}` to customize the routing of notifications based on time of day:
```
{{#is_match (eval "int(last_triggered_at_epoch / 3600000 % 24)") "14" "15" "16"}}  
Handle that should receive notification if time is between 2PM and 5PM
{{/is_match}}
```

## Functions

The value of a numerical template variable can be used as the input for evaluation functions to change the formatting of the template variable or perform a mathematical operation on the value. The syntax uses the following format. **Note**: The expressions must be wrapped in quotation marks (`"`).

```text
{{eval "function(TEMPLATE_VARIABLE_NAME)"}}
```

The following functions change how the value of a numerical template variable is formatted:

| Function            | Description|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| humanize_bytes(var) | Returns a human readable formatting of var bytes|
| humanize_bits(var)  | Returns a human readable formatting of var bits|
| abs(var)            | Returns the absolute value of var|
| int(var)            | Returns var as a floored integer; that is, the numbers to the left of the decimal point. For example: if var = 12.345, then `int(var)` returns 12.|
| float(var)          | Returns var as a float|
| trunc(var)          | Returns var as an integer, an alias of the int function|
| dec(var)            | Returns the numbers to the right of the decimal point. For example: if var = 12.345, then `dec(var)` returns 0.345.|

The following functions use the value of a numerical template variable as the input to a mathematical function:

| Function            | Description|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| round(var)          | Returns var rounded to the nearest integer|
| round(var, n)       | Returns var rounded to a specified number of digits (n).<br>For example: round(12.376, 2) = 12.38|
| ceil(var)           | Returns the ceiling of var (the smallest integer that is greater than or equal to var)|
| floor(var)          | Returns the floor of var (the largest integer that is less than or equal to var)|
| sgn(var)            | Returns the value of the sign function evaluated at var:<br>sgn(var) = 1 if var > 0<br>sgn(var) = 0 if var = 0<br>sgn(var) = -1 if var < 0|
| to_bool(var)        | Returns true if var = 1<br>Returns false if var = 0|
| exp(var)            | Returns e (the base of the natural logarithm) raised to the power of var|
| log10(var)          | Returns the base-10 logarithm of var|
| sin(var)            | Returns the sine of var radians|
| sinh(var)           | Returns the hyperbolic sine of var|
| asin(var)           | Returns the arc sine of var, in radians|
| asinh(var)          | Returns the inverse hyperbolic sine of var|
| cos(var)            | Returns the cosine of var radians|
| cosh(var)           | Returns the hyperbolic cosine of var|
| acos(var)           | Returns the arc cosine of var, in radians|
| acosh(var)          | Returns the inverse hyperbolic cosine of var|
| tan(var)            | Returns the tangent of var radians|
| tanh(var)           | Returns the hyperbolic tangent of var|
| atan(var)           | Returns the arc tangent of var, in radians|
| atan2(var1, var2)   | Returns atan(var1 / var2), in radians|
| atanh(var)          | Returns the inverse hyperbolic tangent of var|

### Examples

If the decimal places of the `{{value}}` template variable are unnecessary for your particular use case, use the int function to evaluate `{{value}}` as an integer to improve readability and remove the decimals:

```
{{eval "int(value)"}}
```

If `{{value}}` is evaluating to a large number of bytes or bits, use the `humanize_bytes` or `humanize_bits` function to convert the number to a different higher order memory unit like GB or MB to improve readability:

```
{{eval "humanize_bytes(value)"}}

{{eval "humanize_bits(value)"}}
```

[1]: /logs/explorer/
