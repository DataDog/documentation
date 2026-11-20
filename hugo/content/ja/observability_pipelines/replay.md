---
aliases:
- /ja/observability_pipelines/rehydration/
description: Replay を使用してアーカイブされたログを取得し、Observability Pipelines で処理する方法について学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/
  tag: ドキュメント
  text: プロセッサーの詳細はこちら
- link: /observability_pipelines/packs/
  tag: ドキュメント
  text: Packs の詳細はこちら
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用してあらゆる SIEM またはログベンダーでアーカイブされたログを再取得する
title: Replay
---
## 概要 {#overview}

Observability Pipelines の Replay を使用すると、オブジェクトストレージからアーカイブされたログを取得し、[Packs][1] などを使用して Observability Pipelines で処理できます。これにより、ワークフローを再構築したり取り込みパイプラインを変更したりすることなく、履歴コンテキストに一貫してアクセスできるようになります。

組織は多くの場合、コストを抑えてコンプライアンス要件を満たすために、大量のログを費用対効果の高い長期アーカイブに保存しています。しかし、セキュリティインシデント、監査依頼、または運用調査が発生した際、履歴データへのアクセスが困難になることがよくあります。コールドストレージからアーカイブされたログを取得する作業は、アドホックなスクリプト、解凍、または専門的なエンジニアリング作業を必要とし、時間がかかり、手動で、かつ業務を中断させる可能性があります。Observability Pipelines の Replay はこれらの問題を解決します。

{{< img src="observability_pipelines/replay_pipeline.png" alt="Amazon S3 リプレイソースを使用したパイプライン。" style="width:100%;" >}}

## Replay の仕組み {#how-replay-works}

Replay は、Amazon S3、Google Cloud Storage、Azure Blob Storage などのオブジェクトストアに保存されたアーカイブ済みログを取得および再処理するための自動化されたワークフローを提供します。これにより、ストレージの効率性と履歴データへの迅速なアクセスのバランスを取ることができます。

Replay を使用すると、次のことが可能になります。

### アーカイブされたログをオンデマンドで取得する {#retrieve-archived-logs-on-demand}

調査、監査、トラブルシューティング、またはパイプラインテストに必要なデータのみを取得し、長い取得遅延や手動による抽出手順を排除します。

### 特定の時間範囲やイベントスライスをターゲットにする {#target-specific-time-ranges-or-event-slices}

必要とする正確な時間枠やイベントのサブセットを指定することで、不要なデータの移動や処理を防ぎます。

### Observability Pipelines で履歴ログを処理する {#process-historical-logs-with-observability-pipelines}

リプレイされたログは、ライブログストリームに適用されるものと同じパース、エンリッチメント、正規化、およびルーティングロジックを通過します。

これにより、以下が保証されます。

- 一貫したフォーマットとフィールド抽出
- 信頼性の高いエンリッチメント (例: ユーザー、地理 IP、クラウドメタデータ)
- 統一されたセキュリティおよびコンプライアンス制御
- 履歴データとリアルタイムデータ間で同一の動作を実現

### リプレイされたデータをサポートされている任意の送信先にルーティングする {#route-replayed-data-to-any-supported-destination}

処理済みの履歴ログを、SIEM、データレイク、分析プラットフォーム、または任意の Observability Pipelines の送信先に送信できます。

### 手動処理を排除する {#eliminate-manual-handling}

Replay は、アーカイブされたデータをオブザーバビリティプラットフォームに引き戻すための構造化された予測可能な方法を提供するため、カスタムスクリプト、手動での解凍、またはアドホックな取得プロセスを使用する必要はありません。

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/packs/