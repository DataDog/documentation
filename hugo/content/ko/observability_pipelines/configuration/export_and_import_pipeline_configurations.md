---
aliases:
- /ko/observability_pipelines/configuration/export_pipeline_configuration/
description: 초안 또는 배포된 파이프라인의 구성을 JSON 또는 Terraform으로 내보내고, JSON 구성을 Observability
  Pipelines UI로 가져오는 방법을 알아봅니다.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: 문서
  text: 파이프라인 설정
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: 문서
  text: 기존 파이프라인 업데이트
- link: https://docs.datadoghq.com/api/latest/observability-pipelines/
  tag: 문서
  text: Observability Pipelines API
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
  tag: 문서
  text: Observability Pipelines Terraform 리소스
title: 파이프라인 구성 내보내기 및 가져오기
---
## 개요 {#overview}

Terraform 또는 API를 사용하여 파이프라인을 설정하고 업데이트하는 작업은 시간이 많이 걸리고 수동으로 수행해야 하며 구문 오류가 발생하기 쉽습니다. 대신 UI에서 파이프라인을 생성하거나 기존 파이프라인을 업데이트한 다음, 구성을 JSON 또는 Terraform으로 내보내 프로그래밍 방식으로 파이프라인을 생성하거나 업데이트할 수 있습니다. 또한 JSON 형식의 파이프라인 구성을 UI로 가져올 수도 있습니다.


## 초안 모드의 파이프라인 구성 내보내기 {#export-the-configuration-of-a-pipeline-in-draft-mode}

아직 배포하지 않은 파이프라인을 구축할 때는 UI에서 파이프라인을 설정한 후 구성을 JSON 또는 Terraform으로 내보내 프로그래밍 방식으로 파이프라인을 생성할 수 있습니다.

1. [Observability Pipelines][1]로 이동합니다.
1. 소스, 프로세서 및 대상을 추가하여 [파이프라인을 설정][2]합니다.
1. 파이프라인 구성을 완료한 후 {{< ui >}}Export Pipeline{{< /ui >}}을 클릭합니다.
   {{< img src="observability_pipelines/export_pipeline/export_draft_pipeline.png" alt="파이프라인 UI에서 강조 표시된 내보내기 버튼" style="width:100%;" >}}
1. 복사 또는 다운로드 버튼을 클릭하여 구성을 JSON 또는 Terraform으로 내보냅니다.
   {{< img src="observability_pipelines/export_pipeline/export_json_modal.png" alt="JSON 형식의 파이프라인 구성이 표시된 내보내기 모달" style="width:100%;" >}}
1. [API][3] 또는 [Terraform][4]을 사용하여 파이프라인 구성을 배포합니다.
1. 파이프라인을 통해 데이터 전송 및 처리를 시작하려면 [Worker를 설치][7]합니다.

## 배포된 파이프라인의 구성 내보내기 {#export-the-configuration-of-a-deployed-pipeline}

배포된 파이프라인에는 데이터 전송을 위한 Worker가 설치되어 있으며 활성 또는 비활성 상태일 수 있습니다.

### 파이프라인 구성 내보내기 {#export-a-pipelines-configuration}

UI에서 배포된 파이프라인을 조회할 때 해당 구성을 JSON 또는 Terraform으로 내보내 프로그래밍 방식으로 파이프라인을 생성할 수 있습니다.

1. [Observability Pipelines][1]로 이동합니다.
1. 구성을 조회할 배포된 파이프라인을 선택합니다(상태는 `active` 또는 `inactive`일 수 있음).
1. {{< ui >}}Export Pipeline{{< /ui >}}을 클릭합니다.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline.png" alt="배포된 파이프라인 페이지의 내보내기 버튼" style="width:100%;" >}}
1. 복사 또는 다운로드 버튼을 클릭하여 구성을 JSON 또는 Terraform으로 내보냅니다.
1. 추가로 변경할 사항이 있으면 JSON 또는 Terraform 구성을 업데이트한 다음 프로그래밍 방식으로 배포합니다.
   - [API 설명서][5]
   - [Terraform 설명서][4]

### 파이프라인 편집 후 구성 내보내기 {#export-a-pipelines-configuration-after-making-edits-to-the-pipeline}

배포된 파이프라인을 편집할 때 UI에서 [팩][6]과 같은 새 구성 요소를 추가하거나 볼륨 제어 규칙을 업데이트한 후 구성을 JSON 또는 Terraform으로 내보내 변경 사항을 프로그래밍 방식으로 배포할 수 있습니다.

1. [Observability Pipelines][1]로 이동합니다.
1. 구성을 조회할 배포된 파이프라인을 선택합니다(상태는 `active` 또는 `inactive`일 수 있음).
1. 소스, 대상 또는 프로세서를 변경합니다.
1. 파이프라인을 종료하기 전에 {{< ui >}}Export Pipeline{{< /ui >}}을 클릭합니다.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline_edit.png" alt="파이프라인 편집 페이지에서 강조 표시된 내보내기 버튼" style="width:100%;" >}}
1. 복사 또는 다운로드 버튼을 클릭하여 구성을 JSON 또는 Terraform으로 내보냅니다.
   - **참고**: UI에서 파이프라인을 업데이트한 후, 변경 사항을 저장하거나 배포하지 않았더라도 내보낸 구성에는 최신 변경 사항이 포함됩니다.
   {{< img src="observability_pipelines/export_pipeline/export_terraform_modal.png" alt="Terraform 형식의 파이프라인 구성이 표시된 내보내기 모달" style="width:100%;" >}}
1. UI에서 변경한 내용을 저장하지 않고 파이프라인을 종료하려면 페이지 왼쪽 상단의 Observability Pipelines 로고를 클릭합니다.
   {{< img src="observability_pipelines/export_pipeline/exit_export_deployed_pipeline.png" alt="파이프라인 페이지에서 강조 표시된 Observability Pipelines 로그" style="width:100%;" >}}
1. 복사하거나 다운로드한 구성을 사용하여 프로그래밍 방식으로 파이프라인을 업데이트합니다.
   - [API 설명서][5]
   - [Terraform 설명서][4]

## 파이프라인의 JSON 구성을 UI로 가져오기 {#import-a-pipelines-json-configuration-to-the-ui}

파이프라인 구축이나 Datadog 조직 간 파이프라인 구성 전송을 위해 파이프라인의 JSON 구성을 UI로 가져올 수도 있습니다.

1. [Observability Pipelines][1]로 이동합니다.
1. 구성을 조회할 초안 파이프라인을 선택합니다.
1. 설정을 클릭한 다음 {{< ui >}}Import Pipeline{{< /ui >}}을 선택합니다.
   {{< img src="observability_pipelines/export_pipeline/import_access.png" alt="Import Pipeline이 표시된 설정 메뉴" style="width:100%;" >}}
1. 컴퓨터에서 JSON 파일 형식의 파이프라인 구성을 선택합니다.
   {{< img src="observability_pipelines/export_pipeline/import_select.png" alt="JSON 파일 선택 옵션이 있는 가져오기 모달" style="width:100%;" >}}
1. {{< ui >}}Import{{< /ui >}}를 클릭합니다. 현재 파이프라인 구성이 가져온 JSON 파일의 파이프라인 구성으로 대체됩니다.
1. [Observability Pipelines Worker를 설치하고 UI에서 파이프라인을 배포합니다][8].

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-in-the-ui
[3]: https://docs.datadoghq.com/ko/api/latest/observability-pipelines/#create-a-new-pipeline
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://docs.datadoghq.com/ko/api/latest/observability-pipelines/#update-a-pipeline
[6]: /ko/observability_pipelines/packs/
[7]: /ko/observability_pipelines/configuration/install_the_worker/#api-or-terraform-pipeline-setup
[8]: https://docs.datadoghq.com/ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management