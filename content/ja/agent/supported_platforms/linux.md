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
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: インバウンドポートの構成
platform: Linux
title: Linux
---
## 概要

このページでは、Linux 環境用の Datadog Agent の基本的な機能を説明します。サポートされている Linux ディストリビューションとバージョンの完全なリストについては、[サポートされているプラットフォーム][5]のドキュメントを参照してください。

## Agent のインストール
Linux に Agent をインストールするには、[Fleet Automation のアプリ内手順][6]に従い、生成されたスクリプトをホストで実行してください。

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Linux ホストに Datadog Agent をインストールするためのアプリ内の手順。" style="width:90%;">}}


## Agent の構成
Datadog Agent の構成ファイルは `/etc/datadogagent/datadog.yaml` にあります。この YAML ファイルには、Datadog にデータを送信するために使用されるホスト全体の接続情報が含まれています。下記が含まれます。
 `api_key`: あなたの組織の[Datadog API キー][7]
 `site`: ターゲット Datadog リージョン (例: `datadoghq.com`、`datadoghq.eu`、`ddoggov.com`)
 `proxy`: アウトバウンドトラフィック用の HTTP/HTTPS プロキシエンドポイント ([Datadog Agent プロキシ構成][8]を参照)
 デフォルトのタグ、ログレベル、および Datadog 構成

コメントが全部載せられているリファレンスファイルは、`/etc/datadogagent/datadog.yaml.example` にあります。比較したりコピーアンドペーストしたりできるように利用可能なすべてのオプションがリストされています。または、サンプルの `config_template.yaml` ファイルで、利用可能なすべての構成オプションを参照してください。

### インテグレーションファイル
インテグレーション用の構成ファイルは `/etc/datadogagent/conf.d/` にあります。各インテグレーションにサブディレクトリ `<INTEGRATION>.d/` があり、次のものが含まれています。
 `conf.yaml`: インテグレーションがメトリクスとログを収集する方法を制御するアクティブな構成
 `conf.yaml.example`: サポートされているキーとデフォルトを示すサンプル


## コマンド

| 説明   | コマンド               |
|||
| Agent をサービスとして開始           | `sudo systemctl start datadogagent`                   |
| サービスとして実行中の Agent を停止    | `sudo systemctl stop datadogagent`                    |
| サービスとして実行中の Agent を再起動 | `sudo systemctl restart datadogagent`                 |
| Agent サービスのステータス            | `sudo systemctl status datadogagent`                  |
| 実行中の Agent のステータスページ       | `sudo datadogagent status`                            |
| フレアを送信                         | `sudo datadogagent flare`                             |
| コマンドの使用法を表示              | `sudo datadogagent help`                            |
| チェックを実行                        | `sudo datadogagent check <CHECK_NAME>` |

**注**: `CentOS/RHEL 6` や `SUSE 11` のような upstartbased システムでは、`systemctl <action>` を `<action>` に置き換えてください。たとえば、`SUSE 11` システムで サービスとして Agent を開始する場合は、`sudo start datadogagent` を使用します。


## Agent のアンストール

Agent をアンストールするには、該当する Linux 環境のコマンドを実行してください。


### CentOS、Rocky、AlmaLinux、Amazon Linux、Oracle Linux、および Red Hat の場合

```shell
sudo yum remove datadog-agent
```

### Debian、Ubuntu の場合

```shell
sudo apt-get remove datadog-agent -y
```

### SUSE の場合

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**上記のコマンドで Agent は削除されますが、次のものは削除されません。**
* `datadog.yaml` 構成ファイル
* `/etc/datadogagent` 構成フォルダー内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダー内のユーザー作成ファイル
* `ddagent` ユーザー
* Datadog ログファイル

**これらの要素を削除するには、Agent 削除後に次のコマンドを実行してください。**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

`Debian` と `Ubuntu` の残りの Agent アーティファクトアンインストールするには、次のコマンドを実行します。

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Single Step APM Instrumentation のアンインストール
Single Step APM Instrumentation と一緒に Agent をインストールしていて、それをアンインストールする場合は、APM Instrumentation を削除するために[追加のコマンドを実行][9]する必要があります。[自分の環境][10]に該当する手順を実効してください。


## トラブルシューティング

詳細な手順については、[Agent のトラブルシューティング][2]を参照してください。

## 埋め込み Agent の使用

Agent には `/opt/datadog-agent/embedded/` に埋め込まれた Python 環境が含まれています。`python` や `pip` などの共通バイナリは `/opt/datadog-agent/embedded/bin/` に含まれています。

詳細については、[埋め込み Agent へのパッケージの追加方法][3]の手順を参照してください。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /ja/agent/troubleshooting/
[3]: /ja/extend/guide/custompythonpackage/
[4]: /ja/integrations/
[5]: /ja/agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/installagent/latest?platform=linux
[7]: https://app.datadoghq.com/organizationsettings/apikeys
[8]: https://docs.datadoghq.com/ja/agent/configuration/proxy/
[9]: /ja/tracing/trace_collection/automatic_instrumentation/singlestepapm/
[10]: /ja/tracing/trace_collection/automatic_instrumentation/singlestepapm/linux