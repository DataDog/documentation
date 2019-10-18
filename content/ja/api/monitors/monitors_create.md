---
title: モニターの作成
type: apicontent
order: 26.01
external_redirect: '/api/#create-a-monitor'
---
## モニターの作成

モニターをプログラムで管理およびデプロイしている場合は、Datadog UI でモニターを定義し、[有効な JSON をエクスポートする][1]方が簡単です。

##### 引数
*   **`type`** [必須]:
    [モニターの種類][2]を以下から選択します。

| モニターの種類 | 種類の属性値            |
| :--------    | :-------                        |
| 異常値      | `query alert`                   |
| apm          | `query alert`                   |
| 複合条件    | `composite`                     |
| カスタム       | `service check`                 |
| イベント        | `event alert`                   |
| 予測値     | `query alert`                   |
| ホスト         | `service check`                 |
| インテグレーション  | `query alert` または `service check`  |
| ライブプロセス | `process alert`                 |
| logs         | `log alert`                     |
| メトリクス       | `metric alert`                  |
| ネットワーク      | `service check`                 |
| 外れ値      | `query alert`                   |
| プロセス      | `service check`                 |
| Watchdog     | `event alert`                   |

*   **`query`** [必須]:
    クエリは、モニターがトリガーするタイミングを定義します。クエリ構文は、作成するモニターの種類に依存します。

    ##### メトリクスアラートのクエリ
    `time_aggr(time_window):space_aggr:metric{tags} [by {key}] operator #`

    -   `time_aggr`: avg、sum、max、min、change、または pct_change
    -   `time_window`: `last_#m` (`#` は 5、10、15、30)、`last_#h`(`#` は 1、2、4)、または `last_1d`
    -   `space_aggr`: avg、sum、min、または max
    -   `tags`: 1 つ以上のタグ (カンマ区切り)、または *
    -   `key`: key:value タグ構文内の 'key'。グループ内のタグごとに異なるアラートを定義します (マルチアラート)
    -   `operator`: <、<=、>、>=、==、または !=
    -   `#`: しきい値の設定に使用される整数または小数

    `_change_` または `_pct_change_` 時間集計関数を使用する場合は、代わりに `change_aggr(time_aggr(time_window), timeshift):space_aggr:metric{tags} [by {key}] operator #` を次のように使用します。

    *   `change_aggr` change、pct_change
    *   `time_aggr` avg、sum、max、min [詳細はこちら][3]
    *   `time_window` last\_#m (1、5、10、15、30)、last\_#h (1、2、4)、または last_#d (1 または 2)
    *   `timeshift` #m_ago (5、10、15、30)、#h_ago (1、2、4)、または 1d_ago

    次のクエリを使用して、外れ値モニターを作成できます: `avg(last_30m):outliers(avg:system.cpu.user{role:es-events-data} by {host}, 'dbscan', 7) > 0`

    ##### サービスチェックのクエリ
    `"check".over(tags).last(count).count_by_status()`

    *   **`check`** チェックの名前。例: datadog.agent.up
    *   **`tags`** 引用符で囲まれた 1 つ以上のタグ (カンマ区切り)、または "*"。例: `.over("env:prod", "role:db")`
    *   **`count`** 最大しきい値 (`options` で定義) 以上である必要があります。例: ステータス 1 を critical、3 を OK、2 を warn と通知する場合は、count を 3 にする必要があります。上限値は 10 です。

    ##### イベントアラートのクエリ

    `events('sources:nagios status:error,warning priority:normal tags: "string query"').rollup("count").last("1h")"`

    *  **`event`** イベントクエリ文字列。
    *   **`string_query`** イベントタイトルおよびテキストと照合するフリーテキストクエリ。
    *   **`sources`** イベントソース (カンマ区切り)。[ソース属性値のリストはこちら][4]を参照してください。
    *   **`status`** イベントステータス (カンマ区切り)。有効なオプション: error、warn、info。
    *   **`priority`** イベントの優先度 (カンマ区切り)。有効なオプション: low、normal、all。
    *   **`host`** イベントを報告しているホスト (カンマ区切り)。
    *   **`tags`** イベントタグ (カンマ区切り)。
    *   **`excluded_tags`** 除外されるイベントタグ (カンマ区切り)。
    *   **`rollup`** 統計のロールアップ方法。現時点でサポートされている方法は `count` だけです。
    *   **`last`** カウントをロールアップするタイムフレーム。例: 60s、4h。サポートされているタイムフレーム: s、m、h、d。

    ##### プロセスアラートのクエリ

    `processes(search).over(tags).rollup('count').last(timeframe) operator #`

    *   **`search`** プロセスの問い合わせに使用するフリーテキスト検索文字列。一致するプロセスは、[ライブプロセス][5]ページの結果と一致します。
    *   **`tags`** 1 つ以上のタグ (カンマ区切り)
    *   **`timeframe`** カウントをロールアップするタイムフレーム。例: 60s、4h。サポートされているタイムフレーム: s、m、h、d
    *   **`operator`** <、<=、>、>=、==、または !=
    *   **`#`** しきい値の設定に使用される整数または小数

    ##### 複合条件のクエリ

    `12345 && 67890`。ここで、`12345` と `67890` は非複合条件モニターの ID です

* **`name`** [必須、デフォルト = **dynamic。クエリに基づく**]:
    アラートの名前。
* **`message`** [必須、デフォルト = **dynamic。クエリに基づく**]:
    このモニターの通知に含めるメッセージ。イベントと同じ「@username」表記を使用して、特定のユーザーに電子メール通知を送信できます。
