---
title: Send logs to CloudPrem with Observability Pipelines
aliases:
- /cloudprem/ingest_logs/observability_pipelines/
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
- link: "/observability_pipelines/destinations/cloudprem/"
  tag: "Documentation"
  text: "CloudPrem Destination for Observability Pipelines"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

Observability Pipelines provides a flexible intermediary layer between your Datadog Agents and CloudPrem, allowing you to process, transform, and route logs before they reach your CloudPrem deployment. Configure Observability Pipelines to receive logs from the Datadog Agent and forward them to CloudPrem:
1. [**Create and configure the pipeline**](#create-and-configure-an-observability-pipeline) - Define your pipeline configuration (source, processors, destination) in the Observability Pipelines UI. This creates the pipeline definition that will be used by the Worker.
2. [**Deploy the Observability Pipelines Worker**](##deploy-your-observability-pipelines) - Install the Worker with your pipeline configuration. The Worker must be running and listening for logs before the Agent can connect to it.
3. [**Configure the Datadog Agent**](#configure-the-datadog-agent) - Point the Agent to send logs to the deployed Worker. This step must come last because the Agent needs the Worker's address to be available.

## Create and configure an Observability Pipeline

1. Navigate to [Observability Pipelines][1].
1. Select the [**Log Volume Control template**][2].
1. Set up your pipeline:
    1. Choose the [**Datadog Agent** source][3].
    1. Remove any default processors from the pipeline.
    1. Select the [**Datadog CloudPrem** destination][4] to forward logs to your CloudPrem instance. Leave the configuration empty.

<!-- This image shows an example with dual shipping when the instructions say log volume control -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Screenshot of the Logs Explorer interface showing how to filter logs by selecting the cloudprem index in the facets panel" style="width:80%;" >}} -->


## Deploy your Observability Pipelines

After creating your pipeline in the UI, deploy the Observability Pipelines Worker. The Worker runs your pipeline configuration and listens for logs from the Datadog Agent.

The following Helm command installs or upgrades the Worker, configuring it to listen for logs and forward them to your CloudPrem indexer.
<br>
**Note**: You need the `pipelineId` from the pipeline you created in the previous step. This ID links the Worker to your pipeline configuration.

```shell
helm upgrade --install opw \
	-f values.yaml \
	--set datadog.apiKey=XXXXXXX \
	--set datadog.pipelineId=XXXXXXX \
	--set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0:8282' \
	--set env[1].name=DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL,env[1].value='http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280' \
	--set service.ports[0].name=dd-op-source-datadog-agent-address-port,service.ports[0].protocol=TCP,service.ports[0].port=8282,service.ports[0].targetPort=8282 \
	datadog/observability-pipelines-worker
```

After a minute, verify that logs are flowing through the pipeline and reaching the CloudPrem destination. This indicates that the Worker is running and ready to receive logs, and you can proceed to configure the Agent.

## Configure the Datadog Agent

After the Observability Pipelines Worker is deployed and running, configure your Datadog Agent to send logs to it. The Agent connects to the Worker using the Worker's service address. For more information, see [Connect the Datadog Agent to the Observability Pipelines Worker][5].

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
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
        value: "true"
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
        value: "http://observability-pipelines-worker:8282"

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
[2]: /observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /observability_pipelines/sources/datadog_agent/
[4]: /observability_pipelines/destinations/cloudprem/
[5]: /observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker
