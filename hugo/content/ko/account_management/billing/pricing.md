---
description: Datadog 가격 모델 및 Infrastructure Monitoring, APM, Logs, Synthetic 테스트 등
  다양한 제품의 청구 계산 방식을 이해합니다.
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: 가격
  text: Datadog 가격
title: 가격
---
Datadog은 다양한 요구 사항에 맞는 여러 가격 플랜을 제공합니다. 자세한 내용은 [Pricing][1] 페이지를 참조하세요. 주문서에 별도로 명시되지 않는 한, Datadog은 매달의 제품 사용량에 따라 요금을 계산합니다. 다음은 가장 일반적인 가격 산정 단위입니다.

## 인프라 모니터링 {#infrastructure-monitoring}

* **호스트**는 물리적 또는 가상 운영 체제 인스턴스입니다. Datadog은 매시간 Infrastructure 서비스에서 모니터링 중인 고유 호스트 수를 기록합니다.
  * 하이 워터마크 플랜(HWMP)에서 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값(고수위 값)을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다.
  * 하이브리드 월별/시간별 요금제(MHP)에서 Datadog은 최소 월별 약정 금액을 청구하고, 해당 약정을 초과하는 호스트 시간에 대해서는 시간당 요금을 청구합니다.
* **컨테이너**는 애플리케이션 소프트웨어와 제한된 운영 체제 라이브러리 및 설정을 포함하는 독립형 운영 환경입니다. Datadog은 Datadog Infrastructure 서비스에서 모니터링 중인 고유한 컨테이너 수를 5분마다 기록합니다. Datadog은 모니터링되는 컨테이너의 일부 시간을 기준으로 매월 요금을 청구합니다.
* [**사용자 지정 메트릭**][2]은 메트릭 이름, 호스트 ID 및 모든 태그의 고유한 단일 조합입니다. 카디널리티 가격에 따라 Datadog은 Datadog Infrastructure 서비스에 시간당 제출된 고유한 사용자 지정 메트릭 수의 월평균을 기준으로 요금을 청구합니다. Datadog은 메트릭 이름과 데이터 포인트 볼륨에 따라 요금을 청구하는 [Metric Name 요금제][12]도 제공합니다.
* **장치**는 하나 이상의 단일 보드 컴퓨터가 프레임에 장착된 물리적 센서입니다. Datadog은 Datadog Infrastructure 서비스에서 동시에 모니터링 중인 장치 및 호스트 수를 기록하고 요금을 청구합니다.
* AWS **Fargate 작업**은 AWS의 ECS 컨테이너 오케스트레이션 플랫폼을 통해 설정된 컨테이너 모음입니다. Datadog은 Datadog Infrastructure(또는 APM) 서비스에서 모니터링 중인 작업 인스턴스의 수를 5분 간격으로 기록합니다. Datadog은 월말에 이러한 간격 기반 측정값을 집계한 후, 애플리케이션이 실행되고 모니터링된 총 시간에 따라 요금을 청구합니다.

## APM {#apm}

* [인프라 모니터링](#infrastructure-monitoring)에서 정의된 호스트에서 실행되는 애플리케이션이 트레이스를 생성하여 Datadog SaaS 애플리케이션에 제출하는 경우, Datadog은 해당 호스트를 하나의 **APM 호스트**로 계산합니다.
  * 하이 워터마크 플랜(HWMP)에서는 Datadog이 호스트 수를 시간별로 측정합니다. 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값(고수위 값)을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다.
  * 하이브리드 월별/시간별 요금제(MHP)에서 Datadog은 최소 월별 약정 금액을 청구하고, 해당 약정을 초과하는 호스트 시간에 대해서는 시간당 요금을 청구합니다.
* **인덱싱된 스팬**은 사용자의 스택 내 개별 서비스에 대한 개별 요청입니다. Datadog은 Datadog APM 내의 [보존 필터][3]에 의해 인덱싱된 스팬의 총 수를 기준으로 요금을 청구합니다.
* **수집된 스팬**은 사용자의 스택 내 개별 서비스에 대한 개별 요청입니다. Datadog은 Datadog APM에 수집된 스팬의 총 기가바이트 수를 기준으로 요금을 청구합니다.

인덱싱된 스팬과 수집된 스팬의 볼륨 모두에 대해 제어를 설정할 수 있습니다. 자세한 내용은 [트레이스 수집][4] 및 [보존][5] 설명서를 참조하세요.

## Database Monitoring {#database-monitoring}

* Datadog은 Datadog Database Monitoring을 통해 매시간 모니터링하고 있는 고유한 데이터베이스 호스트 수를 기록합니다.
  * 하이 워터마크 플랜(HWMP)에서 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값(고수위 값)을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다.
  * 하이브리드 월별/시간별 요금제(MHP)에서 Datadog은 최소 월별 약정 금액을 청구하고, 해당 약정을 초과하는 호스트 시간에 대해서는 시간당 요금을 청구합니다.
* Datadog은 특정 시간에 추적되는 설정된 [정규화된 쿼리][6]의 총 개수를 기준으로 요금을 청구합니다.

## Log Management {#log-management}

* **로그**는 운영 체제, 애플리케이션 또는 기타 소스에서 생성되는 텍스트 기반 활동 기록입니다. Datadog은 Datadog Logs 서비스에 제출된 총 기가바이트 수를 기준으로 수집된 로그에 대한 요금을 청구합니다.
* 로그 **이벤트**는 Datadog Logs 서비스에 의해 인덱싱된 로그입니다. Datadog은 선택한 보존 정책에 지정된 요율에 따라 인덱싱을 위해 제출된 로그 이벤트 100만 회당 요금을 청구합니다.

## Cloud SIEM {#cloud-siem}

* **분석된 로그**는 잠재적인 보안 위협을 탐지하기 위해 분석된 운영 체제, 애플리케이션 또는 기타 소스에서 생성되는 텍스트 기반 활동 기록입니다. Datadog은 Datadog Cloud SIEM 서비스에서 분석한 월별 이벤트 100만 회를 기준으로 분석된 로그에 대한 요금을 청구합니다.

## Synthetic Monitoring {#synthetic-monitoring}

* API 테스트****는 단일 URL에 대한 HTTP 또는 HTTPS 요청입니다. Datadog은 Datadog Synthetic Monitoring 서비스에서 실행된 API 테스트 실행 1만 회당 요금을 청구합니다.
* **브라우저 테스트**는 가상화된 웹 브라우저를 사용하여 웹 기반 애플리케이션에서 진행되는 사용자 작업 시퀀스를 스크립트로 시뮬레이션한 것입니다. Datadog은 Datadog Synthetic Monitoring 서비스에서 실행된 브라우저 테스트 1,000회당 요금을
 청구합니다.

## Cloud Network Monitoring {#cloud-network-monitoring}

* Datadog은 Datadog CNM 서비스로 동시에 모니터링 중인 **Cloud Network Monitoring**(CNM) 호스트 수를 시간별로 기록합니다.
  * 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값(고수위 값)을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다.
* 또한 Datadog은 월별로 모든 CNM 호스트에서 사용된 총 흐름 수를 측정합니다. **흐름**은 5분 동안 측정한 소스(IP:포트)와 대상(IP:포트) 간에 송수신된 트래픽의 기록입니다.

## Real User Monitoring {#real-user-monitoring}

* **세션**은 웹 애플리케이션 상에서 진행되는 사용자 여정입니다. 15분 동안 활동이 없거나 활동이 지속된 지 4시간이 지나면 세션은 만료됩니다.

* Datadog은 최종 사용자가 방문한 모든 페이지와 함께 중요한 텔레메트리 정보를 수집합니다. 여기에는 리소스 로딩(XHR, 이미지, CSS 파일, JS 스크립트 등), 프론트엔드 오류 및 장기 실행 작업이 포함됩니다. 이 모든 데이터는 사용자 세션에 포함됩니다. Datadog은 Datadog Real User Monitoring(RUM) 서비스에 수집된 세션 1,000건당 요금을 청구하며, 다음과 같이 구분됩니다.

- [RUM Measure][10]: SDK에 의해 추적되어 Datadog으로 전송된 세션에 대해 요금이 청구됩니다.
- [RUM without Limits][11]: SDK에서 Datadog으로 유입되는 세션 볼륨과 보존 필터 적용 후 유지되는 세션 볼륨을 기준으로 각각 별도 요금이 청구됩니다.

## Continuous Profiler {#continuous-profiler}

* Datadog은 Datadog Continuous Profiler 서비스를 통해 동시에 모니터링하고 있는 고유한 Continuous Profiler 호스트 수를 시간당 한 번씩 기록합니다.
  * 청구 대상 호스트 수는 해당 월 말에 시간별 사용량 중 하위 99% 구간의 최대값(고수위 값)을 사용하여 계산합니다. Datadog은 사용량 급증이 청구서에 미치는 영향을 줄이기 위해 상위 1%를 제외합니다.
  * 각 호스트에는 최대 4개의 프로파일링된 컨테이너가 무료로 제공됩니다. 이를 초과하는 컨테이너에는 컨테이너당 $2의 요금이 부과됩니다.
    **참고**: 이 할당량은 모든 호스트에 걸쳐 집계되므로 모든 호스트에 평균적으로 4개의 컨테이너가 있는 경우 호스트별로 더 많은 컨테이너가 있는 것처럼 요금이 청구되지 않습니다.
* Datadog은 프로파일링 중인 총 컨테이너 수를 측정합니다. 컨테이너는 애플리케이션 소프트웨어와 제한된 운영 체제 라이브러리 및 설정을 포함하는 독립형 운영 환경입니다. Datadog은 Datadog Continuous Profiler 서비스에서 모니터링 중인 고유한 컨테이너 수를 5분마다 기록합니다. Datadog은 모니터링되는 컨테이너의 일부 시간을 기준으로 매월 요금을 청구합니다. Continuous Profiler의 경우 Datadog은 Continuous Profiler 서비스를 실행 중인 컨테이너만 총 모니터링 컨테이너 수에 포함하여 계산합니다.

## Incident Management {#incident-management}

* 좌석 기반 플랜을 사용하는 조직의 경우 Datadog은 조직의 좌석 약정 수에 따라 요금을 청구합니다. 
* 기존 사용량 기반 플랜을 사용하는 조직의 경우 Datadog은 월간 활성 Incident Management 사용자 수를 추적합니다.
  * Datadog은 사용자가 인시던트 대응에 실질적으로 기여하기 위해 Datadog 기능을 사용한 경우 해당 사용자를 **활성 사용자**로 간주합니다. 예를 들어, 다음 작업을 수행하면 해당 월의 활성 사용자가 됩니다.
    * 인시던트의 상태, 심각도 또는 기타 필드 업데이트
    * 인시던트의 타임라인에 댓글 작성
    * 인시던트 알림 전송
    * 응답자 추가 또는 응답자 유형 할당
    * 인시던트 후속 조치 생성, 수정 또는 할당
    * 사후 분석 보고서 생성
  * 다음 작업만 수행하는 경우에는 _활성 사용자_로 간주되지 않습니다.
    * 인시던트 선언, 조회 또는 검색
    * 인시던트와 연결된 타사 채널, 회의 또는 통화에 참여
    * 인시던트의 Slack 채널 또는 Microsoft Teams 채널에 메시지 게시(메시지가 자동으로 인시던트 타임라인에 동기화되더라도 해당되지 않음)

## CI Visibility {#ci-visibility}

* Datadog은 테스트 및 파이프라인 데이터를 CI Visibility 서비스로 보내는 고유 커미터 수를 추적합니다.
* **커미터**는 Git 작성자 이메일 주소로 식별되는 활성 Git 커미터를 의미합니다. 커미터는 특정 월에 최소 3회 이상 커밋한 경우 청구 대상에 포함됩니다.
  * 파이프라인이 Git 리포지토리와 연결되어 있지 않거나 Git 메타데이터를 사용할 수 없는 경우 파이프라인 실행을 트리거하는 사람의 사용자 이름이 청구 대상 커미터로 사용됩니다.
* Pipeline Visibility의 경우 모든 파이프라인, 파이프라인 단계 및 파이프라인 작업은 하나의 **파이프라인 스팬**으로 계산됩니다. Testing Visibility의 경우 각 개별 테스트 실행은 하나의 **테스트 스팬**으로 계산됩니다.

## 문제 해결 {#troubleshooting}

기술적 지원이 필요한 경우에는 [Datadog 지원팀][7]에 문의하세요.

계정에 대한 시간당 가격이나 청구에 대한 문의는 [영업팀][8] 또는 [고객 성공][9] 관리자에게 문의하세요.

[1]: https://www.datadoghq.com/pricing
[2]: /ko/metrics/custom_metrics/
[3]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /ko/tracing/trace_pipeline/ingestion_controls/
[5]: /ko/tracing/trace_pipeline/trace_retention/
[6]: /ko/database_monitoring/data_collected/#normalized-queries
[7]: /ko/help/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /ko/real_user_monitoring/rum_without_limits/
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring#products
[12]: /ko/account_management/billing/metric_name_pricing/