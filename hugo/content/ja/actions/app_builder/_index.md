---
aliases:
- /ja/developers/datadog_apps/
- /ja/developers/ui_extensions/
- /ja/developers/faq/ui_extensions
- /ja/service_management/app_builder/
description: ドラッグ＆ドロップインターフェース、JavaScript サポート、外部サービスとのインテグレーションを備えた、社内ツール構築用のローコードプラットフォーム。
disable_toc: false
further_reading:
- link: /actions/datadog_apps/
  tag: ドキュメント
  text: Datadog Apps
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: 'Datadog Cloud SIEM: セキュリティ運用におけるイノベーションの推進'
- link: /actions/actions_catalog/
  tag: ドキュメント
  text: Action Catalog
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: ブログ
  text: Datadog App Builder を使用してカスタム監視や修復ツールを構築
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: ブログ
  text: Datadog App Builder を使用して構築されたアプリを修正
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: ブログ
  text: Datadog の AI アシスタントを使用して、わずか数分でワークフローとアプリを構築
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: ブログ
  text: Datadog Workflow Automation、Datastore、App Builder を使用して、反復的なタスクを自動化する単一のアプリを作成した方法
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: ラーニングセンター
  text: App Builder の概要
- link: https://www.datadoghq.com/blog/generate-apps-with-ai/
  tag: ブログ
  text: App Builder の対話型 AI を使用して、わずか数秒でカスタムアプリを構築
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: ラーニングセンター
  text: App Builder を使用したサードパーティインテグレーション向けのセルフサービスアプリの構築
title: App Builder
---
## 概要{#overview}

Datadog App Builder は、ローコードのアプリケーション構築プラットフォームです。ユーザーフレンドリーなドラッグ＆ドロップインターフェースと JavaScript のビルトインサポートにより、社内ツールの開発を効率化します。App Builder は AWS や GitHub などの一般的なサービスと統合されており、データを活用して外部 API や data stores とシームレスに接続できます。Datadog の既存機能と統合することで、App Builder は一元化されたコンテキストを提供します。これにより、トラブルシューティングに使用するのと同じビューから、予防的なアクションを実行したり、進行中のインシデントに対応できます。

ローカル開発ワークフロー、ソース管理、または複数のエンジニア間でのコラボレーションが必要なより複雑なアプリケーションについては、[Datadog Apps][10] を参照してコードとしてアプリを構築してください。

{{< img src="/actions/app_builder/app-builder-app.png" alt="App Builder のアプリ" caption="App Builder のアプリ" style="width:100%;" >}}

### 使用例 {#example-use-cases}
以下に、App Builder アプリでできることの例をいくつか示します。
- インシデントのテキスト説明とリポジトリの直近 150 件のコミットから、回帰の最も可能性の高い原因を特定します。
- PagerDuty サービスステータスを監視して、インシデント対応中に完全なコンテキストを取得します。
- ユーザーがダッシュボードから直接 EC2 インスタンスを管理できるようにします。
- ユーザーが S3 バケットのコンテンツを探索し、表示できるようにします。
- PagerDuty インテグレーションを使用して、組織内の各チームのオンコール担当者を確認します。
- 指定したリポジトリ内の各 PR の進捗状況を要約します。

## App Builder とアクションの連携方法 {#how-app-builder-works-with-actions}

Datadog App Builder では、複数のインテグレーションにわたる数百ものアクションをまとめた [Action Catalog][1] が提供されます。Action Catalog と各インテグレーションのコネクション認証情報は、[Datadog Workflow Automation][2] と共有されます。タスクを実行するインテグレーションが存在しない場合は、HTTP リクエストや JavaScript の関数などの汎用アクションを使用して、アプリが必要とするあらゆるタスクを実行できます。

## ダッシュボードから直接アクションを起こす {#take-action-directly-from-dashboards}

アプリは、Apps ページから使用するか、[ダッシュボード内から直接アクセスする][6]ことができます。Datadog Apps はネイティブのダッシュボードインテグレーションとして機能し、ダッシュボードから直接データをカスタマイズしたり、アクションを起こしたりすることができます。

{{< img src="/actions/app_builder/app-builder-embedded-dashboard-2.png" alt="ダッシュボードに埋め込まれた ECS Task Balancer アプリと、Scale Service ボタンをクリックするカーソル" caption="ダッシュボードに埋め込まれた ECS Task Balancer アプリと、その上のボタンをクリックするカーソル" style="width:100%;" >}}

### Datadog が作成したアプリ {#apps-created-by-datadog}

Datadog が作成したアプリとは、インテグレーションダッシュボードに埋め込まれているアプリのことです。これらのアプリは構築する必要がなく、コネクションを選択するだけで機能します。

たとえば、[EC2 インテグレーションダッシュボード][7]には、EC2 インスタンス管理アプリが用意されています。ダッシュボードを読み込むと、アプリにデモデータが入力されます。

{{< img src="/actions/app_builder/ootb-app-ec2-demo-data.png" alt="Datadog が作成した EC2 アプリ" caption="Datadog が作成した EC2 アプリ" style="width:100%;" >}}

自分のデータでアプリを使用するには、{{< ui >}}\+ Connect Data{{< /ui >}} をクリックし、新しいコネクションを作成するか、既存のコネクションを選択します。選択内容を保存すると、アプリにコネクションからのデータが表示されます。

アプリ内の {{< ui >}}Change Connection{{< /ui >}} をクリックすることで、選択したコネクションを変更できます。

## App Builder Overview ダッシュボード {#app-builder-overview-dashboard}

App Builder Overview ダッシュボードでは、Datadog アプリの概要を把握できます。ダッシュボードを見つけるには、[Dashboard List][8] に移動して `App Builder Overview` を検索します。

{{< img src="actions/app_builder/app-builder-overview-dashboard-2.png" alt="App Builder Overview ダッシュボード" caption="App Builder Overview ダッシュボード"style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][4] の **#app-builder** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /ja/actions/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://chat.datadoghq.com/
[5]: /ja/actions/app_builder/build/#build-an-app-from-a-blueprint
[6]: /ja/actions/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/app-builder/apps/list
[10]: /ja/actions/datadog_apps/