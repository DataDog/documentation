---
aliases:
- /ja/tracing/profiler/enabling/linux/
- /ja/tracing/profiler/enabling/ddprof/
code_lang: ddprof
code_lang_weight: 90
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/profiler_troubleshooting/ddprof
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
title: コンパイル済み言語のネイティブプロファイラーを有効にする
type: multi-code-lang
---

<div class="alert alert-warning">
<code>ddprof</code> はベータ版です。Datadog では、本番環境にデプロイする前に重要でない環境でプロファイラーを評価することを推奨しています。
</div>

コンパイル済み言語用ネイティブプロファイラー (`ddprof`) は、OS レベルの API を使用してプロファイリングデータを収集します。C、C++、Rust などのコンパイルされた言語で書かれたアプリケーションに最適です。
`ddprof` から送信されたプロファイラーが、Datadog Web アプリの_ネイティブ_ランタイムに表示されます。

## 要件

対応 OS
: Linux (glibc または musl)

対応アーキテクチャ
: `amd64` プロセッサーまたは `arm64` プロセッサー

サーバーレス
: `ddprof` は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

OS 設定
: `perf_event_paranoid` カーネル設定は 2 以下です ([トラブルシューティング][1]を参照してください)。

デバッグ情報
: シンボルが利用可能である必要があります。シンボルテーブルが削除されると、プロファイラーが人間が読める関数名を提供できません。

## インストール

プロファイラーは、スタンドアロン実行ファイルとして、またはライブラリとして使用することができます。ライブラリとして使用する場合は、[ライブラリのインストール方法](#library)までスキップしてください。

### スタンドアロン

1. 最新の [`ddprof` リリース][2]をダウンロードします。例えば、`amd64` (別名 `x86_64`) プラットフォーム用の `v0.10.1` リリースを取得する一つの方法は以下の通りです。

   ```bash
   curl -L -o ddprof-amd64-linux.tar.xz https://github.com/DataDog/ddprof/releases/download/v0.10.1/ddprof-0.10.1-amd64-linux.tar.xz
   tar xvf ddprof-amd64-linux.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   ここで、`INSTALLATION_TARGET` は `ddprof` のバイナリを保存する場所を指定します。この後の例では、`INSTALLATION_TARGET` は `./ddprof` に設定されていると仮定しています。

2. プロファイラーを含むようにサービス呼び出しを修正します。いつものコマンドは `ddprof` 実行ファイルへの最後の引数として渡されます。
   {{< tabs >}}
{{% tab "環境変数" %}}

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
./ddprof myapp --arg1 --arg2
```
**注**: 通常、シェルビルトインを使用してアプリケーションを起動する場合、例えば、

```bash
exec myapp --arg1 --arg2
```

その場合は、代わりにそのビルトインで `ddprof` を呼び出す必要があります。

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
exec ./ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "パラメーター" %}}

```bash
./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

**注**: 通常、シェルビルトインを使用してアプリケーションを起動する場合、例えば、

```bash
exec myapp --arg1
```

その場合は、代わりにそのビルトインで `ddprof` を呼び出す必要があります。

```bash
exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

{{% /tab %}}
{{< /tabs >}}


5. アプリケーションの起動数分後、[Datadog APM > Profiler ページ][3]にプロファイルが表示されます。

### ライブラリ

このライブラリは、C 言語の API を公開しています。

1. [ddprof][2] のライブラリサポート付きリリース (v0.8.0 以降) をダウンロードし、tarball を抽出します。例:

   ```bash
   curl -L -o ddprof-amd64-linux.tar.xz https://github.com/DataDog/ddprof/releases/download/v0.10.1/ddprof-0.10.1-amd64-linux.tar.xz
   tar xvf ddprof-amd64-linux.tar.xz --directory /tmp
   ```

2. コード内で、リリースで提供される `_dd_profiling.h_` ヘッダーで定義される `ddprof_start_profiling()` インターフェイスを使用して、プロファイラーを開始します。プログラムが終了すると、プロファイラーは自動的に停止します。プロファイラーを手動で停止させるには、 `ddprof_stop_profiling(ms)` を使用します。`ms` パラメーターは、関数の最大ブロック時間をミリ秒で表します。以下は、C 言語のスタンドアロン例 (`profiler_demo.c`) です。
   ```cpp
   #include <stdlib.h>
   #include "dd_profiling.h"

   int foo(void) {
     int n = 0;
     for (int i = 0; i < 1000; i++) {
       n += 1;
     }
     return n;
   }

   int main(void) {
     // Initialize and start the Datadog profiler. Uses agent defaults if not
     // specified
     setenv("DD_ENV", "prod", 1);
     setenv("DD_SERVICE", "c_testservice", 1);
     setenv("DD_VERSION", "1.0.3", 1);
     ddprof_start_profiling();

     // Do some work
     for (int i = 0; i < 1e6; i++) {
       foo();
     }
     return 0;
   }
   ```

3. 抽出したディレクトリの `include` と `lib` サブディレクトリをビルドシステムに渡し、 `libdd_profiling` に対してリンクします。上記の例の場合:
   ```bash
   gcc -I/tmp/ddprof/include -L/tmp/ddprof/lib profiler_demo.c -o profiler_demo -ldd_profiling
   ```

### 共有ライブラリのデプロイ

共有ライブラリは、システムのライブラリ検索パスに存在する必要があります。そうでない場合は、アプリケーションの起動に失敗します。先ほどの例で言うと:
```bash
./profiler_demo
./profiler_demo: error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

スタティックライブラリに対してリンクすることで、これを回避することができます。

#### ライブラリのインストール

ライブラリを既存の検索ディレクトリにコピーして、検索パスに追加します。検索ディレクトリを調べるには、Linux システムで、以下を実行します。
```bash
ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n
```

#### 検索ディレクトリの追加

環境変数 `LD_LIBRARY_PATH` を使って、ランタイムリンカーに追加の検索パスを追加します。例えば、先ほどのディレクトリレイアウトを使って:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/tmp/ddprof/lib
```

