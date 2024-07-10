---
description: Datadog Azure インテグレーションのアーキテクチャと代替構成オプションのガイド
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Azure インテグレーション
title: Azure インテグレーションアーキテクチャと構成
---

## 概要

このガイドでは、Datadog の Azure インテグレーションを構成するユーザー向けの詳細情報とリファレンスアーキテクチャ、および特定のユースケース向けの代替構成オプションを提供します。

### リファレンスアーキテクチャ

本ガイドの図は、[Azure インテグレーションページ][1]のステップに従った場合の構成プロセスと結果を視覚的に表したものです。このガイドでは、Datadog と Azure 環境との相互作用の詳細な概要を提供し、セキュリティ、コンプライアンス、ガバナンスに関する一般的な質問に回答します。

### 代替構成

[Azure インテグレーションページ][1]でドキュメント化されているセットアッププロセスは、推奨手順であり、大多数のユーザーにとって理想的な構成になります。特定のユースケースでは、このドキュメントに記載されている別の構成オプションが望ましい場合があります。パフォーマンス、機能、または管理の容易さにおけるトレードオフについては、必要に応じて概説します。

## Azure メトリクスとデータ収集

Datadog の Azure インテグレーションを有効にすると、Datadog は以下のことが可能になります。

  - 指定されたスコープ内のすべてのサブスクリプションのすべてのリソースを検出し、監視する
  - 検出されたメトリクス定義を自動的に更新し、Azure Monitor から利用可能なすべてのメトリクスが収集されるようにする
  - 一般的なメタデータとリソース固有のメタデータ (カスタム Azure タグを含む) の両方を取り込み、Datadog の関連リソースメトリクスにタグとして適用する
  - Azure メタデータ API にクエリし、Azure Monitor がサポートしていないインサイトについて、レスポンスを使用して [Datadog で有用なメトリクスを生成する][2]

使用される Azure API と収集されるデータは、標準バージョンまたは Azure Native バージョンのどちらのインテグレーションを使用しても同一です。

{{% site-region region="us,us5,eu,gov,ap1" %}}

### 標準の Azure インテグレーションメトリクスとデータ収集

_すべての Datadog サイトで利用可能です_

以下の手順に従って、標準の Azure インテグレーションを有効にします。

  1. Active Directory にアプリ登録を作成し、[Datadog Azure インテグレーションページ][2]に資格情報を入力します。
  2. アプリケーションに、監視したいサブスクリプションまたは管理グループへの読み取りアクセス権 (`Monitoring Reader` ロール) を与えます。

以下の図は、メインドキュメントで説明されている Azure インテグレーション構成のプロセスと結果のアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="アプリ登録インテグレーション設定図" >}}

これが完了すると、自動的にデータ収集が開始されます。Datadog に入力されたアプリ登録情報により、Datadog は [Azure Active Directory][1] (AD) からトークンをリクエストします。Datadog は、このトークンを Azure の各種 API への API 呼び出しの認可として使用し、提供されたスコープ内のリソースを検出し、データを収集します。この継続的なプロセスは、デフォルトでは 2 分間隔で実行され、Azure 環境からデータを検出・収集するために使用されます。データ収集プロセスを以下に示します。

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="アプリ登録インテグレーション設定図" >}}

[1]: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/
[2]: https://app.datadoghq.com/integrations/azure
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native インテグレーションメトリクス収集
_Datadog US3 サイトでのみ利用可能です_

**アカウントのリンク**: Azure の Datadog リソースは、Azure 環境と Datadog アカウントをリンクします。このリンクは、他の Datadog サイトで利用可能な標準の Azure インテグレーションと同じデータ収集を可能にしますが、認証メカニズムが異なります。そのアクセスは、ユーザーが作成し構成した **App Registration** ではなく、Azure の Datadog リソースに関連付けられた **System Managed Identity** を使用して割り当てられます。

**権限**: `Monitoring Reader` ロールの割り当ては Datadog リソースの作成時に自動的に行われ、Datadog リソースの親サブスクリプションにスコープされます。Datadog リソースにモニタリング用のサブスクリプションを追加すると、このスコープは自動的に Managed Identity 用に更新されます。

以下の手順に従って、Azure Native インテグレーションを有効にします。

1. Datadog 組織が US3 の [Datadog サイト][1]でホストされていることを確認するか、[US3 サイトで Datadog のトライアルアカウントを作成します][5]。
2. 少なくとも 1 つのサブスクリプションをリンクする Datadog リソースを Azure に作成します。
3. オプションで、Datadog リソースを更新して、他のサブスクリプションを含めます。

[外部 ISV][6] として、このアクセスをリクエストし、使用するには、さらに別のプロセスが必要です。

1. Datadog は Azure に認証され、プライベートな Azure サービスを使用して、指定された Datadog リソースに関連するカスタマートークンをリクエストします。
1. この Azure サービスは、Datadog のアイデンティティを検証し、リクエストされた Datadog リソースが存在し、有効になっていることを確認します。
1. Azure は、Datadog に短命のカスタマートークンを返します。このトークンは、関連するシステムマネージドアイデンティティに付与されるのと同じレベルのアクセスを可能にします。
1. Datadog は、このカスタマートークンを使用して、有効期限が切れるまで監視環境のデータをクエリし、有効期限が近づいた時点でプロセスが繰り返されます。

以下の図は、Azure Native インテグレーション構成のプロセスと結果のアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_integration_setup.png" alt="Azure Native インテグレーション設定図" >}}

これが完了すると、データ収集が自動的に開始されます。Datadog は、以下の図のように、Azure 環境からメトリクスを継続的に検出して収集します。

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_metric_collection.png" alt="Azure Native メトリクス収集設定図" >}}

### メトリクス収集の代替構成オプション

Datadog では、標準インテグレーションと Azure Native インテグレーションのどちらを使用する場合でも、デフォルト構成を使用することを強く推奨しています。これは、インテグレーションが継続的に強化され、新しい差別化された洞察を提供し、データ収集のパフォーマンスと信頼性が向上しているためです。メトリクス収集のより制限的な構成では、これらの改善が阻害される可能性があります。

#### アクセス制限のオプション

以下のセクションでは、アクセス制限のオプションとその意味について詳しく説明します。

##### 1. サブスクリプションレベル以下のアクセスの割り当て

サブスクリプションレベル以下の Datadog アクセスを以下で割り当てることができます。

  - リソースグループ別
  - 個別リソース別

**注**: このアクセスは、標準の Azure インテグレーションでは **App Registration** を通じて、Azure ネイティブインテグレーションでは Datadog リソースに関連付けられた **System Managed Identity** を通じて管理されます。

サブスクリプションレベル以下のアクセススコープを更新した場合でも、Datadog はリソースとその利用可能なメトリクスを検出し、指定されたスコープ内で動的に取り込みます。

Datadog のアクセスをサブスクリプションレベル以下に制限することで、以下のようになります。

  - メトリックスコールをバッチ化する機能を阻害するため、Datadog に入力されるまでに通常 1～2 分かかる遅延が発生します。個々のリソースによる制限は、リソースグループによる制限よりも大きな影響を与えます。実際の遅延は、Azure 環境のサイズ、構成、分布に大きく依存します。顕著な影響がない場合もあれば、最大 45 分のレイテンシーが発生する場合もあります。
  - Azure API 呼び出しが増加するため、Azure 内のコストが上昇する可能性があります。
  - リソースのオートディスカバリーが制限されます。
  - 新しいリソース、リソースグループ、またはサブスクリプションを監視するには、ロールの割り当てスコープを手動で更新することが必要になります。

##### 2. 監視リーダーより制限の多いロールの割り当て

**Monitoring Reader** ロールは、モニターリソースとサブスクリプションレベルのデータへの広範なアクセスを提供します。この読み取り専用アクセスにより、Datadog は既存の機能と新しい機能の両方で最高のユーザーエクスペリエンスを提供することができます。Azure AD ロールは、このアクセスをテナントレベルの Azure AD リソースに拡張することができます。

Monitoring Reader ロール以下のアクセスを制限することの意味は以下の通りです。

  - モニタリングデータの一部または全部の喪失
  - リソースメトリクスのタグ形式のメタデータの一部または全部の喪失
  - [Cloud Security Management Misconfigurations (CSM Misconfigurations)][3] または [Resource Catalog][4] のデータの一部または全部の消失
  - Datadog が生成したメトリクスの一部または全部の喪失

Azure AD のロールを制限または省略することの影響は次のとおりです。

  - CSM Misconfigurations における Azure AD リソースのメタデータの一部または全部の消失
  - Azure AD リソースの資格情報有効期限監視の一部または全部の喪失

[1]: /ja/getting_started/site/
[2]: https://www.datadoghq.com/
[3]: /ja/security/misconfigurations/
[4]: /ja/security/misconfigurations/resource_catalog/
[5]: https://us3.datadoghq.com/signup
[6]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{% /site-region %}}

## Azure ログ収集

{{% site-region region="us,us5,eu,gov,ap1" %}}

### 標準の Azure インテグレーションログ収集
_すべての Datadog サイトで利用可能です_

下図は、Azure インテグレーションページの[ログ収集セクション][1]に記載されている、Azure から Datadog へのログ転送のリファレンスアーキテクチャです。

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="手動ログ転送設定図" >}}

### 標準の Azure インテグレーションでのログ転送の代替構成オプション

上記のデフォルトアーキテクチャは、ほとんどのユーザーに適しています。Azure 環境の規模と構成、および組織がこのアーキテクチャを実装するために使用する方法に応じて、関連する可能性のある追加の考慮事項について、以下のセクションで詳しく説明します。

#### 提供されたテンプレートを使用

メインの Azure [ログ収集セクション][1] の **Deploy to Azure** ボタンは、Event Hub とフォワーダー関数のペアを作成するためのテンプレートを提供します。このテンプレートを使用して直接デプロイすることに加えて、独自のインフラストラクチャーをコードとしてデプロイするための出発点として、基礎となる ARM テンプレートを使用することができます。

これらのテンプレートは、アクティビティログ用のオプションの診断設定を除いて、診断設定を追加しません。Datadog は、リソースログについては、ARM テンプレートや Terraform を利用して、プログラムでリソースに診断設定を追加することを推奨します。これらの診断設定は、リソースログを Datadog に送信する必要があるすべてのリソースに追加する必要があります。

#### リージョンに関する考慮事項

診断設定は、リソースと同じリージョン内の Event Hub にのみリソースログを送信できます。リソースログを Datadog に送信したいリソースを含む各リージョンに、Event Hub とフォワーダー関数のペアを追加します。

ただし、診断設定は、リソースと同じサブスクリプション内の Event Hub にログを送信することに限定されません。Azure テナント内に複数のサブスクリプションがある場合、同じリージョン内で単一の Event Hub とフォワーダー関数を共有できます。

#### 大量ログの考慮事項

ログの量が増加すると、ボトルネックが発生することがあります。大量のログを送信する場合は、パーティションを追加するか、Premium または Dedicated ティアの使用を検討するとよいでしょう。
ログ量が特に多い場合は、同じリージョン内に Event Hub とフォワーダー関数のペアを追加し、トラフィックを分割することを検討できます。

[1]: /ja/integrations/azure/#log-collection
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native インテグレーションログ収集
_Datadog US3 サイトでのみ利用可能です_

以下の図は、Azure Native インテグレーションログ転送構成のプロセスと結果のアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_log_forwarding.png" alt="Azure Native ログ転送設定図" >}}

Azure Native インテグレーションでは、Azure リソースやアクティビティログの Datadog への転送を実装するために、Datadog リソースの外で何かを構成する必要はありません。診断設定は、Datadog リソースで指定されたタグルールだけを使用して、構成に合わせて自動的に追加または削除されます。

**注**: 以下のように、フィルターなしでリソースログを有効にすると、すべてのリソースログを送信できます。

{{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_metrics_and_logs.png" alt="Datadog Agent のビルド図" >}}

Datadog リソースによって作成された診断設定は、すべてのログカテゴリーを含み、`Send to Partner Solution` で構成され、発信元の Datadog リソースにログを送り返します。これらは、`DATADOG_DS_V2_<UNIQUE_IDENTIFIER>` という命名形式に従っています。

リソースの削除を含む手動による変更は、数分以内に元に戻されます。

Datadog リソースによって作成された診断設定の例を以下に示します。

{{< img src="integrations/guide/azure_architecture_and_configuration/diagnostic_setting.png" alt="診断設定図" >}}

### Azure Native インテグレーションでのログ転送の代替構成オプション

Datadog リソースでログを有効にするためのワンクリックボタンは、診断設定を追加するプロセスを自動化します。場合によっては、Azure Native インテグレーションによる自動ログ転送機能を利用しながら、診断設定を組織で管理・構成したい場合もあります。

手動で作成された診断設定は、Datadog リソースのログ設定に影響されず、Datadog リソースで指定されたタグルールに基づいて削除されません。手動でログ転送を行うために、Datadog リソースでリソース ログを有効にする必要はありません。ただし、ログ転送に使用する Datadog リソースが無効な状態であってはなりません。

診断設定を手動で管理する理由には、以下のようなものがあります。

  1. コードポリシーとしてのインフラストラクチャー
     すべてのリソースを決定論的に作成および管理する必要がある、IaC に関する厳格な内部ポリシー (たとえば、Datadog リソースによる診断設定の自動作成によって、希望する状態と実際の状態との間に解決不能な競合が発生する場合など)。

  2. リソースログカテゴリーの制限
     Datadog リソースによって自動的に作成される診断設定には、すべてのログカテゴリーが含まれるため、これらのカテゴリーのサブセットを指定するには、診断設定を自分で作成する必要があります。 
     **注**: [除外フィルター][1]を使用して、Datadog への取り込み時にこれらのログのインデックス化を除外することもできます。

  3. クロスサブスクリプションログ転送
     クロスサブスクリプションログ転送は、特定のサブスクリプションからログを送信し、他のデータを送信しない場合に便利です。クロスサブスクリプションのログ転送を有効にするには、診断設定を作成する前に、ログを送信する各サブスクリプションに `Microsoft.Datadog` リソースプロバイダーを登録します。ログ転送に使用される Datadog リソースは、自身のサブスクリプションと、監視リソースブレードを介して構成されたサブスクリプションから、メトリクスとデータを収集します。

       {{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_resource_providers.png" alt="Microsoft の Azure ポータルのリソースプロバイダーページのスクリーンショット。登録されているステータスを表示する Datadog。" >}}

  4. テスト
     Datadog にログのサンプルを送信することは、テストやその他の調査に役立ちます。このような場合、更新されたタグや設定から自動的に作成されるのを待つよりも、手動で診断設定を追加した方が早い場合があります。

このアーキテクチャは、オプションのクロスサブスクリプションのセットアップを含め、以下の通りです。

{{< img src="integrations/guide/azure_architecture_and_configuration/custom_azure_native_log_forwarding.png" alt="カスタム Azure Native ログ転送設定図" >}}

[1]: /ja/logs/log_configuration/indexes/#exclusion-filters
{{% /site-region %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/