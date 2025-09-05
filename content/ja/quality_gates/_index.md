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
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: ブログ
  text: '不安定なテスト: その隠れたコストと不安定な挙動への対処方法'
is_beta: false
title: Quality Gates
---

{{< callout url="#" btn_hidden="true" header="プレビューに参加してください！" >}}
Quality Gates はプレビュー版です。
{{< /callout >}}

## 概要

Quality Gates を使用すると、不適切なコードがデプロイされるのを防ぐためのルールを構成することで、ソフトウェアの品質を管理できます。これにより、デフォルトブランチにマージされ、本番環境にデプロイされるコードをコントロールし、高品質な基準を満たすコードが稼働することを確保します。結果として、インシデントの発生を減らし、望ましくない動作を最小限に抑えることができます。

{{< img src="quality_gates/setup/sca_2.png" alt="リポジトリ内にクリティカルまたは高重大度のライブラリ脆弱性が検出された場合に失敗をトリガーする SCA ルール" style="width:100%" >}}

Quality Gates を使用して、

* Datadog のデータを用いてワークフローをブロックするルールを作成し、基準を満たすコードのみが本番環境にデプロイされるようにします。
* 組織内で本番環境にデプロイするコードを決定できる能力を持たせ、デプロイの規律を強化し、本番環境での潜在的な問題を軽減します。
* 正確な適用とカスタマイズ可能なルールによって、コード品質とシステムパフォーマンスを継続的に改善します。

Quality Gates のルールは、以下のカテゴリーで構成できます。

[Test Optimization][9]

: <br> - 新しい不安定テスト<br> - コードカバレッジ

[Static Analysis][11]

: <br> - コード脆弱性違反 <br> - コード品質違反

[Software Composition Analysis][12]

: <br> - 脆弱性 <br> - 検出されたライセンス

[Quality Gates を CI/CD パイプラインに統合][7]するか、[Datadog GitHub インテグレーション][13] により Pull Request 上で自動的にステータスチェックを作成できるようにすることで (現在は SCA ルールにのみ対応)、組織の運用目標やビジネス上の目的に合致したソフトウェア品質を維持・向上させるための強固なフレームワークを構築できます。

## セットアップ

Quality Gates は以下のルールタイプを提供しています。

{{< tabs >}}
{{% tab "Tests" %}}

新しい[不安定なテスト][101]がもたらされる、または[コードカバレッジ][102]が低下するコードのマージをブロックするためのルールを作成できます。

{{< img src="quality_gates/setup/flaky_test_2.png" alt="不安定なテストが 1 つ以上発生した場合にブロックされる Quality Gate ルール" style="width:80%" >}}

[101]: /ja/tests/flaky_test_management/
[102]: /ja/tests/code_coverage/

{{% /tab %}}
{{% tab "Static Analysis" %}}

リポジトリに一定数のコード品質やコード脆弱性違反がある場合に、コードのマージをブロックするためのルールを作成できます。

{{< img src="quality_gates/setup/static_analysis_2.png" alt="リポジトリ内にエラーレベルの重大度を持つ新しいコード品質違反が 1 つ以上含まれている場合に失敗する Quality Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

リポジトリに一定数のライブラリ脆弱性や禁止ライセンスが含まれている場合に、コードのマージをブロックするためのルールを作成できます。

{{< img src="quality_gates/setup/sca_2.png" alt="リポジトリ内にクリティカルまたは高重大度のライブラリ脆弱性が 1 つ以上含まれている場合に失敗する Quality Gate ルール" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

Quality Gate ルールを作成するには、[セットアップドキュメント][2]を参照してください。

## 検索ルール

[**Quality Gates Rules** ページ][6]の Quality Gates ルールにアクセスすることで、品質管理プロセスを評価および更新できます。プロジェクトの要件と期待されるパフォーマンスに基づいて、デプロイの方法を改善します。

{{< img src="quality_gates/rules_list_2.png" alt="Datadog の Quality Gate ルール一覧" style="width:100%" >}}

Quality Gate ルールを検索するには、[検索と管理のドキュメント][5]を参照してください。

## Quality Gates Explorer で実行を分析する

[**Quality Gates Executions** ページ][14]で、Quality Gates またはルールの実行を検索・フィルタリングし、視覚化を作成し、検索クエリの保存ビューをエクスポートすることができます。

{{< tabs >}}
{{% tab "Gates" %}}

{{< img src="quality_gates/explorer/gates_3.png" alt="Quality Gates Explorer での Quality Gate 結果" style="width:100%" >}}

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

[1]: /ja/tests/flaky_test_management/
[2]: /ja/quality_gates/setup/
[3]: /ja/account_management/audit_trail/
[4]: /ja/account_management/audit_trail/events/#ci-visibility-events
[5]: /ja/quality_gates/search/
[6]: https://app.datadoghq.com/ci/quality-gates
[7]: https://github.com/DataDog/datadog-ci
[8]: /ja/quality_gates/explorer/
[9]: /ja/tests/
[10]: /ja/continuous_integration/
[11]: /ja/security/code_security/static_analysis
[12]: /ja/security/code_security/software_composition_analysis
[13]: /ja/integrations/github/
[14]: https://app.datadoghq.com/ci/quality-gates/executions