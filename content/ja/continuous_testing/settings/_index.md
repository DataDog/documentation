---
further_reading:
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: CI/CD パイプラインに Continuous Testing のテストをインテグレーションする
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: APIテストの設定
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテストの設定
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: ドキュメント
  text: Synthetics で RUM とセッションリプレイを確認する
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Terraform でテストを作成・管理する
title: Continuous Testing 設定
---
{{< jqmath-vanilla >}}

## 概要

Continuous Testing の設定は、[Synthetic Monitoring & Continuous Testing Settings ページ][1]で行うことができます。

{{< img src="continuous_testing/continuous_testing_settings_default.png" alt="Continuous Testing のデフォルト設定" style="width:100%;">}}

デフォルトでは、CI/CD パイプラインで実行されるすべてのテストは、順次実行されます (1 つずつ実行されます)。この動作を変更するには、[並列化値](#set-parallelization)を設定し、選択を保存してください。

## 並列化

並列テストとは、[継続的インテグレーションと継続的デリバリー (CI/CD) パイプライン][4]の中で同時に実行されるテストのことです。

{{< img src="continuous_testing/parallelization_explained.png" alt="並列化のメリットと逐次テスト実行のメリットを説明する図" style="width:100%;">}}

これによって、次のことが確実にできるようになります。

* パイプラインの期間を短縮し、新機能を迅速に提供する
* 開発への自信とスピード感を高める
* 完全なテストカバレッジを実現し、生産性を脅かすバグがコードベースに到達するのを防ぐ

### 並列化の見積もり

**Estimate Parallelization** をクリックすると、[Continuous Testing メトリクス][3]に基づいて Datadog が推奨する並列実行するテストの数が表示されます。

{{< img src="continuous_testing/estimated_parallelization.png" alt="Continuous Testing Settings の Estimate Parallelization ウィザードの完了" style="width:60%;">}}

CI パイプラインにおけるテストの予想期間と、オプションで CI バッチあたりの平均テスト数を指定した後、**Estimated Parallelization** セクションでは、設定したい並列化の量を計算します。

$$\text"estimated parallelization" = {\text"CI バッチあたりの平均テスト数" * \text"平均テスト時間"} / \text"CI パイプラインにおけるテストの予想期間"$$

### 並列化の設定

1. **Set your preferences** で、**Parallelization** を選択します。
2. 並列に実行したいテストの数に応じて、必要な並列化をカスタマイズします。
3. **Save Selection** をクリックします。
4. 選択内容を確認します。

{{< img src="continuous_testing/continuous_testing_settings_parallelization.png" alt="Continuous Testing のための並列化の設定" style="width:100%;">}}

## アクセス許可

Continuous Testing の並列化をカスタマイズするには、`billing_edit` 権限が必要です。

そうでない場合は、次のエラーが表示されます: `You're missing edit permission for Continuous Testing settings. You can run your tests with a parallelization of X (up to X tests running at the same time at a given point during your CI). To increase this value, reach out to your administrator admin.email@datadoghq.com`

詳しくは、[Datadog ロール権限][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/settings/
[2]: /ja/account_management/rbac/permissions/#billing-and-usage
[3]: /ja/synthetics/metrics/#continuous-testing
[4]: /ja/continuous_testing/cicd_integrations