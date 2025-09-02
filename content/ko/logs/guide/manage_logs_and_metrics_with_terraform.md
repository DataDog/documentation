---
disable_toc: false
title: Terraform으로 로그 및 메트릭 관리
---

## 개요
[Terraform][1]으로 Datadog API와 상호 작용하고 로그 및 메트릭을 관리할 수 있습니다. 본 지침에서는 사용 사례 예시를 제시하며, Tearraform 레지스트리에서 일반적으로 사용되는 Datadog 리소스와 데이터 소스 링크가 포함되어 있습니다.

또한, 기존 리소스를 Terraform 설정으로 [불러오기][2]하여 기존 리소스를 Terraform [데이터 소스][3]로 참조할 수 있습니다.

## Datadog Terraform 공급자 설정

아직 설정하지 않은 경우, Terraform 설정에서 [Datadog Terraform 제공자][4]를 설정하여 Datadog API와 상호작용할 수 있도록 합니다.

## 로그 설정

### 다중 인덱스 설정

보존 기간 또는 일일 할당량, 사용량 모니터, 청구에 따라 로그를 분할하려면 [다중 인덱스][5]를 설정합니다. 예를 들어, 7일 동안만 보존해야 하는 로그와 30일 동안 보존해야 하는 로그가 있다면 다중 인덱스로 로그를 두 가지 보존 기간으로 구분합니다. 이러한 필터의 쿼리 정의에 관한 자세한 내용은 [포함 필터][6] 및 [제외 필터][7] 문서를 참조하세요. 수집한 로그는 필터와 일치하는 첫 번째 인덱스로 이동하므로, 사용 사례에 따라 [인덱스 순서][8]를 지정하세요.

### 커스텀 파이프라인 설정

로그 파이프라인은 콘텐츠에서 의미 있는 정보나 속성을 추출하여 패싯으로 재사용하는 일련의 순차적 프로세서입니다. 파이프라인을 거치는 각 로그는 각 파이프라인 필터와 매칭됩니다. 필터와 매칭되면 다음 파이프라인으로 이동하기 전 모든 프로세서가 로그에 적용됩니다. [커스텀 파이프라인][9]을 설정하여 로그를 파싱하고 보강합니다. 사용 가능한 프로세서에 관한 자세한 내용은 [프로세서 문서][10]를 참조하세요. 또한, [파이프라인 재정렬][11]로 로그가 올바른 순서로 처리되고 있는지 확인할 수 있습니다.

통합 파이프라인은 특정 소스(예: NGINX 통합)에서 로그를 전송하면 자동 설치됩니다. [로그 통합 파이프라인 리소스][12]로 해당 파이프라인을 재정렬할 수 있습니다.

### 장기 보관용 다중 아카이브 설정

로그를 더 장기간 보관하려면 [로그 아카이브][13]를 설정합니다. 로그 아카이브는 로그를 Amazon S3, Azure Storage 또는 Google Cloud Storage 등, 스토리지에 최적화된 시스템으로 전송합니다. 필요에 따라 [아카이브를 재정렬][14]할 수도 있습니다.

### 수집한 로그에서 메트릭 생성

[로그 기반 메트릭을 생성][15]하여 수집한 로그에서 로그 데이터를 요약합니다. 예를 들어, 쿼리와 매칭되는 로그의 카운트 메트릭을 생성하거나, 요청 기간과 같이 로그에 포함된 숫자 값의 분포 메트릭과 일치하는 로그의 카운트 메트릭을 생성할 수 있습니다. 자세한 내용은 [수집된 로그에서 메트릭 생성하기][16]를 참조하세요.

## 메트릭 설정

메트릭의 메타데이터에는 메트릭 이름, 설명 및 유닛이 포함됩니다. 정보를 수정하려면 [메트릭 메타데이터 리소스][17]를 사용합니다.

태그로 메트릭에 차원을 추가하여 시각화에서 필터링, 집계, 비교할 수 있습니다. [메트릭 태그 설정 리소스][18]로 Terraform에서 메트릭 태그를 수정합니다. 태그 활용에 관한 자세한 내용은 [태그 사용 시작하기][19]를 참조하세요.


[1]: https://www.terraform.io/
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /ko/integrations/terraform/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index
[6]: /ko/logs/log_configuration/indexes/#indexes-filters
[7]: /ko/logs/log_configuration/indexes/#exclusion-filters
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index_order
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_custom_pipeline
[10]: /ko/logs/log_configuration/processors/?tab=ui
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_pipeline_order
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_integration_pipeline
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive_order
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_metric
[16]: https://docs.datadoghq.com/ko/logs/log_configuration/logs_to_metrics/
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_metadata
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_tag_configuration
[19]: /ko/getting_started/tagging/