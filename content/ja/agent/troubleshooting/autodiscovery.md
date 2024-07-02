---
title: Autodiscovery Troubleshooting
aliases:
  - /agent/autodiscovery/troubleshooting
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Agent Troubleshooting
- link: /agent/troubleshooting/debug_mode/
  tag: Documentation
  text: Agent Debug Mode
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Send an Agent Flare
---

Docker Agent オートディスカバリーのトラブルシューティングを開始するには、`configcheck` 初期化スクリプトコマンドを実行します。

```shell
docker exec -it <AGENT_コンテナ名> agent configcheck -v
```

**注**: `-v` オプションを使用すると、未解決のテンプレートも含め、すべてのテンプレートを確認できます。

以下は、デフォルトの `redisdb.d/auto_conf.yaml` ファイルではなく、Docker ラベルアノテーションから読み込み中の Redis テンプレートの有効なオートディスカバリーコンフィギュレーションの例を示しています。

```text
# docker exec -it <AGENT_コンテナ名> agent configcheck -v
.
..
...
=== Provider: Docker container labels ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```

次の例は、Redis テンプレートの有効なオートディスカバリーコンフィギュレーションの読み込みに失敗した場合に表示される問題を示しています。

```text
# docker exec -it <AGENT_コンテナ名> agent configcheck -v
.
..
...
=== Resolve warnings ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Unresolved Configs ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```

問題について懸念がある場合は、Agent の[フレア][2]を使用して [Datadog サポートチーム][1]までご連絡ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /agent/troubleshooting/send_a_flare/
