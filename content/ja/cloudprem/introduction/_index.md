---
description: CloudPrem のアーキテクチャ、コンポーネント、対応機能を説明します。
title: CloudPrem の紹介
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

CloudPrem は、Datadog の BYOC 型ログ管理ソリューションです。お客様自身のインフラストラクチャ内で動作し、オブジェクト ストレージにログをインデックス化して保存し、検索クエリや分析クエリを実行しながら、Datadog UI と連携して Datadog 製品群と統合された体験を提供します。CloudPrem は、特に次のような要件を持つ組織を想定して設計されています:
- データ レジデンシー、プライバシー、規制対応に関する要件
- 大量データ処理に関する要件

以下では、CloudPrem の仕組みを大づかみに説明します。

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="各ソースから CloudPrem を経由して Datadog プラットフォームへログが流れる様子を示した CloudPrem アーキテクチャの概要図" style="width:100%;" >}}

この図は、CloudPrem のハイブリッド アーキテクチャを示したものです。データがどのようにお客様のインフラ内で処理・保存されるかがわかります:

*   **取り込み**: 標準プロトコルを使って、Datadog Agent や他のソースからログを収集します。 
*   **お客様のインフラストラクチャ**: CloudPrem プラットフォームは、すべてお客様のインフラストラクチャ内で動作します。ログは、お客様自身のストレージ (S3、Azure Blob、MinIO) で処理・保存されます。 
*   **Datadog SaaS**: Datadog プラットフォームは CloudPrem のコントロール プレーンとして機能し、Datadog UI をホストするとともに、安全な接続で CloudPrem と通信し、ログ クエリの送信と結果の受信を行います。

{{< whatsnext desc="CloudPrem のアーキテクチャと機能を詳しく見ていきましょう:">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}アーキテクチャ - CloudPrem の各コンポーネントがどう連携するかを理解する{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/network/" >}}ネットワーク - CloudPrem と Datadog の通信方法を理解する{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/features/" >}}対応機能 - CloudPrem で利用できる Log Explorer 機能を確認する{{< /nextlink >}}
{{< /whatsnext >}}

## はじめに

{{< whatsnext desc="CloudPrem のデプロイを始めるには、次のガイドを参照してください:">}}
  {{< nextlink href="/cloudprem/quickstart/" >}}Quickstart - 5 分で CloudPrem をローカルで起動する{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}インストール - AWS、Azure、またはカスタム Kubernetes に CloudPrem をデプロイする{{< /nextlink >}}
  {{< nextlink href="/cloudprem/ingest/agent/" >}}ログ取り込み - Datadog Agent から CloudPrem にログを送信するよう設定する{{< /nextlink >}}
{{< /whatsnext >}}