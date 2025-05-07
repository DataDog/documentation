---
title: Send Events to Datadog
---

## Standard events
Without any additional setup, Datadog Events automatically gathers events that are collected by the Agent and installed integrations.

More than 100 Datadog integrations support events collection, including Kubernetes, Docker, Jenkins, Chef, Puppet, Amazon ECS or Autoscaling, Sentry, and Nagios.

{{< whatsnext desc="Send your events to Datadog:">}}
    {{< nextlink href="https://app.datadoghq.com/integrations" >}}Integrations{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Send your integration events through Datadog API:">}}
    {{< nextlink href="/service_management/events/ingest/list_of_integration_id_value" >}}Integration ID List{{< /nextlink >}}
{{< /whatsnext >}}

## Custom events
You can also submit your own custom events using the Datadog API, Custom Agent Check, DogStatsD, or the Events Email API.

{{< whatsnext desc="Send your custom events to Datadog:">}}
    {{< nextlink href="/api/latest/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}Email{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/events-from-sns-emails/" >}}Amazon SNS Emails{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/#configuration" >}}Amazon EventBridge API Destinations{{< /nextlink >}}
{{< /whatsnext >}}