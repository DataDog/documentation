---
aliases:
- /ko/developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1]은 설명 및 설정할 수 있는 템플릿을 제공하여 고객님의 환경에서 AWS 리소스를 한 번에 프로비저닝할 수 있도록 도와드립니다. Datadog-AWS CloudFormation 리소스를 사용하면 지원되는 Datadog 리소스와 상호 작용하고, Datadog 데이터센터로 리소스를 전송하고, Datadog 리소스가 존재하는 모든 지역의 확장을 비공개로 등록할 수 있습니다.

해당 리소스에 액세스하려면 AWS 관리 콘솔(UI) 또는 AWS 명령줄 인터페이스(CLI)를 사용하세요.

## AWS 관리 콘솔

시작하기:

1. 계정으로 [AWS 관리 콘솔][16]에 로그인한 다음 CloudFormation으로 이동합니다.

2. 왼쪽 패널에서 '공개 확장 프로그램'을 선택한 다음 '타사'로 게시자를 필터링합니다.

3. 검색 바를 사용해 'Datadog' 접두어로 필터링합니다.

  참고: 모든 공식 Datadog 리소스는 `Datadog::`으로 시작하며 `Published by Datadog`이라고 명시됩니다.

4. 원하는 리소스 이름을 선택하여 해당 스키마에 대한 자세한 정보를 확인하고 **활성화**를 클릭합니다.

5. **확장 프로그램 세부 정보** 페이지에서 다음을 지정합니다.
  - 확장 이름
  - 실행 역할 ARN
  - 부 버전 릴리스에 관한 자동 업데이트
  - 설정

6. 리소스 설정의 경우, **일반 텍스트 대신 [AWS 기밀 정보 관리자(Secrets Manager)][17] 또는 이와 유사한 서비스를 사용하여 Datadog API 및 애플리케이션 키를 저장할 것을 강력히 권장합니다**.

  AWS 기밀 정보 관리자(Secrets Manager)를 사용하는 경우 설정에서 API 및 애플리케이션 키를 동적 참조할 수 있습니다. 자세한 내용을 확인하려면 [AWS 문서][18]를 참조하세요.

  예시:

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```
   US1 이외의 지역에서 계정을 사용하는 경우 `ApiURL`을 지정합니다. 예를 들어 EU 지역의 계정인 경우 `https://api.datadoghq.eu`, US5 지역의 계정인 경우 `https://api.us5.datadoghq.com/` 을 사용합니다.

7. 리소스를 설정한 후에는 활성화된 Datadog 리소스를 포함하는 [AWS 스택을 생성][3]합니다.

사용 가능한 명령어 및 워크플로우에 대한 자세한 내용을 확인하려면 공식 [AWS 문서][4]를 참조하세요.

## AWS 명령줄 인터페이스

시작하기:

1. `<RESOURCE_DIR>/resource-role.yaml` 파일을 기반으로 CloudFormation 리소스에 대한 실행 역할을 생성합니다.

1. 터미널에서 [AWS-cli 도구][2]를 사용하여 다음 Datadog 리소스를 등록합니다.

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>" \
        --execution-role-arn "<ROLE_ARN_FROM_STEP_1>"
    ```

1. 터미널에서 다음을 실행하여 새로 등록한 리소스의 버전을 확인합니다.

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

1. 터미널에서 다음을 실행하여 새로 등록한 버전을 `default`로 설정합니다.

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

    다음 필수 자리 표시자를 사용합니다.
    * `<REGION>`: 고객님의 AWS 지역입니다.
    * `<DATADOG_RESOURCE_NAME>`: 등록할 리소스 이름입니다. [하단 표](#resources-available)를 참조하여 Datadog을 지원하는 리소스를 확인합니다.
    * `<LINK_TO_S3>`: 리소스에 대한 S3 링크입니다.
      * S3 링크: `s3://datadog-cloudformation-resources/<RESOURCE_FOLDER>/<RESOURCE_FOLDER>-<RESOURCE_VERSION>.zip`
      * [사용 가능한 리소스 섹션](#resources-available)을 참조하세요. 지원되는 최신 S3 링크의 예시로 연결됩니다.
    * `VERSION_ID`: `2` 단계의 명령이 반환한 리소스의 기본 버전입니다.

1. 터미널에서 다음을 실행하여 새로 등록된 리소스를 설정합니다.

    ```shell
    aws cloudformation set-type-configuration \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --type RESOURCE \
        --configuration '{"DatadogCredentials": {"ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}", "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"}}'
    ```

1. AWS 계정에서 등록된 Datadog 리소스를 포함하는 [AWS 스택을 생성][3]합니다.

사용 가능한 명령어 및 워크플로우에 대한 자세한 내용을 확인하려면 공식 [AWS 문서][4]를 참조하세요.

## 사용 가능한 리소스

AWS 계정에서 다음 Datadog 리소스를 등록할 수 있습니다. 설정 방법을 알아보려면 해당 문서를 참조하세요.

| 리소스                | 이름                                  | 설명                                             | 폴더                              | S3 패키지 링크              |
|---------------------------|---------------------------------------|---------------------------------------------------------|-------------------------------------|-------------------------------|
| 대시보드                 | `Datadog::Dashboards::Dashboard`      | [Datadog 대시보드 생성, 업데이트 및 삭제][5]      | `datadog-dashboards-dashboard`      | [스키마 핸들러 버전][6]  |
| Datadog-AWS 통합   | `Datadog::Integrations::AWS`          | [Datadog-Amazon 웹 서비스 통합 관리][7] | `datadog-integrations-aws`          | [스키마 핸들러 버전][8]  |
| 모니터                   | `Datadog::Monitors::Monitor`          | [Datadog 모니터 생성, 업데이트 및 삭제][9]        | `datadog-monitors-monitor`          | [스키마 핸들러 버전][10] |
| 다운타임(**더 이상 사용되지 않음**) | `Datadog::Monitors::Downtime`         | [모니터링의 다운타임 활성화 또는 비활성화][11]     | `datadog-monitors-downtime`         | [스키마 핸들러 버전][12] |
| 다운타임 스케줄         | `Datadog::Monitors::DowntimeSchedule` | [Datadog 다운타임 예약][21]                        | `datadog-monitors-downtimeschedule` | [스키마 핸들러 버전][22] |
| 사용자                      | `Datadog::IAM::User`                  | [Datadog 사용자 생성 및 관리][13]                   | `datadog-iam-user`                  | [스키마 핸들러 버전][14] |
| SLO                       | `Datadog::SLOs::SLO`                  | [Datadog SLO 생성 및 관리][19]                     | `datadog-slos-slo`                  | [스키마 핸들러 버전][20] |

## 지원 지역

Datadog-Amazon CloudFormation 리소스는 다음 지역의 CloudFormation 공용 레지스트리에서 사용할 수 있습니다.

| 코드            | 이름                      |
|-----------------|---------------------------|
| us-east-1       | 미국 동부(버지니아 북부)     |
| us-east-2       | 미국 동부(오하이오)            |
| us-west-1       | 미국 서부(캘리포니아 북부)   |
| us-west-2       | 미국 서부(오리건)          |
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

**참고**: 다른 지역의 리소스를 비공개로 등록하려면 제공된 패키지를 사용하세요.

## 트러블슈팅

도움이 필요하시면 [Datadog 지원팀][15]에 문의하세요.

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