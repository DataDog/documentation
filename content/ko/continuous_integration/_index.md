---
aliases:
- /ko/ci
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 소프트웨어 배포 릴리스를 확인하세요! (앱 로그인 필요)
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: 블로그
  text: Datadog으로 CircleCI 환경을 모니터링하세요
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: 블로그
  text: Datadog CI 모니터로 파이프라인 알림을 설정하세요
- link: /continuous_integration/pipelines/
  tag: 설명서
  text: 파이프라인 데이터를 탐색하여 빌드 문제를 해결하세요
- link: /continuous_integration/tests/
  tag: 설명서
  text: \u0008테스트 데이터를 탐색하여 문제가 발생한 테스트를 찾고 해결하세요
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: 블로그
  text: 정적 웹 애플리케이션 모니터링을 위한 모범 사례를 확인하세요
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: 블로그
  text: CI/CD 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: 블로그
  text: CI/CD에서 소프트웨어 모니터링에 대한 모범 사례
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: 블로그
  text: Datadog CI 파이프라인 가시성을 통한 CI/CD 현대화 모니터링
title: 지속적 통합 가시성
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

이 페이지에서는 연속적인 통합(CI) 메트릭과 데이터를 Datadog 대시보드로 가져오는 방법에 대해 설명합니다. CI 파이프라인에서 Continuous Testing 테스트를 실행하려면 <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing 및 CI/CD</a> 섹션을 참조하세요.

## 개요

Datadog CI(지속적 통합) 가시성은 CI 환경 전반에 걸쳐 파이프라인 결과, 성능, 추세 및 안정성에 대한 통합 보기를 제공합니다. Datadog을 CI 파이프라인과 통합하면 모니터를 만들고, [Datadog 대시보드][1] 및 [노트북][2] 내에 데이터를 표시하고, 조직의 CI 상태에 대한 시각화를 만들 수 있습니다.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI 가시성은 개발자가 파이프라인 중단의 원인을 이해하고 파이프라인 실행 시간의 추세를 모니터링하는 데 도움이 됩니다. 또한 시간 경과에 따른 조직 간 CI 상태 및 파이프라인 성능에 대한 빌드 엔지니어의 통찰력을 제공합니다.

## 파이프라인 안정성 향상 및 트레이스 생성

CI 가기성은 가장 심각한 개발 중단을 해당 중단을 유발한 커밋에 연결하여 파이프라인 오류 및 손상된 빌드 문제를 해결하는 데 도움이 됩니다. 파이프라인을 계측하고 실행 시 추적하여 파이프라인 성능에 대한 더 깊은 통찰력을 얻을 수 있습니다.

## 원활한 통합을 통해 효율성을 높이세요

Datadog은 다양한 CI 제공자와 통합되어 커밋부터 배포까지 CI 파이프라인의 성능을 추적하는 메트릭을 수집합니다. 이러한 메트릭은 성과 추세와 개선 기회를 식별하는 데 사용됩니다.

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

`datadog-ci` CLI를 사용하여 [명령을 추적][8]하고 [커스텀 태그 및 측정값][9]을 추가할 수 있습니다. 이를 통해 파이프라인 트레이스에 커스텀 텍스트와 숫자 태그를 추가할 수 있습니다.

## 시작할 준비가 되셨나요?

호환성 요구 사항 및 데이터 수집 구성 단계에 대한 세부 정보를 포함하여 CI 공급자를 통해 CI 가시성을 설정하는 방법에 대한 지침을 보려면 [파이프라인 가시성][3]을 방문하세요. 그런 다음 [CI 가시성 탐색기][7]에서 파이프라인 실행에 대한 세부 정보 탐색을 시작하고 검색 쿼리를 [CI 파이프라인 모니터][6]로 내보냅니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ko/continuous_integration/pipelines/
[4]: /ko/continuous_integration/tests/
[6]: /ko/monitors/types/ci/
[7]: /ko/continuous_integration/explorer/
[8]: /ko/continuous_integration/pipelines/custom_commands/
[9]: /ko/continuous_integration/pipelines/custom_tags_and_measures/