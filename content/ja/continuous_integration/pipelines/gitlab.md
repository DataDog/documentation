---
aliases:
- /ja/continuous_integration/setup_pipelines/gitlab
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: ドキュメント
  text: カスタムタグとメトリクスを追加してパイプラインの可視性を拡張する
title: GitLab パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

- **対応する GitLab のバージョン**:
- GitLab.com (SaaS)
- GitLab >= 14.1 (セルフホスティング)
- GitLab >= 13.7.0 (セルフホスティング)、機能フラグ `datadog_ci_integration` を有効にすることで利用可能です

- **Partial pipelines**: [一部再試行][11]とダウンストリームパイプラインの実行を表示する

- **Manual steps**: 手動でトリガーされたパイプラインを表示する

- **Queue time**: パイプラインのジョブが処理されるまでのキューでの待ち時間を表示する

- **Logs correlation**: パイプラインスパンをログに関連付け、[ジョブログの収集を有効にする][12]

- **Infrastructure metric correlation**: セルフホスティングの GitLab ランナーのために、パイプラインを[インフラストラクチャーホストメトリクス][14]に関連付ける

- **Custom pre-defined tags**: 生成されたすべてのパイプライン、ステージ、ジョブスパンに[カスタムタグ][10]を構成する

- **Custom tags and metrics at runtime**: ランタイムの[カスタムタグ][13]とメトリクスを構成する

- **Parameters**: カスタム `env` または `service` パラメーターを設定する

- **Pipeline failure reasons**: [エラーメッセージ][15]からパイプラインの障害理由を特定する

## Datadog インテグレーションの構成

{{< tabs >}}
{{% tab "GitLab.com" %}}

[プロジェクト][1]または[グループ][2]でのインテグレーションを構成するには、インスツルメントしたい各プロジェクトまたはグループに対して **Settings > Integrations > Datadog** に移動します。

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &gt;&equals; 14.1" %}}

[プロジェクト][1]または[グループ][2]でのインテグレーションを構成するには、インスツルメントしたい各プロジェクトまたはグループに対して **Settings > Integrations > Datadog** に移動します。

また、GitLab [インスタンス][3]レベルで、**Admin > Settings > Integrations > Datadog** にアクセスして、インテグレーションを有効にすることができます。

[1]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
[2]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-group-level-default-settings-for-a-project-integration
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#manage-instance-level-default-settings-for-a-project-integration
{{% /tab %}}
{{% tab "GitLab &lt; 14.1" %}}

`datadog_ci_integration` [機能フラグ][1]を有効にして、インテグレーションを有効にします。インストールの種類に応じて、GitLab の [Rails Runner][2] を使用する次のコマンドのいずれかを実行します。

**Omnibus インストール**

{{< code-block lang="shell" >}}
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**ソースインストールから**

{{< code-block lang="shell" >}}
sudo -u git -H bundle exec rails runner \
  -e production \
  "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

**Kubernetes インストール**

{{< code-block lang="shell" >}}
kubectl exec -it <task-runner-pod-name> -- \
  /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
{{< /code-block >}}

次に、インスツルメントしたい各プロジェクトの **Settings > Integrations > Datadog** で、[プロジェクト][3]単位でインテグレーションを構成します。

<div class="alert alert-warning"><strong>注</strong>: GitLab の初期バージョンの<a href="https://gitlab.com/gitlab-org/gitlab/-/issues/335218">バグ</a>により、<strong>GitLab のバージョン 14.1 未満</strong>では、GitLab の UI でオプションが利用可能であっても、<strong>グループまたはインスタンス</strong>レベルで Datadog インテグレーションを有効にすることができません。</div>

[1]: https://docs.gitlab.com/ee/administration/feature_flags.html
[2]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[3]: https://docs.gitlab.com/ee/user/admin_area/settings/project_integration_management.html#use-custom-settings-for-a-group-or-project-integration
{{% /tab %}}
{{< /tabs >}}

インテグレーションコンフィギュレーション設定を入力します。

**Active**
: インテグレーションを有効にします。

**Datadog site**
: データを送信する [Datadog サイト][1]を指定します。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}<br/>

**API URL** (オプション)
: データを直接送信するために使用される API URL をオーバーライドできます。これは、高度なシナリオでのみ使用されます。<br/>
**デフォルト**: (空、オーバーライドなし)

**API key**
: データを送信するときに使用する API キーを指定します。Datadog の Integrations セクションの [APIs タブ][2]で生成できます。

**Service** (オプション)
: インテグレーションによって生成された各スパンにアタッチするサービス名を指定します。これを使用して、GitLab インスタンスを区別します。<br/>
**デフォルト**: `gitlab-ci`

