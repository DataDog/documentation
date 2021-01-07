---
title: Datadog Agent v6 で Python 3 を使用する
kind: ガイド
further_reading:
  - link: /agent/versions/upgrade_to_agent_v7/
    tag: ドキュメント
    text: Agent バージョン7へアップグレード
---
v6.14.0 以降、Agent v6 は Python 2 および Python 3 ランタイムと互換性を持ちます。つまり、Agent のコンフィギュレーションにより、Python 2 または Python 3 のいずれでも Agent チェックを実行できます。

デフォルトでは、Agent v6 は Python 2 ランタイムを使用します。Python 3 ランタイムに変更するには:

{{< tabs >}}
{{% tab "Host Agent" %}}

1. [`datadog.yaml` コンフィギュレーションファイルで][1] `python_version` コンフィギュレーションオプションを設定します。

    ```yaml
    python_version: 3
    ```

2. [Agent を再起動します][2]。

または、`DD_PYTHON_バージョン` の環境変数を `2` または `3` に設定し、使用する Python ランタイムを選択することも可能です。設定されている場合、`datadog.yaml` の `python_version` オプションは無視されます。

これは、Agent 全体のコンフィギュレーションオプションです。**Agent により起動されたすべての Python チェックは、同じ Python ランタイムを使用します**。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized Agent" %}}

Agent v6.x と Agent v7.x の違いは、Agent v7.x には Python 3 ランタイムが含まれ、Agent v6.x には Python 2 ランタイムのみが含まれるという点だけなので、Agent のバージョンを変更するだけで Python ランタイムを変更することができます。一方の Python ランタイムから他方へ変更するには、該当する Agent イメージを選択します。

* **Python 2** ランタイム: Agent v6 イメージは、`gcr.io/datadoghq/agent:6.<AGENT_MINOR_VERSION>` のフォーマット。JMX チェックをサポートするイメージの場合は `gcr.io/datadoghq/agent:6.<AGENT_MINOR_VERSION>-jmx`。

* **Python 3** ランタイム: Agent v7 イメージは、`gcr.io/datadoghq/agent:7.<AGENT_MINOR_VERSION>` のフォーマット。JMX チェックをサポートするイメージの場合は `gcr.io/datadoghq/agent:7.<AGENT_MINOR_VERSION>-jmx`。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}