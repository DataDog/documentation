---
aliases:
- /ja/continuous_integration/intelligent_test_runner/go/
- /ja/continuous_integration/intelligent_test_runner/setup/go/
- /ja/intelligent_test_runner/setup/go
code_lang: go
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: Go 向け Test Impact Analysis
type: multi-code-lang
---

## 互換性

Test Impact Analysis は、`orchestrion >= 0.9.4 + dd-trace-go >= 1.70.0` でのみサポートされています。

## セットアップ

### テスト最適化

Test Impact Analysis を設定する前に、[Go 向け Test Optimization][1] をセットアップしてください。Datadog Agent 経由でデータを送信する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Run tests with Test Impact Analysis enabled

セットアップが完了したら、`go test` に以下のコード カバレッジ オプションを指定してテストを実行します。

```bash
orchestrion go test ./... -cover -covermode=count -coverpkg ./...
```

1. `-cover`: Test Impact Analysis 機能は、Go に組み込まれたコード カバレッジ プロセッサーを使用するため、`go test` コマンドでコード カバレッジの収集を有効にする必要があります。

2. `-covermode`: `count` または `atomic` のいずれかを指定する必要があります。`set` はサポートされていないため、値に `set` を指定すると Test Impact Analysis が無効になります。

3. `-coverpkg`: 各テストのコード カバレッジ分析は、テスト対象のパッケージだけでなく、すべての依存パッケージにも適用されるように構成する必要があります。こうすることで、依存関係が変更された場合に、その変更の影響を受けるテストを特定できます。プロジェクト ルート (go.mod ファイルのあるディレクトリ) で `go test` を実行する場合は、ワイルド カードの `./...` を使用できます。そうでない場合は、すべての依存パッケージをカンマ区切りで手動で列挙する必要があります (`pattern1, pattern2, pattern3, ...`)。その際は、`go list ./...` コマンドで、すべてのパッケージ名を取得できます。

<div class="alert alert-danger">-coverpkg の値が正しくない場合、Test Impact Analysis はテスト カバレッジを正しく追跡できなくなります。</div>

## 特定のテストに対するスキップの無効化

You can override the Test Impact Analysis behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### テストをスキップできないようにする理由は？

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

例:

- テキストファイルからデータを読み込むテスト。
- テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)。
- Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.

### Marking tests as unskippable

#### Individual test case

テスト ケースをスキップ不可にするには、テスト ケースに `//dd:test.unskippable` コメントを追加します。

```go
import (
    "testing"
)

//dd:test.unskippable
func TestMyCustomTest(t *testing.T) {
  ...
}

```

#### テストスイート

テスト スイートをスキップ不可にするには、ファイルの先頭に `//dd:suite.unskippable` コメントを追加します。

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by Test Impact Analysis.

```csharp
import (
    "testing"
)

//dd:suite.unskippable

func TestMyCustomTest(t *testing.T) {
  ...
}

func TestMyCustomTest2(t *testing.T) {
  ...
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/tests/go