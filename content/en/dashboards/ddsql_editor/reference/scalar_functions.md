---
title: DDSQL Scalar Functions
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
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
| replace(text *s*, text *from*, text *to*) | text | Replaces all occurrences in *s* of substring *from* with substring *to*. |

### regexp_replace
| Name | Return type | Description |
|------|-------------|-------------|
| regexp_replace(text *s*, text *pattern*, text *replacement*) | text | Replace substrings in *s* that match the POSIX regular expression *pattern* with the *replacement*. Supports Go's [regular expression syntax][1]. |

## Mathematical functions and operators

### abs
| Name | Return type | Description |
|------|-------------|-------------|
| abs(numeric *n*) | integer | Returns the absolute value of *n*. |

### round
| Name | Return type | Description |
|------|-------------|-------------|
| round(numeric *n*, [*s*]) | numeric | Round *n* to *s* decimal places. |

### mod
| Name | Return type | Description |
|------|-------------|-------------|
| mod(numeric *x*, numeric *y*) | integer | Returns the remainder of `x / y`. |

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

### ln
| Name | Return type | Description |
|------|-------------|-------------|
| ln(numeric *n*) | numeric | Calculates the natural logarithm of *n*. |

### sqrt
| Name | Return type | Description |
|------|-------------|-------------|
| sqrt(numeric *n*) | numeric | Calculates the square root of *n*. |

## Date/time functions and operators

### date_trunc
| Name | Return type | Description |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | Truncates the timestamp to the chosen *precision* ("second", "minute", "hour", "day", "week", "month", or "year"). |

### Conditional expressions

### coalesce
| Name | Return type | Description |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Returns the first non-null expression. |

### nullif
| Name | Return type | Description |
|------|-------------|-------------|
| nullif(expr *x*, expr *y*) | variable | Returns `NULL` if both arguments are equal. Otherwise, returns *x*. |

[1]: https://pkg.go.dev/regexp/syntax
