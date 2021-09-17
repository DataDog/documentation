---
title: イベント
kind: documentation
aliases:
  - /ja/guides/eventcorrelation/
  - /ja/guides/markdown/
  - /ja/graphing/event_stream/
further_reading:
  - link: /api/v1/events/
    tag: ドキュメント
    text: Datadog イベント API
  - link: /dashboards/widgets/event_stream/
    tag: Documentation
    text: イベントストリームウィジェットをダッシュボードに追加する
---
イベントは、エンジニア（開発、運用、セキュリティ）にとって注目に値するアクティビティの記録です。Datadog へ[イベントを送信][1]する方法については、 開発者用ドキュメントを参照してください。

{{< site-region region="us" >}}
## イベントストリーム

[イベントストリーム][2]は、インフラストラクチャーと関連モニターによって生成された最新のイベントを表示します。

[2]: https://app.datadoghq.com/event/stream

{{< /site-region >}}
{{< site-region region="eu" >}}
## イベントストリーム

[イベントストリーム][3]は、インフラストラクチャーと関連モニターによって生成された最新のイベントを表示します。

[3]: https://app.datadoghq.eu/event/stream
{{< /site-region >}}
{{< site-region region="gov" >}}
## イベントエクスプローラー

[イベントエクスプローラー][4]は、インフラストラクチャーと関連モニターによって生成された最新のイベントを表示します。イベントの右上にある **Options** ボタンを使用して、表示する列をカスタマイズできます。


[4]: https://app.ddog-gov.com/event/explorer
{{< /site-region >}}
{{< site-region region="us3" >}}
## イベントエクスプローラー

[イベントエクスプローラー][5]は、インフラストラクチャーと関連モニターによって生成された最新のイベントを表示します。イベントの右上にある **Options** ボタンを使用して、表示する列をカスタマイズできます。


[5]: https://us3.datadoghq.com/event/explorer
{{< /site-region >}}

### 検索

#### 全文検索

全文検索は、フィルターの適用後に検索クエリに入力されるすべてのキーワードに使用できます。全文検索はイベントテキスト、タイトル、タグ、イベントにコメントしたユーザー、ホスト名、イベントに紐づけられたデバイスの中を検索します。

#### フィルター

以下のプレフィックスを使用して、特定のイベント属性を対象とします。


{{< site-region region="us" >}}


`sources:github,chef` 
: GitHub または Chef からのイベントを表示します。

`tags:env-prod,db` 
: #env-prod または #db でタグ付けされたイベントを表示します。

`hosts:i-0ade23e6,db.myapp.com`
: i-0ade23e6 または db.myapp.com からのイベントを表示します。

`status:error` 
: error ステータスのイベントを表示します (サポートされるステータス: `error`、`warning`、`success`)。

`priority:low` 
: 優先度が低い (low) イベントのみを表示します (サポートされる優先度: `low` 、`normal`、デフォルトは `all`)。

{{< /site-region >}}
{{< site-region region="eu" >}}

`sources:github,chef` 
: GitHub または Chef からのイベントを表示します。

`tags:env-prod,db` 
: #env-prod または #db でタグ付けされたイベントを表示します。

`hosts:i-0ade23e6,db.myapp.com`
: i-0ade23e6 または db.myapp.com からのイベントを表示します。

`status:error` 
: error ステータスのイベントを表示します (サポートされるステータス: `error`、`warning`、`success`)。

`priority:low` 
: 優先度が低い (low) イベントのみを表示します (サポートされる優先度: `low` 、`normal`、デフォルトは `all`)。

{{< /site-region >}}
{{< site-region region="gov" >}}

`source:github,chef` 
: GitHub または Chef からのイベントを表示します。

`host:i-0ade23e6,db.myapp.com` 
: i-0ade23e6 または db.myapp.com からのイベントを表示します。

`service:kafka`                
: `kafka` サービスからのイベントを表示します。

`status:error` 
: error ステータスのイベントを表示します (サポートされるステータス: `error`、`warning`、`success`)。

`role:`                        
: 

`availability-zone:us-east-1a` 
: `us-east-1a` AWS アベイラビリティーゾーン (AZ) でイベントを表示します。

`container_id:foo`             
: ID が `foo` のコンテナからのイベントを表示します。

