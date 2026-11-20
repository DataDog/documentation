---
aliases:
- /ja/ci
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: /continuous_integration/pipelines/
  tag: ドキュメント
  text: パイプラインデータを調査してビルドの問題を解決する
- link: /account_management/billing/ci_visibility
  tag: ドキュメント
  text: CI Visibility の課金に関する考慮事項について学ぶ
- link: /continuous_integration/tests/
  tag: ドキュメント
  text: テストデータを調査して、問題のあるテストを見つけて修正する
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: ブログ
  text: Datadog で CircleCI 環境を監視する
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: ブログ
  text: Datadog CI モニターでパイプラインアラートを構成する
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: ブログ
  text: 静的 Web アプリケーションを監視するためのベストプラクティス
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: ブログ
  text: CI/CD 監視のベストプラクティス
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: ブログ
  text: CI/CD におけるソフトウェアテストの監視のベストプラクティス
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: ブログ
  text: Datadog CI Pipeline Visibility で CI/CD のモダナイゼーションを監視する
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: ブログ
  text: Datadog をコードとして検出に使用する方法
- link: https://www.datadoghq.com/blog/cache-purge-ci-cd/
  tag: ブログ
  text: CI/CD パイプラインにおける安全かつ効率的なキャッシュパージのパターン
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog で GitLab ソースコードインテグレーションを使用して迅速にトラブルシューティングを実行する
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: ブログ
  text: プラットフォームエンジニアリングチームの成功メトリクス
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック(アプリログインが必要です)
title: Continuous Integration Visibility
---
{{< callout url=# btn_hidden="true" header="CI Visibility は CI/CD 最適化の一部です">}}CI/CD 最適化は、CI Visibility と Test Optimization を 1 つの統合インターフェースにまとめます。このページでは CI Visibility について説明します。Test Optimization と共通の機能については、[CI/CD 最適化][1] を参照してください。

[1]: /ja/cicd/
{{< /callout >}}

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  「Introduction to CI Visibility」セッションに参加して、Datadog CI Visibility が CI パイプラインの効率をどのように高めるか、Testing Visibility および Pipeline Visibility 製品の構成方法をご確認ください。
{{< /learning-center-callout >}}

## 概要 {#overview}

<div class="alert alert-info">このページでは、Continuous Integration (CI) のメトリクスとデータを Datadog Dashboards に取り込む方法について説明します。CI パイプラインで Continuous Testing のテストを実行する場合は、<a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing と CI/CD</a> セクションを参照してください。</div>

Datadog Continuous Integration (CI) Visibility は、CI 環境全体のパイプラインの結果、パフォーマンス、傾向、信頼性を統合的に表示します。Datadog を CI パイプラインと統合すると、モニターを作成し、[Datadog ダッシュボード][1] や [ノートブック][2] にデータを表示し、組織の CI の健全性を可視化できます。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility は、開発者がパイプラインの中断原因を理解し、パイプラインの実行時間の傾向を監視するのに役立ちます。また、ビルドエンジニアは、組織横断的な CI の健全性とパイプラインのパフォーマンスの経時的な変化を把握できます。

## パイプラインの信頼性向上とトレースの作成{#improve-pipeline-reliability-and-create-traces}

CI Visibility は、重大な開発作業の中断をその原因となったコミットに関連付けることで、パイプラインの障害やビルドの失敗のトラブルシューティングを支援します。パイプラインをインスツルメントし、実行中にトレースすることで、パイプラインのパフォーマンスをより詳しく把握できます。

## シームレスなインテグレーションにより効率を向上 {#increase-efficiency-through-seamless-integrations}

Datadog はさまざまな CI プロバイダーと統合し、コミットからデプロイまでの CI パイプラインのパフォーマンスを追跡するメトリクスを収集します。これらのメトリクスは、パフォーマンスの傾向や改善の機会を特定するために使用されます。

{{< card-grid >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="azure devops extension" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="circleci orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="その他の CI プロバイダー" >}}
{{< /card-grid >}}

`datadog-ci` CLI を使用して[コマンドをトレース][8]し、[カスタムタグとメジャー][9]を追加できます。これにより、パイプラインのトレースにユーザー定義のテキストタグと数値タグを追加できます。

## 始める準備はできましたか{#ready-to-start}

[Pipeline Visibility][3] にアクセスして、互換性要件やデータ収集の構成手順など、CI プロバイダーで CI Visibility をセットアップするための手順を確認してください。次に、[CI Visibility エクスプローラー][7] でパイプライン実行の詳細を確認し、検索クエリを [CI パイプラインモニター][6] にエクスポートします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ja/continuous_integration/pipelines/
[4]: /ja/continuous_integration/tests/
[6]: /ja/monitors/types/ci/
[7]: /ja/continuous_integration/explorer/
[8]: /ja/continuous_integration/pipelines/custom_commands/
[9]: /ja/continuous_integration/pipelines/custom_tags_and_measures/