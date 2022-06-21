---
title: コミュニティインテグレーションのインストール
kind: ガイド
further_reading:
  - link: /agent/troubleshooting/
    tag: ドキュメント
    text: Agent のトラブルシューティング
  - link: /agent/guide/agent-configuration-files/
    tag: よくあるご質問
    text: Agent 構成ファイル
  - link: /agent/guide/agent-commands/
    tag: よくあるご質問
    text: Agent のコマンド
---
Datadog Agent のコミュニティ開発のインテグレーションは、[Integrations-extra][1] GitHub リポジトリに格納されています。これらはパッケージ化されておらず、Datadog Agent に組み込まれていませんが、以下の手順に従ってアドオンとしてインストールできます。

{{< tabs >}}
{{% tab "Agent above v6.8" %}}

`<インテグレーション名>` チェックをホストにインストールするには

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーションをインストールします。

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

3. [他のパッケージ化されたインテグレーション][2]と同様にインテグレーションを構成します。
4. [Agent を再起動します][3]。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/getting_started/integrations/
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

integrations-extra からの Docker Agent とのインテグレーションを使用する最良の方法は、このインテグレーションがインストールされた Agent をビルドすることです。次の Dockerfile を使用して、integrations-extra からの `<インテグレーション名>` インテグレーションを含む Agent の更新バージョンをビルドします。

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

Docker 内で実行された `agent Integration install` コマンドは、無害な警告 `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn` を発行します。この警告は無視してかまいません。

次に、この新しい Agent イメージを[オートディスカバリー][1]と組み合わせて使用して、`<インテグレーション名>` チェックを有効にします。

[1]: /ja/agent/autodiscovery/
{{% /tab %}}
{{% tab "Agent prior to 6.8" %}}

`<インテグレーション名>` チェックをホストにインストールするには

1. ホストに [Datadog Agent をダウンロードします][1]。
2. `<インテグレーション名>/datadog_checks/<インテグレーション名>/` フォルダーに `<インテグレーション名>.py` ファイルを [integrations-extra リポジトリ][2]からダウンロードします
3. Agent の `checks.d` ディレクトリに配置します。
4. `<インテグレーション名>/datadog_checks/<インテグレーション名>/data/` フォルダーに `conf.yaml.example` ファイルを [integrations-extra リポジトリ][2]からダウンロードします
5. このファイルの名前を `conf.yaml` に変更します。
6. [Agent 構成ディレクトリ][3]に新しい `<インテグレーション名>.d/` フォルダーを作成します。
7. ステップ 6 で作成したディレクトリに `conf.yaml` ファイルを配置します。
8. [他のパッケージ化されたインテグレーション][4]と同様にインテグレーションを構成します。
9. [Agent を再起動します][5]。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras
[3]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /ja/getting_started/integrations/
[5]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras