---
description: 欠落しているプラン、予期しないテスト選択、トレーサーエラー、および並列ワーカーの失敗を診断します。
further_reading:
- link: /tests/test_parallelization/setup/
  tag: ドキュメント
  text: テスト並列化のセットアップ
- link: /tests/test_parallelization/configuration/
  tag: ドキュメント
  text: テスト並列化設定リファレンス
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: テスト並列化のトラブルシューティング
---
`ddtest` は致命的なエラーを `[error_code] message` として報告します。具体的な原因については、CI ログのメッセージとフレームワークの出力を確認してください。

## プランアーティファクトが見つからない、または無効になっている {#missing-or-invalid-plan-artifacts}

`run_plan_load_failed` や `run_ci_node_test_files_missing` のようなエラーの場合:

1. プランニングジョブで新しいプランを生成します。
2. 隠しファイルやキャッシュを含め、**完全な**`.testoptimization/`ディレクトリをすべてのテストジョブに転送します。
3. プランニングと同じプロジェクトディレクトリから実行します。`manifest.txt` が別のネストされたディレクトリではなく `.testoptimization/` の直下にあることを確認します。
4. `runner/tests-split/` 内の割り当てと一致する、ゼロから始まる `--ci-node` を渡します。

GitHub Actions で、アップロード時に `include-hidden-files: true` を使用します。アーティファクトパスは、シェルステップで異なる作業ディレクトリが設定されている場合でもワークスペースからの相対パスになります。

CircleCI では、プレフィックスのフォールバックキーを使用せず、キャッシュの保存と復元に同じパイプライン固有のキーを使用します。リビジョンのみのキーを使用すると、別の実行のプランが復元される可能性があります。各ワーカーで個別に代替プランを生成することはしないでください。

## Ruby または Python でのプランニングが遅い {#planning-is-slow-for-ruby-or-python}

テスト検出によってプランニングが遅くなる場合は、スイートレベルのスキップを検討してください。CI 環境のプランニングジョブとテストジョブの両方で、`DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE` を `suite` に設定します。

これにより、個々のテストではなくテストファイルを見つけることで、検出作業が軽減されます。pytest の場合、テストモジュールや `conftest.py` の収集およびインポートを回避できます。トレードオフとして、スキップの精度が低下します。Test Impact Analysis はスイート単位でスキップまたは実行するため、より多くのテストが実行される可能性があります。

詳細は、[Ruby および Python のスイートレベルのスキップ](/tests/test_parallelization/best_practices/#use-suite-level-skipping-for-ruby)および [pytest スイートモード](/tests/test_parallelization/configuration/#pytest-suite-mode)を参照してください。

## 想定外の CI ノードまたはワーカー数 {#unexpected-ci-node-or-worker-count}

**プランニングジョブ**で以下の設定を確認します。

- `--min-parallelism` および `--max-parallelism` はカウントを制限します。どちらもデフォルトでは利用可能な物理 CPU 数になります。
- `--ci-job-overhead`が増加するにつれて、より少ないランナーが優先されます。デフォルトは `25s` です。`0s` は、最大並列数を強制することなくペナルティを削除します。
- `--target-time`は所要時間の目標を設定します。目標を満たす分割がない場合、プランナーは境界内で最も高速と予想される分割を選択します。

CI ノードモードでは、プラン数は CI ノードを意味し、`--ci-node-workers` はノードあたりのプロセス数を制御します。`--ci-node` がない単一ノードでは、プラン数はローカルプロセスを意味します。1 つのノードを選択するプランは有効です。[並列度チューニング](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget)を参照してください。

## スキップ可能なテストが適用されていない {#no-skippable-tests-are-applied}

WebdriverIO はバランシングをサポートしていますが、Test Impact Analysis によるスキップはサポートしていません。

以下を確認してください。

- Test Impact Analysis がテストサービスに対して有効になっていること。
- Git がインストールされており、`ddtest` が目的の Git チェックアウト内で実行されていること。
- プランニングと実行で、同じ `DD_SERVICE`、スイート、ソースリビジョン、OS、および言語ランタイムを使用していること。
- ランタイムタグがスキップ可能なテストの計算に使用された環境と一致していること。

Ruby および Python では、完全な検出が失敗した場合や Datadog SDK が存在しない場合に、ファイル検出にフォールバックできます。プランが正常にテストレベルのスキップを適用したと判断する前に、検出ログを確認します。`--strict-discovery` は完全な検出の失敗を致命的なものにします。キャンセルされた完全な検出は、引き続きフォールバックします。

[ランタイムタグ](/tests/test_parallelization/configuration/#stabilize-runtime-tags)および [Test Impact Analysis のトラブルシューティング](/tests/test_impact_analysis/troubleshooting/)を参照してください。

## Pytest がインポートファイルの不一致またはテストの欠落を報告する {#pytest-reports-an-import-file-mismatch-or-missing-tests}

同じベース名を持つ Python テストファイルは、pytest のデフォルトのインポートモードでは競合する可能性があります。`ddtest` は、選択されたランナー数が十分な場合にそれらを分離します。ファイルを分散する際、それ以外の点では実行可能なファイルをすべて保持し、ランナーが 1 つしかない場合も含め、同じベース名のファイルを同じランナーに割り当てざるを得ない場合は警告します。

競合を解決するには、次のいずれかを実行します。

- テストにそれぞれ異なる完全修飾モジュール名を付けるため、`__init__.py` ファイルを追加します。
- 競合するファイルの名前を変更します。
- `--import-mode=importlib` で pytest を構成します。

インポートを修正した後でも、ベース名の警告が表示されることがあります。分割しても、ディストリビューション前にテストを収集する完全な検出中の衝突は防げません。警告に完全な検出結果から欠落しているファイルがリストされている場合は、それらを調査します。それらのファイルはスケジュールされていません。

[pytest スイートモード](/tests/test_parallelization/configuration/#pytest-suite-mode)で、通常のファイル単位のプランニングでは `-k` や `-m` などのセレクターは適用されず、pytest が実行時に適用します。強制的な完全検出でもプランニング中にそれらを適用します。`ddtest` は、スイートモードのワーカーの pytest 終了コード 5 を成功として扱うため、完全に選択解除された実行でも成功する可能性があります。テストが実行されない場合は、セレクターとプランに含まれるファイルを確認します。テストモードでは pytest ワーカーの終了コード 5 による失敗をそのまま扱いますが、空のプランでは pytest を起動せずに成功する場合があります。

## プランニングは成功するが、実行時にトレーサーを読み込めない {#planning-works-but-execution-cannot-load-the-tracer}

Datadog SDK はプランニングには必要ありませんが、実行には必要です。すべてのテストジョブで [Test Optimization の設定](/tests/setup/)を保持します。

Python の場合は、構成されたランチャーによって使用される環境を確認してください。JavaScript の場合は、まず `NODE_OPTIONS` 内の既存の Datadog CI の require、次に `DD_TRACE_PACKAGE`、最後にプロジェクトローカルの `dd-trace` パッケージを確認してください。無効な明示的プリロードは、別のインストールにフォールバックするのではなく、エラーを引き起こします。

プロジェクトローダーとアクションで提供されるトレーサーパスを保持します。解決エラーを回避するために、`NODE_OPTIONS` を上書きしたり 2つ目のトレーサーを追加したりしないでください。[JavaScript のインスツルメンテーション](/tests/test_parallelization/configuration/#javascript-test-discovery-and-instrumentation)を参照してください。

## Minitest が選択されたファイルを実行しない {#minitest-does-not-run-the-selected-files}

検出された Rails アプリケーションでは、`ddtest` はファイルを位置引数として渡します。Rails 用のデフォルト設定、または互換性のある `bin/rails test` か `bundle exec rails test` のオーバーライドを使用します。`rake test` のオーバーライドは、ファイル転送モードを変更しません。コマンドを切り替える前に、カスタム Rake 設定を保持します。

Rails 以外のプロジェクトでは、`ddtest` は `TEST_FILES` を通じて割り当てられたファイルを渡します。通常の設定を行った後、既存の `Rake::TestTask` を更新します。

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing file list and other settings above this line.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

## カスタムコマンドが予期されるファイルを実行しない {#custom-commands-do-not-run-the-expected-files}

元のコマンド、設定、環境を、プランニングと実行の両方のステップと比較します。フィルター、シード、レポーター、共有設定、およびスイートの境界を保持します。

`--command`サポートされているランチャーを通じて選択されたフレームワークを呼び出す必要があります。シェルチェーンや複数のフレームワークを実行するスクリプトはサポートされていません。Vitest はコマンドのオーバーライドを完全に拒否します。

フレームワーク固有のチェック:

| フレームワーク | 確認事項 |
| --- | --- |
| pytest | `--tests-location` はファイルと一致する必要があります。`PYTEST_ADDOPTS` とランチャーが使用する環境を保持します。複数のルートには、`'{tests/unit,tests/integration}/**/test_*.py'` のような 1 つのブレースグロブを使用します。|
| Jest | 既存の `--runInBand` を含め、構成と選択フラグを保持します。|
| Mocha | すべてのスイートパスと共有された `--file` または `--require` のセットアップを保持します。`ddtest` は、実行中に構成された `spec` の入力を置き換えます。|
| Cucumber.js | パスおよび再実行ファイルは検出時にフィーチャーを選択しますが、実行時には割り当てられたフィーチャーファイルを実行します。シナリオのスコープを維持するには、タグまたは名前のフィルターを使用します。|
| Cypress | `ddtest` は `--spec` を管理します。サブセットを `--tests-location` または Cypress の構成に配置します。|
| Playwright | パッケージディレクトリ、構成、選択されたプロジェクトを保持します。`ddtest` による分割を使用する場合は、ネイティブの `--shard` を削除します。|
| Vitest | `--command` と `DD_TEST_OPTIMIZATION_RUNNER_COMMAND` を削除します。両方のフェーズで同じ `--vitest-config` を使用し、コマンドオプションをその構成に移動します。|
| WebdriverIO | 構成と機能の選択を保持します。グループ化されたテスト仕様は独立したファイルとして分散できず、リモートクラウドグリッドはサポートされていません。[WebdriverIO のセットアップ](/tests/test_parallelization/setup/?prog_lang=javascript&platform=webdriverio#webdriverio)を参照してください。|

フレームワーク実行可能ファイルの前のパッケージマネージャーセパレーターは保持されます。フレームワーク独自の `--` はそのオプションを終了します。`ddtest` はその前に検出フラグを挿入し、実行時にはその後にあるファイルの選択を置き換えます。[カスタムテストコマンド](/tests/test_parallelization/configuration/#custom-test-commands)を参照してください。

## テストは成功するが、カバレッジやレポートがない {#tests-pass-but-coverage-or-reports-are-missing}

終了ステータスだけでなく、期待されるスイートとプロジェクトの選択を確認します。元のレポーター、出力パス、カバレッジプロバイダー、しきい値、およびアップロード手順を保持します。同時実行ワーカーに、個別の出力パスまたはアーティファクト名を指定します。

Vitest の Node.js API は、パッケージスクリプトの準備や npm のライフサイクルコマンドを実行しません。それらの手順を `ddtest` の前に移動し、選択された設定でレポートおよびカバレッジオプションを保持します。[Vitest を構成する](/tests/test_parallelization/best_practices/#vitest)を参照してください。

## テストが並列実行時のみ失敗する {#tests-fail-only-in-parallel}

共有データベース、ポート、一時ファイル、ブラウザのディスプレイ、レポートの出力先を確認します。各実行ジョブでアプリケーションの起動と準備状況のチェックを保持します。調査中は[ワーカーの分離](/tests/test_parallelization/best_practices/#isolate-workers) を使用し、並列数を減らします。

`ddtest` の割り当てを他のスイート全体の分割ツールと組み合わせないでください。各ワーカーが割り当てを実行していること、および元のフルスイートコマンドがそれと並行して実行されなくなったことを確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}