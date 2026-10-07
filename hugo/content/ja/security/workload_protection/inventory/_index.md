---
aliases:
- /ja/security/workload_protection/inventory/coverage_map
- /ja/security/workload_protection/inventory/hosts_and_containers
- /ja/security/workload_protection/inventory/serverless
description: ホスト、ECS Fargate、および EKS Fargate ワークロード全体にわたる Workload Protection のカバレッジを、Agent、ポリシー、およびルールのデプロイ状況を含めて評価します。
disable_toc: false
further_reading:
- link: /security/detection_rules/#mitre-attck-map
  tag: ドキュメント
  text: MITRE ATT&CK マップ
- link: https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map
  tag: リリースノート
  text: Coverage マップで Workload Protection のカバレッジを確認
title: Coverage
---
Workload Protection の [Coverage][1] は、ホスト、ECS Fargate、および EKS Fargate ワークロード全体にわたるセキュリティカバレッジのリアルタイムビューを提供します。Coverage を使用して保護状況を評価し、ギャップを特定し、保護されていないまたは設定が誤っているワークロードに対処します。

Coverage は、各リソースのポリシーと Agent ルールが正常に読み込まれたかどうかを反映します。ポリシーが Agent にどのように適用されるかについては、[ポリシーの有効化とデプロイ][5]を参照してください。

カバレッジのギャップを特定して対処するには、[カバレッジの確認と改善][6]を参照してください。

{{< img src="security/workload_protection/coverage_page/coverage_explorer.png" alt="[Coverage] ページの [Explorer] ビューには、リソースをファセットテーブルで表示" width="100%">}}

## ビュー {#views}

Coverage には 2 つのビューがあります。ページ上部にあるトグルを使用して、それらを切り替えます。

- {{< ui >}}Explorer{{< /ui >}}: リソースのファセットテーブルです。{{< ui >}}Agent{{< /ui >}}、{{< ui >}}Rule{{< /ui >}}、{{< ui >}}Policy{{< /ui >}}、{{< ui >}}Infrastructure{{< /ui >}}、および{{< ui >}}Container{{< /ui >}}のファセットでリソースを検索およびフィルタリングし、リソースを開いて Agent ルールとポリシーのデプロイ状況を確認します。

- {{< ui >}}Map{{< /ui >}}: 各リソースがカバレッジステータスの重大度に応じて色分けされた六角形で表示される視覚的なマップです。

{{< img src="security/workload_protection/coverage_page/coverage_map.png" alt="[Coverage] ページの [Map] ビューには、リソースをカバレッジステータスに応じて色分けされた六角形で表示" width="100%">}}

両方のビューで、次のことができます。

- [Cloud Provider] (クラウドプロバイダ)、[OS]、[Agent Version] (Agent バージョン)、[Severity] (重大度)、または [Kubernetes Cluster] (Kubernetes クラスター) {{< ui >}}Group by{{< /ui >}}。
- オンデマンドでビューを更新する。

リソースは、Agent がルールセットを読み込むとすぐに Coverage に表示されます。リソースがオフラインになると、15 分以内に Coverage から削除されます。

## カバレッジステータス {#coverage-statuses}

### リソースのカバレッジステータス {#resource-coverage-status}

各リソースのカバレッジステータスは、読み込まれたルールに基づいて、次の 2 つの重大度カテゴリのいずれかに分類されます。

| 重大度 | 意味 |
|----------|---------|
| Pass (パス) | すべてのルールが正常に読み込まれたか、想定どおりにフィルタリングされています。|
| Error (エラー) | 1 つ以上のルールに修正が必要なエラーがあるか、リソースが不完全なデータとして報告されています。|

[Map] ビューでは、リソースは重大度に応じて色分けされた六角形で表示されます。六角形をクリックすると、リソースを調査し、そのポリシーとルールを表示できます。

### ポリシーのステータス {#policy-statuses}

リソースに読み込まれた各ポリシーは、次のいずれかのステータスになります。

- {{< ui >}}Loaded{{< /ui >}}: ポリシーのすべてのルールがパスしています。
- {{< ui >}}Error{{< /ui >}}: ポリシーの 1 つ以上のルールにエラーがあります。

### ルールのステータス {#rule-statuses}

各ルールは、次のいずれかのステータスになります。

- {{< ui >}}Loaded{{< /ui >}}: ルールは正常に読み込まれました。
- {{< ui >}}Filtered{{< /ui >}}: ルールは意図的に適用されませんでした (Agent のバージョンが低すぎる、イベントタイプが無効になっているなど)。
- {{< ui >}}Error{{< /ui >}}: ルールは読み込みに失敗しました。

ルールがフィルタリングされているかエラーがある場合、**verdict** でその理由が示されます。

| verdict | 意味 |
|---------|---------|
| `syntax_error` | ルール式が無効です。|
| `unknown` | Agent でルールを読み込めませんでした。|
| `filtered_agent_version` | Agent のバージョンが低すぎるため、このルールは使用できません。|
| `filtered_event_type_disabled` | イベントタイプが構成で無効になっています。|
| `filtered_rule_filter` | ルールはルールフィルターによって除外されました。|

ルールが失敗する理由を確認するには、リソースを選択してサイドパネルを開きます。サイドパネルに、リソースのポリシーとルールが一覧表示されます。各ルールについて、式、ステータスと verdict、および Agent から報告されたエラーメッセージが表示されます。

{{< img src="security/workload_protection/coverage_page/coverage_side_panel.png" alt="[Resource] サイドパネルには、ポリシーとルールのステータスおよび verdict を表示" width="100%">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[5]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management#enable-and-deploy-policies
[6]: /ja/security/workload_protection/inventory/review_improve_coverage