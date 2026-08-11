---
aliases: null
description: モバイル デバイス向けの Session Replay の設定
further_reading:
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: Session Replay
title: Mobile Session Replay
---
## 概要

Mobile Session Replay は、タップ、スワイプ、スクロールなどのユーザー操作を視覚的に再生することで、モバイル アプリケーションの利用状況をより深く可視化できます。Android と iOS のネイティブ アプリで利用できます。操作を画面上でそのまま追体験できるため、クラッシュやエラーの再現がしやすくなり、UI 改善に向けたユーザー ジャーニーの理解にも役立ちます。

{{< img src="real_user_monitoring/session_replay/mobile/mobile_replay.mp4" alt="Mobile Session Replay の録画例" video="true" style="width:60%;">}}

## Session Replay レコーダーの仕組み

Session Replay レコーダーは RUM Mobile SDK に組み込まれています。Web ブラウザと異なり、モバイル アプリは HTML や CSS を使用しません。そこでレコーダーは、アプリ画面を「ワイヤーフレーム」と呼ばれるシンプルな長方形に分解して「スナップショット」を取得します。その後は変更があったワイヤーフレームだけを更新して追跡するため、効率よく高速に処理できます。

### ワイヤーフレームの概念

_ワイヤーフレーム_ は、ボタン、画像、背景など、アプリ画面の特定領域を示すデジタルの付箋のようなものです。各ワイヤーフレームは長方形で、レコーダーが画面上の状態を把握するための手がかりになります。

**ワイヤーフレームの例**
- テキスト ラベルは、位置とサイズで定義される "text" ワイヤーフレームになります。
- アプリの背景は、画面全体を覆う長方形として表される "shape" ワイヤーフレームです。
- 単色の背景を持つコンテナも "shape" ワイヤーフレームになります。
- 画像やアイコンは "image" ワイヤーフレームになり、透明度などのスタイル情報を含めることもできます。
- 複数の要素で構成される地図のような複雑な部品でも、1 つの "image" ワイヤーフレームにまとめられます。

### 記録アルゴリズム

レコーダーはアプリ画面を背面から前面へと走査し、表示されている部品をすべて検出します。そして各部品に対してワイヤーフレームを作成します。例えば、78 個の要素がある画面でも、25 個のワイヤーフレームに簡略化できます。

{{< img src="real_user_monitoring/session_replay/mobile/how-it-works/recording-algorithm-3.png" alt="Shopist アプリの画面には 78 個のネイティブ ビューが含まれますが、25 個のワイヤーフレームで構成されています。" style="width:70%;">}}

ワイヤーフレームは、画面上での表示順 (背面→前面) で記録され、正確な画面座標に基づいて配置されます。複雑なツリー構造は使わず、長方形のシンプルなフラット リストとして扱います。

### レンダリング アルゴリズム

リプレイを再生すると、Datadog のプレイヤーが各ワイヤーフレームを順に描画して画面を再構築します。各長方形の位置とサイズを使って、すべての要素を正しい場所に配置します。最初のワイヤーフレームが、画面サイズと向き (縦向き / 横向き) を決定します。

新しいワイヤーフレームは、透明なシートを重ねるように既存の上へ描画されます。これにより、重なり合う要素や半透明の要素なども正しく表現できます。

例えば、上に示したスクリーンショットは 25 回の描画パスで再構築されます。

| イテレーション | 1 | 2 | 3 |
|-----------|---|---|---|
| ビューポート | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-1-1.png" alt="'shape' ワイヤーフレームの例。" style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-2-1.png" alt="'image' ワイヤーフレームの例。" style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-3-1.png" alt="'text' ワイヤーフレームの例。" style="width:100%;">}} |

最初のワイヤーフレームがビューポート サイズを決めることで、Session Replay プレイヤーは端末の画面サイズと向き (縦向き / 横向き) を適切に表現できます。

