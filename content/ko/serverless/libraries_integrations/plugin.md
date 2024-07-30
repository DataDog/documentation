---
aliases:
- /ko/serverless/serverless_integrations/plugin
dependencies:
- https://github.com/DataDog/serverless-plugin-datadog/blob/master/README.md
title: Datadog 서버리스 프레임워크 플러그인
---
![빌드](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![코드 지원 범위](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![라이선스](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog는 서버리스 애플리케이션을 구축하기 위해 서버리스 프레임워크를 사용하는 개발자가 서버리스 프레임워크 플러그인을 쓰는 것을 권장합니다.
플러그인은 다음 방법으로 메트릭, 트레이스와 로그를 수집하기 위해 애플리케이션 계측을 활성화합니다.

- Datadog 람다 라이브러리를 람다 레이어로 람다 함수에 설치
- 람다 레이어로 람다 함수에 Datadog 람다 확장 설치(`addExtension`) 또는 람다 함수의 로그 그룹에 Datadog 포워더(Forwarder) 구독(`forwarderArn`)
- 람다 함수에 환경 변수 또는 추가 트레이싱 레이어 추가 등 필수 구성 변경 사항 적용

## 시작하기

빠르게 시작하려면 [파이썬(Python)][1], [Node.js][2], [루비(Ruby)][3], [자바(Java)][4], [고(Go)][5] 또는 [.NET][6] 애플리케이션 지침을 따르고 Datadog에서 함수의 향상된 메트릭, 트레이스와 로그를 봅니다. 

설치가 완료된 후 모니터링 요구 사항에 맞춰 [고급 옵션](https://docs.datadoghq.com/serverless/configuration)을 설정합니다.

## 업그레이드

플러그인의 각 버전은 [구체적인 Datadog 람다 레이어 버전][15]으로 게시됩니다. 최신 버전의 Datadog 람다 레이어가 제공하는 새로운 기능과 버그 수정 사항으로 업데이트하려면, 서버리스 프레임워크 플러그인을 업그레이드하세요. 프로덕션 애플리케이션에 적용하기 전 새 버전을 테스트합니다.

## 설정 파라미터

플러그인을 추가로 구성하려면 `serverless.yml`에서 다음 사용자 지정 파라미터를 사용합니다.

| 파라미터                     | 설명                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site`                        | `datadoghq.com`(기본값), `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com` 또는 `ddog-gov.com` 등 데이터를 전송할 Datadog 사이트를 설정합니다. 이 파라미터는 Datadog 람다 확장을 사용해 텔레메트리를 수집할 때 필요합니다. |
| `apiKey`                      | [Datadog API 키][7]입니다. 이 파라미터는 Datadog 람다 확장을 사용해 텔레메트리를 수집할 때 필요합니다. 대신 배포 환경에서 `DATADOG_API_KEY` 환경 변수를 설정할 수도 있습니다.  |
| `appKey`                      | Datadog 앱 키입니다. `monitors` 필드가 정의된 경우에만 필요합니다. 대신 배포 환경에서 `DATADOG_APP_KEY` 환경 변수를 설정할 수 있습니다.  |
| `apiKeySecretArn`             | `apiKey` 필드의 대안입니다. AWS 암호 관리자에 Datadog API 키를 저장하는 암호 ARN입니다. 람다 실행 역할에 `secretsmanager:GetSecretValue` 권한을 추가하는 것을 기억하세요. |
| `apiKMSKey`                   | `apiKey` 필드의 대안입니다. KMS를 사용하여 암호화된 Datadog API 키입니다. 람다 확장 역할에 `kms:Decrypt` 권한을 추가하는 것을 잊지 마세요. |
| `env`                         | `addExtension`을 설정할 때 `DD_ENV` 환경 변수가 제공된 값과 함께 모든 람다 함수에 추가됩니다. 그렇지 않으면 제공된 값과 함께 모든 람다 함수에 `env` 태그가 추가됩니다. 서버리스 배포 `stage` 값이 기본값으로 설정됩니다. |
| `service`                     | `addExtension`와 함께 설정할 때 `DD_SERVICE` 환경 변수는 제공된 값과 함께 모든 람다 함수에 추가됩니다. 그렇지 않으면 제공된 값과 함께 모든 람다 함수에 `service` 태그가 추가됩니다. 서버리스 프로젝트의 `service` 값이 기본값으로 설정됩니다.
| `version`                     | `addExtension`과 함께 설정하는 경우 `DD_VERSION` 환경 변수는 제공된 값과 함께 모든 람다 함수에 추가됩니다. `forwarderArn`과 함께 설정하는 경우 `version` 태그가 제공된 값과 함께 모든 람다 함수에 추가됩니다. |
| `tags`                        | 단일 문자열인 `key`:`value` 쌍의 쉼표로 구분된 목록입니다. `extensionLayerVersion`과 함께 설정할 경우 `DD_TAGS` 환경 변수가 제공된 값과 함께 모든 람다 함수에 추가됩니다. `forwarderArn`과 함께 설정할 경우 플러그인이 문자열을 파싱하고 모든 람다 함수에 태그로 각 `key`:`value` 쌍이 태그로 설정됩니다.  |
| `enableXrayTracing`           | `true`을 설정하여 람다 함수와 API 게이트웨이 통합에서 X-Ray 트레이싱을 활성화합니다. `false`이 기본값으로 설정됩니다. |
| `enableDDTracing`             | 람다 함수에서 Datadog 트레이싱을 활성화합니다. `true`가 기본값으로 설정됩니다. |
| `enableDDLogs`                | 람다 확장을 사용하여 Datadog 로그 수집을 활성화합니다. `true`가 기본값으로 설정됩니다. 참고: 이 설정은 Datadog 포워더에서 전송한 로그에는 영향을 미치지 않습니다. |
| `monitors`                    | 정의된 경우 Datadog 플러그인은 배포된 함수에 대한 모니터링을 설정합니다. 환경에서 `DATADOG_API_KEY` 및 `DATADOG_APP_KEY` 설정이 필요합니다. 모니터를 정의하는 방법을 알아보려면 [권장되는 서버리스 모니터 활성화 및 설정 방법](#to-enable-and-configure-a-recommended-serverless-monitor)을 참조하세요. |
| `captureLambdaPayload`        | 람다 호출의 Datadog 애플리케이션 성능 모니터링(APM) 스팬에서 [수신 및 발신 AWS 람다 페이로드를 캡처합니다][17]. `false`가 기본값으로 설정됩니다. |
| `enableSourceCodeIntegration` | 함수를 위해 [Datadog 소스 코드 통합]을 활성화합니다. `true`가 기본값으로 설정됩니다. |
| `uploadGitMetadata`           | 소스 코드 통합의 일환으로, 함수를 위해 Git 메타데이터 업로드를 활성화합니다. Datadog Github 통합이 불필요한 Git 메타데이터가 업로드를 제공하므로 Datadog Github 통합이 설치된 경우 거짓으로 설정합니다.  |
| `subscribeToAccessLogs`       | Datadog 포워더(Forwarder)의 API 게이트웨이 액세스 로그인 그룹 자동 구독을 활성화합니다. `forwarderArn`를 설정해야 합니다. 기본값이 `true`로 설정됩니다. |
| `subscribeToExecutionLogs`    | Datadog 포워더의 HTTP API 및 Websocket 로그 그룹 자동 구독을 활성화합니다. `forwarderArn`를 설정해야 합니다. 기본값이 `true`로 설정됩니다. |
| `subscribeToStepFunctionLogs`    | Datadog 포워더의 Step 함수 로그 그룹 자동 구독을 활성화합니다. 설정된 Step 함수 로그 그룹이 없으면 자동으로 생성됩니다. `forwarderArn`을 설정해야 합니다. 기본값이 `false`로 설정됩니다. |
| `forwarderArn`                | Datadog 포워더 ARN은 람다 또는 API 게이트웨이 로그 그룹에 구독됩니다. |
| `addLayers`                   | Datadog 람다 라이브러리를 레이어로 설치할지를 결정합니다. 기본값은 `true`로 설정됩니다. 특정 버전의 Datadog 람다 라이브러리([파이썬(Python)][8] or [Node.js][9])를 설치할 수 있도록 Datadog 람다 라이브러리를 함수의 배포 패키지로 자체적으로 패키징할 계획이 있다면 `false`로 설정합니다.  |
| `addExtension`                | Datadog 람다 확장을 레이어로 설치할지를 결정합니다. 기본값은 `true`로 설정됩니다. 활성화되면 `apiKey` 및 `site`를 설정해야 합니다. |
| `exclude`                     | 설정되면 이 플러그인은 지정된 모든 함수를 무시합니다. Datadog 기능에 포함되지 말아야 할 함수가 있는 경우 이 파라미터를 사용합니다. 기본값은 `[]`로 설정됩니다. |
| `enabled`                     | `false`로 설정하면 Datadog 플러그인이 비활성 상태로 유지됩니다. 기본값은 `true`로 설정됩니다. 환경 변수를 사용해 이 옵션을 조정할 수 있습니다. 예를 들어 `enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}`를 사용해 배포 동안 플러그인을 활성화/비활성화할 수 있습니다. 대신 `--stage`를 통과한 값을 사용하여 이 옵션을 조정할 수 있습니다. [예시 참조](#disable-plugin-for-particular-environment) |
| `customHandler`               | 설정되면 지정된 핸들러가 모든 함수에 대한 핸들러로 설정됩니다. |
| `failOnError`                 | 설정되면 Datadog 모니터가 생성이나 업데이트에 실패했을 때 오류를 트리거합니다. 배포 후에 발생할 수 있지만 0이 아닌 종료 코드를 반환하기 위해(사용자 CI 실패를 위해) `serverless deploy`를 발생시킬 수 있습니다. 기본값은 `false`로 설정됩니다. |
| `logLevel`                    | 로그 수준으로, 확장된 로깅을 위해 `DEBUG`로 설정됩니다. |
| `skipCloudformationOutputs`   | 스택에 Datadog Cloudformation Outputs 추가하기를 건너뛰려면 `true`로 설정합니다. 200개 출력 제한은 스택 생성을 실패하게 할 수 있으므로 이 경우 유용합니다. |
| `enableColdStartTracing`      | 콜드 스타트 추적을 비활성화하려면 `false`로 설정합니다. NodeJS 및 파이썬(Python)에서 사용됩니다. 기본값은 `true`입니다. |
| `coldStartTraceMinDuration`   | 콜드 스타트 추적을 통해 추적할 모듈 로드 이벤트의 최소 지속 시간(밀리초)을 설정합니다. 번호. 기본값은`3` 입니다. |
| `coldStartTraceSkipLibs`      | 선택적으로 쉼표로 구분된 라이브러리 목록에 대해 콜드 스타트 스팬(span) 만들기를 건너뜁니다. 깊이를 제한하거나 알려진 라이브러리를 건너뛸 때 유용합니다. 기본값은 런타임에 따라 다릅니다. |
| `subdomain`                   | 부수적인 하위 도메인을 설정하여 출력 생성을 위해 프린트되는 앱 URL을 사용합니다. 기본값은 `app`으로 설정됩니다. |
| `enableProfiling`             | `true`와 함께 Datadog 계속적인 프로파일러를 사용하도록 설정합니다. NodeJS 및 파이썬(Python)용 베타에서 지원됩니다. 기본값은 `false`입니다. |
| `encodeAuthorizerContext`     | 람다 승인자에 대해 `true`로 설정하면 추적 컨텍스트가 전파를 위해 응답으로 인코딩됩니다. NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `true`입니다. |
| `decodeAuthorizerContext`     | 람다 인증자를 통해 인증된 람다에 대해 `true`로 설정하면 인코딩된 추적 컨텍스트를 구문 분석하고 사용합니다(찾은 경우). NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `true`입니다. |
| `apmFlushDeadline`            | 밀리초에서 시간 초과하기 전에 기간을 제출할 시기를 결정하는 데 사용됩니다. AWS 람다 호출의 남은 시간이 설정된 값보다 작으면 추적기는 현재 활성 스팬(span)과 완료된 모든 스팬(span)을 제출하려고 시도합니다. NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `100`밀리초입니다. |

이 파라미터를 사용하려면 이 예시와 유사한 `serverless.yml`에 `custom` > `datadog` 섹션을 추가합니다.

```yaml
custom:
  datadog:
    apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}"
    enableXrayTracing: false
    enableDDTracing: true
    enableDDLogs: true
    subscribeToAccessLogs: true
    forwarderArn: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    exclude:
      - dd-excluded-function
```

### 웹팩

웹팩과 같은 번들러를 사용하는 경우 [서버리스 트레이싱 및 웹팩](https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_webpack/)을 참조합니다.

### TypeScript

누락 유형 정의 오류가 발생할 수 있습니다. 오류를 해결하려면 프로젝트의 package.json `devDependencies` 목록에 `datadog-lambda-js` 및 `dd-trace`를 추가합니다.

serverless-typescript를 사용하는 경우 `serverless.yml`에서 `serverless-datadog`가 `serverless-typescript` 항목 위에 있도록 합니다. 플러그인은 자동으로 `.ts` 파일을 감지합니다.

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

### 특정 환경을 위한 플러그인 비활성화

환경 기준으로(`--stage` 통과) 플러그인을 끄려면 아래 예시와 비슷하게 구성할 수 있습니다.

```yaml
provider:
  stage: ${self:opt.stage, 'dev'}

custom:
  staged: ${self:custom.stageVars.${self:provider.stage}, {}}

  stageVars:
    dev:
      dd_enabled: false

  datadog:
    enabled: ${self:custom.staged.dd_enabled, true}
```

### 서버리스 모니터

사전 설정된 기본값이 있는 7가지 권장 모니터입니다.

|       모니터        |                                         메트릭                                          | 임계값  | 서버리스 모니터 ID  |
| :------------------: | :--------------------------------------------------------------------------------------: | :--------: | :--------------------: |
|   높은 오류율    |                       `aws.lambda.errors`/`aws.lambda.invocations`                       |   >= 10%   |   `high_error_rate`    |
|       시간 초과        |                      `aws.lambda.duration.max`/`aws.lambda.timeout`                      |    >= 1    |       `timeout`        |
|    메모리 부족     |                           `aws.lambda.enhanced.out_of_memory`                            |    > 0     |    `out_of_memory`     |
|  높은 반복기 수명   |                            `aws.lambda.iterator_age.maximum`                             | >= 24시간  |  `high_iterator_age`   |
| 높은 콜드 부팅율 | `aws.lambda.enhanced.invocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` |   >= 20%   | `high_cold_start_rate` |
|    높은 스로틀    |                     `aws.lambda.throttles`/`aws.lambda.invocations`                      |   >= 20%   |    `high_throttles`    |
|    비용 증가    |                           `aws.lambda.enhanced.estimated_cost`                           | &#8593;20% |    `increased_cost`    |

#### 권장 서버리스 모니터를 활성화하고 설정하는 방법

권장 모니터를 생성하려면 해당 서버리스 모니터 ID를 사용해야 합니다. 또한 환경에서 `DATADOG_API_KEY` 및 `DATADOG_APP_KEY`를 설정해야 함을 참고하세요.

추가로 권장 모니터에 대한 파라미터를 설정하려면 아래 서버리스 모니터 ID 아래 파라미터 값을 직접 정의할 수 있습니다. 권장 모니터에 지정되지 않은 파라미터에는 기본 권장 값이 사용됩니다. 권장 모니터의 `query` 파라미터는 직접 수정할 수 없으며 기본적으로 위에 정의된 `query` 값이 사용됩니다. 하지만 `options` 파라미터 내에서 재정의하여 `query`의 임계값을 변경할 수 있습니다. 모니터를 삭제하려면 `serverless.yml` 템플릿에서 모니터를 제거합니다. 모니터 파라미터를 설정하는 방법에 대한 추가 설명서는 [Datadog 모니터 API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor)를 참조하세요.

함수가 배포된 후 모니터 생성이 발생합니다. 모니터가 생성에 실패하는 경우에도 함수는 여전히 성공적으로 배포됩니다.

##### 기본값을 포함하는 권장 모니터를 생성하는 방법

파라미터 ㄱ밧을 지정하지 않고 적절한 서버리스 모니터 ID를 정의합니다.

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
```

##### 권장 모니터를 설정하는 방법

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
          name: "High Error Rate with Modified Warning Threshold"
          message: "More than 10% of the function’s invocations were errors in the selected time range. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["modified_error_rate", "serverless", "error_rate"]
          require_full_window: true
          priority: 2
          options:
            include_tags: true
            notify_audit: true
            thresholds:
              ok: 0.025
              warning: 0.05
              critical: 0.1
```

##### 모니터를 삭제하는 방법

서버리스 모니터 ID와 파라미터를 제거하면 모니터가 삭제됩니다.

#### 커스텀 모니터를 활성화하고 설정하는 방법

커스텀 모니터를 정의하려면 고유한 서버리스 모니터 ID를 정의하고 환경에 있는 API 키 및 애플리케이션 키, `DATADOG_API_KEY` 및 `DATADOG_APP_KEY`에서 허용해야 합니다. `query` 파라미터는 필수이지만 다른 모든 파라미터는 부수적입니다. 고유한 서버리스 모니터 ID 문자열을 정의하고 아래에서 필수 파라미터를 지정합니다. 모니터 파라미터에 대한 추가 설명서는 [Datadog 모니터 API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor)를 참조하세요.

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - custom_monitor_id:
          name: "Custom Monitor"
          query: "max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          message: "Custom message for custom monitor. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["custom_monitor", "serverless"]
          priority: 3
          options:
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit: true
            notify_no_data: false
            thresholds:
              ok: 1
              warning: 2
              critical: 3
```

## 변경 사항 중단

### [v5.0.0](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v5.0.0)

- Datadog 확장과 함께 사용하면 이 플러그인은 람다 리소스 태그 대신 환경 변수를 통해 `service` 및 `env` 태그를 설정합니다.
- `enableTags` 파라미터는 새로운 `service`, `env` 파라미터를 대체합니다.

### [v4.0.0](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v4.0.0)

- Datadog 람다 확장은 이제 텔레메트리를 Datadog에 전송하기 위한 기본 메커니즘입니다.

## 오프닝 이슈

이 패키지에서 버그를 발견한 경우 이슈를 작성하여 알려주세요! 새로운 이슈를 시작하기 전 기존 이슈를 검색하여 중복을 피해 주세요.

이슈를 시작할 때 가능한 경우 서버리스 프레임워크 버전, 파이썬/Node.js 버전 및 스택 트레이스를 포함하세요. 또한 적절한 경우 재현을 위한 단계를 포함해 주세요.

기능 요청에 대한 이슈를 열 수도 있습니다.

## 기여하기

이 패키지에 대한 이슈와 수정 사항을 찾은 경우 다음 [절차][14]에 따라 풀 요청을 시작하세요.

## 커뮤니티

제품 피드백 및 질문은 [슬랙의 Datadog 커뮤니티](https://chat.datadoghq.com/)의 `#serverless`에 가입하세요.

## 라이센스

달리 명시적으로 나와 있지 않은 한 이 리포지토리의 모든 파일은 Apache 라이선스 버전 2.0에 따라 라이선스가 부여되어 있습니다.

이 제품은 Datadog((<https://www.datadoghq.com/>). Copyright 2021 Datadog, Inc.)에서 개발된 소프트웨어를 포함합니다.

[1]: https://docs.datadoghq.com/ko/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/ko/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/ko/serverless/installation/ruby/?tab=serverlessframework
[4]: https://docs.datadoghq.com/ko/serverless/installation/java/?tab=serverlessframework
[5]: https://docs.datadoghq.com/ko/serverless/installation/go/?tab=serverlessframework
[6]: https://docs.datadoghq.com/ko/serverless/installation/dotnet/?tab=serverlessframework
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[8]: https://pypi.org/project/datadog-lambda/
[9]: https://www.npmjs.com/package/datadog-lambda-js
[10]: https://webpack.js.org/configuration/externals/
[11]: https://docs.datadoghq.com/ko/serverless/forwarder/
[12]: https://docs.datadoghq.com/ko/serverless/datadog_lambda_library/extension/
[13]: https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html
[14]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/CONTRIBUTING.md
[15]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/src/layers.json
[16]: https://docs.datadoghq.com/ko/tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering
[17]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[18]: https://docs.datadoghq.com/ko/integrations/guide/source-code-integration