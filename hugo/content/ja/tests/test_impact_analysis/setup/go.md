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
  text: テスト結果とパフォーマンスを調べる
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: Go 向け Test Impact Analysis
type: multi-code-lang
---
## 互換性 {#compatibility}

Test Impact Analysis には `ddtest >= 1.14.0` が必要です。

## セットアップ {#setup}

### Test Optimization {#test-optimization}

Test Impact Analysis をセットアップする前に、[Go 向け Test Optimization][1] をセットアップします。Agent 経由でデータをレポートする場合は、v6.40 以降または v7.40 以降を使用します。

{{% ci-itr-activation-instructions %}}

## Test Impact Analysis を有効にしてテストを実行する {#run-tests-with-test-impact-analysis-enabled}

セットアップ完了後、以下のコードカバレッジオプションを指定して `ddtest instrument go test` を使用し、テストを実行します。

```bash
ddtest instrument go test -cover -covermode=count -coverpkg=./... ./...
```

1. `-cover`: Test Impact Analysis 機能は Go の組み込みコードカバレッジプロセッサーを使用するため、`go test` コマンドでコードカバレッジの収集を有効にする必要があります。

2. `-covermode`: `count` または `atomic` のいずれかにする必要があります。`set` はサポートされていないため、この値を設定すると Test Impact Analysis が無効になります。

3. `-coverpkg`: 各テストのコードカバレッジ分析は、テスト対象のパッケージだけでなく、すべてのパッケージ依存関係に適用されるように構成する必要があります。このようにすると、依存関係が変更された場合に、その変更の影響を受けるテストを追跡できます。プロジェクトのルート (go.mod ファイルがある場所) からテストコマンドを実行する場合は、`./...` ワイルドカードを使用できます。そうでない場合は、すべてのパッケージ依存関係をカンマで区切って手動でリストアップする必要があります (`pattern1, pattern2, pattern3, ...`)。そのために、`go list ./...` コマンドを使用して、すべてのパッケージ名を取得できます。

<div class="alert alert-danger">-coverpkg の値が正しくないと、Test Impact Analysis がテストカバレッジを正しく追跡できない場合があります。</div>

## 特定のテストに対してスキップを無効化する {#disable-skipping-for-specific-tests}

Test Impact Analysis の動作を上書きして、特定のテストがスキップされないようにできます。これらのテストは、スキップ不可のテストと呼ばれます。

### テストをスキップ不可にする理由{#why-make-tests-unskippable}

Test Impact Analysis は、コードカバレッジデータを使用して、テストをスキップするかどうかを判断します。場合によっては、このデータだけでは判断を下すのに十分ではないことがあります。

例:

- テキストファイルからデータを読み込むテスト。
- テスト対象のコード以外の API とやり取りするテスト (リモートの REST API など)。
- テストをスキップ不可に指定することで、Test Impact Analysis はカバレッジデータに関係なくそれらのテストを確実に実行します。

### テストをスキップ不可としてマークする {#marking-tests-as-unskippable}

#### 個別のテストケース {#individual-test-case}

テストケースに `//dd:test.unskippable` コメントを追加して、スキップ不可としてマークします。

```go
import (
	"testing"
)

//dd:test.unskippable
func TestMyCustomTest(t *testing.T) {
  ...
}

```

#### テストスイート {#test-suite}

ファイルの先頭に `//dd:suite.unskippable` コメントを追加して、スキップ不可としてマークします。

スイートがスキップ不可としてマークされている場合、Test Impact Analysis はそのスイートのテストケースをスキップできません。

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

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/tests/go