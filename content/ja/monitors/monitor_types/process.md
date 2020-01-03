---
title: プロセスモニター
kind: documentation
description: ホストでプロセスが実行されているかをチェックする
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

プロセスモニターを構成して、個別のプロセスやプロセスグループのステータスをチェックできます。プロセスモニターは 1 分ごとに評価されます。

## ライブプロセスモニター

{{< img src="monitors/monitor_types/process/live_process_monitor_select.png" alt="live process monitor"  style="width:35%;">}}

ライブプロセスモニターは、[プロセス Agent][1] によって収集されるデータに基づいて実行されます。プロセス Agent を使用すると、複数のホストまたはタグにまたがるプロセスグループの動作に基づいて警告またはアラートを生成するモニターを一元的に作成できます。

### コンフィグレーション

1. **監視するプロセスを検索します。**
  スペース区切りの文字列リストを指定できます。インフラストラクチャー上のすべてのプロセスに対して、部分一致のあいまい検索が実行されます。
  一致するプロセスとその数が下のテーブルに表示されます。

    {{< img src="monitors/monitor_types/process/search_process.png" alt="Search process"  style="width:80%;">}}

2. **タグを使用して、モニターの対象を特定の範囲に絞り込みます。**
  選択したプロセスのステータスを報告しているホストまたはタグだけが表示されます。

    {{< img src="monitors/monitor_types/process/selecting_scope.png" alt="Selecting scope"  style="width:80%;">}}

    **注**: Select process セクションの上には、このモニターのスコープ内にあるプロセス数の経時グラフが表示されます。
    `multi-alert` を選択すると、このグラフが分割され、グループごとに 1 つの線が表示されます。

3. **アラートオプションを選択します。**

    {{< img src="monitors/monitor_types/process/set_alert_conditions.png" alt="Set alert conditions"  style="width:80%;">}}

4. **通知オプション**を構成します。
  オプションの詳細については、[通知][2]ドキュメントを参照してください。

## プロセスチェック

{{< img src="monitors/monitor_types/process/process_check_select.png" alt="process check"  style="width:35%;">}}

プロセスチェックモニターは、Agent 内のチェックによって報告される `process.up` サービスチェックが生成するステータスを監視します。Agent レベルで、一致するプロセスの数に基づいてしきい値を構成できます。

構成の詳細については、[プロセスチェック][3]のページを参照してください。

プロセスごとに 1 つのサービスチェックステータスが作成されます。以下の作成インターフェイスから、どのチェックを監視し、どの時点で通知を受け取るかを選択できます。

### コンフィグレーション

1. **監視するプロセスを選択します。**
  Agent でアクティブプロセスチェックが設定されているプロセスの名前が表示されます。
    {{< img src="monitors/monitor_types/process/process_monitor_pick.png" alt="process monitor pick"  style="width:80%;">}}

2. **モニター範囲を選択します。**
  選択したプロセスのステータスを報告しているホストまたはタグだけが表示されます。
    {{< img src="monitors/monitor_types/process/process_monitor_scope.png" alt="process monitor scope"  style="width:80%;">}}

3. **アラートオプションを選択します。**

    このモニターは 1 分ごとに評価されます。したがって、しきい値を `X consecutive failures` に設定することは、「連続 X 分間のプロセスのダウン」を意味します。
    {{< img src="monitors/monitor_types/process/process_check_alert_conditions.png" alt="process monitor alert conditions"  style="width:80%;">}}

4. **通知オプションを構成します。**
    よく使用される通知オプションの詳細な設定手順については、[通知に関するドキュメント][4]のページを参照してください。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/infrastructure/process
[2]: /ja/monitors/notifications
[3]: /ja/integrations/process
[4]: /monitors/notifications
