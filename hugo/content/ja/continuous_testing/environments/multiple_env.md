---
description: Continuous Testing を使用して、同じ Synthetic テスト シナリオを複数の環境で再利用する方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: ブログ
  text: Datadog Continuous Testing のテストを CI/CD パイプラインに組み込む
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: ブログ
  text: Datadog の testing tunnel と private locations を使用して社内アプリケーションをテストする
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: ドキュメント
  text: プロキシ、ファイアウォール、または VPN を使用しながらテストする方法について学ぶ
title: 複数の環境をテストする
---

## 概要

Continuous Testing では、本番環境でスケジュールされたテストの同じシナリオを、開発環境やステージング環境にも適用できます。Continuous Testing は、開発サイクル全体で Synthetic テストを使用し、リグレッションをできるだけ早く検出できるようにします。

CI テストのトリガー時に、[ブラウザ][1] または [API テスト][2] の開始 URL を上書きして、Synthetic Worker を適切な環境にルーティングできます。これにより、同じテストを本番環境とステージング環境の両方で使用できます。

[ブラウザ テスト][1] の場合、テスト実行中に `resourceUrlSubstitutionRegexes` を使って、リソース URL の一部をリダイレクトすることもできます。これにより、現在のブランチのフロントエンド アセットをプロダクション バックエンドに対してテストできます。また、API 呼び出しの一部 (ドメインまたはパスに一致するもの) を、変更が含まれるステージング環境にルーティングしつつ、その他のリクエストは本番環境で処理させることもできます。

## ステージング環境で本番テストを使用する

### 開始 URL を上書きする

Synthetic ブラウザ テストは、開始 URL に移動してテスト シナリオを開始します。同様に、API HTTP テストは特定の URL にリクエストを送信します。CI テストをトリガーするとき、この開始 URL を上書きして、アプリケーションがデプロイされている別の環境を指すようにできます。

{{< img src="continuous_testing/starting_url_substitution.png" alt="Continuous Testing トンネルにより、Synthetics Worker がプライベート アプリケーションに到達できる" width="100%" >}}

CI テストをトリガーする際、`startUrl` フィールドを使うと、ブラウザ テストが最初に遷移する URL、または HTTP テストのリクエストで使用される URL を上書きできます。このオプションは、グローバル設定ファイル、Synthetic Monitoring 構成ファイル (`*.synthetics.json`)、またはコマンド ライン フラグ `--override startUrl=<STARTURL>` で指定できます。

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrl="https://staging.my-app.com"
```

このオプションにより、対象が公開されている限り、同じテスト シナリオを本番環境とその他の開発環境 (例: ステージング) の両方で再利用できます。[プライベート環境][4] に対するテスト方法については、[プロキシ、ファイアウォール、または VPN を使用しながらのテスト][3] を参照してください。

### 開始 URL を部分的に変更する

テストの一部がホーム ページや同様にシンプルな URL から始まる場合、前述の解決策で問題ありませんが、すべてのユース ケースをカバーできるわけではありません。開始 URL を無分別に置き換えると、シナリオがテストすべき URL のパスや、特定の検索クエリ パラメーターが意図せず失われる可能性があります。

`startUrlSubstitutionRegex` フィールドを使うと、開始 URL を完全に上書きすることなく、開始 URL の一部のみを変更できます。このオプションは、指定した正規表現に基づいて既定の開始 URL の一部を置換します。

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrlSubstitutionRegex="<regex>|<rewriting-rule>"
```

このフィールドは、パイプ文字 `|` で区切られた 2 つの部分を含む文字列を受け取ります:

`<regex>|<rewriting-rule>`
- `<regex>`: 既定の開始 URL に適用する正規表現 (regex)
- `<rewriting-rule>`: URL を書き換えるための表現

#### 例 1

次の `<regex>|<rewriting-rule>` 文字列を考えてみます:

```shell
https://prod.my-app.com/(.*)|https://staging.my-app.com/$1
```

この正規表現は、キャプチャ グループを使用して URL のパスを取得します。リライト ルールは、`staging.my-app.com` を指す同様の URL を生成し、`$1` を使ってキャプチャしたグループを付加します。例えば、URL `https://prod.my-app.com/product-page?productId=id` が与えられた場合、`https://staging.my-app.com/product-page?productId=id` に書き換えられます。

#### 例 2

次の `<regex>|<rewriting-rule>` 文字列を考えてみます:

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

このオーバーライドにより、URL `https://my-app.com/some/path` は `https://<deployment-prefix>.my-app.com/some/path` に書き換えられます。
URL パスは置換用の正規表現の一部ではないため、書き換えの影響は受けない点に注意してください。

<div class="alert alert-info">
上で示したパイプ <code>|</code> 構文に加えて、<code>startUrlSubstitutionRegex</code> は sed 構文 <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifiers&gt;</code> もサポートします。</br></br>
sed 構文はスラッシュ <code>/</code> を区切り文字として使用するため、URL のスラッシュをエスケープする必要が生じ、エラーになりやすい場合があります。regex 修飾子が必要な場合を除き、Datadog は可読性の観点からパイプ <code>|</code> 構文の使用を推奨します。
</div>

このツールを使用すると、本番環境で使用している任意のスケジュール済みテストを、開発環境を指すように再利用できます。

## 既存の環境に変更を導入する

### リソース URL を変更する

開始 URL の変更に加えて、`resourceUrlSubstitutionRegexes` オーバーライドを使用して、その後のすべてのリソース リクエストの URL も変更できます。このオプションは、指定した正規表現に基づいてリソース URL の一部を置換します。

これにより、メインの環境から独立してアプリケーションの一部をテストできます。メイン ページは引き続き `startUrl` で指定された環境から配信されますが、`resourceUrlSubstitutionRegexes` の最初の regex に一致する各リクエストは、CI パイプラインをトリガーしたブランチの変更のみをホストする別の環境へリダイレクトできます。

For example: if your frontend JavaScript assets are located under the path `https://prod.my-app.com/resources/chunks/*`, you can use `resourceUrlSubstitutionRegexes` to redirect all JavaScript assets requests to `https://staging.my-app.com/resources/chunks`—while main page and all API calls continue to be served by `prod.my-app.com`. Similarly, if you want to test the service behind the endpoints `https://prod.my-app.com/api/my-service`, you can redirect these API calls to `https://staging.my-app.com/api/my-service` to test this service in isolation with the production frontend.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override resourceUrlSubstitutionRegexes="<regex1>|<rewriting-rule1>" \
  --override resourceUrlSubstitutionRegexes="<regex2>|<rewriting-rule2>"
```

`resourceUrlSubstitutionRegexes` フィールドは、パイプ文字 `|` で区切られた 2 つの部分を含む文字列を受け付けます:

`<regex>|<rewriting-rule>`
- `<regex>`: リソース URL に適用する正規表現 (regex)
- `<rewriting-rule>`: URL を書き換えるための表現

#### 例 1

次の `<regex>|<rewriting-rule>` 文字列を考えてみます:

```
https://prod.my-app.com/assets/(.*)|https://staging.my-app.com/assets/$1
```

regex `https://prod.my-app.com/assets/(.*)` は、キャプチャ グループを使用してリソース URL のパスを取得します。

リライト ルール `https://staging.my-app.com/assets/$1` は、`staging.my-app.com` を指す同様の URL を生成し、`$1` を使ってキャプチャしたグループを付加します。

その結果、URL `https://prod.my-app.com/assets/js/chunk-123.js` は `https://staging.my-app.com/assets/js/chunk-123.js` に書き換えられます。

#### 例 2

次の `<regex>|<rewriting-rule>` 文字列を考えてみます:

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

このオーバーライドにより、URL `https://my-app.com/some/path` は `https://<deployment-prefix>.my-app.com/some/path` に書き換えられます。URL パスは置換用の正規表現の一部ではないため、書き換えの影響は受けません。

<div class="alert alert-info">
<code>resourceUrlSubstitutionRegexes</code> は、<code>startUrl</code> および <code>startUrlSubstitutionRegex</code> と同様に、最初のリクエストにも適用されます。
</div>

<div class="alert alert-info">
上で示したパイプ <code>|</code> 構文に加えて、<code>resourceUrlSubstitutionRegexes</code> は sed 構文 <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifiers&gt;</code> もサポートします。</br></br>
この構文はスラッシュ <code>/</code> 区切りを使用するため、URL のスラッシュをエスケープする必要が生じ、エラーになりやすい場合があります。regex 修飾子が必要な場合を除き、Datadog は可読性の観点からパイプ <code>|</code> 構文の使用を推奨します。
</div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/api_tests/
[3]: /ja/continuous_testing/environments/proxy_firewall_vpn
[4]: /ja/synthetics/private_locations