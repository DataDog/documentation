Add a **Rule name** to configure the rule name that appears in the detection rules list view and as the title of the security signal.

In the **Rule message** section, use [notification variables][101] and Markdown to customize the notifications sent when a signal is generated. Specifically, use [template variables][102] in the notification to inject dynamic context from triggered logs directly into a security signal and its associated notifications. See the [Notification Variables documentation][101] for more information and examples.

Use the **Tag resulting signals** dropdown menu to add tags to your signals. For example, `security:attack` or `technique:T1110-brute-force`.

[101]: /security_platform/notifications/variables/
[102]: /security_platform/notifications/variables/#template-variables