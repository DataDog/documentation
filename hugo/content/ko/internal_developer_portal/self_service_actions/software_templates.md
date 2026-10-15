---
aliases:
- /ko/service_catalog/software_templates
- /ko/software_catalog/software_templates
- /ko/software_catalog/self-service/software_templates
- /ko/software_catalog/self_service_actions/software_templates
- /ko/software_catalog/self-service_actions/software_templates
description: Catalog에서 재사용 가능한 소프트웨어 템플릿을 생성하여 개발자가 조직의 모범 사례에 부합하는 인프라를 프로비저닝하고 마이크로서비스의
  기본 구조를 생성할 수 있도록 지원하세요.
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
title: 소프트웨어 템플릿
---
Catalog에서 소프트웨어 템플릿을 생성하여 개발자가 조직의 모범 사례에 따라 인프라를 빠르게 프로비저닝하고 마이크로서비스를 생성하도록 지원하세요. 

## 소프트웨어 템플릿 생성{#create-a-software-template}

소프트웨어 템플릿은 Git 리포지토리에 저장되며 재사용 가능한 프레임워크 역할을 합니다. [앱을 구축하여][2] 입력값을 수집하고 이를 템플릿 리포지토리에 전달해 사용자 지정 구성을 생성합니다.

소프트웨어 템플릿을 생성하려면 다음 방법 중 하나를 사용할 수 있습니다.
- 미리 구축된 청사진의 예시를 활용하여 시작합니다.
- 자체 템플릿과 워크플로우를 정의하여 처음부터 시작합니다.

### 예시로 시작 {#start-from-an-example}

[App Builder Blueprints][9]를 사용하여 앱이나 워크플로우를 빠르게 구성하세요. 이러한 청사진은 입력값 수정, 소스 제어 시스템 또는 클라우드 제공업체와의 통합, 권한 조정 등을 통해 사용자 지정할 수 있는 실제 작동 예시를 제공합니다.

청사진 예시:

- **[Scaffold New Service 청사진][11]**: 개발자 입력값을 수집하고 GitHub와 통합하며 새 리포지토리나 풀 리퀘스트를 생성하는 양식을 만듭니다.
- **[Create S3 Bucket 청사진][10]**: GitHub의 양식을 사용하여 S3 버킷용 Terraform 코드를 생성합니다.
- **[Provision EKS Cluster 청사진][13]**: GitHub에서 Kubernetes 클러스터용 Terraform 코드를 생성합니다.
- **[Provision RDS Instance 청사진][14]**: API 호출을 통해 AWS에서 RDS 인스턴스를 프로비저닝합니다.

청사진을 사용하려면 다음 단계를 따르세요.

1. [**App Builder Blueprints**][9]에서 청사진을 선택합니다.
1. 필요한 입력값을 수집할 수 있도록 양식 필드를 사용자 지정합니다.
1. **Save as New App**을 클릭하여 템플릿 생성 워크플로우에 연결된 앱을 생성합니다.

### 처음부터 시작 {#start-from-scratch}

소프트웨어 템플릿을 처음부터 구축하려면 다음 단계를 따르세요.

1. App Builder를 사용하여 양식 생성:

    1. 왼쪽 메뉴에서 **Actions** > **App Builder**로 이동한 뒤 **New App**을 선택합니다.
    1. 이름과 설명을 입력하고, 드래그 앤 드롭 편집기를 사용하여 필요한 파라미터를 수집하는 양식을 생성합니다.
       - `Form` 구성 요소를 사용하거나 사용자 지정 UI를 구축할 수 있습니다.
    1. **New Query**를 선택하고 **Trigger workflow** 액션을 사용하여 워크플로우를 호출하고 파라미터를 전달합니다. 
       - 기본 제공 통합을 찾으려면 [Action Catalog][7]를 살펴보거나, `HTTP` 액션을 사용하여 제공되지 않는 다른 통합과 상호 작용합니다.
    1. 양식을 제출하고 워크플로우를 트리거하는 **Button**을 생성합니다.
    1. 앱을 저장하고 게시합니다.

