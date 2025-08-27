---
title: Send logs to CloudPrem with Observability Pipelines
description: Configure Observability Pipelines to send logs to CloudPrem with optional dual shipping
further_reading:
- link: "/cloudprem/ingest_logs/datadog_agent/"
  tag: "Documentation"
  text: "Datadog Agent Integration"
- link: "/cloudprem/ingest_logs/rest_api/"
  tag: "Documentation"
  text: "REST API Integration"
- link: "/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines Overview"
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Overview

You can send logs to CloudPrem using Observability Pipelines with the following setup:
- Datadog Agent collects logs and send them to Observability Pipelines HTTP server source.
- Observability Pipelines forwards logs to the HTTP client destination.

## Create and configure an Observability Pipeline in Datadog

On the [Observability Pipelines][1] page, create a pipeline using the **Log Volume Control** template and configure the pipeline with:
- An HTTP server source (no configuration).
- An empty processor (remove all default processors).
- An HTTP client destination (no configuration).

Your pipeline should look like this one:

{{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Screenshot of the Logs Explorer interface showing how to filter logs by selecting the cloudprem index in the facets panel" style="width:80%;" >}}

You are ready to deploy it.

## Deploy your Observability Pipelines

We use Helm command used to install OP but you can use other installation methods.

```shell
helm upgrade --install opw \
	-f values.yaml \
	--set datadog.apiKey=XXXXXXX \
	--set datadog.pipelineId=XXXXXXX \
	--set env[0].name=DD_OP_SOURCE_HTTP_SERVER_ADDRESS,env[0].value='0.0.0.0:8282' \
	--set env[1].name=DD_OP_DESTINATION_HTTP_CLIENT_URI,env[1].value='http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280/api/v2/datadog' \
	--set service.ports[0].name=dd-op-source-http-server-address-port,service.ports[0].protocol=TCP,service.ports[0].port=8282,service.ports[0].targetPort=8282 \
	datadog/observability-pipelines-worker
```

After a minute or so, you should see logs flowing in OP and successfully forwarded to the CloudPrem destination.

## Configure Datadog Agent to send to Observability Pipelines

Update your Datadog Agent configuration to send logs to the Observability Pipelines worker:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: your-cluster
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://observability-pipelines-worker:8282

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

## Verification

Check that logs are flowing through the pipeline:

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching CloudPrem
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
