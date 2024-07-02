---
further_reading:
- link: /agent/basic_agent_usage/#agent-architecture
  tag: ドキュメント
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: ドキュメント
  text: インバウンドポートの構成
- link: https://www.datadoghq.com/blog/announcing-ibm-aix-agent/
  tag: GitHub
  text: Datadog Unix Agent を使用した AIX の監視
title: AIX 用 Agent の基本的な使用方法
---

<div class="alert alert-info">
Datadog UNIX Agent は特定のシステムアーキテクチャ向けに開発されており、Windows、Linux、MacOS Agent とは異なります。
</div>

このページでは、AIX 用 Datadog UNIX Agent のインストールと構成について説明します。

**注**: Datadog Unix Agent は、PowerPC 8 以降および以下のバージョンの AIX をサポートしています。

* AIX 6.1 TL9 SP6+
* AIX 7.1 TL5 SP3+
* AIX 7.2 TL3 SP0+

## インストール

Datadog の [Agent ダウンロードページ][1]に、ワンステップの ksh インストールスクリプトが用意されています。このスクリプトは、以下の環境変数をサポートします。

* **CHANNEL**: デフォルトは stable です。パッケージリポジトリチャンネルを指定します。
  * 値: `stable`、`beta`、`unstable`
* **VERSION**: デフォルトは最新バージョンです。パッケージバージョンを指定します。
* **PROXY**: デフォルトはなしです。プロキシの URI を指定します。
  * 例: `http://proxy.foo.com`
* **PROXY_USER**: デフォルトは空です。プロキシサーバーのユーザー名を指定します。
* **PROXY_PASSWORD**: デフォルトは空です。プロキシサーバーのパスワードを指定します。プロセス/コンテナ Agent の場合は、認証パスワードの受け渡しのためにこの変数は必須で、名前を変えることはできません。
* **INSECURE**: デフォルトは `false` です。TLS 検証の省略を許可します。

別の方法として、[こちらのページ][2]で最新リリースのダウンロードリンクが提供されています。

インストーラは次のように実行できます (ルートとして実行)。

{{< code-block lang="shell" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<VERSION>.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

これで、Agent が `/opt/datadog-agent` にインストールされます。

### インストールログファイル

Agent のインストールログは、`dd-aix-install.log` ファイルに記録されます。このログを無効にするには、インストールコマンドの `-e dd-aix-install.log` パラメーターを削除します。

## コマンド

| 説明                     | コマンド (ルートとして実行)           |
|---------------------------------|-----------------------------|
| Agent をサービスとして起動        | `startsrc -s datadog-agent` |
| サービスとして実行中の Agent の停止 | `stopsrc -s datadog-agent`  |
| Agent サービスのステータス         | `lssrc -s datadog-agent`    |
| 実行中の Agent のステータスページ    | `datadog-agent status`      |
| フレアの送信                      | `datadog-agent flare`       |
| コマンドの使用方法の表示           | `datadog-agent --help`      |

## コンフィギュレーション

Agent のコンフィギュレーションファイルおよびフォルダーは `/etc/datadog-agent/datadog.yaml` にあります

コンフィギュレーションファイルのサンプルが `/etc/datadog-agent/datadog.yaml.example` にあります。

基本的なコンフィギュレーションでは、通常、Datadog API キーが必要です。メトリクスを別のサイト (たとえば、EU インスタンス) に送信するために、`site` コンフィギュレーションオプションを使用できます。

ネットワーク設定によっては、プロキシ構成を指定する必要があります。

**インテグレーション用構成ファイルの場所**
`/etc/datadog-agent/conf.d/`

## インテグレーション

Unix Agent は、次のシステムメトリクスを収集します。

* cpu
* ファイルシステム
* iostat
* load
* memory
* uptime
* disk
* ネットワーク

さらに、次のインテグレーションを有効にして、さらにメトリクスを収集できます。

* process
* lparstats
* [ibm_was (Websphere Application Server)][3]

提供されているコンフィギュレーションファイルサンプルをコピーして編集し、上記のインテグレーションを有効にします。サンプルは、`/etc/datadog-agent/conf.d` にあります。YAML コンフィギュレーションファイルの名前は、インテグレーションの名前と一致させる必要があります。`/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml` はインテグレーション `<INTEGRATION_NAME>` を有効にし、そのコンフィギュレーションを設定します。コンフィギュレーションファイルの例は、`/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml.example` にあります。

**注**: 使用可能なメトリクスの一部は、Unix Agent のインテグレーションと、Linux、Windows、MacOS のインテグレーションとで異なります。Unix Agent を使用してプロセスとネットワークメトリクスを監視することは可能ですが、ライブプロセスモニタリングとネットワークパフォーマンスモニタリング機能は利用できません。また、ログ管理は、Unix Agent では利用できません。

<div class="alert alert-info">Unix Agent には trace-agent コンポーネントがないため、APM のトレースやプロファイリングはサポートされていません。</div>

## DogStatsD の実行

DogStatsD を使用すると、カスタムメトリクスを収集して Datadog に送信できます。DogStatsD は UDP ポートの 1 つをリスニングし、そこに DogStatsD メトリクスを送信します。送信されたメトリクスは Datadog にリレーされます。

DogStatsD は、Agent と同じ構成ファイルに依存し、このファイルに DogStatsD 構成セクションがあります。DogStatsD サーバーは、通常、同じ Agent プロセス内で実行しますが、専用のプロセスが必要な場合は、スタンドアロンモードで起動することもできます。

DogStatsD を有効にするには、`/etc/datadog-agent/datadog.yaml` を編集し、関連する構成オプションを設定します。

{{< code-block lang="yaml" filename="/etc/datadog-agent/datadog.yaml" >}}
dogstatsd:                        # DogStatsD 構成オプション
  enabled: true                   # デフォルトでは無効
  bind_host: localhost            # 連結先のアドレス
  port: 8125                      # DogStatsD UDP リスニングポート
  non_local_traffic: false        # 非ローカルトラフィックのリスニング
{{< /code-block >}}

**注**: DogStatsD はデーモン化されずに、フォアグラウンドで実行されます。

既存の Python スーパーバイザーで Agent を実行する機能もあります。このツールを使い慣れている場合は、この方法で Agent デーモンを管理してもかまいません。Agent と DogStatsD の両方のエントリがあります。

## Agent のアンインストール

インストールされている Agent を削除するには、次の `installp` コマンドを実行します。

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

注: Agent のアンインストールログは、`dd-aix-install.log` ファイルに記録されます。このログを無効にするには、アンインストールコマンドの `-e` パラメーターを削除します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/checks/bundled/ibm_was/README.md