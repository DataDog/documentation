---
aliases:
- /ko/integrations/faq/how-to-import-datadog-resources-into-terraform
- /ko/agent/guide/how-to-import-datadog-resources-into-terraform
kind: 도움말
title: Datadog 리소스를 Terraform으로 가져오기
---

## 개요

Terraform은 [`terraform import`][1] 명령을 통해 기존 리소스를 Terraform 상태로 가져오는 기본 방법을 지원합니다.
`terraform import <resource_type>.<resource_name> <existing_id>`를 통해서 가능합니다.

이 접근 방식은 `state only`이며 Terraform 설정 파일에 HCL 리소스가 완전히 정의되어 있어야 합니다. 설정을 완전히 가져오려면, Terraformer와 같은 도구를 사용할 수 있습니다.

## Terraformer

[terraformer 프로젝트][2]를 사용하면 상태 및 HCL 설정으로 리소스를 가져올 수 있습니다.

일단 설치되면 기본 `main.tf`로 terraform 디렉터리를 설정할 수 있습니다

이것은 Terraform 0.13+ 구문을 사용하지만 [공식 Datadog 공급자 문서][3]에서 더 많은 설정을 찾을 수 있습니다.

```hcl
# main.tf

terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
    }
  }
}

# Datadog 공급자 구성
provider "datadog" {}
```

그런 다음 이 디렉터리 내에서 `terraform init`을 실행하여 datadog terraform 공급자를 가져옵니다.

이제 `terraformer`을 사용하여 리소스를 가져올 수 있습니다. 예를 들어, 대시보드 `abc-def-ghi`를 가져오려면 다음을 실행하세요.

`terraformer import datadog --resources=dashboard --filter=dashboard=abc-def-ghi --api-key <YOUR_API_KEY> --app-key <YOUR_APP_KEY> --api-url <YOUR_DATADOG_SITE_URL>`

이는 Terraform 상태 파일과 가져온 리소스를 나타내는 HCL Terraform 설정 파일이 모두 포함된 폴더 `generated`를 생성합니다. 

```
generated
└── datadog
    └── dashboard
        ├── dashboard.tf
        ├── outputs.tf
        ├── provider.tf
        └── terraform.tfstate
```

* `dashboard.tf`: 새로 가져온 대시보드에 대한 HCL 설정 파일
* `outputs.tf`: 다른 설정에서 잠재적으로 사용할 출력이 포함된 HCL
* `provider.tf`: `main.tf` 파일의 내용과 유사한 공급자의 HCL 초기화
* `terraform.tfstate`: 가져온 대시보드를 나타내는 Terraform 상태

## Terraformer 실행의 다른 예

모든 예시 명령에는 `--api-key`, `--app-key`, and `--api-url` 플래그가 필요합니다.

* 모든 모니터 가져오기: `terraformer import datadog --resources=monitor`
* ID가 1234인 모니터 가져오기:`terraformer import datadog --resources=monitor --filter=monitor=1234`
* ID가 1234 및 12345인 모니터 가져오기:`terraformer import datadog --resources=monitor --filter=monitor=1234:12345`
* 모든 모니터 및 대시보드 가져오기:  `terraformer import datadog --resources=monitor,dashboard`
* ID가 1234인 모니터 및 ID가 abc-def-ghi인 대시보드 가져오기:`terraformer import datadog --resources=monitor,dashboard --filter=monitor=1234,dashboard=abc-def-ghi`

## Terraform v0.13+를 사용하여 리소스 생성

버전 `0.8.10`부터 Terraformer는 Terraform `v0.12.29`를 사용하여 `tf`/`json` 및 `tfstate` 파일을 생성합니다. 호환성을 보장하려면 Terraform `v0.13.x`을 사용하여 업그레이드 명령 `terraform 0.13upgrade .`을 실행하세요. 업그레이드하려면 [공식 Terraform 문서][4]를 참조하세요.

##### 생성된 파일을 Terraform v0.13+용으로 업그레이드하기:

1. Terraformer를 사용하여 리소스를 가져옵니다.

2. 생성된 리소스 디렉터리에 Terraform `v0.13.x`, `cd`를 사용하여 `terraform 0.13upgrade .`을 실행합니다.

3. 공급자 설치 프로그램을 다시 실행하려면 `terraform init`를 실행하세요.

4. Terraform 상태 파일에 업그레이드를 적용하려면 `terraform apply`를 실행하세요.

[1]: https://www.terraform.io/docs/import/index.html
[2]: https://github.com/GoogleCloudPlatform/terraformer
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[4]: https://www.terraform.io/upgrade-guides/0-13.html