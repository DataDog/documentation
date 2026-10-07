---
aliases:
- /ko/security/application_security/policies/inapp_waf_rules/
- /ko/security_platform/application_security/event_rules
- /ko/security/application_security/event_rules
- /ko/security/application_security/threats/inapp_waf_rules
title: 인앱 WAF 규칙
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

## 개요 {#overview}

App and API Protection(AAP)을 활성화하면 Datadog SDK가 모든 웹 서비스 및 API 요청의 의심스러운 보안 활동을 능동적으로 모니터링합니다.

_인앱 WAF 규칙_은 라이브러리가 무엇을 의심스러운 것으로 간주할지 정의하기 위해 들어오는 요청에 대한 조건을 지정합니다. Datadog SDK에는 수백 개의 기본 AAP 인앱 WAF 규칙이 포함되어 있으며, 이는 트레이스 탐색기 및 기본 신호 규칙에 보안 트레이스를 표시하는 데 사용됩니다.

SDK를 업그레이드하지 않고도 인앱 WAF 규칙에 추가할 수 있습니다.

## AAP 인앱 WAF 규칙의 구조 {#structure-of-an-aap-in-app-waf-rule}

인앱 WAF 규칙은 카테고리, 이름, 태그, 조건으로 구성된 JSON 객체입니다. 보안 트레이스가 감지되면 규칙의 태그가 보안 트레이스로 전파되며, [탐지 규칙][1]을 생성하는 데 사용할 수 있습니다.

### 조건 {#conditions}
조건은 규칙이 들어오는 요청에 태그를 지정하는 시점을 정의합니다. 조건은 _입력 사항_과 _연산자_로 구성됩니다.

#### 입력 사항 {#inputs}
입력 사항은 연산자가 적용될 요청의 일부를 나타냅니다. 인앱 WAF 규칙에는 다음과 같은 입력 사항이 사용됩니다.

| 이름 | 설명 | 예시 |
|------|-------------|---------|
| `server.request.uri.raw` | 애플리케이션 서비스가 수신한 전체 요청 URI | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | 파싱된 경로 파라미터(키/값 맵) | `userId => 1234` |
| `server.request.query` | 파싱된 쿼리 파라미터(키/값 맵) | `clientId => 234` |
| `server.request.headers.no_cookies` | 쿠키 헤더(키/값 맵)를 제외한 들어오는 HTTP 요청 헤더 | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | 파싱된 gRPC 메시지(키/값 맵) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | 파싱된 HTTP 본문(키/값 맵) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | http 상태 코드 | `200` |

#### 연산자 {#operators}

| 이름 | 설명 |
|------|-------------|
| `match_regex` | 입력에 대해 정규식 일치를 수행합니다 |
| `phrase_match` | 빠른 키워드 목록 매칭을 수행합니다 |
| `is_xss` | XSS(교차 사이트 스크립팅) 페이로드를 검사하는 특수 연산자 |
| `is_sqli` | SQL 삽입(SQLI) 페이로드를 검사하는 특수 연산자 |

## 커스텀 인앱 WAF 규칙 {#custom-in-app-waf-rules}

커스텀 인앱 WAF 규칙을 사용하면 사용자가 애플리케이션에 대한 특정 유형의 요청을 로그로 남기거나 차단할 수 있습니다. 예를 들어, 커스텀 규칙을 사용하여 로그인 성공 또는 실패를 모니터링할 수 있습니다. 시작하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}} > [{{< ui >}}Custom Rules{{< /ui >}}][4]로 이동하세요.

**참고:** 인앱 WAF의 기본 규칙은 읽기 전용입니다. 인앱 WAF 동작을 세부 조정하려면 인앱 WAF 규칙을 수정하세요. 기본 규칙은 수정할 수 없지만, 기본 규칙 중 하나를 기반으로 커스텀 규칙을 생성하고 필요에 따라 일치 조건을 수정할 수 있습니다. 동일한 요청을 평가하는 유사한 규칙이 두 개 생기지 않도록 기본 규칙을 비활성화하세요.

## 제안된 규칙 {#suggested-rules}

Datadog의 App and API Protection[제안된 규칙][5] 기능은 애플리케이션 트래픽을 자동으로 분석하고 로그인 및 API 흐름을 모니터링하고 보호하는 데 도움이 되는 규칙을 제안합니다. 규칙은 `users.login.success` 또는 `users.login.failure`과 같은 일반적인 인증 패턴을 중심으로 사전 구축되어 있으며, 이는 의심스러운 로그인 동작을 감지하는 데 가장 중요한 신호입니다.

제안된 규칙의 이점은 다음과 같습니다.

- 인증 엔드포인트에 대한 기본 커버리지를 제공하여 수동 구성을 줄일 수 있습니다. 
- 무차별 대입 공격, 크리덴셜 스터핑, 자동화된 로그인 오용과 같은 일반적인 공격 벡터로부터 보호하기 위해 서비스 및 환경 전반에 걸쳐 보호 기능을 더 빠르게 배포할 수 있습니다.
- 갑작스러운 로그인 실패 급증, 동일한 IP에서의 반복적인 시도 또는 비정상적인 지역에서의 로그인 활동과 같은 이상 패턴과 연관시킬 수 있는 로그인 시도에 대한 고충실도 텔레메트리를 제공합니다. 
- 대부분의 ATO 캠페인이 비정상적인 인증 활동을 통해 먼저 표면화되는 [계정 탈취(ATO) 보호][6]에 대한 가시성을 제공합니다. 
- 계정이 손상되기 전에 자격 증명 남용을 탐지하고 대응합니다.

제안된 규칙 사용 케이스는 다음과 같습니다.

  * 무차별 대입 공격, 자격 증명 도용 및 봇 기반 로그인 남용에 대한 보호 기능을 신속하게 배포합니다.
  * 성공 및 실패한 로그인 시도를 추적하고 조건(예: POST 메서드 및 401/403 실패)을 조정하여 제안된 규칙을 ATO 보호의 기준으로 사용합니다.
  * 서비스 전반에 걸쳐 일관된 탐지 논리를 적용하여 공격자가 모니터링이 덜한 환경에서 방어 체계를 우회하기 어렵게 만듭니다.
  * 비정상적인 로그인 활동(예: 실패 급증, 반복적인 실패 후 비정상적인 로그인 성공률)을 모니터링하여 **계정 탈취 시도** 징후를 탐지합니다.

제안된 규칙을 사용하려면 다음 중 하나를 수행하세요.
- 제안된 규칙에서 사용자 지정 규칙 생성:
  1. [제안된 규칙][5]에서 하나 이상의 규칙을 선택하고 {{< ui >}}Create Selected Suggested Rules{{< /ui >}}를 클릭합니다.
  2. {{< ui >}}Create suggested custom In-App WAF rules{{< /ui >}}에서 {{< ui >}}Create rules{{< /ui >}}을 클릭합니다. 이렇게 하면 선택한 규칙의 보안 활동을 모니터링하는 사용자 지정 인앱 WAF 규칙이 생성됩니다.
- 제안된 규칙을 수정하여 사용자 지정 규칙 생성:
  1. [제안된 규칙][5]에서 사용하려는 규칙을 확인하고 {{< ui >}}View suggested rule{{< /ui >}}를 클릭합니다.
  2. {{< ui >}}Add a new Business Logic{{< /ui >}}에서 필요에 따라 규칙을 편집합니다.
  3.  {{< ui >}}Continue in In-App WAF{{< /ui >}}를 클릭합니다.
  4. {{< ui >}}Define your custom rule{{< /ui >}}에서 추가 변경 사항을 적용합니다.
  5.  {{< ui >}}Save Rule{{< /ui >}}를 클릭합니다.


## AAP 인앱 WAF 규칙 구성 {#configure-an-aap-in-app-waf-rule}

서비스 차단은 정책 규칙을 통해 정의됩니다. 인앱 WAF에는 세 가지 Datadog 기본 정책이 포함되어 있습니다. *Datadog Recommended*, 공격만 모니터링하는 Datadog Monitoring-only**, 공격 도구를 차단하고 다른 모든 공격을 모니터링하는 Datadog Block Attack 도구**.

정책을 사용하는 서비스는 정책 관리 페이지에서 바로 확인할 수 있습니다.

1. Datadog에서 [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App WAF{{< /ui >}}][2]로 이동합니다.

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="인앱 WAF 구성 페이지로, 두 가지 기본 정책을 보여줍니다." style="width:100%;" >}}

2. 정책 중 하나의 오른쪽에 있는 세 개의 점을 클릭하고 {{< ui >}}Download Configuration of this Policy{{< /ui >}}를 선택하여 구성 파일을 로컬 컴퓨터에 다운로드합니다.
3. 선택적으로 {{< ui >}}Apply this Policy to Services{{< /ui >}}를 선택하여 보호가 활성화된 하나 이상의 AAP 서비스에 기본 정책을 적용합니다.

   **참고:** 정책은 하나 이상의 서비스에 적용될 수 있지만 서비스는 하나의 _정책_만 포함할 수 있습니다.

3. 위의 사양에 따라 새 규칙의 JSON 정의를 포함하도록 파일을 업데이트합니다. 예를 들면 다음과 같습니다.

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My In-App WAF rule",
        "tags": {
            "category": "attack_attempt",
            "crs_id": "920260",
            "type": "http_protocol_violation"
        },
        "conditions": [
            {
                "operator": "match_regex",
                "parameters": {
                    "inputs": [
                        {
                            "address": "server.request.uri.raw"
                        }
                    ],
                    "options": {
                        "case_sensitive": true,
                        "min_length": 6
                    },
                    "regex": "\\%u[fF]{2}[0-9a-fA-F]{2}"
                }
            }
        ],
        "transformers": []
    },
   {{< /code-block >}}

4. SCP 또는 FTP와 같은 유틸리티를 사용하여 `appsec-rules.json` 파일을 애플리케이션 서버(예: `/home/asm/appsec-rules.json`)로 복사합니다.

5. 환경에 애플리케이션 변수를 추가하기 위한 [AAP 활성화][3]의 지침에 따라 파일의 전체 경로와 함께 `DD_APPSEC_RULES` 환경 변수를 서비스에 추가합니다.
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. 서비스를 다시 시작합니다.

## 다음 단계 {#what-to-do-next}

다음으로, 생성한 인앱 WAF 규칙에 의해 정의된 보안 추적을 기반으로 [보안 신호를 생성하도록 탐지 규칙을 구성][1]합니다. 제공된 기본 제공 AAP 탐지 규칙을 수정하거나 새로 만들 수 있습니다.

[1]: /ko/security/application_security/threat_protection/policies/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /ko/security/application_security/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
[5]: https://app.datadoghq.com/security/appsec/policies/in-app-waf?config_by=suggested-rules
[6]: /ko/security/application_security/threat_protection/account_takeover_protection/