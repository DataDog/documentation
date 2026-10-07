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
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: ブログ
  text: Bits Security Analyst を使用してクラウド認証情報の侵害を調査する方法
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: ブログ
  text: Datadog を使用して Google Cloud AI スタックを評価、最適化、保護する
title: Bits Security Analyst
---
## 概要 {#overview}

Bits Security Analyst は、Cloud SIEM のシグナルをエンドツーエンドで調査する自律型 AI エージェントです。セキュリティシグナルとログをクエリし、データに基づく推論を使用して、セキュリティエンジニアが脅威アラートを調査し、各アラート信号の判定に関する推奨を行うことを支援します。手動の労力とアナリストの疲労を軽減することで、Bits Security Analyst はセキュリティオペレーションをよりスムーズで効率的にします。

### 主な機能 {#key-capabilities}

Bits Security Analyst の調査は自律的です。検出ルールが有効になっている場合、Bits AI はそれに関連するシグナルを自律的に調査します。

[Cloud SIEM シグナルエクスプローラー][5] では、{{< ui >}}Bits Security Analyst{{< /ui >}} タブをクリックして、Bits AI が調査したシグナルのみを表示できます。Severity 列で Bits AI のステータスが Investigating と表示され、シグナルが Benign または Suspicious とマークされるまで続きます。

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="Bits Security Analyst タブの Cloud SIEM シグナルエクスプローラー" style="width:100%;" >}}

Bits AI の調査がある行をクリックすると、Bits AI 調査のサイドパネルが開きます。

{{< img src="bits_ai/bits_security_analyst_example.png" alt="「Okta phishing detection with FastPass origin check」というタイトルの Bits Security Analyst の例の検出。" style="width:100%;" >}}

サイドパネルで、Bits AI の調査結果を確認できます。以下が含まれます。
- 全体的な結論
- その結論に至るために使用された主要な証拠
- 問題を修復するための推奨される次のステップ、または特定の属性を持つ検出ルールを抑制するステップ
- Bits AI のデータクエリを示す調査ステップ。埋め込まれた結果と完全なクエリへのリンクを含む
- 各調査ステップに関する分析

サイドパネルから直接追加のステップを行うこともできます。
- 事前に入力された Bits AI 調査結果で作業項目を作成する
- SOAR ブループリントを使用してワークフローを実行する
- インシデントを宣言する
- ルール抑制を追加する
- シグナルをアーカイブするか、通常の Cloud SIEM インターフェイスでシグナルを表示する
- Bits AI の分析にフィードバックを提供する

さらに、Cloud SIEM の通知を使用して新しいシグナルアラートを Slack や Jira に送信する場合、Bits AI は自動的にそれらの通知を更新します。Bits AI の調査結果を示す返信が含まれており、完全な調査へのリンクも付いています。

### サポート対象のソース {#supported-sources}

Bits AI は、以下のセキュリティログソースに対して調査を実行できます。
- Amazon GuardDuty。サポートされている場合、[検出タイプ][6] は以下をカバーします。
  - 異常な IAM 認証情報および侵害された IAM 認証情報
  - EC2 およびリソースの認証情報の流出と悪用
  - Bedrock のログ記録の変更、異常なモデル呼び出し、コストハーベスティング、および直接的なプロンプトインジェクション
  - 侵害された EKS および ECS クラスターの攻撃シーケンス
  - Kubernetes 認証情報へのアクセス、異常な動作、実行、権限昇格、永続化、ポリシー変更、および悪意のある呼び出し元
  - S3 の異常な動作、データ漏洩、悪意のある呼び出し元、およびペネトレーションテストのアクティビティ
  - CloudTrail または S3 の防御回避
  - IAM 認証情報の侵害と S3 データの侵害を相関させる攻撃シーケンス
- AWS CloudTrail
- Azure
- Cloudflare
- CrowdStrike
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitLab
- GitHub
- JumpCloud
- Salesforce
- Slack
- Snowflake
- SentinelOne
- Windows
- メールフィッシング

## Bits Security Analyst のセットアップ {#set-up-bits-security-analyst}

### 前提条件 {#prerequisites}

