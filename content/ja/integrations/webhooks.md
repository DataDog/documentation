---
categories:
- developer tools
- notifications
custom_kind: integration
dependencies: []
description: Use any Webhook as a notification channel in Datadog alerts and events.
doc_link: https://docs.datadoghq.com/integrations/webhooks/
draft: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
  tag: Terraform
  text: Create and manage webhooks with Terraform
git_integration_title: webhooks
has_logo: true
integration_id: ''
integration_title: Webhooks
integration_version: ''
is_public: true
manifest_version: '1.0'
name: webhooks
public_title: Datadog-Webhooks Integration
short_description: Use any Webhook as a notification channel in Datadog alerts and
  events.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Webhooks enable you to:

-   Connect to your services.
-   Alert your services when a metric alert is triggered.

## Setup

Go to the [Webhooks integration tile][1] and enter the URL and name of the webhook you want to use.

## Usage

To use your webhook, add `@webhook-<WEBHOOK_NAME>` in the text of the metric alert you want to trigger the webhook. It triggers a POST request to the URL you set with the following content in JSON format. The timeout for any individual request is 15 seconds. Datadog only issues a retry if there is an internal error (badly formed notification message), or if Datadog receives a 5XX response from the webhook endpoint. Missed connections are retried 5 times.

**Note**: Custom headers must be in JSON format.

To add your own custom fields to the request, you can also specify your own payload in the Payload field. If you want your payload to be URL-encoded, check the **Encode as form** checkbox and specify your payload in JSON format. Use the variables in the following section.

### Variables

$AGGREG_KEY
: ID to aggregate events belonging together.<br />
**Example**: `9bd4ac313a4d1e8fae2482df7b77628`

$ALERT_CYCLE_KEY
: ID to link events from the time an alert triggers until it resolves.

$ALERT_ID
: ID of alert.<br />
**Example**: `1234`

$ALERT_METRIC
: Name of the metric if it's an alert.<br />
**Example**: `system.load.1`

$ALERT_PRIORITY
: Priority of the alerting monitor.<br />
**Example**: `P1`, `P2`

$ALERT_QUERY
: Query of the monitor that triggered the webhook.

$ALERT_SCOPE
: Comma-separated list of tags triggering the alert.<br />
**Example**: `availability-zone:us-east-1a, role:computing-node`

$ALERT_STATUS
: Summary of the alert status.<br />
**Example**: `system.load.1 over host:my-host was > 0 at least once during the last 1m`
**Note**: To populate this variable in webhook payloads from Logs Monitor alerts, `$ALERT_STATUS` must be manually added in the Webhook integration tile.

$ALERT_TITLE
: Title of the alert.<br />
**Example**: `[Triggered on {host:ip-012345}] Host is Down`

$ALERT_TRANSITION
: Type of alert notification.<br />
**Example**: `Recovered`, `Triggered`/`Re-Triggered`, `No Data`/`Re-No Data`, `Warn`/`Re-Warn`, `Renotify`

$ALERT_TYPE
: Type of the alert.<br />
**Example**: `error`, `warning`, `success`, `info`

$DATE
: Date _(epoch)_ where the event happened.<br />
**Example**: `1406662672000`

$EMAIL
: Email of the user posting the event that triggered the webhook.

$EVENT_MSG
: Text of the event.<br />
**Example**: `@webhook-url Sending to the webhook`

$EVENT_TITLE
: Title of the event.<br />
**Example**: `[Triggered] [Memory Alert]`

