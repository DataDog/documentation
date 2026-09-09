---
further_reading:
- link: /security/ai_guard/
  tag: 설명서
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: 설명서
  text: AI Guard 시작
- link: /security/detection_rules/
  tag: 설명서
  text: 탐지 규칙
title: AI Guard Security 시그널
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

AI Guard 보안 신호는 AI Guard가 애플리케이션에서 탐지한 위협 및 공격에 대한 가시성을 제공합니다. 이러한 신호는 [AAP(애플리케이션 및 API 보호) 보안 신호][1]를 기반으로 구축되며 Datadog의 보안 모니터링 워크플로와 통합됩니다.

## AI Guard 신호 이해하기 {#understand-ai-guard-signals}

Datadog은 구성된 탐지 규칙에 따라 위협을 탐지하면 AI Guard 보안 신호를 생성합니다. 프롬프트 인젝션, 탈옥 또는 도구 오용과 같은 위협을 나타내는 신호는 Datadog Security Signals 탐색기에 표시됩니다. 이러한 신호는 다음을 제공할 수 있습니다.

- **위협 탐지**: 구성된 탐지 규칙에 기반한 공격 컨텍스트
- **액션 인사이트**: 규칙 설정에 따른 차단 또는 허용된 액션 정보
- **풍부한 조사 컨텍스트**: 탐지된 공격 범주, AI Guard 평가 결과 및 포괄적인 분석을 위한 관련 AI Guard 스팬 링크
- **사용자 지정 런북**: 특정 위협 시나리오에 대한 사용자 지정 수정 지침 및 대응 절차