`@evt.name:foo`                
: `foo` という名前のイベントを表示します。

{{< /site-region >}}
{{< site-region region="us3" >}}

`source:github,chef` 
: GitHub または Chef からのイベントを表示します。

`host:i-0ade23e6,db.myapp.com` 
: i-0ade23e6 または db.myapp.com からのイベントを表示します。

`service:kafka`                
: `kafka` サービスからのイベントを表示します。

`status:error` 
: error ステータスのイベントを表示します (サポートされるステータス: `error`、`warning`、`success`)。

`role:`                        
: 

`availability-zone:us-east-1a` 
: `us-east-1a` AWS アベイラビリティーゾーン (AZ) でイベントを表示します。

`container_id:foo`             
: ID が `foo` のコンテナからのイベントを表示します。

`@evt.name:foo`                
: `foo` という名前のイベントを表示します。

{{< /site-region >}}

**注**: フィルターは完全一致検索を行います。部分的な文字列は考慮されません。

{{< site-region region="gov" >}}
#### コンテキスト

適切な時間範囲を選択して、イベントエクスプローラーページでイベントを探索するためのコンテキストを構築し、検索バーを使用してイベントと分析をフィルタリングします。

#### ファセットとメジャー

収集後、イベントの属性をファセットまたはメジャーとしてインデックス化することができます。左側で、ファセットやメジャーを使用して結果を絞り込みます。既存のイベントタグまたは属性から新しいファセットまたはメジャーを作成できます。

**ファセット**には、1 つの属性またはタグの個別メンバーがすべて表示されると共に、表示されたイベントの数などの基本的な分析が提供されます。ファセットを使用すると、特定の属性に基づきデータセットの絞り込みや切り口の切り替えができます。絞り込むには、表示する値を選択します。ファセットとして属性を使用するには、クリックして **Create facet** オプションを使用します。この属性の値はすべての新規イベントに保存されます。

**メジャー**は、イベントに含まれる数値を伴う属性です。メジャーとして属性を使用するには、数値の属性をクリックし、**Create measure** オプションを使用します。この属性の値はすべての新規イベントに保存されます。

#### 保存済みビュー

保存済みビューを使用すると、事前に選択したファセット、メジャー、検索、タイムレンジ、および可視化方法の組み合わせで、自動的にイベントエクスプローラーを構成できます。詳細については、[保存済みビューに関するドキュメント][5]を参照してください。


[5]: logs/explorer/saved_views/
{{< /site-region >}}
{{< site-region region="us3" >}}
#### コンテキスト

適切な時間範囲を選択して、イベントエクスプローラーページでイベントを探索するためのコンテキストを構築し、検索バーを使用してイベントと分析をフィルタリングします。

#### ファセットとメジャー

収集後、イベントの属性をファセットまたはメジャーとしてインデックス化することができます。左側で、ファセットやメジャーを使用して結果を絞り込みます。既存のイベントタグまたは属性から新しいファセットまたはメジャーを作成できます。

**ファセット**には、1 つの属性またはタグの個別メンバーがすべて表示されると共に、表示されたイベントの数などの基本的な分析が提供されます。ファセットを使用すると、特定の属性に基づきデータセットの絞り込みや切り口の切り替えができます。絞り込むには、表示する値を選択します。ファセットとして属性を使用するには、クリックして **Create facet** オプションを使用します。この属性の値はすべての新規イベントに保存されます。

**メジャー**は、イベントに含まれる数値を伴う属性です。メジャーとして属性を使用するには、数値の属性をクリックし、**Create measure** オプションを使用します。この属性の値はすべての新規イベントに保存されます。

#### 保存済みビュー

保存済みビューを使用すると、事前に選択したファセット、メジャー、検索、タイムレンジ、および可視化方法の組み合わせで、自動的にイベントエクスプローラーを構成できます。詳細については、[保存済みビューに関するドキュメント][6]を参照してください。


[6]: logs/explorer/saved_views/
{{< /site-region >}}

{{< site-region region="us" >}}
#### 高度な検索

より高度な検索には、次のような Datadog イベントクエリ言語を使用します。

`tags:env-prod OR db`
: #env-prod または #db でタグ付けされたイベントを表示します。

