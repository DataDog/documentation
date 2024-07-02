---
title: DDSQL Scalar Functions
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL is in private beta.
{{< /callout >}}

These functions return one value per row.

## String functions and operators

### upper
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| upper(text *s*) | テキスト | Converts *s* to uppercase. |

### lower
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| lower(text *s*) | テキスト | Converts *s* to lowercase. |

### length
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| length(text *s*) | 整数 | Counts the number of characters in *s*. |

### concat
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| concat(expr *x*, *y*, ...) | テキスト | Concatenates the provided expressions. |

### substr
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| substr(expr *s*, numeric *start*, numeric *numChars*) | テキスト | Returns a substring of *s* from *start* to a max of *numChars*, if provided. *start* is a 1-based index, so `substr('hello', 2)` returns `'ello'`. If the start is less than 1, it is treated as if it were 1. The result is computed by taking the range of characters `[start, start+numChars]`, where if any value is less than 1, it is treated as 1. This means `substr('hello', -2, 4)` returns `'h'`. |

### replace
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| replace(text *s*, text *from*, text *to*) | テキスト | Replaces all occurrences in *s* of substring *from* with substring *to*. |

### regexp_replace
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| regexp_replace(text *s*, text *pattern*, text *replacement*) | テキスト | Replace substrings in *s* that match the POSIX regular expression *pattern* with the *replacement*. Supports Go's [regular expression syntax][1]. |

## Mathematical functions and operators

### abs
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| abs(numeric *n*) | 整数 | Returns the absolute value of *n*. |

### round
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| round(numeric *n*, [*s*]) | numeric | Round *n* to *s* decimal places. |

### mod
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| mod(numeric *x*, numeric *y*) | 整数 | Returns the remainder of `x / y`. |

### floor
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| floor(numeric *n*) | numeric | Returns the nearest integer that is less than or equal to *n*. |

### ceil
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| ceil(numeric *n*) | numeric | Returns the nearest integer that is greater than or equal to *n*. |

### power
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| power(numeric *n*, numeric *s*) | numeric | Raises *n* to the *s* power. |

### ln
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| ln(numeric *n*) | numeric | Calculates the natural logarithm of *n*. |

### sqrt
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| sqrt(numeric *n*) | numeric | Calculates the square root of *n*. |

## Date/time functions and operators

### date_trunc
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | Truncates the timestamp to the chosen *precision* ("second", "minute", "hour", "day", "week", "month", or "year"). |

### Conditional expressions

### coalesce
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Returns the first non-null expression. |

### nullif
| 名前 | Return type | 説明 |
|------|-------------|-------------|
| nullif(expr *x*, expr *y*) | variable | Returns `NULL` if both arguments are equal. Otherwise, returns *x*. |

[1]: https://pkg.go.dev/regexp/syntax
