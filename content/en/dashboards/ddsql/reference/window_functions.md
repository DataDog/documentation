---
title: DDSQL Window Functions
kind: documentation
---

{{< callout url="https://google.com">}}
DDSQL is in private beta.
{{< /callout >}}

## row_number
| Name | Return type | Description |
|------|-------------|-------------|
| row_number() | integer | Returns the number of the current row within its partition, counting from 1. |

## rank
| Name | Return type | Description |
|------|-------------|-------------|
| rank() | integer | Returns the rank of the current row, with gaps; that is, the row_number of the first row in its peer group. |

## dense_rank
| Name | Return type | Description |
|------|-------------|-------------|
| dense_rank() | integer | Returns the rank of the current row, without gaps; this function effectively counts peer groups. |

## cumulative_rank
| Name | Return type | Description |
|------|-------------|-------------|
| cumulative_rank() | integer | Returns the relative rank of the current row, that is (rank - 1) / (total partition rows - 1). The value thus ranges from 0 to 1 inclusive. |

## lag
| Name | Return type | Description |
|------|-------------|-------------|
| lag(value T [, offset integer [, default T ]]) | T | Returns value evaluated at the row that is offset rows before the current row within the partition; if there is no such row, instead returns default (which must be of a type compatible with value). Both offset and default are evaluated with respect to the current row. If omitted, offset defaults to 1 and default to NULL. |

## lead
| Name | Return type | Description |
|------|-------------|-------------|
| lead(value T [, offset integer [, default T ]]) | T | Returns value evaluated at the row that is offset rows after the current row within the partition; if there is no such row, instead returns default (which must be of a type compatible with value). Both offset and default are evaluated with respect to the current row. If omitted, offset defaults to 1 and default to NULL. |

## first_value
| Name | Return type | Description |
|------|-------------|-------------|
| first_value(value T) | T | Returns value evaluated at the row that is the first row of the window frame. |

## nth_value
| Name | Return type | Description |
|------|-------------|-------------|
| nth_value(value T, n integer) | T | Returns value evaluated at the row that is the n'th row of the window frame (counting from 1); returns NULL if there is no such row. |

## last_value
| Name | Return type | Description |
|------|-------------|-------------|
| last_value(value T) | T | Returns value evaluated at the row that is the last row of the window frame. |