---
aliases:
- /ko/bits_ai/bits_ai_security_analyst
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
  tag: 블로그
  text: Bits AI Security Analyst로 Cloud SIEM 조사 자동화
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: 블로그
  text: 'Cloud SIEM의 새로운 기능: AI 기반 조사, 향상된 위협 인텔리전스, 확장 가능한 보안 운영'
title: Bits Security Analyst
---
## 개요 {#overview}

Bits Security Analyst는 Cloud SIEM 신호에 대해 처음부터 끝까지 조사하는 자율 AI 에이전트입니다. 보안 신호와 로그를 쿼리하고 데이터 기반 추론을 사용해 보안 엔지니어가 위협 경보를 조사하고 각 경보 신호에 대한 판정을 내릴 수 있도록 권장 사항을 제안합니다. Bits Security Analyst는 수작업을 줄이고 분석가의 피로도를 낮춰 더 원활하고 효율적인 보안 운영을 할 수 있도록 만들어 줍니다.

### 주요 기능 {#key-capabilities}

Bits Security Analyst의 조사는 자율적으로 진행됩니다. 탐지 규칙이 활성화되어 있으면 Bits AI가 관련 신호를 스스로 조사합니다.

[Cloud SIEM 신호 탐색기][5]에서 {{< ui >}}Bits Security Analyst{{< /ui >}} 탭을 클릭하면 Bits AI가 조사한 신호만 볼 수 있습니다. 심각도 열에서 Bits AI 상태는 Investigating으로 표시되며 조사가 완료되면 신호를 Benign 또는 Suspicious로 분류합니다.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="Bits Security Analyst 탭의 Cloud SIEM 신호 탐색기" style="width:100%;" >}}

Bits A가 조사한 행을 클릭하면 Bits AI Investigation 사이드 패널이 열립니다.

{{< img src="bits_ai/bits_security_analyst_example.png" alt="'Okta phishing detection with FastPass origin check'라는 제목의 Bits Security Analyst 탐지 예시" style="width:100%;" >}}

사이드 패널에서 다음을 포함한 Bits AI의 조사 결과를 확인할 수 있습니다.
- 최종 결론
- 결론 도출에 사용된 주요 증거
- Bits AI의 데이터 쿼리 과정을 보여주는 조사 단계 (임베디드 결과 및 전체 쿼리 링크 제공)
- 각 조사 단계별 분석 내용

사이드 패널에서 바로 후속 조치를 취할 수도 있습니다.
- Bits AI 조사 결과가 미리 채워진 케이스 생성
- SOAR 블루프린트로 워크플로 실행
- 인시던트 선언
- 규칙 억제 추가
- 신호 아카이브 또는 일반 Cloud SIEM 인터페이스로 신호 조회
- Bits AI 분석 결과에 대한 피드백 제출

또한 Cloud SIEM 알림으로 Slack 또는 Jira에 새 신호 경보를 보낼 때, Bits AI가 해당 알림을 자동으로 업데이트합니다. Bits AI 조사 결론을 보여주는 답변과 조사 내용 전체를 확인할 수 있는 링크가 포함됩니다.

### 지원되는 소스 {#supported-sources}

Bits AI는 다음 보안 로그 소스에 대한 조사를 실행할 수 있습니다.
- Amazon GuardDuty
  - [발견 사항 범주][6]에는 비정상적인 IAM 동작, EC2 자격 증명 유출 및 오용, S3 데이터 노출, CloudTrail 또는 S3 방어 회피, IAM 자격 증명과 S3 데이터 침해를 연계한 공격 시퀀스가 포함됩니다.
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
- 이메일 피싱

## Bits Security Analyst 설정 {#set-up-bits-security-analyst}

### 전제 조건 {#prerequisites}

Bits Security Analyst를 사용하려면 다음 조건을 충족해야 합니다.
- 조직에서 Cloud SIEM의 레거시가 아닌 버전을 사용하고 있는지 확인하세요. 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.
- Bits Security Analyst 설정을 진행하려면 **Bits Security Analyst Config Write** [권한][2]이 필요합니다.
- 조사를 확인하려면 **14일 이상**의 로그 기록이 필요합니다. 로그 기록 기간이 이보다 짧은 경우에도 Bits Security Analyst를 설정할 수 있지만 14일 치의 기록이 쌓일 때까지는 조사를 확인할 수 없습니다.

### 설정 {#setup}

Bits Security Analyst를 활성화하면 Datadog은 사용자 지정 규칙을 포함한 규칙을 분석하여 해당 규칙 관련 신호 조사를 안정적으로 수행할 수 있는지 판단합니다. 중간 심각도 이상의 모든 적격 규칙에 대해 자율적으로 신호 조사를 시작합니다. 

