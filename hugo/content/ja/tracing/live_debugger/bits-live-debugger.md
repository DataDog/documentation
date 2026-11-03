---
aliases:
- /ja/tracing/live_debugger/debug-with-bits/
description: Bits Codeを使用して、会話型インターフェースからLive Debuggerセッションを作成および管理します。
further_reading:
- link: /bits_ai/bits_code/
  tag: ドキュメント
  text: Bits Code
- link: /tracing/live_debugger/
  tag: ドキュメント
  text: ライブデバッガー
- link: /dynamic_instrumentation/sensitive-data-scrubbing/
  tag: ドキュメント
  text: 機密データのスクラビング
- link: https://www.datadoghq.com/blog/live-debugger/
  tag: ブログ
  text: Datadog Live Debuggerを使用して、再デプロイすることなく本番環境のコードをデバッグします。
title: Bits ライブデバッガー
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/debug-with-bits/" >}}
Bits Live Debuggerはプレビュー版です。アクセスをリクエストして、待機のリストに登録してください。
{{< /beta-callout >}}

## 概要 {#overview}

Bits Live Debuggerは、Live Debuggerに会話型インターフェースをもたらし、自然言語を通じて実行中のサービスを調査できるようにします。調査したい内容を記述すると、Bitsがログポイントの配置、変数スナップショットの取得、結果の解釈を行います。Bitsが根本原因を特定した後、コードの修正案を提示できます。

すべてのデバッグアクティビティは[Live Debugger][1]を通じて実行されるため、同じ[権限][2]、レート制限、自動期限切れ動作、および[機密データのスクラビング][3]が適用されます。

Bits Live Debuggerの機能には、Live Debuggerページからのみアクセスできます。

<div class="alert alert-info">
Bits Live Debuggerは、基盤となるエージェントとして<a href="/bits_ai/bits_code/">Bits Code</a>を使用します。Bits Live Debuggerのプレビュー期間中は、Live Debuggerからセッションを開始してもBits Code AIクレジットは消費されません。
</div>

## 前提条件 {#prerequisites}

Bits Live Debuggerを使用する前に：

- [Live Debugger][1]が対象サービスに対して有効になっている必要があります。詳細は[Live Debuggerの有効化][7]を参照してください。
- アカウントには、対象環境に対する読み取り、書き込み、変数キャプチャの権限を含め、Live Debuggerの使用に必要な[権限][2]が付与されている必要があります。
- [Bits Code][5]が組織で利用可能である必要があります。
- [Source Code Integration][6]が対象サービスに対して設定されている必要があります。

## 実行可能アクション {#available-actions}

Bitsは、デバッグセッション中に以下のLive Debuggerアクションを実行できます。

| アクション | 説明 |
|--------|-------------|
| サービスを検出する | 特定の環境でデバッグに使用できるサービスを検索し、検証します。|
| ログポイントを作成する | 実行中のサービスの特定のコード場所にログポイントを追加します。|
| セッションのログポイントを一覧表示する | デバッグセッションでアクティブなログポイントを一覧表示します。|
| ログポイントを無効にする | デバッグセッション内のすべてのログポイントを無効にします。|
| スナップショットデータを取得する | アクティブなログポイントから、キャプチャされた変数値と実行コンテキストを取得します。|

Bitsによって作成されたログポイントは、手動で作成されたログポイントと同じルールに従います。これらは読み取り専用で、非ブロッキングであり、設定された時間制限（10分から2日、デフォルトは60分）が経過すると自動的に期限切れになります。Bitsはアプリケーションの状態を変更したり、フローを変更したりすることはできません。

## デバッグセッションを開始する {#start-a-debugging-session}

1. Datadogの[Live Debugger][4]に移動します。
1. Bits Live Debuggerのチャットボックスで、調査したい問題を説明してください。プロンプトを送信する前に、対象のサービスと環境を選択してください。

   その後、Bitsが自動的に調査を進めます。
   - 接続されたソースコードリポジトリ内の関連するコードパスを分析し、仮説を立てるために追加の質問をする場合があります。
   - 必要な特定のデータを取得するため、関連するコード場所に最大5つのログポイントを設定し、有効化します。
   - アクティブなログポイントからログと変数のスナップショットを取得・分析し、仮説を検証して回答を作成します。

1. Bitsからの回答を確認し、必要に応じてログポイントの詳細、取得したデータ、提案されたコード修正を確認してください。必要に応じてチャットで返信し、調査を継続してください。
1. いつでもログポイントを無効にするには、Bitsに依頼するか、個々のログポイントまたはセッションにある{{< ui >}}Disable{{< /ui >}}ボタンをクリックしてください。

**注**: Bitsは通常、必要なデータを取得するとすぐに、自身が作成したログポイントを無効にします。ログポイントも、設定された制限時間が経過すると自動的に期限切れになります。

## 動作と制限{#behavior-and-limitations}

**マルチバージョン環境**: ターゲット環境に複数のコードバージョンがデプロイされている場合、ターゲットファイルがバージョン間で異なることがあります。その場合、Bitsはログポイントを配置する前に、ターゲットバージョンの確認を求めます。これにより、ログポイントが誤った行番号に配置されるのを防ぎます。

**言語サポート**: 一部の機能は言語によって異なります。例えば、条件式はすべてのランタイムでサポートされているわけではありません。Bitsは、要求された機能がターゲットサービスの言語で利用できない場合に通知します。

**機密データ**: 手動で作成されたログポイントに適用される[機密データのスクラビング][3]動作は、Bitsによって作成されたログポイントにも適用されます。本番環境では、数値やブール値以外のキャプチャされた値は、デフォルトで編集（削除）されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/live_debugger/
[2]: /ja/tracing/live_debugger/#permissions
[3]: /ja/dynamic_instrumentation/sensitive-data-scrubbing/
[4]: https://app.datadoghq.com/debugging/
[5]: /ja/bits_ai/bits_code/
[6]: /ja/source_code/source-code-management/
[7]: /ja/tracing/live_debugger/#enable-live-debugger