---
aliases:
- /ja/network_monitoring/cloud_network_monitoring/overview_page
description: ネットワークの問題を特定し、実用的なインサイトを使って解決します。
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: ブログ
  text: Datadog CNM でクラウドアーキテクチャとアプリの依存関係を監視する
- link: /network_monitoring/cloud_network_monitoring/network_analytics
  tag: ドキュメント
  text: Network Analytics について
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: ブログ
  text: CNM Network Health を使用して、ネットワークの問題を簡単に検出、診断、解決する
title: ネットワークヘルス
---
<div class="alert alert-info">ネットワークヘルスはプレビュー版です。サインアップするには、Datadog の担当者にご連絡ください。
</div>

## 概要 {#overview}

ネットワークヘルスは、ネットワーク上の最も重大な問題を一元的に表示し、DNS、TLS 証明書、セキュリティグループおよびネットワークの異常における問題を自動的に検出し、優先順位を付けます。明確な修復パスを備えた実用的なインサイトを提示し、コネクションの問題を解決してインシデントの影響を軽減する上で役立ちます。

このページでは、ネットワークヘルスページのセクションと、それぞれで提示される問題やインサイトについて説明します。

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="推奨アクションが強調表示された、折りたたみ可能なメニューが開いた状態のネットワークヘルスページ。" style="width:100%;">}}

## 前提条件 {#prerequisites}

