---
further_reading:
- link: /watchdog/faq/root-cause-not-showing/
  tag: ドキュメント
  text: 根本原因が表示されない
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: ブログ
  text: 根本原因の自動分析
kind: documentation
title: Watchdog RCA
---

## 概要

Watchdog Root Cause Analysis (RCA) は、インシデントのトリアージにおける予備調査を自動化することにより、平均復旧時間 (MTTR) の短縮を支援します。Watchdog の AI エンジンは、アプリケーションパフォーマンスの異常と関連するコンポーネント間の相互依存性を識別し、症状間の因果関係を導き出します。Watchdog は APM の異常を見つけると、その異常の原因や影響についてより深い洞察を得るために根本原因の分析を開始します。

Watchdog RCA は [APM][1] を使用する必要があります。Watchdog が影響を受けるサービスに対して、関連する全ての Datadog テレメトリーをフルに活用するために、Datadog は[統合タグ付け][2]を設定することを推奨しています。

Watchdog RCA は、分析に際して以下のデータソースを考慮します。

* APM エラー率、遅延、およびヒット率のメトリクス
* APM デプロイ追跡
* APM トレース
* CPU 使用率、メモリ使用率、ディスク使用率など、Agent ベースのインフラストラクチャーメトリクス
* AWS インスタンスステータスチェックメトリクス
* ログパターンの異常

## Watchdog Root Cause Analysis の要素

{{< img src="watchdog/rca/root_cause.png" alt="根本原因、重大な障害、影響を示す Watchdog Root Cause Analysis">}}

Watchdog Root Cause Analysis には、根本原因、重大な障害、影響という 3 つの要素が含まれます。

### 根本原因

根本原因とは、アプリケーションのパフォーマンス問題につながる状態の変化のことです。考えられる状態の変化には、インフラストラクチャーの可用性の違い、トラフィックの急増、またはコードのデプロイが含まれます。

Watchdog は、4 種類の根本原因をサポートしています。

* APM Deployment Tracking で取得されたバージョンの変更
* APM でインスツルメントされたサービスのヒット率メトリクスで取得されたトラフィックの増加
* Amazon EC2 のインテグレーションメトリクスでキャプチャされた AWS インスタンスの障害
* Datadog Agent のシステムメトリクスで取得されたディスク容量の不足

Watchdog は、レイテンシーの増加や新たなエラーなど、アプリケーションパフォーマンスの低下をインシデントの根本原因として分類することはありません。Datadog では、アプリケーションパフォーマンスの低下という初期症状を、以下に示すように**重大な障害**と呼んでいます。

### 重大な障害

Critical Failure セクションでは、根本原因が最初に (そして最も直接的に) アプリケーションパフォーマンスの低下を引き起こす場所と方法を強調します。重大な障害には、常にレイテンシーまたはエラー率の増加が含まれます。

### 影響

Watchdog RCA は、根本原因によって間接的に影響を受けるサービスも特定します。Impact にリストされたパフォーマンスの低下は、重大な障害が解決されれば回復すると予想されます。RUM ユーザーの場合、Watchdog はどのビューパスとユーザーがパフォーマンス異常の影響を受けたかも自動的に評価します。

{{< img src="watchdog/rca/views_impacted.png" alt="Watchdog Root Cause Analysis の詳細画面 (影響を受けたビューのポップアップを表示)">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/getting_started/tagging/unified_service_tagging