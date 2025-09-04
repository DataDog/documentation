1. If you want to create a simple condition, leave the selection as is. If you want to create a `then` condition, click **THEN condition**.
    - Use the **Then condition** when you want to trigger a signal if query A occurs and then query B occurs.
    - **Note**: The `then` operator can only be used on a single rule condition.
1. (Optional) Click the pencil icon next to **Condition 1** if you want to change the name of the condition. This name is appended to the rule name when a signal is generated.
1. In the **Set severity to** dropdown menu, select the appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
1. If you are creating a **Simple condition**, enter the condition when a signal should be created. If you are creating a **Then condition**, enter the first condition required for a signal to be generated. See the example below.
    - All rule conditions are evaluated as condition statements. Thus, the order of the conditions affects which notifications are sent because the first condition to match generates the signal. Click and drag your rule conditions to change their ordering.
    - A rule condition contains logical operations (`>`, `>=`, `&&`, `||`) to determine if a signal should be generated based on the event counts in the previously defined queries.
    - The ASCII lowercase [query labels](#define-a-search-query) are referenced in this section. An example rule condition for query `a` is `a > 3`.
    - **Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.
1. If you are using the **Then condition**, enter the second condition required to generate a signal.
1. In the **Add notify** section, click **Add Recipient** to optionally configure [notification targets][101].
    - You can also create [notification rules][102] to avoid manual edits to notification preferences for individual detection rules.

[101]: /security_platform/notifications/#notification-channels
[102]: /security/notifications/rules/