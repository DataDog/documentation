## Send logs to the Observability Pipelines Worker over Sumo Logic HTTP Source

After you install the Observability Pipelines Worker and deploy the configuration, the Worker exposes HTTP endpoints that uses the [Sumo Logic Http Source API][1001].

To send logs to your Sumo Logic HTTP Source, you must point your existing logs upstream to the Worker:
```shell
curl -v -X POST -T [local_file_name] http://<OPW_HOST>/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>
```
`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use. For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used, eg. `opw-observability-pipelines-worker.default.svc.cluster.local`.

`<UNIQUE_HTTP_COLLECTOR_CODE>` is the string that follows the last forward slash (`/`) in the upload URL for the HTTP source that you provided during the [Install your OP Worker](link to [Draft] OP 2.0 Doc instructions) step.

At this point, your logs should be going to the Worker, processed by the pipeline, and uploaded to the Sumo Logic HTTP Source.

[1001]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/