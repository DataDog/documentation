---
title: コミュニティインテグレーションのインストール
kind: ガイド
further_reading:
  - link: agent/troubleshooting/
    tag: ドキュメント
    text: Agent のトラブルシューティング
  - link: agent/guide/agent-configuration-files/
    tag: よくあるご質問
    text: Agent 構成ファイル
  - link: agent/guide/agent-commands/
    tag: よくあるご質問
    text: Agent のコマンド
---
Datadog Agent のコミュニティ開発のインテグレーションは、[Integrations-extra][1] Github リポジトリに格納されています。これらはパッケージ化されておらず、Datadog Agent に組み込まれていませんが、以下の手順に従ってアドオンとしてインストールできます。

{{< tabs >}}
{{% tab "Agent above v6.8" %}}

`<インテグレーション名>` チェックをホストにインストールするには

1. [開発ツールキット][1]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `<インテグレーション名>` パッケージをビルドします。

    ```
    ddev -e release build <INTEGRATION_NAME>
    ```

5. [Datadog Agent をダウンロードして起動][2]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_INTEGRATION_NAME_PACKAGE>/<ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][3]と同様にインテグレーションを構成します。
8. [Agent を再起動します][4]。

[1]: /ja/developers/integrations/new_check_howto/#developer-toolkit
[2]: https://app.datadoghq.com/account/settings#agent
[3]: /ja/getting_started/integrations
[4]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

integrations-extra からの Docker Agent とのインテグレーションを使用する最良の方法は、このインテグレーションがインストールされた Agent をビルドすることです。次の Dockerfile を使用して、integrations-extra からの `<インテグレーション名>` インテグレーションを含む Agent の更新バージョンをビルドします。

```text
FROM python:3.8 AS wheel_builder
WORKDIR /wheels
RUN pip install "datadog-checks-dev[cli]"
RUN git clone https://github.com/DataDog/integrations-extras.git
RUN ddev config set extras ./integrations-extras
RUN ddev -e release build <インテグレーション名>

FROM datadog/agent:latest
COPY --from=wheel_builder /wheels/integrations-extras/<インテグレーション名>/dist/ /dist
RUN agent integration install -r -w /dist/*.whl
```

次に、この新しい Agent イメージを[オートディスカバリー][1]と組み合わせて使用して、`<インテグレーション名>` チェックを有効にします。

[1]: /ja/agent/autodiscovery
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
[4]: /ja/getting_started/integrations
[5]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras