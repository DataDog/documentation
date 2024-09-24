To send Datadog Agent logs to the Observability Pipelines Worker, update your Datadog helm chart [values.yaml][1021] with the following environment variables. See [Agent Environment Variables][1022] for more information.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
      value: "http://opw-observability-pipelines-worker:8282"
```

`<OPW_HOST>` is the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. 

For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used. For example: `datadog-observability-pipelines-worker.default.svc.cluster.local`.

[1021]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[1022]: https://docs.datadoghq.com/agent/guide/environment-variables/