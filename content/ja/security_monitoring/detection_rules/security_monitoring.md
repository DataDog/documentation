---
title: セキュリティ監視ルール
further_reading:
  - link: /security_monitoring/default_rules/
    tag: Documentation
    text: デフォルトのセキュリティ監視ルールを構成する
  - link: /security_monitoring/explorer/
    tag: Documentation
    text: セキュリティシグナルエクスプローラーについて学ぶ
---
## 新しいルールを作成する

Datadog で新しいセキュリティ監視検出ルールを作成するには、**Security** にカーソルを合わせ、**Security Rules** を選択し、ページの右上隅にある **New Rule** ボタンを選択します。

## ルールタイプ

セキュリティ監視で、**Log Detection** を選択して、取り込んだログをリアルタイムで分析します。

## 検出方法を選択する

### しきい値

イベントがユーザー定義のしきい値を超えるタイミングを定義します。たとえば、しきい値が `>10` のトリガーを作成すると、条件が満たされたときにセキュリティシグナルが発生します。

### 新しい条件

属性が新しい値に変更されたことを検出します。たとえば、`country` や `IP address` などの特定の属性に基づいてトリガーを作成すると、これまでに見られなかった新しい値が見られるたびにセキュリティシグナルが生成されます。

## 検索クエリを定義する

{{< tabs >}}
{{% tab "Threshold" %}}

### 検索クエリ

{{< img src="security_platform/security_monitoring/detection_rules/threshold.png" alt="検索クエリを定義する" >}}

[ログエクスプローラーでの検索][1]と同じロジックを使用して検索クエリを作成します。

オプションで、一意のカウントとシグナルのグループ化を定義します。特定の時間枠で属性に対して観測された一意の値の数をカウントします。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。 通常、グループ化はエンティティ (ユーザーや IP など) です。グループ化は、[クエリを結合する](#joining-queries)ためにも使用されます。

別のクエリを追加する場合は Add Query ボタンをクリックします。

**注**: このクエリはすべての Datadog イベントと、インデックス作成を必要としない取り込み済みログに適用されます。

#### クエリを結合する

タイムフレームをまたぐログを結合すると、セキュリティシグナルの信頼性と重大度を強化することができます。たとえば、ブルートフォースアタックを検出するためには、成功した場合と失敗した場合の認証ログをユーザーと関連付ける必要があります。

{{< img src="security_platform/security_monitoring/detection_rules/joining_queries_define.png" alt="検索クエリを定義"  >}}

検出ルールはグループ化の値をもとにログを結合します。グループ化の値は通常エンティティ (IP アドレス、ユーザーなど) となりますが、必要に応じてすべての属性を使用できます。

{{< img src="security_platform/security_monitoring/detection_rules/group_by.png" alt="グループ化"  >}}

検出ルールケースは、グループ化の値に基づいてこれらのクエリを結合します。一致するケースと値が同じでなければならないため、グループ化属性には通常同じ属性が設定されます。グループ化の値が存在しない場合、ケースが一致することはありません。セキュリティシグナルはケースが一致した場合のみ、一意のグループ化値に対して生成されます。

{{< img src="security_platform/security_monitoring/detection_rules/set_rule_cases2.png" alt="ルールケースを設定"  >}}

以下の例は、同じ `@usr.name` で 5 回を超えてログインに失敗した場合、および 1 回ログインに成功した場合のケースです。この場合、最初のケースに一致した場合はセキュリティシグナルが生成されます。

{{< img src="security_platform/security_monitoring/detection_rules/gbv2.png" alt="ルールケースを設定" >}}

[1]: /ja/logs/search_syntax/
{{% /tab %}}

{{% tab "新しい条件" %}}

### 検索クエリ

{{< img src="security_platform/security_monitoring/detection_rules/new_term.png" alt="検索クエリを定義する" >}}

同じロジックを使用して、[ログエクスプローラー検索][1]で検索クエリを構築します。各クエリには ASCII の小文字でラベルが付与されます。クエリ名を ASCII 文字から変更する場合は、鉛筆アイコンをクリックします。

**注**: このクエリはすべての Datadog イベントと、インデックス作成を必要としない取り込み済みログに適用されます。

#### 学習済みの値

{{< img src="security_platform/security_monitoring/detection_rules/learning_duration.png" alt="学習済みの値を定義する" >}}

検出する値を選択し、期間を学習し、オプションでシグナルのグループ化を定義します。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。通常、グループ化はエンティティ (ユーザーや IP など) です。

たとえば、ユーザー認証を成功させるためのクエリを作成し、**detect new value** を `country` に設定し、グループ化を `user` に設定します。学習期間を `7 days` に設定します。構成が完了すると、今後 7 日間に受信されるログは、設定された値で評価されます。学習期間の後にログに新しい値が入力されると、シグナルが生成され、新しい値が学習されて、この値で将来のシグナルが発生するのを防ぎます。

[1]: /ja/logs/search_syntax/
{{% /tab %}}
{{< /tabs >}}

## ルールケースを設定する

{{< tabs >}}
{{% tab "Threshold" %}}

### トリガー

{{< img src="security_platform/security_monitoring/detection_rules/define_rule_case.png" alt="ルールケースを設定" >}}

`a > 3` などのルールケースは、ステートメントとして評価されます。そのため、シグナルは一致した最初のケースに応じて生成されます。順番を変更する場合は、ルールケースをクリックしたままドラッグします。

ルールケースには、過去に定義されたクエリのイベント数に基づいてシグナルを生成すべきかを判断するための論理演算 (`>、>=、&&、||`) が含まれます。ここで ASCII 小文字の [クエリラベル](#define-a-search-query)が参照されます。

**注**: クエリラベルは演算子に先行しなければなりません。たとえば、`a < 3` は使用できますが、 `3 > a` は許容されません。

各ルールケースにつき、「ケース 1」のような**名前**を付与します。シグナルの生成時には、この名前がルールの名称に追加されます。

### 重大度および通知

セキュリティシグナルの重大度を設定します。ドロップダウンから適切な重大度レベル (`INFO`、`LOW`、`MEDIUM`、`HIGH`、`CRITICAL`) を選択してください。

“Notify” セクションで、各ルールケースに対する [通知ターゲット][1]  (0 以上) を構成します。

### タイムウィンドウ

`evaluation window` は少なくとも 1 つのケースが一致した場合に指定されるスライド式のウィンドウで、リアルタイムで評価が行われます。

シグナルが生成された後、この `keep alive` ウィンドウ内でケースが少なくとも 1 回一致した場合、そのシグナルは「オープン」状態として残ります。新しいイベントがケースのいずれかと一致する度に、シグナルの*最終更新日付*タイムスタンプが更新されます。

`maximum signal duration` に達すると、シグナルはクエリと一致したかどうかに関わらず「クローズ」されます。この時間は最初に記録されたタイムスタンプに基づいて計算します。

その他のケースを追加する場合は **Add Case** ボタンをクリックします。

**注**: この `evaluation window` は、`keep alive` および `maximum signal duration` 以下でなければなりません。

[1]: /ja/monitors/notifications/?tab=is_alert#integrations
{{% /tab %}}

{{% tab "新しい条件" %}}

{{< img src="security_platform/security_monitoring/detection_rules/new_term_rule_case.png" alt="ルールケースを定義する" >}}

### 重大度および通知

セキュリティシグナルの重大度を設定します。ドロップダウンから適切な重大度レベル (`INFO`、`LOW`、`MEDIUM`、`HIGH`、`CRITICAL`) を選択してください。

“Notify” セクションで、各ルールケースに対する [通知ターゲット][1]  (0 以上) を構成します。

### 価値を忘れる

一定期間表示されない場合に値を忘れるには、ドロップダウンメニューからオプションを選択します。

### 同じシグナルを更新する

設定された時間枠内に新しい値が検出された場合にシグナルを更新し続ける最大期間を設定します。 たとえば、`1 hour` 以内に新しい値が検出されると、同じシグナルが更新されます。最大期間は `24 hours` です。

**注**: 新しい値ごとに一意のシグナルが必要な場合は、この値を `0 minutes` に構成してください。

[1]: /ja/monitors/notifications/?tab=is_alert#integrations
{{% /tab %}}
{{< /tabs >}}

## Say What's Happening

通知ボックスは[モニター通知][1]と同じマークダウンとプレビュー機能を備えています。

**ルール名**セクションで、ルールリストビューに表示されるルール名や、セキュリティシグナルのタイトルを構成することができます。

`security:attack` や `technique:T1110-brute-force` など、シグナル固有のタグを付加しましょう。

**注**: `security` タグはセキュリティシグナルの分類に用いられる特殊なタグです。`attack`、`threat-intel`、`compliance`、`anomaly`、`data-leak` など他のタグの使用を推奨します。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/notifications/?tab=is_alert
