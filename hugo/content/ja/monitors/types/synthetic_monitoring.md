---
aliases:
- /ja/synthetics/guide/synthetic-test-monitors/
description: Synthetic テストのモニターを作成および管理して、Web や API のテストが失敗したりパフォーマンスが低下したりしたときにNotificationsを受け取ります。
further_reading:
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理方法について
- link: /synthetics/notifications/
  tag: ドキュメント
  text: Synthetic Monitoring Notifications の詳細はこちら
title: Synthetic モニター
---
## 概要{#overview}

Synthetic テストを作成すると、Datadog は自動的に関連付けられたモニターを作成します。Synthetic テストモニターがアラートを発したときにNotificationsを設定できます。

## Synthetic テストモニターの作成 {#create-a-synthetic-test-monitor}

<div class="alert alert-info">アプリケーションの <a href="https://app.datadoghq.com/synthetics/tests">Synthetic Monitoring</a> セクション内でのみ、<strong>Synthetic テストモニター</strong> を作成できます。一般的な <a href="https://app.datadoghq.com/monitors">Monitors</a> ページは、メトリクス、ログ、プロセスなどに基づく他のタイプのモニターを作成するために使用されます。</div>

新規または既存の Synthetic テストの {{< ui >}}Monitor{{< /ui >}} セクションでモニターを作成し、Synthetic Monitoring テストが失敗したときにNotificationsを送信します。モニターは、作成した Synthetic テストに関連付けられ、Synthetic テスト構成で設定されたアラート条件にリンクされます。モニターの属性変数やタグ変数を使用するには、[メトリクスモニター][1]を作成してください。

Synthetic Monitoring のモニターメッセージは、以下で構成されています。

- {{< ui >}}Title{{< /ui >}}: モニターの名前。
- {{< ui >}}Custom message{{< /ui >}}: モニター作成時に記述する任意のテキスト。
- {{< ui >}}Auto-appended summary{{< /ui >}}: 失敗した場所、エラーメッセージ、テストへのリンクが含まれます。
- {{< ui >}}Footer{{< /ui >}}: 最後に失敗したテスト実行の詳細が含まれます。 </br><br>

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test_2.png" alt="Synthetic テストでのモニターの作成" style="width:90%;">}}

## Synthetic モニターを表示および管理する {#view-and-manage-synthetic-monitors}

- モニター名をカスタマイズして、[{{< ui >}}Manage Monitors{{< /ui >}}][2] ページで検索できるようにします。Synthetic テストモニターを見つけるには、検索バーで `type:synthetics` をフィルタリングします。モニターの[条件付き変数][3]を使用して、テストの状態に基づいて通知メッセージを特徴付けることができます。

- Synthetic テストモニターは、メール、Slack、PagerDuty、Microsoft Teams などの通知チャンネルとインテグレーションしています。詳しくは、[Notifications][4]を参照してください。

- 複数の Notifications レイヤーがある場合 (例えば、Synthetic テストがアラートを発している時間が長いほど多くのチームに通知する)、Datadog は Synthetic モニターで[再通知][5]を有効にすることを推奨しています。

## 自動的に追加されるタグ {#automatically-added-tags}

追加するカスタムタグに加えて、Datadog はテストの構成に基づいて、Synthetic テストモニターに以下のタグを追加します。これらのタグを使用して、[{{< ui >}}Manage Monitors{{< /ui >}}][2] ページまたは Synthetic Monitoring テストリストで検索およびフィルタリングを行います。

| タグキー             | 利用可能な値                                                                 | タグがキャプチャするもの                                                                                                    |
|----------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `check_type`         | `api`, `browser`, `api-ssl`, `api-dns`, `api-tcp`, `api-icmp`, `api-grpc`, `api-udp`, `api-websocket`, `api-multi`, `mobile` | テストタイプ、および該当する場合はそのサブタイプです。簡潔にするため、`http` サブタイプは `api` テストでは省略されます。        |
| `check_status`       | `live`, `paused`                                                                   | テストがアクティブか一時停止中かを示します。                                                                              |
| `probe_dc`           | `aws:us-east-1`, `aws:eu-west-1`、およびその他の管理対象またはプライベートロケーション          | テストが実行されるロケーションです。マルチロケーションテストには、割り当てられたロケーションごとに 1 つの `probe_dc` タグがあります。         |
| `ci_execution_rule`  | `blocking`, `non_blocking`                                                         | テストの CI/CD 実行ルールです。このタグは、テストが CI/CD パイプラインの品質ゲートとして使用される際に追加されます。             |

これらのタグはテストを編集すると自動的に更新されるため、テストのロケーションが移動したり、一時停止されたり、CI/CD 構成が変更されたりしても、検索の正確性が維持されます。`tag` ファセットを使用してタグを検索し、完全な `key:value` ペアを引用符で囲みます。例えば、次のようにします。

- `type:synthetics tag:"check_status:live"` は、すべてのアクティブな Synthetic テストモニターを検索します。
- `type:synthetics tag:("probe_dc:aws:us-east-1" AND "probe_dc:aws:ap-northeast-1")`両方のロケーションから実行されているテストを検索します。
- `type:synthetics tag:"ci_execution_rule:blocking"`失敗した場合に CI/CD パイプラインをブロックするように構成されたテストを検索します。

### モニターのNotificationsをカスタマイズする {#tailor-monitor-notifications}

インシデント管理戦略によっては、Synthetic テストがアラートを送信する際に複数のTeamsを関与させたい場合があります。最初のアラートの後の通知でのみチームBに通知するには、チームBへの通知を ` で囲みます。{{#is_renotify}}` and `{{/is_renotify}`.[条件付き変数][3] を使用して、モニター属性に基づいて通知メッセージをさらに詳細化します。

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="アラートを送信するモニターが再通知を行うまでの時間を選択します。" style="width:90%;">}}

再通知を有効にするには、{{< ui >}}Enable renotification{{< /ui >}} を切り替えて、ドロップダウンメニューから時間間隔を選択します。

Synthetic Monitoring のNotificationsがテスト結果を評価してアラートをトリガーする方法の詳細については、[Synthetic Monitor のアラートについて][7] を参照してください。

## 高度なNotifications {#enhanced-notifications}

Synthetic モニターを使用して、Synthetic Monitoring テストが失敗したときに、より詳細なNotificationsを送信するように強化します。以下の機能が利用可能です:

事前入力されたモニターメッセージ
: 事前入力されたモニターメッセージは、Synthetic テストアラートのための構造化された出発点を提供します。各メッセージには、標準化されたタイトル、要約、およびテストメタデータを含むフッターが含まれており、一目でアラートを理解しやすくなっています。

テンプレート変数
: テンプレート変数を使用すると、モニター通知にテスト固有のデータを動的に挿入できます。これらの変数は、`synthetics.attributes`オブジェクトから取得されます。

高度な使用方法
: 高度な使用法には、より深いテストの洞察を引き出したり、Handlebars テンプレートを使用して複雑なメッセージを構造化する技術が含まれます。

条件付きアラート
: 条件付きアラートを使用すると、特定のテスト結果や失敗条件に基づいてモニター通知の内容を変更できます。

詳しくは、[Synthetic Monitoring Notifications][6] をご覧ください。

## Bits Investigation を開始する {#launch-a-bits-investigation}

Synthetic Browser テストまたは API テストモニターがアラート状態になったときに、[Bits Investigation][8] を起動して根本原因を特定できます。Bits Investigation は、テスト結果、トレース、ログ、メトリクスを分析して根本原因を特定し、失敗がリグレッションによるものか、設定ミスによるものかを判定します。また、Synthetic モニターで {{< ui >}}Auto-Investigate{{< /ui >}} を切り替えて、アラート発生時に自動的に調査を開始することもできます。

## ベストプラクティス {#best-practices}

- メッセージの欠落を防ぐため、必ずデフォルトの `@notification`（条件外）を含めてください。
- 復旧のために一貫したルーティングが必要となる PagerDuty などのページングツールでは、複雑なロジックの使用を避けてください。
- 条件付きロジックを使用して、アラートテキストの上書き、優先度の変更、またはTeams間でのNotificationsの分割を行います。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/metric/
[2]: /ja/monitors/manage/
[3]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /ja/monitors/notify/#notification-recipients
[5]: /ja/monitors/notify/#renotify
[6]: /ja/synthetics/notifications
[7]: /ja/synthetics/guide/how-synthetics-monitors-trigger-alerts/
[8]: /ja/bits_ai/bits_investigation/investigate_issues/