1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Set severity to** dropdown menu, select the appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
1. In the **Query** field, enter the tags of a log that you want to trigger a signal.
    - For example, if you want logs with the tag `dev:demo` to trigger signals with a severity of `INFO`, enter `dev:demo` in the query field. Similarly, if you want logs with the tag `dev:prod` to trigger signals with a severity of `MEDIUM`, enter `dev:prod` in the query field.
1. (Optional) In the **Add notify** section, click **Add Recipient** to configure [notification targets][101].
    - You can also create [notification rules][102] to avoid manual edits to notification preferences for individual detection rules.
1. For the `else` condition, follow steps 3 and 4.
    - The `else` condition is the default condition. If you don't add any other conditions, then all logs trigger a signal with the severity set in the default condition.

[101]: /security_platform/notifications/#notification-channels
[102]: /security/notifications/rules/