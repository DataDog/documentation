---
title: Cloudcraft で使用するカスタム IAM ポリシーを作成する
---

Cloudcraft は、_読み取り専用_の IAM ロールを使用して AWS アカウントをスキャンし、コンポーネント間のサービス関係をリバースエンジニアリングして、アーキテクチャのダイアグラムを自動生成します。

すべてを設定する最も簡単な方法は、アプリケーション内の指示に従うことです。これにより、数回のクリックでロールが作成され、権限が設定されます。このロールにはデフォルトで AWS 管理の `ReadOnlyAccess` IAM ポリシーが割り当てられます。

もし、特定のサービスや API を除外するなど、より正確に権限を制御する必要がある場合、カスタム Cloudcraft IAM ポリシーを使用することでそれが可能になります。

<div class="alert alert-info">カスタム IAM ポリシーを使用する場合、新しいサービスや機能が Cloudcraft に追加されるたびに手動で更新する必要があります。アプリ内で <strong>Limited AWS access</strong> という通知が表示された場合、以下から最新バージョンのカスタム IAM ポリシーに更新してみてください。</div>

## カスタム IAM ポリシーの作成

まず、[IAM ポリシーコンソール][1]を開き、**Create Policy** ボタンをクリックします。

{{< img src="cloudcraft/advanced/minimal-iam-policy/create-policy.png" alt="AWS IAM 管理コンソールで Create Policy ボタンをハイライトしている。" responsive="true" style="width:100%;">}}

JSON タブに切り替え、以下のリンクされたポリシーのいずれかの内容をコピーします。

また、独自の要件に合わせてポリシーをカスタマイズすることもできます。

- **[Cloudcraft custom IAM policy][2]:** このポリシーはデフォルトの `ReadOnlyAccess` ポリシーよりも厳格です。このポリシーには、Cloudcraft が使用する個々のサービスと読み取り専用の権限のみが含まれています。Cloudcraft が完全に新しいサービスのサポートを追加する際には、通常このポリシーを更新する必要があります。
- **[Cloudcraft minimal IAM policy][3]:** これは最も厳格な形式のポリシーです。このポリシーには、Cloudcraft の完全な機能のための個別の読み取り専用権限がそれぞれ列挙されています。このポリシーは、新しいサービスのサポートが追加されたときや既存のサービスが改善されたときなど、より頻繁に更新する必要があります。
- 上記のいずれかのポリシーをベースにして、独自のカスタマイズを行うことができます。たとえば、個々のサービスや権限を削除することが可能です。Cloudcraft がサービスにアクセスできない場合、そのサービスは結果として生成されるダイアグラムから除外されます。

画面の下部にある **Review policy** ボタンをクリックし、名前と説明を入力します。Cloudcraft は、整理と監査を容易にするために、以下の値を使用することを推奨しています。

- **Policy Name:** Cloudcraft
- **Policy Description:** Cloudcraft のカスタムポリシーです。

次に、**Create policy** をクリックしてポリシーを作成します。AWS コンソールはポリシーページにリダイレクトします。

最後に、新しく作成したポリシーを [Cloudcraft IAM ロール][4]に適用します。まだロールを作成していない場合は、アプリケーション内の指示に従ってください。

[1]: https://console.aws.amazon.com/iamv2/home#/policies
[2]: https://api.cloudcraft.co/aws/account/iamParameters/policy/custom
[3]: https://api.cloudcraft.co/aws/account/iamParameters/policy/minimal
[4]: https://console.aws.amazon.com/iam/home?#/roles/cloudcraft