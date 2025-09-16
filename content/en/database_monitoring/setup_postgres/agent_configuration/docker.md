---
title: Setting Up the Datadog Agent for Postgres Database Monitoring
description: Configure the Datadog Agent for Postgres Database Monitoring 
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
---

Your Postgres database should now be ready for monitoring. If you haven't set it up yet, go to the [Postgres Setup Page](/database_monitoring/setup_postgres/) and follow the steps for your hosting type.

1. [Base Configuration](?tab=commandline#base-configuration)
1. [Base + Cloud Hosted Database Configuration](?tab=commandline#cloud-hosted-database)

## Base Configuration

To configure an integration for an Agent running in a Docker container such as in ECS or Fargate, you have a couple of methods available, all of which are covered in detail in the Docker Configuration Documentation.

The examples below show how to use [Docker Labels][102] and [Autodiscovery Templates][103] to configure the Postgres integration. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][100]. 

<div class="alert alert-warning"><strong>Important</strong>: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.</div>

{{< tabs >}}
{{% tab "Command Line" %}}
### Command Line 

Run the following command from your [command line](/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run) to start the Agent. Replace the placeholder values with those for your account and environment.

{{< highlight bash "hl_lines=11-20" >}}
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_SITE="datadoghq.com"

docker run \
  -e "DD_API_KEY=${DD_API_KEY}" \
  -e "DD_SITE=${DD_SITE}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<INSTANCE_ENDPOINT>",
      "port": <DATABASE_PORT>,
      "username": "<DATADOG_USER>",
      "password": "ENC[datadog_user_datadog_password]"
    }]
  }}' \
  gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Compose File" %}}
### Compose File

{{< highlight dockerfile "hl_lines=11-26" >}}
services:
  datadog-agent:
    environment:
    - DD_API_KEY=${DD_API_KEY}
    - DD_SITE=${DD_SITE}
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - /proc/:/host/proc/:ro
    - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    - /var/lib/docker/containers:/var/lib/docker/containers:ro 
    labels:
      com.datadoghq.ad.checks: |
        {
          "postgres": {
            "init_config": {},
            "instances": [
              {
                "dbm": true,
                "host": "<INSTANCE_ENDPOINT>",
                "port": <DATABASE_PORT>,
                "username": "<DATADOG_USER>",
                "password": "ENC[datadog_user_datadog_password]"
              }
            ]
          }
        }
    image: gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Dockerfile" %}}
### Dockerfile

You can build a custom Datadog Agent image with the Postgres Integration already configured by adding the Autodiscovery Label in a `Dockerfile`.

{{< highlight dockerfile "hl_lines=3-16" >}}
FROM gcr.io/datadoghq/agent:latest

LABEL "com.datadoghq.ad.checks"='{ \
  "postgres": { \
    "init_config": {}, \
    "instances": [ \
      { \
        "dbm": true, \
        "host": "<INSTANCE_ENDPOINT>", \
        "port": <DATABASE_PORT>, \
        "username": "<DATADOG_USER>", \
        "password": "ENC[datadog_user_database_password]" \
      } \
    ] \
  } \
}'
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}

This would the configuration to start with and should be enough if you are self hosting, if you are using a Cloud Managed Database go through our additional steps below for your Cloud Managed Database.

## Cloud Hosted Database

Going through this section will ensure that we can correlate the DBM data collected by the agent and the cloud data 

{{% collapse-content title="AWS Managed Database" level="h4" id="aws-managed-database" %}}
#### AWS Managed Database

If you are using AWS RDS or AWS Aurora you should add the addition `aws` key to the [base configuration](#base-configuration), this ensures that we can correlation the [AWS Integration](/integrations/amazon-web-services/) data to your Database instance.

{{< tabs >}}
{{% tab "Command Line" %}}

{{< highlight bash "hl_lines=19-22" >}}
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_SITE="datadoghq.com"

docker run \
  -e "DD_API_KEY=${DD_API_KEY}" \
  -e "DD_SITE=${DD_SITE}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<INSTANCE_ENDPOINT>",
      "port": <DATABASE_PORT>,
      "username": "<DATADOG_USER>",
      "password": "ENC[datadog_user_datadog_password]",
      "aws": {
        "instance_endpoint": "<INSTANCE_ENDPOINT>",
        "region": "<AWS_REGION>"
      }
    }]
  }}' \
  gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Compose File" %}}

{{< highlight yaml "hl_lines=23-26" >}}
services:
  datadog-agent:
    environment:
    - DD_API_KEY=${DD_API_KEY}
    - DD_SITE=${DD_SITE}
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - /proc/:/host/proc/:ro
    - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    - /var/lib/docker/containers:/var/lib/docker/containers:ro 
    labels:
      com.datadoghq.ad.checks: |
        {
          "postgres": {
            "init_config": {},
            "instances": [
              {
                "dbm": true,
                "host": "<INSTANCE_ENDPOINT>",
                "port": <DATABASE_PORT>,
                "username": "<DATADOG_USER>",
                "password": "ENC[datadog_user_datadog_password]",
                "aws": {
                  "instance_endpoint": "<INSTANCE_ENDPOINT>",
                  "region": "<AWS_REGION>"
                }
              }
            ]
          }
        }
    image: gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Dockerfile" %}}

{{< highlight dockerfile "hl_lines=13-16" >}}
FROM gcr.io/datadoghq/agent:latest

LABEL "com.datadoghq.ad.checks"='{ \
  "postgres": { \
    "init_config": {}, \
    "instances": [ \
      { \
        "dbm": true, \
        "host": "<INSTANCE_ENDPOINT>", \
        "port": <DATABASE_PORT>, \
        "username": "<DATADOG_USER>", \
        "password": "ENC[datadog_user_database_password]" \
        "aws": { \
          "instance_endpoint": "<INSTANCE_ENDPOINT>", \
          "region": "<REGION>" \
        } \
      } \
    ] \
  } \
}'
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Important</strong>: For Aurora, please use the individual database instance endpoints, not the cluster endpoint.</div>
{{% /collapse-content %}} 

{{% collapse-content title="Google Cloud SQL / AlloyDB Managed Database" level="h4" id="google-cloud-sql-alloydb-managed-database" %}}
#### Google Cloud SQL / AlloyDB Managed Database

If you are using Google Cloud SQL you should add the addition `gcp` key to the [base configuration](#base-configuration), this ensures that we can correlation the [GCP Integration](/integrations/google-cloudsql/) and [GCP AlloyDB](/integrations/google-cloud-alloydb/) data to your Database instance.

{{< tabs >}}
{{% tab "Command Line" %}}

{{< highlight bash "hl_lines=19-22" >}}
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_SITE="datadoghq.com"

docker run \
  -e "DD_API_KEY=${DD_API_KEY}" \
  -e "DD_SITE=${DD_SITE}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<INSTANCE_ENDPOINT>",
      "port": <DATABASE_PORT>,
      "username": "<DATADOG_USER>",
      "password": "ENC[datadog_user_datadog_password]",
      "gcp": {
        "project_id": "<PROJECT_ID>",
        "instance_id": "<INSTANCE_ID>"
      }
    }]
  }}' \
  gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Compose File" %}}
{{< highlight yaml "hl_lines=23-26" >}}
services:
  datadog-agent:
    environment:
    - DD_API_KEY=${DD_API_KEY}
    - DD_SITE=${DD_SITE}
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - /proc/:/host/proc/:ro
    - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    - /var/lib/docker/containers:/var/lib/docker/containers:ro 
    labels:
      com.datadoghq.ad.checks: |
        {
          "postgres": {
            "init_config": {},
            "instances": [
              {
                "dbm": true,
                "host": "<INSTANCE_ENDPOINT>",
                "port": <DATABASE_PORT>,
                "username": "<DATADOG_USER>",
                "password": "ENC[datadog_user_datadog_password]",
                "gcp": {
                  "project_id": "<PROJECT_ID>",
                  "instance_id": "<INSTANCE_ID>"
                }
              }
            ]
          }
        }
    image: gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Dockerfile" %}}
{{< highlight dockerfile "hl_lines=13-16" >}}
FROM gcr.io/datadoghq/agent:latest

