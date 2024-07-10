---
aliases:
- /ko/developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1]은 환경에 있는 모든 AWS 리소스를 한 번에 설명, 설정 및 프로비저닝할 수 있는 템플릿을 제공합니다. Datadog-AWS CloudFormation 리소스를 통해 지원되는 Datadog 리소스와 상호 작용하고, 모든 Datadog 데이터센터에 리소스를 전송하고, Datadog 리소스가 있는 모든 지역에 비공개로 확장 프로그램을 등록할 수 있습니다.

이러한 리소스에 액세스하려면 AWS 관리 콘솔(UI) 또는 AWS 명령줄 인터페이스(CLI)를 사용합니다.

## AWS 관리 콘솔

시작 방법:

1. 계정 정보를 사용해 [AWS 관리 콘솔][16]에 로그인하여 CloudFormation로 이동합니다.

2. 왼쪽 창의 "공용 확장 프로그램"을 선택하고 "타사"별로 게시자를 필터링합니다.

3. 검색창을 사용해 "Datadog" 접두어로 필터링합니다.

  참고: 모든 공식 Datadog 리소스는 `Datadog::`로 시작하며 `Published by Datadog`라고 지정되어 있습니다.

4. 원하는 리소스 이름을 선택하여 스키마에 대한 더 자세한 정보를 보고 **활성화**를 클릭합니다.

5. **확장 프로그램 상세 정보** 페이지에서 다음을 지정합니다.
  - 확장 프로그램 이름
  - 실행 역할 ARN
  - 부 버전 릴리스 자동 업데이트
  - 설정

6. 리소스 설정의 경우 **Datadog API 및 응용 프로그램 키에 대해 분명한 텍스트 대신 [AWS Secrets Manager][17] 또는 유사 서비스를 사용하는 것이 강력히 권장됩니다.**

  AWS Secrets Manager를 사용하면 동적으로 설정에서 API 및 응용 프로그램 키를 참조할 수 있습니다. 자세한 정보는 [AWS 설명서][18]를 참조하세요.

  예를 들면 다음과 같습니다.

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```
   미국 외 계정을 사용하는 경우 `ApiURL`를 지정합니다(기본값은 `https://api.datadoghq.com`). 예를 들어 EU 계정에 `https://api.datadoghq.eu`를 사용합니다.

7. 리소스를 설정한 후 활성화된 Datadog 리소스를 포함하는 [AWS 스택을 생성][3]합니다.

사용 가능한 명령 및 워크플로에 대한 자세한 정보는 공식 [AWS 설명서][4]를 참조하세요.

## AWS 명령줄 인터페이스

시작하기:

1. `<RESOURCE_DIR>/resource-role.yaml` 파일을 기반으로 CloudFormation 리소스에 대한 실행 역할을 생성합니다.

