---
title: Setting Up Database Monitoring for MySQL
kind: documentation
description: Install and configure Database Monitoring for MySQL, self-hosted or Amazon RDS.
code_lang: aurora
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: "/tk/tk/"
  tag: "Documentation"
  text: "tktk"
  
---

{{< site-region region="us3,gov" >}} 

Database Monitoring is not supported in this region.

{{< /site-region >}}


intro sentence

## Prerequisites
<p></p>

## Configure MySQL settings
<p></p>


## Grant the Agent access

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

Text inside tab.

{{% /tab %}}
{{% tab "MySQL 5.6 & 5.7" %}}

Text inside tab.

{{% /tab %}}
{{< /tabs >}}

## Install the Agent

<p></p>

## Configure the Agent

The Agent must connect to the AWS Aurora _instance endpoint_.  AWS Aurora also provides a _cluster endpoint_ which allows client applications to connect to a reader or writer instance without knowledge of the underlying database host. Although using the cluster endpoint is desirable for applications, the Agent must be aware of all instances.

### Proxies, load balancers, and connection poolers

The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying hostname and should be "sticky" to a single host, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the value of metrics will be incorrect.

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][1]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup/troubleshooting/#mysql
