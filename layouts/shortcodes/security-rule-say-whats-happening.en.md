1. Enter a **Rule name**. The name appears in the detection rules list view and the title of the security signal.
1. In the **Rule message** section, use [notification variables][201] and Markdown to customize the notifications sent when a signal is generated.
    - You can use [template variables][202] in the notification to inject dynamic context from triggered logs directly into a security signal and its associated notifications.
    - See the [Notification Variables documentation][201] for more information and examples.
1. Use the **Tag resulting signals** dropdown menu to add tags to your signals. For example, `security:attack` or `technique:T1110-brute-force`.
    - **Note**: the tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

[201]: /security_platform/notifications/variables/
[202]: /security_platform/notifications/variables/#template-variables