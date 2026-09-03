---
description: GitLab Autoscale 작업 실행으로 인프라스트럭처 메트릭을 상호 연관시키는 방법 알아보기
further_reading:
- link: /continuous_integration/pipelines/gitlab
  tag: 설명서
  text: GitLab 파이프라인에서 CI Visibility 설정
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: 설명서
  text: 파이프라인 실행 파일 검색 및 관리 방법 알아보기
title: Datadog에서 GitLab 작업으로 인프라스트럭처 메트릭 상호 연관시키기
---

<div class="alert alert-info"><strong>참고</strong>: 이 메서드는 "인스턴스" 또는 Docker Autoscaler" 실행 파일을 사용하는 실행기에만 적용됩니다.</div>

## 개요

[CI Visibility Explorer][9]에서 GitLab 작업을 클릭하면 **인프라스트럭처** 탭에 액세스하여 호스트, 시스템, 호스트 태그, 호스트 메트릭 등과 같은 정보를 확인할 수 있습니다.

{{< img src="continuous_integration/infrastructure_tab.png" alt="호스트와 시스템 정보를 표시하는 인프라스트럭처 탭. CPU 사용량과 로드 평균과 같은 호스트 메트릭도 표시됨" style="width:100%;">}}

이 가이드에서는 GitLab "인스턴스" 또는 "Docker Autoscaler" 실행기와 [CI Visibility][1]를 사용할 경우 인프라스트럭처 메트릭과 GitLab 작업을 상호 연결하는 방법을 설명합니다.

## 사전 필수 조건

가상 머신(VM) 내 GitLab 작업이 실행될 곳에 Datadog 에이전트가 실행되어 있어야 합니다. [GitLab 인스턴스][2] 또는 [Docker Autoscaler][3] 실행자가 실행되는 곳이 아니라, 임시적 사용하는 플러그인이 생성되는 VM에 설치해야 합니다.

## 내 인스턴스에 Datadog 에이전트가 설치되어 있는지 확인

[AWS Autoscaling Group][4]을 사용할 경우, 템플릿에 구성된 머신 이미지가 [Datadog 에이전트][5]로 실행되어야 합니다.

이 단계를 성공적으로 완료했는지 테스트하려면 작업을 실행해보고 [인프라스트럭처 목록 페이지][6]에 호스트가 나타나는지 확인합니다.

AWS를 사용할 경우 호스트 이름이 `“i-xxxxx”` 형식이어야 합니다. 이와 같은 형식이 아닐 경우, 인스턴스가 IMDSv1와 호환이 되는지 확인하세요. 자세한 정보는 [공식 AWS 설명서][7]를 참고하세요.

AWS Autoscaling Group의 템플릿에 이를 설정할 수 있습니다. Datadog 에이전트는 호스트 이름을 확인하기 위해 메타데이터 서비스를 이용합니다.

## GitLab 작업용 CI Visibility와 로그 수집 설정

GitLab 작업용 CI Visibility 설정과 관련한 지침을 보려면 [GitLab Pipeline에서 Pipeline Visibility  설정][1]을 참고하세요.

이 단계를 성공적으로 완료했는지 테스트하려면 GitLab 파이프라인을 실행해보고 [**Executions** 페이지][8]에 나타나는지 확인하세요.

작업 로그 수집을 활성화해야 합니다. 파이프라인 실행의 Logs 탭을 클릭해 Datadog에서 로그를 바르게 수신하고 있는지 확인할 수 있습니다.

위 단계를 완료한 후 GitLab 작업이 인프라스트럭처 메트릭과 상호 연결됩니다. 이와 같은 연결은 여러 호스트에서 다른 작업이 실행될 수 있기 때문에 파이프라인당이 아니라 작업당으로 실행됩니다. 작업이 완료되면 **인프라스트럭처** 탭이 나타나며, Datadog는 해당 작업에 관한 로그를 수신합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/pipelines/gitlab
[2]: https://docs.gitlab.com/runner/executors/instance.html
[3]: https://docs.gitlab.com/runner/executors/docker_autoscaler.html
[4]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html
[5]: /ko/agent/
[6]: https://app.datadoghq.com/infrastructure
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: /ko/continuous_integration/explorer/?tab=pipelineexecutions