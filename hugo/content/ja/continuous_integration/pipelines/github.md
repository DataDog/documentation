---
aliases:
- /ja/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: ドキュメント
  text: カスタムタグと測定値を追加して Pipeline Visibility を拡張する
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
title: CI Visibility 向け GitHub Actions セットアップ
---
## 概要{#overview}

[GitHub Actions][1] は、GitHub 上でコードのビルド、テスト、デプロイを行うことができる自動ツールです。開発プロセスのあらゆるステップを自動化するワークフローを作成し、リポジトリに統合された CI/CD 機能を使用してソフトウェアを効率的に更新し、コードの品質を向上させます。

GitHub Actions 向けに CI Visibility をセットアップして、ワークフローの実行を追跡し、パフォーマンスのボトルネックを特定し、運用上の問題をトラブルシューティングして、デプロイプロセスを最適化します。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [実行中のパイプライン][2] | 実行中のパイプライン | 稼働中のパイプライン実行を表示します。キューに入っているパイプラインまたは待機中のパイプラインは、Datadog では「Running (稼働中)」ステータスで表示されます。|
| [実行中のジョブ][28] | 実行中のジョブ | 現在稼働中のジョブ実行を表示します。|
| [ログ分析][23] | ログ分析 | 関連するログに対して LLM モデルを使用して、失敗した CI ジョブの根本原因を分析します。|
| ログの相関付け | ログの相関付け | パイプラインとジョブのスパンをログに関連付けます。[ログストレージ](#logs-storage)が必要です。|
| [部分的なリトライ][3] | 部分パイプライン | 部分的に再試行されたパイプライン実行を表示します。|
| [自動ジョブ再試行][27] | 自動ジョブ再試行 | Datadog は、AI エラーモデルによって一時的なものと分類された失敗ジョブを再試行します。|
| インフラストラクチャーメトリクスの相関 | インフラストラクチャーメトリクスの相関 | GitHub ジョブの[インフラストラクチャーホストメトリクス][4]にジョブを相関付けます。|
| [実行時のカスタムタグ][5][およびメジャー][6] | 実行時のカスタムタグおよびメジャー | 実行時の[カスタムタグおよびメジャー][7]を構成します。|
| [キュータイム][8] | キュータイム | パイプラインのジョブが処理される前にキューに残っている時間を表示します。|
| [承認待ち時間][9] | 承認待ち時間 | ワークフロー実行とワークフロージョブが手動承認を待機する時間を表示します。|
| [カスタムスパン][10] | カスタムスパン | パイプラインのカスタムスパンを構成します。|
| [クリティカルパスでの CI ジョブのフィルタリング][24] | クリティカルパスでの CI ジョブのフィルタリング | クリティカルパスでジョブでフィルタリングします。|
| [実行時間][25] | 実行時間  | パイプラインによるジョブ実行時間を表示します。|


以下の GitHub バージョンに対応しています。

- GitHub.com (SaaS)
- GHES (GitHub Enterprise Server) 3.5.0 以降

### 用語 {#terminology}

次の表に、Datadog CI Visibility と GitHub Actions の概念の対応を示します。

| Datadog  | GitHub Actions |
|----------|----------------|
| パイプライン | ワークフロー       |
| ジョブ      | ジョブ            |
| ステップ     | ステップ           |

## Datadog インテグレーションの構成 {#configure-the-datadog-integration}

### GitHub アプリの構成 {#configure-a-github-app}

[GitHub Actions][1] インテグレーションは、非公開の [GitHub App][11] を使用してワークフロー情報を収集します。すでにアプリをお持ちの場合は、次のセクションに進んでください。

1. [[GitHub integration] (GitHub インテグレーション) タイル][12]に移動します。
2. [{{< ui >}}\+ Create GitHub App{{< /ui >}}] (GitHub App の作成) をクリックします。
3. 個人アカウントまたは組織アカウントのインテグレーションを構成し、GitHub 組織の名前を入力します。
3. GitHub App で有効にする Datadog 機能を選択します。
4. [{{< ui >}}Edit Permissions{{< /ui >}}] (権限) セクションで、`Actions: Read Only` アクセス権を付与します。
5. [{{< ui >}}Create App in GitHub{{< /ui >}}] (GitHub のアプリ) をクリックして、GitHub でのアプリ作成プロセスを完了します。
6. アプリに名前を付けます (例: `Datadog CI Visibility`)。
7. [{{< ui >}}Install GitHub App{{< /ui >}}] (GitHub App のインストール) をクリックし、GitHub の指示に従って進めます。

### GitHub Actions で CI Visibility を設定する {#configure-ci-visibility-for-github-actions}

GitHub アプリを作成し、インストールしたら、視覚化したいアカウントやリポジトリで CI Visibility を有効にします。

1. Datadog で、[[**Software Delivery**] > [**CI Visibility**] > [**Add a Pipeline Provider**] (パイプラインプロバイダーの追加)][13] に移動し、[**GitHub**] を選択します。
2. 有効にするアカウントの [{{< ui >}}Enable Account{{< /ui >}}] (アカウントの有効化) をクリックします。
3. [{{< ui >}}Enable CI Visibility{{< /ui >}}] (CI Visibility の有効化) の横にあるトグルをクリックして、アカウント全体で CI Visibility を有効にします。
4. または、個々のリポジトリを有効にするには、リポジトリリストをスクロールしながら [{{< ui >}}Enable CI Visibility{{< /ui >}}] トグルをクリックします。

パイプラインは、アカウントやリポジトリに対して CI Visibility を有効にすると、すぐに表示されます。

### GitHub Actions で CI Visibility を無効にする {#disable-ci-visibility-for-github-actions}

CI Visibility GitHub Actions インテグレーションを無効にするには、次のようにします。

1. [[**CI/CD Optimization**] > [**Settings**] > [**GitHub Actions**]][14] を開きます。
2. CI Visibility を無効にする GitHub アカウントを選択し、[{{< ui >}}Account Enabled{{< /ui >}}] (有効なアカウント) をクリックします。
3. [{{< ui >}}Enable CI Visibility{{< /ui >}}] をオフにするか、無効にするリポジトリを個別に選択します。

### ジョブログを管理する {#manage-job-logs}

#### ログ分析 {#logs-analysis}

ログ分析は、LLM モデルを使用して、GitHub Actions から取得する関連ログに基づき、ジョブの失敗を根本原因別に分類します。

詳細については、[ログ分析の使用][23]に関するガイドを参照してください。

ログ分析は、Datadog でデフォルトで有効になっています。ログ分析の設定を管理するには、[CI/CD リポジトリの設定][29]に移動し、Datadog 組織レベルでまたは目的のリポジトリに対してログ分析を設定します。

ログ分析を PR コメントに追加することもできます。[PR コメントの使用][26]に関するガイドを参照してください。

ログ分析が有効になっていることは、[自動ジョブ再試行][27]の前提条件でもあります。

#### ログストレージ {#logs-storage}

ログストレージを有効にするには、[CI/CD リポジトリの設定][29]に移動し、Datadog 組織レベルでまたは目的のリポジトリに対してログストレージを有効にします。

ログストレージは、CI Visibility とは別に課金されます。ログの保持、除外、インデックスは [Log Management][16] で構成されます。GitHub ジョブのログは、`datadog.product:cipipeline` タグと `source:github` タグで確認できます。

ジョブログは [Log Management][15] で収集され、保存されると、CI Visibility で GitHub Actions ワークフローに自動的に関連付けられます。1GiB を超えるログファイルは切り捨てられます。

### インフラストラクチャー メトリクスとジョブの相関付け {#correlate-infrastructure-metrics-to-jobs}

GitHub Actions CI Visibility インテグレーションでは、インフラストラクチャーとジョブを関連付けることができます。これを行うために、ジョブが実行されるホストで [Datadog Agent][20] が実行されていることを確認します。構成によっては、追加の手順が必要になる場合があります。

- [Actions Runner Controller][21] の場合: 追加の設定は不要です。Datadog Agent の制限により、Datadog Agent の最小収集間隔よりも短いジョブでは、インフラストラクチャー相関メトリクスが常に表示されるとは限りません。この値を調整するには、[Agent 構成ファイル][22]で `min_collection_interval` を 15 秒未満に設定します。

- その他の構成の場合: ジョブをそのジョブを実行しているホストに関連付けるために、GitHub ランナー名がマシンのホスト名と一致していることを確認します。

メトリクスを表示するには、トレースビューでジョブスパンをクリックします。[{{< ui >}}Infrastructure{{< /ui >}}] (インフラストラクチャー) タブにホストメトリクスが表示されているウィンドウが開きます。

## Datadog でパイプラインデータを視覚化する{#visualize-pipeline-data-in-datadog}

[[**CI Pipeline List**] (CI パイプラインリスト)][17] ページおよび [[**Executions**] (実行)][18] ページには、パイプラインの完了後にデータが取り込まれます。

[{{< ui >}}CI Pipeline List{{< /ui >}}] ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳細については、「[CI パイプラインの検索と管理][19]」を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: /ja/glossary/#running-pipeline
[3]: /ja/glossary/#partial-retry
[4]: /ja/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
[5]: /ja/glossary/#custom-tag
[6]: /ja/glossary/#measure
[7]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ja/glossary/#queue-time
[9]: /ja/glossary/#approval-wait-time
[10]: /ja/glossary/#custom-span
[11]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[12]: https://app.datadoghq.com/integrations/github/
[13]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[14]: https://app.datadoghq.com/ci/settings/ci-cd/github
[15]: /ja/logs/
[16]: /ja/logs/guide/best-practices-for-log-management/
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/ci/pipeline-executions
[19]: /ja/continuous_integration/search/#search-for-pipelines
[20]: /ja/agent
[21]: https://github.com/actions/actions-runner-controller
[22]: /ja/agent/configuration/agent-configuration-files/
[23]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/
[24]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[25]: /ja/glossary/#pipeline-execution-time
[26]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[27]: /ja/continuous_integration/pipelines/automatic_retries/
[28]: /ja/glossary/#running-job
[29]: https://app.datadoghq.com/ci/settings/ci-cd/repositories