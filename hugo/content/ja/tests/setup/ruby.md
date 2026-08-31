---
aliases:
- /ja/continuous_integration/setup_tests/ruby
- /ja/continuous_integration/tests/ruby
- /ja/continuous_integration/tests/setup/ruby
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内のテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: Ruby テスト
type: multi-code-lang
---

## 互換性

サポートされている言語:

| 言語 | バージョン |
|---|---|
| Ruby | >= 2.7 |
| JRuby | >= 9.4 |

サポートされているテストフレームワーク:

| テストフレームワーク | バージョン |
|---|---|
| RSpec | >= 3.0.0 |
| Minitest | >= 5.0.0 |
| Cucumber | >= 3.0 |

サポートされているテストランナー:

| テストランナー | バージョン |
|---|---|
| Knapsack Pro | >= 7.2.0 |
| ci-queue | >= 0.53.0 |

## レポート方法の構成

Datadog にテスト結果を報告するには、`datadog-ci` gem を構成する必要があります。

{{< tabs >}}
{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Ruby Test Visibility ライブラリのインストール

Ruby Test Visibility ライブラリをインストールするには

1. `Gemfile` に `datadog-ci` gem を追加します。

{{< code-block lang="ruby" filename="Gemfile" >}}
source "<https://rubygems.org>"
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. `bundle install` を実行して gem をインストールします。

## テストのインスツルメンテーション

{{< tabs >}}
{{% tab "RSpec" %}}

RSpec インテグレーションは、`rspec` テストフレームワークを使用している際に、すべてのグループや例の実行をトレースします。

インテグレーションを有効にするには、`spec_helper.rb` ファイルに次の内容を追加します。

```ruby
require "rspec"
require "datadog/ci"

# CI 上でテストインスツルメンテーションのみを有効にします
if ENV["DD_ENV"] == "ci"
Datadog.configure do |c|
# Test Visibility を有効にします
c.ci.enabled = true

# テスト対象のサービスまたはライブラリの名前
c.service = "my-ruby-app"

# RSpec のインスツルメンテーションを有効にします
c.ci.instrument :rspec
end
end
```

通常通りテストを実行し、`DD_ENV` 環境変数でテスト環境を指定します。

次の環境を使用できます。

* 開発者のワークステーションでテストを実行する場合は `local`
* CI プロバイダー上で実行する場合は `ci`

例えば:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

Minitest インテグレーションは、`minitest` フレームワークで実行されるすべてのテストをトレースします。

インテグレーションを有効にするには、`test_helper.rb` ファイルに次の内容を追加します。

```ruby
require "minitest"
require "datadog/ci"

# CI 上でテストインスツルメンテーションのみを有効にします。
if ENV["DD_ENV"] == "ci"
Datadog.configure do |c|
# Test Visibility を有効にします
c.ci.enabled = true

# テスト対象のサービスまたはライブラリの名前
c.service = "my-ruby-app"

c.ci.instrument :minitest
end
end
```

通常通りテストを実行し、`DD_ENV` 環境変数でテスト環境を指定します。

次の環境を使用できます。

* 開発者のワークステーション上でテストを実行する場合は `local`
* CI プロバイダー上で実行する場合は `ci`

例えば:

```bash
DD_ENV=ci bundle exec rake test
```

<div class="alert alert-danger">
<strong>注:</strong> `minitest/autorun` を使用する場合、`datadog/ci` が `minitest/autorun` より先に実行されるようにしてください。
</div>

`minitest/autorun` を使用した構成例:

```ruby
require "datadog/ci"
require "minitest/autorun"

if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    c.ci.enabled = true

    c.service = "my-ruby-app"

    c.ci.instrument :minitest
  end
end
```

{{% /tab %}}

{{% tab "Cucumber" %}}

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のシナリオとステップの実行をトレースすることができます。

インテグレーションをアクティブ化するには、次のコードをアプリケーションに追加します。

```ruby
require "cucumber"
require "datadog/ci"

# CI 上でテストインスツルメンテーションのみを有効にします
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # Test Visibility を有効にします
    c.ci.enabled = true

    # テスト対象のサービスまたはライブラリの名前
    c.service = "my-ruby-app"

    # Cucumber のインスツルメンテーションを有効にします
    c.ci.instrument :cucumber
  end
end
```

環境変数 `DD_ENV` でテストが実行されている環境を指定し、通常どおりテストを実行します。
以下の環境が使えます。

* 開発者のワークステーションでテストを実行している場合は `local`
* CI プロバイダー上で実行している場合は `ci`

例:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

### テストにカスタムタグを追加する

現在アクティブなテストを使用して、テストにカスタムタグを追加することができます。

```ruby
require "datadog/ci"

# テスト内
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# テストは正常に続きます
# ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加に関する詳細は、Ruby カスタムインスツルメンテーションドキュメントの[タグの追加][2]セクションを参照してください。

### テストへのカスタム測定値の追加

タグと同様に、現在アクティブなテストを使用して、テストにカスタムメジャーを追加できます。

```ruby
require "datadog/ci"

# テスト内
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# テストは正常に続きます
# ...
```

カスタムメジャーの詳細については、[カスタムメジャーの追加ガイド][3]を参照してください。

## 構成設定

以下は、`Datadog.configure` ブロックを使用するか、環境変数を使用するコードで、Test Visibility ライブラリで使用できる最も重要なコンフィギュレーション設定のリストです。

`service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `$PROGRAM_NAME`<br/>
**例**: `my-ruby-app`

`env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`service` と `env` の予約タグの詳細については、[統合サービスタグ付け][4]を参照してください。

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][5]オプションも使用できます。

## 追加のインスツルメンテーションの使用

データベース操作やその他の外部呼び出しに費やされた時間を含む、テストに関する詳細なトレース情報を取得すると便利です。次のフレームグラフを参照してください。

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Redis でインスツルメンテーションされたテストトレース" >}}

これを実現するには、`configure` ブロックで追加のインスツルメンテーションを構成します。

```ruby
if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    #  ... ci 構成とインスツルメンテーションをここに ...
    c.tracing.instrument :redis
    c.tracing.instrument :pg
    # ... Datadog gem がサポートするその他のインスツルメンテーション ...
  end
end
```

または、`test_helper/spec_helper` で自動インスツルメンテーションを有効にすることもできます。

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**注**: CI モードでは、これらのトレースは CI Visibility に送信され、Datadog APM には**表示されません**。

利用可能なインスツルメンテーション方法の全リストについては、[トレースドキュメント][6]を参照してください。

## Webmock/VCR

[Webmock][7] と [VCR][9] は、テスト実行時に HTTP リクエストをスタブ化する人気の高い Ruby ライブラリです。デフォルトでは、HTTP コールでトレースが Datadog に送信されるため、datadog-ci と併用時には失敗します。

Datadog バックエンドへの HTTP 接続を許可するには、Webmock と VCR を適切に構成する必要があります。

```ruby
# Webmock
# エージェントレスモードを使用している場合:
WebMock.disable_net_connect!(:allow => /datadoghq/)

# ローカルで実行している Agent を使用している場合:
WebMock.disable_net_connect!(:allow_localhost => true)

# または、より詳細な設定を行うには、Agent URL を設定します。例:
WebMock.disable_net_connect!(:allow => "localhost:8126")

# VCR
VCR.configure do |config|
  # ... your usual configuration here ...

  # Agent を使用している場合
  config.ignore_hosts "127.0.0.1", "localhost"

  # エージェントレスモードを使用している場合
  config.ignore_request do |request|
    # datadoghq ホストへのすべてのリクエストを無視します
    request.uri =~ /datadoghq/
  end
end
```

## Git のメタデータを収集する

{{% ci-git-metadata %}}

## 手動テスト API の使用

RSpec、Minitest、または Cucumber を使用している場合は、**手動テスト API を使用しないでください**。CI Visibility は自動的にインスツルメンテーションを行い、テスト結果を Datadog に送信するためです。手動テスト API は、すでにサポートされているテストフレームワークと**互換性がありません**。

サポートされていないテストフレームワークを使用している場合や、異なるテストメカニズムを使用している場合のみ、手動テスト API を使用してください。
完全な公開 API ドキュメントは、[YARD サイト][8]で入手できます。

### ドメインモデル

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

#### テストセッション

テストセッションはテストコマンドの実行を表します。

テストセッションを開始するには、`Datadog::CI.start_test_session` を呼び出し、Datadog サービスとタグ (使用しているテストフレームワークなど) を渡します。

すべてのテストが終了したら、`Datadog::CI::TestSession#finish` を呼び出してセッションを終了し、セッションのトレースをバックエンドに送信します。

#### テストモジュール

テストモジュールは、セッション内のより小さな作業単位を表します。サポートされているテストフレームワークでは、テストモジュールは常にテストセッションと同じです。お客様のユースケースでは、コンポーネント化されたアプリケーション内のパッケージに相当する可能性があります。

テストモジュールを開始するには、`Datadog::CI.start_test_module` を呼び出し、モジュール名を渡します。

モジュールの実行が終了したら、`Datadog::CI::TestModule#finish` を呼び出します。

#### テストスイート

テストスイートは、類似した機能をテストする一連のテストで構成されます。通常、1 つのスイートはテストが定義された 1 つのファイルに対応します。

`Datadog::CI#start_test_suite` を呼び出してテストスイートの名前を渡すことで、テストスイートを作成します。

スイートの中の関連するテストがすべて実行を終えたら `Datadog::CI::TestSuite#finish` を呼び出します。

#### テスト

テストは、テストスイートの一部として実行される単一のテストケースを表します。
通常、テストのロジックを含む 1 つのメソッドに対応します。

`Datadog::CI#start_test` または `Datadog::CI.trace_test` を呼び出して、テストの名前とテストスイートの名前を渡すことで、スイート内のテストを作成します。テストスイートの名前は、前のステップで開始したテストスイートの名前と一致させる必要があります。

テストの実行が終了したら、`Datadog::CI::Test#finish` を呼び出します。

### コード例

次のコードは、API の使用例を表しています。

```ruby
require "datadog/ci"

Datadog.configure do |c|
  c.service = "my-test-service"
  c.ci.enabled = true
end

def run_test_suite(tests, test_suite_name)
  test_suite = Datadog::CI.start_test_suite(test_suite_name)

  run_tests(tests, test_suite_name)

  test_suite.passed!
  test_suite.finish
end

def run_tests(tests, test_suite_name)
  tests.each do |test_name|
    Datadog::CI.trace_test(test_name, test_suite_name) do |test|
      test.passed!
    end
  end
end

Datadog::CI.start_test_session(
  tags: {
    Datadog::CI::Ext::Test::TAG_FRAMEWORK => "my-framework",
    Datadog::CI::Ext::Test::TAG_FRAMEWORK_VERSION => "0.0.1",
  }
)
Datadog::CI.start_test_module("my-test-module")

run_test_suite(["test1", "test2", "test3"], "test-suite-name")

Datadog::CI.active_test_module&.passed!
Datadog::CI.active_test_module&.finish

Datadog::CI.active_test_session&.passed!
Datadog::CI.active_test_session&.finish
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /ja/tests/guides/add_custom_measures/?tab=ruby
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /ja/tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr