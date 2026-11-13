---
aliases:
- /ko/bits_ai/bits_ai_sre/chat_bits_ai_sre/
title: Bits Investigation과 채팅
---
조사 중에 Bits와 대화하여 조사, 관련 텔레메트리 등에 대한 추가 정보를 수집할 수 있습니다.

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="사용자가 Bits AI에게 관련 진행 중인 인시던트에 대해 묻고, Bits AI가 관련 인시던트 목록과 관련 이유에 대한 설명을 제공하는 대화 예시" style="width:100%;" >}}

## 데이터 소스 {#data-sources}

Bits Investigation 챗봇은 다음 항목에 액세스할 수 있습니다.
- **조사 세부 정보**: 모니터 경보, 실행된 탐색 쿼리, 가설 및 평가, 근본 원인 결론에 대한 세부 정보
- **텔레메트리**: 메트릭, 로그, 트레이스, 이벤트, 모니터, RUM 이벤트, 대시보드, 노트북 및 호스트에 대한 세부 정보
- **인시던트**: 인시던트와 해당 상태, 심각도 등에 대한 세부 정보
- **서비스**: 종속성, 소유자 등이 포함된 카탈로그 내 서비스
- **Datadog 설명서**: 문서화된 Datadog 제품 정보
- **Confluence 설명서**: Confluence 설명서의 관련 설명서 또는 런북([Confluence 통합이 계정 크롤링을 활성화하도록 구성된 경우][1])

## 질문 예시 {#example-questions}

| 기능                                  | 프롬프트 예시                                                    | 데이터 소스                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| 조사 세부 정보에 대한 설명 요청 | `Why do you think there's database query slowness?`               | Bits Investigation 세부 정보 |
| 조사 결과에 대한 자세한 설명 요청 | `Tell me more about the increased 500s on <web-store>.`           | Bits Investigation 세부 정보 |
| Bits를 더 효과적으로 사용하는 방법 알아보기             | `How can I make the investigation more effective next time?`      | Bits Investigation 세부 정보 |
| 서비스에 대한 정보 조회            | `Are there any ongoing incidents for <web-store>?`                | 카탈로그 및 인시던트    |
| 서비스의 최근 변경 사항 찾기              | `Were there any recent changes on <web-store>?`                   | Change Tracking                   |
| APM 요청, 오류 및 기간 메트릭 쿼리 | `What's the current error rate for <web-store>?`                  | APM                               |
| Continuous Profiler 데이터 쿼리 및 분석               | `What performance bottlenecks do you see for <web-store>?`        | Continuous Profiler                               |
| Datadog 제품에 대해 문의                     | `Does Bits Investigation connect to Datadog Work Management?`     | Datadog 설명서             |
| Notebooks 생성                              | `Can you create a notebook with a summary of this investigation?` | Notebooks                         |

[1]: bits_ai/bits_investigation/configure#confluence