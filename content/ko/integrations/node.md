---
aliases:
- /ko/integrations/nodejs/
categories:
- languages
- log collection
- tracing
custom_kind: 통합
dependencies: []
description: DogStatsD 또는 API를 통해 Node.js 서비스에서 커스텀 메트릭 전송
doc_link: https://docs.datadoghq.com/integrations/nodejs/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/node-logging-best-practices/
  tag: 블로그
  text: Node.js 로그를 수집, 맞춤화, 중앙화하는 방법
- link: https://www.datadoghq.com/blog/node-monitoring-apm/
  tag: 블로그
  text: Node.js monitoring with Datadog APM and distributed tracing
git_integration_title: node
has_logo: true
integration_id: node
integration_title: Node.js
integration_version: ''
is_public: true
manifest_version: '1.0'
name: node
public_title: Datadog-Node.js Integration
short_description: DogStatsD 또는 API를 통해 Node.js 서비스에서 커스텀 메트릭 전송
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Node.js 통합으로 Node.js 애플리케이션 로그, 트레이스, 커스텀 메트릭을 수집 및 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

Node.js 통합을 사용하면 코드 몇 줄을 계측하여 커스텀 메트릭을 모니터링할 수 있습니다. 예를 들어 페이지 조회 수 또는 기능 호출 시간 등의 메트릭을 받을 수 있습니다.

Node.js 통합에 관한 추가 정보를 보려면 [메트릭 제출 가이드][1]를 참고하세요.

```js
// dd-trace 필요
const tracer = require('dd-trace').init();

// 카운터 증분
tracer.dogstatsd.increment('page.views');
```

커스텀 메트릭이 정상적으로 작동하려면 에이전트에서 DogStatsD를 활성화해야 합니다. 수집은 기본적으로 활성화되어 있으나 에이전트에서는 로컬 호스트의 메트릭에만 수신 대기합니다. 외부 메트릭을 허용하려면 환경 변수를 설정하거나 구성 파일을 업데이트해야 합니다.

```sh
DD_USE_DOGSTATSD=true # default
DD_DOGSTATSD_PORT=8125 # default
DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # if expecting external metrics
```

```yaml
use_dogstatsd: true # default
dogstatsd_port: 8125 # default
dogstatsd_non_local_traffic: true # if expecting external metrics
```

또한 에이전트의 DogStatsD 수집기를 사용하려면 애플리케이션을 구성해야 합니다.

```sh
DD_DOGSTATSD_HOSTNAME=localhost DD_DOGSTATSD_PORT=8125 node app.js
```

### 트레이스 수집

[Node.js 애플리케이션 계측하기][2] 전용 설명서를 참고하여 트레이스를 Datadog으로 전송하세요.

### 로그 수집

_에이전트 v6.0+에서 사용 가능_

[Node.js 로그 수집][3] 설정에 관한 전용 설명서를 참고하여 로그를 Datadog로 전송하세요.

### 프로파일 수집

[Node.js 프로파일러][4] 전용 설명서를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
[2]: https://docs.datadoghq.com/ko/tracing/setup/nodejs/
[3]: https://docs.datadoghq.com/ko/logs/log_collection/nodejs/
[4]: https://docs.datadoghq.com/ko/profiler/enabling/nodejs/
[5]: https://docs.datadoghq.com/ko/help/