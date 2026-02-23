1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Set severity to** dropdown menu, select the appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
1. In the **Anomaly count** field, enter the condition for how many anomalous logs within the specified window are required to trigger a signal.
    - For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.
    - All rule conditions are evaluated as condition statements. Thus, the order of the conditions affects which notifications are sent because the first condition to match generates the signal. Click and drag your rule conditions to change their ordering.
    - A rule condition contains logical operations (`>`, `>=`, `&&`, `||`) to determine if a signal should be generated based on the event counts in the previously defined queries.
    - The ASCII lowercase query labels are referenced in this section. An example rule condition for query `a` is `a > 3`.
    - **Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.
1. In the **within a window of** dropdown menu, select the time period during which a signal is triggered if the condition is met.
    - An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates cases in real time.
1. In the **Add notify** section, click **Add Recipient** to optionally configure [notification targets][101].
    - You can also create [notification rules][102] to avoid manual edits to notification preferences for individual detection rules.

[101]: /security_platform/notifications/#notification-channels
[102]: /security/notifications/rules/