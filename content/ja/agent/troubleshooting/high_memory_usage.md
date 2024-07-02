---
disable_toc: false
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: Agent のトラブルシューティング
  text: Agent フレアの送信
- link: /agent/troubleshooting/agent_check_status/
  tag: Agent のトラブルシューティング
  text: Agent チェックのステータスを確認
title: CPU やメモリの消費量が多い
---

Agent の CPU やメモリの消費量が多くなる場合、いくつかの要因が考えられます。以下の手順を試しても問題が解決しない場合は、[Datadog サポートにお問い合わせください](#reach-out-to-datadog-support)。

### CPU やメモリの消費量が多い場合の一般的な原因

- インテグレーションが何千ものメトリクスを返している、または多数のチェックインスタンスを実行している。[CLI コマンドの `status`][2] を実行し、**Collector** セクションを確認すると、実行中のチェックインスタンスの概要と、収集されたメトリクス数を確認できます。
- Agent の Python または Go ランタイムがリソースを大量に消費している。[ライブプロセスモニタリング][3]を有効にして、Agent プロセスが予期しない量のメモリや CPU を消費していないかどうかを確認します。また、オペレーティングシステムのアクティビティマネージャーを使用して、Agent プロセスのリソース消費を確認することもできます。
- Agent が多数のプロセスを監視している。これは、[プロセスチェックコンフィギュレーションファイル][4]で構成されています。
- Agent の動作が Windows のアンチマルウェアまたはアンチウィルスツールをトリガーし、CPU 使用率が高くなっている。
- Agent が非常に多くのログ行または DogStatsD メトリクスを転送している。

### リソース使用量削減のための調整

ここでは、Agent の構成に加えることで、リソースの使用量を減らすことができる調整方法を紹介します。

- 多くのチェックインスタンスを持つインテグレーションや、大量のメトリクスを収集する場合は、インテグレーションの `conf.yaml` ファイルで `min_collection_interval` を調整してください。通常、Agent は各チェックインスタンスを 10 秒から 15 秒ごとに実行します。`min_collection_interval` を 60 秒以上に設定すると、リソースの消費を抑えることができます。チェックの収集間隔についての詳細は、[カスタム Agent チェックのドキュメント][5]を参照してください。
- インテグレーションがオートディスカバリーを使用するように構成されているかどうか、またはインテグレーションがより具体的にスコープすることができるワイルドカード (`*`) を使用しているかどうかをチェックします。オートディスカバリーの詳細については、[基本的な Agent のオートディスカバリー][6]を参照してください。

## Datadog サポートに連絡する

上記のどの解決策も適切でない場合は、Datadog サポートにご連絡ください。[ライブプロセスモニタリング][3]を有効にして、Agent プロセスが予期せぬ量のメモリまたは CPU を消費していることを確認してください。

チケットを開く際に、問題を確認する方法と、これまでに行った手順についての情報を含めてください。問題を 1 つのインテグレーションに分離できるかどうかに応じて、次のいずれかのセクションの情報を含めてください。

### 消費量の多さを 1 つのインテグレーションに分離できる場合

1 つのインテグレーションだけが大量のメモリを消費している場合、Python のメモリプロファイルの出力と一緒にデバッグレベルのフレアを送信してください。
1. デバッグモードを有効にするには、[デバッグモードのドキュメントに従ってください][7]。
1. プロファイルを送信するには、flare コマンドに `--profile 30` フラグを付加してください。
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   コマンドは、プロファイル情報を収集する間、約 30 秒かけて実行されます。

1. Python のメモリプロファイルについては、このコマンドの出力をキャプチャしてください。
   {{< code-block lang="shell">}}sudo -u dd-agent -- datadog-agent check <check name> -m -t 10{{< /code-block >}}

### 消費量の多さを 1 つのインテグレーションに関連付けることができない場合

メモリ消費量の多さが単一のインテグレーションに関連していない場合、Agent が予想以上にメモリや CPU を使用している期間に収集したプロファイルをデバッグレベルのフレアで送信してください。
1. デバッグモードを有効にするには、[デバッグモードのドキュメントに従ってください][7]。
1. プロファイルを送信するには、flare コマンドに `--profile 30` フラグを付加してください。
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   コマンドは、プロファイル情報を収集する間、約 30 秒かけて実行されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/agent/basic_agent_usage/#cli
[3]: /ja/infrastructure/process/
[4]: /ja/integrations/process/#configuration
[5]: /ja/developers/write_agent_check/#collection-interval
[6]: /ja/getting_started/containers/#enable-autodiscovery
[7]: /ja/agent/troubleshooting/debug_mode/