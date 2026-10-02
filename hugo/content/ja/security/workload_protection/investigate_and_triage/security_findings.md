---
description: Workload Protection の検出結果を確認およびトリアージして、ランタイムセキュリティ体制の問題に対処します。
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
  tag: ドキュメント
  text: 検出結果ルールについて学習する
title: 検出結果
---
[Workload Protection][1] の検出結果は、リソース (ホストまたはコンテナ) からの Agent イベントが [検出結果ルール][2] に一致した場合に生成されます。[Findings Explorer][3] で検出結果を表示、フィルタリング、およびトリアージして、ランタイムセキュリティ体制を評価および改善します。

Datadog は、調査および監査のために検出結果の完全な履歴を保存します。

## Findings Explorer {#findings-explorer}

[Findings Explorer][3] には、インフラストラクチャー全体の検出結果が一覧表示されます。各エントリーには、影響を受けるリソース、その検出結果を生成した検出ルール、問題が最初に報告された日時、現在のステータス、および担当チームまたはサービスが表示されます。

{{< ui >}}View All{{< /ui >}} をクリックすると、同じ検出結果ルールによって影響を受けるリソースの完全なリストが表示されます。

### 検出結果をフィルタリングする {#filter-findings}

検索バーとファセットパネルを使用して、重大度、トリアージ状態、ルール、ホスト、またはコンテナごとに検出結果を絞り込みます。

トリアージ状態でフィルタリングするには、検索クエリ `@workflow.triage.status:(open OR in-progress)` を使用します。

### 検出結果をグループ化する {#group-findings}

{{< ui >}}Group by{{< /ui >}} を使用してリストを整理します。

- {{< ui >}}Rule Name{{< /ui >}}: 検出結果ルールごとにリソースをグループ化します。
- {{< ui >}}Resource Name{{< /ui >}}: ホストまたはコンテナごとに検出結果をグループ化します。
- {{< ui >}}None{{< /ui >}}: 検出結果のフラットリストを表示します。

### ビューを保存する {#save-views}

現在の検索およびフィルター設定を将来の使用のために保存するには、{{< ui >}}Views{{< /ui >}} にカーソルを合わせ、{{< ui >}}Save as new view{{< /ui >}} をクリックします。

## 検出結果の詳細 {#finding-details}

任意の検出結果をクリックすると、リソースとそれを生成した検出結果ルールに関する詳細情報が表示されたサイドパネルが開きます。

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_side_panel.png" alt="発生した事象セクションとトリアージコントロールを示す検出結果サイドパネル" width="100%">}}

{{< ui >}}What Happened{{< /ui >}} セクションには以下の項目が表示されます。

- 検出結果が最初に報告された日時。
- 影響を受けるリソースの場所。
- 一致した検出結果ルール。

{{< ui >}}Trigger Event{{< /ui >}} タブを選択して、検出結果に関連付けられた Agent イベントを確認します。

### 修復ガイダンス {#remediation-guidance}

各 OOTB 検出結果ルールには、Datadog セキュリティチームが作成した修復ガイダンスが含まれています。{{< ui >}}Remediation{{< /ui >}} タブを選択して、修復手順を確認し、根本的な誤構成に対処します。

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_remediation.png" alt="影響を受けるリソースの修復手順を示す検出結果の詳細" width="100%">}}

## 検出結果をトリアージする {#triage-findings}

検出結果サイドパネルの {{< ui >}}Next Steps{{< /ui >}} を使用して、検出結果を管理します。

- {{< ui >}}Status{{< /ui >}}: 調査の進捗状況を反映するために検出結果のステータスを更新します。
- {{< ui >}}Mute{{< /ui >}}: 動作が予期されたもの、または許容できるものである場合に、指定した期間の検出結果を抑制します。
- {{< ui >}}Add Ticket{{< /ui >}}: フォローアップのために検出結果をチケットに追加します。

[1]: /ja/security/workload_protection/
[2]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[3]: https://app.datadoghq.com/security/workload-protection/findings