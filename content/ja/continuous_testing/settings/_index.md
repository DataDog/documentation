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
kind: documentation
title: Continuous Testing 設定
---

## 概要

Continuous Testing の設定は、[Synthetic Monitoring Settings ページ][1]で行うことができます。

{{< img src="continuous_testing/continuous_testing_default.png" alt="Continuous Testing のデフォルト設定" style="width:100%;">}}

デフォルトでは、1 つのテストを順次実行することができます。この動作を変更するには、[並列化の値](#set-parallelization)を設定し、選択を保存してください。

## 並列化

並列テストとは、継続的インテグレーションと継続的デリバリー (CI/CD) パイプラインの中で同時に実行されるテストのことです。

{{< img src="continuous_testing/continuous_testing_parallelization.png" alt="Continuous Testing のための並列化の設定" style="width:100%;">}}

これによって、次のことが確実にできるようになります。

* パイプラインの期間を短縮し、新機能を迅速に提供する
* 開発への自信とスピード感を高める
* 完全なテストカバレッジを実現し、生産性を脅かすバグがコードベースに到達するのを防ぐ

### 並列化の設定

1. **Set your preferences** で、**Parallelization** を選択します。
2. 並列に実行したいテストの数に応じて、必要な並列化をカスタマイズします。
3. **Save Selection** をクリックします。
4. 選択内容を確認します。

## アクセス許可

Continuous Testing の並列化をカスタマイズするには、`billing_edit` 権限が必要です。

そうでない場合は、次のエラーが表示されます: `You're missing edit permission for Continuous Testing settings. You can run 15 tests in parallel. To increase this value, reach out to your administrator admin.email@datadoghq.com`

詳しくは、[Datadog ロール権限][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/settings/
[2]: /ja/account_management/rbac/permissions/#billing-and-usage