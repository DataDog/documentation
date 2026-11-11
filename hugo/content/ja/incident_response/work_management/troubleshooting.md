---
aliases:
- /ja/service_management/case_management/troubleshooting/
- /ja/incident_response/case_management/troubleshooting/
title: トラブルシューティング
---
## 概要{#overview}

このガイドは、Work Management におけるサードパーティ統合に関する問題を解決するためのものです。問題が解決しない場合は、[Datadog サポート][1]までお問い合わせください。

## Jira{#jira}

カスタムフィールドを持つ Jira Issue タイプ、非公開の Jira プロジェクト、およびオンプレミスの Jira インスタンスはサポートされていません。同期を伴う Jira チケットの自動作成で問題が発生している場合は、以下のセクションを参照してください。

### 設定{#configuration}

1. Jira 統合構成画面のドロップダウンに Jira プロジェクトが表示されない場合は、`manage_integrations` の権限があることをチェックしてください。

1. Jira からイベントを受信するように Webhook が設定されていることを確認してください。

### 同期と更新{#syncing-and-updates}

1. Jira の Issue と同期中の作業項目を別の Work Management プロジェクトに移動すると、同期は停止します。移動後、新しいプロジェクトの作業項目には Jira Issue が紐付けられません。
1. Jira ワークフローで許可されていない方法で作業項目のステータスを更新すると、その作業項目はステータスマッピングと同期されなくなります。
1. Work Management または Jira のいずれかで行われたコメントの更新 (削除を含む) は、もう一方には反映されません。
1. 双方向統合が有効になった後に作成された作業項目のみが同期されます。Datadog は、統合が有効になる前に存在していた作業項目を遡って同期することはありません。

### Jira Issue の報告者{#jira-issue-reporter}

1. Jira Issue の報告者が、Jira 統合を設定した Datadog ユーザーとして反映されるシナリオがいくつかあります。そのようなシナリオには以下が含まれます。
    - 作業項目を作成する Datadog ユーザーが Jira アカウントを持っていない場合
    - Jira ユーザーのメールアドレスが非公開に設定されている場合
1. ミラーリングされた Jira Issue の報告者が更新されても、Work Management 側には反映されません。[作成者] フィールドは編集できないためです。



[1]: https://docs.datadoghq.com/ja/help/