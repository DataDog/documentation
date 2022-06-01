---
further_reading:
- link: /security_platform/application_security/
  tag: ドキュメント
  text: Datadog アプリケーションセキュリティモニタリングによる脅威の監視
- link: /security_platform/application_security/troubleshooting
  tag: ドキュメント
  text: Datadog アプリケーションセキュリティモニタリングの一般的な問題のトラブルシューティング
kind: documentation
title: カスタム検出ルール
---

## 概要

アプリケーションセキュリティモニタリング (ASM) には、本番システムに影響を与える攻撃の試みと脆弱性のトリガーを捕捉することを目的とした、一連の[すぐに使える検出ルール][1]が付属しています。

しかし、環境に応じてルールをカスタマイズしたい場合もあります。たとえば、SQL を受け取って結果を返す本番前の開発ルートに対する攻撃の試みをキャッチする検出ルールをカスタマイズしたいとします。このルートは内部の開発者に制限されているため、SQL の試行をキャッチすることはノイズとなります。したがって、これらのパターンを除外するようにこのルールをカスタマイズすることができます。

他の例としては、内部セキュリティスキャナーを除外するようにルールをカスタマイズすることが挙げられます。ASM は、期待どおりにその活動を検出します。しかし、定期的に発生するスキャンの通知を受けたくない場合があります。

このような場合、カスタム検出ルールを作成することで、そのようなイベントを除外することができます。このガイドでは、ASM のカスタム検出ルールを作成する方法を説明します。

## コンフィギュレーション

OOTB 検出ルールをカスタマイズするには、まず既存のルールを複製する必要があります。[検出ルール][2]に移動して、ルールを選択します。ルールの下までスクロールして、Clone Rule ボタンをクリックします。これで、既存のルールを編集できるようになります。

### ASM クエリの定義

ASM のクエリを作成します。例えば、SQL インジェクションの試行をエンドポイントで監視するクエリを作成します: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`。

オプションで、一意のカウントとシグナルのグループ化を定義します。特定の時間枠で属性に対して観測された一意の値の数をカウントします。定義されたグループ化は、値ごとに各グループ化のシグナルを生成します。 通常、グループ化はエンティティ (ユーザーや IP など) です。グループ化は、[クエリを結合する](#joining-queries)ためにも使用されます。

Add Query ボタンで、クエリを追加することができます。

##### 高度なオプション

**Advanced** オプションをクリックすると、値が満たされたときのみシグナルをトリガーするクエリ (**Only trigger a signal when:**)、または値が満たされたときには決してシグナルをトリガーしないクエリ (**Never trigger a signal when:**) を追加できます。例えば、あるサービスがシグナルをトリガーしているが、そのアクションは良性であり、このサービスからシグナルをトリガーさせたくない場合、**Never trigger a signal when:** オプションで `Service` を除外したログクエリを作成します。

##### クエリを結合する

時間枠にまたがるクエリを結合することで、セキュリティシグナルの信頼度や重大度を高めることができる。例えば、攻撃が成功したことを検知するために、成功したトリガーと失敗したトリガーの両方をサービ スに対して関連付けることができます。

クエリは `group by` 値を使用して関連付けられます。`group by` 値は通常エンティティ (例えば `IP address` や `Service`) ですが、任意の属性を指定することができます。

例えば、同じ `sql_injection` アクティビティを検索する反対のクエリを作成し、成功した場合と失敗した場合に反対の HTTP パスクエリを追加します。

クエリ 1: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`。

クエリ 2: `@appsec.type:sql_injection @http.url_details.path:"/debug-endpoint-executing-sql" env:production`。

この場合、結合されたクエリは技術的に同じ属性値を保持しています。もし `group by` の値が存在しなければ、ケースに合致することはありません。ケースにマッチすると、一意の `group by` 値ごとにセキュリティシグナルが生成されます。

### ルールケースを設定する

#### トリガー

`successful trigger > 0` のようなルールケースは、ケース文として評価されます。したがって、最初にマッチしたケースがシグナルを発生させます。1 つまたは複数のルールケースを作成し、その横にある灰色の領域をクリックして、ドラッグしてその順序を操作します。

