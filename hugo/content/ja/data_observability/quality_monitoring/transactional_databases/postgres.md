---
description: PostgreSQL を Datadog Data Observability に接続して、スキーマ、テーブルのディメンション、行数を監視します。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /monitors/types/data_observability/
  tag: ドキュメント
  text: Data Observability モニター
- link: /database_monitoring/setup_postgres/
  tag: ドキュメント
  text: PostgreSQL の Database Monitoring
- link: /remote_configuration/
  tag: ドキュメント
  text: Remote Configuration
title: PostgreSQL
---
{{< callout url="#" btn_hidden="true" header="プレビュー" >}}
PostgreSQL の Data Observability はプレビュー版です。組織でこれを有効にするには、Datadog 担当者にお問い合わせください。
{{< /callout >}}

## 概要 {#overview}

Datadog Data Observability の PostgreSQL インテグレーションはテーブルメタデータを追跡し、環境全体のスキーマ、テーブルのディメンション、および行数を可視化します。

PostgreSQL は、[データウェアハウスインテグレーション][7]のような直接的なクラウドコネクションではなく、[Datadog Agent][1] を介して収集されます。このページでは、Data Observability に必要な構成のみを説明します。Database Monitoring の全機能をセットアップするには、[PostgreSQL の DBM セットアップガイド][2]を参照してください。

## 前提条件 {#prerequisites}

始める前に、以下があることを確認してください。

- PostgreSQL インスタンスにリーチ可能なホスト上でインストールされた Datadog Agent `7.81.0` 以降。お使いのプラットフォームについての [Agent のインストール][1]を参照してください。
- 組織、Agent が使用する API キー、および Agent 自体で [Remote Configuration][8] が有効になっていること。データ品質モニターは Remote Configuration を介して Agent に配信されるため、これが有効でない場合、テーブルは同期されますが、モニターは実行されません。[Remote Configuration を有効にする](#enable-remote-configuration)を参照してください。
- Datadog ユーザーを作成して権限を付与するために、PostgreSQL インスタンスへのスーパーユーザーアクセスが必要です。
- Datadog 担当者によって組織のプレビューアクセスが有効になっていること。

## Remote Configuration を有効にする {#enable-remote-configuration}

Data Observability は [Remote Configuration][8] を使用して、モニタークエリを Agent に配信します。Datadog でデータ品質モニターを作成すると、そのクエリはインスタンスを所有する Agent にプッシュされ、Agent の Postgres チェックがモニターのスケジュール上でデータベースに対してクエリを実行します。

テーブルメタデータの収集は Remote Configuration に依存しません。Remote Configuration が利用できない場合、テーブルはカタログに表示されますが、Agent が実行するクエリを受信しないため、それらのテーブルに対して作成したモニターは空白のままになります。

Remote Configuration はほとんどの環境においてデフォルトでオンになっていますが、以下の 3 か所すべてで有効にする必要があります。それぞれを確認してください。

 - **組織。**[Remote Configuration][9] 設定ページで、Remote Configuration が有効になっていることを確認します。有効にするには、[`org_management`][11] 権限が必要です。
 - **Agent の API キー。**Agent が使用する API キーには、Remote Configuration 機能が必要です。[API キー][10]ページでチェックしてください。これには [`api_keys_write`][12] 権限が必要です。この機能がないキーを使用している Agent は、`UNAUTHORIZED` ステータスを報告します。
 - **Agent。**`remote_configuration.enabled` は Agent `7.47.0` 以降ではデフォルトで `true` に設定されているため、通常は変更する必要はありません。以下の 2 つのケースでは、[`datadog.yaml`][13] (または `DD_REMOTE_CONFIGURATION_ENABLED`) で明示的に設定してください。

   - 以前に `false` に設定されていた場合。
   - Agent が GovCloud (`ddog-gov.com`) に報告する場合、または FIPS モードで実行する場合。これらの環境では、Remote Configuration は **デフォルトで無効** になっており、設定しない限り有効にはなりません。

   ```yaml
   remote_configuration:
     enabled: true
   ```

   この設定を変更した後は、[Agent を再起動][5]してください。

各 Agent の Remote Configuration ステータスは、[Remote Configuration][9] 設定ページにも一覧表示されます。ステータスの説明とネットワーク要件については、[Agent Remote Configuration ステータス][14]を参照してください。

## すでに Database Monitoring を使用していますか。{#already-using-database-monitoring}

このデータベースに対してすでに [Database Monitoring][2] が実行されている場合、セットアップのほとんどは完了しており、`datadog` ユーザーが存在して `pg_monitor` が付与されています。引き続き 3 つの作業が必要です。

1. **Agent のバージョンをチェックします。**`datadog-agent status` を実行し、ヘッダーとコレクターセクションの Postgres チェックの行からバージョンを確認します。

   ```text
   Agent (v7.81.0)
   ...
     postgres (23.9.1)
   ```

   Agent が `7.81.0` より古い場合は、[Agent をアップグレード][6]します。`datadog-agent integration install` で Postgres チェックのみをアップグレードしても十分ではありません。モニタークエリを配信する Remote Configuration ハンドラーは、チェックではなく Agent 自体に同梱されているためです。

   Database Monitoring は Remote Configuration を必要としないため、正常に動作している Agent でも無効になっている可能性があります。続行する前に、それが有効になっていることを確認します。[Remote Configuration を有効にする](#enable-remote-configuration)を参照してください。

2. **データに対して `SELECT` を付与します。**Database Monitoring は `public` スキーマに対して `pg_monitor` および `USAGE` を付与しますが、テーブルに対して `SELECT` は付与しません。Data Observability は、行数、列レベルのメトリクス、カスタム SQL の結果を計算するためにこれを必要とします。[Datadog データベースユーザーのセットアップ](#set-up-the-datadog-database-user)にある権限付与を、追跡する各データベースの各スキーマに対して実行します。その際、`CREATE USER` のステップはスキップしてください。

3. **Data Observability ジョブを有効にします。**`conf.d/postgres.d/conf.yaml` の既存の各インスタンスに以下を追加し、`dbm: true` はそのまま残します。

   ```yaml
   data_observability:
     enabled: true
   ```

   インスタンスですでに `database_autodiscovery` を使用している場合、Data Observability は検出されたすべてのデータベースを対象とするため、`SELECT` の権限付与がそれらすべてをカバーしていることを確認します。

[Agent を再起動][5]して変更を適用し、[テーブルメタデータを探索する](#explore-your-table-metadata)に進みます。

## Datadog データベースユーザーのセットアップ {#set-up-the-datadog-database-user}

1. スーパーユーザーとしてデータベースに接続し、専用ユーザーを作成します。

   ```sql
   CREATE USER datadog WITH PASSWORD '<SECURE_PASSWORD>';
   GRANT pg_monitor TO datadog;
   GRANT SELECT ON pg_stat_database TO datadog;
   ```

2. 監視する各データベースに接続し (`psql` の `\c my_database` を使用)、スキーマへの読み取りアクセス権を付与します。

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
   GRANT SELECT ON ALL TABLES IN SCHEMA "<YOUR_SCHEMA>" TO datadog;

   -- Automatically apply read access to tables created later by <TABLE_OWNER_ROLE>
   ALTER DEFAULT PRIVILEGES FOR ROLE <TABLE_OWNER_ROLE> IN SCHEMA "<YOUR_SCHEMA>"
     GRANT SELECT ON TABLES TO datadog;
   ```

   `ALTER DEFAULT PRIVILEGES` は、`FOR ROLE` で指定されたロールによって作成されたテーブルにのみ影響します。スキーマ内の**テーブルを作成する各ロール**に対して一度実行します。そうしないと、アプリケーションが新しいテーブルを作成するたびに Data Observability がそれらへのアクセス権を失うことになります。スキーマ内のテーブルを所有するロールを一覧表示するには、以下を実行します。

   ```sql
   SELECT DISTINCT tableowner FROM pg_tables WHERE schemaname = '<YOUR_SCHEMA>';
   ```

   スキーマとテーブル権限はデータベース固有のものです。追跡する**すべてのデータベース**とすべてのスキーマに対してこれらのコマンドを再度実行します。

### 特定のテーブルに制限する (オプション) {#restrict-to-specific-tables-optional}

収集をテーブルのサブセットに制限するには、`ALL TABLES IN SCHEMA` の代わりにターゲットを絞った権限付与を使用します。

```sql
GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."orders" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."users" TO datadog;
```

Data Observability は、`datadog`ユーザーが明示的な `SELECT` 権限を持つテーブルのみを表示します。

## PostgreSQL インテグレーションを構成する {#configure-the-postgresql-integration}

Agent の `conf.d/postgres.d/conf.yaml` ファイルを編集し、監視する各 PostgreSQL ホストのインスタンスを追加します。すべての構成オプションの一覧は、[サンプル postgres.d/conf.yaml][4] を参照してください。

{{< tabs >}}
{{% tab "ホスト上のすべてのデータベース" %}}

ホスト上のすべてのユーザーデータベースからメタデータを収集するには、`database_autodiscovery` を有効にします。

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'

    database_autodiscovery:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{% tab "単一のデータベース" %}}

1 つのデータベースからのみメタデータを収集するには、`dbname` を設定します。

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'
    dbname: <DATABASE_NAME>

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

スキーマ収集 (`collect_schemas`) はデフォルトで有効になっており、Data Observability にテーブルを取り込みます。`dbm: true` は Data Observability には**不要**です。[Database Monitoring][2] も使用する場合にのみ設定してください。

変更を適用するには、[Agent を再起動][5]します。

```shell
sudo systemctl restart datadog-agent
```

### 構成の検証 {#validate-the-configuration}

チェックが実行されていることを確認します。

```shell
sudo datadog-agent status | grep -A 20 'postgres'
```

出力には、`Total Runs` カウントが 0 より大きく、最近の `Last Successful Execution` タイムスタンプによる `postgres` チェックが表示されるはずです。

Agent が Remote Configuration を受信していることを確認します。Agent ステータスの `Remote Configuration` セクションでは、組織と API キーのチェックが直接報告されます。

```shell
sudo datadog-agent status | grep -A 10 'Remote Configuration'
```

正常な Agent では、次のように報告されます。

```text
====================
Remote Configuration
====================
  Organization enabled: True
  API Key: Authorized
  Last error: None
```

それ以外はすべて、[Remote Configuration を有効にする](#enable-remote-configuration)の 3 つのチェックのいずれかに対応します。

- `Organization enabled: False`: 組織の Remote Configuration を有効にします。
- `API Key: Not authorized`: この Agent が使用する API キーに Remote Configuration 機能を追加します。
- `Remote Configuration is disabled because ...`: Agent 自体でオフになっています。

このセクションが正常になるまで、テーブルの同期は行われますが、モニターは実行できません。

## テーブルメタデータを探索する {#explore-your-table-metadata}

最初のメタデータ収集が完了するまで約 1 時間かかります。その後、Data Observability カタログで [PostgreSQL テーブルを表示][3]できます。

テーブルが表示されない場合は、以下を確認してください。

1. `sudo datadog-agent status` で `postgres` チェックが正常に報告されていること。
2. `datadog` ユーザーがターゲットテーブルに対する `SELECT` 権限を持っていること。テスト方法:

   ```shell
   psql -U datadog -d <DATABASE_NAME> -c 'SELECT 1 FROM <YOUR_SCHEMA>.orders LIMIT 1'
   ```

3. Datadog の担当者によって組織のプレビューアクセスが有効になっていること。

## データ品質モニターを作成する {#create-data-quality-monitors}

テーブルがカタログに表示されたら、その健全性についてのアラートを送信できます。

[Data Observability カタログ][3]でテーブルに移動し、{{< ui >}}Monitors{{< /ui >}} タブを選択し、{{< ui >}}Add Monitor{{< /ui >}} をクリックします。プレビューでは、以下を作成できます。

- **行数**: 急激な減少や横ばいの傾向など、ボリュームの変動についてのアラートを送信します。
- **列レベルのメトリクス**: null 比率、カーディナリティ、分布シフトなどの列属性を監視します。
- **カスタム SQL**: 任意の `SELECT` クエリについてのアラートを送信します。クエリは、`dd_value` というエイリアスが付けられた数値を正確に 1 つ返す必要があります。

モニターは収集スケジュールに従って実行されます。参照されるすべてのテーブルに対して `datadog` ユーザーの `SELECT` 権限を維持してください。アクセス権が取り消されるとモニターは失敗します。

モニターがデータを報告しない場合は、組織、Agent の API キー、および Agent 自体で [Remote Configuration](#enable-remote-configuration) が有効になっていることを確認します。有効になっていないと、Agent はモニタークエリを受信できません。

## 既知の制限 {#known-limitations}

Data Observability は、`dbm` と `collect_schemas` が有効になっているインスタンスのすべての PostgreSQL テーブルを一覧表示します (`data_observability.enabled: true` がないインスタンスも含まれます)。それらのデータベースのいずれかに対してモニターをスケジュールしても、データのないモニターが生成されます。テーブルが一覧表示されていてもモニターが空白のままの場合:

- [すでに Database Monitoring を使用していますか](#already-using-database-monitoring)の手順に従って、ジョブを有効にし、必要な `SELECT` 権限を付与します。
- [Remote Configuration](#enable-remote-configuration) が有効になっていることを確認します。テーブルの一覧表示はこれに依存しませんが、モニタークエリは依存します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/database_monitoring/setup_postgres/
[3]: https://app.datadoghq.com/datasets/catalog?integration=postgres
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[5]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[6]: /ja/agent/guide/upgrade_agent_fleet_automation/
[7]: /ja/data_observability/quality_monitoring/data_warehouses/
[8]: /ja/remote_configuration/
[9]: https://app.datadoghq.com/organization-settings/remote-config
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /ja/account_management/rbac/permissions/#permissions-list
[12]: /ja/account_management/rbac/permissions/#permissions-list
[13]: /ja/agent/configuration/agent-configuration-files/#main-configuration-file
[14]: /ja/agent/guide/setup_remote_config/#agent-remote-configuration-status