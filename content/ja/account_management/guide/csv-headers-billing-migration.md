---
further_reading:
- link: /account_management/plan_and_usage/
  tag: ドキュメント
  text: 計画と使用設定
kind: ガイド
title: 2023 年 9 月 18 日の週より新 Plan & Usage CSV ヘッダーに移行
---
2023 年 9 月 18 日の週に、Plan & Usage CSV ファイルのサブセットのヘッダーが更新されます。この更新により、CSV ファイルの使用量とアプリ内で表示される使用量データが一致します。CSV には、使用量がゼロでないレコードのみが含まれます。

Billing and Usage からダウンロードしたファイルの CSV ヘッダーに依存するオートメーションがある場合、これらのヘッダーが変更されるため、オートメーションを更新する必要があります。以下は、変更が行われる 2 つのセクションで、移行をサポートするために新しい CSV ヘッダーの例が含まれています。

## 個別組織概要

1. [ヘッダーマッピング][1]
2. CSV のダウンロード先:

{{< img src="account_management/individual-orgs-summary-csv.jpg" alt="個別組織概要で CSV をダウンロードする" >}}

## 使用量の傾向

1. [ヘッダーマッピング][2]
2. CSV のダウンロード先:

{{< img src="account_management/usage-trends-csv.jpeg" alt="使用量の傾向で CSV をダウンロードする" >}}


[1]: /ja/account_management/guide/csv_headers/individual-orgs-summary/
[2]: /ja/account_management/guide/csv_headers/usage-trends/