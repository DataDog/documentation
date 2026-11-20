---
further_reading:
- link: /tracing/trace_collection/dd_libraries/php/
  tags: 설명서
  text: PHP 트레이스 수집 설정하기
- link: /tracing/troubleshooting/
  tags: 설명서
  text: 트러블슈팅
title: PHP CLI 스크립트 추적
---

## 단기 실행 CLI 스크립트

단기 실행 스크립트는 보통 몇 초나 몇 분간 실행됩니다. 예상되는 동작은 스크립트가 한번 실행되는 동안 트레이스 하나를 수신하는 것입니다.

기본적으로 명령줄에서 실행되는 PHP 스크립트에는 추적이 비활성화되어 있습니다. `DD_TRACE_CLI_ENABLED`를 `1`로 설정하면 활성화할 수 있습니다.

```
$ export DD_TRACE_CLI_ENABLED=1
# Optionally, set the agent host and port if different from localhost and 8126, respectively
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

예를 들어 다음 `script.php`가 cURL 요청을 실행한다고 가정해봅니다.

```php
<?php
sleep(1);
$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);
sleep(1);
```

다음 스크립트를 실행합니다.

```
$ php script.php
```

스크립트가 실행되면 트레이스가 생성되고, 스크립트가 종료되면 Datadog 백엔드로 전송됩니다.

{{< img src="tracing/guide/trace_php_cli_scripts/short-running-cli.jpg" alt="단기 실행 PH CLI 스크립트 트레이스" >}}

## 장기 CLI 스크립트

장기 스크립트는 몇 시간 또는 며칠간 실행됩니다. 이 같은 스크립트는 보통 새 수신 메시지나 데이터베이스에 새롭게 추가된 줄을 처리하는 것과 같이 특정 태스크를 반복적으로 실행합니다. 예상 동작은 각 "작업 유닛"(예: 메시지 처리)별로 트레이스 하나가 생성되는 것입니다.

기본적으로 명령줄에서 실행되는 PHP 스크립트에는 추적이 비활성화되어 있습니다. `DD_TRACE_CLI_ENABLED`를 `1`로 설정하면 활성화할 수 있습니다.

```
$ export DD_TRACE_CLI_ENABLED=1
# With this pair of settings, traces for each "unit of work" is sent as soon as the method execution terminates.
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1
# Optionally, set service name, env, etc...
$ export DD_SERVICE=my_service
# Optionally, set the agent host and port if different from localhost and 8126, respectively
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

다음 `long_running.php` 스크립트 예를 참고하세요.

```php
<?php
/* Datadog 특정 코드. 별도 파일일 수 있으며 이 스크립트에 필수 */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;
trace_function('processMessage', function(SpanData $span, $args) {
    // 액세스 방법 인수 및 리소스 이름 변경
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});
trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // 리소스 이름이 인증된 방법 이름으로 기본 설정됨.
});
trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Datadog 코드 종료 */
/** 수신하고 처리할 메시지를 의미 */
class Message
{
    public $id;
    public $content;
    public function __construct($id, $content)
    {
        $this->id   = $id;
        $this->content = $content;
    }
}
/** 여러 처리 단계 중 하나, 각 단계에는 Span이 있어야 함 */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}
/** 여러 처리 단계 중 하나, 각 단계에는 Span이 있어야 함 */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}
/** 실제 적용 시에는 소스에서 새 메시지를 읽음(예: 대기열) */
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}
/** 이 함수는 "작업 단위"임, 한번 실행할 때마다 단일 트레이스를 생성함 */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}
$processors = [new ProcessingStage1(), new ProcessingStage2()];
/** 새 메시지를 기다리며 영구적으로 실행되는 루프 */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

다음 스크립트를 실행합니다.

```
$ php long_running.php
```

스크립트가 실행되면 트레이스 하나가 생성되고, 새 메시지를 처리할 때마다 Datadog 백엔드로 전송됩니다.

{{< img src="tracing/guide/trace_php_cli_scripts/long-running-cli.jpg" alt="장기 실행 PHP CLI 스크립트 트레이스" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}