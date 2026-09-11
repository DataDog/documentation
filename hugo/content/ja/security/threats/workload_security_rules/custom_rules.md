---
further_reading:
- link: /security/threats/setup
  tag: ドキュメント
  text: CSM Threats の設定
- link: /security/threats/agent_expressions
  tag: ドキュメント
  text: Agent 式
- link: security/threats/backend
  tag: ドキュメント
  text: CSM Threats イベント
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
title: カスタム検出ルールの作成
---

このトピックでは、[CSM Threats][8] のためのカスタム Datadog Agent および検出ルールの作成方法について説明します。

すぐに使える (OOTB) [デフォルトの Agent ルールと検出ルール][7]に加えて、カスタムの Agent ルールと検出ルールを作成できます。カスタムルールは、Datadog の OOTB ルールでは検出されないイベントを検出するのに役立ちます。

## カスタムルール管理のための RBAC

[Datadog Standard のすぐに使えるロール][11]を持つユーザーが、リモート構成を使用して変更されたルールを作成、更新、無効化、デプロイできないようにするには、

1. Datadog Admin ロール内のユーザーが `security_monitoring_cws_agent_rules_write` 権限を含むロールを作成する必要があります。
2. Agent ルールを管理するユーザーのみをこのロールに追加します。


## カスタム検出ルールの概要

カスタム検出ルールは Agent ルールに依存し、既存のデプロイ済み Agent ルールと追加の式パラメーターで構成されます。

次の 2 つのユースケースがあります。

- **既存の Agent ルールを使用して検出ルールを作成する:** 既存の Agent ルールを使用する脅威検出ルールを作成するには、Agent ルールを参照し、必要な追加の式パラメーターを追加する脅威検出ルールを作成するだけで済みます。
- **新しい Agent ルールを使用して脅威検出ルールを作成する:** 現在の Agent ルールがサポートしていないイベントを検出するには、そのイベントを検出するカスタム Agent ルールを作成し、そのカスタム Agent ルールを使用するカスタム脅威検出ルールを作成する必要があります。

詳細は、[CSM Threats Detection ルール][7]を参照してください。

次の方法を使用してカスタムルールを作成できます。

- **簡易:** **Assisted rule creator** を使用して、カスタム Agent ルールと検出ルールを同時に作成します。
  - **Assisted rule creator** の使用方法については、[カスタム Agent ルールと検出ルールを同時に作成する](#create-the-custom-agent-and-detection-rules-together)を参照してください。
- **高度:** 脅威検出式を定義して、カスタム Agent ルールと検出ルールを個別に作成します。
  - この方法の手順については、[カスタム Agent ルールを作成する](#create-a-custom-agent-rule)および[カスタム検出ルールを作成する](#create-a-custom-detection-rule)を参照してください。

## カスタム Agent ルールと検出ルールを同時に作成する

**Assisted rule creator** オプションを使用すると、Agent ルールと依存する検出ルールを同時に作成でき、Agent ルールが検出ルールで適切に参照されます。このツールを使うと、Agent ルールと検出ルールを個別に作成する高度な方法よりも作業が迅速に完了します。

このツールでルールを定義すると、それに対して生成された脅威式がツール内に表示されます。

簡易ルール作成ツールを使用するには、

1. [Agent Configuration][4] または [Threat Detection Rules][3] で **New Rule** を選択し、次に **Assisted rule creator** を選択します。
2. 検出を定義します。リソースを効果的に監視するために以下の検出タイプオプションがあります。
   - **File integrity monitoring (FIM):** ファイルに対する非標準的または疑わしい変更を検出します。
   - **Process activity monitoring:** システムソフトウェアのプロセスを追跡および分析し、悪意ある動作やポリシー違反を検出します。
   - 監視するファイル名やプロセス名、またはそのパスを入力します。
3. さらに条件を指定します。脅威ルール式に追加する引数を入力します。例えば、引数 `foo` を `process.argv in ["foo"]` として追加します。
4. 重大度と通知リストを設定します。
   - この脅威が検出された際に生成されるシグナルの重大度を選択します。
   - シグナルが生成された際に通知するリストを選択します。
5. ルール名と説明を追加します。

   以下は、新しい FIM ルールの例で、各ルールで生成された式も含まれています。

   {{< img src="/security/csm/csm_threats_simple_rule_creator2.png" alt="Assisted rule creator の使用例" style="width:100%;" >}}

6. **Create _N_ Rules** を選択します。
7. **Generate Rules** で **Confirm** を選択して、ルールを生成します。
8. 最後に **Finish** を選択すると、[Agent Configuration][3] ページに新しいルールが表示されます。
9. [Agent 構成][3]で、**Deploy Agent Policy** を選択します。


## カスタム Agent ルールを作成する

個別のカスタム Agent ルールを作成し、それを[新しい Agent ポリシー](#deploy-the-policy-in-your-environment)としてデプロイし、それを[カスタム検出ルール](#create-a-custom-detection-rule)で参照できます。

1. [**Agent Configuration**][4] ページで **New Rule** を選択し、次に **Manual rule creator** を選択します。
2. ルールの名前と説明を追加します。
3. **Expression** で、Datadog Security Language (SECL) 構文を使用して Agent 式を定義します。

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Expression フィールドにルールを追加する" >}}

   例えば、不審なコンテナクライアントを監視するには

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. **Create Agent Rule** をクリックします。これにより、自動的に **Agent Configuration** ページに戻ります。

Agent のカスタムルールを作成すると、保留中の他のルール更新と一緒に変更内容が保存されます。変更を環境に適用するには、[更新されたカスタムポリシーを Agent にデプロイします](#deploy-the-policy-in-your-environment)。

## ポリシーを環境にデプロイする

カスタム Agent ルールは、デフォルトのポリシーとは別のカスタムポリシーで Agent にデプロイされます。カスタムポリシーには、カスタム Agent ルールと、[無効化されたデフォルトルール](#disable-default-agent-rules)が含まれます。

リモート構成を使用して、カスタムポリシーを指定したホスト (すべてのホストまたは定義したホストのサブセット) に自動的にデプロイするか、または各ホストの Agent に手動でアップロードすることができます。

<div class="alert alert-info">カスタムルールのリモート構成は非公開ベータ版です。この<a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">フォーム</a>にご記入の上、アクセスをリクエストしてください。</div>

### リモート構成

1. **Agent Configuration** ページで、**Deploy Agent Policy** をクリックします。
2. **Remote Configuration** を選択します。
3. **Deploy to All Hosts** (すべてのホストにデプロイする) または **Deploy to a Subset of Hosts** (ホストのサブセットにデプロイする) のいずれかを選択します。ポリシーをホストのサブセットにデプロイするには、1 つまたは複数のサービスタグを選択してホストを指定します。
4. **Deploy** をクリックします。

### 手動デプロイ

1. **Agent Configuration** ページで、**Deploy Agent Policy** をクリックします。
2. **Manual** を選択します。
3. **Download Agent Policy** をクリックし、**Done** をクリックします。

次に、以下の手順で、ポリシーファイルを各ホストにアップロードします。

{{< tabs >}}
{{% tab "ホスト" %}}

ターゲットホストの `{$DD_AGENT}/runtime-security.d` フォルダに `default.policy` ファイルをコピーします。最低限、このファイルにはホスト上の `dd-agent` ユーザーが `read` と `write` にアクセスできる必要があります。このため、SCP や FTP などのユーティリティを使用する必要があるかもしれません。

変更を適用するには、[Datadog Agent][1] を再起動します。

[1]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

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

[1]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

## カスタム検出ルールを作成する

新しいデフォルトポリシーファイルを Agent にアップロードした後、[**Threat Detection Rules**][3] ページに移動します。

1. [**Threat Detection Rules**][3] ページで **New Rule** を選択し、次に **Manual rule creator** を選択します。
2. **ルールタイプを選択:**
   1. **Detection rule types** で **Workload Security** を選択します。
   2. **Threshold** や **New Value** などの検出方法を選択します。
3. **Define search queries:**
   1. 新しい CSM Threats ルールを構成します。ルールは、例えば `(||, &&)` のように、ブーリアンロジックと組み合わせた複数のルールケースを持つことができます。また、カウンター、グループ化、ロールアップウィンドウを設定することができます。

    {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="検索クエリフィールドにルールを追加する" >}}
   - クエリを入力し、値が一致した場合にのみトリガーが生成されるようにします。また、**Suppression Rules** に抑制クエリを入力し、指定した値が満たされたときにトリガーが生成されないようにすることもできます。
4. **Set rule cases:**
   1. トリガーと重大度に対して[ルールケース][9]を設定します。
   2. このルールがセキュリティシグナルをトリガーするときのロジックを定義します。例えば、`a>0` は、検索クエリで設定したルールの条件がスライド時間内に一度でも満たされていれば、セキュリティシグナルがトリガーされることを意味します。
   3. ルールを関連付ける重大度を選択し、通知する関係者をすべて選択します。

    {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="ルールのトリガー、重大度、通知の設定" >}}
5. **Say what's happening:**
   1. ルールに名前を付け、Markdown 形式で通知メッセージを追加します。[通知変数][5]を使用して、タグとイベント属性を参照することにより、シグナルの具体的な詳細を提供します。メッセージの後に、複数のタグを追加して、カスタムルールによって生成されたシグナルにさらにコンテキストを与えます。


      <div class="alert alert-info">Datadog は、本文に修復[ランブック][10]を含めることを推奨しています。テンプレートに記載されているように、実行時にコンテキストに応じたコンテンツを動的に生成するために、置換変数を使用します。</div>

## Agent のデフォルトルールを無効にする

Agent のデフォルトルールを無効にするには、[**Agent Configuration**][6] ページに移動し、ルールトグルを選択します。Agent のデフォルトルールを無効にすると、保留中の他のルール更新と一緒に変更内容が保存されます。変更を環境に適用するには、[更新されたカスタムポリシーを Agent にデプロイします](#deploy-the-policy-in-your-environment)。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/security/configuration/workload/rules
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ja/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /ja/security/threats/workload_security_rules
[8]: /ja/security/threats/
[9]: /ja/security/cloud_siem/log_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /ja/account_management/rbac/permissions/