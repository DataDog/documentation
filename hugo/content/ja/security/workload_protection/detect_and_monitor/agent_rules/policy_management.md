---
aliases:
- /ja/security/workload_protection/workload_security_rules/custom_rules
- /ja/security/threats/workload_security_rules/custom_rules
description: Workload Protection ポリシーを作成、デプロイ、スコープ設定し、インフラストラクチャー用のカスタム Agent ルールを作成します。
disable_toc: false
title: Policy Management
---
Agent ルールは**ポリシーに編成**されます。ポリシーとは、まとめてデプロイし、ホストやクラスターなどの**特定のインフラストラクチャーにスコープ設定**する Agent ルールのセットです。

すぐに使える[デフォルトの Agent ルール][7] (OOTB ルール) に加え、標準の OOTB ルールだけでは検出できないイベントを Datadog で検出するために**カスタム Agent ルール**を記述できます。

## ポリシー{#policies}

### ポリシーを作成する {#create-a-policy}

1. [ポリシー][3]に移動します。
2. {{< ui >}}New Policy{{< /ui >}} をクリックします。既存のポリシーを開いて {{< ui >}}Actions{{< /ui >}} をクリックし、クローンを作成することもできます。
3. ポリシーの名前を入力し、{{< ui >}}Create{{< /ui >}} をクリックします。
   新しいポリシーが作成されます。有効化やデプロイはされません。