* **`tags`** [オプション、デフォルト = **空のリスト**]:
    モニターに関連付けられるタグのリスト。API からすべてのモニター詳細を取得する際は、`monitor_tags` 引数を使用して、これらのタグで結果を絞り込みます。API からのみ使用できます。Datadog UI には表示されず、編集もできません。

* **`options`** [オプション、デフォルト = **{}**]:
    モニターのオプションの辞書。すべての種類に共通のオプションと、一部の種類のモニターに固有のオプションがあります。
    ##### 共通のオプション

    *   **`silenced`** スコープからタイムスタンプへの辞書または `None`。各スコープは、指定された POSIX タイムスタンプまで、または値が `None` の場合は無制限にミュートされます。デフォルト: **None**
        例:
        *   アラートを完全にミュートするには: `{'*': None}`
        *   しばらくの間 `role:db` をミュートするには: `{'role:db': 1412798116}`

    *   **`new_host_delay`** モニター結果の評価を開始する前に、ホストがブートし、アプリケーションが完全に起動するまで待つ時間 (秒単位)。負でない整数である必要があります。デフォルト: **300**

    *   **`notify_no_data`** データが報告を停止したことをこのモニターが通知するかどうかを示すブール値。デフォルト: **false**

    *   **`no_data_timeframe`** データが報告を停止してから何分後にモニターが通知を行うか。`notify_no_data` が `true` に設定されている場合、このパラメーターは必須です。メトリクスアラートの場合は少なくともモニタータイムフレームの 2 倍、サービスのチェックの場合は少なくとも 2 分にする必要があります。デフォルト: **メトリクスアラートの場合はタイムフレームの 2 倍、サービスチェックの場合は 2 分**

    *   **`timeout_h`** データを報告していないモニターが、トリガーされた状態から自動的に回復するまでの時間数。デフォルト: **None**。

    *   **`require_full_window`** このモニターがウィンドウ全体のデータを取得するまで評価を行わないかどうかを示すブール値。疎なメトリクスの場合は `False` に設定することを強くお勧めします。そうしないと、一部の評価がスキップされます。デフォルト: "on average"、"at all times"、および "in total" 集計の場合は **True**、それ以外の場合は **False**。

    *   **`renotify_interval`** モニターが最後に通知してから現在のステータスを再通知するまでの分数。これは、回復していないことを再通知するだけです。デフォルト: **None**。

    *   **`escalation_message`** 再通知に含めるメッセージ。他の場所と同様に '@username' 通知をサポートします。`renotify_interval` が `None` の場合は適用されません。デフォルト: **None**。

    *   **`notify_audit`** タグ付けされたユーザーに、このモニターへの変更が通知されるかどうかを示すブール値。デフォルト: **False**

    *   **`locked`** このモニターへの変更を作成者または管理者に制限するかどうかを示すブール値。デフォルト: **False**

    *   **`include_tags`** このモニターからの通知のタイトルに、トリガーしているタグを自動的に挿入するかどうかを示すブール値。デフォルト: **True** 例:
        *   True: `[Triggered on {host:h1}] Monitor Title`
        *   False: `[Triggered] Monitor Title`

    ##### 異常値のオプション
    これらのオプションは異常値モニターにのみ適用され、他の種類のモニターでは無視されます。

    -   **`threshold_windows`** `recovery_window` と `trigger_window` からなる辞書。
        * `recovery_window` 異常メトリクスがどのくらいの期間正常であればアラートから回復するかを記述します。
        * `trigger_window` メトリクスがどのくらいの期間異常であればアラートをトリガーするかを記述します。

            例: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

    ##### メトリクスアラートのオプション
    これらのオプションはメトリクスアラートにのみ適用されます。

    -   **`thresholds`** しきい値タイプ別のしきい値の辞書。メトリクスアラートには、critical と warning という 2 種類のしきい値があります。Critical はクエリで定義されますが、このオプションで指定することもできます。Warning しきい値は、しきい値オプションを使用してのみ指定できます。
    モニターに[リカバリしきい値][6]を使用する場合は、`critical_recovery` および `warning_recovery` 属性を使用します。

            例: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

    -   **`evaluation_delay`** 評価を遅延させる時間 (秒単位)。負以外の整数です。たとえば、この値を 300 (5 分)、タイムフレームを last_5m、時刻を 7:00 に設定すると、モニターは、6:50 から 6:55 までのデータを評価します。これは、モニターが評価時に常にデータを取得できるため、AWS CloudWatch などのバックフィルされるメトリクスで役立ちます。

    ##### サービスチェックのオプション
    これらのオプションはサービスのチェックにのみ適用され、他の種類のモニターでは無視されます。

    -   **`thresholds`** ステータス別のしきい値の辞書。サービスのチェックは複数のしきい値を持つことができるため、直接クエリでは定義しません。

            例: `{'ok': 1, 'critical': 1, 'warning': 1}`

    ##### エラーと検証
    リクエストに無効なモニターオプションが含まれている場合は、次のような応答が返されます。

            Error: 400 - ["Invalid monitor option:<invalid option>"]



[1]: /ja/monitors/monitor_types/#import
[2]: /ja/monitors/monitor_types
[3]: /ja/monitors/monitor_types/#define-the-conditions
[4]: /ja/integrations/faq/list-of-api-source-attribute-value
[5]: /ja/graphing/infrastructure/process
[6]: /ja/monitors/faq/what-are-recovery-thresholds