ルールケースには、過去に定義されたクエリのイベント数に基づいてシグナルを生成すべきかを判断するための論理演算 (`>、>=、&&、||`) が含まれます。

**注**: クエリラベルは演算子に先行しなければなりません。たとえば、`a > 3` は使用できますが、`3 < a` は許容されません。

各ルールケースにつき、**名前**を付与します。シグナルの生成時には、この名前がルールの名称に追加されます。

#### 重大度および通知

シグナルの重大度を設定します。ドロップダウンから適切な重大度レベル (`INFO`、`LOW`、`MEDIUM`、`HIGH`、`CRITICAL`) を選択してください。

"Notify" セクションで、各ルールケースに対する [通知ターゲット][3]  (0 以上) を構成します。

また、[通知ルール][4]を作成することで、個々の検出ルールに対する通知設定の手動編集を軽減することができます。

### タイムウィンドウ

`evaluation window` は少なくとも 1 つのケースが一致した場合に指定されるスライド式のウィンドウで、リアルタイムで評価が行われます。

シグナルが生成されたら、この `keep alive` ウィンドウ内でケースが少なくとも 1 回一致した場合、そのシグナルは「オープン」状態として残ります。新しいイベントがケースのいずれかと一致する度に、シグナルの*最終更新日付*タイムスタンプが更新されます。

`maximum signal duration` に達すると、シグナルはクエリと一致したかどうかに関わらず「クローズ」されます。この時間は最初に記録されたタイムスタンプに基づいて計算します。

その他のケースを追加する場合は **Add Case** ボタンをクリックします。

**注**: この `evaluation window` は、`keep alive` および `maximum signal duration` 以下でなければなりません。

### Say what's happening

**ルール名**セクションで、ルールリストビューに表示されるルール名や、シグナルのタイトルを構成することができます。

通知ボックスには、同じようにマークダウンとプレビューの機能があります。

#### テンプレート変数

検出ルールは、マークダウン通知ボックス内のテンプレート変数をサポートします。テンプレート変数は、トレースからセキュリティシグナルおよび関連する通知への動的なコンテキストの直接注入を可能にします。

テンプレート変数は、Datadog やパートナーポータルに深くリンクし、調査のための次のステップに素早くアクセスすることもできます。例:

```text
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

Epoch テンプレート変数は、通知内で人間が読みやすい文字列や数学に適した数値を作成します。例えば、関数の中で `first_seen`、`last_seen`、`timestamp` (ミリ秒単位) などの値を使用すると、通知内で読みやすい文字列を受け取ることができます。例:

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

属性は JSON のドロップダウンでシグナル上で見ることができ、`{{@attribute}}` の構文で属性にアクセスすることができます。イベント属性の内部キーには、JSON のドット記法 (例: `{{@attribute.inner_key}}`) でアクセスすることができます。

**注**: セキュリティ シグナルから生の JSON を直接コピーすることができます。シグナルエクスプローラーで任意のセキュリティシグナルを選択し、その詳細を表示します。左上のエクスポートボタンをクリックし、**Copy raw JSON to clipboard** を選択します。

この JSON オブジェクトは、セキュリティシグナルに関連するイベント属性の例です。

```json
{
  "attributes":{
    "title":"Security scanner detected",
    "http":{
      "url":"http://www.example.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"Your rule name"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

この属性の場合、"say what's happening” の部分で以下を使用します。

```
Real routes targeted for {{@service}}.
```

これにより、受け取る通知にサービス名が表示されます。

```
Real routes targeted for `your_service_name`.
```

また、if-else ロジックで、ある属性が存在するかどうかを表記することも可能です。

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

あるいは、if-else ロジックで属性が値と一致するかどうかを確認します。

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

例えば、`attack:sql-injection-attempt` のように、異なるタグでシグナルをタグ付けします。

**注**: `security` タグはセキュリティシグナルの分類に用いられる特殊なタグです。`attack`、`threat-intel`、`compliance`、`anomaly`、`data-leak` など他のタグの使用を推奨します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_platform/default_rules/#cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /ja/monitors/notify/?tab=is_alert#integrations
[4]: /ja/security_platform/notification_rules/