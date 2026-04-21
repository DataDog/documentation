---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /ja/guides/basic_agent_usage/amazonlinux/
- /ja/guides/basic_agent_usage/centos/
- /ja/guides/basic_agent_usage/deb/
- /ja/agent/basic_agent_usage/install_debian_5/
- /ja/guides/basic_agent_usage/fedora/
- /ja/guides/basic_agent_usage/redhat/
- /ja/guides/basic_agent_usage/suse/
- /ja/guides/basic_agent_usage/ubuntu/
- /ja/agent/basic_agent_usage/alma/
- /ja/agent/basic_agent_usage/amazonlinux/
- /ja/agent/basic_agent_usage/centos/
- /ja/agent/basic_agent_usage/deb/
- /ja/agent/basic_agent_usage/fedora/
- /ja/agent/basic_agent_usage/oracle/
- /ja/agent/basic_agent_usage/redhat/
- /ja/agent/basic_agent_usage/ubuntu/
- /ja/agent/basic_agent_usage/suse/
- /ja/agent/basic_agent_usage/rocky/
- /ja/agent/basic_agent_usage/linux/
further_reading:
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process/
  tag: Documentation
  text: プロセスの収集
- link: /tracing/
  tag: Documentation
  text: トレースの収集
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: Agent のアーキテクチャに関する詳細
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: インバウンドポートの設定
platform: Linux
title: Linux
---
## 概要 {#overview}

このページでは、Linux 環境用 Datadog Agent の基本機能の概要を説明します。サポートされている Linux ディストリビューションとバージョンの完全なリストについては、[サポート対象プラットフォーム][5] ドキュメントを参照してください。

##Agent のインストール {#install-the-agent}
Linux に Agent をインストールするには、[Fleet Automation のアプリ内手順][6]に従い、生成されたスクリプトをホストで実行します。

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Linux ホストへの Datadog Agent のアプリ内インストール手順。" style="width:90%;">}}


## Agent の設定 {#configure-the-agent}
Datadog Agent の設定ファイルは `/etc/datadog-agent/datadog.yaml` にあります。この YAML ファイルには、以下を含む、Datadog にデータを送信するために使用されるホスト全体の接続の詳細が保持されます。
- `api_key`: 組織の [Datadog API キー][7]
- `site`: ターゲットの Datadog リージョン (例: `datadoghq.com`、`datadoghq.eu`、`ddog-gov.com`)
- `proxy`: アウトバウンドトラフィック用の HTTP/HTTPS プロキシエンドポイント ([Datadog Agent プロキシ設定][8]を参照)
- デフォルトのタグ、ログレベル、および Datadog の設定

`/etc/datadog-agent/datadog.yaml.example` にある完全にコメント化されたリファレンスファイルには、比較やコピーアンドペーストに使用できるすべてのオプションがリストされています。または、サンプルの `config_template.yaml` ファイルで、利用可能なすべての設定オプションを参照してください。

###インテグレーションファイル {#integration-files}
インテグレーション用の設定ファイルは `/etc/datadog-agent/conf.d/` にあります。各インテグレーションには専用のサブディレクトリ `<INTEGRATION>.d/` があり、次のものが含まれています。
- `conf.yaml`: インテグレーションがメトリクスとログを収集する方法を制御するアクティブな設定
- `conf.yaml.example`: サポートされているキーとデフォルトを示すサンプル


## コマンド {#commands}

| 説明   | コマンド               |
|---------------|-----------------------|
| Agent をサービスとして開始する           | `sudo systemctl start datadog-agent`                   |
| サービスとして実行中の Agent を停止する    | `sudo systemctl stop datadog-agent`                    |
| サービスとして実行中の Agent を再起動する | `sudo systemctl restart datadog-agent`                 |
| Agent サービスのステータス            | `sudo systemctl status datadog-agent`                  |
| 実行中の Agent のステータスページ       | `sudo datadog-agent status`                            |
| フレアを送信する                         | `sudo datadog-agent flare`                             |
| コマンドの使用方法を表示する              | `sudo datadog-agent --help`                            |
| チェックを実行する                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**注**: `CentOS/RHEL 6` や `SUSE 11` などの upstart ベースのシステムでは、`systemctl <action>` を `<action>` に置き換えてください。たとえば、`SUSE 11` システムで Agent をサービスとして開始する場合は、`sudo start datadog-agent` を使用します。


##Agent のアンインストール {#uninstall-the-agent}

Agent をアンインストールするには、適切な Linux 環境用のコマンドを実行します。


### CentOS、Rocky、AlmaLinux、Amazon Linux、Oracle Linux、および Red Hat の場合 {#for-centos-rocky-almalinux-amazon-linux-oracle-linux-and-red-hat}

```shell
sudo yum remove datadog-agent
```

### Debian、Ubuntu の場合 {#for-debian-ubuntu}

```shell
sudo apt-get remove datadog-agent -y
```

### SUSE の場合 {#for-suse}

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**上記のコマンドで Agent は削除されますが、次のものは削除されません。**
* `datadog.yaml` 設定ファイル
* `/etc/datadog-agent` 設定フォルダー内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダー内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

**これらの要素を削除するには、Agent を削除した後に次のコマンドを実行します。**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

`Debian` および `Ubuntu` の残りの Agent アーティファクトをアンインストールするには、次のコマンドを実行します。

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Single Step APM Instrumentation のアンインストール {#uninstall-single-step-apm-instrumentation}
Agent を Single Step APM Instrumentation と共にインストールし、それをアンインストールする場合は、APM Instrumentation を削除するために [追加のコマンドを実行][9]する必要があります。[特定の環境][10]向けの手順に従ってください。


##トラブルシューティング {#troubleshooting}

詳細な手順については、[Agent のトラブルシューティング][2]を参照してください。

##組み込み Agent の操作 {#working-with-the-embedded-agent}

Agent には、`/opt/datadog-agent/embedded/` に組み込みの Python 環境が含まれています。`python` や `pip` などの一般的なバイナリは `/opt/datadog-agent/embedded/bin/` 内に含まれています。

詳細については、[組み込み Agent へのパッケージの追加][3]に関する説明を参照してください。


##その他の参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /ja/agent/troubleshooting/
[3]: /ja/extend/guide/custom-python-package/
[4]: /ja/integrations/
[5]: /ja/agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://docs.datadoghq.com/ja/agent/configuration/proxy/
[9]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[10]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux