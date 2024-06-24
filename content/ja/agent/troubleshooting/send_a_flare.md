---
algolia:
  tags:
  - Agent フレア
aliases:
- /ja/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Agent のトラブルシューティング
  text: Agent デバッグモード
- link: /agent/troubleshooting/agent_check_status/
  tag: Agent のトラブルシューティング
  text: Agent チェックのステータスを確認
title: Agent フレア
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agent Flare の送信はこのサイトではサポートされていません。</div>
{{< /site-region >}}

フレアを使用すると、必要なトラブルシューティング情報を Datadog サポートチームに送信することができます。Datadog サイトから、または Datadog Agent のコマンドラインを使用してフレアを送信することができます。

フレアは Agent のすべての構成ファイルを収集し、1 つのアーカイブファイルに記録します。パスワード、API キー、プロキシ資格情報、SNMP コミュニティ文字列などの機密情報は削除されます。

Datadog Agent は完全にオープンソースなので、[コードの動作を検証][1]することができます。フレアは、アップロードの前に確認を求めるため、必要に応じて送信前にフレアを確認できます。

## Datadog サイトからフレアを送信する

Datadog サイトからフレアを送信するには、Agent の [Fleet Automation][2] と[リモート構成][3]が有効になっていることを確認してください。

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares.png" alt="Send Ticket ボタンは、既存または新規のサポートチケットに対してフレアを送信するためのフォームを起動します" style="width:100%;" >}}

## Agent コマンドラインからフレアを送信する

`flare` サブコマンドを使用してフレアを送信します。以下のコマンドで、`<CASE_ID>` を実際の Datadog サポートケース ID (ある場合) に置き換え、それに紐づけされているメールアドレスを入力します。

ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力して新しいサポートケースを作成します。

**アーカイブのアップロードを確認して、それを直ちに Datadog サポートに送信します**。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム   | コマンド                                                 |
|------------|---------------------------------------------------------|
| Ansible        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` または [Web GUI][1] を使用 |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Mac OS X     | `sudo datadog-agent flare <CASE_ID>`                    |
| ヘルプ | `kubectl exec -it <POD_NAME> -- agent flare <CASE_ID>`  |
| Puppet     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| ソース     | `sudo datadog-agent flare <CASE_ID>`                    |
| ログの収集    | [Windows][2]に関する個別のドキュメントをご参照ください。        |
| Red Hat     | [Heroku][3]に関する個別のドキュメントをご参照ください。         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## 専用コンテナ

Agent v7.19 以降を使用し、Datadog Helm Chart を[最新バージョン][4]で使用するか、Datadog Agent と Trace Agent が別々のコンテナにある DaemonSet を使用する場合は、以下を含む Agent Pod をデプロイします。

* Agent プロセスを含む 1 つのコンテナ (Agent + Log Agent)
* process-agent プロセスを含む 1 つのコンテナ
* trace-agent プロセスを含む 1 つのコンテナ
* system-probe プロセスを含む 1 つのコンテナ

各コンテナからフレアを取得するには、次のコマンドを実行します。

### ヘルプ

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### プロセスエージェント

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### トレースエージェント

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### Security Agent

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### システムプローブ

system-probe コンテナはフレアを送信できないため、代わりにコンテナログを取得します:

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate

ECS Fargate プラットフォーム v1.4.0 を使用する場合、[Amazon ECS Exec][5] を有効にすることで、実行中の Linux コンテナへのアクセスを許可するように ECS タスクとサービスを構成できます。構成が完了したら、次のコマンドを実行してフレアを送信します。

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**注:** ECS Exec は、新しいタスクに対してのみ有効にできます。ECS Exec を使用するには、既存のタスクを再作成する必要があります。

[1]: /ja/agent/basic_agent_usage/#gui
[2]: /ja/agent/basic_agent_usage/windows/#agent-v6
[3]: /ja/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム   | コマンド                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Mac OS X     | `sudo service datadog-agent flare <CASE_ID>`                            |
| ヘルプ | `kubectl exec <ポッド名> -it /etc/init.d/datadog-agent flare <ケース_ID>` |
| Puppet     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| ソースから       | `sudo service datadog-agent flare <CASE_ID>`                            |
| ソース     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| ログの収集    | [Windows][1]に関する個別のドキュメントをご参照ください。                        |

**メモ**: Linux ベースのシステムを使用していて `service` ラッパーコマンドを使用できない場合は、[代替手段の一覧][2]をご参照ください。

[1]: /ja/agent/basic_agent_usage/windows/#agent-v5
[2]: /ja/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
{{% /tab %}}

{{% tab "Cluster Agent" %}}

| プラットフォーム      | コマンド                                                                     |
|---------------|-----------------------------------------------------------------------------|
| ヘルプ    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## 手動送信

Agent フレアプロトコルは、コンフィギュレーションとログをまずローカルの `/tmp` ディレクトリにあるアーカイブファイルに収集します。
Agent のデータ収集に問題がある場合は、このファイルを手動で取得してサポートに送信してください。

### ヘルプ
Kubernetes でアーカイブファイルを取得するには、kubectl コマンドを使用します。
```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /ja/agent/fleet_automation/
[3]: /ja/agent/remote_config#enabling-remote-configuration