---
code_lang: ruby
code_lang_weight: 10
title: Ruby アプリケーションで処理済み例外を収集する
type: multi-code-lang
---

## 互換性要件

次の条件を満たしている必要があります:
- Ruby `2.7+` 以降を使用していること。JRuby と TruffleRuby には対応していません。
- Datadog Ruby gem (`datadog`) `v2.16.0+` 以降を使用していること。

## はじめに

始める前に、[Agent のインストールと設定][1] を済ませておいてください。また、アプリケーション自体をインスツルメンテーションできるように、[トレーシング ライブラリを追加][2] しておく必要があります。

### 自動インスツルメンテーション

処理済みエラーの自動報告を有効にするには、次の 2 つの環境変数のいずれかを設定します:

`DD_ERROR_TRACKING_HANDLED_ERRORS`
: ユーザー コード、サード パーティ gem、またはその両方で発生した処理済みエラーを報告します。指定できる値は `user`、`third_party`、`all` です。

`DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE`
: 処理済みエラーを報告する対象として、カンマ区切りのパス、ファイル名、gem 名の一覧を指定します。指定できる値は、次のいずれかです:
: - **ファイル名**: 例: `main` を指定すると、`main.rb` ファイルがインスツルメンテーション対象になります。
: - **フォルダ名**: 例: `subdir` を指定すると、`subdir` という名前のフォルダにあるすべての Ruby ファイルがインスツルメンテーション対象になります。
: - **gem 名**: 例: `rails` を指定すると、`rails` gem 内のすべての Ruby ファイルと、`rails` という名前のフォルダにあるすべての Ruby ファイルがインスツルメンテーション対象になります。
: - **絶対パス** (`/` で始まるパス): 例: `/app/lib/mypackage/main.rb` を指定するとそのファイルが、`/app/lib/mypackage` を指定するとそのフォルダ内のすべての Ruby ファイルがインスツルメンテーション対象になります。
: - **カレント ディレクトリからの相対パス** (`./` で始まるパス): 例: プログラムを `/app/` で実行している場合、`./lib/mypackage/main.rb` を指定すると `main.rb` ファイルが、`./lib/mypackage/` を指定するとそのフォルダ内のすべての Ruby ファイルがインスツルメンテーション対象になります。

: Ruby `v3.3+` では、エラーを `rescue` した場所で一致判定が行われます。
: それ以前の Ruby では、エラーが送出された場所で一致判定が行われます。

環境変数の代わりに、コード内の `Datadog.configure` ブロックで次のいずれかを設定することもできます:

- `c.error_tracking.handled_errors`
: ユーザー コード、サード パーティ gem、またはその両方で発生した処理済みエラーを報告します。指定できる値は `user`、`third_party`、`all` です。
- `c.error_tracking.handled_errors_include`
: 処理済みエラーを報告する対象として、カンマ区切りのパス、ファイル名、gem 名の一覧を指定します。指定できる値は、前述の `DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE` と同じです。Ruby `v3.3+` では、エラーを `rescue` した場所で一致判定が行われます。それ以前の Ruby では、エラーが送出された場所で一致判定が行われます。

```Ruby
Datadog.configure do |c|
  # ユーザー コードで発生した処理済みエラーを報告する
  c.error_tracking.handled_errors = 'user'

  # または、処理済みエラーを報告する対象としてカンマ区切りのパス、ファイル名、gem 名を指定する
  c.error_tracking.handled_errors_include = ['sinatra', 'subdir']
end
```

[1]: /ja/error_tracking/backend/getting_started/#getting-started-with-backend-error-tracking
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby