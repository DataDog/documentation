1. In the **Set severity to** dropdown menu, select the appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
1. In the **Anomaly Percentile** dropdown menu, select a minimum percentage required for Cloud SIEM to generate a signal.{% br /%}The anomaly percentile refers to the log volume over the selected time period to your historical log volumes. If you select 99.5%, then Cloud SIEM only generates a signal if the number of logs is greater than 99.5% of all prior periods.
1. (Optional) In the **And notify** section, click **Add Recipient** to configure [notification targets][101].
    - You can create [notification rules][102] to manage notifications automatically, avoiding manual edits for each detection rule.

<!-- Links shared with set_conditions.md -->
[101]: /security_platform/notifications/#notification-channels
[102]: /security/notifications/rules/