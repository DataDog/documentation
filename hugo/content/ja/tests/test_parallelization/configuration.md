---
description: テスト並列化の環境変数、並列化の選択、ワーカー設定、およびプランアーティファクトを設定します。
further_reading:
- link: /tests/test_parallelization/setup/
  tag: ドキュメント
  text: テスト並列化のセットアップ
- link: /tests/test_parallelization/troubleshooting/
  tag: ドキュメント
  text: テスト並列化のトラブルシューティング
- link: /tests/test_parallelization/best_practices/
  tag: ドキュメント
  text: テスト並列化のベストプラクティス
title: テスト並列化の設定
---
## 環境変数 {#environment-variables}

ほとんどの `ddtest` 設定は、CLI フラグまたは環境変数として渡すことができます。CLI フラグは環境変数よりも優先されます。

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: プログラミング言語。<br/>
**CLI フラグ:** `--platform`<br/>
**デフォルト:** `ruby`<br/>
**サポートされている値:** `ruby`、`python`、`javascript`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: テストフレームワーク。<br/>
**CLI フラグ:** `--framework`<br/>
**デフォルト:** `rspec`<br/>
**サポートされている値:** `rspec`、`minitest`、`pytest`、`jest`

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: デフォルトのテストコマンドをオーバーライドします。`ddtest` は、選択したテストファイルとフレームワーク固有のフラグをコマンドに追加します。Ruby、JavaScript、および Python でサポートされています。Python のサポートには ddtest 1.7.0 以降が必要です。pytest を使用する 1.7.0 より前の ddtest バージョンでは、コマンドを変更できません。`PYTEST_ADDOPTS` を使用して追加のフラグを渡します。詳細については、「[カスタムテストコマンド](#custom-test-commands)」をご覧ください。<br/>
**CLI フラグ:** `--command`<br/>
**デフォルト:** 空<br/>
**例:** `bundle exec rspec --profile`、`pnpm jest --runInBand`、`pytest`

`DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM`
: `ddtest` が計画時に考慮する CI ノードまたはワーカーの最小数。<br/>
**CLI フラグ:** `--min-parallelism`<br/>
**デフォルト:** 物理 CPU 数<br/>
**例:** `1`

`DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM`
: `ddtest` が計画時に考慮する CI ノードまたはワーカーの最大数。<br/>
**CLI フラグ:** `--max-parallelism`<br/>
**デフォルト:** 物理 CPU 数<br/>
**例:** `8`

`DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD`
: 追加の CI ノードを起動する際の推定オーバーヘッド。`ddtest` プランナーは、そのノードによってウォールクロックタイムが少なくともこの値だけ短縮される場合にのみ、別の CI ノードを追加します。<br/>詳細については、「[並列化の選択](#parallelism-selection)」をご覧ください。<br/>
**CLI フラグ:** `--ci-job-overhead`<br/>
**デフォルト:** `25s`<br/>
**例:** `25s`、`45s`、`1m`、`1500ms`、`0s`

`DD_TEST_OPTIMIZATION_RUNNER_TARGET_TIME`
: 選択した分割の目標ウォールタイム。`ddtest` は、まずこのウォールタイム未満の分割を検討します。設定された並列化の範囲内でターゲットを満たす分割がない場合、`ddtest` は予想ウォールタイムが最も短い分割を選択します。詳細については、「[並列化の選択](#parallelism-selection)」を参照してください。<br/>
**CLI フラグ:** `--target-time`<br/>
**デフォルト:** `0s`<br/>
**例:** `10m`、`300s`、`1500ms`、`0s`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`
: CI ノード `N` に割り当てられたファイルのみを実行します。ここで、`N` は 0 から始まるインデックスです。<br/>
**CLI フラグ:** `--ci-node`<br/>
**デフォルト:** `-1`<br/>
**例:** `0`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE_WORKERS`
: この CI ノードで起動するワーカーの数。正の整数を使用するか、`ncpu` を使用して利用可能なすべての物理 CPU を使用します。<br/>
**CLI フラグ:** `--ci-node-workers`<br/>
**デフォルト:** `1`<br/>
**例:** `2`、`ncpu`

`DD_TEST_OPTIMIZATION_RUNNER_WORKER_ENV`
: 各ワーカープロセスの環境変数を設定します。Use `{{nodeIndex}}` and `{{workerIndex}}` placeholders to give each worker a unique value. For more information, see [Worker environment variables](#worker-environment-variables).<br/>
**CLI flag:** `--worker-env`<br/>
**Default:** Empty<br/>
**Example:** `DB_NAME=testdb{{nodeIndex}}_{{workerIndex}};FIXTURE=fixture{{nodeIndex}}`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION`
: テストファイルを検出するために使用されるグロブパターン。デフォルトは、RSpec の場合は `spec/**/*_spec.rb`、Minitest の場合は `test/**/*_test.rb`、pytest の場合は pytest 設定 (`testpaths` および `python_files`) または `**/{test_*,*_test}.py`、Jest 設定または Jest のデフォルトのテストマッチングです。<br/>**CLI フラグ:**`--tests-location`<br/>**エイリアス:**`KNAPSACK_PRO_TEST_FILE_PATTERN`<br/>**デフォルト:**フレームワークのデフォルト<br/>**例:**`custom/spec/**/*_spec.rb`、`tests/**/*_test.py`、`packages/**/__tests__/**/*.test.ts`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN`
: 検出からテストファイルを除外するために使用されるグロブパターン。<br/>
**CLI フラグ:** `--tests-exclude-pattern`<br/>
**エイリアス:** `KNAPSACK_PRO_TEST_FILE_EXCLUDE_PATTERN`<br/>
**デフォルト:** 空<br/>
**例:** `spec/system/**/*_spec.rb`

`DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE`
: 復元されたテスト検出キャッシュファイルへのパス。`ddtest` は、計画前にこのファイルをインポートし、すべての検出が完了したら、内部検出キャッシュを更新します。<br/>
**CLI フラグ:** `--test-discovery-cache`<br/>
**デフォルト:** 空<br/>
**例:** `.ddtest-cache/tests-discovery.json`

`DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE`
: Test Impact Analysis のスキップで、Ruby のテストレベルまたはスイートレベルの粒度を使用するかどうかを制御します。無効な値は `test` にフォールバックします。<br/>
**CLI フラグ:** `--test-skipping-mode`<br/>
**デフォルト:** `test`<br/>
**サポートされている値:** `test`、`suite`

`DD_TEST_OPTIMIZATION_RUNNER_FORCE_FULL_TEST_DISCOVERY`
: スイートレベルのスキップモードを含め、フレームワークがサポートしている場合に完全なテスト検出を強制的に実施します。<br/>
**CLI フラグ:** `--force-full-test-discovery`<br/>
**デフォルト:** `false`<br/>
**サポートされている値:** `true`、`false`

`DD_TEST_OPTIMIZATION_RUNNER_STRICT_DISCOVERY`
: 完全なテスト検出がエラーで終了した場合に計画を失敗させます。完全な検出が (タイムアウトなどで) キャンセルされた場合、`ddtest` は失敗せずに高速テストファイル検出にフォールバックします。<br/>
**CLI フラグ:** `--strict-discovery`<br/>
**デフォルト:** `false`<br/>
**例:** `true`

`DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`
: スキップ可能なテストの取得に使用されるランタイムタグをオーバーライドする JSON 文字列。スキップ可能なテストの計算に使用される CI 環境外で `ddtest` が実行される場合に使用します。<br/>
**CLI フラグ:** `--runtime-tags`<br/>
**エイリアス:** `DD_TEST_OPTIMIZATION_RUNTIME_TAGS`<br/>
**デフォルト:** 空<br/>
**例:** `{"os.platform":"linux","os.version":"7.8.9","runtime.name":"ruby","runtime.version":"3.3.0"}`

`DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED`
: `ddtest` がコマンド実行後に人間が読める形式のレポートを出力するかどうかを制御します。この設定は環境変数としてのみ利用可能です。<br/>
**CLI フラグ:** なし<br/>
**デフォルト:** `true`<br/>
**例:** `false`

## 並列化の選択 {#parallelism-selection}

`ddtest plan` は、実行可能な各テストファイルの所要時間を推定し、`--min-parallelism` から `--max-parallelism` までのすべての並列化の値を評価します。

CI ノードモードでは、この値は CI ノード数です。単一の CI ノードでは、この値はワーカー数です。

所要時間の推定値は、利用可能な場合は Datadog テストスイートの p50 タイミングから取得され、それ以外の場合はローカル検出の重みにフォールバックします。各候補数は、予想される最も遅いワーカーの処理時間と、ノード数に `--ci-job-overhead` を掛けた値の合計としてスコアリングされます。

スコアが同点の場合、`ddtest` は CI ノードまたはワーカーの数が少ない方、次に予想ウォールタイムが短い方、その次にワーカー間の不均衡が小さい方を優先します。

`ddtest``--ci-job-overhead` 設定を使用して、常に最大数の CI ノードが選択されることを回避します。デフォルト値の `25s` の場合は、`ddtest` は、そのノードによってウォールクロックタイムが少なくとも 25 秒短縮されると予想される場合にのみ、CI ノードを追加します。

`--ci-job-overhead` を大きくすると、使用する CI ノード数が少なくなります。ウォールクロックタイムの短縮を優先する場合は、値を小さくしてください。`25s`、`1m`、`1500ms` などの所要時間の値を使用します。`0s` に設定すると、テスト実行が常に `--max-parallelism` 個のノードにファンアウトされます。

`--target-time` に設定すると、`ddtest` はそのターゲット以下で分割を最初に評価します。`10m`、`300s`、`1500ms` などの所要時間の値を使用します。デフォルト値の `0s` は、ターゲットを無効にします。

ターゲットを満たす分割がない場合、`ddtest` は警告をログに記録します。CI ジョブのオーバーヘッドを無視して、予想ウォールタイムが最も短い分割を選択します。

## カスタムテストコマンド {#custom-test-commands}

Ruby フレームワークおよび Jest の場合は、`--command` を使用してデフォルトのテストコマンドをオーバーライドします。

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bin/integration-tests"
{{< /code-block >}}

`--command` を使用する場合は、コマンドにテストファイルを含めないでください。`ddtest` は、テストファイルとフレームワーク固有のフラグをコマンドに追加します。

`--command` には `--` 区切り文字を含めないでください。コマンドに `--` が含まれている場合、`ddtest` は警告を出し、区切り文字とその後にあるすべてを削除します。

pytest の場合、`ddtest` はデフォルトで `python -m pytest <files>` を実行します。バージョン 1.7.0 以降では、`--command` を設定してベースコマンドをオーバーライドします。たとえば、`--command pytest` は `python -m pytest` の代わりに `pytest` コンソールスクリプトを実行します。`ddtest` は `<command> <files>` を実行し、`-m pytest` は追加しません。ベースコマンドを変更せずに pytest の追加フラグを渡すには、`PYTEST_ADDOPTS` を使用します。`ddtest` は `PYTEST_ADDOPTS` に `--ddtrace` を自動的に追加するため、pytest の設定を変更しなくても `ddtrace` pytest プラグインが読み込まれます。

Jest の場合、`ddtest` はワーカープロセスに対して `NODE_OPTIONS` の先頭に `-r dd-trace/ci/init` を追加します (すでに存在する場合を除く)。そのため、`ddtest` が実行されるプロジェクトに `dd-trace` パッケージがインストールされている必要があります。

## Pytest のテスト検出 {#pytest-test-discovery}

pytest の場合、`ddtest` は以下の優先順位を使用してテストファイルを検出します。

1. `--tests-location` (設定されている場合)。
2. Pytest の構成 (`pytest.ini`、`pyproject.toml`、`tox.ini`、`setup.cfg` から、または `testpaths` および `python_files` を使用して)。
3. 組み込みパターンの `**/{test_*,*_test}.py`。

Pytest には RSpec のパターンフラグに相当するものがないため、`ddtest` は設定された pytest コマンドを呼び出す前に、パターンを明示的なファイルパスに解決します。デフォルトは `python -m pytest` です。バージョン 1.7.0 以降では、`--command` によってオーバーライドされます。

## Jest のテスト検出とインスツルメンテーション {#jest-test-discovery-and-instrumentation}

Jest の場合、`ddtest` は Jest 独自の `--listTests` コマンドを使用してテストファイルを検出します。以下の優先順位を使用します。

1. `--command` (設定されている場合)。`--listTests` が追加されます。
2. ローカル実行可能ファイル `node_modules/.bin/jest` (存在する場合)。
3. `npx jest`。

Jest は `--listTests` に対して独自の構成とデフォルトのテストマッチングを使用します。`--tests-location` が設定されている場合、`ddtest` は検出後に Jest によって返されるファイルリストをフィルタリングします。これは `--tests-location` を Jest の `--testMatch` として渡しません。

Jest のサポートでは、スイートレベルの Test Impact Analysis を使用します。`ddtest` は個々の Jest テストではなく、テストファイルおよびスイートを使用し、選択されたファイルを `--runTestsByPath` で実行します。

実行中、`NODE_OPTIONS` がすでに `dd-trace/ci/init` を読み込んでいない限り、`ddtest` はワーカープロセスに対して `NODE_OPTIONS` の先頭に `-r dd-trace/ci/init` を追加します。

## ワーカーの環境変数{#worker-environment-variables}

各ワーカーの環境変数を設定するには `--worker-env` を使用します。この値は、`{{nodeIndex}}` and `{{workerIndex}}` プレースホルダーをサポートしています。

`{{nodeIndex}}`
: CI ノードインデックス `--ci-node` or `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`. In single-node runs, the value is `0`。

`{{workerIndex}}`
: `0` から開始する、現在の CI ノード内のワーカープロセスインデックス。`

形式は `ENV=value` です。複数の値を `;` で区切ります。

例として、各ワーカーに独自のテストデータベースを割り当てます。

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --worker-env "DB_NAME=testdb{{nodeIndex}}_{{workerIndex}}"
{{< /code-block >}}

`ddtest` は、変数が設定されていない場合、各ワーカーの `DD_TEST_SESSION_NAME` を自動的に `<DD_SERVICE>-node-<nodeIndex>-worker-<workerIndex>` に設定します。`DD_TEST_SESSION_NAME` を設定した場合、`ddtest` はそれを保持し、各ワーカーを開始する前に同じプレースホルダーを展開します。

## ランタイムタグの安定化 {#stabilize-runtime-tags}

Test Impact Analysis のスキップ可能なテストは、OS、アーキテクチャ、Ruby バージョンなどのランタイムタグによってスコープが設定されます。`ddtest` から頻繁に 0 件のテストがスキップされたと報告される場合は、ランタイムタグが CI ランナー間で異なっていないかどうか確認してください。たとえば、AWS ランナーはジョブ間で異なる `os.version` 値を報告する場合があります。

マッチングを安定させるには、`ddtest` とワーカープロセスの両方で使用される環境で固定のランタイムタグを設定します。

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNTIME_TAGS='{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
ddtest run
{{< /code-block >}}

`ddtest` は、ランナー固有の `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` 環境変数および `--runtime-tags` CLI フラグも受け入れます。

## プランアーティファクト {#plan-artifacts}

`ddtest plan` は、現在の作業ディレクトリに `.testoptimization/` ディレクトリを書き込みます。このディレクトリを計画ジョブから、`ddtest run` を実行するか、`ddtest` プランファイルリストを使用するすべての CI ジョブにコピーします。

ほとんどの統合では、`.testoptimization/` を生成されたアーティファクトとして扱う必要があります。外部コンシューマー向けの安定したファイルを以下に示します。

| ファイル | 説明 |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | プランレイアウトのバージョン。|
| `.testoptimization/runner/test-files.txt` | 実行するテストファイルの改行区切りリスト。各ファイルには、スキップされていないテストが少なくとも 1 つ含まれています。|
| `.testoptimization/runner/parallel-runners.txt` | 選択された CI ノード数またはワーカー数。|
| `.testoptimization/runner/skippable-percentage.txt` | Test Impact Analysis によってスキップされたテスト時間の割合。|
| `.testoptimization/runner/tests-split/runner-N` | インデックスに割り当てられたファイルの改行区切りリスト。`N`|
| `.testoptimization/github/config` | `ddtest` が GitHub Actions を検出したときに書き込まれる GitHub Actions マトリックスの出力。|

`.testoptimization/runner/cache/`、`.testoptimization/tests-discovery/`、および`.testoptimization/cache/http/*.json` 下にあるファイルは実装の詳細です。トラブルシューティングの目的でのみ使用してください。

## 別のテストランナーでプランを使用する {#use-a-plan-with-another-test-runner}

`ddtest` プランは、`ddtest` が実行可能なテストファイルを選択したが、別のランナーがそれらを実行する場合に使用します。

別のランナーが使用できる `test-files.txt` およびランナーごとの `tests-split/runner-N` ファイルについては、「[プランアーティファクト](#plan-artifacts)」を参照してください。

たとえば、Knapsack Pro で `.testoptimization/runner/test-files.txt` を使用するとします。

{{< code-block lang="bash" >}}
KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE=.testoptimization/runner/test-files.txt bundle exec rake knapsack_pro:queue:rspec
{{< /code-block >}}

pytest の場合は、`PYTEST_ADDOPTS` で `ddtrace` プラグインを有効にし、ファイルリストを `python -m pytest` に渡します。

{{< code-block lang="bash" >}}
export PYTEST_ADDOPTS="${PYTEST_ADDOPTS:+$PYTEST_ADDOPTS }--ddtrace"
if [ -s .testoptimization/runner/test-files.txt ]; then
  xargs python -m pytest < .testoptimization/runner/test-files.txt
fi
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}