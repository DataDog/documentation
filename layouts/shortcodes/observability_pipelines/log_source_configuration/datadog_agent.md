To send Datadog Agent logs to the Observability Pipelines Worker, update your [Agent configuration file][1031] with the following:
```
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker.

For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used. For example: `datadog-observability-pipelines-worker.default.svc.cluster.local`.

After you restart the Agent, your observability data should be going to the Worker, processed by the pipeline, and delivered to Datadog.

[1031]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
