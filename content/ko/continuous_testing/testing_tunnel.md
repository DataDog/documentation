---
aliases:
- /ko/synthetics/testing_tunnel
description: Datadog의 Continuous Testing 테스트 터널을 이용해 로컬 및 원격 CI/CD 테스트하는 방법 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: 블로그
  text: Datadog Continuous Testing 테스트를 CI/CD 파이프라인에 통합
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: 블로그
  text: Datadog의 테스트 터널과 비공개 위치를 사용해 내부 애플리케이션 테스트
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 학습 센터
  text: CI/CD 파이프라인에서 테스트 실행 방법 알아보기
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정
kind: 설명서
title: Continuous Testing Tunnel
---

## 개요

Continuous Testing 터널은 내부 환경과 Datadog 인프라스트럭처에 단기적으로 안전한 연결을 생성하여 비공개 애플리케이션에서 Synthetic HTTP 및 브라우저 테스트를 신속하게 트리거할 수 있습니다.

Datadog은 오래 지속되는 전용 프로빙 시스템 (예: [비공개 위치][1])에 배포하지 않고 애플리케이션의 로컬 버전에 대한 Continuous Testing 테스트를 실행해야 할 때 테스트 터널을 사용할 것을 권장합니다. 테스트 터널은 수명이 짧은 클라우드 환경에서 테스트를 트리거 하는데 할 수 있습니다.

## 테스트 터널이란?

테스트 터널은 [@datadog/datadog-ci][2] NPM 패키지에 포함된 기능으로,  CI/CD 파이프라인의 일부로 Synthetic 테스트를 포함하기 위해 Datadog이 <span class="x x-first x-last">제공하는</span> 메서드 중 하나입니다. 테스트 터널은 인프스트럭처와 Datadog 간에 엔드투엔드 암호화된 HTTP 프록시를 생성합니다. 이에 따라 CLI를 통해 전송된 모든 테스트 요청이 `datadog-ci` 클라이언트를 <span class="x x-first x-last">통해</span> 자동으로 라우팅됩니다. <span class="x x-first x-last">이를 통해 </span> Datadog은 내부 애플리케이션에 액세스하고 테스트할 수 있습니다.

{{< img src="synthetics/tunnel_diagram.png" alt="Synthetic testing tunnel diagram" style="width:100%;">}}

`datadog-ci`는 먼저 인증을 위해 Datadog에서 사전 서명된 URL을 가져옵니다. 그런 다음 사전 서명된 URL을 사용하여 Datadog의 관리 위치에 WebSocket Secure 연결 (wss) 을 엽니다. WebSocket 연결을 통한 SSH 연결을 사용하여 테스트는 `datadog-ci`에 의해 트리거되고, 이는 Datadog의 관리 위치를 통해 실행됩니다.


DNS 해결은 터널을 통해 수행되므로 내부 도메인을 사용하거나 머신이 실행하는 `datadog-ci`의 `localhost`에서 애플리케이션을 테스트할 수 있습니다.

테스트 터널을 사용 중일 때 테스트 위치는 Datadog 계정의 리전에 따라 재정의됩니다.

## 테스트 터널 사용 방법

위에서 언급했듯이, 테스트 터널은 [@datadog/datadog-ci][2] NPM 패키지에 포함되어 있으며, 패키지 버전 [v0.11.0][3]부터 사용할 수 있습니다. 시작하려면 [Continuous Testing 및 CI/CD][4]를 참고하세요.

로컬 머신이나 CI 서버에서 클라이언트를 설정한 후에는 테스트를 시작하는 데 사용되는 명령어에 `--tunnel`을 추가하여 터널을 통해 HTTP 및 브라우저 테스트를 시작하도록 설정할 수 있습니다. 예를 들어 글로벌 설정 파일을 사용하는 경우 다음을 사용할 수 있습니다:


```sh
datadog-ci synthetics run-tests --config <GLOBAL_CONFIG_FILE>.json --tunnel
```

### 방화벽 요구 사항

다음 Datadog 엔드포인트에 대한 **아웃바운드 연결**을 <span class="x x-first x-last">허용</span>:

{{< site-region region="us" >}}

| 포트 | 엔드포인트                                                                                             | 설명                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us1.synthetics.datadoghq.com`   | `datadog-ci` 클라이언에서 터널 서비스로 wss 연결을 여는데 필요함. |
| 443 | `intake.synthetics.datadoghq.com` | 사전 서명된 URL을 가져오고 Synthetic 테스트를 트리거하기 위해 필요함. |
| 443 | `api.datadoghq.com` | Synthetic 테스트를 검색하고, 가져오고, 결과를 폴링하기 위해 필요함. |

{{< /site-region >}}

{{< site-region region="eu" >}}

| 포트 | 엔드포인트                                                                                             | 설명                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-eu1.synthetics.datadoghq.com`   | `datadog-ci` 클라이언트에서 터널 서비스로 wss 연결을 열기 위해 필요함. |
| 443 | `api.datadoghq.eu` | 사전 서명된 URL을 가져오고, Synthetic 테스트를 검색하고, 가져와서 트리거하고, 결과를 폴링하는 데 필요함. |

**참고**: 터널 서비스의 최상위 레벨 도메인은 `.com`(`.eu` 아님)이지만 엔드포인트는 유럽에 위치합니다 (Frankfurt AWS).

{{< /site-region >}}

{{< site-region region="us3" >}}

| 포트 | 엔드포인트                                                                                             | 설명                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us3.synthetics.datadoghq.com`   | `datadog-ci` 클라이언트에서 터널 서비스로 wss 연결을 열기 위해 필요함. |
| 443 | `api.us3.datadoghq.com` | 사전 서명된 URL을 가져오고, Synthetic 테스트를 검색하고, 가져와서 트리거하고, 결과를 폴링하는 데 필요함. |

{{< /site-region >}}

{{< site-region region="us5" >}}

| 포트 | 엔드포인트                                                                                             | 설명                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us5.synthetics.datadoghq.com`   | `datadog-ci` 클라이언트에서 터널 서비스로 wss 연결을 열기 위해 필요함. |
| 443 | `api.us5.datadoghq.com` | 사전 서명된 URL을 가져오고, Synthetic 테스트를 검색하고, 가져와서 트리거하고, 결과를 폴링하는 데 필요함. |

{{< /site-region >}}

{{< site-region region="ap1" >}}

 포트 | 엔드포인트                                                                                             | 설명                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-ap1.synthetics.datadoghq.com`   | `datadog-ci` 클라이언트에서 터널 서비스로 wss 연결을 여는데 필요함. |
| 443 | `api.ap1.datadoghq.com` | 사전에 서명된 URL을 가져오고, Synthetic 테스트를 검색하고, 가져오고, 트리거하고, 결과를 폴링할 때 필요함 |

{{< /site-region >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0
[4]: /ko/continuous_testing/cicd_integrations#use-the-cli