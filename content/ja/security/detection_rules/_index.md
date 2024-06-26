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
  name: ディメンショニング
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: テストステップ
  url: /security/application_security/
title: 検出ルール
---

{{< product-availability >}}

検出ルールは、取り込まれたすべてのログとクラウド構成に適用される条件ロジックを定義します。ルールに定義されたケースに一定期間中に少なくとも 1 つ一致すると、セキュリティシグナルが生成されます。これらのシグナルは、[Signal Explorer][16] で確認できます。

## すぐに使える検出ルール

Datadog は、攻撃者のテクニックや潜在的な誤構成にフラグを立てるための[すぐに使える検出ルール][1]を提供しています。新しい検出ルールがリリースされると、構成に応じてアカウント、Application Security Management ライブラリ、Agent に自動的にインポートされます。

すぐに使えるルールは以下のセキュリティ製品で利用できます。

- [Cloud SIEM][2] は、取り込んだログをリアルタイムに分析するログ検出を使用します。
- Cloud Security Management (CSM):
    - [CSM Misconfigurations][4] では、クラウド構成およびインフラストラクチャー構成検出ルールを使用して、クラウド環境の状態をスキャンします。
    - [CSM Threats][5] は、Datadog Agent と検出ルールを使用して、システムのアクティビティをアクティブに監視・評価します。
    - [CSM Identity Risks][14] では、IAM に基づくリスクをクラウドインフラストラクチャー内で検出するために検出ルールを使用します。
- [Application Security Management][6] (ASM) は、Datadog [APM][7]、[Datadog Agent][8]、検出ルールを活用し、アプリケーション環境における脅威を検出します。

## ベータ検出ルール

Datadog のセキュリティリサーチチームは、継続的に新しいすぐに使えるセキュリティ検出ルールを追加しています。その目的は、インテグレーションやその他の新機能のリリースとともに高品質の検出を提供することですが、そのルールを一般的に利用可能にする前に、多くの場合、大規模での検出のパフォーマンスを観察する必要があります。これにより、Datadog のセキュリティリサーチは、当社の基準を満たさない検出の機会を改善したり、非推奨にしたりする時間を得ることができます。

## カスタム検出ルール

ご自身の環境やワークロードに基づいてルールをカスタマイズする必要がある場合があります。例えば、ASM を使用している場合、ビジネスが行われていない地域から機密アクションを実行するユーザーを検出する検出ルールをカスタマイズしたいと思うかもしれません。

