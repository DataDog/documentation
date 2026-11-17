---
cascade:
  algolia:
    rank: 70
    tags:
    - cd pipeline
    - cd pipelines
further_reading:
- link: /continuous_delivery/explorer
  tag: 설명서
  text: 배포를 쿼리하고 시각화하는 방법 알아보기
- link: /continuous_delivery/features
  tag: 설명서
  text: CD Visibility 기능에 대해 알아보기
title: Datadog의 CD Visibility
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 개요 {#overview}

CD Visibility는 배포의 중요한 메트릭과 결과를 표시하여 CD 상태를 배포 중심의 관점에서 제공합니다.

## 설정 {#setup}

{{< whatsnext desc="Datadog에서 CD Visibility를 설정하려면 배포 공급자를 선택하세요." >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}CI 공급자(GitLab, Jenkins, CircleCI 등){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">지원되지 않는 공급자를 사용하는 경우, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">이 지원 양식을 작성</a>하세요.</div>

## 배포 데이터 사용 {#use-deployment-data}

[대시보드][1] 또는 [노트북][2]을 생성하는 경우 검색 쿼리에서 배포 데이터를 사용할 수 있으며, 이는 시각화 위젯 옵션을 업데이트합니다. 자세한 내용은 [대시보드][3] 및 [노트북 설명서][4]를 참조하세요.

## 배포 데이터 공유 {#share-deployment-data}

{{< ui >}}Export{{< /ui >}} 버튼을 클릭하여 검색 쿼리를 [Saved View][5]로 내보낼 수 있습니다.

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="CD Visibility Explorer에 나타나는 배포 실행 결과" width="100%" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /ko/dashboards
[4]: /ko/notebooks
[5]: /ko/continuous_delivery/explorer/saved_views