---
title: PostgreSQL 15 以上へのアップグレード
---

`datadog` ユーザーに必要な追加権限を有効にするには、各データベースホストで次のコマンドを実行してください。

```SQL
ALTER ROLE datadog INHERIT;
```

{{< tabs >}}
{{% tab "RDS" %}}
`7.49` より前の Agent バージョンでは、設定を変更しないと PostgreSQL RDS インスタンスに接続できない場合があります。新しい RDS インスタンスでは、`rds.force_ssl` パラメータのデフォルト値が `1` に設定されています。`7.49` より前の Agent がクエリを実行しようとすると、次のエラーが発生します。

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

Agent が SSL で接続できるようにするには、`host` と `port` を指定している各インスタンス設定に次の設定を追加してください。

```yaml
ssl: allow
```

この変更を適用したら、Agent を再起動してください。
{{% /tab %}}
{{% tab "Google Cloud SQL" %}}
`7.50` より前の Agent バージョンでは、`cloudsqladmin` データベースに接続を試みることがあります。これにより、データベース側にエラーログが、Agent 側に警告ログが出力される場合があります。これらのログを抑制するには、[ignore_databases][1] リストに `cloudsqladmin` を追加してください。

```yaml
ignore_databases:
  - template%
  - rdsadmin
  - azure_maintenance
  - cloudsqladmin
```

[database autodiscovery][2] を使用している場合は、[excluded databases][3] にも `cloudsqladmin` を追加してください。

```yaml
  exclude:
   - cloudsqladmin
```
[1]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L56-L64
[2]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L250
[3]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L277-L279
{{% /tab %}}
{{< /tabs >}}