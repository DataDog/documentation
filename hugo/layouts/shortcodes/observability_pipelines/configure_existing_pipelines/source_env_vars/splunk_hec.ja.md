- Splunk HEC アドレス:
    - Observability Pipelines Worker がリッスンして、本来 Splunk インデクサー向けであるログを受信するバインドアドレスです。例えば、`0.0.0.0:8088`。   
    **注**: `/services/collector/event` は自動的にエンドポイントに付加されます。
    - 環境変数 `DD_OP_SOURCE_SPLUNK_HEC_ADDRESS` に格納されます。