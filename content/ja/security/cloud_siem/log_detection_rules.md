---
aliases:
- /ja/security_platform/detection_rules/cloud_siem
- /ja/security_platform/detection_rules/security_monitoring
- /ja/security_platform/detection_rules/create_a_new_rule
- /ja/security_platform/cloud_siem/log_detection_rules/
- /ja/cloud_siem/detection_rules/security_monitoring/
- /ja/security/detection_rules/cloud_siem/
- /ja/security/detection_rules/security_monitoring
- /ja/security/detection_rules/create_a_new_rule
further_reading:
- link: /cloud_siem/default_rules/
  tag: ドキュメント
  text: デフォルトの Cloud SIEM 検出ルールの構成
- link: /cloud_siem/explorer/
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/
  tag: GitHub
  text: AWS アカウントの不正な第三者を検出する
- link: https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/
  tag: GitHub
  text: 異常検出ルールによるセキュリティ脅威の検出
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: ブログ
  text: Datadog Cloud SIEM で Cloudflare Zero Trust を監視
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password を監視
title: ログ検出ルール
type: documentation
---

## 概要

Datadog でログ検出ルールを作成するには、[検出ルールページ][1]に移動し、**New Rule** をクリックします。

## ルールタイプ

Cloud SIEM (Security Information and Event Management) の場合、取り込んだログをリアルタイムに分析するために、**Log Detection** を選択します。

## 検出方法

### しきい値

イベントがユーザー定義のしきい値を超えるタイミングを定義します。たとえば、しきい値が `>10` のトリガーを作成すると、条件が満たされたときにセキュリティシグナルが発生します。

### 新しい値

属性が新しい値に変更されたことを検出します。たとえば、`country` や `IP address` などの特定の属性に基づいてトリガーを作成すると、これまでに見られなかった新しい値が見られるたびにセキュリティシグナルが生成されます。

### 異常検知

特定のしきい値を構成することができない場合、代わりに異常検出ルールを定義することができます。異常検出では、イベントの過去の観測可能性から動的なしきい値が自動的に導き出されます。

### 不可能移動

不可能移動は、2 つのアクセスイベントの間に人間が移動できる距離よりも大きい距離の異なる場所からのアクセスを検出します。

### Third Party

Third Party では、外部のベンダーやアプリケーションからのアラートを転送することができます。抑制クエリやシグナル発生時の通知先を設定してルールを更新することができます。

## 検索クエリを定義する

{{< tabs >}}
{{% tab "Threshold" %}}

### 検索クエリ

{{< img src="security/security_monitoring/detection_rules/threshold.png" alt="検索クエリを定義する" style="width:80%;" >}}

[ログエクスプローラーでの検索][1]と同じロジックを使用して検索クエリを作成します。

オプションで、一意のカウントとシグナルのグループ化を定義します。特定の時間枠で属性に対して観測された一意の値の数をカウントします。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。 通常、グループ化はエンティティ (ユーザーや IP など) です。グループ化は、[クエリを結合する](#joining-queries)ためにも使用されます。

クエリを追加するには、**Add Query** をクリックします。

**注**: このクエリは、すべての取り込みログに適用されます。

#### クエリを結合する

タイムフレームをまたぐログを結合すると、セキュリティシグナルの信頼性と重大度を強化することができます。たとえば、ブルートフォースアタックを検出するためには、成功した場合と失敗した場合の認証ログをユーザーと関連付ける必要があります。

{{< img src="security/security_monitoring/detection_rules/joining_queries_define.png" alt="検索クエリを定義する" style="width:90%;" >}}

検出ルールはグループ化の値をもとにログを結合します。グループ化の値は通常エンティティ (例えば、IP アドレスやユーザー) となりますが、必要に応じてすべての属性を使用できます。

{{< img src="security/security_monitoring/detection_rules/group_by.png" alt="グループ化" style="width:30%;" >}}

検出ルールケースは、グループ化の値に基づいてこれらのクエリを結合します。一致するケースと値が同じでなければならないため、グループ化属性には通常同じ属性が設定されます。グループ化の値が存在しない場合、ケースが一致することはありません。セキュリティシグナルはケースが一致した場合のみ、一意のグループ化値に対して生成されます。

{{< img src="security/security_monitoring/detection_rules/set_rule_case4.png" alt="failed_login が 5 を超え、successful_login が 0 を超える場合に、高重大度のシグナルをトリガーするように設定されたルールケースセクション" style="width:90%;" >}}

以下の例は、同じ `@usr.name` で 5 回を超えてログインに失敗した場合、および 1 回ログインに成功した場合のケースです。この場合、最初のケースに一致した場合はセキュリティシグナルが生成されます。

[1]: /ja/logs/search_syntax/
{{% /tab %}}

{{% tab "新しい値" %}}

### 検索クエリ

{{< img src="security/security_monitoring/detection_rules/new_term.png" alt="検索クエリを定義する" style="width:80%;" >}}

同じロジックを使用して、[ログエクスプローラー検索][1]で検索クエリを構築します。各クエリには ASCII の小文字でラベルが付与されます。クエリ名を ASCII 文字から変更する場合は、鉛筆アイコンをクリックします。

**注**: このクエリは、すべての取り込みログに適用されます。

#### 学習済みの値

{{< img src="security/security_monitoring/detection_rules/learning_duration.png" alt="学習済みの値を定義する" style="width:80%;" >}}

検出する値 (複数可) を選択し、期間を学習し、オプションでシグナルのグループ化を定義します。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。通常、グループ化はエンティティ (ユーザーや IP など) です。

たとえば、ユーザー認証を成功させるためのクエリを作成し、**Detect new value** を `country` に設定し、グループ化を `user` に設定します。学習期間を `7 days` に設定します。構成が完了すると、今後 7 日間に受信されるログは、設定された値で評価されます。学習期間の後にログに新しい値が入力されると、シグナルが生成され、新しい値が学習されて、この値で将来のシグナルが発生するのを防ぎます。

また、1 つのクエリで複数の値を使用して、ユーザーやエンティティを識別することができます。例えば、ユーザーが新しいデバイスからサインインしたときや、今までサインインしたことのない国からサインインしたときに検出したい場合は、`device_id` と `country_name` を **Detect new value** に追加します。

[1]: /ja/logs/search_syntax/
{{% /tab %}}

{{% tab "異常" %}}

### 検索クエリ

ログエクスプローラーでの検索と同じロジックを使用して検索クエリを作成します。

オプションで、一意のカウントとシグナルのグループ化を定義します。特定の時間枠で属性に対して観測された一意の値の数をカウントします。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。 通常、グループ化はエンティティ (ユーザーや IP など) です。

異常検出は、`group by` 属性が過去にどのような振る舞いをしたかを検査します。group by 属性が初めて見られ (例えば、ある IP が初めてシステムと通信したとき)、異常である場合、異常検出アルゴリズムには判断材料となる過去のデータがないため、セキュリティシグナルは生成されません。

**注**: このクエリは、すべての取り込みログに適用されます。

{{% /tab %}}

{{% tab "不可能移動" %}}

### 検索クエリ

[ログエクスプローラー検索][1]と同じロジックで検索クエリを構築します。このクエリをマッチするすべてのログは、不可能移動の可能性を分析されます。現在のクエリにマッチするログを見るには、`preview` セクションを使うことができます。

#### ユーザー属性

`user attribute` には、解析したログのうち、ユーザー ID を含むフィールドを選択します。これは、メールアドレス、ユーザー名、またはアカウント識別子などの識別子にすることができます。

#### 位置情報属性

`location attribute` は、ログの地理情報を保持するフィールドを指定します。唯一サポートされている値は `@network.client.geoip` で、これは [GeoIP パーサー][2]によって強化され、クライアントの IP アドレスに基づくログの位置情報を提供します。

#### ベースラインユーザーの位置

シグナルをトリガーする前に、Datadog に通常のアクセス場所を学習させたい場合は、チェックボックスをクリックします。

選択すると、最初の 24 時間はシグナルが抑制されます。その間に Datadog はユーザーの通常のアクセス場所を学習します。これは、ノイズを減らし、VPN の使用や資格情報による API アクセスを推論するのに役立ちます。

不可能移動の行動をすべて Datadog に検出させたい場合は、チェックボックスをクリックしないでください。

[1]: /ja/logs/search_syntax/
[2]: /ja/logs/log_configuration/processors#geoip-parser
{{% /tab %}}

{{% tab "サードパーティ" %}}

### Root クエリ

[ログエクスプローラー検索][1]と同じロジックを使用して検索クエリを構築します。各新規属性の定義されたトリガーは、24 時間のロールアップ期間にわたってその属性の新規値ごとにシグナルを生成します。

クエリを追加するには、**Add Query** をクリックします。

**注**: このクエリは、すべての取り込みログに適用されます。

[1]: /ja/logs/search_syntax/
{{% /tab %}}
{{< /tabs >}}

## ルールケースを設定する

{{< tabs >}}
{{% tab "しきい値" %}}

### トリガー

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="デフォルトの設定を示すセットルールケースセクション" style="width:80%;" >}}

