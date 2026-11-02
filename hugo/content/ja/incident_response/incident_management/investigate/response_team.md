---
aliases:
- /ja/service_management/incident_management/response_team/
- /ja/incident_response/incident_management/response_team
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/responder_roles
  tag: ドキュメント
  text: インシデント設定で担当者のロールをカスタマイズする
title: Incident Response チーム
---
## 概要{#overview}

他のユーザーを追加して担当者のロールを割り当てることで対応チームを編成し、担当者がインシデント対応中に何に集中すべきかを把握できるようにします。

## 担当者の追加{#adding-responders}

担当者とは、特定のインシデントの対応プロセスに参加する Datadog ユーザーのことです。

インシデントに担当者を追加すると、以下のようになります。
* Datadog は、メールで担当者にインシデントについて通知します。
* インシデントが非公開の場合、担当者は Datadog 上でそのインシデントを表示することができます。
* インシデントに Slack チャンネルが関連付けられている場合、担当者はそのチャンネルに自動的に追加されます。

Datadog は、以下の場合にもユーザーを自動的に担当者として追加します。
* タイムラインへの書き込みなど、インシデントを更新するアクションを実行したとき。
* 通知ルールまたは手動のインシデント通知を通じて、インシデントについて通知されたとき。

[Incident Details] (インシデント詳細) ページの [**Response Team**] (対応チーム) タブには、個人がインシデントの対応チームに追加された時刻が記録されます。また、Datadog で担当者がインシデントに影響を与えるアクション (属性の更新やタイムラインへの書き込みなど) を最後に実行した時刻も記録されます。

担当者にロールが割り当てられておらず、インシデントを更新するアクションをまだ実行していない場合は、担当者を削除できます。

## 担当者のロールの割り当て {#assigning-responder-roles}

<div class="alert alert-info">担当者のロールは、<a href="/account_management/rbac/?tab=datadogapplication">Role Based Access Control (RBAC)</a> システムと無関係です。Incident Management における担当者のロールは、ユーザーの権限には影響しません。</a></div>

[Incident Details] ページの [**Response Team**] タブから、担当者のロールを編集できます。

[インシデント設定][1]で、カスタム名と説明を持つ、単独または複数の担当者ロールを追加定義できます。

## Slack で担当者を管理する {#managing-responders-in-slack}

Slack では、インシデントチャンネル内で `/dd incident responders` コマンドを入力することで、担当者とそのロールを管理できます。インシデントアクショントレイにある [Manage Responders] (担当者を管理) ボタンをクリックすることもできます。

担当者ロールを割り当てると、割り当てられた担当者に Slack で通知が届きます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/incident_management/setup_and_configuration/responder_roles