LABEL "com.datadoghq.ad.checks"='{ \
  "postgres": { \
    "init_config": {}, \
    "instances": [ \
      { \
        "dbm": true, \
        "host": "<INSTANCE_ENDPOINT>", \
        "port": <DATABASE_PORT>, \
        "username": "<DATADOG_USER>", \
        "password": "ENC[datadog_user_database_password]" \
        "gcp": { \
          "project_id": "<PROJECT_ID>", \
          "instance_id": "<INSTANCE_ID>" \
        } \
      } \
    ] \
  } \
}'
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 

{{% collapse-content title="Azure Managed Database" level="h4" id="azure-managed-database" %}}
#### Azure Managed Database

If you are monitoring a Azure Managed Database you should add the addition `azure` key to the [base configuration](#base-configuration), this ensures that we can correlation the [Azure Integration](/integrations/azure/) data to your Database instance.

{{< tabs >}}
{{% tab "Command Line" %}}
{{< highlight bash "hl_lines=19-23" >}}
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_SITE="datadoghq.com"

docker run \
  -e "DD_API_KEY=${DD_API_KEY}" \
  -e "DD_SITE=${DD_SITE}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<INSTANCE_ENDPOINT>",
      "port": <DATABASE_PORT>,
      "username": "<DATADOG_USER>",
      "password": "ENC[datadog_user_datadog_password]",
      "ssl": "require",
      "azure": {
        "deployment_type": "<DEPLOYMENT_TYPE>",
        "fully_qualified_domain_name": "<FULLY_QUALIFIED_DOMAIN_NAME>"
      }
    }]
  }}' \
  gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Compose File" %}}
{{< highlight yaml "hl_lines=23-27" >}}
services:
  datadog-agent:
    environment:
    - DD_API_KEY=${DD_API_KEY}
    - DD_SITE=${DD_SITE}
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - /proc/:/host/proc/:ro
    - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    - /var/lib/docker/containers:/var/lib/docker/containers:ro 
    labels:
      com.datadoghq.ad.checks: |
        {
          "postgres": {
            "init_config": {},
            "instances": [
              {
                "dbm": true,
                "host": "<INSTANCE_ENDPOINT>",
                "port": <DATABASE_PORT>,
                "username": "<DATADOG_USER>",
                "password": "ENC[datadog_user_datadog_password]",
                "ssl": "require",
                "azure": {
                  "deployment_type": "<DEPLOYMENT_TYPE>",
                  "fully_qualified_domain_name": "<FULLY_QUALIFIED_DOMAIN_NAME>"
                }
              }
            ]
          }
        }
    image: gcr.io/datadoghq/agent:latest
{{< /highlight >}}
{{% /tab %}}

{{% tab "Dockerfile" %}}
{{< highlight dockerfile "hl_lines=13-17" >}}
FROM gcr.io/datadoghq/agent:latest

LABEL "com.datadoghq.ad.checks"='{ \
  "postgres": { \
    "init_config": {}, \
    "instances": [ \
      { \
        "dbm": true, \
        "host": "<INSTANCE_ENDPOINT>", \
        "port": <DATABASE_PORT>, \
        "username": "<DATADOG_USER>", \
        "password": "ENC[datadog_user_database_password]" \
        "ssl": "require", \
        "azure": { \
          "deployment_type": "<DEPLOYMENT_TYPE>", \
          "fully_qualified_domain_name": "<FULLY_QUALIFIED_DOMAIN_NAME>" \
        } \
      } \
    ] \
  } \
}'
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 

[100]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[101]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[102]: https://docs.docker.com/engine/manage-resources/labels/
[103]: /getting_started/containers/autodiscovery/

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][15]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/12/contrib.html
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