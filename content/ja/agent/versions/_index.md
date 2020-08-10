---
title: Agent バージョンの違い
kind: documentation
further_reading:
  - link: agent/versions/upgrade_to_agent_v7
    tag: ドキュメント
    text: Agent バージョン7へアップグレード
  - link: agent/versions/upgrade_to_agent_v6
    tag: ドキュメント
    text: Agent v6 へのアップグレード
  - link: agent/faq/agent_v6_changes
    tag: よくあるご質問
    text: Agent v6 の変更点
---
## メジャー Agent バージョン間の変更点

{{< tabs >}}
{{% tab "Agent v7 と v6" %}}

Agent v7 は、Datadog Agent の最新のメジャーバージョンです。Agent v6 からの唯一の変更点は、**このバージョンには、インテグレーションおよびカスタムチェック用の Python 3 のサポートのみが含まれている**ことです。

Agent をバージョン 7 にアップグレードする方法については、[Agent v7 へのアップグレードのドキュメント][1]を参照してください。すべての公式インテグレーションは、そのままの状態で Python 3 をサポートしています。[Python 3 カスタムチェック移行ガイド][2]に従って、カスタムチェックを Python 3 に移行します。

**注**: [Datadog Agent v6 で Python 3 を使用する][3]で、Agent v6 でこの移行をテストできます。


[1]: /ja/agent/versions/upgrade_to_agent_v7/
[2]: /ja/agent/guide/python-3/
[3]: /ja/agent/guide/agent-v6-python-3/
{{% /tab %}}
{{% tab "Agent v6 と v5" %}}

**Agent バージョン 6 の主な変更点**:

Agent 5 と Agent 6 の大きな違いは、Agent 6 のコア Agent が Golang で全面的に書き換えられていることです。Golang により、Agent は並行処理を利用できるようになりました。これまで Agent v5 が実行していたフォワーダー、コレクター、DogStatsD の 3 つのプロセスの代わりに、Agent プロセスだけが実行されるようになりました。また、他にも多くのコアの改善が行われています。

- Agent v6 では、Agent v5 と比べてリソースの使用が大幅に改善されました。

  - CPU 使用量が減少しました。
  - メモリ使用量が減少しました。
  - 使用するファイルディスクリプタ数が減少しました。
  - あらゆる面でフットプリントが減少しました。

- Agent 6 は、[さらに 2 つのポート][1]を使用します。

  - `5000`: ランタイムメトリクスの公開用
  - `5001`: [Agent CLI/GUI コマンド][2]用

    **注**: `datadog.yaml` ファイルで、`expvar_port` および `cmd_port` に別のポートを指定できます。

- Agent v6 と [DogStatsD][3] のカスタムビルドがたいへん容易になりました。使用できる構成オプションも増え、ほぼすべての項目を自由に収集対象にしたり、対象から外したりすることができます。

**Agent v6 の新機能**:

Agent v5 から Agent v6 へのすべての変更内容については、[Datadog Agent の変更点に関するドキュメント][4]を参照してください。以下は、主な違いです。

- [ディストリビューションメトリクス][5]をサーバー上で直接実行して、実効的なグローバルパーセンタイルを計算できます。(注: この機能は現在ベータ版です。ご使用のアカウントで有効にする方法については、サポートへお問い合わせください。)
- [DogStatsD][3] を UDP ではなく UNIX ソケット経由で使用できます。
- [Windows でライブプロセスモニタリングを使用できます][6]。
- [Prometheus OpenMetrics をネイティブにサポートします][7]。
- [すべてのログを Datadog に送信して、アラート設定、分析、メトリクスとの関連付けなどを行うことができます][8]。


[1]: /ja/agent/#agent-architecture
[2]: /ja/agent/guide/agent-commands/
[3]: /ja/developers/dogstatsd/unix_socket/
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /ja/developers/metrics/types/?tab=distribution#metric-types
[6]: /ja/infrastructure/process/
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /ja/logs/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}