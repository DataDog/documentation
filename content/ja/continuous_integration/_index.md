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
- link: /continuous_integration/tests/
  tag: ドキュメント
  text: 問題のあるテストを見つけて修正するために、テストデータを調査する
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: ブログ
  text: 静的 Web アプリケーションを監視するためのベストプラクティス
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: ブログ
  text: CI/CD モニタリングのベストプラクティス
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: ブログ
  text: CI/CD のソフトウェアテストを監視するためのベストプラクティス
title: Continuous Integration Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">このページでは、継続的インテグレーション (CI) のメトリクスとデータを Datadog のダッシュボードに取り込む方法について説明します。CI パイプラインで Continuous Testing テストを実行したい場合は、<a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing と CI/CD</a> のセクションを参照してください。</div>

## 概要

Datadog Continuous Integration (CI) Visibility は、CI のパフォーマンス、トレンド、信頼性に関するデータに加えて、CI のテストとパイプラインの結果に関する情報を統合します。CI Visibility は、CI のメトリクスとデータを Datadog のダッシュボードとノートブックに取り込み、CI 環境の健全性を伝え、チームが毎回高品質なコードを提供できるように改善することに集中できるようにします。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

CI Visibility により、開発者はテストやパイプラインの失敗の原因を特定し、テストスイートの実行時間の傾向を監視し、特定のコミットがパイプラインに与える影響を確認できます。さらに、ビルドエンジニアは、組織横断的な CI の健全性とパイプラインのパフォーマンスの長期的な傾向を視覚化できます。

## テストの信頼性向上とトレース作成

CI Visibility は、最も重要な開発上の障害とその原因となったコミットを結びつけることができ、テストの失敗や壊れたビルドのトラブルシューティングに役立ちます。テストをインスツルメントして、CI でテストが実行される際に、テストフレームワークからトレースを生成することができます。

## シームレスなインテグレーションで効率アップ

Datadog は以下の CI プロバイダーと連携して、コミットがパイプラインに入った瞬間からデプロイの準備が完了するまで、パフォーマンスと結果を追跡するパイプラインメトリクスを収集します。経時的に集計されたデータを使用して、テストおよびビルドのパフォーマンスの傾向を追跡し、修正すべき最も重要な問題を特定します。

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

`datadog-ci` CLI を使用してパイプラインの[コマンドをトレース][8]したり、[カスタムタグと測定コマンド][9]を使用してパイプラインのトレースにユーザー定義のテキストや数値タグを追加することができます。

## 準備はいいですか？

ご利用の CI プロバイダーで CI Visibility をセットアップする手順、互換性の要件に関する情報、データ収集のインスツルメンテーションおよび構成については、[パイプラインの視覚化][3]および[テストの視覚化][4]を参照してください。その後、[CI Visibility Explorer][7] でテスト実行やパイプライン実行の詳細を調査し、検索クエリを [CI Pipeline または Test Monitor][6] にエクスポートしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ja/continuous_integration/pipelines/
[4]: /ja/continuous_integration/tests/
[6]: /ja/monitors/types/ci/
[7]: /ja/continuous_integration/explorer/
[8]: /ja/continuous_integration/pipelines/custom_commands/
[9]: /ja/continuous_integration/pipelines/custom_tags_and_measures/