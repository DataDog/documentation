---
title: Datadog-DNS Service Check
integration_title: DNS Service Check
kind: integration
git_integration_title: dns_check 
doclevel: basic
newhlevel: true
---

## Overview

The DNS Service Check allows you to monitor the resolution of host names against a specified DNS server. This will allow you to monitor the availability and response times of your DNS infrastructure, as well as validate that key host names are resolvable.

## Configuration

To configure the DNS Service Check, edit the dns_check.yaml file in your conf.d directory.

{{< highlight yaml>}}
    init_config:
      default_timeout: 4

    instances:
      - hostname: www.example.org
        nameserver: 127.0.0.1
        timeout: 8
{{< /highlight >}}

{{< insert-example-links conf="dns_check" check="dns_check" >}}

## Validation

To validate that the DNS Service Check is working, run `sudo /etc/init.d/datadog-agent info`. You should see something like the following:

{{< highlight bash>}}
    Checks
    ======

      [...]
      dns_check
      ---------
        - instance #0 [OK]
        - Collected 1 metric, 0 events & 2 service checks
{{< /highlight >}}

## Metrics

This check tags all metrics it collects with:

  * `nameserver:<nameserver_in_yaml>`
  * `resolved_hostname:<hostname_in_yaml>`

{{< get-metrics-from-git >}}
  
## Service Check
This check tags all service checks it collects with:

  * `nameserver:<nameserver_in_yaml>`
  * `resolved_hostname:<hostname_in_yaml>`
  
You may use one service check to check the DNS availability of your host:

  * `dns.can_resolve`