4. ポリシーをクリックして開きます。
5. {{< ui >}}New Rule{{< /ui >}} で、カスタム Agent ルールをポリシーに追加します。Agent ルールの作成については、[カスタム Agent ルールの作成][14]を参照してください。
6. {{< ui >}}Deployed on 0 agents{{< /ui >}} の横にある {{< ui >}}Edit{{< /ui >}} をクリックします。
7. 特定のインフラストラクチャーをターゲットにするために、ポリシーに[タグ][17]を追加します。
8. ポリシーをデプロイするには、{{< ui >}}Policy is disabled{{< /ui >}} の横にあるスイッチを切り替えて確定します。これには、このページで詳しく説明している [Remote Configuration](#remote-configuration) が使用されます。

### Datadog 管理のポリシーを現在のバージョンに固定する{#pin-a-datadog-managed-policy-to-its-current-version}

<div class="alert alert-info">ポリシーの固定は、Agent バージョン 7.71.0 以降でサポートされています。以前の Agent では、引き続き最新のポリシーの更新を自動的に受信します。</div>

Datadog 管理のポリシーが Datadog で更新されると、それらがインフラストラクチャーに自動的にデプロイされます。

ポリシーの新しいバージョンがインフラストラクチャーにデプロイされるタイミングを制御するには、ポリシーを現在のバージョンに固定します。ポリシーのバージョンを固定すると、Datadog でポリシーの新しいバージョンがリリースされたときに、ポリシーの更新が自動的に展開されるのを防ぐことができます。

ポリシーを固定するには、次の手順を実行します。

1. [ポリシー][3]に移動します。
2. Datadog 管理のポリシーをクリックします。
3. {{< ui >}}Version{{< /ui >}} で、固定オプションをクリックします。
   インフラストラクチャーで 7.71.0 より前のバージョンの Agent を実行している場合、古い Agent に関する警告が表示されます。[Fleet Automation][18] で Agent のバージョンを確認し、アップグレードしてください。
4. {{< ui >}}Pin{{< /ui >}} をクリックします。ポリシーのバージョンの固定を解除するには、固定オプションを再度クリックします。

### 競合するルール{#conflicting-rules}

同じホストにデプロイされた 2 つのポリシーに、ステータス (アクティブと非アクティブ) が異なる同じルールが含まれている場合、そのルールはアクティブと見なされます。

### タグを適用する{#apply-tags}

タグは、環境、クラスター、ホストなど、ポリシーが適用される場所を定義します。ポリシーにタグを追加して、ルールをインフラストラクチャーの一部に限定します。

1. [Agent 構成][6]に移動します。
2. ポリシーを開き、{{< ui >}}Edit{{< /ui >}} をクリックします。
3. タグを入力し、{{< ui >}}Apply{{< /ui >}} をクリックします。ポリシーが有効な場合、そのポリシーがタグのターゲットに適用されます。

タグを追加すると、タグのターゲットとなる Agent の数と各 Agent を実行しているインフラストラクチャーが Datadog に表示されます。たとえば、`Tags match 144 agents` のようになります。

## カスタム Agent ルールの作成 {#create-a-custom-agent-rule}

カスタム Agent ルールを作成し、カスタムポリシーの一部としてデプロイできます。後でカスタムの[検出ルール][19]を定義する際に、カスタム Agent ルールを参照し、式のパラメーターを追加します。
カスタム Agent ルールは、デフォルトポリシーとは別のカスタムポリシーで Agent にデプロイされます。カスタムポリシーには、カスタム Agent ルールのみが含まれます。

1. [Agent 構成][6]に移動します。
2. ポリシーを作成するか、既存のポリシーを開きます。
3. ポリシーを開いた状態で、{{< ui >}}Actions{{< /ui >}} の {{< ui >}}Manual rule creator{{< /ui >}} を選択して Agent ルールエディターを開きます。Datadog の [Agent ルール][21]ページからも同じエディターを利用できます。Agent ルールと脅威検出ルールの両方を順を追って設定できる {{< ui >}}Assisted rule creator{{< /ui >}} ウィザードを代わりに使用する場合は、[カスタムの Agent ルールと検出ルールを一緒に作成する][20]を参照してください。
4. ルールの {{< ui >}}Name{{< /ui >}} と {{< ui >}}Description{{< /ui >}} を入力します。
5. {{< ui >}}Expression{{< /ui >}} で、[Datadog Security Language (SECL)][15] を使用して一致条件を定義します。
6. (オプション) ルールがイベントに一致したときに実行される変数またはアクションを追加します。[変数とアクション][22]を参照してください。
7. {{< ui >}}Create Agent Rule{{< /ui >}} をクリックします。ポリシーに戻ります。

カスタム Agent ルールを作成すると、その変更は他の保留中のルールの更新と一緒に保存されます。環境に変更を適用するには、更新されたカスタムポリシーを Agent にデプロイします。

## ポリシーの有効化とデプロイ {#enable-and-deploy-policies}

有効化されたポリシーのルールは、そのタグによって識別されるインフラストラクチャーターゲットに適用されます。ポリシーを有効にすることは、それをデプロイすることと同じです。

Datadog UI の **Remote Configuration** を使用して、ポリシーのタグで指定されたホスト (すべてのホストまたは定義されたホストのサブセット) にカスタムポリシーを自動的にデプロイできます。また、各ホストの Agent に**手動でデプロイ**することもできます。

### Remote Configuration {#remote-configuration}

**Remote Configuration** は、Datadog から Agent にポリシーを自動的に配信する方法です。署名および認証されたポリシーのみが Agent にプッシュされることを保証する安全なメカニズムが使用されています。Remote Configuration を使用してポリシーをデプロイするには、「ポリシーを作成する」で詳しく説明している手順に従ってください。

#### デプロイ戦略 {#deployment-strategies}

Agent ルールやポリシーの変更を Remote Configuration で展開する方法は、2 つの戦略から選択できます。すべてのホストに変更を即座にデプロイする方法と、管理デプロイを使用して段階的にデプロイする方法です。[デプロイページ][23]でデプロイを監視します。

##### 即時デプロイ {#deploy-instantly}

即時デプロイでは、段階的な検証なしで、スコープ内のすべてのホストに更新されたポリシーを同時に送信します。通常、これは数分で完了し、変更をすべての場所にすぐに適用したい場合に最適です。

{{< ui >}}Deploy instantly{{< /ui >}} を選択し、{{< ui >}}Update Policy{{< /ui >}} をクリックします。[デプロイページ][23]で進捗状況を追跡します。

##### 管理デプロイ {#managed-deployment}

管理デプロイでは、変更を段階的に展開するため、インフラストラクチャー全体に適用する前にホストのサブセットで検証できます。

1. ポリシーまたはルールを編集する場合は、{{< ui >}}Start a managed deployment{{< /ui >}} を選択します。ポリシーまたはルールが管理デプロイですでに展開されている場合は、{{< ui >}}Start from your last deployment{{< /ui >}} を選択して前回のデプロイのパラメーターを再利用します。ルールの変更で再利用されるパラメーターは、そのルールを含むポリシーの最後のデプロイのものになります。
2. {{< ui >}}Customize deployment roll-out plan{{< /ui >}} で、デプロイのスコープを設定し、変更を最大 10 ステージで段階的に展開するように構成します。各ステージを {{< ui >}}By percentage of hosts in scope{{< /ui >}} または {{< ui >}}By host tags{{< /ui >}} で定義します。
3. {{< ui >}}Set up monitoring and delay time{{< /ui >}} で、デプロイ中にチェックするモニターを 1 つ以上選択します。デプロイの進行中にモニターがアラートを発すると、展開が一時停止します。さらに、次のステージに進むまでの待機時間を設定します。
4. {{< ui >}}Set deployment window{{< /ui >}} で、デプロイを実行できる日時とタイムゾーンを設定します。デプロイの実行がこの期間を過ぎると、一時停止し、次の期間に再開されます。
5. (オプション) {{< ui >}}Add a description{{< /ui >}} で、デプロイの説明を追加します。
6. {{< ui >}}Update Policy{{< /ui >}} をクリックして展開を開始します。[デプロイページ][23]で進捗状況を追跡します。

### 手動デプロイ{#manual-deployment}

**手動デプロイ**では、各 Agent にポリシーファイルを自分でインストールします。Datadog UI でポリシーとそのルールを作成し、生成されたファイルを**ダウンロード**できます。ポリシーの構文をすでに理解している場合は、`.policy` ファイルを自分で作成します。その後、下記の手順に従って、ポリシーを実行するすべての Agent にそのファイルをアップロードするか同期します。

1. {{< ui >}}Agent Configuration{{< /ui >}} ページで、ポリシーを開きます。
2. [Actions] (アクション) で {{< ui >}}Download Policy{{< /ui >}} を選択します。

次に、下記の手順に従って、各ホストにポリシーファイルをアップロードします。

{{< tabs >}}
{{% tab "ホスト" %}}

`default.policy` ファイルをターゲットホストの `/etc/datadog-agent/runtime-security.d` フォルダー (すべての `.policy` ファイルの格納先) にコピーします。ファイルには、ホストの `root` ユーザーに対する `read` および `write` アクセス権が必要です。

変更を適用するには、次の**いずれか**を実行します。

-   ランタイムのポリシーをリロードします (Agent の完全な再起動は不要)。

    ```bash
    sudo /opt/datadog-agent/embedded/bin/system-probe runtime policy reload
    ```

-   [Datadog Agent][27] を再起動します。

[27]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. `default.policy` を含む ConfigMap を作成します (例: `kubectl create configmap jdefaultpol --from-file=default.policy`)。
2. ConfigMap (`jdefaultpol`) を `values.yaml` に追加します (`datadog.securityAgent.runtime.policies.configMap`)。

    ```yaml
    securityAgent:
        # [...]
        runtime:
            # datadog.securityAgent.runtime.enabled
            # Set to true to enable Security Runtime Module
            enabled: true
            policies:
                # datadog.securityAgent.runtime.policies.configMap
                # Place custom policies here
                configMap: jdefaultpol
        # [...]
    ```

3. Helm チャートをアップグレードします (`helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`)。

    **注:**`default.policy` にさらに変更を加える必要がある場合は、`kubectl edit cm jdefaultpol` を使用するか、configMap を `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -` に置き換えます。

{{% /tab %}}
{{< /tabs >}}

## デフォルトの Agent ルールの無効化 {#disable-default-agent-rules}

1. Agent ルールを無効にするには、[{{< ui >}}Agent Configuration{{< /ui >}}][6]ページに移動し、そのルールを使用しているポリシーを選択します。
2. ポリシーでルールを開きます。
3. ステータスを {{< ui >}}Inactive{{< /ui >}} に設定します。
4. {{< ui >}}Save Changes{{< /ui >}} をクリックします。

[ルール構成][21]でルールを削除すると、そのルールが含まれていた**すべてのポリシー**からそのルールが削除されます。

## カスタムルールの管理の RBAC {#rbac-for-custom-rule-management}

カスタムルールの RBAC に使用する重要な[ロールと権限][11]の一部を次に示します。

-   `security_monitoring_cws_agent_rules_actions` 権限は、ルールでブロックモードを有効にするために使用される[自動対応][12]機能をオンにして構成するために使用できます。
    -   `security_monitoring_cws_agent_rules_actions` 権限を使用するには、Datadog Admin ロールを持つユーザーが `security_monitoring_cws_agent_rules_actions` 権限を含むロールを作成し、自動対応を管理するユーザーのみをそのロールに追加する必要があります。
-   {{< ui >}}Datadog Standard{{< /ui >}} ロールを持つユーザーは、操作によってルールの**保護**設定が変更されない限り、デフォルトでカスタムルールの作成と更新が許可されます。

[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ja/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /ja/security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules
[8]: /ja/security/workload_protection/
[9]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /ja/account_management/rbac/permissions/
[12]: /ja/security/workload_protection/respond_and_report/#automated-response
[13]: #disable-default-agent-rules
[14]: #create-a-custom-agent-rule
[15]: /ja/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/
[16]: #prioritize-policies
[17]: #apply-tags
[18]: https://app.datadoghq.com/fleet
[19]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[20]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[21]: https://app.datadoghq.com/security/workload-protection/agent-rules
[22]: /ja/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[23]: https://app.datadoghq.com/security/workload-protection/deployments