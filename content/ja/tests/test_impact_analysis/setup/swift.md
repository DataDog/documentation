---
aliases:
- /ja/continuous_integration/intelligent_test_runner/swift/
- /ja/continuous_integration/intelligent_test_runner/setup/swift/
- /ja/intelligent_test_runner/setup/swift
code_lang: swift
code_lang_weight: 40
further_reading:
- link: /tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimisation のトラブルシューティング
title: Swift 向け Test Impact Analysis
type: multi-code-lang
---

## 互換性

Test Impact Analysis は、 [`dd-sdk-swift-testing`][1] のバージョン `2.2.0`+ でのみサポートされています。

## セットアップ

### テストの最適化

Test Impact Analysis をセットアップする前に、[Test Optimization for Swift][2] をセットアップしてください。また、スキームやテストプランのテスト設定で**コードカバレッジ**オプションを有効にするか、Swift のテストコマンドに `--enable-code-coverage` を追加する必要があります (SPM ターゲットを使用している場合)。

Agent 経由でデータを送信する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Run tests with Test Impact Analysis enabled

セットアップが完了したら、通常どおりテストを実行してください。

## 特定のテストに対するスキップの無効化

Test Impact Analysis の動作を上書きし、特定のテストがスキップされないようにできます。これらのテストは unskippable テストと呼ばれます。

### テストをスキップできないようにする理由は？

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)
* 外部プロセスを実行するテスト
* グローバルで共有される状態 (例: 別のテストやプロセスによって作成されるキャッシュ) に依存するテスト
* フォークされたプロセスを使用するテスト (テストごとのコードカバレッジはメインプロセスのカバレッジのみを収集します)
* capybara または selenium-webdriver を使用するインテグレーションテスト

Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.

### Marking tests as unskippable

```swift
import XCTest
import DatadogSDKTesting

class SomeTestCase: XCTestCase {
  func testMethod() {}
}

extension SomeTestCase: ExtendableTaggedType {
  static func extendableTypeTags() -> ExtendableTypeTags {
    withTagger { tagger in
      // このクラス全体を unskippable に設定
      tagger.set(type: .itrSkippable, to: false)
      // 1 つのメソッドのみを unskippable に設定
      tagger.set(instance: .itrSkippable, to: false, method: #selector(testMethod))
    }
  }
}
```

### Test Impact Analysis を一時的に無効にする

環境変数 `DD_CIVISIBILITY_ITR_ENABLED` を `false` または `0` に設定することで、Test Impact Analysis をローカルで無効化できます。

`DD_CIVISIBILITY_ITR_ENABLED` (オプション)
: Test Impact Analysis のカバレッジおよびテストスキップ機能を有効化<br />
**デフォルト**: `(true)`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
[2]: /ja/tests/setup/swift