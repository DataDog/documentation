---
aliases:
- /ja/continuous_integration/setup_pipelines/github
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
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: blog
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
title: GitHub Actions のワークフローにトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) は、サポートされていません。</div>
{{< /site-region >}}

## 互換性
- **サポートされている GitHub バージョン**:
  - GitHub.com (SaaS)
  - GitHub Enterprise Server (GHES) 3.5.0 以降
- **部分的パイプライン**: 部分リトライとダウンストリームパイプラインの実行を表示します

- **ログとの関連付け**: パイプラインスパンをログに関連付け、[ジョブログの収集を有効にします][10]

- **インフラストラクチャーメトリクスの相関**: セルフホスト型 GitHub ランナーのパイプラインジョブに[インフラストラクチャーメトリクスを相関付けます][11]。

- **ランタイムのカスタムタグおよびメトリクス**: パイプラインスパンのランタイムにカスタムタグとメトリクスを構成します

- **Queue time**: ワークフローのジョブが処理される前にキューに残っている時間を表示します

## Datadog インテグレーションの構成

### GitHub アプリの構成

[GitHub Actions][1] のインテグレーションは、プライベートな [GitHub アプリ][2]を使用してワークフロー情報を収集します。すでにアプリをお持ちの場合は、次のセクションに進んでください。

1. [GitHub インテグレーションタイル][3]に移動します。
2. **Link GitHub Account** をクリックします。
3. 指示に従って、個人または組織のアカウントにインテグレーションを構成します。
4. **Edit Permissions** で、`Actions: Read` アクセスを許可します。
5. **Create App in GitHub** をクリックすると、アプリの作成プロセス GitHub が完了します。
6. アプリの名前は、例えば `Datadog CI Visibility` とします。
7. **Install GitHub App** をクリックし、GitHub の指示に従ってください。

### GitHub Actions のトレースを構成する

GitHub アプリを作成し、インストールしたら、視覚化したいアカウントやリポジトリで CI Visibility を有効にします。

1. **[Getting Started][4]** ページに移動し、**GitHub** をクリックします。
2. 有効にしたいアカウントの **Enable Account** をクリックします。
3. **Enable CI Visibility** をクリックして、アカウント全体の CI Visibility を有効にします。
4. また、リポジトリリストをスクロールして、**Enable CI Visibility** トグルをクリックすると、個々のリポジトリを有効にすることができます。

パイプラインは、アカウントやリポジトリに対して CI Visibility を有効にすると、すぐに表示されます。

### ログ収集の有効化

GitHub Actions CI Visibility のインテグレーションでは、ワークフロージョブのログを [Logs Product][5] に自動転送することもできます。
ログを有効にするには、以下の手順で行います。

1. **[CI Visibility settings][6]** ページに移動します。
2. 有効になっている、またはリポジトリを有効にしているアカウントをクリックします。
3. アカウント全体のログを有効にするには、**Enable Job Logs Collection** をクリックします。
4. また、リポジトリリストをスクロールして、**Enable Job Logs Collection** トグルをクリックすると、個々のリポジトリを有効にすることができます。

ログ収集の切り替え直後は、ワークフロージョブのログが Datadog Logs に転送されます。なお、ログは CI Visibility とは別課金となります。ログの保持、除外、インデックスは、Logs Settings で構成されます。

1GiB を超えるログファイルは切り捨てられます。

### インフラストラクチャーメトリクスとジョブの相関付け

セルフホスト型の GitHub ランナーを使用している場合は、ジョブとそれを実行しているホストを関連付けることができます。これを行うには、GitHub ランナー名が実行されているマシンのホスト名と一致することを確認します。CI Visibility はこれを利用して、インフラストラクチャーのメトリクスにリンクします。メトリクスを見るには、トレースビューでジョブスパンをクリックすると、ウィンドウ内にホストメトリクスを含む **Infrastructure** という新しいタブが表示されます。

## Datadog でパイプラインデータを視覚化する

パイプラインが終了した後、[Pipelines][7] ページと [Pipeline Executions][8] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## GitHub Actions のトレースを無効にする

CI Visibility GitHub Actions のインテグレーションを無効にするには、GitHub アプリがワークフロージョブおよびワークフロー実行イベントのサブスクリプションを終了していることを確認します。イベントを削除するには

1. [GitHub Apps][9] のページに移動します。
2. 該当する Datadog GitHub アプリの **Edit > Permission & events** をクリックします (複数のアプリがある場合は、それぞれのアプリでこのプロセスを繰り返す必要があります)。
3. **Subscribe to events** セクションまでスクロールし、**Workflow job** および **Workflow run** が選択されていないことを確認します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/integrations/github/
[4]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[5]: https://docs.datadoghq.com/ja/logs/
[6]: https://app.datadoghq.com/ci/settings
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://github.com/settings/apps
[10]: https://docs.datadoghq.com/ja/continuous_integration/pipelines/github/#enable-log-collection
[11]: https://docs.datadoghq.com/ja/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs