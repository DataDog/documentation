---
aliases:
- /ko/integrations/faq/how-to-import-datadog-resources-into-terraform
- /ko/agent/guide/how-to-import-datadog-resources-into-terraform
title: Datadog 리소스를 Terraform으로 가져오기
---

## 개요

Terraform은 [`terraform import`][1] 명령을 통해 기존 리소스를 terraform 상태로 가져올 수 있는 즉시 사용 가능한 방법을 지원합니다.
이 작업은 `terraform import <resource_type>.<resource_name> <existing_id>`를 통해 수행할 수 있습니다.

이 접근 방식은 `state only`이며, terraform 설정 파일에 이미 HCL 리소스가 완전히 정의되어 있어야 합니다. 설정을 완전히 가져오려면 Terraformer과 같은 도구를 사용할 수 있습니다.

## Terraformer

[Terraformer 프로젝트][2]를 사용하면 상태와 HCL 설정 모두로 리소스를 가져오기할 수 있습니다.

설치가 완료되면 기본 `main.tf`를 통해 terraform 디렉터리를 설정할 수 있습니다.

다음은 terraform 0.13+ 구문을 사용한 것입니다. 더 많은 설정은 [공식 Datadog 공급자 문서][3]에서 확인할 수 있습니다.

```hcl
# main.tf

terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
    }
  }
}

# Configure the Datadog provider
provider "datadog" {}
```

그런 다음 이 디렉터리 내에서 `terraform init`를 실행하여 Datadog terraform 공급자를 가져옵니다.

이제 `terraformer`을 사용하여 리소스 가져오기를 시작할 수 있습니다. 예를 들어 대시보드 `abc-def-ghi`를 가져오려면 다음을 실행할 수 있습니다.

`terraformer import datadog --resources=dashboard --filter=dashboard=abc-def-ghi --api-key <YOUR_API_KEY> --app-key <YOUR_APP_KEY> --api-url <YOUR_DATADOG_SITE_URL>`

이렇게 하면 가져온 리소스를 나타내는 HCL terraform 설정 파일과 terraform 상태 파일이 모두 포함된 `generated` 폴더가 생성됩니다.

```
generated
└── datadog
    └── dashboard
        ├── dashboard.tf
        ├── outputs.tf
        ├── provider.tf
        └── terraform.tfstate
```

* `dashboard.tf`: 새로 가져온 HCL 설정 파일입니다.
* `outputs.tf`: 다른 설정에서 잠재적으로 사용할 수 있는 출력을 포함하는 HCL입니다.
* `provider.tf`: 공급자 HCL 초기화로 `main.tf` 파일에 포함된 항목과 유사합니다.
* `terraform.tfstate`: 가져오기된 대시보드를 나타내는 terraform 상태입니다.

## Terraformer 실행의 다른 예

모든 예제 명령에는 `--API-key`, `--app-key`, `--API-url` 플래그가 필요합니다.

* 모든 모니터 가져오기: `terraformer import Datadog --resources=모니터링하다`
* ID 1234로 모니터 가져오기: `terraformer import datadog --resources=monitor --filter=monitor=1234`
* ID가 1234 및 12345인 모니터 가져오기:`terraformer import datadog --resources=monitor --filter=monitor=1234:12345`
* 모든 모니터 및 대시보드 가져오기: `terraformer import datadog --resources=monitor,dashboard`
* ID 1234 포함 모니터 및 id abc-def-ghi 포함 대시보드 가져오기: `terraformer import datadog --resources=monitor,dashboard --filter=monitor=1234,dashboard=abc-def-ghi`

## Terraform v0.13+로 리소스 생성하기

버전 `0.8.10`부터 Terraform `v0.12.29`은 Terraform을 사용하여 `tf`/`json` 및 `tfstate` 파일을 생성합니다. 호환성을 보장하려면 Terraform `v0.13.x`을 사용하여 업그레이드 명령 `terraform 0.13upgrade .`을 실행하세요. 업그레이드에 대해서는 [공식 Terraform 설명서][4]를 참조하세요.

##### 생성된 파일을 Terraform v0.13+용으로 업그레이드:

1. terraformer를 사용하여 리소스를 가져옵니다.

2. Terraform `v0.13.x`를 사용하여, 생성된 리소스 디렉터리에 `cd`를 넣고 `terraform 0.13upgrade .`를 실행합니다.

3. `terraform init`를 실행하여 공급자 설치 관리자를 다시 실행합니다.

4. `terraform apply`를 실행하여 Terraform 상태 파일에 업그레이드를 적용합니다.

[1]: https://www.terraform.io/docs/import/index.html
[2]: https://github.com/GoogleCloudPlatform/terraformer
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[4]: https://www.terraform.io/upgrade-guides/0-13.html