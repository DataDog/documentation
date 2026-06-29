---
aliases:
- /ja/tracing/go/
- /ja/tracing/languages/go
- /ja/agent/apm/go/
- /ja/tracing/setup/go
- /ja/tracing/setup_overview/go
- /ja/tracing/setup_overview/setup/go
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: ソースコード
  text: SDK ソースコード
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: 外部サイト
  text: SDK API ドキュメント
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: 外部サイト
  text: v2 用 SDK API ドキュメント
- link: https://github.com/DataDog/orchestrion
  tag: ソースコード
  text: Orchestrion ソースコード
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
title: Go アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件 {#compatibility-requirements}

Go Tracer は Go `1.18+` および Datadog Agent `>= 5.21.1` を必要とします。Datadog の Go バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

{{% tracing-go-v2 %}}

## はじめに {#getting-started}

作業を始める前に、[Agent のインストールと構成][5]が済んでいることを確認してください。

Go アプリケーションのインスツルメンテーションには、2 つの方法があります。

1. **コンパイル時インスツルメンテーション**:
   - トレースインスツルメンテーションのカバレッジを最大化します。
   - ソースコードの変更を必要とせず、CI/CD レベルでの統合に適しています。
1. **手動インスツルメンテーション**:

   dd-trace-go をインテグレーションパッケージと併用して、任意のライブラリに関するスパンを自動的に生成します。このオプション:
   - アプリケーションのどの部分をトレースするかを完全に制御できます。
   - アプリケーションのソースコードを変更する必要があります。

以下の、選択した方法に対応するセクションの手順を参照してください。

{{< tabs >}}

{{% tab "コンパイル時インスツルメンテーション" %}}

### 概要 {#overview}

[Orchestrion][6] は、コンパイル中に Go アプリケーションへ自動的にインスツルメンテーションを追加し、コードの変更を不要にします。包括的なトレースカバレッジを提供し、独自のセキュリティ機能を有効にします。

- 包括的なトレースカバレッジ:
   - あなたのコードおよびすべての依存関係 (Go 標準ライブラリを含む) にインスツルメンテーションを行います。
   - コンパイル中にコードへインスツルメンテーションを追加し、手動インスツルメンテーションの見落としによるトレースカバレッジのギャップを防ぎます。
- 独自の [App and API Protection][7] の **Exploit Prevention** 機能。[Exploit Prevention][15] は、Runtime Application Self-Protection (RASP) の実装であり、Local File Inclusion (LFI) などの RASP メソッドを含みます。

### 要件 {#requirements}

- 最新の 2 つの Go ランタイムリリースをサポートしています ([Go の公式リリースポリシー][8]に準拠)。
- アプリケーションは [go modules][10] を使用して管理する必要があります。モジュールのベンダリングがサポートされています。


### Orchestrion をインストールする {#install-orchestrion}

Orchestrion をインストールして設定するには:

1. Orchestrion をインストールします
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info"> <code>$(go env GOBIN)</code> または <code>$(go env GOPATH)/bin</code> が <code>$PATH</code>に含まれていることを確認してください。</div>

1. プロジェクトの `go.mod` に Orchestrion を登録してください。
   ```sh
   orchestrion pin
   ```
   利用可能なカスタマイズオプションに関する詳細情報は `orchestrion pin -help` の出力を参照してください。
1. 変更をバージョン管理システムにコミットしてください (`orchestrion` を CI/CD パイプラインに直接統合している場合を除く)
   ```sh
   git add go.mod go.sum orchestrion.tool.go
   git commit -m "chore: enable orchestrion"
   ```

   これで、`go.mod` ファイルを使用して `orchestrion` への依存関係を他の依存関係と同様に管理できます。

### 使用方法 {#usage}

ビルドプロセスで Orchestrion を有効にするには、次のいずれかの方法を使用してください。

#### 通常の `go` コマンドの前に `orchestrion` を追加します。{#prepend-orchestrion-to-your-usual-go-commands}
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
#### `go` コマンドに `-toolexec="orchestrion toolexec"` 引数を追加します。{#add-the-toolexecorchestrion-toolexec-argument-to-your-go-commands}
   ```sh
   go build -toolexec="orchestrion toolexec" .
   go run -toolexec="orchestrion toolexec" .
   go test -toolexec="orchestrion toolexec" ./...
   ```
#### Orchestrion を注入するために `$GOFLAGS` 環境変数を変更し、通常通り `go` コマンドを使用します。{#modify-the-goflags-environment-variable-to-inject-orchestrion-and-use-go-commands-normally}
   ```sh
   # Make sure to include the quotes as shown below, as these are required for
   # the Go toolchain to parse GOFLAGS properly!
   export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
   go build .
   go run .
   go test ./...
   ```

### トレースのカスタマイズ {#trace-customization}

#### unified service tagging の設定 {#setting-up-unified-service-tagging}

`orchestrion` によってインスツルメンテーションされたアプリケーションは、Unified Service Tagging (UST) をサポートしています。アプリケーションの **runtime** 環境で対応する環境変数を設定することで、トレースに UST タグを設定できます。

| 統一タグ | 環境  |
|-------------|--------------|
| `env`       | `DD_ENV`     |
| `service`   | `DD_SERVICE` |
| `version`   | `DD_VERSION` |

詳細については、[統合サービスタグ付けドキュメント][14]を参照してください。

#### トレーサーの構成 {#tracer-configuration}

構成手順については、[ライブラリ構成][16]を参照してください。

#### カスタムトレーススパンの作成 {#create-custom-trace-spans}

カスタムトレーススパンは、`//dd:span` ディレクティブコメントで注釈された任意の関数に対して自動的に作成されます。

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction() {
  // ... implementation details ...
}
{{</code-block>}}

これは関数リテラル式でも機能します。

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... implementation details ...
}
{{</code-block>}}

