Observability Pipelines の HTTP/S Client ソースを使用するには、次の情報が必要です。

1. Observability Pipelines Worker がログイベントを収集する HTTP サーバーエンドポイントのフルパス。例: `https://127.0.0.8/logs`
2. HTTP 認証トークンまたはパスワード。

HTTP/S Client ソースは、上流の HTTP サーバーからデータを取得します。Worker をインストールする際に環境変数として設定した HTTP Client エンドポイント URL に対して、HTTP サーバーは GET リクエストをサポートしている必要があります。
