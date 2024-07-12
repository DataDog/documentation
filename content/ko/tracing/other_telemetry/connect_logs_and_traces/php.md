---
aliases:
- /ko/tracing/connect_logs_and_traces/php
code_lang: php
code_lang_weight: 70
description: PHP 로그와 트레이스를 연결하여 Datadog에서 상호 연결시킵니다.
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
kind: 설명서
title: PHP 로그와 트레이스 상호 연결
type: multi-code-lang
---

## 자동 삽입

버전 `0.89.0`부터 PHP 트레에서는 트레이스 상호 연결 식별자를 애플리케이션 로그에 자동으로 삽입합니다. 자동 삽입을 활성화하려면 환경 변수 `DD_LOGS_INJECTION` (INI 설정 `datadog.logs_injection`)을 `true`로 설정합니다.

PHP 트레이서는 [Monolog][4] 또는 [Laminas 로그][5]와 같은 PSR-3 준수 로거를 지원합니다.

<div class="alert alert-warning">
 <strong>참고</strong>: 로깅 라이브러리를 설정하여 JSON 형식으로 로그를 생성하도록 합니다. 이렇게 하면
  <ul>
    <li><a href="/logs/log_configuration/parsing">커스텀 파싱 규칙이</a> 필요하지 않습니다.</li>
    <li>스택 트레이스가 로그 이벤트에 올바르게 래핑됩니다.</li>
  </ul>
</div>

### 로그에 삽입 설정하기

