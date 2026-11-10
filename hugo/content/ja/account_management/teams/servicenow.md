---
description: Datadog Teams を作成して ServiceNow のアサインメントグループにリンクし、同期を維持します。
further_reading:
- link: /integrations/servicenow/
  tag: ドキュメント
  text: ServiceNow インテグレーション
- link: /account_management/teams/
  tag: ドキュメント
  text: Datadog Teams
- link: /account_management/teams/github/
  tag: ドキュメント
  text: GitHub を使用して Datadog Teams をプロビジョニングする
title: ServiceNow を使用して Datadog Teams をプロビジョニングする
---
## 概要{#overview}

組織ですでに ServiceNow でアサインメントグループを管理している場合は、手動でチームを再作成するのではなく、それらを Datadog Teams のソースとして使用できます。ServiceNow アサインメントグループを Datadog Teams に接続する際には、以下がサポートされます。

- ServiceNow アサインメントグループから Datadog Teams を作成する。
- 既存の Datadog Teams を ServiceNow アサインメントグループにリンクする。たとえば、ServiceNow グループごとに On-Call やインシデントをルーティングできます。
- 1 回限りまたは定期的なスケジュールで、チームメンバーシップの ServiceNow との同期を維持する。

ServiceNow アサインメントグループに親グループがある場合、Datadog はプロビジョニング中に同じ階層を複製します。

Datadog チームの[ハンドル][7]が ServiceNow アサインメントグループ名と一致する場合、複製は行われず、既存の Datadog Teams がリンクされます。その一致判定では大文字と小文字が区別されず、空白の違いも無視されます。他のすべての既存の Datadog Teams とその権限は影響を受けません。

Datadog は ServiceNow アサインメントグループへの読み取り専用アクセス権を持ちます。Datadog が ServiceNow アサインメントグループへの書き込み、アサインメントグループの作成や変更を行うことはありません。

## 前提条件 {#prerequisites}

### ServiceNow インテグレーション {#servicenow-integration}

Datadog 組織は、[ServiceNow インテグレーション][1]を通じて少なくとも 1 つの ServiceNow インスタンスに接続されている必要があります。標準的なインテグレーション設定以外の ServiceNow 権限は必要ありません。

このインテグレーションは Datadog 組織ごとに構成されます。

### 権限 {#permissions}

- チームのリンクと作成には `teams_manage` 権限が必要です。
- チームメンバーシップの同期には `user_access_manage` 権限が必要です。
- ServiceNow インテグレーションのセットアップ、またはそのタイルの編集によるアサインメントグループフィルターの追加や変更には、`manage_integrations` 権限が必要です。

## セットアップ {#setup}

### ServiceNow アサインメントグループを Datadog Teams に接続する {#connect-servicenow-assignment-groups-to-datadog-teams}

1. [[Teams] > [Data Sources] (データソース)][6] に移動します。
2. [{{< ui >}}ServiceNow{{< /ui >}}] を選択します。
3. インポートタイプを選択します。
   - [{{< ui >}}Import, create, and link teams{{< /ui >}}] (チームのインポート、作成、およびリンク): Datadog は、スコープ内の ServiceNow アサインメントグループごとに 1 つのチームを作成し、そのグループにチームをリンクします。
   - [{{< ui >}}Link only{{< /ui >}}] (リンクのみ): Datadog は、チームを作成せずに、既存の Datadog Teams を一致するアサインメントグループにリンクします。Datadog または SAML からチームを管理し、Datadog から ServiceNow へのマッピングのみが必要な場合は、このオプションを使用します。
4. チームメンバーシップを ServiceNow から管理するかどうかを選択します。[{{< ui >}}Import, create, and link teams{{< /ui >}}] を選択した場合は、Datadog が作成するチームにメンバーが含まれるように、メンバーシップ同期をオンにします。メンバーシップ同期が有効になるまで最大 24 時間かかる場合があります。
5. 同期頻度を選択します。
   - [{{< ui >}}One-time{{< /ui >}}] (一度限り): Datadog はアサインメントグループを 1 回のみインポートします。
   - [{{< ui >}}Recurring{{< /ui >}}] (定期): Datadog は少なくとも 24 時間に 1 回同期します。
6. 接続済みの ServiceNow インスタンスのうち、含めるものを選択します。
7. [{{< ui >}}Save{{< /ui >}}] (保存) を選択します。

### アサインメントグループをフィルタリングする {#filter-assignment-groups}

