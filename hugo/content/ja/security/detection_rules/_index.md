---
aliases:
- /ja/security_monitoring/detection_rules/
- /ja/cloud_siem/detection_rules/
- /ja/security_platform/detection_rules/
- /ja/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: Documentation
  text: デフォルトの検出ルールについて
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知について
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: ブログ
  text: Datadog で機能の悪用を検出
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: ブログ
  text: 不可能な旅行検出ルールで不審なログイン行為を検出する
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: 検出ルール
---

{{< product-availability >}}

検出ルールは、取り込んだすべてのログおよびクラウド構成に適用される条件付きロジックを定義します。対象期間内に、ルールで定義された少なくとも 1 つのケースが一致した場合にセキュリティシグナルが生成されます。これらのシグナルは、[シグナルエクスプローラー][1]で確認できます。

## すぐに使える検出ルール

Datadog は、攻撃者の手法や構成ミスにフラグを立てるために、[すぐに使える検出ルール][2]を提供します。新しい検出ルールがリリースされると、構成に応じて、新規ルールが自動でお使いのアカウント、Application Security Management ライブラリ、および Agent にインポートされます。

すぐに使えるルールは、以下のセキュリティ製品で利用可能です。

- [Cloud SIEM][3] は、ログ検出を使用して、取り込まれたログをリアルタイムで分析します。
- Cloud Security Management (CSM):
    - [CSM Misconfigurations][4] では、クラウド構成およびインフラストラクチャー構成検出ルールを使用して、クラウド環境の状態をスキャンします。
    - [CSM Threats][5] は、Datadog Agent と検出ルールを使用して、システムのアクティビティを積極的に監視、評価します。
    - [CSM Identity Risks][6] は、検出ルールを使用して、クラウドインフラストラクチャーにおける IAM ベースのリスクを検出します。
- [Application Security Management][7] (ASM) は、Datadog [APM][8]、[Datadog Agent][9]、検出ルールを活用し、アプリケーション環境における脅威を検出します。

## ベータ検出ルール

Datadog のセキュリティリサーチチームは、継続的に新しいすぐに使えるセキュリティ検出ルールを追加しています。その目的は、インテグレーションやその他の新機能のリリースとともに高品質の検出を提供することですが、そのルールを一般的に利用可能にする前に、多くの場合、大規模での検出のパフォーマンスを観察する必要があります。これにより、Datadog のセキュリティリサーチは、当社の基準を満たさない検出の機会を改善したり、非推奨にしたりする時間を得ることができます。

## カスタム検出ルール

環境またはワークロードに基づいてルールをカスタマイズしたい場合もあるかもしれません。例えば、ASM を使用している場合、ビジネスが行われていない地域から機密アクションを実行するユーザーを検出する検出ルールをカスタマイズしたいと思うかもしれません。

