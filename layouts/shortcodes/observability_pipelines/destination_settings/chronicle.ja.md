Observability Pipelines Worker for Google Chronicle を認証するには、Google Security Operations の担当者に連絡して Google Developer Service Account Credential を取得してください。このクレデンシャルは JSON ファイルであり、`DD_OP_DATA_DIR/config` に配置する必要があります。詳細については、[API 認証情報の取得][10001]を参照してください。

Worker の Google Chronicle 宛先を設定するには、以下の手順を行います:

1. Google Chronicle インスタンスのカスタマー ID を入力します。 
1. 先ほどダウンロードした資格情報 JSON ファイルへのパスを入力します。 
1. ドロップダウンメニューで **JSON** または **Raw** エンコーディングを選択します。 
1. ログタイプを入力します。ログの特定のフィールドに基づいて異なるログタイプに振り分けたい場合は、[テンプレート構文][10002]を参照してください。

**注**: Google Chronicle 宛先に送信するログにはインジェスションラベルが必須です。たとえば、A10 ロードバランサーのログであれば、インジェスションラベルとして `A10_LOAD_BALANCER` を付与する必要があります。利用可能なログタイプと対応するインジェスションラベルの一覧については、Google Cloud の[デフォルトパーサーでログタイプをサポートする][10003]を参照してください。

[10001]: https://cloud.google.com/chronicle/docs/reference/ingestion-api#getting_api_authentication_credentials
[10002]: /ja/observability_pipelines/destinations/#template-syntax
[10003]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser