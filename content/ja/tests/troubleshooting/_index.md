---
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: CI テストの監視方法
title: Test Optimization のトラブルシューティング
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

このページでは、Test Optimization に関する問題のトラブルシューティングに役立つ情報を提供します。さらにヘルプが必要な場合は、[Datadog サポート][2]にお問い合わせください。

## テストがインスツルメントされていますが、Datadog にデータが表示されていません

1. インスツルメンテーションを行う言語の [**Tests**][3] ページに行き、**Compatibility** セクションで使用しているテストフレームワークがサポートされていることを確認してください。
2. [**Test Runs**][4] セクションでテスト結果が表示されるかどうかを確認します。 こに結果が表示されているが、[**Tests**][5] セクションには表示されていない場合、Git 情報が欠落しています。トラブルシューティングについては、[データが Test Runs には表示されるが、Tests には表示されない](#data-appears-in-test-runs-but-not-tests)を参照してください。
3. Datadog Agent を介してデータをレポートしている場合は、テスト実行ホストから Agent のホストおよびポートへの[ネットワーク接続][15]があることを確認してください。テストを実行する際は、`DD_AGENT_HOST` に適切な Agent のホスト名、`DD_TRACE_AGENT_PORT` に適切なポートを設定してください。Agent への接続を確認するには、トレーサーで[デバッグモード][6]を有効にします。
4. Datadog に直接データを送信している場合 (「エージェントレスモード」) は、テスト実行ホストから Datadog のホストへの[ネットワーク接続][16]があることを確認してください。Datadog への接続を検証するには、トレーサーで[デバッグモード][6]を有効にします。
5. それでも結果が表示されない場合は、[サポートまでお問い合わせ][2]ください。トラブルシューティングのお手伝いをします。

## `datadog-ci` を使って JUnit テストレポートをアップロードしているが、一部またはすべてのテストが欠落している
`datadog-ci` CLI を使用して JUnit テストレポートファイルをアップロードしているときにテストが表示されない場合は、レポートが正しくないと判断されてテストが破棄されている可能性があります。

JUnit のテストレポートが正しくないのは、次のような点が原因です。
* レポートがアップロードされた時点より **71 時間**古い報告されたテストのタイムスタンプ。
* 名前のないテストスイート。

## データがテストの実行には表示されるが、テストには表示されない

**Test Runs** タブにテスト結果データが表示されているが、**Tests** タブには表示されない場合は、Git メタデータ (リポジトリ、コミット、またはブランチ) が欠落している可能性があります。これを確認するには、[**Test Runs**][4] セクションでテスト実行を開き、`git.repository_url`、`git.commit.sha`、または `git.branch` がないことを確認します。これらのタグが入力されていない場合、[**Tests**][5] セクションには何も表示されません。

1. トレーサーはまず、CI プロバイダーが設定した環境変数があればそれを使って、Git の情報を収集します。サポートされている CI プロバイダーごとにトレーサーが読み込もうとする環境変数の一覧は、[コンテナ内でのテストの実行][7]を参照してください。これにより、少なくともリポジトリ、コミットハッシュ、およびブランチ情報が入力されます。
2. 次に、トレーサーはローカルの `.git` フォルダがあれば、そこで `git` コマンドを実行して Git のメタデータを取得します。これは、コミットメッセージや作者、コミッターなどの Git のメタデータフィールドをすべて取得します。`.git` フォルダが存在し、`git` バイナリがインストールされていて、`$PATH` に入っていることを確認してください。この情報は、前のステップで検出されなかった属性を入力するために使用されます。
3. また、環境変数を使用して手動で Git 情報を提供することもできます。この環境変数は、前の手順のいずれかで検出された情報を上書きします。

   Git 情報を提供するためにサポートされている環境変数は以下の通りです。

   `DD_GIT_REPOSITORY_URL` **(必須)**
   : コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
   **例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

   `DD_GIT_COMMIT_SHA` **(必須)**
   : フル (40 文字長の SHA1) コミットハッシュ。<br/>
   **例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

   `DD_GIT_BRANCH`
   : テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
   **例**: `develop`

   `DD_GIT_TAG`
   : テスト中の Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
   **例**: `1.0.1`

   `DD_GIT_COMMIT_MESSAGE`
   : コミットメッセージ。<br/>
   **例**: `Set release number`

   `DD_GIT_COMMIT_AUTHOR_NAME`
   : コミット作成者名。<br/>
   **例**: `John Smith`

   `DD_GIT_COMMIT_AUTHOR_EMAIL`
   : コミット作成者メールアドレス。<br/>
   **例**: `john@example.com`

   `DD_GIT_COMMIT_AUTHOR_DATE`
   : コミット作成日 (ISO 8601 形式)。<br/>
   **例**: `2021-03-12T16:00:28Z`

   `DD_GIT_COMMIT_COMMITTER_NAME`
   : コミットのコミッター名。<br/>
   **例**: `Jane Smith`

   `DD_GIT_COMMIT_COMMITTER_EMAIL`
   : コミットのコミッターメールアドレス。<br/>
   **例**: `jane@example.com`

   `DD_GIT_COMMIT_COMMITTER_DATE`
   : コミットのコミッター日 (ISO 8601 形式)。<br/>
   **例**: `2021-03-12T16:00:28Z`

4. CI プロバイダーの環境変数が見つからない場合、テスト結果は Git メタデータなしで送信されます。

### 合計テスト時間が空の場合
合計テスト時間が表示されない場合、テストスイートレベルの可視化が有効になっていない可能性があります。確認するには、[サポートされる機能][14]に記載されている言語がテストスイートレベルの可視化をサポートしているかを確認してください。テストスイートレベルの可視化がサポートされている場合は、トレーサーを最新バージョンに更新してください。 

もしトレーサーバージョンを更新しても合計時間が表示されない場合は、[Datadog サポート][2]にお問い合わせください。

### 合計テスト時間が予想と異なる場合

#### 合計時間の計算方法
合計時間は、最大テストセッションの継続時間を合計した値です。 

1. テストセッションの指紋 (フィンガープリント) ごとに最大のテストセッション継続時間を算出します。 
2. その最大テストセッション継続時間を合計します。

## テストステータスの数値が想定と異なる

テストステータスの数値は、収集された一意のテストに基づいて計算されます。テストの一意性は、そのスイートと名前だけでなく、テストパラメーターとテスト構成によっても定義されます。

### 予想より低い数値

予想より数値が低い場合は、ライブラリかテストデータ収集に使用しているツールのどちらかが、テストパラメーターや一部のテスト構成を収集できない可能性があります。

1. JUnit のテストレポートファイルをアップロードする場合
    1. 異なる環境構成で同じテストを実行する場合、[アップロード時にそれらの構成タグを設定していることを確認します][10]。
    2. パラメーター化されたテストを実行している場合、JUnit のレポートにはその情報がない可能性が非常に高いです。[テストデータを報告するためにネイティブのライブラリを使ってみてください][3]。
2. それでも期待する結果が得られない場合は、トラブルシューティングについて [Datadog サポートにお問い合わせください][2]。

### 合格/不合格/スキップの数値が予想と違う

同じコミットに対して、異なるステータスで同じテストを複数回収集した場合、集計結果は以下の表のアルゴリズムに従います。

| **テストステータス - 最初の試行** | **テストステータス - 再試行 1 回目** | **結果** |
|-----------------------------|----------------------------|------------|
| `Passed`                    | `Passed`                   | `Passed`   |
| `Passed`                    | `Failed`                   | `Passed`   |
| `Passed`                    | `Skipped`                  | `Passed`   |
| `Failed`                    | `Passed`                   | `Passed`   |
| `Failed`                    | `Failed`                   | `Failed`   |
| `Failed`                    | `Skipped`                  | `Failed`   |
| `Skipped`                   | `Passed`                   | `Passed`   |
| `Skipped`                   | `Failed`                   | `Failed`   |
| `Skipped`                   | `Skipped`                  | `Skipped`  |

## デフォルトブランチが正しくない

### 製品への影響

デフォルトブランチは、製品の一部の機能を動かすために使用されます。すなわち、

- Tests ページのデフォルトブランチのリスト: このリストには、デフォルトのブランチのみが表示されます。間違ったデフォルトブランチを設定すると、デフォルトブランチリストのデータが欠落したり、不正確にな ることがあります。

- 新しい不安定なテスト。現在、デフォルトブランチでは不安定に分類されていないテスト。デフォルトブランチが適切に設定されていない場合、新たに検出された不安定なテストの数が間違っている可能性があります。

- パイプラインリスト: パイプラインリストには、デフォルトのブランチのみが表示されます。間違ったデフォルトブランチを設定すると、パイプラインリストのデータが欠落したり、不正確にな ることがあります。

### デフォルトブランチの修正方法

管理者権限をお持ちの方は、[リポジトリ設定ページ][11]から更新することができます。

## 特定のテストケースに対して実行履歴が利用できない場合

同じ問題の他の症状として、以下が含まれます。
- テストが不安定な挙動を示していても、そのテストが不安定なテストとして分類されない。 
- [Test Impact Analysis][12] でテストをスキップできない。

これは、[テストケースの構成][13]が不安定である可能性が高いです。1 つ以上のテストパラメーターが決定論的ではない (例: 現在の日付やランダムな数値を含む) ことが原因となります。 

この問題を解消する最善の方法は、テストのパラメーターがテスト実行ごとに同じであることを確認することです。

## セッション履歴、パフォーマンス、コードカバレッジのタブに単一の実行結果しか表示されない場合

これはテストセッションの指紋が不安定であることが原因である可能性があります。テストセッションの対応関係を確立するために製品がチェックするパラメーターがいくつかあり、その中にテストの実行コマンドが含まれます。もしテストコマンドに一時フォルダのように毎回変化する文字列が含まれている場合、Datadog はそれらのセッションを互いに関連付けません。以下は、不安定なテストコマンドの例です。

- `yarn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `mvn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `bundle exec rspec --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `dotnet test --results-directory /var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

これを解決するには、`DD_TEST_SESSION_NAME` 環境変数を使用します。`DD_TEST_SESSION_NAME` を使用してテストのグループを識別できます。以下は、このタグに指定できる値の例です。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

## Test Impact Analysis で時間短縮が表示されない場合

これもテストセッションの指紋が不安定であることが原因です。詳しくは、[セッション履歴、パフォーマンス、コードカバレッジのタブに単一の実行結果しか表示されない場合](#session-history-performance-or-code-coverage-tab-only-show-a-single-execution)を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /ja/help/
[3]: /ja/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-repositories
[6]: /ja/tracing/troubleshooting/tracer_debug_logs
[7]: /ja/continuous_integration/tests/containers/
[8]: https://github.com/travisjeffery/timecop
[9]: https://github.com/spulec/freezegun
[10]: /ja/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[11]: https://app.datadoghq.com/ci/settings/repository
[12]: /ja/tests/test_impact_analysis/
[13]: /ja/tests/#parameterized-test-configurations
[14]: /ja/tests/#supported-features
[15]: /ja/agent/configuration/network/
[16]: /ja/tests/network/