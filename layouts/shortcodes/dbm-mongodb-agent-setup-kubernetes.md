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
  --set "clusterAgent.confd.mongo\.yaml=cluster_check: true
init_config:
instances:
  - hosts:
      - <HOST>:<PORT>
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>"\
  datadog/datadog
```

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/mongo.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - hosts:
      - <HOST>:<PORT>
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
```

### Configure with Kubernetes service annotations

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb-datadog-check-instances
  annotations:
    ad.datadoghq.com/mongo.checks: |
    {
      "mongo": {
        "init_config": [{}],
        "instances": [{
          "hosts": ["<HOST>:<PORT>"],
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "database": "<DATABASE>",
          "options": {
            "authSource": "admin"
          },
          "dbm": true,
          "cluster_name": "<MONGO_CLUSTER_NAME>",
          "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>"
        }]
      }
    }
spec:
  ports:
  - port: 27017
    protocol: TCP
    targetPort: 27017
    name: mongodb
```

The Cluster Agent automatically registers this configuration and begins running the MongoDB integration.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][4] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /agent/configuration/secrets-management
