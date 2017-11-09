---
title: How can I change the hostname?
kind: faq
customnav: agentnav
---

You can change the hostname by updating your [agent’s configuration file](/agent/faq/where-is-the-configuration-file-for-the-agent) called datadog.conf and replacing the value for the “hostname” key, then [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent).

After renaming your host you'll continue to see the original hostname in the UI for the next 24 hours, however, this will be removed once the data ages out. Don't worry, we're not billing you for two instances, only for the connected one!

To learn how hostnames are determined, [reference this article](/agent/faq/how-does-datadog-determine-the-agent-hostname).