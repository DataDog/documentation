---
description: Bits Investigation을 구성하여 조사의 정확도를 높이는 모범 사례를 알아보세요.
further_reading:
- link: /bits_ai/bits_investigation/knowledge_sources/
  tag: 문서
  text: 지식 소스
- link: /bits_ai/bits_investigation/configure/
  tag: 문서
  text: Integrations 및 설정
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: 문서
  text: Bits Investigation과 채팅
title: Bits Investigation 정확도 개선
---
## 개요 {#overview}

Bits Investigation은 텔레메트리, 통합, 소스 코드 및 메모리를 바탕으로 추론하며 당시 사용 가능한 모든 정보를 조사합니다.

하지만 기술 아키텍처, 태그, 에스컬레이션 경로 또는 조직 고유의 지식은 조직마다 다르므로 최상의 결과를 얻으려면 Bits Investigation을 조직에 맞게 조정해야 합니다.

이 가이드에서는 정확도에 가장 큰 영향을 미치는 다음 모범 사례를 다룹니다.
- [지식 소스 강화](#strengthen-your-knowledge-sources)
- [중요 모니터에서 Auto-Investigate 활성화](#enable-auto-investigate-on-your-critical-monitors)
- [외부 도구 및 문서 연결](#connect-external-tools-and-documentation)
- [Bits Chat을 사용한 변경 사항 테스트](#test-your-changes-with-bits-chat)

## 지식 소스 강화 {#strengthen-your-knowledge-sources}

Bits Investigation은 조사 중에 네 가지 소스, 즉 `bits.md`, 모니터 메시지와 런북, 과거 피드백에서 정보를 가져옵니다. 각 정보가 구체적일수록 향후 조사가 더 정확해집니다. 먼저 Bits Investigation을 사용하고 결과를 확인하세요. 이를 통해 어디에 조정 작업을 집중해야 할지 파악할 수 있습니다.

### 구체적인 규칙 작성 {#write-specific-rules}

Bits Investigation은 모든 조사에서 [`bits.md`][1]를 읽습니다. 일반적인 설명이 아닌 구체적인 규칙을 작성하세요. 설명은 Bits가 텔레메트리에서 이미 추론할 수 있는 내용을 반복하지만, 규칙은 도구 간 이름 불일치처럼 Bits가 스스로 추론할 수 없는 문제를 해결합니다.

| 좋음 | 개선 필요 |
|------|--------------------|
| "결제 팀의 경보에서는 서비스에 `billing-svc` 태그를 사용하지만 APM과 로그에서는 `billing_service`를 사용합니다. 이들을 동일한 서비스로 간주하세요." | "Checkout은 당사의 결제 서비스입니다." |

다음 항목을 우선적으로 작성하세요.
- **시스템 간 이름 매핑**: 동일한 서비스, 환경 또는 팀이 모니터, APM, 로그 및 연결된 티켓팅 시스템에서 서로 다른 이름으로 불리는 경우가 많습니다. 매핑을 한 번만 기록해 두세요.
- **알려진 노이즈**: 인시던트처럼 보이지만 매주 수행되는 재인덱싱 작업이나 부하 테스트와 같이 일상적인 패턴입니다. 이러한 패턴과 실제로 문제로 간주해야 하는 조건을 함께 문서화하세요.
- **상시 범위 규칙**: 환경이나 지역을 지정하지 않은 경보는 모호합니다. Bits가 가정해야 할 기본값을 정의하세요.

전체 샘플 파일은 [지식 소스][1]를 참조하세요.

### 모니터 자체만으로 조사 가능하도록 구성 {#make-your-monitors-self-sufficient}

Bits는 조사 시점에 모니터 메시지를 읽습니다. 이후에 직접 컨텍스트를 추가하지 않아도 Bits가 모니터 메시지만으로 조사할 수 있도록 모니터를 구성하세요.

모니터 메시지에 다음을 추가하세요.
- 가장 먼저 확인할 대시보드, 로그 쿼리 또는 노트북(일반 URL 사용 가능, 서식 불필요)
- 링크가 한두 개 이상 필요한 경우 일반 링크 대신 노트북을 사용합니다. 노트북은 실시간 Datadog 쿼리와 함께 마크다운을 지원합니다.
- 일반적으로 영향을 받는 다운스트림 서비스 또는 종속성

또한 모니터 쿼리의 범위를 `service`로 지정하거나 이를 기준으로 그룹화하세요. 이렇게 하면 Bits가 해당 서비스의 APM, 로그, RUM 및 [Catalog][2]로 전환하여 조사할 수 있습니다. `service` 태그가 없으면 Bits는 모니터 이름과 같은 신뢰도가 낮은 신호에 의존합니다.

모니터 메시지를 주기적으로 검토하세요. 오래되어 유효하지 않은 런북 링크는 링크가 없는 것보다 더 나쁩니다. Bits를 잘못된 대시보드나 서비스가 중단된 서비스로 안내하기 때문입니다.

### 조사에 대한 피드백 제공{#give-feedback-on-investigations}

조사가 끝나면 Bits에 결론이 올바른지 알려주세요. 잘못된 점뿐만 아니라 올바른 점도 확인하세요. 긍정적인 피드백 역시 Bits가 재사용하는 메모리가 됩니다. Bits가 잘못 판단한 경우 실제 근본 원인과 관련 서비스 또는 메트릭을 명시하고 이를 입증하는 텔레메트리를 링크하세요. "틀렸습니다"라고만 하면 Bits가 수정에 활용할 정보가 없습니다.

긍정적인 피드백과 수정 사항은 모두 **메모리**가 되며, Bits는 향후 유사한 조사에서 필요에 따라 이를 재사용합니다. [Monitor Management][8] 페이지의 {{< ui >}}Memories{{< /ui >}} 열에서 이를 검토하거나 삭제하고, 이전 수정 사항이 여전히 유효한지 주기적으로 확인하세요(서비스 이름이 변경되거나 원인이 해결될 수 있음).

## 중요 모니터에서 Auto-Investigate 활성화 {#enable-auto-investigate-on-your-critical-monitors}

[Supported Monitors][8] 페이지에서 조사를 실행할 가치가 있고 컨텍스트를 정확하게 유지할 여력이 있는 모니터로 {{< ui >}}Auto-Investigate{{< /ui >}}의 범위를 지정하세요.

- [`priority:p1`][9](또는 `p2`)로 필터링하여 실제 인시던트일 가능성이 가장 높은 모니터를 찾으세요.
- [`notification:*`][10]으로 필터링하여 이미 담당자나 채널에 알림을 보내는 모니터를 찾으세요.

이 필터링된 목록에서 [{{< ui >}}Auto-Investigate{{< /ui >}} 활성화][13]를 적용하세요. 모든 모니터에 대해 이 기능을 켜면 노이즈가 많고 우선순위가 낮은 알림 전반으로 조사가 분산되어 실제로 중요한 신호가 희석됩니다. 또한 모든 모니터의 `bits.md` 규칙, 런북 및 피드백을 현실적으로 일일이 관리할 수 없게 됩니다.

## 외부 도구 및 문서 연결 {#connect-external-tools-and-documentation}

Bits Investigation은 액세스할 수 있는 텔레메트리와 문서에 대해서만 추론할 수 있습니다. 이러한 소스를 연결하면 Bits가 활용할 수 있는 정보가 늘어납니다.

- **Confluence**: [Confluence 계정을 연결][3]하고 모니터 메시지에 관련 페이지를 링크하세요. Bits는 해당 페이지에서 텔레메트리 링크와 문제 해결 단계를 추출합니다. 계정 크롤링을 활성화하면 [Bits Chat][4]이 링크된 페이지만이 아니라 Confluence 공간을 직접 검색할 수 있습니다.
- **소스 코드**: [GitHub][5]를 연결하고 [APM 텔레메트리에 Git 정보를 태그][6]하여 Bits가 회귀를 이를 유발한 커밋 또는 배포와 연결할 수 있도록 하세요. 또한 이를 통해 Bits Code가 조사를 이어서 수행하고 수정 사항을 제안할 수 있습니다.
- **기타 관측 가능성 도구**: 텔레메트리가 Grafana, Dynatrace, Splunk, Sentry 또는 ServiceNow에 있는 경우 해당 도구를 연결하세요. [타사 관측 가능성 및 SCM 플랫폼과 통합][7]을 참조하세요.

조사 결과를 전송할 Slack, Microsoft Teams 또는 기타 목적지를 설정하려면 [ITSM 및 협업 플랫폼으로 발견 결과 전송][12]을 참조하세요.

## Bits Chat을 사용한 변경 사항 테스트 {#test-your-changes-with-bits-chat}

`bits.md`, 모니터 메시지 또는 스킬을 변경한 후 실제 조사에서 문제가 드러나기 전에 [Bits Chat][4]을 사용하여 변경 사항이 제대로 반영되었는지 확인하세요. 채팅은 동일한 지식 소스를 활용하므로 전체 조사가 실행될 때까지 기다리지 않고도 변경 사항을 확인할 수 있습니다. 또한 Bits Chat에 `bits.md`, 런북 또는 스킬을 개선하는 방법에 대한 제안을 직접 요청할 수 있습니다.

|  목표 |  예시 프롬프트 |
|------|-----------------|
| `bits.md` 명명 규칙 검사 | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| 노이즈 패턴 검사 | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| 런북 또는 Confluence 페이지 검사 | `What does our documentation say about diagnosing <service> issues?` |
| 스킬 검사 | 스킬을 트리거할 질문을 하고 응답이 절차를 따르는지 확인합니다. |
| 과거 수정 사항 검사 | 관련 질문(예: `What's your read on memory pressure on <service>?`)을 하고 수정 사항을 참조하는지 확인합니다. |

답변이 작성한 내용을 반영하지 않는 경우 `bits.md` 항목이 규칙인지 단순 설명인지, 통합이 올바른 권한으로 연결되어 있는지, 링크가 오래되어 유효하지 않은지 확인하세요. 해당 문제를 수정한 후 동일한 프롬프트로 다시 테스트하세요.

아직 수정하지 못한 문제를 찾아내려면 실제 조사 후 다음과 같이 질문하세요. `What information would have made this investigation faster or more accurate?`

채팅에 변경 사항이 반영되면 기존 조사를 다시 실행하여 결론 자체가 개선되었는지 확인하세요. 채팅과 조사는 항상 동일한 방식으로 지식을 활용하지는 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_investigation/knowledge_sources/
[2]: /ko/internal_developer_portal/catalog/
[3]: https://app.datadoghq.com/integrations/confluence
[4]: /ko/bits_ai/bits_investigation/chat_bits_investigation/
[5]: /ko/integrations/github/
[6]: /ko/source_code/service-mapping
[7]: /ko/bits_ai/bits_investigation/configure/#integrate-with-third-party-observability-and-scm-platforms
[8]: https://app.datadoghq.com/bits-ai/monitors/supported
[9]: https://app.datadoghq.com/bits-ai/monitors/supported?q=priority%3Ap1&auto_only=false
[10]: https://app.datadoghq.com/bits-ai/monitors/supported?q=notification%3A%2A&auto_only=false
[12]: /ko/bits_ai/bits_investigation/configure/#send-investigation-findings-to-itsm-and-collaboration-platforms
[13]: /ko/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations