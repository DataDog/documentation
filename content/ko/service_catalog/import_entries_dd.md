---
further_reading:
- link: /tracing/service_catalog/adding_metadata
  tag: 설명서
  text: 메타데이터 추가하기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 외부 사이트
  text: Terraform을 사용하여 서비스 정의 생성 및 관리
- link: /api/latest/service-definition/
  tag: API
  text: 서비스 정의 API에 대해 자세히 알아보기
- link: /integrations/github
  tag: 설명서
  text: GitHub 통합 알아보기
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: 블로그
  text: Backstage YAML 파일을 Datadog으로 가져오기
title: Datadog 원격 측정에서 엔트리 가져오기
---

## 다른 Datadog 원격 측정을 통한 수동 서비스 검색

인프라스트럭처 메트릭과 같은 기존 Datadog 원격 측정을 통해 추가 서비스를 검색하려면 페이지 상단의  [**Setup & Config** 탭][3]으로 이동하여  **Import Entries** 탭을 클릭합니다. `DD_SERVICE` [태그][5]가 포함된 다른 Datadog 원격 측정에서 서비스를 가져올 수 있습니다.

{{< img src="tracing/service_catalog/import_entries.png" alt="Service Catalog 설정 및 구성 섹션의 Import Entries 탭" style="width:90%;" >}}

가져온 일부 엔트리는 **Explore** 탭에 표시됩니다. [API 사용][1] 또는 [GitHub 통합][6]을 통해 소유자 또는 연락처와 같은 메타데이터를 추가하지 않으면 엔트리가 만료될 수 있습니다.

기본 **Explore** 보기에서 가져온 서비스를 제거하려면 **Clear Previously Imported Services**를 클릭합니다. 이렇게 하면 메타데이터가 없거나 APM, USM(Universal Service Monitoring) 또는 RUM(Real User Monitoring) 원격 측정이 없는 모든 서비스가 제거됩니다.

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="Service Catalog 설정 및 구성 섹션에서 이전에 가져온 서비스 삭제 확인." style="width:90%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/service_catalog/service_definition_api/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: /ko/integrations/github/
[15]: https://backstage.io/docs/features/software-catalog/descriptor-format/
[16]: https://docs.datadoghq.com/ko/integrations/servicenow/#service-ingestion
[17]: https://docs.datadoghq.com/ko/universal_service_monitoring/
[18]: https://docs.datadoghq.com/ko/tracing/