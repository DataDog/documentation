---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: ドキュメント
  text: 検出ルールについて
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: ワークロード保護
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: 抑制
---

{{< product-availability >}}

## 概要

抑制とは、シグナルを生成しない条件を明確に定めるもので、生成されるシグナルの精度と関連性の向上に寄与します。

## 抑制の設定方法

個別の[検出ルール](#detection-rules)内に抑制クエリを設定することも、1 つ以上の検出ルールにまたがってシグナルを抑制するための[抑制ルール](#suppression-rules)を別途定義することもできます。

### 検出ルール

検出ルールを[作成][1]または[変更][2]する際に、抑制クエリを定義してシグナルの生成を防ぐことができます。たとえば、検出ルールがセキュリティ シグナルをトリガーする条件を決めるために、ルール クエリを追加できます。また、抑制クエリをカスタマイズして、特定の属性値に一致するシグナルを抑制することもできます。

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="抑制クエリの追加セクションが表示された検出ルール エディター" style="width:65%;" >}}

### 抑制ルール

抑制ルールを使用すると、各検出ルールごとに個別の抑制条件を設定する代わりに、複数の検出ルールに共通の抑制条件を設定できます。たとえば、特定の IP を含むシグナルをすべて抑制する抑制ルールを設定できます。

## 抑制の設定

### 抑制リスト

[抑制リスト][3]を使うと、複数の検出ルールにまたがる抑制を一元的かつ体系的に管理できます。

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="抑制ルールの一覧が表示された Suppressions ページ" style="width:90%;" >}}

## 抑制ルールを作成

1. [Suppressions][3] ページに移動します。
1. **+ New Suppression** をクリックします。
1. 抑制クエリの名前を入力します。
1. なぜこの抑制が適用されるのか、その背景を示す説明を追加します。
1. 任意で、この抑制を無効化する有効期限日を設定します。
1. この抑制を適用する検出ルールを選択します。複数の検出ルールを選択できます。
1. **Add Suppression Query** セクションでは、抑制クエリを入力でき、条件に一致した場合にシグナルが生成されないようにできます。たとえば、ユーザー `john.doe` がシグナルをトリガーしているものの、その行動が無害でこのユーザーからのシグナルを今後抑制したい場合は、ログ クエリ `@user.username:john.doe` を入力します。
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="クエリ @user.username:john.doe による抑制クエリの追加" style="width:65%;" >}}
  抑制ルールのクエリは、**シグナル属性**に基づいています。
1. さらに、ログを分析対象から除外するための除外クエリを追加できます。 これらのクエリは、**ログ属性**に基づきます。**注**: 抑制は、以前はログ除外クエリに基づいていましたが、今後は抑制ルールの **Add a suppression query** ステップに含まれるようになりました。

### 編集権限の制限

{{% security-products/suppressions-granular-access %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /ja/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/rules
[5]: /ja/logs/explorer/facets/#log-side-panel