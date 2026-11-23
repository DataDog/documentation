---
aliases:
- /ja/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: CI Visibility 向け TeamCity セットアップ
---
## 概要 {#overview}

[TeamCity][1] は、ソフトウェア開発プロセスを最適化および自動化する継続的インテグレーションおよび配信サーバーです。

TeamCity 向けに CI Visibility をセットアップして、パイプライン実行に関するデータを収集し、パフォーマンスのボトルネックをデバッグし、運用上の問題に対処し、開発ワークフローを最適化します。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [部分的な再試行][14] | ビルドトリガーを再試行する | 部分的に再試行されたパイプライン実行を表示します。|
| [キュータイム][15] | キュータイム | パイプラインのジョブが処理される前にキューに残っている時間を表示します。|
| [パイプラインの障害理由][16] | パイプラインの障害理由 | エラーメッセージからパイプラインの障害理由を特定します。|
| [クリティカルパスで CI ジョブをフィルタリングする][17] | クリティカルパスで CI ジョブをフィルタリングする | クリティカルパスのジョブでフィルタリングします。|
| [実行時間][18] | 実行時間  | パイプラインによるジョブ実行時間を表示します。|

以下の TeamCity バージョンに対応しています。

- TeamCity 2021.2 以降

### 用語 {#terminology}

次の表に、Datadog CI Visibility と TeamCity の概念の対応を示します。

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| パイプライン                   | ビルドチェーン |
| ジョブ                        | ビルド       |
| _Datadog では利用不可_ | ステップ        |

## Datadog インテグレーションを構成する {#configure-the-datadog-integration}

[TeamCity][1] と Datadog CI Visibility のインテグレーションは、TeamCity プラグインを通じて提供されます。Datadog CI Integration プラグインの[ソースコード][8]は、Apache 2.0 ライセンスでオープンソース化されています。

インテグレーションを設定するには、以下の手順を実行します。

1. TeamCity サーバーで [Datadog CI インテグレーションプラグイン][5]をダウンロードするには、以下に移動します。
{{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}} -> {{< ui >}}Browse Plugin Repository{{< /ui >}}。
2. まだ作成していない場合は、ビルドチェーンの最終ビルドとして [TeamCity 複合条件ビルド][6]を追加します。このビルドはチェーンの現在の最終ビルドに依存している必要があり、他のビルドがこのビルドに依存していてはいけません。

   複合条件ビルドで終了しないビルドチェーンは、プラグインによって無視されます。たとえば、`Aggregating Results` が最終複合条件ビルドであると想定されるビルドチェーンを検討します。

   {{< img src="ci/teamcity_build_chain.png" alt="最終複合条件ビルドがある TeamCity ビルドチェーン" style="width:100%;">}}

   最終複合条件ビルドは、バージョン管理設定の観点から適切に構成されている必要があり、VCS ルートがアタッチされ、[VCS トリガー][13]が構成されている必要があります。

3. TeamCity プロジェクトには、以下の構成パラメーターが存在する必要があります。

   * **datadog.ci.api.key**: [Datadog API Key][2]。プラグインバージョン 0.0.5 以降で**パスワード**タイプをサポートしています。
   * **datadog.ci.site**:{{< region-param key="dd_site" code="true" >}}
   * **datadog.ci.enabled**: `true` (`false` 特定のプロジェクトでプラグインを無効にするために使用できます)。

   これらは、TeamCity サブプロジェクトまたは [TeamCity ルートプロジェクト][10]のいずれかに追加できます。ルートプロジェクトに追加すると、すべてのサブプロジェクトに伝播されます。たとえば、すべてのプロジェクトでプラグインを有効にするには、ルートプロジェクトに `true` の値を持つ `datadog.ci.enabled` を追加します。

   構成パラメーターの定義の詳細については、[TeamCity プロジェクト階層のドキュメント][9]を参照してください。

4. プラグインを有効にするには、{{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}} ページで {{< ui >}}Enable uploaded plugins{{< /ui >}} をクリックします。
または、TeamCity サーバーを再起動します。

## 高度な構成 {#advanced-configuration}

### Git ユーザー情報を構成する {#configure-git-user-information}

プラグインは、[TeamCity ユーザー名スタイル][7]に基づいて Git の作成者名とメールアドレスを取得します。Datadog では、{{< ui >}}Author Name and Email{{< /ui >}} または {{< ui >}}Author Email{{< /ui >}} のユーザー名スタイルを使用することを推奨しています。これらは
ユーザーのメールアドレスに関する情報を提供するためです。

他のユーザー名スタイル ({{< ui >}}UserId{{< /ui >}} または {{< ui >}}Author Name{{< /ui >}}) が使用されている場合、プラグインはユーザー名に `@Teamcity` を追加して、ユーザーのメールアドレスを自動的に生成します。たとえば、{{< ui >}}UserId{{< /ui >}} ユーザー名スタイルが使用され、Git の作成者ユーザー名が `john.doe` である場合、プラグインは Git の作成者メールアドレスとして `john.doe@Teamcity` を生成します。ユーザー名のスタイルは [VCS Roots][11] に対して定義されており、VCS Root 設定で変更できます。

<div class="alert alert-danger"> Git の作成者メールアドレスは、
<a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility">課金目的</a>で使用されるため、
メールアドレスを提供しないユーザー名スタイル
(<strong>UserId</strong> または<strong>作成者名</strong>) が使用されるとコストに影響する可能性があります。ユースケースについてご質問がある場合は、<a href="/help/">Datadog のサポートチームまでお問い合わせください</a>。
</div>

## Datadog でパイプラインデータを視覚化する {#visualize-pipeline-data-in-datadog}

パイプラインが終了した後に、[**CI パイプラインリスト**][3]および[**実行**][4]ページでデータを確認できます。

[{{< ui >}}CI Pipeline List{{< /ui >}}] (CI パイプラインリスト) ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳しくは、[CI パイプラインの検索と管理][12]を参照してください。

## トラブルシューティング {#troubleshooting}

Datadog CI Integration プラグインによって生成されたすべてのログは `teamcity-server.log` ファイル内に保存され、
{{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Diagnostic{{< /ui >}} -> {{< ui >}}Server Logs{{< /ui >}} に移動して TeamCity サーバーからアクセスできます。
プラグインに関する問題の追加コンテキストを取得するには、これらのログをチェックしてください。

### テスト実行が TeamCity ジョブにリンクされていない {#test-runs-are-not-linked-to-teamcity-jobs}

Datadog CI Integration プラグインは、TeamCity パイプラインまたはジョブの実行と Test Optimization のテスト実行を関連付けません。対応する CI Visibility ジョブが**テスト実行: 0** と表示されている間、テストが Test Optimization に表示される場合があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/configuring-vcs-roots.html
[12]: /ja/continuous_integration/search/#search-for-pipelines
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies
[14]: /ja/glossary/#partial-retry
[15]: /ja/glossary/#queue-time
[16]: /ja/glossary/#pipeline-failure
[17]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /ja/glossary/#pipeline-execution-time