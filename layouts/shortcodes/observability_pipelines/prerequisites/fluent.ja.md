Observability Pipelines の Fluentd または Fluent Bit ソースを使用するには、次の情報が必要です。

1. Observability Pipelines Worker は、このバインドアドレスでアプリケーションからのログを受信します。例: `0.0.0.0:8088`。後で、アプリケーションを設定してログをこのアドレスに送信します。
2. フォワーダーがグローバル設定で SSL を有効にしている場合は、適切な TLS 証明書と、秘密鍵を作成する際に使用したパスワード。