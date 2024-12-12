---
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: CI テストの監視方法
- link: /continuous_integration/pipelines
  tag: Documentation
  text: CI パイプラインの監視方法
- link: /continuous_integration/intelligent_test_runner
  tag: Documentation
  text: Intelligent Test Runner について
title: CI Visibility のトラブルシューティング
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

このページでは、CI Visibility に関する問題のトラブルシューティングに役立つ情報を提供します。さらにヘルプが必要な場合は、[Datadog サポート][2]にお問い合わせください。

## Jenkins インスタンスがインスツルメントされていますが、Datadog にデータが表示されていません

1. 1 つ以上のパイプラインが実行を完了していることを確認します。パイプラインの実行情報は、パイプラインが完了しないと送信されません。
2. Datadog Agent ホストが適切に構成されており、Datadog プラグインから到達可能であることを確認してください。Jenkins プラグインコンフィギュレーション UI の **Check connectivity with the Datadog Agent** (Datadog Agent との接続を確認する) ボタンをクリックすると、接続をテストできます。
3. Jenkins のログにエラーがないか確認します。Datadog プラグインのデバッグレベルのログを有効にするには、[`logging.properties` ファイルを作成][1]して、`org.datadog.level = ALL` という行を追加します。

## パイプラインが見つかりません

[`running` パイプラインをサポートしていない CI プロバイダー][15]で、進行中のパイプラインから送られてくる不完全なデータをクリックすると、「パイプラインが見つかりません」というメッセージが表示されます。ステージ、ジョブ、カスタムコマンドのデータは、順次受信されます。パイプラインが終了するまで待ち、再度お試しください。

## Pipelines ページでパイプラインが欠落している

パイプラインページには、Git 情報のないパイプラインか、Git リポジトリのデフォルトブランチに属するGit 情報を持つパイプラインしか表示されません。

## サマリーテーブルでステージやジョブが欠落している

_Pipeline Details_ ページでステージやジョブが見つからないのは、構成が間違っている可能性があります。ステージまたはジョブの実行に保存されているパイプライン名が、親パイプラインの**同じ**名前と一致していることを確認してください。カスタムパイプラインを使用している場合は、[公開 API エンドポイント仕様][15]を参照してください。

## Missing variables in Gitlab pipelines

[User-defined variables in Gitlab][16] should be reported in the field `@ci.parameters` in CI Visibility. However, this information is only present in some cases like downstream pipelines, and may be missing for the rest of the cases since Gitlab [does not always report this information][17] to Datadog.

### Limitations on running pipelines

#### Delivery of webhook events is not guaranteed by CI providers

Running pipelines support relies on data sent from CI providers indicating execution status. If this data is not available, executions marked as `Running` in Datadog may have already finished.

#### Maximum duration for a pipeline execution

A pipeline execution can maintain `Running` status for a maximum of three days. If it is still running after that time, the pipeline execution does not appear in CI Visibility. If a pipeline execution finishes after three days, the finished pipeline execution appears in CI Visibility with its correspondent final status (`Success`, `Error`, `Canceled`, `Skipped`) and with the correct duration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /ja/help/
[3]: /ja/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /ja/tracing/troubleshooting/tracer_debug_logs
[7]: /ja/continuous_integration/tests/containers/
[8]: /ja/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[9]: https://app.datadoghq.com/ci/settings/repository
[10]: /ja/continuous_integration/intelligent_test_runner/
[11]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[12]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[13]: /ja/api/latest/ci-visibility-pipelines/#send-pipeline-event
[14]: /ja/continuous_integration/tests/#supported-features
[15]: /ja/continuous_integration/pipelines/#supported-features
[16]: https://docs.gitlab.com/ee/ci/variables/#define-a-cicd-variable-in-the-gitlab-ciyml-file
[17]: https://gitlab.com/gitlab-org/gitlab/-/issues/29539