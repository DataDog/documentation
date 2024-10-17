To install the beta version of the Datadog Agent on Kubernetes, run the following command.
Replace `<DD_API_KEY>` with your [Datadog API key][1] and `<DD_SITE>` with your [Datadog site][2].

```shell
# Override the following environment variables
export DD_API_KEY=<DD_API_KEY>
export DD_SITE=<DD_SITE>

helm repo add datadog https://helm.datadoghq.com
helm repo update
kubectl create secret generic datadog-secret --from-literal api-key="${DD_API_KEY}"
```

Create a `values.yaml` file with the following content:

```yaml
datadog:
  agents:
    image:
      tag: 7.58.0-dbm-mongo-1.6
  registry: datadog/agent
  apiKeyExistingSecret: datadog-secret

```

[1]: /account_management/api-app-keys/
[2]: /getting_started/site/
