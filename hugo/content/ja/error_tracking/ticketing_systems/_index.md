---
further_reading:
- link: /error_tracking/explorer/
  tag: ドキュメント
  text: Error Tracking エクスプローラーの使用を開始する
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking の課題の状態とワークフロー
- link: /incident_response/work_management/
  tag: ドキュメント
  text: Work Management
is_beta: false
private: false
title: Error Tracking のチケット発行システムインテグレーション
---
## 概要 {#overview}

Datadog Error Tracking は、既存のチケット発行ワークフローと統合し、課題解決を効率化します。Error Tracking の課題を Jira チケット、Linear の課題、または Work Management の作業項目にリンクすることで、確立されたプロセス内でエラーを追跡および解決できます。

チケット発行システムインテグレーションにより、次のことが可能になります。

- **課題から直接チケットを作成**: Error Tracking の課題パネルから Jira チケット、Linear の課題、または Work Management の作業項目を開き、調査作業を一元化します。
- **複数の課題を 1 つのチケットにグループ化**: Error Tracking の関連する複数の課題を 1 つのチケットや作業項目に紐付け、相関する課題を 1 つの作業単位に統合します。
- **チケット作成を自動化**: 課題が特定の条件に一致した際に、特定の Jira ボードや Work Management プロジェクトでチケットが自動的に作成されるようルールを設定します。

これらの機能は、エラーの検出から解決までのワークフローのギャップを埋めることで、チームによるエラーへの迅速な対応を支援します。

## はじめに {#getting-started}

{{< whatsnext desc="開始するには、チケット発行システムを選択してください。" >}}
    {{< nextlink href="error_tracking/ticketing_systems/jira" >}}Jira{{< /nextlink >}}
    {{< nextlink href="error_tracking/ticketing_systems/linear" >}}Linear{{< /nextlink >}}
    {{< nextlink href="error_tracking/ticketing_systems/work_management" >}}Work Management{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}