---
aliases:
- /ja/agent/guide/community-integrations-installation-with-docker-agent
further_reading:
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
- link: /developers/integrations/new_check_howto
  tag: ドキュメント
  text: 新しいインテグレーションの設定
title: コミュニティインテグレーションを使用する
---

## 概要

Datadog Agent のコミュニティ開発のインテグレーションは、Datadog の [Integrations-extra][1] GitHub リポジトリに格納されています。これらは Agent にはパッケージ化されていませんが、アドオンとしてインストールできます。

## セットアップ

新規ユーザーの方は、最新版の [Datadog Agent][2] をダウンロードおよびインストールしてください。

### インストール

Agent のバージョンを選択してください:

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

**注**: I必要に応じて、インストールコマンドの先頭に `sudo -u dd-agent` を追加します。

[1]: /ja/getting_started/integrations/
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

コミュニティインテグレーションを Docker Agent で使用するためにお勧めの方法は、このインテグレーションがインストールされた Agent をビルドすることです。次の Dockerfile を使用して、`<INTEGRATION_NAME>` を含む Agent の更新バージョンをビルドします。

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

Docker 内で実行された `agent Integration install` コマンドは、無害な警告 `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn` を発行します。この警告は無視してかまいません。

この新しい Agent イメージを[オートディスカバリー][1]と組み合わせて使用して、`<INTEGRATION_NAME>` を有効にします。

[1]: /ja/agent/autodiscovery/
{{< /tabs >}}

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
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/getting_started/integrations/
[4]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings/agent/latest
