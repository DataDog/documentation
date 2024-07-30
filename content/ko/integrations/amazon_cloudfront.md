---
aliases:
- /ko/integrations/awscloudfront/
categories:
- aws
- caching
- cloud
- log collection
- network
dependencies: []
description: 오류 비율, 요청 개수 및 다운로드 및 업로드 바이트를 추적하세요."
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudfront/
draft: false
git_integration_title: amazon_cloudfront
has_logo: true
integration_id: ''
integration_title: Amazon CloudFront
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: amazon_cloudfront
public_title: Datadog-Amazon CloudFront 통합
short_description: 오류 비율, 요청 개수 및 다운로드 및 업로드 바이트를 추적하세요."
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon CloudFront는 글로벌 콘텐츠 전송 네트워크(CDN) 서비스로 웹사이트, API, 비디오 콘텐츠 또는 기타 웹 자산 전송을 가속화합니다.

이 통합을 활성화하여 Datadog에서 모든 CloudFront 메트릭을 확인합니다.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `CloudFront`가 `Metric Collection` 탭에서 활성화되어 있는지 확인합니다.
2. [Datadog - Amazon CloudFront 통합][3을 설치합니다.
3. 선택 항목: CloudFront 트래픽 성능에 대한 더 높은 가시성을 위해 [추가 CloudFront 배포 메트릭][4]을 활성화합니다.

### 로그 수집

{{< tabs >}}
{{% tab "Standard Logs" %}}

#### 로깅 활성화

배포를 위해 CloudFront 로깅을 활성화하면 CloudFront가 로그 파일을 저장하길 원하는 Amazon S3 버킷을 지정합니다. Amazon S3을 소스로 사용하고 있는 경우 Datadog에서는 로그 파일에 동일한 버킷을 사용하지 않을 것을 권장합니다. 별도의 버킷을 사용하면 유지관리를 단순화할 수 있습니다.

**참고**: Datadog는 동일한 버킷에 다수 배포를 위한 로그 파일을 저장할 것을 권장합니다. 이를 통해 로그 포워더는 단일 버킷에만 구독할 수 있습니다.

<div class="alert alert-info">
CloudFront 소스를 통해 로그를 자동으로 분류합니다. 로그 활성화 시 <code>cloudfront</code>를 파일 이름 접두어로 지정합니다. 그렇지 않으면 로그는 <code>s3</code>으로 분류됩니다.
</div>

#### Datadog에 로그 전송

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][1]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **S3** 트리거를 선택합니다.
4. CloudFront 로그를 포함하는 S3 버킷을 선택합니다.
5. 이벤트 유형을 `All object create events`로 남겨둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 탐색기][2]로 이동해 로그 탐색을 시작합니다.

AWS Services 로그를 수집하는 방법에 관한 자세한 정보는 [Datadog Lambda Function으로 AWS Services 로그 보내기][3]를 참고하세요.

[1]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
{{% /tab %}}
{{% tab "Real-Time Logs" %}}

#### 로깅 활성화

##### 구체적인 설정 생성

실시간 로그 설정을 생성하면, 수신하려는 로그 필드를 지정할 수 있습니다. 기본적으로 모든 [사용 가능한 필드][1]가 선택되어 있습니다.

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_3.png" alt="CloudFront 로깅 3" popup="true" style="width:70%;">}}

Datadog는 이 기본 설정을 유지하고 다음 커스텀 파싱 규칙을 추가하여 모든 필드가 활성화된 로그를 자동으로 처리할 것을 권장합니다. 

[파이프라인 페이지][1]로 이동하고, Amazon CloudFront를 검색하고 [grok 파서 프로세서를 편집하거나 생성하고][7] *고급 설정*에서 다음 도움말 규칙을 추가합니다.

{{< code-block lang="java" >}}
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
{{< /code-block >}}

#### Datadog에 로그 전송

실시간 로그는 선택한 Kinesis Data Stream으로 전달되며 [Amazon Data Firehose 통합][2]을 통해 Datadog에 직접 전달할 수 있습니다.

또한 실시간 로그를 S3 버킷으로 보내고 [Datadog Lambda 포워더][3]를 사용하여 로그를 Datadog으로 전송하도록 Amazon Data Firehose와 같은 소비자를 설정할 수도 있습니다.

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
[2]: https://docs.datadoghq.com/ko/integrations/amazon_kinesis/
[3]: https://docs.datadoghq.com/ko/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_cloudfront" >}}


AWS에서 검색된 각 메트릭은 `aws_account`, `region` 및 `distributionid`을 포함하되 이에 국한되지 않으며 AWS 콘솔에 표시되는 동일한 태그에 할당됩니다.

### 이벤트

Amazon CloudFront 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

Amazon CloudFront 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudfront
[4]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudfront/amazon_cloudfront_metadata.csv
[6]: https://docs.datadoghq.com/ko/help/