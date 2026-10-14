---
description: プライベートアクションランナーが Datadog に登録する方法、登録によってランナーの所有権がどのように設定されるか、そして所有権によってランナーが使用する認可モデルがどのように決定されるかについて説明します。
further_reading:
- link: /actions/private_actions/set_up_agent_based
  tag: ドキュメント
  text: プライベートアクションランナーのセットアップ
- link: /actions/private_actions/authorize_private_actions
  tag: ドキュメント
  text: Private Actions の認可
- link: /actions/private_actions/execution_policies
  tag: ドキュメント
  text: 実行ポリシー
title: 登録と所有権
---
## 概要 {#overview}

プライベートアクションランナーが起動すると、Datadog 組織に登録されます。ランナーは自身を登録し、すべてのリクエストで認証に使用する ID を受け取ります。登録によってランナーの**所有権**も設定され、所有権によって、その後のランナーの存続期間中に使用される認可モデルが決定されます。ランナーの所有権は再登録なしでは変更できないため、デプロイ前に登録方法を慎重に選択してください。

登録は両方のランナー形式に適用されます。所有者なしの登録と、それに続く実行ポリシーによる認可は、Datadog Agent 内のランナーにのみ適用されます。スタンドアロンランナーは常に所有されます。

## 登録プロセス{#the-enrollment-process}

