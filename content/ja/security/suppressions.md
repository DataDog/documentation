---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: ドキュメント
  text: 検出ルールについて
kind: ドキュメント
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: CSM Threats
  url: /security/threats/
title: Suppressions
---

{{< product-availability >}}

## 概要

抑制とは、シグナルを発生させるべきではない特定の条件のことで、これにより生成されるシグナルの精度と関連性を向上させることができます。

## 抑制ルート

個々の[検出ルール](#detection-rules)内に抑制クエリを設定するか、1 つ以上の検出ルール全体でシグナルを抑制するために別個の[抑制ルール](#suppression-rules)を定義することができます。

### 検出ルール

検出ルールを[作成][1]または[変更][2]するときに、シグナルが生成されないように抑制クエリを定義できます。例えば、検出ルールがセキュリティシグナルをトリガーするタイミングを決定するためのルールクエリを追加します。抑制クエリをカスタマイズして、特定の属性値のシグナルを抑制することもできます。

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="抑制クエリの追加セクションを示す検出ルールエディタ" style="width:65%;" >}}

### 抑制ルール

抑制ルールを使用すると、個々の検出ルールごとに抑制条件をセットアップする代わりに、複数の検出ルールにわたって一般的な抑制条件を設定できます。例えば、特定の IP を含むシグナルを抑制する抑制ルールをセットアップできます。

## 抑制の構成

### 抑制リスト

[抑制リスト][3]は、複数の検出ルールにまたがる抑制を一元的かつ組織的に管理する方法を提供します。

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="抑制ルールのリストを表示する抑制ページ" style="width:90%;" >}}

## Create a suppression rule

1. [Suppressions][3] ページに移動します。
1. **+ New Suppression** をクリックします。
1. 抑制クエリの名前を入力します。
1. なぜこの抑制が適用されるのか、その背景を示す説明を追加します。
1. オプションで、この抑制が無効になる有効期限を追加します。
1. この抑制を適用する検出ルールを選択します。複数の検出ルールを選択できます。
1. **Add Suppression Query** セクションでは、特定の値に該当する場合にシグナルが生成されないように、抑制クエリを入力するオプションがあります。例えば、ユーザー `john.doe` がシグナルをトリガーしているが、そのアクションは良性であり、あなたはもうこのユーザーからシグナルをトリガーさせたくない場合、ログクエリ `@user.username:john.doe` を入力します。
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="クエリ @user.username:john.doe による抑制クエリの追加" style="width:65%;" >}}
  Suppression rule queries are based on **signal attributes**. 
1. Additionally, you can add a log exclusion query to exclude logs from being analyzed. These queries are based on **log attributes**. **Note**: The legacy suppression was based on log exclusion queries, but it is now included in the suppression rule's **Add a suppression query** step.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /ja/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/rules
[5]: /ja/logs/explorer/facets/#log-side-panel