[カスタムルールを作成](#create-detection-rules)するには、デフォルトのルールを複製してコピーを編集するか、独自のルールをゼロから作成します。

## 検出ルールの検索とフィルター

Datadog ですぐに使える検出ルールとカスタム検出ルールを表示するには、[**Security Settings**][10] ページに移動します。ルールは、各製品 (Application Security、Cloud Security Management、Cloud SIEM) の個別のページにリストされています。

ルールを検索およびフィルタリングするには、検索ボックスとファセットを使用して、値でクエリします。例えば、指定したルールタイプのルールのみを表示するには、ルールタイプにカーソルを合わせ、`only` を選択します。また、受信した問題を調査およびトリアージする際に、`source` や `severity` などのファセットでフィルタリングすることもできます。

{{< img src="security/default_detection_rules.png" alt="デフォルトとカスタムの Cloud SIEM 検出ルールが表示された Configuration ページ" width="100%">}}

## 検出ルールの作成

カスタム検出ルールを作成するには、Detection Rules ページの右上隅にある **New Rule** ボタンをクリックします。また、[既存のデフォルトルールまたはカスタムルールを複製](#clone-a-rule)してテンプレートとして使用することもできます。

詳しい手順については、以下の記事を参照してください。

- [Cloud SIEM][11]
- [ASM][12]
- [CSM Misconfigurations][13]
- [CSM Threats][14]

## 検出ルールの管理

### ルールの有効化・無効化

ルールを有効または無効にするには、ルール名の右側にあるスイッチを切り替えます。

また、ルールの一括有効化、無効化も可能です。

1. **Select Rules** をクリックします。
1. 有効化または無効化したいルールを選択します。
1. **Edit Rules** ドロップダウンメニューをクリックします。
1. **Enable Rules** または **Disable Rules** を選択します。

### ルールの編集

すぐに使える検出ルールの場合、抑制クエリの追加または編集のみが可能です。クエリの更新、トリガーの調整、通知の管理を行うには、[デフォルトのルールを複製](#clone-a-rule)して、カスタムルールのテンプレートとして使用します。その後、[デフォルトのルールを無効にする](#enable-or-disable-rules)ことができます。

- デフォルトルールを編集するには、ルールの縦 3 点メニューをクリックし、**Edit default rule** を選択します。
- カスタムルールを編集するには、ルールの縦 3 点メニューをクリックし、**Edit rule** を選択します。

### ルールの複製

ルールを複製するには、ルールの縦 3 点メニューをクリックし、**Clone rule** を選択します。

ルールの複製は、既存のルールを複製して軽く設定を変更し、他の検出領域をカバーしたい場合に便利です。例えば、ログ検出ルールを複製し、**Threshold** から **Anomaly** に変更することで、同じクエリとトリガーを使用して脅威検出に新しい次元を追加することができます。

### ルールを削除

カスタムルールを削除するには、ルールの縦 3 点メニューをクリックし、**Delete rule** を選択します。

**注**: 削除できるのはカスタムルールだけです。デフォルトのルールを削除するには、[ルールを無効にする](#enable-or-disable-rules)必要があります。

### 編集権限の制限

{{% security-products/detection-rules-granular-access %}}

### 生成されたシグナルの確認

[シグナルエクスプローラー][1]でルールのセキュリティシグナルを確認するには、縦 3 点メニューをクリックし、**View generated signals** を選択します。これは、複数のソースからのシグナルをルールごとに相関させる場合や、ルールの監査を完了させる場合に便利です。

### ルールを JSON としてエクスポート

ルールのコピーを JSON としてエクスポートするには、ルールの縦 3 点メニューをクリックし、**Export as JSON** を選択します。

## ルール非推奨

すべての検出ルールの定期的な監査を行い、忠実なシグナル品質を維持します。非推奨のルールは、改良されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

1. ルールに非推奨の日付が書かれた警告が表示されています。UI では、警告が以下に表示されます。
    - シグナルサイドパネルの **Rule Details > Playbook** セクション
    - Misconfigurations サイドパネル (CSM Misconfigurations のみ)
    - その特定のルールの[ルールエディター][10]
2. ルールが非推奨になると、ルールが削除されるまでに 15 か月の期間があります。これは、シグナルの保持期間が 15 か月であるためです。この間、UI で[ルールの複製](#clone-a-rule)を行うと、ルールを再び有効にすることができます。
3. 一度削除されたルールは、複製して再度有効にすることはできません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: /ja/security/default_rules/
[3]: /ja/security/cloud_siem/
[4]: /ja/security/cloud_security_management/misconfigurations/
[5]: /ja/security/threats/
[6]: /ja/security/cloud_security_management/identity_risks/
[7]: /ja/security/application_security/
[8]: /ja/tracing/
[9]: /ja/agent/
[10]: https://app.datadoghq.com/security/configuration/
[11]: /ja/security/cloud_siem/log_detection_rules/
[12]: /ja/security/application_security/threats/custom_rules/
[13]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[14]: /ja/security/threats/workload_security_rules?tab=host#create-custom-rules