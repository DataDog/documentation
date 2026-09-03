## Sumo Logic HTTP ソース経由で Observability Pipelines Worker にログを送信する

Observability Pipelines Worker をインストールして構成をデプロイすると、Worker は [Sumo Logic HTTP ソース API][1001] を使用する HTTP エンドポイントを公開します。

ログを Sumo Logic HTTP ソースに送信するには、既存のログアップストリームが Worker を指すようにしなければなりません。
```shell
curl -v -X POST -T [local_file_name] http://<OPW_HOST>/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>
```
`<OPW_HOST>` は、Observability Pipelines Worker に関連付けられたホスト (またはロードバランサー) の IP または URL です。CloudFormation を使用したインストールの場合、`LoadBalancerDNS` CloudFormation 出力には使用するための正しい URL が含まれています。Kubernetes を使用したインストールの場合、Observability Pipelines Worker サービスの内部 DNS レコード (`opw-observability-pipelines-worker.default.svc.cluster.local` など) を使用できます。

`<UNIQUE_HTTP_COLLECTOR_CODE>` は、[Observability Pipelines Worker のインストール](#install-the-observability-pipelines-worker)のステップで指定した HTTP ソースのアップロード URL の最後のスラッシュ (`/`) に続く文字列です。

この時点で、ログは Worker に送られ、パイプラインで処理され、構成した宛先に配信されます。

[1001]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/