---
title: Datadog-New Relic Integration
integration_title: New Relic
kind: integration
---

### Overview
Connect to New Relic to:

* See key New Relic metrics (like response time and Apdex score) in context with the rest of your Datadog metrics
* See New Relic alerts in your event stream

### Installation

#### New Relic Alerts in Event Stream

1. On the Webhook tab of New Relic's alerting notification settings page, enter the following webhook URL:

        https://app.datadoghq.com/intake/webhook/newrelic?api_key={YOUR_DATADOG_API_KEY}

2. For 'Custom Payload'(s), select JSON 'Payload Type'.

#### New Relic APM Metric Collection

1. Locate your API key on New Relic's API Keys page (**Account Settings** -> **Integrations** -> **API Keys**) and enter it in the form on the [Datadog New Relic Integration](https://app.datadoghq.com/account/settings#integrations/new_relic) page.

    *Note: Metrics can only be imported for New Relic customers at the Pro level or above.*

2. If you wish to tag metrics at an account level, please add an account tag.
3. Choose whether you want to collect your metrics per hosts or app-wide.

    *Note: Enabling this options will import New Relic hosts to Datadog.*

### Troubleshooting & FAQ

#### What does the 'Collect metrics by host' option do ?

When set, Datadog collects application metrics for every associated hosts,
instead of the overall host throughput based average.

This makes sense when using those metrics separately, i.e.
"host X has aberrant error rate Y which is problematic, though application Z overall
across many hosts has an acceptable error rate in aggregate".

This also import New Relic hosts to Datadog Infrastructure section.

#### I have the 'Collect metrics by host' option enable. Why do my application-level metrics have different values in New Relic and Datadog?

When New Relic computes the aggregate application-level value for
metrics that are measured at the host level (e.g. response time), they
compute a weighted average based on each host's measured throughput.

The closest thing you'll see in Datadog is the `avg` aggregator, which
computes the arithmetic mean of the values. This is also the default
aggregator, and what you'll get for the simplest query, something like
`new_relic.web_transaction.average_response_time{*}`. If your hosts all
have approximately the same throughput, our average aggregation and NR's
throughput-weighted aggregation will yield similar numbers, but if
thoughput is not balanced, you will see different aggregate
application-level values in NR and Datadog.

For example, say you have an application with three hosts. At a
specific point in time, the hosts have the following values:

               throughput    response time
    hostA         305 rpm           240 ms
    hostB         310 rpm           250 ms
    hostC          30 rpm            50 ms

New Relic would compute the application-level response time as follows:

    hostA: 240 ms * 305 rpm = 73200 total time
    hostB: 250 ms * 310 rpm = 77500 total time
    hostC:  50 ms *  30 rpm =  1500 total time

    total throughput = 305 + 310 + 30 = 645 rpm
    average response time = (73200 + 77500 + 1500) / 645 = 236.0 ms

Whereas we would simply compute the arithmetic mean:

    average response time = (240 + 250 + 50) / 3 = 180.0 ms

#### Beta Alerts: How can I include custom tags?

You can include custom tags by utilizing the "Use Custom Payload" option through New Relic's Beta Alerts feature. To configure this, you'll navigate to your New Relic account, and click the 'Alerts Beta' button in the upper right-hand corner of the screen. From here, select the 'Notification channels' section and find the Webhook you've setup for Datadog. From here there should be a section called 'Use Custom Payload', and once selected, it will expand to reveal a JSON payload. You need to modify this payload by adding a "tags" attribute. For example, a modified payload might look like this:

    {
      "account_id": "$ACCOUNT_ID",
      "account_name": "$ACCOUNT_NAME",
      "condition_id": "$CONDITION_ID",
      "condition_name": "$CONDITION_NAME",
      "current_state": "$EVENT_STATE",
      "details": "$EVENT_DETAILS",
      "event_type": "$EVENT_TYPE",
      "incident_acknowledge_url": "$INCIDENT_ACKNOWLEDGE_URL",
      "incident_id": "$INCIDENT_ID",
      "incident_url": "$INCIDENT_URL",
      "owner": "$EVENT_OWNER",
      "policy_name": "$POLICY_NAME",
      "policy_url": "$POLICY_URL",
      "runbook_url": "$RUNBOOK_URL",
      "severity": "$SEVERITY",
      "targets": "$TARGETS",
      "timestamp": "$TIMESTAMP",
      "tags": ["application:yourapplication", "host:yourhostname", "sometag"]
    }

After your modifications are complete, make sure you select 'Update Chanel', for your changes to be saved.
