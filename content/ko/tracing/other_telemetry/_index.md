---
description: 애플리케이션 성능 모니터링(APM) 데이터를 추가 Datadog 프로덕트가 수집한 텔레메트리와 연결하는 방법을 알아봅니다.
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 설명서
  text: 교차 제품 연결을 통한 트러블슈팅
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: 블로그
  text: DBM과 애플리케이션 성능 모니터링(APM) 원격 분석을 원활하게 상호 연결하여 엔드투엔드 쿼리 성능을 이해합니다.
kind: 설명서
title: 애플리케이션 성능 모니터링(APM) 데이터와 기타 텔레메트리 상호 연결
---

다양한 Datadog 프로덕트별로 데이터를 상호 연관시켜 단 몇 번의 클릭만으로 비즈니스에 미치는 영향을 추정하고 문제의 근본 원인을 찾을 수 있도록 도와드리는 컨텍스트를 제공합니다. 수신 데이터 간의 연결을 설정하여 탐색기와 대시보드에서 빠르게 피벗 작업을 할 수 있도록 도와드립니다.

## 데이터베이스 모니터링과 트레이스 상호 연결

트레이스 ID를 DBM 데이터 수집에 삽입하여 두 데이터 소스를 상호 연결시킵니다. 애플리케이션 성능 모니터링(APM)에서 데이터베이스 정보를, DBM에서 애플리케이션 성능 모니터링(APM) 정보를 확인하여 시스템 성능에 대한 포괄적 통합 보기 기능을 사용해 보세요. 본 기능을 설정하려면 [DBM과 트레이스 연결하기][4]를 참조하세요.

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="호출하는 APM 서비스별로 데이터베이스 호스트 필터링.">}}


## 로그와 트레이스 상호 연결

트레이스 ID를 로그에 삽입하고 통합 서비스 태깅을 활용하여, 특정 서비스 및 버전과 연관된 정확한 로그나 관측된 트레이스와 상호 연결된 모든 로그를 찾아냅니다. 본 기능을 설정하려면 [로그 및 트레이스 연결하기][1]를 참조하세요.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="로그와 트레이스 연결" style="width:100%;">}}

## RUM 및 트레이스 상호 연결

[RUM과 트레이스][2]를 연결하여 프론트엔드 보기에서 수집한 데이터와 백엔드의 트레이스 및 스팬을 상호 연관시킵니다. 스택의 어느 위치에서든 문제를 정확히 찾아내고 사용자 경험을 이해합니다.

{{< img src="tracing/index/RumTraces.png" alt="RUM 세션과 트레이스 연결" style="width:100%;">}}

## 신서틱(Synthetic) 테스트와 트레이스 상호 연결

관련 트레이스를 조사하여 실패한 신서틱(Synthetic) 테스트를 근본 원인까지 직접 추적합니다. [신서틱과 트레이스][3]을 연결하여 빠르게 코드를 트러블슈팅합니다.

{{< img src="tracing/index/Synthetics.png" alt="신서틱 테스트" style="width:100%;">}}

## 프로필과 트레이스 상호 연결

추적과 프로파일링이 모두 활성화된 애플리케이션 코드의 성능 데이터는 자동으로 상호 연관됩니다. 이렇게 하면 두 가지 분석 유형을 오가며 문제를 해결할 수 있습니다. 스팬(span) 정보에서 코드 핫스팟 탭의 프로파일링 데이터로 바로 이동하여 성능 문제와 관련된 특정 코드 라인을 찾을 수 있습니다. 아울러 느리고 리소스를 많이 소비하는 엔드포인트를 프로파일링 UI에서 직접 디버깅할 수도 있습니다.

자세한 내용을 확인하려면 [슬로우 트레이스 또는 엔드포인트 조사하기][5]를 참조하세요.

{{< img src="profiler/code_hotspots_tab-2.mp4" alt="Code Hotspots tab shows profiling information for a APM trace span" video=true >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[2]: /ko/real_user_monitoring/platform/connect_rum_and_traces/
[3]: /ko/synthetics/apm/
[4]: /ko/database_monitoring/connect_dbm_and_apm/
[5]: /ko/profiler/connect_traces_and_profiles/