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
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: 블로그
  text: Bits Security Analyst를 사용하여 클라우드 자격 증명 침해를 조사하는 방법
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: 블로그
  text: Datadog으로 Google Cloud AI 스택 평가, 최적화 및 보안 강화
title: Bits Security Analyst
---
## 개요 {#overview}

Bits Security Analyst는 Cloud SIEM 신호를 전체적으로 조사하는 자율형 AI 에이전트입니다. 보안 신호와 로그를 쿼리하고 데이터 기반 추론을 사용해 보안 엔지니어가 위협 경보를 조사하고 각 경보 신호에 대한 판정을 내릴 수 있도록 권장 사항을 제안합니다. Bits Security Analyst는 수작업을 줄이고 분석가의 피로도를 낮춰 보안 운영을 원활하게 하고 효율성을 높입니다.

### 주요 기능 {#key-capabilities}

Bits Security Analyst의 조사는 자율적입니다. 탐지 규칙이 활성화되어 있으면 Bits AI가 관련 신호를 자율적으로 조사합니다.

[Cloud SIEM 신호 탐색기][5]에서 {{< ui >}}Bits Security Analyst{{< /ui >}} 탭을 클릭하면 Bits AI가 조사한 신호만 볼 수 있습니다. 심각도 열에서 Bits AI 상태는 Investigating으로 표시되며 조사가 완료되면 신호를 Benign 또는 Suspicious로 분류합니다.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="Bits Security Analyst 탭의 Cloud SIEM 신호 탐색기" style="width:100%;" >}}

Bits AI 조사가 포함된 행을 클릭하면 Bits AI Investigation 사이드 패널이 열립니다.

{{< img src="bits_ai/bits_security_analyst_example.png" alt="'Okta phishing detection with FastPass origin check'라는 제목의 Bits Security Analyst 탐지 예시" style="width:100%;" >}}

사이드 패널에서 다음을 포함한 Bits AI의 조사 발견 사항을 확인할 수 있습니다.
- 최종 결론
- 해당 결론에 도달하는 데 사용된 주요 증거
- 문제를 해결하거나 특정 속성을 사용하여 탐지 규칙을 차단하기 위해 권장되는 다음 단계
- Bits AI의 데이터 쿼리 과정을 보여주는 조사 단계(임베디드 결과 및 전체 쿼리 링크 제공)
- 각 조사 단계별 분석 내용

사이드 패널에서 바로 추가 단계를 진행할 수도 있습니다.
- Bits AI 조사 결과가 미리 채워진 작업 항목 생성
- SOAR Blueprint로 워크플로 실행
- 인시던트 선언
- 규칙 차단 추가
- 신호 보관, 또는 평소 사용하는 Cloud SIEM 인터페이스로 신호 조회
- Bits AI에 분석에 대한 피드백 제공

또한 Cloud SIEM 알림으로 Slack 또는 Jira에 새 신호 경보를 보내면, Bits AI가 그러한 알림을 자동으로 업데이트합니다. 여기에는 Bits AI 조사 결론을 표시한 회신과 전체 조사로 이동하는 링크가 포함됩니다.

### 지원되는 소스 {#supported-sources}

Bits AI는 다음 보안 로그 소스에 대한 조사를 실행할 수 있습니다.
- Amazon GuardDuty에서 지원되는 [발견 사항 유형][6]은 다음을 포함합니다.
  - 비정상적이고 침해된 IAM 자격 증명
  - EC2 및 리소스 자격 증명의 유출 및 오용
  - Bedrock 로깅 변경, 비정상적인 모델 호출, 비용 수익화 및 다이렉트 프롬프트 인젝션
  - 침해된 EKS 및 ECS 클러스터의 공격 시퀀스
  - Kubernetes 자격 증명 액세스, 비정상적인 동작, 실행, 권한 상승, 지속성, 정책 변경 및 악의적인 호출자
  - S3 비정상적인 동작, 데이터 노출, 악의적인 호출자 및 침투 테스트 활동
  - CloudTrail 또는 S3의 방어 회피
  - IAM 자격 증명 및 S3 데이터 침해의 상관관계를 정립하는 공격 시퀀스
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
- 이메일 피싱

## Bits Security Analyst 설정 {#set-up-bits-security-analyst}

### 전제 조건 {#prerequisites}

Bits Security Analyst를 사용하려면 다음 조건을 충족해야 합니다.
- 조직에서 Cloud SIEM의 레거시가 아닌 버전을 사용하고 있어야 합니다. 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.
- Bits Security Analyst를 설정하려면 **Bits Security Analyst Config Write** [권한][2]이 필요합니다.
- 조사를 조회하려면 **14일분 이상**의 로그 기록이 있어야 합니다. 로그 기록의 기간이 이보다 짧아도 Bits Security Analyst를 설정할 수는 있지만, 그만한 기록이 확보될 때까지 아무런 조사 내용이 표시되지 않습니다.

### 설정 {#setup}

Bits Security Analyst를 활성화하면 Datadog은 사용자 지정 규칙을 포함한 규칙을 분석하여 해당 규칙 관련 신호 조사를 안정적으로 수행할 수 있는지 판단합니다. 심각도가 중간 이상인 모든 적격 규칙에 대해 자율적으로 신호 조사를 시작합니다. 

규칙 적격성은 Datadog이 로그 소스에 대한 조사 기능을 구축했는지와 Agent가 특정 규칙을 조사할 수 있는지에 따라 달라집니다. 평가가 필요한 새 사용자 정의 규칙이 있거나 대상에서 제외된 규칙에 대해서는 [Datadog 지원팀][1]으로 문의하세요.

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3]으로 이동합니다.
1. {{< ui >}}Enable Bits Security Analyst{{< /ui >}} 토글을 켭니다. 추가 설정이 표시됩니다.
1. (선택 사항) Bits Security Analyst가 신호를 자동으로 조사할 규칙과 심각도를 구성합니다. 방법은 두 가지입니다.
   - {{< ui >}}Rule Settings{{< /ui >}}를 클릭해 개별 규칙별로 조사를 구성합니다. 신호를 조사할 최소 심각도를 변경하거나 개별 규칙의 조사 여부를 활성화 또는 비활성화할 수 있습니다.
   - {{< ui >}}Query Filter{{< /ui >}}를 클릭하여 신호 쿼리 필터를 작성합니다. Bits Security Analyst가 필터와 일치하는 신호만 조사하도록 만들 수 있습니다.
