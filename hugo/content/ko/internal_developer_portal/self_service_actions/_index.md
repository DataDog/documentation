---
aliases:
- /ko/software_catalog/actions
- /ko/software_catalog/self-service
- /ko/service_catalog/self-service
- /ko/software_catalog/self-service_actions
- /ko/software_catalog/self_service_actions
cascade:
  site_support_id: idp
description: 플랫폼 팀은 개발자가 인프라를 프로비저닝하고, 서비스를 스캐폴딩하고, 배포를 관리하며, 클릭 한 번으로 작업을 자동화할 수
  있는 템플릿을 정의하고 공유할 수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: 블로그
  text: App Builder로 인시던트를 빠르게 해결
- link: /actions/app_builder/
  tag: 설명서
  text: App Builder에 대해 알아보기
- link: /actions/workflows/
  tag: 설명서
  text: Workflows에 대해 알아보기
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions/
  tag: 블로그
  text: Datadog Catalog의 Self-Service Actions로 엔지니어링 팀의 역량 강화하기
title: Self-Service Actions
---
[Self-Service Actions][17]를 사용하면 플랫폼 팀이 템플릿을 정의하고 공유할 수 있어 소프트웨어 개발 수명 주기 전반에서 액션을 간소화할 수 있습니다. 개발자는 이와 같이 사전 정의된 액션을 사용하여 다음을 수행할 수 있습니다.

- 올바른 구성으로 마이크로서비스와 인프라 구축
- 개발 환경 초기화
- 여러 환경에서 배포 관리
- 실행 중인 서비스를 적극적으로 모니터링하고 최적화

각 타일은 앱을 나타내며, 이 앱은 사전 정의된 액션을 실행하기 위한 체계적인 인터페이스를 제공합니다. 앱은 [Action Catalog][7] 및 [Workflow Automation][1]을 기반으로 [App Builder][2]에서 생성되며, 개발자 워크플로우를 간소화하기 위해 Catalog에 표시됩니다.

## 개발자 워크플로우 자동화 {#automate-developer-workflows}

Catalog에서 새 앱을 만들 때는 예시를 활용하거나 처음부터 직접 만들 수 있습니다. 새 앱을 만드는 과정은 크게 다음 단계로 구성됩니다.

1. [App Builder][2]를 사용하여 개발자의 입력을 수집할 수 있는 동적이고 사용자 친화적인 양식을 만듭니다.
1. 앱에서 Datadog의 [Actions][7]를 호출하여 외부 서비스에 API 요청을 보내거나 사용자 지정 로직을 실행하거나 데이터를 변환합니다. 
1. [Workflow Automation][1]을 사용하여 여러 액션으로 구성된 엔드투엔드 프로세스를 오케스트레이션합니다.
1. 앱을 Datadog의 Catalog와 통합하여 동적인 셀프 서비스 워크플로우를 사용하도록 설정합니다.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service에 게시" style="width:100%;" >}}

### 예시로 시작 {#start-from-an-example}

빠르게 시작하려면 [App Builder Blueprints][9]에서 앱 구성 예시를, [Workflow Automation Blueprints][15]에서 워크플로우 구성 예시를 살펴보세요. 입력을 구성하고, 통합을 설정하고, 권한을 구성하는 등 청사진을 필요에 맞게 추가로 조정할 수 있습니다. 

예를 들어, App Builder Blueprints를 사용해 다음을 할 수 있습니다.

- **템플릿을 사용한 새 서비스 스캐폴딩**: 양식을 구성하여 개발자로부터 입력을 수집하고, 소스 코드 관리 시스템(예: GitHub 또는 GitLab)의 템플릿과 연동한 다음, 개발자를 위한 새 리포지토리, 풀 리퀘스트 또는 머지 리퀘스트를 생성합니다. 자세한 내용을 알아보려면 [소프트웨어 템플릿 설명서][16]를 참조하세요.
- **인프라 프로비저닝:** 개발자가 몇 가지 정보만 입력하고 한 번의 클릭으로 새 인프라(예: S3 버킷)를 프로비저닝할 수 있도록 합니다. 소스 제어 또는 Workflow Automation의 Approval 액션을 통해 SRE 팀이나 플랫폼 엔지니어링 팀의 승인을 받습니다.
- **문제 수정:** 클라우드 인프라 또는 Kubernetes의 데이터를 통합하여 개발자가 간단하고 안전한 수정 조치를 취할 수 있도록 합니다. 액션을 수동으로 트리거하거나 모니터에 대한 응답 또는 외부 API 호출을 통해 트리거합니다.
- **코드 변경 및 배포 관리:** 배포, 기능 플래그 변경 등을 관리합니다. Datadog에서 직접 변경 작업을 시작하고 진행 상태와 승인 여부를 추적합니다.
- **개발자 환경 프로비저닝:** 개발자를 위한 임시 환경을 온디맨드로 프로비저닝합니다. Workflow Automation을 사용하여 사용하지 않는 인프라를 자동으로 프로비저닝 해제하고 비용을 관리합니다.

### 처음부터 시작 {#start-from-scratch}

처음부터 앱을 구축하는 방법:

1. App Builder를 사용하여 양식 생성:

    1. 왼쪽 메뉴에서 **Actions** > **App Builder**로 이동한 뒤 **New App**을 선택합니다.
    1. 이름과 설명을 입력하고, 드래그 앤 드롭 편집기를 사용하여 필요한 파라미터를 수집하는 양식을 생성합니다.
       - `Form` 구성 요소를 사용하거나 사용자 지정 UI를 구축할 수 있습니다.
    1. **New Query**를 선택하고 **Trigger workflow** 액션을 사용하여 워크플로우를 호출하고 파라미터를 전달합니다. 
       - 기본 제공 통합을 찾으려면 [Action Catalog][7]를 살펴보거나, `HTTP` 액션을 사용하여 제공되지 않는 다른 통합과 상호 작용합니다.
    1. 양식을 제출하고 워크플로우를 트리거하는 **Button**을 생성합니다.
    1. 앱을 저장하고 게시합니다.

1. 프로세스를 자동화하도록 앱을 [Actions][7] 또는 [Workflow][6]와 연결합니다.

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="소프트웨어 템플릿 자동화를 구축하기 위한 워크플로우" style="width:100%;" >}}

1. 앱과 워크플로우를 테스트합니다.
   
   1. **View App**을 클릭하여 독립형 페이지에서 앱을 미리 봅니다.
   1. [Workflow Automation][3]에서 워크플로우 실행을 모니터링합니다.

### 앱 게시 {#publish-your-app}

소프트웨어 템플릿을 구성하고 테스트한 뒤 팀이 사용할 수 있도록 게시합니다. 게시 과정에서 다음 작업을 수행할 수 있습니다.

- 권한을 정의하여 액세스를 제어합니다.
- 앱을 쉽게 찾을 수 있도록 Dashboard 또는 Self-Service Actions에 추가합니다.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service에 게시" style="width:100%;" >}}
    

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/workflows/
[2]: /ko/actions/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /ko/actions/workflows/build/#create-a-custom-workflow
[7]: /ko/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /ko/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /ko/internal_developer_portal/self_service_actions/software_templates/
[17]: https://app.datadoghq.com/software/self-service