## コンフィギュレーション

プロファイラーの構成は、コマンドラインパラメーター、環境変数、またはその両方の組み合わせによって行うことができます。ある設定に対して両方が提供されている場合、コマンドラインパラメーターが使用されます。

| 環境変数            | ロングネーム       | ショートネーム | デフォルト   | 説明                                                                                                                          |
| ------------------------------- | --------------- | ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| DD_ENV                          | 環境     | E          |           | [環境][4]名 (例: `production`)。                                                                                |
| DD_SERVICE                      | サービス         | S          | myservice | [サービス][4]名 (例: `web-backend`)。                                                                                   |
| DD_VERSION                      | service_version | V          |           | サービスの[バージョン][4]。                                                                                                    |
| DD_AGENT_HOST                   | ホスト            | H          | localhost | Datadog Agent のホスト名。                                                                                                  |
| DD_TRACE_AGENT_PORT             | port            | P          | 8126      | Datadog Agent のリスニングポート。                                                                                                    |
| DD_TRACE_AGENT_URL              | url             | U          |           | `https://<hostname>:<port>` は、他の Agent のホスト/ポート設定をオーバーライドします。                                                                |
| DD_TAGS                         | タグ            | T          |           | アップロードされたプロファイルに適用するタグ。`<key>:<value>` ペアのように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。 |
| DD_PROFILING_NATIVE_NICE        | nice            | i          |           | インスツルメントされたプロセスに影響を与えずに、プロファイラーの nice レベルを設定します。                                                    |
| DD_PROFILING_NATIVE_SHOW_CONFIG | show_config     | c          | いいえ        | プロファイラーの構成パラメーターをログに記録するかどうか。                                                                                    |
| DD_PROFILING_NATIVE_LOG_MODE    | log_mode        | o          | stdout    | プロファイラーのログを出す方法。詳しくはログのセクションをご覧ください。                                                                   |
| DD_PROFILING_NATIVE_LOG_LEVEL   | log_level       | l          | warn      | ログの冗長性を決定します。                                                                                                            |
| DD_PROFILING_NATIVE_TARGET_PID  | pid             | p          |           | pidmode を起動します。詳しくは pidmode のセクションを参照してください。                                                                             |
| DD_PROFILING_NATIVE_GLOBAL      | global          | g          | いいえ        | globalmode を起動します。詳しくは globalmode のセクションを参照してください。--pid をオーバーライドします。                                                      |

コマンドライン引数を渡す場合、ロングネームの前には 2 本のダッシュを、ショートネームの前には 1 本のダッシュを付けます。例: `--service myservice` と `-S myservice`

`environment`、`service`、`service_version` の設定は、プロファイリング UI で使用されるため、推奨されます。

**注**: パラメーターには必ず値を設定する必要があります。例えば、プロファイラーの構成をログに記録するには、`--show_config` だけではなく、 `DD_PROFILING_NATIVE_SHOW_CONFIG=yes` を設定するか、`--show_config yes` を渡さなければなりません。このような引数の場合、設定を有効にするには `yes`、`true`、`enable` を、無効にするには `no`、`false`、`disable` を同じように使用することができます。

[パラメーターの全リスト][5]を参照するか、コマンドラインを使用してください。

```bash
ddprof --help
```

### ロギング

複数のエンドポイントのうちの 1 つにログを構成することができます。
- `stdout` はログを標準出力ストリームに出力します (デフォルト)。
- `stderr` はログを標準エラーストリームに出力します。
- `syslog` は、RFC 3164 の仕様に準拠するように、ログを syslog に発行します。
- `disable` はログを完全に無効にします。
- それ以外の値はファイルパスとして扱われ、先頭の `/` は絶対パスを意味します。

### Pidmode

ターゲット PID が指定された場合、その PID をインスツルメントします。このモードでは、通常のプロファイラーの引数処理以降のパラメーターは無視されます。ターゲット PID とプロファイラーの所有する UID が異なる場合は、以下のいずれかを行います。
- 代わりにルートプロセスとしてプロファイラーを実行します。
- プロファイラーに `CAP_PERFMON` を付与します (Linux v5.8 以降)。
- プロファイラーに `CAP_SYS_ADMIN` を付与します。
- `perf_event_paranoid` を `-1` に減らします (詳細はお使いのディストリビューションのドキュメントを参照するかシステム管理者にお尋ねください)。

このように PID を指定すると、インスツルメンテーション後に生成された子プロセス (フォークとスレッドの両方) のみが生成されることになります。

### Globalmode

グローバルモードはデバッグのためのものです。`global` を `yes` に設定すると、プロファイラーは表示されているすべてのプロセスのプロファイリングを試みます。
このためには、昇格した権限 (例えば、root で実行するか、`CAP_PERFMON` や `CAP_SYSADMIN` を付与する) や、 `perf_event_paranoid` を `-1` に設定する必要があります。

```bash
./ddprof --environment staging --global yes --service_version full-host-profile
```

プロファイラーをルートユーザーで実行すると、表示されているすべてのプロセスがインスツルメントされます。
ほとんどの構成では、プロファイラの PID ネームスペースで表示されるすべてのプロセスが対象となります。

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/profiler/profiler_troubleshooting
[2]: https://github.com/DataDog/ddprof/releases
[3]: https://app.datadoghq.com/profiling
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/ddprof/blob/v0.10.1/docs/Commands.md
[6]: /ja/getting_started/profiler/