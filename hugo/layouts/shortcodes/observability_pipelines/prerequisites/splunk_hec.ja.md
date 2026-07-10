Observability Pipelines の Splunk HTTP イベントコレクター (HEC) ソースを使用するには、Splunk に[期待される HEC 形式][3001]でデータを送信するアプリケーションが必要です。

Observability Pipelines の Splunk HEC 宛先を使用するには、HTTP イベントコレクター (HEC) の入力で構成された Splunk Enterprise または Cloud インスタンスが必要です。また、以下の情報が利用可能です。

- Splunk HEC トークン。
- Observability Pipelines Worker がアプリケーションからログを受信するためにリッスンするバインドアドレス。たとえば、`0.0.0.0:8080`。後ほど、このアドレスにログを送信するように[アプリケーションを構成](#send-logs-to-the-observability-pipelines-worker-over-splunk-hec)します。
- Worker が処理したログを送信する Splunk インスタンスのベース URL。この URL には、Splunk インスタンスで Splunk HTTPイベントコレクター用にグローバルに設定されているポートを含める必要があります。たとえば、Splunk Cloud の場合: `https://prd-p-0mupp.splunkcloud.com:8088`。
- HEC が SSL を有効にするようにグローバルに設定されている場合、適切な [TLS 証明書][3002]と秘密鍵ファイルの作成に使用したパスワードも必要です。

Splunk HEC のセットアップの詳細については、[Splunk Web で HTTPイベントコレクターを構成する][3003]を参照してください。

**注**: Observability Pipelines は HEC Indexer Acknowledgement をサポートしていません。

[3001]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector
[3002]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[3003]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector