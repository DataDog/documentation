---
categories:
- aws
- cloud
- 데이터 스토어
- 로그 수집
dependencies: []
description: 핵심 Amazon FSx 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_fsx/
draft: false
git_integration_title: amazon_fsx
has_logo: true
integration_id: ''
integration_title: Amazon FSx
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_fsx
public_title: Datadog-Amazon FSx 통합
short_description: 핵심 Amazon FSx 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon FSx는 완전 관리형 서비스로, NetApp ONTAP, OpenZFS, Windows File Server 및 Lustre 파일 시스템에 대해 확대 가능한 스토리지를 제공합니다.

이 통합을 활성화해 Datadog에서 모든 FSx 메트릭을 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `FSx`가 `Metric Collection` 탭 아래 활성화되어 있는지 확인하세요.
2. Amazon FSx 메트릭을 수집하려면 [Datadog IAM 정책][3]에 해당 권한을 추가합니다. 

    | AWS 권한                          | 설명                                                                                                                                                                                                                                             |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `fsx:ListTagsForResource`               | FSx 커스텀 태그를 추가하는 데 사용됩니다.                                                                                                                                                                                                                   |
    | `fsx:DescribeFileSystems`               | 저장소와 처리 용량을 제공하는 데 사용됩니다.                                                                                                                                                                                    |

2. [Datadog - Amazon FSx 통합][4]을 설치합니다.


### 로그 수집

#### 윈도우즈(Windows) 파일 서버를 위한 FSx 이벤트 로그 감사
개별 파일, 폴더, 파일 공유에 대한 모든 사용자 액세스를 추적하려면 윈도우즈(Windows) 파일 서버에 대해 FSx에서 이벤트 로그 감사를 통합니다.

1. 파일 시스템에서 [파일 액세스 감사 기능을 활성화하고] 클라우드와치(CloudWatch)에 로그를 전송합니다.
2. 이미 하지 않은 경우 [Datadog 로그 수집 AWS 람다 함수][4](버전 3.35.0 이상)를 설정하세요.
3. 람다 함수가 설치되면 AWS 콘솔의 `/aws/fsx/windows` 클라우드와치(CloudWatch) 로그 그룹에서 수동으로 트리거를 추가할 수 있습니다.
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch 로그 그룹" popup="true" style="width:70%;">}}
   해당되는 클라우드와치(CloudWatch) 로그 그룹을 선택하고 필터 이름(또는 필터를 빈 상태로 둠)과 트리거를 차례로 추가합니다. 
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="CloudWatch 트리거" popup="true" style="width:70%;">}}
4. [Datadog 로그 섹션][6]으로 이동해 로그 탐색을 시작해보세요!

**참고**: 또한 [Amazon Data Firehose][7]를 사용해 Datadog에 이러한 로그를 전송할 수도 있습니다. 하지만 커스텀 로그 [프로세서][8]을 생성하여 긴 파싱 구문과 검색 경험을 확보해야 합니다.


#### FSx API 정책

Amazon FSx는 사용자, 역할, AWS 서비스별로 모든 FSx 작업을 모두 추적하는 AWS CloudTrail과 통합되어 있습니다. 
Datadog의 [CloudTrail 통합][9]을 활성화해 AWS 계정에서 모든 FSx API 호출을 모니터링하세요.

### 메트릭
{{< get-metrics-from-git "amazon_fsx" >}}


### 이벤트

Amazon FSx 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon FSx 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-fsx
[5]: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/file-access-auditing.html#faa-log-destinations
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[8]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui
[9]: https://docs.datadoghq.com/ko/integrations/amazon_cloudtrail/#log-collection
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_fsx/amazon_fsx_metadata.csv
[11]: https://docs.datadoghq.com/ko/help/