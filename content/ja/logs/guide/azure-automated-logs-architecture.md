---
description: Datadog の Azure インテグレーションにおける自動ログ転送セットアップのアーキテクチャと構成ガイド
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: ドキュメント
  text: Azure インテグレーション
private: true
title: Azure 自動ログ転送のアーキテクチャと構成
---

## 概要

Datadog の Azure インテグレーション用自動ログ転送セットアップは、他のセットアップ方法と比べて以下の利点があります:

- **セットアップの簡素化**: すべてのサブスクリプションおよびリージョンにわたる必要な Azure インフラストラクチャーを簡単に構築でき、数分で Azure 環境全体からのログ転送を開始できます。今後新たに追加されるリソースについても、自動的に Datadog へのログ転送が設定されます。

- **自動スケーリング**: Azure 環境におけるログ量に合わせて動的にスケールし、需要に応じて新しいログフォワーダーを起動し、需要が落ち着くと自動的に削除されます。

- **Azure コストの削減**: よりコスト効率の高い Azure サービスを使用し、さらにログ量が少ない期間にはスケールダウンを行うことで、Azure の利用料金を抑えられます。

このログ転送方法は、すべての [Datadog サイト][5]およびほとんどの Azure リージョン (Container Apps をサポートする任意のリージョン) で利用できます。Datadog は、この方法による Azure 環境からのログ転送設定を推奨しています。

### サポートされるログ

このセットアップは、アクティビティログやリソースログなど、診断設定から利用できるすべてのログ転送をサポートします。プラットフォーム以外のログに関しては、Datadog は [Datadog Agent][6] を使用してログを転送することを推奨しています。

## アーキテクチャ

### 使用されるサービス

1. [Azure Function][7] アプリは、Azure サブスクリプション内のリソースを検出し、ログフォワーダーのスケーリングを行い、検出されたリソースに対して診断設定を構成します。
2. [Azure Container Apps][8] は、診断設定によって生成されたリソースログを収集し、すでに処理済みのログを追跡し、Datadog に送信します。
3. [Azure Storage Accounts][9] は、リソースによって生成されたログおよびサブスクリプション ID、リソース ID、リージョンなどのメタデータを一時的に保存する小規模なキャッシュとして使用されます。

### ハイレベルアーキテクチャ

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture.png" alt="自動ログ転送セットアップのハイレベルな構成図" style="width:100%">}}

デプロイテンプレートは、選択したサブスクリプションに[コントロールプレーン](#control-plane)と[ログフォワーダー](#log-forwarders)を構成します。

#### コントロールプレーン

コントロールプレーンは、Azure Function アプリ群とキャッシュ用のストレージアカウントで構成されます。1 つのコントロールプレーンが、選択したサブスクリプションにデプロイされ、以下のタスクを実行します:
- 選択したサブスクリプションにおいて、診断設定を通じてログを出力可能なリソースを検出
- 検出したリソースに対して診断設定を自動的に構成し、ログフォワーダーが監視するストレージアカウントにログを送るように設定
- リソースが存在するリージョンでログフォワーダーをスケーリングし、ログ量に合わせて動的に対応

#### ログフォワーダー

ログフォワーダーは、Azure Container Apps のジョブとログ用のストレージアカウントで構成されます。これらは、ログ転送を行う対象として選択された各サブスクリプションに対し、コントロールプレーンによってデプロイされます。サブスクリプションごとにデプロイされるログフォワーダーの数は、リソースによって生成されるログ量に応じてスケールします。ログフォワーダーは以下のタスクを実行します:
- リソースの診断設定から生成されるログを一時的にストレージアカウントに保存
- 保存されたログを処理し、Datadog に転送

Azure では、リソースの診断設定は同じリージョンにあるストレージアカウントしか指定できません。そのため、診断設定を持つリソースがある各リージョンでログフォワーダーが起動されます。

詳細は、Azure の [Azure モニターの診断設定][13]を参照してください。

### 詳細アーキテクチャ

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="自動ログ転送セットアップの詳細な構成図" style="width:100%">}}

## セットアップ

セットアップは [Azure Resource Manager][1] (ARM) テンプレートを使用して行います。これにより、同じテンプレートを再デプロイすることで API キーや Datadog サイト、監視対象のサブスクリプションなどの構成オプションを更新できます。

ARM テンプレートを開くと、ログ転送を自動化したいマネジメントグループ、リージョン、サブスクリプションを選択できます。その後テンプレートがコントロールプレーンをデプロイし、選択した各サブスクリプションにログフォワーダーを展開します。

Azure ポータルから [ARM テンプレート][3] をデプロイする手順の詳細は[Azure 自動ログ転送セットアップガイド][2]を参照してください。

## セキュリティと権限

ARM テンプレートは、フォワーダーの管理とリソースへの診断設定を行うために必要な権限だけをコントロールプレーンに付与します。これを実現するため、ARM テンプレートのデプロイ時にリソースグループが作成され、必要な権限が付与されます。その後、追加のサブスクリプションに対して権限を付与したい場合は、同じ ARM テンプレートを再デプロイできます。

### 使用される権限

- 選択したサブスクリプションの**サブスクリプションレベル**における [Monitoring Contributor][10] ロール
   - 診断設定が利用できるリソースを検出し、ストレージへのログ出力を有効にするために必要です。

- 選択したサブスクリプション内のログ転送用リソースグループにおける**リソースグループレベル**の [Contributor][11] ロール
   - フォワーダーのストレージ アカウントや Container Apps ジョブの作成・削除などを管理するために必要です。

- コントロールプレーン用リソースグループにおける **[Website Contributor][12] ロール**。コントロールプレーンの Function Apps を更新するために必要です。

リソースに関する情報はエクスポートされません。Datadog はログ出力を有効にするために必要な情報のみを要求し、このアーキテクチャからの唯一の出力は Datadog に送信されるログのみです。

**注**: 必要に応じて、コントロールプレーンの稼働状況を示すメトリクスやログ、イベントを生成し、デバッグ目的で Datadog に送信することができます。これはフィーチャーフラグで有効化します。

## ヘルプとフィードバック

ヘルプやフィードバックが必要な場合は、[azure-log-forwarding@datadoghq.com][4] までご連絡ください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/azure/azure-resource-manager/management/overview
[2]: /ja/logs/guide/azure-automated-log-forwarding/
[3]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2FcreateUiDefinition.json
[4]: mailto:azure-log-forwarding@datadoghq.com
[5]: /ja/getting_started/site/
[6]: /ja/agent/logs/
[7]: https://learn.microsoft.com/azure/azure-functions/
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings