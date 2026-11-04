---
aliases:
- /ja/security/threats/investigate_agent_events
- /ja/security/workload_protection/investigate_agent_events
description: Datadog Agent が Agent イベントとして Datadog に送信するランタイムアクティビティを検索および分析します。
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: ドキュメント
  text: Workload Protection の検知ルールを試す
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知について
title: Agent イベント
---
Datadog Agent は、Agent ホスト上のシステムアクティビティを評価します。アクティビティが Agent ルールの式に一致すると、Agent はイベントを生成し、それを Datadog バックエンドに渡します。

[Agent Events エクスプローラー][13]を使用すると、シグナルとは別に Agent イベントを調査できます。イベントサイドパネルを使用して、何が起こったか、どこで発生したか、どの Agent ルールが一致したかを確認します。また、調査グラフ、プロセスツリー、生の JSON ペイロードを探索し、一致したルールのトリアージおよび対応手順を表示することもできます。

## Agent イベントを調査する {#investigate-agent-events}

Agent イベントを調査するには、以下の手順を実行します。

1. [Agent Events エクスプローラー][13]に移動します。Agent イベントは、Datadog [Events エクスプローラー][14]の標準エクスプローラーコントロールを使用してクエリが実行され、表示されます。
2. Agent イベントを選択します。イベントの調査に役立つタブを含むサイドパネルが開きます。

### 概要 {#overview}

{{< ui >}}Overview{{< /ui >}}タブにはイベントの概要が表示され、多くの場合、調査を開始する上で最適な場所となります。

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_overview.png" alt="「What」、「Where」、「Agent rule」、「Investigation graph」セクションを表示する Agent イベントサイドパネルの概要タブ" width="100%">}}

概要タブには、以下のセクションが含まれます。

- {{< ui >}}What{{< /ui >}}: 検出されたアクティビティの人間が読める説明。例: *ユーザーが clang コマンドをホスト i-0d85f97942d947ca9 上で実行しました*。
- {{< ui >}}Where{{< /ui >}}: クラウドプロバイダー、アカウント、リージョン、ホスト、Kubernetes クラスター、ネームスペース、Pod、コンテナ、イメージなど、イベントが発生したインフラストラクチャーのコンテキスト。
- {{< ui >}}Agent rule{{< /ui >}}: イベントに一致した Agent ルール (ルール名、イベント名、デプロイメントポリシー、ポリシーバージョン、ルール式を含む)。
- {{< ui >}}Investigation graph{{< /ui >}}: 概要タブの下部にある調査グラフのプレビュー。
- {{< ui >}}Process tree{{< /ui >}}: システム init プロセスからイベントをトリガーしたプロセスまでの完全なプロセス系列。

#### 調査グラフ {#investigation-graph}

{{< ui >}}Investigation graph{{< /ui >}} は、イベントに関与するインフラストラクチャーとプロセスをマッピングするインタラクティブな視覚化です。これは、最も関連性の高いエンティティとプロセスを強調表示することで、攻撃チェーンのコンパクトな概要を提供します。

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_investigation_graph.png" alt="ホスト、Kubernetes Pod、コンテナ、イメージ、およびメインプロセスの実行パスが表示されている調査グラフ" width="100%">}}

このグラフはホストから、Kubernetes Pod、レプリカセット、コンテナ、コンテナイメージなどの周辺インフラストラクチャーを経由し、プロセス実行パスに至るまでのイベントを追跡します。イベントに関与するメインプロセスは個別に表示されますが、関連性の低いプロセスはグループ化されたノード (例: **+7 プロセス**) に集約され、不審なアクティビティに焦点を当てたビューが維持されます。

調査グラフを使用して、ホスト上のすべてのプロセスを確認することなく、検出されたアクティビティがより広範なランタイムコンテキストにどのように適合するかを把握します。

#### プロセスツリー {#process-tree}

{{< ui >}}Process tree{{< /ui >}} には、システム init プロセスからイベントをトリガーしたプロセスまでの完全なプロセス系列が表示されます。

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_process_tree.png" alt="systemd からイベントをトリガーしたプロセスまでの完全なプロセスチェーンを表示するプロセスツリー" width="100%">}}

チェーン内の各プロセスについて、プロセスツリーには以下が表示されます。

- {{< ui >}}Path{{< /ui >}}: 実行可能ファイルのパスとコマンドライン引数。
- {{< ui >}}PID{{< /ui >}}: プロセス ID。
- {{< ui >}}PPID{{< /ui >}}: 親プロセス ID。
- {{< ui >}}User{{< /ui >}}: プロセスが実行されたユーザーコンテキスト。

プロセスツリーには、`systemd` から始まり、`containerd`、`runc`、およびワークロード固有のプロセスなどの中間プロセスを経て Agent ルールに一致したコマンドに至るまでのイベントの完全な系列が表示されます。これは、検出に至った正確な実行パスを再構築する上で役立ちます。

### JSON {#json}

{{< ui >}}JSON{{< /ui >}} タブには、Agent によって収集されたイベント属性の完全なセットを含む、生のイベントペイロードが表示されます。イベントデータの最も詳細な表示が必要な場合 ([Agent イベントエクスプローラー][13] で高度なクエリを作成したり、調査中に完全なイベントペイロードを共有したりする場合など) は、JSON を使用してください。JSON からフィールドをクリックすることで、任意のフィールドをフィルタリングして表示または非表示にすることができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[13]: https://app.datadoghq.com/security/agent-events
[14]: /ja/events/explorer/