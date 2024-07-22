---
further_reading:
- link: /api/latest/synthetics
  tag: ヘルプ
  text: Synthetics API
- link: https://www.datadoghq.com/blog/private-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic のプライベートロケーションでオンプレミスアプリケーションをテスト
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストの詳細
title: プログラムによるブラウザテストの管理
---

## 概要

アプリケーションをエンドツーエンドで監視することは、ユーザーの体験を理解する上で非常に重要です。[Datadog テストレコーダー][1]を使用すると、これらの複雑なテストワークフローのための構成を簡素化することができます。しかし、プログラムで Synthetics リソースを管理し、API や [Terraform][14] を通じてブラウザテストを定義したいと思うかもしれません。

## API でブラウザテストを管理する

Datadog では、まず Datadog UI でブラウザテストを作成し、API でテストコンフィギュレーションを取得することを推奨しています。

1. [ブラウザテストの作成][2]と[レコーディングの保存][3]を行います。
2. Synthetics の全テストのリストを取得するには、[全テストエンドポイント一覧の取得][4]を使用します。
3. `type: browser` でフィルタリングし、API で管理したいブラウザテストの `public_ids` を取得します。
4. [ブラウザテストエンドポイントの取得][5]を使用して、すべてのブラウザテストのコンフィギュレーションファイルを取得します。

ブラウザテストのコンフィギュレーションファイルは、後で使用するために保存したり、プログラムによってブラウザテストを複製、更新、削除するために使用することができます。

## Terraform でブラウザテストを管理する

[Datadog Terraform プロバイダー][6]を用いて、Terraform 構成を介してブラウザテストおよび関連する Synthetics リソースをプログラム的に作成・管理できます。また、既存のリソースを Terraform 構成に[インポート][7]したり、既存のリソースを外部の[データソース][9]として参照することもできます。

### ブラウザテスト

[Synthetic テストリソース][8]を使用して、`type` を `browser` に設定することで、Terraform でブラウザテストを作成・管理することができます。

### プライベートロケーション

カスタムロケーションや保護されたロケーションから Synthetic テストを実行する必要がある場合は、[プライベートロケーションリソース][10]を使用して、テストを実行するプライベートロケーションを作成および管理できます。[プライベートロケーション][11]のページで詳細をご覧ください。

### グローバル変数とローカル変数

[Synthetics グローバル変数リソース][12]を使用して、Synthetics グローバル変数を作成・管理します。これはテスト間で安全に共有できる変数です。また、[config_variable][16] でネストされたスキーマを使用して、テスト固有の[組み込みのローカル変数][15]を作成することもできます。

### 同時実行上限

[Synthetics の同時実行上限リソース][13]を使用すると、並列で実行される Synthetic テストの数を制限することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /ja/getting_started/synthetics/browser_test#create-a-browser-test
[3]: /ja/getting_started/synthetics/browser_test#create-recording
[4]: /ja/api/latest/synthetics/#get-the-list-of-all-tests
[5]: /ja/api/latest/synthetics/#get-a-browser-test
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[7]: https://developer.hashicorp.com/terraform/cli/import
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[9]: https://developer.hashicorp.com/terraform/language/data-sources
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[11]: /ja/synthetics/private_locations
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[14]: https://www.terraform.io/
[15]: https://docs.datadoghq.com/ja/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable