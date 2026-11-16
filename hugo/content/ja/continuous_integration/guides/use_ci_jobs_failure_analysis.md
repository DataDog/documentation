---
description: ログ分析を使用して、CI パイプラインの失敗の最も一般的な根本原因を特定する方法を学びます。
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: ドキュメント
  text: パイプライン実行を検索および管理する方法を学ぶ
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
  tag: ドキュメント
  text: パイプラインの実行時間を短縮するためにクリティカルパス上の CI ジョブを特定する
title: ログ分析を使用して、失敗した CI ジョブの根本原因を特定する
---
## 概要{#overview}

このガイドでは、ログ分析を使用して、失敗した CI ジョブの最も一般的な根本原因を特定する方法について説明します。これは、CI パイプラインのユーザーエクスペリエンスを向上させるために役立ちます。

Datadog でもこの分類器を活用して[ジョブの自動再試行][10]を行っています。これは、失敗が一時的である可能性が高いジョブを再実行します。

### ロブ分析について {#understanding-logs-analysis}

CI Visibility は LLM モデルを使用して、失敗したすべての CI ジョブから収集された関連ログに基づいて、強化されたエラーメッセージを生成し、それらをドメインおよびサブドメインで分類します。

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="LLM によって生成されたエラーが示される失敗した CI ジョブ" width="90%">}}

#### CI Visibility では、CI ジョブの関連ログをどのように特定しますか。{#how-does-ci-visibility-identify-the-relevant-logs-of-a-ci-job}

CI Visibility では、その CI ジョブの以前の成功した実行から収集されたログに表示されていないログ行を、関連があると見なします。ログの関連性は、失敗した CI ジョブから収集されたログについてのみ計算されます。

ログ行が関連性があると見なされたかどうかは、ログエクスプローラーで `@relevant:true` タグを使用してチェックできます。

#### LLM モデルはどのような情報を入力として使用しますか。{#what-information-does-the-llm-model-use-as-input}

失敗した CI ジョブに関連ログがある場合、LLM モデルは関連ログの最後の 100 行を入力として使用します。失敗した CI ジョブに関連ログがない場合、CI Visibility はログの最後の 100 行を送信します。

各ログ行は使用される前に、機密である可能性がある情報をマスキングするために事前スキャンされます。

<div class="alert alert-info">
LLM モデルは、類似したメッセージを持つエラーを、それぞれ異なるが関連するサブドメインに分類できます。たとえば、エラーメッセージが <code>Cannot connect to docker daemon</code>である場合、これは通常、 <code>domain:platform</code> と <code>subdomain:network</code>に分類されます。ただし、LLM モデルでは代わりに <code>subdomain:infrastructure</code> に分類することがあります。
</div>

#### ドメインとサブドメイン {#domains-and-subdomains}

エラーはドメインとサブドメインによって分類されます。

##### ドメイン {#domains}

