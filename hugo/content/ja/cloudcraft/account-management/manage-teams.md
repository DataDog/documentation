---
title: チームの管理
---

アーキテクチャレビューをチームワークで行い、リアルタイムのクラウドインフラストラクチャービューを共有し、Cloudcraft チームの助けを借りて次のプロジェクトを共同設計しましょう。

Cloudcraft のチームへの追加は簡単で、全員がリアルタイムで共同作業を行うことができます。

アカウント所有者と管理者ロールを持つチームメンバーは、ユーザーを招待したり削除したり、メンバーのロールを変更することができます。

<section class="alert alert-info">
 <p>チーム機能は Cloudcraft Pro および Enterprise プランでご利用いただけます。</p>
</section>

## ユーザー管理

### 新規ユーザーの招待

チームにメンバーを追加するには、Cloudcraft 内の **User → Team settings** に移動します。

次に、表示された **Manage Team** ウィンドウの下部にある青い **Add member** ボタンをクリックします。

{{< img src="cloudcraft/account-management/manage-teams/add-member.png" alt="「Add Member」ボタンがハイライトされた Cloudcraft の「Manage Team」インターフェイスのスクリーンショット。" responsive="true" style="width:100%;">}}

ボタンをクリックしたら、ユーザーのメールアドレスを入力し、チームでのロールを選択する必要があります。

{{< img src="cloudcraft/account-management/manage-teams/add-teammate.png" alt="Cloudcraft でチームメンバーを追加するためのユーザーインターフェイス (メールアドレス入力とロール選択オプション付き)。" responsive="true" style="width:100%;">}}

ロールによってアクセスできるレベルが異なるため、正しいロールを選択することはこのプロセスにおいて重要なステップです。このユーザーに最も適したロールを選択しますが、[最小権限の原則][1]に従うようにしてください。

最後に、**Send invite** ボタンをクリックして、ユーザーをチームに招待します。招待されたユーザーには、チームに参加し、アカウントをセットアップする (まだしていない場合) ためのリンクが記載されたメールが送信されます。

<section class="alert alert-info">
 <p>組織横断チームのメンバーである場合、ユーザーは組織横断ロールを継承します。</p>
</section>

### 既存ユーザーの削除

誰かがチームから離脱した場合、または誰かが誤って追加された場合、そのユーザーをチームから削除したいと思うでしょう。そのためには、Cloudcraft 内の **User → Team settings** に移動します。

次に、削除したいユーザーを選択し、名前の右側にある灰色のゴミ箱アイコンをクリックします。

{{< img src="cloudcraft/account-management/manage-teams/trash-can-icon.png" alt="削除アクションアイコンが付いたユーザー連携機能をハイライトする Cloudcraft Manage Team インターフェイスのスクリーンショット。" responsive="true" style="width:100%;">}}

画面に確認ダイアログが表示されます。赤い **Remove** ボタンをクリックすると、ユーザーがチームから削除されます。

<section class="alert alert-info">
 <p>削除されたユーザーが作成し、チームと共有していた図は、引き続きチームで利用できます。削除する前にユーザーのすべてのデータの移行についてサポートが必要な場合は、<a href="https://app.cloudcraft.co/app/support" title="Contact our support team">アプリケーション内からサポートチームにお問い合わせください</a>。</p>
 <p>削除されたユーザーのデータへのチームアクセスは、30 日間のデータ保持期間内にリクエストがあれば、復元することもできます。</p>
</section>

### 既存ユーザーのロールの変更

ユーザーのアクセス権を変更する必要がある場合は、Cloudcraft 内の **User → Team settings** に移動します。

次に、ユーザーの左にある灰色の鉛筆アイコンをクリックします。

{{< img src="cloudcraft/account-management/manage-teams/edit-user.png" alt="編集オプションをハイライトしている、Cloudcraft でチームメンバーを管理するためのユーザーインターフェイス。" responsive="true" style="width:100%;">}}

次のプロンプトでユーザーの新しいロールを選択し、青い **Save** ボタンをクリックします。以上で設定は完了です。

## チーム管理

<section class="alert alert-info">
 <p>複数チームの管理機能は、Enterprise プランでのみ利用可能です。</p>
</section>

### 新規チームの作成

アカウントに新しいチームを作成するには、Cloudcraft 内の **User → Team settings** に移動します。

左側のチームリストの下にある青い **Create Team** ボタンをクリックします。

{{< img src="cloudcraft/account-management/manage-teams/create-new-team.png" alt="Cloudcraft のチーム管理用ユーザーインターフェイス。チームメンバーのリストとともに「Create Team」ボタンをハイライトしています。" responsive="true" style="width:100%;">}}

次に、チームに名前を付け、可視性を設定する必要があります。**Visible** チームは組織内の誰でも見ることができ、**Secret** チームはアカウント所有者とチームのメンバーだけが見ることができます。

{{< img src="cloudcraft/account-management/manage-teams/create-new-team-settings.png" alt="チームの可視性とロールのオプションがある、Cloudcraft のチーム作成インターフェイスのスクリーンショット。" responsive="true" style="width:100%;">}}

チームを作成する前に、**Cross-organizational** ボックスをチェックして、このチームを組織横断チームにすることもできます。組織横断チームのメンバーは、組織内の他のすべてのチームに自動的に追加されます。組織横断チームの例としては、すべての個別チームを監視する必要がある中央セキュリティ管理チームがあります。

既に他のチームのメンバーでない限り、組織横断的なメンバーは組織横断的なロールを継承します。

下部にある **Create** ボタンをクリックすると、チームメンバーの招待を開始できます。

### 既存のチームの削除または更新

自分が所有するチームを更新または削除する必要がある場合は、Cloudcraft 内の **User → Team settings** に移動します。

更新したいチームを選択し、名前の横にある灰色の鉛筆アイコンをクリックします。

{{< img src="cloudcraft/account-management/manage-teams/edit-team.png" alt="「Manage Teams」インターフェイス内の編集ボタンがハイライトされた Cloudcraft のスクリーンショット。" responsive="true" style="width:100%;">}}

ここでは、チーム名を更新したり、表示されているチームをシークレットにしたり (またはその逆)、チームを組織横断型に変更したり、チームを完全に削除したりすることができます。

その他のチーム設定を更新するには、変更したい内容を入力し、一番下にある青い **Save** ボタンをクリックします。

{{< img src="cloudcraft/account-management/manage-teams/update-team-settings.png" alt="チームの可視性とロールを編集するオプションがある、Cloudcraft のチーム管理インターフェイスのスクリーンショット。" responsive="true" style="width:100%;">}}

チームを削除するには、赤い **Delete** ボタンをクリックし、チームを削除することを確認するだけです。

{{< img src="cloudcraft/account-management/manage-teams/delete-team.png" alt="チームを削除するための確認ダイアログが表示されている、Cloudcraft のインターフェイス。" responsive="true" style="width:100%;">}}

このプロセスで質問や問題がある場合は、[サポートチームにご連絡ください][2]。

[1]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[2]: https://app.cloudcraft.co/app/support