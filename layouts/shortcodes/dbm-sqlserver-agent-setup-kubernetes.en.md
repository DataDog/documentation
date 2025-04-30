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
                cluster_check: true
                init_config:
                instances:
                - host: <HOSTNAME>,1433
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  connector: 'FreeTDS'
                  include_ao_metrics: true
                  dbm: true
                  include_ao_metrics: true  # Optional: For AlwaysOn users
                  agent_jobs:               # Optional: For monitoring SQL Server Agent jobs
                    enabled: true
                    collection_interval: 15
                    history_row_limit: 10000
                  tags:  # Optional
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

### Command line with Helm

Execute the following [Helm][3] command to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterChecksRunner.enabled=true' \
  --set "clusterAgent.confd.sqlserver\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,1433
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'FreeTDS'
    include_ao_metrics: true  # Optional: For AlwaysOn users
    agent_jobs:               # Optional: For monitoring SQL Server Agent jobs
      enabled: true
      collection_interval: 15
      history_row_limit: 10000
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'"\
  datadog/datadog
```

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,1433
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'FreeTDS'
    include_ao_metrics: true  # Optional: For AlwaysOn users
    agent_jobs:               # Optional: For monitoring SQL Server Agent jobs
      enabled: true
      collection_interval: 15
      history_row_limit: 10000
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>
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
          "host": "<HOSTNAME>,1433",
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "FreeTDS",
          "include_ao_metrics": true,  # Optional: For AlwaysOn users
          "agent_jobs": {              # Optional: For monitoring SQL Server Agent jobs
            "enabled": true,
            "collection_interval": 15,
            "history_row_limit": 10000
          },
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"]  # Optional
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
[3]: https://helm.sh
[4]: /agent/configuration/secrets-management
[5]: /containers/kubernetes/integrations/?tab=datadogoperator
