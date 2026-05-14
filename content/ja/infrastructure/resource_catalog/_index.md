---
aliases:
- /ja/security_platform/cspm/resource_catalog
- /ja/security/cspm/resource_catalog
- /ja/security/misconfigurations/resource_catalog
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: よくあるご質問
  text: Cloud Security Misconfigurations
- link: /security/threats/
  tag: よくあるご質問
  text: ワークロード保護
- link: https://www.datadoghq.com/blog/datadog-resource-catalog/
  tag: ブログ
  text: Datadog Resource Catalog を使用してインフラストラクチャーリソースを管理する
- link: https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/
  tag: ブログ
  text: 最近の変更を使用してインフラストラクチャーの問題を迅速にトラブルシューティングする
- link: https://www.datadoghq.com/blog/resource-catalog-natural-language-querying
  tag: ブログ
  text: Resource Catalog でマルチクラウドインフラストラクチャーをクエリするために平易な英語を使用する
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: ブログ
  text: Cambia Health Solutions が Cloud Cost Management と Datadog Resource Catalog
    を使用して月額 $30,000 を節約した方法
is_beta: true
title: Datadog Resource Catalog
---
##  概要 {#overview}

Datadog Resource Catalog は、すべてのインフラストラクチャーリソースの中央ハブです。リソースのコンプライアンスを管理し、インシデントの根本原因を調査し、インフラストラクチャーの可観測性のギャップを埋めるのに役立ちます。Resource Catalog を使用すると、メタデータ、所有権、構成、資産間の関係、リソースのアクティブなセキュリティリスクなど、重要なリソース情報を理解できます。

Resource Catalog は、Datadog のクラウドインテグレーションと Datadog Agent を活用して、ホスト、データベース、ストレージサービスなどのクラウドリソースからデータを収集します。

{{< img src="/infrastructure/resource_catalog/resource_catalog_new_2.png" alt="リソースタイプ別にグループ化されたカタログタブを表示する Resource Catalog ページ" width="100%">}}

###  ユースケース {#use-cases}

####  リソースポリシーと報告 {#resource-policies-and-reporting}
-  所有権、バージョン管理、移行などに関するインフラストラクチャーのコンプライアンスを可視化する。
- クロステレメトリのインサイトを最適化するために、適切なタグ付けの運用を促進する。
-  サービスの依存関係におけるセキュリティ脆弱性を特定し修正することで、アプリケーションのリスクを低減する。
-  エンジニアリングリーダーシップに、チームやクラウドアカウント全体のセキュリティプラクティスの概要を提供する。
-  記録保持または監査のためにリソースをエクスポートする。

####  インシデントとパフォーマンスの問題をトラブルシューティングする {#troubleshoot-incidents-and-performance-issues}
- リソースの健康とパフォーマンスを理解するために、豊富なインサイトを備えたテレメトリ、ダッシュボード、その他の Datadog ビューにアクセスする。
-  インシデントの回復を迅速化するために関連するリソースのチームおよびサービスの所有者を特定する。
- リソースの構成変更を表示して、考えられる根本原因を特定する。

#### 可観測性を最適化する {#optimize-observability}
- Datadogによってより良く監視できるリソースを特定し、可観測性のギャップを埋める。
- 誤構成が最も発生しやすいリソースや、セキュリティの誤構成を積極的に報告していないリソースを特定し、適切なセキュリティカバレッジを確保する。

## セットアップ {#setup}

デフォルトでは、リソースカタログに移動すると、Datadog Agentで監視されているホストや、CNM（Cloud Network Monitoring）やDBM（Database Monitoring）などの他のDatadog製品のためにクロールされたクラウドリソースを見ることができます。リソースカタログで追加のクラウドリソースを表示するには、[リソースカタログ][5]のセットアップページから**リソース収集の拡張**をオンにします。

{{< img src="/infrastructure/resource_catalog/resource_catalog_settings.png" alt="リソース収集を拡張するためのリソースカタログ構成ページ" width="100%">}}

<div class="alert alert-warning">リソース収集を有効にすると、AWS CloudWatchのコストに影響を与える可能性があります。これらの料金を避けるために、<a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a>の<strong>Metric Collection</strong>タブで<strong>Usage</strong>メトリクスを無効にします。
</div>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="アカウント設定のAWS使用状況トグル" style="width:100%;" >}}

## リソースカタログを閲覧する {#browse-the-resource-catalog}

[リソースカタログページ][2]で、Datadog組織内のクラウドリソースを探索します。カタログは、エージェントがインストールされているか、クラウド統合が構成されているためにリソースを検出します。

### カタログタブ {#catalog-tab}

カタログタブは、リソースのコンテキストを表示し、チームの所有権や関連サービスを含みます。インシデントが発生する前に、欠落している所有権情報を積極的に特定し、埋めるのに役立ちます。リソースカタログは、各リソースタイプにカスタマイズされたリソース属性も表示します。ホストのインスタンスタイプやデータベースのバージョンなど、特定の属性でリソースを検索できます。

