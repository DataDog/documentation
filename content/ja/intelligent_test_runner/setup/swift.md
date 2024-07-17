---
aliases:
- /ja/continuous_integration/intelligent_test_runner/swift/
- /ja/continuous_integration/intelligent_test_runner/setup/swift/
code_lang: swift
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
is_beta: true
kind: ドキュメント
title: Swift のための Intelligent Test Runner
type: multi-code-lang
---

{{< callout url="#" btn_hidden="true" >}}Swift のための Intelligent Test Runner はベータ版です。{{< /callout >}}

## 互換性

Intelligent Test Runner は `dd-sdk-swift>= 2.2.0` でしかサポートされていません。

## Setup

### Test Visibility

Intelligent Test Runner をセットアップする前に、[Test Visibility for Swift][1] をセットアップしてください。また、スキームやテストプランのテスト設定で**コードカバレッジ**オプションを有効にするか、Swift のテストコマンドに `--enable-code-coverage` を追加する必要があります (SPM ターゲットを使用している場合)。

Agent を通してデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

### Intelligent Test Runner の有効化

Intelligent Test Runner を有効にするには、以下の環境変数を設定します。

`DD_TEST_RUNNER`
: テストのインスツルメンテーションを有効または無効にします。この値を `$(DD_TEST_RUNNER)` に設定すると、テストプロセスの外部 (CI ビルドなど) で定義された環境変数を使用してテストインスツルメンテーションを有効または無効にできます。<br/>
**デフォルト**: `false`<br/>
**推奨**: `$(DD_TEST_RUNNER)`

{{% ci-itr-activation-instructions %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/swift