---
aliases:
- /ja/monitors/notify/downtimes/
cascade:
  algolia:
    subcategory: Downtimes
    tags:
    - downtimes
    - mute monitors
description: ダウンタイムをスケジューリングすることで、Datadog モニターが一定期間アラートを出さないようにします。
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: ガイド
  text: ダウンタイム時のアラートを停止する
- link: /monitors/guide/scoping_downtimes
  tag: ガイド
  text: ダウンタイムスケジュールのスコープ
- link: /monitors/quality/
  tag: ドキュメント
  text: 長期間ミュートされているモニターを表示する
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
title: ダウンタイム
---
## 概要 {#overview}

システムのシャットダウン、オフラインメンテナンス、またはアップグレードの際に、モニターが作動しないよう、ダウンタイムのスケジュールを設定します。ダウンタイムはすべてのモニターのアラートと通知をミュートしますが、モニターの状態遷移を妨げることはありません。

{{< img src="/monitors/downtimes/downtime_overview.png" alt="ダウンタイムの例" style="width:100%;" >}}

## セットアップ {#setup}

### ダウンタイムスケジュールを作成する {#create-a-downtime-schedule}

Datadog でモニターのダウンタイムをスケジュールするには、[**Manage Downtime**][1] ページに移動します。次に、右上の **Schedule Downtime** ボタンをクリックします。

個々のモニターをミュートするには、モニターのステータスページ上部にある **Mute** ボタンをクリックします。これにより、その特定のモニターのダウンタイムスケジュールが作成されます。

### サイレントにする対象を選択 {#choose-what-to-silence}

モニター名で特定のモニターにダウンタイムスケジュールを適用したり、モニタータグで広範なモニターに適用したりできます。追加のフィルターを [*Group scope*](#downtime-scope) で適用します。**Preview affected monitors** をクリックして含まれるモニターを確認してください。詳細な例と使用例については、[ダウンタイムスケジュールのスコープ設定][2]を参照してください。

**注**: ダウンタイムがスケジュールされた後に作成または編集されたモニターは、スコープに一致する場合、自動的にダウンタイムに含まれます。

{{< tabs >}}
{{% tab "モニター名で指定" %}}

検索またはドロップダウンメニューを使用して、サイレントにするモニターを選択します。フィールドを空のままにすると、デフォルトですべてのモニターがサイレントになります。特定のホスト、デバイス、または任意のタグにダウンタイムを制限するためにスコープを選択することもできます。**選択したすべてのスコープ**を持つモニターだけがサイレントになります。
{{% /tab %}}
{{% tab "モニタータグで指定" %}}

1 つまたは複数の[モニタータグ][3]に基づいて、ダウンタイムをスケジュールします。1 つのダウンタイムに選択できるタグの最大数は 32 です。各タグの長さは最大 256 文字です。**選択したすべてのタグ**を持つモニターだけがサイレントになります。追加の制約のためにスコープを選択することもできます。

[3]: /ja/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

#### ダウンタイムスコープ {#downtime-scope}
グループスコープを使用して、ダウンタイムに追加のフィルターを適用し、どのモニターをミュートにするかをよりコントロールすることができます。ダウンタイムのグループスコープは、モニター固有の対象の後にマッチします。モニタータグを使用して複数のモニターを対象にする場合、グループスコープに一致させる前にタグ付けされたモニターを見つけます。

たとえば、すべてのサービスの平均レイテンシーを監視するモニターがあり、`web-store` サービスのアップグレードの実行中にリクエストの遅延や潜在的なエラーが発生する可能性があるとします。

`service:web-store` 関連の通知をミュートし、残りのサービスの他の重要なアラートが通常通り配信されるようにするには、モニター対象を選択した後、ダウンタイムのグループスコープに `service:web-store` と入力します。

**注**: これは、`service` や `host` など、複数のできメンションを持つグループでも機能します。`service:web-store` のダウンタイムを作成すると、`service:web-store,host:a` や `service:web-store,host:b` など、該当するサービスを含むすべてのグループがミュートされます。

#### ダウンタイムスコープ構文 {#downtime-scope-syntax}
ダウンタイムスコープのクエリは、プラットフォーム全体で他の多くの製品がサポートしている共通の[検索構文][3]に従います。ダウンタイムのスコープにすべてのグループを含めるには、`Group scope` に `*` と入力します。その他のグループスコープの例を次に示します。

| ダウンタイムグループスコープ | 説明 |
| ------------------- | ---------------------- |
| `service:web-store`       | `web-store` サービスに関するすべての通知をミュートします。|
| `service:web-store AND env:dev`       | `dev` 環境で実行している `web-store` サービスに関するすべての通知をミュートします。|
| `env:(dev OR staging)`       | `dev` または `staging` 環境に関連するすべての通知をミュートします。|
| `service:web-store AND env:(dev OR staging)`       | `dev` または `staging` 環境で実行している `web-store` サービスに関連するすべての通知をミュートします。|
| `host:authentication-*`       | 名前のプレフィックスが `authentication-` であるホストに関連するすべての通知をミュートします。|
| `host:*-prod-cluster`       | 名前のサフィックスが `-prod-cluster` であるホストに関連するすべての通知をミュートします。|
| `host:*-prod-cluster`       | 名前のサフィックスが `-prod-cluster` であるホストに関連するすべての通知をミュートします。|
| `service:webstore AND -env:prod`       | `prod` 環境で**実行していない** `web-store` サービスに関するすべての通知をミュートします。|

#### ダウンタイムスコープの制限 {#downtime-scope-limitations}
**サポートされていない**制限がいくつかあります。

* `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))` のような 2 レベルを超えるネストはサポートされていません。ダウンタイムに使用できるネストは 2 レベルまでです。代わりに、別々のダウンタイムを使用してロジックを分解してください。
* 否定はキー/値のペアと `OR` を持つタグに対してのみサポートされます。たとえば、`-key:value` や `-key(A OR B)` などです。`-service:(A AND B)`、`service:(-A OR -B)`、`-service(A B)` のようなスコープはサポートされていません。
* トップレベルの OR はサポートされていません。たとえば、`service:A OR service:B` は有効ですが、`service:A OR host:X` は機能しません。異なるトップレベルタグ間の `OR` には、2 つの別々のダウンタイムが必要です。
* `prod AND service:(A or B)` や `prod` のようなキーなしのタグはサポートされていません。タグにはキーが必要で、この場合はたとえば `env:prod` です。
* 疑問符のワイルドカード `service:auth?` はサポートされていません。ワイルドカードを使用する必要がある場合は、代わりに `*` を使用してください。
* キー内の無効な文字 `en&v:prod` は有効なダウンタイムスコープではないため、拒否されます。

### ダウンタイムスケジュールの設定 {#set-a-downtime-schedule}

#### 1 回限り {#one-time}

開始日時とタイムゾーンを指定して 1 回のみのダウンタイムを設定します。オプションで終了日時を設定することもできます。

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="1 回限りのダウンタイムをスケジュールするためのフィールド" style="width:90%;">}}

#### 繰り返し {#recurring}

定期的なメンテナンスなどには繰り返しのダウンタイム設定が便利です。開始日時、タイムゾーン、繰り返し条件、期間を指定して定期のダウンタイムを設定します。オプションで終了日や繰り返し回数を設定することもできます。

繰り返しのダウンタイムが 1 つ終了すると、そのダウンタイムがキャンセルされ、同じ制約と更新された開始時間と終了時間で新しいダウンタイムが作成されます。<br>
**注**: 新しく作成されたダウンタイムは、いずれも元の作成者に関連付けられます。

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="営業時間外や週末にアラートをミュートする繰り返しのスケジュールを使用したダウンタイムの構成" style="width:100%;" >}}

ダウンタイムのスケジュールは、[繰り返しルール][4] (RRULE) を使用して定義します。繰り返しのルールを生成するためのツールとして、公式の [RRULE ジェネレーター][5]を使用してください。一般的な使用例としては、毎月第 3 月曜日など、RRULE を使用して月の特定の日のダウンタイムを定義します。繰り返しのその他の使用例については、[ダウンタイムでアラートを抑制する][6]ガイドを参照してください。

**注**: RRULE で期間を指定する属性はサポートされません (例: `DTSTART`、`DTEND`、`DURATION`)。

## 通知 {#notifications}
### メッセージの追加 {#add-a-message}

このダウンタイムについてチームに通知するメッセージを入力します。メッセージフィールドでは標準の Markdown フォーマットと Datadog の `@-notification` 構文が使用できます。フォーマットオプションの詳細については、[通知ページ][7]を参照してください。

### 通知と自動化の構成 {#configure-notifications-and-automations}

チームメンバーを指定したり、サービス[インテグレーション][8]にメッセージを送信することで、通知と自動化を構成します。Datadog はダウンタイムがスケジュール、開始、キャンセル、または期限切れになるたびに指定された宛先に通知を送信します。これらの監査通知により、チームはシステム内のダウンタイムを認識できます。

### 最初の回復通知を無効にする {#disable-first-recovery-notification}

デフォルトでは、Datadog はダウンタイム**前に**トリガーし、ダウンタイム**中に**回復するモニターに対して回復通知を送信します。これは、サードパーティのインテグレーションを使用して、開いたインシデントを自動的にクローズする場合に便利です。チェックボックスを選択すると、これらの通知がミュートされます。

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="最初の回復通知をミュートする" style="width:80%;">}}

最初の回復通知を無効にするオプションは、複数のダウンタイム間で加算されます。たとえば、複数のダウンタイムが重なって同じモニターをミュートする場合、**少なくとも 1 つ**のダウンタイムが無効化オプションをチェックすると、最初の回復通知がミュートされます。

**注**: このオプションは、**最初**の回復通知をミュートします。ダウンタイム中にモニターがトリガーして再び回復する場合、このオプションの設定に関係なく、対応する通知は常にミュートされます。

## 管理 {#manage}

[Manage Downtime ページ][1]には、アクティブおよびスケジュールされたダウンタイムのリストが表示されます。ダウンタイムを選択して詳細を表示、編集、または削除します。詳細には作成者、スコープ、および適用されるモニターのリストが含まれます。
ファセットパネルと検索バーを使用して、`Creator`、`Scope`、`Monitor Tags`、または `Active`、`Automuted`、`Recurring` パラメーターでリストをフィルタリングします。

{{< img src="monitors/downtimes/downtime_manage.png" alt="Manage Downtime ページ" style="width:100%;">}}

### 履歴 {#history}

ダウンタイムの履歴は、グループ遷移履歴にオーバーレイされた形で [Monitor Status][9] ページで表示でき、[イベントエクスプローラー][10] で `tags:audit downtime` を検索することで表示できます。特定のダウンタイムを ID で検索するには、`tags:audit downtime_id:<DOWNTIME_ID>` を使用します。

### ミュート設定 {#muting}

モニターは、`ALERT`、`WARNING`、`RESOLVED`、`NO DATA` 間でステータスが切り替わる際にイベントをトリガーします。モニターがミュートまたはダウンタイムによってサイレント状態になっているときは、`RESOLVED` から別の状態に変わっても、イベントや通知は**トリガーされません**。

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="ダウンタイム中にアラート状態に遷移してもアラートイベントが作成されないことを示すモニターステータスグラフ" style="width:80%;">}}

**注**: モニターステータスページからモニターをミュートまたはミュート解除しても、そのモニターに関連付けられたスケジュールされたダウンタイムは削除されません。ダウンタイムを編集または削除するには、[Manage Downtime][1] ページまたは [API][11] を使用してください。

### 有効期限 {#expiration}

デフォルトでは、ダウンタイムが終了したときにモニターがアラートに値する状態 (`ALERT`、`WARNING`、または `NO DATA`) にある場合、モニターは新しい通知をトリガーします。これは、ダウンタイム中に状態が変化するモニター (例: `OK` から `ALERT`、`WARNING`、または `NO DATA` に) や、ダウンタイムが始まるときにすでにアラートに値する状態にあるモニターに適用されます。ダウンタイムが手動でキャンセルされた場合、モニターがアラートに値する状態に入っていても通知は送信されません。

デフォルトの動作を上書きするには、**Configure notifications and automations** セクションのオプションでダウンタイム終了時に送信する通知を指定します。API で作成されたダウンタイムの場合、デフォルトの動作は `Is cancelled` オプションを除外します。

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="特定のダウンタイム条件を持つモニターの Configure notifications and automations セクション" style="width:100%;">}}

**例 1:** モニターがダウンタイム開始*前*にアラート状態で、ダウンタイム中も*継続*した場合:
1. ダウンタイム中、このアラートの通知は停止されます。
2. モニターはアラートの状態です (依然として条件が満たされているため)。
3. ダウンタイムが終了します。
4. アラート条件が依然として満たされるため、通知が送信されます。

**例 2:** モニターがダウンタイムの開始*前*にアラートの状態で、ダウンタイム*中*にリカバリした場合:
1. `ALERT` 状態から `OK` に移行します。
2. ダウンタイム中にリカバリ通知が送信されます (ダウンタイム中最初のリカバリのみ)。

### モニターレポート {#monitor-report}

モニターがダウンタイム中であっても、すべてのアラート状態は[週次モニターレポート][12]に含まれます。

## オートミュート {#auto-muting}

Datadog は、特定のクラウドワークロードの手動シャットダウンに関連するモニターをプロアクティブにミュートすることができます。シャットダウンの自動ミュートには、次のシナリオがサポートされています。

- **[Amazon EC2 インスタンス][13]** および CloudWatch API からのホストステータスに基づく AWS オートスケーリングによるインスタンスの終了。
- **[Google Compute Engine (GCE)][14]** インスタンスおよび GCE API からのホストステータスに基づく GCE オートスケーリングによるインスタンスの終了。
- **[Azure VMs][15]** は、手動でのシャットダウンや Azure オートスケーリングによるシャットダウンがトリガーされた場合でも、Azure Resource Health API で利用可能な健全性ステータスに基づきます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /ja/monitors/guide/scoping_downtimes
[3]: /ja/logs/explorer/search_syntax/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
[6]: /ja/monitors/guide/suppress-alert-with-downtimes/
[7]: /ja/monitors/notify/#overview
[8]: /ja/integrations/#cat-notification
[9]: /ja/monitors/status/
[10]: /ja/events/explorer
[11]: /ja/api/latest/downtimes/#cancel-a-downtime
[12]: /ja/account_management/#preferences
[13]: /ja/integrations/amazon_ec2/#ec2-automuting
[14]: /ja/integrations/google_compute_engine/#gce-automuting
[15]: /ja/integrations/azure_vm/#automuting-monitors