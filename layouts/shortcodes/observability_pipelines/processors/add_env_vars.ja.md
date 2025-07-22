このプロセッサーを使用して、環境変数のフィールド名と値をログメッセージに追加します。

このプロセッサーをセットアップするには、次の手順に従います。

1. [フィルタークエリ](#filter-query-syntax)を定義します。指定されたフィルタークエリに一致するログのみが処理されます。フィルタークエリに一致するかどうかにかかわらず、すべてのログはパイプラインの次のステップに送られます。
1. 環境変数のフィールド名を入力します。
1. 環境変数名を入力します。
1. さらに環境変数を追加するには、[**Add Environment Variable**] をクリックします。

##### ブロックされる環境変数

以下のいずれかのパターンに一致する環境変数は、機密データを含む可能性があるため、ログメッセージへの追加がブロックされます。

- `CONNECTIONSTRING` / `CONNECTION-STRING` / `CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID` / `CLIENT-ID` / `CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL` / `DATABASE-URL` / `DATABASE_URL`
- `DBURL` / `DB-URL` / `DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

環境変数はリテラルワードではなく、パターンに一致します。たとえば `PASSWORD` は、`USER_PASSWORD` や `PASSWORD_SECRET` のような環境変数がログメッセージに追加されることを防ぎます。

##### 許可リスト

パイプラインにプロセッサーを追加したら、[**Next: [Install**] をクリックし、[**Add environment variable processor(s) allowlist**] フィールドに、値を取得し、このプロセッサーで使用する環境変数のカンマ区切りリストを入力します。

許可リストは環境変数 `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST` に格納されます。