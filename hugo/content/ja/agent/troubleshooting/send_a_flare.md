---
algolia:
  tags:
  - Agent フレア
aliases:
- /ja/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent デバッグモード
- link: /agent/troubleshooting/agent_check_status/
  tag: ドキュメント
  text: Agent チェックのステータスを確認
title: Agent フレア
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Agent Flare の送信はこのサイトではサポートされていません。</div>
{{< /site-region >}}

フレアを使用すると、必要なトラブルシューティング情報を Datadog のサポートチームに送信できます。

このページでは、以下の内容を説明しています。
- [`flare` コマンドを使用したフレアの送信](#send-a-flare-using-the-flare-command)。
- Remote Configuration を使用した [Datadog サイトからのフレアの送信](#send-a-flare-from-the-datadog-site)。
- [手動送信](#manual-submission)。

フレアは、Agent のすべてのコンフィギュレーションファイルとログをアーカイブファイルに収集し、パスワード、API キー、プロキシ認証情報、SNMP コミュニティ文字列などの機密情報を削除します。また、APM が有効な場合、利用可能であれば[トレーサーデバッグログ][4]も含まれます。

Datadog Agent は完全にオープンソースなので、[コードの動作を検証][1]することができます。フレアは、アップロードの前に確認を求めるため、必要に応じて送信前にフレアを確認できます。

## Datadog サイトからフレアを送信する

Datadog サイトからフレアを送信するには、Agent の [Fleet Automation][2] と [Remote configuration][3] が有効になっていることを確認してください。

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares2.png" alt="Send Ticket ボタンは、既存または新規のサポートチケットに対してフレアを送信するためのフォームを起動します" style="width:70%;" >}}

## `flare` コマンドを使用してフレアを送信する

`flare` サブコマンドを使用してフレアを送信します。以下のコマンドで、`<CASE_ID>` を実際の Datadog サポートケース ID (ある場合) に置き換え、それに紐づけされているメールアドレスを入力します。

ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力して新しいサポートケースを作成します。

**アーカイブのアップロードを確認し、直ちに Datadog サポートに送信してください**。

{{< tabs >}}
{{% tab "Agent" %}}

| プラットフォーム   | コマンド                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` または [Web GUI][1] を使用 |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| ソース     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | [Windows][2]に関する個別のドキュメントをご参照ください。        |
| Heroku     | [Heroku][3]に関する個別のドキュメントをご参照ください。         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## 専用コンテナ

Agent v7.19 以降を使用し、Datadog Helm Chart を[最新バージョン][4]で使用するか、Datadog Agent と Trace Agent が別々のコンテナにある DaemonSet を使用する場合は、以下を含む Agent Pod をデプロイします。

* Agent プロセスを含む 1 つのコンテナ (Agent + Log Agent)
* process-agent プロセスを含む 1 つのコンテナ
* trace-agent プロセスを含む 1 つのコンテナ
* system-probe プロセスを含む 1 つのコンテナ

各コンテナからフレアを取得するには、次のコマンドを実行します。

### Agent

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

ECS Fargate プラットフォーム v1.4.0 を使用する場合、[Amazon ECS Exec][5] を有効にすることで、実行中の Linux コンテナへのアクセスを許可するように ECS タスクとサービスを構成できます。Amazon ECS Exec を有効にした後、次のコマンドを実行してフレアを送信します。

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

{{% tab "Cluster Agent" %}}

| プラットフォーム      | コマンド                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## 手動送信

Agent フレアプロトコルは、コンフィギュレーションとログをまずローカルの `/tmp` ディレクトリにあるアーカイブファイルに収集します。
Agent のデータ収集に問題がある場合は、このファイルを手動で取得してサポートに送信してください。

### Kubernetes
Kubernetes でアーカイブファイルを取得するには、kubectl コマンドを使用します。
```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /ja/agent/fleet_automation/
[3]: /ja/agent/remote_config#enabling-remote-configuration
[4]: /ja/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected