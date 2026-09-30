---
aliases:
- /ko/tracing/connect_logs_and_traces/nodejs
code_lang: nodejs
code_lang_weight: 50
description: Node.js 로그와 트레이스를 연결하여 Datadog에서 상관 관계를 파악하세요.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: 설명서
  text: 애플리케이션을 수동으로 계측하여 트레이스를 생성합니다.
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: 블로그
  text: 로그 요청을 트레이스와 자동으로 상호 연결
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 길라잡이
  text: 제품 간 상관관계를 활용한 쉬운 트러블슈팅
title: Node.js 로그 및 트레이스 상관관계 수립
type: multi-code-lang
---

## 자동 삽입

환경 변수 `DD_LOGS_INJECTION=true`를 사용하거나 추적기를 직접 구성하여 삽입을 활성화합니다.

```javascript
// 이 줄은 로거를 불러오기 전에 작성해야 합니다.
const tracer = require('dd-trace').init({
    logInjection: true
});
```

이렇게 하면 `bunyan`, `paperplane`, `pino`, `winston`의 trace ID 삽입을 자동으로 실행합니다.

아직 하지 않았다면 Node.js 추적기를 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`으로 구성하세요. `env`, `service`, `version` 추가를 위한 최적의 환경을 제공합니다([통합 서비스 태깅][1] 참고).

**참고**: 자동 삽입은 JSON 형식으로 된 로그에만 적용됩니다.

## 수동 삽입

로깅 라이브러리가 자동 삽입을 지원하지 않지만 JSON 형식을 사용한다면 코드에서 직접 삽입할 수도 있습니다.

`console`을 기본 로거로 사용하는 예:

```javascript
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

class Logger {
    log(level, message) {
        const span = tracer.scope().active();
        const time = new Date().toISOString();
        const record = { time, level, message };

        if (span) {
            tracer.inject(span.context(), formats.LOG, record);
        }

        console.log(JSON.stringify(record));
    }
}

module.exports = Logger;
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging