---
title: CoScreen
further_reading:
- link: "https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/"
  tag: Blog
  text: Leverage collaborative screen sharing with Datadog CoScreen
cascade:
    algolia:
        rank: 70
---

{{< img src="coscreen/collab-v2.mp4" alt="3 人のユーザーが同時に 3 つのウィンドウを共有。" width=80% video="true">}}

## 概要
[CoScreen][1] は、複数の参加者が同時にデスクトップ上の任意のアプリケーションウィンドウを共有し、対話することができるコラボレーションミーティングツールです。特にエンジニアリング向けに設計されており、ペアプログラミング、インシデント管理、共同トラブルシューティング、チームスタンドアップ、従業員のオンボーディングなどのユースケースに対応しています。

## セットアップ
#### 要件
{{< tabs >}}
{{% tab "デスクトップ" %}}
CoScreen は、Windows 10 および macOS v10.15 Catalina 以降で利用可能なデスクトップアプリです。

[CoScreen をダウンロードします][1]。

After installing CoScreen, launch the desktop app. You can sign in with your Datadog account.

[1]: https://www.coscreen.co/download
{{% /tab %}}
{{% tab "Web" %}}
[CoScreen Web アプリ][1]は、Chrome v87+、Edge v87+、Safari v16+ に対応しています。

CoScreen Web アプリの機能は限られています。CoScreen の機能をフルに利用するには、デスクトップアプリを使用してください。

[1]: https://app.coscreen.co/
{{% /tab %}}
{{< /tabs >}}

## 使用方法
### Join a CoScreen

CoScreen に招待された場合は、リンクをクリックしてください。**Join from browser** をクリックして Web アプリから CoScreen に参加することも、デスクトップアプリを起動することもできます。また、ミーティングリンクまたは ID を入力して手動で参加することもできます。

CoScreen に参加すると、メインメニューの _Recent CoScreens_ のリストに追加されます。これらはいつでも再参加することができます。

To enable noise reduction in the desktop app, go to **Settings** > **Audio** and select _Apply noise reduction to my microphone_.

On macOS, you can enable background blurring under **Settings** > **Camera** > **Video Effects**.

### コラボレーターを招待する

リンクを共有することで、コラボレーターを招待することができます。

You can also add your closest collaborators to the list of _Your Collaborators_ in the main menu. After a collaborator accepts your request, you can see if they are online and available and call them with a click.

### ウィンドウを共有する

CoScreen デスクトップアプリを使用すると、複数の方法でアプリケーションウィンドウを共有できます。

#### 共有するウィンドウを個別に選択する

{{< img src="coscreen/sharewindow2.mp4" alt="ウィンドウの上部には、「Share window」というタブ状のボタンが取り付けられています。このボタンをクリックすると、ウィンドウが紫色にハイライトされます。テキストは「Unshare window」に変わります。" width=50% video="true">}}

CoScreen に参加すると、どのディスプレイでもウィンドウの上にカーソルを置くと、** Share** タブが表示されます。このタブをクリックすることで、ウィンドウの共有と共有解除ができます。ウィンドウ共有ダイアログを使って、参加した CoScreen の他のメンバーと共有したいアプリケーションウィンドウを選択することもできます。

複数のユーザーが同時に複数のウィンドウを共有することができます。共有されたウィンドウの周囲には、CoScreen の参加者ごとに割り当てられた異なる色のボーダーが表示されます。

#### ウィンドウ共有ダイアログを使用して、ディスプレイ全体または個々のウィンドウを共有する

**Share windows** ボタンをクリックすると、ウィンドウの共有ダイアログが表示されます。

{{< img src="coscreen/share_windows_button.png" alt="CoScreen デスクトップ UI のボタンパネル。「Share windows」ボタンがハイライトされている。" style="width:50%;">}}

複数のディスプレイを使用している場合、ディスプレイを選択して **Share the entire display** をクリックすると、そのディスプレイ上で開いているすべてのウィンドウを共有できます。画面共有が有効になっている間は、共有ディスプレイに開いたりドラッグしたウィンドウもすべて共有されます。

また、共有するディスプレイのウィンドウをいくつでも選択できます。

CoScreen に参加すると、画面共有はデフォルトで無効化されます。

### 共有ウィンドウでのコラボレーション

{{< img src="coscreen/v5-control-tabs.mp4" alt="2 つのカーソルが同時に共有ウィンドウを操作する。" video="true" width=70% >}}

リモート参加者が共有ウィンドウ上でマウスポインタを動かすと、リモート参加者のマウスポインタを見ることができます。リモートウィンドウを表示すると、2 つのタブが表示されます。**Control** はウィンドウの操作、ボタンのクリック、テキストフィールドへの入力を可能にし、**Draw** はウィンドウへの描画を可能にします。

### Collaborate in a shared terminal

CoScreen includes a shared, collaborative terminal that enables users to run commands and to write and debug code together.

To start a shared terminal, click on the **Share terminal** button in the meeting menu:

{{< img src="coscreen/share_terminal.png" alt="CoScreen デスクトップ UI のボタンパネル。「Share terminal」ボタンがハイライトされている。" style="width:70%;">}}

The shared terminal appears for you and all other participants in the CoScreen session. If you enable remote control in CoScreen, other users can type and click into your terminal.

{{< img src="coscreen/coterm.png" alt="A shared CoScreen terminal window." style="width:60%;">}}

共有を停止するには、ターミナルウィンドウの **Unshare** タブをクリックするか、ミーティングメニューのボタンをクリックします。

For privacy, CoScreen uses [Sensitive Data Scanner][8] and entropy filters to detect and obfuscate sensitive data.

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

CoScreen captures general usage data, like used app features and session statistics, to learn about bugs and usage patterns. CoScreen never records or accesses shared windows or control input apart from enabling you to exchange window content and controls with your peers. See [CoScreen's Privacy Policy][6] for more details.

CoScreen がどのように安全なコラボレーションを可能にするかの詳細については、[CoScreen Security Whitepaper][7] をご覧ください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://coscreen.co/
[2]: https://www.coscreen.co/download
[3]: https://www.coscreen.co/integrations
[4]: https://coscreen.co/slack
[5]: https://chrome.google.com/webstore/detail/coscreen/pahmjnapohdeedmdhmbeddgmhebhegme
[6]: https://www.datadoghq.com/legal/privacy/
[7]: https://www.coscreen.co/security
[8]: /sensitive_data_scanner/