例 (クエリ A が発生し、次にクエリ B が発生した場合) のシグナルをトリガーしたい場合は、**Create rules cases with Then operator** を有効にしてください。`then` 演算子は、1 つのルールケースにのみ使用できます。

すべてのルールケースは case ステートメントとして評価されます。したがって、ケースの順序は、最初にマッチしたケースがシグナルを生成するため、どの通知を送信するかに影響します。ルールケースをクリックしてドラッグすると、順序を変更できます。

ルールケースには、過去に定義されたクエリのイベント数に基づいてシグナルを生成すべきかを判断するための論理演算 (`>、>=、&&、||`) が含まれます。ここで ASCII 小文字の [クエリラベル](#define-a-search-query)が参照されます。クエリ `a` のルールケースの例は `a > 3` です。

**注**: クエリラベルは演算子に先行しなければなりません。たとえば、`a > 3` は使用できますが、`3 < a` は許容されません。

各ルールケースにつき、「ケース 1」のような**名前**を付与します。シグナルの生成時には、この名前がルールの名称に追加されます。

### 重大度および通知

{{% security-rule-severity-notification %}}

### タイムウィンドウ

{{% security-rule-time-windows %}}

ケースを追加する場合は、**Add Case** をクリックします。

**注**: この `evaluation window` は、`keep alive` および `maximum signal duration` 以下でなければなりません。

{{% /tab %}}

{{% tab "新しい値" %}}

{{< img src="security/security_monitoring/detection_rules/new_term_rule_case.png" alt="ルールケースを定義する" style="width:80%;" >}}

### 重大度および通知

{{% security-rule-severity-notification %}}

### 価値を忘れる

一定期間表示されない場合に値を忘れるには、ドロップダウンメニューからオプションを選択します。

### 同じシグナルを更新する

設定された時間枠内に新しい値が検出された場合にシグナルを更新し続ける最大期間を設定します。 たとえば、`1 hour` 以内に新しい値が検出されると、同じシグナルが更新されます。最大期間は `24 hours` です。

**注**: 新しい値ごとに一意のシグナルが必要な場合は、この値を `0 minutes` に構成してください。

{{% /tab %}}

{{% tab "異常" %}}

### 重大度および通知

{{% security-rule-severity-notification %}}

### タイムウィンドウ

Datadog は、データの季節性を自動的に検出し、異常と判断された場合にセキュリティシグナルを生成します。

一度シグナルが発生すると、データが異常な状態のまま、最終更新のタイムスタンプが異常な期間更新された場合、シグナルは「オープン」のままとなります。

異常が残っているかどうかにかかわらず、時間が最大シグナル継続時間を超えると、シグナルは「クローズ」します。この時間は、最初に見たタイムスタンプから計算されます。

{{% /tab %}}

{{% tab "不可能移動" %}}

不可能移動検出方式は、ルールケースの設定を必要としません。

### 重大度および通知

{{% security-rule-severity-notification %}}

### タイムウィンドウ

{{% security-rule-time-windows %}}

{{% /tab %}}

{{% tab "サードパーティ" %}}

### トリガー

すべてのルールケースは case ステートメントとして評価されます。したがって、ケースの順序は、最初にマッチしたケースがシグナルを生成するため、どの通知を送信するかに影響します。ルールケースをクリックしてドラッグすると、順序を変更できます。

ルールケースには、過去に定義されたクエリのイベント数に基づいてシグナルを生成すべきかを判断するための論理演算 (`>、>=、&&、||`) が含まれます。ここで ASCII 小文字の [クエリラベル](#define-a-search-query)が参照されます。クエリ `a` のルールケースの例は `a > 3` です。

**注**: クエリラベルは演算子に先行しなければなりません。たとえば、`a > 3` は使用できますが、`3 < a` は許容されません。

### 重大度および通知

{{% security-rule-severity-notification %}}

ケースを追加する場合は、**Add Case** をクリックします。

{{% /tab %}}
{{< /tabs >}}

### 非本番重大度の低減

信号のノイズを減らす方法の 1 つは、非本番環境の信号よりも本番環境の信号を優先させることです。`Decrease severity for non-production environments` チェックボックスを選択すると、非本番環境のシグナルの重大度を、ルールケースで定義されたものから 1 レベル下げることができます。

| 本番環境におけるシグナルの重大度| 非本番環境におけるシグナルの重大度|
| ---------------------------------------- | -------------------------------------------- |
| クリティカル                                 | 大                                         |
| 大                                     | 中                                       |
| 中                                   | 情報                                         |
| 情報                                     | 情報                                         |

重大度の減少は、環境タグが `staging`、`test` または `dev` で始まっているシグナルに適用されます。

## Say what's happening

{{% security-rule-say-whats-happening %}}

シグナルにタグを追加するには、**Tag resulting signals** ドロップダウンメニューを使用します。例えば、`security:attack` や `technique:T1110-brute-force` のようになります。

**注**: `security` タグはセキュリティシグナルの分類に用いられる特殊なタグです。`attack`、`threat-intel`、`compliance`、`anomaly`、`data-leak` など他のタグの使用を推奨します。

## 抑制ルール

オプションで、シグナルの生成を防ぐための抑制ルールを追加できます。例えば、あるユーザー (`john.doe`) がシグナルをトリガーしているが、そのユーザーの行動が問題なく、このユーザーからシグナルがトリガーされることを望まない場合、次のクエリを **Add a suppression query** フィールドに追加します: `@user.username:john.doe`.

さらに、抑制ルールでは、ログを分析対象から除外するための除外クエリを追加できます。 これらのクエリは、**ログ属性**に基づきます。**注**: 抑制は、以前はログ除外クエリに基づいていましたが、今後は抑制ルールの **Add a suppression query** ステップに含まれるようになりました。

## ルール非推奨

すべてのすぐに使える検出ルールの定期的な監査を行い、忠実なシグナル品質を維持します。非推奨のルールは、改良されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

1. ルールに非推奨の日付が書かれた警告が表示されています。UI では、警告が以下に表示されます。
    - シグナルサイドパネルの **Rule Details > Playbook** セクション
    - その特定のルールの[ルールエディター][2]
2. ルールが非推奨になると、ルールが削除されるまでに 15 か月の期間があります。これは、シグナルの保持期間が 15 か月であるためです。この間、UI で[ルールの複製][2]を行うと、ルールを再び有効にすることができます。
3. 一度削除されたルールは、複製して再度有効にすることはできません。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /ja/security/detection_rules/#clone-a-rule