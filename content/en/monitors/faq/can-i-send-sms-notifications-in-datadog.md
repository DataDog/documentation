---
title: Can I send SMS notifications in Datadog?
kind: faq
further_reading:
- link: "/monitors/monitor_types/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

Many of our customers use the [webhooks integration][1] to send alerts to an SMS service like Twilio.  
We have [a blog post][2] which should help you achieve this.

Another option is to send a SMS via an email. To configure this in Datadog, use the email relative to your cell phone provider. A few examples are listed below:

AT&T: phonenumber@txt.att.net
T-Mobile: phonenumber@tmomail.net
Sprint: phonenumber@messaging.sprintpcs.com
Verizon: phonenumber@vtext.com or phonenumber@vzwpix.com
Virgin Mobile: phonenumber@vmobl.com

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
