---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ko/service_management/workflows/limits
description: Workflow Automation에 대한 속도 제한
disable_toc: false
further_reading:
- link: /actions/workflows/build
  tag: 문서
  text: 워크플로 빌드
title: 제한
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation은 선택한 Datadog 사이트({{< region-param key=dd_site_name >}})에서 미리보기로 제공됩니다.</div>
{{< /site-region >}}

이 페이지에서는 Workflow Automation에 적용되는 속도 제한 및 스로틀에 대해 설명합니다.

## 계정 수준 제한 {#account-level-limits}

### 유료 계정 {#paid-accounts}

각 조직:

* 분당 최대 500개의 워크플로를 생성할 수 있습니다.
* 분당 최대 200개의 워크플로를 실행할 수 있습니다.
* 소스(예: 특정 모니터링)에 대해 분당 최대 50개의 워크플로를 실행할 수 있습니다.
* 최대 500개의 요청을 버퍼링할 수 있습니다.

조직이 임계값을 초과하면 보류 중인 실행 요청이 조직당 최대 500개까지 대기열에 추가된 후 이전에 설명한 제한에 따라 처리됩니다. 예를 들어, 모니터링이 500개의 워크플로 실행을 트리거하는 경우 첫 1분에는 50개만 트리거됩니다. 나머지 450개의 워크플로 실행은 대기열에 추가되며 모든 워크플로가 트리거될 때까지 분당 워크플로 50개가 트리거됩니다.

### 평가판 계정 {#trial-accounts}

각 조직:

* 분당 최대 20개의 워크플로를 생성할 수 있습니다.
* 20분마다 최대 50개의 워크플로를 실행할 수 있습니다.
* 소스(예: 특정 모니터링)에 대해 분당 최대 20개의 워크플로를 실행할 수 있습니다.
* 최대 100개의 요청을 버퍼링할 수 있습니다.

조직이 임계값을 초과하면 보류 중인 실행 요청이 조직당 최대 100개까지 대기열에 추가된 후 이전에 설명한 제한에 따라 처리됩니다. 예를 들어, 모니터링이 100개의 워크플로 실행을 트리거하는 경우 첫 20분에는 50개만 트리거됩니다. 나머지 50개의 워크플로 실행은 대기열에 추가되며 20분 경과 후 트리거됩니다.

## 워크플로 수준 제한 {#workflow-level-limits}

* 워크플로는 스텝을 최대 150개까지 포함할 수 있습니다. 워크플로에 스텝이 150개 이상 필요한 경우 {{< ui >}}Trigger workflow{{< /ui >}} 작업을 사용하여 [자식 워크플로를 호출][2]할 수 있습니다. 출력 파라미터를 사용하여 자식 워크플로의 출력을 메인 워크플로로 다시 전달합니다.
* 워크플로는 최대 7일 동안 실행될 수 있습니다. 워크플로는 7일을 경과하여 실행되려고 하면 종료됩니다.
* 워크플로는 분당 최대 60개의 스텝을 시작할 수 있습니다. 이 속도를 초과하면 스텝이 스로틀되어 분당 60개의 속도로 시작됩니다.
* 워크플로의 모든 스텝 출력 합계는 최대 150MB까지 가능합니다.
* 워크플로의 출력 크기는 최대 5MB까지 가능합니다.

## 작업 제한 {#action-limits}

* 작업의 입력은 최대 15MB까지 가능합니다.
* 작업의 출력은 최대 15MB까지 가능합니다.
* 사용자가 제공한 JavaScript는 최대 10KB까지 가능합니다.
* 각 조직은 하루에 최대 10,000개의 이메일 전송 작업을 실행할 수 있습니다. 이 제한을 초과하면 작업에 실패하고 오류 메시지가 표시됩니다.
* [for loop][1] 작업은 최대 2000회 반복 실행될 수 있습니다. 2000회 이상의 반복이 필요한 경우 입력을 2000개 단위 세트로 분할하여 병렬로 계산할 수 있습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][9]의 **#workflows** 채널에 참여하세요.

[1]: /ko/actions/workflows/actions/flow_control/#for-loop
[2]: /ko/actions/workflows/trigger/#trigger-a-workflow-from-a-workflow
[9]: https://chat.datadoghq.com/