---
aliases:
- /ko/continuous_integration/setup_pipelines/codefresh
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI 문제 해결
title: Codefresh 파이프라인에서 트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

- **Partial pipelines**: 부분 재시도와 다운스트림 파이프라인 실행을 표시합니다

- **Manual steps**: 수동으로 트리거된 파이프라인을 표시합니다.

- **Parameters**: 파이프라인이 트리거될 때 커스텀 파라미터 (예: [Codefresh 변수][6])를 설정합니다.

- **Pipeline failure reasons**: 오류 메시지에서 파이프라인 실패 원인을 파악합니다.

## Datadog 통합 설정

[Codefresh][1]에서 Datadog 통합을 활성화하는 단계는 다음과 같습니다.

1. Codefresh에서 **[Account Settings > Configuration > Integrations][2]**로 이동하고 Datadog 행에서 **CONFIGURE**를 클릭합니다.
2. **ADD INTEGRATION**을 클릭합니다.
3. 다음 정보와 함께 양식을 작성합니다.
   * **Datadog site**: 드롭다운 메뉴에서 {{< region-param key="dd_site" code="true" >}}를 선택합니다.
   * **Token**: [Datadog API 키][3]를 추가합니다.
4. **SAVE**를 클릭해 통합을 저장합니다.

## Datadog에서 파이프라인 데이터 시각화

파이프라인이 완료되면 [Pipelines][4]와 [Pipeline Executions][5] 페이지가 데이터로 채워집니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables