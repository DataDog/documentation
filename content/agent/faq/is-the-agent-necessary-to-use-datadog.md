---
title: Is the agent necessary to use Datadog ? 
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: Logs
  text: Learn more about the Datadog Agent
---

* No, it is not. You don't have to install an agent if you only want to submit
metrics via our API. You can read more about our API [here](/api/).
* In general, most folks find a lot of value in installing an agent because
they get system metrics for free and metrics on common software like mysql,
postgres, etc. with just a little bit of configuration. Another advantage is
that there is a small statsd server built-in to the agent.

{{< partial name="whats-next/whats-next.html" >}}