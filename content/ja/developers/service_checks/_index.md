---
aliases:
- /ja/developers/faq/how-can-i-submit-a-custom-status-check
- /ja/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
- /ja/guides/services_checks/
- /ja/monitors/guide/visualize-your-service-check-in-the-datadog-ui
title: Service Check
---

## 概要

サービスチェックを使用すると、サービスのステータスを特徴付けて、Datadog 内でサービスを監視できます。サービスチェックは、特定のサービスのアップまたはダウンステータスを監視します。指定された回数の連続したチェックでモニタリング Agent がそのサービスに接続できなかった場合は常に警告が表示されます。たとえば、Redis ホスト上のモニタリング Agent が Redis への接続とメトリクスの収集に 3 回連続して失敗したことを報告した場合に、アラートを受け取ることができます。

クラスターレベルでのサービスチェックは、いくつかの障害に耐えることができる分散型システムまたは冗長システムを監視するための効果的な代替手段になります。これらのアラートは、個々のホストが複数のサービスを実行しているアーキテクチャに使用します。これは、そのサービスを実行しているホストが引き続き使用可能である (ホストレベルのヘルスチェックに成功する) 場合でも、サービスの低下を表面化できるためです。

重要な非冗長サービスが失われた場合、または広範囲にわたるノードの損失のためにクラスターが障害の危機に瀕している場合に備えて、モニタリングとアラートを設定できます。その他の重要なアラートとしては、リクエストスループットの低下またはリクエストレイテンシーの増加が挙げられます。

サービスチェックを設定する必要があるのは、インテグレーションにネイティブのサービスチェックがない場合や、アップまたはダウンステータスを監視したい内部サービスがある場合などです。

サービスチェックを使用するには、最初にチェックを設定します。

{{< whatsnext >}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}カスタム Agent チェックを送信する。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}DogStatsD でサービスチェックを送信する。{{< /nextlink >}}
    {{< nextlink href="/api/v1/service-checks/" >}}Datadog API を通じてサービスチェックを送信する。{{< /nextlink >}}
{{< /whatsnext >}}

サービスチェックがデータを送信したら、チェック内容のサマリーを確認し、ダッシュボード、モニター、アラートを設定します。

## Datadog UI でのサービスチェックの視覚化

サービスチェックを視覚化して、Datadog の以下の 3 つのセクションで使用できます。

- [チェック内容のサマリー][1]
- [スクリーンボード][2]
- [サービスチェックモニター][3]

### チェック内容のサマリー

[Check Summary][1] ページには、過去 1 日間にインフラストラクチャー全体で報告されたすべてのチェックが一覧表示されます。チェックを選択すると、そのチェックに関連するステータスとタグに関する洞察が表示されます。

{{< img src="developers/service_checks/check_summary.png" alt="チェック内容のサマリー" >}}

### シグナルの詳細を取得する

スクリーンボードの**チェックステータス**ウィジェットを使用して、サービスチェックを視覚化できます。

{{< img src="developers/service_checks/check_status_widget.png" alt="チェックステータスウィジェット" >}}

**チェックステータス**ウィジェットアイコンをクリックすると、次のポップアップが表示されます。

{{< img src="developers/service_checks/check_widget_config.png" alt="チェックステータス構成" >}}

このフォームで、以下の設定を行うことができます。

- **Check Name**: サービスチェック名を選択します。
- **Reporting Timeframe**: ステータスを集計するタイムフレームを選択します。
- **Scoping**: 1 つのチェックを選択するか、1 つのタグ値またはタグキーに基づいて報告されるチェックステータスのクラスターを選択します。
- **Widget Title**: ウィジェットのタイトルを設定します。

## サービスチェックモニター

サービスチェックをメトリクスのように時系列でグラフ化できなくても、[Service Check Monitor][3] で監視することができます。

{{< img src="developers/service_checks/service_check_monitor.png" alt="チェックモニター" >}}

このフォームで、以下の設定を行うことができます。

- **Pick a service check**: 監視するチェックステータス名を選択します。
- **Pick monitor scope**: モニターのコンテキストを選択します (タグの選択/除外)。
- **Set alert conditions**: シンプルチェックアラートまたはクラスターアラートを選択します。
- **通知と自動化の構成**: このモニターで誰に通知するかを選択し、送信される通知を編集します ([Datadog の通知][4]に関する詳細はこちら)。
- **アクセス許可と監査通知の定義**: モニターのアクセス許可を編集し、監査通知を設定します。

サービスチェックの作成については、[サービスチェックモニター][5]を参照してください。

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors/create/custom
[4]: /ja/monitors/notify/
[5]: /ja/monitors/types/service_check/