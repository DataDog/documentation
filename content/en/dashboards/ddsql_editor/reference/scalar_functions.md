---
title: DDSQL Scalar Functions
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

These functions return one value per row.

## String functions and operators

### upper
| Name | Return type | Description |
|------|-------------|-------------|
| upper(text *s*) | text | Converts *s* to uppercase. |

### lower
| Name | Return type | Description |
|------|-------------|-------------|
| lower(text *s*) | text | Converts *s* to lowercase. |

### length
| Name | Return type | Description |
|------|-------------|-------------|
| length(text *s*) | integer | Counts the number of characters in *s*. |

### concat
| Name | Return type | Description |
|------|-------------|-------------|
| concat(expr *x*, *y*, ...) | text | Concatenates the provided expressions. |

### substr
| Name | Return type | Description |
|------|-------------|-------------|
| substr(expr *s*, numeric *start*, numeric *numChars*) | text | Returns a substring of *s* from *start* to a max of *numChars*, if provided. *start* is a 1-based index, so `substr('hello', 2)` returns `'ello'`. If the start is less than 1, it is treated as if it were 1. The result is computed by taking the range of characters `[start, start+numChars]`, where if any value is less than 1, it is treated as 1. This means `substr('hello', -2, 4)` returns `'h'`. |

### replace
| Name | Return type | Description |
|------|-------------|-------------|
| replace(text *s*, text *from*, text *to*) | string | Replaces all occurrences in *s* of substring *from* from with substring *to*. |

### regexp_replace
| Name | Return type | Description |
|------|-------------|-------------|
| regexp_replace(text *s*, text *pattern*, text *replacement*) | string | Replace substrings in *s* that match the POSIX regular expression *pattern* with the *replacement*. Supports Go's [regular expression syntax][1]. |

### reverse
| Name | Return type | Description |
|------|-------------|-------------|
| reverse(text *s*) | string | Reverses the string *s*. |

### md5
| Name | Return type | Description |
|------|-------------|-------------|
| md5(text *s*) | string | Calculates the MD5 hash of *s* and returns the result in hexadecimal. |

## Mathematical functions and operators

### abs
| Name | Return type | Description |
|------|-------------|-------------|
| abs(numeric *n*) | integer | Returns the absolute value of *n*. |

### round
| Name | Return type | Description |
|------|-------------|-------------|
| round(numeric *n*, [*s*]) | numeric | Round *n* to *s* decimal places |

### modulus
| Name | Return type | Description |
|------|-------------|-------------|
| modulus(numeric *x*, numeric *y*) | integer | Returns the remainder of `x / y`. |

### floor
| Name | Return type | Description |
|------|-------------|-------------|
| floor(numeric *n*) | numeric | Returns the nearest integer that is less than or equal to *n*. |

### ceil
| Name | Return type | Description |
|------|-------------|-------------|
| ceil(numeric *n*) | numeric | Returns the nearest integer that is greater than or equal to *n*. |

### power
| Name | Return type | Description |
|------|-------------|-------------|
| power(numeric *n*, numeric *s*) | numeric | Raises *n* to the *s* power. |

### log
| Name | Return type | Description |
|------|-------------|-------------|
| log(numeric *n*) | numeric | Calculates the base 10 logarithm of *n*. |

### log2
| Name | Return type | Description |
|------|-------------|-------------|
| log2(numeric *n*) | numeric | Calculates the base 2 logarithm of *n*. |

### ln
| Name | Return type | Description |
|------|-------------|-------------|
| ln(numeric *n*) | numeric | Calculates the natural logarithm of *n*. |

### exp
| Name | Return type | Description |
|------|-------------|-------------|
| exp(numeric *n*) | numeric | Returns the mathematical constant *e*, raised to the power of *n*. |

### sqrt
| Name | Return type | Description |
|------|-------------|-------------|
| sqrt(numeric *n*) | numeric | Calculates the square root of *n*. |

## Array functions and operators

### array_length
| Name | Return type | Description |
|------|-------------|-------------|
| array_length(array *a*) | integer | Returns the length of *a* for each row. |

### array_contains
| Name | Return type | Description |
|------|-------------|-------------|
| array_contains(array *a*, expr *e*) | boolean | Returns whether the value the expression *e* evaluates to is in the array *a* for each row. |

### array_cat
| Name | Return type | Description |
|------|-------------|-------------|
| array_cat(array *a*, array *b*) | array | Returns a new array containing the combined elements from array *a* and array *b*. |

### array_append
| Name | Return type | Description |
|------|-------------|-------------|
| array_append(array *a*, expr *e*) | array | Returns a new array that includes all the original elements of *a* followed by the appended element *e*. |

### string_to_array
| Name | Return type | Description |
|------|-------------|-------------|
| string_to_array(text *s*, text *delimiter*, [text *nullString1*, *nullString2* ...]) | array | Returns an array of substrings obtained by splitting the input string *s*, using the specified *delimiter*. The third argument is optional and specifies substrings that are replaced with `NULL`. |

### array_to_string
| Name | Return type | Description |
|------|-------------|-------------|
| array_to_string(array *a*, text *delimiter*, [text *nullString1*, *nullString2* ...]) | string | Concatenates array elements using the supplied *delimiter* and optional null strings (substrings to replace with `NULL`). |

### unnest
| Name | Return type | Description |
|------|-------------|-------------|
| unnest(array *a*) | variable | Returns each element in the array as a separate row. The return type is the element type of the array. `unnest` can only be used in the `SELECT` clause of a query. If other columns are selected with `unnest`, the value at each row in the table is repeated at each "output" row with each unnested element. If multiple columns are being unnested, all the unnested columns are "zipped up" together, with `NULL` filling in the "output" values for shorter arrays. |

## Date/time functions and operators

### date_trunc
| Name | Return type | Description |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | Truncates the timestamp to the chosen *precision* ("second", "minute", "hour", "day", "week", "month", or "year"). |

### date_diff
| Name | Return type | Description |
|------|-------------|-------------|
| date_diff(string *precision*, timestamp *t1*, timestamp *t2*) | integer | Returns the difference between two dates, in the precision specified. *precision* is one of("second", "minute", "hour", "day", "week", "month", "quarter", "year") |

### to_timestamp
| Name | Return type | Description |
|------|-------------|-------------|
| to_timestamp(numeric *n*) | timestamp | Transforms *n* into a timestamp, with *n* being the time in seconds. |

### Conditional expressions

### coalesce
| Name | Return type | Description |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Returns the first non-null expression. |

### nullif
| Name | Return type | Description |
|------|-------------|-------------|
| nullif(expr *x*, expr *y*) | variable | Returns `NULL` if both arguments are equal. Otherwise, returns *x*. |

## JSON functions and operators

<!-- QUERY: An example of the below function would be helpful, if we're going to include the function in the docs. -->

### json_extract_path_text

| Name | Return type | Description |
|------|-------------|-------------|
| json_extract_path_text(text *json*, text *path...*) | text | Extracts the JSON sub-object in text defined by the path. Behavior is equivalent to that of the Postgres function of the same name. In the default executor, this function only works on resources tables; it is not implemented for metrics, events, or local tables. To extract nested fields in events tables, reference the entire path in double quotes as the column name. |

## Timeseries and point functions

<!-- QUERY: Which of these can take an array of timeseries? The verbiage on some of these function descriptions implied that, but the arguments didn't. -->

### timeseries_max
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_max(timeseries *t*) | point | Returns the point with the highest value from *t*. |

### timeseries_min
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_min(timeseries *t*) | point | Returns the point with the lowest value from *t*. |

### timeseries_first_point
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_first_point(timeseries *t*) | point | Returns the first point from *t*. |

### timeseries_last_point
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_last_point(timeseries *t*) | point | Returns the last point from *t*. |

### timeseries_avg
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_avg(timeseries *t*) | real | Returns the average value of all the points in *t*. |

### timeseries_sum
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_sum(timeseries *t*) | real | Returns the sum of all the values in all the points in *t*. |

### point_value
| Name | Return type | Description |
|------|-------------|-------------|
| point_value(point *p*) | real | Returns the value of point *p*. |

### point_timestamp
| Name | Return type | Description |
|------|-------------|-------------|
| point_timestamp(point *p*) | integer | Returns the timestamp of point *p*. |

## Sorting functions

### sort_order_ip
| Name | Return type | Description |
|------|-------------|-------------|
| sort_order_ip(string *ip*) | string | Returns a string that can be used in an `ORDER BY` to provide a stable sort over IPv4 and IPv6 addresses. |

[1]: https://pkg.go.dev/regexp/syntax
