---
description: SQL Server のデータベースモニタリングセットアップのトラブルシューティング
title: SQL Server 用 DBM セットアップのトラブルシューティング
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

このページでは、SQL Server によるデータベースモニタリングのセットアップおよび使用に関する一般的な問題と、その解決方法について詳しく説明します。Datadog では、Agent のバージョンリリースにより内容が変更となる可能性があるため、最新の安定した Agent バージョンを使用し、最新の[セットアップドキュメント][1]に従っていただくことをお勧めします。

## Diagnosing common connection issues {#common-connection-issues}

### SQL Server unable to connect 'Login Failed for user' {#login-failed-for-user}

Agent が SQL Server インスタンスに接続するには、2 つの方法があります。

1. [Windows 認証][2] (Windows ホストでのみ利用可)

2. [SQL Server 認証][3]

Windows 認証は、デフォルトの認証モードで、SQL Server 認証よりも安全です。Windows 認証を使用することで、ドメインレベルで Windows グループを作成し、そのグループ全体に対して SQL Server 上でログインを作成することができます。Windows 認証を使用するためには、以下のことが必要です。

1. Agent インストール時に作成したサービスアカウントを使用し、このアカウントが SQL Server への適切なアクセス権を持っていることを確認します。

2. `connection_string: "Trusted_Connection=yes"` を設定し、`username` と `password` フィールドを省略します。`Trusted_Connection=yes` の接続属性は、SQL Server 用 OLE DB ドライバーが Windows 認証を使用してログインを確認するように指示します。

SQL Server の認証は Windows のユーザーアカウントではなく、インスタンスで作成され、SQL Server 自体に保存されます。SQL 認証では、SQL Server インスタンス構成で `username` と `password` を設定して接続する必要があります。

ログインエラーで接続できない場合、まず Datadog Agent のユーザーとしてインスタンスにログインできることを確認することが重要です。これを行う簡単な方法は、`sqlcmd` のようなコマンドラインユーティリティを使用することです。

例:

```bash
# この例では、SQL 認証を使用しています
sqlcmd -S <INSTANCE_ENDPOINT> -U datadog -P <DATADOG_PASSWORD> -d master

# この例では、Windows 認証を使用しています
# パワーシェルで `run as user…` オプションを選択し、ddagentuser としてこのコマンドを実行します
sqlcmd -S <INSTANCE_ENDPOINT> -d master -E
```

`datadog` ユーザーが SQL Server インスタンスにログインできない場合、[セットアップドキュメント][1]に従ってユーザーが作成され、適切な権限が付与されていることを確認してください。

マイクロソフトは、この種のエラーのトラブルシューティングに関する有用なドキュメントを提供しており、[こちら][5]を参照することができます。

### SQL Server TCP 接続エラー {#tcp-connection-error}

TCP 接続の問題は、Agent の設定に誤構成がある場合によく発生します。ドライバーが提供するエラーメッセージは、必ずしも明確ではありません。

例えば、次のようなエラーは、TCP 接続に失敗したためです。

```bash
TCP-connection(ERROR: getaddrinfo failed). Exception: unable to connect: could not open database requested by login
```

よくあるエラーは、以下の通りです。

**"login failed for user"**: これは、Agent がホストへの接続を確立することに成功したが、何らかの理由でログインが拒否されたことを意味します。

トラブルシューティングを行うには

1. Agent のログイン資格情報を確認する

2. sqlcmd を使って、これらの資格情報で手動でログインしてみてください。例: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

**"could not open database requested for login"**: このエラーは、ネットワークの問題または不明なデータベースが原因で表示されます。

トラブルシューティングを行うには

1. `telnet {host} {port}` を実行して、Agent からホストへの TCP 接続を確認して、Agent からデータベースへのネットワーク接続があることを確認します。

2. sqlcmd を使用して手動でログインし、構成されたデータベースに問題がないか確認してみてください。例: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