`tags:security-group:sg-123 AND role:common-node` 
: `#security-group:sg-123` と `#role:common-node` でタグ付けされたイベントを表示します。タグ

`cloud_provider:* NOT "azure"` 
: "azure" でタグ付けされたプロバイダーを除くすべてのクラウドプロバイダーを表示します。

タグ検索機能を使用して、同じケータグを持つすべてのイベントを検索します。たとえば、

`tags:<KEY>:<VALUE>` 
: `<KEY>:<VALUE>` タグを持つイベントを表示します。

`<KEY>:*` 
: `<KEY>` がアタッチされたすべてのイベントを表示します。

`<KEY>`:`<REGEX>` 
: `<VALUE>` と `<REGEX>` が一致する `<KEY>:<VALUE>` タグを持つすべてのイベントを表示します。

`tags:<KEY>` 
: 無効な検索方法です。

`<KEY>:<VALUE>`
: 無効な検索方法です。

複合クエリで複数の条件を組み合わせるには、以下のブール演算子を使用します。

`AND` 
: **積**: 両方の条件を含むイベントが選択されます (タグの場合は、何も追加しなければ、`AND` がデフォルトです)。
: **例**: `redis_* AND down`

`OR` 
: **和**: いずれかの条件を含むイベントが選択されます。タグの場合はカンマ (`,`) を使用します。
: **例**: `sources:nagios,chef directory OR Mixlib`

`NOT` 
: **排他**: 後続の条件はイベントに含まれません。この演算子は文字列に対してのみ機能します。タグの場合は直前に `-` を使用します。
: **例**: `-tags:<KEY>:<VALUE> NOT "<STRING>"`

**注**: ブールロジックなど一部の高度なクエリ言語では、イベントストリームページでのみ機能し、グラフタイルやダッシュボードウィジェットでは利用できません。

プレフィックスを組み合わせて、さらに複雑な検索を作成できます。たとえば、`chef` または `nagios` のオープンエラーのうち、`cassandra` に言及しているものを検索する場合は、以下を使用します。

```text
sources:nagios,chef status:error cassandra
```

**注**: これらのリストでは、コロンまたはカンマのあとでスペースを使用できません。プレフィックスにアタッチされていないものはすべて全文検索になります。
{{< /site-region >}}

{{< site-region region="eu" >}}
#### 高度な検索

より高度な検索には、次のような Datadog イベントクエリ言語を使用します。

`tags:env-prod OR db`
: #env-prod または #db でタグ付けされたイベントを表示します。

`tags:security-group:sg-123 AND role:common-node` 
: `#security-group:sg-123` と `#role:common-node` でタグ付けされたイベントを表示します。タグ

`cloud_provider:* NOT "azure"` 
: "azure" でタグ付けされたプロバイダーを除くすべてのクラウドプロバイダーを表示します。

タグ検索機能を使用して、同じケータグを持つすべてのイベントを検索します。たとえば、

`tags:<KEY>:<VALUE>` 
: `<KEY>:<VALUE>` タグを持つイベントを表示します。

`<KEY>:*` 
: `<KEY>` がアタッチされたすべてのイベントを表示します。

`<KEY>`:`<REGEX>` 
: `<VALUE>` と `<REGEX>` が一致する `<KEY>:<VALUE>` タグを持つすべてのイベントを表示します。

`tags:<KEY>` 
: 無効な検索方法です。

`<KEY>:<VALUE>`
: 無効な検索方法です。

複合クエリで複数の条件を組み合わせるには、以下のブール演算子を使用します。

`AND` 
: **積**: 両方の条件を含むイベントが選択されます (タグの場合は、何も追加しなければ、`AND` がデフォルトです)。
: **例**: `redis_* AND down`

`OR` 
: **和**: いずれかの条件を含むイベントが選択されます。タグの場合はカンマ (`,`) を使用します。
: **例**: `sources:nagios,chef directory OR Mixlib`

`NOT` 
: **排他**: 後続の条件はイベントに含まれません。この演算子は文字列に対してのみ機能します。タグの場合は直前に `-` を使用します。
: **例**: `-tags:<KEY>:<VALUE> NOT "<STRING>"`

**注**: ブールロジックなど一部の高度なクエリ言語では、イベントストリームページでのみ機能し、グラフタイルやダッシュボードウィジェットでは利用できません。

プレフィックスを組み合わせて、さらに複雑な検索を作成できます。たとえば、`chef` または `nagios` のオープンエラーのうち、`cassandra` に言及しているものを検索する場合は、以下を使用します。

```text
sources:nagios,chef status:error cassandra
```

**注**: これらのリストでは、コロンまたはカンマのあとでスペースを使用できません。プレフィックスにアタッチされていないものはすべて全文検索になります。
{{< /site-region >}}

{{< site-region region="gov" >}}
#### 高度な検索

より高度な検索には、Datadog ログクエリ言語を使用します。詳しくは、[ログ検索の構文][6]に関するドキュメントを参照してください。

複合クエリで複数の条件を組み合わせるには、以下のブール演算子を使用します。

`AND` 
: **積**: 両方の条件を含むイベントが選択されます (タグの場合は、何も追加しなければ、`AND` がデフォルトです)。
: **例**: `redis_* AND down`

`OR` 
: **和**: いずれかの条件を含むイベントが選択されます。タグの場合はカンマ (`,`) を使用します。
: **例**: `sources:nagios,chef directory OR Mixlib`

`NOT` 
: **排他**: 後続の条件はイベントに含まれません。この演算子は文字列に対してのみ機能します。タグの場合は直前に `-` を使用します。
: **例**: `-tags:<KEY>:<VALUE> NOT "<STRING>"`

[6]: /ja/logs/search_syntax/

{{< /site-region >}}
{{< site-region region="us3" >}}
#### 高度な検索

より高度な検索には、Datadog ログクエリ言語を使用します。詳しくは、[ログ検索の構文][7]に関するドキュメントを参照してください。

複合クエリで複数の条件を組み合わせるには、以下のブール演算子を使用します。

`AND` 
: **積**: 両方の条件を含むイベントが選択されます (タグの場合は、何も追加しなければ、`AND` がデフォルトです)。
: **例**: `redis_* AND down`

`OR` 
: **和**: いずれかの条件を含むイベントが選択されます。タグの場合はカンマ (`,`) を使用します。
: **例**: `sources:nagios,chef directory OR Mixlib`

`NOT` 
: **排他**: 後続の条件はイベントに含まれません。この演算子は文字列に対してのみ機能します。タグの場合は直前に `-` を使用します。
: **例**: `-tags:<KEY>:<VALUE> NOT "<STRING>"`

[7]: /ja/logs/search_syntax/

{{< /site-region >}}

{{< site-region region="us" >}}
### 集計

デフォルトでは、関連するイベントはイベントストリームに表示される際に集計されます。集計されていないイベントを表示するには、イベントストリームの右上にある **Aggregate related events** のチェックを外します。

{{< img src="events/event_stream_aggregated.png" alt="集計されたイベントストリーム"  style="width:50%;" >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
### 集計

デフォルトでは、関連するイベントはイベントストリームに表示される際に集計されます。集計されていないイベントを表示するには、イベントストリームの右上にある **Aggregate related events** のチェックを外します。

{{< img src="events/event_stream_aggregated.png" alt="集計されたイベントストリーム"  style="width:50%;" >}}
{{< /site-region >}}

### 通知

Datadog は `@notifications` をサポートします。たとえば、

`@support-datadog` 
: イベントに直接投稿された際に、Datadog サポートチケットを作成します（コメントを含む）。

`@all` 
: `@all` – オーガニゼーションの全メンバーに通知を送信します。

`@john`                                 
: `john` という名前のユーザーに通知します。

`@test@example.com`
: 電子メールを `test@example.com` に送信します。

`@slack-<SLACK_ACCOUNT>-<CHANNEL_NAME>` 
: 指定した Slack チャンネルに、イベントやグラフを投稿します。

`@webhook` 
: Webhook をアラートまたはトリガーします。[Webhooks に関するブログ記事][7]を参照してください。

`@pagerduty`
: Pagerduty にアラートを送信します。`@pagerduty-acknowledge` と `@pagerduty-resolve` も使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/guides/
[2]: https://app.datadoghq.com/event/stream
[3]: https://app.datadoghq.eu/event/stream
[4]: https://gov.datadoghq.com/event/stream
[5]: /ja/logs/explorer/saved_views/
[6]: /ja/logs/search_syntax/
[7]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio