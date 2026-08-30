---
further_reading:
- link: /security/ai_guard/
  tag: ドキュメント
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: ドキュメント
  text: AI Guard の利用を開始する
- link: /security/detection_rules/
  tag: ドキュメント
  text: 検知ルール
title: AI Guard Security Signals
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard は {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

AI Guard セキュリティシグナルは、AI Guard がアプリケーション内で検知した脅威や攻撃の可視性を提供します。これらのシグナルは、[AAP (Application and API Protection) セキュリティシグナル][1] の上に構築されており、Datadog のセキュリティ監視ワークフローと統合されています。

## AI Guard シグナルについて理解する {#understand-ai-guard-signals}

Datadog は、構成された検知ルールに基づいて脅威を検知すると、AI Guard セキュリティシグナルを作成します。プロンプトインジェクション、ジェイルブレイク、ツール悪用などの脅威を示すシグナルは、Datadog Security Signals エクスプローラーに表示されます。これらのシグナルは以下を提供します。

- **脅威検知**: 構成された検知ルールに基づく攻撃コンテキスト
- **アクションインサイト**: ルール設定に従ってブロックまたは許可されたアクションの情報
- **詳細な調査コンテキスト**: 検知された攻撃カテゴリ、AI Guard の評価結果、および包括的な分析のための関連 AI Guard スパンへのリンク
- **カスタムランブック**: 特定の脅威シナリオに関するカスタムの修復ガイダンスと対応手順

修復作業の優先順位付けを支援するため、AI Guard はすべてのセキュリティシグナルに重要度レベルを自動的に割り当てます。[カスタム検知ルール](#create-detection-rules)を作成して、重要度レベルをカスタマイズし、特定のセキュリティ対応を定義できます。

## 検知ルールを作成する {#create-detection-rules}

通知を受け取るタイミングのしきい値を定義することで、カスタム検知ルールを作成できます。たとえば、10 分間に 5 回を超える `DENY` アクションなどです。AI Guard の評価がそれらのしきい値を超えると、セキュリティシグナルが生成されます。

AI Guard 検知ルールを作成するには、以下の手順に従います。
1. Datadog で、[AI Guard 検知ルールエクスプローラー][2] に移動し、{{< ui >}}New Rule{{< /ui >}} をクリックします。
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard 検知ルールエクスプローラー" style="width:100%;" >}}
1. {{< ui >}}Define your Real-time rule{{< /ui >}} の下で、作成するルールのタイプを選択します。
1. {{< ui >}}Define Search Queries{{< /ui >}} の下で、シグナルを作成するタグのタイプを定義します。以下の AI Guard 属性を使用して、特定の脅威パターンをフィルタリングおよびターゲット設定できます。
   <table>
     <thead>
       <tr>
         <th>タグ</th>
         <th>説明</th>
         <th>使用可能な値</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><code>@ai_guard.action</code></td>
         <td>AI Guard の評価結果でフィルタリングする</td>
         <td><code>ALLOW</code> または <code>DENY</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.attack_categories</code></td>
         <td>特定の攻撃タイプをターゲットにする</td>
         <td>
           <ul>
             <li><code>jailbreak</code></li>
             <li><code>indirect-prompt-injection</code></li>
             <li><code>destructive-tool-call</code></li>
             <li><code>denial-of-service-tool-call</code></li>
             <li><code>security-exploit</code></li>
             <li><code>authority-override</code></li>
             <li><code>role-play</code></li>
             <li><code>instruction-override</code></li>
             <li><code>obfuscation</code></li>
             <li><code>system-prompt-extraction</code></li>
             <li><code>data-exfiltration</code></li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><code>@ai_guard.blocked</code></td>
         <td>トレース内のアクションがブロックされたかどうかに基づいてフィルタリングする</td>
         <td><code>true</code> または <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tools</code></td>
         <td>評価に関与した特定のツール名でフィルタリングする</td>
         <td><code>get_user_profile</code>、<code>user_recent_transactions</code>など</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.categories</code></td>
         <td>Sensitive Data Scanner によって検出された機密データカテゴリでフィルタリングする</td>
         <td><code>credentials</code>、<code>email_address</code>など</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tags</code></td>
         <td>特定の機密データルールタグでフィルタリングする</td>
         <td><code>aws_access_key_id</code>、<code>aws_secret_access_key</code>、<code>claude_api_key</code>、<code>email_address</code>など</td>
       </tr>
     </tbody>
   </table>
1. {{< ui >}}Define Rule Conditions{{< /ui >}}:
   1. 選択したルールのタイプに適用される場合は、しきい値条件を定義します。
   1. このルールで AI Guard が生成するセキュリティシグナルの重大度レベルを設定します。
   1. 新しいシグナルの通知を受け取る対象者と頻度を選択します。
   1. 自動的な IP やユーザーのブロック、IP のフラグ付けなど、実行するセキュリティ対応を選択します。
   1. AI Guard が一定時間内に新しい値を検出した場合に、新しいシグナルを作成する代わりに既存のシグナルを更新する、非本番環境向けにシグナルの重大度を下げるなど、追加設定を構成します。
1. {{< ui >}}Describe your Playbook{{< /ui >}} で、通知をカスタマイズし、シグナルと共に送信するタグを定義します。
1. {{< ui >}}Save Rule{{< /ui >}} をクリックします。

より包括的な検知ルールの機能については、[検知ルール][3] を参照してください。

## シグナルを調査する {#investigate-signals}

AI Guard のセキュリティシグナルを表示および調査し、他のセキュリティイベントと関連付けるため、2 つの場所でシグナルを確認できます。
- [Application and API Protection Security Signals エクスプローラー][4]
- [Cloud SIEM Security Signals エクスプローラー][5]

  Cloud SIEM Security Signals エクスプローラーで、検索バーの横にある {{< ui >}}Filter{{< /ui >}} アイコンをクリックし、{{< ui >}}App & API Protection{{< /ui >}} チェックボックスを選択して AI Guard Security Signals を表示します。

Security Signals エクスプローラーを使用すると、AI Guard シグナルを他のアプリケーションセキュリティの脅威と並べてフィルタリング、優先順位付け、調査できるため、セキュリティ体制を統合的に把握できます。

AI Guard セキュリティシグナルから直接ケースを作成またはリンクしたり、シグナルをクリックして詳細なコンテキストを含むサイドパネルを開いたりできます。

## スパンを利用して詳細なコンテキストを取得する {#get-additional-context-with-spans}

AI Guard スパンは、行った評価とその理由に関する詳細情報を提供します。[Investigate][6] ページまたはシグナルからスパンを開くと、AI エージェントが使用した特定のプロンプトに関するコンテキストを取得したり、正確な入力と出力を読み取ったり、AI Guard がツール呼び出しを安全でないと評価する要因となった攻撃カテゴリを確認したりできます。

### スパンに関するコンテキストを取得する {#get-context-on-a-span}

エクスプローラーでスパンをクリックすると、以下を確認できます。
- リクエストが発生したサービスおよび環境
- AI Guard が安全でないリクエストをブロックするか、ブロックせずに検出してタグ付けするかを決定する、そのサービスに対して設定された [ブロッキングポリシー][7]
- エージェントとのやり取りを行ったユーザー
- エージェントからの具体的な入力と出力、およびそれらが LLM と外部ツールのどちらから生成されたものか
- AI Guard が各リクエストを安全と評価したか、安全でないと評価したか
- AI Guard がリクエストをブロックしたかどうか
- AI Guard が呼び出しを安全でないと評価した場合、どの攻撃カテゴリが含まれていたか
- リクエストに機密データが含まれていたかどうか、含まれていた場合はどのような種類の機密データか
- エクスプローラーでスパンをフィルタリングできる追加タグ

さらに、{{< ui >}}Explore in graph view{{< /ui >}} をクリックすると、会話内のリクエストをグラフで確認したり、[APM][8] や [Agent Observability][9] でスパンを表示したりできます。

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /ja/security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://app.datadoghq.com/security/ai-guard/investigate
[7]: /ja/security/ai_guard/setup/#blocking-policy
[8]: /ja/tracing/
[9]: /ja/llm_observability/