1. 資格情報と、それを有効にする構成を使用してランナーを起動します。
2. ランナーが Datadog に登録されます。デフォルトでは (`self_enroll: true)、手動の手順なしで起動時に自動的に行われます。
3. Datadog はランナーに ID を発行します: 。一意のランナー識別子とキーペア。ランナーはこの ID を保持し、その後の再起動時に再利用します。
4. ランナーは自身の ID を使用して Datadog で認証を行い、受信したタスクを検証します。

自己登録を使用する代わりにランナーの ID を自分で事前プロビジョニングするには、[構成オプション](#configuration-options)を参照してください。

## 登録タイプと所有権{#enrollment-types-and-ownership}

ランナーを登録するには 2 つの方法があります。登録に使用する資格情報によってランナーの所有権が設定され、所有権によって認可モデルが決定されます。単一のランナーは、両方ではなく、いずれか一方のモデルによって認可されます。所有権は登録時に一度だけ設定され、ランナーの存続期間中固定されます。所有権を変更するには、別の資格情報タイプを使用してランナーを再登録してください。デプロイ前にどのモデルを使用するかを決定し、対応する資格情報で登録してください。2 つのモデルの詳細な比較については、[プライベートアクションの認可][5]を参照してください。

| 登録方法 | ランナーの所有権 | 認可モデル |
|---|---|---|
| **API キー** (プライベートアクションランナー機能を持つ) | 所有者なし | [実行ポリシー][1]|
| **API キー**および**アプリケーションキー** | 所有者あり| [コネクション][2] |

### 所有者なしランナー {#ownerless-runners}

**プライベートアクションランナー機能を持つ API キー**で登録されたランナーは**所有者なし**: となり、個別の所有者は存在しません。所有者なしランナーは[実行ポリシー][1]で認可されます。実行ポリシーは、フリート全体の Agent タグによるアクセスを制御します。所有者なしの登録は、Datadog Agent 内のランナーに適用されます。

**Private Action Runner** 機能は、Remote Configuration と同様にバッジで表示されます。これを管理するには、API キーの権限である **API Keys Read** (`api_keys_read`) および **API Keys Write** (`api_keys_write`) が必要です。詳細については、[API およびアプリケーションキーの権限][9]を参照してください。

所有者なしランナーを登録するには、

1. Datadog で、[**Organization Settings > API Keys**][3] に移動します。
2. API キーを作成または選択し、**Private Action Runner** 機能を有効にします。
3. その API キーでランナーを構成し、API キーのみの登録を有効にします。デプロイ手順および必要な Agent バージョンについては、[Datadog Agent でのプライベートアクションランナーのセットアップ][4]を参照してください。

Kubernetes では、ランナーが読み取るシークレットに API キーを保存します。

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

### 所有者ありランナー {#owned-runners}

アプリケーションキーで登録されたランナーは**所有者あり**となり、登録したユーザーがそのランナーの所有者となります。所有者ありランナーは、[コネクション][2]で認可されます。登録中、Datadog はランナーの許可リストにあるインテグレーションの接続を作成するため、ランナーはそれらのインテグレーションですぐに使用できるようになります。

所有者あり登録は一般提供されているパスであり、スタンドアロンランナーと Datadog Agent 内のランナーの両方で機能します。

Kubernetes では、ランナーが読み取るシークレットに API キーとアプリケーションキーを保存します。

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY> \
  --from-literal app-key=<DD_APP_KEY>
```

## 所有者ありランナーへのアクセスの管理 {#manage-access-to-owned-runners}

このセクションは**所有者あり**ランナーにのみ適用されます。所有者なしランナーには個別の所有者が存在しません。代わりに、[実行ポリシー][1]によって、誰がそのランナーに対してアクションを実行できるかが制御されます。

[ロールベースのアクセス制御 (RBAC)][6] を使用して、所有者ありランナーへのアクセスを制御します。ランナーに権限を設定して、変更を制限したり、新しい接続が追加されるのを防いだりできます。デフォルトでは、ランナーの作成者のみが Editor アクセス権を持ちます。作成者は、他のユーザー、サービスアカウント、ロール、またはチームにアクセス権を付与できます。プライベートアクションランナーに適用される権限のリストについては、[Datadog ロール権限][7]を参照してください。

### 権限レベル {#permission-levels}

**Viewer**
: ランナーおよびそれに接続されている接続を表示できます。

**Contributor**
: ランナーを表示し、新しい接続を追加してランナーに貢献できます。

**Editor**
: ランナーを表示し、コントリビュート (新しい接続の追加) し、編集できます。

### ランナーの権限を設定する {#set-permissions-on-a-runner}

1. ランナーの Edit ページに移動します。
2. **Who Has Access?**セクションで、**Edit access** をクリックします。
3. ドロップダウンメニューからユーザー、サービスアカウント、ロール、またはチームを選択し、**Add** をクリックします。選択したプリンシパルがダイアログボックスの下部に表示されます。
4. プリンシパル名の横にあるドロップダウンメニューから、必要な権限を選択します。
5. プリンシパルからアクセス権を削除するには、権限のドロップダウンメニューから **Remove access** を選択します。
6. **Done** をクリックして、権限の設定を確定します。
7. **Save** をクリックして、新しい権限をランナーに適用します。

## 構成オプション {#configuration-options}

以下の設定で登録を制御します。ランナー設定とそのデフォルト値の完全なリストについては、[プライベートアクションランナーリファレンス][8]を参照してください。

| 設定 | 目的 |
|---|---|
| `self_enroll` | 起動時に自動的に登録します。デフォルトで有効です。|
| `api_key_only_enrollment` | Private Action Runner 機能を持つ API キーを使用して、所有者なしランナーとして登録します。|
| `actions_allowlist` | ランナーが実行を許可されているアクションです。所有者ありランナーの場合、Datadog は登録時にこれらのインテグレーションの接続を作成します。|

### Kubernetes 上の ID ストレージ {#identity-storage-on-kubernetes}

Datadog Agent のランナーは、再起動後も維持されるようにそのアイデンティティを保持します。ID がどこに保存されるかは、ランナーによって異なります。

- **Cluster Agent ランナー:** アイデンティティを Kubernetes シークレットに保存するため、アイデンティティは Cluster Agent のレプリカ間で共有されます。Helm または Datadog Operator でインストールした場合、デフォルトのシークレット名は `datadog-private-action-runner-identity` です。
- **Node Agent ランナー:** アイデンティティをファイルに保存します。Kubernetes では、Pod の再起動後もアイデンティティが維持されるように、そのパスを永続ボリュームでバックアップしてください。

## ランナーのアイデンティティとタスク認証{#runner-identity-and-task-authentication}

登録により、各ランナーには Datadog が一切アクセスできない秘密鍵が付与されます。Datadog は対応する公開鍵を使用してランナーを認証するため、お客様の組織のタスクは、お客様のランナーのみが取得できるようになっています。

Datadog はディスパッチするすべてのタスクに署名し、ランナーはタスクを実行する前にその署名を検証します。

## プライベートランナーの認証情報のローテーション{#rotating-private-runner-credentials}

再デプロイせずにプライベートランナーの認証情報をローテーションするには、ホストまたは Node Agent で `/opt/datadog-agent/embedded/bin/privateactionrunner rotate-identity` を実行するか、Cluster Agent の場合は `/opt/datadog-agent/bin/datadog-cluster-agent rotate-par-identity` を実行します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/execution_policies/
[2]: /ja/actions/connections/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/actions/private_actions/set_up_agent_based/
[5]: /ja/actions/private_actions/authorize_private_actions/
[6]: /ja/account_management/rbac/
[7]: /ja/account_management/rbac/permissions/#app-builder--workflow-automation
[8]: /ja/actions/private_actions/reference/
[9]: /ja/account_management/rbac/permissions/#api-and-application-keys