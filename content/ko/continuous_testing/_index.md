---
cascade:
  algolia:
    rank: 70
description: CI/CD 파이프라인에서 병렬로 실행되는 Continuous Testing 테스트의 수를 사용자 지정하여 테스트 범위를 넓히세요.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog Continuous Testing 릴리스를 확인해 보세요! (앱 로그인 필요)
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 학습 센터
  text: CI/CD 파이프라인에서 Continuous Testing
- link: /synthetics/private_locations/#scale-your-private-location
  tag: 설명서
  text: 프라이빗 위치에 대해 알아보기
- link: /continuous_testing/troubleshooting/
  tag: 설명서
  text: Continuous Testing 및 CI/CD 문제 해결
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: 블로그
  text: Datadog Continuous Testing을 사용해 안심하고 릴리스하세요
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: 블로그
  text: Datadog을 사용한 연속적 테스트 모범 사례
kind: 설명서
title: 연속적 테스트
---

<div class="alert alert-info">이 페이지는 CI/CD 파이프라인에서 Continuous Testing 테스트를 실행하는 방법을 설명합니다. CI/CD 메트릭 및 대시보드를 보려면 <a href="/continuous_integration/" target="_blank">CI Visibility 설명서</a>를 참고하세요.</div>

Datadog Continuous Testing은 제품의 전체 수명 주기 동안 소프트웨어 테스트를 자동화할 수 있는 도구 세트를 제공합니다. 코드가 필요 없고 신뢰할 수 있는 엔드투엔드 테스트, [주로 사용 되는 CI 공급자][1] 및 협업 도구와 함께 원활한 통합을 제공함으로써 Continuous Testing은 애플리케이션 개발을 가속화하고 고품질 기능을 더 빠르게 출시할 수 있도록 지원합니다.

## 쉽고 빠르게 테스트하세요

코드리스 [웹 레코더][2], [모바일 앱 레코더][15], [병렬 테스트 실행][3], 내장된 다중 위치 테스트와 같은 확장 가능한 기능을 사용하여 QA 팀의 시간과 노력을 절감할 수 있습니다.

{{< img src="continuous_testing/continuous_testing_selection.png" alt="Choose between running your tests sequentially and customizing the number of tests you want to run at the same time in the Continuous Testing Settings page" style="width:100%;">}}

gRPC와 WebSockets를 포함한 여러 프로토콜, 프레임워크, API를 지원하므로 애플리케이션 스택의 모든 레벨에서 테스트할 수 있습니다.


## 테스트 신뢰성을 개선하세요

테스트 코드를 구현할 필요 없이 [Synthetic 모니터링의 탄력적이고 확장 가능한 코드리스 테스트][4]를 사용하여 소프트웨어를 빌드해 보세요. 자동 복구 브라우저 테스트, 모바일 앱 테스트, 자동 테스트 재시도와 같은 기능을 통해 긍정 오류를 최소화하고 신뢰할 수 있는 테스트 결과를 업을 수 있습니다. 또한, 사용자에게 최상의 경험을 제공하기 위해 [크로스 브라우저 테스트][2] 및 [모바일 애플리케이션 테스트][16]를 자동화할 수 있습니다.

## 원활한 통합을 통해 효율성을 높이세요

하나의 플랫폼에서 테스트하고 문제를 해결하여 애플리케이션 개발을 빠르게 진행하세요. 다음 유형의 CI 공급자 및 Slack 또는 Jira와 같은 협업 도구 중에서 선택하여 워크플로를 병합하고 컨텍스트 전환을 방지하세요.

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

[Datadog Terraform 공급자][10]를 사용해 테스트 생성과 상태 관리를 제어할 수 있습니다. Synthetic 테스트를 스테이징, 사전 프로덕션 및 카나리 배포를 위한 [통합 및 엔드투엔드 테스트][11]로 활용하거나 [CI 파이프라인][11]에서 직접 실행하세요.

## 신속하게 문제를 해결하세요

통합 모니터링 플랫폼에서 테스트를 수행하면 테스트 실행 실패의 근본 원인을 빠르게 찾고 MTTR을 줄일 수 있습니다. [Synthetic Monitoring 및 Continuous Testing Explorer][11]에서 실행된 작업을 확인하여 Datadog [APM 통합][12]이 표시하는 상호 연관된 메트릭, 트레이스, 로그를 통해 도구 간 전환 없이 문제 해결을 위한 전체 컨텍스트를 얻을 수 있습니다.

{{< img src="continuous_testing/open_sidepanel.png" alt="CI batches in the Continuous Testing Explorer" style="width:100%;">}}

##  Synthetic Monitoring 및 Continuous Testing Explorer를 사용하세요

합성 테스트 실행 또는 CI/CD 파이프라인에서 실행되는 테스트 배치에 대한 [검색 쿼리와 시각화][11]를 생성하세요.

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## 시작할 준비가 되었습니까?

몇 가지 [Synthetic 테스트][4]를 설정한 후에는 선호하는 [CI/CD 공급자][1]의 설명서를 확인하거나 CI/CD 파이프라인에 있는 [datadog-ci NPM 패키지][14]를 사용하세요. 그런 다음 [Synthetic Monitoring 및 Continuous Testing Explorer][11]에서 배치 실행에 대한 세부 정보를 탐색해 보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/cicd_integrations/
[2]: /ko/synthetics/browser_tests
[3]: /ko/continuous_testing/settings
[4]: /ko/synthetics/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[11]: /ko/continuous_testing/explorer
[12]: /ko/synthetics/apm/
[13]: https://app.datadoghq.com/synthetics/create#
[14]: /ko/continuous_testing/cicd_integrations/configuration
[15]: /ko/mobile_app_testing/mobile_app_tests
[16]: /ko/mobile_app_testing/