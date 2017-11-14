---
title: I stopped my agent but I’m still seeing the host in my Datadog account. 
kind: faq
customnav: agentnav
---

It can take up to 24h for the host to disappear from the infrastructure page,
but it will only be part of the host count for billing purposes if we're
actually receiving data.

After ~45 minutes the agent will be showed as down ("???" will be displayed next to the hostname) and will be removed from the infrastructure page after 3 hours.

After 24 hours You can still query against them, but it will not appear in drop downs or infrastructure. There is not a way to immediately delete a metric.