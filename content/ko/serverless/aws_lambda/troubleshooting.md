---
aliases:
- /ko/serverless/guide/troubleshoot_serverless_monitoring
- /ko/serverless/guide/troubleshooting
- /ko/serverless/troubleshooting
further_reading:
- link: /serverless/installation/
  tag: 설명서
  text: 서버리스 모니터링 설치
- link: /serverless/guide/#troubleshoot-your-installation
  tag: 설명서
  text: 일반적인 문제 트러블슈팅
kind: 설명서
title: AWS Lambda 모니터링 트러블슈팅
---

<div class="alert alert-info">함수 코드 크기가 너무 큰 문제, 또는 웹팩 호환성 문제 등 일반적인 이슈에 대한 <a href="/serverless/guide/#troubleshoot-your-installation">트러블슈팅 가이드</a> 를 참조하세요. 이 가이드는 일반적인 텔레메트리 수집 이슈의 트러블슈팅을 돕습니다.</div>

## 기본 사항 이해

이 가이드의 지침을 더 잘 이해하려면 먼저 [핵심 개념][1]에 익숙해 지세요. 작동 방법을 더 잘 숙지하면 놓친 부분이나 원인을 파악하는 데 도움을 줍니다.

## 포워더(Forwarder) 대신 Datadog 람다 확장 사용

데이터 수집에 여전히 [Datadog 포워더 람다 함수][2]를 사용하고 있다면 대신 [Datadog 람다 함수][3]를 적용하는 것을 생각해 보세요. 포워더 람다의 기술적 한계 때문에 여러 가지 알려진 이슈가 발생합니다. 람다 함수로 전환하면 이러한 이슈를 자동으로 해결할 수 있습니다.

* 람다가 확장을 사용하는지 확실하지 않다면 람다 함수의 [레이어 구성][4]를 확인하고 람다 레이어 이름이  `Datadog-Extension`이 맞는지 확인하세요.

* 람다가 포워더를 사용하는지 확실하지 않다면 람다 함수의 로그 그룹 [구독 필터][5]를 확인하세요. 또한 `Datadog Forwarder` 또는 유사 이름의 람다에 로그 그룹이 구독 상태인지 확인하세요.

[비교 가이드][6]를 참조해 확장 사용의 이점을 확인하세요. 이 [마이그레이션 가이드][7]를 사용하면 일반적인 마이그레이션 단계를 알 수 있습니다. 개발 또는 스테이징 환경에서 먼저 변경 사항을 테스트하세요!

포워더를 계속 사용하려면 이 [포워더 트러블슈팅 가이드]를 참조해 더 많은 지원을 받으세요.

## 구성이 최신 상태고 예상대로 작동하는지 확인

[설치 가이드][9]가 과거 Datadog 모니터링에 설정되었을 수 있는 애플리케이션에 대한 최신 지침을 포함하는지 확인하세요.

람다 함수 변경 사항이 예상대로 작동하는지 확인하려면 또 다른 테스팅 함수를 설정하고 _Datadog CLI_ 또는 _커스텀_ 지침에 따라 설정합니다. 테스팅 대비 실제 람다 함수에 대한 변경 사항(핸들러, 레이어, 환경 변수 및 태그)을 비교하세요.

## 디버깅 로그 수집

Lambda 함수에서 환경 변수 `DD_LOG_LEVEL`을 `debug`로 설정하여 상세 디버깅 로그를 활성화합니다. 로그에서 데이터 포워딩을 위해 [Datadog Forwarder Lambda 함수][2]를 사용하는 경우 Forwarder Lambda 함수에서 `DD_LOG_LEVEL`을 `debug`로 설정합니다.

추적 이슈가 있는 경우 환경 변수를 `DD_TRACE_DEBUG`에서 `true`로 설정하여 Datadog 트레이서에서 추가 디버깅 로그를 받으세요.

불필요한 비용 발생을 막기 위해 충분한 데이터를 수집한 후 디버깅 로그를 비활성화하세요.

