---
aliases:
- /ja/security/cloud_siem/content_packs
disable_toc: true
further_reading:
- link: /security/cloud_siem/detection_rules
  tag: ドキュメント
  text: ログ検出ルールを作成する
- link: security/cloud_siem/investigator
  tag: ドキュメント
  text: Investigator について
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: ドキュメント
  text: セキュリティシグナルを調査する
- link: https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/
  tag: ブログ
  text: 'Cloud SIEM Content Packs の新機能: 2024 年 9 月'
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: ブログ
  text: 攻撃者が Microsoft 365 サービスを悪用する方法
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: ブログ
  text: Datadog Cloud SIEM で Google Workspace アプリの悪意のあるアクティビティを検出
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: ブログ
  text: Datadog Cloud SIEM で OCSF 共通データモデルを使用してデータを正規化する
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: ブログ
  text: 'Cloud SIEM の新機能: AI を活用した調査、強化された脅威インテリジェンス、スケーラブルなセキュリティオペレーション'
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: 'Datadog Cloud SIEM: セキュリティ運用におけるイノベーションの推進'
- link: https://www.datadoghq.com/blog/oci-content-pack
  tag: ブログ
  text: Datadog Cloud SIEM で OCI 監査ログを監視する
title: コンテンツパック
---
## 概要{#overview}

[Cloud SIEM Content Packs][1] は、主要なセキュリティ Integrations のためのすぐに使えるコンテンツを提供します。統合に応じて、コンテンツパックには以下が含まれる場合があります。

- [検出ルール][2]: 環境を包括的にカバーします
- コンテンツパックのログとセキュリティシグナルの状態に関する詳細な洞察を提供するインタラクティブなダッシュボード
- [Investigator][3]: ユーザーやリソースによる疑わしいアクティビティを調査するためのインタラクティブなグラフィカルインターフェイス
- [Workflow Automation][4]: アクションを自動化し、問題の調査と修正を加速します
- 構成ガイド
- [OCSF pipelines][5]: 統合のログを Open Cybersecurity Schema Framework 共通データモデルに正規化します
- 統合からのサードパーティアラート。Cloud SIEM セキュリティシグナルにマッピングされます

コンテンツパックは、以下のタイプでフィルタリングできます。
- **コンテンツパック**: 検出ルール、SOAR (Security Orchestration, Automation, and Response) ワークフロー、カスタムツールなど、セキュリティ関連のコンテンツがバンドルされた統合です。
- **エンリッチメントパック**: 脆弱性やサードパーティの洞察など、SIEM 分析に価値のあるコンテキストを追加し、調査を改善するためのコンテンツです。
- **インテグレーションパック**: Cloud SIEM での使用に関連する、Datadog のカタログから厳選されたコンテンツです。
- **エンティティパック**: 環境内のユーザーを識別する統合です。これらにより、シグナルやリスクにおけるユーザーコンテキスト、ユーザーごとのリスクスコアリング、ユーザーベースの調査が可能になります。リスクの高いユーザーを検出するには、少なくとも 1 つのエンティティパックが必要です。

このページに記載されているコンテンツパックに加え、Cloud SIEM には **Always-On コンテンツパック**が含まれています。これは、Datadog がログとセキュリティシグナルに自動的に適用する脅威インテリジェンスのエンリッチメントであり、インストールや構成は不要です。

{{% cloud-siem-content-packs %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/content-packs
[2]: /ja/security/detection_rules/
[3]: /ja/security/cloud_siem/triage_and_investigate/investigator
[4]: /ja/actions/workflows/
[5]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/