---
aliases:
- /ja/continuous_integration/intelligent_test_runner/
- /ja/intelligent_test_runner
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: ラーニングセンター
  text: Test Optimization の概要
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: ブログ
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック(アプリログインが必要です)
title: Test Impact Analysis
---
<div class="alert alert-danger"> この機能は以前「Intelligent Test Runner」と呼ばれており、一部のタグには依然として「itr」が含まれています。</div>

## 概要 {#overview}

Test Impact Analysis は、変更されたコードに基づいて、特定のコミットに関連するテストのみを自動的に選択して実行します。テストカバレッジを維持しながら、テストに費やす時間と CI 全体のコストを大幅に削減します。

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Test Impact Analysis。">}}

Test Impact Analysis は、テストスイートを分析して各テストがカバーしているコードを特定します。その後、そのカバレッジを新しいコード変更によって影響を受けるファイルと照合します。Datadog はこの情報を使用して、関連する影響を受けたテストを選択して実行し、コード変更の影響を受けないテストを省略することで全体的なテスト期間を短縮します。[仕組み][1]の詳細をご覧ください。

Test Impact Analysis は、コミットごとに実行されるテストの数を最小限に抑えることで、パイプラインを混乱させる[不安定なテスト][2]の発生頻度を低減します。テストの不安定さが、テスト対象のコード変更とは無関係である場合、特にイライラさせられることがあります。テストサービスで Test Impact Analysis を有効にすると、各コミットを関連するテストに制限することができ、コード変更に無関係な不安定なテストがビルドを恣意的に破壊してしまうことがなくなります。

### すぐに使える構成の制限 {#out-of-the-box-configuration-limitations}

デフォルトの構成では、Test Impact Analysis が本来実行されるべきテストをスキップしてしまう可能性があります。特に、以下の変更を自動的に検出することはできません。

- ライブラリの依存関係
- コンパイラオプション
- 外部サービス
- データ駆動型テストにおけるデータファイルの変更

このような場合、Test Impact Analysis はすぐに使える構成では影響を受けるテストをスキップする可能性があります。

テストがスキップされないようにするために使用できる構成メカニズムはいくつかあります。

- リポジトリ内の特定のファイルを[追跡ファイル](#tracked-files)としてマークすると、これらのファイルが変更されるたびにすべてのテストが実行されます。Dockerfile、Makefile、依存関係ファイル、およびその他のビルド構成ファイルは、追跡ファイルに適しています。
- ソース内の特定のテストをスキップ不可としてマークすることで、常に実行されるように設定できます。これは、データ駆動型のテストや外部システムとやり取りするテストに適しています。詳細については、[セットアップページ][3]を参照してください。
- リスクの高いコミットを行う際にすべてのテストを実行したい場合は、Git のコミットメッセージのどこかに `ITR:NoSkip` (大文字小文字は区別しません) を追加します。
- GitHub をソースコード管理プロバイダーとして使用している場合、プルリクエスト内で Test Impact Analysis がテストをスキップするのを防ぐため、(大文字と小文字を区別せずに) `ITR:NoSkip` ラベルを使用してください。この機能を利用するには、[GitHub インテグレーションタイル][9]を使用して GitHub App を構成し、`Software Delivery: Collect Pull Request Information` 機能を有効にします。このメカニズムは、`pull_request` イベントによってトリガーされる GitHub Actions 上で実行されるテストには適用されません。
- [除外ブランチ](#excluded-branches)のリストを追加して、特定のブランチで Test Impact Analysis を無効にすることができます。

## スケールと精度の制限 {#scale-and-accuracy-limits}

Test Impact Analysis は、各テストがカバーするファイルとコミットによって変更されたファイルを照合することで、スキップするテストを決定します。以下の動作は、その照合が意図的かつ保守的に行われる既知のケースであり、どのような結果になるかを把握できます。

<div class="alert alert-info">このセクションのすべての動作は設計上安全です。つまり、<strong>より多くの</strong>テストが実行される可能性はありますが、実行されるべきテストがスキップされることはありません。Datadog が自動的に検出できないコード変更については、<a href="#out-of-the-box-configuration-limitations">すぐに使える構成の制限</a>を参照してください。</div>

### スケール制限 {#scale-limits}

Test Impact Analysis には、以下のサイズ制限が適用されます。

- Datadog は、変更に対して最新のコミットを最大 100 件分析します。大規模な変更セットでは、一部の古いコミットが分析されない場合があり、スキップされるテストがわずかに少なくなります。
- 1 つのコミットで 5,000 を超えるファイルが変更された場合、そのコミットは影響分析の対象外となり、テストはスキップされずに実行されます。
- 1 つのテストまたはテストスイートが 16,000 を超えるファイルをカバーしている場合、そのテストまたはテストスイートはスキップされません。

### カバレッジ照合における誤検知 {#false-positives-in-coverage-matching}

テストが変更されたファイルをカバーしているかどうかをチェックするために、Datadog はメモリ効率の高い確率的データ構造 (Bloom フィルター) を使用します。これらの構造には固有の小さな誤検知率 (約 0.04%) があるため、スキップできたはずのテストの一部が実行される可能性があります。

Test Impact Analysis の動作が予期しないものである場合は、[トラブルシューティング][12]ページを参照してください。

## Datadog ライブラリのセットアップ {#set-up-a-datadog-library}

Test Impact Analysis を設定する前に、特定の言語に対して [Test Optimization][4] を構成する必要があります。Agent を通してデータを報告する場合は、v6.40 または 7.40 以降を使用してください。

{{< whatsnext desc="Datadog で Test Impact Analysis をセットアップする言語を選択します。" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## 構成 {#configuration}

Datadog ライブラリを Test Impact Analysis 用にセットアップした後、[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][5] から構成します。Test Impact Analysis を有効にするには、`Test Optimization Settings Write` 権限が必要です。

Test Impact Analysis は 3 つのレベルで構成でき、下位レベルは上位レベルの値をオーバーライドできます。

- **組織のデフォルト**: オーバーライドされない限り、すべてのリポジトリに適用されます。{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}} を開き、{{< ui >}}Organization{{< /ui >}} タブを選択します。
- **リポジトリ**: 特定のリポジトリに対して組織のデフォルトをオーバーライドします。{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}} を開き、{{< ui >}}Repository-specific{{< /ui >}} タブを選択し、リポジトリを選択します。
- **テストサービス**: 特定のテストサービスに対してリポジトリ設定をオーバーライドします。リポジトリを開き、対象テストサービスのオーバーライドを編集します。

リポジトリレベルおよびテストサービスレベルでは、各設定は上位レベルの値を {{< ui >}}Inherit{{< /ui >}} するか、現在のレベルで {{< ui >}}Custom{{< /ui >}} の値に設定することができます。

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration-1.png" alt="CI/CD 設定ページでリポジトリの Test Impact Analysis を有効にします。" style="width:80%" >}}

### Git 実行ファイル {#git-executable}

Test Impact Analysis が動作するためには、テストを実行しているホストで [Git][6] が利用可能である必要があります。

### 除外ブランチ {#excluded-branches}

上記の[制限](#out-of-the-box-configuration-limitations)により、リポジトリのデフォルトブランチでは Test Impact Analysis を有効にする対象から自動的に除外されます。Datadog では、本番環境に到達する前にすべてのテストが確実に実行されるようにするため、この構成を推奨しています。

除外したい他のブランチがある場合は、CI/CD 設定ページで追加してください。クエリバーは、ワイルドカード文字 `*` を使用して一致するブランチを除外することをサポートしています (`release_*` など)。

除外されたブランチはテストごとのコードカバレッジを収集するため、合計テスト時間にパフォーマンスへの影響を与えます。ただし、このパフォーマンスへの影響は、コードカバレッジを伴う実行によって、収集コストを相殺するのに十分な新しいカバレッジ情報が生成されると Datadog が検出した場合にのみコードカバレッジを収集することで軽減されます。テストセッションでコードカバレッジが有効になっているかどうかは、`@test.code_coverage.enabled` フィールドをチェックすることで確認できます。

### 追跡ファイル {#tracked-files}

追跡ファイルとは、テストに影響を与える可能性のあるコード以外のファイルのことです。追跡ファイルの変更は、テストの失敗やコードカバレッジの変化を引き起こす可能性があります。追跡ファイルとして追加するのに適した例として、以下のファイルが含まれます。

- CI 環境で使用する Dockerfile
- 依存関係を定義するファイル (例: Maven の `pom.xml`、Python の `requirements.txt`、Javascript の `package.json`)
- Makefile

追跡ファイルのセットを指定すると、Test Impact Analysis はこれらのファイルが変更された場合にすべてのテストを実行します。

すべてのファイルパスは、リポジトリのルートからの相対パスとして扱われます。`*` および `**` のワイルドカード文字を使用して、複数のファイルやディレクトリを照合できます。たとえば、`**/*.mdx` はリポジトリ内のすべての `.mdx` ファイルと一致します。

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config-1.png" alt="除外するブランチと追跡ファイルを選択します。" style="width:80%" >}}

## Code Coverage のバックフィル {#code-coverage-backfilling}

[Code Coverage][10] と Test Impact Analysis を併用する場合、Test Impact Analysis はコード変更に対して実行する必要のないテストをスキップするため、報告される全体的なカバレッジが偏る可能性があります。

Code Coverage のバックフィルは、報告されるカバレッジ合計を調整してスキップされたテストやスイートを含めるため、Test Impact Analysis による節約がカバレッジ合計を歪めることはありません。

Code Coverage のバックフィルは、Java、.NET、Go、および JavaScript でサポートされています。Ruby、Python、Swift ではサポートされていません。

バックフィルはベストエフォートです。大規模なテストスイートの場合、Test Impact Analysis によってスキップされた一部のテストのカバレッジはバックフィルされないことがあります。その結果、報告されるカバレッジ合計が実際のカバレッジよりもわずかに低くなる可能性があります。バックフィルは、どのテストがスキップされるかには影響を与えません。

### Java、.NET、および Go {#java-net-and-go}

`dd-trace-java`、`dd-trace-dotnet`、および `dd-trace-go` の場合、バックフィルのための追加構成は不要です。これらのライブラリは、テストがコードカバレッジエンジンを使用して実行されると自動的に検出し、Test Impact Analysis によってスキップされたテストのコードカバレッジデータをバックフィルします。

### JavaScript {#javascript}

`dd-trace-js` の場合、バックフィルにはコードカバレッジレポートのアップロードが必要です。Datadog ライブラリが報告されるカバレッジ合計を調整し、スキップされたテストやスイートを含められるよう、[組織レベルの CI/CD Optimization 設定][11]でコードカバレッジのアップロードを有効にします。

## テストセッションを確認する {#explore-test-sessions}

テストコミットページやテストセッションパネルを見ることで、Test Impact Analysis で得られる時間短縮を確認することができます。

{{< img src="continuous_integration/itr_commit.png" alt="Test Impact Analysis を使用したテストコミットページ" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Test Impact Analysis。" style="width:80%;">}}

Test Impact Analysis がアクティブでテストをスキップしている場合、各テストセッションまたは各コミットで節約された時間の量が紫色のテキストで表示されます。期間バーも紫色に変わるため、[テスト実行][7]ページで Test Impact Analysis を使用しているテストセッションを識別できます。

## 導入とグローバルな節約を確認する {#explore-adoption-and-global-savings}

すぐに使える [Test Impact Analysis ダッシュボード][8]を使用して、組織の節約と Test Impact Analysis の導入を追跡します。ダッシュボードには、全体の節約を追跡するウィジェットのほか、リポジトリごと、コミッターごと、サービスごとのデータビューが含まれています。ダッシュボードを表示することで、組織のどの部分が Test Impact Analysis を使用し、最大限の効果を得ているかを把握することができます。

{{< img src="continuous_integration/itr_dashboard1.png" alt="Test Impact Analysis ダッシュボード" style="width:80%;">}}

また、ダッシュボードでは、組織全体における Test Impact Analysis の導入状況を追跡することができます。

{{< img src="continuous_integration/itr_dashboard2.png" alt="Test Impact Analysis ダッシュボード" style="width:80%;">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/test_impact_analysis/how_it_works/
[2]: /ja/glossary/#flaky-test
[3]: /ja/tests/test_impact_analysis/setup
[4]: /ja/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /ja/integrations/github/
[10]: /ja/code_coverage/
[11]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[12]: /ja/tests/test_impact_analysis/troubleshooting/