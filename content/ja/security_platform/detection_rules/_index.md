---
aliases:
- /ja/security_monitoring/detection_rules/
- /ja/cloud_siem/detection_rules/
further_reading:
- link: /cloud_siem/default_rules
  tag: Documentation
  text: デフォルトの検出ルールについて
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: ブログ
  text: Datadog でアプリケーションの悪用を検出
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: ブログ
  text: 不可能な旅行検出ルールで不審なログイン行為を検出する
kind: documentation
title: 検出ルール
---

## 概要

検出ルールは、取り込んだすべてのログおよびクラウドコンフィギュレーションに適用される条件付きロジックを定義します。対象期間内に、ルールで定義された少なくとも 1 つのケースが一致した場合に Datadog でセキュリティシグナルが生成されます。

それぞれのモニタリングオプションに、インテグレーションコンフィギュレーションによりすぐに機能する[デフォルトの検出ルール][1]があります。

- [Cloud SIEM][2] では、ログ検出を使用して、収集したログをリアルタイムで分析します。環境に合わせて[カスタム検出ルール][3]を作成することも可能です。

- [Cloud Security Posture Management][4] では、クラウドコンフィギュレーションおよびインフラストラクチャーコンフィギュレーション検出ルールを使用して、クラウド環境の状態をスキャンします。

- [Cloud Workload Security][5] を使用して、Datadog Agent はアクティブにシステムのアクティビティを監視し、検出ルールに対して評価を行います。

- [アプリケーションセキュリティモニタリング][6] (ASM) は、Datadog [APM][7]、[Datadog Agent][8]、検出ルールを活用し、アプリケーション環境における脅威を検出します。

## 検出ルールの作成と管理

[Detection Rules][9] ページでは、ルールの種類別にすべての検出ルールを検索することができます。ルールの有効化、無効化、編集、削除、クローン化が素早く行えます。カスタムの[検出ルール][3]を作成するには、ページの右上にある **New Rule** ボタンをクリックします。

### 検出ルールの発見

フリーテキスト検索を使うと、ルール名やクエリに含まれるテキストで検出ルールを絞り込むことができます。クエリが編集された場合、“Search” ボタンを再度クリックしなくてもクエリ結果がリアルタイムで更新されます。

#### ファセットで絞り込み

左側のパネルにあるファセットを使用して、検索クエリを値によってスコープします。例えば、`log detection` や `cloud configuration` など、いくつかのルールタイプがある場合、`only` でフィルタリングすると、ルールタイプ別にルールが表示されます。

{{< img src="security_platform/security_monitoring/detection_rules/rule_type_filter.png" alt="Datadog のログ検出やクラウド構成など、ルールタイプ別のフィルタリング" >}}

また、`source` や `severity` などのファセットでフィルタリングすることもでき、受信した問題の調査やトリアージに役立てることができます。カテゴリー内のすべてのファセットを検索に含めるには、パネル内の値の上にマウスカーソルを置き、**all** をクリックします。

**注**: デフォルトでは、すべてのファセットが選択されています。

### ルール表

ルールは、検出ルール表に表示されます。テーブルの右上にある **Sort by** オプションをクリックすると、テーブルを並べ替えることができます。たとえば、**Highest Severity** でソートすると、影響の大きい構成ミスや脅威をトリアージできます。

オプションメニューで列を追加したり削除したりできます。

#### ルールの有効化 / 無効化

ルールの右側にあるトグルスイッチを使ってルールを有効または無効にすることができます。

#### ルールと生成されたシグナルのオプション

ルールトグルの隣にある 3 点ドットメニューをクリックし、提供されているオプション (編集、複製、削除、生成された信号の表示) のいずれかを選択します。

- クエリの更新、トリガーの調整、通知の管理、ルール設定の調整を行う場合は、編集をクリックします。
  -  **注**: Out-of-the-box (OOTB) ルールを編集するには、まずルールを複製し、その後ルールを変更する必要があります。デフォルトのルールを編集するには、**Edit** をクリックし、ルール構成ページの一番下までスクロールします。**Clone** をクリックし、ルールを変更します。
- ルールの複製は、既存のルールを複製して軽く設定を変更し、他の検出領域をカバーしたい場合に便利です。例えば、ログ検出ルールを複製し、**Threshold** から **Anomaly** に変更することで、同じクエリとトリガーを使用して脅威検出に新しい次元を追加することができます。
- 削除オプションは、カスタムルールに対してのみ利用可能です。Out-of-the-box (OOTB) ルールはプラットフォームにネイティブなものなので、削除することはできません。カスタムルールを永久に削除するには、**Delete** をクリックします。OOTB ルールを無効にするには、無効化トグルをクリックします。
- **View generated signals** をクリックすると、[シグナルエクスプローラー][6]に移動し、ルールの ID でクエリを実行できます。これは、ルールごとに複数のソースのシグナルを相関させる場合や、ルールの監査を完了させる場合に便利です。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/security_platform/default_rules/
[2]: /ja/security_platform/cloud_siem/
[3]: /ja/security_platform/cloud_siem/log_detection_rules/
[4]: /ja/security_platform/cspm/
[5]: /ja/security_platform/cloud_workload_security/
[6]: /ja/security_platform/explorer/
[7]: /ja/tracing/
[8]: /ja/agent/
[9]: https://app.datadoghq.com/security/configuration/rules