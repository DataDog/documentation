Observability Pipelines の Logstash ソースを使用するには、次の情報が必要です。

- `0.0.0.0:8088` などの Logstash アドレス。Observability Pipelines Worker は、このバインドアドレスでアプリケーションからのログを受信します。後で、アプリケーションを設定してログをこのアドレスに送信します。
- フォワーダーがグローバル設定で SSL を有効にしている場合は、適切な TLS 証明書と、秘密鍵を作成する際に使用したパスワード。