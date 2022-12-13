---
further_reading:
- link: /security_platform/default_rules
  tag: ドキュメント
  text: デフォルトの Posture Management クラウド構成検出ルールを調べる
- link: /security_platform/cspm/frameworks_and_benchmarks
  tag: ガイド
  text: フレームワークおよび業界のベンチマークの詳細
is_beta: true
kind: ガイド
title: Rego によるカスタムルールの作成
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
このサイトでは、クラウドセキュリティポスチャ管理は利用できません。
</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true">}}
カスタム CSPM ルールの作成と使用は、Google Cloud Platform (GCP) のみで利用可能なベータ機能です。
{{< /beta-callout >}} 


## 概要

Open Policy Agent (OPA) は、クラウドのセキュリティポスチャを決定するための多彩なリソース検査機能を備えたオープンソースのポリシー言語である [Rego][1] を提供しています。Datadog では、Rego を使用してカスタムルールを記述し、インフラストラクチャーのセキュリティを制御することができます。

## テンプレートモジュール

ルールの定義は、[モジュール][3]の内部で定義された Rego [ポリシー][2]から始まります。Datadog CSPM では、以下のようなモジュールテンプレートを使用して、ルールの記述を簡素化しています。

```python
package datadog

import data.datadog.output as dd_output

import future.keywords.contains
import future.keywords.if
import future.keywords.in

eval(resource_type) = "skip" if {
    # リソースをスキップする場合に true と評価されるロジック
} else = "pass" {
    # リソースが準拠している場合に true と評価されるロジック
} else = "fail" {
    # リソースが非準拠の場合に true と評価されるロジック
}

# この部分は、すべてのルールで変更されません
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}

```

このモジュールの各パーツをよく見て、その仕組みを理解してください。

### インポートステートメント

最初の行は `package datadog` という宣言を含んでいます。[パッケージ][4]は Rego のモジュールを一つのネームスペースにグループ化し、モジュールを安全にインポートすることを可能にします。現在のところ、ユーザーモジュールのインポートはカスタムルールの機能ではありません。すべてのポスチャ管理ルールは、`datadog` ネームスペースの下にまとめられています。結果を正しく返すために、ルールは `package datadog` ネームスペースの下にグループ化してください。

```python
import future.keywords.contains
import future.keywords.if
import future.keywords.in
```

次の 3 つのステートメントは、OPA が提供するキーワード [`contains`][5]、[`if`][6]、[`in`][7] をインポートしています。これらのキーワードは、可読性を高めるために、より表現力豊かな構文でルールを定義することを可能にします。**注:** `import future.keywords` で全てのキーワードをインポートすることは[推奨しません][8]。

```python
import data.datadog.output as dd_output
```

次の行では、Datadog のヘルパーメソッドをインポートして、Datadog のポスチャ管理システムの仕様に合わせて結果をフォーマットしています。`datadog.output` は Rego モジュールで、最初の引数にリソース、2 番目の引数にリソースの検査結果を表す `pass`、`fail`、`skip` という文字列を指定するフォーマットメソッドを持っています。

### ルール

インポートステートメントの後に、テンプレートモジュールの最初のルールが来ます。

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "pass" {
    resource.should_pass
} else = "fail" {
    true
}
```

ルールはリソースを評価し、リソースの状態に応じて結果を文字列として提供します。`pass`、`fail`、`skip` の順番は、必要に応じて変更することができます。上記のルールでは、リソースに `skip_me` と `should_pass` が false または存在しない場合、 `fail` がデフォルトとして設定されています。また、`pass` をデフォルトにすることもできます。

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "fail" {
    resource.should_fail
} else = "pass" {
    true
}
```

### 結果

テンプレートモジュールの最後のセクションは、結果のセットを構築します。

```python
# この部分は、すべてのルールで変更されません
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

このセクションでは、メインリソースタイプからすべてのリソースを通過させ、それらを評価します。これは、ポスチャ管理システムで処理される結果の配列を作成します。[some][9] キーワードはローカル変数 `resource` を宣言し、これはメインリソースの配列から取得されます。`eval` ルールは各リソースに対して実行され、`pass`、`fail`、または `skip` を返します。`dd_output.format` ルールは、リソースと評価結果をクラウドセキュリティで処理できるように正しくフォーマットします。

ポリシーのこのセクションは、変更する必要はありません。代わりに、ルールの複製時に **Choose your main resource type** ドロップダウンでメインリソースの種類を選択すると、ポリシーのこのセクションに挿入されます。また、`some_resource_type` を `gcp_iam_policy` など、選択したメインリソースの種類に置き換えて、`input.resources.some_resource_type` を通じてリソースの配列にアクセスすることができます。

## その他のルールの書き方

このテンプレートは、カスタムルールを書き始めるのに役立ちます。このテンプレートに従わなければならないわけではありません。既存のデフォルトルールを複製することもできますし、ゼロから独自のルールを作成することもできます。ただし、ポスチャ管理システムが結果を解釈するためには、Rego モジュールの中で `results` という名前で、次のようなフォーマットで記述する必要があります。

```json
[
    {
        "result": "pass" OR "fail" OR "skip",
        "resource_id": "some_resource_id",
        "resource_type": "some_resource_type"
    }
]
```

## より複雑なルール 

上記のルール例では、リソースに含まれる `should_pass` のような基本的な真偽フラグを評価します。論理的な `OR` を表現するルールを考えてみましょう。例:

```python
bad_port_range(resource) {
    resource.port >= 100
    resource.port <= 200
} else {
    resource.port >= 300
    resource.port <= 400
}
```

このルールは、`port` が `100` と `200` の間、または `300` と `400` の間である場合に true と評価されます。このために、`eval` ルールを以下のように定義します。

```python
eval(resource) = "skip" if {
    not resource.port
} else = "fail" {
    bad_port_range(resource)
} else = "pass" {
    true
}
```

これは、リソースに `port` 属性がない場合はスキップし、2 つの "bad" 範囲のいずれかに当てはまる場合は失敗します。

ルールの中で、複数のリソースタイプを調べたい場合があります。これを行うには、**Advanced Rule Options** のドロップダウンで、いくつかの関連するリソースタイプを選択します。関連リソースの配列には、`input.resources.related_resource_type` を使ってアクセスできます (`related_resource_type` は、アクセスしたい関連リソースに置き換えてください)。

複数のリソースタイプに対してポリシーを記述する場合、各メインリソースに対して関連するリソースタイプのすべてのインスタンスをループするのは時間がかかる場合があります。次の例を見てみましょう。

```python
eval(iam_service_account) = "fail" if {
    some key in input.resources.gcp_iam_service_account_key
    key.parent == iam_service_account.resource_name
    key.key_type == "USER_MANAGED"
} else = "pass" {
    true
}

# この部分は、すべてのルールで変更されません
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

このルールは、`gcp_iam_service_account_key` のインスタンスが `gcp_iam_service_account` (メインリソースの種類として選択したリソース) にマッチし、ユーザーが管理しているものがあるかどうかを判断します。サービスアカウントがユーザー管理されているキーを持っている場合、`fail` という結果が出ます。`eval` ルールはすべてのサービスアカウントに対して実行され、すべてのサービスアカウントのキーをループしてアカウントにマッチするものを探します。その結果、計算量は `O(MxN)` となります。ここで、M はサービスアカウント数、N はサービスアカウントキーの数です。

時間計算量を大幅に改善するために、ユーザーが管理するキー親の[集合][10]を[集合内包][11]で構築します。

```python
user_managed_keys_parents := {key_parent |
    some key in input.resources.gcp_iam_service_account_key
    key.key_type == "USER_MANAGED"
    key_parent = key.parent
}
```

サービスアカウントーにユーザが管理するキーがあるかどうかを調べるには、`O(1)` 時間に集合をクエリしてください。

```python
eval(iam_service_account) = "fail" if {
    user_managed_keys_parents[iam_service_account.resource_name]
} else = "pass" {
    true
}
```

新しい時間計算量は `O(M+N)` です。Rego は集合、オブジェクト、配列の[内包][12]を提供し、クエリを作成するための[複合値][13]の構築を支援します。

## 詳細はこちら

ルール、モジュール、パッケージ、内包の詳細や、カスタムルールの書き方については、 [Rego ドキュメント][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/latest/#rego
[2]: https://www.openpolicyagent.org/docs/latest/policy-language/
[3]: https://www.openpolicyagent.org/docs/latest/policy-language/#modules
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/#packages
[5]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordscontains
[6]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsif
[7]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsin
[8]: https://www.openpolicyagent.org/docs/latest/policy-language/#future-keywords
[9]: https://www.openpolicyagent.org/docs/latest/policy-language/#some-keyword
[10]: https://www.openpolicyagent.org/docs/latest/policy-language/#sets
[11]: https://www.openpolicyagent.org/docs/latest/policy-language/#set-comprehensions
[12]: https://www.openpolicyagent.org/docs/latest/policy-language/#comprehensions
[13]: https://www.openpolicyagent.org/docs/latest/policy-language/#composite-values