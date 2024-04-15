---
aliases:
- /ja/graphing/faq/how-do-i-delete-a-host-or-metric-from-the-ui/
- /ja/graphing/faq/is-it-possible-to-query-historical-data-after-a-host-has-been-destroyed/
- /ja/agent/faq/i-stopped-my-agent-but-i-m-still-seeing-the-host/
- /ja/graphing/faq/historical-data

title: 履歴データ
---

## グラフ

Datadog へのデータ報告を停止すると、一定期間後にメトリクス、タグ、ホストが Datadog の UI に表示されなくなります。

| 項目                                 | エイジアウト  |
|--------------------------------------|----------|
| ホスト                                | 2 時間  |
| メトリクス                              | 24 時間 |
| テンプレート変数ドロップダウンパネルのタグ | 48 時間 |
| 他のドロップダウンパネルのタグ             | 12 時間 |
| APM `env` タグ                       | 60 日  |

データがリストアップされていなくても、[JSON エディタ][1]でデータをクエリすることができます。簡単な方法は、ホスト名やタグをクエリすることです。

頻繁にホストを入れ替える予定がある場合は、`datadog.yaml` の [Agent][2] にタグを追加するか、[インフラストラクチャーリスト][3] (ユーザータグ) を使ってください。

## 削除

### メトリクスとタグ

メトリクスやタグをすぐに削除する方法はありません。上のリストは、メトリクスやタグがレポートされなくなった場合、UI にどれくらいの期間とどまるかを示しています。

モニターの場合、エイジアウト期間を過ぎると、メトリクスストリームは考慮されなくなります。

ダッシュボードの場合、メトリクスまたはタグはエイジアウト期間後に視覚化されますが、UI エディタを使用してグラフを作成するためのドロップダウンパネルでは使用できません。対応するメトリクスまたはタグは、[JSON][1] メソッドを使用してグラフを表示するために利用可能なままです。

### ホスト

Agent を実行していて、意図的にホストを[停止][4]または[削除][5]した場合、2 時間以内に新しいデータを見なかったホストはすべて UI から消えます。それらに対してクエリを実行することはできます。しかし、それらはドロップダウン、インフラストラクチャーリスト、およびホストマップに表示されません。

[1]: /ja/dashboards/graphing_json/
[2]: /ja/agent/
[3]: /ja/infrastructure/
[4]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: /ja/agent/guide/how-do-i-uninstall-the-agent/
