---
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: ドキュメント
  text: カスタム スキャン ルール用の正規表現
title: ログ内の Universally Unique Identifier (UUID) のマスキング
---

## 概要

このガイドでは、正規表現 (regex) パターンを使用してカスタム スキャン ルールを作成し、Universally Unique Identifier (UUID) を照合してマスキングする方法について説明します。たとえば、所属する組織において、内部での識別のために UUID を使用し、追加で次のようなユーザー情報を付加している場合もあるでしょう。
- ユーザー ID
- 部署コード
- ステータス コード

内部ユーザーが UUID とユーザー ID を公開せずにこれらのログにアクセスできるようにしたい場合は、カスタム スキャン ルールを作成して情報をマスキングすることができます。

## UUID 照合のためのカスタム ルールの設定

このガイドでは、内部識別子の例として `01e2402104ca99-8641-43ba-b499-642610-0012` を使用します。
- `01e2402104ca99-8641-43ba-b499` が UUID です。
- `6462610` は、ID をバイト形式で表す 6 桁の値です。
- `0012` は、ユーザーの 2 桁の部署コードと 2 桁のステータス コードを合わせたものです。
    - `00` はアクティブ ユーザーに使用されます。
    - `12` は部署コードです。

この例では、識別子の例 (`01e2402104ca99-8641-43ba-b499-642610-0012`) をそのままの形式で照合した後、以下の処理を行います。
- UUID、ユーザー ID、バイト形式の ID をマスキングする。
- ただし、ユーザーの部署コードとステータス コードはマスキングしない。

次の基本的な正規表現を使って、マスキングしたい UUID とユーザー ID を照合することができます。

```
[a-z0-9]{14}-\d{4}-[a-z0-9]{4}-[a-z0-9]{4}-\d{6}
```

1. [Sensitive Data Scanner 設定][1]ページに移動します。
1. **Add** をクリックし、**Add Scanning Rule** を選択します。
1. **Custom Rule** をクリックします。
1. このルールを追加したいスキャン グループを選択します。
1. ルールの名前を入力します。
1. ルールの優先順位を選択します。
1. ルールの説明を入力します。
1. **Match conditions** セクションで、正規表現フィールドに `[a-z0-9]{14}-\d{4}-[a-z0-9]{4}-[a-z0-9]{4}-\d{6}` を入力します。
    {{< img src="sensitive_data_scanner/guides/regex_text_matched.png" alt="UUID とユーザー ID が一致していることを示す正規表現のテスト セクション" style="width:100%;" >}}
1. キーワード辞書を使用して、検出精度を向上させ、誤検出を回避します。この例では、`user` という単語から 10 文字以内で一致させます。
    1. キーワードとして `user` を入力します。
    1. **Characters before match** には `10` を入力します。
1. この例では、**Action on Match** セクションを次のように設定します。
1. イベントをどの程度スキャンするかについては、**Entire Event** を選択します。Grok Parser を使用してログを解析している場合は、特定の属性でスキャンできます。
    1. 一致した場合のアクションは、**Redact** を選択します。
    1. 置換後のテキストに `[removed]` を入力します。
    1. **Add tags** フィールドに `matched_on:user_id` を入力します。
1. **Add rule** をクリックします。

例として、UUID のさまざまな構成要素を含む次のログが Datadog に送信された場合:

```
2024-11-14 14:20:22 INFO [transaction-logger] 200 OK shoe:200.000, pen:42.95. iron, 221.55, tasty-sandwich:10.95, big-coffee:11.95, user.name:fred91, user.id:01e2402104ca99-8641-43ba-b499-642610-0012, user.email:fred.jones@scooby.com function:transaction-complete.js, payment.ccn:1111-1111-1111-1111, payment.ccexp:10/30}
```

結果は、`user.id` がマスキングされ、`[removed]` に置き換えられます。

{{< img src="sensitive_data_scanner/guides/redacted_log.png" alt="UUID とユーザー ID がマスキングされ、`removed` に置き換えられたログ イベントの様子" style="width:100%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration