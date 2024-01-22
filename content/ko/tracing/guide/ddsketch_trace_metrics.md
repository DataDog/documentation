---
aliases:
- /ko/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
  tag: 블로그
  text: DDSketch로 정확한 퍼센테이지 계산
- link: https://docs.datadoghq.com/metrics/distributions/
  tag: 설명서
  text: 분포에 대해 더 알아보기
- link: https://docs.datadoghq.com/tracing/guide/metrics_namespace/
  tag: 설명서
  text: 트레이스 메트릭에 대해 더 알아보기
kind: 가이드
title: 애플리케이션 성능 모니터링(APM)의 DDSketch 기반 메트릭
---

트레이스 메트릭은 서비스 및 리소스용으로 자동으로 수집되며, 15개월 동안 보관됩니다. 레이턴시 퍼센테이지는 개별 시계열로 존재합니다. 해당 퍼센테이지는 [Datadog 분포 메트릭][1]으로도 제공됩니다. 각 퍼센테이지에 서로 다른 메트릭을 사용하는 대신 서비스, 리소스 또는 별도의 부차적 기본 태그를 사용합니다. Datadog은 다음과 같은 간단한 메트릭을 제공해 드립니다.

- `trace.<SPAN_NAME>`:
  - *전제 조건:* 모든 애플리케이션 성능 모니터링(APM) 서비스용으로 해당 메트릭이 존재할 것.
  - *설명:* 모든 서비스, 리소스 및 다양한 환경 및 부차적 기본 태그를 아우르는 버전에 대한 레이턴시 분포를 나타냅니다.
  - *메트릭 유형:* [분포][2]
  - *태그:* `env`, `service`, `version`, `resource`, 및 [부차적 기본 태그 설정][3]하기.

애플리케이션 성능 모니터링(APM) 서비스 및 리소스 페이지에서는 자동으로 해당 메트릭 유형을 사용합니다. 해당 메트릭을 사용하여 대시보드 및 모니터링을 구동할 수 있습니다.

**신규 메트릭의 기록 전체를 어떻게 확인할 수 있나요?**
- Datadog은 기존 레이턴시 메트릭에 기반하여 신규 메트릭의 기존 쿼리 을 해당 쿼리에 연결합니다. 그렇기에 쿼리를 여러 개 생성하지 않아도 됩니다.

**레이턴시 값이 변경되었는데 어떻게 된 거죠?**
- Datadog 분포 메트릭은 [DDSketch][4]로 구동합니다. 그러면 순위 오류 보정이 상대 오류 보정으로 변경됩니다. 이로 인해 퍼센테이지 측정값이 모두 실제 퍼센테이지 값에 가깝게 보장됩니다.
- 특히 p99 값이 감소할 것으로 예상할 수 있습니다. 이는 가장 두드러지는 차이점입니다. 신규 값은 정밀한 p99 값에 더욱 밀접하게 집중되어 나타납니다.
- 한 가지 주의할 점은 코드 내에서 산출되는 애플리케이션 성능 모니터링(APM) 메트릭이 Datadog 분포 커스텀 메트릭과 정확히 같지 않다는 점입니다. 백엔드에서 계산되므로 약간 차이가 날 수 있습니다.

**현재 Terraform을 사용하고 있습니다. 변경사항이 있을까요?**
- 기존 메트릭은 그대로 유지되며, Terraform 정의값은 여전히 유효합니다.
- 새로운 DDSketch 기반 메트릭이 제공하는 [더 향상된 정밀도][4] 기능을 활용하려면 다음 예시처럼 Terraform 정의값을 변경합니다.

이전 퍼센테이지:
```
avg:trace.http.request.duration.by.resource_service.99p{service:foo, resource:abcdef1234}
avg:trace.sample_span.duration.by.datacenter_resource_service.75p{datacenter:production, service:bar, resource:ghijk5678}
```

이후 퍼센테이지:
```
p99:trace.http.request{service:foo, resource:abcdef1234}
p75:trace.sample_span{datacenter:production, service:bar, resource:ghijk5678}
```

p100 이전:
```
avg:trace.http.request.duration.by.resource_service.100p{service:foo, resource:abcdef1234}
avg:trace.sample_span.duration.by.datacenter_resource_service.100p{datacenter:production, service:bar, resource:ghijk5678}
```
p100 이후:
```
max:trace.http.request{service:foo, resource:abcdef1234}
max:trace.sample_span{datacenter:production, service:bar, resource:ghijk5678}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/distributions/
[2]: /ko/metrics/types/?tab=distribution#metric-types
[3]: /ko/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/