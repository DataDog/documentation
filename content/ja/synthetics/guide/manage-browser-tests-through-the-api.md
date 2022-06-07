---
title: プログラムによるブラウザテストの管理
kind: ガイド
further_reading:
  - link: /synthetics/browser_tests
    tag: ドキュメント
    text: ブラウザテストの詳細
  - link: /api/latest/synthetics
    tag: API
    text: Synthetics API
  - link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
    tag: Terraform
    text: Terraform による Synthetic ブラウザテストの作成と管理
---
## 概要

アプリケーションをエンドツーエンドで監視することは、ユーザーの体験を理解する上で非常に重要です。[Datadog テストレコーダー][1]を使用すると、これらの複雑なテストワークフローのための構成を簡素化することができます。しかし、Synthetics のリソースをプログラムで管理し、API でブラウザテストを定義したいと思うかもしれません。

## API でブラウザテストを管理する

Datadog では、まず Datadog UI でブラウザテストを作成し、API でテストコンフィギュレーションを取得することを推奨しています。

1. [ブラウザテストの作成][2]と[レコーディングの保存][3]を行います。
2. Synthetics の全テストのリストを取得するには、[全テストエンドポイント一覧の取得][4]を使用します。
3. `type: browser` でフィルタリングし、API で管理したいブラウザテストの `public_ids` を取得します。
4. [ブラウザテストエンドポイントの取得][5]を使用して、すべてのブラウザテストのコンフィギュレーションファイルを取得します。

ブラウザテストのコンフィギュレーションファイルは、後で使用するために保存したり、プログラムによってブラウザテストを複製、更新、削除するために使用することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /ja/getting_started/synthetics/browser_test#create-a-browser-test
[3]: /ja/getting_started/synthetics/browser_test#create-recording
[4]: /ja/api/latest/synthetics/#get-the-list-of-all-tests
[5]: /ja/api/latest/synthetics/#get-a-browser-test