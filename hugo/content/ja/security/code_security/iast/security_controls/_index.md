---
aliases:
- /ja/security/application_security/code_security/iast
disable_toc: false
title: セキュリティコントロール
---


セキュリティコントロールは、エスケープやサニタイズの関数を使用して脆弱性検知における誤検知を防ぎます。セキュリティ機能はデータの処理方法を最適化し、正当な変換が不要なセキュリティアラートを引き起こさないようにします。

## 入力バリデータとサニタイザ

セキュリティコントロールは、セキュリティ検証における関数の使われ方によって、**入力バリデータ (Input Validators)** と **サニタイザ (Sanitizers)** を区別します:

- **入力バリデータ (Input Validators)**: 関数が渡されたパラメータを検証するときに使用されます。バリデータはユーザー入力が処理される前に、期待される形式を満たしていることを保証します。
- **サニタイザ (Sanitizers)**: 関数がアプリケーションでさらに使用される前に、戻り値を検証または変更するときに使用されます。サニタイザはデータをクリーンアップして、潜在的に有害な内容を含まないようにします。

## セキュリティコントロールの設定

セキュリティコントロールの定義は、構成変数 `DD_IAST_SECURITY_CONTROLS_CONFIGURATION` に配置する必要があります。
セキュリティコントロールのリストを設定するには、以下の形式とフィールド仕様に従ってください。
この形式では、各セキュリティコントロールのエントリを構成するために特定のセパレータを使用します。

### 形式

`<TYPE>:<SECURE_MARKS>:<CLASS/FILE>:<METHOD>:<PARAMETERS (Optional)>:<PARAMETERS TO VALIDATE (Optional)>`

