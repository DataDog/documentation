---
description: CD Visibility가 배포 롤백을 탐지하는 방법을 알아보세요.
further_reading:
- link: /continuous_delivery/deployments/
  tag: 문서
  text: Deployment Visibility에 대해 알아보기
- link: /continuous_delivery/explorer
  tag: 문서
  text: 배포를 쿼리하고 시각화하는 방법 알아보기
title: 롤백 탐지
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="미리 보기에 참여하세요!" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 이 기능에 관심이 있다면 양식을 작성하여 액세스 권한을 요청하세요.
{{< /callout >}}

## 개요 {#overview}

특정 배포에서 롤백이 수행되는 시점을 파악하면 다음과 같은 이점이 있습니다.
- 서비스 전반의 배포 안정성과 롤백 빈도를 파악할 수 있습니다.
- 롤백으로 이어지는 배포 문제의 패턴을 식별할 수 있습니다.

롤백을 탐지하기 위해 Datadog은 현재 배포 버전을 동일한 서비스 및 환경에 이전에 배포된 버전과 비교합니다. 다음 두 조건을 모두 충족하면 롤백으로 판단합니다.
- 현재 버전이 이전 버전과 다릅니다. 이렇게 하면 동일한 버전을 재배포해도 롤백으로 간주되지 않습니다.
- 현재 버전이 이전에 배포된 버전과 일치합니다.

[Deployment Executions][1]에서 `@deployment.is_rollback` 태그를 사용하여 롤백 배포를 검색할 수 있습니다.

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Deployment Executions 페이지의 롤백 표시기" style="width:100%;">}}

이벤트 세부 정보에서도 자세한 내용을 확인할 수 있습니다.

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="롤백 세부 정보" style="width:100%;">}}

## 요구 사항 {#requirements}

롤백 탐지는 다음 정보를 모두 포함하는 배포에서 작동합니다.
- 서비스(`@deployment.service`)
- 환경(`@deployment.env`)
- 버전 식별자(`@deployment.version`)

### CI 기반 공급자의 버전 {#version-for-ci-based-providers}
CI 기반 공급자의 경우 Datadog은 `datadog ci` 명령에 전달하는 `--revision` 파라미터를 사용합니다. 이 파라미터에는 배포의 버전 식별자(커밋 SHA, 이미지 태그 또는 버전 번호 등)가 포함되어야 합니다.

### Argo CD용 버전 {#version-for-argo-cd}
Argo CD 배포의 경우 Datadog은 연결된 이미지의 버전을 사용하여 롤백을 탐지합니다. Datadog은 배포에서 '메인' 이미지를 식별하고 해당 이미지에서 버전 태그를 추출합니다.

Argo CD 배포에 대한 롤백 탐지를 활성화하려면 [Argo CD 모니터링 문서][3]에 설명된 대로 [`datadog-ci deployment correlate-image` 명령][2]을 사용하여 이미지와 커밋을 연결해야 합니다. 이미지 연결을 위해서는 Argo CD v3.1.0 이상이 필요합니다.

이미지가 올바르게 연결되면 Datadog은 이미지 메타데이터에서 버전 태그를 채우고 이를 롤백 탐지에 사용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[3]: /ko/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines