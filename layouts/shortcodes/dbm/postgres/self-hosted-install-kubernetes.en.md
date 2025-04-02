If you're running a Kubernetes cluster, use the [Datadog Cluster Agent][1] to enable Database Monitoring.

**Note**: Make sure [cluster checks][2] are enabled for your Datadog Cluster Agent before proceeding.

Below are step-by-step instructions for configuring the Postgres integration using different Datadog Cluster Agent deployment methods.

### Operator

Using the [Operator instructions in Kubernetes and Integrations][3] as a reference, follow the steps below to set up the Postgres integration:

1. Create or update the `datadog-agent.yaml` file with the following configuration:

    ```yaml
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

      override:
        nodeAgent:
          image:
            name: agent
            tag: 7.63.3

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <HOST>
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Apply the changes to the Datadog Operator using the following command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```
  
### Helm

Using the [Helm instructions in Kubernetes and Integrations][4] as a reference, follow the steps below to set up the Postgres integration:

1. Update your `datadog-values.yaml` file (used in the Cluster Agent installation instructions) with the following configuration:

    ```yaml
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
            host: <HOST>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Deploy the Agent with the above configuration file using the following command:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container at the path: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<HOST>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'

    ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configure with Kubernetes service annotations

Instead of mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:

#### Autodiscovery Annotations v2

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
              "host": "<HOST>",
              "port": 5432,
              "username": "datadog",
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

For more information, see [Autodiscovery Annotations][5].

If you're using Postgres 9.6, add the following to the instance configuration:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

The Cluster Agent automatically registers this configuration and begins running the Postgres check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][6] and declare the password using the `ENC[]` syntax.

[1]: /containers/cluster_agent/setup/
[2]: /containers/cluster_agent/clusterchecks/
[3]: /containers/kubernetes/integrations/?tab=datadogoperator
[4]: /containers/kubernetes/integrations/?tab=helm
[5]: /containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /agent/configuration/secrets-management
