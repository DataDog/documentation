---
title: Setting Up Database Monitoring for self hosted Postgres
kind: documentation
description: Install and configure Database Monitoring for self-hosted Postgres.
code_lang: selfhosted
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
  
---

{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported in this region.</div>
{{< /site-region >}}

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)

## Before you begin

Supported MySQL versions
: 5.6, 5.7, or 8.0+

Supported Agent versions
: 7.30.0+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure Postgres settings

<p></p>

## Grant the Agent access

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

Text inside tab.

{{% /tab %}}
{{% tab "Postgres ≤ 9.6" %}}

Text inside tab.

{{% /tab %}}
{{< /tabs >}}

## Install the Agent

<p></p>

## Configure the Agent

<p></p>

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][1]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup/troubleshooting/#postgres
