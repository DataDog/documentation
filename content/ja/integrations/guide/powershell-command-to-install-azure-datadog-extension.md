---
aliases:
- /ja/integrations/faq/powershell-command-to-install-azure-datadog-extension
kind: ガイド
title: Azure Datadog 拡張機能をインストールするコマンド
---

Datadog は、Azure インスタンスへの Agent デプロイを支援する Azure 拡張機能を提供しています。

* [ワンクリックで Datadog をデプロイできる Azure モニタリングのご紹介][1]
* [Azure インテグレーションドキュメント][2]

GUI によるインストールに代わる方法として、コマンドラインがあります。
Azure インスタンスで Datadog Agent を拡張機能として実行するには、次の構文を使用します。

{{< tabs >}}
{{% tab "Windows" %}}

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "datadoghq.com"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<YOUR_DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
```
Azure インスタンス拡張機能を設定するための構文の詳細は、[Azure Extension Set-AzureVMExtension ドキュメント][1]に記載されています。

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

**注**: `agentConfiguration` と `api_key` を同時に指定した場合、`agentConfiguration` に記述された API キーが優先されます。また、ターゲットマシンに API キーが設定されている場合、`Set-AzureVMExtension` で API キーを変更することはできないことに注意してください。

### 構成 URI の指定
この例では、Datadog Agent が使用する構成を指定する方法を示します。
Datadog Agent の構成 URI は、Azure の blob ストレージの URI である必要があります。
Datadog Windows Agent Azure Extension は、`agentConfiguration` URI が `.blob.core.windows.net` ドメインから来たことを確認します。
Datataog Agent 構成は、`%PROGRAMDATA%\Datadog` フォルダから作成する必要があります。

```powershell
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "6.4" -Settings @{"site" = "datadoghq.com"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
```

**注**: Datadog Agent をインストールすると、構成は新しいバージョンにアップグレードするときのみ変更することができます。

### 特定の Agent のバージョンを設定する
この例では、インストールする Agent のバージョンを指定する方法を示しています。デフォルトでは、Datadog Windows Agent Azure Extension は、Datadog Agent の最新バージョンをインストールします。

**注**: ダウングレードはサポートされていないため、ターゲットマシンに現在インストールされている Datadog Agent のバージョンよりも低いバージョンの Datadog Agent をインストールすることはできません。Datadog Agent の下位バージョンをインストールするには、ターゲットマシン上の Datadog Windows Agent Azure Extension を削除して、以前のバージョンを最初にアンインストールしてください。Datadog Windows Agent Azure Extension を削除しても、Datadog Agent の構成は削除されません。

```powershell
Set-AzureVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "6.4" -Settings @{"site" = "datadoghq.com"; "agentVersion" = "7.40.0"} -ProtectedSettings @{"api_key" = "<YOUR_DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
```

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

```bash
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 6.0 --settings '{"site":"datadoghq.com", "agentVersion":"7.40.0"}' --protected-settings '{"api_key":"<YOUR_DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
```
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

```bash
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 6.0 --settings '{"site":"datadoghq.com", "agentVersion":"7.40.0", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<YOUR_DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
```


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /ja/integrations/azure/#deploy-agents