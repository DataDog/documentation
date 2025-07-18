---
description: Static Analysis の複数言語のルールを表示します。
further_reading:
- link: /continuous_integration/static_analysis/
  tag: Documentation
  text: Datadog Static Analysis について
is_beta: true
kind: documentation
python_best_practices_data:
- link: /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-class-name
  tag: ambiguous-class-name
  text: クラス名が読めるようにする
- link: /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-function-name
  tag: ambiguous-function-name
  text: 関数名が読めるようにする
- link: /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-variable-name
  tag: ambiguous-variable-name
  text: 変数名が読めるようにする
- link: /continuous_integration/static_analysis/rules/python-best-practices/any-type-disallow
  tag: any-type-disallow
  text: Any タイプを使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/argument-same-name
  tag: argument-same-name
  text: 同じ名前の引数を持たない
- link: /continuous_integration/static_analysis/rules/python-best-practices/assertraises-specific-exception
  tag: assertraises-specific-exception
  text: assertRaises は特定の例外をチェックしなければならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/avoid-duplicate-keys
  tag: avoid-duplicate-keys
  text: 辞書の重複キーを避ける
- link: /continuous_integration/static_analysis/rules/python-best-practices/avoid-string-concat
  tag: avoid-string-concat
  text: 文字列の連結を避ける
- link: /continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self
  tag: class-methods-use-self
  text: クラスメソッドは self を使うべきではない
- link: /continuous_integration/static_analysis/rules/python-best-practices/collection-while-iterating
  tag: collection-while-iterating
  text: 反復処理中に辞書を変更しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/comment-fixme-todo-ownership
  tag: comment-fixme-todo-ownership
  text: TODO と FIXME コメントは所有権を持たなければならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/comparison-constant-left
  tag: comparison-constant-left
  text: 比較では、変数はそのままにしておかなければならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/condition-similar-block
  tag: condition-similar-block
  text: if 条件が異なるコードブロックでなければならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/ctx-manager-enter-exit-defined
  tag: ctx-manager-enter-exit-defined
  text: __exit__ と __enter__ の両方が定義されていることを確認する
- link: /continuous_integration/static_analysis/rules/python-best-practices/dataclass-special-methods
  tag: dataclass-special-methods
  text: データクラスで特別なメソッドを使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/equal-basic-types
  tag: equal-basic-types
  text: チェックイコールは一貫した基本型に使用される
- link: /continuous_integration/static_analysis/rules/python-best-practices/exception-inherit
  tag: exception-inherit
  text: 例外がベース例外を継承するようにする
- link: /continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return
  tag: finally-no-break-continue-return
  text: finally ブロック内で break や continue を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/function-already-exists
  tag: function-already-exists
  text: 関数は一度だけ定義しなければならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/function-variable-argument-name
  tag: function-variable-argument-name
  text: 関数の引数に代入しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/generic-exception-last
  tag: generic-exception-last
  text: ジェネリック例外を使用する場合は、最後にする
- link: /continuous_integration/static_analysis/rules/python-best-practices/get-set-arguments
  tag: get-set-arguments
  text: getter/setter must have 1 or 2 arguments respectively
- link: /continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else
  tag: if-return-no-else
  text: if 条件が値を返す場合、else は不要である
- link: /continuous_integration/static_analysis/rules/python-best-practices/import-modules-twice
  tag: import-modules-twice
  text: モジュールが 2 度インポートされた
- link: /continuous_integration/static_analysis/rules/python-best-practices/import-single-module
  tag: import-single-module
  text: インポートするモジュールは、1 つのインポートステートメントにつき 1 つだけ
- link: /continuous_integration/static_analysis/rules/python-best-practices/init-call-parent
  tag: init-call-parent
  text: super() を使って親コンストラクタを呼び出す
- link: /continuous_integration/static_analysis/rules/python-best-practices/init-method-required
  tag: init-method-required
  text: クラスに __init__ メソッドがあることを確認する
- link: /continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value
  tag: init-no-return-value
  text: __init__ 関数でリターンしない
- link: /continuous_integration/static_analysis/rules/python-best-practices/invalid-strip-call
  tag: invalid-strip-call
  text: strip() 引数に重複文字を指定してはならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/logging-no-format
  tag: logging-no-format
  text: ロギング関数でフォーマット文字列を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/method-hidden
  tag: method-hidden
  text: メソッドが属性と同じ名前を持つ
- link: /continuous_integration/static_analysis/rules/python-best-practices/nested-blocks
  tag: nested-blocks
  text: ネストされたブロックを増やしすぎない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-assert
  tag: no-assert
  text: 本番コードで assert を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-assert-on-tuples
  tag: no-assert-on-tuples
  text: タプルにアサートしない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-bare-except
  tag: no-bare-except
  text: むき出しの except を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-bare-raise
  tag: no-bare-raise
  text: 特定の例外がない限り、raise ステートメントを使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-base-exception
  tag: no-base-exception
  text: ベース例外を発生させない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today
  tag: no-datetime-today
  text: datetime.today() を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-double-not
  tag: no-double-not
  text: 二重否定を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-double-unary-operator
  tag: no-double-unary-operator
  text: 演算子 -- と ++ を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-duplicate-base-class
  tag: no-duplicate-base-class
  text: ベースクラスを一度だけ使用する
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-equal-unary
  tag: no-equal-unary
  text: 演算子 =+ と =- を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-exit
  tag: no-exit
  text: exit() を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-generic-exception
  tag: no-generic-exception
  text: ジェネリック例外を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-if-true
  tag: no-if-true
  text: 条件において True と比較しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len
  tag: no-range-loop-with-len
  text: range(len(<array>)) で for i を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception
  tag: no-silent-exception
  text: パスステートメントを持つ例外を無視しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/open-add-flag
  tag: open-add-flag
  text: 読み取り用のオープンフラグを定義しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/os-environ-no-assign
  tag: os-environ-no-assign
  text: os.environ に代入しても環境はクリアされない
- link: /continuous_integration/static_analysis/rules/python-best-practices/raising-not-implemented
  tag: raising-not-implemented
  text: NotImplemented を発生させない - 存在しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/return-bytes-not-string
  tag: return-bytes-not-string
  text: __bytes__ メソッドは文字列ではなくバイトを返すべきである
- link: /continuous_integration/static_analysis/rules/python-best-practices/return-outside-function
  tag: return-outside-function
  text: 関数の外にリターンしない
- link: /continuous_integration/static_analysis/rules/python-best-practices/self-assignment
  tag: self-assignment
  text: 自分自身に割り当てない
- link: /continuous_integration/static_analysis/rules/python-best-practices/slots-no-single-string
  tag: slots-no-single-string
  text: __slots__ は単一の文字列であってはならない
- link: /continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments
  tag: special-methods-arguments
  text: 特別なメソッドが正しい引数を持つようにする
- link: /continuous_integration/static_analysis/rules/python-best-practices/static-method-no-self
  tag: static-method-no-self
  text: 静的メソッドのパラメーターとして self を使用しない
- link: /continuous_integration/static_analysis/rules/python-best-practices/too-many-nested-if
  tag: too-many-nested-if
  text: ネストされた if 条件を使いすぎない
- link: /continuous_integration/static_analysis/rules/python-best-practices/too-many-while
  tag: too-many-while
  text: ネストされたループや条件を使いすぎない
- link: /continuous_integration/static_analysis/rules/python-best-practices/type-check-isinstance
  tag: type-check-isinstance
  text: type の代わりに isinstance を使う
- link: /continuous_integration/static_analysis/rules/python-best-practices/unreachable-code
  tag: unreachable-code
  text: 到達不可能なコードを避ける
- link: /continuous_integration/static_analysis/rules/python-best-practices/use-callable-not-hasattr
  tag: use-callable-not-hasattr
  text: 値が呼び出し可能かどうかをチェックするために hasattr を使わない
python_code_style_data:
- link: /continuous_integration/static_analysis/rules/python-code-style/assignment-names
  tag: assignment-names
  text: 変数名は snake_case を使用しなければならない
- link: /continuous_integration/static_analysis/rules/python-code-style/class-name
  tag: class-name
  text: クラス名はキャメルケースでなければならない
- link: /continuous_integration/static_analysis/rules/python-code-style/function-naming
  tag: function-naming
  text: 関数名とパラメーターには snake_case を使用する
- link: /continuous_integration/static_analysis/rules/python-code-style/max-class-lines
  tag: max-class-lines
  text: クラスは 100 行以下でなければならない
- link: /continuous_integration/static_analysis/rules/python-code-style/max-function-lines
  tag: max-function-lines
  text: 関数は 200 行以下でなければならない
python_design_data:
- link: /continuous_integration/static_analysis/rules/python-design/function-too-long
  tag: function-too-long
  text: 関数は 100 行以下でなければならない
python_django_data:
- link: /continuous_integration/static_analysis/rules/python-django/http-response-from-request
  tag: http-response-from-request
  text: ユーザーデータのサニタイズの欠如
- link: /continuous_integration/static_analysis/rules/python-django/http-response-with-json-dumps
  tag: http-response-with-json-dumps
  text: JSON データを送信するには、HttpResponse の代わりに JsonResponse を使う
- link: /continuous_integration/static_analysis/rules/python-django/jsonresponse-no-content-type
  tag: jsonresponse-no-content-type
  text: JsonResponse に content-type を指定しない
- link: /continuous_integration/static_analysis/rules/python-django/model-charfield-max-length
  tag: model-charfield-max-length
  text: Charfield には常に max_length を指定する
- link: /continuous_integration/static_analysis/rules/python-django/model-help-text
  tag: model-help-text
  text: モデルの列をドキュメント化するために help_text を使用する
- link: /continuous_integration/static_analysis/rules/python-django/no-null-boolean
  tag: no-null-boolean
  text: NullBooleanField を使用しない
- link: /continuous_integration/static_analysis/rules/python-django/no-unicode-on-models
  tag: no-unicode-on-models
  text: __unicode__ を使用しない
- link: /continuous_integration/static_analysis/rules/python-django/open-filename-from-request
  tag: open-filename-from-request
  text: リクエストからのファイル名
- link: /continuous_integration/static_analysis/rules/python-django/os-system-from-request
  tag: os-system-from-request
  text: 受信リクエストからのコマンド
- link: /continuous_integration/static_analysis/rules/python-django/subprocess-from-request
  tag: subprocess-from-request
  text: 受信リクエストからのコマンド
- link: /continuous_integration/static_analysis/rules/python-django/use-convenience-imports
  tag: use-convenience-imports
  text: 可能な限りコンビニエンスインポートを使用する
python_flask_data:
- link: /continuous_integration/static_analysis/rules/python-flask/disable-sqlalchemy-text
  tag: disable-sqlalchemy-text
  text: text() は SQL インジェクションにつながるので使用しない
- link: /continuous_integration/static_analysis/rules/python-flask/html-format-from-user-input
  tag: html-format-from-user-input
  text: API 呼び出しのための未サニタイズデータの使用
- link: /continuous_integration/static_analysis/rules/python-flask/listen-all-interfaces
  tag: listen-all-interfaces
  text: アプリケーションはすべてのインターフェイスをリッスンすべきではない
- link: /continuous_integration/static_analysis/rules/python-flask/no-render-template-string
  tag: no-render-template-string
  text: 文字列で作成されたテンプレートを使用しない
- link: /continuous_integration/static_analysis/rules/python-flask/open-file-unsanitized-data
  tag: open-file-unsanitized-data
  text: ファイルを開くための未サニタイズデータの使用
- link: /continuous_integration/static_analysis/rules/python-flask/os-system-unsanitized-data
  tag: os-system-unsanitized-data
  text: プロセスを作成するための未サニタイズデータの使用
- link: /continuous_integration/static_analysis/rules/python-flask/secure-cookie
  tag: secure-cookie
  text: クッキーが安全でセキュアであることを確認する
- link: /continuous_integration/static_analysis/rules/python-flask/sqlalchemy-injection
  tag: sqlalchemy-injection
  text: SQL クエリを発行するための未サニタイズデータの使用
- link: /continuous_integration/static_analysis/rules/python-flask/ssrf-requests
  tag: ssrf-requests
  text: API 呼び出しのための未サニタイズデータの使用
- link: /continuous_integration/static_analysis/rules/python-flask/urlopen-unsanitized-data
  tag: urlopen-unsanitized-data
  text: API を開くための未サニタイズデータの使用
- link: /continuous_integration/static_analysis/rules/python-flask/use-jsonify
  tag: use-jsonify
  text: JSON 出力には、json.dumps の代わりに jsonify を使う
python_inclusive_data:
- link: /continuous_integration/static_analysis/rules/python-inclusive/comments
  tag: コメント
  text: 表現に問題がないかコメントをチェックする
- link: /continuous_integration/static_analysis/rules/python-inclusive/function-definition
  tag: function-definition
  text: 表現に問題がないか関数名をチェックする
- link: /continuous_integration/static_analysis/rules/python-inclusive/variable-name
  tag: variable-name
  text: 表現に問題がないか変数名をチェックする
python_pandas_data:
- link: /continuous_integration/static_analysis/rules/python-pandas/arith-operator-not-functions
  tag: arith-operator-not-functions
  text: 関数の代わりに算術演算子を使用する
- link: /continuous_integration/static_analysis/rules/python-pandas/avoid-inplace
  tag: avoid-inplace
  text: inplace=True の使用は避ける
- link: /continuous_integration/static_analysis/rules/python-pandas/comp-operator-not-function
  tag: comp-operator-not-function
  text: 値の比較には、関数ではなく演算子を使用する
- link: /continuous_integration/static_analysis/rules/python-pandas/import-as-pd
  tag: import-as-pd
  text: コーディングガイドラインに従って pandas をインポートする
- link: /continuous_integration/static_analysis/rules/python-pandas/isna-instead-of-isnull
  tag: isna-instead-of-isnull
  text: isnull の代わりに isna を使用する
- link: /continuous_integration/static_analysis/rules/python-pandas/loc-not-ix
  tag: loc-not-ix
  text: ix より iloc か loc を優先する
- link: /continuous_integration/static_analysis/rules/python-pandas/notna-instead-of-notnull
  tag: notna-instead-of-notnull
  text: notna を notnull より優先する
- link: /continuous_integration/static_analysis/rules/python-pandas/pivot-table
  tag: pivot-table
  text: pivot または unstack の代わりに pivot_table を使用する
- link: /continuous_integration/static_analysis/rules/python-pandas/use-read-csv-not-read-table
  tag: use-read-csv-not-read-table
  text: read_csv を read_table より優先する
python_security_data:
- link: /continuous_integration/static_analysis/rules/python-security/asyncio-subprocess-create-shell
  tag: asyncio-subprocess-create-shell
  text: シェルコマンドの安全でない実行
- link: /continuous_integration/static_analysis/rules/python-security/asyncio-subprocess-exec
  tag: asyncio-subprocess-exec
  text: シェルコマンドの安全でない実行
- link: /continuous_integration/static_analysis/rules/python-security/avoid-random
  tag: avoid-random
  text: secrets パッケージを random パッケージよりも優先的に使用する
- link: /continuous_integration/static_analysis/rules/python-security/aws-boto-credentials
  tag: aws-boto-credentials
  text: 値をハードコーディングせずに環境変数を使用する
- link: /continuous_integration/static_analysis/rules/python-security/deserialize-untrusted-data
  tag: deserialize-untrusted-data
  text: データのシリアル化または逆シリアル化で安全でない関数を避ける
- link: /continuous_integration/static_analysis/rules/python-security/file-write-others
  tag: file-write-others
  text: すべてのユーザーに書き込み権限を与えない
- link: /continuous_integration/static_analysis/rules/python-security/hardcoded-tmp-file
  tag: hardcoded-tmp-file
  text: 一時ファイルやディレクトリをハードコーディングしない
- link: /continuous_integration/static_analysis/rules/python-security/html-string-from-parameters
  tag: html-string-from-parameters
  text: HTML が組み込まれた文字列を避ける
- link: /continuous_integration/static_analysis/rules/python-security/insecure-hash-functions
  tag: insecure-hash-functions
  text: 安全でない関数を使用しない
- link: /continuous_integration/static_analysis/rules/python-security/insecure-jwt
  tag: insecure-jwt
  text: JWT の署名が検証済みであることを確認する
- link: /continuous_integration/static_analysis/rules/python-security/insecure-ssl-protocols
  tag: insecure-ssl-protocols
  text: 安全でない暗号化プロトコルを使用しない
- link: /continuous_integration/static_analysis/rules/python-security/jinja-autoescape
  tag: jinja-autoescape
  text: 自動エスケープを true に設定する
- link: /continuous_integration/static_analysis/rules/python-security/mktemp
  tag: mktemp
  text: 一時ファイルが安全であることを確認する
- link: /continuous_integration/static_analysis/rules/python-security/no-empty-array-as-parameter
  tag: no-empty-array-as-parameter
  text: デフォルトのパラメーターとして空の配列を使用しない
- link: /continuous_integration/static_analysis/rules/python-security/no-eval
  tag: no-eval
  text: eval の使用は安全でない可能性がある
- link: /continuous_integration/static_analysis/rules/python-security/os-spawn
  tag: os-spawn
  text: サニタイジングなしでの spawn プロセスの呼び出し
