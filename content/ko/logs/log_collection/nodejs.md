---
aliases:
- /ko/logs/languages/nodejs
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: 로그 수집 트러블슈팅 가이드
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
title: Node.js 로그 수집
---


## 로거 설정

로그를 Datadog으로 전송하려면 로그를 파일로 출력한 후 해당 파일을 Datadog 에이전트로 [테일링][14]합니다. [Winston][1] 로깅 라이브러리로 Node.js 애플리케이션에서 로그를 수집합니다.

Winston은 [NPM][2]으로 사용할 수 있으며, 시작하려면 코드에 종속성을 추가해야 합니다.

```text
npm install --save winston
```

`package.json`이 해당 종속성으로 업데이트됩니다.

```js
{
  "name": "...",

  //...
  "dependencies": {
    //...
    "winston": "x.y.z",
    //...
  }
}
```

### 로그를 파일로 출력

부트스트랩 파일이나 코드에서 다음과 같이 로거를 선언합니다.

{{< tabs >}}
{{% tab "Winston 3.0" %}}

```js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/<FILE_NAME>.log` }),
  ],
});

module.exports = logger;

// 예시 로그
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{% tab "Winston 2.0" %}}

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: '<LOGGER_NAME>',
            filename: '<FILE_NAME>.log',
            json: true,
            level: 'info'
        })
    ]
});

// 예시 로그
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{< /tabs >}}

`<FILE_NAME>.log` 파일의 내용을 확인하여 Winston이 다음과 같이 JSON으로 로깅 중인지 확인합니다.

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

## Datadog 에이전트 설정

[로그 수집이 활성화되면][6] [사용자 지정 로그 수집][7]을 설정해 로그 파일을 테일링하고 새 로그를 Datadog에 전송합니다.

1. `conf.d/` [에이전트 설정 디렉토리][8]에 `nodejs.d/` 폴더를 생성합니다.
2. 다음을 사용해 `nodejs.d/`에 `conf.yaml` 파일을 생성합니다.

```yaml
init_config:

instances:

##로그 섹션
logs:

  - type: file
    path: "<FILE_NAME_PATH>.log"
    service: <SERVICE_NAME>
    source: nodejs
    sourcecategory: sourcecode
```

3. [에이전트를 재시작합니다] [9].
4. [에이전트의 상태 하위 명령][10]을 실행하고 `Checks` 섹션에서 `nodejs`를 찾아 로그가 Datadog에 제출되었는지 확인하세요.

로그가 JSON 형식이면 Datadog은 자동으로 [로그 메시지를 파싱][11]하여 로그 속성을 추출합니다. [로그 탐색기][12]로 로그를 확인하고 문제를 해결하세요.

## 로그 및 트레이스에 서비스 연결

본 애플리케이션에 애플리케이션 성능 모니터링(APM)이 활성화된 경우 [APM Node.js 지침에 따라][3] 트레이스 ID, 스팬(span) ID, `env`, `service`, `version`을 자동으로 로그에 추가해 로그와 트레이스를 연결하세요.

**참고**: 애플리케이션 성능 모니터링(APM) 트레이서가 로그에 `service`를 삽입하면 에이전트 설정의 값 집합이 재정의됩니다.

## 에이전트리스 로깅

호스트에 에이전트를 설치하지 않고도 애플리케이션에서 Datadog으로 로그를 스트리밍할 수 있습니다. 그러나 기본 연결 관리 기능을 제공하는 에이전트를 사용하여 로그를 전달할 것을 권장합니다.

[Winston HTTP 전송][4]을 사용하여 [Datadog 로그 API][5]를 통해 로그를 직접 전송합니다.
부트스트랩 파일 또는 코드에서 다음과 같이 로거를 선언합니다.

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.{{< region-param key="dd_site" >}}',
  path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<APPLICATION_NAME>',
  ssl: true
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});

module.exports = logger;

// 로그 예시
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

**참고:** 커뮤니티 지원 [Datadog 전송][13] 기능을 사용할 수도 있습니다.


## 문제 해결

애플리케이션에서 DNS 조회 오류가 발생하는 경우 로그스태시(Logstash) 예외가 탐지되지 않았기 때문일 수도 있습니다. 다음과 같이 핸들러를 추가합니다.

```js
var logstash = new winston.transports.Logstash({ ... });
logstash.on('error', function(err) {
    console.error(err); // 여기를 커스텀 기능으로 교체
});
```

파라미터 `max_connect_retries`가 `1`로 설정되어 있지 않은지 확인합니다(기본값: `4`).

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/winstonjs/winston
[2]: https://www.npmjs.com
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: /ko/api/v1/logs/#send-logs
[6]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[7]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[9]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[10]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[11]: /ko/logs/log_configuration/parsing/?tab=matchers
[12]: /ko/logs/explorer/#overview
[13]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport
[14]: /ko/glossary/#tail