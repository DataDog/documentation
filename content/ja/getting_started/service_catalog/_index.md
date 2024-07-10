---
further_reading:
- link: profiler/profile_types/
  tag: ドキュメント
  text: NodeJS
- link: https://learn.datadoghq.com/courses/managing-service-catalog
  tag: ガイド
  text: サービスカタログによるサービスの管理
- link: https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/
  tag: ブログ
  text: Datadog サービスカタログでマイクロサービスガバナンスを簡素化する
- link: /service_catalog/troubleshooting
  tag: ドキュメント
  text: ヘルプ
- link: /service_catalog/scorecards
  tag: ドキュメント
  text: チームを作成する
title: サービスカタログの概要
---

{{< img src="/getting_started/service_catalog/overview_image.jpeg" alt="Service Catalog Reliability ビューには、複数のサービスと、それらに関連する MTTR、デプロイメントメトリクス、問題、インシデント、SLO、およびモニターステータスが表示されています。" style="width:90%;" >}}

## 概要

Datadog サービスカタログは、所有権メタデータ、パフォーマンスインサイト、セキュリティ分析、コスト割り当てなどを組み合わせた、サービスの統合ビューを提供します。この一元化されたハブを持つことで、開発チームは、ランタイム環境内の重要なコンポーネントを発見し、管理することができます。

このページでは、Datadog でサービスカタログを使い始める手順を説明します。

## 前提条件

[Datadog アカウント][1]をまだ作成していない場合は作成します。

## サービスカタログへのエントリの追加

### 自動検出されたサービス

サービスカタログは、[APM][2]、[USM][3]、[RUM][4] などのアプリケーションパフォーマンステレメトリーに基づいてサービスを自動的に発見します。APM とのインテグレーションにより、Datadog は、トレースが収集されるのと同じ頻度で、定期的に新しいサービスを発見することができます。USM を使用すると、Datadog Agent は eBPF に対応したホストに接続します。USM は、このインフラストラクチャー上で実行されているサービスを自動的に検出し、[統合サービスタグ付け][5]を使用してタグ付けします。

### ユーザー定義サービス

これらの製品を使用していない場合は、手動で `service.definition.yaml` レジストリのエントリとしてサービスを宣言することができます。このファイルの定義には、カタログがサービスのファイル化に使用するすべてのメタデータが含まれています。これらは内部 API や Terraform のような構成管理サービスを使ってプログラムで作成・更新することができます。このファイルをバージョン管理に入れて、新しいリソースが環境に追加されるたびに定期的に更新してください。

次の例は、e コマースアプリケーションの `shopping-cart` サービスを表しています。所有チーム、使用言語、ランブックリンク、コードリポジトリなど、サービスに関する重要なメタデータが含まれています。

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

また、Configuration Management Database (CMDB) テーブル ([Datadog の ServiceNow インテグレーション][6]を使用) やスプレッドシートなど、組織が保持している既存のナレッジソースを使用して、サービスカタログに入力することもできます。また、Datadog には [Backstage とのインテグレーション][7]があり、ここで登録されたデータやサービスを Datadog に直接インポートすることができます。

最後に、Infrastructure Monitoring や Log Management など、他の Datadog 製品の `service` タグからエントリを作成することもできます。

{{< img src="/getting_started/service_catalog/import_entries.jpeg" alt="Service Catalog setup and configuration セクションの Import Entries タブ" style="width:90%;" >}}

## サービスカタログにおけるメタデータの管理

サービスカタログにこれらの初期エントリを作成した後は、カタログを一貫して更新し、有効性を維持することが重要です。サービス定義ファイルは、チームのバージョン管理内に存在し、更新が必要なサービスに対する新しいデプロイメントやその他の変更を簡単に参照できるようにする必要があります。

[GitHub アクション][8]を構成することで、サービスメタデータの管理を自動化することもできます。これにより、すべての本番サービスが有効なランブックリンクを持つことを必須にするなど、チームが基準を満たす方法でサービスを宣言していることを確実にすることもできます。

