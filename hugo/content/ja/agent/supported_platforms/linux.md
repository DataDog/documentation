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
  tag: よくあるご質問
  text: ログの収集
- link: /infrastructure/process/
  tag: よくあるご質問
  text: プロセスの収集
- link: /tracing/
  tag: よくあるご質問
  text: トレースの収集
- link: /agent/architecture/#agent-architecture
  tag: よくあるご質問
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: よくあるご質問
  text: インバウンドポートの構成
platform: Linux
title: Linux
---
## 概要 {#overview}

このページでは、Linux 環境用の Datadog Agent の基本的な機能を説明します。サポートされている Linux ディストリビューションとバージョンの完全なリストについては、[サポートされているプラットフォーム][5] のドキュメントを参照してください。

## Agent のインストール {#install-the-agent}
Linux に Agent をインストールするには、[Fleet Automation のアプリ内手順][6] に従い、生成されたスクリプトをホストで実行してください。

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Linux ホストに Datadog Agent をインストールするためのアプリ内の手順。" style="width:90%;">}}


## Agent の構成 {#configure-the-agent}
Datadog Agent 構成ファイルは `/etc/datadog-agent/datadog.yaml` にあります。この YAML ファイルには、Datadog にデータを送信するために使用されるホスト全体の次のような接続情報が含まれています。
- `api_key`: 自分の組織の [Datadog API キー][7]
- `site`: ターゲットの Datadog リージョン (例: `datadoghq.com`、`datadoghq.eu`、`ddog-gov.com`、`us2.ddog-gov.com`)
- `proxy`: アウトバウンドトラフィック用の HTTP/HTTPS プロキシエンドポイント ([Datadog Agent プロキシ構成][8] を参照)
- デフォルトのタグ、ログレベル、および Datadog 構成

`/etc/datadog-agent/datadog.yaml.example` にある完全にコメント化されたリファレンスファイルには、比較やコピーアンドペーストに使用できるすべてのオプションがリストされています。または、サンプルの `config_template.yaml` ファイルで、利用可能なすべての構成オプションを参照してください。

### インテグレーションファイル {#integration-files}
インテグレーション用の構成ファイルは `/etc/datadog-agent/conf.d/` にあります。各インテグレーションにサブディレクトリ `<INTEGRATION>.d/` があり、次のものが含まれています。
- `conf.yaml`: インテグレーションがメトリクスとログを収集する方法を制御するアクティブな構成
- `conf.yaml.example`: サポートされているキーとデフォルトを示すサンプル


## コマンド {#commands}

| 説明   | コマンド               |
|---------------|-----------------------|
| Agent をサービスとして起動する           | `sudo systemctl start datadog-agent`                   |
| サービスとして実行中の Agent を停止する    | `sudo systemctl stop datadog-agent`                    |
| サービスとして実行中の Agent を再起動する | `sudo systemctl restart datadog-agent`                 |
| Agent サービスのステータス            | `sudo systemctl status datadog-agent`                  |
| 実行中の Agent のステータスページ       | `sudo datadog-agent status`                            |
| フレアを送信する                         | `sudo datadog-agent flare`                             |
| コマンドの使用方法を表示する              | `sudo datadog-agent --help`                            |
| チェックを実行する                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**注**: `CentOS/RHEL 6` や `SUSE 11` などの upstart ベースのシステムでは、`systemctl <action>` を `<action>` に置き換えてください。たとえば、`SUSE 11` システムで Agent をサービスとして起動する場合は、`sudo start datadog-agent` を使用します。


## Agent のアンインストール {#uninstall-the-agent}

Agent をアンストールするには、該当する Linux 環境のコマンドを実行してください。


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
* `datadog.yaml` 構成ファイル
* `/etc/datadog-agent` 構成フォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

**これらの要素を削除するには、Agent 削除後に次のコマンドを実行してください。**

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
Single Step APM Instrumentation と一緒に Agent をインストールしていて、それをアンインストールする場合は、APM Instrumentation を削除するために [追加のコマンドを実行][9] する必要があります。[自分の環境][10] に該当する手順を実行してください。


## トラブルシューティング {#troubleshooting}

詳細な手順については、[Agent のトラブルシューティング][2] を参照してください。

## 埋め込み Agent の使用 {#working-with-the-embedded-agent}

Agent には `/opt/datadog-agent/embedded/` に埋め込まれた Python 環境が含まれています。`python` や `pip` などの一般的なバイナリは、`/opt/datadog-agent/embedded/bin/` に含まれています。

詳細については、[埋め込み Agent へのパッケージの追加方法][3] の手順を参照してください。


## 参考資料 {#further-reading}

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