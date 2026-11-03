---
description: ddtest を使用してテスト並列化をセットアップし、CI プロバイダーを設定して、CI ノード間でテスト実行を分散させます。
further_reading:
- link: /tests/test_parallelization/configuration/
  tag: ドキュメント
  text: テスト並列化を構成する
- link: /tests/test_parallelization/troubleshooting/
  tag: ドキュメント
  text: テスト並列化のトラブルシューティング
- link: /tests/test_parallelization/best_practices/
  tag: ドキュメント
  text: テスト並列化のベストプラクティス
- link: /tests/setup/
  tag: ドキュメント
  text: Test Optimization のセットアップ
title: テスト並列化のセットアップ
---
## 前提条件 {#prerequisites}

テスト並列化をセットアップする前に:

- [Test Optimization][1] をセットアップします。
- Ruby の場合: `datadog-ci` gem バージョン `1.31.0` 以降を使用します。
- Python の場合: `ddtrace` パッケージバージョン `4.11.0` 以降および `pytest` を使用します。
- JavaScript の場合: `dd-trace` パッケージバージョン `5.111.0` 以降 (`v5` 用)、または`v6.0.0` 以降 (`v6` 用)、Node.js、および「[サポートされているフレームワークのバージョン][8]」を使用します。Cucumber.js、Cypress、Mocha、Playwright、および Vitest には、`ddtest` 1.6.0 以降が必要です。
- テストの並列実行において、コード変更の影響を受けたテストのみを分割対象としたい場合は、テストサービスに対して [Test Impact Analysis][2] を有効にします。

## コンセプト {#concepts}

Runner
: テストを実行するプログラム。`ddtest` は、テストを直接実行することも、別のランナー用のファイルリストを作成することもできます。

CI ノード
: GitHub Actions ジョブ、CircleCI 並列コンテナ、Kubernetes Pod、VM、ローカルマシンなど、単一の CI 実行環境。

Worker
: テストを実行するために `ddtest` が開始するプロセス。1 つの CI ノードで、1 つまたは複数のワーカーを実行できます。

Plan
: 生成された `.testoptimization/` ディレクトリ。これには、実行可能なテストファイル、選択された並列数、および `ddtest run` や別のランナーが使用するノードごとのファイルリストが含まれます。

選択された並列数
: テスト実行時間を推定した後に、`ddtest` が決定する CI ノード数またはローカルワーカー数。

## ddtest をインストールする{#install-ddtest}

CI ジョブに `ddtest` CLI をインストールします。Datadog は、[GitHub Releases][3]でコンパイル済みのバイナリを公開しています。

{{< tabs >}}
{{% tab "GitHub CLI" %}}

{{< code-block lang="yaml" >}}
- name: Download ddtest binary
  run: |
    mkdir -p bin
    gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
    mv bin/ddtest-linux-amd64 bin/ddtest
    chmod +x bin/ddtest
  env:
    GH_TOKEN: ${{ github.token }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "curl" %}}

{{< code-block lang="bash" >}}
mkdir -p bin
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
chmod +x bin/ddtest
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

これらの例では、最新の Linux AMD64 バイナリをダウンロードします。ほかのオペレーティングシステムやアーキテクチャについては、[GitHub Releases][3]から対応するアセットを選択してください。

## CI への ddtest の導入{#adopt-ddtest-in-ci}

4 つのステップでテスト並列化を導入します。まず、テストの実行方法を変更せずにプランニングを追加します。プランを検証した後、既存のテストコマンドを `ddtest` に置き換え、実行モードを選択し、その結果得られる CI の所要時間短縮効果を測定します。

これらの変更はフィーチャーブランチで行ってください。CI 設定を変更するたびにコミットとプッシュを行い、その結果としての CI 実行状況を確認してから次のステップに進んでください。

### 1. テストプランニングを追加する{#1-add-test-planning}

依存関係と Test Optimization を設定した後、既存のテストステップの前に `ddtest plan` を追加します。このステップの間は、既存のテストコマンドをそのまま維持してください。

CI 環境に合わせて、最小および最大の並列数を選択します。例えば、以下の値を使用すると、`ddtest` は 1 から 8 の CI ノードまたはローカルワーカーの間で選択できるようになります。

{{< code-block lang="bash" >}}
bin/ddtest plan \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --min-parallelism 1 \
  --max-parallelism 8
{{< /code-block >}}

`--platform` は言語プラットフォームを、`--framework` はテストフレームワークを指定します。サポートされているすべての値とデフォルト値については、「[構成][4]」を参照してください。

プランニングでは、テストの検出、テスト実行時間と Test Impact Analysis データの取得、および並列レベルの選択が行われます。テストは実行されません。生成された `.testoptimization/` ディレクトリには、実行用に選択されたテストファイルと分割が含まれています。

### 2. プランを確認する{#2-inspect-the-plan}

以下のコマンドは、CI ログで提案されたランナー数とテストファイルを確認するための 1 つの方法です。

{{< code-block lang="bash" >}}
# Show the number of runners selected by ddtest.
cat .testoptimization/runner/parallel-runners.txt

# Count the test files selected for execution.
wc -l .testoptimization/runner/test-files.txt

# Preview the first 20 test files to verify test discovery.
sed -n '1,20p' .testoptimization/runner/test-files.txt

# Optional: List the per-runner split files to see how ddtest distributed the tests.
find .testoptimization/runner/tests-split -maxdepth 1 -type f -print
{{< /code-block >}}

あるいは、`.testoptimization/` ディレクトリを CI アーティファクトとしてダウンロードし、エディタでファイルを開いてください。

`test-files.txt` に実行するファイルリストが含まれていることを確認します。Test Impact Analysis が有効な場合、テストがすべてスキップされたファイルはプランから除外されます。

### 3. 既存のテストコマンドを置き換える{#3-replace-the-existing-test-command}

プランに期待通りのテストが含まれていることを確認したら、既存のテストコマンドを以下のように置き換えます。

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK>
{{< /code-block >}}

`ddtest run` は、ワークフローの初期段階で生成されたプランを再利用します。CI アーキテクチャに基づいて、選択した分割の実行方法を選択します。

#### 単一の CI ノードでワーカーを実行する{#run-workers-on-one-ci-node}

単一の CI ノードでは、`ddtest plan` はオプションです。`ddtest run` を直接実行するか、プランを先に確認したい場合は、同じジョブ内で `ddtest plan` と `ddtest run` を続けて実行します。選択された並列数は、`ddtest` が開始するローカルワーカープロセスの数です。このコマンドに追加のオプションは必要ありません。

#### CI ノード間でテストを分散する{#distribute-tests-across-ci-nodes}

プランニングジョブで `ddtest plan` を 1 回実行します。生成された `.testoptimization/` ディレクトリ全体をテストジョブと共有し、選択した並列数を使用して CI マトリックスのサイズを定義します。各ノードで以下を実行します。

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --ci-node <CI_NODE_INDEX>
{{< /code-block >}}

CI ノードモードでは、`ddtest` はデフォルトで 1 つのローカルワーカーを使用します。各 CI ノードで複数のワーカーを開始するには、`--ci-node-workers` を正の整数または `ncpu` を設定します。

このページの CI の例では、生成されたプランと選択されたランナー数をジョブ間で渡す方法を示しています。

### 4. CI の節約量を測定する {#4-measure-ci-savings}

テストコマンドを置き換えた後、[Test Optimization Explorer][6] で期待されるテストが完了したことを確認します。[CI Visibility Explorer][7] を使用して、パイプライン実行毎のテストジョブの所要時間やテストジョブの数を比較します。CI Visibility が有効になっていない場合は、ご利用の CI プロバイダーが提供する同等のジョブメトリクスを使用してください。

すべてのワーカーが単一の CI ノード上で実行される場合、並列実行を行うことで、CI ノード数を変更することなくテストステージの時間を短縮できます。各ワーカーが個別の CI ノードで実行される場合は、`parallel-runners.txt` のランナー数を使用して CI マトリックスのサイズを決定します。Test Impact Analysis によって影響を受けないテストが除外された後に `ddtest` がランナー数を選択するため、小規模な変更では開始される CI ノードが少なくなる可能性があります。

CI 容量を制限するには `--max-parallelism` を使用します。プランナーは `--ci-job-overhead` を通じて、ランナーを追加するたびに発生するセットアップコストを考慮に入れます。これらの設定の詳細については、「[Configuration][4]」を参照してください。

`.testoptimization/` を `.gitignore` に追加します。CI ワークフローの実行ごとに新しいプランを生成し、同一のソースリビジョンおよび実行環境のジョブ間でのみそのプランを共有するようにします。プランニングとテストは同じ作業ディレクトリから実行してください。生成されるファイルの詳細については、「[Plan アーティファクト][5]」を参照してください。

## CI の例 {#ci-examples}

以下の例を GitHub Actions および CircleCI の開始点として使用してください。

