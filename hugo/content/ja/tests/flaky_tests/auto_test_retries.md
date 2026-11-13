---
aliases:
- /ja/tests/auto_test_retries
- /ja/tests/flaky_test_management/auto_test_retries
description: 不安定なテストが原因でビルドが失敗しないように、失敗したテストケースを再試行します。
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
- link: /tests/flaky_test_management
  tag: ドキュメント
  text: 不安定なテストの管理について
title: テストの自動再試行
---
## 概要 {#overview}

Test Optimization の Auto Test Retries 機能を使用すると、失敗したテストを最大 N 回まで再試行できるため、不安定なテストが原因でビルドが失敗するのを防ぐことができます。
失敗したテストケースは、正常にパスするか、再試行回数がなくなるまで再試行されます (その場合、ビルドは失敗します)。

## セットアップ {#setup}

テスト実行のために [Test Optimization][1] が構成されていることを確認してください。

{{< tabs >}}

{{% tab "Java" %}}

### 互換性 {#compatibility}

`dd-trace-java >= 1.34.0`

テストフレームワークの互換性は、`Scala Weaver` を除き、[Test Optimization Compatibility][3] と同じです。

### 構成 {#configuration}
Test Optimization をセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

この機能のデフォルトの動作は、失敗したテストケースを最大 5 回まで再試行します。
この動作は、以下の環境変数で微調整できます。

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - この環境変数が `true` に設定されている場合、Test Optimization が [不安定][2]と判断したテストケースのみが再試行されます。
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`- テストケースごとの再試行回数の上限を、負でない任意の数に変更するために設定できます。

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[2]: /ja/tests/flaky_test_management/
[3]: /ja/tests/setup/java/#compatibility
{{% /tab %}}

{{% tab "JavaScript" %}}

### 互換性{#compatibility-1}

`dd-trace-js >= v5.19.0`

### 構成 {#configuration-1}

Test Optimization をセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

この機能のデフォルトの動作は、失敗したテストケースを最大 5 回まで再試行します。
この動作は、以下の環境変数で微調整できます。

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - リモート設定が有効な場合でも再試行を明示的に無効にするには、0 または false に設定します (デフォルト: true)。
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`- テストケースごとの再試行回数の上限を変更するための負でない数 (デフォルト: 5)。

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Ruby" %}}

### 互換性{#compatibility-2}

`datadog-ci-rb >= 1.4.0`

### 構成{#configuration-2}

Test Optimization をセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

