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
title: 지속적 통합 가시성
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

이 페이지에서는 연속적인 통합(CI) 메트릭과 데이터를 Datadog 대시보드로 가져오는 방법에 대해 설명합니다. CI 파이프라인에서 Continuous Testing 테스트를 실행하려면 <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing 및 CI/CD</a> 섹션을 참조하세요.

## 개요

Datadog Continuous Integration (CI) Visibility는 CI 성능, 트렌드 및 신뢰성에 대한 데이터뿐만 아니라 CI 테스트 및 파이프라인 결과에 대한 정보를 통합합니다. CI Visibility는 CI 메트릭과 데이터를 Datadog 대시보드 및 노트북으로 가져와 CI 환경의 상태를 전달하고 팀이 항상 양질의 코드를 제공하는 능력을 갖출 수 있도록 지원합니다.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

CI Visibility를 사용하면 개발자가 테스트 또는 파이프라인 실패 이유를 파악하고, 테스트 스위트 실행 시간 경향을 모니터링하며, 특정 커밋이 파이프라인에 미치는 영향을 확인할 수 있습니다. 또한, 빌드 엔지니어는 조직 간의 CI 상태와 시간 경과에 따른 파이프라인 성능의 추세를 확인할 수 있습니다.

## 테스트 신뢰성을 개선하고 트레이스를 생성하세요

CI Visibility를 사용하면 가장 중요한 개발 장애와 이를 발생시킨 커밋을 연결하여 테스트 실패 및 깨진 빌드 문제를 해결할 수 있습니다. 테스트를 계측하고 테스트 프레임워크가 CI에서 실행될 때 트레이스를 생성할 수 있습니다.

## 원활한 통합을 통해 효율성을 높이세요

Datadog은 다음 CI 공급자와 협력하여 커밋이 파이프라인에 들어간 순간부터 배포 준비가 완료될 때까지 성능 및 결과를 추적하는 파이프라인 메트릭을 수집합니다. 시간이 지남에 따라 집계된 데이터를 사용하여 테스트 및 빌드 성능의 추세를 추적하고 수정해야 할 가장 중요한 문제를 파악합니다. 

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

`datadog-ci` CLI를 사용하여 파이프라인에서 [트레이스 명령][8]을 사용할 수 있을 뿐만 아니라 [커스텀 태그 및 측정 명령][9]을 사용하여 파이프라인 트레이스에 사용자 정의 텍스트 및 숫자 태그를 추가할 수 있습니다.

## 시작할 준비가 되셨나요?

CI 공급자와의 CI Visibility 설정 지침, 호환성 요구 사항에 대한 정보 및 데이터 수집을 계측하고 설정하는 단계는 [Pipeline Visibility][3] 및 [Test Visibility][4]를 참조하세요. 그런 다음 [CI Visibility Explorer][7]에서 테스트 실행 및 파이프라인 실행에 대한 세부 정보를 탐색하고 검색 쿼리를 [CI Pipeline or Test Monitor][6]로 내보냅니다.

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