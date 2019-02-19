---
title: I stopped my Agent but I'm still seeing the host in my Datadog account. 
kind: faq
aliases:
  - /agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host
---

It can take up to 24h for the host to disappear from the infrastructure page, but it is only part of the host count for billing purposes if Datadog is actually receiving data.

After about 45 minutes, the Agent is showed as down ("???" is displayed next to the hostname) and is removed from the infrastructure page after 3 hours.

After 24 hours you can still query against them, but it doesn't appear in drop downs or infrastructure. There is not a way to immediately delete a metric.