組織内に [Backstage][9] のような内部システムやスプレッドシートを含む既存の所有権レジストリがある場合、中央のチームは [API 呼び出し][10]を使用してサービス定義ファイルの更新をスケジュールできます。

### モニタリングスタック全体のテレメトリーを統合する

可観測性プラットフォームの他の部分からモニタリングデータを接続し、カタログの実用性を向上させます。

[統合サービスタグ付け][5]を用いることで、`service` タグを利用して、Datadog の全製品にわたるサービスカタログ内のサービスエンティティを相互に参照できます。これらのタグは、メタデータ、メトリクス、および Infrastructure Monitoring、RUM、Log Management、Software Delivery、Security などのコンテキストソースでサービスエンティティを充実させるのに役立ちます。

ユニバーサルサービスモニタリングと APM からのアプリケーションパフォーマンステレメトリーにより、システムエコシステムに対する即座に使用可能な依存関係マッピングも提供され、ランタイム環境全体でコンポーネント間の相互作用を確認できます。

## サービスカタログを充実させる

サービスがカタログに入力された後、それらをより便利にするために追加のコンテキストでサービス定義を充実させることができます。これには、`service.definition.yaml` ファイルに次のようなサービスメタデータの重要な要素を追加することが含まれます。

- チーム
- オンコールエンジニア
- 連絡チャンネル
- ドキュメントリンク
- 最終デプロイバージョン
- コードリポジトリ
- ランブックリンク
- ライブラリの依存関係とそのバージョン
- 関連ダッシュボード

サービスカタログは、サービス定義スキーマを使用して、サービスに関するこのメタデータを保存および表示します。スキーマには、有効な値のみが受け入れられるようにするための検証ルールが組み込まれています。現在、v2、v2.1、v2.2、および v3 の [4 つのサポートされているスキーマ][11]があります。

## サービスカタログスコアカードの使用

[サービススコアカード][12]は、組織のベストプラクティスを評価可能なルールとして体系化するのに役立ちます。カタログにスコアカードを導入することで、チームは以下のようなサービス品質の多くの側面を測定することができます。

- 監視範囲
- 本番環境準備 (Production readiness)
- セキュリティポスチャ
- 最新の社内ツールの採用
- インテグレーションチェック

Datadog のスコアカードには、可観測性プラクティス、所有権のタグ付け、本番準備チェックポイントなど、すぐに使える 10 個のルールが含まれています。また、独自のカスタムルールを定義することもできます。例えば、セキュリティレビュープロセスのステップにマッピングされたルールセットを含むスコアカードを作成して、各サービスが準拠しているかどうかを迅速に監査できるようにすることができます。これらのルールには、CVE 分析、RBAC 構成、その他のセキュリティパラメーターに関するチェックが含まれる場合があります。

スコアカードダッシュボードにカスタムルールを追加するには

1. Scorecards ページの **Create Rule** をクリックします。
2. ルールの名前、所属スコアカード、ルールの説明、所有チームを指定します。
3. 評価する `{rule, service}` タプルごとに `pass`、`fail`、`skip` の結果を[スコアカード API][13] `/scorecard/outcomes/batch` エンドポイントに送信します。
4. スコアカードダッシュボードで結果の概要を表示します。

{{< img src="/getting_started/service_catalog/create_rule.jpeg" alt="スコアボードダッシュボードでカスタムルールを追加するための Create Rule モーダル" style="width:90%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: /ja/tracing
[3]: /ja/universal_service_monitoring
[4]: /ja/real_user_monitoring
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/integrations/servicenow/#service-ingestion
[7]: /ja/service_catalog/setup#import-data-from-other-sources
[8]: https://www.datadoghq.com/blog/github-actions-service-catalog
[9]: https://backstage.io/docs/overview/what-is-backstage
[10]:/ja/api/latest/service-definition
[11]: /ja/service_catalog/add_metadata#metadata-structure-and-supported-versions
[12]: /ja/service_catalog/scorecards
[13]: /ja/api/latest/service-scorecards