1. 일부 로그 소스의 경우 자격 증명이 있어야만 Datadog에 없는 로그, 텔레메트리 및 기타 데이터에 액세스하여 조사를 실행 또는 강화할 수 있습니다. 자격 증명을 추가하려면 {{< ui >}}Edit credentials{{< /ui >}}를 클릭합니다. {{< ui >}}Select or Add Connection{{< /ui >}} 창이 열리면 해당 창에 표시된 프롬프트를 따라 Actions Catalog에서 [기존 연결][4]을 선택하거나 연결을 추가합니다. Datadog은 Actions Catalog로 모든 자격 증명을 안전하게 저장하고 제한합니다.
   
   일부 로그 소스는 HTTP 연결을 만들기 위해 추가 설정이 필요합니다. 예시는 다음과 같습니다.
   {{< collapse-content title="SentinelOne 구성" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>SentinelOne에서 API 토큰을 만들 권한이 있어야 합니다. S1 API 서비스 사용자를 생성한 다음, 해당 사용자에게 {{< ui >}}Viewer{{< /ui >}} 역할을 할당합니다.</li>
     <li>Datadog의 {{< ui >}}Select or Add Connection{{< /ui >}} 창 드롭다운에서 {{<  ui >}}New Connection{{< /ui >}}을 선택한 다음 {{< ui >}}HTTP{{< /ui >}} 타일을 클릭합니다.</li>
     <li>다음 정보를 추가합니다.
       <ul>
         <li>Datadog은 {{< ui >}}Description{{< /ui >}} 필드에 토큰 만료 날짜를 추가할 것을 권장합니다. 이렇게 하면 간편하게 액세스할 수 있습니다.</li>
         <li> {{< ui >}}Base URL{{< /ui >}} 필드에 SentinelOne 관리 콘솔 URL을 입력하세요.</li>
         <li>{{< ui >}}Token Auth{{< /ui >}}:
           <ol>
             <li> {{< ui >}}Token Name{{< / ui >}} 필드에 토큰 이름, {{< ui >}}Token Value{{< /ui >}} 필드에 API 토큰을 입력합니다.</li>
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

   {{< collapse-content title="CrowdStrike 구성" level="h4" expanded=false id="crowdstrike" >}}
   <ol>
     <li>CrowdStrike에서 <strong>Support and resources</strong>로 이동한 다음 <strong>API clients and keys</strong>를 클릭합니다.</li>
     <li><strong>Create API client</strong>를 클릭합니다.</li>
     <li>API 클라이언트에 대한 범위 선택:
       <ul>
         <li><strong>NGSIEM</strong>을 제외하고 모든 범위를 <strong>Read Only</strong>로 설정합니다.</li>
         <li><strong>NGSIEM</strong> 범위를 <strong>Read and Write</strong>로 설정합니다. NGSIEM을 쿼리하려면 POST 요청이 필요하며, CrowdStrike에서는 이를 쓰기 작업으로 분류합니다.</li>
       </ul>
     </li>
     <li>API 클라이언트를 생성한 후 <strong>Client ID</strong>, <strong>Secret</strong> 및 <strong>Base URL</strong>을 안전하게 저장합니다. 시크릿은 한 번만 표시되며, 기본 URL은 CrowdStrike 리전에 맞는 URL이어야 합니다.</li>
     <li>Datadog의 {{< ui >}}Select or Add Connection{{< /ui >}} 창 드롭다운에서 {{< ui >}}New Connection{{< /ui >}}을 선택한 다음 {{< ui >}}HTTP{{< /ui >}} 타일을 클릭합니다.</li>
     <li>다음 정보를 추가합니다.
       <ul>
         <li>{{< ui >}}Base URL{{< /ui >}} 필드에 CrowdStrike 관리 URL을 입력합니다.</li>
         <li>{{< ui >}}Authentication Type{{< /ui >}}에서 {{< ui >}}2 Step Auth{{< /ui >}}를 선택합니다.</li>
       </ul>
     </li>
     <li>{{< ui >}}Query your access token{{< /ui >}}에서:
       <ul>
         <li>{{< ui >}}Secret Type{{< /ui >}}에서 {{< ui >}}Token Auth{{< /ui >}}를 선택한 다음 토큰 2개를 추가합니다.
           <table>
             <thead>
               <tr>
                 <th>토큰 이름</th>
                 <th>토큰 값</th>
               </tr>
             </thead>
             <tr>
               <td><code>secret</code></td>
               <td>CrowdStrike 시크릿</td>
             </tr>
             <tr>
               <td><code>clientid</code></td>
               <td>CrowdStrike 클라이언트 ID</td>
             </tr>
           </table>
         </li>
         <li>{{< ui >}}Request URL{{< /ui >}} 필드에 <code>{your_base_url}/oauth2/token</code> 을 입력합니다(예: <code>https://api.crowdstrike.com/oauth2/token</code>).</li>
         <li>{{< ui >}}Body{{< /ui >}} 필드에 <code>client_id</code> 및 <code>client_secret</code>을 추가합니다. 콘텐츠 유형은 <code>application/x-www-form-urlencoded</code>여야 합니다.</li>
       </ul>
     </li>
     <li>{{< ui >}}Get Access Token from Response{{< /ui >}}에서:
       <ul>
         <li>{{< ui >}}Variable Path to Access Token{{< /ui >}}을 <code>body.access_token</code>으로 설정합니다.</li>
         <li>{{< ui >}}Refresh Interval{{< /ui >}}을 <code>1700</code>으로 설정합니다.</li>
         <li>{{< ui >}}Request Headers{{< /ui >}}에서 다음 두 헤더를 추가합니다.
           <table>
             <thead>
               <tr>
                 <th>이름</th>
                 <th>값</th>
               </tr>
             </thead>
             <tr>
               <td><code>Authorization</code></td>
               <td><code>Bearer</code> 뒤에 공백을 입력한 다음 <code>{{accessToken}}</code></td>
             </tr>
             <tr>
               <td><code>Accept</code></td>
               <td><code>application/json</code></td>
             </tr>
           </table>
         </li>
       </ul>
     </li>
     <li>{{< ui >}}Next, Confirm Access{{< /ui >}}를 클릭하여 연결을 확인합니다.</li>
   </ol>
   {{< /collapse-content >}}

### 지식 소스 추가 {#add-knowledge-sources}

조직의 인증 규칙, 정책 및 환경에 대한 세부 정보와 같은 추가 컨텍스트를 Bits Security Analyst에 제공하여 Bits가 조직의 요구 사항에 맞게 보다 정확한 조사를 수행하도록 할 수 있습니다.

지식을 추가하려면 Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Knowledge Sources{{< /ui >}}][8]로 이동하세요. 여기에서 두 가지 종류의 지식을 추가할 수 있습니다.
- **일반 조직 컨텍스트(Bits.md)**: Bits Security Analyst가 모든 조사에 적용해야 하는 조직 수준의 지침입니다.
  1. **Edit**를 클릭하여 필드를 편집할 수 있도록 설정한 다음 변경 사항을 적용합니다.
  1. **Save**를 클릭합니다.
- **Situational Context**: Bits Security Analyst가 특정 상황에서 적용해야 하는 조사별 정보입니다. 컨텍스트 항목 표를 검색 및 필터링할 수 있으며, 만료된 항목을 표시하도록 선택하여 기존 컨텍스트를 한눈에 확인할 수 있습니다.
  1. **Create Context Entry**를 클릭합니다. 열리는 창에 다음 정보를 입력합니다.
     1. **Title**: 항목의 간략한 제목입니다.
     1. **Context description**: Bits Security Analyst가 고려해야 할 정보입니다.
     1. **Status**: 이 컨텍스트를 활성화할지, 활성화하지 않은 상태로 저장할지 선택합니다.
     1. **Expiration date**(선택 사항): Bits Security Analyst가 이 컨텍스트를 더 이상 고려하지 않게 될 날짜입니다.
  1. **Create Entry**를 클릭합니다. 창이 닫히고 컨텍스트가 표에 표시됩니다.

### 조사가 완료되었을 때 알림 받기 {#get-notifications-for-completed-investigations}

Bits Security Analyst가 조사를 완료했을 때 알림을 받을 수 있도록 보안 알림 규칙을 생성할 수 있습니다. 이렇게 하려면 [알림 규칙 생성][7]의 지침을 따르세요. 알림 규칙을 트리거하기 위해 있어야 하는 태그와 속성을 지정할 때 `@workflow.bits_investigator.state:*` 태그를 추가합니다.

## Bits Security Analyst 비활성화 {#disable-bits-security-analyst}

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3]으로 이동합니다.
1. 페이지 하단으로 스크롤합니다. {{< ui >}}Disable Bits Security Analyst{{< /ui >}} 아래에서 {{< ui >}}Enabled{{< /ui >}} 토글을 끕니다.
   <div class="alert alert-warning">Bits Security Analyst를 비활성화하면 모든 구성 설정이 영구적으로 재설정됩니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: /ko/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/analyst-configuration
[4]: /ko/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html
[7]: /ko/security/notifications/rules/#create-notification-rules
[8]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/knowledge-sources