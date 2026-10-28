---
description: Workload Protection のシグナルについて、シグナルのサイドパネルからトリアージ、エスカレーション、自動化、および対応を行います。
disable_toc: false
title: セキュリティシグナルのトリアージと対応
---
Workload Protection のシグナルを確認した後、シグナルのサイドパネルの {{< ui >}}Next Steps{{< /ui >}} セクションを使用して、脅威のトリアージ、エスカレーション、自動化、または対応を行います。

Workload Protection のシグナルは、他の Datadog Security シグナルと同じトリアージおよび対応ワークフローを共有します。Cloud SIEM、App and API Protection、および Workload Protection 全体にわたるセキュリティシグナルの概要については、[検出ルール][1]および統合された [Security Signals Explorer][2] を参照してください。

## シグナルをトリアージする {#triage-a-signal}

シグナルを詳細な調査のためにユーザーに割り当ててトリアージできます。割り当てられたユーザーは、シグナルのステータスを更新してレビューを追跡できます。

<div class="alert alert-info">セキュリティシグナルを変更するには、 <code>security_monitoring_signals_write</code> 権限が必要です。Workload Protection で利用可能な Datadog のデフォルトロールおよび詳細なロールベースのアクセス制御権限の詳細については、<a href="/account_management/rbac/permissions/#cloud-security-platform">ロールベースのアクセス制御</a>を参照してください。</div>

1. [Signals Explorer][3] で、セキュリティシグナルを選択します。
2. {{< ui >}}Triage{{< /ui >}} セクションで {{< ui >}}Assign Signal{{< /ui >}} をクリックし、ユーザーを選択します。
3. セキュリティシグナルのステータスを更新するには、トリアージステータスのドロップダウンメニューをクリックしてステータスを選択します。デフォルトのステータスは {{< ui >}}Open{{< /ui >}} です。
    - {{< ui >}}Open{{< /ui >}}: シグナルはまだ解決されていません。
    - {{< ui >}}Under Review{{< /ui >}}: シグナルは現在調査中です。{{< ui >}}Under Review{{< /ui >}} の状態から、必要に応じてシグナルを {{< ui >}}Archived{{< /ui >}} または {{< ui >}}Open{{< /ui >}} に移動できます。
    - {{< ui >}}Archived{{< /ui >}}: シグナルの原因となった検出は解決されました。{{< ui >}}Archived{{< /ui >}} の状態から、シグナルが最初に検出されてから 30 日以内であれば、シグナルを {{< ui >}}Open{{< /ui >}} に戻すことができます。

## ケースを作成する {#create-a-case}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Case Management は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

[Case Management][4] を使用して、セキュリティシグナルを追跡、トリアージ、調査します。

1. [Signals Explorer][3] で、セキュリティシグナルを選択します。
2. シグナルのサイドパネルで、{{< ui >}}Next Steps{{< /ui >}} の下にある {{< ui >}}Respond{{< /ui >}} セクションを見つけて {{< ui >}}Create Security Case{{< /ui >}} をクリックします。シグナルを既存のケースに追加するには、{{< ui >}}Create Security Case{{< /ui >}} の横にあるドロップダウンを開いて {{< ui >}}Add to existing Security Case{{< /ui >}} を選択します。
3. タイトルと説明 (オプション) を入力します。
4. {{< ui >}}Create Case{{< /ui >}} をクリックします。

## インシデントを宣言する {#declare-an-incident}

[Incident Management][5] を使用して、セキュリティシグナルのインシデントを作成します。

1. [Signals Explorer][3] で、セキュリティシグナルを選択します。
2. シグナルのサイドパネルの {{< ui >}}Respond{{< /ui >}} セクションで、{{< ui >}}More actions{{< /ui >}} を展開します。
3. {{< ui >}}Escalate{{< /ui >}} で次のいずれかを行います。
    - インシデントを作成するには、{{< ui >}}Declare Incident{{< /ui >}} をクリックします。重要度レベルやインシデントコマンダーなどの詳細を指定してインシデントを構成し、{{< ui >}}Declare Incident{{< /ui >}} をクリックします。
    - シグナルを既存のインシデントに追加するには、{{< ui >}}Declare Incident{{< /ui >}} の横にあるドロップダウンを開いてインシデントを選択し、{{< ui >}}Confirm{{< /ui >}} をクリックします。

## ワークフローを実行する {#run-a-workflow}

[Workflow Automation][7] を使用して、セキュリティシグナルのワークフローを手動でトリガーします。詳細については、[セキュリティシグナルからワークフローをトリガーする][6]を参照してください。

1. [Signals Explorer][3] で、セキュリティシグナルを選択します。
2. シグナルのサイドパネルの {{< ui >}}Respond{{< /ui >}} セクションで、{{< ui >}}Run Workflow{{< /ui >}} をクリックします。
3. ワークフローモーダルで、実行するワークフローを選択します。リストに表示されるには、ワークフローにセキュリティトリガーが必要です。ワークフローによっては、追加の入力パラメータの入力が必要になる場合があります。
4. {{< ui >}}Run Workflow{{< /ui >}} をクリックします。

または、シグナルのサイドパネルの {{< ui >}}Workflows{{< /ui >}} タブをクリックして、シグナルに対してどのワークフローがトリガーされたかや実行が推奨されるワークフローを確認します。

## コンテナまたはプロセスの強制終了{#kill-containers-or-processes}

シグナルのサイドパネルから、悪意のあるプロセスまたはコンテナを直接終了できます。{{< ui >}}Respond{{< /ui >}} の {{< ui >}}Kill Containers or Processes{{< /ui >}} をクリックします。

このアクションを実行するには、Datadog Agent でエンフォースメントが有効になっている必要があります。Agent は、構成されたスコープに応じて、ターゲットのプロセス、または侵害されたコンテナ内のすべてのプロセスを終了します。要件、構成、およびアクションのステータスについては、[手動による対応][8]を参照してください。

## ネットワーク分離{#network-isolation}

シグナルのサイドパネルから、侵害されたプロセスまたはコンテナをネットワークから分離できます。{{< ui >}}Respond{{< /ui >}} の {{< ui >}}Network Isolation{{< /ui >}} をクリックし、影響を受けるワークロードのネットワークトラフィックを eBPF ベースのフィルターを使用してブロックします。

ネットワーク分離には、Agent でエンフォースメントが有効になっていることと、Agent がデフォルトで有効にするネットワークプローブが必要です。要件および利用可能なエンフォースメントオプションについては、[手動による対応][8]を参照してください。

[1]: /ja/security/detection_rules/
[2]: https://app.datadoghq.com/security/signals
[3]: https://app.datadoghq.com/security/workload-protection/signals
[4]: /ja/incident_response/work_management/
[5]: /ja/incident_response/incident_management/
[6]: /ja/security/cloud_security_management/workflows
[7]: /ja/service_management/workflows
[8]: /ja/security/workload_protection/respond_and_report/#response