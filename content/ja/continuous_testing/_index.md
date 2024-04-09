---
cascade:
  algolia:
    rank: 70
description: CI/CD パイプラインで並行して実行される Continuous Testing のテスト数をカスタマイズして、テストカバレッジを向上させることができます。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: リリースノート
  text: Datadog Continuous Testing の最新リリースをチェック！ (アプリログインが必要です)
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: ラーニングセンター
  text: CI/CD パイプラインでの Continuous Testing
- link: /getting_started/continuous_testing
  tag: ドキュメント
  text: Continuous Testing について
- link: /synthetics/private_locations/#scale-your-private-location
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /continuous_testing/environments
  tag: ドキュメント
  text: ローカル環境およびステージング環境でのテストについて
- link: /continuous_testing/troubleshooting/
  tag: ドキュメント
  text: Continuous Testing と CI/CD のトラブルシューティング
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: ブログ
  text: Datadog Continuous Testing により、自信を持ってリリースすることができます
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: ブログ
  text: Datadog を使った継続的テストのベストプラクティス
kind: documentation
title: Continuous Testing
---

<div class="alert alert-info">このページでは、CI/CD パイプラインで Continuous Testing のテストを実行する方法について説明します。CI/CD のメトリクスやダッシュボードを表示したい場合は、<a href="/continuous_integration/" target="_blank">CI Visibility のドキュメント</a>を参照してください。</div>

Datadog Continuous Testing は、製品のライフサイクル全体におけるソフトウェアテストを自動化するためのツール群を提供します。ノーコードで信頼性の高いエンドツーエンドテストを提供し、[一般的な CI プロバイダー][1]やコラボレーションツールとのシームレスなインテグレーションにより、Continuous Testing はアプリケーション開発を加速し、高品質の機能を迅速にリリースできるよう支援します。

## 簡単かつスピーディーにテストを実行

コードレス [Web レコーダー][2]、[モバイルアプリレコーダー][15]、[並行テスト実行][3]、内蔵のマルチロケーションテストなどの拡張性の高い機能を使用して、QA チームの時間と労力を節約します。

{{< img src="continuous_testing/continuous_testing_selection.png" alt="Continuous Testing の設定ページで、テストを順次実行するか、同時に実行するテストの数をカスタマイズするかを選択します" style="width:100%;">}}

gRPC や WebSocket を含む複数のプロトコル、フレームワーク、API をサポートしており、アプリケーションスタックのあらゆるレベルにわたって、[あらゆる本番前環境を対象に][17]テストを行うことができます。

## テストの信頼性を向上

テストコードを実装する代わりに、[Synthetic モニタリングの回復力、拡張性、コードレステスト][4]を使用してソフトウェアを構築することができます。自己修復ブラウザテスト、モバイルアプリテスト、自動テスト再試行により、誤検知を最小化し、テスト結果に自信を持つことができます。ユーザーに最高の体験をさせるために、[クロスブラウザテスト][2]と[モバイルアプリケーションテスト][16]を自動化することができます。

## シームレスなインテグレーションで効率アップ

テストとトラブルシューティングを 1 つのプラットフォームで行うことにより、アプリケーション開発を迅速に進めることができます。以下の CI プロバイダーと Slack や Jira などのコラボレーションツールから選択し、ワークフローを統合し、コンテキストの切り替えを回避します。

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

[Datadog Terraform プロバイダー][10]を使って、テストの作成と状態管理をコントロールすることができます。Synthetic テストをステージング、プリプロダクト、カナリアデプロイメントの[インテグレーションおよびエンドツーエンドテスト][11]として活用したり、[CI パイプライン][11]で直接実行することができます。

## トラブルシューティングの高速化

統一された監視プラットフォームでテストを実行することで、失敗したテスト実行の根本原因を見つけ、MTTR を短縮することができます。[Synthetic Monitoring & Continuous Testing Explorer][11] で実行されたジョブを確認することで、Datadog の [APM インテグレーション][12]で可視化された相関メトリクス、トレース、ログを通じて、ツールを切り替えることなく、トラブルシューティングのための完全なコンテキストを得ることができます。

{{< img src="continuous_testing/open_sidepanel.png" alt="Continuous Testing エクスプローラーの CI バッチ" style="width:100%;">}}

## Synthetic Monitoring & Continuous Testing Explorer を使用する

Synthetic テストの実行や、CI/CD パイプラインで実行されているテストのバッチに対して、[検索クエリおよび視覚化][11]を作成します。

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## 準備はいいですか？

[Synthetic テスト][4]をいくつか構成したら、お好みの [CI/CD プロバイダー][1]のドキュメントを参照するか、CI/CD パイプラインで [datadog-ci NPM パッケージ][14]を使用します。ローカル環境や、プライベートネットワーク内のステージング環境でテストを実行する場合など、非公開の環境や本番以外の環境で Continuous Testing を使用するには、[ローカル環境およびステージング環境のテスト][17]を参照してください。その後、[Synthetic Monitoring & Continuous Testing Explorer][11] でバッチ実行の詳細について調べ始めます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/cicd_integrations/
[2]: /ja/synthetics/browser_tests
[3]: /ja/continuous_testing/settings
[4]: /ja/synthetics/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[11]: /ja/continuous_testing/explorer
[12]: /ja/synthetics/apm/
[13]: https://app.datadoghq.com/synthetics/create#
[14]: /ja/continuous_testing/cicd_integrations/configuration
[15]: /ja/mobile_app_testing/mobile_app_tests
[16]: /ja/mobile_app_testing/
[17]: /ja/continuous_testing/environments