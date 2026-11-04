---
aliases:
- /ja/code_analysis/troubleshooting/
disable_toc: false
title: トラブルシューティング
---
Datadog Code Security のセットアップや構成で問題が発生した場合は、このページからトラブルシューティングを開始してください。引き続き問題が解決しない場合は、[Datadog サポート][1]へお問い合わせください。

## Static Code Analysis (SAST) {#static-code-analysis-sast}

Datadog 静的アナライザに関する問題については、Datadog サポートへのバグレポートに以下の情報を含めてください。

- `code-security.datadog.yaml` (またはレガシー `static-analysis.datadog.yml`) ファイル
- ローカルまたは CI/CD パイプラインで実行した静的分析ツール (CLI など) の出力
- 生成された SARIF ファイル (利用可能な場合)
- リポジトリの URL (パブリックまたはプライベート)
- 分析を実行したブランチの名前
- Datadog Static Analyzer の実行に使用した正確なコマンドライン

### パフォーマンスの問題 {#performance-issues}

パフォーマンスに問題が発生している場合は、コマンドラインから静的分析ツールを実行するときに `--performance-statistics` フラグを有効にできます。

パフォーマンスに関する問題の場合、以下の情報を含めてください。

- `code-security.datadog.yaml` (またはレガシー `static-analysis.datadog.yml`) ファイル
- ローカルまたは CI/CD パイプラインで実行した静的分析ツール (CLI など) の出力
- リポジトリの URL (パブリックまたはプライベート)

**注:** [Static Analysis と GitHub Actions][2] を使用している場合は、[`enable_performance_statistics`][3] パラメーターを true に設定してください。

### ブロッキングする問題 {#blocking-issues}

パフォーマンスに関係しない問題、または Datadog Static Analyzer が終了しない場合は、`--debug true --performance-statistics` フラグを付けて Datadog Static Analyzer を実行してください。

### アナライザの実行時に 403 エラーが発生 {#getting-a-403-error-when-running-the-analyzer}

アナライザの実行時に、`DD_APP_KEY`、`DD_API_KEY`、`DD_SITE`、および `datadog-ci` の各変数が正しく指定されていることを確認してください。

### SARIF アップロードに関する問題{#issues-with-sarif-uploads}

<div class="alert alert-info">
  SARIF のインポートは、Snyk、CodeQL、Semgrep、Checkov、Gitleaks、および Sysdig でテストされています。他の SARIF 準拠ツールに問題が発生した場合は、<a href="/help">Datadog サポート</a>にお問い合わせください。
</div>

サードパーティの静的分析ツールから Datadog に結果をアップロードする際は、相互運用可能な [Static Analysis Results Interchange Format (SARIF) 形式][5]であることを確認してください。Node.js バージョン 14 以降が必要です。

SARIF レポートをアップロードするには、以下の手順に従ってください。

1. [`DD_API_KEY` および `DD_APP_KEY` 変数が定義されていること][4] を確認してください。
2. 必要に応じて [`DD_SITE` 変数][24]を設定してください (デフォルトは `datadoghq.com`)。
3. `datadog-ci` ユーティリティをインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. サードパーティの静的分析ツールをコード上で実行し、結果を SARIF 形式で出力します。
5. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

Datadog にレポートが表示されない場合は、datadog-ci を呼び出す前に以下の環境変数を定義してください。
- `DD_GIT_REPOSITORY_URL`: リポジトリの URL
- `DD_GIT_BRANCH`: コミット先のブランチ
- `DD_GIT_COMMIT_SHA`: commit sha

### SARIF ファイルが大きすぎる {#sarif-file-too-large}

大きすぎる SARIF ファイルはフィルタリングされます。SARIF ファイルが大きいためにコードがスキャンされない場合は、
以下のオプションを検討してください。

 - 特定のディレクトリのみをスキャンするように設定を更新してください。
 - コードベースに必要なルールセットのみを実行するようにアナライザを設定してください。

Datadog アプリケーションから、または `code-security.datadog.yaml` ファイルを変更して設定を更新してください。

### サードパーティの SARIF アップロードに対する PR コメントや PR ゲートはありません {#no-pr-comments-or-pr-gates-for-third-party-sarif-uploads}

[PR コメント][25]および [PR ゲート][26]は、Datadog の公式静的分析ツールによって生成された結果に対してのみサポートされます。

- [`datadog-static-analyzer`](https://github.com/DataDog/datadog-static-analyzer)
- [`datadog-saist`](https://github.com/DataDog/datadog-saist)

サードパーティツールの SARIF 結果をアップロードした場合、検出結果は Datadog UI に表示されますが、PR コメントや PR ゲートの評価はトリガーされません。

### `GLIBC_X.YY not found`エラーメッセージ {#glibc-xyy-not-found-error-message}

CI パイプラインで Static Analyzer を実行した際、以下のようなエラーメッセージが表示される場合:

```
version `GLIBC_X.YY' not found
```

これは以下のいずれかを意味します。

- glibc の古いバージョンを含む Linux ディストリビューションで CI パイプラインを実行している場合。この場合、Datadog では最新バージョンへのアップグレードを推奨しています。アナライザは常に、最新の Ubuntu/Debian ベースのシステムで実行されます。
- glibc に依存しない Linux ディストリビューション (Alpine Linux など) で CI パイプラインを実行している場合。代わりに、
  glibc の最新バージョンをサポートするディストリビューション (安定版 Ubuntu など) で CI パイプラインを実行してください。

### SAST エクスプローラーまたはリポジトリビューのサービスやチームが更新されない {#services-or-teams-in-the-sast-explorer-or-repositories-view-are-not-updating}

Static Code Analysis (SAST) におけるサービスとチームの結果は、リポジトリのデフォルトブランチにある `entity.datadog.yml` または `CODEOWNERS` ファイルに基づいています。
機能ブランチでこれらのファイルを変更した場合、その更新は当該ブランチの脆弱性に反映されません。

デフォルトブランチでいずれかのファイルを更新した後、変更がその後のスキャン結果に反映されるまで最大 6 時間かかる場合があります。

### Datadog UI に結果が表示されない {#results-are-not-being-surfaced-in-the-datadog-ui}

**GitHub 以外のリポジトリで Code Security を実行している場合**は、最初のスキャンがデフォルトブランチで実行されるようにしてください。デフォルトブランチが `master`、`main`、`default`、`stable`、`source`、`prod`、または `develop` のいずれでもない場合は、リポジトリの SARIF アップロードを試行してから、アプリ内の [{{< ui >}}Repository Settings{{< /ui >}}][4] でデフォルトブランチを手動で上書きする必要があります。その後、デフォルト以外のブランチからのアップロードが成功するようになります。

Datadog のアナライザを使用している場合、[diff-aware scanning][21] がデフォルトで有効になっています。CI パイプライン内でツールを実行している場合は、`datadog-ci` が分析対象リポジトリの **ルート** で実行されるようにしてください。

### Diff-aware が機能していない {#diff-aware-is-not-working}

Static Analyzer で Diff-aware が機能しない場合は、以下を確認してください。
 1. デフォルトブランチがリポジトリ固有のものであること。
 2. 同じ構成 (例: 同じルールセット、同じ引数、または only/ignore フラグ) を持つ少なくとも 1 つのリビジョンが、リポジトリのデフォルトブランチにプッシュされていること。
 3. 現在のユーザーがリポジトリのメタデータを読み取れること。正しい権限がない場合は、次のコマンドを実行してください: `git config --global --add safe.directory <repo-path>`。

`--debug` オプションを指定して datadog-static-analyzer を実行し、詳細情報を取得することもできます。

**注**: Diff-aware はフィーチャーブランチでのみ機能します。詳細については、[Diff-aware の実装詳細][13]を参照してください。

## Software Composition Analysis (SCA) {#software-composition-analysis-sca}

Datadog Software Composition Analysis (SCA) に関する問題については、Datadog サポートへのバグ報告に以下の情報を含めてください。

- ローカルまたは CI/CD パイプラインで実行した SCA ツール (CLI など) の出力
- 生成された SBOM ファイル (ある場合)
- リポジトリの URL (パブリックまたはプライベート)
- 分析を実行したブランチの名前
- リポジトリ内の依存関係ファイルの一覧 (`package-lock.json`、`requirements.txt`、`pom.xml` など)

### Java JAR ディレクトリのスキャン {#scan-java-jar-directories}

一部の Java プロジェクトでは、完全な Maven や Gradle マニフェストではなく、リポジトリにチェックインされたサードパーティの JAR ファイル (例: `lib/` ディレクトリ内) に依存しています。ビルドがそれらの JAR から直接依存関係を取得する場合や、依存関係マニフェストが不完全であるか、実際にビルドで使用されているものと同期していない場合は、JAR ファイルを直接スキャンして、それらを信頼できる情報源として扱うことができます。

Datadog SBOM ジェネレーターには、各 JAR に埋め込まれた Maven メタデータを抽出し、検出されたすべてのアーティファクトを Maven コンポーネントとして結果の SBOM に報告するオプトインパーサーが含まれています。ディスク上の JAR がビルドの依存関係の最も信頼できる記録である場合に、このアプローチを使用してください。標準的な Maven または Gradle マニフェストを使用するプロジェクトの場合は、代わりにサポートされているマニフェストをスキャンしてください。これらを使用すると、JAR パーサーでは不可能な推移的依存関係の取得やソースファイルのマッチングが可能になります。

#### 要件 {#requirements}

- `datadog-sbom-generator` バージョン `1.10.2` 以降。[GitHub のリリースページ][27]を参照してください。
- 各 JAR には、`META-INF/maven/<groupId>/<artifactId>/pom.properties` に Maven メタデータが含まれている必要があります。このメタデータがない JAR は警告とともにスキップされ、スキャンが続行されます。

インストールされているバージョンで JAR パーサーが利用可能であることを確認するには、以下を実行してください。

```shell
datadog-sbom-generator parsers list
```

出力で `jar` を探してください。

#### JAR パーサーを有効にする {#enable-the-jar-parser}

JAR パーサーはデフォルトのパーサーセットには含まれていません。`--enable-parsers jar` を使用して明示的に有効にしてください。

```shell
datadog-sbom-generator scan --enable-parsers jar /path/to/lib
```

`/path/to/lib` を JAR ファイルが含まれるディレクトリに置き換えてください。スキャナーはディレクトリを走査し、`.jar` 拡張子を持つすべてのファイルからメタデータを読み取ります。

<div class="alert alert-warning"><code>--enable-parsers</code> デフォルトのパーサーセットを置き換えます。JAR と標準マニフェストを同じ実行でスキャンするには、必要なすべてのパーサーを一覧表示してください。それ以外の場合は、個別にスキャンを実行してください。</div>

JAR ファイルと Maven マニフェストを一緒にスキャンするには、

```shell
datadog-sbom-generator scan --enable-parsers jar,maven /path/to/repository
```

#### SBOM を Datadog にアップロードする {#upload-the-sbom-to-datadog}

SBOM をファイルに保存し、`datadog-ci`を使用してアップロードします。

```shell
datadog-sbom-generator scan \
    --enable-parsers jar \
    --output sbom.json \
    /path/to/lib

datadog-ci sbom upload sbom.json
```

アップロードを実行する前に、CI 環境で `DD_API_KEY`、`DD_APP_KEY`、および `DD_SITE` を設定してください。

#### JAR パーサーがコンポーネントを識別する方法 {#how-the-jar-parser-identifies-components}

Maven が JAR をパッケージ化すると、`pom.properties` ファイルが次の場所に埋め込まれます。

```text
META-INF/maven/<groupId>/<artifactId>/pom.properties
```

パーサーはそのファイルから `groupId`、`artifactId`、および `version` を読み取り、検出されたエントリーごとに 1 つの Maven コンポーネントを出力します。1 つの JAR に複数の `pom.properties` エントリーが含まれる場合があり、パーサーはそれぞれに対して 1 つのコンポーネントを出力します。

この方法で検出されたコンポーネントには、2 つの SBOM プロパティが含まれます。

| プロパティ | 値 | 意味 |
|---|---|---|
| `datadog:opaque` | `true` | コンポーネントはソースマニフェストではなく、バイナリから検出されました。|
| `datadog:is-direct` | `true` | ディスク上に存在するすべての JAR は、直接の依存関係として扱われます。|

#### 制限事項 {#limitations}

JAR パーサーは意図的に限定的なものとなっています。これらの制約を念頭に置いて使用してください。

- `.jar` 拡張子を持つファイルのみがスキャンされます。`.war` や `.ear` を含む、その他の ZIP ベースのアーカイブはスキャンされません。
- `META-INF/maven/.../pom.properties` のない JAR はスキップされます。埋め込み Maven メタデータのないコンポーネントは報告されません。
- 推移的依存関係は解決されません。検出された各 JAR は、直接の依存関係として報告されます。
- JAR パーサーを通じて検出されたコンポーネントでは、ソースファイルのマッチングは利用できません。

推移的解決、ソースマッチング、またはより詳細な依存関係のコンテキストが必要な場合は、代わりに標準の Maven または Gradle マニフェストをスキャンしてください。JAR パーサーは、スキャンする信頼できるマニフェストがビルドにない場合に適したツールです。

### SBOM アップロードに関する問題 {#issues-with-sbom-uploads}
[Datadog SBOM generator][7] の使用が推奨されますが、Datadog はあらゆる SBOM ファイルの取り込みをサポートしています。ファイルが Cyclone-DX 1.4 または Cyclone-DX 1.5 形式のいずれかに準拠していることを確認してください。

SBOM ファイルの取り込みは以下のサードパーティツールで検証済みです。
- [trivy][8]

SBOM ファイルを Datadog に取り込むには、以下の手順に従ってください。

1. `datadog-ci` CLI をインストールします (Node.js がインストールされている必要があります)。
2. `DD_SITE`、`DD_API_KEY` および `DD_APP_KEY` の環境変数が設定されていることを確認してください。
3. ツールを呼び出して、ファイルを Datadog にアップロードします。
ツールのインストールと呼び出しは以下の 2 つのコマンドで行えます。

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload /path/to/sbom-file.json
```

### SCA ライブラリのサービスまたはチームが更新されていない {#services-or-teams-in-sca-libraries-are-not-updating}

SCA のサービスおよびチームの結果は、リポジトリのデフォルトブランチにある `entity.datadog.yml` または `CODEOWNERS` ファイルに基づいています。
フィーチャーブランチでこれらのファイルに変更を加えた場合、更新内容はそのブランチの脆弱性データやライブラリデータには反映されません。

デフォルトブランチでいずれかのファイルを更新した後、変更がその後のスキャン結果に反映されるまで最大 6 時間かかる場合があります。

### Datadog UI に結果が表示されない {#results-are-not-being-surfaced-in-the-datadog-ui-1}

**GitHub 以外のリポジトリで Code Security を実行している場合**は、最初のスキャンがデフォルトブランチで実行されるようにしてください。デフォルトブランチが `master`、`main`、`default`、`stable`、`source`、`prod`、または `develop` のいずれでもない場合は、リポジトリの SBOM アップロードを試行してから、アプリ内の [{{< ui >}}Repository Settings{{< /ui >}}][4] でデフォルトブランチを手動で上書きする必要があります。その後、デフォルト以外のブランチからのアップロードが成功するようになります。

### C# プロジェクトでパッケージが検出されない{#no-package-detected-for-c-projects}

Datadog SBOM ジェネレーター ([`datadog-sbom-generator`][7]) は、`packages.lock.json` ファイルから依存関係を抽出します。このファイルがない場合は、
プロジェクト定義を更新して生成できます。`packages.lock.json` ファイルを生成するには、[プロジェクト定義を更新する手順][9]に従ってください。

生成されたロックファイルは、[`datadog-sbom-generator`][7] によって依存関係を抽出し、SBOM を生成するために使用されます。

### Datadog ホスト型スキャンから結果が得られない{#no-results-from-datadog-hosted-scans}

Datadog ホスト型 SCA スキャンは、以下のリポジトリを **サポートしていません**。

- [Git Large File Storage][18] を使用している (`git-lfs`)
- 無効または予約済みのファイルパスが含まれている (`/` や `\\` など)
- 親ディレクトリトラバーサルを含むファイルパスが含まれている (`..`)
- 255 文字を超えるファイル名が含まれている

これらの条件のいずれかがリポジトリに当てはまり、これらの制約に対応するためにリポジトリを更新できない場合は、[CI パイプラインで分析をセットアップ][19]して SCA を実行し、結果を Datadog にアップロードしてください。

### 不足しているライブラリ {#missing-libraries}

データ品質を確保するため、Datadog は SBOM 処理中に検証ルールを適用します。以下の基準のいずれかを満たすライブラリは除外されます。

- **バージョンなし**: ライブラリにバージョンが指定されていません。
- **非 ASCII 名**: ライブラリ名に ASCII 文字セット以外の文字が含まれています。
- **空の purl**: パッケージ URL (purl) フィールドが存在しないか、空白です。
- **無効な purl**: パッケージ URL は存在しますが、有効な purl 形式ではありません。
- **サポートされていない言語**: ライブラリが Datadog でサポートされていないプログラミング言語に関連付けられています。

### Software Composition Analysis で脆弱性が検出されません{#no-vulnerabilities-detected-by-software-composition-analysis}

脆弱性情報が [カタログ][16]の {{< ui >}}Security{{< /ui >}} 表示または[脆弱性エクスプローラー][12]に表示されるためには、一連のステップが正常に実行される必要があります。この問題を調査する際は、各ステップを確認することが重要です。

#### ランタイム検出が有効になっていることの確認 {#confirming-runtime-detection-is-enabled}

サービスでランタイム Software Composition Analysis (SCA) を有効にしている場合は、メトリクス `datadog.appsec.risk_management.sca.host_instance` を使用して実行中かどうかを確認できます。

1. Datadog で {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} に移動します。
2. メトリクス `datadog.appsec.risk_management.sca.host_instance` を検索します。メトリクスが存在しない場合、ランタイム Software Composition Analysis (SCA) を実行しているサービスはありません。メトリクスが存在する場合、サービスはメトリクスタグ `host` および `service` で報告されます。
3. メトリクスを選択し、{{< ui >}}Tags{{< /ui >}} セクションで `service` を検索すると、どのサービスが AAP を実行しているかを確認できます。

`datadog.appsec.risk_management.sca.host_instance` が表示されない場合は、[アプリ内の説明][3]を確認して、初期設定の手順がすべて完了していることを確認してください。

Runtime application security のデータは、APM トレースと一緒に送信されます。[APM troubleshooting][22] を参照して、[APM の設定を確認][23]し、[接続エラー][6]を調べてください。

#### トレーサーのバージョンが更新されていることを確認する{#confirm-tracer-versions-are-updated}

Application Security 製品のセットアップドキュメントを参照して、適切なバージョンの SDK を使用していることを確認してください。ライブラリ情報を含むテレメトリデータの送信を開始するには、これらの最小バージョンが必要です。

#### テレメトリーデータの通信を確保する{#ensure-the-communication-of-telemetry-data}

`DD_INSTRUMENTATION_TELEMETRY_ENABLED` 環境変数 (Node.js の場合は `DD_TRACE_TELEMETRY_ENABLED`) が `true` に設定されているか、使用言語に対応するシステムプロパティが有効になっていることを確認してください。たとえば、Java の場合は以下のようになります: `-Ddd.instrumentation.telemetry.enabled=true`。

### Bits Code による修正が失敗する、または不完全な修正が生成される {#bits-code-remediation-fails-or-produces-incomplete-fixes}

Bits Code が SCA の検出結果を修正する際にライブラリのアップグレードを適用するには、インターネットアクセスが必要です。Bits Code が修正の生成に失敗したり、不完全なパッチを作成したりした場合は、インターネットアクセスに関するポリシーで、Bits Code が使用言語に必要なパッケージレジストリ (JavaScript の場合は `registry.npmjs.org`、Python の場合は `pypi.org` など) にアクセスできることを確認してください。詳細については、[インターネットアクセスの構成][30]を参照してください。

## Runtime Code Analysis (IAST) {#runtime-code-analysis-iast}

### IAST が有効であることを確認する{#confirm-iast-is-enabled}
`DD_IAST_ENABLED` 環境変数が `true` に設定されているか、使用言語に対応するシステムプロパティが有効になっていることを確認してください。

サービスで Runtime Code Analysis (IAST) を有効にしている場合は、メトリクス `datadog.appsec.risk_management.iast.host_instance` を使用して実行中かどうかを確認できます。

1. Datadog で {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} に移動します。
2. メトリクス `datadog.appsec.risk_management.iast.host_instance` を検索します。メトリクスが存在しない場合は、Runtime Code Analysis (IAST) を実行しているサービスはありません。メトリクスが存在する場合、サービスはメトリクスタグ `host` および `service` で報告されます。
3. メトリクスを選択し、{{< ui >}}Tags{{< /ui >}} セクションで `service` を検索すると、どのサービスが AAP を実行しているかを確認できます。

`datadog.appsec.risk_management.iast.host_instance` が表示されない場合は、[アプリ内の説明][20]を確認して、初期設定の手順がすべて完了していることを確認してください。

Runtime application security のデータは、APM トレースと一緒に送信されます。[APM troubleshooting][22] を参照して、[APM の設定を確認][23]し、[接続エラー][6]を調べてください。

### Python および Flask インスツルメンテーションに関する問題 {#issues-with-python-and-flask-instrumentation}
Flask アプリケーションを実行している場合は、モジュールのトップレベルで、かつ `app.run()` を呼び出す前に `ddtrace_iast_flask_patch()` 関数を呼び出していることを確認してください。詳しくは、[Flask インテグレーションドキュメント][19]を参照してください。

## Secret Scanning {#secret-scanning}

### シークレットを削除した後も Git 履歴の検出結果がオープン状態のままになる {#a-git-history-finding-is-still-open-after-i-removed-the-secret}

最初の Git 履歴スキャン以降、スキャンは最新のコミットのみを分析し、履歴のみの検出結果をクローズすることはありません。Git 履歴を書き換えても、これらの検出結果はクローズされません。公開された認証情報をプロバイダー側でローテーションまたは無効化した後、[検出結果をミュート][31]してください。

## Code Security のコミッターの計算方法 {#how-committers-are-calculated-for-code-security}
**コミッター**とは、Git コミットメタデータの `author_email` フィールドによって識別されるアクティブな Git コントリビューターのことです。

コミッターは、Code Security が有効になっているリポジトリで **暦月に少なくとも 3 回のコミット**を行った場合に、課金対象としてカウントされます。

同じ `author_email` を持つ複数のコミットは、1 人のコミッターとしてカウントされます。デフォルトでは、異なるメールアドレスを持つコミットは個別にカウントされます。[メールアドレス間でのコミッターの重複排除](#deduplicating-committers-across-email-addresses)の要件を満たす GitHub リポジトリの場合、同じ GitHub ユーザーに属する複数のメールアドレスは 1 人のコミッターとしてカウントされます。

### メールアドレスがコミッターとしてカウントされる仕組み {#how-email-addresses-are-counted-as-committers}
コミッターは、Git コミットメタデータの正規化された `author_email` 値に基づいて識別されます。

`noreply@github.com` や `actions@github.com` などの既知の GitHub システムアカウントによって完了されたコミットはカウントされません。

`@users.noreply.github.com` を使用したコミットは自動的に除外されません。これらのアドレスは、GitHub で公開メールアドレスを非表示にすることを選択した開発者によって一般的に使用されています。コミットを個々の開発者に帰属させることができる場合、それはカウントされます。

環境内でのコミッターのカウント方法に関する詳細については、[Datadog サポート][1]にお問い合わせください。

### メールアドレス間でのコミッターの重複排除 {#deduplicating-committers-across-email-addresses}
場合によっては、1 人の開発者のコミットが複数の Git 作成者メールアドレスにまたがることがあります。たとえば、開発者が異なるリポジトリで `git config user.email` を使用して異なるメールアドレスを設定している場合があります。それらのメールアドレスのうち 1 つ以上が 3 コミットの課金しきい値を超えた場合、それぞれが個別のコミッターとしてカウントされます。

GitHub でホストされているリポジトリの場合、Datadog は各 Git 作成者メールアドレスを基盤となる GitHub ユーザーにマッピングできるため、開発者が異なるメールアドレスでプッシュした場合でも、その開発者は 1 回としてカウントされます。これには、影響を受けるリポジトリに `Contents: Read` 権限でインストールされた Datadog [GitHub App][28] が必要です。

このマッピングは GitHub リポジトリでのみ利用可能です。GitLab、Azure DevOps、または Bitbucket でホストされているリポジトリは、重複排除されません。

GitHub リポジトリのコミッター数が予想よりも多く見える場合は、Datadog GitHub App が `Contents: Read` 権限でそれらのリポジトリにインストールされていることを確認してください。インストール状況は、[GitHub インテグレーションタイル][29]から確認できます。

## Code Security 機能の無効化 {#disabling-code-security-capabilities}
### 静的リポジトリスキャンの無効化 {#disabling-static-repository-scanning}
静的コード解析 (SAST) または静的 Software Composition Analysis (SCA) のスキャンを無効にするには、
- Datadog ホスト型スキャンを通じてリポジトリをスキャンしている場合は、Code Security [{{< ui >}}Setup{{< /ui >}}][17] に移動し、{{< ui >}}Enable scanning for your repositories{{< /ui >}} をクリックして、接続されているすべてのリポジトリまたは各リポジトリのスキャンに対して以前に有効にしていたトグルを無効にしてください。
- CI パイプラインを通じてソースコードリポジトリをスキャンしている場合は、関連するジョブを CI パイプラインから削除してください。

### サービスでのランタイム SCA の無効化 {#disabling-runtime-sca-on-your-services}

SCA は、以下の 2 つの方法のいずれかを使用して、実行中のサービスで有効にできます。
- Datadog UI から。
- 手動で、`DD_APPSEC_SCA_ENABLED` 環境変数を使用します。

SCA を無効にするには、SCA を有効にしたときと *同じ方法* を使用する必要があります。

{{< tabs >}}
{{% tab "UI で有効化" %}}
<div class="alert alert-danger">
環境変数を通じて SCA を有効にした場合、 <code>DD_APPSEC_SCA_ENABLED</code> UI を使用して無効にすることはできません。
</div>

UI を通じて SCA を無効にするには、次の操作を行います。

* [Code Security Setup ページ][1]に移動し、{{< ui >}}Activate runtime detection of library vulnerabilities{{< /ui >}} を選択します。このテーブルでは、以前に有効化されたサービスを無効にできます。

または

* [Services][2] に移動し、{{< ui >}}Software Composition Analysis (SCA){{< /ui >}} を選択します。{{< ui >}}Coverage{{< /ui >}} で、サービスの SCA アイコンにカーソルを合わせ、{{< ui >}}Deactivate{{< /ui >}} をクリックします。
*  サービスで Software Composition Analysis を一括で無効にするには、リストのヘッダーにあるチェックボックスをオンにし、{{< ui >}}Bulk Actions{{< /ui >}} で {{< ui >}}Deactivate Software Composition Analysis (SCA) on x services{{< /ui >}} を選択してください。

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://app.datadoghq.com/security/code-security/inventory/services
{{% /tab %}}
{{% tab "環境変数を使用して有効化" %}}
<div class="alert alert-danger">
UI を通じて SCA を有効にした場合、環境変数を削除しても無効にすることはできません。 <code>DD_APPSEC_SCA_ENABLED</code> 環境変数。
</div>

* アプリケーションの構成から `DD_APPSEC_SCA_ENABLED=true` 環境変数を削除し、サービスを再起動してください。これは PHP アプリケーションには適用されません。

{{% /tab %}}

{{< /tabs >}}

### Runtime Code Analysis (IAST) の無効化 {#disabling-runtime-code-analysis-iast}

IAST を無効にするには、アプリケーションの構成から `DD_IAST_ENABLED=true` 環境変数を削除するか、`false` として `DD_IAST_ENABLED=false` に設定し、サービスを再起動してください。

[1]: /ja/help/
[2]: /ja/security/code_security/static_analysis/github_actions
[3]: /ja/security/code_security/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/source-code/repositories
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: /ja/tracing/troubleshooting/connection_errors/
[7]: https://github.com/DataDog/datadog-sbom-generator
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
[12]: https://app.datadoghq.com/security/appsec/vm/library
[13]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/diff-aware.md
[17]: https://app.datadoghq.com/security/configuration/code-security/setup
[16]: https://app.datadoghq.com/services?&lens=Security
[18]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[19]: /ja/tracing/trace_collection/dd_libraries/python/
[20]: /ja/security/configuration/code-security/setup?steps=iast
[21]: /ja/security/code_security/static_analysis/setup/#diff-aware-scanning
[22]: /ja/tracing/troubleshooting/
[23]: /ja/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[24]: /ja/getting_started/site/
[25]: /ja/security/code_security/dev_tool_int/pull_request_comments/
[26]: /ja/pr_gates/
[27]: https://github.com/DataDog/datadog-sbom-generator/releases
[28]: /ja/integrations/github/
[29]: https://app.datadoghq.com/integrations/github/
[30]: /ja/bits_ai/bits_code/setup/#configure-internet-access
[31]: /ja/security/code_security/secret_scanning/#mute-findings