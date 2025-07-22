---
description: Datadog Azure インテグレーションのアーキテクチャ ガイドおよび代替構成オプション
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: ドキュメント
  text: Azure インテグレーション
title: Azure インテグレーションのアーキテクチャと構成
---

## 概要

このガイドでは、Datadog の Azure インテグレーションを構成するユーザー向けに詳細な情報とリファレンスアーキテクチャ、および特定のユースケースを対象とした代替構成オプションについて説明します。

### リファレンスアーキテクチャ

このガイドに含まれる図は、[Azure インテグレーションページ][1]の手順に従った場合の構成プロセスと結果を視覚的に表現しています。このガイドでは、Datadog と Azure 環境との相互作用の全体像を詳細に説明し、セキュリティ、コンプライアンス、ガバナンスに関する一般的な疑問に答えます。

### 代替構成

[Azure インテグレーションページ][1]に記載された設定プロセスは推奨手順であり、大多数のユーザーにとって理想的な構成になります。特定のユースケースでは、このドキュメントに記載されている別の構成オプションが望ましい場合があります。パフォーマンス、機能、または管理のしやすさの面でのトレードオフについては、必要に応じて概説します。

## Azure のメトリクスとデータの収集

Datadog の Azure インテグレーションを有効にすると、Datadog で次のことが可能になります。

  - 指定されたスコープ内のすべてのサブスクリプションのすべてのリソースを検出、監視する。
  - 検出されたメトリクス定義を自動的に更新し、Azure Monitor から利用可能なすべてのメトリクスが収集されるようにする。
  - 一般的なメタデータとリソース固有のメタデータの両方 (カスタム Azureタグ を含む) を広範に取り込み、Datadog の関連リソースメトリクスにタグとして適用する。
  - Azure メタデータ API にクエリを発行し、そのレスポンスを使用して [Datadog で有用なメトリクスを生成][2]し、Azure Monitor がサポートしていないインサイトを得る。

インテグレーションの標準版と Azure Native 版のどちらを使用しても、使用される Azure API と収集されるデータは同じです。

{{% site-region region="us,us5,eu,gov,ap1,ap2" %}}

### 標準の Azureインテグレーションメトリクスとデータの収集

_すべての Datadog サイトで利用可能_

以下の手順に従って、標準の Azure インテグレーションを有効にします。

  1. Active Directory にアプリの登録を作成し、[Datadog Azure インテグレーションページ][2]で資格情報を入力します。
  2. アプリケーションに、監視したいサブスクリプションまたは管理グループへの読み取りアクセス権 (`Monitoring Reader` ロール) を付与します。

下の図は、メインのドキュメントで説明されている Azure インテグレーションの構成プロセスとその結果として得られるアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="アプリ登録のインテグレーションの設定図" >}}

これが完了すると、データ収集が自動的に開始されます。Datadog に入力されたアプリ登録情報により、Datadog は [Azure Active Directory][1] (AD) にトークンを要求することができます。Datadog は、このトークンを各種 Azure API への API 呼び出しの認可として使用して、指定されたスコープ内のリソースを検出し、データを収集します。この継続的なプロセスはデフォルトで 2 分間隔で実行され、Azure 環境からのデータの検出および収集に使用されます。データ収集プロセスは次の図のようになります。

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="アプリ登録のインテグレーション設定図" >}}

[1]: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/
[2]: https://app.datadoghq.com/integrations/azure
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native インテグレーションメトリクスの収集
_Datadog US3 サイトでのみ利用可能_

**アカウントのリンク**: Azure の Datadog リソースが、Azure 環境と Datadog アカウントをリンクします。このリンクは、他の Datadog サイトで利用可能な標準の Azure インテグレーションと同じデータ収集を可能にしますが、認証メカニズムが異なります。そのアクセス権は、ユーザーが作成・構成した **アプリの登録** ではなく、Azure の Datadog リソースに関連付けられた**システムマネージドアイデンティティ**を使用して割り当てられます。