| ドメイン   | 説明                                                                                                                                                       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`     | CI パイプラインでビルドおよびテストされているコードに起因する失敗。これらは、コードを変更した開発者が修正する必要があります。          |
| `platform` | ビルドおよびテストされているコード以外の理由に起因する失敗。これらの失敗は、CI プロバイダー、基盤となるインフラストラクチャー、または外部依存関係が原因である可能性があります。これらは開発者のコード変更とは無関係であり、多くの場合、CI システム全体を所有するチームが修正する必要があります。|
| `unknown`  | ログによって、ジョブ失敗の明確な根本原因が判明しない場合に使用されます。                                                                                               |

##### サブドメイン {#subdomains}

ドメインタブをクリックすると、対応するサブドメインが表示されます。

{{< tabs >}}
{{% tab "コード" %}}

| サブドメイン | 原因                                     | 例                                                                                                                   |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `build`     | コンパイルエラーまたはビルドエラー。| `Compilation error in processor_test.go:28:50`                                                                             |
| `test`      | テストの失敗。             | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| `quality`   | フォーマットまたはリンティングの失敗。    | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| `security`  | セキュリティ違反。         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "プラットフォーム" %}}

| サブドメイン      | 原因                                                                                         | 例                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assembly`       | アーティファクト生成におけるエラー、またはスクリプト実行中のアセンブリエラー。| `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| `deployment`     | デプロイ中のエラー、またはデプロイ設定に関連するエラー。            | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| `infrastructure` | ジョブが実行されたインフラストラクチャーに関連するエラー。                | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| `network`        | ほかの依存関係との接続性に関するエラー。                                 | `Connection refused when accessing localhost:8080.`                                                                                                   |
| `credentials`    | 認証に関するエラー。資格情報が不足しているか、間違っています。                         | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| `dependencies`   | ジョブの実行に必要な依存関係のインストールまたは更新に関するエラー。      | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| `git`            | git コマンドの実行エラー。                                                  | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| `checks`         | CI ジョブの実行中に必要なチェックの完了に関するエラー。           | `Release note not found during changelog validation`                                                                                                  |
| `setup`          | CI ジョブのセットアップに関するエラー。                                                | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| `script`         | CI ジョブ内のスクリプトの構文エラー。                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "Unknown" %}}

| サブドメイン | 説明                     | 例                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| 不明   | エラーを分類できませんでした。 | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### サポートされている CI プロバイダー {#supported-ci-providers}

ログ分析は、以下の CI プロバイダーで利用可能です。

* [Azure Pipelines][8]
* [Buildkite][12]
* [CircleCI][13]
* [GitHub Actions][1]
* [GitLab][2]

**注:** ログ分析には、CI プロバイダー固有の設定が必要な場合があります。ご使用のプロバイダーの [Pipeline Visibility 設定ページ][6]の [**Logs Analysis**] (ログ分析) セクションを確認してください。

<div class="alert alert-info">ログ分析に興味があるものの、ご利用の CI プロバイダーがまだサポートされていない場合は、<a href="https://forms.gle/vSrqS5QwitgHf9wG6" target="_blank">こちらのフォーム</a>にご記入ください。</div>

## CI パイプラインで最も頻繁に発生するエラーを特定する {#identify-the-most-recurrent-errors-in-your-ci-pipelines}

### [CI Health] (CI の健全性) ページの使用 {#using-the-ci-health-page}

[CI Health][3] は、CI パイプラインの健全性とパフォーマンスの概要を提供します。これは、DevOps チームやエンジニアリングチームが CI ジョブを監視し、失敗を検出し、ビルドパフォーマンスを最適化するために役立ちます。

このページでは、CI パイプライン内のエラーの内訳をエラー領域別に確認できます。CI パイプラインをクリックし、[{{< ui >}}Failed Executions{{< /ui >}}] (失敗した実行) セクションの [{{< ui >}}Breakdown{{< /ui >}}] (内訳) 列を確認します。

{{< img src="continuous_integration/ci_health_failed_executions_breakdown.png" alt="CI Health における CI ジョブ失敗分析の内訳" width="90%">}}

### ファセットの使用 {#using-facets}

ファセット `@error.message`、`@error.domain`、および `@error.subdomain` を使用して、CI パイプラインで最も頻繁に発生するエラーを特定します。これらのファセットを使用して、カスタムダッシュボードやノートブックを作成できます。

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="error.domain および error.subdomain でフィルタリングされた、失敗した CI ジョブ" width="90%">}}

これらのファセットは、クエリで `ci_level:job` を使用している場合にのみ利用可能です。CI ジョブ失敗分析を計算できない場合 (使用している CI プロバイダーがサポートされていない場合など)、これらのファセットには CI プロバイダーからのエラー情報が含まれます。

### ダッシュボードテンプレートの使用 {#using-the-dashboard-template}

[{{< ui >}}CI Visibility - CI Jobs Failure Analysis{{< /ui >}}] (CI Visibility - CI ジョブ失敗分析) ダッシュボードテンプレートをインポートできます。

1. [civisibility-ci-jobs-failure-analysis-dashboard.json][4] ダッシュボードテンプレートを開き、内容をクリップボードにコピーします。
2. Datadog で[新しいダッシュボード][5]を作成します。
3. コピーした内容を新しいダッシュボードに貼り付けます。
4. ダッシュボードを保存します。

{{< img src="continuous_integration/ci_jobs_failure_analysis_dashboard.png" alt="[Logs Analysis] (ログ分析) ダッシュボード" width="90%">}}

### PR コメントの使用{#using-pr-comments}

PR コメントにログ分析を追加できます。

{{< img src="continuous_integration/pr_comment.png" alt="ログ分析が含まれる PR コメント" width="90%">}}

PR コメントを投稿するには、ご使用のリポジトリが Datadog と統合されている必要があります。詳細については、「[Git リポジトリを Datadog に接続する][7]」を参照してください。

[[**CI/CD Optimization**] (CI/CI の最適化) > [**Settings**] (設定) > [**Repositories**] (リポジトリ)][11] で PR コメントを有効にします。

1. 設定を適用する場所を選択します。
   - [**Organization**] (組織) タブを選択して、すべてのリポジトリで PR コメントをデフォルトで有効にします。
   - [**Repository-specific**] (リポジトリ固有) タブを選択して、単一のリポジトリで PR コメントを有効にします。
1. [**General**] (一般) で、[**PR Comments**] (PR コメント) をオンにします。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/ja/continuous_integration/pipelines/github/
[2]:/ja/continuous_integration/pipelines/gitlab/
[3]:https://app.datadoghq.com/ci/pipelines/health/
[4]:/ja/resources/json/civisibility-ci-jobs-failure-analysis-dashboard.json
[5]:/ja/dashboards/
[6]:/ja/continuous_integration/pipelines/#setup
[7]:/ja/integrations/guide/source-code-integration/#connect-your-git-repositories-to-datadog
[8]:/ja/continuous_integration/pipelines/azure/
[10]:/ja/continuous_integration/pipelines/automatic_retries/
[11]:https://app.datadoghq.com/ci/settings/ci-cd/repositories
[12]:/ja/continuous_integration/pipelines/buildkite/
[13]:/ja/continuous_integration/pipelines/circleci/