Bits Security Analyst を使用するには、以下の手順に従います。
- 組織がレガシーバージョンではない Cloud SIEM を使用していることを確認します。サポートが必要な場合は、[Datadog サポート][1] までお問い合わせください。
- Bits Security Analyst をセットアップするには、**Bits Security Analyst Config Write** [権限][2] が必要です。
- 調査を表示するには、**14 日以上**のログ履歴が必要です。ログ履歴が短い場合、Bits Security Analyst をセットアップすることはできますが、十分の履歴が揃うまで調査は表示されません。

### セットアップ {#setup}

Bits Security Analyst を有効にすると、Datadog はカスタムルールを含むルールを分析し、それに関連するシグナルを確実に調査できるかどうかを判断します。重大度が中程度以上のすべての対象ルールについて、シグナルの自律的な調査を開始します。

ルールの対象は、Datadog がログソースの調査機能を構築しているかどうか、Agent が特定のルールを調査できるかどうかに依存します。評価する新しいカスタムルールがある場合や、対象でないルールについてご質問がある場合は、[Datadog サポート][1] にお問い合わせください。

1. Datadog で、{{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3] に移動します。
1. トグルを {{< ui >}}Enable Bits Security Analyst{{< /ui >}} に切り替えます。追加の設定が表示されます。
1. (オプション) Bits Security Analyst が自動的にシグナルを調査するルールと重大度を構成します。これを行う方法は 2 つあります。
   - 個別のルールの調査を構成するには、{{< ui >}}Rule Settings{{< /ui >}} をクリックします。調査されるシグナルの最小重大度を変更し、調査のための個別のルールを有効または無効にできます。
   - {{< ui >}}Query Filter{{< /ui >}} をクリックしてシグナルクエリフィルターを記述すれば、Bits Security Analyst がフィルターに一致する信号のみを調査します。
1. 一部のログソースは、Datadog にないログ、テレメトリ、またはその他のデータにアクセスして調査を実行または強化するための資格情報を必要とします。資格情報を追加するには、{{< ui >}}Edit credentials{{< /ui >}} をクリックします。開いた {{< ui >}}Select or Add Connection{{< /ui >}} ウィンドウで、プロンプトに従って Action Catalog から [既存のコネクション][4] を選択するか、コネクションを追加します。Datadog は、Action Catalog を使用してすべての資格情報を安全に保存し、制限します。
   
   一部のログソースでは追加のセットアップが必要なため、HTTP コネクションを作成できます。以下はその例です。
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

   {{< collapse-content title="Configure CrowdStrike" level="h4" expanded=false id="crowdstrike" >}}
   <ol>
     <li>CrowdStrike で、<strong>サポートとリソース</strong> に移動し、<strong>API クライアントおよびキー</strong>をクリックします。</li>
     <li><strong>API クライアントを作成する</strong>をクリックします。</li>
     <li>API クライアントのスコープを選択します。
       <ul>
         <li><strong>NGSIEM</strong> を除くすべてのスコープを <strong>Read Only</strong> に設定します。</li>
         <li><strong>NGSIEM</strong> スコープを <strong>Read and Write</strong> に設定します。NGSIEM のクエリには POST リクエストが必要であり、CrowdStrike はこれを書き込みアクションとして分類します。</li>
       </ul>
     </li>
     <li>API クライアントを作成した後、<strong>Client ID</strong>、<strong>Secret</strong>、および <strong>Base URL</strong> を安全に保存します。シークレットは一度しか表示せず、ベース URL は CrowdStrike のリージョンと一致している必要があります。</li>
     <li>Datadog の {{< ui >}}Select or Add Connection{{< /ui >}} ウィンドウで、ドロップダウンから {{< ui >}}New Connection{{< /ui >}} を選択し、{{< ui >}}HTTP{{< /ui >}} タイルをクリックします。</li>
     <li>以下の情報を追加します。
       <ul>
         <li>{{< ui >}}Base URL{{< /ui >}} フィールドに、CrowdStrike 管理 URL を入力します。</li>
         <li>{{< ui >}}Authentication Type{{< /ui >}} で {{< ui >}}2 Step Auth{{< /ui >}} を選択します。</li>
       </ul>
     </li>
     <li>{{< ui >}}Query your access token{{< /ui >}}:
       <ul>
         <li>{{< ui >}}Secret Type{{< /ui >}} で {{< ui >}}Token Auth{{< /ui >}} を選択し、2 つのトークンを追加します。
           <table>
             <thead>
               <tr>
                 <th>トークン名</th>
                 <th>トークン値</th>
               </tr>
             </thead>
             <tr>
               <td><code>secret</code></td>
               <td>CrowdStrike シークレット</td>
             </tr>
             <tr>
               <td><code>clientid</code></td>
               <td>CrowdStrike クライアント ID</td>
             </tr>
           </table>
         </li>
         <li>{{< ui >}}Request URL{{< /ui >}} フィールドに、以下を入力します <code>{your_base_url}/oauth2/token</code> (例:<code>https://api.crowdstrike.com/oauth2/token</code>)。</li>
         <li>{{< ui >}}Body{{< /ui >}} フィールドに、 <code>client_id</code> および <code>client_secret</code>を追加します。コンテンツタイプは以下でなければなりません。 <code>application/x-www-form-urlencoded</code>.</li>
       </ul>
     </li>
     <li>{{< ui >}}Get Access Token from Response{{< /ui >}}:
       <ul>
         <li>{{< ui >}}Variable Path to Access Token{{< /ui >}} を <code>body.access_token</code>に設定します。</li>
         <li>{{< ui >}}Refresh Interval{{< /ui >}} を <code>1700</code>に設定します。</li>
         <li>{{< ui >}}Request Headers{{< /ui >}} で、以下の 2 つのヘッダーを追加します。
           <table>
             <thead>
               <tr>
                 <th>名前</th>
                 <th>値</th>
               </tr>
             </thead>
             <tr>
               <td><code>Authorization</code></td>
               <td><code>Bearer</code> スペースの後に、 <code>{{accessToken}}</code></td>
             </tr>
             <tr>
               <td><code>Accept</code></td>
               <td><code>application/json</code></td>
             </tr>
           </table>
         </li>
       </ul>
     </li>
     <li>{{< ui >}}Next, Confirm Access{{< /ui >}} をクリックしてコネクションを確認します。</li>
   </ol>
   {{< /collapse-content >}}

### ナレッジソースを追加する {#add-knowledge-sources}

Bits Security Analyst に対して、組織の承認ルール、ポリシー、環境の詳細など、追加のコンテキストを提供できます。これにより、Bits は組織のニーズに合わせてより正確な調査結果を作成できるようになります。

ナレッジを追加するには、Datadog で {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Knowledge Sources{{< /ui >}}][8] に移動します。そこで、2 種類のナレッジを追加できます。
- **General Org Context (Bits.md)**: Bits Security Analyst がすべての調査に適用する必要がある組織レベルの指示。
  1. **編集**をクリックしてフィールドを編集可能にすることで、変更を加えることができます。
  1. **保存**をクリックします。
- **状況に応じたコンテキスト**: Bits Security Analyst が特定の状況で適用する必要がある調査固有の事実。コンテキストエントリーのテーブルを検索およびフィルタリングしたり、期限切れのエントリを表示したりして、既存のコンテキストの概要を確認できます。
  1. **コンテキストエントリーを作成する**をクリックします。開いたウィンドウで、以下を入力します。
     1. **タイトル**: エントリーの短いタイトル。
     1. **コンテキストの説明**: Bits Security Analyst に考慮させたい情報。
     1. **ステータス**: このコンテキストを有効にするか、有効にせずに保存するかを選択します。
     1. **有効期限** (オプション): Bits Security Analyst がこのコンテキストの考慮を停止する日付。
  1. **エントリーを作成する**をクリックします。ウィンドウが閉じ、コンテキストがテーブルに表示されます。

### 完了した調査の通知を受け取る {#get-notifications-for-completed-investigations}

Bits Security Analyst が調査を完了したときに通知を受け取るためのセキュリティ通知ルールを作成できます。これを行うには、[通知ルールを作成する][7] の手順に従ってください。通知ルールがトリガーされるために必要なタグと属性を指定する場合は、タグ `@workflow.bits_investigator.state:*` を追加します。

## Bits Security Analyst を無効にする {#disable-bits-security-analyst}

1. Datadog で、{{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3] に移動します。
1. ページ下部までスクロールします。{{< ui >}}Disable Bits Security Analyst{{< /ui >}} で、{{< ui >}}Enabled{{< /ui >}} のトグルをオフにします。
   <div class="alert alert-warning">Bits Security Analyst を無効にすると、すべての構成が完全にリセットされます。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: /ja/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/analyst-configuration
[4]: /ja/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html
[7]: /ja/security/notifications/rules/#create-notification-rules
[8]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/knowledge-sources