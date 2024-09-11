---
title: AWS アカウントを Cloudcraft に接続する
---

AWS アカウントを Cloudcraft に接続すると、ライブ環境のサービス同士の関係をリバースエンジニアリングでシステムアーキテクチャ図に落とし込み、インフラストラクチャーを可視化できます。ダイアグラムが自動的に生成されるだけでなく、予算モデルも作成され、インポートされたコンポーネントはリアルタイムのステータスデータをダイアグラムに直接表示します。Cloudcraft に接続できる AWS アカウントの数に制限はありません。

**注**: AWS 組織の場合、組織内の各アカウントに Cloudcraft ロールを手動で追加する必要があります。

この記事では、AWS アカウントを Cloudcraft に接続する手順を説明します。

## 要件

- [オーナーまたは管理者ロール][1]を持つ Cloudcraft ユーザー。
- 有効な [Cloudcraft Pro サブスクリプション][2]。
- IAM ロールの作成権限を持つ AWS アカウント。

## ライブ AWS sync の仕組み

Cloudcraft は [AWS 環境に安全にアクセスするためにクロスアカウントロール][3]を使用します。そのため、AWS アカウントに Cloudcraft 専用の読み取り専用ロールを作成する必要があります。このロールはいつでも取り消すことができます。

すべてのコンポーネントにアクセス可能な読み取り専用ロールの使用が許可されていない場合や、社内ポリシーに違反する場合、[より厳格な最小限アクセスポリシーを適用する][4]ことも可能です。これにより、Cloudcraftで使用したいリソースに限定して読み取り専用アクセスを与え、ロールがアクセスできるデータ量をさらに最小化することができます。

Cloudcraft は AWS 環境のライブデータを一切保持しません。その代わりに、AWS 内のリソースの一意の識別子である ARN を保存します。これにより、アプリケーションは実行時にライブデータをコンポーネントに紐づけることができます。

AWS 環境のデータは、Cloudcraft 独自の AWS 環境を介してロールベースのアクセスを通じてリアルタイムでブラウザにストリーミングされ、アプリケーションを使用している間のみクライアント側に保存されます。アプリケーションを閉じると、ライブデータは削除されます。

アカウントへの書き込み権限を持たないことで、Cloudcraft は EC2 インスタンスをダイアグラムとアカウントの両方から削除するといった特定の機能を提供できませんが、その方が単純により安全なアプローチであると言えます。

Cloudcraft は、SOC2 準拠プログラムにより厳格なセキュリティ処理および管理を実施しています。Cloudcraft のセキュリティプログラムと管理については、[セキュリティページ][5]をご覧ください。

## AWS アカウントの管理

### アカウントの追加

1. Cloudcraft で **User** > **AWS accounts** に移動します。
2. モーダルの一番下にある **Add AWS Account** をクリックします。
3. 次のページでは、手順が順を追って表示されます。**Open the AWS IAM Console to the Create Role page (AWS IAM コンソールの Create Role ページを開く)** をクリックして、AWS で読み取り専用の IAM ロールを構成します。

<div class="alert alert-info"><strong>Create Role</strong> ページにアクセスできない場合は、新しい IAM ロールを作成するための <strong>AdministrativeAccess</strong> または十分な IAM 権限が不足している可能性があります。その場合は、AWS アカウントの管理者に連絡して、次の手順を実行してもらいます。</div>

4. AWS の **Create role** ページで **Require MFA** のチェックを外し、**Next** をクリックします。

<div class="alert alert-info"><strong>Require MFA</strong> は、人間が関与しないシステム間のアクセスには適用できないため、無効にする必要があります。代わりに、アクセスは Cloucraft AWS アカウントからのアクセスに制限されることで保護されます。</div>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/create-iam-role.png" alt="ロール構成で信頼できるエンティティの選択オプションが表示されている AWS Identity and Access Management コンソール画面。" responsive="true" style="width:100%;">}}

5. 次に、権限ポリシーをロールに追加します。検索ボックスに **ReadOnlyAccess** と入力し、**Enter** を押すと、ポリシーが名前でフィルタリングされます。
6. AWS サービスおよびリソースへの読み取り専用アクセスを提供する **ReadOnlyAccess** ポリシーを選択し、**Next** をクリックします。

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/read-only-role.png" alt="'ReadOnlyAccess' ポリシーがハイライト表示され、選択されている AWS 管理コンソールページ。" responsive="true" style="width:100%;">}}

7. IAM ロールの名前と説明を入力します。また、タグを追加して、ロールの整理、追跡、アクセス制御を行うこともできます。ロールへのタグ付けは任意です。タグ付けのベストプラクティスについては、[AWS リソースのタグ付けのベストプラクティス][6]を参照してください。
8. **Create role** をクリックします。
9. ロールのリストから `cloudcraft` ロールを選択します。**Summary** 0ページで **Role ARN** をコピーします。

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-summary.png" alt="Cloudcraft インテグレーション用の Role ARN が表示された AWS IAM ロール構成画面。" responsive="true" style="width:100%;">}}

10. Cloudcraft の **Role ARN** フィールドに ARN を貼り付け、アカウント名を入力します。
11. オプションで、**Team access** の下にある青いボタンをクリックし、AWS アカウントへのアクセスを共有するチームを選択して、チームアクセスを構成します。

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/team-access.png" alt="Team access オプションで Cloudcraft、Team Demo、Cloudcraft Sales + Support のチームタグが表示されているCloudcraft インターフェース。" responsive="true" style="width:100%;">}}

12. **Save Account** をクリックします。

### アカウントの編集

アカウントを編集するには、編集したいアカウントの左側にあるグレーの鉛筆アイコンをクリックします。名前、ARN、チームアクセスなど、アカウントの詳細情報を変更できます。

完了したら、**Save Account** をクリックします。

### アカウントの削除

アカウントを削除するには、削除したいアカウントの右側にあるゴミ箱アイコンをクリックし、**Remove** をクリックします。

[1]: /ja/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: /ja/cloudcraft/advanced/minimal-iam-policy/
[5]: https://www.cloudcraft.co/security
[6]: https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html