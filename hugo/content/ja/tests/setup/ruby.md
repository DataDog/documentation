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
  text: Containers 内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /tests/test_parallelization/
  tag: ドキュメント
  text: テスト並列化のセットアップ
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: Ruby テスト
type: multi-code-lang
---
## 互換性{#compatibility}

サポート対象言語:

| 言語 | バージョン |
| -------- | ------- |
| Ruby     | 2.7 以上|

サポート対象テストフレームワーク:

| テストフレームワーク | バージョン  |
| -------------- | -------- |
| RSpec          | 3.0.0 以上|
| Minitest       | 5.0.0 以上|
| Cucumber       | 3.0 以上  |

サポート対象テストランナー:

| テストランナー    | バージョン   |
| -------------- | --------- |
| Knapsack Pro   | 7.2.0 以上 |
| parallel_tests | 4.0.0 以上 |
| ci-queue       | 0.53.0 以上|

## 報告方法の構成 {#configuring-reporting-method}

Datadog にテスト結果を報告するには、以下のように `datadog-ci` gem を構成する必要があります。

{{< tabs >}}
{{% tab "自動インスツルメンテーションサポートがある CI プロバイダー" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "クラウド CI プロバイダー (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## 手動インスツルメンテーション {#manual-instrumentation}

<div class="alert alert-info">
このセクションは、CI プロバイダーが自動インスツルメンテーションをサポートしていない場合に<strong>のみ必要</strong>です。上記の『<a href="#configuring-reporting-method">報告方法の構成</a>』セクションで「<strong>自動インスツルメンテーションサポートがある CI プロバイダー</strong>」を選択した場合は、このセクションをスキップして『<a href="#configuration-settings">構成設定</a>』に進んでください。
</div>

CI プロバイダーが自動インスツルメンテーションをサポートしていない場合 (たとえば、{{< ui >}}Cloud CI provider (Agentless){{< /ui >}} または {{< ui >}}On-Premises CI Provider (Datadog Agent){{< /ui >}} を選択した場合)、以下の手順に従ってライブラリをインストールし、テストを手動でインスツルメンテーションしてください。

1. Gemfile に [Ruby Test Optimization gem][10] を追加します。

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "datadog-ci", "~> 1.0", group: :test
{{< /code-block >}}

2. [報告方法を構成します。](#configuring-reporting-method)

3. テストを実行するコマンドで `RUBYOPT` 環境変数を設定します。

   ```bash
   RUBYOPT="-rbundler/setup -rdatadog/ci/auto_instrument" bundle exec rake test
   ```

   **注**: `RUBYOPT` 環境変数を設定したくない場合は、テストコマンドの先頭に `bundle exec ddcirb exec` を追加してください。

   ```bash
   bundle exec ddcirb exec rake test
   ```

## 構成設定{#configuration-settings}

Test Optimization ライブラリを構成するには、テストプロセスを開始する前に以下の環境変数を設定します。並列テストランナーの場合、すべてのワーカーが継承するように親プロセスで設定してください。

`DD_CIVISIBILITY_ENABLED=true`(必須)
: Test Optimization を有効にします。<br/>
**デフォルト**: `false`

`DD_ENV` (オプション)
: テストが実行されている環境の名前。<br/>
**デフォルト**: `(empty)`<br/>
**例**: `local`、`ci`

`DD_SERVICE` (オプション)
: テスト対象のサービスまたはライブラリの名前。<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-ruby-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Agentless モードの場合、必須)
Agentless モードを有効にして、テスト結果を Datadog に直接送信します。<br/>
**デフォルト**: `false`

`DD_API_KEY` (Agentless モードの場合、必須)
: テスト結果のアップロードを認証するために使用される Datadog API キー。この変数で Agentless モードが有効になることはありません。<br/>
**デフォルト**: `(empty)`

`DD_SITE` (Agentless モードの場合、オプション)
: テスト結果のアップロード先の [Datadog サイト][11]。US1 以外のサイトを使用する場合は、この構成を設定します。<br/>
**デフォルト**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Datadog Agent を使用する場合のみ)
: トレース収集用の Datadog Agent URL。`http://hostname:port` の形式にします。<br/>
**デフォルト**: `http://127.0.0.1:8126`

`DD_TEST_SESSION_NAME` (オプション)
: `unit-tests`、`integration-tests`、`smoke-tests` などのテストグループを識別します。<br/>
**デフォルト**: CI ジョブ名とテストコマンド、または CI ジョブ名が利用できない場合はテストコマンド。<br/>
**例**: `unit-tests`、`integration-tests`、`smoke-tests`

他のすべての [Datadog トレーサー構成][5] オプションも使用できます。

追加の Test Optimization 機能には、それぞれのページに記載されている独自の構成オプションがあります。

## テストにカスタムタグを追加する {#adding-custom-tags-to-tests}

現在アクティブなテストを使用して、テストにカスタムタグを追加することができます。

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_tag("test_owner", "my_team")
# test continues normally
# ...
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、Ruby カスタムインスツルメンテーションドキュメントの [タグの追加][2] セクションを参照してください。

## テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests}

タグと同様に、現在アクティブなテストを使用して、テストにカスタムメジャーを追加できます。

```ruby
require "datadog/ci"

# inside your test
Datadog::CI.active_test&.set_metric("memory_allocations", 16)
# test continues normally
# ...
```

カスタムメジャーの詳細については、[カスタムメジャーの追加ガイド][3] を参照してください。

## 追加のインスツルメンテーションの使用{#using-additional-instrumentation}

データベース操作やその他の外部呼び出しに費やされた時間を含む、テストに関する詳細なトレース情報を取得すると便利です。次のフレームグラフを参照してください。

{{< img src="continuous_integration/tests/setup/ci-ruby-test-trace-with-redis.png" alt="Redis インスツルメンテーションを使用したテストトレース" >}}

`test_helper/spec_helper` に以下の行を追加することで、自動 APM インスツルメンテーションを有効にできます。

```ruby
require "datadog/auto_instrument" if ENV["DD_ENV"] == "ci"
```

**注**: CI モードでは、これらのトレースは Test Optimization に送信され、Datadog APM には**表示されません**。

利用可能なインスツルメンテーション方法の全リストについては、[トレースドキュメント][6] を参照してください。

## Git のメタデータを収集する{#collecting-git-metadata}

{{% ci-git-metadata %}}

## サポート対象外のテストフレームワークに対するライブラリのパブリック API の使用{#using-librarys-public-api-for-unsupported-test-frameworks}

RSpec、Minitest、または Cucumber を使用する場合、Test Optimization がそれらを自動的にインスツルメンテーションしてテスト結果を Datadog に送信するため、**手動テスト API は使用しないでください**。手動テスト API は、すでにサポートされているテストフレームワークと**互換性がありません**。

サポート対象外のテストフレームワークを使用する場合や、別のテストメカニズムを持っている場合のみ、手動テスト API を使用してください。
完全なパブリック API ドキュメントは [YARD サイト][8] にあります。

### ドメインモデル{#domain-model}

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

#### テストセッション{#test-session}

テストセッションはテストコマンドの実行を表します。

テストセッションを開始するには、`Datadog::CI.start_test_session` を呼び出し、Datadog サービスとタグ (使用している
テストフレームワークなど) を渡します。

すべてのテストが終了したら、`Datadog::CI::TestSession#finish` を呼び出します。これによりセッションが閉じられ、セッションのトレースが
バックエンドに送信されます。

#### テストモジュール {#test-module}

テストモジュールは、セッション内のより小さな作業単位を表します。
サポート対象テストフレームワークの場合、テストモジュールは常にテストセッションと同じです。
お客様のユースケースでは、これはコンポーネント化されたアプリケーションのパッケージに相当する場合があります。

テストモジュールを開始するには、`Datadog::CI.start_test_module` を呼び出し、モジュール名を渡します。

モジュールの実行が終了したら、`Datadog::CI::TestModule#finish` を呼び出します。

#### テストスイート{#test-suite}

テストスイートは、類似した機能をテストする一連のテストで構成されます。
通常、1 つのスイートは、テストが定義されている 1 つのファイルに対応します。

`Datadog::CI#start_test_suite` を呼び出し、テストスイート名を渡すことで、テストスイートを作成します。

テストスイート内の関連するテストがすべて実行を完了したら `Datadog::CI::TestSuite#finish` を呼び出します。

#### テスト{#test}

テストは、テストスイートの一部として実行される単一のテストケースを表します。
通常、これはテストロジックを含むメソッドに対応します。

`Datadog::CI#start_test` または `Datadog::CI.trace_test` を呼び出し、テスト名とテストスイート名を渡すことで、スイート内にテストを作成します。テストスイート名は、前のステップで開始されたテストスイートの名前と同じである必要があります。

テストの実行が終了したら、`Datadog::CI::Test#finish` を呼び出します。

### コード例{#code-example}

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

## ベストプラクティス{#best-practices}

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用してテストセッションの名前と関連するテストグループを定義します。このタグの値の例は次のとおりです。

-   `unit-tests`
-   `integration-tests`
-   `smoke-tests`
-   `flaky-tests`
-   `ui-tests`
-   `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合、デフォルトで CI ジョブ名とテストコマンドになります。CI ジョブ名が利用できない場合は、テストコマンドが使用されます。

異なるテストグループを区別しやすくするため、テストセッション名はリポジトリ内で一意でなければなりません。

#### `DD_TEST_SESSION_NAME` を使用するタイミング{#when-to-use-dd-test-session-name}

Datadog がテストセッション間の対応関係を確立するためにチェックするパラメーターのセットがあります。テストの実行に使用されるテストコマンドもその 1 つです。テストコマンドに、実行するファイルのリストなど、実行ごとに変化する文字列が含まれている場合、Datadog はそれらのセッションを互いに無関係なものとみなします。たとえば、以下のような場合です。

-   `bundle exec rspec my_spec.rb my_other_spec.rb`

テストコマンドが実行ごとに異なる場合、Datadog は `DD_TEST_SESSION_NAME` を使用することを推奨します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[3]: /ja/tests/guides/add_custom_measures/?tab=ruby
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[6]: /ja/tracing/trace_collection/dd_libraries/ruby/#integration-instrumentation
[7]: https://github.com/bblimke/webmock
[8]: https://datadoghq.dev/datadog-ci-rb/Datadog/CI.html
[9]: https://github.com/vcr/vcr
[10]: https://github.com/DataDog/datadog-ci-rb
[11]: /ja/getting_started/site/