---
description: 管理組織から直接、顧客向けの Datadog トライアル組織をプロビジョニングします。
title: トライアル組織のプロビジョニング
---
## 概要 {#overview}

トライアル組織プロビジョニング機能が有効になっている管理組織は、見込み顧客向けの Datadog トライアル組織を直接プロビジョニングできます。これにより、大規模な概念実証の取り組みを迅速に実施できます。案件がパートナーに対して追跡およびクレジットされるようにするために、この場合も基になる商談を Datadog に登録する必要があります。詳細なプロセスは、「[新規顧客のオンボーディング][4]」を参照してください。この方法で作成されたトライアル組織は、標準の 14 日間のトライアル期間ではなく、30 日間有効です。

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="管理組織ホームページの [Trial Org Provisioning] (トライアル組織プロビジョニング) ページ。" style="width:100%;" >}}

管理組織で [{{< ui >}}Trial Org Provisioning{{< /ui >}}] (トライアル組織プロビジョニング) ページが利用できない場合は、[partner-support@datadoghq.com][1] に連絡して、この機能の有効化を依頼してください。

## トライアル組織をプロビジョニングする {#provision-a-trial-org}

1. 管理組織にログインします。[{{< ui >}}Trial Org Provisioning{{< /ui >}}] ページがホームページとして表示されます。管理組織内のほかの場所からこのページに戻るには、左上の Datadog ロゴをクリックします。
2. 次のようにフォームに入力します。

    | フィールド | 必須 | 説明 |
    |---|---|---|
    | リージョン | はい | `ap1`、`eu1`、`us1`、`us3`、または `us5`。可能な限り、顧客のクラウドプロバイダー、地域、コンプライアンス要件に合わせてください。特定の要件がない場合は、デフォルトで `us1` が選択されます。|
    | トライアル組織名 | はい | 32 文字以内である必要があります。|
    | 顧客名 | はい | このトライアル組織の対象となるエンド顧客。|
    | パートナーメモ | いいえ | Datadog アカウントチームと共有すべき任意のコンテキスト。|
    | 招待者リスト | はい | 新しい組織に管理者ロールで招待するメールアドレスのカンマ区切りのリスト。|

3. [{{< ui >}}Submit{{< /ui >}}] (送信) をクリックします。

トライアル組織が即座に作成されます。結果パネルには、新しい組織の名前、組織 ID、およびステータスメッセージが表示されます。

## トライアル組織 ID を確認する {#find-the-trial-org-id}

結果パネルから組織 ID が取得されなかった場合は、トライアル組織にログインし、ブラウザの JavaScript コンソールを開いて取得します。

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

ブックマークレットを使用することもできます。`Get Datadog Org ID` という名前のブックマークを作成し、その URL に以下を設定します。次に、トライアル組織の任意のページでそのブックマークレットをクリックして、ブラウザのアラートで ID を表示します。

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog Org ID is " + orgId);})();
```

## プロビジョニング後 {#after-provisioning}

トライアル組織の使用状況を、管理組織のみで確認することはできません。新しいトライアル組織の名前と組織 ID をパートナーアカウントチームと共有して、[パートナーポータル][2]に登録された商談に関連付けられるようにしてください。顧客組織がパートナーシップに関連付けられた有効な契約を持つと、その組織は管理組織に接続され、使用状況が表示されるようになります。

## 次のステップ{#whats-next}

顧客組織が接続された後で、管理組織から使用状況やコストのデータがどのように表示されるかについては、「[コストと使用量の可視性][3]」を参照してください。

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /ja/partners/multi_tenant_billing/cost-and-usage-visibility/
[4]: /ja/partners/multi_tenant_billing/customer-onboarding/