---
disable_toc: false
further_reading:
- link: /security/default_rules/?category=cat-csm-threats#all
  tag: ドキュメント
  text: CSM Threats 検出ルールの確認
- link: /security/threats/workload_security_rules
  tag: ドキュメント
  text: CSM Threats 検出ルールの管理方法について
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知について
- link: https://www.datadoghq.com/blog/datadog-csm-windows/
  tag: ブログ
  text: Datadog Cloud Security Management で Windows のワークロードを保護する
title: Agent イベントの調査
---


このトピックでは、[すぐに使える (OOTB) 検出ルール][12]によって生成された Datadog Agent の脅威検出イベントを、Agent Events エクスプローラーを使用してクエリし、確認する方法を説明します。

Datadog Agent は Agent ホスト上のシステムアクティビティを評価します。アクティビティが Agent ルールの式に一致すると、Agent は検出イベントを生成し、それを Datadog バックエンドに渡します。

イベントが Agent 検出ルールとバックエンドの脅威検出ルールの*両方*に一致する場合、シグナルが作成され、[Signals][11] に表示されます (`Agent 検出ルール + バックエンドの脅威検出ルール = シグナル`)。

[Agent Events エクスプローラー][13]を使用すると、シグナルとは別に Agent イベントを調査できます。イベントが発生したホストパスを確認し、イベントの属性、メトリクス、プロセスを表示できます。また、イベントを生成した Agent ルールを確認し、トリアージと対応に関する指示を表示することもできます。

## Active Protection で脅威を積極的にブロック

デフォルトでは、Agent のすぐに使える暗号マイニングの脅威検出ルールがすべて有効になっており、脅威を積極的に監視しています。

[Active Protection][18] を使用すると、Datadog Agent の脅威検出ルールによって特定された暗号マイニングの脅威を積極的にブロックし、終了させることができます。

## Agent イベントの表示

Agent イベントを表示するには、[Agent Events エクスプローラー][13]に移動します。

Agent イベントは、Datadog [Events エクスプローラー][14]の標準エクスプローラーコントロールを使用してクエリが実行され、表示されます。


## Agent イベントの調査

[Agent Events エクスプローラー][13]にイベントがリストされている理由を調査するには、イベントを選択します。

イベントの詳細には、属性、[メトリクス][16]、および[プロセス][15]が含まれます。**メトリクス**はホストダッシュボードにリンクし、**プロセス**はホストの[プロセスダッシュボード][17]およびプロセスエージェントのインストール手順にリンクします。

**Path** では、最新のプロセスツリーが表示され、イベントを開始したコマンドに至るすべてのコマンドを確認でき、何が起こったのかを把握しやすくなります。

{{< img src="security/csm/agent_events_explorer_details.png" alt="イメージの説明" style="width:100%;" >}}

**Path** は、多くの場合イベントの調査を始める際に最も適した場所となります。

## Agent イベントのトリアージ

イベントをトリアージするには

1. [Agent Events エクスプローラー][13]の **AGENT RULE** 列でイベントを選択します。
2. **Click to copy** を選択します。
3. [OOTB ルールドキュメント][12]を開きます。
4. 検索フィールドにコピーしたルール名を貼り付けます。
5. 結果からルールを選択します。
6. ルールの**目標**、**戦略**を確認し、**トリアージと対応**の手順に従います。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[11]: /ja/security/threats/security_signals
[12]: /ja/security/default_rules/#cat-cloud-security-management
[13]: https://app.datadoghq.com/security/agent-events
[14]: /ja/service_management/events/explorer/
[15]: /ja/infrastructure/process/
[16]: /ja/metrics/
[17]: https://app.datadoghq.com/process
[18]: /ja/security/cloud_security_management/guide/active-protection