---
description: 5 分以内に、OpenTelemetry ログを Observability Pipelines 経由で CloudPrem に送るためのクイック
  ガイドです。
further_reading:
- link: /cloudprem/quickstart/
  tag: ドキュメント
  text: CloudPrem クイック スタート
- link: /observability_pipelines/sources/opentelemetry/
  tag: ドキュメント
  text: Observability Pipelines 用 OpenTelemetry ソース
- link: /cloudprem/ingest/observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines でログを CloudPrem に送信する
title: Observability Pipelines で OpenTelemetry ログを CloudPrem に送信する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

CloudPrem では、Observability Pipelines を取り込みレイヤーとして使うことで、OTEL Collector からのログを取り込めます。このガイドでは、既存の OTEL 構成を大きく変えずに、OTEL ログを CloudPrem へ接続する手順を順番に説明します。

このガイドを終えるころには、次のことができるようになります:
1. [CloudPrem をローカルで起動する](#step-1-start-cloudprem)
2. [カスタム プロセッサーでタグを追加する Observability Pipeline を API で作成する](#step-2-create-an-observability-pipeline-with-the-api)
3. [Observability Pipelines Worker を起動する](#step-3-run-the-observability-pipelines-worker)
4. [Python SDK を使って OpenTelemetry ログを送信する](#step-4-send-opentelemetry-logs-using-the-python-sdk)
5. [Datadog でタグ付きログを確認する](#step-5-view-tagged-logs-in-datadog)

## 前提条件

- [CloudPrem Preview][1] へのアクセス権
- **Datadog API キー**: [API キーを取得する][2]
- **Datadog アプリケーション キー**: [アプリケーション キーを取得する][3]
- **Docker**: [Docker をインストールする][4]
- **Python 3 と pip**: テスト用の OTLP ログ送信に使用します

## ステップ 1: CloudPrem を起動する

ローカルの CloudPrem インスタンスを起動します。`<YOUR_API_KEY>` は Datadog API キーに置き換えてください:

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## ステップ 2: API を使って Observability Pipeline を作成する

OpenTelemetry ソース、タグ追加用のプロセッサー、CloudPrem 宛先を含むパイプラインを作成します。`<YOUR_APP_KEY>` は Datadog アプリケーション キーに置き換えてください:

```shell
export DD_APP_KEY="<YOUR_APP_KEY>"

curl -s -X POST "https://api.${DD_SITE}/api/v2/obs-pipelines/pipelines" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "attributes": {
        "name": "OTEL to CloudPrem Pipeline",
        "config": {
          "sources": [
            {
              "id": "otel-source",
              "type": "opentelemetry"
            }
          ],
          "processor_groups": [
            {
              "id": "main-processors",
              "enabled": true,
              "include": "*",
              "inputs": ["otel-source"],
              "processors": [
                {
                  "id": "add-tags",
                  "display_name": "Add tags",
                  "enabled": true,
                  "type": "custom_processor",
                  "include": "*",
                  "remaps": [
                    {
                      "drop_on_error": false,
                      "enabled": true,
                      "include": "*",
                      "name": "ddtags",
                      "source": ".ddtags = [\"pipeline:observability-pipelines\", \"source:opentelemetry\"]"
                    }
                  ]
                }
              ]
            }
          ],
          "destinations": [
            {
              "id": "cloudprem-dest",
              "type": "cloud_prem",
              "inputs": ["main-processors"]
            }
          ]
        }
      },
      "type": "pipelines"
    }
  }' | jq -r '.data.id'
```

このコマンドを実行すると `pipeline_id` が返ります。次の手順で使うので控えておいてください。

**注**: このカスタム プロセッサーは、`remaps` 設定を使って、すべてのログにカスタム タグを含む `ddtags` フィールドを追加します。

## ステップ 3: Observability Pipelines Worker を起動する

Docker を使って Observability Pipelines Worker を起動します。`<PIPELINE_ID>` はステップ 2 で取得した ID に置き換えてください:

```shell
export PIPELINE_ID="<PIPELINE_ID>"

docker run -d \
  --name opw \
  -p 4317:4317 \
  -p 4318:4318 \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_OP_PIPELINE_ID=${PIPELINE_ID} \
  -e DD_OP_SOURCE_OTEL_GRPC_ADDRESS="0.0.0.0:4317" \
  -e DD_OP_SOURCE_OTEL_HTTP_ADDRESS="0.0.0.0:4318" \
  -e DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL="http://host.docker.internal:7280" \
  datadog/observability-pipelines-worker run
```

**注**:
- Worker は HTTP 用にポート 4318、gRPC 用にポート 4317 を公開します。
- macOS / Windows では、ホスト マシン上の CloudPrem に接続するために `host.docker.internal` を使います。
- Linux では、`-p` フラグの代わりに `--network host` を使い、エンドポイントには `http://localhost:7280` を指定してください。

{{< img src="/cloudprem/guides/otel-op-cloudprem/op-config.png" alt="Observability Pipelines の設定画面" style="width:100%;" >}}

## ステップ 4: Observability Pipelines 経由でログを送信する

OpenTelemetry SDK をインストールし、テスト ログを Observability Pipelines Worker に送信します:

```shell
pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp-proto-http

python3 -c "
import time, logging
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.sdk.resources import Resource

exporter = OTLPLogExporter(endpoint='http://localhost:4318/v1/logs')
resource = Resource.create({'service.name': 'otel-demo'})
log_provider = LoggerProvider(resource=resource)
log_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
handler = LoggingHandler(logger_provider=log_provider)
logging.getLogger().addHandler(handler)
logging.getLogger().setLevel(logging.INFO)
logging.info('Hello from OpenTelemetry via Observability Pipelines!')
time.sleep(2)
log_provider.shutdown()
print('✓ Log sent successfully!')
"
```

本番環境では、OpenTelemetry Collector が Worker にログを転送するよう設定します:

```yaml
exporters:
  otlphttp:
    endpoint: http://localhost:4318

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlphttp]
```

## パイプラインと CloudPrem を確認する

すべてのコンポーネントが稼働していることを確認します:

```shell
# CloudPrem の状態を確認する

docker logs cloudprem --tail 20
# Observability Pipelines Worker の状態を確認する
docker logs opw --tail 20
```

## ステップ 5: Datadog でログを確認する

1. [Datadog Log Explorer][5] を開きます。
2. 左側の facet パネルで、**CLOUDPREM INDEXES** の下にある CloudPrem インデックスを選択します。
3. `otel-demo` サービスから送信された OpenTelemetry ログが表示され、`pipeline:observability-pipelines` と `source:opentelemetry` のカスタム タグが付いていることを確認できます。

{{< img src="/cloudprem/guides/otel-op-cloudprem/cloudprem_logs.png" alt="Datadog Log Explorer で確認できる CloudPrem ログ" style="width:100%;" >}}

## 次のステップ

- OpenTelemetry Collector または計装済みアプリケーションが Worker にログを送るよう設定する
- パイプラインにさらに多くのプロセッサーを追加する (サンプリング、エンリッチメント、変換など)
- 本番ワークロードに合わせて Worker のデプロイをスケールさせる
- 高度な設定については [Observability Pipelines ドキュメント][6] を参照する

## クリーン アップ

コンテナを停止して削除するには、次のコマンドを実行します:

```shell
docker stop cloudprem opw
docker rm cloudprem opw
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: /ja/account_management/api-app-keys/#add-application-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://app.datadoghq.com/logs
[6]: /ja/observability_pipelines/