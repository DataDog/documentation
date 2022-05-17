---
further_reading:
- link: /continuous_integration/explore_tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Ruby テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">Ruby テストインスツルメンテーションはベータ版です。この期間中、Ruby テストのインスツルメントに関する課金への影響はありません。
</div>

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
gem 'ddtrace', "~> 1.0"
{{< /code-block >}}

2. `bundle install` を実行して gem をインストールします

詳細については、[Ruby トレーサーのインストールドキュメント][2]を参照してください。

## テストのインスツルメンテーション

{{< tabs >}}
{{% tab "Cucumber" %}}

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のシナリオとステップの実行をトレースすることができます。

インテグレーションをアクティブ化するには、次のコードをアプリケーションに追加します。

<!-- TODO: 明示的に `c.tracing.enabled` を設定すると、環境変数 `DD_TRACE_ENABLED` を含む既存のすべての値がオーバーライドされます。これにより、本番環境では `DD_TRACE_ENABLED` を使用してトレーサーを無効にすることができなくなります。
このスニペットは、本番環境のトレーサー構成で正しく動作するように修正するか、クライアントが CI 環境でのみこのコードを含むように指示する必要があります。
これは、このファイル内のすべてのコードスニペットに影響します。
-->
```ruby
require 'cucumber'
require 'datadog/ci'

Datadog.configure do |c|
  # CI でのみテストインスツルメンテーションをアクティブ化します
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # 結果が確実に配信されるようにトレーサーを構成します
  c.ci.enabled = true

  # テスト中のサービスまたはライブラリの名前
  c.service = 'my-ruby-app'

  # Cucumber のインスツルメンテーションを有効にします
  c.ci.instrument :cucumber
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
require 'datadog/ci'

Datadog.configure do |c|
  # CI でのみテストインスツルメンテーションをアクティブ化します
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # 結果が確実に配信されるようにトレーサーを構成します
  c.ci.enabled = true

  # テスト中のサービスまたはライブラリの名前
  c.service = 'my-ruby-app'

  # RSpec のインスツルメンテーションを有効にします
  c.ci.instrument :rspec
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

### Git のメタデータを収集する

Datadog は、テスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化するために Git の情報を使用します。Git のメタデータは、CI プロバイダーの環境変数や、プロジェクトパス内のローカルな `.git` フォルダがあれば、そこからテストインスツルメンテーションによって自動的に収集されます。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/ruby/#installation
[3]: /ja/tracing/setup_overview/setup/ruby/?tab=containers#configuration