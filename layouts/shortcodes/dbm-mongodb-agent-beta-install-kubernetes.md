To install the beta version of the Datadog Agent on Kubernetes, run the following command.

```shell
# Override the following environment variables
export DD_API_KEY=<DD_API_KEY>

helm repo add datadog https://helm.datadoghq.com
helm repo update
kubectl create secret generic datadog-secret --from-literal api-key="${DD_API_KEY}"
```

Create a `values.yaml` file with the following content:

```yaml
datadog:
  agents:
    image:
      tag: 7.56.0-dbm-mongo-1.1
  registry: datadog/agent
  apiKeyExistingSecret: datadog-secret

```

