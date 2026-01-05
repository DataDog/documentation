To send Datadog Agent logs to the Observability Pipelines Worker, update your [Agent configuration file][1031] with the following:
```
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

After you restart the Agent, your observability data should be going to the Worker, processed by the pipeline, and delivered to Datadog.

[1031]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
