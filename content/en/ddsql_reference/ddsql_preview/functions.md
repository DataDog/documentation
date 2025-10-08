---
title: DDSQL Functions (Preview)
private: true
aliases:
- /dashboards/ddsql_editor/reference/aggregation_functions
- /dashboards/ddsql_editor/reference/scalar_functions/
- /ddsql_editor/reference/scalar_functions
- /ddsql_editor/reference/aggregation_functions
- /ddsql_editor/reference/functions
---

## Aggregation functions

Aggregate functions compute a single result from a set of input values, usually used in conjunction with a `GROUP BY` statement.

### avg
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| avg(expr *e*) | numeric | numeric | Computes the average (arithmetic mean) of all the non-null input values. |

### max
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| max(expr *e*) | variable | variable | Computes the maximum of the non-null input values. Types of input values must be comparable. |

### min
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| min(expr *e*) | variable | variable | Computes the minimum of the non-null input values. Types of input values must be comparable. |

### sum
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| sum(expr *e*) | numeric | numeric | Computes the sum of the non-null input values. |

### count
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| count(expr *e*) | numeric | integer | Computes the number of input rows in which the input value is not null. |
| count(distinct expr *e1*, *e2* ...) | | integer | Computes the number of input values in which the input value is not null. |
| count(*) | | integer | Computes the number of input rows. |

### string_agg
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| string_agg(expr *e*, delimiter *e*) | string, string | string | Concatenates the input values, seperated by a delimiter. |

### array_agg
| Name | Argument Types | Return type | Description |
|------|----------------|-------------|-------------|
| string_agg(expr *e*) | variable | array<variable> | Concatenates the input values into an array. |


## Scalar functions

These functions return one value per row.

### String functions and operators

| Name | Return type | Description |
|------|-------------|-------------|
| upper(text *s*) | text | Converts *s* to uppercase. |
| lower(text *s*) | text | Converts *s* to lowercase. |
| length(text *s*) | integer | Counts the number of characters in *s*. |
| concat(expr *x*, *y*, ...) | text | Concatenates the provided expressions. |
| substr(expr *s*, numeric *start*, numeric *numChars*) | text | Returns a substring of *s* from *start* to a max of *numChars*, if provided. *start* is a 1-based index, so `substr('hello', 2)` returns `'ello'`. If the start is less than 1, it is treated as if it were 1. The result is computed by taking the range of characters `[start, start+numChars]`, where if any value is less than 1, it is treated as 1. This means `substr('hello', -2, 4)` returns `'h'`. |
| replace(text *s*, text *from*, text *to*) | text | Replaces all occurrences in *s* of substring *from* with substring *to*. |
| regexp_replace(text *s*, text *pattern*, text *replacement*) | text | Replace substrings in *s* that match the POSIX regular expression *pattern* with the *replacement*. Supports Go's [regular expression syntax][1]. |
 reverse(expr *text*)  | string  | Reverses the string (brown → nworb). |
| md5(expr *text*) | string  | Calculates the MD5 hash of a string and returns the result in hexadecimal. |
| char_length(str *text*) | integer | Returns number of characters in str. |
| left(str *text*, *n* int) | text | Returns first *n* characters in str. When *n* is negative, return all but last \|n\| characters.|
| right(str *text*, *n* int) | text    | Returns last *n* characters in str. When *n* is negative, return all but first \|n\| characters.|
| ltrim(str *text* [, characters text]) | text | Removes the longest string containing only characters from characters (a space by default) from the start of str. |
| rtrim(str *text* [, characters text])| text | Removes the longest string containing only characters from characters (a space by default) from the end of str |
| trim([leading \| trailing \| both] [characters] from str) | text | Removes the longest string containing only the characters (a space by default) from the start/end/both ends of str. |
| sort_order_ip(ip text) | text | Returns a string representing a sort order over IPv4 and IPv6 range. |


### Mathematical functions and operators

