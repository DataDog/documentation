---
title: Setting Up Database Monitoring for Amazon RDS managed MySQL
kind: documentation
description: Install and configure Database Monitoring for MySQL managed on Amazon RDS.
code_lang: rds
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "/tk/tk/"
  tag: "Documentation"
  text: "tktk"
  
---

{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported in this region.</div>
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

### Runtime setup consumers
Because with RDs, the performance schema consumers can't be enabled permanently in the configuration, you must create the following procedure to give the Agent the ability to enable `performance_schema.events_statements_*` consumers at runtime.  

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```


## Install the Agent

<p></p>

## Configure the Agent

### Proxies, load balancers, and connection poolers

The Agent must connect directly to the host being monitored. For self-hosted databases, `localhost` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying hostname and should be "sticky" to a single host, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the value of metrics will be incorrect.

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][1]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup/troubleshooting/#mysql
