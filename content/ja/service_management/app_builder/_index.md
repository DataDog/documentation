---
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: ドキュメント
  text: Actions Catalog
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: ブログ
  text: Datadog App Builder を使用して、カスタムのモニタリングおよび修復ツールを構築する
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: ブログ
  text: Datadog App Builder を使用して構築されたアプリを修正
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: ブログ
  text: Datadog の AI アシスタントを使用して、わずか数分でワークフローとアプリを構築
title: App Builder
---

Datadog App Builder は、使いやすいドラッグアンドドロップのインターフェイスと JavaScript サポート機能の内蔵により、社内ツールの開発を効率化するローコードアプリケーション構築プラットフォームです。App Builder は AWS や GitHub などの一般的なサービスと統合するため、データを活用し、外部 API やデータストアとシームレスに接続することができます。Datadog の既存の機能と統合することで、App Builder は、予防措置を講じたり、進行中のインシデントに対応したりするための集中管理されたコンテキストを提供します。これはすべて、トラブルシューティングで使用するのと同じビュー内で実行できます。

{{< img src="/service_management/app_builder/app-builder-app.png" alt="App Builder のアプリ" style="width:100%;" >}}

## App Builder アクションの構成

Datadog App Builder は、複数のインテグレーションに対応した数百ものアクションを含む[アクションカタログ][1]を提供します。アクション カタログと各インテグレーションの接続資格情報は、[Datadog Workflow Automation][2] と共有されます。特定のタスクを実行するインテグレーションがない場合は、HTTP リクエストや JavaScript 関数などの汎用アクションを使用して、アプリに必要なタスクを実行することができます。

{{< img src="/service_management/app_builder/app-builder-action-catalog.png" alt="Datadog App Builder は、複数のインテグレーションに対応した数百ものアクションを含むアクションカタログを提供します。" style="width:100%;" >}}

## ブループリントから始める

Datadog は、すぐに使える[ブループリント][3]の形であらかじめ構成されたフローを提供し、[開始][5]を支援します。

以下に、App Builder アプリでできることの例をいくつか示します。
- インシデントのテキスト説明とリポジトリの直近 150 件のコミットから、回帰の最も可能性の高い原因を特定します。
- PagerDuty サービスステータスを監視して、インシデント対応中に完全なコンテキストを取得します。
- ユーザーがダッシュボードから直接 EC2 インスタンスを管理できるようにします。
- ユーザーが S3 バケットのコンテンツを探索し、表示できるようにします。
- PagerDuty インテグレーションを使用して、組織内の各チームのオンコール担当者を確認します。
- 指定したリポジトリ内の各 PR の進捗状況を要約します。

{{< img src="/service_management/app_builder/app-builder-blueprints-2.png" alt="アプリのブループリント" style="width:100%;" >}}

## ダッシュボードから直接アクションを起こす

アプリページからアプリを使用することも、[ダッシュボード内から直接アクセスする][6]こともできます。Datadog アプリはネイティブのダッシュボードインテグレーションとして機能し、ダッシュボードから直接データをカスタマイズし、アクションを起こすことを可能にします。

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard.png" alt="ダッシュボードに埋め込まれたアプリ" style="width:100%;" >}}

### Datadog が作成したアプリ

Datadog が作成したアプリは、Integration ダッシュボードに組み込まれたアプリです。これらのアプリを使用するために新たに構築する必要はなく、必要なのは接続先を選択することだけです。

たとえば、[EC2 インテグレーションダッシュボード][7]では、EC2 インスタンス管理アプリを利用できます。ダッシュボードを読み込むと、アプリにはデモデータが表示されます。

{{< img src="/service_management/app_builder/ootb-app-ec2-demo-data.png" alt="Datadog によって作成された EC2 アプリにデモデータが表示されている" style="width:100%;" >}}

このアプリを自身のデータで利用する場合は、**+ Connect Data** をクリックし、新しい接続を作成するか既存の接続を選択します。選択内容を保存すると、アプリが接続先のデータを表示します。

アプリ内の **Change Connection** をクリックすることで、選択した接続を変更できます。

## App Builder Overview ダッシュボード

App Builder Overview ダッシュボードでは、Datadog アプリの概要を高レベルで確認できます。このダッシュボードを見つけるには、[Dashboard 一覧][8]ページに移動し、`App Builder Overview` を検索してください。

{{< img src="service_management/app_builder/app-builder-overview-dashboard.png" alt="App Builder Overview ダッシュボード" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックがありますか？[Datadog Community Slack][4] の **#app-builder** チャンネルに参加してください。

[1]: https://app.datadoghq.com/app-builder/action-catalog
[2]: /ja/service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://datadoghq.slack.com/
[5]: /ja/service_management/app_builder/build/#build-an-app-from-a-blueprint
[6]: /ja/service_management/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists