---
description: プライベートアクションランナーを使用して、所有者なしの Execution-Policy で承認されたランナーに必要な構成を含む、プライベートネットワーク内の定義済みスクリプトを実行します。
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: ドキュメント
  text: Datadog Agent でプライベートアクションランナーをセットアップする
- link: actions/private_actions/execution_policies
  tag: ドキュメント
  text: 実行ポリシー
- link: actions/private_actions/reference
  tag: ドキュメント
  text: リファレンス
title: プライベートアクションランナーでスクリプトを実行する
---
## 概要 {#overview}

プライベートアクションランナーは**定義済みスクリプト**を実行できます。これらは、シェルコマンド、コマンドラインツール、およびスクリプト構成ファイルであらかじめ宣言したスクリプトです。事前に定義したもののみが実行されるため、ランナーがワークフローやアプリから任意のインラインコマンドを実行することはありません。

<div class="alert alert-warning">ランナーに実行を許可するコマンドとバイナリはご自身で決定できます。スクリプト構成に追加するすべてのコマンド、特にパラメーターを受け入れるコマンドを確認し、ランナーには必要な権限のみを付与し、コネクションを通じて共有する権限を慎重に確認してください。<a href="/actions/connections/#connection-security-considerations">コネクションセキュリティへの配慮</a>を参照してください。</div>

## ユースケース {#use-cases}

| ユースケース | エージェントベース | スタンドアロン | メモ |
|---|:---:|:---:|---|
| Linux バイナリの実行 (`ls`、`rm`、`find`、`curl`) | {{< X >}} | {{< X >}} | スタンドアロンランナーの場合、関連ファイルはコンテナからアクセス可能でなければなりません。|
| CLI の実行 (`aws`、`terraform`、`kubectl`) | {{< X >}} | {{< X >}} | スタンドアロンランナーの場合、CLI と資格情報はイメージ内で利用可能でなければなりません。エージェントベースのランナーの場合、ツールはホストにインストールされている必要があります。|
| バッシュスクリプトの実行 | {{< X >}} | {{< X >}} | スタンドアロンランナーの場合、スクリプトはコンテナ内にマウントできます。Python インタープリターには[大きいイメージ](#large-image)を使用してください。|
| PowerShell スクリプトの使用 | {{< X >}} | | エージェントベースの Windows ランナーでのみサポートされています。|
| 特権コマンドの実行 (`systemctl restart`) | {{< X >}} | | エージェントベースのランナーの場合は、ランナーユーザーに権限を付与します。コンテナのサンドボックス化により、スタンドアロンランナーがホストへの特権アクセスを行うことを防ぎます。|

## 前提条件 {#prerequisites}

**エージェントベースのランナーの場合:**
- Datadog Agent 7.81.0 以降。[Datadog Agent でプライベートアクションランナーをセットアップする][1] を参照してください。
- `com.datadoghq.script.runPredefinedScript` (Linux) または `com.datadoghq.script.runPredefinedPowershellScript` (Windows) をランナーのアクション許可リストに追加します。

**スタンドアロンランナーの場合:**
- スタンドアロンランナー。[スタンドアロンのプライベートアクションランナーをセットアップする][2] を参照してください。
- ベースまたは[大きいイメージ](#large-image)に含まれていない CLI ツールの場合は、カスタム Docker イメージを使用します。[カスタムイメージ](#custom-images)を参照してください。

## エージェントベース {#agent-based}

### スクリプトの構成 {#configure-scripts}

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml` ファイルを編集します。

```yaml
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world!"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
  restart-service:
    command: ["sudo", "systemctl", "restart", "{{ parameters.service }}"]
```

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` ファイルを編集します。

```yaml
schemaId: script-credentials-v1
runPredefinedPowershellScript:
  helloWorld:
    script: |
      Write-Output "Hello world!"
  greet:
    script: |
      Write-Output "Run script from workflow called {{ parameters.name }} !"
    parameterSchema:
      properties:
        name:
          type: string
      required:
        - name
  restartService:
    script: |
      Restart-Service -Name {{ parameters.serviceName }} -Force
    parameterSchema:
      properties:
        serviceName:
          type: string
      required:
        - serviceName
```

{{% /tab %}}
{{< /tabs >}}

ワークフローまたはアプリで、定義した名前 (例: `echo`) でスクリプトを参照します。Linux ランナーでは `runPredefinedScript` を、Windows ランナーでは `runPredefinedPowershellScript` を使用します。

### 権限を付与する {#grant-permissions}

{{< tabs >}}
{{% tab "Linux" %}}

ランナーは `dd-agent` ユーザーとしてスクリプトを実行します。スクリプトに昇格権限が必要な場合は、`dd-agent` ユーザーに権限を付与します。

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

ランナーは `ddagentuser` としてスクリプトを実行します。スクリプトが特定のリソースへのアクセスを必要とする場合は、それらに対して `ddagentuser` 昇格権限を付与します。

```powershell
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

{{% /tab %}}
{{< /tabs >}}

### 所有者なしランナー (実行ポリシー認証済み) {#ownerless-runner-execution-policy-authorized}

ランナーが所有者なしとして登録され、[実行ポリシー][3] によって認証されている場合、上記の手順に加えて次の 2 つの手順が必要です。

- **Script** インテグレーションは、事前定義スクリプトアクションがランナーのアクション許可リストに含まれていることに加え、実行ポリシーを通じてランナーに対して認証されている必要があります。
- ランナーは、上記の[スクリプトの構成](#configure-scripts)で使用したものと同じ**固定パス**から事前定義スクリプトを読み取ります。

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml`

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`

{{% /tab %}}
{{< /tabs >}}

#### Kubernetes における構成の配信 {#delivering-the-config-on-kubernetes}

Kubernetes では、Datadog Agent 内のランナーに対して、スクリプト構成ファイルを ConfigMap として提供します。それを固定パスにランナーコンテナとしてマウントします。クラスター Agent ランナーは上記の Linux パスを使用します。

まず、スクリプト構成を保持する ConfigMap を作成します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: par-script-config
  namespace: datadog
data:
  script-config.yaml: |
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world!"]
```

次に、`DatadogAgent` リソースで predefined-script アクションを許可し、ConfigMap を固定パスでランナーコンテナにマウントします。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.script.runPredefinedScript"
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.remoteaction.*"
spec:
  override:
    nodeAgent:
      volumes:
        - name: par-script-config
          configMap:
            name: par-script-config
      containers:
        private-action-runner:
          volumeMounts:
            - name: par-script-config
              mountPath: /etc/datadog-agent/private-action-runner/script-config.yaml
              subPath: script-config.yaml
              readOnly: true
```

最後に、マニフェストを適用します。

```bash
kubectl apply -f datadog-agent.yaml
```

### 所有者ありランナー (コネクションベース) {#owned-runner-connection-based}

{{< tabs >}}
{{% tab "Linux" %}}

#### コネクションを構成する {#configure-the-connection}

ランナーのアクション許可リストで `com.datadoghq.script.runPredefinedScript` を選択した場合は、すでに **Script** コネクションがランナーにリンクされているはずです。そうでない場合は、コネクションを作成し、`/etc/datadog-agent/private-action-runner/script-config.yaml` を**ファイルへのパス**として指定します。詳細については、[プライベートアクションの資格情報の取り扱い][4] を参照してください。

{{% /tab %}}
{{% tab "Windows" %}}

#### コネクションを構成する {#configure-the-connection-1}

ランナーのアクション許可リストで `com.datadoghq.script.runPredefinedPowershellScript` を選択した場合は、すでに **Script** コネクションがランナーにリンクされているはずです。そうでない場合は、コネクションを作成し、`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` を**ファイルへのパス**として指定します。詳細については、[プライベートアクションの資格情報の取り扱い][4] を参照してください。

{{% /tab %}}
{{< /tabs >}}

## スタンドアロン {#standalone}

スタンドアロンランナーは常に所有されており、[コネクション][5] で認証されます。

{{< tabs >}}
{{% tab "Docker" %}}

1. [ランナーをセットアップ][2] した後、**コネクション**に移動します。
1. **新しいコネクション**をクリックし、**スクリプト**を選択します。
1. コネクション名を入力し、**プライベートアクションランナー**ドロップダウンからランナーを選択します。
1. 実行したいコマンドを含む視覚情報ファイルのテンプレートをランナーの構成ディレクトリにコピーします。
1. **ファイルへのパス**で、ファイルパスがランナーのファイルシステム上のパスと一致していることを確認します (ほとんどの場合、デフォルトで問題ありません)。
1. **次へ、アクセスを確認**をクリックし、権限を設定し、**作成**をクリックします。
1. ワークフローやアプリでスクリプトアクションを使用する際は、このコネクションを選択します。

ランナーの `config.yaml` ファイルとスクリプトコネクションを通じてスクリプトアクションを構成します
(デフォルト: `credentials/script.yaml`):

```yaml
# Add the script action to the allowlist (config.yaml)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (credentials/script.yaml)
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
    parameterSchema:
      properties:
        echoValue:
          type: string
      required:
        - echoValue
```

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

Helm でランナーをデプロイする場合、`values.yaml` ファイルを通じてスクリプトを構成します。

```yaml
common:
  actionsAllowlist:
    - com.datadoghq.script.runPredefinedScript

credentials:
  script:
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world"]
      echo-parametrized:
        command: ["echo", "{{ parameters.echoValue }}"]
        parameterSchema:
          properties:
            echoValue:
              type: string
          required:
            - echoValue
```

ランナーをデプロイまたはアップグレードします

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### ランナーイメージのオプション {#runner-image-options}

以下のオプションは、スタンドアロンランナーでのみ利用可能です。

#### 大きいイメージ {#large-image}

Python、SSH、AWS CLI、Terraform、gcloud CLI などのツールを使用する場合は、デフォルトのイメージの代わりに `gcr.io/datadoghq/private-action-runner:v-large`{{< private-action-runner-version "private-action-runner" >}}イメージを使用します。

#### カスタムイメージ {#custom-images}

Datadog が提供するイメージに含まれていないバイナリについては、カスタムイメージを作成します。

```dockerfile
FROM gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
USER root
# Change the line below to install the tool of your choice
RUN apt update && apt install -y python3
USER dog
```

複雑なスクリプトをランナー内にマウントできます。

```yaml
# docker-compose example
services:
  runner:
    build: . # if you are using a local Dockerfile
    volumes:
      - "./config:/etc/dd-action-runner/config" # contains credentials for actions
      - "./scripts:/etc/dd-action-runner-script/scripts" # contains dependencies for script actions
```

```yaml
# credentials/script.yaml
schemaId: script-credentials-v1
runPredefinedScript:
  python:
    command: ["python3", "/etc/dd-action-runner-script/scripts/script.py"]
  shell:
    command: ["bash", "/etc/dd-action-runner-script/scripts/script.sh"]
```

## 構成されたスクリプトの使用 {#using-the-configured-scripts}

ワークフローまたはアプリで、定義したスクリプト名 (例: `echo` または `echo-parametrized`) を使用するようにアクションを構成します。Linux ランナーの場合は、`runPredefinedScript` を使用します。Windows ランナーの場合は、`runPredefinedPowershellScript` を使用します。

変数解決には、ランナー内でワークフローレベルとアクションレベル
の 2 つのレベルがあります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/set_up_agent_based/
[2]: /ja/actions/private_actions/set_up_standalone/
[3]: /ja/actions/private_actions/execution_policies/
[4]: /ja/actions/connections/private_action_credentials/
[5]: /ja/actions/connections/