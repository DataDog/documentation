---
aliases:
- /ja/integrations/guide/azure-architecture-and-configuration/
- /ja/integrations/guide/powershell-command-to-install-azure-datadog-extension/
- /ja/integrations/guide/azure-vms-appear-in-app-without-metrics/
- /ja/integrations/guide/azure-troubleshooting/
- /ja/integrations/guide/powered-down-azure-vm-on-infrastructure-list/
- /ja/integrations/guide/azure-count-metric/
- /ja/integrations/guide/azure-status-metric
- /ja/integrations/faq/azure-vm-status-is-not-reporting
- /ja/integrations/faq/azure-status-metric
- /ja/integrations/faq/azure-count-metric
- /ja/integrations/faq/azure-troubleshooting
- /ja/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
- /ja/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
- /ja/integrations/faq/powershell-command-to-install-azure-datadog-extension
description: Datadog Azure インテグレーションの高度な構成とアーキテクチャ
further_reading:
- link: /integrations/azure/
  tag: ドキュメント
  text: Azure インテグレーション
title: Azure の高度な構成
---
## 概要{#overview}

このガイドでは、Datadog の Azure インテグレーションを構成するユーザー向けの高度な構成オプションとリファレンスアーキテクチャ、および特定のユースケースを対象とした代替構成オプションについて説明します。

### リファレンスアーキテクチャ {#reference-architectures}

このガイドの図は、[Azure の概要][1]の手順に従った場合の構成プロセスと結果を視覚的に表現したものです。このガイドでは、Datadog と Azure 環境の相互作用についての詳細な概要と、セキュリティ、コンプライアンス、ガバナンスに関する一般的な質問に対する回答を説明します。

### 代替構成 {#alternate-configurations}

[Azure の概要][1]に記載されているセットアッププロセスは推奨される手順であり、大多数のユーザーにとって理想的な構成が実現します。特定のユースケースでは、このドキュメントの代替構成オプションの方が適していることがあります。パフォーマンス、機能、または管理の容易さに関するトレードオフについては、必要に応じて簡単に説明しています。

## メトリクスとデータの収集 {#metric-and-data-collection}

Datadog の Azure インテグレーションを有効にすると、Datadog で次のことが可能になります。

  - 指定されたスコープ内のすべてのサブスクリプションのすべてのリソースを検出、監視する。
  - 検出されたメトリクス定義を自動的に更新し、Azure Monitor から利用可能なすべてのメトリクスが収集されるようにする。
  - 一般的なメタデータとリソース固有のメタデータの両方 (カスタム Azure タグを含む) を広範に取り込み、Datadog の関連リソースメトリクスにタグとして適用する。
  - Azure メタデータ API にクエリを発行し、そのレスポンスを使用して [Datadog で有用なメトリクスを生成][2]し、Azure Monitor がサポートしていないインサイトを得る。

インテグレーションの標準版と Azure Native 版のどちらを使用しても、使用される Azure API と収集されるデータは同じです。

下の図は、[Azure の概要][1]で説明されている Azure インテグレーションの構成プロセスとその結果として得られるアーキテクチャの概要を示しています。

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Azure アプリ登録インテグレーションのセットアップを示すワークフロー図: Azure でサービスプリンシパルとクライアントシークレットを使用してアプリ登録を作成し、サブスクリプションまたは管理リソースに Monitoring Reader ロールを割り当て、Datadog バックエンドでメトリクスタグフィルターを使用してインテグレーションを構成します。" >}}

これが完了すると、データ収集が自動的に開始されます。アプリ登録により、Datadog は [Azure Active Directory (AD) からトークンを要求][3]できるようになります。Datadog はさまざまな Azure API への API 呼び出しの認証としてこのトークンを使用し、指定されたスコープ内のリソースを検出してデータを収集します。この継続的なプロセスは Azure 環境からデータを検出および収集するために使用され、デフォルトでは 2 分間隔で実行されます。データ収集プロセスを以下に示します。

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Azure メトリクス収集プロセスを示すワークフロー図: Datadog バックエンドが構成を読み取り、サービスプリンシパルを通じて Azure Active Directory で認証を行い、RBAC 権限を使用してサブスクリプションとリソースのメタデータを収集し、タグでリソースをフィルタリングします。その後 Azure Monitor からメトリクスを取得して Datadog に取り込みます。" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
上記のメトリクスおよびログの収集図では、クライアントシークレットによる認証を使用しています。**シークレットレス認証**を使用すると、アプリ登録は Azure フェデレーション資格情報と OpenID Connect (OIDC) ワークロードアイデンティティフェデレーションを介して Datadog の ID を信頼します。これは、保存されているクライアントシークレットを置き換えます。既存のアプリ登録をシークレットレス認証に移行するには、[既存のアプリ登録をシークレットレス認証に移行](/getting_started/integrations/azure/#secretless-migration-setup)を参照してください。
{{< /site-region >}}

## ログ収集 {#log-collection}

以下の図は、[自動ログ転送][29]を使用して Azure から Datadog にログを転送するためのリファレンスアーキテクチャを示しています。選択したサブスクリプションにデプロイされているコントロールプレーンがリソースを検出し、その診断設定を構成します。ログフォワーダーは Azure Container Apps ジョブとストレージアカウントで構成されています。ログフォワーダーは、リソースがログを生成する各リージョンにデプロイされ、ログボリュームに合わせてスケールアップまたはスケールダウンします。

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Azure 自動ログ転送のワークフロー図: コントロールプレーンがリソースを検出し、リージョン全体にログフォワーダーをスケールし、診断設定を構成してログをストレージアカウントに送信します。その後。Container Apps が新しいログをチェックして Datadog Log Management に転送します。" style="width:100%">}}

セットアップ手順については、[Azure 自動ログ転送のセットアップガイド][29]を参照してください。

{{% collapse-content title="Event Hub ログ転送 (レガシー)" level="h3" expanded=false id="legacy-event-hub-log-forwarding" %}}

以下のリファレンスアーキテクチャは、既存の Event Hub ログ転送セットアップに適用されます。新規デプロイメントの場合は、代わりに[自動ログ転送][29]を使用してください。

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="2 つのリージョンにまたがる手動 Azure ログ転送セットアップを示すアーキテクチャ図。2 つのリージョンでは Azure リソースが診断設定を使用して Event Hubs および Log Forwarding Functions 経由でログを Datadog Logs Ingestion に送信します。" >}}

#### 提供されたテンプレートの使用{#using-the-provided-templates}

メインの Azure [Event Hub ロギングガイド][13]にある [**Deploy to Azure (Azure にデプロイする)**] ボタンは、Event Hub と転送関数のペアを作成するためのテンプレートを提供します。このテンプレートを使用した直接デプロイの他に、基盤となる ARM テンプレートを独自の Infrastructure as Code デプロイメントの開始点として使用できます。

これらのテンプレートは、アクティビティログ用の 1 つのオプション診断設定以外には診断設定を追加しません。リソースログについては、ARM テンプレートまたは Terraform を使用して、リソースに診断設定をプログラムで追加することが推奨されます。これらの診断設定は、リソースログを Datadog に送信する必要があるすべてのリソースに追加する必要があります。

#### リージョンに関する考慮事項 {#region-considerations}

診断設定では、リソースログをリソースと同じリージョンにある Event Hubs にのみ送信できます。Datadog にリソースログを送信するリソースが含まれる各リージョンに、Event Hub とフォワーダー関数のペアを追加します。

ただし診断設定は、リソースと同じサブスクリプションにある Event Hubs へのログ送信に限定されません。Azure テナント内にある複数のサブスクリプションは、同じリージョン内の単一の Event Hub とフォワーダー関数を共有できます。

#### 大容量のログに関する考慮事項{#high-volume-log-considerations}

ログの量が増加するにつれて、ボトルネックが発生する可能性があります。ボトルネックは一般に Event Hubs で発生します。大量のログを送信する予定がある場合は、パーティションを追加するか、Premium または Dedicated レベルを使用することを検討してください。
特にログの量が多い場合は、同じリージョン内に Event Hub とフォワーダー関数のペアを追加し、それらの間でトラフィックを分割することを検討してください。

{{% /collapse-content %}}

{{% collapse-content title="Azure Datadog 拡張機能をインストールするコマンド" level="h3" expanded=false id="azure-datadog-extension-commands" %}}
## Azure にインストールする {#install-on-azure}

Datadog は、Azure インスタンスへの Agent デプロイを支援する Azure 拡張機能を提供しています。

* [ワンクリックで Datadog をデプロイできる Azure モニタリングのご紹介][6]
* [Azure インテグレーション][10] _すべてのサイト_
* [Azure Native インテグレーション][7] _US3 のみ_

GUI インストールの代替手段として、コマンドラインを使用できます。

Azure インスタンスで Datadog Agent を拡張機能として実行するには、ご使用の環境に対応するコマンドを使用しています。`<SITE_PARAMETER>` を [Datadog サイトページ][33]の Datadog アカウント**サイトパラメーター**値に置き換え、`<DATADOG_API_KEY>` を [Datadog API キー][9]に置き換えてください。
   **注**: Agent バージョン 7 以降をインストールするには、Python 3.9 以降が必要です。

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Azure インスタンス拡張機能を設定するための構文の詳細は、[Azure Extension Set-AzVMExtension ドキュメント][100]に記載されています。

Azure 拡張機能は、通常の設定と保護された設定の両方を受け入れることができます。

通常の設定は以下の通りです。

| 変数 | 型 | 説明|
|----------|------|--------------|
| `site` | 文字列 | Datadog の取り込みサイトを設定します。例: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 文字列 | インストールする Agent のバージョン。形式は `x.y.z` または `latest` です。|
| `agentConfiguration` | URI | (オプション) Agent の構成が ZIP ファイルとして格納されている Azure blob の URI。|
| `agentConfigurationChecksum` | 文字列 | Agent 構成 ZIP ファイルの SHA256 チェックサム。`agentConfiguration` が指定されている場合は必須です。|

保護されている設定は以下の通りです。

| 変数 | 型 | 説明|
|----------|------|--------------|
| `api_key`| 文字列 | Datadog API キーを構成ファイルに追加します。|

**注**: `agentConfiguration` と `api_key` を同時に指定した場合、`agentConfiguration` に記述されている API キーが優先されます。ターゲットマシンに API キーが設定されている場合、`Set-AzVMExtension` で API キーを変更できないことに注意してください。

### 構成 URI の指定 {#specify-a-configuration-uri}

この例では、Datadog Agent が使用する構成を指定する方法を示します。
Datadog Agent の構成 URI は、Azure の blob ストレージの URI である必要があります。
Datadog Windows Agent Azure 拡張機能は、`agentConfiguration` URI が `.blob.core.windows.net` ドメインからのものであることを確認します。
Datadog Agent 構成は `%PROGRAMDATA%\Datadog` フォルダから作成する必要があります (利用可能なすべての構成オプションについては、[Windows 用の Agent コンフィギュレーションファイルの例][101]を参照してください)。

<div class="alert alert-info">
既存の Agent の構成を再利用するには:

   1. 既存の Agent のフォルダから余分なインストール成果物やファイルを削除して、 <code>%ProgramData%\Datadog</code> このフォルダに <code>datadog.yaml</code> ファイルと、インテグレーション構成を含む <code>conf.d</code> フォルダのみが含まれるようにします。
   1. サニタイズ済みの <code>%ProgramData%\Datadog</code> フォルダを ZIP ファイルとして保存します。
</div>

#### Agent コンフィギュレーションファイルから SHA256 チェックサムを生成する {#generate-a-sha256-checksum-from-the-agent-configuration-file}

{{< code-block lang="powershell" >}}
Get-FileHash -Path "C:\path\to\yourfile.zip" -Algorithm SHA256
{{< /code-block >}}

#### カスタム構成で Agent をインストールする {#install-the-agent-with-your-custom-configuration}

VM 拡張機能を作成するには、`agentConfiguration` パラメーターで blob ストレージ URL を、`agentConfigurationChecksum` パラメーターでチェックサムを参照します。

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**注**: Datadog Agent をインストールした後では、新しいバージョンにアップグレードするときにのみ構成を変更できます。

### 特定の Agent のバージョンを設定する{#set-a-specific-version-of-the-agent}

この例は、インストールする Agent のバージョンを指定する方法を示しています。デフォルトでは、Datadog Windows Agent Azure 拡張機能は最新バージョンの Datadog Agent をインストールします。

**注**: ダウングレードはサポート*されていません*。そのため、ターゲットマシンに現在インストールされている Datadog Agent のバージョンよりも*低い*バージョンの Datadog Agent をインストールすることはできません。Datadog Agent の下位バージョンをインストールするには、ターゲットマシン上の Datadog Windows Agent Azure 拡張機能を削除して、以前のバージョンを最初にアンインストールしてください。Datadog Windows Agent Azure 拡張機能を削除しても、Datadog Agent の構成は削除されません。

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[100]: https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension
[101]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

Azure インスタンス拡張機能を設定するための構文の詳細は、[Azure Extension CLI リファレンス][200]に記載されています。

Azure 拡張機能は、通常の設定と保護された設定の両方を受け入れることができます。

通常の設定は以下の通りです。

| 変数 | 型 | 説明|
|----------|------|--------------|
| `site` | 文字列 | Datadog の取り込みサイトを設定します。例: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 文字列 | インストールする Agent のバージョン。形式は `x.y.z` または `latest` です。|
| `agentConfiguration` | URI | (オプション) Agent の構成が zip ファイルとして格納されている Azure blob の URI。|
| `agentConfigurationChecksum` | 文字列 | Agent 構成 ZIP ファイルの SHA256 チェックサム。`agentConfiguration` が指定されている場合は必須です。|

保護されている設定は以下の通りです。

| 変数 | 型 | 説明|
|----------|------|--------------|
| `api_key`| 文字列 | Datadog API キーを構成ファイルに追加します。|

**注**: `agentConfiguration` と `api_key` を同時に指定した場合、`agentConfiguration` に記述されている API キーが優先されます。ターゲットマシンに API キーが設定されている場合、`api_key` で API キーを変更することはできません。

### 構成 URI の指定 {#specify-a-configuration-uri-1}

この例では、Datadog Agent が使用する構成を指定する方法を示します。
- Datadog Agent の構成 URI は、Azure の blob ストレージの URI である必要があります。
- Datadog Linux Agent Azure 拡張機能は、`agentConfiguration` URI が `.blob.core.windows.net` ドメインからのものであることを確認します。
- Datadog Agent 構成は `/etc/datadog-agent/` フォルダから作成する必要があります (利用可能なすべての構成オプションについては、[Windows 用の Agent コンフィギュレーションファイルの例][201]を参照してください)。

<div class="alert alert-info">
既存の Agent の構成を再利用するには、その <code>/etc/datadog-agent</code> フォルダを ZIP ファイル

<code>zip -r datadog_config.zip /etc/datadog-agent</code>として保存します。
</div>

#### Agent コンフィギュレーションファイルから SHA256 チェックサムを生成する {#generate-a-sha256-checksum-from-the-agent-configuration-file-1}

{{< code-block lang="shell" >}}
sha256sum <YOUR_FILENAME>.zip
{{< /code-block >}}

#### カスタム構成で Agent をインストールする {#install-the-agent-with-your-custom-configuration-1}

