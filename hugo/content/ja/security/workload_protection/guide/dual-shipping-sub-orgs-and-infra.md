---
description: Workload Protection データを 2 つの Datadog 組織にデュアル送信するための要件と考慮事項。
disable_toc: false
further_reading:
- link: /agent/configuration/dual-shipping/
  tag: ドキュメント
  text: デュアル送信
- link: /account_management/multi_organization/
  tag: ドキュメント
  text: マルチオーガニゼーションアカウントの管理
- link: /infrastructure/
  tag: ドキュメント
  text: Infrastructure Monitoring
title: Workload Protection を複数の組織に安全にデュアル送信する方法
---
このガイドでは、Workload Protection データを 2 つの Datadog 組織 (例: プラットフォームチームが使用するプライマリ組織と、セキュリティチームのみが使用するセカンド組織) にデュアル送信する理由とその方法について説明します。

{{< partial name="security-platform/WP-billing-note.html" >}}

## Workload Protection データをデュアル送信する理由{#why-dual-ship-workload-protection-data}

[デュアル送信][1]では、単一の Datadog Agent から同じ Workload Protection ランタイムイベントを 2 つの組織に送信します。これは、異なるチームが Datadog 内の異なるデータにアクセスする必要がある場合に役立ちます。たとえば、セキュリティチームには Workload Protection のシグナル、検出結果、調査ワークフローが必要ですが、プライマリ組織のプラットフォームチームやアプリケーションチームにはセキュリティデータが表示されないようにする必要があります。

各送信先組織で Workload Protection を有効にすることで、Datadog は受信したランタイムイベントを分析し、シグナルと検出結果を生成できるようになります。

## Infrastructure Monitoring の要件 {#infrastructure-monitoring-requirement}

<div class="alert alert-warning">
Datadog では、Infrastructure Monitoring が有効になっていない組織またはサブ組織で Workload Protection を実行しないことを推奨します。
</div>

Workload Protection は、完全なエクスペリエンスを提供するために [Infrastructure Monitoring][2] に依存しています。

- バックエンドルールは、Agent イベントに**インフラストラクチャーコンテキスト** (クラウドプロバイダー、ホスト、Kubernetes クラスター、コンテナ、イメージ) を付与します。これにより、検知、検出結果、調査ワークフローが強化されます。
- **ホストおよびコンテナのタグ**は、環境全体でのポリシー展開とルールフィルターのスコープを決定します。
- [カバレッジ][3]ページおよび調査ワークフローはインフラストラクチャービューにピボットし、保護されていないホストの特定と攻撃ストーリーの再構築を可能にします。

Infrastructure Monitoring がないと、Workload Protection のエクスペリエンスは不完全なものとなります。

## デュアル送信とサブ組織 {#dual-shipping-and-sub-organizations}

デュアル送信を設定するには、次のドキュメントを参照します。

- [デュアル送信][1]: Workload Protection ランタイムイベント、インフラストラクチャーメトリクス、およびその他のテレメトリタイプに対する Agent の設定。設定 `runtime_security_config.endpoints` については、[Workload Protection][1] セクションを参照してください。
- [複数組織アカウントの管理][4]: サブ組織の仕組み、組織間のデータ分離、親組織からの使用状況追跡など。

<div class="alert alert-warning">
複数の Datadog 組織にデータを送信する場合、デュアル送信が請求に影響を与える可能性があります。詳細については、<a href="/help/">Datadog サポート</a>までお問い合わせください。
</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/dual-shipping/
[2]: /ja/infrastructure/
[3]: /ja/security/workload_protection/inventory/
[4]: /ja/account_management/multi_organization/