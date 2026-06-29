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
  text: Workload Protection
- link: https://www.datadoghq.com/blog/datadog-resource-catalog/
  tag: ブログ
  text: Datadog Resource Catalog を使用してインフラストラクチャーリソースをガバナンスする
- link: https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/
  tag: ブログ
  text: Recent Changes を使用してインフラストラクチャーの問題をより迅速にトラブルシューティングする
- link: https://www.datadoghq.com/blog/resource-catalog-natural-language-querying
  tag: ブログ
  text: Resource Catalog でマルチクラウドインフラストラクチャーを平易な英語でクエリする
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: ブログ
  text: Cambia Health Solutions が Cloud Cost Management と Datadog Resource Catalog
    を使用して月額 30,000 ドルを節約した方法
is_beta: true
title: Datadog Resource Catalog
---
## 概要 {#overview}

Datadog Resource Catalog は、すべてのインフラストラクチャーリソースの中心的なハブです。リソースのコンプライアンス管理、インシデントの根本原因の調査、インフラストラクチャーにおける可観測性のギャップの解消に役立ちます。Resource Catalog を使用すると、メタデータ、所有権、構成、資産間の関係、リソースにおけるアクティブなセキュリティリスクなどの重要なリソース情報を把握できます。

Resource Catalog は、Datadog のクラウドインテグレーションと Datadog Agent を活用して、ホスト、データベース、ストレージサービスなどのクラウドリソースからデータを収集します。

{{< img src="/infrastructure/resource_catalog/resource_catalog_new_2.png" alt="リソースタイプ別にグループ化された Catalog タブを表示している Resource Catalog ページ" width="100%">}}

### ユースケース {#use-cases}

#### リソースポリシーとレポート{#resource-policies-and-reporting}
- 所有権、バージョン管理、移行などに関するインフラストラクチャーのコンプライアンス状況を可視化できます。
- クロステレメトリのインサイトを最適化するために、適切なタグ付けのベストプラクティスを促進します。
- サービスの依存関係におけるセキュリティ脆弱性を特定して修正することで、アプリケーションのリスクを低減します。
- エンジニアリングリーダーシップに、チームやクラウドアカウント全体のセキュリティプラクティスの概要を提供します。
- 記録保持や監査のためにリソースをエクスポートします。

#### インシデントやパフォーマンスの問題をトラブルシューティングする{#troubleshoot-incidents-and-performance-issues}
- リソースの健全性とパフォーマンスを把握するために、テレメトリ、ダッシュボード、その他の Datadog ビューから豊富なインサイトにアクセスできます。
- インシデント対応を迅速化するために、関連リソースのチームおよびサービスのオーナーを特定します。
- リソースの構成変更を確認し、考えられる根本原因を特定します。

#### 監視可能性を最適化する{#optimize-observability}
- Datadog によってより適切に監視できるリソースを特定し、監視可能性のギャップを埋めます。
- 誤構成が最も発生しやすいリソースや、セキュリティの誤構成を積極的に報告していないリソースを特定し、適切なセキュリティカバレッジを確保します。

## セットアップ {#setup}

デフォルトでは、Resource Catalog に移動すると、Datadog Agent で監視されているホストや、CNM (Cloud Network Monitoring) や DBM (Database Monitoring) などの他の Datadog 製品のためにクロールされたクラウドリソースを確認できます。Resource Catalog で追加のクラウドリソースを表示するには、[Resource Catalog][5] のセットアップページで **extend resource collection** をオンにします。

{{< img src="/infrastructure/resource_catalog/resource_catalog_settings.png" alt="リソース収集の拡張設定を行う Resource Catalog の構成ページ" width="100%">}}

<div class="alert alert-warning">リソース収集を有効にすると、AWS CloudWatch のコストに影響する可能性があります。これらの課金を回避するには、<a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a> の <strong>Metric Collection</strong> タブで <strong>Usage</strong> メトリクスを無効にします。
</div>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="アカウント設定の AWS Usage トグル" style="width:100%;" >}}

## Resource Catalog の閲覧{#browse-the-resource-catalog}

[Resource Catalog ページ][2] で、Datadog 組織内のクラウドリソースを探索します。カタログは、リソースに Agent がインストールされている場合、またはクラウドインテグレーションが構成されている場合に、そのリソースを検出します。

### Catalog タブ{#catalog-tab}

Catalog タブでは、リソースのコンテキストが表示され、チームのオーナー情報や関連サービスなどが含まれます。インシデント発生前に、不足しているオーナー情報を事前に特定し、補完するのに役立ちます。Resource Catalog は、リソースタイプごとにカスタマイズされたリソース属性も表示します。ホストのインスタンスタイプやデータベースのバージョンなど、特定の属性でリソースを検索できます。

**注**: [Datadog Teams][4] を使用している場合は、左パネルの **Teams** トグルを選択し、割り当てられているチームのトグルを選択すると、そのチームに割り当てられたリソースのみを表示できます。さらに、Resource Catalog リストは右上隅から CSV ファイルとしてエクスポートできます。

リスト内の任意のリソースに対応するクラウドコンソールにアクセスするには、リソースをクリックしてサイドパネルを開きます。次に、右上隅の **Open Resource** ドロップダウンをクリックすると、リダイレクトされます。

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel_2.png" alt="Resource Catalog のサイドパネルで Open Resource ドロップダウンが強調表示されています。" >}}

### ホストまたはリソースを調査する{#investigate-a-host-or-resource}

<div class="alert alert-info">このパネルにはシークレットは表示されません。表示される「シークレット」は、ランダムに生成された文字列であり、セキュリティリスクはありません。</div>

ホストをクリックすると、詳細を含むサイドパネルが開きます:

- **Host information** (ホストに関連する名前、アカウント、OS、インスタンスタイプ、タグ、メタデータなど)
- **Host Summary** (アクティブなモニターアラートと有効な製品を表示)
- **Telemetry** (メトリクス、ログ、トレース、プロセスなど)
- **Containers** (ホストにアタッチされたコンテナのメトリクスを表示)
- **Infra map** ([Cloudcraft ダイアグラム][17] を表示)
- **Relationships** (他のリソースへの接続のインタラクティブマップを表示)
- **Profiles** (ホストに関連付けられたプロファイル ([プロファイラー][20] が必要))
- **Network** (タグでフィルタリングでき、カスタマイズ可能なグラフで表示されるネットワーク情報)
- **Changes** (ホストの変更履歴をカスタマイズ可能に表示)
- **Security** (一般的なミスコンフィギュレーション、[IaC misconfigurations][21]、シグナル、脆弱性、アイデンティティリスク、アクセスインサイトを表示)
- **Cost** (ホストのコストを削減するための推奨事項を含む)
- **Agent** (JSON 形式で Agent の設定を表示)
- **OTel Collector** (OpenTelemetry Collector の設定を表示 (Preview))

{{< img src="/infrastructure/resource_catalog/resource_catalog_host_side_panel-2.png" alt="ホストサイドパネルを開いた状態の Resource Catalog" width="100%">}}

任意のリソースをクリックすると、サイドパネルが開き、以下のような詳細が表示されます。

- **Resource Info** (リソース固有のタグと JSON 形式のリソース定義を含む)
- **Telemetry** (メトリクスとログを含む)
- **Relationships** (他のリソースへの接続のインタラクティブマップを表示)
- **Changes** (リソースの変更履歴を表示)
- **Security** (誤構成、シグナル、脆弱性、アイデンティティリスクを表示)

## Resource Changes (Preview) {#resource-changes-in-preview}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
Resource Changes は Preview です。<strong>Request Access</strong> をクリックし、フォームに入力してアクセスをリクエストしてください。
{{< /callout >}} 

Resource Changes は、クラウドインフラストラクチャーの構成変更に対する可視性と制御を提供します。リソースの変更を監視し、インシデントのトラブルシューティングや環境の変化の把握に役立ちます。

詳細については、[Resource Changes][16] を参照してください。

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="Datadog Resource Changes インターフェイスは、インフラストラクチャーの構成変更のリストを表示します。画面には、「vm-new-jmcintyre-kafka」という名前の VM インスタンスが表示され、StorageProfile の更新と、JSON 形式の変更を強調表示したサイドバイサイドの差分ビューが含まれています。テーブルには、タイムスタンプ、変更タイプ (主に「UPDATE」)、および変更の詳細を持つ複数のリソースが表示されます。上部には、クラウド、リージョン、環境、その他の属性のフィルターがあります。" width="100%">}}


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