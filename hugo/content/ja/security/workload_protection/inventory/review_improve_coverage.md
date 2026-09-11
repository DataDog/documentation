---
description: Workload Protection のカバレッジのギャップを特定して対処し、Agent とルールのデプロイに関する問題をトラブルシューティングし、環境全体の検出カバレッジを確認します。
disable_toc: false
title: カバレッジの確認と改善
---
このページの各手順を使用して、死角を減らし、ポリシーの整合性を検証し、Workload Protection が環境全体の脅威を検出して対応できるようにします。これらのチェックをコンプライアンス、CI/CD、インフラストラクチャーのレビューに組み込むことができます。

Coverage のビューとステータスの詳細については、[Coverage][1] を参照してください。

## 推奨される確認順序 {#recommended-review-order}

次の順序で環境全体のカバレッジを確認します。

1. 環境全体を確認してベースラインを確立します。完全にカバーされているように見えるリソースについて、ポリシー、ルール、Agent が機能していることを検証し、目に見えるギャップに対処する前に潜在的な障害を明らかにします。
2. 保護されていないワークロードや部分的に保護されているワークロードを特定し、ビジネスへの影響とリスクが最も高いリソースを優先します。
3. 優先リソースに対するポリシーとルールのデプロイを検証し、残りのすべてのワークロードで古い Agent や正常に動作していない Agent がないかをチェックします。
4. 検出カバレッジを MITRE ATT&CK にマッピングし、検出ルールをデプロイまたは更新してギャップを埋めます。
5. カバレッジを再評価し、変更が反映されたことを確認します。
6. コンプライアンス、監査、インシデントの参照、将来の比較のために最終状態を記録します。

## Coverage ウィジェット {#coverage-widget}

[Coverage] (カバレッジ) ページ上部のウィジェットには、Workload Protection で保護されているリソースの割合が検出内容と共に表示されます。そのボタンを使用して、保護されていないワークロードや、古くなっている、または不完全な Agent を調査します。

{{< img src="security/workload_protection/coverage_page/coverage_top_widgets.png" alt="リソースカバレッジ、ルール読み込みステータス、Workload Protection の導入状況、Remote Config のデプロイ状況を示す [Coverage] ページ上部のウィジェット" width="100%">}}

## 保護されていないワークロードを検索 {#find-workloads-without-protection}

- {{< ui >}}View without WP{{< /ui >}}: Workload Protection が有効になっていない Datadog Agent を実行しているホスト。Fleet Automation が開き、[Workload Protection をセットアップ][3]できます。
- {{< ui >}}View without Agents{{< /ui >}}: Datadog Agent を実行していない、Workload Protection で評価できないホスト。Infrastructure Catalog が開きます。

## ポリシーまたはルールのデプロイエラーを修正 {#fix-policy-or-rule-deployment-errors}

ルールにエラーがあるリソースを検索して修正するには:

1. [Explorer] (エクスプローラー) で重大度 {{< ui >}}Error{{< /ui >}} でフィルタリングするか、[Map] (マップ) で {{< ui >}}Error{{< /ui >}} の六角形を選択します。
2. 問題があるリソースを選択してサイドパネルを開き、そのポリシーを確認します。ルールに問題があるポリシーのステータスは {{< ui >}}Error{{< /ui >}} になります。
3. 問題があるルールの判定 (例: `syntax_error` や `unknown`) とエラーメッセージを確認し、失敗した理由を確認します。
4. 必要に応じて、[ルールを編集][4]します。
5. 再デプロイし、Coverage で修正を確認します。

## 古いまたは不完全な Agent を検索 {#find-outdated-or-incomplete-agents}

- {{< ui >}}View outdated{{< /ui >}}: サポートされている最小バージョン (`7.65.0`) より古いバージョンの Agent を実行しているリソース。Workload Protection の最新の機能をサポートしていない可能性があります。
- {{< ui >}}View incomplete{{< /ui >}}: 不完全または無効なデータを報告しているリソース。

Datadog Agent を更新またはデプロイし、影響を受けるリソースが完全なカバレッジデータを報告していることを確認します。

## 検出カバレッジを確認 {#review-detection-coverage}

[Explorer] の {{< ui >}}Rule{{< /ui >}} グループと {{< ui >}}Policy{{< /ui >}} グループのファセットを使用して、適用される検出コンテンツでリソースをフィルタリングします。MITRE ATT&CK の戦術と手法でフィルタリングして、インフラストラクチャー全体でフレームワークのどの部分がカバーされているかを確認します。

Cloud SIEM または Workload Protection で利用可能な MITRE ATT&CK マップの詳細については、[MITRE ATT&CK マップ][2]を参照してください。

## 新しいルールが読み込まれたことを確認 {#confirm-that-new-rules-are-loaded}

Coverage を使用して、カスタムセキュリティルールをテストおよび反復できます。

1. [新しいカスタムルール][4]を作成してデプロイします。
2. Coverage で、ルール ID、ポリシー ID、またはホスト名でルールを検索します。
3. Agent にルールが正常に読み込まれたことを確認します。
4. エラーが表示される場合は、判定を確認し、ルールを修正して再デプロイします。

[1]: /ja/security/workload_protection/inventory/
[2]: /ja/security/detection_rules/#mitre-attck-map
[3]: /ja/security/workload_protection/setup/
[4]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules