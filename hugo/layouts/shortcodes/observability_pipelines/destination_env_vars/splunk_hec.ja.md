Splunk HEC トークンと Splunk インスタンスのベース URL を入力してください。詳細については、[前提条件](#prerequisites)を参照してください。

Worker は HEC トークンを Splunk のコレクションエンドポイントに渡します。Observability Pipelines Worker がログを処理した後、指定された Splunk インスタンスの URL にログを送信します。

**注**: Splunk HEC の送信先は、Splunk HEC の送信先で出力形式を `JSON` または `raw` に設定しているかどうかにかかわらず、すべてのログを `/services/collector/event` エンドポイントに転送します。