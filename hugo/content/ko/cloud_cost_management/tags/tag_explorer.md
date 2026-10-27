---
aliases:
- /ko/cloud_cost_management/tag_explorer
description: 청구서의 태그를 포함한 모든 비용 관련 태그의 출처를 파악하고, 해당 태그를 검색하고 관리하세요.
further_reading:
- link: /cloud_cost_management/
  tag: 문서
  text: Cloud Cost Management에 대해 알아보기
- link: /cloud_cost_management/setup/custom
  tag: 문서
  text: Custom Costs에 대해 알아보기
- link: /cloud_cost_management/datadog_costs
  tag: 문서
  text: Datadog 비용에 대해 알아보기
- link: /cloud_cost_management/setup/saas_costs
  tag: 문서
  text: SaaS 및 AI 비용에 대해 알아보기
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: 문서
  text: Tag Pipelines에 대해 알아보기
title: 태그 탐색기
---
## 개요 {#overview}

[Cloud Cost Management][1]는 모든 비용 관련 태그의 출처를 탐지합니다. [Custom Costs][4], [Datadog costs][5] 및 [SaaS cost integrations][6]를 비롯한 비용 분석용 태그를 검색하고 관리할 수 있습니다.

[태그 탐색기][2]를 사용하여 각 태그의 출처를 파악하고 설명을 확인하세요. 여기에는 [Tag Pipelines][3]를 통해 관리되는 태그가 포함됩니다. Tag Pipelines를 사용하면 클라우드 청구서에서 누락되었거나 잘못된 태그를 수정하거나 비즈니스 로직에 따라 추론 태그를 생성하는 규칙을 만들고 관리할 수 있습니다.

## 설정 {#setup}

태그 탐색기를 사용하려면 AWS, Azure, Google Cloud 또는 Oracle Cloud에 대해 [Cloud Cost Management][1]를 구성해야 합니다.

각 클라우드 공급자에 해당하는 설명서를 참조하세요.

{{< card-grid image_width="50" >}}
  {{< image-card href="/cloud_cost_management/setup/aws/" src="integrations_logos/amazon-web-services_avatar.svg" alt="aws" >}}
  {{< image-card href="/cloud_cost_management/setup/azure/" src="integrations_logos/azure_avatar.svg" alt="azure" >}}
  {{< image-card href="/cloud_cost_management/setup/google_cloud/" src="integrations_logos/google-cloud-platform_avatar.svg" alt="google cloud" >}}
{{< /card-grid >}}

## 태그 검색 및 관리 {#search-and-manage-tags}

[{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}}][2]로 이동한 후 {{< ui >}}Tags{{< /ui >}} 탭을 선택하여 클라우드 공급자 청구서, [Custom Costs][4], [Datadog costs][5], [SaaS cost integrations][6] 및 [Tag Pipelines][3]의 태그를 검색합니다.

특정 공급자의 태그를 보려면 왼쪽 상단의 {{< ui >}}Provider{{< /ui >}} 드롭다운 메뉴에서 해당 공급자를 선택합니다. {{< ui >}}Tag Sources{{< /ui >}} 패널을 사용하여 각 태그의 출처를 기준으로 검색 결과를 추가로 좁힙니다.

다음 공급자의 태그를 사용할 수 있습니다.

- AWS
- Azure
- Confluent Cloud\*
- Databricks\*
- Datadog\*
- Elastic Cloud\*
- Fastly\*
- Google Cloud
- MongoDB\*
- OpenAI\*
- Oracle Cloud
- Snowflake\*
- Twilio\*

\* 이 공급자의 비용은 미리 보기로 제공되고 있습니다.

## 기본 설정 태그 지정 {#set-preferred-tags}
Cloud Cost Management 전반에서 조직의 주요 태그를 강조 표시하도록 최대 5개의 기본 설정 태그를 지정할 수 있습니다. 이러한 태그는 [Explorer 페이지][7], [CCM Reports][8] 및 [Custom Allocation Rules][9] 등에서 태그를 선택할 때 가장 먼저 표시됩니다.

{{< img src="cloud_cost/tag_explorer/preferred_tags_1.png" alt="CCM 전반에 기본 설정 태그 표시" style="width:100%;" >}}

[Tag Pipelines][3]의 태그를 포함한 기존 비용 데이터 태그 중에서 기본 설정 태그를 선택할 수 있습니다. 이 설정은 조직 전체에 적용됩니다.

{{< img src="cloud_cost/tag_explorer/preferred_tags_2.png" alt="태그 탐색기에서 기본 설정 태그 선택" style="width:100%;" >}}

## 태그 설명 편집 {#edit-tag-descriptions}

태그 탐색기에서 태그의 의미와 사용 방법을 설명할 수 있도록 모든 태그의 설명을 추가하거나 편집할 수 있습니다. 태그의 설명 필드를 클릭하여 설명을 수정하거나 AI를 사용하여 설명을 자동으로 생성합니다.

{{< img src="cloud_cost/tag_explorer/edit_tag_description.png" alt="AI 생성 옵션을 사용하여 태그 탐색기에서 태그 설명 편집" style="width:60%;" >}}

태그 설명은 조직의 모든 구성원에게 표시되며 다음 위치에 나타납니다.

- {{< ui >}}Tags{{< /ui >}}: 설명은 각 태그 키와 함께 태그 표에 표시됩니다.
- {{< ui >}}Group-by selectors{{< /ui >}}: Cloud Cost Management 전반에서 그룹화에 사용할 태그를 선택할 때 드롭다운 메뉴에 설명이 표시되어 사용자가 적절한 태그를 선택할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analyze/tags
[3]: /ko/cloud_cost_management/allocation/tag_pipelines
[4]: /ko/cloud_cost_management/setup/custom
[5]: /ko/cloud_cost_management/datadog_costs
[6]: /ko/cloud_cost_management/setup/saas_costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /ko/cloud_cost_management/reporting
[9]: /ko/cloud_cost_management/allocation/custom_allocation_rules