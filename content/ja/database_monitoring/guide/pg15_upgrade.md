---
title: PostgreSQL 15 以上へのアップグレード
---

各データベースホストでこのコマンドを実行して、`datadog` ユーザーに必要な追加権限を有効にします。

```SQL
ALTER ROLE datadog INHERIT;
```

{{< tabs >}}
{{% tab "RDS" %}}
`7.49` より前のバージョンの Agent では、構成を変更しないと PostgreSQL RDS インスタンスに接続できないことがあります。新しい RDS インスタンスの `rds.force_ssl` パラメーターのデフォルト値は `1` です。`7.49` より前のバージョンの Agent では、Agent がクエリを発行しようとするとこれにより以下のエラーが発生します。

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

Agent に SSL 接続を許可するには、`host` と `port` が指定されている各インスタンス設定に以下の設定を追加します。

```yaml
ssl: allow
```

この変更を適用した後、Agent を再起動します。
{{% /tab %}}
{{% tab "Google Cloud SQL" %}}
`7.50` より前のバージョンの Agent は `cloudsqladmin` データベースに接続しようとすることがあります。これにより、データベースにエラーログが発生し、Agent にも警告ログが出る可能性があります。これらのログを停止するには、`cloudsqladmin` を [ignore_databases][1] リストに追加します。

```yaml
ignore_databases:
  - template%
  - rdsadmin
  - azure_maintenance
  - cloudsqladmin
```

[データベースのオートディスカバリー][2]を使用している場合は、[除外されるデータベース][3]に `cloudsqladmin` も追加します。

```yaml
  exclude:
   - cloudsqladmin
```
[1]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L56-L64
[2]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L250
[3]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L277-L279
{{% /tab %}}
{{< /tabs >}}