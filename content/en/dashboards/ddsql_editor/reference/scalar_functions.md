---
title: DDSQL Scalar Functions
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

These functions return one value per row.

## String functions and operators

| Name | Return type | Description |
|------|-------------|-------------|
| upper(text *s*) | text | Converts *s* to uppercase. |
| lower(text *s*) | text | Converts *s* to lowercase. |
| length(text *s*) | integer | Counts the number of characters in *s*. |
| concat(expr *x*, *y*, ...) | text | Concatenates the provided expressions. |
| substr(expr *s*, numeric *start*, numeric *numChars*) | text | Returns a substring of *s* from *start* to a max of *numChars*, if provided. *start* is a 1-based index, so `substr('hello', 2)` returns `'ello'`. If the start is less than 1, it is treated as if it were 1. The result is computed by taking the range of characters `[start, start+numChars]`, where if any value is less than 1, it is treated as 1. This means `substr('hello', -2, 4)` returns `'h'`. |
| replace(text *s*, text *from*, text *to*) | text | Replaces all occurrences in *s* of substring *from* with substring *to*. |
| regexp_replace(text *s*, text *pattern*, text *replacement*) | text | Replace substrings in *s* that match the POSIX regular expression *pattern* with the *replacement*. Supports Go's [regular expression syntax][1]. |


## Mathematical functions and operators

| Name | Return type | Description |
|------|-------------|-------------|
| abs(numeric *n*) | integer | Returns the absolute value of *n*. |
| round(numeric *n*, [*s*]) | numeric | Round *n* to *s* decimal places. |
| mod(numeric *x*, numeric *y*) | integer | Returns the remainder of `x / y`. |
| floor(numeric *n*) | numeric | Returns the nearest integer that is less than or equal to *n*. |
| ceil(numeric *n*) | numeric | Returns the nearest integer that is greater than or equal to *n*. |
| power(numeric *n*, numeric *s*) | numeric | Raises *n* to the *s* power. |
| ln(numeric *n*) | numeric | Calculates the natural logarithm of *n*. |
| sqrt(numeric *n*) | numeric | Calculates the square root of *n*. |


## Array functions and operators
| Name | Return type | Description |
|------|-------------|-------------|
| array_length(array *a*) | integer | Returns the length of the array *a* for each row. |
| array_contains(array *a*, expr *e*) | boolean | Returns true if the value the expr *e* evaluates to is in the array *a* for each row. |
| array_cat(array *a*, array *b*) | array | Returns a new array containing the combined elements from array *a* and array *b*.  |
| array_append(array *a*, expr *e*) | array | Returns a new array that includes all the original elements of the input array followed by the appended element. |
| string_to_array(text *s*, delimiter, [,nullString]) | array | Returns an array of substrings obtained by splitting the input string *s*, using the specified delimiter. The third argument, nullString, is optional and specifies substrings that are replaced with `NULL`. |
| array_to_string(array *a*, delimiter, [,nullString]) | string | Concatenates array elements using supplied delimiter and optional null string. |
| unnest(array *a*) | variable | Returns each element in the array <strong>as a separate row</strong>. The return type is the element type of the array.<br>`unnest` can only be used in the `SELECT` clause of a query. If other columns are `SELECT`ed with unnest, the value at each row in the table is repeated at each output row with each unnested element. If multiple columns are being unnested, all the unnested columns are zipped up together, with `NULL` filling in the output values for shorter arrays. |

## Date/time functions and operators

### date_trunc
| Name | Return type | Description |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | Truncates the timestamp to the chosen *precision* ("second", "minute", "hour", "day", "week", "month", or "year"). |

## Conditional expressions

| Name | Return type | Description |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Returns the first non-null expression. |
| nullif(expr *x*, expr *y*) | variable | Returns `NULL` if both arguments are equal. Otherwise, returns *x*. |

## JSON functions and operators

| Name | Return type | Description | 
|------|-------------|-------------| 
| json_extract_path_text(text json, text path…) | text | Extracts the JSON sub-object in JSON as text, defined by the path. Its behavior is equivalent to the [postgres function with the same name][2]. For example, `json_extract_path_text(col, ‘forest')` returns the value of the key `forest` for each JSON object in `col`. See the example below for a JSON array syntax.|
| json_extract_path(text json, text path…) | json | Same functionality as `json_extract_path_text`, but returns a column of type `JSON` instead of type `text`. |
| json_build_object(key1 text, value1 json/text/int/float, key2 text, value2 json/text/int/float, ...) | json | Builds a JSON object based on the parameters passed in. The parameters to the function are the keys and values of the JSON object being built, alternating between the key and value mapped to each key.
| row_to_json(table) | json | Returns a JSON representation of each row in a table as a JSON value. The JSON keys are the column names, and the values are the values under each row in each column. **Note*: `row_to_json` takes in a table name, NOT a column name. |

### JSON array
  Return the 0th element in a JSON array under the key `forest` in each JSON object or row in `col`.

```json
[{
"forest": "trees"
}]

```

```
json_extract_path_text(col, ‘forest', ‘0')
```


[1]: https://pkg.go.dev/regexp/syntax
[2]: https://www.postgresql.org/docs/current/functions-json.html