규칙의 조사 가능 여부는 Datadog이 로그 소스에 대한 조사 기능을 구축했는지와 Agent가 특정 규칙을 조사할 수 있는지에 따라 달라집니다. 평가가 필요한 새 사용자 정의 규칙이 있거나 대상에서 제외된 규칙에 대해서는 [Datadog 지원팀][1]으로 문의하세요.

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3]로 이동합니다.
1. {{< ui >}}Enable Bits Security Analyst{{< /ui >}} 토글을 켭니다. 추가 설정이 나타납니다.
1. (선택 사항) Bits Security Analyst가 신호를 자동으로 조사할 규칙과 심각도를 구성합니다. 방법은 두 가지가 있습니다.
   - {{< ui >}}Rule Settings{{< /ui >}}을 클릭해 개별 규칙별로 조사를 구성합니다. 신호 조사를 개시할 최소 심각도를 변경하거나 개별 규칙의 조사 여부를 활성화 또는 비활성화할 수 있습니다.
   - {{< ui >}}Query Filter{{< /ui >}}을 클릭하여 신호 쿼리 필터를 작성합니다. Bits Security Analyst가 필터와 일치하는 신호만 조사하도록 만들 수 있습니다.
1. 일부 로그 소스는 Datadog에 없는 로그, 텔레메트리 또는 기타 데이터에 접근하여 조사를 실행하거나 향상시키기 위해 자격 증명이 필요합니다. 자격 증명을 추가하려면 {{< ui >}}Edit credentials{{< /ui >}}을 클릭합니다. 열리는 {{< ui >}}Select or Add Connection{{< /ui >}} 창의 프롬프트에 따라 Actions Catalog에서 [기존 연결][4]을 선택하거나 연결을 추가합니다. Datadog은 Actions Catalog로 모든 자격 증명을 안전하게 저장하고 제한합니다.
   
   일부 로그 소스는 HTTP 연결을 만들기 위해 추가 설정이 필요합니다. 아래는 예시입니다.
   {{< collapse-content title="SentinelOne 구성" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>SentinelOne에서 API 토큰을 만들 수 있는 권한이 있는지 확인하세요. S1 API 서비스 사용자를 만든 후에 해당 사용자에게 {{< ui >}}Viewer{{< /ui >}} 역할을 할당합니다.</li>
     <li>Datadog의 {{< ui >}}Select or Add Connection{{< /ui >}} 창 드롭다운에서 {{<  ui >}}New Connection{{< /ui >}}을 선택한 다음 {{< ui >}}HTTP{{< /ui >}} 타일을 클릭합니다.</li>
     <li>다음 정보를 추가합니다.
       <ul>
         <li>{{< ui >}}Description{{< /ui >}} 필드에 Datadog에서는 토큰 만료 날짜를 추가할 것을 권장합니다. 이렇게 하면 간편하게 관리할 수 있습니다.</li>
         <li> {{< ui >}}Base URL{{< /ui >}} 필드에 SentinelOne 관리 콘솔 URL을 입력하세요.</li>
         <li>{{< ui >}}Token Auth{{< /ui >}}:
           <ol>
             <li> {{< ui >}}Token Name{{< / ui >}} 필드에 토큰 이름을 입력하고 {{< ui >}}Token Value{{< /ui >}} 필드에 API 토큰을 입력하세요.</li>
             <li>{{< ui >}}Headers{{< /ui >}} 탭의 {{< ui  >}}Request Headers{{< /ui >}} 아래에서 {{< ui >}}Add a Header{{< /ui >}}를 클릭하세요. 다음 2개의 헤더를 추가하세요.
               <table>
                 <thead>
                   <tr>
                     <th>이름</th>
                     <th>값</th>
                   </tr>
                 </thead>
                 <tr>
                   <td><code>Authorization</code></td>
                   <td><code>Bearer</code> 뒤에 공백을 하나 포함하고 정의한 {{< ui >}}Token Name{{< /ui >}}을 삽입</td>
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
     <li>{{< ui >}}Next, Confirm Access{{< /ui >}}를 클릭하여 연결을 확인합니다.</li>
   </ol>
   {{< /collapse-content >}}

## Bits Security Analyst 비활성화 {#disable-bits-security-analyst}

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3]로 이동합니다.
1. 페이지 하단으로 스크롤합니다. {{< ui >}}Disable Bits Security Analyst{{< /ui >}} 아래에서 {{< ui >}}Enabled{{< /ui >}} 토글을 끕니다.
   <div class="alert alert-warning">Bits Security Analyst를 비활성화하면 모든 구성 설정이 영구적으로 초기화됩니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: /ko/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst
[4]: /ko/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html