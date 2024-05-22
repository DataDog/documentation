## Connect the Datadog Agent to the Observability Pipelines Worker

To send Datadog Agent logs to the Observability Pipelines Worker, update your Agent configuration with the following:
```
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use. For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used. For example: `datadog-observability-pipelines-worker.default.svc.cluster.local`.

At this point, your observability data should be going to the Worker, processed by the pipeline, and delivered to Datadog.
