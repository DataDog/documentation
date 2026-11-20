---
aliases:
- /ja/agent/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
- /ja/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
title: Google CloudSQL で dd-agent mysql チェックをセットアップできますか？
---

「ネイティブ」な [Amazon RDS インテグレーション][1]と同様に、Datadog Agent の MySQL インテグレーションを使って Google CloudSQL 上で稼働する MySQL インスタンスを監視できます。この構成により、Datadog の [Google CloudSQL インテグレーション][2]で取得できる指標に加え、Datadog Agent の [MySQL インテグレーション][3]から取得できる指標で補完することが可能です。

この「追加」インテグレーションを Google CloudSQL インスタンスでセットアップするには、Datadog Agent で MySQL インテグレーションを構成し、デフォルトの localhost 接続の代わりに[リモート接続するように設定][4]します。その他の設定手順は、ローカルでホストされている MySQL インスタンスの場合と同じです。

ただし注意点が 1 つあります。Google CloudSQL は [performance_schema をサポートしていません][5]。そのため、Datadog Agent ユーザーに `GRANT SELECT ON performance_schema.*` を付与できません。その結果、MySQL チェックの追加/オプション指標のうち 2 つは Google CloudSQL インスタンスでは利用できません。それ以外は、ローカルでホストされている MySQL インスタンスと同様にインテグレーションを利用できます。

[1]: /ja/integrations/amazon_rds/
[2]: /ja/integrations/google_cloudsql/
[3]: /ja/integrations/mysql/
[4]: https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7
[5]: https://cloud.google.com/sql/docs/features#differences