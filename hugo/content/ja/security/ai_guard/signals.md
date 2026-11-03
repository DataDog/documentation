---
further_reading:
- link: /security/ai_guard/
  tag: ドキュメント
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: ドキュメント
  text: AI Guard を始める
- link: /security/detection_rules/
  tag: ドキュメント
  text: 検出ルール
title: AI Guard セキュリティシグナル
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard は {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

AI Guard セキュリティシグナルは、AI Guard がアプリケーション内で検出した脅威や攻撃を可視化します。これらのシグナルは [AAP (Application and API Protection) セキュリティシグナル][1]を基に構成され、Datadog のセキュリティモニタリングワークフローに統合されています。

## AI Guard シグナルについて {#understand-ai-guard-signals}

Datadog は、設定された検出ルールに基づいて脅威を検出すると、AI Guard セキュリティシグナルを作成します。プロンプトインジェクション、ジェイルブレイク、ツールの悪用などの脅威を示すシグナルが、Datadog セキュリティシグナルエクスプローラーに表示されます。これらのシグナルは以下を提供します。

- **脅威検出**: 設定された検出ルールに基づく攻撃コンテキスト
- **アクションのインサイト**: ルールの設定に基づいてブロックまたは許可されたアクションに関する情報
- **詳細な調査コンテキスト**: 検出された攻撃カテゴリー、AI Guard の評価結果、および包括的な分析のための関連AI Guard スパンへのリンク
- **カスタムランブック**: 特定の脅威シナリオに対するカスタムの修復ガイダンスと対応手順

修復作業の優先順位付けに役立つように、AI Guard によってすべてのセキュリティシグナルに重大度レベルが自動的に割り当てられます。[カスタム検出ルール](#create-detection-rules)を作成して、重大度レベルをカスタマイズし、特定のセキュリティ対応を定義できます。

## 検出ルールの作成 {#create-detection-rules}

通知を受け取るタイミングのしきい値を定義することで、カスタム検出ルールを作成できます。たとえば、10 分間に 5 回を超える `DENY` アクションなどです。AI Guard の評価がそれらのしきい値を超えると、セキュリティシグナルが生成されます。

AI Guard 検出ルールを作成するには、次のようにします。
1. Datadog で [AI Guard 検出ルールエクスプローラー][2]に移動し、[{{< ui >}}New Rule{{< /ui >}}] (新規ルール) をクリックします。
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard 検出ルールエクスプローラー" style="width:100%;" >}}
1. [{{< ui >}}Define your Real-time rule{{< /ui >}}] (リアルタイムルールの定義) で、作成するルールのタイプを選択します。
1. [{{< ui >}}Define Search Queries{{< /ui >}}] (検索クエリの定義) で、シグナルを作成するタグのタイプを定義します。以下の AI Guard 属性を使用して、特定の脅威パターンをフィルタリングし、ターゲットに設定できます。
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
         <td>AI Guard の評価結果でフィルタリングします。</td>
         <td><code>ALLOW</code> または <code>DENY</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.attack_categories</code></td>
         <td>特定の攻撃タイプをターゲットに設定します。</td>
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
         <td>トレース内のアクションがブロックされたかどうかに基づいてフィルタリングします。</td>
         <td><code>true</code> または <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tool_name</code></td>
         <td>評価に関わった特定のツール名でフィルタリングします。</td>
         <td><code>get_user_profile</code>、<code>user_recent_transactions</code>など</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.category</code></td>
         <td>Sensitive Data Scanner によって検出された機密データカテゴリーでフィルタリングします。</td>
         <td><code>credentials</code>、<code>email_address</code>など</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tag</code></td>
         <td>特定の機密データルールタグでフィルタリングします。</td>
         <td><code>aws_access_key_id</code>、<code>aws_secret_access_key</code>、<code>claude_api_key</code>、<code>email_address</code>など</td>
       </tr>
     </tbody>
   </table>
1. [{{< ui >}}Define Rule Conditions{{< /ui >}}] (ルール条件の定義) で、次のようにします。
   1. 選択したルールのタイプで適用される場合は、しきい値条件を定義します。
   1. このルールで AI Guard が生成するセキュリティシグナルの重大度レベルを設定します。
   1. 新しいシグナルの通知を受け取るユーザーと、その頻度を選択します。
   1. 自動 IP ブロックやユーザーブロック、IP フラグ設定など、実施するセキュリティ対応を選択します。
   1. AI Guard が一定期間内に新しい値を検出した場合に新しいシグナルを作成するのではなく、同じシグナルを更新する、非本番環境のシグナル重大度を下げるなどの、追加設定を構成します。
1. [{{< ui >}}Describe your Playbook{{< /ui >}}] (プレイブックを説明する) で、通知をカスタマイズし、シグナルと共に送信するタグを定義します。
1. [{{< ui >}}Save Rule{{< /ui >}}] (ルールを保存) をクリックします。

検出ルール機能全般について確認するには、「[検出ルール][3]」を参照してください。

## シグナルを調べる {#investigate-signals}

AI Guard セキュリティシグナルを表示して調べ、それらを他のセキュリティイベントと関連付けるには、次の 2 か所でシグナルを確認します。
- [Application and API Protection セキュリティシグナルエクスプローラー][4]
- [Cloud SIEM セキュリティシグナルエクスプローラー][5]

  Cloud SIEM セキュリティシグナルエクスプローラーで、検索バーの横にある [{{< ui >}}Filter{{< /ui >}}] (フィルター) アイコンをクリックし、[{{< ui >}}App & API Protection{{< /ui >}}] チェックボックスを選択して AI Guard シグナルを表示します。

セキュリティシグナルエクスプローラーでは、AI Guard シグナルを他のアプリケーションセキュリティの脅威とともに表示、優先順位付け、調査することができるため、自社のセキュリティ体制をまとめて把握できます。

AI Guard セキュリティシグナルから直接ケースを作成またはリンクしたり、シグナルをクリックして追加のコンテキストを含むサイドパネルを開いたりすることができます。

## スパンで追加のコンテキストを取得する {#get-additional-context-with-spans}

AI Guard のスパンは、AI Guard が行った評価とその理由に関する詳細な情報を提供します。[[Investigate][6]] (調査) ページまたはシグナルからスパンを開いて、AI エージェントが使用した具体的なプロンプトに関するコンテキストを取得したり、具体的な入力と出力を読み取ったり、AI Guard がツールの呼び出しを安全でないと評価する要因となった攻撃カテゴリーを確認したりすることができます。

### スパンに関するコンテキストを取得する {#get-context-on-a-span}

エクスプローラーでスパンをクリックすると、以下を確認できます。
- リクエストが発生したサービスと環境
- そのサービスに対して構成されている[ブロックポリシー][7]。これにより、AI Guard が安全でないリクエストをブロックするか、またはブロックせずに検出してタグ付けするかが決定されます。
- エージェントと対話したユーザー
- エージェントの具体的な入力と出力、およびそれらが LLM または外部ツールのいずれから取得されたか
- AI Guard が各リクエストを安全と評価したか、安全でないと評価したか
- AI Guard がリクエストをブロックしたかどうか
- AI Guard が呼び出しを安全でないと評価した場合、どの攻撃カテゴリーが含まれていたか
- リクエストに機密データが含まれていたかどうか、含まれていた場合はどのような種類の機密データか
- エクスプローラーでスパンをフィルタリングするために使用できる追加のタグ

さらに、[{{< ui >}}Explore in graph view{{< /ui >}}] (グラフビューで参照) をクリックすると、会話内のリクエストをグラフで表示したり、[APM][8] または [Agent Observability][9] でスパンを表示したりすることができます。

## 参考資料 {#further-reading}

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