1. 터미널에서 [aws-cli 도구][2]를 사용해 Datadog 리소스를 등록합니다.

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>" \
        --execution-role-arn "<ROLE_ARN_FROM_STEP_1>"
    ```

1. 터미널에서 다음을 실행해 새롭게 등록된 리소스 버전을 확인합니다.

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

1. 터미널에서 다음을 실행하여 새롭게 등록된 이 버전을 `default`로 설정합니다.

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

   다음 필수 자리 표시자 포함:
    * `<REGION>`: AWS 지역입니다.
    * `<DATADOG_RESOURCE_NAME>`: 등록할 리소스 이름입니다. [아래 표](#resources-available)를 참조해 Datadog에서 지원되는 리소스를 참조합니다.
    * `<LINK_TO_S3>`: 리소스에 대한 S3 링크입니다.
      * S3 링크: `s3://datadog-cloudformation-resources/<RESOURCE_FOLDER>/<RESOURCE_FOLDER>-<RESOURCE_VERSION>.zip`
      * [사용 가능한 리소스 섹션](#resources-available)를 참조합니다. 섹션은 지원되는 최신 S3 링크 사례로 연결됩니다.
    * `VERSION_ID`: `2`단계의 명령으로 반환된 리소스의 기본 버전입니다.

1. 터미널에서 다음을 실행하여 새롭게 등록된 리소스 설정을 구성합니다.

    ```shell
    aws cloudformation set-type-configuration \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --type RESOURCE \
        --configuration '{"DatadogCredentials": {"ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}", "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"}}'
    ```

1. AWS 계정에서 등록된 Datadog 리소스를 포함하는 [AWS 스택을 생성][3]합니다.

사용 가능한 명령 및 워크플로에 대한 자세한 정보는 공식 [AWS 설명서][4]를 참조하세요.

## 사용 가능한 리소스

다음 Datadog 리소스는 AWS 계정에 등록할 수 있습니다. 적합한 설명서를 참고해 설정하는 방법을 확인하세요.

| 리소스                | 이름                                  | 설명                                             | 폴더                              | S3 패키지 링크              |
|---------------------------|---------------------------------------|---------------------------------------------------------|-------------------------------------|-------------------------------|
| 대시보드                 | `Datadog::Dashboards::Dashboard`      | [Datadog 대시 보드 생성, 업데이트 및 삭제][5]      | `datadog-dashboards-dashboard`      | [스키마 핸들러 버전][6]  |
| Datadog-AWS 통합   | `Datadog::Integrations::AWS`          | [Datadog-Amazon Web Service 통합 관리][7] | `datadog-integrations-aws`          | [스키마 핸들러 버전][8]  |
| 모니터                   | `Datadog::Monitors::Monitor`          | [Datadog 모니터 생성, 업데이트 및 삭제][9]        | `datadog-monitors-monitor`          | [스키마 핸들러 버전][10] |
| 다운타임(**더 이상 사용되지 않음**) | `Datadog::Monitors::Downtime`         | [모니터에 대한 다운타임 활성화 또는 비활성화][11]     | `datadog-monitors-downtime`         | [스키마 핸들러 버전][12] |
| 다운타임 스케줄         | `Datadog::Monitors::DowntimeSchedule` | [Datadog 다운타임 예약][21]                        | `datadog-monitors-downtimeschedule` | [스키마 핸들러 버전][22] |
| 사용자                      | `Datadog::IAM::User`                  | [Datadog 사용자 생성 및 관리][13]                   | `datadog-iam-user`                  | [스키마 핸들러 버전][14] |
| SLO                       | `Datadog::SLOs::SLO`                  | [Datadog SLO 생성 및 관리][19]                     | `datadog-slos-slo`                  | [스키마 핸들러 버전][20] |

## 지원되는 지역

Datadog-Amazon CloudFormation 리소스는 다음 지역에서 CloudFormation 공용 레지스트리에서 사용할 수 있습니다.

| 코드            | 이름                      |
|-----------------|---------------------------|
| us-east-1       | 미 동부(노스버지니아)     |
| us-east-2       | 미 동부(오하이오)            |
| us-west-1       | 미 서부(노스캘리포니아)   |
| us-west-2       | 미 서부(오레곤)          |
| ap-south-1      | 아시아 태평양(뭄바이)     |
| ap-northeast-1  | 아시아 태평양(도쿄)      |
| ap-northeast-2  | 아시아 태평양(서울)      |
| ap-southeast-1  | 아시아 태평양(싱가포르)  |
| ap-southeast-2  | 아시아 태평양(시드니)     |
| ca-central-1    | 캐나다(중부)          |
| eu-central-1    | 유럽(프랑크푸르트)        |
| eu-west-1       | 유럽(아일랜드)          |
| eu-west-2       | 유럽(런던)           |
| eu-west-3       | 유럽(파리)            |
| eu-north-1      | 유럽(스톡홀름)        |
| sa-east-1       | 남미(상파울루) |

**참고**: 다른 모든 지역에서 비공개로 리소스를 등록하려면, 제공된 패키지를 사용합니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원][15]에 문의하세요.

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[5]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-dashboards-dashboard-handler
[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-dashboards-dashboard-handler/CHANGELOG.md
[7]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[8]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[9]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[10]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[11]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[12]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[13]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[14]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[15]: https://docs.datadoghq.com/ko/help/
[16]: https://aws.amazon.com/console/
[17]: https://aws.amazon.com/secrets-manager/
[18]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-secretsmanager
[19]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-slos-slo-handler
[20]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-slos-slo-handler/CHANGELOG.md
[21]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtimeschedule-handler
[22]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtimeschedule-handler/CHANGELOG.md