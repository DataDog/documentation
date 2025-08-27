---
title: Send logs to CloudPrem with the Datadog Agent
description: Configure the Datadog Agent to send logs to your CloudPrem deployment
further_reading:
- link: "/cloudprem/ingest_logs/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines Integration"
- link: "/cloudprem/ingest_logs/rest_api/"
  tag: "Documentation"
  text: "REST API Integration"
- link: "/getting_started/containers/datadog_operator/"
  tag: "Documentation"
  text: "Datadog Operator Guide"
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Overview

To send logs with the Datadog agent to CloudPrem, you need to set the two following environment variables:
- `DD_LOGS_CONFIG_LOGS_DD_URL` to CloudPrem endpoint, usually `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`.
- Optionally, `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` to `100000` (~5 years). This ensure the Agent adds host-level tags that it knows about to each sent log. When sending logs to Datadog SaaS, those tags can be automatically added after ingestion. When sending logs to CloudPrem, we need to ensure those tags are added to each logs as CLoudPrem does not enrich those logs as the SaaS does.

## Send Kubernetes logs to CloudPrem with the Datadog Agent deployed with the Datadog Operator

Follow the [Getting Started with Datadog Operator][1] guide for installation and deployment. When you reach Step 3, use the following `datadog-agent.yaml` configuration instead of the example provided in the guide.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "100000"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    otlp:
      receiver:
        protocols:
          grpc:
            enabled: true
            endpoint: 0.0.0.0:4417

    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true

```

## Configuration options

### Endpoint configuration

The Datadog Agent can be configured to send logs to CloudPrem using different endpoints:

**Internal cluster endpoint** (recommended for in-cluster agents):
```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

**Internal ingress endpoint** (for agents outside the cluster):
```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```

### Additional Agent configuration

You can also configure additional features to send cluster metadata to Datadog:

**Prometheus metrics scraping**:
```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```

**OTLP logs collection** (to send Agent logs to Datadog):
```yaml
features:
  otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
          endpoint: 0.0.0.0:4417
```

## Alternative deployment methods

### Helm chart deployment

If you're not using the Datadog Operator, you can deploy the Agent using Helm:

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### DaemonSet deployment

For custom deployments, set the environment variable in your DaemonSet:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:latest
        env:
        - name: DD_API_KEY
          value: <YOUR_API_KEY>
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_LOGS_CONFIG_LOGS_DD_URL
          value: "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280"
```

## Verification

### Check Agent status

Verify that the Agent is sending logs to CloudPrem:

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for CloudPrem connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### Check logs are indexed in CloudPrem

This command should return indexed JSON logs:

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Troubleshooting

**Agent not sending logs**:
- Verify the `DD_LOGS_CONFIG_LOGS_DD_URL` environment variable is set correctly
- Check Agent pod logs: `kubectl logs <datadog-agent-pod>`
- Ensure log collection is enabled: `DD_LOGS_ENABLED=true`

**CloudPrem not receiving logs**:
- Check CloudPrem indexer logs: `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Verify network connectivity between Agent and CloudPrem indexer
- Confirm CloudPrem service is running: `kubectl get pods -n <NAMESPACE_NAME>`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/datadog_operator/#installation-and-deployment
