---
description: Oracle の Database Monitoring セットアップのトラブルシューティング
title: Oracle の DBM セットアップのトラブルシューティング
---

このページでは、Oracle による Database Monitoring のセットアップおよび使用に関する一般的な問題と、その解決方法について詳しく説明します。Datadog では、Agent のバージョンリリースにより内容が変更となる可能性があるため、最新の安定した Agent バージョンを使用し、最新の[セットアップドキュメント][1]に従っていただくことをお勧めします。

## 一般的な問題

### "Connection refused" エラー
Agent が動作しているマシン上で次のいずれかのコマンドを実行し、Agent と監視対象のデータベース間の接続可否を確認してから、表示されたエラー内容を調査します:

- `nc -v <DB_SERVER> <PORT>`
- `curl <DB_SERVER>:<PORT>`
- `telnet <DB_SERVER> <PORT>`

そのインスタンスに対して `oracle` 設定ファイルで構成されている `<DB_SERVER>` と `<PORT>` の値を、正確に指定することが重要です。

例として `telnet` コマンドを使う場合、正しく構成された接続では次のような出力が得られます。

{{< code-block lang="text" disable_copy="true" collapsible="true" >}}
Trying <DB_SERVER_IP_ADDRESS>...
Connected to <DB_SERVER_NAME>.
Escape character is '^]'.
{{< /code-block >}}

### カスタム クエリが正しく動作しない
お使いのホスティングタイプの[推奨 Agent バージョン][2]がインストールされていることを確認します。

### 実行計画取得クエリの実行に数秒かかる
お使いのホスティングタイプの[推奨 Agent バージョン][2]がインストールされていることを確認します。

### PGA メモリまたは一時表領域のリークが発生する
お使いのホスティングタイプの[推奨 Agent バージョン][2]がインストールされていることを確認します。

### `agent.log` に "Table or view does not exist" エラーが記録されている
利用しているホスティング タイプに対応した [セットアップ手順][3] の **Grant permissions** ステップに記載されている権限付与文を実行してください。

### Oracle DB ホスト名が報告されない

Datadog Agent は、[V$INSTANCE][4] に対して SQL コマンドを実行することで Oracle DB のホスト名を検出します。
Oracle DB が `HOST_NAME` カラムに対して `null` を返す場合、Datadog Agent は Oracle DB ホスト名を空値として報告します。この挙動は Oracle Autonomous Database で確認されています。
このような場合は、`conf.yaml` ファイル内の `reported_hostname` を設定することを Datadog は推奨しています。 

[1]: /ja/database_monitoring/setup_oracle/
[2]: /ja/database_monitoring/setup_oracle#recommended-agent-version
[3]: /ja/database_monitoring/setup_oracle#setup
[4]: https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/V-INSTANCE.html