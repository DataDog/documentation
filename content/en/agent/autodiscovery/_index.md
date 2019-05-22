---
title: Using Autodiscovery with Kubernetes and Docker
kind: documentation
aliases:
  - /guides/servicediscovery/
  - /guides/autodiscovery/
further_reading:
- link: "/videos/autodiscovery/"
  tag: "Video"
  text: "Datadog Autodiscovery on Docker with Labels using Agent v6 & v5"
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

## QuickStart

This page covers Autodiscovery with Agent 6 only, [refer to the dedicated documentation to setup Autodiscovery with Agent 5][1]

Here's a 5-minute video for a bird's eye view of Datadog Agent v6 Autodiscovery functionality.

{{< wistia mlxx0j6txw >}}

## How it Works

In a traditional non-container environment, the Datadog Agent configuration is&mdash;like the environment in which it runs&mdash;static. The Agent reads check configurations from disk when it starts, and as long as it's running, it continuously runs every configured check.
The configuration files are static, and any network-related options configured within them serve to identify specific instances of a monitored service (e.g. a Redis instance at 10.0.0.61:6379).
When an Agent check cannot connect to such a service, metrics are missing until you troubleshoot the issue. The Agent check retries its failed connection attempts until an administrator revives the monitored service or fixes the check's configuration.

With Autodiscovery enabled, the Agent runs checks differently.

### Different Configuration

Static configuration files aren't suitable for checks that collect data from ever-changing network endpoints, so Autodiscovery uses **templates** for check configuration. In each template, the Agent looks for two template variables-`%%host%%` and `%%port%%`-to appear in place of any normally-hardcoded network options. For example: a template for the Agent's [Go Expvar check][2] would contain the option `expvar_url: http://%%host%%:%%port%%`. For containers that have more than one IP address or exposed port, direct Autodiscovery to pick the right ones by using [template variable indexes](#supported-template-variables).

Because templates don't identify specific instances of a monitored service&mdash;which `%%host%%`? which `%%port%%`?&mdash;Autodiscovery needs one or more **container identifiers** for each template so it can determine which IP(s) and port(s) to substitute into the templates. For Docker, container identifiers are image names or container labels.

Finally, Autodiscovery can load check templates from places other than disk. Other possible **template sources** include key-value stores like Consul, Kubernetes pod annotations, and Docker label annotations.

### Different Execution

When the Agent starts with Autodiscovery enabled, it loads check templates from all available template sources&mdash;[not just one or another](#template-source-precedence)&mdash;along with the templates' container identifiers. Unlike in a traditional Agent setup, the Agent doesn't run all checks all the time; it decides which checks to enable by inspecting all containers currently running on the same host as the Agent.

As the Agent inspects each running container, it checks if the container matches any of the container identifiers from any loaded templates. For each match, the Agent generates a static check configuration by substituting the matching container's IP address and port. Then it enables the check using the static configuration.

The Agent watches for Docker events&mdash;container creation, destruction, starts, and stops&mdash;and enables, disables, and regenerates static check configurations on such events.

## How to set it up

The Datadog Docker Agent automatically auto-discovers other containers.

To use Autodiscovery on the Datadog **Host** Agent, add these settings to your `datadog.yaml` configuration file:

```
# Autodiscovery settings for Datadog Host Agent
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

### Template Source Precedence

If you provide a template for the same check type via multiple template sources, the Agent looks for templates in the following order (using the first one it finds):

* Kubernetes annotations
* Files

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-5-autodiscovery
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
