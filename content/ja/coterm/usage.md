---
further_reading:
- link: /coterm
  tag: documentation
  text: Datadog CoTerm
- link: /coterm/install
  tag: documentation
  text: Install Datadog CoTerm
- link: /coterm/rules
  tag: documentation
  text: CoTerm の構成ルール
title: Datadog CoTerm の使用
---

## 録画されたターミナルセッションの閲覧
すべてのターミナルセッションを録画すると、その冒頭と終了時に、Datadog 上でそのセッションを閲覧できるリンクが CoTerm によって表示されます。また、[すべての録画済みターミナルセッションを表示する][7]こともできます。

## CoTerm CLI のコマンド構造

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

すべてのオプションとコマンドを確認するには、`ddcoterm --help` を実行してください。

## ターミナルセッションを録画する

CoTerm は、ターミナルセッションを録画し、Datadog で再生やレビューを行えるようにします。セキュリティのため、パスワードや API キーなどの機密データは[自動的にマスク][1]されます。ターミナルセッション内で起動されたすべてのプロセスは[イベント][2]として記録されます。

### 対話型ターミナルセッションの起動と録画
Datadog CoTerm を手動で起動し、ターミナルセッション全体を録画するには、以下の操作を行います:

```shell
ddcoterm
```

セッションを終了すると、CoTerm は録画を停止し、収集したプロセスデータを Datadog に送信します。

### コマンドの出力を録画する
個別のコマンドを実行して、その出力を録画するには以下を行います:

```shell
ddcoterm -- datadog-agent status
```

この操作により CoTerm が起動し、`datadog-agent status` を実行します。プロセスが完了すると、CoTerm は録画を停止して収集したプロセスデータを Datadog に送信します。

## コマンドを自動的に録画する

特定のコマンドを将来すべて自動的に録画するよう CoTerm を設定するには、まず shim を作成します:

```shell
ddcoterm shim create datadog-agent
```

shim を作成したら、ターミナルを再起動するか、プロファイルを再読み込みしてください (例: `source ~/.bashrc`)。Bash や Zsh 以外のシェルを使用している場合は、手動で `path/to/.ddcoterm/overrides` を PATH に追加します。

## 危険なターミナルコマンドから保護する

誤って指定したターミナルコマンドを実行しないようにするため、CoTerm をリントツールとして構成できます。より詳細な制御が必要な場合は、[Datadog Case Management][3] と連携し、特定のコマンドに承認を必須とすることも可能です。

### コマンドをリントする

指定したコマンド (例: `kubectl scale`) を実行しようとすると、CoTerm は警告を表示し、確認を求めるプロンプトを出すことができます。

1. コマンド用の shim を作成します: `ddcoterm shim create kubectl`

1. その後、`.ddcoterm/config.yaml` ファイルでリントルールを設定します。CoTerm でのリント設定方法の詳細は [CoTerm 設定ルール][4]を参照してください。

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("kubectl のコンテキストが指定されていません (有効なコンテキスト: '%s')。`kubectl scale` を実行する際には、常にコンテキストを明示的に指定することを推奨します。", k8s_context)
          end
   {{< /code-block >}}

この構成により、`--context` フラグなしで実行される `kubectl scale` コマンドを CoTerm がインターセプトします。

{{< img src="coterm/linter-warning.png" alt="コマンドラインインターフェイス。ユーザーが 'kubectl scale foo' を実行しています。出力には「CoTerm からの警告: kubectl のコンテキストが指定されていません (現在のコンテキスト: 'minikube')。'kubectl scale' を実行する際は常にコンテキストを明示的に指定することを推奨します。続行しますか？ (y/n)」と表示されています。" style="width:70%;" >}}

### コマンドに承認を必須とする

さらに危険なコマンドに対しては、CoTerm でコマンドを実行する前に (Case Management を通じて) チームメンバーの明示的な承認を必要とさせることができます。

1. コマンド用の shim を作成します: `ddcoterm shim create kubectl`

2. `.ddcoterm/config.yaml` ファイルで承認必須の設定を行います。詳細は [CoTerm 設定ルール][4]を参照してください。

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # すべての `kubectl scale` を本番環境で実行する際に記録と承認を必須にする
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "注意して進めてください。このコマンドは Kubernetes クラスターのセットアップを破壊する可能性があります。"
            local approver_message = "承認前に、ユーザーがロールバックプランを明確に記載していることを確認してください。"
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

この構成では、`kubectl scale --context prod` コマンドを実行すると、CoTerm が [Case Management][3] 内に承認リクエストを作成します。アクティブな[インシデント][5] に承認リクエストを関連付ける場合、他のインシデント対応者が承認者として自動的に追加されます。リクエストが承認された後、コマンドは実行されます。また、承認リクエストに基づいてワークフローをトリガーする[ケース自動化ルール][8]を構成することも可能です。

#### 承認を手動で要求する

手動で承認リクエストを作成するには、以下を実行します:

```shell
ddcoterm approve
```

#### 承認をバイパスする

承認をバイパスしてコマンドを実行するには、`COTERM_BREAK_GLASS` 環境変数を設定します。

例:

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/sensitive_data_scanner/
[2]: /ja/service_management/events/
[3]: /ja/service_management/case_management/
[4]: /ja/coterm/rules
[5]: /ja/service_management/incident_management/
[6]: /ja/coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /ja/service_management/case_management/automation_rules/