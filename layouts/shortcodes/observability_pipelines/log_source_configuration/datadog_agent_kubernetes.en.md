To send Datadog Agent logs to the Observability Pipelines Worker, update your Datadog Helm chart [`datadog-values.yaml`][1021] with the following environment variables. See [Agent Environment Variables][1022] for more information.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
      value: "http://<OPW_HOST>:8282"
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "1000000m"
```

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` ensures the Agent attaches host-level tags (such as EC2 instance tags) directly to each log event sent to Observability Pipelines. Without this setting, these tags are applied at the Datadog intake level and are not present in the log payload when it passes through Observability Pipelines. Setting the duration to `1000000m` (approximately 1.5 years) covers the standard lifecycle of a node.
`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker.

For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

[1021]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[1022]: https://docs.datadoghq.com/agent/guide/environment-variables/