[カスタムルールを作成](#create-detection-rules)するには、デフォルトのルールを複製してそのコピーを編集するか、一から独自のルールを作成します。

## 検出ルールの検索とフィルタリング

Datadog ですぐに使える検出ルールとカスタム検出ルールを表示するには、[**Security Settings**][15] ページに移動します。ルールは、各製品 (Application Security、Cloud Security Management、Cloud SIEM) の個別のページにリストされています。

ルールを検索してフィルタリングするには、検索ボックスとファセットを使用して値でクエリします。例えば、指定したルールタイプのルールだけを表示するには、ルールタイプにカーソルを合わせて `only` を選択します。また、受信した問題を調査したりトリアージする際に、`source` や `severity` などのファセットでフィルタリングすることもできます。

{{< img src="security/default_detection_rules.png" alt="Configuration ページでは、デフォルトおよびカスタムの Cloud SIEM 検出ルールが表示されています" width="100%">}}

## 検出ルールを作成する

カスタム検出ルールを作成するには、Detection Rules ページの右上隅にある **New Rule** ボタンをクリックします。また、[既存のデフォルトルールまたはカスタムルールを複製](#clone-a-rule)してテンプレートとして使用することもできます。

詳しい説明は以下の記事をご覧ください。

- [Cloud SIEM][3]
- [ASM][11]
- [CSM Misconfigurations][12]
- [CSM Threats][13]

## 検出ルールを管理する

### ルールの有効化・無効化

ルールを有効または無効にするには、ルール名の右側にあるスイッチを切り替えます。

また、ルールの一括有効化、無効化も可能です。

1. **Select Rules** をクリックします。
1. 有効化または無効化したいルールを選択します。
1. **Edit Rules** ドロップダウンメニューをクリックします。
1. **Enable Rules** または **Disable Rules** を選択します。

### ルールを編集する

すぐに使える検出ルールでは、抑制クエリの追加や編集のみが可能です。クエリを更新したり、トリガーを調整したり、通知を管理したりするには、[デフォルトルールを複製](#clone-a-rule)して、カスタムルールのテンプレートとして使用します。その後、[デフォルトのルールを無効にする](#enable-or-disable-rules)ことができます。

- デフォルトルールを編集するには、ルールの横にある縦の 3 点メニューをクリックして、**Edit default rule** を選択します。
- カスタムルールを編集するには、ルールの横にある縦の 3 点メニューをクリックして、**Edit rule** を選択します。

### ルールを複製する

ルールを複製するには、ルールの横にある縦の 3 点メニューをクリックして、**Clone rule** を選択します。

ルールの複製は、既存のルールを複製して軽く設定を変更し、他の検出領域をカバーしたい場合に便利です。例えば、ログ検出ルールを複製し、**Threshold** から **Anomaly** に変更することで、同じクエリとトリガーを使用して脅威検出に新しい次元を追加することができます。

### すべてのチームを取得する

カスタムルールを削除するには、ルールの横にある縦の 3 点メニューをクリックして、**Delete rule** を選択します。

**注**: 削除できるのはカスタムルールだけです。デフォルトのルールを削除するには、[それを無効にする](#enable-or-disable-rules)必要があります。

### 編集権限を制限する

デフォルトでは、すべてのユーザーが検出ルールにフルアクセスできます。粒度の高いアクセス制御を使用して、1 つのルールを編集できる[ロール][10]を制限するには

1. ルールの横にある縦の 3 点メニューをクリックし、**Permissions** を選択します。
1. **Restrict Access** をクリックします。ダイアログボックスが更新され、組織のメンバーはデフォルトで **Viewer** アクセス権を持っていることが表示されます。
1. ドロップダウンメニューを使用して、セキュリティルールを編集できるロール、チーム、またはユーザーを 1 つ以上選択します。
1. **Add** をクリックします。
1. **Save** をクリックします。

**注:** 規則の編集アクセス権を維持するために、保存する前に、少なくとも 1 つのロールのメンバーであることを含めることがシステムから要求されます。

ルールへのアクセスを復元するには

1. ルールの横にある縦の 3 点メニューをクリックし、**Permissions** を選択します。
1. **Restore Full Access** をクリックします。
1. **Save** をクリックします。

### 生成されたシグナルを表示する

[Signals Explorer][16] でルールのセキュリティシグナルを表示するには、縦 3 点メニ ューをクリックし、**View generated signals** を選択します。これは、ルールごとに複数のソースのシグナルを相関付ける場合や、ルールの監査を完了する場合に便利です。

### ルールを JSON としてエクスポートする

ルールのコピーを JSON としてエクスポートするには、ルールの横にある縦の 3 点メニューをクリックし、**Export as JSON** を選択します。

## ルール非推奨

すべての検出ルールに対して定期的な監査が実施され、高いシグナル品質が維持されます。非推奨となったルールは、改善されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

1. ルールに非推奨の日付が書かれた警告が表示されています。UI では、警告が以下に表示されます。
    - シグナルサイドパネルの **Rule Details > Playbook** セクション
    - Misconfigurations サイドパネル (CSM Misconfigurations のみ)
    - その特定のルールの[ルールエディター][15]
2. ルールが非推奨になると、ルールが削除されるまでに 15 か月の期間があります。これは、シグナルの保持期間が 15 か月であるためです。この間、UI で[ルールの複製](#clone-a-rule)を行うと、ルールを再び有効にすることができます。
3. 一度削除されたルールは、複製して再度有効にすることはできません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/
[2]: /ja/security/cloud_siem/
[3]: /ja/security/cloud_siem/log_detection_rules/
[4]: /ja/security/cloud_security_management/misconfigurations/
[5]: /ja/security/threats/
[6]: /ja/security/application_security/
[7]: /ja/tracing/
[8]: /ja/agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /ja/account_management/rbac/
[11]: /ja/security/application_security/threats/custom_rules/
[12]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[13]: /ja/security/threats/workload_security_rules?tab=host#create-custom-rules
[14]: /ja/security/cloud_security_management/identity_risks/
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security