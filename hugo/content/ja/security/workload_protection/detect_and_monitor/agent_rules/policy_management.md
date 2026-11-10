---
aliases:
- /ja/security/workload_protection/workload_security_rules/custom_rules
- /ja/security/threats/workload_security_rules/custom_rules
description: Workload Protection ポリシーを作成、デプロイ、およびスコープし、インフラストラクチャー用のカスタム Agent ルールを書き込みます。
disable_toc: false
title: ポリシー管理
---
Agent ルールは**ポリシーで構成**されています。ポリシーとは、まとめてデプロイし、**特定のインフラストラクチャーにスコープする** (ホスト、クラスターなど)、Agent ルールのセットです。

すぐに使える (OOTB) [デフォルト Agent ルール][7]に加えて、**カスタム Agent ルール**を作成し、標準の OOTB ルールだけでは Datadog が表示しないイベントを検出できます。

## ポリシー {#policies}

### ポリシーを作成する {#create-a-policy}

1. [ポリシー][3]に移動します。
2. {{< ui >}}New Policy{{< /ui >}} をクリックします。既存のポリシーを開き、{{< ui >}}Actions{{< /ui >}} をクリックして、複製することもできます。
3. ポリシーの名前を入力し、{{< ui >}}Create{{< /ui >}} をクリックします。
   新しいポリシーが作成されますが、有効化やデプロイは実行されません。
4. ポリシーをクリックして開きます。
5. {{< ui >}}New Rule{{< /ui >}} で、カスタム Agent ルールをポリシーに追加します。Agent ルール を作成するには、[カスタム Agent ルールを作成する][14]を参照してください。
6. {{< ui >}}Deployed on 0 agents{{< /ui >}} の横にある {{< ui >}}Edit{{< /ui >}} をクリックします。
7. 特定のインフラストラクチャーを対象にするには、ポリシーに[タグ][17]を追加します。
8. ポリシーをデプロイするには、{{< ui >}}Policy is disabled{{< /ui >}} の横にあるスイッチを切り替えて確定します。これには、そのページで以下に詳述されている [Remote Configuration](#remote-configuration) が使用されます。

### Datadog が管理するポリシーを現在のバージョンに固定する {#pin-a-datadog-managed-policy-to-its-current-version}

<div class="alert alert-info">ポリシーの固定は、Agent バージョン 7.71.0 以降でサポートされています。旧バージョンの Agent は、最新のポリシー更新を自動的に受信し続けます。</div>

Datadog が管理するポリシーが Datadog によって更新されると、それらは自動的にインフラストラクチャーにデプロイされます。

新しいポリシーバージョンがインフラストラクチャーにデプロイされるタイミングを管理するため、ポリシーを現在のバージョンに固定できます。ポリシーバージョンを固定すると、Datadog が新しいポリシーバージョンをリリースしたときにポリシーの更新が自動的に展開されるのを防ぐことができます。

ポリシーを固定するには、以下の手順を実行してください。

1. [ポリシー][3]に移動します。
2. Datadog が管理するポリシーをクリックします。
3. {{< ui >}}Version{{< /ui >}} で、固定オプションをクリックします。
   インフラストラクチャーでバージョン 7.71.0 未満の Agent が実行されている場合、古い Agent の警告が表示されます。[Fleet Automation][18] で Agent バージョンを表示し、アップグレードしてください。
4. {{< ui >}}Pin{{< /ui >}} をクリックします。ポリシーバージョンの固定を解除するには、固定オプションを再度クリックしてください。

### 競合ルール {#conflicting-rules}

同じホストにデプロイされた 2 つのポリシーに異なるステータス (アクティブおよび非アクティブ) で同じルールが含まれている場合、そのルールはアクティブと見なされます。

### タグを適用する {#apply-tags}

タグは、環境、クラスター、ホストなど、ポリシーが適用される場所を定義します。ポリシーにタグを追加すると、ルールの適用先をインフラストラクチャーの一部に限定できます。

1. [Agent 構成][6]に移動します。
2. ポリシーを開き、{{< ui >}}Edit{{< /ui >}} をクリックします。
3. タグを入力し、{{< ui >}}Apply{{< /ui >}} をクリックします。ポリシーが有効な場合、そのポリシーはタグのターゲットに適用されます。

タグを追加すると、Datadog はタグのターゲットとなる Agent の数と、各 Agent を実行しているインフラストラクチャーを表示します。例: `Tags match 144 agents`。

## カスタム Agent ルールを作成する {#create-a-custom-agent-rule}

カスタム Agent ルールを作成し、カスタムポリシーの一部としてデプロイできます。その後、カスタム[検出ルール][19]を定義する際に、カスタム Agent ルールを参照し、式パラメーターを追加します。
カスタム Agent ルールは、デフォルトのポリシーとは別のカスタムポリシーで Agent にデプロイされます。カスタムポリシーには、カスタム Agent ルールのみが含まれます。

1. [Agent 構成][6]に移動します。
2. ポリシーを作成するか、既存のポリシーを開きます。
3. ポリシーを開いた状態で、{{< ui >}}Actions{{< /ui >}} で {{< ui >}}Manual rule creator{{< /ui >}} を選択し、Agent ルールエディターを開きます。同じエディターは、Datadog の [Agent ルール][21]ページからも利用できます。Agent ルールと脅威検出ルールの両方の作成手順を案内する {{< ui >}}Assisted rule creator{{< /ui >}} ウィザードを使用する場合は、[カスタム Agent ルールと検出ルールを同時に作成する][20]を参照してください。
4. ルールの {{< ui >}}Name{{< /ui >}} と {{< ui >}}Description{{< /ui >}} を入力します。
5. {{< ui >}}Expression{{< /ui >}} で、[Datadog Security Language (SECL)][15] を使用して一致条件を定義します。
6. (任意) ルールがイベントに一致したときに実行する変数やアクションを追加します。[変数とアクション][22]を参照してください。
7. {{< ui >}}Create Agent Rule{{< /ui >}} をクリックします。ポリシーに戻ります。

カスタム Agent ルールを作成すると、その変更は他の保留中のルール更新と一緒に保存されます。変更を環境に適用するには、更新されたカスタムポリシーを Agent にデプロイしてください。

## ポリシーを有効化してデプロイする {#enable-and-deploy-policies}

有効化されたポリシーは、タグによって識別されたインフラストラクチャーのターゲットにそのルールを適用します。ポリシーを有効化することは、それをデプロイすることと同じです。

Datadog UI の **Remote Configuration** を使用して、ポリシータグで指定されたホスト (すべてのホストまたは定義されたホストのサブセット) にカスタムポリシーを自動的にデプロイするか、各ホストの Agent にポリシーを**手動でデプロイ**することができます。

### Remote Configuration {#remote-configuration}

**Remote Configuration** は、Datadog が Agent にポリシーを自動的に配信する方法です。これは安全なメカニズムを使用し、署名と認証が済んだポリシーのみが Agent にプッシュされることを保証します。Remote Configuration を使用してポリシーをデプロイするには、[ポリシーを作成する]に記載された手順に従ってください。

#### デプロイ戦略 {#deployment-strategies}

Remote Configuration を使用して Agent のルールやポリシーに変更をロールアウトする場合、2 つの戦略から選択できます。すべてのホストに変更を即座にデプロイする戦略と、管理されたデプロイを使用して段階的にデプロイする戦略です。[デプロイページ][23]でデプロイを監視します。

##### 即時デプロイ {#deploy-instantly}

即時デプロイは、段階的な検証を行わずに、スコープ内のすべてのホストに更新済みポリシーを同時に送信します。これは通常数分で実行でき、変更をすぐに全体に適用したい場合に最適です。

{{< ui >}}Deploy instantly{{< /ui >}} を選択し、{{< ui >}}Update Policy{{< /ui >}} をクリックします。[デプロイページ][23]から進捗状況を追跡します。

##### 管理されたデプロイ {#managed-deployment}

管理されたデプロイでは、変更を段階的にロールアウトするため、インフラストラクチャー全体に適用する前にホストのサブセットで検証できます。

1. ポリシーまたはルールを編集する際は、{{< ui >}}Start a managed deployment{{< /ui >}} を選択します。ポリシーまたはルールがすでに管理されたデプロイでロールアウトされている場合は、{{< ui >}}Start from your last deployment{{< /ui >}} を選択して前回のデプロイのパラメーターを再利用します。ルール変更の場合、再利用されるパラメーターはそのルールを含むポリシーの最後のデプロイ時のものです。
2. {{< ui >}}Customize deployment roll-out plan{{< /ui >}} でデプロイのスコープを設定し、最大 10 個のステージを構成して変更を段階的にロールアウトします。各ステージを {{< ui >}}By percentage of hosts in scope{{< /ui >}} または {{< ui >}}By host tags{{< /ui >}} で定義します。
3. {{< ui >}}Set up monitoring and delay time{{< /ui >}} で、デプロイ中にチェックするモニターを 1 つ以上選択します。デプロイの進行中にモニターがアラートを発すると、ロールアウトは一時停止します。その後、次のステージに進むまで待機する遅延時間を設定します。
4. {{< ui >}}Set deployment window{{< /ui >}} で、デプロイを実行できる曜日、時間、タイムゾーンを設定します。デプロイが期間の終了時刻を超える場合は、一時停止して次の期間で再開します。
5. (オプション) {{< ui >}}Add a description{{< /ui >}} で、デプロイの説明を追加します。
6. {{< ui >}}Update Policy{{< /ui >}} をクリックしてロールアウトを開始します。[デプロイページ][23]から進捗状況を追跡します。

### 手動デプロイ {#manual-deployment}

**手動デプロイ**では、各 Agent にポリシーファイルを自分でインストールします。Datadog UI でポリシーとそのルールを作成し、生成されたファイルを**ダウンロード**できます。ポリシーの構文をすでに知っている場合は、`.policy` ファイルを自分で作成してください。その後、以下で説明されているように、ポリシーを実行するすべての Agent にそのファイルをアップロードまたは同期します。

1. {{< ui >}}Agent Configuration{{< /ui >}} ページで、ポリシーを開きます。
2. アクションで、{{< ui >}}Download Policy{{< /ui >}} を選択します。

次に、以下の手順でポリシーファイルを各ホストにアップロードします。

{{< tabs >}}
{{% tab "ホスト" %}}

`default.policy` ファイルを `/etc/datadog-agent/runtime-security.d`フォルダ のターゲットホストにコピーします (すべての `.policy` ファイルが含まれます)。ファイルには、ホスト上の `root` ユーザーに対する `read` および `write` アクセス権が必要です。

変更を適用するには、次のうちの **1 つ**を実行します、

-   ランタイムポリシーを再度読み込みます (Agent の完全な再起動は不要)。

    ```bash
    sudo /opt/datadog-agent/embedded/bin/system-probe runtime policy reload
    ```

-   または、[Datadog Agent][27] を再起動します。

[27]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. `default.policy` を含む ConfigMap を作成します (例: `kubectl create configmap jdefaultpol --from-file=default.policy`)。
2. `datadog.securityAgent.runtime.policies.configMap` を使用して ConfigMap (`jdefaultpol`) を `values.yaml` に追加します。

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

3. Helm チャートを `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog` でアップグレードします。

    **注:** `default.policy` にさらなる変更を加える必要がある場合は、`kubectl edit cm jdefaultpol` を使用するか、configMap を `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -` に置き換えることができます。

{{% /tab %}}
{{< /tabs >}}

## デフォルトの Agent ルールを無効にする {#disable-default-agent-rules}

1. Agent ルールを無効にするには、[{{< ui >}}Agent Configuration{{< /ui >}}][6] ページに移動し、そのルールを使用しているポリシーを選択します。
2. ポリシー内で、ルールを開きます。
3. ステータスを {{< ui >}}Inactive{{< /ui >}} に設定します。
4. {{< ui >}}Save Changes{{< /ui >}} をクリックします。

[ルール構成][21]からルールを削除すると、そのルールが含まれていた**すべてのポリシー**からも削除されます。

## カスタムルール管理のための RBAC {#rbac-for-custom-rule-management}

カスタムルールの RBAC に使用する重要な[ロールと権限][11]を以下に示します。

-   `security_monitoring_cws_agent_rules_actions` 権限は、ルールでブロックモードを有効にするために使用される[自動応答][12]機能をオンにして構成するために使用できます。
    -   `security_monitoring_cws_agent_rules_actions` 権限を使用するには、Datadog Admin ロールを持つユーザーが `security_monitoring_cws_agent_rules_actions` 権限を含むロールを作成し、自動応答を管理するユーザーのみをこのロールに追加する必要があります。
-   {{< ui >}}Datadog Standard{{< /ui >}} ロールを使用すると、オペレーションによってルールの**保護**設定が変更されない限り、ユーザーはデフォルトでカスタムルールを作成/更新できます。

[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ja/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /ja/security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules
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