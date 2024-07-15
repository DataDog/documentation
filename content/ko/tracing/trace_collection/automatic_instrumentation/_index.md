---
algolia:
  tags:
  - apm 자동 계측
further_reading:
- link: /tracing/glossary/
  tag: 설명서
  text: APM 용어 및 개념
kind: 설명서
title: 자동 계측
---

## 개요

자동 계측을 이용하면 애플리케이션 스팬을 자동으로 생성할 수 있습니다. 이에 따라 수동 작업을 최소화하면서 다양한 표준 운영 체계와 대중적인 프레임워크에서 관측 데이터를 캡처할 수 있습니다. [단일 단계 계측][5]으로 Datadog를 설치하거나 코드에 [Datadog 추적 라이브러리를 수동으로 추가][6]하여 애플리케이션을 자동으로 계측할 수 있습니다.

## 사용 사례

자동 계측을 사용할 수 있는 시나리오에는 다음이 있습니다.

- 최소한의 구성으로 일반 라이브러리와 프로그램 언어 전반에서 핵심 관측 데이터를 캡처
- 사전 구성 설정으로 실시간 모니터링을 실시하여 애플리케이션 성능에 즉각적인 인사이트 제공
- [커스텀 계측][7]이 필요하지 않은 프로젝트에 관측 설정을 간소화

## 시작하기

자동 계측 방법에 관한 자세한 정보를 보려면 다음 관련 설명서를 참고하세요.

{{< tabs >}}
{{% tab "단일 단계 계측(베타)" %}}

**APM 계측 활성화(베타)** 옵션을 선택한 상태로 Datadog 에이전트를 설치하거나 업데이트하면 APM이 활성화된 상태로 에이전트가 설치 및 구성됩니다. 이 경우 추가 설치나 구성 단계 없이 애플리케이션을 자동으로 계측할 수 있습니다.

시작하려면 [단일 단계 계측][1] 설명서를 참고하세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm

{{% /tab %}}

{{% tab "Datadog 라이브러리" %}}

Datadog 라이브러리로 애플리케이션을 자동으로 계측을 하는 방법:

1. [에이전트를 설치 및 구성합니다](#install-and-configure-the-agent).
2. [Datadog 추적 라이브러리를 내 코드에 추가](#instrument-your-application)합니다.

### 에이전트 설치 및 구성

계측된 애플리케이션에서 트레이스를 수신하도록 Datadog 에이전트를 설치 및 구성합니다. 기본적으로 Datadog 에이전트가 `datadog.yaml` 파일의 `apm_config` 아래 `enabled: true`로 설정되어 트레이스를 수신하도록 구성되어 있고 `http://localhost:8126`에서 트레이스 데이터를 수신합니다.

컨테이너화된 환경의 경우 Datadog 에이전트 내에서 트레이스를 수집하려면 다음 링크에 안내된 단계를 따르세요.

#### 컨테이너

1. 주 [`datadog.yaml` 구성 파일][8]의 `apm_config` 섹션에서 `apm_non_local_traffic: true`로 설정하세요.
2. 구체적인 설정 지침을 잘 확인하여 에이전트가 컨테이너화된 환경에서 트레이스를 수신하도록 구성되어 있는지 확인하세요.

{{< partial name="apm/apm-containers.html" >}}

</br>

3. 트레이스 클라이언트는 기본적으로 트레이스를 Unix Domain Socket `/var/run/datadog/apm.socket`로 보냅니다. 소켓이 존재하지 않으면 트레이스를 `http://localhost:8126`로 전송합니다.

   다른 소켓, 호스트, 또는 포트가 필요하면 환경 변수 `DD_TRACE_AGENT_URL`를 사용하세요. 다음 예를 참고하세요.

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   마찬가지로 트레이스 클라이언트는 데이터를 Unix Domain Socket `/var/run/datadog/dsd.socket`로 전송합니다. 소켓이 존재하지 않으면 `http://localhost:8125`로 전송합니다.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. 에이전트가 올바른 Datadog 위치로 데이터를 전송하도록 하려면 Datadog 에이전트의 `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}로 설정하세요.

{{< /site-region >}}

#### AWS Lambda

AWS Lambda에서 Datadog APM을 설정하려면 [추적 서버리스 함수][9] 설명서를 참고하세요.

#### 다른 환경

[Heroku][10], [Cloud Foundry][11], [AWS Elastic Beanstalk][12], [Azure App Service][13]와 같은 다른 환경에서도 추적을 이용할 수 있습니다.

다른 환경의 경우 [통합][14] 설명서에서 해당 환경에 관한 내용을 참고하고 설정 문제가 발생하면 [지원팀에 문의][15]하세요.

### 애플리케이션 계측

다음 공식 Datadog 추적 라이브러리 중 하나를 사용해 애플리케이션에서 트레이스를 전송하도록 설정할 수 있습니다.

{{< partial name="apm/apm-languages.html" >}}

<br>

공식 라이브러리 지원이 되지 않는 언어로 구축한 애플리케이션을 계측하려면 [커뮤니티 추적 라이브러리][1]를 참고하세요.

[1]: /ko/developers/community/libraries/#apm-tracing-client-libraries
[8]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ko/tracing/serverless_functions/
[10]: /ko/agent/basic_agent_usage/heroku/#installation
[11]: /ko/integrations/cloud_foundry/#trace-collection
[12]: /ko/integrations/amazon_elasticbeanstalk/
[13]: /ko/infrastructure/serverless/azure_app_services/#overview
[14]: /ko/integrations/
[15]: /ko/help/
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[2]: /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /ko/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm
[6]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /ko/tracing/trace_collection/custom_instrumentation/