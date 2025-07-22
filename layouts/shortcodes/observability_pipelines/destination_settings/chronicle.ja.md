Observability Pipelines Worker for Google Chronicle を認証するには、Google Security Operations の担当者に連絡して Google Developer Service Account Credential を入手してください。この認証情報は JSON ファイルで、`DD_OP_DATA_DIR/config` の下に配置する必要があります。詳しくは、[Getting API authentication credential][10001]を参照してください。

Worker の Google Chronicle 宛先をセットアップするには、次の手順に従います。

1. Google Chronicle インスタンスのカスタマー ID を入力します。
1. 先ほどダウンロードした認証情報 JSON ファイルへのパスを入力します。
1. ドロップダウンメニューで **JSON** または **Raw** エンコーディングを選択します。
1. ログタイプを入力します。ログ内の特定のフィールドに基づいてログを異なるログタイプにルーティングする場合は、[テンプレート構文][10002]を参照してください。

**注**: Google Chronicle の宛先に送信されるログには、インジェスチョンラベルが必要です。たとえば、ログが A10 ロードバランサーからのものであれば、インジェスチョンラベル `A10_LOAD_BALANCER` が必要です。利用可能なログタイプとそれぞれのインジェスチョンラベルのリストについては、Google Cloudの[Support log types with a default parser][10003]を参照してください。

[10001]: https://cloud.google.com/chronicle/docs/reference/ingestion-api#getting_api_authentication_credentials
[10002]: /observability_pipelines/destinations/#template-syntax
[10003]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
