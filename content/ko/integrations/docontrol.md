---
app_id: docontrol
categories:
- 자동화
- 로그 수집
- 보안
custom_kind: integration
description: SaaS 데이터 보안 - SaaS 데이터 보안을 위한 DLP 및 CASB 현대화
integration_version: 1.0.0
media:
- caption: DoControl의 보안 자동화 워크플로우를 사용하여 Datadog 로그 및 인시던트 기능을 통해 정교하고 유연하며 세분화된 비즈니스
    로직을 만들 수 있습니다.
  image_url: images/dc-dd-01.png
  media_type: image
- caption: DoControl은 SaaS 앱 전반의 최종 사용자 활동 이벤트와 자산 메타데이터를 통합하여 모든 SaaS 활동 및 자산 노출에
    중앙 집중식 보기를 제공합니다.
  image_url: images/dc-dd-02.png
  media_type: image
- caption: DoControl은 전체 SaaS 앱 에코시스템에 관해 심층적이고 실행 가능한 인사이트와 가시성을 제공합니다.
  image_url: images/dc-dd-03.png
  media_type: image
- caption: DoControl은 협업, CRM, 커뮤니케이션, 개발 도구, HR, IdP, EDR 등의 범주에 속하는 앱을 포함하여 여러 부문에서
    가장 인기 있는 SaaS 앱과 통합되어 있습니다.
  image_url: images/dc-dd-04.png
  media_type: image
- caption: DoControl은 사전 구축되어 바로 사용할 수 있는 광범위한 플레이북 카탈로그를 제공하여 보호해야 할 일반적인 위협 모델과
    미션 크리티컬 사용 사례를 보여줍니다.
  image_url: images/dc-dd-05.png
  media_type: image
- caption: DoControl의 교차 SaaS 이상 징후 탐지 메커니즘은 상황별 알림을 트리거하여 인시던트 응답 시간을 단축하고 자동 수정
    조치를 제공합니다.
  image_url: images/dc-dd-06.png
  media_type: image
- caption: DoControl은 주요 위협 벡터인 타사 앱(OAuth 앱)을 포함한 모든 SaaS 앱의 인벤토리에 가시성을 제공하고 이를 수정할
    수 있도록 지원합니다.
  image_url: images/dc-dd-07.png
  media_type: image
supported_os:
- 리눅스
- windows
- macos
title: DoControl
---
## 개요

This integration allows [DoControl](https://www.docontrol.io/) customers to forward their DoControl-related logs and events to Datadog through automated security workflows.

## 설정

To set up this integration, you must have an active [DoControl account](https://www.docontrol.io/demo). You must also have proper [admin permissions](https://docs.datadoghq.com/account_management/rbac/permissions/) in Datadog.

### 설치

호스트에 설치할 필요가 없습니다.

### DoControl 워크플로에서 Datadog 작업 사용

DoControl에서 Datadog 작업의 입력 파라미터로 사용할 Datadog API 키와 애플리케이션 키를 생성해야 합니다.

#### Datadog에서 API 키 생성

1. Use Datadog's [Add an API key](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token) documentation to create an API key. Give the key a meaningful name such as `DoControl`.
1. `Key`를 복사하여 저장합니다.

#### Datadog에서 애플리케이션 키 생성

1. Use Datadog's [Add application keys](https://docs.datadoghq.com/account_management/api-app-keys/#add-application-keys) documentation to create an application key.
1. 애플리케이션 키를 복사하여 저장합니다.

![Get_DD_Application_Key](https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/Get_DD_Application_Key.png)

#### DoControl에서 Datadog 통합 만들기

1. In DoControl, navigate to [Dashboard->Settings->Workflows->Secrets](https://app.docontrol.io/settings/workflows?tab=Secrets), and add your Datadog API key as a new secret.

   ![DC_Secrets](https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Secrets.png)

1. Create a new Workflow from a pre-established [**playbook**](https://app.docontrol.io/workflowV2/playbooks?filter=by_use_case&use_case=all) or from [**scratch**](https://app.docontrol.io/workflowV2/workflow/new/workflow-editor).

   ![DC_WF_Create](https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_WF_Create.png)

1. 캔버스에 작업을 끌어다 놓아 단계를 구성하고 연결하여 비즈니스 로직을 디자인하고 편집하세요.

1. 작업 표시줄의 **Utilities** 아래에서 **Send logs** 또는 **Create incident**와 같은 Datadog 작업을 워크플로로 끌어다 놓을 수 있습니다.

   ![DC_Utils](https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_Utils.png)

1. Configure the actions to refer to the DD-API-KEY stored as a secret in Step 1 above, and the DD-APPLICATION-KEY obtained in [Create an application key in Datadog](#create-an-application-key-in-datadog).

   ![DC_DD_conf](https://raw.githubusercontent.com/DataDog/integrations-extras/master/docontrol/images/DC_DD_conf.png)

Learn more about DoControl in the [DoControl documentation](https://docs.docontrol.io/docontrol-user-guide/the-docontrol-console/workflows-beta/designing-and-editing-workflows/defining-workflow-and-action-settings#action-categories).

## 지원

Need help? Contact [Datadog support](https://docs.datadoghq.com/help/) or [DoControl support](mailto:support@docontrol.io).