VM 拡張機能を作成するには、`agentConfiguration` パラメーターで blob ストレージ URL を、`agentConfigurationChecksum` パラメーターでチェックサムを参照します。

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[200]: https://learn.microsoft.com/cli/azure/vm/extension
[201]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Azure Arc にインストールする{#install-on-azure-arc}

[Azure Arc][11] インスタンスで Datadog Agent を拡張機能として実行するには、ご使用の環境に対応するコマンドを使用します。

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Azure `connectedmachine` 拡張機能を設定するための構文の詳細については、[az connectedmachine 拡張機能][12]ページに記載されています。
{{% /collapse-content %}} 

{{% collapse-content title="Azure カウントメトリクス" level="h3" expanded=false id="azure-count-metrics" %}}
Datadog は、[Azure インテグレーション][23]で監視される各リソースに対して、追加のメトリクス `azure.*.count` を生成します。たとえば、Datadog で監視している Azure 仮想マシンは `azure.vm.count` を報告します。

`azure.*.count` メトリクスは、非推奨となった `azure.*.status` を改善したものです。

## カウントメトリクス {#count-metric}

`azure.*.count` メトリクスは、2 つの基本的な情報を提供します。

- そのタイプのリソースの数。
- Azure から報告された各リソースのステータス。

`azure.*.count` メトリクスは、そのリソースタイプの他のメトリクスと同じネームスペースに作成されます (例: `azure.network_loadbalancers.count`)。そのネームスペース内の他のメトリクスと同じメタデータタグをすべて含み、さらに `status` のタグが追加されます。

### ユースケース {#use-cases}

`azure.*.count` メトリクスを使用して、次のことを行います。

- すべてに対する `azure.vm.count` をグラフ化し、`status` で合計することで、時間経過に対する仮想マシンの数をステータス別に表示するビューを作成します。
- ダッシュボードにクエリウィジェットを作成し、指定されたリソースタイプの数を表示します。利用可能なタグを使用して、リージョン、リソースグループ、種類、ステータスなど、関連する集計にカウントをスコープします。
- さまざまな Azure リソースのステータスをアラートするためのモニターを作成します。

**注**: デフォルトの視覚化設定により、チャートやクエリウィジェットでリソースが断続的にダブルカウントされているように見える場合があります。これは、特定のステータスにスコープされたモニターまたはウィジェットには影響しません。
Interpolation > none を設定してチャートやクエリウィジェットで[補間][22]をオフにするか、`.fill(null)` を使用すると、この効果を減らすことができます。

ほとんどのリソースタイプで、可能性のあるステータスは次のとおりです。

- Running
- Unavailable
- Unknown
- Degraded
- Failed

仮想マシンには、より詳細なステータスがあります。

- Running
- Stopped_deallocated
- Stopped
- Unknown
- Unavailable
- Degraded
- Failed

`query_failed` というステータスが表示された場合、Azure の Resource Health プロバイダーを有効化する必要があります。
{{% /collapse-content %}} 

## Azure インテグレーションのトラブルシューティング {#azure-integration-troubleshooting}

{{% collapse-content title="テナント名の検索" level="h3" expanded=false id="troubleshooting-find-your-tenant-name" %}}
1. [portal.azure.com][24] に移動します。
2. 左側のサイドバーで [**Azure Active Directory**] を選択します。
3. [**Basic information**] の下にある [**Name**] 野の値を探します。
{{% /collapse-content %}} 

{{% collapse-content title="ログインできない" level="h3" expanded=false id="troubleshooting-unable-to-login" %}}
Azure インテグレーションをインストールしようとしてログインエラーが発生した場合は、[Datadog サポート][36]にお問い合わせください。可能であれば、スクリーンショットを添付してください。
{{% /collapse-content %}} 

{{% collapse-content title="メトリクスがない" level="h3" expanded=false id="troubleshooting-missing-metrics" %}}
監視するサブスクリプションの Azure アプリケーションに読み取り権限を与えるなど、インストールプロセスが完了したことを確認します。

ARM でデプロイされた仮想マシンの場合は、診断をオンにし、収集したい VM のメトリクスを選択する必要もあります。手順については、以下の**診断の有効化**を参照してください。

その他の欠落したメトリクスについては、メトリクスに関する以下の情報を添えて、[Datadog サポート][36]にお問い合わせください。
- ディメンション
- リソースグループ
- リソース名
- サブスクリプション ID またはサブスクリプション名 

Azure Monitor からメトリクスのグラフが表示されるスクリーンショットを添付してください。**重要**: スクリーンショットでは、1 分間のデータポイントをグラフ化してください。

#### 診断の有効化 {#enable-diagnostics}

診断をオンにすると、ARM にデプロイされた VM は、CPU、ネットワークなどのメトリクスを含むログ情報を収集することができます。以下の手順に従ってください。

1. [Azure ポータル][24]に移動して、VM を探します。
2. [**Monitoring**] セクションの下にある [**Diagnostics settings**] をクリックします。
3. ストレージアカウントを選択し、[**Enable guest-level monitoring**] をクリックします。
4. デフォルトでは、基本的なメトリクスとログが有効になっています。必要に応じて調整してください。
5. [**Save**] をクリックして、変更内容を保存します。

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="azure diagnostics settings overview が表示され、No storage account が Pick storage account の下にハイライトされ、enable guest level monitoring が有効になっている" style="width:70%">}}
{{% /collapse-content %}} 

{{% collapse-content title="Azure と Datadog でデータの不一致があるように見える" level="h3" expanded=false id="troubleshooting-metric-discrepancy" %}}
Datadog の Azure インテグレーションは、[Azure Monitor][27] からすべてのメトリクスを収集します。メトリクスは、利用可能なすべてのディメンション (Datadog ではタグにマッピングされている)、最高の時間粒度、およびプライマリ集計タイプで収集されます。

以下のセクションでは、注意すべき 2 つの重要な違いと、[不一致を解消する](#reconcile-the-discrepancy)手順について説明します。

#### 1. 時間集計 {#1-time-aggregation}

Datadog は、Azure で選択された時間枠に関係なく、Azure からの生データを秒単位の値で表示します。そのため、Datadog の値が Azure に表示される値よりも低く示されることがあります。詳細については、メトリクスドキュメントの[時間集計][15]を参照してください。

#### 2. スペース集計 {#2-space-aggregation}

Datadog の[スペース集計][28]は、Azure Monitor でのメトリクスの[プライマリ集計タイプ][17]に対応しています。プライマリ集計タイプは、Azure の [Metric Definitions - List][16] API のフィールド`primaryAggregationType` で確認できます。

#### 不一致を解消する {#reconcile-the-discrepancy}

1. [Azure Monitor Metrics Explorer][18] でメトリクスをグラフ化するか、Azure のリソースに移動して左側のパネルで [**Monitoring**] をクリックし、次に [**Metrics**] をクリックします。
2. [Datadog Metrics Explorer][31] でメトリクスをグラフ化します。
3. Azure のクエリが Datadog のクエリに同一の方法でスコープされていることを確認します。
   - Azure メトリクスクエリで使用されるディメンションは、Datadog メトリクスクエリで使用されるタグと一致している必要があります。
   - クエリで使用されるプライマリ集計タイプは、Datadog の[スペース集計][28]と一致している必要があります。
   - 時間枠は、Datadog Metrics Explorer の時間枠と一致している必要があります
4. グラフ上のデータポイントにカーソルを合わせると、タイムスタンプと値が表示されます。

{{< img src="integrations/guide/azure_advanced_configuration/azure_metric_explorer.png" alt="Azure Metrics Explorer でグラフ上のポイントにカーソルを合わせ、メトリクス値とタイムスタンプが強調表示されている様子" >}}

5. Datadog グラフで同じ時点を見つけ、値を比較します。値が等しい場合、元の不一致は 2 つのグラフ間の時間集計またはスペース集計のいずれかの違いによるものです。
{{% /collapse-content %}} 

### ログ収集のトラブルシューティング{#log-collection-troubleshooting}

ログ転送の問題をトラブルシューティングするには、まず[一般的なトラブルシューティングのセクション](#general-troubleshooting-applicable-to-all-setup-methods)から始めてください。これらの手順で問題が解決しない場合は、以下のセットアップ固有のガイダンスを参照してください。

- [自動](#automated-log-forwarding-troubleshooting)
- [Blob Storage](#blob-storage-log-forwarding-troubleshooting)
- [Native インテグレーション](#azure-native-integration-log-forwarding-troubleshooting)
- [Event Hub](#event-hub-log-forwarding-troubleshooting)

#### すべてのセットアップ方法に適用される一般的なトラブルシューティング {#general-troubleshooting-applicable-to-all-setup-methods}

1 日のログ割り当てを超過:
: ログ保持の [1 日の割り当て][20]を超えていないことを確認します。

除外フィルターによるログの除外:
: ログが[除外フィルター][38]によって除外されていないことを確認します。

ログの検索に使用された構文が正しくない:
: 正しい[検索構文][34]を使用していること、および検索に正しい属性またはタグが含まれていることを確認します。

診断設定が存在しない:
: Datadog に送信するリソース、アクティビティログ、および Entra ID ログに[診断設定][8]が追加されていることを確認します。

**注**: Entra ID ログはクエリ `source:azure.activedirectory` で検索できます。

#### 自動ログ転送のトラブルシューティング {#automated-log-forwarding-troubleshooting}

{{% collapse-content title="名前の競合を確認する" level="h5" expanded=false id="troubleshooting-logs-naming-conflicts" %}}
既定のパラメーターと同じリソース名を持つ Azure リソースがある場合、名前の競合が発生する可能性があります。Azure では、個々のサブスクリプション内で複数のリソースがリソース名を共有することは許可されていません。既定のパラメーターの名前を変更し、環境内にまだ存在しない一意の名前にすることが推奨されます。

**注**: このエラーが原因でテンプレートを再実行する場合は、リソース グループ全体を削除して新規にデプロイを作成することも推奨されます。
{{% /collapse-content %}} 

{{% collapse-content title="リソースプロバイダーが登録されていることを確認する" level="h5" expanded=false id="troubleshooting-logs-unregistered-resource-provider" %}}
テンプレートのデプロイが、エラー `The subscription is not registered to use namespace 'Microsoft.EventHub'` が原因で失敗している場合:

Azure には、Azure Event Hubs の `Microsoft.EventHub` など、各サービスに対するリソースプロバイダーがあります。必要なリソースプロバイダーに Azure サブスクリプションが登録されていない場合、スクリプトは失敗します。

この問題を解決するには、適切なリソースプロバイダーに登録します。以下のコマンド例を CloudShell で実行します。ここで <RESOURCE_PROVIDER_NAME>をリソースプロバイダー名 (例: `Microsoft.EventHub`) に置き換えてください。

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="DD_SITE と DD_API_KEY の値を確認します。" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-alf" %}}
すべてのログが欠落している場合は、[Datadog サイト][33]と API キーを確認してください。

1. 自動ログ転送リソースがデプロイされているリソースグループで、**[Settings] (設定) > [Deployments] (デプロイメント)** に移動します。
2. 最新のデプロイメントを選択します。
3. [**Redeploy**] (再デプロイ) をクリックして、値を確認および変更します。
{{% /collapse-content %}} 

{{% collapse-content title="ストレージアカウントコンテナにログが存在することを確認する" level="h5" expanded=false id="troubleshooting-logs-verify-logs-in-storage-account" %}}
Azure リソースログがない場合は、リソースのリージョン内にある ARM デプロイ済みのストレージアカウントを見つけ、期待されるログが含まれているコンテナを確認してください。
{{% /collapse-content %}} 

{{% collapse-content title="フォワーダージョブの containerAppConsole ログを調べる" level="h5" expanded=false id="troubleshooting-logs-inspect-forwarder-job-logs" %}}
[Container App Console ログ][32]は、アプリケーションのエラーや例外を診断するのに役立ちます。このログを調べるには、ログが欠落しているリソースと同じリージョンにある Container Apps 環境内でロギングを有効にします。
{{% /collapse-content %}} 

**注**: 自動ログフォワーダーを使用してログを送信する場合は、Microsoft Entra 診断設定を手動で構成する必要があります。詳細については、[アクティビティログについて Microsoft Entra 診断設定を構成する][14]を参照してください。

#### Blob Storage ログ転送のトラブルシューティング {#blob-storage-log-forwarding-troubleshooting}

{{% collapse-content title="DD_SITE と DD_API_KEY の値を確認します。" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
すべてのログが欠落している場合は、以下のことを確認してください。
   - [選択されている Datadog サイト][33]が正しいこと
   - 構成された [API キー][9]が正しい Datadog オーガニゼーションのものであること
{{% /collapse-content %}} 

{{% collapse-content title="フォワーダーの構成を確認する" level="h5" expanded=false id="troubleshooting-logs-verify-forwarder-config" %}}
フォワーダーが最新バージョンを使用しており、Windows OS 上で Node.js 22 LTS 以降を実行していることを確認します。コードは [index.js][19] で公開されています。
{{% /collapse-content %}} 

{{% collapse-content title="Blob トリガーを調べる" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-trigger" %}}
Blob Storage トリガーが以下のオプションで構成されていることを確認します。

- **Binding Type (バインドタイプ)**: `Azure Blob Storage`
- **Blob parameter name (Blob パラメーター名)**: `blobContent`
- **パス**: ストレージアカウント内のログデータのパス
- **Storage account connection (ストレージアカウント接続)**: ストレージアカウント接続文字列を含むアプリケーション設定の名前
{{% /collapse-content %}} 

{{% collapse-content title="Blob Storage メトリクスを調べる" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-metrics" %}}
Blob Storage がデータを受信していることを確認する
: `azure.storage_storageaccounts_blobservices.ingress`

Blob Storage がデータを送信していることを確認する
: `azure.storage_storageaccounts_blobservices.egress` 

Blob Storage へのリクエストが成功していることを確認する
: `azure.storage_storageaccounts_blobservices.transactions`

`azure.storage_storageaccounts_blobservices.transactions` メトリクスについては、以下のメトリクスクエリを使用して、成功または失敗した `PUT` 操作の数をそれぞれ確認できます。

   - `azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
   - `azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`
{{% /collapse-content %}} 

{{% collapse-content title="関数メトリクスを調べる" level="h5" expanded=false id="troubleshooting-logs-inspect-function-metrics-bs" %}}
以下のメトリクスを調べて、関数アプリで実行の問題、データの受信または送信の問題、あるいはエラーステータスコードが発生しているかどうかを確認します。

関数がデータを受信していることを確認します。
: `azure.functions.bytes_received`

関数がデータを送信していることを確認します。
: `azure.functions.bytes_sent`

関数のリクエストが成功ステータスコードを受け取っていることを確認する
: `azure.functions.http2xx`

関数のリクエストがエラーステータスコードを受け取っていないことを確認する
: `azure.functions.http4xx`
: `azure.functions.http5xx`
{{% /collapse-content %}} 

{{% collapse-content title="診断設定がリソースまたはアクティビティログに自動的に追加されない" level="h5" expanded=false id="troubleshooting-logs-diagnostic-settings-not-added" %}}

診断設定がリソースまたはアクティビティログに自動的に追加されていない場合は、以下を確認してください。
   - [診断設定の最大数][25]に達している
   - 変更を阻止するロックがリソースに存在している
{{% /collapse-content %}} 

**注**: 新しいログが Blob Storage ファイルに追加されると、関数がトリガーされ、新しい追加分だけでなくファイルの内容全体が送信されます。

#### Azure Native インテグレーションのログ転送のトラブルシューティング {#azure-native-integration-log-forwarding-troubleshooting}

{{% collapse-content title="リソースログのタグルールを確認する" level="h5" expanded=false id="troubleshooting-logs-check-resource-logs-tag-rules" %}}
Datadog リソース構成のタグルールが、リソースログに設定されているタグと一致していることを確認します。

タグルールに問題がない場合は、[Datadog サポート][36]に連絡し、以下の情報を提供してください。
   - **テナント ID**: [**Basic information (基本情報)**] にあるテナント ID 値 nn Entra ID を確認します。
   - **Subscription ID (サブスクリプション ID)**: ログが欠落しているサブスクリプションのサブスクリプション ID
   - **Datadog Resource ID (Datadog リソース ID)**: Datadog リソースブレードの**[Settings (設定)] > [Properties (プロパティ)]** に移動して、Datadog リソース ID を確認します。リソース ID の形式: `/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/<DATADOG_RESOURCE_NAME`
   - **Resource ID (リソース ID)**: Web アプリやデータベースなど、ログが欠落しているリソースのリソース ID
{{% /collapse-content %}} 

**注**: Azure で Datadog リソースを使用してログを送信する場合、Entra ID の診断設定を手動で設定する必要があります。

#### Event Hub ログ転送のトラブルシューティング {#event-hub-log-forwarding-troubleshooting}
   
{{% collapse-content title="リソースプロバイダーが登録解除されているかどうかを確認する" level="h5" expanded=false id="troubleshooting-logs-check-resource-provider-registration" %}}

テンプレートのデプロイが、エラー `The subscription is not registered to use namespace 'Microsoft.EventHub'` が原因で失敗している場合:

Azure には、Azure Event Hubs の `Microsoft.EventHub` など、各サービスに対するリソースプロバイダーがあります。必要なリソースプロバイダーに Azure サブスクリプションが登録されていない場合、スクリプトは失敗します。

この問題を解決するには、適切なリソースプロバイダーに登録します。以下のコマンド例を CloudShell で実行します。ここで <RESOURCE_PROVIDER_NAME>をリソースプロバイダー名 (例: `Microsoft.EventHub`) に置き換えてください。

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="DD_SITE と DD_API_KEY の値を確認します。" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-eh" %}}
すべてのログが欠落している場合は、以下のことを確認してください。
   - [選択されている Datadog サイト][33]が正しいこと
   - 構成された [API キー][9]が正しい Datadog オーガニゼーションのものであること

**注**: 関数アプリの設定で Datadog サイトと API キーが設定されている場合、それらが変更されるとアプリが再起動する可能性があります。
{{% /collapse-content %}} 

{{% collapse-content title="Event Hub の潜在的なボトルネックを特定する" level="h5" expanded=false id="troubleshooting-logs-check-event-hub-bottlenecks" %}}
受信メッセージが急増し、送信メッセージが減少している場合は、ボトルネックが発生している可能性があります。調査には次のメトリクスを使用してください。

受信メッセージを確認する
: `azure.eventhub_namespaces.incoming_messages`

受信データを確認する
: `azure.eventhub_namespaces.incoming_bytes`

送信メッセージを確認する
: `azure.eventhub_namespaces.outgoing_messages`

送信データを確認する
: `azure.eventhub_namespaces.outgoing_bytes`

Microsoft.EventHub のスロットルされたリクエストを確認する
: `azure.eventhub_namespaces.throttled_requests`

Microsoft.EventHub のサーバーエラーを確認する
: `azure.eventhub_namespaces.server_errors`

**注**: [経過時間が 18 時間を超えるログ][4]は破棄されるため、ログの遅延を増やすとデータ損失が発生する可能性があります。

ボトルネックを解消するには、次のいずれかを行います。

   - [より大きなスループット (最大 32) を処理できるように、Event Hub のパーティションをスケールアップ][26]する。インプレーススケーリングは Premium または Dedicated ティアでのみ利用可能なため、目的のパーティション数で新しい Event Hub を作成し、その診断設定とフォワーダートリガーを再構成する必要があります。スケーリングに関するアドバイスについては、[Azure サポート][30]にお問い合わせください。
   - ログフォワーダーを Datadog 内の複数のパイプラインに分割し、各パイプラインが優先度などのルールに基づいて特定のリソースのサブセットを処理するようにします。これにより、同時処理できるログの数が増加します。
{{% /collapse-content %}} 

{{% collapse-content title="関数メトリクスを調べる" level="h5" expanded=false id="inspect-function-metrics-eh" %}}
以下の関数メトリクスを調べて、関数アプリが実行されていることを確認します。

関数の実行回数を確認する
: `azure.functions.function_execution_count`

関数がデータを受信していることを確認する
: `azure.functions.bytes_received`

関数がデータを受信していることを確認する
: `azure.functions.bytes_sent`

関数のリクエストが成功ステータスコードを返していることを確認する
: `azure.functions.http2xx`

関数のリクエストがエラーステータスコードを返していないことを確認する
: `azure.functions.http4xx`
: `azure.functions.http5xx`

**注**:
   - ログフォワーダーは [Azure Functions V4 プログラミングモデル][35]を使用しています。これはパッケージベースであり、Azure ポータルでの直接的なコード編集を無効にします。以前に手動で設定された関数を更新またはカスタマイズするには、[Datadog サポート][36]に連絡して手順を確認してください。
   - より信頼性が高く、効率的で費用対効果の高いログ収集を行うには、[自動ログフォワーダー][37]に移行してください。自動ログフォワーダーはすべての Azure リソースから Datadog にログを転送するプロセスを完全に自動化します。
{{% /collapse-content %}} 

## 複数のアプリ登録の監視 {#monitoring-multiple-app-registrations}

複数のアプリ登録によって監視されているサブスクリプションでは、アクセス構成が重複する可能性があります。このセットアップは推奨されません。このセットアップではインテグレーションの問題やシステム競合が発生する可能性があり、また Azure Monitor のコストが増加する可能性もあります。

## 停止した Azure VM がインフラストラクチャーリストに残る{#powered-down-azure-vms-on-the-infrastructure-list}

Azure で VM を停止しても、Datadog Azure インテグレーションはその VM のメトリクス `azure.vm.status` を収集し続けます。このメトリクスには `status:running`、`status:not_running`、または `status:unknown` タグが付けられています。

これは意図的な処置ですが、これにより VM がインフラストラクチャーリストに残ります。VM がこのメトリクスのみを報告する場合、課金対象のホスト数にはカウントされません。課金の詳細については、Datadog の[課金ページ][21]を参照してください。

Azure VM を破棄した場合、3 時間以内にインフラストラクチャーリストからフェーズアウトします。

## Azure VM がメトリクスなしでアプリに表示される {#azure-vms-appear-in-the-app-without-metrics}

Datadog に Azure インテグレーションを適切にインストールすると、Azure VM やその他のサービスからのメトリクスが 15 分ほどで流れ始めます。

この後、インフラストラクチャーリストに Azure VM が表示されても、メトリクスが報告されない場合は、いくつかの原因が考えられます。

1. 正しいメトリクスを探しているか確認します。
    **クラシック**仮想マシンメトリクスは azure.vm ネームスペースで始まり、ARM デプロイ済み仮想マシンメトリクスは `azure.compute_virtualmachines` ネームスペースで始まります。

2. いずれのネームスペースもメトリクスを返さない場合、Azure Portal 内で仮想マシンの**診断**がオンになっていることを確認してください。ブート診断と基本メトリクスのみが必要です。
    * クラシック**** VM の場合:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="ステータスがオンに設定されたクラシック仮想マシンの診断ビューが表示されている Azure Portal" >}}

    * For ARM deployed VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="ステータスがオンに設定された仮想マシンの診断設定ビューが表示されている Azure Portal" >}}

3. 仮想マシンが起動していることを確認します。
    このインテグレーションは、停止または割り当て解除されたマシンのパフォーマンスメトリクスを収集しません。`azure.vm.count` メトリクスと `status` タグの値 (`running`、`stopped`、`stopped_deallocated`) を使用して、ホストのステータスを判断します。対象のホストのステータスが `status:running` であり、Azure ポータルで実行されていることを確認します。
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="status:running の azure.vm.count メトリクスのグラフ" >}}

## `azure.*.count` メトリクスに関する問題 {#issues-with-azurecount-metrics}

Azure インテグレーションがメトリクスを報告しているが、`azure.*.count` を報告していない、または`azure.*.count` が `status:query_failed` を返している場合、Azure サブスクリプションが Azure Resource Health プロバイダーを登録する必要があります。

Azure コマンドラインインターフェイスの使用:

```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

Datadog では 5～10 分以内に `azure.*.count` というメトリクスが表示されるはずです。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[3]: https://learn.microsoft.com/azure/databricks/dev-tools/api/latest/aad/
[4]: /ja/logs/troubleshooting/#missing-logs---timestamp-outside-of-the-ingestion-window
[5]: /ja/logs/guide/azure-event-hub-log-forwarding
[6]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[7]: /ja/integrations/guide/azure-native-integration/#agent-extensions
[8]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings?tabs=portal
[9]: /ja/account_management/api-app-keys/#api-keys
[10]: /ja/getting_started/integrations/azure/#install-the-agent-for-greater-visibility-into-your-application
[11]: /ja/integrations/azure_arc/
[12]: https://learn.microsoft.com/cli/azure/connectedmachine/extension
[13]: /ja/logs/guide/azure-event-hub-log-forwarding/
[14]: https://learn.microsoft.com/entra/identity/monitoring-health/howto-configure-diagnostic-settings
[15]: /ja/metrics/#time-aggregation
[16]: https://learn.microsoft.com/rest/api/monitor/metric-definitions/list?view=rest-monitor-2023-10-01
[17]: https://learn.microsoft.com/azure/azure-monitor/metrics/metrics-aggregation-explained#aggregation-types
[18]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/metrics
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[20]: /ja/logs/log_configuration/indexes/#set-daily-quota
[21]: /ja/account_management/billing/
[22]: /ja/metrics/guide/interpolation-the-fill-modifier-explained/
[23]: /ja/integrations/azure/
[24]: https://portal.azure.com
[25]: https://learn.microsoft.com/troubleshoot/azure/partner-solutions/log-limitations#check-diagnostic-settings-limit
[26]: https://learn.microsoft.com/azure/event-hubs/event-hubs-scalability
[27]: https://learn.microsoft.com/azure/azure-monitor/reference/metrics-index
[28]: /ja/metrics/#space-aggregation
[29]: /ja/logs/guide/azure-automated-log-forwarding/
[30]: https://azure.microsoft.com/support
[31]: https://app.datadoghq.com/metric/explorer
[32]: https://learn.microsoft.com/azure/azure-monitor/reference/tables/containerappconsolelogs
[33]: /ja/getting_started/site/#access-the-datadog-site
[34]: /ja/logs/explorer/search_syntax/
[35]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[36]: /ja/help/
[37]: https://www.datadoghq.com/blog/azure-log-forwarding/
[38]: /ja/logs/log_configuration/indexes/#exclusion-filters