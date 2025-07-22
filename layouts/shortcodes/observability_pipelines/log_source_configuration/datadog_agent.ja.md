Datadog Agent のログを Observability Pipelines Worker に送信するには、[Agent コンフィギュレーションファイル][1031]を以下のように更新します。
```
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` は、Observability Pipelines Worker に関連付けられたホスト IP アドレスまたはロードバランサー URL です。

CloudFormation インストールの場合、URL には `LoadBalancerDNS` CloudFormationの出力を使用してください。

Kubernetes インストールの場合、Observability Pipelines Worker サービスの内部 DNS レコードを使用できます。たとえば`opw-observability-pipelines-worker.default.svc.cluster.local`。

Agent の再起動後に可観測性データは Worker に送られ、パイプラインで処理され、Datadog に配信されます。

[1031]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