デフォルトでは、Datadog は選択されたインスタンス内のすべてのアサインメントグループを同期します。サブセットのみを同期するには、[ServiceNow インテグレーションタイル][3]で ServiceNow の[エンコードされたクエリ構文][4]を使用してフィルターを追加します。Datadog はフィルターを ServiceNow に渡し、一致するアサインメントグループのみを受信します。

一般的なフィルターには以下が含まれます。

- アクティブなアサインメントグループのみ。
- サービスカタログに表示されるアサインメントグループのみ。

最初の同期の前にフィルターを定義してください。後から絞り込んでも、すでに存在するチームは削除されません。「[同期からアサインメントグループを削除する](#removing-assignment-groups-from-the-sync)」を参照してください。

### 制限事項 {#limits}

Datadog は、組織ごとに最大 100,000 個のアサインメントグループと、アサインメントグループごとに最大 10,000 人のメンバーをインポートします。アサインメントグループから作成されたチームにも、[Datadog Teams の制限][9] (チームの最大数や階層の深さなど) が適用されます。

アサインメントグループがこれらの制限を超えている場合、Datadog から、インポートを開始する前にアサインメントグループを絞り込むよう伝えるメッセージが表示されます。[フィルター](#filter-assignment-groups)を使用してインポートされるアサインメントグループの数を減らすか、[Datadog サポート][8]に連絡して上限の引き上げをリクエストしてください。

### Datadog Teams を表示します。{#view-datadog-teams}

1. [[Teams] > [Data Sources]][6] に移動します。
2. 作成済みまたはリンク済みのチームが表示されない場合は、[{{< ui >}}Refresh{{< /ui >}}] (更新) を選択します。
3. 必要に応じて、Datadog Teams を手動で編集し、希望の状態にします。

同期されたチームは [Teams][2] リストからも確認できます。[{{< ui >}}Connection{{< /ui >}}] (接続) ファセットを `ServiceNow` に設定して絞り込んでください。

## ユーザーの照合 {#user-matching}

Datadog はメールアドレスでユーザーを照合します。Datadog のメールアドレスが ServiceNow のメールアドレスと一致したユーザーがチームに追加されます。

インテグレーションでは、Datadog ユーザーの作成や招待の送信は行われません。ServiceNow アサインメントグループのメンバーが Datadog アカウントを持っていない場合、Datadog はそのメンバーをスキップします。

ドメインの移行後などにユーザーのメールアドレスが変更された場合は、Datadog と ServiceNow の両方でアドレスを更新してください。次回の同期で新しいアドレスが取得され、ユーザーが再リンクされます。

## アサインメントグループの名前変更 {#renaming-assignment-groups}

Datadog は各 ServiceNow アサインメントグループを一意の ID で識別するため、ServiceNow でグループ名を変更すると Datadog チームが作成されません。Datadog チームのハンドルは変更されることがないため、そのハンドルがタグ付けされたテレメトリやダッシュボードのチームへのリンクは保持されます。

Datadog のチーム名が ServiceNow での名前変更に合わせて変更されるのは、以下の条件をすべて満たす場合のみです。

- ServiceNow 接続によって Datadog チームが作成されている。
- SCIM などの他のソースがチームを管理していない。
- 接続で [{{< ui >}}Import, create, and link teams{{< /ui >}}] が使用されている。

その他すべての場合は、Datadog によってチーム名が変更されることはありません。

## 同期からアサインメントグループを削除する {#removing-assignment-groups-from-the-sync}

フィルターの絞り込みなどによって、アサインメントグループが同期対象から外れた場合でも、Datadog では対応する Datadog チームを削除しません。その代わり、Datadog は同期されたすべてのメンバーをチームから削除し、メンバーがいない状態でチームを残します。これは、1 回限りの同期と定期的な同期の両方に適用されます。

空のチームを削除するには、次のようにします。

1. [Teams][2] に移動します。
2. [{{< ui >}}Connection{{< /ui >}}] ファセットを `ServiceNow` でフィルターします。
3. 削除するチームを選択して削除します。

同期によって行われた変更を自動的にロールバックすることはできません。[Audit Trail][5] には各変更が記録されるため、それを使用して手動で以前の状態に復元できます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/servicenow/
[2]: https://app.datadoghq.com/organization-settings/teams
[3]: https://app.datadoghq.com/integrations/servicenow
[4]: https://www.servicenow.com/docs/r/platform-user-interface/c_EncodedQueryStrings.html
[5]: /ja/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/teams/data-sources
[7]: /ja/account_management/teams/#team-handle
[8]: /ja/help/
[9]: /ja/account_management/teams/manage/#limits