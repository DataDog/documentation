---
title: AIX 用 Agent の基本的な使用方法
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/announcing-ibm-aix-agent/"
  tag: ブログ
  text: Datadog Unix Agent を使用した AIX の監視
---

<div class="alert alert-info">
Datadog Unix Agent は特定のシステムアーキテクチャ向けに開発されており、Agents 5 および 6 とは異なります。
</div>

このページでは、AIX 用 Datadog UNIX Agent のインストールと構成について説明します。

**注**: Datadog Unix Agent は、現在、以下のバージョンの AIX をサポートしています。

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

{{< code-block lang="bash" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<バージョン>.powerpc.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

これで、Agent が `/opt/datadog-agent` にインストールされます。

### インストールログファイル

Agent のインストールログは、`dd-aix-install.log` ファイルに記録されます。このログを無効にするには、インストールコマンドの `-e` パラメーターを削除します。

## コマンド

| 説明                     | コマンド (ルートとして実行)           |
|---------------------------------|-----------------------------|
| Agent をサービスとして起動        | `startsrc -s datadog-agent` |
| サービスとして実行中の Agent の停止 | `stopsrc -s datadog-agent`  |
| Agent サービスのステータス         | `lssrc -s datadog-agent`    |
| 実行中の Agent のステータスページ    | `datadog-agent status`      |
| フレアの送信                      | `datadog-agent flare`       |
| コマンドの使用方法の表示           | `datadog-agent --help`      |

## 構成

Agent の構成ファイルおよびフォルダーは、
`/etc/datadog-agent/datadog.yaml` にあります。
したがって、構成ファイルは次の順番で検索されます (最初に一致したものが使用されます)。

* `/etc/datadog-agent/datadog.yaml`
* `./etc/datadog-agent/datadog.yaml`
* `./datadog.yaml`

コンフィギュレーションファイルのサンプルが `/etc/datadog-agent` にあります。

基本的な構成では、通常、Datadog API キーが必要です。メトリクスを EU インスタンスに送信するために、`site` 構成オプションを使用できます。

`dd_url` を手動で上書きすることもできますが、通常は必要ありません。

ネットワーク設定によっては、プロキシ構成を指定する必要があります。

**インテグレーション用構成ファイルの場所**
`/etc/datadog-agent/conf.d/`

## インテグレーション

以下のインテグレーションが追加されています。

* process
* lparstats
* disk
* ネットワーク

上記のインテグレーションを有効にするには、提供されている構成ファイルサンプルをコピーして編集します。サンプルは、`/etc/datadog-agent/conf.d` にあります。YAML 構成ファイルの名前は、インテグレーションの名前と一致させる必要があります。`/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.yaml` はインテグレーション `<INTEGRATION_NAME>` を有効にし、その構成を設定します。

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

既存の Python スーパーバイザーから Agent を実行する機能もあります。このツールを使い慣れている場合は、この方法で Agent デーモンを管理してもかまいません。Agent と DogStatsD の両方のエントリがあります。

## アンインストール

インストールされている Agent を削除するには、次の `installp` コマンドを実行します。

{{< code-block lang="bash" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

注: Agent のアンインストールログは、`dd-aix-install.log` ファイルに記録されます。このログを無効にするには、アンインストールコマンドの `-e` パラメーターを削除します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
