---
title: Azure アカウントを Cloudcraft に接続する
---

この記事では、Azure アカウントを Cloudcraft に接続する手順を説明します。

## 要件

- [オーナーまたは管理者ロール][1]を持つ Cloudcraft ユーザー。
- 有効な [Cloudcraft Pro サブスクリプション][2]。
- IAM ロールの作成権限を持つ Azure アカウント。

## Azure アカウントの管理

### アカウントの追加

1. Cloudcraft で **User** > **Azure accounts** に移動します。
2. モーダルの一番下にある **Add Azure Account** をクリックします。
3. 次のページでは、手順が順を追って表示されます。**左側のサイドバーで "App registrations" を選択**して、Azure で Cloudcraft とのインターフェイスとなる新しいアプリケーションを登録します。
4. **Azure Active Directory** の **App registrations** ページで、**New registration** をクリックします。
5. 以下の情報を入力します。
    - **Name**: Cloudcraft
    - **Supported account types:**: この組織ディレクトリのアカウントのみ (シングルテナント)
    - **Redirect URI**: このフィールドは空欄のままにします。
6. **Register** をクリックします。
7. アプリケーションの詳細ページで、**Application ID** と **Directory ID** をコピーします。
8. Cloudcraft で **Application ID** と **Directory ID** を貼り付けて、**Next** をクリックします。

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-ids-cloudcraft.png" alt="Azure アカウントを Cloudcraft に追加する手順と、ハイライト表示された Application ID および Directory ID フィールド。" responsive="true" style="width:100%;">}}

#### クライアントシークレットの作成

次に、Cloudcraft アプリケーションが Azure の認証サービスに対して自分自身を安全に識別できるように、クライアントシークレットを作成します。

**注**: クライアントシークレットの有効期限は自由に選択できます。シークレットの有効期限が切れると、Cloudcraft で新しいシークレットを登録してアカウントを更新するまで、Azure アカウントをスキャンできなくなるので注意してください。

1. Azure のアプリケーションページで、左サイドバーの **Manage** セクションの中にある **Certificates & secrets** をクリックします。
2. **Certificates & secrets** セクションで、**New client secret** をクリックします。
3. 以下の情報を入力します。
    - **Description**: Cloudcraft
    - **Expires**: 730 日 (24 か月)
4. **Add** をクリックします。
5. 新しく作成したシークレットの **Value** をコピーします。
6. Cloudcraft の **Client secret** フィールドにクライアントシークレットを貼り付け、**Next** をクリックします。

#### Cloudcraft 用の IAM ユーザーの作成

最後に、Cloudcraft アプリケーションが Azure 環境を読み込めるように IAM ユーザーを作成します。

1. Cloudcraft で、**Open your Azure Subscriptions page** リンクをクリックして、Azure の **Subscriptions** ページを開きます。
2. Cloudcraft で使用するサブスクリプションを選択します。
3. サブスクリプションページで、左サイドバーの **Access control (IAM)** を選択します。
4. **Add** をクリックし、**Add role assignment** を選択します。ロール一覧が新しいページで表示されます。
5. **Reader** を選択し、**Next** をクリックします。
6. 次のページで、**User, group or service principal** を選択したままにして、**Select members** をクリックします。**Cloudcraft** を検索して、選択します。
7. **Review + assign** をクリックします。
8. Cloudcraft で **Next** をクリックします。

#### サブスクリプションの追加

アカウントを保存する前に、オプションでチームアクセスを構成することができます。

1. **Team access** をクリックし、Azure アカウントへのアクセスを共有するチームを選択します。この手順をスキップすると、アカウントは非公開となり、自分だけがアクセスできるようになります。

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/share-azure-account.png" alt="チーム共有のオプションで Azure アカウントへのアクセスを共有するチームを選択するドロップダウンメニューが表示された Cloudcraft インターフェイス。" responsive="true" style="width:100%;">}}

2. **Save Account** をクリックします。

これで Azure アカウントを Cloudcraft で使用する準備が整いました。

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-account-added.png" alt="Azure アカウントを管理する Cloudcraft インターフェースでアカウントが追加されている状態のスクリーンショット。" responsive="true" style="width:100%;">}}

## アカウントの編集

アカウントを編集するには、編集したいアカウントの左側にあるグレーの鉛筆アイコンをクリックします。名前、ARN、チームアクセスなど、アカウントの詳細情報を変更できます。

完了したら、**Save Account** をクリックします。

## アカウントの削除

アカウントを削除するには、削除したいアカウントの右側にあるゴミ箱アイコンをクリックし、**Remove** をクリックします。

[1]: /ja/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing