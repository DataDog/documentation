---
aliases:
- /ja/cloudprem/introduction/features/
description: BYOC Logs でサポートされている Datadog Log Explorer の機能を確認する
title: サポートされる機能
---
## 概要{#overview}

Datadog BYOC (Bring Your Own Cloud) Logs は、Log Explorer の主要な機能をセルフホスト環境に提供します。このページでは、利用可能な機能の概要、SaaS プラットフォームとの違い、およびログワークフローの計画に役立つ情報について説明します。

## サポートされる機能 {#supported-features}

### 検索と可視化 {#search-and-visualization}

- 任意のログ属性に対する全文検索
- リスト、時系列、トップリスト、テーブル、ツリーマップ、円グラフ、散布図の可視化
- Fields と Patterns へのグループ化 (月次のタイムシフトを除く)
- グループ化と並べ替え (一意のカウントによるグループ化と並べ替えを含む)
- フラットグループクエリ
- ファセットベースのフィルタリングとドリルダウン
- CSV のダウンロード
- ページネーション
- Notebooks (プレビュー)

### ダッシュボードとモニター {#dashboards-and-monitors}

- BYOC Logs データを使用したダッシュボード
- BYOC Logs インデックスのログモニター

### インデックス管理 {#index-management}

- 独立した保持期間とルーティングルールを持つ複数のインデックス

### アクセス制御 {#access-control}

- [Log Restriction Queries][1] による RBAC

### 相関 {#correlation}

- BYOC Logs のログから Datadog SaaS に送信されたメトリクスへの相関付け
- BYOC Logs のログから Datadog SaaS に送信されたトレースへの相関付け
- BYOC Logs のログから Datadog SaaS に送信されたプロセスへの相関付け

### 処理 {#processing}

- Observability Pipelines を使用して構成可能な処理パイプライン
- Observability Pipeline コネクション

### AI 機能 {#ai-features}

- Bits Investigation (プレビュー)
- MCP Server (プレビュー)

## サポートされない機能 {#unsupported-features}

BYOC Logs は、以下の機能をサポートしていません。

- SIEM
- Watchdog
- フェデレーション検索
- LiveTail
- ログのコンテキストビュー

### サポートされないクエリ機能 {#unsupported-query-capabilities}

- CIDR クエリ
- トランザクションによるグループ化
- 高度なクエリ機能:
  - 計算フィールド
  - Grok 抽出 (クエリ時のパース)

[1]: /ja/api/latest/logs-restriction-queries/