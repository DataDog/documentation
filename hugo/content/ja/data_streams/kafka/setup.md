---
description: Kafka Console をセットアップします。これには、前提条件、Agent 構成、および Kafka メッセージを検査するために必要な追加手順が含まれます。
title: Kafka Console のセットアップ
---
このページでは、Kafka Console の前提条件とセットアップ手順について説明します。

## 前提条件 {#prerequisites}

### Datadog Agent バージョン {#datadog-agent-version}

Datadog Agent バージョン 7.78 以降が必要です。

### ACL 権限{#acl-permissions}

Kafka クラスターで ACL を使用している場合、Datadog Agent ユーザーには以下の最小限の権限が必要です。

| リソース名| リソースタイプ| 操作|
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

## セットアップ {#setup}

[Kafka Console セットアップページ][1] に移動し、[{{< ui >}}Get Started{{< / ui >}}] (始める) をクリックします。次に、環境を選択して指示に従ってください。サポートを依頼するには、[{{< ui >}}Request a pairing session{{< /ui >}}] (ペアリングセッションを要求する) を選択してください。

{{< img src="data_streams/kafka_setup-2.png" alt="環境選択、セキュリティプロトコル、スキーマレジストリのオプション、および Kubernetes の設定手順を示す Kafka Console セットアップダイアログ" >}}

セットアップページでは、環境固有の設定手順が提供されます。[{{< ui >}}Copy for AI{{< /ui >}}] (AI 用コピー) を使用して、指示を AI Agent に直接コピーできます。

## メッセージ検査を有効にする{#enable-message-inspection}

このセクションは、[{{< ui >}}Messages{{< /ui >}}] (メッセージ) セクションで Kafka メッセージのペイロードを表示する場合にのみ適用されます。メッセージ検査を使用する予定がない場合は、スキップしてください。

### 追加の ACL 権限{#additional-acl-permission}

『[前提条件](#acl-permissions)』に記載されている ACL 権限に加えて、Datadog Agent ユーザーにはトピックに対する `READ` 権限が必要です。

| リソース名| リソースタイプ| 操作|
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

`*` というリソース名は、すべてのトピックに対する `Read` アクセス権を付与します。Agent を特定のトピックに制限するには、`*` をそれらのトピック名に置き換えます。

### Remote Configuration{#remote-configuration}

[Remote configuration][3] は、次の 3 つのレベルで有効にする必要があります。

1. [組織レベル][5]。
2. [Agent レベル][10]。
3. [API キーレベル][11]。

### ユーザー権限{#user-permission}

Kafka メッセージを表示するには、ユーザーに `Data Streams Monitoring Capture Messages` 権限が必要です。

現在の権限は、[[{{< ui >}}Profile{{< /ui >}}] (プロファイル) ページ][7] で確認できます。権限を有効にするには、既存のロールを編集するか、[[{{< ui >}}Roles{{< /ui >}}] (ロール) ページ][8] でロールを作成します。ロールを変更する権限がない場合は、組織の管理者に連絡してください。

{{% collapse-content title="ロールの作成とユーザーへの割り当て" level="h4" expanded=false %}}

#### 1. ロールの作成{#1-create-a-role}

1. Datadog の [[{{< ui >}}Roles{{< /ui >}}] ページ][8] に移動します。
2. 右上隅の [{{< ui >}}+ New Role{{< /ui >}}] (+ 新しいロール) をクリックします。
   <div class="alert alert-info">
   [+ New Role] ボタンの代わりに「Read Only」(読み取り専用) と表示されている場合は、ロールを作成する権限がありません。サポートが必要な場合は、Datadog 管理者に連絡してください。
   </div>
3. ロールのわかりやすい名前を入力します (たとえば、「Data Streams Messages Access」)。
4. [{{< ui >}}Search Permissions{{< /ui >}}] (権限の検索) フィールドに、`Data Streams Monitoring Capture Messages` と入力します。
5. 検索結果から権限を選択し、このロールに対して有効にします。
6. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。
7. ロールのリストを検索して、ロールが正常に作成されたことを確認します。

#### 2. ユーザーへのロール割り当て {#2-assign-the-role-to-users}

1. Datadog の [[{{< ui >}}Users{{< /ui >}}] (ユーザー) ページ][9] に移動します。
2. ロールを割り当てるユーザーを見つけてクリックします。
3. ユーザー詳細パネルで、名前の横にある [{{< ui >}}Edit{{< /ui >}}] (編集) をクリックします。
   <div class="alert alert-info">
   [{{< ui >}}Edit{{< /ui >}}] ボタンが表示されない場合、ユーザーロールを変更するための管理者権限が必要です。Datadog 管理者に連絡してください。
   </div>
4. 開いたモーダルで [{{< ui >}}Roles{{< /ui >}}] セクションを探します。
5. 新しく作成したロールをユーザーに追加します。
6. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。
7. [{{< ui >}}User updated{{< /ui >}}] (ユーザーが更新されました) の確認メッセージが表示されることを確認し、変更が成功したことを検証します。

{{% /collapse-content %}}

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /ja/remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /ja/remote_configuration/#enable-remote-configuration
[11]: /ja/account_management/api-app-keys/