---
description: Datadog の Internal Developer Portal は、ライブテレメトリ、メタデータ、セルフサービスワークフローを統合し、ソフトウェアデリバリーの標準化と開発者体験の最適化を実現します。
disable_toc: false
further_reading:
- link: getting_started/internal_developer_portal/
  tag: ドキュメント
  text: Internal Developer Portal の概要
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: ブログ
  text: プラットフォームエンジニアリングチームの成功メトリクス
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を使用して、エンジニアリング組織全体でフィードバックを行動に変える
- link: https://www.datadoghq.com/blog/software-catalog
  tag: ブログ
  text: Catalog で開発者体験とコラボレーションを向上させる
- link: https://www.datadoghq.com/blog/service-scorecards
  tag: ブログ
  text: Service Scorecards を使ってサービスの監視可能性におけるベストプラクティスを優先し、推進する
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions
  tag: ブログ
  text: Datadog Catalog の Self-Service Actions でエンジニアリングチームを強化
- link: https://www.datadoghq.com/blog/how-datadog-manages-internal-deployments/
  tag: ブログ
  text: Datadog のインフラストラクチャーチームが Service Catalog と CI/CD Visibility を使用して内部デプロイを管理する方法
- link: https://www.datadoghq.com/blog/internal-developer-portal/
  tag: ブログ
  text: Datadog IDP でソフトウェアを迅速かつ確実に提供
- link: https://www.datadoghq.com/blog/datadog-backstage-plugin/
  tag: ブログ
  text: Backstage カタログを Datadog IDP と同期
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: ブログ
  text: IDP キャンペーンで大規模なエンジニアリングイニシアチブを調整
- link: https://app.datadoghq.com/idp/get-started
  tag: アプリ
  text: Datadog で IDP を探索
title: Internal Developer Portal
---
{{< img src="tracing/internal_developer_portal/scrolling_the_catalog.mp4" alt="Internal Developer Portal の Catalog ページをスクロールし、サービスをクリックすると、親サービスと子サービスを示す依存関係グラフを表示する動画" video=true >}}

## 概要 {#overview}

IDP の作成は、[プラットフォームエンジニアリング][7] のベストプラクティスにおいて重要な要素です。Datadog の Internal Developer Portal は、ライブテレメトリ、メタデータ、セルフサービスワークフローを統合し、ソフトウェアデリバリーの標準化と迅速化、および開発体験の最適化を実現するフルマネージドソリューションです。

- ライブテレメトリを活用する [Catalog][1] は、すべてのサービスと環境をリアルタイムでインベントリ化し、所有権や運用コンテキストを記述するメタデータで各エントリーを充実させます。
- [Self-Service Actions][2] と [Scorecards][3] は、プラットフォームのポリシーをワンクリックのタスクに変換し、すべての変更が監視可能性、セキュリティ、本番環境の基準を満たしていることを保証します。
- 組み込みの [Engineering Reports][4] により、プラットフォームエンジニアやリーダーは、ソフトウェアの品質、標準の採用状況、開発者体験をリアルタイムで可視化でき、ギャップの特定やデータに基づいた意思決定が容易になります。

IDP を初めて利用する場合は、セットアップと基本的な使用方法を順を追って説明する [スタートガイド][5] から始めてください。

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="近日公開予定の機能への早期アクセスにお申し込みください。" >}}
{{< /callout >}}

## 一般的なユースケース {#common-use-cases}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dev_onboarding" >}}開発者のオンボーディングを加速{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/incident_response" >}}インシデント対応の改善{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dependency_management" >}}依存関係の管理およびマッピング{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/production_readiness" >}}本番環境への対応準備を評価{{< /nextlink >}}
{{< /whatsnext >}}

## 主な機能 {#main-features}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog" >}}Catalog で監視可能性、オーナーシップ、エンジニアリングに関する知識を一元管理{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards" >}}Scorecards でエンジニアリングのベストプラクティスを大規模に推進{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/self_service_actions" >}}Self-Service Actions でリリースを加速{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/eng_reports" >}}Engineering Reports で信頼性とスコアカードへの準拠状況を追跡{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/external_provider_status" >}}External Provider Status で外部依存関係を監視{{< /nextlink >}}
{{< /whatsnext >}}

## チームとの連携 {#working-with-teams}

[Datadog Teams][6] を使用して IDP のチーム向け機能を有効化

- Datadog でチームを追跡し、外部の信頼できる情報源と自動的に同期 
- チームをサービスやその他のエンティティの所有者として割り当て 
- チーム間に親子関係を設定するための [階層][8] を作成
- IDP 全体でチーム別にビューをフィルタリング (例: Catalog、Scorecards、Engineering Reports)

組織が GitHub を使用してチーム構成を管理している場合は、GitHub Integration for Teams を使用して GitHub のチームを Datadog に自動的に同期します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/internal_developer_portal/catalog
[2]: /ja/internal_developer_portal/self_service_actions
[3]: /ja/internal_developer_portal/scorecards
[4]: /ja/internal_developer_portal/eng_reports
[5]: /ja/getting_started/internal_developer_portal/
[6]: /ja/account_management/teams/
[7]: https://www.datadoghq.com/knowledge-center/platform-engineering/
[8]: /ja/account_management/teams/manage/#team-hierarchies