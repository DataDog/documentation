---
title: Ruby テスト
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: ドキュメント
    text: テスト結果とパフォーマンスを調べる
  - link: /continuous_integration/troubleshooting/
    tag: ドキュメント
    text: トラブルシューティング CI
---
## 互換性

サポートされている CI プロバイダー:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## トレースのインストール

Ruby トレーサーをインストールするには

1. `ddtrace` gem (バージョン 0.50.0 以降) を `Gemfile` に追加します。


    {{< code-block lang="ruby" >}}
    source 'https://rubygems.org'
    gem 'ddtrace', ">=0.50.0"
    {{< /code-block >}}

2. `bundle install` を実行して gem をインストールします

詳細については、[Ruby トレーサーのインストールドキュメント][2]を参照してください。

## テストのインスツルメンテーション
### Cucumber

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のシナリオとステップの実行をトレースすることができます。

インテグレーションを有効にするには

{{< code-block lang="ruby" >}}
require 'cucumber'
require 'datadog/ci'

# デフォルトの Cucumber インテグレーションを構成します
Datadog.configure do |c|
  c.ci_mode.enabled = true
  c.use :cucumber, options
end

# シナリオからアクティブスパンにタグをアタッチします
Around do |scenario, block|
  active_span = Datadog.configuration[:cucumber][:tracer].active_span
  unless active_span.nil?
    scenario.tags.filter { |tag| tag.include? ':' }.each do |tag|
      active_span.set_tag(*tag.name.split(':', 2))
    end
  end
  block.call
end
{{< /code-block >}}

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Cucumber テストをトレースするかどうかを指定します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `service_name` | `cucumber` インスツルメンテーションに使用されるサービス名を指定します。 | `'cucumber'` |
| `operation_name` | `cucumber` インスツルメンテーションに使用するオペレーション名を指定します。`trace.#{operation_name}.errors` の形式で、自動のトレースメトリクスの名前を変更したい場合に役立ちます。 | `'cucumber.test'` |

[Cucumber の Ruby トレースライブラリのドキュメント][3]も参照してください。

### RSpec

RSpec インテグレーションでは、`rspec` テストフレームワーク使用時に、グループ単位や個別での例の実行すべてをトレースできます。

インテグレーションを有効にするには、これを `spec_helper.rb` ファイルに追加します。

{{< code-block lang="ruby" >}}
require 'rspec'
require 'datadog/ci'

# デフォルトの RSpec インテグレーションを構成します
Datadog.configure do |c|
  c.ci_mode.enabled = true
  c.use :rspec, options
end
{{< /code-block >}}

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | RSpec テストをトレースするかどうかを指定します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `service_name` | `rspec` インスツルメンテーションに使用されるサービス名を指定します。 | `'rspec'` |
| `operation_name` | `rspec` インスツルメンテーションに使用するオペレーション名を指定します。`trace.#{operation_name}.errors` の形式で、自動のトレースメトリクスの名前を変更したい場合に役立ちます。 | `'rspec.example'` |

[RSpec の Ruby トレースライブラリのドキュメント][4]も参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/ruby/#installation
[3]: /ja/tracing/setup_overview/setup/ruby/#cucumber
[4]: /ja/tracing/setup_overview/setup/ruby/#rspec