- link: /continuous_integration/static_analysis/rules/python-security/os-system
  tag: os-system
  text: サニタイジングなしでのコマンドの実行
- link: /continuous_integration/static_analysis/rules/python-security/request-verify
  tag: request-verify
  text: verify を True にする
- link: /continuous_integration/static_analysis/rules/python-security/requests-http
  tag: requests-http
  text: 暗号化なしで http 呼び出しを行わない
- link: /continuous_integration/static_analysis/rules/python-security/requests-timeout
  tag: requests-timeout
  text: 外部リソースの呼び出しでタイムアウトが設定されていない
- link: /continuous_integration/static_analysis/rules/python-security/ruamel-unsafe-yaml
  tag: ruamel-unsafe-yaml
  text: 安全でない YAML の逆シリアル化を使用しない
- link: /continuous_integration/static_analysis/rules/python-security/sql-server-security-credentials
  tag: sql-server-security-credentials
  text: ハードコーディングされた資格情報を渡さない
- link: /continuous_integration/static_analysis/rules/python-security/ssl-unverified-context
  tag: ssl-unverified-context
  text: 証明書の検証をバイパスしない
- link: /continuous_integration/static_analysis/rules/python-security/subprocess-shell-true
  tag: subprocess-shell-true
  text: シェルの引数により不必要な権限が与えられる
- link: /continuous_integration/static_analysis/rules/python-security/variable-sql-statement-injection
  tag: variable-sql-statement-injection
  text: SQL インジェクションを避ける
- link: /continuous_integration/static_analysis/rules/python-security/yaml-load
  tag: yaml-load
  text: 信頼できない YAML の逆シリアル化を避ける
title: Static Analysis ルール
---

## 概要

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis は非公開ベータ版です。サポート言語は Python のみです。アクセスをリクエストするには、<a href="/help">サポートにご連絡ください</a>。
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

Datadog Static Analysis は、すぐに使えるルールを提供し、コードレビューにおける CI/CD パイプラインの違反を検出し、バグ、セキュリティ、保守性の問題を特定するのに役立ちます。詳細については、[Static Analysis ドキュメント][1]を参照してください。

## ルール

### Python コードを書くためのベストプラクティスに従う

**ルールセット ID:** `python-best-practices`

効率的でバグのないコードを書くための Python のベストプラクティス。

{{< sa-rule-list "python_best_practices_data" >}}

<br>

### Python コードスタイルの強制

**ルールセット ID:** `python-code-style`

Python コードスタイルを強制するルール。

{{< sa-rule-list "python_code_style_data" >}}

<br>

### Python プログラムの構造チェック

**ルールセット ID:** `python-design`

ネストされたループのようなものを含む、Python プログラムの構造をチェックするためのルール。

{{< sa-rule-list "python_design_data" >}}

<br>

### Django のベストプラクティスとセキュリティのチェック

**ルールセット ID:** `python-django`

Django のベストプラクティスとセキュリティに特化したルール。

{{< sa-rule-list "python_django_data" >}}

<br>

### Flask のベストプラクティスとセキュリティのチェック

**ルールセット ID:** `python-flask`

Flask のベストプラクティスとセキュリティに特化したルール。

{{< sa-rule-list "python_flask_data" >}}

<br>

### 表現に問題がないか Python コードをチェックする

**ルールセット ID:** `python-inclusive`

Python のコードとコメントで不適切な表現を避けるためのルール。

{{< sa-rule-list "python_inclusive_data" >}}

<br>

### pandas を使ったデータサイエンスのグッドプラクティス

**ルールセット ID:** `python-pandas`

pandas コードが適切に使用されていることを確認するための一連のルール。

 - `import` 宣言がコーディングガイドライン違反に従っていることを確認する。
 - 非推奨のコードやメソッドを避ける。
 - 可能な限り非効率なコードを避ける。

{{< sa-rule-list "python_pandas_data" >}}

<br>

### Python コードが安全でセキュアなことを確認する

**ルールセット ID:** `python-security`

OWASP10 および SANS25 に記載されているものを含め、Python コード内のセキュリティや脆弱性の問題を発見することに焦点を当てたルール。

 - 粗悪な暗号化およびハッシュ化プロトコルの使用
 - アクセス制御の欠如
 - セキュリティの誤構成
 - SQL インジェクション
 - 資格情報のハードコーディング
 - シェルインジェクション
 - 安全でない逆シリアル化

{{< sa-rule-list "python_security_data" >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/static_analysis