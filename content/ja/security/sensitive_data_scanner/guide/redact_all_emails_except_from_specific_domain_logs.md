---
aliases:
- /ja/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs
disable_toc: false
further_reading:
- link: /sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner のセット アップ
title: ログで特定のドメイン以外のすべてのメール アドレスをマスクする
---

## 概要

このガイドでは、ログ内のメール アドレスを、特定のメール ドメイン (例: `@test.com`) からのものを除いてすべてマスクする方法を説明します。

## ログ パイプラインに Grok Parser を設定する

マスク対象外にしたいメール ドメインが既存のログ属性として存在しない場合は、すべてのログからそのメール ドメインを識別して属性として追加できるよう、Grok Parser を設定します。

1. [Log Pipeline][1] に移動します。
1. パイプラインを選択します。
1. **Add processor** をクリックします。
1. **Grok Parser** を選択します。
1. Grok Parser の名前を入力します。
1. メール アドレスを含むすべてのログを識別するためのパース ルールを定義します。たとえば、このドメインのメール アドレスを含むログ メッセージがある場合:
    ```
    message successfully sent to 123@test.com
    ```
    ```
    message successfully received from 256@test.com
    ```
    次のパース ルールを使用します:
    ```
    MyParsingRule1 message successfully sent to %{notSpace:user_handle}@%{notSpace:domain}

    MyParsingRule2 message successfully received from %{notSpace:user_handle}@%{notSpace:domain}
    ```
    **注:** ユーザー名を保持する必要はありません。たとえば、ドメイン `test.com` を持つすべてのメールをマスクしたい場合、`hello@test.com` のようなメール アドレスでは、ユーザー名 `hello` は破棄し、ドメイン `test.com` のみを保持します。
1. **Save** をクリックします。

新しく取り込まれるログで該当のメールが期待どおりに処理されていることを確認するため、[Log Explorer][2] に移動します。

{{< img src="sensitive_data_scanner/guides/domain_attribute.png" alt="ログのサイド パネルに表示された domain 属性" style="width:80%;" >}}

## メール ドメイン属性をファセットとして追加する

1. [Log Explorer][2] で、指定したドメインのメールを含むログを選択します。
1. 作成した domain 属性の横にある歯車アイコンをクリックします。
1. **Create facet for...** を選択します。
1. 必要に応じて、**Advanced Options** セクションでファセットをグループに追加します。
1. **Add** をクリックします。

## Sensitive Data Scanner の scanning group を構成して、ドメイン属性を持つログを除外する

作成したドメイン属性を持つログを除外するように Sensitive Data Scanner の scanning group を更新し、指定したメール ドメインを持たないログだけがマスクされるようにします。

1. Sensitive Data Scanner の [Configuration][3] ページに移動します。
1. 更新したい scanning group の左側にある鉛筆アイコンをクリックします。
1. **Filter** フィールドにドメイン属性を追加して、その属性を持つログを除外します。たとえば、メール ドメイン `test.com` のログを除外するには、フィルター クエリに `-@domain:test.com` を追加します。
{{< img src="sensitive_data_scanner/guides/scanning_group_filter_domain.png" alt="scanning group のフィルター クエリ例: -@domain:test.com" style="width:100%;" >}}
1. **Update** をクリックします。

新しく取り込まれるログで、指定したドメインのメールがマスクされていないことを確認するため、[Log Explorer][2] に移動します。

{{< img src="sensitive_data_scanner/guides/log_explorer_domain.png" alt="Log Explorer に表示された、マスク済みのメール アドレスを含むログと、test.com のメールがマスクされていないログの例" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration