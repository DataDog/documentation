---
aliases:
- /ja/ci
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://app.datadoghq.com/release-notes?category=CI%20Visibility
  tag: リリースノート
  text: CI Visibility の最新リリースをチェック！ (アプリログインが必要です)。
- link: /continuous_integration/pipelines/
  tag: ドキュメント
  text: ビルドの問題を解決するためにパイプラインデータを調査する
- link: /continuous_integration/tests/
  tag: ドキュメント
  text: 問題のあるテストを見つけて修正するために、テストデータを調査する
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: ブログ
  text: Datadog で CircleCI 環境を監視する
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: GitHub
  text: Datadog CI モニターによるパイプラインアラートの構成
kind: documentation
title: Continuous Integration Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">このページでは、継続的インテグレーション (CI) のメトリクスとデータを Datadog のダッシュボードに取り込む方法について説明します。CI パイプラインで Continuous Testing テストを実行したい場合は、<a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing と CI/CD</a> のセクションを参照してください。</div>

## 概要

Datadog Continuous Integration (CI) Visibility は、CI のパフォーマンス、傾向、信頼性に関するデータに加えて、CI テストとパイプラインの結果に関する情報を統合します。CI Visibility により、開発者が、テストまたはパイプラインの失敗の理由を特定したり、テストスイートの実行時間の傾向を監視したり、特定のコミットがパイプラインに与える影響を確認したりできるだけでなく、ビルドエンジニアが、組織間の CI の状態とパイプラインパフォーマンスの経時的な傾向を視認することもできます。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

CI Visibility は、CI メトリクスとデータを Datadog ダッシュボードに取り込むため、CI 環境の状態を伝達し、チームが毎回高品質のコードを提供する能力を向上させることに注力できます。

CI Visibility は、最も重要な開発上の障害とその原因となったコミットを結びつけることができ、テストの失敗や壊れたビルドのトラブルシューティングに役立ちます。[APM][5] でアプリケーションパフォーマンスのトレースに使用しているものと同じライブラリを使用して、テストをインスツルメントして、CI でテストが実行される際に、テストフレームワークからトレースを生成することができます。

同様に、Datadog は CI プロバイダーと連携して、コミットがパイプラインに入った瞬間からデプロイの準備が完了するまで、パフォーマンスと結果を追跡するパイプラインメトリクスを収集します。経時的に集計されたデータを使用して、テストおよびビルドのパフォーマンスの傾向を追跡し、修正すべき最も重要な問題を特定します。

## パイプラインに関する洞察を得る

[Pipelines ページ][3] は、サービスのビルドパイプラインを監視している開発者にとって便利です。次のような疑問に答えます。
- 特にデフォルトのブランチで、サービスのパイプラインは成功しているか？
- そうでない場合、根本的な原因は？

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines ページ" style="width:100%" >}}

ビルドエンジニアの場合、[Pipeline Executions ページ][3]には次のものがあります。

- パイプラインの実行とブランチの集計された統計を含む、ビルドシステム全体の状態の概要。
- プロダクションパイプラインの破損など、緊急の問題をすばやく見つけて修正するためのウィンドウ。
- 時間の経過とともに各パイプラインがどのように実行されたか、また、どのような結果と傾向が見られるか。
- 時間の経過に伴う、各ビルド段階で費やされた時間の内訳。これにより、最大の違いを生む場所に改善努力を集中させることができます。

{{< img src="/continuous_integration/pipeline_executions.png" text="CI Pipeline Executions ページ" style="width:100%" >}}

CI パイプラインデータは[ダッシュボード][1]と[ノートブック][2]で利用できるため、ビルドエンジニアリングチームは、優先度の高い作業と CI の傾向に関するコミュニケーションを長期にわたってカスタマイズできます。

## テストに関する洞察を得る

[Tests と Test Runs ページ[4]は、テスト結果を監視している開発者にとって便利です。2 つのレベルで洞察が得られます。

- 詳細で即時的な洞察:
    - 失敗しているテストとその理由を確認します。
    - 最後のコミットのテスト結果を確認します。
    - 機能ブランチでテストの実時間を表示し、それをデフォルトブランチと比較して、パフォーマンスの低下を引き起こそうとしているかどうかを特定します。
    - コミットによって、以前は不安定ではなかった新しい不安定なテストが導入されているかどうかを確認します。これは、コードの変更が不安定な原因であることを示しています。これにより、CI の不安定なテストの数を増やすのではなく、続行する前に問題を修正する機会が得られます。

  {{< img src="/continuous_integration/tests.png" text="CI Tests ページ" style="width:100%" >}}

- 高レベルの蓄積と傾向:
    - コードの変更、テストの追加、複雑さの増加が、時間の経過とともにテストスイートのパフォーマンスに与える影響を確認します。
    - 時間の経過とともにどのテストが遅くなったかを確認し、回帰を引き起こしたコミットを特定します。
    - 時間の経過とともにどのテストが多かれ少なかれ信頼できなくなっているかを示す、Datadog の自動テストフレークネス検出と追跡を利用します。

  {{< img src="/continuous_integration/test_runs.png" text="Test Runs ページ" style="width:100%" >}}

テスト実行データは、[ダッシュボード][1]および[ノートブック][2]でも入手できます。

## 準備はいいですか？

ご利用の CI プロバイダーで CI Visibility をセットアップする手順、互換性の要件に関する情報、データ収集のインスツルメンテーションおよび構成については、[パイプラインの可視化][3]および[テストの可視化][4]を参照してください。その後、[CI パイプラインまたはテストモニター][6]を参照して、モニターを作成します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ja/continuous_integration/pipelines/
[4]: /ja/continuous_integration/tests/
[5]: /ja/tracing/
[6]: /ja/monitors/types/ci/