2. 템플릿용 [워크플로우를 생성합니다][6].
   
   1. [Workflow Automation][3]으로 이동하여 **New Workflow**를 클릭합니다. 
   1. 이름을 입력하고 관련 태그를 추가한 다음 사용자로부터 수집할 입력 파라미터를 정의합니다.
  
3. 템플릿 생성 워크플로우를 구성합니다.

   1. GitHub, GitLab 또는 HTTP [액션][7]을 사용하여 템플릿 파일을 검색합니다.
   1. Apply Template [액션][7]을 사용하여 템플릿 리포지토리를 조작하고 입력 파라미터를 전달합니다.
   1. GitHub, GitLab 또는 HTTP [액션][7]을 사용하여 프로젝트 파일을 리포지토리에 업로드합니다.
   1. 워크플로우를 저장합니다.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="소프트웨어 템플릿 자동화를 구축하기 위한 워크플로우" style="width:100%;" >}}

4. 앱과 워크플로우를 테스트합니다.

   1. **View App**을 클릭하여 앱을 독립형 페이지로 미리 봅니다.
   1. [Workflow Automation][3]에서 템플릿 생성 프로세스를 모니터링합니다.

## 앱 게시 {#publish-your-app}

소프트웨어 템플릿을 구성하고 테스트한 뒤 팀이 사용할 수 있도록 게시합니다. 게시 과정에서 다음 작업을 수행할 수 있습니다.

- 권한을 정의하여 액세스를 제어합니다.
- 앱을 쉽게 찾을 수 있도록 Dashboard 또는 Self-Service Actions에 추가합니다.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service에 게시" style="width:100%;" >}}

## 사용 가능한 템플릿 생성 액션 {#available-templating-actions}

Datadog App Builder 및 Workflow Automation에서 Catalog에 사용할 수 있는 액션은 다음과 같습니다. 전체 목록은 [Action Catalog][7]를 참조하세요.

- **템플릿 생성**
  - '템플릿 적용': 입력 파라미터를 파일 집합에 전달합니다.
- **GitHub**
  - '파일 생성 또는 업데이트': GitHub 리포지토리에서 파일을 생성하거나 수정합니다.
  - '구성 파일 편집': YAML 또는 JSON 구성 파일을 수정합니다.
  - 'GitHub Actions 워크플로우 트리거': GitHub Action을 시작합니다.
  - '리포지토리 검색': 리포지토리 목록을 검색합니다.
  - '풀 리퀘스트 생성': 풀 리퀘스트를 엽니다.
- **GitLab**
  - '파일 생성': GitLab 리포지토리에 파일을 생성합니다.
  - '프로젝트 생성': GitLab 프로젝트를 생성합니다.
- **Azure DevOps**
  - '파이프라인 실행': Azure DevOps에서 파이프라인 실행을 트리거합니다.
- **서비스 정보 검색**
  - '엔터티 정의 목록': Datadog Catalog(v3.0 이하)에서 모든 서비스 정의를 검색합니다.
  - '서비스 종속성 가져오기': 서비스의 업스트림 및 다운스트림 종속성을 검색합니다.
- **승인**
  - '의사 결정': Slack 또는 Microsoft Teams를 사용하여 승인을 요청합니다.
    - 기존 변경 관리 프로세스가 있는 경우 ServiceNow, Jira 통합 또는 HTTP 호출을 사용합니다.
- **HTTP**
  - '요청 실행': HTTP 요청을 통해 외부 API와 상호 작용합니다.
- **데이터 변환**
  - '식', '함수': JavaScript를 사용하여 데이터를 변환합니다.
    - Bits AI의 도움을 받아 사용자 지정 JavaScript 코드를 작성합니다.
- **Private Actions**
  - 비공개 리소스와 상호 작용하려면 [Private Action Runner][12]를 사용합니다.
    

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