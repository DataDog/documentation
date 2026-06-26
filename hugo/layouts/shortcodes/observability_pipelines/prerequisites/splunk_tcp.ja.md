Observability Pipelines の Splunk TCP 送信元を使用するには、Splunk Enterprise または Cloud インスタンスと、Splunk Universal Forwarder または Splunk Heavy Forwarder のいずれかが Splunk インスタンスにデータをルーティングしている必要があります。また、以下の情報も利用可能です。
- Observability Pipelines Worker がアプリケーションからログを受信するためにリッスンするバインドアドレス。例えば、`0.0.0.0:8088`。後で、このアドレスにログを送信するように[アプリケーションを構成](#connect-splunk-forwarder-to-the-observability-pipelines-worker)します。
- フォワーダーが SSL を有効にするようにグローバルに構成されている場合は、適切な [TLS 証明書][101]と、秘密鍵の作成に使用したパスワード。

Splunk フォワーダーの詳細については、[Universal Forwarder のデプロイ][102]または [Heavy Forwarder のデプロイ][103]を参照してください。

[101]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[102]: https://docs.splunk.com/Documentation/Forwarder/9.2.0/Forwarder/Installtheuniversalforwardersoftware
[103]: https://docs.splunk.com/Documentation/Splunk/9.2.1/Forwarding/Deployaheavyforwarder
