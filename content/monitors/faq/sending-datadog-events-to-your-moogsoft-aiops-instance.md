---
title: Sending Datadog Events to your Moogsoft AIOps instance.
kind: faq
customnav: monitornav
further_reading:
- link: "/monitors/monitor_types"
  tag: "Monitors"
  text: Learn how to create a monitor
- link: "/monitors/notifications"
  tag: "Monitors"
  text: Configure your monitor notifications
- link: "/monitors/downtimes"
  tag: "Monitors"
  text: Schedule a downtime to mute a monitor
---

Moogsoft supports the ingesting of Datadog Events via Webhooks.  Below you will find some quick instructions on how to enable this capability.  

1. To create a webhook that forwards a Datadog Event to your Moogsoft AIOps Instance, open the configuration tab of the [Datadog Webhooks Integration Page](https://app.datadoghq.com/account/settings#integrations/webhooks). 

2. Enter a name, for example "Moogsoft" and URL to your Moogsoft AIOps instance webhook endpoint: `https://YOUR_INSTANCE_NAME.moogsoft.com/events/webhook_webhook1`

3. Add the following JSON to the Custom Payload section of the Datadog Webhook Integration and ensure the "Use custom payload" box is checked:
```json
{
"source": "$HOSTNAME",
"external_id": "$ALERT_ID",
"severity": "$ALERT_TRANSITION",
"type": "$EVENT_TYPE",
"class": "$EVENT_TITLE",
"description": "$EVENT_MSG",
"agent_time": "$LAST_UPDATED"
} 
```

    {{< img src="monitors/faq/payload.png" alt="Payload" responsive="true" popup="true" >}}

Definitions of all fields available for mapping between Moogsoft and Datadog can be found at the following links: 
    * https://docs.moogsoft.com/display/060102/Event+Details 
    * [Datadog Webhooks usage](/integrations/webhooks/#usage)

4. To generate the basic authentication string that will be used in the Headers section of the above Webhook Integration, take a username and password for a Moogsoft user in the following format 'username:password' and base64 encode it. 
5. Add the following JSON to the Headers field in Datadog.  Replace xxx with the output from step 4:

```json
{
"Content-Type": "application/json",
"Authorization": "Basic xxx"
}
```

{{< img src="monitors/faq/header.png" alt="header" responsive="true" popup="true" >}}

6. Click Install Integration to validate the Webhook endpoint and enable.
7. You are ready to add this Webhook to any of your Datadog Monitors via the @notification (i.e. @webhook-Moogsoft):
{{< img src="monitors/faq/notification.png" alt="notification" responsive="true" popup="true" >}}

Thank you to the Moogsoft team for writing the original article: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak

{{< partial name="whats-next/whats-next.html" >}}