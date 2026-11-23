---
description: 適切な権限、時間ベースのクエリ、およびコンプライアンスのための Audit Trail ログを使用して、Datadog からログデータを削除します。
further_reading:
- link: /account_management/rbac/
  tag: ドキュメント
  text: ロールと権限について
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: Audit Trail を使用してユーザーアクティビティを監視する
title: データを削除する
---
このページでは、Datadog に取り込まれるべきではなかった機密データを削除する方法を説明します。

## ログ以外のデータを削除する {#delete-non-logs-data}

ログ以外の製品からデータを削除するには、[サポート][1]に問い合わせてリクエストしてください。

## ログデータを削除する {#delete-logs-data}

UI を使用してログ製品からデータを削除できます。

### 削除機能を有効にする {#enable-deletion-feature}

ログデータの削除は、組織管理者のみが有効にできます。ログデータの削除を有効にするには、以下の手順を実行します。
1. 組織の設定で、設定に移動します。
2. {{< ui >}}Logs Data Deletion{{< /ui >}} をオンに切り替えて保存します。

ログを削除する権限をユーザーに付与するには、以下の手順を実行します。
1. 組織の設定で、[ロール][3]に移動します。
2. {{< ui >}}Logs Delete Data{{< /ui >}} 権限を持つロールを作成します。

### 削除を開始する {#start-deletions}

<div class="alert alert-info">削除リクエストは、送信後 10 日以内であればキャンセルできます。</div>

<div class="alert alert-danger"><strong>ログの場合</strong>: データの削除は 10 日後に永続的なものとなります。削除リクエストの内容を慎重に確認してください。</div>

データを削除するには、次の手順を実行します。

1. 組織の設定で、[データの削除][4]に移動します。
2. 削除元の製品を選択します。
3. 検索対象の時間枠を選択します。
4. 削除する時間枠内のイベントをクエリします。
5. 削除したいイベントが検索結果に表示されたら、右下の {{< ui >}}Delete{{< /ui >}} ボタンをクリックします。
6. チェックボックスをオンにし、リクエストされた確認テキストを入力して削除を確定します。
7. {{< ui >}}Confirm{{< /ui >}} をクリックします。

リクエストを確定するとすぐに削除が開始され、対象データにはアクセスできなくなります。

[削除履歴][5]タブから、削除のステータスを確認できます。また、検索文字列 `@asset.name:"Data Deletion"` を使用して [Audit Trail][6] で削除を検索することもできます。

**注**:
- 削除は確定後すぐに開始されます。ジョブ開始後に到着したレコードは、そのレコードが発生した時間枠の処理がすでに完了しているため、削除されない場合があります。
- レコードを削除しても、そのレコードから派生したデータ (ログから生成されたメトリクスなど) は削除されません。
- 同時に実行できる削除は最大 5 件までです。

### 削除をキャンセルする {#cancel-deletions}

**注**: 削除リクエストが作成されると、10 日間は復元可能な状態になります。この期間中、削除されたデータは Datadog 上ではアクセスできませんが、削除リクエストがキャンセルされると復元されます。

削除をキャンセルするには、{{< ui >}}Upcoming{{< /ui >}} または {{< ui >}}Done (Recoverable){{< /ui >}} ジョブで {{< ui >}}Cancel{{< /ui >}} をクリックします。

### 削除を監査する {#audit-deletions}

削除は、[削除履歴][5]に 90 日間記録されます。また、リクエストしたユーザーの詳細とともに [Audit Trail][6] にも記録されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/support/
[2]: /ja/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"