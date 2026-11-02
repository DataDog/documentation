---
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/pipelines/github/
  tag: ドキュメント
  text: GitHub Actions 向けに CI Visibility をセットアップする
- link: /continuous_integration/pipelines/gitlab/
  tag: ドキュメント
  text: GitLab 向けに CI Visibility をセットアップする
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: 自動ジョブ再試行
---
## 概要{#overview}

自動ジョブ再試行を利用すると、ネットワークのタイムアウト、インフラストラクチャーの障害、不安定なテストといった一時的である可能性が高い失敗が再実行されるため、開発者の時間を節約できます。コードの本物の欠陥は再試行されません。Datadog は、失敗した各ジョブを AI を活用したエラー分類器によって処理します。失敗が再試行可能と判断された場合、Datadog は CI プロバイダーの API により、手動介入なしで再試行をトリガーします。

自動再試行を利用すると、開発者によるパイプラインの手動の再実行回数が減り、フィードバックループが加速し、一時的ではない失敗のみを基にパイプラインの成功メトリクスを生成できるようになります。

<div class="alert alert-info">自動ジョブ再試行は、<a href="/continuous_integration/pipelines/github/">GitHub Actions</a> と <a href="/continuous_integration/pipelines/gitlab/">GitLab</a> で利用可能です。</div>

## 自動ジョブ再試行の仕組み {#how-automatic-job-retries-work}

CI パイプライン内のジョブが失敗すると、次の処理が行われます。
1. Datadog の AI エラー分類器がジョブのログとエラーコンテキストを検査し、その失敗が一時的なものかどうかを判断します。
   - これは[ログ分析][6]で使用されているものと同じ AI エラー分類器であり、関連するジョブログを読み取って、失敗が一時的なものかどうかを判断します。
1. 失敗が再試行可能と分類された場合、Datadog はプロバイダーの API を通じて再試行をリクエストします。
1. Datadog は、再試行が無限に繰り返されることを防ぐために、失敗した各ジョブを (Datadog により設定される) 最大試行回数まで再試行します。再試行回数はジョブごと、コミットごとに計測されます。同じジョブが新しいコミットで再度失敗した場合、計測はリセットされます。
1. Datadog は、CI Visibility の元のパイプラインで再試行の結果を記録します。

## 前提条件{#prerequisites}

自動ジョブ再試行を使用するには、次のことが必要です。
- [GitHub Actions][1] または[GitLab][2] インテグレーションで CI Visibility が有効になっている必要があります。
- GitHub Actions の場合、[Datadog GitHub App][8] に **Actions: Write** 権限が必要です。
- 自動再試行を使用するリポジトリに対して、[Datadog ソースコードインテグレーション][3]が設定されている必要があります。
- 自動再試行を使用するリポジトリに対して、ログ分析が設定されている必要があります ([GitHub Actions のログ分析][4]または [GitLab のログ分析][5]を参照してください)。
- この機能を有効にするには、Datadog で [**CI Provider Settings Write**] (CI プロバイダー設定書き込み) 権限が付与されている必要があります。

## 自動ジョブ再試行を有効にする {#enable-automatic-job-retries}

前提条件を満たしたら、CI/CD 最適化設定から自動ジョブ再試行を有効にします。

1. [[**CI/CD Optimization**] (CI/CD 最適化) > [**Settings**] (設定) > [**Repositories**] (リポジトリ)][7] を開きます。
1. 設定を適用する場所を選択します。
   - すべてのリポジトリで自動ジョブ再試行をデフォルトで有効にする場合は、[**Organization**] (組織) タブを選択します。
   - 単一のリポジトリで自動ジョブ再試行を有効にする場合は、[**Repository-specific**] (リポジトリ固有) タブを選択します。多数のリポジトリに一度に適用する場合は、適用するリポジトリを選択して、[**Bulk Apply Settings**] (設定の一括適用) を使用します。
1. [**Mitigation**] (緩和) で、[**Auto Job Retries**] (自動ジョブ再試行) をオンに切り替えます。

{{< img src="continuous_integration/auto_job_retries_settings.png" alt="CI/CD 設定の [Auto Job Retries] トグル。" style="width:100%" >}}

## プロバイダー固有の動作 {#provider-specific-behavior}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

### GitHub Actions の自動ジョブ再試行 {#github-actions-automatic-job-retries}

GitHub Actions には 2 つのプロバイダーレベルの制限が設定されており、これによって再試行の方法が決まります。

- **再試行はワークフローの終了後に行われます。**GitHub API は、ワークフローの残りのジョブが実行されている間は、個々のジョブの再試行を許可しません。Datadog は、ワークフローが最終的なステータスに達してから、再試行を実行します。
- **再試行不可と分類されたジョブを含め、失敗したすべてのジョブがまとめて再試行されます。**GitHub API では、ワークフローに他にも失敗したジョブがある場合に、単一のジョブを再試行することはできません。Datadog は、1 回の GitHub API 呼び出しで、そのワークフローで失敗したすべてのジョブを再実行します。これにより、GitHub Actions のコンピューティング使用量が増加する場合があります。

### 保護されたブランチ {#protected-branches}

Datadog GitHub App のデフォルト権限では、保護されたブランチでの再試行は許可されていません。保護されたブランチ (デフォルトブランチなど) で自動再試行を有効にするには、アプリに組織全体のメンテナンス担当者レベルのアクセス権を付与してください。権限を拡張する前に、組織のポリシーを確認してください。

{{% /tab %}}
{{% tab "GitLab" %}}

### GitLab の自動ジョブ再試行 {#gitlab-automatic-job-retries}

GitLab でジョブが失敗するとすぐに、Datadog はその特定のジョブを再実行します (ジョブが再試行可能と分類されている場合)。(再試行可能と分類されていない) ほかの失敗したジョブや、成功したジョブには影響しません。再試行されたジョブ以外の追加の CI コストは発生しません。

自動ジョブ再試行は、SaaS (GitLab.com) とセルフホスト型 GitLab インスタンスの両方で機能します。

{{% /tab %}}
{{< /tabs >}}

## 失敗したジョブが再試行されないのはどのような場合ですか。{#when-is-a-failed-job-not-retried}

失敗したジョブが再試行されないのは、次のような場合です。

- AI 分類器がその失敗を再試行不可と分類した場合 (例: コンパイルエラーやアサーションテストの失敗)。
- 手動またはプロバイダー固有の再試行ルールによって、ジョブがすでに再試行されている場合。

**注:** GitHub Actions では、同じワークフロー内の別のジョブが再試行可能と分類されている場合、失敗した再試行不可のジョブも再実行されることがあります。Datadog は、「失敗したジョブの再実行」GitHub API 呼び出しを 1 回発行します。これにより、再試行不可のジョブを含む、ワークフロー内の失敗したジョブすべてが再実行されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/pipelines/github/
[2]: /ja/continuous_integration/pipelines/gitlab/
[3]: /ja/integrations/guide/source-code-integration/
[4]: /ja/continuous_integration/pipelines/github/#logs-analysis
[5]: /ja/continuous_integration/pipelines/gitlab/#logs-analysis
[6]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/
[7]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[8]: /ja/continuous_integration/pipelines/github/#configure-a-github-app