---
algolia:
  tags:
  - agent flare
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
フレアを使用すると、必要なトラブルシューティング情報を Datadog のサポートチームに送信できます。

このページでは、以下の内容を説明しています。
- [`flare` コマンド](#send-a-flare-using-the-flare-command)を使用したフレアの送信。
- [Datadog サイトからのフレアの送信](#send-a-flare-from-the-datadog-site)。Remote Configuration を使用。
- [手動送信](#manual-submission)。

フレアは Agent のすべての構成ファイルを収集し、1 つのアーカイブファイルに記録します。パスワード、API キー、プロキシ資格情報、SNMP コミュニティ文字列などの機密情報は削除されます。APM が有効な場合、利用可能であれば[トレーサーデバッグログ][4]も含まれます。

Datadog Agent は完全にオープンソースなので、[コードの動作を検証][1]することができます。フレアは、アップロードの前に確認を求めるため、必要に応じて送信前にフレアを確認できます。

Agent で Remote Configuration が有効な状態で Datadog Support に問い合わせる際、サポートチームは迅速な対応のために貴社の環境からフレアを起動する場合があります。フレアにはトラブルシューティング情報が含まれており、Datadog Support に提供されることで問題解決を支援します。

## Datadog サイトからフレアを送信する {#send-a-flare-from-the-datadog-site}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">選択した Datadog サイトでは、Fleet Automation からの Agent Flare の送信はサポートされていません ({{< region-param key="dd_datacenter" >}})。代わりに<a href="#manual-submission">フレアの手動送信</a>を使用してください。</div>
{{< /site-region >}}

Datadog サイトからフレアを送信するには、Agent の [Fleet Automation][2] と[リモート構成][3]が有効になっていることを確認してください。

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Send Ticket ボタンは、既存または新規のサポートチケットに対してフレアを送信するためのフォームを起動します" style="width:70%;" >}}

## `flare` コマンド{#send-a-flare-using-the-flare-command}を使用してフレアを送信する

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">選択した Datadog サイト <code>flare</code> ({{< region-param key="dd_datacenter" >}}) では、サブコマンドを使用した Agent Flare の送信はサポートされていません。代わりに<a href="#manual-submission">フレアの手動送信</a>を使用してください。</div>
{{< /site-region >}}

フレアを送信するには `flare` サブコマンドを使用してください。以下のコマンドで、`<CASE_ID>` を実際の Datadog サポートケース ID (ある場合) に置き換え、それに紐づけされているメールアドレスを入力します。

ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力して新しいサポートケースを作成します。

**アーカイブのアップロードを確認し、直ちに Datadog サポートに送信してください**。

{{< tabs >}}
{{% tab "Agent" %}}

| プラットフォーム   | コマンド                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` または[ウェブ GUI][1] 経由|
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Source     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | `& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>`       |
| Heroku     | 個別の [Heroku ドキュメント][3]を参照してください         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## 専用コンテナ {#dedicated-containers}

Agent v7.19 以降を使用し、Datadog Helm Chart を[最新バージョン][4]で使用するか、Datadog Agent と Trace Agent が別々のコンテナにある DaemonSet を使用する場合は、以下を含む Agent Pod をデプロイします。

* Agent プロセスを含む 1 つのコンテナ (Agent + Log Agent)
* process-agent プロセスを含む 1 つのコンテナ
* trace-agent プロセスを含む 1 つのコンテナ
* システムプローブプロセスを含む 1 つのコンテナ

各コンテナからフレアを取得するには、次のコマンドを実行します。

### Agent {#agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### Process Agent {#process-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Trace Agent {#trace-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### Security Agent {#security-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### システムプローブ{#system-probe}

システムプローブコンテナはフレアを送信できないため、代わりにコンテナログを取得します。

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate {#ecs-fargate}

ECS Fargate プラットフォーム v1.4.0 を使用する場合、[Amazon ECS Exec][5] を有効にすることで、実行中の Linux コンテナへのアクセスを許可するように ECS タスクとサービスを構成できます。Amazon ECS Exec が有効化されたら、次のコマンドを実行してフレアを送信します。

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**注:** ECS Exec は新しいタスクに対してのみ有効にできます。ECS Exec を使用するには、既存のタスクを再作成する必要があります。

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

## 手動送信 {#manual-submission}

Agent フレアプロトコルは、コンフィギュレーションとログをまずローカルの `/tmp` ディレクトリにあるアーカイブファイルに収集します。
Agent のデータ収集に問題がある場合は、このファイルを手動で取得してサポートに送信してください。

### Kubernetes {#kubernetes}
Kubernetes でアーカイブファイルを取得するには、kubectl コマンドを使用します。

```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /ja/agent/fleet_automation/
[3]: /ja/agent/guide/setup_remote_config
[4]: /ja/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected