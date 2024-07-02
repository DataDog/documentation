---
title: Continuous Testing and CI/CD
description: Run Continuous Testing tests on-demand or at predefined intervals in your CI/CD pipelines.
aliases: 
  - /synthetics/ci
  - /synthetics/cicd_testing
  - /synthetics/cicd_integrations
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: Blog
  text: Incorporate Datadog Synthetic tests into your CI/CD pipeline
- link: "https://www.datadoghq.com/blog/shift-left-testing-best-practices/"
  tag: Blog
  text: Best practices for shift-left testing
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: Learning Center
  text: Learn how to run Synthetic tests in a CI/CD pipeline
- link: /synthetics/api_tests/
  tag: Documentation
  text: Learn how to configure an API test
- link: /synthetics/multistep
  tag: Documentation
  text: Learn how to configure a multistep API test
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Learn how to configure a browser test

---

<div class="alert alert-info">このページでは、継続的インテグレーション (CI) と継続的デリバリー (CD) のパイプラインの Continuous Testing テストの実行について説明します。CI のメトリクスやデータを Datadog のダッシュボードに取り込みたい場合は、<a href="/continuous_integration/" target="_blank">CI Visibility</a> のセクションを参照してください。</div>

## 概要

あらかじめ定義された間隔でテストを実行するだけでなく、`@datadog/datadog-ci` パッケージや API を使用して Datadog Synthetic テストを再利用してオンデマンドでこれを実行することができます。継続的インテグレーション (CI) パイプラインで Datadog Continuous Testing テストを実行すると、ブランチがデプロイされて本番でアプリケーションが壊れるのを防ぐことができます。

Continuous Testing と CI/CD を使用して、継続的デリバリー (CD) プロセスの一環としてテストを実行し、デプロイメントが終了した直後や新しいリリースが切られた直後に本番環境でアプリケーションとサービスの状態を評価することもできます。ユーザーに影響を与える可能性のある回帰を検出し、重要なテストが失敗したときに自動的にロールバックを起動することができます。

この機能により、バグや回帰を早期に発見することで、本番環境での問題解決にかかる時間を短縮し、エンジニアリングチームは緊急性のない作業に集中することができます。

まずは、[インテグレーション](#integrations)を参照し、[API](#use-the-api) または[オープンソース CLI パッケージ](#use-the-cli)を使用します。

## インテグレーション

{{< whatsnext desc="With Continuous Testing and CI/CD, you can run Continuous Testing tests in any CI platform provider of choice. See the documentation for information about the following integrations, or read more about the Datadog CI NPM package:">}}
    {{< nextlink href="continuous_testing/cicd_integrations/azure_devops_extension" >}}Azure DevOps Extension{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/bitrise_upload" >}}Upload Applications with Bitrise{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/bitrise_run" >}}Run Tests with Bitrise{{< /nextlink >}}
    {{< nextlink href="continuous_testing/cicd_integrations/configuration" >}}NPM package{{< /nextlink >}}
{{< /whatsnext >}}

## CLI を使用する

[`@datadog/datadog-ci` パッケージ][1]を使うと、CI/CD パイプラインの中で直接 Continuous Testing テストを実行することができます。[`@datadog/datadog-ci` NPM パッケージ][2]を使用するには、[構成][3]を参照してください。

タグを使った検索でテストをトリガーすることができます。例えば、`"ci": "datadog-ci synthetics run-tests --config fileconfig.json -s 'tag:staging'"` を使用します。このコマンドは引数として動作します。コンフィギュレーションファイルでは使用しないでください。

## API を使用する

Synthetics API のエンドポイントでは、ステージングとデプロイのライフサイクルのどの段階でもテストを開始できます。例えば、自動ロールバックされたカナリアデプロイメントの後などです。

API エンドポイントを使用して、新しいデプロイメントが回帰をもたらしていないことを迅速に検証します。[CI/CD パイプラインからテストを起動する][4]と[バッチの詳細の取得][5]エンドポイントを参照して、cURL またはサポートされているクライアントを通して CI 内でそれらを使用します。

### CI/CD パイプラインからテストをトリガー

エンドポイントをトリガーするテストは、1 回のリクエストで最大 100 件のテストに対応します。

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: トリガーする全テストのリストと各テストのコンフィギュレーションオーバーライドを含む JSON オブジェクト。

#### リクエストデータの構造

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

`TEST_TO_TRIGGER` オブジェクトは、トリガーしたいテストに必要な `public_id` と、オプションのコンフィギュレーションオーバーライドで構成されます。各フィールドの説明については、[テストの構成][6]を参照してください。

テストの公開識別子は、テストの詳細ページの URL にあるテストの識別子 (たとえば `https://app.datadoghq.com/synthetics/details/abc-def-ghi` の識別子は `abc-def-ghi`) か、テストの詳細ページの完全な URL (たとえば `https://app.datadoghq.com/synthetics/details/abc-def-ghi`) のどちらかです。

詳しくは、[Synthetics API エンドポイントのドキュメント][4]をご覧ください。

### バッチの詳細を取得

バッチの詳細の取得エンドポイントは、CI/CD パイプラインでトリガーされたテスト群 (バッチと呼ばれます) の結果を取得します。関連する CI の実行のための `batch_id` を提供する必要があります。

* **エンドポイント**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/ci/batch/{batch_id}`
* **Method**: `GET`
* **パラメーター**: 検査したいテスト結果のバッチの `batch_id`。

詳しくは、[Synthetics API エンドポイントのドキュメント][5]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /continuous_testing/cicd_integrations/configuration
[4]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[5]: /api/latest/synthetics/#get-details-of-batch
[6]: /continuous_testing/cicd_integrations/configuration#configure-tests
