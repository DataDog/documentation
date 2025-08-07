---
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: ドキュメント
  text: インシデント設定でインシデントをカスタマイズする
- link: /service_management/incident_management/notification
  tag: ドキュメント
  text: インシデント通知を設定する
title: Describe an Incident
---

## 概要

どこで[インシデントを宣言する][1]場合でも、組織のインシデント管理プロセスに関わる他のメンバーと情報を共有できるよう、できる限り詳細に記述することが重要です。インシデントの詳細には次の情報を含めてください。
- 発生した事象
- 発生原因
- インシデントに関連する属性

## インシデント要素

インシデントを宣言すると インシデント モーダル が表示されます。このモーダルには次の主要要素があります。

| インシデント要素  | 説明 |
| ------------------ | ----------- |
| タイトル              | (必須) インシデントにわかりやすいタイトルを付けます。 |
| Severity Level     | (必須) インシデントの重大度を SEV-1 (最も深刻) から SEV-5 (最も深刻でない) の範囲で示します。インシデントが初期調査中で、重大度がまだわからない場合は、UNKNOWN を選択してください。<br> **注**: 各重大度レベルの説明は、組織の要件に合わせてカスタマイズできます。|
| Incident Commander | (必須) インシデント調査のリーダーとなる人物を割り当てます。 |
| Attributes (Teams) | [Datadog チーム][2]を使用して適切なユーザー グループをインシデントに割り当てます。割り当てたチームのメンバーは Slack チャンネルに自動招待されます。 |

## Incident details

インシデントのステータスと詳細は、インシデントの Overview タブで更新できます。Overview タブにはインシデントの説明、顧客への影響、影響を受けたサービス、インシデント対応者、根本原因、検出方法、深刻度など、調査と解決に必要な情報を入力してください。

影響セクションを更新し、顧客への影響、影響の開始と終了時刻、およびインシデントがまだアクティブであるかどうかを指定します。また、このセクションには、完了する影響範囲の記述が必要です。

### ステータスレベル

デフォルトのステータスは **Active**、**Stable**、**Resolved** です。 Incident Settings ページで **Completed** ステータスを追加し、各ステータス レベルの説明をカスタマイズできます。

* Active: インシデントが他者に影響している。
* Stable: インシデントはもはや他者に影響していないが、調査が未完了。
* Resolved: インシデントはもはや他者に影響しておらず、調査も完了している。
* Completed: すべての修復作業が完了している。

インシデントのステータスが変化すると、Datadog は次のように解決までの時間を追跡します。

| ステータスの遷移 | 解決されたタイムスタンプ |
| ------------------ | -----------|
| `Active` から `Resolved`、`Active` から `Completed` | 現在の時刻 |
| `Active` から `Resolved` から `Completed`、`Active` から `Completed` から `Resolved` | 変更なし |
| `Active` から `Completed` から `Active` から `Resolved` | 最後の遷移にオーバーライド |

### レスポンス チーム

他のユーザーを追加し、役割を割り当てることでレスポンス チームを編成し、インシデント解決プロセスを進めます。Datadog には 2 種類のデフォルト レスポンダー タイプがあります。

<div class="alert alert-info">Responder ロールは <a href="/account_management/rbac/?tab=datadogapplication">Role Based Access Control (RBAC)</a> システムとは無関係です。Incident Management の Responder Type はユーザーの権限を変更しません。</a></div>

インシデント コマンダー
: レスポンス チームを指揮する責任者

レスポンダー
: インシデントの調査および根本原因の解決に積極的に貢献するメンバー

*レスポンダー* には Datadog アカウントに紐づくメールで通知が送信されます。レスポンダーの役割は誰でも変更できますが、個人をレスポンス チームから削除するには、その人に一般 `Responder` ロールが割り当てられ、かつインシデントで活動がない状態である必要があります。既に `Incident Commander` が割り当てられているインシデントで別の人物を `Incident Commander` に設定すると、その役割が引き継がれ、前任者は一般 `Responder` ロールに再割り当てされます。カスタム 1 人ロールを再割り当てした場合も同様です。

**Response Team** タブには、各メンバーがレスポンス チームに追加された日時と、インシデント タイムラインに最後に貢献した日時が保存されます。

#### カスタム レスポンダー ロール

[Responder Types 用インシデント設定][3]でカスタム レスポンダー ロールを作成できます。独自の名称と説明を持つレスポンダー タイプを新規作成し、そのロールを 1 人用または複数人用に設定できます。

## 属性

属性は、各インシデントに対して定義できるメタデータおよびコンテキストです。これらのフィールドは[キー:値 メトリクス タグ][4]です。フィールド キーは [Incident Settings Property Fields][5] ページで追加します。追加した値は、概要タブでインシデントの影響を評価する際に使用できます。すべてのインシデントで次のフィールドを評価できます。

Root Cause
: このテキスト フィールドに、インシデントの根本原因、トリガー、および寄与要因を入力します。

Detection Method
: インシデントの検出方法を次のデフォルト オプションから指定します: customer、employee、monitor、other、unknown。

Services
: APM を設定している場合、APM サービスをインシデント評価に使用できます。APM でサービスを設定する方法については[ドキュメント][5]を参照してください。<br><ul><li>Datadog APM を使用していない場合は、サービス名を CSV でアップロードできます。CSV でアップロードした値は Incident Management 内でのみ利用されます。</li><li>Datadog はサービス名を大文字小文字を区別せずに重複排除するため、“My Service” と “my service” の両方を使用しても、手動で追加した方のみが表示されます。</li><li>Datadog は手動アップロードしたリストを APM のサービス名より優先します。</li><li>APM サービスで過去 7 日間にメトリクスが送信されていない場合は、検索結果に表示されません。</li><li>Datadog の製品とさらに統合し、サービスへの影響を正確に評価できます。Datadog APM を使用しているお客様の場合、Services プロパティ フィールドは APM サービスで自動入力されます。</li></ul>

Teams
: 組織で定義されている[チーム][2]から選択します。CSV ファイルでチームをアップロードする必要はありません。

## 通知

関係者全員とインシデントの最新情報を共有し、調査状況を周知するためにインシデント通知を設定します。詳細は[通知][6]ページを参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/incident_management/declare
[2]: /ja/account_management/teams/
[3]: /ja/service_management/incident_management/incident_settings/responder-types
[4]: /ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[5]: https://app.datadoghq.com/incidents/settings#Property-Fields
[6]: /ja/service_management/incident_management/notification