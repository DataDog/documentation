---
aliases:
- /ja/agent/basic_agent_usage/sccm/
description: SCCM (Systems Center Configuration Manager)
disable_toc: false
further_reading:
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process/
  tag: ドキュメント
  text: プロセスの収集
- link: /tracing/
  tag: ドキュメント
  text: トレースの収集
- link: /agent/architecture
  tag: ドキュメント
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: ドキュメント
  text: インバウンドポートの構成
title: SCCM
---
Microsoft SCCM (Systems Center Configuration Manager) は、Microsoft の Systems Center ツールスイートに同梱されている構成管理ソリューションです。このページでは、SCCM を使用した Datadog Agent のインストールおよび構成について説明します。

## 前提条件 {#prerequisites}

- Agent は SCCM バージョン 2103 以上に対応しています。
- Agent をインストールする前に、Configuration Manager で [ディストリビューションポイント][1] をインストールおよび構成していることを確認してください。

## セットアップ {#setup}

### デプロイ可能な Datadog Agent アプリケーションを作成する {#create-a-deployable-datadog-agent-application}

1. [Agent ページ][2] から、最新の Windows Datadog Agent インストーラーファイル (MSI) を SCCM サーバーにダウンロードします。
1. SCCM でアプリケーションを作成し、Datadog Agent MSI の場所を指定します。
   {{< img src="/agent/basic_agent_usage/sccm/sccm-deployable-app.png" alt="新しいアプリケーションを作成し、Datadog Agent MSI をターゲット MSI として使用します。" style="height:100%;" >}}
1. {{< ui >}}General Information{{< /ui >}} ページが表示されるまで {{< ui >}}Next{{< /ui >}} をクリックします。
1. {{< ui >}}Installation program{{< /ui >}} に次のコマンドを貼り付け、`MY_API_KEY` を自分の API キーに置き換えます。

   ```powershell
   start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datadoghq.com"
   ```

   その他のインストールオプションについては、[インストール変数][3] の一覧を参照してください。

1. {{< ui >}}Install behavior{{< /ui >}} が {{< ui >}}Install for system{{< /ui >}} に設定されていることを確認します。
1. {{< ui >}}Next{{< /ui >}} をクリックし、画面の指示に従ってアプリケーションを作成します。
   {{< img src="/agent/basic_agent_usage/sccm/sccm-install-command.png" alt="インストールプログラムのコマンドを入力し、インストール動作がシステム用にインストールするように設定されていることを確認します。" style="width:80%;" >}}
1. アプリケーションが作成されたことを確認するには、{{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}} で探します。

### Datadog Agent アプリケーションをデプロイする {#deploy-the-datadog-agent-application}

<div class="alert alert-danger">Datadog Agent アプリケーションをデプロイする前に、Configuration Manager で<a href="https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/install-and-configure-distribution-points">ディストリビューションポイント</a>をインストールおよび構成していることを確認する</div>

1. {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}} に移動し、先ほど作成した Datadog Agent アプリケーションを選択します。
1. {{< ui >}}Deployment{{< /ui >}} グループの {{< ui >}}Home{{< /ui >}} タブから、{{< ui >}}Deploy{{< /ui >}} を選択します。

### Agent 構成 {#agent-configuration}

SCCM パッケージを使用すると、Datadog Agent にコンフィギュレーションファイルをデプロイして、デフォルト設定を上書きできます。Agent 構成は、`datadog.yaml` 構コンフィギュレーションファイルと、各インテグレーション用のオプションの `conf.yaml` ファイルで構成されます。デプロイする各コンフィギュレーションファイルごとにパッケージを作成する必要があります。

1. `datadog.yaml` および `conf.yaml` ファイルをローカルの SCCM マシンフォルダーに収集します。利用可能なすべての構成オプションについては、[Windows 用の Agent コンフィギュレーションファイルの例][4] を参照してください。
1. SCCM パッケージを作成し、{{< ui >}}Standard program{{< /ui >}} を選択します。
1. Agent にデプロイするコンフィギュレーションファイルが格納されている場所を選択します。
1. 変更をデプロイする [デバイスコレクション][5] を選択します。
1. デプロイ設定を構成して、パッケージをターゲットにすぐに事前インストールします。

{{< img src="agent/basic_agent_usage/sccm/sccm-select-program.png" alt="プログラムタイプの画面。標準プログラムを選択" style="width:80%;" >}}

### Datadog Agent を再起動する {#restart-the-datadog-agent}

構成の変更を監視するために、Agent サービスを再起動します。
1. [Agent コマンド][6] を使用して Datadog Agent を再起動する PowerShell スクリプトを作成します。
1. スクリプトを実行して Datadog Agent を再起動します。
1. Datadog UI で新しいデータがあるか確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/manage-content-and-content-infrastructure
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: /ja/agent/basic_agent_usage/windows/?tab=commandline#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[5]: https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_create
[6]: /ja/agent/basic_agent_usage/windows/#agent-commands