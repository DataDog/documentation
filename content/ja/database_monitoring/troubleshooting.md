---
description: Troubleshoot Database Monitoring setup
title: Troubleshooting Database Monitoring
---

このページでは、データベースモニタリングのセットアップおよび使用に関する一般的な問題と、その解決方法について詳しく説明します。Agent のバージョンリリースにより内容が変更となる可能性があるため、最新の安定した Agent バージョンを使用し、最新の[セットアップドキュメント][1]に従っていただくことをお勧めします。

特定のデータベースセットアップに関するトラブルシューティングは、対応するトラブルシューティングページをご利用ください。

* [MySQL セットアップのトラブルシューティング][2]
* [Troubleshooting Oracle Setup][8]
* [Postgres セットアップのトラブルシューティング][3]
* [SQL Server セットアップのトラブルシューティング][4]

## 一般的な問題の診断
### クエリのバインドパラメータが表示されない

At this time, the raw query bind parameters are obfuscated for Query Samples and Explain Plans, and are replaced with a `?` character.


### DBM ホスト制限

モニタリングしているデータベースの複雑性によっては、1 つの Agent に対する DBM ホストが多すぎると Agent に過負荷がかかり、データ収集に遅延が発生する原因となり得ます。Agent に過負荷がかかると、`Job loop stopping due to check inactivity in the Agent logs` のような警告が表示されます。

1 つの Datadog Agent モニターには、最大で 10 DBM ホストが推奨されています。10 DBM ホスト以上ある場合は、複数の Datadog  Agent に分散させることをご検討ください。


### Datadog で DBM のデータが表示されません。接続の問題でしょうか？

設定が正しいと思っても、DBM ページにデータが表示されない場合、Agent が Datadog のデータ収集エンドポイントにデータを送信できていない可能性があります。接続の問題を診断するには、Agent を実行している場所から、以下の接続トラブルシューティングの手順を実行します。

1. DBM 収集エンドポイントの TCP 接続をテストします。

```
telnet dbm-metrics-intake.datadoghq.com 443
telnet dbquery-intake.datadoghq.com 443
```

2. 両方の DBM エンドポイントで、無効な API キーを持つ空のペイロードの投稿をテストします。
これらのコマンドは HTTP コード `403: Forbidden` で失敗するはずです。

```
curl -vvv -X POST "https://dbm-metrics-intake.datadoghq.com/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"

curl -vvv -X POST "https://dbquery-intake.datadoghq.com/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"
```

リクエストの送信に成功し、レスポンスを受け取った場合、レスポンスには `{"status":"error","code":403,"errors":["Forbidden"],...}` が含まれなければなりません。

接続障害の一般的な原因には、Datadog のエンドポイントへのアウトバウンドトラフィックを行う[プロキシ設定][7]やファイアウォールなどがあります。プロキシやファイアウォールを使用している場合は、DBM エンドポイント用の IP アドレスが許可されていることを確認します。これらのアドレスは APM ブロックの `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}} で確認できます。

## さらにサポートが必要ですか？

問題が解決しない場合は、[Datadog サポート][5]までお問い合わせください。


[1]: /ja/database_monitoring/#getting-started
[2]: /ja/database_monitoring/setup_mysql/troubleshooting/
[3]: /ja/database_monitoring/setup_postgres/troubleshooting/
[4]: /ja/database_monitoring/setup_sql_server/troubleshooting/
[5]: /ja/help/
[7]: /ja/agent/configuration/proxy/?tab=linux
[8]: /ja/database_monitoring/setup_oracle/troubleshooting/