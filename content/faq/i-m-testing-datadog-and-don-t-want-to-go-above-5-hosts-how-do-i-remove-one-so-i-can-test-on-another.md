---
title: I'm testing Datadog and don't want to go above 5 hosts. How do I remove one so I can test on another?
kind: faq
customnav: main_references
---

As long as you only have 5 agents connected to us at any given time we will not count additional instances against you, even if they show up in the Infrastructure page.

It can take up to 24 hours for the host to disappear from the Infrastructure page but it will only be part of the host count for billing purposes if we’re actually receiving data. So just be certain the agent is [stopped](/agent/faq/start-stop-restart-the-datadog-agent) or [removed](/agent/faq/how-do-i-uninstall-the-agent).

After 24 hours you may still query against them though it will not appear in drop downs or the infrastructure or host map views.