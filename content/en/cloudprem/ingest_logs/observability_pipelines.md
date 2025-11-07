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

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

You can send logs to CloudPrem using Observability Pipelines with the following setup:
- Datadog Agent collects logs and send them to Observability Pipelines HTTP server source.
- Observability Pipelines forwards logs to the HTTP client destination.

## Create and configure an Observability Pipeline

You'll need to create a pipeline that acts as an intermediary for your logs. Navigate to the [Observability Pipelines][1] page and create a pipeline using the **Log Volume Control** template. Configure the pipeline with the following components:
- **HTTP server source**:  (No configuration) This is the entry point where the Datadog Agent will send logs. Leave the configuration empty.
- **Empty processor**: Remove all default processors from the pipeline.
- **HTTP client destination**: (No configuration) This forwards the logs to your CloudPrem instance. Leave the configuration empty.

After configuring, your pipeline should look like this and you are ready to deploy:

{{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Screenshot of the Logs Explorer interface showing how to filter logs by selecting the cloudprem index in the facets panel" style="width:80%;" >}}


## Deploy your Observability Pipelines

While other methods exist, this guide uses the Helm command for deployment. The following command installs or upgrades the pipeline, configuring it to listen for logs and forward them to your CloudPrem indexer.

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

After a minute, you should see logs flowing through the pipelines and successfully reach the CloudPrem destination.

## Configure Datadog Agent

The final step is to update your Datadog Agent's configuration to point its logs to the newly deployed Observability Pipelines worker. You do this by setting the `DD_LOGS_CONFIG_LOGS_DD_URL` environment variable to the pipeline's address.

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
