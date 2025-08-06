---
code_lang: php
code_lang_weight: 40
title: PHP 호환성 요구 사항
type: multi-code-lang
---

## Application Security 기능 지원

다음은 특정 트레이서 버전에 대해 PHP 라이브러리에서 지원되는 애플리케이션 보안 기능입니다.

| Application Security 기능                   | 최소 PHP 트레이서 버전 |
| -------------------------------- |----------------------------|
| 위협 탐지 | 0.84.0                     |
| Threat Protection  | 0.86.0                     |
| 차단된 요청에 대한 응답 사용자 지정 | 0.86.0 |
| 소프트웨어 구성 분석(SCA) | 0.90.0              |
| 코드 보안        | 지원되지 않음              |
| 자동 사용자 활동 이벤트 추적 | 0.89.0                     |
| API Security | 0.98.0 |

PHP에서 지원되는 모든 ASM 기능을 사용하는 데 필요한 최소 트레이서 버전은 0.98.0입니다.


<div class="alert alert-info">지원하지 않는 기능이 추가되기를 원할 경우 연락주세요. <a href="https://forms.gle/gHrxGQMEnAobukfn7">간단한 양식</a>을 작성하여 자세한 내용을 보내주시기 바랍니다.</div>

### 지원되는 배포 유형
| 유형        | Threat Detection 지원 | 소프트웨어 구성 분석 |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| 쿠버네티스(Kubernetes)  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate |                          |                               |
| AWS Lambda  |                          |                               |

## 언어 및 프레임워크 호환성

<div class="alert alert-info">
<strong>참고:</strong>
PHP <a href="https://www.php.net/supported-versions">공식 지원 버전</a>, 특히 8.0, 8.1, 8.2를 사용하시기를 권장합니다.
</div>

| PHP 버전    | 지원 레벨                         | 패키지 버전 |
|:---------------|:--------------------------------------|:----------------|
| 8.3.x          | 일반 가용성                  | > `0.95.0+`     |
| 8.2.x          | 일반 가용성                  | > `0.82.0+`     |
| 8.1.x          | 일반 가용성                  | > `0.66.0+`     |
| 8.0.x          | 일반 가용성                  | > `0.52.0+`     |
| 7.4.x          | 일반 가용성                  | 전체             |
| 7.3.x          | 일반 가용성                  | 전체             |
| 7.2.x          | 일반 가용성                  | 전체             |
| 7.1.x          | 일반 가용성                  | 전체             |
| 7.0.x          | 일반 가용성                  | 전체             |

PHP용 Application Security 기능은 다음 SAPI를 지원합니다.

| SAPI           | 지원 유형    |
|:---------------|:----------------|
| apache2handler | 완벽 지원 |
| cli            | 완벽 지원 |
| fpm-fcgi       | 완벽 지원 |
| cgi-fcgi       | 완벽 지원 |

## 지원되는 프로세서 아키텍처

PHP용 Application Security 기능은 다음 아키텍처를 지원합니다.

| 프로세서 아키텍처                   | 지원 레벨         | 패키지 버전                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)      | GA                    | 전체                                    |
| Linux MUSL amd64 (`x86-64-linux-musl`)    | GA                    | 전체                                    |
| Linux GNU arm64 (aarch64-linux-gnu)       | GA                    | > `0.95.0`                             |
| Linux MUSL arm64 (aarch64-linux-musl)     | GA                    | > `0.95.0`                             |

Datadog PHP 라이브러리는 다음 아키텍처에서 PHP 버전 7.0 이상을 지원합니다.

- Linux (GNU) x86-64 and arm64
- Alpine Linux (musl) x86-64 및 arm64

본 라이브러리는 모든 PHP 프레임워크 사용을 지원하며 프레임워크를 사용하지 않는 경우에도 지원합니다.


### 웹 프레임워크 호환성

- 공격자 소스 HTTP 요청 세부 정보
- HTTP 요청 태그(상태 코드, 메소드 등)
- 분산 추적으로 애플리케이션을 통한 공격 플로 확인

##### Application Security 기능 참고 사항
- **Software Composition Analysis**는 지원하지 않습니다.
- **Code Security**는 지원하지 않음

다음 프레임워크는 Application Security가 직접 계측하지 않지만 런타임 계측을 통해 간접 지원됩니다.

| 프레임워크                | 버전    | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| CakePHP       | 2.x       |  {{< X >}} | {{< X >}} |
| CodeIgniter   | 2.x       |  {{< X >}} | {{< X >}} |
| FuelPHP       | 1.1        |  {{< X >}} | {{< X >}} |
| Laravel       | 4.2, 5.x, 6.x        | {{< X >}} | {{< X >}} |
| Laravel 8     | 8.x (트레이서 0.52.0+) | {{< X >}} | {{< X >}} |
| Lumen         | 1.9-2.29    |  {{< X >}} | {{< X >}} |
| Magento       |  3.8+       |  {{< X >}} | {{< X >}} |
| Neos Flow     |  3.0.x      |  {{< X >}} | {{< X >}} |
| Phalcon       | 3.1+        |  {{< X >}} | {{< X >}} |
| Slim          | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 4     | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 5     | 3.1+        |  {{< X >}} | {{< X >}} |
| Wordpress     | 3.1+        |  {{< X >}} | {{< X >}} |
| Yii           | 3.1+        |  {{< X >}} | {{< X >}} |
| Zend          | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1+        |  {{< X >}} | {{< X >}} |
| RoadRunner    | 2.x         |  {{< X >}} | {{< X >}} |


### Datastore 호환성

**Datastore 추적은 다음을 제공합니다.**

- SQL 공격 탐지
- 쿼리 정보(예: 보안 처리된(sanitized) 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

##### Application Security 기능 참고 사항
- **Software Composition Analysis**는 지원하지 않습니다.
- **Code Security**는 지원하지 않음
- **Threat Protection**는 HTTP 요청(인풋) 레이어에서도 작동하므로, 아래 표에 명시되지 않은 데이터베이스를 포함한 모든 데이터베이스에서 기본적으로 작동합니다.

| 프레임워크         | 버전 | Threat Detection이 지원되나요?    | Threat Protection이 지원되나요?|
|-------------------|-----------------|-----------------|---------------|
| Amazon RDS        | 지원되는 모든 PHP | {{< X >}}  |   {{< X >}} |
| Eloquent       | Laravel 지원 버전 | {{< X >}} | {{< X >}} |
| Memcached        | 지원되는 모든 PHP |   {{< X >}}    | {{< X >}} |
| MySQLi        | 지원되는 모든 PHP | {{< X >}} | {{< X >}} |
| PDO        | 지원되는 모든 PHP| {{< X >}}| {{< X >}} |
| PHPRedis        | 3, 4, 5 |   {{< X >}}    | {{< X >}} |
| Predis        | 1.1 | {{< X >}} |   {{< X >}}    |

### User Authentication Frameworks 호환성

**User Authentication Frameworks 통합은 다음을 제공합니다.**

- 사용자 ID를 포함한 사용자 로그인 이벤트
- 사용자 로그인 이벤트에 대한 계정 탈취 탐지 모니터링

| 프레임워크 | 최소 Framework 버전 |
|-----------|---------------------------|
| Laravel   | 4.2                       |
| Symfony   | 3.3                       |
| Wordpress | 4.8                       |

[1]: /ko/tracing/trace_collection/compatibility/php/
[2]: /ko/agent/remote_config/#enabling-remote-configuration