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
- link: /getting_started/continuous_testing
  tag: 설명서
  text: Continuous Testing에 대해 알아보기
- link: /synthetics/private_locations/#scale-your-private-location
  tag: 설명서
  text: 프라이빗 위치에 대해 알아보기
- link: /continuous_testing/environments
  tag: 설명서
  text: 로컬 및 스테이징 환경에서 Continuous Testing에 대해 알아보기
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

Datadog Continuous Testing은 제품의 전체 수명 주기 동안 소프트웨어 테스트를 자동화할 수 있는 일련의 도구를 제공합니다. 코드가 필요없는 안정적인 엔드투엔드 테스팅과 [인기 CI 공급자][1]와의 원활한 통합을 제공함으로써 Continuous Testing은 사용자가 애플리케이션 개발을 가속하고 고품질 기능을 더 빠르게 선보일 수 있도록 지원합니다.

## 쉽고 빠르게 테스트하세요

코딩 없는 [웹 레코더][2], [모바일 앱 레코더][15], [병렬식 테스트 실행][3], 빌트인 멀티 위치 테스트와 같이 규모 조정이 가능한 기능을 사용해 QA 팀의 수고와 시간을 절약할 수 있습니다. [**Settings** 페이지][3]에서 테스트를 순차적으로 실행하거나 동시에 실행할 테스트 수를 커스텀 설정할 수 있습니다.

{{< img src="continuous_testing/settings/parallelization.png" alt="연속적 테스트 설정 페이지에서 테스트를 순차적으로 실행하거나 동시에 실행할 테스트 수 설정" style="width:100%;">}}

gRPC 및 WebSockets을 포함하는 다양한 프로토콜, 프레임워크 및 API가 지원되어 애플리케이션 스택의 모든 수준에서 그리고 모든 프리프로덕션 환경에서 테스트를 수행할 수 있습니다.

## 테스트 안정성 향상

테스트 코드를 구현할 필요 없이 [신서틱 모니터링의 탄력적이고 확장 가능하며 코딩이 필요 없는 테스트][4]를 사용하여 소프트웨어를 빌드해 보세요. 자동 복구 브라우저 테스트, 모바일 앱 테스트, 자동 테스트 재시도와 같은 기능을 통해 가양성을 최소화하고 신뢰할 수 있는 테스트 결과를 업을 수 있습니다.

[크로스 브라우저 테스트][2]와 [모바일 애플리케이션 테스트][16]를 자동화하여 사용자에게 최고의 경험을 보장할 수 있습니다. 다양한 시나리오와 환경에서 여러 테스트를 실행해야 하는 CI 배치에서 이 같은 연속적 테스팅 기능을 사용하면 좋습니다.

## 원활한 통합을 통해 효율성을 높이세요

플랫폼 한 개로 테스트를 실행하고 문제를 해결해 애플리케이션 개발 속도를 높이세요.  다음 CI 공급자 또는 [Slack][18]이나 Jira[19]와 같은 협업 도구를 선택해 워크플로우를 병합하고 컨텍스트 전환에 대비하세요.

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

[Datadog Terraform 공급자][10]를 사용해 테스트 생성과 상태 관리를 제어할 수 있습니다. Synthetic 테스트를 스테이징, 사전 프로덕션 및 카나리 배포를 위한 [통합 및 엔드투엔드 테스트][11]로 활용하거나 [CI 파이프라인][11]에서 직접 실행하세요.

## 신속하게 문제를 해결하세요

통합된 모니터링 플랫폼으로 테스트를 실행하면 테스트 실행이 실패한 근본 원인을 발견하고 평균 해결 시간을 줄이는 데 도움이 됩니다.

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="신서틱 모니터링 및 테스트 결과 탐색기의 CI 배치 측면 패널" style="width:100%;">}}

도구를 전환할 필요 없이 Datadog [APM 통합][12]을 통해 메트릭, 트레이스, 로그 트러블슈팅의 전체 컨텍스트를 볼 수 있습니다. [신서틱 모니터링 및 연속 테스트 탐색기][11]에서 실행된 작업을 확인하면 됩니다.

## 신서틱 모니터링 및 테스트 결과 탐색기에서 CI 배치 조사

신서틱(Synthetic) 테스트 실행 또는 CI/CD 파이프라인에서 실행되는 테스트 배치에 대해 [검색 쿼리 및 시각화][11]를 생성하세요.

{{< img src="continuous_testing/explorer/results_explorer.png" alt="신서틱 모니터링 및 테스트 결과 탐색기 내 CI 배치 결과 목록" style="width:100%;">}}

개별 테스트 실행과 테스트 종합 배치를 모니터링하고 각 테스트 유형과 관련한 인사이트를 얻을 수 있습니다.

## 시작할 준비가 되셨나요?

[신서틱 테스트][4]를 설정한 후, 선호하는 [CI/CD 공급자][1] 설명서를 참고하거나 CI/CD 파이프라인에 있는 [`datadog-ci` NPM 패키지][14]를 사용하세요. [로컬 및 스테이징 환경][17]을 참고해 공개되지 않거나 프로덕션 상태의 환경에서 연속적 테스트를 사용할 수 있습니다. 예를 들어 로컬 개발 환경이나 프라이빗 네트워크 내 스테이징 환경에서 테스트를 실행할 수 있습니다. 그 후 [신서틱 모니터링 및 연속적 테스트 탐색기][11]에서 실행되는 배치와 관련한 상세 정보를 찾아보세요.

{{< learning-center-callout header="학습 센터에서 CI/CD 파이프라인 신서틱 테스트를 실행해보세요" btn_title="지금 등록하기" btn_url="https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline">}}
  Datadog 학습 센터에는 이 주제에 관한 실습 코스가 많습니다. 무료로 등록해 CI/CD 파이프라인에서 Datadog 신서틱 테스트를 실행하는 방법을 배워보세요.
{{< /learning-center-callout >}}

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
[17]: /ko/continuous_testing/environments
[18]: /ko/integrations/slack/
[19]: /ko/integrations/jira/