All rule cases are evaluated as case statements. Thus, the order of the cases affects which notifications are sent because the first case to match generates the signal. Click and drag your rule cases to change their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [query labels](#define-a-search-query) are referenced in this section. An example rule case for query `a` is `a > 3`.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.