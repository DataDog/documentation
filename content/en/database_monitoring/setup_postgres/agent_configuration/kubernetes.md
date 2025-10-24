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

To configure an integration for an Agent running on Kuberentes, there are a couple of options depending on your agent deployment method.  Below are examples on how to configuration the integration for the most common agent deployment options. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][1]. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Datadog Operator

If you're running a Kubernetes cluster, use the [Datadog Cluster Agent][10] to enable Database Monitoring.

Using the [Operator instructions in Kubernetes and Integrations][11] as a reference, follow the steps below to set up the Postgres integration:

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

[10]: /containers/cluster_agent/setup/
[11]: /containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}

{{% tab "Helm" %}}
### Helm

Using the [Helm instructions in Kubernetes and Integrations][20] as a reference, follow the steps below to set up the Postgres integration:

Update your `datadog-values.yaml` file (used in the Cluster Agent installation instructions) with the following configuration:

{{< highlight yaml "hl_lines=12-20" >}}
datadog:
  clusterChecks:
    enabled: true

clusterChecksRunner:
  enabled: true
  replicas: 2

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

[20]: /containers/kubernetes/integrations/?tab=helm
{{% /tab %}}

{{% tab "Annotations" %}}
### Annotations

Using the [Autodiscovery Annotations][30] as a reference, you can declare the instance configuration as a Kubernetes service . To configure this check for an Agent running on Kubernetes, create a service with the Postgres integration configruaiton defined as annotations:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": {},
          "instances": [
            {
              "dbm": true,
              "host": <INSTANCE_ENDPOINT>,
              "port": <DATABASE_PORT>,
              "username": <DATADOG_USER>,
              "password": "ENC[datadog_user_database_password]"
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

If you're using Postgres 9.6, add the following to the instance configuration:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

The Cluster Agent automatically registers this configuration and begins running the Postgres check.

[30]: /containers/kubernetes/integrations/?tab=annotations#configuration
{{% /tab %}}
{{< /tabs >}}

This would the configuration to start with and should be enough if you are self hosting, if you are using a Cloud Managed Database go through our additional steps below for your Cloud Managed Database.

## Cloud Hosted Database

Going through this section will ensure that we can correlate the DBM data collected by the agent and your cloud data,. 

{{% collapse-content title="AWS Managed Database" level="h4" id="aws-managed-database" %}}
#### AWS Managed Database

If you are using AWS RDS or AWS Aurora you should add the addition `aws` key to the [base configuration](#base-configuration), this ensures that we can correlation the [AWS Integration](/integrations/amazon-web-services/) data to your Database instance.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
{{< highlight yaml "hl_lines=38-40" >}}
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
              aws:
                instance_endpoint: <INSTANCE_ENDPOINT>
                region: <AWS_REGION>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Helm" %}}
{{< highlight yaml "hl_lines=21-23" >}}
datadog:
  clusterChecks:
    enabled: true

clusterChecksRunner:
  enabled: true
  replicas: 2

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
        aws:
          instance_endpoint: <INSTANCE_ENDPOINT>
          region: <AWS_REGION>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Annotations" %}}
{{< highlight yaml "hl_lines=20-23" >}}
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": {},
          "instances": [
            {
              "dbm": true,
              "host": <INSTANCE_ENDPOINT>,
              "port": <DATABASE_PORT>,
              "username": <DATADOG_USER>,
              "password": "ENC[datadog_user_database_password]",
              "aws": {
                "instance_endpoint": <INSTANCE_ENDPOINT>,
                "region": <AWS_REGION>
              }
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
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Important</strong>: For Aurora, please use the individual database instance endpoints, not the cluster endpoint.</div>
{{% /collapse-content %}} 

{{% collapse-content title="Google Cloud SQL / AlloyDB Managed Database" level="h4" id="google-cloud-sql-alloydb-managed-database" %}}
#### Google Cloud SQL / AlloyDB Managed Database

If you are using Google Cloud SQL you should add the addition `gcp` key to the [base configuration](#base-configuration), this ensures that we can correlation the [GCP Integration](/integrations/google-cloudsql/) and [GCP AlloyDB](/integrations/google-cloud-alloydb/) data to your Database instance.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
{{< highlight yaml "hl_lines=38-40" >}}
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
              gcp:
                project_id: <PROJECT_ID>
                instance_id: <INSTANCE_ID>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Helm" %}}
{{< highlight yaml "hl_lines=21-23" >}}
datadog:
  clusterChecks:
    enabled: true

clusterChecksRunner:
  enabled: true
  replicas: 2

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
        gcp:
          project_id: <PROJECT_ID>
          instance_id: <INSTANCE_ID>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Annotations" %}}
{{< highlight yaml "hl_lines=20-23" >}}
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": {},
          "instances": [
            {
              "dbm": true,
              "host": <INSTANCE_ENDPOINT>,
              "port": <DATABASE_PORT>,
              "username": <DATADOG_USER>,
              "password": "ENC[datadog_user_database_password]",
              "gcp": {
                "project_id": <PROJECT_ID>,
                "instance_id": <INSTANCE_ID>
              }
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
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 

{{% collapse-content title="Azure Managed Database" level="h4" id="azure-managed-database" %}}
#### Azure Managed Database

If you are monitoring a Azure Managed Database you should add the addition `azure` key to the [base configuration](#base-configuration), this ensures that we can correlation the [Azure Integration](/integrations/azure/) data to your Database instance.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
{{< highlight yaml "hl_lines=38-41" >}}
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
              ssl: require
              azure:
                deployment_type: <DEPLOYMENT_TYPE>
                fully_qualified_domain_name: <INSTANCE_ENDPOINT>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Helm" %}}
{{< highlight yaml "hl_lines=21-24" >}}
datadog:
  clusterChecks:
    enabled: true

clusterChecksRunner:
  enabled: true
  replicas: 2

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
        ssl: require
        azure:
          deployment_type: <DEPLOYMENT_TYPE>
          fully_qualified_domain_name: <INSTANCE_ENDPOINT>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Annotations" %}}
{{< highlight yaml "hl_lines=20-24" >}}
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": {},
          "instances": [
            {
              "dbm": true,
              "host": <INSTANCE_ENDPOINT>,
              "port": <DATABASE_PORT>,
              "username": <DATADOG_USER>,
              "password": "ENC[datadog_user_database_password]",
              "ssl": require,
              "azure": {
                "deployment_type": <DEPLOYMENT_TYPE>,
                "fully_qualified_domain_name": <INSTANCE_ENDPOINT>
              }
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
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][15]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example

[20]: /database_monitoring/agent_integration_overhead/?tab=postgres
[30]: /database_monitoring/data_collected/#sensitive-information
[40]: https://www.postgresql.org/docs/current/config-setting.html
[50]: https://www.postgresql.org/docs/current/pgstatstatements.html
[60]: /integrations/faq/postgres-custom-metric-collection-explained/
[70]: https://www.postgresql.org/docs/current/app-psql.html
[80]: https://app.datadoghq.com/account/settings/agent/latest
[90]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[100]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[101]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[102]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[103]: /agent/configuration/agent-commands/#agent-status-and-information
[104]: https://app.datadoghq.com/databases
[105]: /database_monitoring/troubleshooting/?tab=postgres