| イテレーション | 4 | 5-11 | 12-13 |
|-----------|---|---|---|
| ビューポート | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-4-1.png" alt="'shape'、'image'、'text' ワイヤーフレームの例。" style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-5-1.png" alt="'shape' と 'image' ワイヤーフレームの例。" style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-6-1.png" alt="'shape' と 'image' ワイヤーフレームの例。" style="width:100%;">}} |

ワイヤーフレームは背面から前面の順に並んでいるため、プレイヤーは既存部分を描き直しながらフレームを更新します。この挙動は、半透明の要素など複数の UI パターンを自然に扱えるため都合がよいものです。

| イテレーション | 14-25 | 最終結果 |
|-----------|-------|--------------|
| ビューポート | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-7-1.png" alt="'shape' と 'image' ワイヤーフレームの例。" style="width:60%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-final-1.png" alt="'shape' と 'image' ワイヤーフレームの例。" style="width:60%;">}} |

### フル スナップショットと増分スナップショット

「フル スナップショット」は、すべてのワイヤーフレームを含む画面全体の写真を撮るようなものです。ただし時間とデータ量を節約するため、通常は変更があったワイヤーフレームだけを含む「増分スナップショット」を送信します。

各ワイヤーフレームには一意の ID (名札のようなもの) が付いているため、レコーダーは更新対象を正確に特定できます。例えば次のとおりです。
- ワイヤーフレームが移動した場合は、新しい位置と ID だけを送信します。
- ワイヤーフレームが画面から消えた場合は、削除された ID を知らせます。
- コンテンツだけが変わる場合 (テキストの更新など) は、新しいコンテンツとそのワイヤーフレームの ID を送信します。

以下は、増分スナップショットが影響のあるワイヤーフレームに対する更新だけを送ることを示す例です。

| 例 | 説明 |
|---------|-------------|
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-change-position.mp4" alt="ワイヤーフレームの位置は変わるが、コンテンツと見た目は変わらないスナップショット。" video="true" >}} | ワイヤーフレームの位置だけが変わり、コンテンツや見た目に変更がない場合、増分スナップショットに含めるのは、影響を受けたワイヤーフレームの新しい位置とその `UUIDs` だけで足ります。これは、ゆっくりしたスクロールのように画面の一部だけが移動するケースなどに相当します。 |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-wireframe-disappears.mp4" alt="ワイヤーフレームが画面から消える例。" video="true" >}} | ワイヤーフレームが画面から消えた場合、増分スナップショットには削除された `UUIDs` の情報だけを含めることもできます。あるいは、残っている `UUIDs` の情報を常に含める方式でも構いません。 |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-content-only.mp4" alt="ワイヤーフレームのコンテンツだけが変わる例。" video="true" >}} | ワイヤーフレームのコンテンツだけが変わる場合、増分更新では、新しいコンテンツと変更されたワイヤーフレームの `UUID` だけを送信します。 |

まとめると、Session Replay レコーダーはアプリ画面をワイヤーフレームというシンプルな長方形に分解し、変化した部分だけを追跡して更新を送信します。そのため、リプレイを効率的かつ正確に再現できます。

## セットアップ

[Mobile Session Replay のセットアップと設定方法][2] を参照してください。
## プライバシー オプション

[プライバシー オプション][3] を参照してください。

## Mobile Session Replay がアプリのパフォーマンスに与える影響

[Mobile Session Replay がアプリのパフォーマンスに与える影響][4] を参照してください。

## トラブルシューティング

[Mobile Session Replay のトラブルシューティング][5] を参照してください。

<div class="alert alert-info">Session Replay では、Datadog はネイティブ iOS および Android のモバイル アプリ向けに RUM をサポートしていますが、スマート TV やウェアラブルには対応していません。</div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/browser/#how-it-works
[2]: /ja/real_user_monitoring/session_replay/mobile/setup_and_configuration
[3]: /ja/real_user_monitoring/session_replay/mobile/privacy_options
[4]: /ja/real_user_monitoring/session_replay/mobile/app_performance
[5]: /ja/real_user_monitoring/session_replay/mobile/troubleshooting