**注意**: [Datadog Teams][4]を使用している場合、左パネルの**Teams**トグルを選択し、割り当てられたチームのトグルを選択すると、そのチームに割り当てられたリソースのみを表示できます。さらに、リソースカタログリストを右上隅からCSVファイルとしてエクスポートできます。

リスト内の任意のリソースに関連するクラウドコンソールにアクセスするには、リソースをクリックしてサイドパネルを開きます。次に、右上隅の**Open Resource**ドロップダウンをクリックしてリダイレクトされます。

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel_2.png" alt="Resource Catalogのサイドパネルには、Open Resourceドロップダウンが強調表示されています。" >}}

### ホストまたはリソースを調査する {#investigate-a-host-or-resource}

<div class="alert alert-info">このパネルには秘密は表示されません。表示される「秘密」は、ランダムに生成された文字列であり、セキュリティリスクはありません。</div>

ホストをクリックすると、以下のような詳細が表示されるサイドパネルが開きます：

- **ホスト情報**（名前、アカウント、OS、インスタンスタイプ、タグ、およびホストに関連するメタデータなど）
- **ホストの概要**（アクティブなモニターアラートと有効な製品を表示）
- **テレメトリ**（メトリクス、ログ、トレース、およびプロセスを含む）
- **コンテナ**（ホストに接続されたコンテナのメトリクスを表示）
- **インフラマップ**（[Cloudcraftダイアグラム][17]を表示）
- **関係**（他のリソースへの接続のインタラクティブマップを表示）
- **ホストに関連付けられたプロファイル**（[Profiler][20]が必要）
- **ネットワーク**情報（タグでフィルタリングでき、カスタマイズ可能なグラフで表示）
- **変更**（ホストの変更履歴をカスタマイズ可能に表示）
- **セキュリティ**（一般的な誤設定、[IaCの誤設定][21]、シグナル、脆弱性、アイデンティティリスク、およびアクセスインサイトを表示）
- **コスト**（ホストのコストを削減するための推奨事項を含む）
- **エージェント**（JSON形式でのエージェント設定を表示）
- **OTel Collector**は、OpenTelemetry Collectorの設定を表示します（プレビュー中）

{{< img src="/infrastructure/resource_catalog/resource_catalog_host_side_panel-2.png" alt="ホストサイドパネルが開いているResource Catalog" width="100%">}}

任意のリソースをクリックすると、以下のような詳細が表示されるサイドパネルが開きます：

- **リソース情報**には、リソース固有のタグとJSON形式のリソース定義が含まれます
- **テレメトリ**には、メトリクスとログが含まれます
- **関係**は、他のリソースへの接続のインタラクティブなマップを表示します
- **変更**は、リソースの変更履歴を示します
- **セキュリティ**は、誤設定、シグナル、脆弱性、アイデンティティリスクを表示します

## リソース変更（プレビュー中）{#resource-changes-in-preview}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
リソース変更はプレビュー中です。<strong>アクセスリクエスト</strong>をクリックし、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}} 

リソース変更は、クラウドインフラストラクチャの構成変更に対する可視性と制御を提供します。リソースの変更を監視し、インシデントのトラブルシューティングや環境の進化を理解するのに役立ちます。

詳細については、[リソース変更][16]を参照してください。

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="Datadogリソース変更インターフェースは、インフラストラクチャーの構成変更のリストを表示します。画面には、ストレージプロファイルの更新を含む「vm-new-jmcintyre-kafka」という名前のVMインスタンスが表示され、JSON形式の変更を強調表示したサイドバイサイドの差分ビューが含まれています。テーブルには、タイムスタンプ、変更タイプ（主に「UPDATE」）、および変更の詳細を持つ複数のリソースが表示されます。フィルターは、クラウド、リージョン、環境、その他の属性のために上部に用意されています。" width="100%">}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /ja/integrations/#cat-notification
[4]: /ja/account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /ja/integrations/amazon_config/#resource-changes-collection
[7]: https://app.datadoghq.com/integrations
[8]: /ja/integrations/google_cloud_platform/#resource-changes-collection
[9]: https://www.datadoghq.com/product-preview/recent-changes-tab/
[10]: https://docs.datadoghq.com/ja/security/cloud_security_management/misconfigurations/
[11]: https://docs.datadoghq.com/ja/security/threats/
[12]: https://docs.datadoghq.com/ja/security/cloud_security_management/identity_risks/
[13]: https://docs.datadoghq.com/ja/security/cloud_security_management/vulnerabilities/
[14]: https://app.datadoghq.com/integrations/azure
[15]: https://docs.datadoghq.com/ja/infrastructure/resource_catalog/schema/
[16]: /ja/infrastructure/resource_catalog/resource_changes/
[17]: /ja/datadog_cloudcraft/
[18]: /ja/integrations/ntp/
[19]: /ja/infrastructure/process/?tab=linuxwindows#installation
[20]: /ja/profiler/enabling/
[21]: /ja/security/code_security/iac_security/