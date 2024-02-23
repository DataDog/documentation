If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

If cluster checks are not already enabled in your Kubernetes cluster, follow the instructions to [enable cluster checks][2]. You can configure the Cluster Agent either with static files mounted in the Cluster Agent container, or by using Kubernetes service annotations:

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
    host: <HOSTNAME>\,1433
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'FreeTDS'
    include_ao_metrics: true  # Optional: For AlwaysOn users
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
    host: '<HOSTNAME>'
    port: <SQL_PORT>
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'FreeTDS'
    include_ao_metrics: true  # Optional: For AlwaysOn users
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
          "host": "<HOSTNAME>",
          "port": "<SQL_PORT>",
          "username": "datadog",
          "password": "<PASSWORD>",
          "connector": "odbc",
          "driver": "FreeTDS",
          "include_ao_metrics": true,  # Optional: For AlwaysOn users
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
