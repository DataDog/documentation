---
aliases:
- /ko/service_catalog/software_templates
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
title: 셀프 서비스
---

## 개발자 워크플로우 자동화
[App Builder][2]를 사용하여 개발자의 입력을 수집하는 동적이고 사용자 친화적인 양식을 만드세요. 앱에서 Datadog의 [Actions][7]를 호출하여 외부 서비스의 API 호출을 시작하거나, 사용자 지정 로직을 실행하거나, 데이터를 변환할 수 있습니다. [Workflow Automation][1]을 사용하여 여러 작업의 엔드 투 엔드 프로세스를 조율하세요. Datadog의 Software Catalog와 통합하여 동적인 셀프서비스 워크플로를 구현할 수 있습니다.

{{< img src="tracing/service_catalog/self-service-ui.png" alt="Self-Service에 게시" style="width:100%;" >}}

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Software Templates은 Preview 단계입니다. 양식을 작성하여 액세스를 요청하세요.
{{< /callout >}} 

### 소프트웨어 템플릿 워크플로 생성
Datadog에서 소프트웨어 템플릿을 사용하려면 원하는 템플릿으로 Git 리포지토리를 만듭니다. 처음부터 시작하거나, 빠른 시작 블루프린트를 참고하여 예제를 통해 학습할 수 있습니다.

#### 예시로 시작하기
[App Builder Blueprints][9]로 이동하여 다음 블루프린트 중 하나를 선택하세요. 이는 앱 또는 워크플로를 구성하는 방법에 대한 예시로, 시작하는 데 도움이 됩니다. 입력 구성, 소스 코드 관리 또는 클라우드 제공업체와의 통합 설정, 권한 구성 등 필요에 맞게 예시를 업데이트할 수 있습니다.

##### Scaffold New Service

[Scaffold New Service 블루프린트][11]는 템플릿에서 새 Lambda 함수를 스캐폴딩하는 예를 보여줍니다. 이 양식은 개발자의 입력을 수집하여 해당 Git 리포지토리에 전달합니다.

1. 앱에서 개발자로부터 수집하려는 파라미터를 포함하도록 양식을 사용자 정의합니다.
2. **Save as New App**을 클릭하여 앱을 저장합니다. 이렇게 하면 해당 템플릿 워크플로도 생성됩니다.

##### Create S3 bucket with Terraform

[Create S3 Bucket 블루프린트][10]는 GitHub의 양식을 사용하여 S3 버킷에 대한 Terraform 코드 생성의 예를 보여줍니다.

##### Provision Kubernetes cluster

[Provision EKS Cluster 블루프린트][12]는 GitHub에서 Kubernetes 클러스터의 Terraform 코드 생성의 예를 보여줍니다.

##### Provision RDS instance

[Provision RDS Instance 블루프린트][13]는 AWS와 직접 통합하여 RDS 인스턴스를 프로비저닝하는 방법의 예를 보여줍니다.


#### 처음부터 시작하기
Datadog에서 템플릿을 구성하려면 [Workflow Automation][3] 페이지로 이동합니다.

1. App Builder를 사용하여 개발자용 프런트엔드에 사용할 양식을 만듭니다.
   - **Actions** > **App Builder**로 이동한 후 **New App**을 선택합니다.
   - 이름과 설명을 입력하고, 드래그 앤 드롭 편집기를 사용하여 템플릿에 필요한 파라미터를 수집하는 양식을 만듭니다.
   - `Form` 구성 요소를 활용하거나 사용자 정의 UI를 구축할 수 있습니다.
   - UI 작업이 완료되면 **New Query**를 선택하고 **Trigger workflow** 작업을 사용하여 템플릿 워크플로를 호출하고 관련 파라미터를 전달하세요. [Actions Catalog][7]에서 사용 가능한 통합을 살펴보거나, `HTTP` 작업을 활용하여 기본으로 제공되지 않는 통합과 상호 작용할 수도 있습니다.
   - 양식을 제출하고, 워크플로를 트리거하고, 템플릿 파라미터를 전달하는 **Button**을 만듭니다.
   - 저장하고 앱을 게시합니다.

2. 템플릿의 [워크플로를 만듭니다][6].
   - [Workflow Automation][3] 페이지에서 **New Workflow**를 클릭합니다.
   - 이름을 입력하고, 관련 태그를 추가하고, 사용자로부터 수집하려는 입력 파라미터를 정의합니다.

3. 템플릿 워크플로를 구성합니다.
   - GitHub, Gitlab 또는 HTTP [작업][7]을 사용하여 템플릿 파일을 검색합니다.
   - Apply Template [작업][7]을 사용하여 템플릿 리포지토리를 조작하고 입력 파라미터를 전달합니다.
   - GitHub, Gitlab 또는 HTTP [작업][7]을 사용하여 프로젝트 파일을 리포지토리에 업로드합니다.
   - 워크플로를 저장합니다.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="소프트웨어 템플릿 자동화 구축하는 워크플로우" style="width:100%;" >}}

4. App과 Workflow를 테스트합니다.
   - **View App**을 클릭하면 미리보기에서 독립형 페이지로 앱을 볼 수 있습니다.
   - [Workflow Automation][3]에서 워크플로 템플릿 프로세스의 성공 여부를 추적합니다.

### 앱 게시
앱 설정 및 테스트를 마치면 팀원들이 사용할 수 있도록 앱을 게시할 수 있습니다. 게시 과정에서는 권한을 정의하라는 메시지가 표시되고, 이를 통해 Dashboard 또는 Self-Service 포털에 앱을 추가할 수 있습니다.

  {{< img src="tracing/service_catalog/self-service-publish.png" alt="Self-Service에 게시" style="width:100%;" >}}

### 사용 가능한 Software Catalog 작업

Datadog App Builder 및 Workflow Automation에서 Software Catalog에 사용할 수 있는 작업 목록은 다음과 같습니다. 전체 목록은 [Action Catalog][7]에서 확인하세요.

- **Templating**
  - "Apply template": 파라미터를 파일 세트에 전달
- **Github**
  - "Create or update file": 새 파일 생성
  - "Edit configuration file": YAML 또는 JSON 파일 조작
  - "Trigger GitHub Actions workflow run": GitHub Action 시작
  - "Search repositories": 리포지토리 목록 반환
  - "Create pull request": 풀 리퀘스트 열기
- **Retrieve Service Information**
  - "Get service definition": 단일 서비스에 해당
  - "List service definitions": Datadog Software Catalog에서 모든 정의 가져오기
  - "Get service dependencies": 해당 서비스의 직속 업스트림 및 다운스트림 서비스 가져오기
- **Incident Triage**
  - "Get service PagerDuty on call"
  - 다른 작업과 통합하면 중요한 이벤트(예: 런북 실행)를 기반으로 워크플로를 트리거할 수 있습니다.
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