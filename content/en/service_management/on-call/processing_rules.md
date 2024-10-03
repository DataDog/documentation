---
title: Processing Rules
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

On-call processing rules allow teams to customize their response strategies for distinct types of incoming events. This enables teams to add events and urgency levels to escalation policies based on the event's metadata. Low urgency pages do not trigger escalation processes.

Datadog creates a default processing rule when you [onboard a Team to On-Call][1].

## View your team's processing rules

To see the processing rule of your On-Call Team, click on the Team name in the [list of Teams][2].

## Query syntax

Processing rules follow the common query syntax of Datadog. Supported attributes include:

* `tags`: the tags set on the incoming alert. For example, `tags.env:prod`.
* `groups`: checks if the incoming alert relates to a specific Monitor group. For example, `groups:"service:checkout-service"`.
* `priority`: value of the priority field of the Monitor. Possible values include 1, 2, 3, 4, or 5. For instance, `priority:(1 OR 2)`.
* `alert_status`: value of the Monitor's status. Possible values include `error`, `warn`, `success`. Usage example: `alert_status:(error OR warn)`.

If no specific filter should be applied, use `*`.

## Ordering

The ordering of processing rules matters. The system goes from top to bottom and stops at the first matching rule. If no query or time filter matches the incoming alert, the default processing rule is used.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
