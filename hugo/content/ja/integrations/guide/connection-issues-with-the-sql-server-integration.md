---
aliases:
- /ja/integrations/faq/connection-issues-with-the-sql-server-integration
title: SQL Server インテグレーションでの接続の問題
---

## SQL Server の接続に関する一般的な問題

アカウントの [SQL Server インテグレーションタイル][1]の説明に従って、Datadog Agent が SQL Server からメトリクスを収集するように構成することができます。このインテグレーションは、いくつかの基本的な [SQL Server メトリクス][2]を提供しており、それらを[自分の好み][3]に拡張することができます。

しかし、このインテグレーションを設定する際によく遭遇する接続エラーがあり、その原因には多くの変数があるため、トラブルシューティングには特にイライラさせられます。このエラーの全容は次のとおりです。

```text
'Unable to connect to SQL Server for instance 127.0.0.1,1433 - None. \n Traceback (most recent call last):\n File "C:\\Program Files (x86)\\Datadog\\Datadog Agent\\files\\..\\checks.d\\sqlserver.py", line 219, in get_cursor\n File "adodbapi\\adodbapi.pyc", line 116, in connect\nOperationalError: (com_error(-2147352567, \'Exception occurred.\', (0, u\'Microsoft OLE DB Provider for SQL Server\', u\'[DBNETLIB][ConnectionOpen (Connect()).]SQL Server does not exist or access denied.\', None, 0, -2147467259), None), \'Error opening connection to "Provider=SQLOLEDB;Data Source=127.0.0.1,1433;Initial Catalog=master;User ID=datadog;Password=******;"\')\n'
```

このエラーは、Agent がデータ収集を完了するために SQL Server に接続できなかったことを示します。これは、次のいずれかが原因である可能性があります。

* SQL Server の `conf.yaml` のホスト、ポート、ユーザー名、パスワードのタイプミス (すべてトリプルチェックする価値があります)
* パスワードにセミコロン (`;`) が含まれている場合、中括弧で囲んで解決します (`password: "{<PASSWORD>}"`)
* SQL Server の TCP/IP 接続が有効になっていない
* SQL Server の IPv4 アドレスが正しくないか、SQL Server の `conf.yaml` で指定したものと一致していません。
* SQL Server の TCP/IP ポートが正しくないか、SQL Server の `conf.yaml` で指定したものと一致していません。
* SQL Server の認証モードが、"SQL Server and Windows Authentication mode" と "Windows Authentication mode" の間で適切なオプションに設定されていない

正しい TCP/IP アドレス/ポートで待機するようにサーバーを設定する方法がわからない場合、Microsoft の [Configure a Server to Listen on a Specific TCP Port][4] が参考になります (IPv4 と IPALL は特に関連する部分です。ここでは、ポートを「動的」または「静的」のどちらかに設定できますが、使用しない方は空白にしてください)。Agent が SQL Server と同じホストにインストールされている場合、ユーザーから見てホストがローカルホストでなくても、ホストオプションを "127.0.0.1" に設定することが適切な場合があります。SQL Server への接続の標準ポートは 1433 です。

SQL Server の認証モードの設定方法がわからない場合は、Microsoft の [Choose an Authentication Mode][5] の記事を参照してください。

**注**: SQL Server に対して上記の変更を行った場合、その変更を有効にする前に SQL Server を再起動する必要があります。

Datadog のあるテスト環境 (Windows 2012 R2、SQL Server 2014 Express) で動作した SQL Server の IP/TCP 設定の一例をご紹介します。
{{< img src="integrations/faq/sql_server_test_1.png" alt="TCP/IP プロパティウィンドウで、IP アドレスタブを選択します。IP4 セクションは、active yes と enabled no が設定されています。IP アドレスは 127.0.0.1、TCP ダイナミックポートは 1433 に設定されています。TCP ポートは空白のままです。" >}}


{{< img src="integrations/faq/sql_server_test_2.png" alt="TCP/IP プロパティウィンドウで、IP アドレスタブを選択します。IPAll セクションで、TCP ダイナミックポートを 1433 に設定し、TCP ポートは空白のままです。" >}}

## 空白の接続文字列

Datadog の SQL Server チェックは、adodbapi Python ライブラリに依存しており、このライブラリは、SQL Server への接続文字列を作成する際に使用できる文字にいくつかの制限があります。もし、Agent が SQL Server への接続に問題があり、Agent の collector.logs に以下のようなエラーがある場合、`sqlserver.yaml` に adodbapi で問題が発生する文字が含まれている可能性があります。

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

現時点では、この特定の接続問題を引き起こすことが知られている唯一の文字は、`%` 文字です。もし、`sqlserver.yaml` で "%" 文字を使用したい場合、つまり、Datadog SQL Server のユーザーパスワードに `%` が含まれている場合、各 `%` の代わりに `%%` を 2 つ記述して、その文字をエスケープする必要があります。

## Linux ホストでの SQL Server への接続

SQL Server (Linux または Windows にホストされている) を Linux ホストに接続するには

1. お使いの Linux ディストリビューション用の [Microsoft ODBC Driver][6] をインストールします。
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


[1]: https://app.datadoghq.com/account/settings#integrations/sql_server
[2]: /ja/integrations/sqlserver/#metrics
[3]: /ja/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: https://msdn.microsoft.com/en-us/library/ms177440.aspx
[5]: https://msdn.microsoft.com/en-us/library/ms144284.aspx
[6]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux