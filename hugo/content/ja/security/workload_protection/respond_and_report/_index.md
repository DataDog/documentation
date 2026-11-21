---
aliases:
- /ja/security/workload_protection/respond_and_report/active_protection
- /ja/security/workload_protection/respond_and_report/automated_response
- /ja/security/workload_protection/respond_and_report/response
- /ja/security/workload_protection/respond_and_report/remediation
- /ja/security/workload_protection/guide/active-protection
- /ja/security/cloud_security_management/guide/active-protection
description: Workload Protection の自動および手動の応答アクションを使用して、プロセスやコンテナを終了したり、ネットワークトラフィックをブロックしたりします。
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: ドキュメント
  text: Workload Protection の検知ルール
- link: /security/workload_protection/setup
  tag: ドキュメント
  text: Workload Protection のセットアップ
- link: /security/workload_protection/setup/advanced_configuration
  tag: ドキュメント
  text: Workload Protection Agent の構成
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: ラーニングセンター
  text: Workload Protection によるホストおよびコンテナ侵害の検出
- link: https://www.datadoghq.com/blog/stop-runtime-threats-with-workload-protection-response-actions/
  tag: ブログ
  text: Workload Protection の応答アクションでランタイムの脅威を阻止する
site_support_id: workload_security_active_protection
title: 脅威への対応
---
Workload Protection は、プロセスやコンテナの終了、またはネットワークトラフィックのブロックによって脅威に対処します。Datadog Agent は、Agent ルールが一致したときには自動的に、またはシグナルから手動でトリガーしたときに、これらのアクションを実行します。どちらの方法も Agent の強制適用に依存します。

## 応答要件 {#response-requirements}

応答アクションは Agent 内で実行されるため、自動応答と手動応答の両方が Agent 設定と適切な RBAC 権限に依存します。

### Agent の強制適用を構成する {#configure-agent-enforcement}

応答アクションは、`runtime_security_config.enforcement` の設定を `/etc/datadog-agent/system-probe.yaml` 内で使用します。強制適用はデフォルトで有効になっており、ほとんどの構成ではデフォルト設定で十分です。パラメーターの完全なリファレンスについては、[Workload Protection Agent の構成][4] を参照してください。

これらの設定により、応答アクションからバイナリを除外したり、どのルールソースがそれらをトリガーできるかを制御したりできます。デフォルトでは、どのバイナリも除外されず、`file` および `remote-config` のルールソースが許可されています。

### 応答権限 {#response-permissions}

自動応答と手動応答の両方に、特定の [RBAC 権限][5] が必要です。

- `security_monitoring_cws_agent_rules_actions` 権限により、ユーザーは自動応答を構成し、脅威に対して手動で応答できるようになります。
  - Datadog Admin ロールを持つユーザーがこの権限を含むロールを作成し、自動応答を管理するユーザー、または手動応答アクションを実行する必要があるユーザーにのみ、そのロールを割り当てる必要があります。
- **Datadog Standard** ロールでは、変更がルール上の**保護**設定を変更しない限り、ユーザーはデフォルトでカスタムルールを作成および更新できます。Standard ロールを持つユーザーは、自動応答アクションを含む無効なルールを有効にすることはできず、手動応答アクションを使用することもできません。

## 自動応答 {#automated-response}

自動応答により、Datadog Agent の検出ルールによって特定された脅威を、一致するプロセスやコンテナを終了するか、ネットワークから隔離することで、プロアクティブにブロックできます。

自動応答は、2 つのチーム間で決定を分担します。

- Security チームは、自動アクションが必要な脅威を決定します。
- DevOps チームは、どのアプリケーションとリソースが標的型防御に耐えられるだけの回復力があるかを決定します。

その結果、脅威の検出に続いて、確度の高い脅威に対する即時かつ標的を絞った緩和が行われます。

### 自動応答の可用性 {#automated-response-availability}

Agent ルールで自動応答がアクティブな場合、ルール内で確認できます。

1. [Agent 構成][2] で、ルールを開きます。
2. {{< ui >}}Automated response{{< /ui >}} がアクティブなアクションのリストに表示されていることを確認します。

自動応答がシグナルを生成したルールに適用されるかどうかをチェックするには、以下の手順を実行してください。

1. [シグナル][1] で、対象のシグナルを開いてください。
2. [{{< ui >}}Next Steps{{< /ui >}}] を表示します。一致するルールで自動応答が利用可能な場合、{{< ui >}}Proactively block threats{{< /ui >}} に {{< ui >}}Automated response enabled{{< /ui >}} が表示されます。

### Agent ルールでの自動応答の構成 {#configure-automated-response-on-agent-rules}

デフォルトでは、すべての標準 (OOTB) Agent ルールは自動応答なしでアクティブになります。プロセスを強制終了または隔離するには、自動応答アクションを手動で構成する必要があります。

#### 保護状態 {#protection-states}

Agent ルールは、次のいずれかの状態になります。

- **非アクティブ:** Agent はルールイベントを監視せず、検出結果を Datadog バックエンドに送信しません。
- **アクティブ:** これは、有効化されたルールのデフォルト設定です。Agent は有効化されたルールを監視し、[シグナル][1] に検出を表示します。
- **自動応答が有効:** Agent は有効化されたルールを監視し、一致するプロセスを終了するか、ネットワークから隔離し、[シグナル][1] に検出結果を表示します。

<div class="alert alert-info">自動応答は、自動応答が有効になった後に検出されたすべての脅威に適用されます。自動応答は遡及的ではありません。</div>

Agent ルールで自動応答を有効にするには:

1. [Agent 構成][2] で、ルールを開きます。{{< ui >}}Automated response{{< /ui >}} アクションが [{{< ui >}}Agent's actions{{< /ui >}}] セクション内に存在しない場合、そのルールでは自動応答を使用できません。
2. [{{< ui >}}Edit{{< /ui >}}] をクリックします。
3. [{{< ui >}}Add actions for the agent to follow{{< /ui >}}] の下で、{{< ui >}}Automated response{{< /ui >}} のうち 1 つを選択してください。

   {{< img src="security/workload_protection/respond_and_report/automated_response_activation.png" alt="自動応答アクションが表示されている Agent ルールの [Protection] セクション" style="width:100%;" >}}
4.  [{{< ui >}}Link the rule to policies{{< /ui >}}] の下で、そのルールが少なくとも 1 つのポリシーにおいて {{< ui >}}Active{{< /ui >}} であることを確認してください。
5. [{{< ui >}}Update Agent Rule{{< /ui >}}] をクリックします。

### ブロックされた攻撃の試行を確認する {#review-blocked-attack-attempts}

Agent ルールに対して自動応答が有効になると、ブロックされた脅威が [Signals][1] に表示されます。

自動応答は、手動で送信された応答とともに、[Response] テーブルに一覧表示されます。

## 手動応答 {#response}

手動応答を使用すると、Workload Protection が [シグナル][6] を生成した後に、シグナルサイドパネルからインフラストラクチャーを保護できます。Agent ルールでプロセスを自動的に終了させたくない場合は、手動応答を使用してください。

{{< img src="security/workload_protection/respond_and_report/response_actions.png" alt="隔離コンテナおよび強制終了コンテナのアクションと、[ISOLATED] および [KILLED] のステータスが表示されている [Response] セクション" style="width:100%;" >}}

### 手動応答の追加要件 {#additional-requirements-for-manual-response}

Workload Protection に対応する Agent を実行しているホストまたはコンテナがある各環境が、以下の要件を満たしていることを確認してください。

- Datadog **Agent 7.78** 以降が、応答アクションを実行するホストにインストールされていること。
- [**Remote Configuration**][3] が有効になっており、応答ポリシーを Agent に配信できること。
- [Agent 強制適用の構成](#configure-agent-enforcement)に記載されているとおりに、`system-probe` 内で強制適用がデフォルトで有効になっていること。

### 実行可能アクション {#available-actions}

Agent は、以下の**強制適用**アクションタイプをサポートしています。

#### 強制終了 {#kill}

スコープに応じて、悪意のあるプロセス、または侵害された**コンテナ** (cgroup) 内のすべてのプロセスを終了します。

#### ネットワークフィルター (ネットワーク隔離) {#network-filter-network-isolation}

eBPF ベースのフィルターを使用してネットワークトラフィックをブロックします (例: 特定のポートへの送信をドロップする)。すべての隔離は元に戻すことができます。

ネットワーク隔離は、eBPF **Traffic Control** 分類子および生パケットプログラムを使用します。Agent は、`system-probe.yaml` の `event_monitoring_config.network` において、必要なネットワークプローブをデフォルトで有効にします。

### アクションステータス {#action-statuses}

応答アクションが実行されると、Agent はそれを自動応答とともに Response テーブルに記録します。各アクションにはステータスがあります。以下の表は、各アクションタイプの主な結果をまとめたものです。

| ステータス | 説明 | 強制終了 | ネットワーク隔離 |
| --- | --- | --- | --- |
| `performed` | アクションは正常に完了しました。| {{< X >}} | {{< X >}} |
| `partially_performed` | 強制終了の一部は成功しましたが (例: 一部のプロセスは終了した)、すべてのターゲットを強制終了できたわけではありません。| {{< X >}} | |
| `removed` | 隔離ルールが現在のルールセットから**削除**されました (以前は存在していました)。ネットワーク隔離を**元に戻す**際に使用されます。| | {{< X >}} |
| `error` | 応答中にエラーが発生しました。アクションは失敗しましたが、プロセスまたはコンテナは実行中であるか、分離されていません。| {{< X >}} | {{< X >}} |
| `not_triggered` | Agent は対象のリソースを見つけられませんでした。コンテナまたはプロセスは、応答アクションが実行される前に終了した可能性があります。| {{< X >}} | {{< X >}} |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/workload-protection/agent-rules
[3]: /ja/agent/remote_config/?tab=configurationyamlfile
[4]: /ja/security/workload_protection/setup/advanced_configuration
[5]: /ja/account_management/rbac/permissions
[6]: /ja/security/workload_protection/investigate_and_triage/security_signals