#### "Invalid connection string attribute" のため

Windows では、以下の ADO プロバイダーがサポートされています: `SQLOLEDB`、`MSOLEDBSQL`、`MSOLEDBSQL19`、`SQLNCLI11`。

`SQLOLEDB` と `SQLNCLI11` プロバイダーは、いくつかの重大な問題のために `Invalid connection string attribute` というエラーメッセージを表示することがありました。例:

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

このエラーは、失敗の理由 (例えば、不明なホスト名、TCP 接続が確立されていない、無効なログイン資格情報、不明なデータベースなど) に関係なく、同じエラーが表示されます。

エラーメッセージの中にある HResult のエラーコードを確認してください。これらは既知のコードの例です。

`-2147217843` **"login failed for user"**: これは、Agent がホストへの接続を確立することに成功したが、何らかの理由でログインが拒否されたことを意味します。

`-2147467259` **"could not open database requested for login"**: このエラーは、ネットワークの問題または不明なデータベースが原因で表示されます。

どちらの手順でも問題が解決しない場合、または表示されるエラーコードがリストにない場合、Datadog は `MSOLEDBSQL` ドライバーまたは `Microsoft ODBC Driver for SQL Server` を使用することを推奨しています。これらのドライバーは、より詳細なエラーメッセージを提供し、接続が失敗している理由のトラブルシューティングに役立ちます。

### SQL Server 'Unable to connect: Adaptive Server is unavailable or does not exist' {#adaptive-server-unavailable}

このエラーは、`host` フィールドが適切に設定されていないために発生することがあります。インテグレーションでは、`host` フィールドを構文 `host:server,port` で設定します。

例えば、`host` をこのように設定した場合:

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
ポートを追加する必要があり、代わりに以下のように設定します。
```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### SSL Provider: The certificate chain was issued by an authority that is not trusted {#certificate-verify-fail}

このエラーは、最新の [MSOLEDBSQL][6] ドライバーにアップグレードした後に、導入された[破壊的変更][7]のためによく発生します。最新バージョンのドライバーでは、SQL インスタンスへのすべての接続がデフォルトで暗号化されています。

最新版の Microsoft OLE DB Driver for SQL Server を使用して、暗号化接続を必要とする SQL Server インスタンスに接続しようとする場合、次の回避策を使用することができます。

1. 自己署名証明書とサーバーの Force Encryption 設定 (AWS では `rds.force_ssl=1`) により、クライアントが暗号化されて接続されるようにする場合:

   - クライアントのトラストチェーンの一部として信頼される証明書への変更
   - 自己署名証明書をクライアントの信頼できる証明書として追加する
   - 接続文字列に `TrustServerCertificate=yes;` を追加する

これについては、[マイクロソフトのドキュメント][7]で詳しく説明されています。

2. SQL Server インスタンスが暗号化を必要としない接続の場合 (AWS では `rds.force_ssl=0`)、接続文字列に `Use Encryption for Data=False;` を追加して更新してください。例:

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. デフォルトで暗号化を使用しない [2018 年版の MSOLEDBSQL ドライバー][8]をインストールします。ドライバーをインストール後、`adoprovider` を `MSOLEDBSQL` に更新します。例:

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

**`MSOLEDBSQL` 2019** 以外のドライバーを使用している場合、接続文字列に `TrustServerCertificate=yes` を設定することで、このエラーを解決することができます。例えば、2017 年の `ODBC` ドライバーの場合:

  ```yaml
  # この例では、SQL Server 認証を使用しています
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      username: datadog
      password: <DD_AGENT_PASSWORD>
      connection_string: "TrustServerCertificate=yes;"
      connector: odbc
      driver: '{ODBC Driver 17 for SQL Server}'
  ```

### SQL Server unable to connect 'SSL Security error (18)' {#ssl-security-error}

これは、古いバージョンの SQL Server ODBC ドライバーで発生する既知の問題です。エラーメッセージの接続文字列を見れば、Agent がどのバージョンのドライバーを使用しているか確認できます。

例えば、エラーメッセージの接続文字列に `Provider=SQL Server` と表示されている場合、ODBC ドライバーを新しいバージョンにアップグレードすると、エラーが修正されます。

この問題は、この[マイクロソフトのブログ記事][9]で詳しく説明されています。

### Empty connection string {#empty-connection-string}

Datadog の SQL Server チェックは、`adodbapi` Python ライブラリに依存しており、このライブラリは、SQL Server への接続文字列を作成する際に使用できる文字にいくつかの制限があります。もし、Agent が SQL Server への接続に問題があり、Agent の collector.logs に以下のようなエラーがある場合、`sqlserver.yaml` に `adodbapi` で問題が発生する文字が含まれている可能性があります。

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

現時点では、この特定の接続問題を引き起こすことが知られている唯一の文字は、`%` 文字です。もし、`sqlserver.yaml` ファイルで `%` 文字を使用する必要がある場合 (例えば、Datadog SQL Server のユーザーパスワードに `%` が含まれている場合)、各 `%` の代わりに `%%` を 2 つ記述して、その文字をエスケープする必要があります。

## Diagnosing common SQL Server driver issues {#common-driver-issues}

### Data source name not found, and no default driver specified {#data-source-name-not-found}

これは、Linux で ODBC ドライバーのデフォルト設定を使用しているときに見られる一般的なエラーです。これは、`/etc/odbcinst.ini` ファイルでドライバーに設定されている [DSN][10] が、Agent 構成で設定されているドライバーの名前と一致しないために発生する可能性があります。

例えば、Agent のデフォルトの ODBC ドライバー (`{ODBC Driver 18 for SQL Server}`) を使用したい場合、インスタンス構成には以下の内容を含める必要があります。

```yaml
  connector: odbc
```

Agent が起動し、SQL Server インスタンスへの接続を確立しようとするとき、Agent は `/etc/odbcinst.ini` ファイルを探し、ドライバーバイナリへのパスを見つけます。

例えば、この `/etc/odbcinst.ini` ファイルは、ドライバーを設定します。

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

上記の例の DSN は `[ODBC Driver 18 for SQL Server]` で、これは Agent が使用しているデフォルトのドライバー名と一致しています。もし、お使いのドライバーの DSN が Agent が使用しているドライバーの名前と一致しない場合、`Data source not found` というエラーが発生します。

インスタンス設定の `dsn` を `/etc/odbcinst.ini` ファイルで設定されているものと一致させることが可能です。例:

    ```text
    $ cat /etc/odbcinst.ini
    [Custom]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

インスタンス構成で、`dsn` フィールドを設定します。

```yaml
  connector: odbc
  dsn: "Custom"
```

### Provider or driver not found {#provider-not-found}

このエラーメッセージはドライバーによって表現が異なりますが、通常、`ODBC` では以下のようになります。

1. `Can't open lib .* file not found`
2. `Data source name not found.* and no default driver specified`

また、`MSOLEDBSQL` プロバイダーの場合は、次のようなエラーメッセージが表示されます。

  ```text
  Provider cannot be found. It may not be properly installed.
  ```

これは、Agent が動作しているホストに、ドライバーまたはプロバイダーが正しくインストールされていないことを意味します。使用するドライバーのインストール手順にすべて従っていることを確認する必要があります。