**Env** (オプション)
: インテグレーションによって生成された各スパンに接続する環境 (`env` タグ) を指定します。これを使用して、GitLab インスタンスのグループを区別します (例: ステージングまたは本番)。<br/>
**デフォルト**: `none`

**タグ** (オプション)
: インテグレーションによって生成された各スパンに付ける任意のカスタムタグを指定します。1 行に 1 つのタグを `key:value` の形式で指定します。<br/>
**デフォルト**: (空、追加タグなし)<br/>
**注**: GitLab.com と GitLab >= 14.8 セルフホスティングでのみ利用可能です。

**Test settings** ボタンを使用してインテグレーションをテストできます (プロジェクトでインテグレーションを構成する場合にのみ使用できます)。成功したら、**Save changes** をクリックしてインテグレーションのセットアップを完了します。

## Webhook を介したインテグレーション

ネイティブの Datadog インテグレーションを使用する代わりに、[Webhook][3] を使用してパイプラインデータを Datadog に送信できます。

<div class="alert alert-info"><strong>注</strong>: ネイティブの Datadog インテグレーションは、推奨されるアプローチであり、積極的に開発中のオプションです。</div>

リポジトリ (または GitLab インスタンス設定) の **Settings > Webhooks** に移動し、新しい Webhook を追加します。

- **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> ここで、`<API_KEY>` は [Datadog API キー][2]です。
- **Secret Token**: 空白のままにします
- **Trigger**: `Job events` と `Pipeline events` を選択します。

