---
further_reading:
- link: /integrations/azure_app_services/
  tag: 설명서
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: 설명서
  text: Azure App Service 환경
title: Instrument Azure App Service - Linux Containers
---

<div class="alert alert-info"><code>serverless-init</code>를 사용하여 Azure App Service 컨테이너를 계측하려면 <a href="/serverless/guide/azure_app_service_linux_containers_serverless_init">Instrument Azure App Service - Linux Container with serverless-init</a>을 참조하세요.</div>

### 사전 필수 조건

이 문서에서는 Azure의 [Azure App Service에서 커스텀 컨테이너에 대한 사이드카 컨테이너 구성][1] 튜토리얼에 따라 애플리케이션이 사이드카에 대해 설정되었다고 가정합니다.

## 설정

### 애플리케이션

{{< tabs >}}
{{% tab "Node.js" %}}
#### 추적
`dd-trace-js` 라이브러리를 사용하여 기본 애플리케이션을 계측합니다. 지침은 [Node.js 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
커스텀 메트릭도 트레이서를 통해 수집됩니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성할 수도 있습니다. 그러나 모든 로그 파일을 `/home/LogFiles`에서 추적하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[3]: /ko/logs/log_collection/nodejs/?tab=winston30
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### 추적
`dd-trace-py` 라이브러리를 사용하여 기본 애플리케이션을 계측하세요. 지침은 [Python 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
커스텀 메트릭도 트레이서를 통해 수집됩니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성할 수도 있습니다. 그러나 모든 로그 파일을 `/home/LogFiles`에서 추적하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[3]: /ko/logs/log_collection/python/
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### 추적
`dd-trace-java` 라이브러리를 사용하여 기본 애플리케이션을 계측하세요. 지침은 [Java 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
커스텀 메트릭도 트레이서를 통해 수집됩니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성할 수도 있습니다. 그러나 모든 로그 파일을 `/home/LogFiles`에서 추적하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[3]: /ko/logs/log_collection/java/?tab=winston30
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab "Go" %}}
#### 추적
`dd-trace-go` 라이브러리를 사용하여 기본 애플리케이션을 계측하세요. 지침은 [Go 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
커스텀 메트릭도 트레이서를 통해 수집됩니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성할 수도 있습니다. 그러나 모든 로그 파일을 `/home/LogFiles`에서 추적하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[3]: /ko/logs/log_collection/go/
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### 추적
`dd-trace-php` 라이브러리를 사용하여 기본 애플리케이션을 계측하세요. 지침은 [PHP 애플리케이션 추적][1]을 참조하세요.

#### 메트릭
커스텀 메트릭도 트레이서를 통해 수집됩니다. [코드 예시][2]를 참조하세요.

#### 로그
Datadog 사이드카는 파일 테일링을 사용하여 로그를 수집합니다. Datadog에서는 이 디렉터리가 다시 시작해도 유지되므로 애플리케이션 로그를 `/home/LogFiles/`에 작성할 것을 권장합니다.

Datadog으로 전송되는 내용을 더 효과적으로 제어하려면 `/home/LogFiles/myapp`와 같은 하위 디렉터리를 생성할 수도 있습니다. 그러나 모든 로그 파일을 `/home/LogFiles`에서 추적하지 않으면 시작 및 오류와 관련된 Azure App Service 애플리케이션 로그가 수집되지 않습니다.

애플리케이션에서 로깅을 설정하려면 [Node.js 로그 수집][3]을 참조하세요. 트레이스 로그 상관관계를 설정하려면 [Node.js 로그와 트레이스 상관관계][4]를 참조하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[3]: /ko/logs/log_collection/php/
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### 사이트카 컨테이너

1.  Azure Portal에서 **Deployment Center**로 이동한 후 **Add**를 선택합니다.
2. **Edit container** 형식에서 다음을 제공합니다.
   - **이미지 출처**: Docker Hub 또는 기타 레지스트리
   - **이미지 유형**: 공개
   - **레지스트리 서버 URL**: `index.docker.io`
   - **이미지 및 태그**: `datadog/serverless-init:latest`
   - **포트**: 8126
3. *Apply**를 선택합니다.

### 애플리케이션 설정

Azure의 **App settings**에서 다음 환경 변수를 설정합니다.

- `DD_API_KEY`: [Datadog API 키][3]
- `DD_SERVICE`: 서비스에 태그를 지정하는 방법 (예: `sidecar-azure`)
- `DD_ENV`: 환경에 태그를 지정하는 방법 (예: `prod`)
- `DD_SERVERLESS_LOG_PATH`: 로그를 작성하는 위치 (예: `/home/LogFiles/*.log` 또는`/home/LogFiles/myapp/*.log`)

## 애플리케이션 예시
다음 예에는 추적, 메트릭 및 로그가 설정된 단일 앱이 포함되어 있습니다.

{{< tabs >}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
 logInjection: true,
});
const express = require("express");
const app = express();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
 level: 'info',
 exitOnError: false,
 format: format.json(),
 transports: [new transports.File({ filename: `/home/LogFiles/app.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("Welcome!");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("Hello!");
 metricPrefix = "nodejs-azure-sidecar";
 // 하나 이상의 단일 메트릭을 테스트할 수 있도록 세 개의 고유 메트릭을 보냅니다
 metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
 metricsToSend.forEach((metric) => {
   for (let i = 0; i < 20; i++) {
     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
   }
 });
 res.status(200).json({ msg: "Sending metrics to Datadog" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```
{{% /tab %}}
{{% tab "Python" %}}
```python
from flask import Flask, Response
from datadog import initialize, statsd
import ddtrace
import logging

ddtrace.patch(logging=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(filename='/home/LogFiles/app.log', format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}

initialize(**options)

app = Flask(__name__)

@app.route("/")
def home():
   statsd.increment('page.views')
   log.info('Hello Datadog!!')
   return Response('💜 Hello Datadog!! 💜', status=200, mimetype='application/json')

app.run(host="0.0.0.0", port=8080)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
public class HelloController {
   private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").port(8125).build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Azure!");
       return "💜 Hello Azure! 💜";
   }

}

```
{{% /tab %}}
{{% tab "Go" %}}
```go
package main

import (
   "fmt"
   "log"
   "net/http"
   "os"
   "path/filepath"
   "github.com/DataDog/datadog-go/v5/statsd"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

const logDir = "/home/LogFiles"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Hello Datadog!")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{}, 1)
   fmt.Fprintf(w, "💜 Hello Datadog! 💜")
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
   span := tracer.StartSpan(
       "writeLogToFile",
       tracer.ResourceName("/writeLogsToFile"),
       tracer.ChildOf(context))
   defer span.Finish()
   _, err := logFile.WriteString(log_msg + "\n")
   if err != nil {
       log.Println("Error writing to log file:", err)
   }
}

func main() {
   log.Print("Main container started...")

   err := os.MkdirAll(logDir, 0755)
   if err != nil {
       panic(err)
   }
   logFilePath := filepath.Join(logDir, "app.log")
   log.Println("Saving logs in ", logFilePath)
   logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
   if err != nil {
       panic(err)
   }
   defer logFileLocal.Close()

   logFile = logFileLocal

   dogstatsdClient, err = statsd.New("localhost:8125")
   if err != nil {
       panic(err)
   }
   defer dogstatsdClient.Close()

   tracer.Start()
   defer tracer.Stop()

   http.HandleFunc("/", handler)
   log.Fatal(http.ListenAndServe(":8080", nil))
}

```
{{% /tab %}}
{{% tab "PHP" %}}
```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;

$statsd = new DogStatsd(
   array('host' => '127.0.0.1',
         'port' => 8125,
    )
 );

$log = new logger('datadog');
$formatter = new JsonFormatter();

$stream = new StreamHandler('/home/LogFiles/app.log', Logger::DEBUG);
$stream->setFormatter($formatter);

$log->pushHandler($stream);

$log->pushProcessor(function ($record) {
 $record['message'] .= sprintf(
     ' [dd.trace_id=%s dd.span_id=%s]',
     \DDTrace\logs_correlation_trace_id(),
     \dd_trace_peek_span_id()
 );
 return $record;
});

$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';

$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));

?>

```
{{% /tab %}}
{{< /tabs >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container-sidecar
[2]: https://docs.datadoghq.com/ko/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: https://app.datadoghq.com/organization-settings/api-keys