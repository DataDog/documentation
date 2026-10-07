---
description: ターミナルセッションの記録方法、自動記録用のシムの作成方法、および危険なコマンドから保護するための CoTerm の設定方法について説明します。
further_reading:
- link: /coterm
  tag: ドキュメント
  text: Datadog CoTerm
- link: /coterm/install
  tag: ドキュメント
  text: Datadog CoTerm をインストールする
- link: /coterm/rules
  tag: ドキュメント
  text: CoTerm 構成ルール
title: Datadog CoTerm の使用
---
## 記録したターミナルセッションを表示する {#view-recorded-terminal-sessions}
記録したすべてのターミナルセッションの開始時と終了時に、CoTerm は Datadog でセッションを表示するためのリンクを表示します。[記録したすべてのターミナルセッションを表示][7]することもできます。

## CoTerm CLI コマンド構造 {#coterm-cli-command-structure}

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

すべてのオプションとコマンドを確認するには、`ddcoterm --help` を実行します。

## ターミナルセッションを記録する {#record-a-terminal-session}

CoTerm は、Datadog で再生および確認できるターミナルセッションを記録します。セキュリティのため、機密データ (パスワードや API キーなど) は[自動的にマスキング][1]されます。ターミナルセッションで起動されたプロセスはすべて、[イベント][2]として記録されます。

### インタラクティブなターミナルセッションを起動して記録する {#launch-and-record-an-interactive-terminal-session}
Datadog CoTerm を手動で起動し、ターミナルセッション全体を記録するには、次の手順を実行します。

```shell
ddcoterm
```

セッションを終了すると、CoTerm は記録を停止し、キャプチャしたプロセスデータを Datadog に送信します。

### コマンドの出力を記録する {#record-the-output-of-a-command}
個別のコマンドを実行して、その出力を記録するには、次の手順を実行します。

```shell
ddcoterm -- datadog-agent status
```

これにより CoTerm が起動し、`datadog-agent status` が実行されます。プロセスが完了すると、CoTerm は記録を停止し、キャプチャしたプロセスデータを Datadog に送信します。

## コマンドを自動的に記録する {#automatically-record-a-command}

特定のコマンドの今後のすべての呼び出しを CoTerm が自動的に記録するように設定するには、シムを作成します。

```shell
ddcoterm shim create datadog-agent
```

シムを作成した後、ターミナルを再起動するか、プロファイルを読み込みます。(例: `source ~/.bashrc`を実行します。)Bash または Zsh 以外のシェルを使用している場合は、手動で `path/to/.ddcoterm/overrides` を PATH に追加します。

## 危険なターミナルコマンドから保護する {#protect-against-dangerous-terminal-commands}

指定されたターミナルコマンドの誤実行を防ぐために、CoTerm がリンターとして機能するように設定できます。より詳細な制御を行うには、CoTerm と [Datadog Work Management][3] を併用して、指定されたコマンドに対して承認を求めるように設定できます。

### コマンドをリントする {#lint-a-command}

指定されたコマンド (例: `kubectl scale`) を実行しようとすると、CoTerm は警告を表示し、確認を求めることができます。

1. コマンドのシムを作成します。`ddcoterm shim create kubectl`

1. `.ddcoterm/config.yaml` ファイルにリントルールを設定します。CoTerm でのリント設定の詳細については、[CoTerm 構成ルール][4]を参照してください。

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
   {{< /code-block >}}

この設定により、CoTerm は `kubectl scale` コマンドのうち、`--context` フラグが付いていないものをすべてインターセプトします。

{{< img src="coterm/linter-warning.png" alt="コマンドラインインターフェース。ユーザーが「kubectl scale foo」を実行しました。出力には「Warning from CoTerm: No kubectl context specified (effective context: 'minikube').」と表示されます。kubectl scale を実行する際は、常にコンテキストを明示的に指定することを推奨します。続行しますか?(y/n)" style="width:70%;" >}}

### コマンドの承認を必須にする {#require-approval-for-commands}

さらに危険なコマンドの場合、CoTerm はコマンドを実行する前に、(Work Management を通じて) 他のチームメンバーによる明示的な承認を要求するように設定できます。

1. コマンドのシムを作成します。`ddcoterm shim create kubectl`

2. `.ddcoterm/config.yaml` ファイルで承認の要求を構成します。詳細については、[CoTerm 構成ルール][4]を参照してください。

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Record and require approval for all executions of `kubectl scale` in a production context
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

この構成では、`kubectl scale --context prod` コマンドを実行すると、CoTerm は [Work Management][3] に承認リクエストを作成します。承認リクエストをアクティブな[インシデント][5]に関連付けると、他のインシデント対応者が自動的に承認者として追加されます。このリクエストが承認されると、コマンドが実行されます。[作業項目の自動化ルール][8]を構成して、承認リクエストに基づいてワークフローをトリガーすることもできます。

#### 手動で承認を要求する {#manually-require-approval}

手動で承認リクエストを作成するには、以下を実行します。

```shell
ddcoterm approve
```

#### 承認をバイパスする {#bypass-approval}

承認をバイパスしてコマンドを実行するには、`COTERM_BREAK_GLASS` 環境変数を設定します。

例:

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/sensitive_data_scanner/
[2]: /ja/events/
[3]: /ja/incident_response/work_management/
[4]: /ja/coterm/rules
[5]: /ja/incident_response/incident_management/
[6]: /ja/coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /ja/incident_response/work_management/automation_rules/