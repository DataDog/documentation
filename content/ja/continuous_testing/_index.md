---
title: Continuous Testing
description: Customize the number of Continuous Testing tests running in parallel in your CI/CD pipelines to increase your testing coverage.
disable_sidebar: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring"
  tag: Release Notes
  text: Check out the latest Datadog Continuous Testing releases! (App login required)
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: Learning Center
  text: Continuous Testing in a CI/CD Pipeline
- link: /getting_started/continuous_testing
  tag: Documentation
  text: Learn about Continuous Testing
- link: "/synthetics/private_locations/#scale-your-private-location"
  tag: Documentation
  text: Learn about Private Locations
- link: /continuous_testing/environments
  tag: Documentation
  text: Learn about Testing in Local and Staging Environments
- link: /continuous_testing/troubleshooting/
  tag: Documentation
  text: Troubleshoot Continuous Testing and CI/CD
- link: "https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/"
  tag: Blog
  text: Use Datadog Continuous Testing to release with confidence
- link: "https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/"
  tag: Blog
  text: Best practices for continuous testing with Datadog
cascade:
    algolia:
        rank: 70
---

<div class="alert alert-info">このページでは、CI/CD パイプラインで Continuous Testing のテストを実行する方法について説明します。CI/CD のメトリクスやダッシュボードを表示したい場合は、<a href="/continuous_integration/" target="_blank">CI Visibility のドキュメント</a>を参照してください。</div>

Datadog Continuous Testing は、製品のライフサイクル全体におけるソフトウェアテストを自動化するためのツール群を提供します。ノーコードで信頼性の高いエンドツーエンドテストを提供し、[一般的な CI プロバイダー][1]やコラボレーションツールとのシームレスなインテグレーションにより、Continuous Testing はアプリケーション開発を加速し、高品質の機能を迅速にリリースできるよう支援します。

## 簡単かつスピーディーにテストを実行

コードレスの [Web レコーダー][2]、[モバイルアプリレコーダー][15]、[並列テスト実行][3]、組み込みのマルチロケーションテストなどのスケーラブルな機能を使用して、QA チームの時間と労力を節約できます。また、[**Settings** ページ][3]で、テストを順次実行したり、同時に実行するテストの数をカスタマイズしたりできます。

{{< img src="continuous_testing/settings/parallelization.png" alt="Continuous Testing の設定ページで、テストを順次実行するか、同時に実行するテストの数をカスタマイズするかを選択します" style="width:100%;">}}

gRPC や WebSocket を含む複数のプロトコル、フレームワーク、API をサポートしており、アプリケーションスタックのあらゆるレベルにわたって、[あらゆる本番前環境を対象に][17]テストを行うことができます。

## テストの信頼性を向上

テストコードを実装する代わりに、[Synthetic モニタリングの回復力、拡張性、コードレステスト][4]を使用してソフトウェアを構築することができます。自己修復ブラウザテスト、モバイルアプリテスト、自動テスト再試行により、偽陽性を最小化し、テスト結果に自信を持つことができます。

ユーザーに最高の体験をさせるために、[クロスブラウザテスト][2]と[モバイルアプリケーションテスト][16]を自動化することができます。これらの Continuous Testing 機能は、さまざまなシナリオや環境をカバーするために複数のテストを実行する CI バッチで役立ちます。

## シームレスなインテグレーションで効率アップ

テストとトラブルシューティングを 1 つのプラットフォームで行うことにより、アプリケーション開発を迅速に進めることができます。以下の CI プロバイダーと [Slack][18] や [Jira][19] などのコラボレーションツールから選択し、ワークフローを統合し、コンテキストの切り替えを回避します。

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

[Datadog Terraform プロバイダー][10]を使って、テストの作成と状態管理をコントロールすることができます。Synthetic テストをステージング、プリプロダクト、カナリアデプロイメントの[インテグレーションおよびエンドツーエンドテスト][11]として活用したり、[CI パイプライン][11]で直接実行することができます。

## トラブルシューティングの高速化

統一されたモニタリングプラットフォームでテストを実施することで、テスト実行が失敗した根本原因を突き止め、平均解決時間 (MTTR) を短縮することができます。

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="Synthetic Monitoring & Testing Results Explorer の CI バッチのサイドパネル" style="width:100%;">}}

[Synthetic Monitoring & Testing Results Explorer][11] で実行されたジョブを確認することで、Datadog の [APM インテグレーション][12]で可視化された相関メトリクス、トレース、ログを通じて、ツールを切り替えることなく、トラブルシューティングのための完全なコンテキストを得ることができます。

## Synthetic Monitoring & Testing Results Explorer で CI バッチを調査する

Synthetic テストの実行や、CI/CD パイプラインで実行されているテストのバッチに対して、[検索クエリおよび視覚化][11]を作成します。

{{< img src="continuous_testing/explorer/results_explorer.png" alt="Synthetic Monitoring & Testing Results Explorer の CI バッチ結果のリスト" style="width:100%;">}}

個々のテスト実行やテストの包括的なバッチを監視し、テストの種類ごとに関連する洞察にアクセスできます。

## 準備はいいですか？

[Synthetic テスト][4]をいくつか構成したら、お好みの [CI/CD プロバイダー][1]のドキュメントを参照するか、CI/CD パイプラインで [`datadog-ci` NPM パッケージ][14]を使用します。ローカル環境や、プライベートネットワーク内のステージング環境でテストを実行する場合など、非公開の環境や本番以外の環境で Continuous Testing を使用するには、[ローカル環境およびステージング環境のテスト][17]を参照してください。その後、[Synthetic Monitoring & Testing Results Explorer][11] でバッチ実行の詳細について調べ始めます。

{{< learning-center-callout header="ラーニングセンターで CI/CD パイプラインでの Synthetic テストをお試しください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline">}}
  Datadog ラーニングセンターには、このトピックについて学ぶのに役立つ実践的なコースが満載です。無料で登録して、CI/CD パイプラインで Datadog Synthetic テストを実行する方法を学びましょう。
{{< /learning-center-callout >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: /synthetics/browser_tests
[3]: /continuous_testing/settings
[4]: /synthetics/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[11]: /continuous_testing/explorer
[12]: /synthetics/apm/
[13]: https://app.datadoghq.com/synthetics/create#
[14]: /continuous_testing/cicd_integrations/configuration
[15]: /mobile_app_testing/mobile_app_tests
[16]: /mobile_app_testing/
[17]: /continuous_testing/environments
[18]: /integrations/slack/
[19]: /integrations/jira/