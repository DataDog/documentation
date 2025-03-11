## Splunk フォワーダーを Observability Pipelines Worker に接続する

ログを Worker に転送するには、以下の構成を Splunk Heavy/Universal フォワーダーの `etc/system/local/outputs.conf` に追加し、`<OPW_HOST>` を Observability Pipelines Worker に関連付けられたホスト (またはロードバランサー) の IP または URL に置き換えます。

```
[tcpout]
compressed=false
sendCookedData=false
defaultGroup=opw

[tcpout:opw]
server=<OPW_HOST>:8099
```

`<OPW_HOST>` は、Observability Pipelines Worker に関連付けられたホスト (またはロードバランサー) の IP または URL です。CloudFormation を使用したインストールの場合、`LoadBalancerDNS` CloudFormation 出力には使用するための正しい URL が含まれています。Kubernetes を使用したインストールの場合、Observability Pipelines Worker サービスの内部 DNS レコードを使用できます。例: `opw-observability-pipelines-worker.default.svc.cluster.local`

この時点で、ログは Worker に送られ、パイプラインで処理され、構成した宛先に配信されます。