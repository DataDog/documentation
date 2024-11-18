---
app_id: firefly
app_uuid: 58481132-c79e-4659-8064-7cdaabbbc999
assets: {}
author:
  homepage: https://gofirefly.io
  name: Firefly
  sales_email: contact@gofirefly.io
  support_email: contact@gofirefly.io
categories:
- 자동화
- cloud
- 설정 및 배포
- 개발 툴
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/firefly/README.md
display_on_public_website: true
draft: false
git_integration_title: firefly
integration_id: firefly
integration_title: Firefly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: firefly
public_title: Firefly
short_description: 클라우드를 최신 코드로 구현하세요
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - "\b카테고리::클라우드"
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 클라우드를 최신 코드로 구현하세요
  media:
  - caption: 전체 클라우드 인벤토리
    image_url: images/FF-inventory.png
    media_type: image
  - caption: 자동 코드화
    image_url: images/FF-codification.png
    media_type: image
  - caption: 드리프트 감지 및 수정
    image_url: images/FF-fix-drifts.png
    media_type: image
  - caption: 정책 위반 감지 및 수정
    image_url: images/FF-insights.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Firefly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
Firefly는 클라우드 팀이 클라우드 풋프린트(AWS, GCP, Kubernetes, Datadog 포함)를 검색하고, 리소스를 코드형 인프라스트럭처로 자동 변환하며, 드리프트 및 정책 위반을 감지하여 클라우드가 원하는 상태에 맞게 조정되도록 지원하는 클라우드 자산 관리 솔루션입니다. Firefly는 팀이 선택한 IaC(Infrastructure-as-Code) 도구에서 Datadog 자산을 코드로 관리하여 Datadog 자산이 변경되지 않고, 버전으로 관리되며, 확장 가능하고 모니터링될 수 있도록 지원합니다.

### 전체 클라우드 인벤토리
AWS, K8s, GCP, Okta 등과 같은 다른 클라우드 자산과 함께 모든 Datadog 자산에 대해 검색 가능한 전체 인벤토리를 확보하세요.

### 자동 코드화
단일 또는 여러 Datadog 자산을 Terraform, Pulumi, Cloudformation 및 CDK 사양을 포함한 코드로 자동 전환합니다.

### 드리프트 감지 및 수정
코드형 인프라스트럭처와 실제 클라우드 상태 간의 불일치에 대한 실시간 알림을 받고 드리프트가 발생하면 리포지토리에 직접 수정 사항을 푸시합니다.

### 정책 위반 감지 및 수정
Firefly 통합 정책 엔진을 사용하여 위험한 구성 오류나 비용이 많이 드는 활용도 저하를 찾아냅니다. 또한 사용자 정의 정책과 사전 작성된 정책에 대해 위반 사항 발생 시 알림을 받습니다.

## 설정

### Firefly 구성 - Datadog 통합
1. 새로운 Datadog 애플리케이션 키와 API 키를 생성합니다.
2. Firefly UI에서 **Settings > Integrations > Datadog**으로 이동합니다.
3. 애플리케이션 키를 복사하여 전용줄에 붙여넣습니다.
4. API 키를 복사하여 전용줄에 붙여넣습니다.
5. **Done**을 클릭합니다.

## 지원
질문이 있으신가요? [contact@gofirefly.io][1]로 이메일을 보내거나 앱 내 채팅을 이용하세요.

[1]: mailto:contact@gofirefly.io