---
title: Can I send SMS notifications in Datadog?
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

Many customers use the [Webhooks integration][1] to send alerts to an SMS service like Twilio. For more information, see the [Send SMS alerts with webhooks and Twilio][2] blog post.

Depending on the service provider of the number you want to send an SMS alert to, you can also send SMS through email. To configure this in Datadog, send the alerts to the 10-digit phone number of the device you want to reach, followed by the corresponding mobile provider gateway. For instance, if the number is `+1 (234) 555-0100`, and the service provider is AT&T, send the alert to `2345550100@txt.att.net`. Similarly, to send an SMS to `+44 113 496 0000` where the service provider is Orange, send the alert to `1134960000@orange.net`. For other providers, look up their email-to-SMS addresses.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