$EVENT_TYPE
: Type of the event.<br />
See the list of [event types](#event-types) under [Examples](#examples).

$HOSTNAME
: The hostname of the server associated with the event, if there is one.

$ID
: ID of the event.<br />
**Example**: `1234567`

$INCIDENT_ATTACHMENTS
: List of JSON objects with the incident's attachments, such as postmortem and documents.<br />
**Example**: `[{"attachment_type": "postmortem", "attachment": {"documentUrl": "https://app.datadoghq.com/notebook/123","title": "Postmortem IR-1"}}]` 

$INCIDENT_COMMANDER
: JSON object with the incident commander's handle, uuid, name, email, and icon.

$INCIDENT_CUSTOMER_IMPACT
: JSON object with an incident's customer impact status, duration, and scope.<br />
**Example**: `{"customer_impacted": true, "customer_impact_duration": 300 ,"customer_impact_scope": "scope here"}`

$INCIDENT_FIELDS
: JSON object mapping each of an incident's fields to its values.<br />
**Example**: `{"state": "active", "datacenter": ["eu1", "us1"]}`

$INCIDENT_INTEGRATIONS
: List of JSON objects with the incident's integrations, such as Slack and Jira.<br />
**Example**: `[{"uuid": "11a15def-eb08-52c8-84cd-714e6651829b", "integration_type": 1, "status": 2, "metadata": {"channels": [{"channel_name": "#incident-1", "channel_id": "<channel_id>", "team_id": "<team_id>", "redirect_url": "<redirect_url>"}]}}]`

$INCIDENT_MSG
: The message of the incident notification.<br />

$INCIDENT_PUBLIC_ID
: Public ID of the associated incident.<br />
**Example**: `123`

$INCIDENT_SEVERITY
: Severity of the incident.

$INCIDENT_STATUS
: Status of the incident.

$INCIDENT_TITLE
: Title of the incident.

$INCIDENT_TODOS
: List of JSON objects with the incident's remediation tasks.<br />
**Example**: `[{"uuid": "01c03111-172a-50c7-8df3-d61e64b0e74b", "content": "task description", "due_date": "2022-12-02T05:00:00+00:00", "completed": "2022-12-01T20:15:00.112207+00:00", "assignees": []}]`

$INCIDENT_URL
: URL of the incident.<br />
**Example**: `https://app.datadoghq.com/incidents/1`

$INCIDENT_UUID
: UUID of the associated incident.<br />
**Example**: `01c03111-172a-50c7-8df3-d61e64b0e74b`

$LAST_UPDATED
: Date when the event was last updated.

$LINK
: URL of the event.<br />
**Example**: `https://app.datadoghq.com/event/jump_to?event_id=123456`

$LOGS_SAMPLE
: A JSON object containing a logs sample from log monitor alerts. The maximum length of the sample message is 500 characters.<br />
**Example**:<br />
: {{< code-block lang="json">}}
{
  "columns": [
    "Time",
    "Host"
  ],
  "label": "Sample Logs",
  "rows": [
    {
      "items": [
        "15:21:18 UTC",
        "web"
      ],
      "message": "[14/Feb/2023:15:21:18 +0000] \"GET / HTTP/1.1\" 200"
    },
    {
      "items": [
        "15:21:13 UTC",
        "web00"
      ],
      "message": "[14/Feb/2023:15:21:13 +0000] \"GET / HTTP/1.1\" 200"
    }
  ]
}
{{< /code-block >}}

$METRIC_NAMESPACE
: Namespace of the metric if it's an alert.

$ORG_ID
: ID of your organization.<br />
**Example**: `11023`

$ORG_NAME
: Name of your organization.<br />
**Example**: `Datadog`

$PRIORITY
: Priority of the event.<br />
**Example**: `normal` or `low`

$SECURITY_RULE_NAME
: The name of the security rule.

$SECURITY_SIGNAL_ID
: The unique identifier of the signal.<br />
**Example**: `AAAAA-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

$SECURITY_SIGNAL_SEVERITY
: The severity of the security signal.<br />
**Example**: `medium`

$SECURITY_SIGNAL_TITLE
: The title of the security signal.

$SECURITY_SIGNAL_MSG
: The message of the security signal.

$SECURITY_SIGNAL_ATTRIBUTES
: The security signal attributes.<br />
**Example**: `{"network":{"client":{"ip":"1.2.3.4"}}, "service": ["agent"]}`

$SECURITY_RULE_ID
: The security rule ID.<br />
**Example**: `aaa-aaa-aaa`

$SECURITY_RULE_MATCHED_QUERIES
: The queries associated with the security rule.<br />
**Example**: `["@evt.name:authentication"]`

$SECURITY_RULE_GROUP_BY_FIELDS
: The security group by key value pairs.<br />
**Example**: `{"@usr.name":"john.doe@your_domain.com"}`

$SECURITY_RULE_TYPE
: The security rule type.<br />
**Example**: `log_detection`

$SNAPSHOT
: URL of the image if the event contains a snapshot.<br />
**Example**: `https://p.datadoghq.com/path-to-snapshot`

$SYNTHETICS_TEST_NAME
: Name of the Synthetics test.

$SYNTHETICS_FIRST_FAILING_STEP_NAME 
: Name of the first failing step of the Synthetics test.

$SYNTHETICS_SUMMARY
: Summary of Synthetic test details.<br />
**Example**:
```
{
  "result_id": "1871796423670117676",
  "test_type": "browser",
  "test_name": "Test name",
  "date": "Nov 05, 2021, 09:49AM UTC",
  "test_url": "https://app.datadoghq.com/synthetics/edit/apc-ki3-jwx",
  "result_url": "https://app.datadoghq.com/synthetics/details/anc-ki2-jwx?resultId=1871796423670117676",
  "location": "Frankfurt (AWS)",
  "browser": "Chrome",
  "device": "Laptop Large",
  "failing_steps": [
    {
      "error_message": "Error: Element's content should contain given value.",
      "name": "Test span #title content",
      "is_critical": true,
      "number": "3.1"
    }
  ]
}
```

$TAGS
: Comma-separated list of the event tags.<br />
**Example**: `monitor, name:myService, role:computing-node`

$TAGS[key]
: Value of the `key` tag. If there is no `key` tag or the `key` tag has no value, this expression evaluates to an empty string.
**Example**: If `$TAGS` includes `role:computing-node`, then `$TAGS[role]` evaluates to `computing-node`

$TEXT_ONLY_MSG
: Text of the event without Markdown formatting.

$USER
: User posting the event that triggered the webhook.<br />
**Example**: `rudy`

$USERNAME
: Username of the user posting the event that triggered the webhook.

### Custom variables

In addition to the list of built-in variables, you can create your own custom ones in the integration tile. You can use these variables in webhook URLs, payloads, and custom headers. A common use case is storing credentials, like usernames and passwords.

You can also hide custom variable values for extra security. To hide a value, select the **hide from view** checkbox when you edit or add a custom variable:

{{< img src="/integrations/webhooks/webhook_hidefromview.png" alt="Hide from view checkbox masks custom variable values" style="width:100%;" >}}

### Authentication

#### HTTP Basic Authentication

If you want to post your webhooks to a service requiring authentication, you can use basic HTTP authentication by modifying your URL from `https://my.service.example.com` to `https://<USERNAME>:<PASSWORD>@my.service.example.com`.

#### OAuth 2.0 Authentication

If you want to post your webhooks to a service that requires OAuth 2.0 authentication, you can setup an Auth Method. An Auth Method includes all of the information required to obtain an OAuth token from your service. Once an Auth Method is configured and associated with a webhook, Datadog will handle obtaining the OAuth token, refreshing it if necessary, and adding it to the webhook request as a Bearer token.

To add an Auth Method, click the Auth Methods tab then click the New Auth Method button. Give the Auth Method a descriptive name, then enter the following information:

* Access Token URL
* Client ID
* Client Secret
* Scope (optional)
* Audience (optional)

Click Save to create the Auth Method. To apply this Auth Method to a webhook, go back to the Configuration tab and select an existing webhook configuration and click the Edit button. The Auth Method that you created should now appear in the Auth Method select list.

### Multiple webhooks

In a monitor alert, if 2 or more webhook endpoints are notified, then a webhook queue is created on a per service level. For instance, if you reach out to PagerDuty and Slack, a retry on the Slack webhook does not affect the PagerDuty one.

However, in the PagerDuty scope, certain events always go before others—specifically, an "Acknowledge" payload always goes before "Resolution". If an "Acknowledge" ping fails, the "Resolution" ping is queued due to the retry logic.

## Examples

### Sending SMS through Twilio

Use as URL:
`https://<ACCOUNT_ID>:<AUTH_TOKEN>@api.twilio.com/2010-04-01/Accounts/<ACCOUNT_ID>/Messages.json`

and as a payload:

```json
{
    "To": "+1347XXXXXXX",
    "From": "+1347XXXXXX",
    "Body": "$EVENT_TITLE \n Related Graph: $SNAPSHOT"
}
```

Replace `To` with your phone number and `From` with the one Twilio attributed to you. Check the **Encode as form** checkbox.

### Creating an issue in Jira

Use as URL:
`https://<JIRA_USER_NAME>:<JIRA_PASSWORD>@<YOUR_DOMAIN>.atlassian.net/rest/api/2/issue`

and as a payload:

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

Do not check the "Encode as form" checkbox.

### List of event types in the Webhooks payload {#event-types}

| Event Type | Associated Monitors |
| ---------  | ------------------- |
| `ci_pipelines_alert` | CI Pipelines |
| `ci_tests_alert` | CI Tests |
| `composite_monitor` | Composite |
| `error_tracking_alert` | Error Tracking |
| `event_alert` | Event using V1 endpoint |
| `event_v2_alert` | Event with V2 endpoint |
| `log_alert` | Logs |
| `monitor_slo_alert` | Monitor based SLO |
| `metric_slo_alert` | Metric based SLO |
| `outlier_monitor` | Outlier |
| `process_alert` | Process |
| `query_alert_monitor` | Metric, Anomaly, Forecast |
| `rum_alert` | RUM |
| `service_check` | Host, Service Check |
| `synthetics_alert` | Synthetics |
| `trace_analytics_alert` | Trace Analytics |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/webhooks