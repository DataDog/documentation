---
description: CI/CD パイプラインで並行して実行される Continuous Testing のテスト数をカスタマイズして、テストカバレッジを向上させることができます。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: リリースノート
  text: Datadog Continuous Testing の最新リリースをチェック！ (アプリログインが必要です)
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: ラーニングセンター
  text: CI/CD パイプラインでの Continuous Testing
- link: /synthetics/private_locations/#scale-your-private-location
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /continuous_testing/troubleshooting/
  tag: ドキュメント
  text: Continuous Testing と CI/CD のトラブルシューティング
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: blog
  text: Datadog Continuous Testing により、自信を持ってリリースすることができます
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: blog
  text: Datadog を使った継続的テストのベストプラクティス
kind: documentation
title: Continuous Testing
---

<div class="alert alert-info">このページでは、CI/CD パイプラインで Continuous Testing のテストを実行する方法について説明します。CI/CD のメトリクスやダッシュボードを表示したい場合は、<a href="/continuous_integration/" target="_blank">CI Visibility のドキュメント</a>を参照してください。</div>

Datadog Continuous Testing は、製品のライフサイクル全体におけるソフトウェアテストを自動化するためのツール群を提供します。コードフリーで信頼性の高いエンドツーエンドテストを提供し、[一般的な CI プロバイダー][1]やコラボレーションツールとのシームレスなインテグレーションにより、Continuous Testing はアプリケーション開発を加速し、高品質の機能を迅速に出荷できるよう支援します。

## 簡単かつスピーディーにテストを実行

[コードレス Web レコーダー][2]、[並行テスト実行][3]、内蔵のマルチロケーションテストなどの拡張性の高い機能を使用して、QA チームの時間と労力を節約します。

{{< img src="continuous_testing/continuous_testing_selection.png" alt="Continuous Testing の設定ページで、テストを順次実行するか、同時に実行するテストの数をカスタマイズするかを選択します" style="width:100%;">}}

gRPC や WebSocket を含む複数のプロトコル、フレームワーク、API をサポートしており、アプリケーションスタックのあらゆるレベルにわたってテストを行うことができます。


## テストの信頼性向上 

テストコードを実装する代わりに、[Synthetic モニタリングの回復力、拡張性、コードレステスト][4]を使用してソフトウェアを構築することができます。自己修復ブラウザテストと自動テスト再試行により、偽陽性を最小化し、テスト結果に自信を持つことができます。ユーザーに最高の体験をさせるために、[クロスブラウザテスト][2]を自動化することができます。

## シームレスなインテグレーションで効率アップ

テストとトラブルシューティングを 1 つのプラットフォームで行うことにより、アプリケーション開発を迅速に進めることができます。以下の CI プロバイダーと Slack や Jira などのコラボレーションツールから選択し、ワークフローを統合し、コンテキストの切り替えを回避します。

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

[Datadog Terraform プロバイダー][10]を使って、テストの作成と状態管理をコントロールすることができます。Synthetic テストをステージング、プリプロダクト、カナリアデプロイメントの[インテグレーションおよびエンドツーエンドテスト][11]として活用したり、[CI パイプライン][11]で直接実行することができます。

## トラブルシューティングの高速化

統一されたモニタリングプラットフォームでテストを実行することにより、失敗したテストの根本原因を迅速に発見し、MTTR を短縮することができます。Datadog [APM インテグレーション][12]によって表示される相関メトリクス、トレース、ログによって、ツールを切り替えることなくトラブルシューティングのための完全なコンテキストを取得することができます。

{{< img src="continuous_testing/open_sidepanel.png" alt="Continuous Testing エクスプローラーの CI バッチ" style="width:100%;">}}

[Continuous Testing エクスプローラー][13] で実行されたジョブを確認することで、CI パイプラインで実行中のブラウザテストを調べたり、失敗したテスト結果のトラブルシューティングを行ったりすることができます。

## 準備はいいですか？

[Synthetic テスト][4]をいくつか構成したら、お好みの [CI/CD プロバイダー][1]のドキュメントを参照するか、CI/CD パイプラインで [datadog-ci NPM パッケージ][14]を使用します。その後、[Continuous Testing エクスプローラー][11]でバッチ実行の詳細について調べ始めます。

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