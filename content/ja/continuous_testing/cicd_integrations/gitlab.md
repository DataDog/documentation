---
aliases:
- /ja/synthetics/cicd_integrations/gitlab
description: Configure your GitLab instance to run Continuous Testing tests in your
  CI/CD pipelines.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Run Datadog Synthetic tests in your GitLab pipelines
- link: /continuous_integration/pipelines/gitlab/
  tag: Documentation
  text: Set up Tracing on a GitLab Pipeline
title: GitLab
---

## 概要

[GitLab][1] パイプラインで Continuous Testing テストを実行し、デプロイをブロックし、ロールバックをトリガーして、重要なビジネスワークフローが期待通りに機能するときに、コードが本番環境に追加されていることを確認します。

Continuous Testing テストを [GitLab パイプライン][2]にインテグレーションするには、[datadog-ci npm パッケージ][3]を使用します。

## セットアップ

始めるには

1. GitLab プロジェクトに Datadog の API キーとアプリケーションキーを変数として追加します。
2. GitLab ランナーに Node.js >= 10.24.1 がインストールされていることを確認します。

詳しくは、[CI/CD インテグレーション構成][4]をご覧ください。

## シンプルな構成

### テスト ID を使ったテストの実行

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --public-id xtf-w5p-z5n --public-id eif-van-tu7
{{< /code-block >}}

### タグを使ったテストの実行

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests'
{{< /code-block >}}

### 変数のオーバーライドを使ったテストの実行

もし、CI/CD 環境に固有のテストユーザーやデータがある場合は、`-v` コマンドでこれらの変数をオーバーライドすることができます。詳しくは、NPM パッケージ `datadog-ci` の [Synthetics コマンド](https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics)を参照してください。

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests' -v PASSWORD="$PASSWORD"
{{< /code-block >}}

## 高度なコンフィギュレーション

### カスタムコンフィギュレーションファイルを使ったテストの実行

カスタム `config.json` ファイルをパイプラインリポジトリに追加し、パイプラインの構成でアクセスします。

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --config synthetics_global.json -f synthetic_test.json
{{< /code-block >}}

### テスト出力

この例では、パイプラインがコンフィギュレーションファイルを識別し、テストを実行していることを示しています。

{{< img src="synthetics/cicd_integrations/gitlab/synthetic_test_run.png" alt="GitLab で実行する Synthetic テスト" style="width:100%;" >}}

テスト出力に成功すると、GitLab で次のように返されます。

{{< img src="synthetics/cicd_integrations/gitlab/successful_test_run.png" alt="GitLab パイプラインでの Synthetic テスト実行結果の成功例" style="width:100%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/gitlab/
[2]: https://docs.gitlab.com/ee/ci/pipelines/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /ja/synthetics/cicd_integrations/configuration