**権限**: `Monitoring Reader` ロールの割り当ては Datadog リソースの作成中に自動的に行われ、Datadog リソースの親サブスクリプションにスコープされます。Datadog リソースにモニタリング用のサブスクリプションを追加した場合、このスコープは該当のマネージド ID に応じて自動的に更新されます。

以下の手順に従って、Azure Native インテグレーションを有効にします。

1. Datadog 組織が US3 [Datadog サイト][1]にホストされていることを確認するか、[US3 サイトで Datadog のトライアルアカウントを作成][5]します。
2. 少なくとも 1 つのサブスクリプションをリンクする Datadog リソースを Azure に作成します。
3. オプションで Datadog リソースを更新し、他のサブスクリプションを含めます。

[外部の ISV][6]であるため、このアクセス権を要求して使用するために、さらに別のプロセスが存在します。

1. Datadog が Azure に認証され、プライベートな Azure サービスを使用して、指定された Datadog リソースに関連付けられたカスタマートークンを要求します。
1. この Azureサービスが Datadog のアイデンティティを検証し、要求された Datadog リソースが存在し、有効になっていることを確認します。
1. Azure は Datadog に存続期間の短いカスタマートークンを返します。このトークンによって、関連するシステムマネージド ID に付与されたのと同じレベルのアクセス権が有効になります。
1. Datadog は、このカスタマートークンを使用して監視対象環境内のデータをクエリし、有効期限が切れると、上記のプロセスが繰り返されます。

下の図は、Azure Native インテグレーションの構成プロセスとその結果として得られるアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_integration_setup.png" alt="Azure Native インテグレーションの設定を示した図" >}}

これが完了すると、データ収集が自動的に開始されます。Datadog は、次の図に示すように、Azure 環境からメトリクスを継続的に検出して収集します。

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_metric_collection.png" alt="Azure Native メトリクス収集の設定を示した図" >}}

### メトリクス収集の代替構成オプション

標準 または Azure Native インテグレーションのいずれを使用する場合でも、Datadog はデフォルト構成の使用を強く推奨しています。なぜなら、インテグレーションは、データ収集のパフォーマンスと信頼性を向上させるだけでなく、新しい差別化されたインサイトを提供するために継続的に強化されているからです。メトリクス収集の構成をより制限的にすることで、こうした改善が阻害される可能性があります。

#### アクセス権制限のオプション

次のセクションでは、アクセス権制限のオプションとその影響について詳しく説明します。

##### 1. サブスクリプションレベル未満のアクセス権の割り当て

Datadog にサブスクリプションレベル未満のアクセス権を割り当てることができます。

  - リソースグループ単位
  - 個別リソース単位

**注**: このアクセス権は、標準の Azure インテグレーション では**アプリの登録** を通じて、Azure Native インテグレーションでは Datadog リソースに関連付けられた**システムマネージドアイデンティティ**を通じて管理されます。

サブスクリプションレベル未満のアクセス権のスコープを更新しても、Datadog はリソースとその利用可能なメトリクスを検出し、指定されたスコープ内で動的に取り込むことができます。

Datadog のアクセス権をサブスクリプションレベル未満に制限すると、次のような影響が出ます。

  - メトリクスの呼び出しをバッチ処理する機能が阻害されるため、Datadog に入力されるまでに、通常の 1～2 分を超える遅延が発生します。個別リソース単位の制限は、リソースグループ単位での制限よりも影響が大きくなります。実際の遅延は、Azure 環境のサイズ、構成、および分布に大きく依存します。顕著な影響がない場合もあれば、最大 45 分の遅延が発生する場合もあります。
  - Azure API の呼び出しが増加し、Azure 内のコストが上昇する可能性があります。
  - リソースのオートディスカバリーが制限されます。
  - 新しいリソース、リソースグループ、またはサブスクリプションを監視するために、ロール割り当てのスコープの手動更新が必要になります。

##### 2.  Monitoring Reader よりも制限的なロールの割り当て

**Monitoring Reader** ロールは、リソースとサブスクリプションレベルのデータを監視するための広範なアクセス権を提供します。この読み取り専用アクセスにより、Datadog は既存の機能と新機能の両方で最高のユーザーエクスペリエンスを提供することができます。Azure AD のロールは、このアクセス権をテナントレベルの Azure AD リソースに拡張することができます。

アクセス権を Monitoring Reader ロール未満に制限すると、次のような影響があります。

  - モニタリングデータの一部または全部の消失
  - リソースメトリクス上でタグの形式をとっているメタデータの一部または全部の消失
  - [Cloud Security Misconfigurations][3] または [Resource Catalog][4] のデータが部分的または完全に失われる
  - Datadog により生成されたメトリクスの一部または全部の消失

Azure AD のロールを制限または省略すると、次のような影響があります。

  - Cloud Security Misconfigurations 内の Azure AD リソースのメタデータが部分的または完全に失われる
  - Azure AD リソースの資格情報有効期限モニタリングの一部または全部の消失

[1]: /ja/getting_started/site/
[2]: https://www.datadoghq.com/
[3]: /ja/security/cloud_security_management/misconfigurations/
[4]: /ja/infrastructure/resource_catalog/
[5]: https://us3.datadoghq.com/signup
[6]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{% /site-region %}}

## Azure のログ収集

{{% site-region region="us,us5,eu,gov,ap1,ap2" %}}

### 標準の Azure インテグレーションのログ収集
_すべての Datadog サイトで利用可能_

下の図は、Azure インテグレーションページの[ログ収集セクション][1]で説明されている、Azure から Datadog へログを転送するためのリファレンスアーキテクチャを示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="手動ログ転送の設定を示した図" >}}

### 標準の Azure インテグレーションでログを転送するための代替構成オプション

上記のデフォルトのアーキテクチャは、ほとんどのユーザーに適しています。以下のセクションでは、Azure 環境の規模と構成、および組織がこのアーキテクチャの実装に使用する方法に応じて、関連する可能性のある追加の考慮事項について詳しく説明します。

#### 提供されたテンプレートの使用

メインの Azure [ログ収集セクション][1]にある **Deploy to Azure** ボタンを使用すると、Event Hub とフォワーダー関数のペアを作成するためのテンプレートが提供されます。このテンプレートを使用して直接デプロイするだけでなく、独自の Infrastructure as Code のデプロイの出発点として、基礎となる ARM テンプレートを使用することができます。

これらのテンプレートは、アクティビティログ用のオプションの診断設定を除いて、診断設定を追加しません。Datadog は、リソースログについては、ARM テンプレートや Terraform を利用して、プログラムでリソースに診断設定を追加することを推奨します。これらの診断設定は、リソースログを Datadog に送信する必要があるすべてのリソースに追加する必要があります。

#### リージョンに関する考慮事項

診断設定は、リソースと同じリージョン内の Event Hub にのみリソースログを送信できます。リソースログを Datadog に送信したいリソースを含む各リージョンに、Event Hub とフォワーダー関数のペアを追加します。

ただし、診断設定は、リソースと同じサブスクリプション内の Event Hub にログを送信することに限定されません。Azure テナント内に複数のサブスクリプションがある場合、同じリージョン内で単一の Event Hub とフォワーダー関数を共有できます。

#### 大容量のログに関する考慮事項

ログの量が増加すると、一般的には Event Hub で、ボトルネックが発生することがあります。大量のログを送信する予定の場合は、パーティションを追加するか、Premium または Dedicated ティアの使用を検討するとよいでしょう。 ログ量が特に多い場合は、同じリージョン内に Event Hub とフォワーダー関数のペアを追加し、トラフィックを分割することを検討できます。

[1]: /ja/integrations/azure/#log-collection
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native インテグレーションのログ収集
_Datadog US3 サイトでのみ利用可能_

下の図は、Azure Native インテグレーションのログ転送構成のプロセスと、その結果として得られるアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_log_forwarding.png" alt="Azure Native ログ転送設定を示した図" >}}

Azure Native インテグレーションでは、Azure リソースやアクティビティログの Datadog への転送を実装するために、Datadog リソースの外で何かを構成する必要はありません。診断設定は、Datadog リソースで指定されたタグルールだけを使用して、構成に合わせて自動的に追加または削除されます。

**注**: 以下のように、フィルターなしでリソースログを有効にすると、すべてのリソースログを送信できます。

{{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_metrics_and_logs.png" alt="Datadog Agent のビルドを示した図" >}}

Datadog リソースによって作成された診断設定は、すべてのログカテゴリーを含み、`Send to Partner Solution` で構成され、発信元の Datadog リソースにログを送り返します。これらは、`DATADOG_DS_V2_<UNIQUE_IDENTIFIER>` という命名形式に従っています。

リソースの削除を含む手動による変更は、数分以内に元に戻されます。

Datadog リソースによって作成された診断設定の例を以下に示します。

{{< img src="integrations/guide/azure_architecture_and_configuration/diagnostic_setting.png" alt="診断設定の図" >}}

### Azure Native インテグレーションでのログ転送の代替構成オプション

Datadog リソースでログを有効にするためのワンクリックボタンは、診断設定の追加プロセスを自動化します。場合によっては、Azure Native インテグレーションによる自動ログ転送機能を利用しながら、診断設定を組織で管理・構成したい場合もあります。

手動で作成された診断設定は、Datadog リソースのログ設定に影響されず、Datadog リソースで指定されたタグルールに基づいて削除されることはありません。手動でログ転送を行うために、Datadog リソースでリソースログを有効にする必要はありません。ただし、ログ転送に使用する Datadog リソースが無効な状態であってはなりません。

診断設定を手動で管理する理由には、以下のようなものがあります。

  1. Infrastructure as Code ポリシー
       すべてのリソースを決定論的に作成および管理することを求める、IaC に関する厳格な内部ポリシー (たとえば、Datadog リソースによる診断設定の自動作成によって、希望する状態と実際の状態との間に解決不能な齟齬が発生する場合など)。

  2. リソースログカテゴリーの制限
       Datadog リソースによって自動的に作成される診断設定にはすべてのログカテゴリーが含まれるため、これらのカテゴリーの一部を指定するには、診断設定を自分で作成する必要があります。
       **注**: [除外フィルター][1]を使用して、Datadog への取り込み時にこれらのログのインデックス化を除外することもできます。

  3. クロスサブスクリプションログ転送
       クロスサブスクリプションログ転送は、特定のサブスクリプションからログを送信し、他のデータを送信しない場合に便利です。クロスサブスクリプションのログ転送を有効にするには、診断設定を作成する前に、ログを送信する各サブスクリプションに `Microsoft.Datadog` リソースプロバイダーを登録します。ログ転送に使用される Datadog リソースは、自身のサブスクリプションと、監視対象リソースのブレードを介して構成されたサブスクリプションから、引き続きメトリクスとデータを収集します。

       {{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_resource_providers.png" alt="Microsoft.Datadog のステータスが登録済みであることを示す、Azure Portal のリソースプロバイダーページのスクリーンショット。" >}}

  4. テスト
       Datadog にログのサンプルを送信することは、テストやその他の調査に役立ちます。このような場合、更新されたタグや設定から自動的に作成されるのを待つよりも、手動で診断設定を追加した方が早い場合があります。

このアーキテクチャは、オプションのクロスサブスクリプションのセットアップを含め、以下の通りです。

{{< img src="integrations/guide/azure_architecture_and_configuration/custom_azure_native_log_forwarding.png" alt="Azure Native ログ転送のカスタム設定を示した図" >}}

[1]: /ja/logs/log_configuration/indexes/#exclusion-filters
{{% /site-region %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/