#### オペレーション名 {#operation-name}

オペレーションの名前 (`span.name`) は、次の優先順位に従って自動的に決定されます。
1. ディレクティブ引数として指定された明示的な `span.name:customOperationName` タグ
2. 関数の宣言された名前 (これは匿名の関数リテラル式には適用されません)
3. ディレクティブ引数リストに指定された最初のタグの値

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // This function will be represented as a span named "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // This function will be represented as a span named "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // This function will be represented as a span named "spanName"
}
{{</code-block>}}

#### エラー結果 {#error-results}

注釈付き関数が `error` 結果を返す場合、関数によって返されたエラーは対応するトレーススパンに自動的に添付されます。

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // This span will have error information attached automatically.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### 一部のコードのインスツルメンテーションを防ぐ {#prevent-instrumentation-of-some-code}

`//orchestrion:ignore` ディレクティブを使用して、`orchestrion` が注釈付きコードに対して_いかなる_修正も行わないようにすることができます。

これは、特定の場所に対して呼び出し側のインスツルメンテーションが適用されるのを防ぐために使用できます。

{{<code-block lang="go" filename="example.go" collapsible="true">}}
import "database/sql"

// Caller-side instrumentation normally happens within this function...
func normal() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as it is opted out by the orchestrion:ignore directive:
  //orchestrion:ignore
  db, err := sql.Open("driver-name", "database=example")
  // ...
}

// Caller-side instrumentation will NOT happen in the following function
// as it is annotated with orchestrion:ignore.
//orchestrion:ignore
func excluded() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as the surrounding context is excluded by an
  // orchestrion:ignore directive:
  db, err := sql.Open("driver-name", "database=example")
  // ...
}
{{</code-block>}}

`orchestrion` によって行われるインスツルメンテーションの一部は、呼び出される側 (またはライブラリ側) で行われ、依存関係自体に直接統合が追加されることを意味します。そのような場合、これらの統合をローカルでオプトアウトすることはできません。

#### SDK を使用する {#use-the-sdk}

Orchestrion で構築されたアプリケーションで [SDK][4] を使用できます。これは、Orchestrion でまだサポートされていないフレームワークのインスツルメンテーションに役立ちます。ただし、Orchestrion のサポート範囲の拡大に伴い、将来的に重複したトレーススパンが発生する可能性があることに注意してください。`orchestrion` 依存関係を更新する際は、[リリースノート][11]を確認して新機能に関する情報を把握し、必要に応じて手動インスツルメンテーションを調整してください。

#### 継続的プロファイラを使用する {#use-the-continuous-profiler}

Orchestrion で構築されたアプリケーションには、[continuous profiler][12] のインスツルメンテーションが含まれています。
プロファイラを有効にするには、実行時に環境変数 `DD_PROFILING_ENABLED=true` を設定してください。

#### インテグレーションを削除する {#remove-integrations}

`orchestrion.tool.go` ファイルのインポートを変更することで、インテグレーションを削除できます。
`orchestrion.tool.go` ファイルを作成してから `orchestrion` を実行することもできます。
インテグレーションを使用したくない場合や、
プログラムが使用しないインテグレーションに関するトランジティブ依存関係の数を削減したい場合に、これを行うことがあります。
デフォルトでは、Orchestrion は `github.com/DataDog/dd-trace-go/orchestrion/all/v2` をインポートします。
これは、Orchestrion インテグレーションがあるすべてのライブラリをインポートします。
このインポートは、使用したいインテグレーションのみに置き換えることができます。
サポートされているインテグレーションのリストについては、[SDK ソースコード][17]を参照してください。

**注**: 特定のインテグレーションをインポートすることを選択した場合、新しいインテグレーションを追加するたびに `orchestrion.tool.go` を手動で更新する必要があります。

### Docker でのビルド {#building-with-docker}

適切な Docker イメージを作成する方法の詳細については、[Go 向け APM の Dockerfile の作成][18]を参照してください。

### トラブルシューティング {#troubleshooting}

`orchestrion` が管理するビルドのトラブルシューティングについては、[Go コンパイル時インスツルメンテーションのトラブルシューティング][13]を参照してください。

[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /ja/security/application_security/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /ja/profiler
[13]: /ja/tracing/troubleshooting/go_compile_time/
[14]: /ja/getting_started/tagging/unified_service_tagging/
[15]: /ja/security/application_security/exploit-prevention/
[16]: /ja/tracing/trace_collection/library_config/go/#traces
[17]: https://github.com/DataDog/dd-trace-go/blob/main/orchestrion/all/orchestrion.tool.go
[18]: /ja/tracing/guide/orchestrion_dockerfile/

{{% /tab %}}

{{% tab "手動インスツルメンテーション" %}}

### アプリケーションに SDK を追加する {#add-the-sdk-to-your-application}

まず、[ライブラリ構成][3]ドキュメントに従って、コード内で SDK をインポートして開始します。構成手順や API の使用に関する詳細については、[API ドキュメント][6] (または [API ドキュメント v1][4]) を参照してください。

### Go インテグレーションを有効化してスパンを作成する {#activate-go-integrations-to-create-spans}

[Go インテグレーション][1]を有効化してスパンを生成します。Datadog には、一連のライブラリやフレームワークのインスツルメンテーション向けにすぐに使えるサポートを提供するプラグイン可能な一連のパッケージがあります。これらのパッケージの一覧は、[互換性要件][1]ページにあります。これらのパッケージをアプリケーションにインポートし、各インテグレーションに記載されている構成手順に従ってください。

[1]: /ja/tracing/compatibility_requirements/go
[3]: /ja/tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace

{{% /tab %}}

{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/go
[5]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent