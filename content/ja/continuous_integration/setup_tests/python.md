---
title: Python テスト
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: ドキュメント
    text: テスト結果とパフォーマンスを調べる
  - link: /continuous_integration/troubleshooting/
    tag: ドキュメント
    text: トラブルシューティング CI
---
## 互換性

サポートされている Python インタープリター:
* Python >= 2.7 および >= 3.5

サポートされているテストフレームワーク:
* pytest >= 3.0.0
  * Python 2 を使用する場合は pytest < 5

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## Python トレーサーのインストール

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="bash" >}}
pip install -U ddtrace
{{< /code-block >}}

詳細については、[Python トレーサーのインストールドキュメント][2]を参照してください。

## テストのインスツルメンテーション

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加し、`DD_SERVICE` 環境変数でテスト対象のサービスまたはライブラリの名前を、`DD_ENV` 環境変数でテストが実行されている環境を指定します (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`)。

{{< code-block lang="bash" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

## コンフィギュレーション設定

以下は、コードか、または環境変数を使用した、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

`ddtrace.config.service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `pytest`<br/>
**例**: `my-python-app`

`ddtrace.config.env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][3]オプションも使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/python/
[3]: /ja/tracing/setup_overview/setup/python/?tab=containers#configuration