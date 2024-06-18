To install the beta version of the Datadog Agent on Kubernetes, run the following command. Replace `<DD_API_KEY>` with your [Datadog API key][1].

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
      tag: 7.55.0~dbm~mongo~0.1
  registry: datadog/agent-dev
  apiKeyExistingSecret: datadog-secret

```

[1]: /account_management/api-app-keys/
