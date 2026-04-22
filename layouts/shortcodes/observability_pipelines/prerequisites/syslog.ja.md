Observability Pipelines の Syslog ソースを使用するには、アプリケーションが次のいずれかの形式でデータを送信している必要があります: [RFC 6587][9071]、[RFC 5424][9072]、[RFC 3164][9073]。また、次の情報を用意しておく必要があります:

1. Observability Pipelines Worker (OPW) がアプリケーションからのログを受信する際にリッスンするバインドアドレス。例: `0.0.0.0:8088`。後でアプリケーションをこのアドレスにログを送信するように設定します。
2. フォワーダーがグローバル設定で SSL を有効にしている場合は、適切な TLS 証明書と、秘密鍵を作成する際に使用したパスワード。

[9071]: https://datatracker.ietf.org/doc/html/rfc6587
[9072]: https://datatracker.ietf.org/doc/html/rfc5424
[9073]: https://datatracker.ietf.org/doc/html/rfc3164