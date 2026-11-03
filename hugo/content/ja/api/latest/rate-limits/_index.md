---
title: レート制限
type: api
---
{{< h2-with-copy-btn >}}レート制限{{< /h2-with-copy-btn >}}

多くの API エンドポイントでは、レートが制限されています。特定の期間内に所定のリクエスト数を超過すると、Datadog からエラーが返されます。

レート制限がある場合は、応答コードに 429 が表示されます。`X-RateLimit-Period` で指定された時間待ってから再度呼び出すか、`X-RateLimit-Limit` または `X-RateLimit-Period` より少し長い頻度で呼び出しを行うように切り替えることができます。

デフォルトのレート制限を増加させたい場合は、[Datadog のサポートチームにお問い合わせください][1]。

API レート制限ポリシーについて:

- Datadog は、データポイント/メトリクスの送信に対して**レート制限を設けていません** (メトリクスの送信レートの処理方法の詳細については、[メトリクスセクション][2]を参照してください)。制限に達したかどうかは、契約に基づく[カスタムメトリクス][3]の数量によって決まります。
- ログを送信する API はレート制限されていません。
- イベント送信のレート制限は、組織ごとに 1 分あたり `250,000` イベントです。
- エンドポイントのレート制限はさまざまで、以下に詳述するヘッダーに含まれています。これらはオンデマンドで拡張することができます。

<div class="alert alert-danger">
上記のリストは、Datadog API のすべてのレート制限を網羅しているわけではありません。レート制限が発生している場合は、使用している API とその制限の詳細について<a href="https://www.datadoghq.com/support/">サポート</a>までお問い合わせください。</div>

| レート制限ヘッダー      | 説明                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | 期間内に許可されるリクエスト数。            |
| `X-RateLimit-Period`    | リセット期間 (秒)。カレンダーと連携。|
| `X-RateLimit-Remaining` | 現在の期間内で許可される残りのリクエスト数。 |
| `X-RateLimit-Reset`     | 次のリセットまでの時間 (秒)。                       |
| `X-RateLimit-Name`      | 増加リクエストのレート制限の名前。           |

### Datadog API 使用量メトリクス {#datadog-api-usage-metrics}

すべての Datadog API には、一定期間の使用制限が設けられています。API は、使用されるリソースに応じて、固有の個別レート制限バケットを持つことも、単一のバケットにグループ化されることもあります。たとえば、モニターステータス API には、人間や自動化スクリプトが 1 分間にクエリを実行できる回数を制限するレート制限があります。エンドポイントは、過剰なリクエストを 429 レスポンスコードで拒否し、リセット期間が終了するまで待機するように通知します。API 使用量メトリクスを使用すると、Datadog ユーザーは API エンドポイント (メトリクス、ログ、イベント送信エンドポイントを除く) の API レート制限消費量をセルフサービスで監査できます。以下のダッシュボード、メトリクス、タグを使用して、許可されたリクエストとブロックされたリクエストを表示します。

これらのメトリクスの構築済みビューについては、[Datadog API レート制限可視化ダッシュボード][5]を参照してください。ダッシュボードを開く前に、このページのサイトセレクターで Datadog サイトを選択してください。

#### レート制限可視化メトリクス {#rate-limit-visibility-metrics}

レート制限可視化メトリクスは、`datadog.apis.rate_limit.usage.*` ネームスペースを使用します。メトリクス名は、構成されたレート制限のスコープを識別します。

| スコープ | 許可されたリクエスト | ブロックされたリクエスト | 利用率 |
|-------|------------------|------------------|-------------|
| 組織 | `datadog.apis.rate_limit.usage.per_org_count` | `datadog.apis.rate_limit.usage.per_org_blocked_count` | `datadog.apis.rate_limit.usage.per_org_pct` |
| ユーザー | `datadog.apis.rate_limit.usage.per_user_count` | `datadog.apis.rate_limit.usage.per_user_blocked_count` | `datadog.apis.rate_limit.usage.per_user_pct` |
| API キー | `datadog.apis.rate_limit.usage.per_api_key_count` | `datadog.apis.rate_limit.usage.per_api_key_blocked_count` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

許可されたリクエストのメトリクスは、API が許可したリクエストをカウントします。ブロックされたリクエストのメトリクスは、レート制限を超過したために API が拒否したリクエストをカウントします。`*_pct`メトリクスは、構成された制限に対する割合として、試行されたリクエストの合計 (許可されたリクエストとブロックされたリクエストの合計) を報告します。ここで `100` は完全な利用率を表します。`100` を超える値は、制限を超過したためにリクエストがブロックされたことを示します。

ダッシュボードウィジェットの場合、許可されたリクエストおよびブロックされたリクエストのメトリクスに対して分単位の `sum(60s)` ロールアップを使用し、1 分あたりのリクエスト数を表示します。間隔には最大 `*_pct` 値を使用して、ピーク時の利用率を表示します。メトリクスを `default_zero()` と組み合わせる場合は、以下のクエリ例に示すように、各用語を `+` で囲んでください。

以下のゲージは、各レート制限名に対して設定されたリクエスト制限を報告します。メトリクス名は以下のスコープを識別します。

| スコープ | 設定されたリクエスト制限 |
|-------|--------------------------|
| 組織 | `datadog.apis.rate_limit.usage.per_org_limit_count` |
| ユーザー | `datadog.apis.rate_limit.usage.per_user_limit_count` |
| API キー | `datadog.apis.rate_limit.usage.per_api_key_limit_count` |

##### 利用可能なタグ {#available-tags}

| タグ名 | 説明 | 可用性 |
|----------|-------------|--------------|
| `app_key_id` | リクエストに関連付けられたアプリケーションキー ID。リクエストでアプリケーションキーが使用されていない場合、このタグは空白の値で存在します。| カウント、ブロックされたカウント、利用率メトリクス |
| `child_org_name` | コピーされたメトリクスによって表される子組織の表示名。| 次を含むすべてのメトリクス: `org_scope:child_org` |
| `limit_name` | レート制限の名前。異なるエンドポイントが同じ名前を共有する場合があります。| すべてのメトリクス |
| `org_scope` | メトリクスとそれを表示する組織との関係。: その組織自身のトラフィックの場合は `current_org`、ルート組織から表示される子組織のコピーの場合は `child_org` となります。| すべてのメトリクス |
| `user_uuid` | リクエストに関連付けられたユーザーの UUID。| カウント、ブロックされたカウント、利用率メトリクス |

子組織からメトリクスを表示する場合、その組織独自のメトリクスは `org_scope:current_org` を使用します。`org_scope:child_org` 値と `child_org_name` タグは、ルート組織に送信される追加コピーにのみ表示されます。

##### クエリ例 {#query-examples}

レート制限名別の許可されたリクエスト
: 3 つの `*_count` メトリクスの合計を `limit_name` 別にグラフ化します。<br /><br />
  **例:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_count{*} by {limit_name})`

レート制限名別のブロックされたリクエスト
: 3 つの `*_blocked_count` メトリクスの合計を`limit_name` 別にグラフ化します。<br /><br />
  **例:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_blocked_count{*} by {limit_name})`

#### 従来の使用量メトリクスから移行する {#migrate-from-legacy-usage-metrics}

`datadog.apis.rate_limit.usage.*` メトリクスは `datadog.apis.usage.*` メトリクスに置き換わります。ダッシュボードとモニターを以下の置換内容で更新してください。`datadog.apis.usage.*` でフィルタリングされていない従来の `rate_limit_status` メトリクスに対するクエリは、許可されたリクエストとブロックされたリクエストを合算してカウントしていました。その合計を維持するには、対応する `*_blocked_count` メトリクスを `*_count` の置換と併せて追加してください。

|  従来のメトリクス | 置換メトリクス |
|---------------|--------------------|
| `datadog.apis.usage.per_org` | `datadog.apis.rate_limit.usage.per_org_count` |
| `datadog.apis.usage.per_org_ratio` | `datadog.apis.rate_limit.usage.per_org_pct` |
| `datadog.apis.usage.per_user` | `datadog.apis.rate_limit.usage.per_user_count` |
| `datadog.apis.usage.per_user_ratio` | `datadog.apis.rate_limit.usage.per_user_pct` |
| `datadog.apis.usage.per_api_key` | `datadog.apis.rate_limit.usage.per_api_key_count` |
| `datadog.apis.usage.per_api_key_ratio` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

置換メトリクスは、以下の点で従来のメトリクスと異なります。

- 許可されたリクエストとブロックされたリクエストは、`rate_limit_status` タグではなく個別のメトリクスを使用します。従来のステータスフィルターを、対応する許可リクエストメトリクスまたはブロックリクエストメトリクスに置き換えてください。利用率メトリクスは、許可されたリクエストとブロックされたリクエストを組み合わせたものです。
- `org_scope` タグと `child_org_name` タグは、従来の `child_org` タグに置き換わります。ルート組織から `org_scope:child_org` でフィルタリングし、`child_org_name` を使用して子組織の表示名でフィルタリングまたはグループ化します。閲覧している組織自身のトラフィックには `org_scope:current_org` を使用します。
- `limit_count` タグと `limit_period` タグは含まれていません。設定されたリクエスト制限には、対応する `*_limit_count` ゲージを使用します。`X-RateLimit-Period` レスポンスヘッダーからレート制限期間を読み取ります。

### レート制限を引き上げる {#increase-your-rate-limit}
レート制限の引き上げをリクエストするには、**Help** > **New Support Ticket** から、以下の詳細を記載したサポートチケットを作成してください。レート制限の引き上げリクエストを受け取ると、サポートエンジニアリングチームがケースバイケースでリクエストを検討し、必要に応じて社内のエンジニアリングリソースと連携して、レート制限の引き上げリクエストの実現可能性を確認します。

    Title:
        Request to increase rate limit on endpoint: X

    Details:
        We would like to request a rate limit increase for API endpoint: X
        Example use cases/queries:
            Example API call as cURL or as URL with example payload

        Motivation for increasing rate limit:
            Example - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day.

        Desired target rate limit:
            Tip - Having a specific limit increase or percentage increase in mind helps Support Engineering expedite the request to internal Engineering teams for review.

Datadog サポートがユースケースを検討して承認した後、バックエンドでレート制限の引き上げを適用できます。Datadog は SaaS であるため、レート制限の引き上げには上限があることに注意してください。Datadog サポートは、ユースケースやエンジニアリングチームの推奨事項に基づいて、レート制限の引き上げを拒否する権利を留保します。

### 監査ログ {#audit-logs}
API 制限および使用量メトリクスは、使用パターンやブロックされたリクエストに関するインサイトを提供します。詳細が必要な場合は、Audit Trail が API アクティビティに対してより詳細な可視性を提供します。

Audit Trail では、次のようなデータを表示することができます。
* **IP アドレスと位置情報** – API リクエストの発信元を特定します。
* **アクタータイプ** – サービスアカウントとユーザーアカウントを区別します。
* **API キーとアプリキーの認証** – リクエストが API キー経由で行われたか、ユーザーによって直接行われたかを確認します。
* **関連イベント** – 設定変更やセキュリティ関連のアクションなど、同時に発生している他のイベントを表示することができます。

Audit Trail は、API の消費状況やブロックされたリクエストに関する詳細なコンテキストを提供することにより、チームがレート制限の問題をトラブルシューティングする上で役立ちます。また、セキュリティおよびコンプライアンスの目的で、組織全体の API 使用状況を追跡することも可能にします。

API アクティビティをより詳細に可視化するには、**[Audit Trail][4]** の使用を検討してください。


[1]: /ja/help/
[2]: /ja/api/v1/metrics/
[3]: /ja/metrics/custom_metrics/
[4]: /ja/account_management/audit_trail/events/
[5]: https://app.datadoghq.com/dash/integration/datadog_api_rate_limit_visibility