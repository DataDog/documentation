---
title: CoScreen Optimization and Troubleshooting
is_beta: false
---

### Why does the audio quality degrade when using the microphone of my Bluetooth headset as input in CoScreen, Zoom, and other tools?

If you're using a Bluetooth headset, the playback quality may degrade when your headset's microphone is selected as an audio input device. You may notice this if you play audio (for example, play a YouTube video) while you are in a CoScreen session. This can occur because your Bluetooth headset has switched to using a different Bluetooth profile.

When only playing audio, Bluetooth headsets typically use the [A2DP profile][2], which is optimized for high audio quality but does not support using the microphone. If you choose your headset microphone as audio input (for example, during a CoScreen session or Zoom meeting) the headset switches to a different profile, usually [HFP][3] or [HSP][4], which supports microphone usage but has lower sound quality. Most Bluetooth headsets can use only one profile at a time.

To avoid this issue, you can use a different audio input—such as a laptop's built-in microphone. You may need to restart your application to regain high  quality audio.

### 画面共有の品質やリモートコントロールのレイテンシーを最適化するにはどうすればよいですか？

あなたとあなたの周りの人々が共有するウィンドウの品質の背後にあるいくつかの重要な要因に影響を与えることができます。

#### ネットワーク帯域と安定性

* 参加者全員が、アップロードとダウンロードが 5Mbps 以上の高速で安定したインターネット接続が可能であることを確認してください。
* システムのパケットロスが 2% 以上ないことを確認してください。プロバイダーに関係なく、ビデオ会議はこの値を超えると不安定になります。[パケットロステスト][1]を実行してください。問題が発生した場合は、ルーターやモデムを再起動したり、ルーターの近くに移動したり、別のインターネット接続でテストしてみてください。
* CoScreen は、2 人の参加者だけがピアツーピアで接続できる場合 (つまり、間に企業のプロキシやファイアウォールを介さずに直接接続できる場合)、最も速く機能します。参加者が 3 人以上になった場合、または直接接続が確立できない場合、トラフィックはグローバルに分散されたビデオインフラクチャーを経由し、あらゆる状況下での接続性を確保します。

#### 画面解像度
CoScreen は高解像度の画面共有をサポートしており、自分や相手が 4k 以上の超高解像度のディスプレイを使用していても対応できます。ネットワーク帯域と CPU が対応する負荷に対応できることを確認してください。問題がある場合は、両端を低解像度で試してみてください。

#### CPU
CoScreen は、他の多くのツールよりもはるかに高い品質でウィンドウをキャプチャするため、古いシステムでは 1 つの CPU コアの最大 60% を共有ウィンドウに費やすことができます。CPU の割り当てを確認してください。

### ファイアウォールと SSL
企業内ファイアウォールや SSL 検査を使用している場合、CoScreen クライアントが CoScreen サーバーに接続できず、あなたとチームメンバー間の接続が確立できない可能性があります。許可リストへの URL のリストについては、サポートにお問い合わせください。

### macOS でのトラブルシューティング

#### サイドパネルの UI がグレーアウトし、接続が確立されない

UI がグレーアウトした参加フェーズで止まっているのに、"Unable to connect to CoScreen" (CoScreen に接続できません) ダイアログが表示されないという問題に遭遇することがあります。CoScreen は、固定されていない 1 つのデスクトップ上に存在することを想定しているためです。この問題は、複数のデスクトップに特化して常駐するようにアプリケーションを構成している場合に発生する可能性があります。

この問題を解決するには

1. CoScreen アプリケーションのアイコンを右クリックし、_Options_ に進みます。
2. _Assign To_ が _None_ に設定されていることを確認します。
3. _Options_ を終了し、CoScreen に再接続します。

{{< img src="coscreen/assign-to-none.png" alt="macOS のドックのスクリーンショット。CoScreen を右クリックするとメニューが表示され、'Options' にカーソルを合わせると、2 つ目のメニューが表示されます。'Assign To' で、ユーザーは 'None' を選択しています。" style="width:60%;" >}}

### Windows でのトラブルシューティング

#### CoScreen は Windows の管理者モードでどのように動作しますか？

CoScreen を管理者モードで実行し、同じく管理者モードで起動されたアプリを共有する場合、すべてのリモートユーザーは共有されたウィンドウを操作することができます。しかし、非管理者モードで CoScreen を実行し、管理者モードで起動されたアプリを共有する場合、リモートユーザーはそのウィンドウを操作できません。

#### CoScreen の UI が小さく表示される

Windows コンピューターで CoScreen UI が他のアプリより小さく表示される場合、ディスプレイ設定で構成されたスケーリング係数と CoScreen との相互作用が関係しています。画面のスケーリングと解像度を下げることで、エクスペリエンスを改善することができます。

#### 私の声が聞き取りにくい、またはロボットみたいだ

一部のデバイスでは、Realtek の音声認識機能を使用しているため、CoScreen 使用時に声がロボットっぽく聞こえることがあります。声の聞き取りに問題がある場合は、Realtek Audio Console を開き、オプションの **Voice Recognition** のチェックを外して状況が改善されるかどうか確認してください。

{{< img src="coscreen/windows_screenshot.png" alt="Realtek Audio Console の Windows ダイアログのスクリーンショット。'Voice Recognition' のトグルはオフに設定されています。" style="width:70%;" >}}

[1]: https://packetlosstest.com/
[2]: https://www.bluetooth.com/specifications/specs/advanced-audio-distribution-profile-1-4/
[3]: https://www.bluetooth.com/specifications/specs/hands-free-profile/
[4]: https://www.bluetooth.com/specifications/specs/headset-profile-1-2/