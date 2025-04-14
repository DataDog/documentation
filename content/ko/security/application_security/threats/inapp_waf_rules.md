---
aliases:
- /ko/security_platform/application_security/event_rules
- /ko/security/application_security/event_rules
- /ko/security/application_security/threats/event_rules
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog 애플리케이션 보안 관리로 위협으로부터 보호
- link: /security/application_security/custom_rules/
  tag: 설명서
  text: 커스텀 탐지 규칙 작성하기
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: 일반적인 Datadog 애플리케이션 보안 관리 문제 트러블슈팅
title: Synthetic 모니터링
---

## 개요

ASM(애플리케이션 보안 관리)이 활성화되면 Datadog 트레이싱 라이브러리는 의심스러운 보안 활동이 있는지 모든 웹 서비스 및 API 요청을 적극적으로 모니터링합니다.

_In-App WAF 규칙_은 라이브러리가 의심스럽게 여기는 항목을 정의하기 위해 들어오는 요청에 대한 조건을 지정합니다. Datadog 트레이싱 라이브러리는 즉시 사용 가능한 수백 개의 ASM In-App WAF 규칙을 포함하고 있습니다. 이 규칙은 트레이스 탐색기 및 기본 신호 규칙에서 보안 트레이스를 표시하는 데 사용됩니다.

트레이싱 라이브러리를 업그레이드하지 않고도 In-App WAF 규칙에 추가할 수 있습니다.

## ASM In-App WAF 규칙의 구조

In-App WAF 규칙은 카테고리, 이름, 태그 및 조건으로 구성된 JSON 개체입니다. 보안 트레이스가 감지되면 규칙의 태그가 보안 트레이스로 전파되고 [탐지 규칙][1]을 구축하는 데 사용될 수 있습니다.

### 조건
조건은 들어오는 요청에 규칙이 언제 태그를 지정하는지를 정의합니다. 조건은 _inputs_ 및 _operators_로 구성됩니다.

#### 입력
입력은 연산자가 적용되는 요청 부분을 나타냅니다. In-App WAF 규칙에는 다음 입력이 사용됩니다.

| 이름 | 설명 | 예시 |
|------|-------------|---------|
| `server.request.uri.raw` | 애플리케이션 서비스가 수신한 전체 요청 URI | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | 파싱된 경로 파라미터(키/값 맵) | `userId => 1234` |
| `server.request.query` | 파싱된 쿼리 파라미터(키/값 맵) | `clientId => 234` |
| `server.request.headers.no_cookies` | 쿠키 헤더(키/값 맵)를 제외한 들어오는 http 요청 헤더 | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | 파싱된 gRPC 메시지(키/값 맵) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | 파싱된 HTTP 본문(키/값 맵) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | http 상태 코드 | `200` |

#### 연산자

| name | 설명 |
|------|-------------|
| `match_regex` | 입력에 대해 정규식 일치를 수행함 |
| `phrase_match` | 빠른 키워드 목록 매칭을 수행함 |
| `is_xss` | XSS(교차 사이트 스크립팅) 페이로드를 확인하는 특수 연산자 |
| `is_sqli` | SQL 삽입(SQLI) 페이로드를 확인하는 특수 연산자 |

## 커스텀 인앱 WAF 규칙

커스텀 인앱 WAF 규칙을 통해 사용자는 애플리케이션에 대한 특정 유형의 요청을 기록하거나 차단할 수 있습니다. 예를 들어 커스텀 규칙을 사용하여 로그인 성공 또는 실패를 모니터링할 수 있습니다. 시작하려면 **Security** -> **Application Security** -> **Protection** -> **In-App WAF** -> [**Custom Rules**][4]로 이동하세요.

**참고:** 인앱 WAF의 기본 규칙은 읽기 전용입니다. 인앱 WAF 동작을 개선하려면 인앱 WAF 규칙을 수정해야 하는데 기본 규칙은 수정할 수 없습니다. 그러나 기본 규칙 중 하나를 기반으로 커스텀 규칙을 만들고 필요에 따라 일치 조건을 수정할 수 있습니다. 동일한 요청을 평가하는 두 개의 유사한 규칙이 없도록 기본 규칙을 비활성화해야 합니다.

## ASM In-App WAF 규칙 구성

서비스 차단은 정책 규칙을 통해 정의됩니다. 인앱 WAF에는 세 가지 Datadog 기본 정책이 포함되어 있습니다: *Datadog Recommended*, 공격만 모니터링하는 *Datadog Monitoring-only*, 공격 도구를 차단하고 다른 모든 공격을 모니터링하는 *Datadog Block Attack tools*.

정책을 사용하는 서비스는 정책 관리 페이지에서 바로 확인할 수 있습니다.

1. Datadog에서 [Security > Application Security > Protection > In-App WAF][2]로 이동합니다.

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="두 개의 기본 정책을 보여주는 In-App WAF 구성 페이지" style="width:100%;" >}}

2. 정책의 오른 쪽에 있는 세 개의 점을 클릭하고 **Download Configuration of this Policy**를 선택하여 구성 파일을 로컬 컴퓨터에 다운로드합니다.
3. (선택 사항) 보호가 활성화된 하나 이상의 ASM 서비스에 기본 정책을 적용하려면 **Apply this Policy to Services**를 선택합니다.

   **참고:** 정책은 하나 이상의 서비스에 적용될 수 있지만 서비스는 하나의 _정책_만 포함할 수 있습니다.

3. 위의 사양에 따라 새 규칙의 JSON 정의를 포함하도록 파일을 업데이트하세요. 예를 들어:

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

4. SCP 또는 FTP와 같은 유틸리티를 사용하여 `appsec-rules.json` 파일을 애플리케이션 서버에 복사합니다 (예: `/home/asm/appsec-rules.json`).

5. 환경에 애플리케이션 변수를 추가하기 위한 [ASM 활성화][3]의 지침에 따라 파일의 전체 경로와 함께 `DD_APPSEC_RULES` 환경 변수를 서비스에 추가합니다.
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. 서비스를 다시 시작하세요.

## 다음 단계

생성한 In-App WAF 규칙에 의해 정의된 보안 추적을 기반으로 [보안 신호를 생성하도록 탐지 규칙을 구성][1]합니다. 제공된 기본 ASM 탐지 규칙을 수정하거나 새 규칙을 생성할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /ko/security/application_security/threats/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
