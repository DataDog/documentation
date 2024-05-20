---
aliases:
- /ko/logs/languages/php
further_reading:
- link: https://www.datadoghq.com/blog/php-logging-guide
  tag: 블로그
  text: PHP 로그 수집, 사용자 지정, 분석 방법
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: 설명서
  text: 로그 수집 트러블슈팅 가이드
- link: /glossary/#tail
  tag: 설정
  text: '"tail"에 대한 용어 항목'
kind: 설명서
title: PHP 로그 수집
---

## 개요

PHP 로그를 Datadog으로 전송하려면 로그를 파일로 출력한 후 Datadog에이전트로 [테일링][14]합니다. 본 페이지에서는 [Monolog][8], [Zend-Log][9], [Symfony][10] 로깅 라이브러리 설정 예제를 자세히 살펴봅니다.

## 설정

### 설치

{{< tabs >}}
{{% tab "PHP Monolog" %}}

이 명령을 실행하여 [Composer][1]를 사용하여 Monolog를 종속성으로 추가합니다.

```text
composer require "monolog/monolog"
```

또는 다음 단계에 따라 Monolog를 수동으로 설치합니다.

1. 리포지토리에서 Monolog를 다운로드하여 라이브러리에 추가합니다.
2. 애플리케이션의 부트스트랩에 다음을 추가하여 인스턴스를 초기화합니다.

    ```php
    <?php
      require __DIR__ . '/vendor/autoload.php';

      // load Monolog library
      use Monolog\Logger;
      use Monolog\Handler\StreamHandler;
      use Monolog\Formatter\JsonFormatter;
    ```

[1]: https://getcomposer.org
{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Zend-Log는 Zend 프레임워크의 일부입니다. 다음 명령을 실행하여 [Composer][1]로 Zend-Log를 추가합니다.

```text
composer require "zendframework/zend-log"
```

또는 다음 단계에 따라 Zend-Log를 수동으로 설치합니다.

1. 리포지토리에서 소스를 다운로드하여 라이브러리에 추가합니다.
2. 애플리케이션의 부트스트랩에 다음을 추가하여 인스턴스를 초기화합니다.

```php
<?php
  require __DIR__ . '/vendor/autoload.php';

  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;
```

[1]: https://getcomposer.org
{{% /tab %}}
{{% tab "PHP Symfony" %}}

다음을 추가하여 Monolog JSON 포맷터를 서비스로 선언합니다.

```yaml
services:
    monolog.json_formatter:
        class: Monolog\Formatter\JsonFormatter
```

{{% /tab %}}
{{< /tabs >}}

### 로거 설정

{{< tabs >}}
{{% tab "PHP Monolog" %}}

다음 설정으로 JSON 포맷팅을 활성화하고 `application-json.log` 파일에 로그 및 이벤트를 기록합니다. 코드에서 Monolog 인스턴스를 초기화한 다음 새 핸들러를 추가합니다.

```php
 <?php
  require __DIR__ . '/vendor/autoload.php';

  // Monolog 라이브러리 불러오기
  use Monolog\Logger;
  use Monolog\Handler\StreamHandler;
  use Monolog\Formatter\JsonFormatter;

  // 로그 채널 생성하기
  $log = new Logger('channel_name');

  // Json 포맷터 생성하기
  $formatter = new JsonFormatter();

  // 핸들러 생성하기
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  // 바인딩
  $log->pushHandler($stream);

  // 예시
  $log->info('Adding a new user', array('username' => 'Seldaek'));
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

다음 설정으로 JSON 포맷팅을 활성화하고 `application-json.log` 파일에 로그 및 이벤트를 기록합니다. 코드에서 Zend-Log 인스턴스를 초기화한 다음 새 핸들러를 추가합니다.

```php
<?php
  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;

  // 로거 생성하기
  $logger = new Logger();

  // 작성자 생성하기
  $writer = new Stream('file://' . __DIR__ . '/application-json.log');

  // Json 포맷터 생성하기
  $formatter = new JsonFormatter();
  $writer->setFormatter($formatter);

  // 바인딩
  $logger->addWriter($writer);
  Zend\Log\Logger::registerErrorHandler($logger);
```

{{% /tab %}}
{{% tab "PHP Symfony" %}}

Monolog 설정에서 포맷터 필드를 설정하려면 다음과 같이 포맷터를 선언합니다.

```yaml
 monolog:
    handlers:
        main:
            type:   stream
            path:   "%kernel.logs_dir%/%kernel.environment%.log"
            level:  debug
            formatter: monolog.json_formatter
```

{{% /tab %}}
{{< /tabs >}}

### Datadog 에이전트 설정

[로그 수집이 활성화되면][11] 다음에 따라 [사용자 지정 로그 수집][12]을 설정해 로그 파일을 테일링하고 새 로그를 Datadog에 전송합니다.

1. `conf.d/` [에이전트 설정 디렉토리][13]에서 `php.d/`폴더를 생성합니다.
2. 다음을 사용해 `php.d/`에 `conf.yaml` 파일을 생성합니다.

```yaml
init_config:

instances:

## 로그 섹션
logs:

  - type: file
    path: "<path_to_your_php_application_json>.log"
    service: "<service_name>"
    source: php
    sourcecategory: sourcecode
```

## 로그 및 트레이스 전반에 서비스 연결

해당 애플리케이션에서 애플리케이션 성능 모니터링(APM) 이 활성화된 경우, [애플리케이션 성능 모니터링(APM) PHP 로깅 지침][2]에 따라 로그에 트레이스 및 스팬(span) ID를 자동 추가하여 애플리케이션 로그와 트레이스 간의 상관 관계를 개선합니다.

## 로그에 더 많은 컨텍스트 추가

{{< tabs >}}
{{% tab "PHP Monolog" %}}

로그 및 이벤트에 컨텍스트를 추가하는 것이 유용할 수도 있습니다. Monolog는 모든 이벤트와 함께 자동으로 제출되는 스레드-로컬 컨텍스트를 설정하는 메서드를 제공해 드립니다. 예를 들어, 다음과 같이 컨텍스트 데이터와 함께 이벤트를 로깅할 수 있습니다.

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Monolog 프리 프로세서는 간단한 콜백 기능을 갖추고 있으며, 설정 가능한 메타데이터(예: 세션 ID 또는 요청 ID)로 이벤트를 보강합니다.

```php
 <?php
  $log->pushProcessor(function ($record) {

      // 현재 사용자 기록
      $user = Acme::getCurrentUser();
      $record['context']['user'] = array(
          'name' => $user->getName(),
          'username' => $user->getUsername(),
          'email' => $user->getEmail(),
      );

      // 다양한 태그 추가
      $record['ddtags'] = array('key' => 'value');

      // 다양한 일반 컨텍스트 추가
      $record['extra']['key'] = 'value';

      return $record;
  });
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

로그 및 이벤트에 컨텍스트를 추가하는 것이 유용할 수도 있습니다. Zend-Log는 모든 이벤트와 함께 자동으로 제출되는 스레드-로컬 컨텍스트를 설정하는 메서드를 제공해 드립니다. 예를 들어, 다음과 같이 컨텍스트 데이터와 함께 이벤트를 로깅할 수 있습니다.

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

로그에 정보를 추가하는 방법에 대한 자세한 내용을 확인하려면 [Zend 프로세서 설명서][1]를 참조하세요.

[1]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{% tab "PHP Symfony" %}}

세션 프로세서를 사용하여 로그에 변수 컨텍스트를 추가하려면 다음 단계를 따릅니다.

1. 세션 프로세서를 구현합니다.
  다음 예제에서는 프로세서가 현재 세션을 인식하고 `requestId`, `sessionId` 등의 정보로 로그 기록 콘텐츠를 보강하는 방법을 알아봅니다.

    ```php
    <?php
      namespace Acme\Bundle\MonologBundle\Log;

      use Symfony\Component\HttpFoundation\Session\Session;

      class SessionRequestProcessor {
        private $session;
        private $sessionId;
        private $requestId;
        private $_server;
        private $_get;
        private $_post;

        public function __construct(Session $session) {
          $this->session = $session;
        }

        public function processRecord(array $record) {
          if (null === $this->requestId) {
            if ('cli' === php_sapi_name()) {
              $this->sessionId = getmypid();
            } else {
              try {
                $this->session->start();
                $this->sessionId = $this->session->getId();
              } catch (\RuntimeException $e) {
                $this->sessionId = '????????';
              }
            }
            $this->requestId = substr(uniqid(), -8);
            $this->_server = array(
              'http.url' => (@$_SERVER['HTTP_HOST']).'/'.(@$_SERVER['REQUEST_URI']),
              'http.method' => @$_SERVER['REQUEST_METHOD'],
              'http.useragent' => @$_SERVER['HTTP_USER_AGENT'],
              'http.referer' => @$_SERVER['HTTP_REFERER'],
              'http.x_forwarded_for' => @$_SERVER['HTTP_X_FORWARDED_FOR']
            );
            $this->_post = $this->clean($_POST);
            $this->_get = $this->clean($_GET);
          }
          $record['http.request_id'] = $this->requestId;
          $record['http.session_id'] = $this->sessionId;
          $record['http.url'] = $this->_server['http.url'];
          $record['http.method'] = $this->_server['http.method'];
          $record['http.useragent'] = $this->_server['http.useragent'];
          $record['http.referer'] = $this->_server['http.referer'];
          $record['http.x_forwarded_for'] = $this->_server['http.x_forwarded_for'];

          return $record;
        }

        protected function clean($array) {
          $toReturn = array();
          foreach(array_keys($array) as $key) {
            if (false !== strpos($key, 'password')) {
              // Do not add
            } else if (false !== strpos($key, 'csrf_token')) {
              // Do not add
            } else {
              $toReturn[$key] = $array[$key];
            }
          }

          return $toReturn;
        }
      }
    ```

2. 다음을 추가하여 프로세서를 Symfony와 통합합니다.

    ```yaml
      services:
          monolog.processor.session_request:
              class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
              arguments:  [ @session ]
              tags:
                  - { name: monolog.processor, method: processRecord }
    ``` 

