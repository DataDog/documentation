To send Datadog Agent logs to the Observability Pipelines Worker, update your Datadog Helm chart [`datadog-values.yaml`][1021] with the following environment variables. See [Agent Environment Variables][1022] for more information.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
      value: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker.

For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

[1021]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[1022]: https://docs.datadoghq.com/agent/guide/environment-variables/