Agent がドライバーを見つけられない可能性があります。これは、Linux 上の ODBC ドライバーでより一般的です。Linux に ODBC ドライバーをインストールする方法については、[Linux ホストで SQL Server に接続する](#connecting-to-sql-server-on-a-linux-host)のセクションを参照してください。

ドライバーの選択については、[SQL Server ドライバーの選択のセクション](#picking-a-sql-server-driver)を参照して、Agent でドライバーを適切に構成する方法を確認してください。

### Linux ホストでの SQL Server への接続

SQL Server (Linux または Windows にホストされている) を Linux ホストに接続するには

1. お使いの Linux ディストリビューション用の [Microsoft ODBC Driver][11] をインストールします。
   使用するドライバー名がわからない場合は、`/etc/odbcinst.ini` の先頭にある括弧で囲まれたドライバー名を確認することができます。

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. `odbc.ini` ファイルと `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。
3. 必要であれば、pyodbc モジュールをインストールします。これは、Agent の Python 環境内で pip install pyodbc を実行することで行うことができます。例えば、以下のようになります。

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. SQL Server の `conf.yaml` を構成して、odbc コネクターを使用し、`odbcinst.ini` ファイルに示されているように適切なドライバーを指定します。

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: ODBC Driver 13 for SQL Server
        username: <USERNAME>
        password: <PASSWORD>
    ```

### Picking a SQL Server driver {#picking-a-driver}

Agent が SQL Server インスタンスに接続するためには、[Microsoft ODBC ドライバー][12]または [OLE DB ドライバー][13]のいずれかをインストールする必要があります。

選択したドライバーによって、インスタンス構成の[コネクター][14]フィールドに何を設定するかが決まります。

例えば、[Microsoft ODBC ドライバー][12]の場合:

  ```yaml
  connector: odbc
  driver: '{ODBC Driver 18 for SQL Server}'
  ```

[OLE DB ドライバー][13]の場合:

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL
  ```

これらの値は、接続文字列の `Provider` 部分にマッピングするために使用されます。

そのため、例えば `adoprovider: MSOLEDBSQL` を設定すると、接続文字列には `Provider=MSOLEDBSQL` が含まれることになります。これは、インストールしたドライバのバージョン名と一致するはずです。

[Microsoft OLE DB ドライバー][13]の最新版では、ドライバー名が `MSOLEDBSQL` から `MSOLEDBSQL19` に変更されていますので、インスタンス構成にこのように表示されるはずです。

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL19
  ```

選択したドライバーは、常に最新のバージョンを使用することをお勧めします。

## その他のよくある問題

### Query Metrics と Plan Samples に SQL Server のユーザータグが表示されない

SQL Server の技術的な制限により、正しいユーザーが実行しているクエリを収集できないため、`user` タグは Query Metrics と Plan Samples のためにサポートされなくなりました。

`user` タグは、Query Activity イベントと Database Load メトリクスで利用可能です。

### なぜ "CREATE PROCEDURE" クエリが多いのですか？

7.40.0 より古いバージョンの Agent では、`PROCEDURE` 統計が過大にカウントされるバグがあります。これにより、データベースをモニタリングする Query Metrics UI で `CREATE PROCEDURE...` の実行が多数表示されるようになります。この問題を解決するには、Datadog Agent を最新バージョンにアップグレードしてください。

[1]: /ja/database_monitoring/setup_sql_server/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-windows-authentication
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-sql-server-authentication
[4]: https://docs.datadoghq.com/ja/agent/guide/windows-agent-ddagent-user/#installation
[5]: https://learn.microsoft.com/en-us/troubleshoot/sql/connect/login-failed-for-user
[6]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16#3-microsoft-ole-db-driver-for-sql-server-msoledbsql
[7]: https://techcommunity.microsoft.com/t5/sql-server-blog/ole-db-driver-19-0-for-sql-server-released/ba-p/3170362
[8]: https://learn.microsoft.com/en-us/sql/connect/oledb/release-notes-for-oledb-driver-for-sql-server?view=sql-server-ver16#1863
[9]: https://community.hostek.com/t/ssl-security-error-for-microsoft-sql-driver/348
[10]: https://learn.microsoft.com/en-us/sql/integration-services/import-export-data/connect-to-an-odbc-data-source-sql-server-import-and-export-wizard?view=sql-server-ver16
[11]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
[12]: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[13]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16
[14]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L201-L208