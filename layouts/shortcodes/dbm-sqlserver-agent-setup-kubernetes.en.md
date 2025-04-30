If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

If cluster checks are not already enabled in your Kubernetes cluster, follow the instructions to [enable cluster checks][2]:

### Operator

Using the [Operator instructions in Kubernetes and Integrations][5] as a reference, follow the steps below to set up the SQL Server integration:

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
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              sqlserver.yaml: |-
                cluster_check: true # Make sure to include this flag
                init_config:
                instances:
                - host: <HOSTNAME>,<PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  connector: 'odbc'
                  driver: 'ODBC Driver 18 for SQL Server'
                  dbm: true
                  # Optional: For AlwaysOn users
                  database_metrics: 
                    ao_metrics: 
                      enabled: true
                  # Optional: For monitoring SQL Server Agent jobs               
                  agent_jobs: 
                    enabled: true
                    collection_interval: 15
                    history_row_limit: 10000 
                  # Optional: For additional tags
                  tags:  
                    - 'service:<CUSTOM_SERVICE>'
                    - 'env:<CUSTOM_ENV>'
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

Complete the following steps to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment.

1. Complete the [Datadog Agent installation instructions][3] for Helm.
2. Update your YAML configuration file (`datadog-values.yaml` in the Cluster Agent installation instructions) to include the following:
    ```yaml
    clusterAgent:
      confd:
        sqlserver.yaml: |-
          cluster_check: true # Make sure to include this flag
          init_config:
          instances:
          - dbm: true
            host: <HOSTNAME>,<PORT>
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            connector: 'odbc'
            driver: 'ODBC Driver 18 for SQL Server'
            # Optional: For AlwaysOn users
            database_metrics: 
              ao_metrics: 
                enabled: true
            # Optional: For monitoring SQL Server Agent jobs
            agent_jobs: 
              enabled: true
              collection_interval: 15
              history_row_limit: 10000
            # Optional: For additional tags
            tags: 
              - 'service:<CUSTOM_SERVICE>'
              - 'env:<CUSTOM_ENV>'

      clusterChecksRunner:
        enabled: true
      ```

3. Deploy the Agent with the above configuration file from the command line:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,<PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # Optional: For AlwaysOn users
    database_metrics: 
      ao_metrics: 
        enabled: true
    # Optional: For monitoring SQL Server Agent jobs               
    agent_jobs: 
      enabled: true
      collection_interval: 15
      history_row_limit: 10000
    # Optional: For additional tags  
    tags: 
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

### Configure with Kubernetes service annotations

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sqlserver-datadog-check-instances
  annotations:
    ad.datadoghq.com/service.check_names: '["sqlserver"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<HOSTNAME>,<PORT>",
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "database_metrics": {
            "ao_metrics": {
              "enabled": true
            }
          },
          "agent_jobs": {
            "enabled": true,
            "collection_interval": 15,
            "history_row_limit": 10000
          },
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"]  
        }
      ]
spec:
  ports:
  - port: 1433
    protocol: TCP
    targetPort: 1433
    name: sqlserver
```

The Cluster Agent automatically registers this configuration and begins running the SQL Server check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][4] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: /containers/kubernetes/installation/?tab=helm#installation
[4]: /agent/configuration/secrets-management
[5]: /containers/kubernetes/integrations/?tab=datadogoperator
