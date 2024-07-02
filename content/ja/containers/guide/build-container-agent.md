---
title: Build Datadog Agent image
aliases:
 - /agent/guide/build-container-agent
---

Datadog Docker Agent を特定の `<AGENT_VERSION>` でビルドするには、以下の手順に従います。Agent のバージョンは v6.0 以降です。

1. Datadog Agent レポジトリを複製します。

    ```shell
    git clone https://github.com/DataDog/datadog-agent.git
    ```

2. `datadog-agent/Dockerfiles/agent/` フォルダに移動します。

    ```shell
    cd datadog-agent/Dockerfiles/agent/
    ```

3. ビルドする Agent のバージョンのブランチに切り替えます。

    ```shell
    git branch <AGENT_VERSION> && git checkout <AGENT_VERSION>
    ```

4. その Agent バージョンに対応する Agent Debian パッケージをダウンロードします。AMD と ARM のいずれかのアーキテクチャを選択してください。

    {{< tabs >}}
{{% tab "AMD" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_amd64.deb -o datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

{{% /tab %}}
{{% tab "ARM" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_arm64.deb -o datadog-agent_<AGENT_VERSION>-1_arm64.deb
```

{{% /tab %}}
{{< /tabs >}}

    **注**: 利用可能な Debian パッケージの一覧は、[こちらの APT リスト][1]を参照してください。

5. 以下を実行して Agent イメージをビルドします。

    {{< tabs >}}
{{% tab "AMD" %}}

```shell
docker build --build-arg <BUILD_ARGS> --file amd64/Dockerfile --pull --tag <IMAGE_TAG> .
```

{{% /tab %}}
{{% tab "ARM" %}}

```shell
docker build --build-arg <BUILD_ARGS> --file arm64/Dockerfile --pull --tag <IMAGE_TAG> .
```

{{% /tab %}}
{{< /tabs >}}

    たとえば、AMD アーキテクチャで Agent バージョン 7.17.0 のイメージをビルドするには、以下を実行します。

    ```shell
    docker build --build-arg DD_AGENT_ARTIFACT=./datadog-agent_7.17.0-1_amd64.deb --file amd64/Dockerfile --pull --tag documentation-example .
    ```

     `<BUILD_ARGS>` には以下を定義できます。
    | 引数          | 定義                                                                  | デフォルト |
    | ----------------- | --------------------------------------------------------------------------- | ------- |
    | PYTHON_VERSION    | Agent チェックに必要な Python ランタイムのバージョン。                            | `-`     |
    | WITH_JMX          | `true` に設定すると、Agent コンテナに JMX フェッチのロジックが含まれます。         | `false` |
    | DD_AGENT_ARTIFACT | 使用する Agent Debian アーティファクトパッケージのパス（同じフォルダにない場合）　 | `-`     |

[1]: http://apt.datadoghq.com/pool/d/da/
