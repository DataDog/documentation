The **Rule name** section allows you to configure the rule name that appears in the detection rules list view, as well as the title of the Security Signal.

Use [notification variables][101] and Markdown to customize the notifications sent when a signal is generated. You can reference the tags associated with the signal and the event attributes in the notification. The list of available attributes is in the **JSON** section of the **Overview** tab in the signal panel. Use the following syntax to add the attributes to the notification: `{{@attribute}}`. Use the JSON dot notation to access the inner keys of the event attributes, for example, `{{@attribute.inner_key}}`.

This JSON object is an example of event attributes that may be associated with a security signal:

```json
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "usr": {
    "id": "user@domain.com"
  },
  "evt": {
    "category": "authentication",
    "outcome": "success"
  },
  "used_mfa": "false"
}

```

You could use the following in the **Say what’s happening** section:

```
{{@usr.id}} just logged in without MFA from {{@network.client.ip}}.
```

And this would be rendered as the following:

```
user@domain.com just logged in without MFA from 1.2.3.4.
```

You can use if-else logic to see if an attribute exists with the notation:

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

You can use if-else logic to see if an attribute matches a value:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

See [Notification Variables][101] for more information.

Use the **Tag resulting signals** dropdown to tag your signals with different tags. For example, `security:attack` or `technique:T1110-brute-force`.

**Note**: The tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

[101]: /security_platform/notifications/variables/