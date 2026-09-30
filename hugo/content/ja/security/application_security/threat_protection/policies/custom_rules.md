---
aliases:
- /ja/security/application_security/policies/custom_rules/
- /ja/security_platform/application_security/custom_rules
- /ja/security/application_security/custom_rules
- /ja/security/application_security/threats/attacker_fingerprint
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog App and API Protection で脅威から保護する
- link: /security/application_security/threat_protection/policies/inapp_waf_rules/
  tag: ドキュメント
  text: アプリ内 WAF ルールを作成する
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Datadog App and API Protection の一般的な問題のトラブルシューティング
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
- link: /tracing/trace_explorer/query_syntax/
  tag: ドキュメント
  text: AAP クエリを定義するための構文
title: カスタム検出ルール
---
## 概要{#overview}

App and API Protection (AAP) には、本番システムに影響を与える攻撃の試み、攻撃者が見つけた脆弱性、ビジネスロジックの不正使用を捕捉することを目的とした、一連の[すぐに使える検出ルール][1]が付属しています。

ただし、環境やワークロードに合わせてルールをカスタマイズしたい場合もあります。たとえば、自社の事業を展開していない地域からユーザーが機密性の高いアクションを実行したことを検知するルールをカスタマイズしたいことがあるかもしれません。

別の例として、社内のセキュリティスキャナーの対象から除外するようにルールをカスタマイズするケースが挙げられます。AAP はそのアクティビティを期待どおりに検出します。しかし、定期的に発生するスキャンについては通知を受け取りたくない場合があります。

このような状況では、カスタム検出ルールを作成して、特定のイベントを除外することができます。このガイドでは、AAP のカスタム検出ルールを作成する方法を説明します。

## ビジネスロジック不正使用の検出ルール{#business-logic-abuse-detection-rule}

AAP には、ビジネスロジックの不正使用 (例: ブルートフォース攻撃によるパスワードリセットなど) を検出するための、すぐに使えるルールが用意されています。これらのルールを使用するには、[トレースにビジネスロジック情報を追加][7]する必要があります。

最新の Datadog SDK は、コードを変更することなく、ユーザーのログインイベントやサインアップイベントを自動的に検出して送信する機能が提供されています。必要に応じて、この[ユーザーアクティビティイベントの自動追跡を無効にする][8]ことも可能です。

ルールをフィルタリングして、追跡を開始するビジネスロジックを特定できます。さらに、これらのルールをブループリントとして使用し、独自のビジネスロジックに基づいてカスタムルールを作成することもできます。

ルールの構成は、以下のセクションを参照してください。

## 構成{#configuration}

すぐに使える (OOTB) 検出ルールをカスタマイズするには、まず既存のルールをクローンする必要があります。[検出ルール][2] に移動し、ルールを選択します。ルールの下部までスクロールし、{{< ui >}}Clone Rule{{< /ui >}} ボタンをクリックします。これで、既存のルールを編集できるようになります。

### AAP クエリを定義する{#define-an-aap-query}

[AAP Trace Explorer と同じクエリ構文][3]を使用して AAP クエリを作成します。たとえば、米国外からのログイン成功を監視するクエリを作成する場合、`@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US` と指定します。

オプションで、一意のカウントとシグナルのグループ化を定義します。指定した期間内において、ある属性について観測された一意の値の数をカウントします。定義されたグループ化 (group-by) の条件に基づき、その値ごとにシグナルが生成されます。通常、グループ化の対象にはエンティティ (ユーザー、IP アドレス、サービスなど) が指定されます。また、このグループ化設定は、[クエリを結合する](#joining-queries)ためにも使用されます。

プレビューセクションを使用して、どの AAP トレースが検索クエリと一致するかを確認できます。{{< ui >}}Add Query{{< /ui >}} ボタンを使用して、クエリを追加することも可能です。

##### クエリを結合する{#joining-queries}

特定の期間にまたがって複数のクエリを結合することで、セキュリティシグナルの信頼性や重大度を高めることができます。たとえば、攻撃の成功を検知するために、あるサービスに対する成功と失敗の両方のトリガーを関連付けることが可能です。

クエリ同士の関連付けには、`group by` の値が使用されます。この `group by` の値は通常エンティティ (`IP` や `Service`) ですが、任意の属性を指定できます。

たとえば、同じ `business_logic.users.login.success` アクティビティを対象としつつ、HTTP パスの条件を成功と失敗として対照的に設定したクエリを作成します。

クエリ 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`。

クエリ 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`。

この場合、結合されたクエリは技術的に同じ属性値を保持することになります。ケースを満たすには、その値が一致している必要があります。`group by` 値が存在しない場合、ケースが満たされることはありません。ケースが一致すると、一意の `group by` 値ごとにセキュリティシグナルが生成されます。

### 抑制クエリで良性アクティビティを除外する{#exclude-benign-activity-with-suppression-queries}

[{{< ui >}}Only generate a signal if there is a match{{< /ui >}}] フィールドでは、クエリを入力して、値が満たされた場合にのみトリガーが生成されるように設定できます。

[{{< ui >}}This rule will not generate a signal if there is a match{{< /ui >}}] フィールドでは、値が満たされた場合にトリガーが生成されないように抑制クエリを入力するオプションがあります。たとえば、サービスがシグナルをトリガーしているものの、そのアクションが良性であり、今後そのサービスからシグナルをトリガーしたくない場合は、`service` を除外するクエリを作成します。

### ケースを設定する{#set-a-rule-case}

#### トリガー{#trigger}

`successful login > 0` のようなルールケースは、ケース文として評価されます。そのため、最初に一致したケースがシグナルを生成します。1 つまたは複数のルールケースを作成し、その横にあるグレーの領域をクリックしてドラッグすることで、順序を並べ替えることができます。

ルールケースには、事前に定義されたクエリのイベント数に基づいてシグナルを生成するかどうかを判断するための論理演算子 (`>, >=, &&, ||`) が含まれます。

**注**: クエリラベルは演算子の前に記述する必要があります。たとえば、`a > 3` は許可されますが、`3 < a` は許可されません。

各ルールケースに名前を付けます。この名前は、シグナルが生成されたときにルール名に追加されます。

#### 重大度および通知{#severity-and-notification}

{{% security-rule-severity-notification %}}

### タイムウィンドウ{#time-windows}

{{% security-rule-time-windows %}}

ケースを追加するには、[{{< ui >}}Add Case{{< /ui >}}] をクリックします。

**注**: `evaluation window` は `keep alive` および `maximum signal duration` 以下である必要があります。

### 発生している事象を述べる{#say-whats-happening}

{{% security-rule-say-whats-happening %}}

{{< ui >}}Tag resulting signals{{< /ui >}} ドロップダウンメニューを使用して、シグナルにタグを追加します。たとえば、`attack:sql-injection-attempt`。

**注**: `security` タグは特別なタグです。このタグはセキュリティシグナルの分類に使用されます。推奨されるオプションは、`attack`、`threat-intel`、`compliance`、`anomaly`、および `data-leak` です。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /ja/tracing/trace_explorer/query_syntax/
[4]: /ja/monitors/notify/?tab=is_alert#integrations
[5]: /ja/security/notifications/variables/
[6]: /ja/security/notifications/variables/#template-variables
[7]: /ja/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /ja/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking