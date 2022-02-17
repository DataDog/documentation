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

サポートされている Ruby インタープリター:
* Ruby >= 2.1
* JRuby >= 9.2

サポートされているテストフレームワーク:
* Cucumber >= 3.0
* RSpec >= 3.0.0

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## Ruby トレーサーのインストール

Ruby トレーサーをインストールするには

1. `ddtrace` gem を `Gemfile` に追加します。

    {{< code-block lang="ruby" filename="Gemfile" >}}
ソース 'https://rubygems.org'
gem 'ddtrace', ">=0.53.0"
{{< /code-block >}}

2. `bundle install` を実行して gem をインストールします

詳細については、[Ruby トレーサーのインストールドキュメント][2]を参照してください。

## テストのインスツルメンテーション

{{< tabs >}}
{{% tab "Cucumber" %}}

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のシナリオとステップの実行をトレースすることができます。

インテグレーションをアクティブ化するには、次のコードをアプリケーションに追加します。

```ruby
require 'cucumber'
require 'ddtrace'

if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # 結果が確実に配信されるようにトレーサーを構成します
    c.ci.enabled = true
    # テスト中のサービスまたはライブラリの名前
    c.service = 'my-ruby-app'
    # Cucumber のインスツルメンテーションを有効にします
    c.ci.instrument :cucumber
  end
end
```

`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{% tab "RSpec" %}}

RSpec インテグレーションでは、`rspec` テストフレームワーク使用時に、グループ単位や個別での例の実行すべてをトレースできます。

インテグレーションを有効にするには、これを `spec_helper.rb` ファイルに追加します。

```ruby
require 'rspec'
require 'ddtrace'

if ENV["DD_ENV"] == "ci"
  Datadog.configure do |c|
    # 結果が確実に配信されるようにトレーサーを構成します
    c.ci.enabled = true
    # テスト中のサービスまたはライブラリの名前
    c.service = 'my-ruby-app'
    # Cucumber のインスツルメンテーションを有効にします
    c.ci.instrument :rspec
  end
end
```

`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}
{{< /tabs >}}

## コンフィギュレーション設定

以下は、`Datadog.configure` ブロックを使用するか、環境変数を使用するコードで、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

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

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][3]オプションも使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/ruby/#installation
[3]: /ja/tracing/setup_overview/setup/ruby/?tab=containers#configuration
