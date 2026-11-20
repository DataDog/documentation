---
aliases:
- /ja/cloudprem/introduction/
description: BYOC Logsのインフラストラクチャー、コンポーネント、およびサポートされている機能について学習します。
title: BYOC Logsの概要
---
## 概要{#overview}

BYOC (Bring Your Own Cloud) Logsは、お客様のインフラストラクチャー内で実行されるDatadogのログ管理ソリューションです。ログをお客様のオブジェクトストレージにインデックス化して保存し、検索および分析クエリを実行し、Datadog UIに接続して完全に統合されたエクスペリエンスを提供します。BYOC Logsは、特定の要件を持つ組織向けに設計されています。
- データの保存場所、プライバシー、および規制要件
- 大容量の要件

BYOC Logsの仕組みの概要を以下に示します。

{{< img src="/cloudprem/overview_diagram_byoc.png" alt="BYOC Logsのアーキテクチャ概要。ログがソースからBYOC Logsを経由してDatadogプラットフォームに流れる様子を示しています。" style="width:100%;" >}}

この図は、BYOC Logsのハイブリッドインフラストラクチャーを示しており、データがお客様のインフラストラクチャー内でどのように処理および保存されるかを強調しています。

*   **取り込み**: ログは、標準プロトコルを使用してDatadog Agentやその他のソースから収集されます。
*   **お客様のインフラストラクチャー**: BYOC Logsプラットフォームは、すべてお客様のインフラストラクチャー内で実行されます。ログは、お客様自身のオブジェクトストレージ（Amazon S3、Google Cloud Storage、またはAzure Blob Storage）で処理および保存されます。
*   **Datadog SaaS**: Datadogプラットフォームは、BYOC Logsのコントロールプレーンです。Datadog UIをホストし、安全なコネクションを通じてBYOC Logsと通信することで、ログクエリを送信し、結果を受信します。

{{< whatsnext desc="BYOC Logsのアーキテクチャと機能を確認します。">}}
  {{< nextlink href="/byoc-logs/introduction/architecture/" >}}アーキテクチャ - BYOC Logsのコンポーネントがどのように連携して動作するかを理解します。{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/network/" >}}ネットワーク - BYOC LogsがDatadogとどのように通信するかを理解します。{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/features/" >}}サポートされている機能 - BYOC Logsで利用可能なLog Explorer機能を確認します。{{< /nextlink >}}
{{< /whatsnext >}}

## 使い始める {#get-started}

{{< whatsnext desc="BYOC Logsをデプロイする準備はできましたか？以下のガイドに従ってください：">}}
  {{< nextlink href="/byoc-logs/quickstart/" >}}クイックスタート - BYOC Logsをローカル環境で5分以内に実行する{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/" >}}インストール - AWS、GCP、またはAzureにBYOC Logsをデプロイする{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/ingest/agent/" >}}ログの取り込み - Datadog Agentを設定してBYOC Logsにログを送信する{{< /nextlink >}}
{{< /whatsnext >}}