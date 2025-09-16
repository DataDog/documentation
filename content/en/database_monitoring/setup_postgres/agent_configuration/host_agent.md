---
title: Setting Up the Datadog Agent for Postgres Database Monitoring
description: Configure the Datadog Agent for Postgres Database Monitoring 
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
---

Your Postgres database should now be ready for monitoring. If you haven't set it up yet, go to the [Postgres Setup Page][1] and follow the steps for your hosting type.

1. [Base Configuration](#base-configuration)
1. [Base + AWS Managed Database Configuration](?tab=awsmanageddatabase#aws-managed-database)
1. [Base + Google Cloud SQL / AlloyDB Managed Database](?tab=googlecloudsqlalloydbmanageddatabase#google-cloud-sql--alloydb-managed-database)
1. [Base + Azure Managed Database](?tab=azuremanageddatabase#google-cloud-sql--alloydb-managed-database)

This will help you setup the Standard Host Agent to collection DBM Data from your Postgres Database instance. If you are using a containerized agent, follow our Docker or Kubernetes Setup instructions.

## Base Configuration

Edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to the Postgres instance you want to monitor. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][2]. 

The location of the `postgres.d` directory depends on your operating system. For more information, see [Agent configuration directory][3].

```yaml
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
```

**Note**: If your password includes special characters, wrap it in single quotes.

This would the configuration to start with and should be enough if you are self hosting, if you are using a Cloud Managed Database go through our additional steps below for your Cloud Managed Database.

## Cloud Managed Databases

{{< tabs >}}
{{% tab "AWS Managed Database" %}}
### AWS Managed Database

If you are using AWS RDS or AWS Aurora you should add the addition `aws` key to the [base configuration](#base-configuration), this ensures that we can correlation the [AWS Integration](/integrations/amazon-web-services/) data to your Database instance.

{{< highlight yaml "hl_lines=8-10" >}}
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <INSTANCE_ENDPOINT>
      region: <AWS_REGION>
{{< /highlight >}}

<div class="alert alert-warning"><strong>Important</strong>: For Aurora, please use the individual database instance endpoints, not the cluster endpoint.</div>
{{% /tab %}}

{{% tab "Google Cloud SQL / AlloyDB Managed Database" %}}
### Google Cloud SQL / AlloyDB Managed Database

If you are using Google Cloud SQL you should add the addition `gcp` key to the [base configuration](#base-configuration), this ensures that we can correlation the [GCP Integration](/integrations/google-cloudsql/) and [GCP AlloyDB](/integrations/google-cloud-alloydb/) data to your Database instance.

{{< highlight yaml "hl_lines=8-10" >}}
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: <PROJECT_ID>
      instance_id: <INSTANCE_ID>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Azure Managed Database" %}}
### Azure Managed Database

If you are monitoring a Azure Managed Database you should add the addition `azure` key to the [base configuration](#base-configuration), this ensures that we can correlation the [Azure Integration](/integrations/azure/) data to your Database instance.

{{< highlight yaml "hl_lines=8-11" >}}
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
    ssl: require
    azure:
      deployment_type: <DEPLOYMENT_TYPE>
      fully_qualified_domain_name: <INSTANCE_ENDPOINT>
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}



## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][15]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /database_monitoring/setup_postgres/
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[3]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory

[2]: /database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /database_monitoring/troubleshooting/?tab=postgres