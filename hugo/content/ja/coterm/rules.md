---
further_reading:
- link: /coterm
  tag: documentation
  text: Datadog CoTerm
- link: /coterm/install
  tag: documentation
  text: Datadog CoTerm のインストール
- link: /coterm/usage
  tag: documentation
  text: CoTerm の使用方法
title: CoTerm の構成ルール
---

特定のコマンドを傍受した際に CoTerm が実行するアクションは、`.ddcoterm/config.yaml` ファイルの `process_config` セクションに lints と rules を追加することで設定できます。

これらの lints と rules は [Lua][1] で記述されています。構文および詳細については [Lua のドキュメント][2]を参照してください。

## Lints

{{< highlight yaml "hl_lines=5-8" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("kubectl のコンテキストが指定されていません (現在のコンテキスト: '%s')。`kubectl scale` 実行時は常にコンテキストを明示的に指定することを推奨します。", k8s_context)
          end
{{< / highlight >}}

各 `lints` の項目は文字列を返す Lua スニペットです。lints は順番に評価され、文字列が返された場合、その文字列がユーザーへの警告として表示されます:

{{< img src="coterm/linter-warning.png" alt="コマンドラインインターフェイス。ユーザーが 'kubectl scale foo' を実行しています。出力には「CoTerm からの警告: kubectl のコンテキストが指定されていません (現在のコンテキスト: 'minikube')。'kubectl scale' を実行する際は常にコンテキストを明示的に指定することを推奨します。続行しますか？ (y/n)」と表示されています。" style="width:70%;" >}}

ユーザーはその後、続行または中止を選択できます。

## ルール

{{< highlight yaml "hl_lines=5-18" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # `kubectl scale` を本番環境で実行する場合は記録し、承認を必須にする
        - rule: |
            local k8s_context = flags.context or k8s_current_context or "unknown"
            local matches = has_arg("scale") and k8s_context:match("prod")
            local user_message = "注意して実行してください。このコマンドは Kubernetes クラスター構成に影響を与える可能性があります。"
            local approver_message = "承認する前に、ユーザーがロールバック手順を記載していることを確認してください。"
            return matches, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
        # その他のすべての kubectl scale 実行については記録のみ行い、承認は不要。ユーザーや承認者へのメッセージも表示しない
        - rule: has_arg("scale")
          actions: ["record", "logs", "process_info"]
        # それ以外の kubectl コマンドは実行にほぼオーバーヘッドなしで、そのまま実行 (記録や承認は行わない)
        - rule: true
          actions: []
{{< / highlight >}}

ルールは lints よりも強力です。`rules` の各項目では、1～3 個の値を返す Lua スニペットである `rule` と、CoTerm が実行するアクションを指定する `actions` を設定します。

### ルールの返り値

各 `rule` は `boolean, [string], [string]` の 1～3 つの値を返します。

1. (必須) ブール値: ルールがマッチしたかどうか。
2. (オプション) ユーザー向けのメッセージ。ユーザーに追加の文脈を提供するためのもので、最初の戻り値が `true` の場合にのみ表示されます。
3. (オプション) 承認者向けのメッセージ。最初の戻り値が `true` で、対応する `actions` フィールドに `approval` が含まれている場合、Datadog 上の承認リクエスト画面に表示されます。

### アクション

`rule` が `true` を返した場合、CoTerm は以下のアクションを実行できます:

- `record`: ターミナルセッションを記録して Datadog に送信します。
- `logs`: Datadog ログを生成し、ターミナル出力を検索可能なスナップショットとして残します。
- `process_info`: ターミナルセッション内で起動されたすべてのプロセスを記録し、各プロセスに対してイベントを生成します。
- `approval`: コマンドを実行する前に承認を必須とします。
- `incidents`: ユーザーが対応している [Datadog Incident][6] があれば、録画内容をそのインシデントに関連付けます。インシデントが複数ある場合は、どれに関連付けるかをユーザーに選択させます。

`rule` が `true` でも、コマンドの実行以外のアクションを取りたくない場合は、`actions: []` を設定してください。

### ルールの評価

ルールは順番に評価され、最初に `true` を返したルールで指定されたアクションだけが実行されます。それ以降のルールは評価されません。

## アクションの優先順位

CoTerm に実行させるアクションは複数の方法で指定できます。CoTerm は以下の優先順位に従って、どのアクションを実行するかを決定します。

1. **CLI フラグ**: `--save-level` や `--approval` のように CLI フラグでアクションを指定した場合、CoTerm はそれらのアクションだけを実行します。これはその他のすべての設定よりも優先されます。
2. **Lua 設定ファイル**: CLI フラグによるアクション指定がない場合に、`.ddcoterm/config.yaml` の Lua ルールが `true` を返すと、最初に `true` を返したルールで指定されたアクションが実行されます。これは CLI フラグ以外のすべての設定を上書きします。
3. **`process_config.default_actions`**: CLI フラグによる指定がなく、Lua ルールもマッチしない場合、`.ddcoterm/config.yaml` の `process_config.default_actions` に指定されているアクションがあれば実行します。
4. **デフォルトアクション**: CLI フラグの指定もなく、Lua ルールもマッチせず、かつ `process_config.default_actions` が設定されていない場合、CoTerm は `["record", "logs", "process_info"]` を実行します。

## Lua 実行環境とヘルパー関数

すべての Lua スニペットはサンドボックス化された [Luau][3] ランタイムで実行されます。CoTerm は以下の変数や関数をランタイムに注入します:

### グローバル変数

`executable` - 文字列
: コマンドの実行ファイル名。<br/>たとえば `kubectl foo bar` の場合、`executable` は `kubectl` になります。

`args` - 配列
: コマンドの引数。<br/>たとえば `kubectl foo --bar=baz` の場合、`args` は `["foo", "--bar=baz"]` になります。

`flags` - テーブル
: コマンドに含まれる `--` 形式のキーと値を保持する[テーブル][4]です。<br/>たとえば `command foo --bar baz` や `command foo --bar=baz` であれば、`flags` には `bar` を `key`、`baz` を `value` とするエントリ (`flags.bar = baz`) が含まれます。

`k8s_current_context` - 文字列
: `~./kube/config` の `current-context` に設定された値。見つからない場合は `k8s_current_context` は [nil][5] になります。

### ヘルパー関数

`has_arg(<string>)`
: 指定した文字列が引数に含まれている場合は `true` を返します。<br/>たとえば `kubectl foo bar` で `has_arg("bar")` を呼び出すと `true` になります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Lua_(programming_language)
[2]: https://lua.org/docs.html
[3]: https://luau.org/
[4]: https://www.lua.org/pil/2.5.html
[5]: https://www.lua.org/pil/2.1.html
[6]: /ja/service_management/incident_management/