수정 작업의 우선 순위를 정할 수 있도록 AI Guard는 모든 보안 신호에 심각도 수준을 자동으로 할당합니다. [사용자 지정 탐지 규칙](#create-detection-rules)을 생성하여 심각도 수준을 사용자 지정하고 특정 보안 대응을 정의할 수 있습니다.

## 탐지 규칙 생성 {#create-detection-rules}

알림을 받을 임계값을 정의하여 사용자 지정 탐지 규칙을 생성할 수 있습니다. 예를 들어 10분 동안 5건 이상의 `DENY` 액션이 발생할 경우 등이 있습니다. AI Guard 평가가 해당 임계값을 초과하면 보안 신호가 생성됩니다.

AI Guard 탐지 규칙을 생성하려면 다음 단계를 따르세요.
1. Datadog에서 [AI Guard 탐지 규칙 탐색기][2]로 이동한 다음 {{< ui >}}New Rule{{< /ui >}}을 클릭합니다.
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard 탐지 규칙 탐색기" style="width:100%;" >}}
1. {{< ui >}}Define your Real-time rule{{< /ui >}}: 생성할 규칙 유형을 선택하세요.
1. {{< ui >}}Define Search Queries{{< /ui >}}: 신호를 생성할 태그 유형을 정의하세요. 다음 AI Guard 속성을 사용하여 특정 위협 패턴을 필터링하고 타겟팅할 수 있습니다:
   <table>
     <thead>
       <tr>
         <th>태그</th>
         <th>설명</th>
         <th>가능한 값</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><code>@ai_guard.action</code></td>
         <td>AI Guard의 평가 결과로 필터링</td>
         <td><code>ALLOW</code> 또는 <code>DENY</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.attack_categories</code></td>
         <td>특정 공격 유형 타겟팅</td>
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
         <td>트레이스 내 액션이 차단되었는지 여부를 기준으로 필터링</td>
         <td><code>true</code> 또는 <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tools</code></td>
         <td>평가에 포함된 특정 도구 이름으로 필터링</td>
         <td><code>get_user_profile</code>, <code>user_recent_transactions</code>등</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.categories</code></td>
         <td>Sensitive Data Scanner가 탐지한 민감한 데이터 범주로 필터링</td>
         <td><code>credentials</code>, <code>email_address</code>등</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tags</code></td>
         <td>특정 민감한 데이터 규칙 태그로 필터링</td>
         <td><code>aws_access_key_id</code>, <code>aws_secret_access_key</code>, <code>claude_api_key</code>, <code>email_address</code>등</td>
       </tr>
     </tbody>
   </table>
1. {{< ui >}}Define Rule Conditions{{< /ui >}}:
   1. 선택한 규칙 유형에 적용되는 경우 임계값 조건을 정의하세요.
   1. 이 규칙으로 AI Guard가 생성하는 보안 신호의 심각도 수준을 설정하세요.
   1. 새 신호에 대한 알림을 받을 대상과 알림 빈도를 선택하세요.
   1. 자동화된 IP 또는 사용자 차단, IP 플래깅과 같은 보안 대응 조치를 선택하세요.
   1. AI Guard가 설정된 시간 내에 새로운 값을 탐지할 경우 새 신호를 생성하는 대신 동일한 신호를 업데이트하거나, 비운영 환경에 대해 신호 심각도를 낮추는 등의 추가 설정을 구성하세요.
1. {{< ui >}}Describe your Playbook{{< /ui >}}: 알림을 사용자 지정하고 신호와 함께 보낼 태그를 정의하세요.
1. {{< ui >}}Save Rule{{< /ui >}}을 클릭합니다.

더 포괄적인 탐지 규칙 기능을 조회하려면 [탐지 규칙][3]을 참조하세요.

## 신호 조사 {#investigate-signals}

AI Guard 보안 신호를 보고 조사하며 다른 보안 이벤트와 연관시키려면 다음 두 곳에서 신호를 볼 수 있습니다.
- [애플리케이션 및 API 보호 보안 신호 탐색기][4]
- [Cloud SIEM 보안 신호 탐색기][5]

  Cloud SIEM Security Signals 탐색기 검색 창 옆에서 {{< ui >}}Filter{{< /ui >}} 아이콘을 클릭하고 {{< ui >}}App & API Protection{{< /ui >}} 확인란을 선택하여 AI Guard 신호를 확인합니다.

Security Signals explorers를 사용하면 AI Guard 신호를 다른 애플리케이션 보안 위협과 함께 필터링, 우선 순위 지정 및 조사할 수 있어 보안 상태를 통합적으로 파악할 수 있습니다.

AI Guard 보안 신호에서 직접 케이스를 생성하거나 연결할 수 있으며, 신호를 클릭하여 추가 컨텍스트가 포함된 측면 패널을 열 수 있습니다.

## 스팬으로 추가 컨텍스트 가져오기 {#get-additional-context-with-spans}

AI Guard 스팬은 수행된 평가와 그 이유에 대한 자세한 정보를 제공합니다. [Investigate][6] 페이지나 신호에서 스팬을 열면 AI Agent가 사용한 특정 프롬프트에 대한 컨텍스트를 얻고, 정확한 입력 및 출력을 읽고, AI Guard가 도구 호출을 안전하지 않은 것으로 평가하는 데 기여한 공격 범주를 확인할 수 있습니다.

### 스팬에 대한 컨텍스트 가져오기 {#get-context-on-a-span}

탐색기에서 스팬을 클릭하면 다음을 확인할 수 있습니다.
- 요청이 발생한 서비스 및 환경
- 해당 서비스에 대해 구성된 [차단 정책][7]. 이 정책은 AI Guard가 안전하지 않은 요청을 차단할지, 아니면 차단하지 않고 탐지 및 태그만 지정할지를 결정합니다.
- Agent와 상호 작용한 사용자
- Agent의 특정 입력 및 출력과 해당 데이터가 LLM에서 왔는지 외부 도구에서 왔는지 여부
- AI Guard가 각 요청을 안전 또는 안전하지 않음으로 평가했는지 여부
- AI Guard가 요청을 차단했는지 여부
- AI Guard가 호출을 안전하지 않은 것으로 평가한 경우, 포함된 공격 범주
- 요청에 민감한 데이터가 포함되었는지 여부와 포함되었다면 어떤 유형의 민감한 데이터인지 여부
- 탐색기에서 스팬을 필터링하는 데 사용할 수 있는 추가 태그

또한 {{< ui >}}Explore in graph view{{< /ui >}}을 클릭하여 대화의 요청을 그래프로 확인하거나 [APM][8] 또는 [Agent Observability][9]에서 스팬을 볼 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /ko/security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://app.datadoghq.com/security/ai-guard/investigate
[7]: /ko/security/ai_guard/setup/#blocking-policy
[8]: /ko/tracing/
[9]: /ko/llm_observability/