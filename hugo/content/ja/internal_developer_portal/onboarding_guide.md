---
description: Datadog の Internal Developer Portal をセットアップするプラットフォームおよびエンジニアリングリーダー向けの段階的な実装ガイドです。計画やデータソースからゴールデンパスまでを網羅しています。
further_reading:
- link: https://app.datadoghq.com/idp/get-started
  tag: アプリ
  text: Datadog で IDP を探索
- link: /getting_started/internal_developer_portal/
  tag: ドキュメント
  text: Internal Developer Portal の概要
- link: /internal_developer_portal/software_catalog/
  tag: ドキュメント
  text: カタログ
- link: /internal_developer_portal/scorecards/
  tag: ドキュメント
  text: Scorecards
- link: /internal_developer_portal/self_service_actions/
  tag: ドキュメント
  text: Self-Service Actions
- link: /internal_developer_portal/eng_reports/
  tag: ドキュメント
  text: エンジニアリングレポート
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: ブログ
  text: Datadog Teams の GitHub インテグレーションを使用して、サービスの所有権を最新の状態に保ちます。
site_support_id: idp
title: Internal Developer Portal のオンボーディング
---
## 概要{#overview}

このオンボーディングガイドは、プラットフォームおよびエンジニアリングリーダーを対象に、Datadog の IDP (Internal Developer Portal) の実装フェーズを順番に説明します。 

推奨:
- まず 1、2 チームをオンボーディングし、そのフィードバックを使用して標準を改善します。 
- この過程を繰り返します。Internal Developer Portal を製品として扱います。 
- IDP の標準を、SLO、CI/CD パイプライン、インシデントワークフローなどのほかの取り組みと連携させます。 

## フェーズ 1: 実装を計画する {#phase-1-plan-your-implementation}

1. **主要な概念を確認する**: [エンティティモデル][2]、[Scorecards][3]、および [Self-Service Actions][4] について学びます。 
1. **組織の構造を取り込む**: [Teams][5] を設定し、組織の階層を Datadog に反映させます。 
1. **オントロジーを定義する**: 既存のシステムを[エンティティモデル][2]にマッピングし、組織の構造と Datadog のスキーマとが整合するようにします。適用する[エンティティタイプ][6]と検証を決定します。

## フェーズ 2: ツールを習得する {#phase-2-familiarize-yourself-with-tooling}

1. **データソースを特定する**: 3 種類のエンティティの取り込み方法を学び、[カタログ][7]の信頼できる情報源として何を使用するかを決定します。

   - **[Datadog 製品からエントリを自動検出する][23]**: APM、RUM、USM など。インフラストラクチャーや Log Management からインポートすることもできます。
   - **外部システムからインポートする**: [Backstage][14] や [ServiceNow][15] など。 
   - **[エントリを直接作成する][24]**: Datadog UI を使用して作成するか、GitHub、GitLab、Terraform、Datadog ソフトウェアメタデータプロバイダー、またはサービス定義 API からインポートしてプログラムで作成します。

  **注**: APM を使用している場合は、サービスのオーバーライドに頼るのではなく、[unified service tagging][25] と[推論サービス][26]をエントリポイントとして優先的に使用してください。

1. **社内オンボーディングガイダンスを作成する**: ドキュメントのタグ付け標準、サンプル `entity.definition.yaml` ファイル、およびアプリケーションチームへの期待事項を文書化します。 
1. **自動化を検討する**: [API][8] または Terraform プロバイダーを使用して、エンティティ、Scorecards、およびワークフローをプログラムで管理します。

## フェーズ3: データソースを統合する {#phase-3-integrate-data-sources}

1. **GitOps スタイルの管理を採用する**: [GitHub または GitLab を接続][13]して、カタログを管理します。利用可能な場合は、[既存の Backstage マニフェストをインポート][14]します。
1. **[ServiceNow からインポートする][15]**: ServiceNow CMDB から IDP へ CI を同期します。 
1. **On-Call ツールおよびインシデントツールを接続する**: [Jira][9]、[PagerDuty][10]、または[その他のインテグレーション][16]を設定します。

## フェーズ 4: スキーマをカスタマイズおよび拡張する {#phase-4-customize-and-extend-schema}

1. **エンティティ定義標準を確立する**: 重要度、ライフサイクル、環境をどのように表現するかを決定します。定義スキーマについては、「[エンティティモデル][6]」を参照してください。
1. **メタデータの期待事項を設定する**: [カスタムタグと拡張機能][18]を含めるかどうかを決定します。コンポーネント間の関係を定義する方法と、自動検出された関係を監査する方法を決定します。
1. **社内ガイダンスを保守管理する**: インスツルメンテーションやタグ付けの標準、エンティティ定義マニフェストのサンプルなど、開発者向けのドキュメントを管理します。

## フェーズ 5: 標準を確立して伝達する {#phase-5-establish-and-communicate-standards}

1. **推奨される Scorecards を確認する**: [Datadog の標準ルール][3]から始めます。自分の組織に関係のあるものを選択します。
1. **組織固有のルールを追加する**: カスタムセキュリティチェック、デプロイ頻度の要件、またはタグ付け標準を使用して、[Scorecards を拡張][19]します。 
1. **重要度レベルを設定する**: 重要度を示すために、[ルールをレベルに分類][20]します。

## フェーズ 6: ゴールデンパスを設定する {#phase-6-set-up-golden-paths}

1. **サンプルブループリントを確認する**: インフラストラクチャーのプロビジョニングと管理、プロジェクトのスキャフォールディングなどのサンプルパスを示す、[セルフサービスブループリント][11]を確認します。組織のスタックに合わせてブループリントを調整してみてください。
1. **Action Catalog を調べる**: サポートされているインテグレーションを確認するか、[HTTP リクエストと Private Actions][4] で拡張します。 
1. **最初のワークフローを公開する**: ゴールデンパスを作成し、開発者からのフィードバックに基づいて反復します。

## フェーズ 7: エンジニアリングレポートを調べる {#phase-7-explore-engineering-reports}

1. **進捗を追跡する**: 組み込みの[エンジニアリングレポート][12]を使用して、本番環境への準備状況、信頼性、およびベストプラクティスの導入状況を監視します。 
1. **エンゲージメントを測定する**: 組み込みの使用状況分析ダッシュボードを使用して、開発者のエンゲージメントを監視します。
 
## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/internal_developer_portal/catalog/entity_model/native_entities/
[3]: /ja/internal_developer_portal/scorecards/
[4]: /ja/internal_developer_portal/self_service_actions/
[5]: /ja/internal_developer_portal/catalog/set_up/ownership
[6]: /ja/internal_developer_portal/catalog/entity_model/
[7]: /ja/internal_developer_portal/catalog/
[8]: /ja/api/latest/software-catalog/
[9]: /ja/integrations/jira/
[10]: /ja/integrations/pagerduty/
[11]: https://app.datadoghq.com/software/self-service-actions
[12]: /ja/internal_developer_portal/eng_reports/
[13]: /ja/internal_developer_portal/catalog/set_up/create_entities/#github-and-gitlab-integrations
[14]: /ja/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage
[15]: /ja/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[16]: /ja/internal_developer_portal/integrations
[18]: /ja/internal_developer_portal/catalog/entity_model?tab=v30#build-custom-extensions
[19]: /ja/internal_developer_portal/scorecards/custom_rules
[20]: /ja/internal_developer_portal/scorecards/scorecard_configuration#group-rules-into-levels
[23]: /ja/internal_developer_portal/catalog/set_up/discover_entities
[24]: /ja/internal_developer_portal/catalog/set_up/create_entities
[25]: /ja/getting_started/tagging/unified_service_tagging
[26]: /ja/tracing/services/inferred_services