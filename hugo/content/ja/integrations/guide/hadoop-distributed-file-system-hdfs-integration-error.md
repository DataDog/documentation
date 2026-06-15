---
aliases:
- /ja/integrations/faq/hadoop-distributed-file-system-hdfs-integration-error/
title: Hadoop Distributed File System (HDFS) インテグレーションエラー
---

HDFS とインテグレーションする際にエラーが発生している場合は、まず次の手順で pip と Snakebite をアップグレードしてください。

1. 実行: /opt/datadog-agent/embedded/bin/pip install --upgrade pip
2. 実行: /opt/datadog-agent/embedded/bin/pip install --upgrade snakebite
3. [Agent を再起動します][1]。

これらの手順でエラーが解決しない場合は、[Datadog サポート][2]までお問い合わせください。

[1]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[2]: /ja/help/