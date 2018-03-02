---
categories:
- notification
ddtype: crawler
description: Use any Webhook as a notification channel in Datadog alerts and events.
doc_link: https://docs.datadoghq.com/integrations/webhooks/
git_integration_title: webhooks
has_logo: true
integration_title: Webhooks
is_public: true
kind: integration
manifest_version: '1.0'
name: webhooks
public_title: Datadog-Webhooks Integration
short_description: Use any Webhook as a notification channel in Datadog alerts and
  events.
version: '1.0'
---

## Overview

With Webhooks you'll be able to:

* Connect to your services.
* Alert your services when a metric alert is triggered.

## Setup
### Configuration

Go to the [webhook integration tile](https://app.datadoghq.com/account/settings#integrations/webhooks) and enter the URL and name of the webhook you want to use

## Usage

To use your webhook, add **@webhook-*name_of_the_webhook*** in the text of the metric alert you want to trigger the webhook. It will trigger a POST request to the URL you set with the following content in JSON format.

You can also specify your own payload in order to add your own custom fields to the request. Check the **Use Custom Payload** checkbox and specify your own custom payload, using the following variables. If you want your payload to be URL-encoded, check the **Encode as form** payload and specify your payload in a json format.

|Variable|Meaning|
|-----|-----|
|$AGGREG_KEY| ID to aggregate events belonging together *(ex: 9bd4ac313a4d1e8fae2482df7b77628)*|
|$ALERT_CYCLE_KEY|ID to link events from the time an alert triggers until it resolves|
|$ALERT_ID| ID of alert *(ex: 1234)*|
|$ALERT_METRIC| Name of the metric if it's an alert *(ex: `system.load.1`)*|
|$ALERT_QUERY| Query of the monitor that triggered the webhook|
|$ALERT_SCOPE| Comma-separated list of tags triggering the alert *(ex: `availability-zone:us-east-1a, role:computing-node`)*|
|$ALERT_STATUS| Summary of the alert status *(ex: system.load.1 over host:my-host was > 0 at least once during the last 1m)*|
|$ALERT_TITLE| Title of the alert|
|$ALERT_TRANSITION| Type of alert notification *(values: `Triggered` or `Recovered`)*|
|$ALERT_TYPE| Type of the alert|
|$DATE| Date *(epoch)* where the event happened *(ex: 1406662672000)*|
|$EMAIL| Email of the user posting the event that triggered the webhook|
|$EVENT_MSG| Text of the event *(ex: @webhook-url Sending to the webhook)*|
|$EVENT_TITLE| Title of the event *(ex: \[Triggered] \[Memory Alert])*|
|$EVENT_TYPE| Type of the event *(values: `metric_alert_monitor`, `event_alert`, or `service_check`)*|
|$HOSTNAME|The hostname of the server associated with the event (if there is one)|
|$ID | ID of the event *(ex: 1234567)*|
|$LAST_UPDATED| Date when the event was last updated|
|$LINK| Url of the event *(ex: `https://app.datadoghq.com/event/jump_to?event_id=123456`)*|
|$METRIC_NAMESPACE|Namespace of the metric if it's an alert|
|$ORG_ID| ID of your organization *(ex: 11023)*|
|$ORG_NAME| Name of your organization *(ex: Datadog)*|
|$PRIORITY| Priority of the event *(values: `normal` or `low`)*|
|$SNAPSHOT| Url of the image if the event contains a snapshot *(ex: `https://url.to.snpashot.com/`)*|
|$TAGS| Comma-separated list of the event tags *(ex: `monitor, name:myService, role:computing-node`)*|
|$TEXT_ONLY_MSG|Text of the event without markdown formatting|
|$USER| User posting the event that triggered the webhook *(ex: rudy)*|
|$USERNAME|Username of the user posting the event that triggered the webhook|

If you want to post your Webhooks to a service requiring authentication, you can Basic HTTP authentication my modifing your URL from `https://my.service.com` to `https://username:password@my.service.com`.

### Multiple webhooks
In a monitor alert, if 2+ webhook endpoints are notified then a webhook queue is created on a per service level. This means if you reach out to pagerduty and slack for example, a retry on the slack webhook will not affect the pagerduty one. 

However, in the Pagerduty scope, certain events always goes before others. Specifically an “Acknowledge” payload always goes before “Resolution”, so if an acknowledgement ping fails, the resolution ping will be queued due to the retry logic.

#### How the queue behaves if a webhook fails ?
A service X webhook failure should not affect the webhook of service Y

#### What causes a webhook to fail (5XX response or internal error) ?
We only issue a retry if there is an internal error (badly formed notification message) or we receive a 5XX response from the webhook endpoint.

### Examples
#### Sending SMS through Twilio

Use as URL:
`https://{Your-Account-id}:{Your-Auth-Token}@api.twilio.com/2010-04-01/Accounts/{Your-Account-id}/Messages.json`
and as payload

    {
        "To":"+1347XXXXXXX",
        "From":"+1347XXXXXX",
        "Body":"$EVENT_TITLE \n Related Graph: $SNAPSHOT"
    }



replacing `To` with your phone number and `From` with the one twilio attributed to you. Check the **Encode as form** checkbox.

#### Creating an issue in Jira

Use as URL:
`https://{Your-Jira-Username}:{Your-Jira-Password}@{Your-Domain}.atlassian.net/rest/api/2/issue`
and as payload
```json
{
    "fields": {
        "project": {
            "key": "YOUR-PROJECT-KEY"
            },
        "issuetype": {
            "name": "Task"
        },
        "description": "There's an issue. See the graph: $SNAPSHOT and event: $LINK",
        "summary": "$EVENT_TITLE"
    }
}
```
Don't check the "Encode as form" checkbox.

