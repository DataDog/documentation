---
title: Custom Detection Rules
aliases:
  - /security_platform/application_security/custom_rules
  - /security/application_security/custom_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against threats with Datadog Application Security Management
- link: /security/application_security/event_rules/
  tag: Documentation
  text: Creating event rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshoot common Datadog Application Security Management issues
- link: /security/notifications/variables/
  tag: Documentation
  text: Learn more about Security notification variables
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Syntax for defining the ASM query
---

## 概要

Application Security Management (ASM) には、本番システムに影響を与える攻撃の試み、攻撃者が見つけた脆弱性、ビジネスロジックの不正使用を捕捉することを目的とした、一連の[すぐに使える検出ルール][1]が付属しています。

しかし、環境またはワークロードに基づいてルールをカスタマイズしたい場合もあります。例えば、ビジネスが行われていない地域から機密アクションを実行するユーザーを検出する検出ルールをカスタマイズしたいと思うかもしれません。

他の例としては、内部セキュリティスキャナーを除外するようにルールをカスタマイズすることが挙げられます。ASM は、期待どおりにその活動を検出します。しかし、定期的に発生するスキャンの通知を受けたくない場合があります。

このような場合、カスタム検出ルールを作成することで、そのようなイベントを除外することができます。このガイドでは、ASM のカスタム検出ルールを作成する方法を説明します。

## ビジネスロジック不正使用検出ルール

ASM は、ビジネスロジックの不正使用 (例えば、ブルートフォースによるパスワードのリセット) を検出するためのルールをすぐに使えるようにしています。これらのルールでは、[トレースにビジネスロジック情報を追加する][7]必要があります。

最近の Datadog トレーシングライブラリは、コードを変更する必要なく、ユーザーのログインやサインアップイベントを自動的に検出し、送信することを試みます。必要であれば、[ユーザーアクティビティイベントの自動追跡をオプトアウトする][8]ことができます。

ルールにフィルターをかけ、どのビジネスロジックの追跡を開始するかを特定することができます。さらに、これらのルールを青写真として使用し、独自のビジネスロジックに基づいたカスタムルールを作成することができます。

ルールの構成は、以下のセクションを参照してください。

## 構成

OOTB 検出ルールをカスタマイズするには、まず既存のルールを複製する必要があります。[検出ルール][2]に移動して、ルールを選択します。ルールの下までスクロールして、Clone Rule ボタンをクリックします。これで、既存のルールを編集できるようになります。

### ASM クエリの定義

[ASM トレースエクスプローラーと同じクエリ構文][3]を使用して、ASM クエリを構築します。たとえば、米国外からのログイン成功を監視するクエリを作成します: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`

オプションで、一意のカウントとシグナルのグループ化を定義します。特定の時間枠で属性に対して観測された一意の値の数をカウントします。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。 通常、グループ化はエンティティ (ユーザー、IP、またはサービスなど) です。グループ化は、[クエリを結合する](#joining-queries)ためにも使用されます。

プレビューセクションを使用して、検索クエリに一致する ASM トレースを確認します。また、Add Query ボタンでクエリを追加することもできます。

##### クエリを結合する

時間枠にまたがるクエリを結合することで、セキュリティシグナルの信頼度や重大度を高めることができる。例えば、攻撃が成功したことを検知するために、成功したトリガーと失敗したトリガーの両方をサービ スに対して関連付けることができます。

クエリは `group by` 値を使用して関連付けられます。`group by` 値は通常エンティティ (例えば `IP` や `Service`) ですが、任意の属性を指定することができます。

例えば、同じ `business_logic.users.login.success` アクティビティを検索する反対のクエリを作成し、成功した場合と失敗した場合に反対の HTTP パスクエリを追加します。

クエリ 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`

クエリ 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`

この場合、結合されたクエリは技術的に同じ属性値を保持しています。もし `group by` の値が存在しなければ、ケースに合致することはありません。ケースにマッチすると、一意の `group by` 値ごとにセキュリティシグナルが生成されます。

### 抑制クエリで良性アクティビティを除外する

**Only generate a signal if there is a match** (一致した場合のみシグナルを発生させる) フィールドでは、クエリを入力することで、値が一致したときのみトリガーが発生するようにするオプションがあります。

**This rule will not generate a signal if there is a match** (このルールは、一致するものがある場合、シグナルを生成しない) フィールドには、抑制クエリを入力するオプションがあり、値が一致した場合にトリガーが生成されないようにすることができます。例えば、あるサービスがシグナルをトリガーしているが、そのアクションは良性であり、このサービスからシグナルをトリガーさせたくない場合、`service` を除外するクエリを作成します。

### ルールケースを設定する

#### トリガー

`successful login > 0` のようなルールケースは、ケース文として評価されます。したがって、最初にマッチしたケースがシグナルを発生させます。1 つまたは複数のルールケースを作成し、その横にある灰色の領域をクリックして、ドラッグしてその順序を操作します。

ルールケースには、過去に定義されたクエリのイベント数に基づいてシグナルを生成すべきかを判断するための論理演算 (`>、>=、&&、||`) が含まれます。

**注**: クエリラベルは演算子に先行しなければなりません。たとえば、`a > 3` は使用できますが、`3 < a` は許容されません。

各ルールケースにつき、**名前**を付与します。シグナルの生成時には、この名前がルールの名称に追加されます。

#### 重大度および通知

{{% security-rule-severity-notification %}}

### タイムウィンドウ

{{% security-rule-time-windows %}}

ケースを追加する場合は、**Add Case** をクリックします。

**注**: この `evaluation window` は、`keep alive` および `maximum signal duration` 以下でなければなりません。

### Say what's happening

{{% security-rule-say-whats-happening %}}

シグナルにタグを追加するには、**Tag resulting signals** ドロップダウンメニューを使用します。例えば、`attack:sql-injection-attempt`のようになります。

**注**: `security` タグはセキュリティシグナルの分類に用いられる特殊なタグです。`attack`、`threat-intel`、`compliance`、`anomaly`、`data-leak` など他のタグの使用を推奨します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /tracing/trace_explorer/query_syntax/
[4]: /monitors/notify/?tab=is_alert#integrations
[5]: /security/notifications/variables/
[6]: /security/notifications/variables/#template-variables
[7]: /security/application_security/threats/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking

