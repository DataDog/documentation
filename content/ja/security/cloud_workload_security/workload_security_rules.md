---
aliases:
- /ja/security_platform/cloud_workload_security/workload_security_rules
further_reading:
- link: /security/cloud_workload_security/setup
  tag: ドキュメント
  text: クラウドワークロードセキュリティのセットアップ
- link: /security/cloud_workload_security/agent_expressions
  tag: ドキュメント
  text: Agent 式
- link: security/cloud_workload_security/backend
  tag: ドキュメント
  text: クラウドワークロードセキュリティイベント
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
kind: documentation
title: クラウドワークロードセキュリティルールの管理
---

Cloud Workload Security (CWS) を有効にすると、Datadog Agent はシステムアクティビティをアクティブに監視し、すぐに使えるルールのセットと比較して評価し、疑わしい動作を検出することができます。CWS のルールは、2 つの異なるコンポーネント、[Agent ルール](#agent-rules)と[検出ルール](#detection-rules)で構成されています。

## Agent ルール

Agent ルールには、Agent が収集するアクティビティを決定する [Agent 式](#agent-expressions)が含まれます。Agent ルールのフルセットは、ポリシーと呼ばれます。Datadog は、デフォルトの Agent ポリシーによって駆動されるいくつかの[すぐに使える Agent ルール][6]を提供します。

[リモート構成][7]を有効にすると、新しい CWS Agent ルールがリリースされたときに、自動的に更新された CWS Agent ルールを受け取ることができます。これらのバンドルされた Agent ルールは、[デフォルト検出ルール][1]で使用されます。

<div class="alert alert-info">CWS のリモート構成はベータ版です。フィードバックや質問がございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

### Agent 式

Agent 式は、[Datadog の Security Language (SECL)][2] を使用して、以下の例に示すように、ホストやコンテナでのアクティビティに基づく動作を定義します。

#### `passwd` コマンドが実行されたときの検出

`passwd` コマンドが実行されたことを検出するためには、いくつかの属性に注意する必要があります。

ほとんどの Linux ディストリビューションでは、`passwd` ユーティリティは `/usr/bin/passwd` にインストールされています。実行イベントには、`exec`、`execve`、`fork`、その他のシステムコールがあります。CWS 環境では、これらのイベントはすべて `exec` というシンボルで識別されます。

**ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。

`passwd` コマンドルールは、デフォルトの CWS Agent ポリシーに既に存在します。しかし、Agent 式はより高度なものも可能で、プロセスの祖先にマッチするルールを定義したり、ワイルドカードを使用してより広範な検出を行うことができます。

#### PHP や Nginx のプロセスが bash を起動したときの検出

PHP や Nginx のプロセスが bash を起動したことを検出するためには、いくつかの属性に注意する必要があります。

ほとんどの Linux ディストリビューションでは、Bash は `/usr/bin/bash` にインストールされています。前の例と同様に、実行を検出するには、ルールに `exec.file.path == "/usr/bin/bash"` を含めます。これにより、ルールが Bash の実行、および PHP や Nginx の子プロセスとしての Bash の実行を考慮していることが確認できます。

CWS におけるプロセスの祖先のファイル名は、シンボル `process.ancestors.file.name` を持つ属性になります。祖先が Nginx かどうかを確認するには、`process.ancestors.file.name == "nginx"` を追加します。PHP は複数のプロセスで動作しているので、ワイルドカードを使用して、プレフィックスが PHP のすべてのプロセスにルールを展開します。祖先が PHP プロセスかどうかを確認するには、`process.ancestors.file.name =~ "php*"` を追加します。

まとめると、ルール式は次のようになります: `exec.file.path == "/usr/bin/bash" && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`

## 検出ルール

検出ルールは、イベントがログとして送信された後、Datadog のバックエンドで実行されます。そして、[検出ルール][3]に記述されたイベントのパターンに基づいて、ログが評価されます。パターンが検出ルールに一致した場合、[セキュリティシグナル][8]が生成されます。Datadog は継続的に新しい検出ルールを開発しており、そのルールはお客様のアカウントに自動的にインポートされます。

## カスタムルールの作成

デフォルトのルールに加えて、カスタム Agent ルールと検出ルールを記述することができます。カスタム Agent ルールは、デフォルトのポリシーとは別のカスタムポリシーで Agent にデプロイされます。カスタムポリシーには、カスタム Agent ルールと、[無効化されたデフォルトルール](#disable-default-agent-rules)が含まれます。

### Agent ルールの定義

1. [**Agent Configuration**][4] ページで、**New Rule** をクリックします。
2. ルールの名前と説明を追加します。
3. Datadog Security Language (SECL) 構文を使用して、**Expression** フィールドに Agent 式を定義します。

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Expression フィールドにルールを追加する" >}}

   例えば、不審なコンテナクライアントを監視するには

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. **Create Agent Rule** をクリックします。これにより、自動的に **Agent Configuration** ページに戻ります。

Agent のカスタムルールを作成すると、保留中の他のルール更新と一緒に変更内容が保存されます。変更を環境に適用するには、[更新されたカスタムポリシーを Agent にデプロイします](#deploy-the-policy-in-your-environment)。

### ポリシーを環境にデプロイする

リモート構成を使用して、カスタムポリシーを指定したホスト (すべてのホストまたは定義したホストのサブセット) に自動的にデプロイするか、または代わりに、各ホストの Agent に手動でアップロードすることができます。

<div class="alert alert-info">カスタムルールのリモート構成は非公開ベータ版です。この<a href="https://docs.google.com/forms/d/18hwf0-4AXYzKcQR0AIT1JxhaMFLw90YaDXBaUgdxKLM/prefill">フォーム</a>にご記入の上、アクセスをリクエストしてください。</div>

#### リモート構成

1. **Agent Configuration** ページで、**Deploy Agent Policy** をクリックします。
2. **Remote Configuration** を選択します。
3. **Deploy to All Hosts** (すべてのホストにデプロイする) または **Deploy to a Subset of Hosts** (ホストのサブセットにデプロイする) のいずれかを選択します。ポリシーをホストのサブセットにデプロイするには、1 つまたは複数のサービスタグを選択してホストを指定します。
4. **Deploy** をクリックします。

#### 手動デプロイ

1. **Agent Configuration** ページで、**Deploy Agent Policy** をクリックします。
2. **Manual** を選択します。
3. **Download Agent Policy** をクリックし、**Done** をクリックします。

次に、以下の手順で、ポリシーファイルを各ホストにアップロードします。

{{< tabs >}}
{{% tab "Host" %}}

ターゲットホストの `{$DD_AGENT}/runtime-security.d` フォルダに `default.policy` ファイルをコピーします。最低限、このファイルにはホスト上の `dd-agent` ユーザーが `read` と `write` にアクセスできる必要があります。このため、SCP や FTP などのユーティリティを使用する必要があるかもしれません。

変更を適用するには、[Datadog Agent][1] を再起動します。

[1]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. `default.policy` を含む ConfigMap を作成します。例えば、`kubectl create configmap jdefaultpol --from-file=default.policy` とします。
2. `datadog.securityAgent.runtime.policies.configMap` で ConfigMap (`jdefaultpol`) を `values.yaml` に追加します。

    ```yaml
    securityAgent:
      compliance:
        # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      syscallMonitor:
        # datadog.securityAgent.runtime.syscallMonitor.enabled
        # Set to true to enable Syscall monitoring.
        enabled: false
    ```

3. `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog` で Helm チャートをアップグレードします。

   &nbsp;**中:** `default.policy` にさらに変更を加える必要がある場合は、`kubectl edit cm jdefaultpol` を使用するか、`kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -` で configMap を置換してください。

4. [Datadog Agent を再起動][1]します。

[1]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

### 検出ルールの構成

新しいデフォルトポリシーファイルを Agent にアップロードした後、[**Rules**][3] ページに移動します。

1. [**Detection Rules**][3] ページで、**New Rule** をクリックします。
2. **Rule types** で **Workload Security** を選択します。**Threshold** や **New Value** など、検出方法を選択します。
3. 新しいクラウドワークロードセキュリティルールを構成します。ルールは、例えば `(||, &&)` のように、ブーリアンロジックと組み合わせた複数のルールケースを持つことができます。また、カウンター、グループ化、ロールアップウィンドウを設定することができます。

    {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="検索クエリフィールドにルールを追加する" >}}

4. **Only generate a signal if there is a match** (一致した場合のみシグナルを生成) フィールドにクエリを入力し、値が一致した場合にのみトリガーが生成されるようにします。また、**This rule will not generate a signal if there is a match** (一致がある場合、このルールはシグナルを生成しない) フィールドに抑制クエリを入力し、指定した値が満たされたときにトリガーが生成されないようにすることもできます。
5. このルールがセキュリティシグナルをトリガーするときのロジックを定義します。例えば、`a>0` は、手順 3 で設定したルールの条件がスライド時間内に一度でも満たされていれば、セキュリティシグナルがトリガーされることを意味します。ルールを関連付ける重大度を選択し、通知する関係者をすべて選択します。

    {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="ルールのトリガー、重大度、通知の設定" >}}

6. ルールのトリガー、重大度、通知を設定します。ルールに名前を付け、Markdown 形式で通知メッセージを追加します。[通知変数][5]を使用して、タグとイベント属性を参照することにより、シグナルの具体的な詳細を提供します。メッセージの後に、複数のタグを追加して、カスタムルールによって生成されたシグナルにさらにコンテキストを与えます。

   **注**: Datadog は、本文に修復ランブックを含めることを推奨しています。テンプレートに記載されているように、実行時にコンテキストに応じたコンテンツを動的に生成するために、置換変数を使用します。

## Agent のデフォルトルールを無効にする

Agent のデフォルトルールを無効にするには、[**Agent Configuration**][6] ページに移動し、ルールトグルを選択します。Agent のデフォルトルールを無効にすると、保留中の他のルール更新と一緒に変更内容が保存されます。変更を環境に適用するには、[更新されたカスタムポリシーを Agent にデプロイします](#deploy-the-policy-in-your-environment)。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/#cat-workload-security
[2]: /ja/security/cloud_workload_security/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ja/security/notifications/variables/
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /ja/security/cloud_workload_security/setup#remote-configuration
[8]: /ja/security/explorer