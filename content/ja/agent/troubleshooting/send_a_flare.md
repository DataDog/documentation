---
title: Agent フレア
kind: documentation
aliases:
  - /ja/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
  - link: /agent/troubleshooting/debug_mode
    tag: Agent のトラブルシューティング
    text: Agent デバッグモード
  - link: /agent/troubleshooting/agent_check_status
    tag: Agent のトラブルシューティング
    text: Agent チェックのステータスを確認
---
Agent 5.3 以上を実行している場合は、必要なトラブルシューティング情報を 1 つのフレアコマンドで Datadog のサポートチームに送信できます。

`flare` は Agent のすべての構成ファイルを収集し、1 つのアーカイブファイルに記録します。パスワード、API キー、プロキシ資格情報、SNMP コミュニティ文字列などの機密情報は削除されます。**アーカイブのアップロードを確認すると、アーカイブが直ちに Datadog のサポートチームに送信されます**。Datadog Agent は完全にオープンソースなので、[コードの動作を検証][1]することができます。フレアは、アップロードの前に確認を求めるため、必要に応じて送信前にフレアを確認できます。

以下のコマンドで、`<CASE_ID>` を実際の Datadog サポートケース ID（ある場合）に置き換え、それに紐づけされているメールアドレスを入力します。
ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力して新しいサポートケースを作成します。



{{< tabs >}}
{{% tab "Agent v6" %}}

| プラットフォーム     | コマンド                                                 |
| ------------ | ------------------------------------------------------- |
| AIX          | `datadog-agent flare <CASE_ID>`                         |
| Docker       | `docker exec -it datadog-agent agent flare <CASE_ID>`   |
| macOS        | `datadog-agent flare <CASE_ID>` または [Web GUI][1] を使用 |
| CentOS       | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian       | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes   | `kubectl exec <pod-name> -it agent flare <CASE_ID>`     |
| Fedora       | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat       | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse         | `sudo datadog-agent flare <CASE_ID>`                    |
| ソース       | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows      | [Windows][2]に関する個別のドキュメントをご参照ください。        |
| Heroku       | [Heroku][3]に関する個別のドキュメントをご参照ください。         |


[1]: /ja/agent/basic_agent_usage/#gui
[2]: /ja/agent/basic_agent_usage/windows/#agent-v6
[3]: https://docs.datadoghq.com/ja/agent/faq/heroku-troubleshooting/#send-a-flare
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム     | コマンド                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| Docker       | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`      |
| macOS        | `datadog-agent flare <CASE_ID>`                                           |
| CentOS       | `sudo service datadog-agent flare <CASE_ID>`                              |
| Debian       | `sudo service datadog-agent flare <CASE_ID>`                              |
| Kubernetes   | `kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>`   |
| Fedora       | `sudo service datadog-agent flare <CASE_ID>`                              |
| Redhat       | `sudo service datadog-agent flare <CASE_ID>`                              |
| SUSE         | `sudo service datadog-agent flare <CASE_ID>`                              |
| ソース       | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                         |
| Windows      | [Windows][1]に関する個別のドキュメントをご参照ください。                          |


**メモ**: Linux ベースのシステムを使用していて `service` ラッパーコマンドを使用できない場合は、[代替手段の一覧][2]をご参照ください。


[1]: /ja/agent/basic_agent_usage/windows/#agent-v5
[2]: /ja/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| プラットフォーム   | コマンド                                                             |
|------------|---------------------------------------------------------------------|
| Kubernetes | `kubectl exec <pod-name> -it datadog-cluster-agent flare <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py