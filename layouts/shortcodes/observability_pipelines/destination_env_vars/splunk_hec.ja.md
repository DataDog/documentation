Splunk HEC トークンと Splunk インスタンスのベース URL を入力します。詳細については、[前提条件](#prerequisites)を参照してください。

Worker は HEC トークンを Splunk コレクションエンドポイントに渡します。Observability Pipelines Worker はログの処理後に、指定された Splunk インスタンスの URL にログを送信します。

**注**: Splunk HEC の宛先は、Splunk HEC の宛先で出力のエンコード形式を `JSON` または `raw` に設定しているかどうかにかかわらず、すべてのログを `/services/collector/event` エンドポイントに転送します。