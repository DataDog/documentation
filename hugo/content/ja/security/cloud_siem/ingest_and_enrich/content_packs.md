---
aliases:
- /ja/security/cloud_siem/content_packs
disable_toc: true
further_reading:
- link: /security/cloud_siem/detection_rules
  tag: ドキュメント
  text: ログ検出ルールの作成
- link: security/cloud_siem/investigator
  tag: ドキュメント
  text: Investigator の詳細を学ぶ
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: ドキュメント
  text: セキュリティシグナルの調査
- link: https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/
  tag: ブログ
  text: 'Cloud SIEM コンテンツパックの新機能: 2024 年 9 月'
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: ブログ
  text: 攻撃者はいかに Microsoft 365 サービスを悪用するか
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: ブログ
  text: Datadog Cloud SIEM を使用して Google Workspace アプリの悪意のあるアクティビティを検出する
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: ブログ
  text: Datadog Cloud SIEM で OCSF 共通データモデルを使用してデータを正規化する
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: ブログ
  text: 'Cloud SIEM の新機能: AI を活用した調査、脅威インテリジェンスの強化、スケーラブルなセキュリティ運用'
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: 'Datadog Cloud SIEM: セキュリティ運用のイノベーションを推進する'
- link: https://www.datadoghq.com/blog/oci-content-pack
  tag: ブログ
  text: Datadog Cloud SIEM で OCI 監査ログを監視する
title: コンテンツパック
---
## 概要 {#overview}

[Cloud SIEM コンテンツパック][1] は、主要なセキュリティのインテグレーションのために、すぐに使えるコンテンツを提供します。インテグレーションに応じて、コンテンツパックには以下が含まれます。

- 環境の包括的なカバレッジを提供する [検出ルール][2]
- コンテンツパックのログとセキュリティシグナルの状態に関する詳細なインサイトを提供するインタラクティブなダッシュボード
- ユーザーやリソースによる不審なアクティビティを調査するためのインタラクティブなグラフィカルインターフェースである [Investigator][3]
- アクションを自動化し、問題をより素早く調査し修復する [Workflow Automation][4]
- 設定ガイド
- インテグレーションのログを Open Cybersecurity Schema Framework の共通データモデルに正規化するための [OCSF パイプライン][5]
- Cloud SIEM セキュリティシグナルにマッピングされる、インテグレーションから送られるサードパーティアラート

コンテンツパックは、以下のタイプ別にフィルタリングできます。
- **コンテンツパック**: 検出ルール、SOAR (Security Orchestration, Automation, and Response) ワークフロー、カスタムツールなど、セキュリティ関連のコンテンツがバンドルされたインテグレーション
- **エンリッチメントパック**: 脆弱性やサードパーティのインサイトなど、調査を改善するために SIEM 分析に有益なコンテキストを追加するコンテンツ
- **インテグレーションパック**: Cloud SIEM での使用に関連する、Datadog カタログから選別されたコンテンツ
<!-- - **Entity Packs**: Integrations and bundled content that power UEBA (User and Entity Behavior Analytics) by modeling normal activity for users and entities and surfacing risky anomalies in Cloud SIEM -->

このページに記載されているコンテンツパックに加え、Cloud SIEM には **Always-On コンテンツパック**が含まれています。これらは、Datadog がログやセキュリティシグナルに自動的に適用する脅威インテリジェンスのエンリッチメントであり、インストールや設定を必要としません。

{{% cloud-siem-content-packs %}}

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/content-packs
[2]: /ja/security/detection_rules/
[3]: /ja/security/cloud_siem/triage_and_investigate/investigator
[4]: /ja/actions/workflows/
[5]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/