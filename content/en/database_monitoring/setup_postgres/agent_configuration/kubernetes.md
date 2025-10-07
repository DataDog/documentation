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
{{% tab "Datadog Operator" %}}
### Datadog Operator

If you're running a Kubernetes cluster, use the [Datadog Cluster Agent][1] to enable Database Monitoring.

Using the [Operator instructions in Kubernetes and Integrations][3] as a reference, follow the steps below to set up the Postgres integration:

Create or update the `datadog-agent.yaml` file with the following configuration:

{{< highlight yaml "hl_lines=29-37" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DD_SITE>
    credentials:
      apiSecret:
        secretName: datadog-agent-secret
        keyName: api-key

  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true

  override:
    nodeAgent:
      image:
        name: agent
        tag: <AGENT_VERSION>

    clusterAgent:
      replicas: 2
      extraConfd:
        configDataMap:
          postgres.yaml: |-
            cluster_check: true
            init_config:
            instances:
            - dbm: true
              host: <INSTANCE_ENDPOINT>
              port: <DATABASE_PORT>
              username: <DATADOG_USER>
              password: 'ENC[datadog_user_database_password]'
{{< /highlight >}}

**Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

Apply the changes to the Datadog Operator using the following command:

```shell
kubectl apply -f datadog-agent.yaml
```
{{% /tab %}}

{{% tab "Helm" %}}
### Helm

Using the [Helm instructions in Kubernetes and Integrations][4] as a reference, follow the steps below to set up the Postgres integration:

Update your `datadog-values.yaml` file (used in the Cluster Agent installation instructions) with the following configuration:

{{< highlight yaml "hl_lines=11-19" >}}
datadog:
  clusterChecks:
    enabled: true

clusterChecksRunner:
  enabled: true

clusterAgent:
  enabled: true
  confd:
    postgres.yaml: |-
      cluster_check: true
      init_config:
      instances:
      - dbm: true
        host: <INSTANCE_ENDPOINT>
        port: <DATABASE_PORT>
        username: <DATADOG_USER>
        password: 'ENC[datadog_user_database_password]'
{{< /highlight >}}

**Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

Deploy the Agent with the above configuration file using the following command:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>
{{% /tab %}}

{{% tab "Annotations" %}}
### Annotations

Instead of mounting a file, you can declare the instance configuration as a Kubernetes service. To configure this check for an Agent running on Kubernetes, create a service in the same namespace as the Datadog Cluster Agent:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "postgres": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<AWS_INSTANCE_ENDPOINT>",
              "port": 5432,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]",
              "aws": {
                "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
                "region": "<REGION>"
              },
              "tags": [
                "dbinstanceidentifier:<DB_INSTANCE_NAME>"
              ]
            }
          ]
        }
      }
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

For more information, see [Autodiscovery Annotations][5].

If you're using Postgres 9.6, add the following to the instance configuration:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

The Cluster Agent automatically registers this configuration and begins running the Postgres check.
{{< highlight yaml "hl_lines=3-16" >}}
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

## Example Agent Configurations
{{% dbm-postgres-agent-config-examples %}}

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