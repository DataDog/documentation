---
aliases:
- /integrations/dnscheck
categories:
- network
- web
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/dns_check/
git_integration_title: dns_check
guid: 31e4c84c-fc4b-4cd4-97ed-0331bf4e2023
has_logo: true
integration_title: DNS Check
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: dns_check
public_title: Datadog-DNS Check Integration
short_description: Monitor the resolvablity of and lookup times for any DNS record.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Overview

Monitor the resolvability of and lookup times for any DNS records using nameservers of your choosing.

## Setup
### Installation

The DNS check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on any host from which you want to probe your DNS servers. Though many metrics-oriented checks are best run on the same host(s) as the monitored service, you may want to run this status-oriented check from hosts that do not run the monitored DNS services.

If you need the newest version of the DNS check, install the `dd-check-dns` package; this package's check will override the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `dns_check.yaml` in the Agent's `conf.d` directory. See the [sample dns_check.yaml](https://github.com/DataDog/integrations-core/blob/master/dns_check/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - name: Example (com)
    # nameserver: 8.8.8.8   # The nameserver to query, this must be an IP address
    hostname: example.com # the record to fetch
    # record_type: AAAA   # default is A
  - name: Example (org)
    hostname: example.org
```

If you omit the `nameserver` option, the check will use whichever nameserver is configured in local network settings.

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending DNS service checks and response times to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `dns_check` under the Checks section:

```
  Checks
  ======
    [...]

    dns_check
    ---------
      - instance #0 [OK]
      - instance #1 [OK]
      - Collected 2 metrics, 0 events & 2 service checks

    [...]
```

## Compatibility

The DNS check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "dns_check" >}}


### Events
The DNS check does not include any event at this time.

### Service Checks
This agent check tags all service checks it collects with:

  * `nameserver:<nameserver_in_yaml>`
  * `resolved_hostname:<hostname_in_yaml>`

`dns.can_resolve`:

Returns CRITICAL if the Agent fails to resolve the request, otherwise returns UP.

Tagged by `hostname` and `record_type`.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

