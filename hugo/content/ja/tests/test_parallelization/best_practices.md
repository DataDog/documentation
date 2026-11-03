---
description: Ruby、Rails、Python、および JavaScript テストスイートのテスト並列化計画とテスト検出を最適化します。
further_reading:
- link: /tests/test_parallelization/setup/
  tag: ドキュメント
  text: テスト並列化のセットアップ
- link: /tests/test_parallelization/configuration/
  tag: ドキュメント
  text: テスト並列化を構成する
- link: /tests/test_parallelization/troubleshooting/
  tag: ドキュメント
  text: テスト並列化のトラブルシューティング
title: テスト並列化のベストプラクティス
---
## 計画ステップを最適化する {#optimize-the-planning-step}

テスト並列化では、実行前にテストを検出する計画ステップが追加されます。たとえば、RSpec プロジェクトはドライラン検出を使用し、pytest プロジェクトはコレクションを使用し、Jest プロジェクトは `--listTests` を使用します。並列実行によって節約された時間が計画オーバーヘッドによって相殺されないよう、このステップはシンプルに保ってください。

### Docker を使用してシステム依存関係をプリインストールする {#preinstall-system-dependencies-with-docker}

テストにオペレーティングシステムのパッケージが必要な場合は、CI の実行ごとにインストールするのではなく、CI ベースイメージに含めてください。

{{< code-block lang="dockerfile" filename="ci/Dockerfile.test" >}}
FROM ruby:3.3
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends imagemagick libpq-dev \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
{{< /code-block >}}

### プロジェクトの依存関係をキャッシュする {#cache-project-dependencies}

CI プロバイダーの依存関係キャッシュを使用してください。たとえば、GitHub Actions では `ruby/setup-ruby` を使用して Bundler の依存関係をキャッシュできます。

{{< code-block lang="yaml" >}}
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: 3.3
    bundler-cache: true
{{< /code-block >}}

Python プロジェクトの場合は、pip キャッシュとともに `actions/setup-python` を使用してください。

{{< code-block lang="yaml" >}}
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
{{< /code-block >}}

JavaScript プロジェクトの場合は、npm キャッシュとともに `actions/setup-node` を使用してください。

{{< code-block lang="yaml" >}}
- uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
{{< /code-block >}}

### 検出中のデータベースセットアップをスキップする {#skip-database-setup-during-discovery}

検出ではテストを実行しないため、計画ステップ中にデータベースのセットアップ、移行、シード、およびフィクスチャが必要になることはほとんどありません。

検出中、`DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` は `1` に設定されます。この変数を使用して、計画中の負荷の高いセットアップコードをスキップしてください。

たとえば、Rails の場合は以下のようになります。

{{< code-block lang="ruby" >}}
# in seeds.rb
return if ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
# your seeds here

# in rails_helper.rb
ActiveRecord::Migration.maintain_test_schema! unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?

RSpec.configure do |config|
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

これらの変更後、テスト検出はより高速に実行され、計画中にデータベースが利用できない場合でも失敗を回避できます。

### テスト検出をキャッシュする {#cache-test-discovery}

完全なテスト検出に時間がかかりすぎる場合は、CI 実行間で `ddtest` 検出ファイルをキャッシュしてください。計画の前に CI キャッシュを復元し、復元されたファイルを `ddtest` に渡してください。

{{< code-block lang="bash" >}}
DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE=.ddtest-cache/tests-discovery.json ddtest plan
{{< /code-block >}}

計画後、更新された内部検出ファイルを CI キャッシュに保存し直してください。

{{< code-block lang="bash" >}}
if [ -f .testoptimization/tests-discovery/tests.json ]; then
  mkdir -p .ddtest-cache
  cp .testoptimization/tests-discovery/tests.json .ddtest-cache/tests-discovery.json
fi
{{< /code-block >}}

`ddtest` は、テストファイルが変更されたときにキャッシュを無効にします。テストファイルのセットは、`--tests-location` および `--tests-exclude-pattern` によって決定されます。

### Ruby に対してスイートレベルのスキップを使用する {#use-suite-level-skipping-for-ruby}

これらの最適化を適用しても Ruby のテスト検出がボトルネックとなる場合は、Test Impact Analysis がスイートレベルのスキップを使用するように設定してください。このモードでは、`ddtest plan` は個々のテストをすべて検出する代わりにテストファイルの検出を使用できます。Test Impact Analysis はスイート全体をスキップまたは実行するため、テストレベルのスキップの精度と引き換えに計画のオーバーヘッドを削減できます。

スイートレベルのスキップには `datadog-ci >= 1.34.0` が必要です。計画とテスト実行の両方に対して `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite` を設定してください。

{{< code-block lang="bash" >}}
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest plan
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest run
{{< /code-block >}}

別のコマンドでテストを実行する場合は、そのコマンドに対しても同じ環境変数を設定してください。計画とテスト実行を別々のジョブで行う CI ワークフローでは、両方のジョブで変数を設定してください。

## pytest を構成する {#configure-pytest}

`ddtest` はデフォルトで `python -m pytest` として pytest を実行し、選択されたテストファイルを追加します。バージョン 1.7.0 以降では、`--command` を設定してベースコマンドをオーバーライドします。たとえば、`--command pytest` は `python -m pytest` の代わりに `pytest` コンソールスクリプトを実行します。`ddtest` は `<command> <files>` を実行し、`-m pytest` は追加しません。これは `--ddtrace` を `PYTEST_ADDOPTS` に追加し、既存の値を保持するため、`ddtrace` pytest プラグインは pytest の設定を変更することなく読み込まれます。ベースコマンドを変更せずに pytest の追加フラグを渡すには、`PYTEST_ADDOPTS` を使用します。

テスト検出のために、`ddtest` は `pytest.ini`、`pyproject.toml`、`tox.ini`、または `setup.cfg` から `testpaths` と `python_files` を読み取ります。pytest の設定でこれらの設定が定義されていない場合、`ddtest` は `**/{test_*,*_test}.py` を使用します。

検出中、`DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` は `1` に設定されます。この変数を使用して、計画中の高コストなセットアップコードをスキップします。これは、[検出中にデータベースのセットアップをスキップする](#skip-database-setup-during-discovery)のと同様です。

## Jest を構成する {#configure-jest}

`ddtest` は、ローカルの `node_modules/.bin/jest` 実行ファイルが存在する場合はそれを介して、存在しない場合は `npx jest` を介して Jest を実行します。プロジェクトがパッケージマネージャーやラッパーを介して Jest を実行する場合は、`--command` を使用してください。

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework jest --command "pnpm jest --runInBand"
{{< /code-block >}}

コマンドには、テストファイルや `--` セパレーターを含めないでください。`ddtest` は、リストと Jest フラグ自体を末尾に追加します。

`ddtest`はワーカープロセスに対して、すでに存在しない限り `NODE_OPTIONS` の先頭に `-r dd-trace/ci/init` を追加します。`ddtest` が実行されるプロジェクトから `dd-trace` が解決可能であることを確認してください。

`ddtest`個々の Jest テストではなく、テストファイルとスイートを検出して分割します。

## Rails 以外のプロジェクトで Minitest を構成する {#configure-minitest-in-non-rails-projects}

Rails 以外の Minitest プロジェクトの場合、`ddtest` は `bundle exec rake test` を使用し、選択されたファイルを `TEST_FILES` 環境変数に渡します。`Rake::TestTask` を構成して `TEST_FILES` を読み取ります。

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}