## AWS 통합 확인

Datadog은 [AWS 통합][10](옵션)으로 AWS에서 메트릭과 리소스 태그를 수집합니다. CloudWatch 및 Lambda 리소스 태그에서 특정 메트릭을 놓치고 있다면 AWS 통합이 제대로 설정되었는지 확인하세요.

## 태그 설정 확인

Datadog 표준 `service`, `env`, `version` 태그를 수집된 데이터에 적용하는 데 문제가 있다면 환경 변수 `DD_SERVICE`, `DD_ENV`, `DD_VERSION`이 람다 함수에 설정되어 있는지 확인하세요. 커스텀 태그의 경우 `DD_TAGS`가 설정되었는지 확인하세요.

AWS 람다 리소스 태그로 수집된 풍부한 데이터를 확보하려면 [AWS용 Datadog 통합][10]이 제대로 설정되었는지 확인하세요.

## 지원 요청

빠른 질문의 경우 [Datadog Slack 커뮤니티][11]의 _#서버리스_ 채널에 게시하세요.

위의 트러블슈팅 단계를 모두 따른 후에도 [Datadog 지원팀][12]의 도움이 필요하다면, 다음 방법 중 하나를 통해 관련 설정 정보를 지원팀에 보내주세요.

{{< tabs >}}
{{% tab "Serverless Flare" %}}
1. [Zendesk 티켓] 생성하기(https://help.datadoghq.com/hc/en-us/requests/new).
2. [Datadog CLI] 최신 버전 다운로드(https://github.com/DataDog/datadog-ci/#how-to-install-the-cli).

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. 프로젝트 디렉터리 루트에서 Serverless Flare 명령으로 Lambda 함수 관련 데이터를 자동으로 수집하여 Datadog 지원팀에 보내주세요.

    ```sh
    datadog-ci lambda flare -f <function_arn> -e <email> -c <case_id> --with-logs
    ```

<div class="alert alert-info">Serverless Flare에 대한 더 자세한 내용을 확인하려면 </a>명령 설명서</a>를 참고하세요.</div>
{{% /tab %}}
{{% tab "수동" %}}

[Zendesk 티켓]을 생성하고(https://help.datadoghq.com/hc/en-us/requests/new), 티켓에 다음 정보를 포함하세요.

1. Lambda 함수(ARN, 런타임, 핸들러, 레이어, 환경 변수 및 태그)에 대한 기본 정보를 포함하세요. 다수의 함수에 대해 동일한 이슈가 있는 경우 먼저 단일 함수 위주로 정보를 포함하세요.
2. Lambda 함수가 Datadog Forwarder를 사용해 로그로 데이터를 전송하도록 설정된 경우, Forwarder Lambda 함수에 대한 기본 정보와 Lambda 함수 로그 그룹에 설정된 구독 필터에 대한 기본 정보를 포함하세요.
3. 사용한 설치 방법(_서버리스 프레임워크_ 또는 _AWS CDK_ 등)
4. 시도한 대체 설치 방법(_Datadog CLI_ 또는 _커스텀_)
5. 자체적인 람다 함수의 디버깅 로그
6. Datadog 포워더 람다 함수의 디버깅 로그(사용한 경우)
7. `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` 및 `webpack.config.json` 등 **삭제된 하드코드된 암호**를 포함하는 프로젝트 설정 파일
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/glossary/#datadog-serverless-for-aws-lambda-concepts
[2]: /ko/logs/guide/forwarder/
[3]: /ko/serverless/libraries_integrations/extension/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[6]: /ko/serverless/guide/extension_motivation/
[7]: /ko/serverless/configuration/#migrate-to-the-datadog-lambda-extension
[8]: /ko/logs/guide/lambda-logs-collection-troubleshooting-guide/
[9]: /ko/serverless/installation/
[10]: /ko/integrations/amazon_web_services/
[11]: https://chat.datadoghq.com/
[12]: https://www.datadoghq.com/support/