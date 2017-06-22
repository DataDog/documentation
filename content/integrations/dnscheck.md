---
title: Datadog-DNS Service Check
integration_title: DNS Service Check
kind: integration
doclevel: basic
newhlevel: true
---

## Overview

The DNS Service Check allows you to monitor the resolution of host names against a specified DNS server. This will allow you to monitor the availability and response times of your DNS infrastructure, as well as validate that key host names are resolvable.

## Configuration

To configure the DNS Service Check, edit the dns_check.yaml file in your conf.d directory.

    init_config:
      default_timeout: 4

    instances:
      - hostname: www.example.org
        nameserver: 127.0.0.1
        timeout: 8

{{< insert-example-links conf="dns_check" check="dns_check" >}}

## Validation

To validate that the DNS Service Check is working, run `datadog-agent info`. You should see something like the following:

    Checks
    ======

      [...]
      dns_check
      ---------
        - instance #0 [OK]
        - Collected 1 metric, 0 events & 2 service checks

## Usage

When the data has been submitted to Datadog, you will have one new metric: `dns.response_time`. This will have the tags `nameserver:<nameserver_in_yaml_file>` and `resolved_hostname:<hostname_in_yaml>`.
