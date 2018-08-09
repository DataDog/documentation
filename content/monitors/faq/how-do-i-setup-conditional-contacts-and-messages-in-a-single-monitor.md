---
title: How do I setup conditional contacts and messages in a single monitor?
kind: faq
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Learn how to create a monitor
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
---

## Conditional Contacts

[Datadog monitors][1] allow for different text to be sent to different contacts based on the state of the monitor and the details of how it was triggered.

[Message template variables][2] provide this kind of conditional processing and are described within the help text in section 3 of the monitor edit page shown below:

{{< img src="monitors/faq/conditional_notification.png" alt="conditional_notification" responsive="true" >}}

These condition variables can be used within either the subject or body of the notification set in section 3 of the monitor definition.

The example above shows how to set the message text based on the monitor state. The first line captures an alert state {{#is_alert}} and the second captures a clearing (or not alert) {{^is_alert}} state.

Users may also want to send alarms to additional or different contacts or channels based on the name of the system that the monitor was triggered from.

The example below shows how to use the is_match variable to send the notification to specific contacts based on the value of a host tag named "customer":
```
{{#is_match "host.customer" "customer1"}} alert for customer 1 on {{host.name}}  @slack-customer1  {{/is_match}}  

{{#is_match "host.customer" "customer2"}} alert for customer2 on  {{host.name}} @slack-customer2  {{/is_match}} 
```

Keep in mind when using conditional tags that they must have an open (example: {{#is_alert}}) and closing (example: {{/is_alert}}) pair with the desired text and @ mentions in between.

## Using variables in @-mentions

It is also possible to use a variable as part of an @-mention for dynamic alerting.

The same example above could be written as the following:
```
alert for {{host.customer}} on {{host.name}} @slack-{{host.customer}}
```

In this case, @slack-{{host.customer}} could render to @slack-customer1 or @slack-customer2, which would then alert either the #customer1 or #customer2 channel in Slack.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /monitors/notifications
