---
aliases:
- /ja/ci
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - 継続的インテグレーション
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: ブログ
  text: Datadog で CircleCI 環境を監視する
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: ブログ
  text: Datadog CI モニターによるパイプラインアラートの構成
- link: /continuous_integration/pipelines/
  tag: ドキュメント
  text: ビルドの問題を解決するためにパイプラインデータを調査する
- link: /account_management/billing/ci_visibility
  tag: ドキュメント
  text: CI Visibility の請求に関する注意事項について
- link: /continuous_integration/tests/
  tag: ドキュメント
  text: 問題のあるテストを見つけて修正するために、テストデータを調査する
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: ブログ
  text: 静的 Web アプリケーションを監視するためのベストプラクティス
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: ブログ
  text: CI/CD 監視のベストプラクティス
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: ブログ
  text: CI/CD のソフトウェアテストを監視するためのベストプラクティス
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: ブログ
  text: Datadog CI Pipeline Visibility で CI/CD のモダナイゼーションを監視
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: ブログ
  text: Datadog を Detection as Code (コードとしての検出) に使用する方法
title: Continuous Integration Visibility
---

<div class="alert alert-info">このページでは、継続的インテグレーション (CI) のメトリクスとデータを Datadog のダッシュボードに取り込む方法について説明します。CI パイプラインで Continuous Testing テストを実行したい場合は、<a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing と CI/CD</a> のセクションを参照してください。</div>

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加" hide_image="true" btn_title="登録" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  Datadog CI Visibility がどのようにして CI パイプラインの効率を高めるのか、また、Testing Visibility と Pipeline Visibility 製品の構成方法について学ぶために、CI Visibility 入門セッションにご参加ください。
{{< /learning-center-callout >}}


## 概要

Datadog Continuous Integration (CI) Visibility は、CI 環境全体のパイプラインの結果、パフォーマンス、トレンド、信頼性を統合的に表示します。CI パイプラインに Datadog を統合することで、モニターを作成したり、[Datadog ダッシュボード][1]や[ノートブック][2]にデータを表示したり、組織の CI の健全性を可視化したりすることができます。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility は、開発者がパイプラインの中断の原因を理解し、パイプラインの実行時間の傾向を監視するのに役立ちます。また、ビルドエンジニアは、組織横断的な CI の健全性とパイプラインのパフォーマンスの経時変化に関する洞察を得ることができます。

## パイプラインの信頼性を向上させ、トレースを作成

CI Visibility は、最も重大な開発障害とその原因となったコミットを結びつけることで、パイプラインの障害やビルドの失敗のトラブルシューティングを支援します。パイプラインをインスツルメントし、その実行をトレースすることで、パイプラインのパフォーマンスについてより深い洞察を得ることができます。

## シームレスなインテグレーションで効率アップ

Datadog は、様々な CI プロバイダーと統合し、コミットからデプロイまでの CI パイプラインのパフォーマンスを追跡するメトリクスを収集します。これらのメトリクスは、パフォーマンスの傾向と改善の機会を特定するために使用されます。

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

`datadog-ci` CLI を使用して[コマンドのトレース][8]や[カスタムタグと測定値][9]の追加を行うことができます。これにより、ユーザー定義のテキストおよび数値タグをパイプライントレースに追加することができます。

## 準備はいいですか？

互換性要件の詳細やデータ収集の構成手順など、CI プロバイダーで CI Visibility をセットアップする手順については、[Pipeline Visibility][3] を参照してください。その後、[CI Visibility Explorer][7] でパイプライン実行の詳細を調査し、検索クエリを [CI Pipeline Monitor][6] にエクスポートしてください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ja/continuous_integration/pipelines/
[4]: /ja/continuous_integration/tests/
[6]: /ja/monitors/types/ci/
[7]: /ja/continuous_integration/explorer/
[8]: /ja/continuous_integration/pipelines/custom_commands/
[9]: /ja/continuous_integration/pipelines/custom_tags_and_measures/