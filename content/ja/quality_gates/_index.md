---
description: Quality Gates を使用することで、チームが本番環境で使用するコードを管理する方法を説明します。
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: ブログ
  text: Datadog Quality Gates を使用してコードの信頼性を向上させる
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: ブログ
  text: GitHub Actions のデプロイに品質ゲートとして Datadog モニターを使用する
- link: /quality_gates/explorer
  tag: ドキュメント
  text: Quality Gates Explorer について
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: Audit Trail について
is_beta: true
title: Quality Gates
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点で Quality Gates は利用できません。</div>
{{< /site-region >}}

## 概要

Quality Gates を使用すると、不適切なコードがデプロイされるのを防ぐためのルールを構成することで、ソフトウェアの品質を管理できます。これにより、デフォルトブランチにマージされ、本番環境にデプロイされるコードをコントロールし、高品質な基準を満たすコードが稼働することを確保します。結果として、インシデントの発生を減らし、望ましくない動作を最小限に抑えることができます。

{{< img src="quality_gates/setup/pipeline_rule_1.png" alt="PCT のコードカバレッジがゼロ以下の場合に Quality Gates で失敗するパイプラインルール" style="width:100%" >}}

Quality Gates を使用して、

* Datadog のデータを用いてワークフローをブロックするルールを作成し、基準を満たすコードのみが本番環境にデプロイされるようにします。
* 組織内で本番環境にデプロイするコードを決定できる能力を持たせ、デプロイの規律を強化し、本番環境での潜在的な問題を軽減します。
* 正確な適用とカスタマイズ可能なルールによって、コード品質とシステムパフォーマンスを継続的に改善します。

Quality Gates のルールは、以下のカテゴリーで構成できます。

[Test Visibility][9] 

:<br> - 新しい不安定なテスト<br> - パフォーマンスの回帰<br> - コードカバレッジ

[Pipeline Visibility][10]

: <br> - カスタムメジャー

[Static Analysis][11]

: <br> - コード脆弱性違反 <br> - コード品質違反

[Software Composition Analysis][12]

: <br> - 脆弱性 <br> - 検出されたライセンス

Quality Gates を [CI/CD パイプライン][7]に統合することで、組織の運用目標やビジネス目標に沿った、ソフトウェア品質の維持と改善のための強固なフレームワークを構築できます。

## セットアップ

Quality Gates は以下のルールタイプを提供しています。

{{< tabs >}}
{{% tab "Tests" %}}

新しい[不安定なテスト][101]をもたらすコードがマージされるのをブロックするルールを作成できます。

{{< img src="quality_gates/setup/flaky_test_1.png" alt="不安定なテストが 1 つ以上発生した場合にブロックされる Quality Gate ルール" style="width:80%" >}}

[101]: /ja/tests/guides/flaky_test_management/

{{% /tab %}}
{{% tab "Pipelines" %}}

CI/CD パイプラインでは通常失敗しないが、最終的に本番環境にデプロイされる問題を引き起こすコードのマージをブロックするルールを作成できます。

{{< img src="quality_gates/setup/pipeline_rule_1.png" alt="CI パイプラインで PCT のコードカバレッジがゼロ以下の場合に失敗する Quality Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "Static Analysis" %}}

コード品質やコード脆弱性の違反をもたらすコードのマージをブロックするルールを作成できます。

{{< img src="quality_gates/setup/static_analysis_1.png" alt="エラーを伴う新しいコード品質違反が 1 つ以上発生した場合に失敗する Quality Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

ソフトウェアの脆弱性や禁止されたライセンスをもたらすコードのマージをブロックするルールを作成できます。

{{< img src="quality_gates/setup/sca_1.png" alt="新たな重大な脆弱性が 1 つ以上もたらされた場合に失敗する Quality Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

Quality Gate ルールを作成するには、[セットアップドキュメント][2]を参照してください。

## 検索ルール

[**Quality Gates Rules** ページ][6]の Quality Gates ルールにアクセスすることで、品質管理プロセスを評価および更新できます。プロジェクトの要件と期待されるパフォーマンスに基づいて、デプロイの方法を改善します。

{{< img src="quality_gates/rules_list_1.png" alt="Datadog の Quality Gate ルール一覧" style="width:100%" >}}

Quality Gate ルールを検索するには、[検索と管理のドキュメント][5]を参照してください。

## Quality Gates Explorer で実行を分析する

[**Quality Gates Executions** ページ][8]で、Quality Gates またはルールの実行を検索・フィルタリングし、視覚化を作成し、検索クエリの保存ビューをエクスポートすることができます。

{{< tabs >}}
{{% tab "Gates" %}}

{{< img src="quality_gates/explorer/gates_1.png" alt="Quality Gates Explorer での Quality Gate 結果" style="width:100%" >}}

{{% /tab %}}
{{% tab "ルール実行" %}}

{{< img src="quality_gates/explorer/executions_1.png" alt="Quality Gates Explorer での Quality Gate ルール実行結果" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

詳細は、[Quality Gates Explorer のドキュメント][8]を参照してください。

## ルール変更の追跡

[監査証跡][3]では、Quality Gates ルールを作成した人、変更した人、削除した人の情報を確認できます。

{{< img src="/quality_gates/audit_event.png" alt="Datadog Audit Trail の Quality Gates イベント" style="width:100%" >}}

詳細は、[Audit Trail のドキュメント][4]を参照してください。 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/guides/flaky_test_management/
[2]: /ja/quality_gates/setup/
[3]: /ja/account_management/audit_trail/
[4]: /ja/account_management/audit_trail/events/#ci-visibility-events
[5]: /ja/quality_gates/search/
[6]: https://app.datadoghq.com/ci/quality-gates
[7]: /ja/monitors/guide/github_gating/
[8]: /ja/quality_gates/explorer/
[9]: /ja/tests/
[10]: /ja/continuous_integration/
[11]: /ja/code_analysis/static_analysis
[12]: /ja/code_analysis/software_composition_analysis