Datadog Agent のログを Observability Pipelines Worker に送信するには、Datadog Helm チャート [`datadog-values.yaml`][1021] を以下の環境変数で更新します。詳しくは、[Agent Environment Variables][1022]を参照してください。

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
      value: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` は Observability Pipelines Worker に関連付けられているホスト (またはロードバランサー) の IP/URL です。

Kubernetes インストールの場合、Observability Pipelines Worker サービスの内部 DNS レコードを使用できます。たとえば`opw-observability-pipelines-worker.default.svc.cluster.local`。

[1021]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[1022]: https://docs.datadoghq.com/agent/guide/environment-variables/
