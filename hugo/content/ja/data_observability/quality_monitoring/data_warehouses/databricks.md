---
aliases:
- /ja/data_observability/datasets/?tab=databricks
description: Databricks を Datadog Data Observability に接続して、データ品質の監視、使用状況の追跡、および問題の検出を行います。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /monitors/types/data_observability/
  tag: ドキュメント
  text: Data Observability モニター
title: Databricks
---
## 概要 {#overview}

Databricks インテグレーションは、Datadog を Databricks ワークスペースに接続し、メタデータとテーブルレベルのメトリクスを同期します。これを使用して、データの鮮度を監視し、異常を検出し、データスタック全体のリネージをトレースします。

**注**: 以下の手順は Quality Monitoring 用です。Jobs Monitoring については、[Databricks の Data Observability: Jobs Monitoring を有効にする][1] を参照してください。

## 前提条件 {#prerequisites}

Databricks ワークスペースで IP によるネットワークアクセス制限を行っている場合は、Datadog Webhook の IP を許可リストに追加してください。IP のリストについては、`webhooks` セクション ( {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}) を参照してください。

## Databricks でアカウントをセットアップする {#set-up-your-account-in-databricks}

### ステップ 1 - Databricks インテグレーションタイルを接続する{#step-1-connect-the-databricks-integration-tile}

1. Datadog インテグレーションタイルを使用して、[Databricks インテグレーションドキュメント][2] のインストール手順を完了します。サービスプリンシパルのアプリケーション ID をメモし、後で参照できるよう安全な場所に保存してください。

   **注**: Quality Monitoring にはワークスペース管理者の権限は必要ありません。

2. インテグレーションを構成する際、{{< ui >}}Data Observability{{< /ui >}} トグルをオンにします。
3. {{< ui >}}Save Databricks Workspace{{< /ui >}} をクリックします。

### ステップ 2 - アクセス権を付与する {#step-2-grant-access}

Databricks で {{< ui >}}SQL Editor{{< /ui >}} を開き、以下のコマンドを実行します。`<application_id>` が表示される箇所ではすべて、サービスプリンシパルの表示名ではなく、アプリケーション (クライアント) ID を使用してください。

まず、リネージのためにシステムスキーマへのアクセス権を付与します。

```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

これらの権限は、[クエリ履歴システムテーブル][4] (`system.query.history`) を含む `system` カタログ全体を対象としています。Datadog はこのテーブルからクエリ履歴を読み取り、テーブル間のリネージを構築し、それらに対して実行されているクエリの可視性を提供します。そのテーブル内のクエリテキストを読み取るには、サービスプリンシパルにも [ステップ 3](#step-3---grant-access-to-query-text) で説明されているグループメンバーシップが必要です。

次に、監視対象データのスコープに対して読み取り専用アクセス権を付与します。

{{< tabs >}}
{{% tab "カタログへのフルアクセス" %}}

よりシンプルなセットアップには、カタログへのフルアクセスオプションを使用してください。これにより、権限を更新することなく、将来作成されるテーブルも自動的に含まれます。


```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "特定のテーブル" %}}

最小権限でのアクセスが必要な場合、またはデータの一部のみを監視する必要がある場合は、特定のテーブルオプションを使用してください。新しいテーブルを追加する際は、権限を更新する必要があります。

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

これらの権限は、以下の理由で必要です。

- `GRANT USE CATALOG` は、カタログ内を移動してスキーマを検出するために必要です。
- `GRANT USE SCHEMA`は、テーブルを列挙してスキーマレベルの健全性を監視するために必要です。
- `GRANT SELECT`は、カスタム SQL やディストリビューションチェックなどのデータ品質監視に必要です。

### ステップ 3 - クエリテキストへのアクセス権を付与する {#step-3-grant-access-to-query-text}

Databricks は、アカウント管理者または `databricks_pii_access` アカウントレベルグループのメンバーではないプリンシパルに対して、SQL クエリテキストをマスクします。マスクされたプリンシパルの場合、クエリテキストは `<Redacted>` の `statement_text` 列、[Query History API][5]、[List Queries API][6]、および SQL ステートメントテキストをキャプチャする監査ログイベントにおいて、`system.query.history` として返されます。

クエリテキストを読み取る以下の機能を使用するには、サービスプリンシパルを `databricks_pii_access` に追加してください。

- **データリネージ**: Databricks クエリ履歴からクエリテキストをパースすることで補完されます。
- **Databricks サーバーレスジョブ監視**: Datadog Agent がクラスター上で実行されない [サーバーレスコンピューティング][7] で実行されるジョブを監視します。
- **SQL ウェアハウスとクエリの監視**: SQL ウェアハウスで実行されているクエリの視覚化、および Datadog によって生成された最適化の推奨事項。

鮮度、行数、列統計などのテーブルレベルのメトリクスは、クエリテキストではなくテーブルデータとメタデータを読み取るため、このメンバーシップがなくても機能します。

[ステップ 2](#step-2---grant-access) の `system` カタログ権限に加えて、グループメンバーシップが必要です。グループには属しているものの、`SELECT` が `CATALOG system` にないプリンシパルは、クエリ履歴を読み取ることができません。

グループを作成し、サービスプリンシパルを追加するには、以下の手順を実行します。

1. `databricks_pii_access` グループはデフォルトでは Databricks アカウントに存在せず、ワークスペース管理者が自動的にメンバーになることもありません。大文字と小文字を区別する正確な名前 `databricks_pii_access` で作成してください。
   - SCIM または外部 ID プロバイダーでグループを管理していない場合は、{{< ui >}}Account Console{{< /ui >}} > {{< ui >}}User Management{{< /ui >}} > {{< ui >}}Groups{{< /ui >}} > {{< ui >}}Add Group{{< /ui >}} に移動します。
   - SCIM または外部 ID プロバイダーでグループを管理している場合は、代わりにそこでグループを作成してください。
1. [ステップ 1](#step-1---connect-the-databricks-integration-tile) のサービスプリンシパルをグループに追加します。

詳細については、[アカウントレベルのグループの管理][8] に関する Databricks のドキュメントを参照してください。

## 次のステップ {#next-steps}

インテグレーションを設定すると、Datadog はバックグラウンドでメタデータと列レベルのリネージの同期を開始します。初期同期には、Databricks デプロイメントのサイズに応じて数時間かかる場合があります。

初期同期が完了したら、[Data Observability モニター][3] を作成して、鮮度、行数、列レベルのメトリクス、およびカスタム SQL メトリクスに関するアラートの通知を開始します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_observability/jobs_monitoring/databricks/
[2]: /ja/integrations/databricks/
[3]: /ja/monitors/types/data_observability/
[4]: https://docs.databricks.com/aws/en/admin/system-tables/query-history
[5]: https://docs.databricks.com/api/workspace/queryhistory/list
[6]: https://docs.databricks.com/api/workspace/queries/list
[7]: https://docs.databricks.com/aws/en/compute/serverless/
[8]: https://docs.databricks.com/aws/en/admin/users-groups/groups