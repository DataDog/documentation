If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

Follow the instructions to [enable the cluster checks][2] if not already enabled in your Kubernetes cluster.

Below are some examples of how you can declare the Postgres configuration for different Datadog Cluster Agent deployment methods:

### Operator

1. Use the example below to create or update the `datadog-agent.yaml`:

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
                  password: 'ENC[datadog_user_database_password]
                  dbm: true
    ```

    For Postgres 9.6, add the following settings to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Apply the changes to the Datadog Operator with the following command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```
  
### Helm

1. Complete the [Datadog Agent installation instructions][3] for Helm.
2. Update your YAML configuration file (`datadog-values.yaml` in the Cluster Agent installation instructions) to include the following:

    ```yaml
    clusterAgent:
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

    clusterChecksRunner:
      enabled: true
    ```

    For Postgres 9.6, add the following settings to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

3. Deploy the Agent with the above configuration file from the command line:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

[1]: /containers/cluster_agent/setup/?tab=datadogoperator
[2]: /containers/cluster_agent/clusterchecks/?tab=datadogoperator
[3]: /containers/kubernetes/installation/?tab=helm#installation

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/postgres.yaml`:

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

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:

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
              "password": "ENC[datadog_user_database_password]",
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

Visit [Autodiscovery Annotations][5] for more information.

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

The Cluster Agent automatically registers this configuration and begin running the Postgres check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][4] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /agent/configuration/secrets-management
[5]: /containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /containers/kubernetes/installation?tab=datadogoperator#installation
