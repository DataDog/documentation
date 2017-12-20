---
title: Duplicate Hosts for Google Cloud Engine
kind: faq
customnav: agentnav
further_reading:
- link: "/integrations/google_app_engine"
  tag: "Integration"
  text: Learn more about Datadog Google Cloud Platform integration
---

## Update of the hostname on agents running on Google Cloud Engine instances

Prior to Agent 5.5.0, we used instance name as a unique hostname for GCE hosts.

However, this becomes an issue when people ran instances with the same name over different projects, as Datadog considers those as one unique host.

Instead, a more reliable behavior is to use the instance hostname as the hostname, as this is unique across all projects which is the method we adopted beginning with 5.5.0.

## Release process

[Datadog's GCE integration](/integrations/google_app_engine) relies on the hostname to link agent's data with API's data retrieved by our crawler. For this reason, it's important to update the hostname on the agent and in Datadog at the same time.

See the [PR](https://github.com/DataDog/dd-agent/pull/1737) and [issue](https://github.com/DataDog/dd-agent/issues/1736) for more details

## Known issues

If you've updated your GCE host(s) to Agent 5.5 without contacting us, you'll see a duplicate host in your Infrastructure List - this doesn't impact your billing, it's only a visual nuisance.  
[Contact us](/help) to enable a feature to disable the duplicate host.

{{< partial name="whats-next/whats-next.html" >}}