아직 추가하지 않았다면 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`를 사용하여 PHP 트레이서를 설정합니다. 이렇게 하면 `env`, `service`, `version`를 로그에 추가하는 데 가장 최적화된 환경을 조성할 수 있습니다. 자세한 내용을 확인하려면 [통합 서비스 태깅][6]을 참조하세요.

PHP 트레이서는 트레이스 상호 연결 식별자를 로그에 삽입하도록 설정할 수 있는 다양한 방법을 제공합니다.
- [로그 컨텍스트에 트레이스 상호 연결 식별자를 추가하기](#add-the-trace-correlation-identifiers-to-the-log-context)
- [메시지에 자리표시자 사용하기](#use-placeholders-in-your-message)

#### 로그 컨텍스트에 트레이스 상호 연결 식별자를 추가하기 {#add-the-trace-correlation-identifiers-to-the-log-context}

PHP 트레이서의 기본 작업은 트레이스 상호 연결 식별자를 로그 컨텍스트에 추가하는 것입니다.

예를 들어, 다음과 같이 Laravel 애플리케이션에서 [Monolog][4] 라이브러리를 사용하는 경우를 살펴보겠습니다.

```php
use Illuminate\Support\Facades\Log;
# ...
Log::debug('Hello, World!');
```

PHP 트레이서는 사용 가능한 트레이스 상호 연결 식별자를 로그 컨텍스트에 추가합니다. 위의 로깅된 메시지는 다음과 같이 변환될 수 있습니다.

```
[2022-12-09 16:02:42] production.DEBUG: Hello, World! {"dd.trace_id":"1234567890abcdef","dd.span_id":"1234567890abcdef","dd.service":"laravel","dd.version":"8.0.0","dd.env":"production","status":"debug"}
```

**참고**: 메시지에 자리표시자가 있거나 트레이스 ID가 이미 존재하는 경우, PHP 트레이서는 트레이스 상호 연결 식별자를 로그 컨텍스트에 추가하지 **않습니다**.

#### 메시지에 자리표시자 사용하기 {#use-placeholders-in-your-message}

메시지에 자리표시자를 사용하여 로그에 트레이스 상호 연결 식별자를 자동으로 삽입할 수 있습니다. PHP 트레이스는 다음과 같은 자리표시자를 지원합니다.
- `%dd.trace_id%`: 트레이스 ID
- `%dd.span_id%`: 스팬(span) ID
- `%dd.service%`: 서비스 이름
- `%dd.version%`: 서비스 버전
- `%dd.env%`: 서비스 환경

자리표시자는 대소문자를 구분하며 반드시 `%` 문자로 묶어야 합니다.

예를 들어, 다음과 같이 Laravel 애플리케이션에서 [Monolog][4] 라이브러리를 사용하는 경우, 다음과 같이 로그 메시지에 삽입하도록 설정할 수 있습니다.

```php
use Illuminate\Support\Facades\Log;
# ...
Log::info('Hello, World! [%dd.trace_id% %dd.span_id% %status%]');
```

PHP 트레이서는 자리표시자를 해당 값으로 대체합니다. 예를 들어, 위의 로깅된 메시지는 다음과 같이 변환될 수 있습니다.

```
[2022-12-09 16:02:42] production.INFO: Hello, World! [dd.trace_id="1234567890abcdef" dd.span_id="1234567890abcdef" status="info"]
```

**참고**: PHP [로그 파이프라인][7]에 제공된 기본 파싱 규칙을 사용하려는 경우 대괄호 사용은 필수입니다. 사용자 지정 파싱 규칙을 사용하는 경우 필요하다면 대괄호를 생략할 수 있습니다.


## 수동 삽입

<div class="alert alert-warning">
<strong>참고:</strong><code>\DDTrace\current_context()</code> 함수는 버전 <a href="https://github.com/Datadog/dd-추적하다-PHP/releases/태그를 설정하다/0.61.0">0.61.0</a>에 도입되었으며 10진수 트레이스 식별자를 반환합니다.
</div>

로그와 트레이스를 연결하려면 로그에 `dd.trace_id` 및 `dd.span_id` 속성이 반드시 포함되어야 하며, 개별 트레이스 ID 및 스팬(span) ID가 포함되어야 합니다.

[Datadog 로그 통합][1]을 사용하여 로그를 파싱하지 않는 경우, 사용자 지정 로그 파싱 규칙은 `dd.trace_id` 및 `dd.span_id`가 문자열로 파싱되고 [트레이스 리매퍼][2]를 통해 다시 맵핑되는지 확인해야 합니다. 자세한 내용은 [트레이스 ID 패널에 표시되지 않는 상호 연결 로그][3]에서 확인할 수 있습니다. 

예를 들어, 로그에 다음 두 속성을 추가할 수 있습니다.

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%s dd.span_id=%s]',
      \DDTrace\logs_correlation_trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

로거가 [**monolog/monolog** 라이브러리][4]를 실행한다면 `Logger::pushProcessor()`를 사용하여 모든 로그메시지에 식별자를 자동으로 추가합니다. monolog v1의 경우 다음 설정을 추가합니다.

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

monolog v2의 경우 다음 설정을 추가합니다.

```php
<?php
  $logger->pushProcessor(function ($record) {
      return $record->with(message: $record['message'] . sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      ));
    });
  ?>
```

애플리케이션이 JSON 로그 형식을 사용하는 경우, 다음과 같이 로그 메시지에 `trace_id` 및 `span_id`를 추가하는 대신, `trace_id` 및 `span_id`을 포함하는 1레벨 키 `dd`를 추가합니다.

```php
<?php
  $logger->pushProcessor(function ($record) use ($context) {
      $record['dd'] = [
          'trace_id' => \DDTrace\logs_correlation_trace_id(),
          'span_id'  => \dd_trace_peek_span_id()
      ];

      return $record;
  });
?>
```

monolog v3의 경우 다음 설정을 추가합니다.

```php
<?php
  $logger->pushProcessor(function ($record) {
        $record->extra['dd'] = [
            'trace_id' => \DDTrace\logs_correlation_trace_id(),
            'span_id'  => \dd_trace_peek_span_id()
        ];
        return $record;
    });
?>
```

JSON으로 로그를 수집하는 경우, [JSON 로그 전처리][8]로 이동하여 **트레이스  ID 속성** 필드에 `extra.dd.trace_id`을 추가합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_collection/php/
[2]: /ko/logs/log_configuration/processors/#trace-remapper
[3]: /ko/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
[5]: https://github.com/laminas/laminas-log
[6]: /ko/getting_started/tagging/unified_service_tagging
[7]: /ko/logs/log_configuration/pipelines
[8]: https://app.datadoghq.com/logs/pipelines/remapping