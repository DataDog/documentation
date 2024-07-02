---
aliases:
- /ko/integrations/faq/how-to-use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags
further_reading:
- link: /integrations/java/
  tag: 설명서
  text: Java 통합
- link: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
  tag: 설명서
  text: jConsole에서 JMX 데이터를 확인하고 수집하도록 jmx.yaml을 설정합니다.
title: Bean 정규식을 사용한 JMX 메트릭 필터링 및 추가 태그 제공
---

Datadog는 JMX Mbean 이름과 도메인 이름을 일치시켜 및 `include` 및 `exclude` 필터를 설정하는 정규식을 지원합니다. 정규식은 [자바(Java)의 정규식 형식][1]을 준수해야 합니다. 이러한 필터는 버전 5.5.0에 추가되었습니다.

제공된 정규식의 캡처 그룹을 사용하여 지표에 대한 추가 태그 값을 제공할 수 있습니다.

이 글에서는 [Java 통합][2]을 사용하는 방법과 이러한 캡처 그룹을 참조하여 추가 태그를 설정하는 방법에 대한 한 가지 예를 제공합니다.

다음과 같은 Mbean 이름, `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`이 있다고 가정합니다. 에이전트가 메트릭을 수집한 후 태그로 사용할 수 있는 몇 가지 정보가 있습니다. 예를 들어 다음 태그를 사용하여 메트릭을 내보낼 수 있습니다.

* `env`: `dev`
* `region`: `eu-central-1`
* `method`: `GET`
* `status`: `200`

Bean 정규식은 단일 정규식 또는 정규식 목록으로 제공될 수 있습니다. 후자의 경우 일치하는 목록의 첫 번째 항목만 고려됩니다. 몇 가지 추가 태그를 사용하여 커스텀 메트릭을 내보내려면 설정 파일의 예를 참조하세요.

```yaml
init_config:
  is_jmx: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      - include:
          domain: domain.example.com
          bean_regex:
            - "domain.example.com:name=my.metric.name.*(?:\\.env\\.)([a-z]+)(?:.*\\.region\\.)([a-z-]+[0-9])(?:.*\\.method\\.)([A-Z]+)(?:.*\\.status\\.)([0-9]+)(?:.*)"
          attribute:
            attribute1:
              metric_type: gauge
              alias: "my.jmx.metric"
          tags:
              env: $1
              region: $2
              method: $3
              status_code: $4
              optional: tag
```

각 캡처 그룹은 Java 맵에 저장됩니다. 첫 번째 캡처 그룹은 `0` 위치에서 시작됩니다. 태그로 내보낼 캡처 그룹을 결정한 후에는 그룹 개수(예: 지도 내 위치)뿐만 아니라 또는 `include` 또는 `exclude` 필터의 `tags` 섹션에서 해당 그룹을 참조해야 합니다.

`bean_regex`에서 제공되는 예시의 경우 캡처 그룹은 다음과 같습니다.

* `$0`: `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`
* `$1`: `dev`
* `$2`: `eu-central-1`
* `$3`: `GET`
* `$4`: `200`

[메트릭 탐색기][3]를 사용하면 메트릭을 쿼리하고 방금 생성한 태그를 기준으로 필터링할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[2]: /ko/integrations/java/
[3]: /ko/metrics/explorer/