カスタムの `env` または `service` パラメーターを設定するには、Webhook の URL で他のクエリパラメーターを追加します: `&env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

### カスタムタグの設定

インテグレーションによって生成されたすべてのパイプラインとジョブのスパンにカスタムタグを設定するには、**URL** に URL エンコードされたクエリパラメーター `tags` を追加し、`key:value` ペアをカンマで区切って指定します。key:value のペアにカンマが含まれる場合は、引用符で囲んでください。例えば、`key1:value1, "key2: value with , comma",key3:value3` を追加するには、以下の文字列を **Webhook URL** に追記する必要があります。

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

#### Datadog Teams と統合する
パイプラインに関連付けられたチームの表示とフィルタリングを行うには、カスタムタグとして `team:<your-team>` を追加します。カスタムタグ名は、[Datadog Teams][16] のチームハンドルと正確に一致している必要があります。

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成された後、パイプラインが終了すると、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが表示されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

### 部分的およびダウンストリームパイプライン

**Pipeline Executions** のページでは、検索バーで以下のフィルターを使用することができます。

`Downstream Pipeline`
: 可能な値: `true`、`false`

`Manually Triggered`
: 可能な値: `true`、`false`

`Partial Pipeline`
: 可能な値: `retry`、`paused`、`resumed`

{{< img src="ci/partial_retries_search_tags.png" alt="検索クエリに Partial Pipeline:retry を入力したパイプラインの実行画面" style="width:100%;">}}

これらのフィルターは、ページの左側にあるファセットパネルからも適用することができます。
{{< img src="ci/partial_retries_facet_panel.png" alt="Partial Pipeline ファセットが展開され、値 Retry が選択されたファセットパネル、Partial Retry ファセットが展開され、値 true が選択されたファセットパネル" style="width:40%;">}}


### インフラストラクチャーメトリクスとジョブの相関付け

セルフホスティングの GitLab ランナーを使っている場合、ジョブとそれを実行しているインフラストラクチャーを関連付けることができます。この機能を使うには、GitLab ランナーに `host:<hostname>` という形式のタグが必要です。タグは、[新しいランナーを登録する][6]際に追加することができます。既存のランナーでは、ランナーの `config.toml` を更新することでタグを追加します。または、UI から **Settings > CI/CD > Runners** に移動して、該当するランナーを編集することでタグを追加します。

これらのステップの後、CI Visibility は各ジョブにホスト名を追加します。メトリクスを見るには、トレースビューでジョブスパンをクリックします。ドロワーに、ホストメトリクスを含む **Infrastructure** という新しいタブが表示されます。

### パイプライン失敗時のエラーメッセージの表示

エラーメッセージは GitLab のバージョン 15.2.0 以降でサポートされています。

GitLab パイプラインの実行に失敗した場合、特定のパイプライン実行内の `Errors` タブの下の各エラーは、GitLab からのエラータイプに関連するメッセージを表示します。

{{< img src="ci/ci_gitlab_failure_reason_new.png" alt="GitLab の失敗の理由" style="width:100%;">}}

各エラータイプに関連するメッセージとドメインについては、以下の表を参照してください。リストにないエラータイプは、`Job failed` というエラーメッセージと `unknown` というエラードメインになります。

| エラーの種類 | エラーメッセージ | エラードメイン |
| :---  |    :----:   |  ---: |
|  unknown_failure  |  原因不明で失敗  |  不明
|  config_error  |  CI/CD コンフィギュレーションファイルのエラーによる失敗 |  ユーザー
|  external_validation_failure  |  外部パイプラインの検証のため失敗  |  不明
|  user_not_verified  |  ユーザーが認証されていないため、パイプラインが失敗した  |  ユーザー
|  activity_limit_exceeded  |  パイプラインのアクティビティ制限を超過した  |  プロバイダー
|  size_limit_exceeded  |  パイプラインのサイズ制限を超過した  |  プロバイダー
|  job_activity_limit_exceeded  |  パイプラインのジョブアクティビティ制限を超過した  |  プロバイダー
|  deployments_limit_exceeded  |  パイプラインのデプロイ制限を超過した  |  プロバイダー
|  project_deleted  |  このパイプラインに関連するプロジェクトが削除された  |  プロバイダー
|  api_failure  |  API の失敗  |  プロバイダー
|  stuck_or_timeout_failure  |  パイプラインが停止している、またはタイムアウトしている  |  不明
|  runner_system_failure  |  ランナーシステムの不具合による失敗  |  プロバイダー
|  missing_dependency_failure  |  依存関係がないため失敗  |  不明
|  runner_unsupported  |  未対応のランナーのため失敗  |  プロバイダー
|  stale_schedule  |  スケジュールが古くなったため失敗  |  プロバイダー
|  job_execution_timeout  |  ジョブのタイムアウトによる失敗  |  不明
|  archived_failure  |  アーカイブの失敗  |  プロバイダー
|  unmet_prerequisites  |  前提条件が満たされていないため失敗  |  不明
|  scheduler_failure  |  スケジュール不具合による失敗  |  プロバイダー
|  data_integrity_failure  |  データ整合性のため失敗  |  プロバイダー
|  forward_deployment_failure  |  デプロイメントの失敗  |  不明
|  user_blocked  |  ユーザーによってブロックされた  |  ユーザー
|  ci_quota_exceeded  |  CI の割り当て超過  |  プロバイダー
|  pipeline_loop_detected  |  パイプラインループを検出  |  ユーザー
|  builds_disabled  |  ビルド無効  |  ユーザー
|  deployment_rejected  |  デプロイメントが拒否された  |  ユーザー
|  protected_environment_failure  |  環境に関する失敗  |  プロバイダー
|  secrets_provider_not_found  |  シークレットプロバイダーが見つからない  |  ユーザー
|  reached_max_descendant_pipelines_depth  |  子孫パイプラインの最大値に到達  |  ユーザー
|  ip_restriction_failure  |  IP 制限の失敗  |  プロバイダー

<!-- | ---------- | ---------- | ---------- | -->
<!-- | :---        |    :----:   |          ---: | -->

## ジョブログ収集を有効にする

以下の GitLab バージョンは、ジョブログの収集をサポートしています。

* GitLab.com (SaaS)
* GitLab >= 14.8 (セルフホスティング) [ジョブログを格納するためにオブジェクトストレージ][7]を使用している場合のみ

ジョブログの収集を有効にするには

1. GitLab セルフホスティングまたは GitLab.com アカウントで `datadog_integration_logs_collection` [機能フラグ][8]を有効にします。これにより、[Pipeline Setup ページ][17]の **Enable job logs collection** チェックボックスが表示されるようになります。
2. **Enable job logs collection** をクリックし、**Save changes** をクリックします。

ジョブログは[ログ管理][9]で収集され、CI Visibility で GitLab パイプラインと自動的に相関付けられます。1 GiB を超えるログファイルは切り捨てられます。

<div class="alert alert-info"><strong>注</strong>: Logs は、CI Visibility とは別課金となります。</div>

GitLab インテグレーションから収集されたジョブログの処理についての詳細は、[プロセッサーのドキュメント][18]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.gitlab.com/runner/register/
[7]: https://docs.gitlab.com/ee/administration/job_artifacts.html#using-object-storage
[8]: https://docs.gitlab.com/ee/administration/feature_flags.html
[9]: /ja/logs/
[10]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#set-custom-tags
[11]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#partial-and-downstream-pipelines
[12]: /ja/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[13]: /ja/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[14]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#correlate-infrastructure-metrics-to-jobs
[15]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom#view-error-messages-for-pipeline-failures
[16]: /ja/account_management/teams/
[17]: https://app.datadoghq.com/ci/setup/pipeline?provider=gitlab
[18]: /ja/logs/log_configuration/processors/