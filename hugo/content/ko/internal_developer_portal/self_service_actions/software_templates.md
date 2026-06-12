---
aliases:
- /ko/service_catalog/software_templates
- /ko/software_catalog/software_templates
- /ko/software_catalog/self-service/software_templates
- /ko/software_catalog/self_service_actions/software_templates
- /ko/software_catalog/self-service_actions/software_templates
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: 블로그
  text: App Builder로 인시던트를 빠르게 해결
- link: /service_management/app_builder/
  tag: 설명서
  text: App Builder에 대해 알아보기
- link: /service_management/workflows/
  tag: 설명서
  text: Workflows에 대해 알아보기
title: 소프트웨어 템플릿
---

Software Catalog 내에 Software Templates을 생성하여 개발자가 인프라를 빠르게 프로비저닝하고, 모범 사례에 부합하는 마이크로서비스를 생성할 수 있도록 합니다.

## Software Template 생성하기

Software Template은 Git 리포지토리에 저장되며 재사용 가능한 프레임워크 역할을 합니다. [앱을 빌드하여][2] 입력을 수집하고 이를 템플릿 리포지토리에 전달하여 사용자 지정 구성을 만듭니다.

Software Template을 생성하면 다음을 할 수 있습니다.
- 사전 구축된 블루프린트를 활용한 예제부터 시작합니다.
- 템플릿과 워크플로를 직접 정의하여 처음부터 시작합니다.

### 예시로 시작하기

[App Builder Blueprints][9]를 사용하여 앱 또는 워크플로를 빠르게 구성합니다. 이러한 블루프린트는 입력을 수정하고 소스 제어 또는 클라우드 공급자와 통합하고 권한을 조정하여 사용자 맞춤형 작동 예제를 제공합니다.

예시 블루프린트:

- **[Scaffold New Service 블루프린트][11]**: 개발자 입력을 수집하고, GitHub와 연동하며, 새로운 리포지토리 또는 풀 요청을 생성하는 양식을 만듭니다.
- **[Create S3 Bucket 블루프린트][10]**: GitHub의 양식을 사용하여 S3 버킷용 Terraform 코드를 생성합니다.
- **[Provision EKS Cluster 블루프린트][13]**: GitHub의 Kubernetes 클러스터용 Terraform 코드를 생성합니다.
- **[Provision RDS Instance 블루프린트][14]**: API 호출을 통해 AWS에서 RDS 인스턴스를 프로비저닝합니다.

블루프린트 사용 방법:

1. [**App Builder Blueprints**][9]에서 블루프린트를 선택합니다.
1. 필수 입력값을 수집할 수 있도록 양식 필드를 사용자 지정합니다.
1. **Save as New App**을 클릭하여 템플릿 워크플로에 연결된 앱을 만듭니다.

### 처음부터 시작하기

Software Template을 처음부터 구축하는 방법:

1. App Builder로 양식 생성:

    1. 왼쪽 메뉴의 **Actions** > **App Builder**으로 이동한 뒤 **New App**을 선택합니다.
    1. 이름과 설명을 입력하고 끌어서 놓기가 가능한 편집기에서 필요한 파라미터를 수집할 양식을 생성합니다.
       - `Form` 구성 요소를 사용하거나 커스텀 UI를 구축할 수 있습니다.
    1. **New Query**를 선택하고 **Trigger workflow** 동작을 사용해 워크플로우를 호출하고 파라미터를 전송합니다.
       - 내장 통합 기능을 사용하려면 [Action Catalog][7]를 탐색하거나, 미제공 통합과 상호작용하려면 `HTTP` 액션을 사용합니다.
    1. 양식을 제출할 **Button**을 생성하고 워크플로우를 트리거합니다.
    1. 저장하고 앱을 게시합니다.

2. 템플릿에 대한 [워크플로를 만듭니다][6].

   1. [Workflow Automation][3]으로 이동하여 **New Workflow**를 클릭합니다.
   1. 이름을 입력하고, 관련 태그를 추가하고, 사용자로부터 수집하려는 입력 파라미터를 정의합니다.

3. 템플릿 워크플로를 구성합니다.

   1. GitHub, Gitlab 또는 HTTP [작업][7]을 사용하여 템플릿 파일을 검색합니다.
   1. Apply Template [작업][7]을 사용하여 템플릿 리포지토리를 조작하고 입력 파라미터를 전달합니다.
   1. GitHub, Gitlab 또는 HTTP [작업][7]을 사용하여 프로젝트 파일을 리포지토리에 업로드합니다.
   1. 워크플로를 저장합니다.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Software Template 자동화 구축 워크플로" style="width:100%;" >}}

4. 앱과 워크플로우 테스트:

   1. **View App**을 클릭하여 앱을 독립형 페이지로 미리 확인합니다.
   1. [Workflow Automation][3]에서 템플릿 프로세스를 모니터링합니다.

## 앱 게시

Software Template을 구성하고 테스트한 뒤 팀이 사용할 수 있도록 게시합니다. 게시 플로우를 통해 다음을 할 수 있습니다.

- 권한을 정의해 액세스를 제어합니다.
- 대시보드나 Self-Service Actions에 앱을 추가해 쉽게 찾을 수 있도록 합니다.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service에 게시" style="width:100%;" >}}

## 사용 가능한 템플릿 액션

다음 작업들은 Datadog App Builder 및 Workflow Automation의 Software Catalog에서 사용할 수 있습니다. 전체 목록은 [Action Catalog][7]를 참고하세요.

- **Templating**
  - "Apply template": 입력 파라미터를 파일 세트로 전달합니다.
- **GitHub**
  - "Create or update file": GitHub 리포지토리에서 파일을 생성하거나 수정합니다.
  - "Edit configuration file": YAML 또는 JSON 구성 파일을 수정합니다.
  - "Trigger GitHub Actions workflow": GitHub Action을 시작합니다 .
  - "Search repositories": 리포지토리 목록을 가져옵니다.
  - "Create pull request": 풀 요청을 엽니다.
- **GitLab**
  - "Create file": GitLab 리포지토리에서 파일을 생성합니다.
  - "Create project": GitLab 프로젝트를 생성합니다.
- **Azure DevOps**
  - "Run pipeline": Azure DevOps에서 파이프라인 실행을 트리거합니다.
- **Retrieve Service Information**
  - "List entity definitions": Datadog Software Catalog(버전 3.0 이하)에서 모든 서비스 정의를 가져옵니다.
  - "Get service dependencies": 서비스의 업스트림 및 다운스트림 종속성을 가져옵니다.
- **Approvals**
  - "Make a decision": Slack이나 Microsoft Teams를 사용하여 승인을 요청합니다.
    - 기존 변경 관리 프로세스가 있는 경우 ServiceNow, Jira와의 통합 또는 HTTP 호출을 사용하세요.
- **HTTP**
  - "Make request": 외부 API와 상호 작용하기 위해 HTTP 요청을 보냅니다.
- **Data Transformation**
  - "Expression", "Function": JavaScript를 사용하여 데이터 변환을 수행합니다.
    - Bits AI를 사용하여 사용자 지정 JavaScript 코드를 작성하세요.
- **Private Actions**
  - 개인 리소스와 상호 작용하려면 [Private Action Runner][12]를 사용하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/workflows/
[2]: /ko/service_management/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /ko/service_management/workflows/build/#create-a-custom-workflow
[7]: /ko/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /ko/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action