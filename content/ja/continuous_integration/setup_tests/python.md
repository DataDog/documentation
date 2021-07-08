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

サポートされているテストフレームワーク:
* Pytest 3.0+

サポートされている CI プロバイダー:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## トレースのインストール

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="bash" >}}
pip install "ddtrace>=0.50.0rc4"
{{< /code-block >}}

詳細については、[Python トレーサーのインストールドキュメント][2]を参照してください。

## pytest テストのインスツルメント

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加します。

{{< code-block lang="bash" >}}
pytest --ddtrace
{{< /code-block >}}

`pytest` の構成に使用されるファイル (`pytest.ini` や `setup.cfg` など) に次のコンフィギュレーションを追加することもできます。

{{< code-block lang="ini" >}}
[pytest]
ddtrace = 1
{{< /code-block >}}

## コンフィギュレーションパラメーター

`ddtrace.config.pytest["service"]`
: pytest トレースに対してデフォルトで報告されるサービス名。<br/>
**環境変数**: `DD_PYTEST_SERVICE`<br/>
**デフォルト**: `"pytest"`

`ddtrace.config.pytest["operation_name"]`
: pytest トレースに対してデフォルトで報告される操作名。<br/>
**環境変数**: `DD_PYTEST_OPERATION_NAME`<br/>
**デフォルト**: `"pytest.test"`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/python/