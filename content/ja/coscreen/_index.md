---
further_reading:
- link: https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/
  tag: GitHub
  text: Datadog CoScreen による共同画面共有の活用
kind: documentation
title: CoScreen
---

{{< img src="coscreen/collab-v2.mp4" alt="3 人のユーザーが同時に 3 つのウィンドウを共有。" width=80% video="true">}}

## 概要
[CoScreen][1] は、複数の参加者が同時にデスクトップ上の任意のアプリケーションウィンドウを共有し、対話することができるコラボレーションミーティングツールです。特にエンジニア向けに設計されており、ペアプログラミング、インシデント管理、共同トラブルシューティング、チームスタンドアップ、従業員のオンボーディングなどのユースケースに対応しています。

## セットアップ
#### 要件
CoScreen は、Windows 10 および macOS v10.15 Catalina 以降で利用可能なデスクトップアプリです。

[CoScreen をダウンロードします][2]。

CoScreen をインストール後、デスクトップアプリを起動し、サインアップします。

### 初めての CoScreen に参加する

**New CoScreen** をクリックして、新しい CoScreen を作成します。CoScreen に招待された場合、リンクをクリックするか、**Join a CoScreen** をクリックして CoScreen ID または URL を貼り付けます。

CoScreen に参加すると、メインメニューの _Recent CoScreens_ のリストに追加されます。これらはいつでも再参加することができます。

### コラボレーターを招待する

リンクを共有することで、コラボレーターを招待することができます。

また、メインメニューの _Your Collaborators_ のリストに、身近なコラボレーターを追加することができます。コラボレーターがあなたのリクエストを受け入れた後、その人がオンラインで利用可能かどうかを確認し、ワンクリックで呼び出すことができます。

### ウィンドウを共有する

アプリケーションのウィンドウを複数の方法で共有することができます。

 - **共有するウィンドウを個別に選択します**。

   {{< img src="coscreen/sharewindow.mp4" alt="ウィンドウの上部には、「Share window」というタブ状のボタンが取り付けられています。このボタンをクリックすると、ウィンドウが紫色にハイライトされます。テキストは「Unshare window」に変わります。" width=50% video="true">}}

ウィンドウの共有と解除は、各ウィンドウの上にあるタブをクリックすることで行います。また、ウィンドウ共有ダイアログを使用して、参加した CoScreen の他のメンバーと共有したいアプリケーションウィンドウを選択することができます。

&nbsp;複数のユーザーが同時に複数のウィンドウを共有することができます。共有されたウィンドウの周囲には、CoScreen の参加者ごとに割り当てられた異なる色のボーダーが表示されます。

 - **ディスプレイ上のすべてのウィンドウを共有します**。

ウィンドウ共有ダイアログを開き、最初のオプションである _Entire display_ を選択すると、このディスプレイで開いているすべてのウィンドウが共有されます。画面共有が有効な間は、そのディスプレイ上に開いたりドラッグしたりしたすべてのウィンドウも共有されます。

**Share windows** ボタンをクリックすると、ウィンドウの共有ダイアログが表示されます。

{{< img src="coscreen/share_windows_button.png" alt="CoScreen デスクトップ UI のボタンパネル。「Share windows」ボタンがハイライトされている。" style="width:50%;">}}

デフォルトでは、CoScreen に参加すると、以下のようなダイアログが表示されます。

{{< img src="coscreen/share_windows.png" alt="ウィンドウの共有ダイアログ。ユーザーはディスプレイを選択し、次に共有するウィンドウを選択するよう促される。" style="width:60%;">}}

複数のディスプレイを使用している場合は、共有したいウィンドウが含まれるディスプレイを選択します。


CoScreen に参加すると、画面共有はデフォルトで無効化されます。

### 共有ウィンドウでのコラボレーション

{{< img src="coscreen/collaborate-v2.mp4" alt="2 つのカーソルが同時に共有ウィンドウを操作する。" video="true" width=70% >}}

リモート参加者が共有ウィンドウ上でマウスポインタを動かすたびに、そのマウスポインタを確認することができます。**誰もが任意の共有ウィンドウをクリックし、入力することができます**。リモートウィンドウのタブにある _Draw_ ボタンをクリックすると、共有ウィンドウに描画することもできます。

### インテグレーション

CoScreen は、Slack、Google Calendar、VS Code などのアプリとインテグレーションできます。[すべての CoScreen インテグレーションを見る][3]。

#### CoScreen + Slack

CoScreen Slack アプリをインストールするには、[coscreen.co/slack][4] に行き、_Add to Slack_ をクリックします。プライベートチャンネルで CoScreen を有効にするには、`@coscreen` と入力し、エンター/リターンを押して、_Invite to Channel_ をクリックします。マルチユーザー DM で CoScreen を有効にするには、_View Member List_ -> _Add People_ -> _CoScreen_ と進みます。

#### CoScreen + Google Calendar

このインテグレーションを構成するには、[CoScreen Chrome 拡張機能][5]をインストールし、サインインします。Google カレンダーのイベントを開き、**Add CoScreen** ボタンを使って、イベントを CoScreen ミーティングにします。

## セキュリティとプライバシー

 - **ネットワークセキュリティ**

CoScreen は、あなたと他の参加者が直接接続できる場合 (例えば、参加者間に企業のファイアウォールやプロキシがない場合)、P2P (ピアツーピア) 接続を使用します。オーディオ、ビデオ、ウィンドウ、またはコントロール入力のフィードは、CoScreen のサーバーに触れることはありません。接続は、DTLS-SRTP を使用してエンドツーエンドで暗号化されています。セッションに 3 人以上のユーザーがいる場合、接続はビデオブリッジを介して行われます。

 - **ビデオインフラストラクチャー**

参加者は、Jitsi フレームワークを実行する数百台のサーバーからなる、エンタープライズグレードの HIPAA 対応ビデオインフラストラクチャーを使用して、コラボレーションを行うことができます。すべてのビデオデータは、送信時に DTLS-SRTP で暗号化されます。


 - **データストレージ**

CoScreen は、共有情報 (例えば、共有ウィンドウ、オーディオ、ビデオ、リモコン入力など) を記録または保存しません。

CoScreen は、バグや使用パターンを知るために、使用されたアプリの機能やセッション統計などの一般的な使用量データをキャプチャしています。CoScreen は、ウィンドウのコンテンツやコントロールを仲間と交換できるようにする以外には、共有ウィンドウやコントロール入力を記録したりアクセスしたりすることはありません。詳しくは、[CoScreen のプライバシーポリシー][6]をご覧ください。

CoScreen がどのように安全なコラボレーションを可能にするかの詳細については、[CoScreen Security Whitepaper][7] をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://coscreen.co/
[2]: https://www.coscreen.co/download
[3]: https://www.coscreen.co/integrations
[4]: https://coscreen.co/slack
[5]: https://chrome.google.com/webstore/detail/coscreen/pahmjnapohdeedmdhmbeddgmhebhegme
[6]: https://www.datadoghq.com/legal/privacy/
[7]: https://www.coscreen.co/security