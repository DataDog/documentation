---
aliases:
- /ja/bits_ai/bits_ai_security_analyst
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
  tag: ブログ
  text: Bits AI Security Analyst で Cloud SIEM 調査を自動化
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: ブログ
  text: 'Cloud SIEM の新機能: AI を活用した調査、強化された脅威インテリジェンス、スケーラブルなセキュリティオペレーション'
title: Bits Security Analyst
---
## 概要 {#overview}

Bits Security Analyst は、Cloud SIEM のシグナルをエンドツーエンドで調査する自律型 AI エージェントです。セキュリティシグナルとログをクエリし、データに基づく推論を使用して、セキュリティエンジニアが脅威アラートを調査し、各アラート信号の判定に関する推奨を行うのを支援します。手動の労力とアナリストの疲労を軽減することで、Bits Security Analyst はセキュリティオペレーションをよりスムーズで効率的にします。

### 主な機能 {#key-capabilities}

Bits Security Analyst の調査は自律的です。検出ルールが有効になっている場合、Bits AI はそれに関連するシグナルを自律的に調査します。

[Cloud SIEM シグナルエクスプローラー][5]では、{{< ui >}}Bits Security Analyst{{< /ui >}} タブをクリックして、Bits AI が調査したシグナルのみを表示できます。Severity 列で Bits AI のステータスが Investigating と表示され、シグナルが Benign または Suspicious とマークされるまで続きます。

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="Bits Security Analyst タブの Cloud SIEM シグナルエクスプローラー" style="width:100%;" >}}

Bits AI の調査がある行をクリックすると、Bits AI Investigation のサイドパネルが開きます。

{{< img src="bits_ai/bits_security_analyst_example.png" alt="「Okta phishing detection with FastPass origin check」というタイトルの Bits Security Analyst の例の検出。" style="width:100%;" >}}

サイドパネルで、Bits AI の調査結果を確認できます。以下が含まれます。
- 全体的な結論
- その結論に至るために使用された主要な証拠
- Bits AI のデータクエリを示す調査ステップ。埋め込まれた結果と完全なクエリへのリンクを含む
- 各調査ステップに関する分析

サイドパネルから直接追加のステップを行うこともできます。
- 事前に入力された Bits AI 調査結果でケースを作成する
- SOAR ブループリントを使用してワークフローを実行する
- インシデントを宣言する
- ルール抑制を追加する
- シグナルをアーカイブするか、通常の Cloud SIEM インターフェースでシグナルを表示する
- Bits AIの分析にフィードバックを提供する

さらに、Cloud SIEM の通知を使用して新しいシグナルアラートを Slack や Jira に送信する場合、Bits AI は自動的にそれらの通知を更新します。Bits AI の調査結果を示す返信が含まれており、完全な調査へのリンクも付いています。

### サポート対象のソース {#supported-sources}

Bits AI は、以下のセキュリティログソースに対して調査を実行できます。
- Amazon GuardDuty
  - [調査結果カテゴリー][6]には、異常な IAM の動作、EC2 の資格情報の流出と悪用、S3 データの露出、CloudTrail または S3 の防御回避、IAM 資格情報と S3 データの侵害に関連する攻撃シーケンスが含まれます。
- AWS CloudTrail
- Azure
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitHub
- Snowflake
- SentinelOne
- メールフィッシング

## Bits Security Analyst のセットアップ {#set-up-bits-security-analyst}

### 前提条件 {#prerequisites}

Bits Security Analystを使用するには
- 組織がレガシーバージョンではない Cloud SIEM を使用していることを確認します。サポートが必要な場合は、[Datadog サポート][1]までお問い合わせください。
- Bits Security Analyst をセットアップするには、**Bits Security Analyst Config Write** [権限][2]が必要です。
- 調査を表示するには、**14 日以上**のログ履歴が必要です。ログ履歴が短い場合、Bits Security Analyst をセットアップすることはできますが、十分の履歴が揃うまで調査は表示されません。

### セットアップ {#setup}

Bits Security Analyst を有効にすると、Datadog はカスタムルールを含むルールを分析し、それに関連するシグナルを確実に調査できるかどうかを判断します。中程度の重大度以上のすべての対象ルールについて、シグナルの自律的な調査を開始します。

ルールの対象は、Datadog がログソースの調査機能を構築しているかどうか、Agent が特定のルールを調査できるかどうかに依存します。評価する新しいカスタムルールがある場合や、対象でないルールについてご質問がある場合は、[Datadog サポート][1]にお問い合わせください。

1. Datadog で、{{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3] に移動します。
1. トグルを {{< ui >}}Enable Bits Security Analyst{{< /ui >}} に切り替えます。追加の設定が表示されます。
1. (オプション) Bits Security Analyst が自動的にシグナルを調査するルールと重大度を構成します。これを行う方法は 2 つあります。
   - 個別のルールの調査を構成するには、{{< ui >}}Rule Settings{{< /ui >}} をクリックします。調査されるシグナルの最小重大度を変更し、調査のための個別のルールを有効または無効にできます。
   - {{< ui >}}Query Filter{{< /ui >}}をクリックしてシグナルクエリフィルターを記述すれば、Bits Security Analyst がフィルターに一致する信号のみを調査します。
1. 一部のログソースは、Datadog にないログ、テレメトリ、またはその他のデータにアクセスして調査を実行または強化するための資格情報を必要とします。資格情報を追加するには、{{< ui >}}Edit credentials{{< /ui >}} をクリックします。開いた {{< ui >}}Select or Add Connection{{< /ui >}} ウィンドウで、プロンプトに従って Action Catalog から[既存のコネクション][4]を選択するか、コネクションを追加します。Datadog は、Action Catalog を使用してすべての資格情報を安全に保存し、制限します。
   
   一部のログソースでは追加のセットアップが必要なため、HTTP コネクションを作成できます。以下に例を示します。
   {{< collapse-content title="SentinelOne を構成する" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>SentinelOne で、API トークンを作成する権限があることを確認します。S1 API サービスユーザーを作成し、そのユーザーに {{< ui >}}Viewer{{< /ui >}} ロールを割り当てます。</li>
     <li>Datadog の {{< ui >}}Select or Add Connection{{< /ui >}} ウィンドウで、ドロップダウンから {{<  ui >}}New Connection{{< /ui >}} を選択し、{{< ui >}}HTTP{{< /ui >}} タイルをクリックします。</li>
     <li>以下の情報を追加します。
       <ul>
         <li>Datadog では、{{< ui >}}Description{{< /ui >}} フィールドにトークンの有効期限を追加して簡単にアクセスできるようにしておくことを推奨しています。</li>
         <li> {{< ui >}}Base URL{{< /ui >}} フィールドで、SentinelOne 管理コンソールの URL を入力します。</li>
         <li>{{< ui >}}Token Auth{{< /ui >}}:
           <ol>
             <li> {{< ui >}}Token Name{{< / ui >}} フィールドにトークンの名前を入力し、{{< ui >}}Token Value{{< /ui >}} フィールドに API トークンを入力します。</li>
             <li>{{< ui >}}Headers{{< /ui >}} タブで、{{< ui  >}}Request Headers{{< /ui >}} の下にある {{< ui >}}Add a Header{{< /ui >}} をクリックします。以下の 2 つのヘッダーを追加します。
               <table>
                 <thead>
                   <tr>
                     <th>名前</th>
                     <th>値</th>
                   </tr>
                 </thead>
                 <tr>
                   <td><code>Authorization</code></td>
                   <td><code>Bearer</code> スペースの後に、定義した {{< ui >}}Token Name{{< /ui >}} を挿入</td>
                 </tr>
                 <tr>
                   <td><code>Content-Type</code></td>
                   <td><code>application/json</code></td>
                 </tr>
               </table>
             </li>
           </ol>
       </ul>
     </li>
     <li>{{< ui >}}Next, Confirm Access{{< /ui >}} をクリックしてコネクションを確認します。</li>
   </ol>
   {{< /collapse-content >}}

## Bits Security Analyst を無効にする {#disable-bits-security-analyst}

1. Datadog で、{{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3] に移動します。
1. ページ下部までスクロールします。{{< ui >}}Disable Bits Security Analyst{{< /ui >}} で、{{< ui >}}Enabled{{< /ui >}} のトグルをオフにします。
   <div class="alert alert-warning">Bits Security Analyst を無効にすると、すべての構成が完全にリセットされます。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: /ja/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst
[4]: /ja/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html