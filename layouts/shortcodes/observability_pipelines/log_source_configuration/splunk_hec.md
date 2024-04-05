## Send logs to the Observability Pipelines Worker over Splunk HEC

After you install the Observability Pipelines Worker and deploy the configuration, the Worker exposes three HTTP endpoints that uses the [Splunk HEC API][901]:
- `/services/collector/event`
- `/services/collector/raw`
- `/services/collector/health`

To send logs to your Splunk index, you must point your existing logs upstream to the Worker.
```shell
curl http://<OPW_HOST>:8088/services/collector/event \
	-H "Authorization: Splunk <DD_OP_DESTINATION_SPLUNK_HEC_TOKEN>" \
	-d '{"sourcetype": "_json", "event": {"a": "value1", "b": ["value1_1", "value1_2"]}}'
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use. For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used, for example `opw-observability-pipelines-worker.default.svc.cluster.local`.

`<DD_OP_DESTINATION_SPLUNK_HEC_TOKEN>` is the HEC token you provided during the [Install your Observability Pipelines Worker](#install-the-observability-pipelines-worker) step.

At this point, your logs should be going to the Worker, processed by the pipeline, and delivered to the Splunk index.

[901]: https://docs.splunk.com/Documentation/Splunk/9.2.1/Data/UsetheHTTPEventCollector