---
further_reading:
- link: synthetics/dashboards/test_summary
  tag: ドキュメント
  text: CSM Threats 検出ルール
title: Active Protection で暗号マイニングの脅威を積極的にブロック
---

<div class="alert alert-danger">Please contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> to enable Active Protection.</div>

<div class="alert alert-info">CSM Threats Active Protection はベータ版です。</div>

このトピックでは、CSM Threats の **Active Protection** 機能を使用して暗号マイニングの脅威を自動的にブロックする方法を説明します。

デフォルトでは、Agent のすぐに使える[脅威検出ルール][4]がすべて有効になっており、暗号マイニングの脅威を積極的に監視しています。

Active Protection を使用すると、Datadog Agent の脅威検出ルールによって特定された暗号マイニングの脅威を積極的にブロックし、終了させることができます。

Active Protection は、脅威検出と標的型対応を合理化し、リスクを削減することで、DevSecOps およびセキュリティチームが進化する暗号マイニングの脅威に効果的に対処できるようにします。

- セキュリティチームは自動アクションが必要な脅威を決定します。
- DevOps チームは、どのアプリケーションとリソースが標的型防御に耐えられるだけの回復力があるかを決定します。

最終的な結果は、暗号マイニングの脅威を検出し、高信頼性かつ真陽性の攻撃に対して即座に精密な緩和措置を講じることです。

## 保護オプション

Agent ルールには 3 つのオプションがあります。

- **監視:** Active Protection が有効かどうかに関係なく、有効なルールのデフォルト設定です。Agent は有効化されたルールを監視し、[シグナル][1]に検出結果を表示します。
- **ブロック:**
  - Active Protection が有効な場合に使用できます。高信頼性かつ真陽性のすぐに使えるルールの一部においてブロックが可能です。
  - Agent は有効化されたルールを監視し、対応するアクションを即座に終了し、[シグナル][1]に検出結果を表示します。
- **無効:** Agent はルールイベントを監視せず、検出結果を Datadog バックエンドに送信しません。

<div class="alert alert-info">ブロックが有効化された後に検出されたすべての脅威に対してブロックが適用されます。ブロックは遡及的ではありません。</div>

## Active Protection の利用可否

Active Protection は組織レベルで有効です。

<div class="alert alert-info">Active Protection のブロック機能は、すぐに使える Agent ルールの一部でのみ利用可能です。Agent ルールの監視は、Active Protection が有効かどうかに関係なく実行されます。</div>

お客様の組織で Active Protection がすでに有効かどうかを確認するには、[Agent 構成][2]にアクセスしてください。Active Protection が有効になっている場合、Agent ルールリストに **Protection** 列が表示されます。

{{< img src="security/cws/guide/protection-column.png" alt="保護列に、組織で Active Protection が有効であることが示されています" style="width:100%;" >}}

暗号マイニングルールで Active Protection が利用可能な場合、**Protection** 列に **Monitoring** または **Blocking** が表示されます。

**Protection** 列に **Monitoring** または **Blocking** が表示されない場合、その暗号マイニングルールでは Active Protection がまだ利用できません。

Active Protection が有効で、シグナルを生成した暗号マイニングルールに適用される場合、次の操作で確認できます。

1. [シグナル][1]でシグナルを開きます。
2. シグナル内で **Next Steps** を表示します。
   - Active Protection が有効な場合、**Proactively block threats** に **Active Protection Enabled** が表示されます。
   - Active Protection が有効でない場合、**Active Protection Enabled** は表示されません。

Agent の暗号マイニングルールで Active Protection が有効かつ利用可能な場合、ルールを確認することで確認できます。

1. [Agent 構成][2]で暗号マイニングルールを選択します。
2. 暗号マイニングルールで、Active Protection が有効かつ利用可能な場合、**Protection** セクションがあります。

## Active Protection の有効化

Active Protection を有効にすると、Datadog 組織全体の Active Protection 機能が有効になります。Active Protection は個々のユーザーに限定されません。

デフォルトでは、すべてのすぐに使える Agent 暗号マイニングルールは監視状態になっています。Active Protection を有効にしても、デフォルトの状態が直ちに変更されるわけではありません。Active Protection を有効にすることで、暗号マイニングルールの状態を監視からブロックに変更できます。

そのため、Active Protection を有効にすると、脅威検出の状態がすぐに変更されることを心配する必要はありません。

Active Protection を有効にするには

1. CSM [Agent 構成][2]ルールに移動します。
2. **Enable Active Protection** を選択します。

   {{< img src="security/cws/guide/enable-active-protection.png" alt="Enable Active Protection ボタン" style="width:100%;" >}}

Active Protection が有効になると、Agent 構成ルールリストに **Protection** 列が表示されます。

**Protection** 列は、ルールが **Monitoring** 状態であるか **Blocking** 状態であるかを示します。Active Protection を初めて有効にした場合、ルールは監視状態のみです。ブロックオプションは手動で構成する必要があります。

### Active Protection の無効化

Active Protection を有効にした後、各 Agent 構成ルールで無効にできます。

## Agent ルールで検出された脅威のブロック

Active Protection を有効にした後、Agent 暗号マイニングルールで **Blocking** オプションを構成すると、Agent は対応する暗号マイニングアクションを即座に終了します。

Agent ルールでブロックを有効にするには

1. [Agent 構成][2]で、**Protection** 列に **Monitoring** がある暗号マイニングルールを開きます。**Protection** 列に **Monitoring** または **Blocking** がない場合、そのルールで Active Protection はまだ使用できません。
2. Agent ルールの **Protection** で、**Blocking** を選択します。

   {{< img src="security/cws/guide/protection-blocking-option.png" alt="ブロックオプションを表示する Agent ルールの Protection セクション" style="width:100%;" >}}
3. **Where** で、**Everywhere** または **Custom** を選択します。これらのオプションの詳細については、以下の [Agent ルールの範囲][3]を参照してください。
4. **Save Changes** を選択します。
5. Agent 構成で、**Deploy Agent Policy** を選択します。


### Agent ルールの範囲

Active Protection を有効にした後に Agent 暗号マイニングルールを作成または編集する場合、ルールの **Protection** 設定で **Blocking** を選択できます。

**Blocking** を選択すると、**Everywhere** および **Custom** オプションを使用して、Datadog がルールを適用する場所を選択できます。

#### Everywhere

ルールは、すべてのサービス、ホスト、イメージに適用されます。

#### Custom

**Custom** では、サービスまたはタグを指定して、ブロック保護を適用する場所の式を自動的に生成できます。

<div class="alert alert-info">式に一致しないサービスまたはイメージはブロックされませんが、監視は継続されます。</div>

サービスやタグを使用して式を生成できます。Datadog は、指定したサービスやタグを使用してルールを照合します。

- **サービス:** 1 つ以上のサービス名を入力します。ワイルドカードを使用できます。例えば、`a*` と入力すると、`process.envp in ["DD_SERVICE=a*"]` という式が生成されます。
- **タグ:** 1 つ以上のコンテナイメージのタグを入力します。複数のタグを入力した場合、**Protection** を適用するにはすべてのタグが一致する必要があります。オプションは 2 つあります。
  - `image_tag`: イメージタグのみ。例えば `stable-perl`。
  - `short_image`: タグなしのイメージ名。例えば `nginx`。
  - 例えば、`ghcr.io/MY_NAMESPACE/MY_IMAGE:2.5` のような Github コンテナレジストリのイメージは、次のように参照できます。
    - `image_tag`: `2.5`。
    - `short_image`: `MY_IMAGE`。

## ブロックされた攻撃の例

Active Protection が有効化され、Agent ルールで **Blocking** に設定されると、ブロックされた脅威が[シグナル][1]に表示されます。

ブロックされた脅威のシグナルには、`SECURITY RESPONSE` と `The malicious process <THREAT NAME> has automatically been killed.` というメッセージが含まれます。

{{< img src="security/cws/guide/active-protection-signal-messages.png" alt="シグナルメッセージ" style="width:100%;" >}}


[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[3]: #scoping-the-agent-rule
[4]: /ja/security/threats/workload_security_rules