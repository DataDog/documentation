---
aliases:
- /ja/integrations/faq/issues-getting-integrations-working
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Agent のトラブルシューティング
  text: Agent デバッグモード
- link: /agent/troubleshooting/send_a_flare/
  tag: Agent のトラブルシューティング
  text: Agent フレアの送信
- link: /agent/troubleshooting/agent_check_status/
  tag: Agent のトラブルシューティング
  text: Agent チェックのステータスを確認
kind: documentation
title: インテグレーションの稼働
---

Datadog インテグレーションは、YAML コンフィギュレーションファイルを使用して Datadog Agent から構成されます。オペレーティングシステムの構成ディレクトリへのパスは、[Agent コンフィギュレーションファイル][1]のドキュメントを参照してください。

構成したインテグレーションが Datadog に表示されない場合、[`status` CLI コマンド][2]を実行し、*Running Checks* 見出しの下にあるインテグレーションを探します。

**注**: コミュニティ、パートナー、および Marketplace インテグレーションは、Agent のアップグレード時に保持されません。Agent のバージョンアップ時にこれらのインテグレーションを再インストールする必要があります。

インテグレーションが **Running Checks** の下に表示されているが、Datadog アプリで表示されていない場合
1. `status` の出力で、インテグレーションのエントリーの下にエラーや警告が表示されていないことを確認します。
1. [メトリクスエクスプローラー][3]で、ホストからシステムメトリクスが表示されているかどうか確認します。例えば、インテグレーションを構成したホストで、`system.cpu.user` を探します。
1. それでもメトリクスがない場合は、[Datadog ログ][4]にエラーがないか確認し、`status` コマンドの出力と一緒に [Datadog サポート][5]に送信してください。

インテグレーションが **Running Checks** に表示されていない場合
1. インテグレーション用のコンフィギュレーションファイルが正しい場所にあり、正しい名前が付けられていることを確認します。
1. [インテグレーションに関するドキュメント][6]を参照し、正しく構成されていることを確認します。
1. [YAML パーサー][7]を使ってコンフィギュレーションファイルをチェックし、YAML が有効であることを確認します。
1. ファイルを移動したり変更したりするたびに、[Agent を再起動][8]し、再度 `status` コマンドを実行して変更を確認します。
1. それでもインテグレーションが `status` 出力に表示されない場合は、[Datadog Logs][4] でエラーを確認し、[Datadog サポート][5]に送信してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: /ja/agent/configuration/agent-commands/#agent-information
[3]: https://app.datadoghq.com/metric/explorer
[4]: /ja/agent/configuration/agent-log-files/
[5]: /ja/help/
[6]: /ja/integrations/
[7]: https://codebeautify.org/yaml-parser-online
[8]: /ja/agent/configuration/agent-commands/#start-stop-restart-the-agent