{{< collapse-content title="Ruby" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

プランジョブは CI ノード数を選択し、マトリックスを出力します。テストジョブは `.testoptimization/` アーティファクトをダウンロードし、そのマトリックスノードに割り当てられたファイルのみを実行します。

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: ruby
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: rspec
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

セットアップワークフローは `ddtest plan` を実行し、`.testoptimization/` を保存し、選択された CI ノード数でテストワークフローへと進みます。

`.circleci/config.yml` では、次のようにします。

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform ruby --framework rspec
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

`.circleci/test.yml` では、次のようにします。

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="ruby-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform ruby --framework rspec --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="Python" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

プランジョブは CI ノード数を選択し、マトリックスを出力します。テストジョブは `.testoptimization/` アーティファクトをダウンロードし、そのマトリックスノードに割り当てられたファイルのみを実行します。

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: python
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: pytest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

セットアップワークフローは `ddtest plan` を実行し、`.testoptimization/` を保存し、選択された CI ノード数でテストワークフローへと進みます。

`.circleci/config.yml` では、次のようにします。

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform python --framework pytest
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

`.circleci/test.yml` では、次のようにします。

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="python-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform python --framework pytest --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="JavaScript" level="h3" >}}

Ruby および Python の例と同じプランジョブおよびテストジョブの構造を使用します。`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK` を `cucumber`、`cypress`、`jest`、`mocha`、`playwright`、または `vitest` に設定します。以下の例では Jest を使用しています。`jest` をお使いのテストスイートのフレームワークに置き換えてください。

{{< tabs >}}
{{% tab "GitHub Actions" %}}

これらの環境変数をワークフローまたはジョブレベルで設定します。

{{< code-block lang="yaml" >}}
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
{{< /code-block >}}

各言語のセットアップステップを Node.js の依存関係インストールに置き換えます。

{{< code-block lang="yaml" >}}
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
- name: Install JavaScript dependencies
  run: npm ci
{{< /code-block >}}

JavaScript 用の Datadog Test Optimization を設定します。

{{< code-block lang="yaml" >}}
- name: Configure Datadog Test Optimization
  uses: datadog/test-visibility-github-action@v2
  with:
    languages: js
    api_key: ${{ secrets.DD_API_KEY }}
    site: datadoghq.com
{{< /code-block >}}

プラットフォームとフレームワークが環境変数を通じて提供される場合でも、`ddtest plan` および `ddtest run --ci-node ${{ matrix.ci_node_index }}` コマンドに変更はありません。

{{% /tab %}}
{{% tab "CircleCI" %}}

Node.js イメージを使用し、`plan` ジョブでランナー環境を設定します。

{{< code-block lang="yaml" >}}
jobs:
  plan:
    docker:
      - image: cimg/node:22.14
    environment:
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
    steps:
      - checkout
      - run:
          name: Install JavaScript dependencies
          command: npm ci
      - test-optimization-circleci-orb/autoinstrument:
          languages: js
          site: datadoghq.com
{{< /code-block >}}

CircleCI ワークフローの `ddtest` のダウンロード、プラン、キャッシュ、および継続ステップを保持します。テストジョブで、依存関係をインストールし、JavaScript に自動インスツルメンテーションを実施し、CircleCI ノードインデックスを `ddtest` に渡します。

{{< code-block lang="yaml" >}}
- run:
    name: Install JavaScript dependencies
    command: npm ci
- test-optimization-circleci-orb/autoinstrument:
    languages: js
    site: datadoghq.com
- run:
    name: Run tests
    command: |
      NODE_INDEX=${CIRCLE_NODE_INDEX:-0}
      bin/ddtest run --platform javascript --framework jest --ci-node "${NODE_INDEX}"
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

`ddtest` は JavaScript ワーカープロセスに対して `NODE_OPTIONS=-r dd-trace/ci/init` を先頭に追加するため、`ddtest plan` の実行前にインストールされるプロジェクトの依存関係には `dd-trace` を含める必要があります。これは、フレームワーク固有の [Test Optimization セットアップ][8]に代わるものではありません。例えば、Cypress では設定ファイルに手動でインスツルメンテーションを行う必要があります。

{{< /collapse-content >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/setup/
[2]: /ja/tests/test_impact_analysis/
[3]: https://github.com/DataDog/ddtest/releases/latest
[4]: /ja/tests/test_parallelization/configuration/
[5]: /ja/tests/test_parallelization/configuration/#plan-artifacts
[6]: /ja/tests/explorer/
[7]: /ja/continuous_integration/explorer/
[8]: /ja/tests/setup/javascript/