- [Cloud Network Monitoring][1] が有効になっていること。
- [セキュリティグループ](#security-groups)を表示するには、AWS インテグレーションで[リソースコレクション][6]を有効にする必要があります。

## 推奨アクション {#recommended-actions}

{{< ui >}}Recommended Actions{{< /ui >}} セクションでは、ネットワークで検出された最も重大な問題が強調表示されます。これらは以下に基づいて優先順位が付けられます。

1. **重大度**: 問題がトラフィックを積極的にブロックしているかどうか
2. **影響**: 影響を受けるサービスがインフラストラクチャーにとってどれほど重要か

各推奨アクションには以下が表示されます。

- 検出された特定の問題 (例:「TLS 証明書の有効期限が _N_ 日前に切れました」)
- 影響を受けるクライアントサービス (リクエストを作成しているサービス)
- 影響を受けるサーバーサービス (リクエストを受信しているサービス)

サービス名にカーソルを合わせると APM にピボットできます。また、{{< ui >}}Remediate{{< /ui >}} をクリックすると、修復手順と、[{{< ui >}}New Workflow{{< /ui >}}][2]、[{{< ui >}}Create a Case{{< /ui >}}][3]、または [{{< ui >}}Declare an Incident{{< /ui >}}][4] を作成するオプションが表示されます。

   {{< img src="network_performance_monitoring/network_health/recommended_actions_side_panel.png" alt="修復手順が表示された、影響を受けるサービスの推奨アクションサイドパネル。" style="width:100%;">}}

## Watchdog Insights {#watchdog-insights}

{{< ui >}}Watchdog Insights{{< /ui >}} セクションでは TCP 再送回数の急増に焦点が当てられ、Watchdog が検出した異常なネットワーク動作が表示されます。ベースライン (通常は前週) と比較して再送が増加している場合は、根本的なネットワークの問題を示していることがよくあります。詳細については、[Watchdog Insights][5] のドキュメントを参照してください。

Watchdog Insights を使用して、以下のことを行います。
- 潜在的な問題を早期に検出する
- 異常と特定の根本原因を関連付ける
- ユーザーに影響が出る前にパフォーマンスの低下を調査する

また、Datadog MCP Server の [`analyze_cloud_network_monitoring`][7] ツールを使用して、Claude Code や Cursor などの AI エージェントからレイテンシー、パケットロス、TCP コネクションの健全性を調査することもできます。

## TLS 証明書 {#tls-certificates}

期限切れまたは期限が迫っている TLS 証明書は、サービス間の安全なコネクションをブロックし、トラフィックのドロップを引き起こす可能性があります。{{< ui >}}TLS Certificates{{< /ui >}} セクションには以下が一覧表示されます。

- {{< ui >}}Expired certificates{{< /ui >}}: 無効でトラフィックをブロックしている証明書
- {{< ui >}}Expiring certificates{{< /ui >}}: 期限切れが迫っている証明書
- {{< ui >}}Impacted services{{< /ui >}}: 各証明書の問題によって影響を受けるクライアントサービスとサーバーサービス (クライアント「サービス」は、Application Load Balancer などの AWS ロードバランサーである可能性があることに注意してください)

期限切れの証明書をクリックすると、AWS で更新するための手順を確認したり、[{{< ui >}}New Workflow{{< /ui >}}][2]、[{{< ui >}}Create a Case{{< /ui >}}][3]、または [{{< ui >}}Declare an Incident{{< /ui >}}][4] を作成したりできます。

## DNS 障害 {#dns-failures}

DNS の誤構成により、トラフィックが誤った送信先にルーティングされ、サービス間の通信が妨げられる可能性があります。これらの障害は通常、DNS ルーティング設定に加えられた変更が原因で発生します。

{{< ui >}}DNS Failures{{< /ui >}} セクションには以下が表示されます。

- {{< ui >}}Failure reason{{< /ui >}}: DNS 障害の原因
- {{< ui >}}Impacted DNS server{{< /ui >}}: 障害率が上昇している DNS サーバー
- {{< ui >}}Impacted services{{< /ui >}}: DNS 障害の影響を受けたクライアントサービスおよびサーバーサービス

**障害の理由**:

NXDOMAIN  
: ドメイン名が存在しません。通常、誤構成やドメインの削除が原因です。

TIMEOUT 
: DNS クエリが応答を受信する前にタイムアウトしました。ネットワークの問題や DNS サーバーの応答がないことを示している可能性があります。

SERVFAIL
: DNS サーバーがクエリの処理に失敗しました。多くの場合、サーバー側の問題が原因です。

サービス名にカーソルを合わせると APM にピボットできます。また、推奨されるアクションをクリックすると、修復手順と、[{{< ui >}}New workflow{{< /ui >}}][2]、[{{< ui >}}Create a Case{{< /ui >}}][3]、または [{{< ui >}}Declare an Incident{{< /ui >}}][4] を作成するオプションが表示されます。

## セキュリティグループ {#security-groups}

セキュリティグループは、許可ルールと拒否ルールを通じてクラウド環境内のトラフィックフローを制御します。セキュリティグループはデフォルトでトラフィックを拒否するため、ルールを誤って削除または変更すると、サービス間の正当なトラフィックが即座にブロックされる可能性があります。

**注**: セキュリティグループの監視は AWS でのみ利用可能であり、AWS インテグレーションで [EC2 リソース収集][6]を有効にする必要があります。

{{< ui >}}Security Groups{{< /ui >}} セクションでは以下を特定します。
- トラフィックをブロックしているセキュリティグループの誤構成
- 通信できない特定のサービス
- セキュリティグループルールに対する最近の変更

**解決**:
1. セキュリティグループの問題をクリックして、サイドパネルを開きます。
2. {{< ui >}}View in AWS{{< /ui >}} を選択して、AWS コンソールに移動します。
3. インバウンドルールとアウトバウンドルールを確認および変更します。
4. サイドパネルの {{< ui >}}Infrastructure Change Tracking{{< /ui >}} データを使用して、変更が発生した日時を特定し、必要に応じて元に戻します。

## フィルタリング {#filtering}

ページ上部にあるフィルターを使用して、表示される問題のスコープを絞り込みます。利用可能なフィルターには以下が含まれます。

- {{< ui >}}Service{{< /ui >}}: 特定のサービスに影響を与える問題を表示する
- {{< ui >}}Team{{< /ui >}}: 特定のチームが所有する問題を表示する

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/cloud_network_monitoring/setup
[2]: /ja/actions/workflows/build/
[3]: /ja/incident_response/work_management/create_work_item
[4]: /ja/incident_response/incident_management/declare/
[5]: /ja/watchdog/insights
[6]: /ja/integrations/amazon-web-services/#resource-collection
[7]: /ja/mcp_server/tools/#analyze_cloud_network_monitoring