| Name | Return type | Description |
|------|-------------|-------------|
| abs(numeric *n*) | integer | Returns the absolute value of *n*. |
| round(numeric *n*, [*s*]) | numeric | Round *n* to *s* decimal places. |
| mod(numeric *x*, numeric *y*) | integer | Returns the remainder of `x / y`. |
| floor(numeric *n*) | numeric | Returns the nearest integer that is less than or equal to *n*. |
| ceil(numeric *n*) | numeric | Returns the nearest integer that is greater than or equal to *n*. |
| power(numeric *n*, numeric *s*) | numeric | Raises *n* to the *s* power. |
| ln(numeric *n*) | numeric | Calculates the natural logarithm of *n*. |
| log(numeric *n*)  | numeric | Calculates the logarithm to base 10 of *n*. |
| log2(numeric *n*) | numeric | Calculates the logarithm to base 2 of *n*. |
| exp(numeric *n*) | numeric | Returns the mathematical constant e, raised to the power of *n*. |
| sqrt(numeric *n*) | numeric | Calculates the square root of *n*. |


### Array functions and operators
| Name | Return type | Description |
|------|-------------|-------------|
| array_length(array *a*) | integer | Returns the length of the array *a* for each row. |
| array_contains(array *a*, expr *e*) | boolean | Returns true if the value the expr *e* evaluates to is in the array *a* for each row. |
| array_cat(array *a*, array *b*) | array | Returns a new array containing the combined elements from array *a* and array *b*.  |
| array_append(array *a*, expr *e*) | array | Returns a new array that includes all the original elements of the input array followed by the appended element. |
| string_to_array(text *s*, delimiter, [,nullString]) | array | Returns an array of substrings obtained by splitting the input string *s*, using the specified delimiter. The third argument, nullString, is optional and specifies substrings that are replaced with `NULL`. |
| array_to_string(array *a*, delimiter, [,nullString]) | string | Concatenates array elements using supplied delimiter and optional null string. |
| unnest(array *a*) | variable | Returns each element in the array <strong>as a separate row</strong>. The return type is the element type of the array.<br>`unnest` can only be used in the `SELECT` clause of a query. If other columns are `SELECT`ed with unnest, the value at each row in the table is repeated at each output row with each unnested element. If multiple columns are being unnested, all the unnested columns are zipped up together, with `NULL` filling in the output values for shorter arrays. |

### Date/time functions and operators

| Name | Return type | Description |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | Truncates the timestamp to the chosen *precision* ("second", "minute", "hour", "day", "week", "month", or "year"). |
| date_diff(string *precision*, timestamp *t*, timestamp *t*) | integer | Returns the difference between two dates, in the precision specified. |
| to_timestamp(numeric *n*) | timestamp | Transforms *n* into a timestamp, considering *n* as the time in seconds.|

### Conditional expressions

| Name | Return type | Description |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Returns the first non-null expression. |
| nullif(expr *x*, expr *y*) | variable | Returns `NULL` if both arguments are equal. Otherwise, returns *x*. |

### JSON functions and operators

| Name | Return type | Description |
|------|-------------|-------------|
| json_extract_path_text(text json, text path…) | text | Extracts the JSON sub-object in JSON as text, defined by the path. Its behavior is equivalent to the [postgres function with the same name][2]. For example, `json_extract_path_text(col, ‘forest')` returns the value of the key `forest` for each JSON object in `col`. See the example below for a JSON array syntax.|
| json_extract_path(text json, text path…) | json | Same functionality as `json_extract_path_text`, but returns a column of JSON type instead of text type.|
| json_build_object(key1 text, value1 json/text/int/float, key2 text, value2 json/text/int/float, … ) | json | Builds a JSON object based on the parameters passed in. The parameters to the function are the keys/values of the JSON object being built, alternating between key and value mapped to each key.|
| row_to_json(table) | json | Returns a JSON representation of each row in a table as a JSON value. The JSON keys are the column names, and the values are the values under each row at each column. <br><br> <strong>Note</strong>: row_to_json takes in a table name, NOT a column, for example, `SELECT row_to_json(<table>) FROM <table>`. |

#### JSON array
  Return the value of the key `forest` in the 0th element in a JSON array for each JSON object or row in `col`.

```json
[{
"forest": "trees"
}]

```

```
json_extract_path_text(col, ‘0', ‘forest')
```


[1]: https://pkg.go.dev/regexp/syntax
[2]: https://www.postgresql.org/docs/current/functions-json.html