### フィールド仕様
| **フィールド**                             | **説明**                                                                                                                                                                                         |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **型**                              | コントロールの種類を定義します。**受け付ける値:** `INPUT_VALIDATOR` または `SANITIZER`。                                                                                                                     |
| **Secure Marks**                      | 適用する脆弱性の種類のリスト。可能な値は[セキュアマーク](#secure-marks)に定義されています。オプションで `*` を使用し、すべての種類に適用することもできます。                                         |
| **Class/File**                        | セキュリティコントロールを実装するクラスまたはファイルの完全修飾名。                                                                                                                                        |
| **Method**                            | セキュリティコントロールを実装するメソッドの名称。                                                                                                                                                   |
| **Parameters (Optional)**             | 完全修飾クラスのパラメータ。オーバーロードされたメソッドを区別するために使用します。省略され、かつオーバーロードが存在する場合は、そのメソッドのすべてのオーバーロードに対してセキュリティコントロールが適用されます。                 |
| **Parameters to Validate (Optional)** | 検証するパラメータの位置を **0** から始まるリストで指定します。最初のパラメータは位置 0 です。このフィールドは `INPUT_VALIDATOR` タイプに**のみ**適用されます。**すべてのパラメータを検証する必要がない**場合に使用します。 |


### セパレータ
- `;` (セミコロン): 各セキュリティコントロールを区切ります。
- `:` (コロン): セキュリティコントロール内の各フィールドを区切ります。
- `,` (カンマ): リストを受け取るフィールド内で要素を区切ります。

### セキュアマーク (Secure marks)

利用可能なセキュアマークは、各インジェクション関連の脆弱性に対応するコードに対応しています。これらのコードと各言語での対応状況は、[サポートされる脆弱性][1]に掲載されています。

インジェクション関連の脆弱性は以下のとおりです:

* コードインジェクション
* コマンドインジェクション
* E メール HTML インジェクション
* ヘッダーインジェクション
* LDAP インジェクション
* NoSQL インジェクション
* パストラバーサル
* リフレクションインジェクション
* サーバーサイドリクエストフォージェリー (SSRF)
* SQL インジェクション
* 信頼境界の違反
* 信頼されていないデシリアライズ
* 無効なリダイレクト
* XPath インジェクション
* クロスサイトスクリプティング (XSS)

## 互換性要件

この機能は、各言語のトレーシングライブラリで以下のバージョン以降から利用可能です:

* **Java**: 1.45.0+
* **.NET**: 未サポート
* **Node.js**: 5.37.0+
* **Python**: 未サポート


## 例

{{% collapse-content title="Java" level="h4" %}}

### 入力バリデータ

#### すべての入力パラメータを検証してコマンドインジェクションの脆弱性を回避するメソッド

##### メソッド
`bar.foo.CustomInputValidator#validate(String input1, String input2)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate`

#### 1 つの入力パラメータを検証してコマンドインジェクションの脆弱性を回避するメソッド

##### メソッド
 `bar.foo.CustomInputValidator#validate(String input1, String inputToValidate)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1`

#### 2 つの入力パラメータを検証してコマンドインジェクションの脆弱性を回避するメソッド

##### メソッド
 `bar.foo.CustomInputValidator#validate(String input1, String firstInputToValidate, String secondInputToValidate, Object anotherInput)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1,2
`
#### 入力パラメータを検証してコマンドインジェクションとコードインジェクションの脆弱性を回避するメソッド

##### メソッド
 `bar.foo.CustomInputValidator#validate(String input)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomInputValidator:validate
`
#### 入力パラメータを検証してあらゆる脆弱性を回避するメソッド

##### メソッド
 `bar.foo.CustomInputValidator#validate(String input)`

##### 構成
`INPUT_VALIDATOR:*:bar.foo.CustomInputValidator:validate
`
#### オーバーロードされたメソッドで、入力パラメータを検証してコマンドインジェクションの脆弱性を回避する場合

##### メソッド
 `bar.foo.CustomInputValidator#validate(String input)`

 `bar.foo.CustomInputValidator#validate(String input, String input2)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:java.lang.String
`
##### 注
最初のメソッドに適用されます。


#### 入力パラメータを検証してコマンドインジェクションの脆弱性を回避するオーバーロードされたメソッド

##### メソッド
 `bar.foo.CustomInputValidator#validate(String input)`

 `bar.foo.CustomInputValidator#validate(String input, String input2)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate
`
##### 注
両方のメソッドに適用されます。

### サニタイザ

#### コマンドインジェクションの脆弱性を回避するサニタイザ

##### メソッド
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### 構成
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize
`
#### コマンドインジェクションとコードインジェクションの脆弱性を回避するサニタイザ

##### メソッド
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### 構成
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomSanitizer:sanitize
`
#### あらゆる脆弱性を回避するサニタイザ

##### メソッド
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### 構成
`SANITIZER:*:bar.foo.CustomSanitizer:sanitize
`
#### コマンドインジェクションの脆弱性を回避するためのオーバーロードされたサニタイザ

##### メソッド
 `bar.foo.CustomSanitizer#sanitize(String input)`

 `bar.foo.CustomSanitizer#sanitize(String input, String input2)`

##### 構成
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize:java.lang.String
`
##### 注
最初のメソッドに適用されます。

#### コマンドインジェクションの脆弱性を回避するオーバーロードされたサニタイザ

##### メソッド
` bar.foo.CustomSanitizer#sanitize(String input)`

`bar.foo.CustomSanitizer#sanitize(String input, String input2)`

##### 構成
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize
`
##### 注
両方のメソッドに適用されます。

{{% /collapse-content %}}


{{% collapse-content title="Node.js" level="h4" %}}

### 入力バリデータ

#### コマンドインジェクションの脆弱性を回避するために、すべての入力パラメータを検証するメソッド

##### メソッド
`bar/foo/custom_input_validator.js#validate(input1, input2)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate`

#### コマンドインジェクションの脆弱性を回避するために、1 つの入力パラメータを検証するメソッド

##### メソッド
`bar/foo/custom_input_validator.js#validate(input1, inputToValidate)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate:1`

#### コマンドインジェクションの脆弱性を回避するために、2 つの入力パラメータを検証するメソッド

##### メソッド
`bar/foo/custom_input_validator.js#validate(input1, firstInputToValidate, secondInputToValidate, anotherInput)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate:1,2`

#### コマンドインジェクションとコードインジェクションの脆弱性を回避するために、入力パラメータを検証するメソッド

##### メソッド
`bar/foo/custom_input_validator.js#validate(input)`

##### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar/foo/custom_input_validator.js:validate`

#### あらゆる脆弱性を回避するために、入力パラメータを検証するメソッド

##### メソッド
`bar/foo/custom_input_validator.js#validate(input)`

##### 構成
`INPUT_VALIDATOR:*:bar/foo/custom_input_validator.js:validate`

### サニタイザ

#### コマンドインジェクションの脆弱性を回避するサニタイザ

##### メソッド
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### 構成
`SANITIZER:COMMAND_INJECTION:bar/foo/custom_input_sanitizer.js:sanitize`

#### コマンドインジェクションとコードインジェクションの脆弱性を回避するサニタイザ

##### メソッド
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### 構成
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar/foo/custom_input_sanitizer.js:sanitize`

#### あらゆる脆弱性を回避するサニタイザ

##### メソッド
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### 構成
`SANITIZER:*:bar/foo/custom_input_sanitizer.js:sanitize`

### 特殊なケース

#### エクスポートされたオブジェクト内のセキュリティコントロールメソッド
オブジェクト `validators` 内でエクスポートされているメソッド `validate` は、入力パラメータを検証してコマンドインジェクションの脆弱性を回避します。

```javascript
// bar/foo/custom_input_validator.js
module.exports = {
  validators: {
    validate: (input) => {
      /* validation process */
    }
  }
}
```

#### 構成
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validators.validate`

#### トランジティブ依存関係からのセキュリティコントロールメソッド
`npm` のフラットな依存構造により、直接依存とトランジティブ依存を区別することはできません。つまり、ある依存関係内にセキュリティコントロールが定義されている場合、その依存関係 (直接かトランジティブかを問わず) のすべてのインスタンスが影響を受けます。

次のセキュリティコントロール定義は、依存関係ツリー内にあるすべての `sql-sanitizer` パッケージに適用されます。

#### 構成
`SANITIZER:SQL_INJECTION:node_modules/sql-sanitizer/index.js:sanitize`


{{% /collapse-content %}}

[1]: /ja/security/code_security/iast/#overview