この機能のデフォルトの動作は、失敗したテストケースを最大 5 回まで再試行します。
この動作は、以下の環境変数で微調整できます。

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - リモート設定が有効な場合でも再試行を明示的に無効にするには、0 または false に設定します (デフォルト: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - テストケースごとの再試行回数の上限を変更するための負でない数 (デフォルト: 5)。
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`- 再試行する失敗したテストの合計数の上限を設定するための負でない数 (デフォルト: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab ".NET" %}}

### 互換性{#compatibility-3}

`dd-trace-dotnet >= 3.4.0`

### 構成{#configuration-3}

Test Optimization をセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

デフォルトでは、この機能は失敗したテストケースを最大 5 回まで再試行します。
以下の環境変数を使用して、Auto Test Retries をカスタマイズします。

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - `0` または `false` に設定すると、リモート設定が有効な場合でも再試行を明示的に無効にします (デフォルト: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - テストケースごとの再試行回数の上限を変更するための負でない数 (デフォルト: 5)。
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`- 再試行する失敗したテストの合計数の上限を設定するための負でない数 (デフォルト: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Go" %}}

### 互換性{#compatibility-4}

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.1`

### 構成 {#configuration-4}

Test Optimization をセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

デフォルトでは、この機能は失敗した各テストケースを最大 5 回まで再試行します。
以下の環境変数を使用して、Auto Test Retries をカスタマイズします。

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - `0` または `false` に設定すると、リモート設定が有効な場合でも再試行を明示的に無効にします (デフォルト: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - テストケースごとの再試行回数の上限を変更するための負でない数 (デフォルト: 5)。
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`- 再試行する失敗したテストの合計数の上限を設定するための負でない数 (デフォルト: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Python" %}}

### 互換性{#compatibility-5}

`dd-trace-py >= 3.0.0` (`pytest >= 7.2.0`)

### 構成 {#configuration-5}

Test Optimization をセットアップした後、[{{< ui >}}CI/CD Settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

この機能のデフォルトの動作では、失敗したテストケースを最大 5 回まで再試行します。Pytest において、元のセットアップ、ティアダウン、またはフィクスチャで失敗したテストは再試行されません。

この動作は、以下の環境変数で微調整できます。

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - `0` または `false` に設定すると、リモート設定が有効な場合でも再試行を明示的に無効にします (デフォルト: `true`)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - テストケースごとの最大再試行回数を変更するための負ではない数値 (デフォルト: `5`)。
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`- 再試行する失敗テストの合計数の上限を設定するための負でない数値 (デフォルト: `1000`)

### 動的 Auto Test Retries {#dynamic-auto-test-retries}

`dd-trace-py >= 4.15.0`

デフォルトでは、Auto Test Retries はすべての失敗したテストに同じ再試行回数の上限を適用します。Dynamic Auto Test Retries (Dynamic ATR) は、最初の試行でテストの実行にかかった時間に基づいて再試行回数を決定します。実行時間が短いテストほど再試行回数が多くなり、実行時間が長いテストほど再試行回数が少なくなります。

テストの再試行回数の上限は、最初の試行の所要時間から一度だけ決定され、そのテストのすべての再試行に適用されます。テストは、再試行が成功すると、それ以降は再試行されません。

デフォルトの所要時間の区分は以下のとおりです。

| 最初の試行の所要時間 | デフォルトの再試行回数 |
| ---------------------- | --------------- |
| 5 秒以下 | 10 |
| 5 秒を超え、10 秒以下 | 5 |
| 10 秒を超え、30 秒以下 | 3 |
| 30 秒を超え、5 分以下 | 2 |
| 5 分を超える | 1 |

失敗したテストはすべて、所要時間に関係なく、少なくとも 1 回は再試行されます。

Dynamic Auto Test Retries を有効にするには、以下の環境変数を設定します。

* `DD_CIVISIBILITY_DYNAMIC_ATR_ENABLED` - `true` に設定すると、固定の `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` 上限ではなく、テストの最初の試行の所要時間に基づいて再試行回数が決定されます (デフォルト: `false`)。Dynamic ATR が有効な間は、固定の上限は無視されます。Auto Test Retries は [{{< ui >}}CI/CD Settings{{< /ui >}}][1] で有効にする必要があります。
* `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS`- `1` から `20` までの 5 つのカンマ区切りの整数で、前の表のデフォルトの再試行回数を上書きします。所要時間の区分が最も短いものから最も長いものの順に指定します(例: `10,4,1,1,1`)。この変数が設定されていないか空の場合は、前の表のデフォルトの再試行回数が使用されます。`DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS` に無効な値が含まれている場合、ライブラリはその値を無視し、警告をログに記録して、デフォルトの再試行回数を使用します。

**注**: Dynamic ATR が有効な場合でも、セッションレベルの制限 `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` が適用されます。

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Swift" %}}

### 互換性{#compatibility-6}

`dd-sdk-swift-testing >= 2.5.2`

### 構成{#configuration-6}

Test Optimization をセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1] で Auto Test Retries を構成してください。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 設定の Auto Test Retries トグル。" style="width:100%" >}}

この機能のデフォルトの動作は、失敗したテストケースを最大 5 回まで再試行します。
この動作は、以下の環境変数で微調整できます。

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - リモート設定が有効な場合でも再試行を明示的に無効にするには、0 または false に設定します (デフォルト: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - テストケースごとの再試行回数の上限を変更するための負でない数 (デフォルト: 5)。
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`- 再試行する失敗したテストの合計数の上限を設定するための負でない数 (デフォルト: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{< /tabs >}}

### Failed Test Replay {#failed-test-replay}

<div class="alert alert-info">Failed Test Replay は、Java、JavaScript、および .NET でのみサポートされています。</div>

失敗したテストを自動的に再試行できるだけでなく、Failed Test Replay を使用すると、テストエラーのスタックトレースの最上位フレームにあるローカル変数データを確認できます。

Failed Test Replay では Auto Test Retries を有効にする必要があります。再試行されたテスト実行から変数データをキャプチャするためです。

{{< ui >}}Mitigation{{< /ui >}} > {{< ui >}}Failed Test Replay{{< /ui >}} の下にある [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4] で Failed Test Replay を有効にします。この設定は、組織、リポジトリ、またはテストサービスレベルで適用できます。

#### ログインデックスを作成する {#create-a-logs-index}

Failed Test Replay は Datadog に送信され、通常のアプリケーションログと並んで表示されるログを作成します。

[除外フィルター][5]を使用する場合は、Failed Test Replay のログがフィルタリングされないようにしてください。

1. ログインデックスを作成し、**サンプリングなし**で希望する保存期間に[構成][6]してください。
2. `source:dd_debugger` タグに一致するようにフィルターを設定します。すべての Failed Test Replay ログにはこのソースが設定されています。
3. 最初に一致したものが優先されるため、新しいインデックスが、そのタグに一致するフィルターを持つ他のインデックスよりも優先されることを確認してください。

この機能を有効にすると、失敗したテストのローカル変数データを表示できます。

{{< img src="continuous_integration/failed_test_replay_local_variables.png" alt="Failed Test Replay。" style="width:100%" >}}

#### 既知の制限 {#known-limitations}

[jest-image-snapshot][7] は、`toMatchImageSnapshot` に `customSnapshotIdentifier` が渡されない限り、`jest.retryTimes` と互換性がありません ([jest-image-snapshot ドキュメント][8]を参照)。したがって、`customSnapshotIdentifier` を使用しない限り、自動テスト再試行は機能しません。

## Test Optimization エクスプローラーで結果を確認する {#explore-results-in-the-test-optimization-explorer}

再試行されたテストは [Test Optimization エクスプローラー][2]でクエリできます。これらのテストには `@test.is_retry` タグが `true` に設定されています (一部のテストでは `@test.is_new` が `true` に設定されている場合もあります。これは、[Early Flakiness Detection][3] 機能によって再試行されたことを示します)。

## トラブルシューティング{#troubleshooting}

Auto Test Retries に問題があると思われる場合は、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4] を開き、リポジトリまたはサービスを見つけて、Auto Test Retries をオフにします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/setup/
[2]: /ja/tests/explorer/
[3]: /ja/tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[5]: /ja/logs/log_configuration/indexes/#exclusion-filters
[6]: /ja/logs/log_configuration/indexes/#add-indexes
[7]: https://www.npmjs.com/package/jest-image-snapshot
[8]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes