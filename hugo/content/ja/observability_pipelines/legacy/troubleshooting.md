---
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/monitoring/
  tag: ドキュメント
  text: パイプラインの健全性の監視
title: (レガシー) トラブルシューティング
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines は US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

## 概要
Datadog Observability Pipelines (OP) で想定外の動作が発生した場合、このガイドでよくある問題を確認すると迅速に解決できる可能性があります。引き続き問題が解決しない場合は、[Datadog サポート][3] へお問い合わせください。

## Diagnostic Logs を調査する

Observability Pipelines Worker は、自身のヘルス状態に関する内部ログを出力します。Observability Pipelines UI では、Worker プロセスが各コンポーネントから出力した内部エラー ログを確認できます。診断ログを表示する手順は次のとおりです。

1. [Observability Pipelines][1] に移動します。
1. 調査したいパイプラインをクリックします。
1. コンポーネントをクリックして、そのコンポーネントのサイド パネルを表示します。
1. **Diagnostic Logs** タブをクリックし、Worker が出力しているエラー ログを確認します。ログ レコードをクリックすると Log Explorer で詳細を調査できます。ログが一覧に表示されない場合、そのコンポーネントではエラー ログが出力されていません。

### 詳細なログを取得する

OP Worker が収集する内部ログをさらに詳細に確認したい場合は、環境変数 `VECTOR_LOG` でログ レベルを引き上げます。既定値は `INFO` であり、`INFO`、`WARNING`、`ERROR` メッセージがコンソールに表示されます。

`VECTOR_LOG` を `DEBUG` に設定すると、HTTP リクエストやレスポンスなど、Worker の内部処理に関するより詳細な情報が取得できます。トラブルシューティングの際、Datadog サポートから `DEBUG` ログの提出を求められることがあります。これらのログは Log Explorer と [診断ログ](#investigate-diagnostic-logs) にも表示されます。

## パイプラインを流れるイベントを確認してセットアップの問題を特定する

OP Worker v1.4.0+ では、`tap` コマンドを使用して、ソース、transform、sink を通過するデータをリアルタイムに確認できます。これにより、パイプライン内の各コンポーネントを流れる生データを可視化できます。

### Observability Pipelines Worker API を有効化する

 Observability Pipelines Worker API は、`tap` コマンドを介して Worker プロセスと対話するためのものです。[セットアップ ガイド][2] の Helm チャートを使用している場合、API はすでに有効になっています。それ以外の環境では、環境変数 `DD_OP_API_ENABLED` を `true` に設定してください。API は `localhost` のポート `8686` で待機し、`tap` CLI も同じアドレスを想定しています。

### `tap` でデータを確認する

Worker と同じホスト上にいる場合、次のコマンドを実行して出力を `tap` します。

```
observability-pipelines-worker tap <source or transform name>
```

コンテナ環境を使用している場合は、`docker exec` または `kubectl exec` でコンテナ シェルに入り、上記の `tap` コマンドを実行してください。

### `tap` の使用例

以下の例では、`cleanup` transform が `log` 属性を `message` のコピーにします。

```
sources:
  demo:
    type: demo_logs
    format: json

transforms:
  cleanup:
    type: remap
    inputs:
      - demo
    source: |-
      .log = .message

sinks:
  blackhole:
    type: blackhole
  inputs:
    - cleanup
  print_interval_secs: 0
```

次のコマンドで例の設定を実行し、`cleanup` transform の出力を確認します。

```
observability-pipelines-worker tap cleanup
```

期待される出力は次のとおりで、`log` 属性が `message` 属性のコピーになっていることがわかります。

```
[tap] Pattern 'cleanup' successfully matched.
{"log":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","message":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:53.429855261Z"}
{"log":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","message":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:54.430584949Z"}
{"log":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","message":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:55.430085107Z"}
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /ja/observability_pipelines/legacy/setup/
[3]: /ja/help