3. 생성한 JSON 파일을 Datadog으로 [스트림](#configure-the-datadog-agent)합니다.

{{% /tab %}}
{{< /tabs >}}

## 모노로그 프레임워크 통합

Monolog는 다음 프레임워크와 사용할 수 있습니다.

* [Symfony v2+/v3+][3]
* [PPI][4]
* [Laravel][5]
* [Silex][6]
* [Lumen][7]

Monolog를 프레임워크와 통합하려면 다음을 추가합니다.

```php
 <?php
  // Monolog 라이브러리를 불러오는 데 성공했는지 확인
  //use Monolog\Logger;
  //use Monolog\Handler\StreamHandler;
  //use Monolog\Formatter\JsonFormatter;

  // monolog 인스턴스로
  $monolog = ...

  ///// Log shipper 설정

  $formatter = new JsonFormatter();
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  $monolog->pushHandler($stream);
  return $r;
```

그런 다음 Monolog용 로거를 설정합니다.

{{< tabs >}}
{{% tab "Symfony v2+/v3+" %}}

설정 디렉토리 `/path/to/config/directory/`에서 `config_dev.yml` 및 `config_prod.yml`에 다음을 추가합니다. 예제를 개발 및 프로덕션 환경에 맞게 수정하여 설정합니다.

```yaml
# app/config/config.yml
monolog:

# 프로세서를 사용하고 싶다면 다음 섹션의 주석을 해제합니다.
#       Processor :
#           session_processor:
#               class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
#            arguments:  [ @session ]
#            tags:
#               - { name: monolog.processor, method: processRecord }

    json_formatter:
        class: Monolog\Formatter\JsonFormatter

    handlers:

        # Log shipper 설정
        to_json_files:
            # log to var/logs/(environment).log
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # 모든 채널(doctrine, errors 등) 포함
            channels: ~
            # json 포맷터 사용
            formatter: monolog.json_formatter
            # log 레벨(예: debug, error 또는 alert) 설정
            level: debug
```

{{% /tab %}}
{{% tab "PPI" %}}

설정 디렉토리 `/path/to/config/directory/`에서 `config_dev.yml` 및 `config_prod.yml`에 다음을 추가합니다. 예제를 개발 및 프로덕션 환경에 맞게 수정하여 설정합니다.

```yaml
monolog:
    handlers:

        # Log shipper 설정
        to_json_files:
            # log to var/logs/(environment).log
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # json 포맷터 사용
            formatter: monolog.json_formatter
            # 로그 레벨(예: debug, error 또는 alert) 설정
            level: debug
```

{{% /tab %}}
{{% tab "Laravel" %}}

<div class="alert alert-warning">
<code>\DDTrace\current_context()</code> 함수는 <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a> 버전에 도입되었습니다.
</div>

다음을 추가합니다.

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * 애플리케이션 서비스를 등록합니다.
     *
     * @return void
     */
    public function register()
    {
        // Monolog 인스턴스 가져오기
        $monolog = logger()->getLogger();
        if (!$monolog instanceof \Monolog\Logger) {
            return;
        }

        // 옵션: JSON 포맷팅 사용
        $useJson = false;
        foreach ($monolog->getHandlers() as $handler) {
            if (method_exists($handler, 'setFormatter')) {
                $handler->setFormatter(new \Monolog\Formatter\JsonFormatter());
                $useJson = true;
            }
        }

        // 트레이스 및 스팬 ID를 추가하여 로그 엔트리에 APM 트레이스 연결
        $monolog->pushProcessor(function ($record) use ($useJson) {
            $context = \DDTrace\current_context();
            if ($useJson === true) {
                $record['extra']['dd'] = [
                    'trace_id' => $context['trace_id'],
                    'span_id'  => $context['span_id'],
                ];
            } else {
                $record['message'] .= sprintf(
                    ' [dd.trace_id=%d dd.span_id=%d]',
                    $context['trace_id'],
                    $context['span_id']
                );
            }
            return $record;
        });
    }

    /**
     * 애플리케이션 서비스 부트스트랩
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```

{{% /tab %}}
{{% tab "Silex" %}}

다음을 추가합니다.

```php
<?php
  // file: bootstrap
  $app->extend('monolog', function($monolog, $app) {
      $monolog->pushHandler(...);
      // 아래와 같이 로거 설정
      return $monolog;
  });
```

{{% /tab %}}
{{% tab "Lumen" %}}

다음을 추가합니다.

```php
<?php
  //file: bootstrap/app.php
  $app->configureMonologUsing(function($monolog) {
      $monolog->pushHandler(...);
      // 아래와 같이 로거 설정
  });

  return $app;
```

{{< /tabs >}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/php/
[3]: https://symfony.com/doc/current/logging.html#monolog
[4]: https://github.com/ppi/ppi-monolog-module
[5]: https://laravel.com/docs/9.x/logging#introduction
[6]: https://github.com/silexphp/Silex
[7]: https://lumen.laravel.com/docs/9.x
[8]: https://seldaek.github.io/monolog/
[9]: https://framework.zend.com/
[10]: https://symfony.com/
[11]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[12]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[13]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[14]: /ko/glossary/#tail