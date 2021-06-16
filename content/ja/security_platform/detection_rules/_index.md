---
title: Security Rules
kind: documentation
aliases:
  - /ja/security_monitoring/detection_rules/
further_reading:
  - link: security_monitoring/default_rules
    tag: Documentation
    text: デフォルトのセキュリティルールについて
  - link: 'https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/'
    tag: ブログ
    text: Datadog でアプリケーションの悪用を検出
---
## 概要

検出ルールは、取り込んだすべてのログおよびクラウドコンフィギュレーションに適用される条件付きロジックを定義します。対象期間内に、ルールで定義された少なくとも 1 つのケースが一致した場合に Datadog でセキュリティシグナルが生成されます。

{{< img src="security_platform/security_monitoring/detection_rules/detection_rules.png" alt="検出ルール" width="75%">}}

それぞれのモニタリングオプションに、インテグレーションコンフィギュレーションによりすぐに機能する[デフォルトの検出ルール][1]があります。

- [Security Monitoring][2]では、ログ検出を使用して、収集したログをリアルタイムで分析します。環境に合わせて[カスタムルール][3]を作成することも可能です。

- [Cloud Security Posture Management][4] では、クラウドコンフィギュレーションおよびインフラストラクチャーコンフィギュレーションルールを使用して、クラウド環境の状態をスキャンします。

- [Cloud Workload Security][5] を使用して、Datadog Agent はアクティブにシステムのアクティビティを監視し、ルールに対して評価を行います。

## ルールの作成と管理

すべての検出ルールは[セキュリティルール][6]のページから検索が可能です。これらのルールにより生成されたシグナルの有効化、無効化、編集、削除、複製、表示などをすばやく行うことができます。カスタム[セキュリティ][3]ルールを作成するには、ページ右上の **New Rule** ボタンをクリックします。

**注**: カスタムルールは、Security Monitoring でのみ利用可能です。

### ルールの検索

フリーテキスト検索を使うと、ルール名やクエリに含まれるテキストで検出ルールを絞り込むことができます。クエリが編集された場合、“Search” ボタンを再度クリックしなくてもクエリ結果がリアルタイムで更新されます。

#### ファセットで絞り込み

{{< img src="security_platform/security_monitoring/detection_rules/facets_panel.png" alt="ファセットパネル" width="75%">}}

左側のパネルのファセットを使用し、検索クエリを値でスコープします。たとえば、いくつかのルールソースがあり、1 つのソースにより提供されたルールでトラブルシューティングする必要がある場合、パネルで `cloudtrail` や `kubernetes` などのソース値の上にカーソルを合わせ、**only** をクリックして検索するソースを絞り込みます。

デフォルトではすべてのファセットが選択されています。検索からふぁあセットを削除するには、チェックボックスのマークを外します。

### ルール表

{{< img src="security_platform/security_monitoring/detection_rules/rules_table2.png" alt="ルールテーブル"  >}}

ルールはルール表に表示されます。

オプションメニューで列を追加したり削除したりできます。

検出ルールはアルファベットの昇順 (A-Z) でソートされます。名前、クエリ名、作成日、ルール ID で逆ソートしたすることも可能です。

#### ルールの有効化 / 無効化

ルールの右側にあるトグルスイッチを使ってルールを有効または無効にすることができます。

#### ルールの編集

ルールの上にカーソルを重ねて、**Edit** ボタンをクリックするとルールを編集できます。

#### ルールごとに生成されたシグナルを検索

ルールの上にカーソルを重ねて **View Generated Signals** ボタンをクリックすると、そのルールで生成されたシグナルを検索できます。

#### ルールの複製

ルールの上にカーソルを重ねて、**Clone** ボタンをクリックするとルールを複製できます。

#### ルールの削除

ルールの上にカーソルを重ねて、**Delete** ボタンをクリックするとルールを削除できます。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/security_platform/default_rules/
[2]: /ja/security_platform/security_monitoring/
[3]: /ja/security_platform/security_monitoring/log_detection_rules/
[4]: /ja/security_platform/cspm/
[5]: /ja/security_platform/cloud_workload_security/
[6]: https://app.datadoghq.com/security/configuration/rules