---
description: テスト並列化プランアーティファクト、CI ノードの選択、スキップ可能なテスト、およびカスタムコマンドをトラブルシューティングします。
further_reading:
- link: /tests/test_parallelization/setup/
  tag: ドキュメント
  text: テスト並列化のセットアップ
- link: /tests/test_parallelization/configuration/
  tag: ドキュメント
  text: テスト並列化を構成する
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: テスト並列化のトラブルシューティング
---
## プランアーティファクトが見つからないか無効である {#missing-or-invalid-plan-artifacts}

`ddtest run --ci-node <N>` によって、割り当てられたテストファイルが検出されない場合は、計画ジョブの `.testoptimization/` ディレクトリがテストジョブで使用可能であることを確認してください。

テストジョブは以下にアクセスできる必要があります。

- `.testoptimization/manifest.txt`
- `.testoptimization/runner/parallel-runners.txt`
- `.testoptimization/runner/tests-split/runner-N`

GitHub Actions を使用する場合は、`include-hidden-files: true` を指定して `.testoptimization/` をアップロードしてください。そうしない場合、アーティファクトのアップロードに隠しディレクトリが含まれないことがあります。

## 想定外の CI ノードまたはワーカー数 {#unexpected-ci-node-or-worker-count}

`ddtest` によって、想定よりも多いまたは少ない数の CI ノードが選択される場合は、以下の設定を確認してください。

- `--min-parallelism`: `ddtest` の対象となる CI ノードまたはワーカーの最小数。
- `--max-parallelism`: `ddtest` の対象となる CI ノードまたはワーカーの最大数。
- `--ci-job-overhead`: 追加の CI ノードを起動する際の推定オーバーヘッド。
- `--target-time`: 選択した分割の目標ウォールタイム。

CI ノード数を少なくすることを優先する場合は、`--ci-job-overhead` を大きくします。ウォールクロックタイムの短縮を優先する場合は、値を小さくしてください。

## スキップ可能なテストが適用されていない {#no-skippable-tests-are-applied}

テスト並列化の実行前に Test Impact Analysis がテストをスキップしない場合は、以下をチェックしてください。

- Test Impact Analysis がテストサービスに対して有効になっていること。
- `git` 実行可能ファイルが存在し、`ddtest` フォルダーがある Git リポジトリで `.git` を実行していること。
- `ddtest plan` を実行するジョブとテストを実行するジョブで、同じ `DD_SERVICE` 値を使用していること。
- `ddtest plan`が、テストと同じ OS および言語ランタイムで実行されていること。

詳細については、「[Test Impact Analysis のトラブルシューティング][1]」を参照してください。

## Minitest が選択されたファイルを実行しない {#minitest-does-not-run-the-selected-files}

Rails 以外の Minitest プロジェクトの場合、`ddtest` は `bundle exec rake test` を使用し、選択されたファイルを `TEST_FILES` 環境変数に渡します。`Rake::TestTask` が `TEST_FILES` を読み取る必要があります。

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## カスタムコマンドが予期されるファイルを実行しない {#custom-commands-do-not-run-the-expected-files}

`--command` を使用する場合、コマンドにテストファイルや `--` セパレーターを含めないでください。`ddtest` は、選択されたテストファイルを自身で追加します。

誤り:

{{< code-block lang="bash" >}}
bin/ddtest run --command "bundle exec rspec -- spec/models/"
{{< /code-block >}}

正しい:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec"
{{< /code-block >}}

Cucumber.js、Cypress、Mocha、Playwright、および Vitest の場合、コマンドは選択されたフレームワークを直接呼び出す必要があります。パッケージマネージャーのラッパーがサポートされます。たとえば、次のようにします。

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework playwright --command "pnpm exec playwright test --project chromium"
{{< /code-block >}}

カスタム JavaScript コマンドが予期しない選択を実行する場合は、`ddtest` が置き換えるフレームワークの入力をチェックしてください。

- Cucumber.js の位置パスと再実行ファイル
- Cypress `--spec`
- Mocha で設定された `spec` 入力
- Playwright `--shard` および対話形式の UI オプション

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/test_impact_analysis/troubleshooting/