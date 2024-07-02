---
aliases:
- /ja/integrations/faq/powershell-command-to-install-azure-datadog-extension
further_reading:
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: ブログ
  text: Microsoft Cloud Adoption Framework と Datadog で Azure への移行を成功させる
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: ブログ
  text: Datadog で Azure Arc ハイブリッドインフラストラクチャーを監視する
title: Azure Datadog 拡張機能をインストールするコマンド
---

## Azure にインストールする

Datadog は、Azure インスタンスへの Agent デプロイを支援する Azure 拡張機能を提供しています。

* [ワンクリックで Datadog をデプロイできる Azure モニタリングのご紹介][1]
* [Azure Native インテグレーション][2] _US3 のみ_
* [標準の Azure インテグレーション][7] _全サイト_

GUI のインストールに代わる方法として、コマンドラインがあります。
Azure インスタンスで Datadog Agent を拡張機能として実行するには、環境に合ったコマンドを使用します。`<SITE_PARAMETER>` を [Datadog サイトページ][3]の Datadog アカウント**サイトパラメーター**値に、`<DATADOG_API_KEY>` を [Datadog API キー][4]に置き換えます。

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Azure インスタンス拡張機能を設定するための構文の詳細は、[Azure Extension Set-AzVMExtension ドキュメント][1]に記載されています。

Azure 拡張機能は、通常の設定と保護された設定の両方を受け入れることができます。

通常の設定は以下の通りです。

| 変数 | タイプ | 説明  |
|----------|------|--------------|
| `site` | 文字列 | Datadog インテークサイトを設定します。例: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 文字列 | `x.y.z` または `latest` というフォーマットの、インストールする Agent のバージョン |
| `agentConfiguration` | URI | (オプション) Agent の構成が ZIP で格納されている Azure blob への URL。 |
| `agentConfigurationChecksum` | 文字列 | Agent 構成 zip ファイルの SHA256 チェックサム。`agentConfiguration` が指定された場合、必須です。 |

保護された設定は以下の通りです。

| 変数 | タイプ | 説明  |
|----------|------|--------------|
| `api_key`| 文字列 | Datadog API キーを構成ファイルに追加します。 |

**注**: `agentConfiguration` と `api_key` を同時に指定した場合、`agentConfiguration` に記述された API キーが優先されます。また、ターゲットマシンに API キーが設定されている場合、`Set-AzVMExtension` で API キーを変更することはできないことに注意してください。

### 構成 URI の指定
この例では、Datadog Agent が使用する構成を指定する方法を示します。
Datadog Agent の構成 URI は、Azure の blob ストレージの URI である必要があります。
Datadog Windows Agent Azure Extension は、`agentConfiguration` URI が `.blob.core.windows.net` ドメインから来たことを確認します。
Datataog Agent 構成は、`%PROGRAMDATA%\Datadog` フォルダから作成する必要があります。

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**注**: Datadog Agent をインストールすると、構成は新しいバージョンにアップグレードするときのみ変更することができます。

### 特定の Agent のバージョンを設定する
この例では、インストールする Agent のバージョンを指定する方法を示しています。デフォルトでは、Datadog Windows Agent Azure Extension は、Datadog Agent の最新バージョンをインストールします。

**注**: ダウングレードはサポートされていないため、ターゲットマシンに現在インストールされている Datadog Agent のバージョンよりも低いバージョンの Datadog Agent をインストールすることはできません。Datadog Agent の下位バージョンをインストールするには、ターゲットマシン上の Datadog Windows Agent Azure Extension を削除して、以前のバージョンを最初にアンインストールしてください。Datadog Windows Agent Azure Extension を削除しても、Datadog Agent の構成は削除されません。

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}
Azure インスタンス拡張機能を設定するための構文の詳細は、[Azure Extension CLI リファレンス][1]に記載されています。

Azure 拡張機能は、通常の設定と保護された設定の両方を受け入れることができます。

通常の設定は以下の通りです。

| 変数 | タイプ | 説明  |
|----------|------|--------------|
| `site` | 文字列 | Datadog インテークサイトを設定します。例: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 文字列 | `x.y.z` または `latest` というフォーマットの、インストールする Agent のバージョン |
| `agentConfiguration` | URI | (オプション) Agent の構成が ZIP で格納されている Azure blob への URL。 |
| `agentConfigurationChecksum` | 文字列 | Agent 構成 zip ファイルの SHA256 チェックサム。`agentConfiguration` が指定された場合、必須です。 |

保護された設定は以下の通りです。

| 変数 | タイプ | 説明  |
|----------|------|--------------|
| `api_key`| 文字列 | Datadog API キーを構成ファイルに追加します。 |

**注**: `agentConfiguration` と `api_key` を同時に指定した場合、`agentConfiguration` に記述された API キーが優先されます。ターゲットマシンに API キーが設定されている場合、`api_key` で API キーを変更することはできません。

### 構成 URI の指定
この例では、Datadog Agent が使用する構成を指定する方法を示します。
- Datadog Agent の構成 URI は、Azure の blob ストレージの URI である必要があります。
- Datadog Windows Agent Azure Extension は、`agentConfiguration` URI が `.blob.core.windows.net` ドメインから来たことを確認します。
- Datataog Agent 構成は、`/etc/datadog-agent/` フォルダから作成する必要があります。

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Azure Arc にインストールする

[Azure Arc][5] インスタンスで Datadog Agent を拡張機能として実行するには、環境に合ったコマンドを使用します。

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Azure `connectedmachine` 拡張機能を設定するための構文の詳細については、[az connectedmachine 拡張機能][6]ページに記載されています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /ja/integrations/guide/azure-native-manual-setup/#virtual-machine-agent
[3]: /ja/getting_started/site/#access-the-datadog-site
[4]: /ja/account_management/api-app-keys/#api-keys
[5]: /ja/integrations/azure_arc/
[6]: https://learn.microsoft.com/en-us/cli/azure/connectedmachine/extension
[7]: /ja/integrations/guide/azure-manual-setup/#agent-installation
