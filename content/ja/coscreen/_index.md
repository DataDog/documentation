---
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/
  tag: GitHub
  text: Datadog CoScreen による共同画面共有の活用
title: CoScreen
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

CoScreen をインストールした後、desktop アプリを起動します。Datadog アカウントでサインインできます。

[1]: https://www.coscreen.co/download
{{% /tab %}}
{{% tab "Web" %}}
[CoScreen Web アプリ][1]は、Chrome v87+、Edge v87+、Safari v16+ に対応しています。

CoScreen Web アプリの機能は限られています。CoScreen の機能をフルに利用するには、デスクトップアプリを使用してください。

[1]: https://app.coscreen.co/
{{% /tab %}}
{{< /tabs >}}

## 使用方法
### CoScreen への参加

CoScreen に招待された場合は、リンクをクリックしてください。**Join from browser** をクリックして Web アプリから CoScreen に参加することも、デスクトップアプリを起動することもできます。また、ミーティングリンクまたは ID を入力して手動で参加することもできます。

CoScreen に参加すると、メインメニューの _Recent CoScreens_ のリストに追加されます。これらはいつでも再参加することができます。

desktop アプリでノイズ リダクションを有効にするには、**Settings** > **Audio** に移動し、_Apply noise reduction to my microphone_ を選択します。

macOS では、**Settings** > **Camera** > **Video Effects** で背景のぼかしを有効にできます。

### コラボレーターを招待する

リンクを共有することで、コラボレーターを招待することができます。

メイン メニューの _Your Collaborators_ リストに、よく一緒に作業するコラボレーターを追加することもできます。相手がリクエストを承認すると、そのユーザーがオンラインかどうかと利用可能かを確認し、クリックだけで通話できます。

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

### 共有ターミナルでのコラボレーション

CoScreen には、ユーザーがコマンドを実行し、コードを共同で記述・デバッグできる共有型のコラボレーション ターミナルが含まれています。

共有ターミナルを開始するには、ミーティング メニューで **Share terminal** ボタンをクリックします:

{{< img src="coscreen/share_terminal.png" alt="CoScreen デスクトップ UI のボタンパネル。「Share terminal」ボタンがハイライトされている。" style="width:70%;">}}

共有ターミナルは、あなたと CoScreen セッションのすべての参加者に表示されます。CoScreen でリモート コントロールを有効にすると、他のユーザーがあなたのターミナルに入力したりクリックしたりできるようになります。

{{< img src="coscreen/coterm.png" alt="共有されている CoScreen ターミナル ウィンドウ。" style="width:60%;">}}

共有を停止するには、ターミナルウィンドウの **Unshare** タブをクリックするか、ミーティングメニューのボタンをクリックします。

プライバシー保護のため、CoScreen は [Sensitive Data Scanner][8] とエントロピー フィルターを使用して機密データを検出し、マスクします。

### インテグレーション

CoScreen は、Slack、Google Calendar、VS Code などのアプリとインテグレーションできます。[すべての CoScreen インテグレーションを見る][3]。

#### CoScreen + Slack

CoScreen Slack アプリをインストールするには、[coscreen.co/slack][4] に行き、_Add to Slack_ をクリックします。プライベートチャンネルで CoScreen を有効にするには、`@coscreen` と入力し、エンター/リターンを押して、_Invite to Channel_ をクリックします。マルチユーザー DM で CoScreen を有効にするには、_View Member List_ -> _Add People_ -> _CoScreen_ と進みます。

#### CoScreen + Google Calendar

このインテグレーションを構成するには、[CoScreen Chrome 拡張機能][5]をインストールし、サインインします。Google カレンダーのイベントを開き、**Add CoScreen** ボタンを使って、イベントを CoScreen ミーティングにします。

#### CoScreen + Datadog Incident Management

[Incident Management][9] で **Meet on CoScreen** ボタンを使用し、インシデント対応者との CoScreen ミーティングを開始します。これを設定するには、[Incident Management Integration Settings][10] ページに移動し、**Enable click-to-join CoScreen meeting buttons** をオンに切り替えます。

## セキュリティとプライバシー

 - **ネットワークセキュリティ**

CoScreen は、あなたと他の参加者が直接接続できる場合 (例えば、参加者間に企業のファイアウォールやプロキシがない場合)、P2P (ピアツーピア) 接続を使用します。オーディオ、ビデオ、ウィンドウ、またはコントロール入力のフィードは、CoScreen のサーバーに触れることはありません。接続は、DTLS-SRTP を使用してエンドツーエンドで暗号化されています。セッションに 3 人以上のユーザーがいる場合、接続はビデオブリッジを介して行われます。

 - **ビデオインフラストラクチャー**

参加者は、Jitsi フレームワークを実行する数百台のサーバーからなる、エンタープライズグレードの HIPAA 対応ビデオインフラストラクチャーを使用して、コラボレーションを行うことができます。すべてのビデオデータは、送信時に DTLS-SRTP で暗号化されます。


 - **データストレージ**

CoScreen は、共有情報 (例えば、共有ウィンドウ、オーディオ、ビデオ、リモコン入力など) を記録または保存しません。

CoScreen は、使用されたアプリ機能やセッション統計などの一般的な使用データを収集し、バグと利用パターンの把握に役立てます。共有ウィンドウのコンテンツと操作をピア間で交換できるようにする場合を除き、CoScreen が共有ウィンドウやコントロール入力を記録・アクセスすることはありません。詳細は [CoScreen のプライバシー ポリシー][6] を参照してください。

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
[8]: /ja/security/sensitive_data_scanner/
[9]: /ja/service_management/incident_management/
[10]: https://app.datadoghq.com/incidents/settings#Integrations