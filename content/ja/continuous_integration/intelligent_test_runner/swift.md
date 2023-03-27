---
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: トラブルシューティング CI
kind: documentation
title: Swift のための Intelligent Test Runner
---

## 互換性

Intelligent Test Runner は `dd-sdk-swift>= 2.2.0` でしかサポートされていません。

## セットアップ

Intelligent Test Runner をセットアップする前に、[Test Visibility for Swift][1] をセットアップしてください。また、スキームやテストプランのテスト設定で**コードカバレッジ**オプションを有効にするか、Swift のテストコマンドに --enable-code-coverage を追加する必要があります (SPM ターゲットを使用している場合)。

Agent を通してデータを報告する場合は、v6.40+/v7.40+ を使用してください。

Intelligent Test Runner を有効にするには、以下の環境変数を設定します。

`DD_TEST_RUNNER`
: テストのインスツルメンテーションを有効または無効にします。この値を `$(DD_TEST_RUNNER)` に設定すると、テストプロセスの外部 (CI ビルドなど) で定義された環境変数を使用してテストインスツルメンテーションを有効または無効にできます。<br/>
**デフォルト**: `false`<br/>
**推奨**: `$(DD_TEST_RUNNER)`

`DD_APPLICATION_KEY` (必須)
: スキップするテストをクエリするために使用する [Datadog アプリケーションキー][2]。<br/>
**デフォルト**: `(empty)`

#### UI アクティベーション
環境変数の設定に加えて、お客様またはお客様の組織で "Intelligent Test Runner Activation" 権限を持つユーザーが、[テストサービス設定][3]ページで Intelligent Test Runner を有効にする必要があります。

{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/swift
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[5]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options