---
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: CI テストの監視方法
- link: /continuous_integration/pipelines
  tag: Documentation
  text: CI パイプラインの監視方法
- link: /tests/test_impact_analysis
  tag: Documentation
  text: Test Impact Analyzer について
title: CI Visibility のトラブルシューティング
---

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

## Gitlab パイプラインで変数が不足している

[Gitlab のユーザー定義変数][16]は、CI Visibility で `@ci.parameters` フィールドにレポートされる必要があります。しかし、この情報は下流パイプラインなど一部のケースでのみ提供され、Gitlab が[常にこの情報をDatadog に送信するわけではない][17]ため、それ以外の場合は欠落する可能性があります。

### 実行中のパイプラインに関する制限

#### Webhook イベントの配信は、CI プロバイダーによって保証されていません。

実行中のパイプラインのサポートは、実行ステータスを示す CI プロバイダーから送信されるデータに依存しています。このデータが利用できない場合、Datadog で `Running` とマークされた実行はすでに終了している可能性があります。

#### パイプラインの最大実行時間

パイプラインの実行は、`Running` ステータスを最大 3 日間維持できます。それ以降も実行されている場合、そのパイプラインの実行は CI Visibility に表示されません。パイプラインの実行が 3 日後に終了した場合、終了したパイプラインの実行は、対応する最終ステータス (`Success`、`Error`、`Canceled`、`Skipped`) および正しい実行時間とともに CI Visibility に表示されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /ja/help/
[3]: /ja/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /ja/tracing/troubleshooting/tracer_debug_logs
[7]: /ja/continuous_integration/tests/containers/
[8]: /ja/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[9]: https://app.datadoghq.com/source-code/repositories
[10]: /ja/tests/test_impact_analysis
[11]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[12]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[13]: /ja/api/latest/ci-visibility-pipelines/#send-pipeline-event
[14]: /ja/continuous_integration/tests/#supported-features
[15]: /ja/continuous_integration/pipelines/#supported-features
[16]: https://docs.gitlab.com/ee/ci/variables/#define-a-cicd-variable-in-the-gitlab-ciyml-file
[17]: https://gitlab.com/gitlab-org/gitlab/-/issues/29539