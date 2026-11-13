---
aliases:
- /ja/database_monitoring/setup_postgres/supabase/
description: Supabase Cloud インテグレーションを使用して、Supabase 用の Database Monitoring のインストールと設定を行います。
further_reading:
- link: /integrations/supabase-cloud/
  tag: ドキュメント
  text: Supabase Cloud インテグレーション
- link: /integrations/postgres/
  tag: ドキュメント
  text: Postgres インテグレーションの基本
- link: /database_monitoring/setup_postgres/supabase/agent
  tag: ドキュメント
  text: Supabase セルフホスト型セットアップ (Agent のインストール)
title: Supabase Cloud 用 Database Monitoring のセットアップ
---
Supabase Cloud 用 Database Monitoring は、セルフホスト型の Datadog Agent を必要とせず、クエリパフォーマンスメトリクスとクエリサンプルを公開することで、[Supabase データベース][3]の可視性を高めます。

<div class="alert alert-info">Datadog Agent を必要とするセルフホスト型の Supabase デプロイメントについては、<a href="/database_monitoring/setup_postgres/supabase/agent">Supabase セルフホスト型セットアップ</a>を参照してください。</div>

## 前提条件 {#prerequisites}

- Postgres データベースを含む Supabase プロジェクト。
- Supabase {{< ui >}}Project ID{{< /ui >}}(Supabase プロジェクト設定にあります)。
- Supabase {{< ui >}}API key{{< /ui >}}({{< ui >}}API{{< /ui >}} の下の Supabase プロジェクト設定にあります)。
- Management API へのアクセス権を持つ Supabase [{{< ui >}}Personal Access Token{{< /ui >}}][4]。

## セットアップ {#setup}

{{< img src="database_monitoring/supabase_cloud_integration_tile.png" alt="Supabase Cloud インテグレーションタイルの構成" style="width:80%;" >}}

1. Datadog の [Supabase インテグレーションタイル][1]に移動します。
1. [{{< ui >}}Add Account{{< /ui >}}] をクリックします。
1. Supabase の {{< ui >}}Project ID{{< /ui >}} と {{< ui >}}API Key{{< /ui >}} を入力します。
1. {{< ui >}}Enable Database Monitoring for query performance optimizations{{< /ui >}} を選択します。
1. {{< ui >}}Personal Access Token{{< /ui >}} を入力します。
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

Datadog が Supabase プロジェクトに接続し、Database Monitoring テレメトリの収集を開始します。Agent のインストールは必要ありません。

<div class="alert alert-info">各 Supabase プロジェクトは個別に構成する必要があります。接続された Supabase アカウントに新しいプロジェクトを追加しても、Database Monitoring は自動的に有効になりません。</div>

## 収集データ {#data-collected}

Database Monitoring を有効にすると、Datadog は Supabase Cloud データベースから以下のテレメトリを収集します。

### クエリパフォーマンスメトリクス {#query-performance-metrics}
`pg_stat_statements` から取得し、5 秒ごとに収集します。
- 呼び出しカウントと処理された行数
- 合計および平均実行時間
- 共有およびローカルバッファのヒット/読み取り/ダーティ/書き込み統計
- ブロック I/O の読み取りおよび書き込み時間
- 一時バッファの読み取りおよび書き込み回数

### クエリサンプル {#query-samples}
`pg_stat_activity` から取得し、5 秒ごとに収集します。
- アクティブおよびアイドル状態のクエリスナップショット
- 難読化されたクエリテキストとクエリシグネチャ
- 待機イベントタイプとイベント名
- セッション状態とバックエンドタイプ
- PID のブロック
- アプリケーション、状態、ユーザー、データベースごとにグループ化されたコネクションの集計

### データベースインスタンスメタデータ {#database-instance-metadata}
5 分ごとに収集します。
- PostgreSQL バージョン
- インスタンス識別子とホスト名
- コネクションモード (ダイレクトまたはプーラー)

## 検証 {#validate}

セットアップ後、Datadog の [Database Monitoring][2] ページに移動し、Supabase データベースのクエリとパフォーマンスメトリクスを確認します。

{{< img src="database_monitoring/supabase_cloud_product.png" alt="Supabase Cloud インスタンスの Database Monitoring の概要" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/supabase-cloud
[2]: https://app.datadoghq.com/databases
[3]: https://supabase.com/docs/guides/database/overview
[4]: https://supabase.com/docs/guides/platform/personal-access-tokens