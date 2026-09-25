---
title: Migration
description: "Move to Datadog Log Management: send your existing log sources to Datadog, and translate the searches, alerts, and dashboards you built on another platform."
further_reading:
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Log collection and integrations"
- link: "/logs/explorer/search_syntax/"
  tag: "Documentation"
  text: "Log search syntax"
- link: "/logs/log_configuration/indexes/"
  tag: "Documentation"
  text: "Log indexes"
---

## Overview

Moving to Datadog Log Management has two parts: sending your logs to Datadog, and recreating the searches, alerts, and dashboards your teams rely on.

## Send your logs to Datadog

Datadog collects logs from hosts, containers, and cloud providers. The [Datadog Agent][1] collects logs from files, containers, and network sources, and each [integration][2] ships its own log configuration.

Set up [log collection][3] first. The rest of a migration depends on your logs being in Datadog, and on your [pipelines][4] producing the attributes your existing searches rely on.

## Translate your queries and assets

After your logs are in Datadog, [Query Translation][5] converts Splunk Processing Language (SPL) into Datadog query syntax. It translates a single query at a time, or a batch of Splunk alerts and dashboards that it publishes as Datadog monitors and dashboards.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/
[2]: /integrations/
[3]: /logs/log_collection/
[4]: /logs/log_configuration/pipelines/
[5]: /logs/migration/query_translation/
