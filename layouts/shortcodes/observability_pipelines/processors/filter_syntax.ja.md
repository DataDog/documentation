#### フィルタークエリ構文

各プロセッサーには、それぞれのフィールドに対応するフィルタークエリがあります。プロセッサーはフィルタークエリに一致するログのみを処理します。Filter プロセッサー以外のすべてのプロセッサーでは、クエリに一致しないログはパイプラインの次のステップに送られます。Filter プロセッサーでは、クエリに一致しないログは破棄されます。

[予約属性][4001]でない属性、タグ、`key:value` ペアの場合、クエリは `@` で始まる必要があります。逆に、予約属性をフィルタリングする場合、フィルタークエリの前に `@` を付ける必要はありません。

たとえば、`status:info` ログをフィルタリングして破棄するには、フィルターを `NOT (status:info)` に設定します。`system-status:info` をフィルタリングして除去するには、フィルターを `NOT (@system-status:info)` に設定する必要があります。

フィルタークエリの例。
- `NOT (status:debug)`。これは、ステータスが `DEBUG` ではないログのみをフィルタリングします。
- `status:ok service:flask-web-app`。これは、`flask-web-app` サービスからステータス `OK` のすべてのログをフィルタリングします。
    - このクエリは次のようにも記述できます。`status:ok AND service:flask-web-app`。
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`。このフィルタークエリは、ラベルが付けられたホストからのログにのみ一致します。
- `@user.status:inactive`。これは、`user` 属性の下にネストされた `inactive` ステータスのログをフィルタリングします。

Observability Pipelines Worker で実行されるクエリは、大文字と小文字を区別します。フィルタークエリの記述方法の詳細については、[Datadog's Log Search Syntax][4002]を参照してください。

[4001]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4002]: /logs/explorer/search_syntax/
