---
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: 블로그
  text: Terraform으로 Datadog 관리
kind: 설명서
title: Terraform 시작하기
---

## 개요

Terraform을 사용해 Datadog 리소스를 생성하고 프로그래밍 방식으로 관리할 수 있습니다. 이 가이드에서는 Terraform 리소스 링크와 특정 사용 사례를 설명하는 튜토리얼 등 Terraform 시작 개요를 제공합니다.

## 설정

1. 아직 설치하지 않았다면 [Terraform][1]을 설치합니다.
2. Terraform 설정 파일이 아직 없는 경우, 기본 Terraform 설명서의 [설정 섹션][3]을 확인하여 디렉토리 및 설정 파일을 만듭니다.
3. Datadog 공급자 설정이 들어 있는 디렉토리에서 `terraform init`를 실행합니다.

## 리소스

### 클라우드 통합

[AWS 통합 리소스][9], [Azure 통합 리소스][10], [Google Cloud Project 통합 리소스][11]를 통해 각각 [AWS][12], [Azure][13] 및 [Google Cloud][14] 서비스에서 데이터가 Datadog 계정으로 빠르게 유입되도록 연결할 수 있습니다. AWS 통합을 사용하는 경우 [Terraform과 AWS 통합][27] 가이드와 관련 IAM 역할 및 권한과 통합 설정 예를 참고하세요.

### 모니터링

Datadog 계정에 유입되는 데이터를 사용하여 [Datadog 모니터 경고][8]를 구현하여 예기치 않은 변경 사항이나 비정상적인 동작에 대해 알림을 받습니다. [리소스 모니터][4]을 사용하여 모니터를 생성하고 관리하거나 [JSON 리소스 모니터][5]을 사용하여 모니터에 JSON 정의를 사용합니다. [라이브 프로세스 모니터][7]를 생성하는 예시 `monitor.tf`파일은 메인 Terraform 설명서의 [모니터 생성][6] 섹션을 참고하세요.

### 계정 관리

팀과 조직이 성장함에 따라 Terraform을 사용해 필요에 따라 Datadog을 확장할 수 있습니다. [사용자][19] 리소스로 사용자를 생성하고 [역할 리소스][20]로 사용자 정의된 [권한 세트][21]를 할당합니다. 또한 [API 키 리소스][23] 및 [애플리케이션 키 리소스][24]를 통해 계정의 [API 및 애플리케이션 키][22]를 생성하고 관리할 수 있으며 [하위 조직 리소스][26]로 [하위 조직][25]를 추가할 수도 있습니다.

### 대시보드

데이터를 사용자에게 추가로 분석하거나 표시하려면 [Datadog 대시보드][18]을 생성합니다. Terraform은 이를 위해 [대시보드 리소스][15]를 제공하거나 [대스보드 JSON 리소스][16]를 사용하여 JSON 정의로 대시보드를 생성할 수 있습니다. 제한된 역할을 구성하여 [대시보드][17]의 편집을 제한할 수도 있습니다.

### 웹후크

[웹후크][29]를 사용하여 Datadog 계정의 데이터에 따라 커스텀 API 요청 및 페이로드를 자신의 서비스로 전송할 수 있습니다. 이를 통해 서비스에 알림을 주거나 인프라스트럭처에서 자동화된 작업을 시작할 수 있습니다. Terraform [웹후크 리소스][30]를 사용하여 Terraform으로 웹후크를 생성하고 관리할 수 있습니다.

## Terraform 고급 사용

Datadog 에이전트로 쿠버네티스 애플리케이션 배포 예시와 [신서틱 테스트][31]를 생성하는 방법을 포함, Terraform으로 Datadog를 구현하고 관리하는 방법과 관련한 자세한 내용은 [Terraform Datadog 공급자][28] 튜토리얼을 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /ko/integrations/terraform/#configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor_json
[6]: /ko/integrations/terraform/#create-a-monitor
[7]: /ko/monitors/types/process/
[8]: /ko/monitors/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp
[12]: /ko/integrations/amazon_web_services/
[13]: /ko/integrations/azure/
[14]: /ko/integrations/google_cloud_platform/
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard_json
[17]: /ko/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[18]: /ko/dashboards/
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[21]: /ko/account_management/rbac/permissions/
[22]: /ko/account_management/api-app-keys/
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[25]: /ko/account_management/multi_organization/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[27]: /ko/integrations/guide/aws-terraform-setup
[28]: https://developer.hashicorp.com/terraform/tutorials/use-case/datadog-provider
[29]: /ko/integrations/webhooks/
[30]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
[31]: /ko/synthetics/