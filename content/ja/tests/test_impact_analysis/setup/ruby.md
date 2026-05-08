---
aliases:
- /ja/intelligent_test_runner/setup/ruby
code_lang: ruby
code_lang_weight: 20
further_reading:
- link: /tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: Ruby 用 Test Impact Analysis
type: multi-code-lang
---

## 互換性

Test Impact Analysis は、以下のバージョンとテストフレームワークでのみサポートされています。

* `datadog-ci >= 1.0`
* `Ruby >= 2.7`
  * JRuby はサポートされていません。
* `rspec >= 3.0.0`
* `minitest >= 5.0.0`
* `cucumber >= 3.0.0`

## セットアップ

### テスト最適化

Test Impact Analysis をセットアップする前に、先に [Ruby 用 Test Optimization][1] をセットアップしてください。Agent 経由でデータを送信している場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Test Impact Analysis を有効にしてテストを実行する

セットアップが完了したら、通常どおりテストを実行してください。

## 特定のテストに対するスキップの無効化

Test Impact Analysis の動作を上書きし、特定のテストがスキップされないようにできます。これらのテストは unskippable テストと呼ばれます。

### テストをスキップできないようにする理由は？

Test Impact Analysis はコード カバレッジ データを使用してテストをスキップすべきかどうかを判断します。場合によっては、このデータだけでは判断が不十分なことがあります。

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)
* 外部プロセスを実行するテスト
* グローバルで共有される状態 (例: 別のテストやプロセスによって作成されるキャッシュ) に依存するテスト
* フォークされたプロセスを使用するテスト (テストごとのコードカバレッジはメインプロセスのカバレッジのみを収集します)
* capybara または selenium-webdriver を使用するインテグレーションテスト

テストを unskippable に指定すると、カバレッジ データに関係なく Test Impact Analysis によって常に実行されます。

### unskippable テストの指定方法

{{< tabs >}}
{{% tab "RSpec" %}}
特定のブロック内の RSpec テストがスキップされないようにするには、任意の `describe`、`context`、または `it` ブロックに、値 `true` を持つメタデータ キー `datadog_itr_unskippable` を追加します。これにより、そのブロック内のすべてのテストが unskippable としてマークされます。

```ruby
# ファイル全体を unskippable としてマークする
RSpec.describe MyClass, datadog_itr_unskippable: true do
  describe "#my_method" do
    context "when called without arguments" do
      it "works" do
      end
    end
  end
end

# 1 つのテストだけを unskippable としてマークする
RSpec.describe MyClass do
  describe "#my_method" do
    context "when called without arguments" do
      it "works", datadog_itr_unskippable: true do
      end
    end
  end
end

# 特定のブロックを unskippable としてマークする
RSpec.describe MyClass do
  describe "#my_method", datadog_itr_unskippable: true do
    context "when called without arguments" do
      it "works" do
      end
    end
  end
end
```

{{% /tab %}}
{{% tab "Cucumber" %}}
Cucumber でフィーチャ ファイル全体を unskippable にするには、タグ `@datadog_itr_unskippable` を使用します。これにより、そのフィーチャ ファイルに定義されているいずれのシナリオも Test Impact Analysis によってスキップされなくなります。

特定のシナリオだけを unskippable にしたい場合は、このタグを対象のシナリオに直接付与します。

```ruby
@datadog_itr_unskippable
Feature: Unskippable feature
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"

Feature: An unskippable scenario

  @datadog_itr_unskippable
  Scenario: Unskippable scenario
    When the ITR wants to skip this scenario
    Then it will never be skipped

  Scenario: Skippable scenario
    When the ITR wants to skip this scenario
    Then it will be skipped
```

{{% /tab %}}
{{% tab "Minitest" %}}
Minitest のサブクラス全体を unskippable にするには、`datadog_itr_unskippable` メソッドを使用します。サブクラス内の特定のテストだけを unskippable にしたい場合は、これらのテスト メソッド名を `datadog_itr_unskippable` メソッド呼び出しの引数として指定します。

```ruby
# クラス全体を unskippable としてマークする
class MyTest < Minitest::Test
  datadog_itr_unskippable

  def test_my_method
  end
end

# この例では test1 と test2 だけが unskippable
class MyTest < Minitest::Test
  datadog_itr_unskippable "test1", "test2"

  def test1
  end

  def test2
  end

  def test3
  end
end
```

{{% /tab %}}
{{< /tabs >}}

### Test Impact Analysis を一時的に無効にする

環境変数 `DD_CIVISIBILITY_ITR_ENABLED` を `false` または `0` に設定することで、Test Impact Analysis をローカルで無効化できます。

`DD_CIVISIBILITY_ITR_ENABLED` (オプション)
: Test Impact Analysis のカバレッジおよびテストスキップ機能を有効化<br />
**デフォルト**: `(true)`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/setup/ruby