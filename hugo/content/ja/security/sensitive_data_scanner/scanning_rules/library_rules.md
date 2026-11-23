---
aliases:
- /ja/sensitive_data_scanner/library_rules/
- /ja/sensitive_data_scanner/scanning_rules/library_rules
description: メールアドレス、クレジットカード番号、API キー、認証情報、IP アドレス、その他の機密パターンをログ、APM、RUM、クラウドストレージ全体で検出するための
  Sensitive Data Scanner の定義済みルールライブラリを参照します。
further_reading:
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner のセットアップ
title: Sensitive Data Scanner ライブラリルール
---
## 概要{#overview}
スキャンルールライブラリとは、メールアドレスやクレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するための、あらかじめ定義されたルールをまとめたコレクションです。ライブラリルールが作成されると、推奨キーワードがデフォルトで使用されます。

これらのルールは Datadog でも確認することができます。

1. [Sensitive Data Scanner][1] に移動します。
1. ページ右上の [{{< ui >}}Scanning Rules Library{{< /ui >}}] をクリックします。
1. ライブラリからスキャングループにルールを追加するには:<br />
   1. 追加したいルールを選択します。<br />
   1. [{{< ui >}}Add Rules to Scanning Group{{< /ui >}}] (ルールをスキャングループに追加) をクリックします。<br />
   1. [Sensitive Data Scanner のセットアップ][2]の手順に従い、設定を完了します。

<div class="alert alert-info">ほとんどのライブラリルールは、すべてのデータソース (ログ、APM、RUM、Agent Observability、Observability Pipelines、Secret Scanning、クラウドストレージ) で使用できます。[<b>Available For</b>] (利用可能) 列をチェックして、各ルールがどのデータソースをサポートしているかを確認してください。</div>

{{< multifilter-search resource="sds_rules" >}}


## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /ja/security/sensitive_data_scanner/?#add-scanning-rules