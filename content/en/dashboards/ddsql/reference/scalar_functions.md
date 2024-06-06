---
title: DDSQL Scalar Functions
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

These functions return one value per row.

## String functions and operators

### upper
| Name | Return type | Description |
|------|-------------|-------------|
| upper(text s) | text | Upper-case s |

### lower
| Name | Return type | Description |
|------|-------------|-------------|
| lower(text s) | text | Lower-case s |

### length
| Name | Return type | Description |
|------|-------------|-------------|
| length(text s) | integer | Length of s |

### concat
| Name | Return type | Description |
|------|-------------|-------------|
| concat(expr x, y, …) | text | Concatenate x, y, … |

### substr
| Name | Return type | Description |
|------|-------------|-------------|
| substr(expr s, numeric start, numeric numChars) | text | Return substring of s from start to a max of numChars, if provided. start is a 1-based index, so substr('hello', 2) is 'ello'. If the start is less than 1, it is treated the same as if it was 1. The result is computed by taking the range of characters [start, start+numChars], where if any value is less than 1, it is treated as 1. This means substr('hello', -2, 4)='h'. See detailed explanation. |

### replace
| Name | Return type | Description |
|------|-------------|-------------|
| replace(text s, text from, text to) | string | Replaces all occurrences in s of substring from with substring to. |

### regexp_replace
| Name | Return type | Description |
|------|-------------|-------------|
| regexp_replace(expr text, pattern text, replacement text) | string | Replace substring matching POSIX regular expression. Uses Golang's regexp package (syntax documentation). |

### reverse
| Name | Return type | Description |
|------|-------------|-------------|
| reverse(expr text) | string | Reverses the string, for example brown → nworb |

### md5
| Name | Return type | Description |
|------|-------------|-------------|
| md5(expr text) | string | Calculate the MD5 hash of a string and returns the result in hexadecimal |

## Mathematical functions and operators

### abs
| Name | Return type | Description |
|------|-------------|-------------|
| abs(numeric n) | integer | Absolute value |

### round
| Name | Return type | Description |
|------|-------------|-------------|
| round(numeric n, [s]) | numeric | Round n to s decimal places |

### modulus
| Name | Return type | Description |
|------|-------------|-------------|
| modulus(numeric n, numeric n) | integer | remainder of y/x |

### floor
| Name | Return type | Description |
|------|-------------|-------------|
| floor(numeric n) | numeric | nearest integer less than or equal to argument |

### ceil
| Name | Return type | Description |
|------|-------------|-------------|
| ceil(numeric n) | numeric | nearest integer greater than or equal to argument |

### power
| Name | Return type | Description |
|------|-------------|-------------|
| power(numeric n, numeric s) | numeric | power with n as the base and s as exponent |

### log
| Name | Return type | Description |
|------|-------------|-------------|
| log(numeric n) | numeric | logarithm to base 10 of n |

### log2
| Name | Return type | Description |
|------|-------------|-------------|
| log2(numeric n) | numeric | logarithm to base 2 of n |

### ln
| Name | Return type | Description |
|------|-------------|-------------|
| ln(numeric n) | numeric | natural logarithm of n |

### exp
| Name | Return type | Description |
|------|-------------|-------------|
| exp(numeric n) | numeric | the mathematical constant e, raised to the power of n |

### sqrt
| Name | Return type | Description |
|------|-------------|-------------|
| sqrt(numeric n) | numeric | square root of n |

## Array functions and operators

### array_length
| Name | Return type | Description |
|------|-------------|-------------|
| array_length(array a) | integer | Returns the length of the array a for each row |

### array_contains
| Name | Return type | Description |
|------|-------------|-------------|
| array_contains(array a, expr e) | boolean | Returns whether the value the expr e evaluates to is in the array a for each row |

### array_cat
| Name | Return type | Description |
|------|-------------|-------------|
| array_cat(array a, array b) | array | Returns a new array containing the combined elements from array a and array b. |

### array_append
| Name | Return type | Description |
|------|-------------|-------------|
| array_append(array a, expr e) | array | Returns a new array that includes all the original elements of the input array followed by the appended element. |

### string_to_array
| Name | Return type | Description |
|------|-------------|-------------|
| string_to_array(text s, delimiter, [,nullString]) | array | Returns an array of substrings obtained by splitting the input string s, using the specified delimiter. The third argument, nullString, is optional and specifies substrings that are replaced with NULL. |

### array_to_string
| Name | Return type | Description |
|------|-------------|-------------|
| array_to_string(array a, delimiter, [,nullString]) | string | Concatenates array elements using supplied delimiter and optional null string. |

### unnest
| Name | Return type | Description |
|------|-------------|-------------|
| unnest(array a) | variable | Returns each element in the array as a separate row. The return type is the element type of the array. unnest can only be used in the SELECT clause of a query. If other columns are SELECTed with unnest, the value at each row in the table is repeated at each "output" row with each unnested elements. If multiple columns are being unnested, all the unnested columns are "zipped up" together, with NULL filling in the "output" values for shorter arrays. |

## Date/time functions and operators

### date_trunc
| Name | Return type | Description |
|------|-------------|-------------|
| date_trunc(string precision, timestamp t) | timestamp | Truncates the timestamp to the precision chosen. precision is one of ("second", "minute", "hour", "day", "week", "month", "year") |

### date_diff
| Name | Return type | Description |
|------|-------------|-------------|
| date_diff(string precision, timestamp t, timestamp t) | integer | Returns the difference between two dates, in the precision specified. precision is one of("second", "minute", "hour", "day", "week", "month", "quarter", "year") |

### to_timestamp
| Name | Return type | Description |
|------|-------------|-------------|
| to_timestamp(numeric n) | timestamp | Transforms n into a timestamp, considering n as the time in seconds. |

### Conditional expressions

### coalesce
| Name | Return type | Description |
|------|-------------|-------------|
| coalesce(expr x, y, …) | variable | Returns first non-null expression |

### nullif
| Name | Return type | Description |
|------|-------------|-------------|
| nullif(expr x, y) | variable | Return NULL if both arguments are equal otherwise returns x |

## JSON functions and operators

### json_extract_path_text
| Name | Return type | Description |
|------|-------------|-------------|
| json_extract_path_text(text json, text path…) | text | Extracts the JSON sub-object in text defined by the path, equivalent behaviour as the postgres function of the same name. In the default executor, this function only works on resources tables - it is not implemented for metrics, events, or local tables. Malamute/Bergamot contain an implementation for the function, which can be used for any source by setting the execution path. To extract nested fields/JSON in events tables, reference the entire path in double quotes as the column name. |

## Timeseries and point functions

### timeseries_max
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_max(timeseries t) | point | Return point with max value from t |

### timeseries_min
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_min(timeseries t) | point | Return point with min value from t |

### timeseries_first_point
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_first_point(timeseries t) | point | Return first point from t |

### timeseries_last_point
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_last_point(timeseries t) | point | Return last point from t |

### timeseries_avg
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_avg(timeseries t) | real | Returns the average value of all the points for each timeseries t |

### timeseries_sum
| Name | Return type | Description |
|------|-------------|-------------|
| timeseries_sum(timeseries t) | real | Returns the sum of all the values in all the points for each timeseries t |

### point_value
| Name | Return type | Description |
|------|-------------|-------------|
| point_value(point p) | real | Return value of point p |

### point_timestamp
| Name | Return type | Description |
|------|-------------|-------------|
| point_timestamp(point p) | integer | Return timestamp of point p |

## Sorting functions

### sort_order_ip
| Name | Return type | Description |
|------|-------------|-------------|
| sort_order_ip(string ip) | string | Returns a string which can be used in an ORDER BY to provide a stable sort over IPv4 and IPv6 addresses |

