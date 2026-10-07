---
aliases:
- /ja/agent/guide/community-integrations-installation-with-docker-agent
further_reading:
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
- link: /developers/integrations/agent_integration
  tag: ドキュメント
  text: 新しいインテグレーションの設定
title: コミュニティとマーケットプレイスのインテグレーションを使用する
---

## 概要

Datadog Agent のコミュニティ開発のインテグレーションは、Datadog の [Integrations-extra][1] GitHub リポジトリに格納されています。これらは Agent にはパッケージ化されていませんが、アドオンとしてインストールできます。

## セットアップ

新規ユーザーの方は、最新版の [Datadog Agent][2] をダウンロードおよびインストールしてください。

### インストール

{{< tabs >}}
{{% tab "Agent v7.21 / v6.21 以降" %}}

Agent v7.21 / v6.21 以降の場合:

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```
   インテグレーションのバージョンは、インテグレーションの Github リポジトリにあるそれぞれの変更履歴で確認できます
2. コアの[インテグレーション][1]と同様にインテグレーションを構成します。
3. [Agent を再起動します][2]。

**注**: 必要に応じて、インストールコマンドの先頭に `sudo -u dd-agent` を追加します。

[1]: /ja/getting_started/integrations/
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

コンテナ化された環境でコミュニティまたはマーケットプレイスのインテグレーションを使用するには、希望するコミュニティインテグレーション を含むカスタムイメージを構築する必要があります。

[integrations-extras][2]から `<INTEGRATION_NAME>` を含むカスタムバージョンの Agent を構築するには、以下の Dockerfileを使用します。マーケットプレイスインテグレーション をインストールする場合、`<INTEGRATION_NAME>` は構成手順で確認できます。

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

(Docker 内で実行された) `datadog-agent integration install` コマンドは、無害な警告 `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn` を発行します。この警告は無視してかまいません。

Kubernetes を使用している場合は、Helm チャートまたは Datadog Operator の構成を更新して、カスタムイメージをプルします。

インテグレーションを有効化して構成するには、[オートディスカバリー][1]を使用します。

[1]: /ja/agent/autodiscovery/
[2]: https://github.com/DataDog/integrations-extras
{{% /tab %}}

{{% tab "Agent の以前のバージョン" %}}

Agent v7.21 / v6.21 以前の場合:

1. `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` フォルダーに ファイルを [integrations-extra リポジトリ][1]からダウンロードします
2. `<INTEGRATION_NAME>.py` とその他の Python ファイルを Agent の `checks.d` ディレクトリに配置します。
3. [Agent のコンフィギュレーションディレクトリ][2]に新しい `<INTEGRATION_NAME>.d/` フォルダーを作成します。
4. 作成したディレクトリに、`<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` から `conf.yaml.example` ファイルを配置します。
4. このファイルの名前を `conf.yaml` に変更します。
5. コアの[インテグレーション][3]と同様にインテグレーションを構成します。
6. [Agent を再起動します][4]。



[1]: https://github.com/DataDog/integrations-extras
[2]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /ja/getting_started/integrations/
[4]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

サイトがネットワークアクセスを制限している場合は、[`ip-ranges`][3] をすべて包含リストに追加していることを確認するか、インテグレーションを手動でダウンロードしてください。



<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: /ja/agent/configuration/network