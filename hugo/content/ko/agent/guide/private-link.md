---
description: 교차 리전 설정까지 포함하여 AWS PrivateLink 엔드포인트를 구성하고 내부 VPC 연결을 통해 텔레메트리 데이터를
  Datadog으로 안전하게 전송합니다.
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: 아키텍처 센터
  text: 교차 리전 AWS PrivateLink를 사용하여 Datadog에 텔레메트리 데이터 전송
- link: /agent/logs
  tag: 설명서
  text: Agent로 로그 수집 활성화
- link: /integrations/amazon_web_services/#log-collection
  tag: 설명서
  text: AWS 서비스에서 로그 수집
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: 아키텍처 센터
  text: AWS PrivateLink를 통한 Datadog 연결
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: 아키텍처 센터
  text: AWS Transit Gateway를 사용하여 AWS PrivateLink를 통해 Datadog 연결
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: 아키텍처 센터
  text: AWS VPC 피어링을 사용하여 AWS PrivateLink를 통해 Datadog 연결
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: 블로그
  text: 교차 리전 Datadog 연결을 위해 AWS PrivateLink를 사용하여 비용을 절감하고 보안을 강화합니다.
title: AWS PrivateLink를 통한 Datadog 연결
---
{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink는 선택한 Datadog 사이트를 지원하지 않습니다.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2,uk1" %}}

## 개요 {#overview}

이 가이드는 Datadog과 함께 [AWS PrivateLink][11]를 구성하는 방법을 설명합니다. 전체 프로세스는 로컬 Datadog Agent가 데이터를 전송할 수 있는 내부 엔드포인트를 VPC에 구성하는 것으로 시작됩니다. 그 후 사용자의 VPC 엔드포인트는 Datadog VPC 내의 엔드포인트와 피어링됩니다.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC 다이어그램 스키마" >}}

Datadog은 **{{< region-param key="aws_region" >}}**에서 AWS PrivateLink 엔드포인트를 제공합니다.
- 동일한 리전 내에서 Datadog 트래픽을 라우팅해야 하는 경우 [동일 리전에서 연결](#connect-from-the-same-region) 절차에 따라 엔드포인트를 설정하세요.
- 다른 리전에서 {{< region-param key="aws_region" >}} 에 있는 Datadog의 PrivateLink 서비스로 트래픽을 라우팅해야 하는 경우 Datadog은 [교차 리전 PrivateLink 엔드포인트](?tab=crossregionprivatelinkendpoints#connect-from-other-regions)를 권장합니다. [교차 리전 PrivateLink][11]를 사용하면 서로 다른 AWS 리전에 있는 VPC 간 연결을 설정할 수 있습니다. 이를 통해 서로 다른 리전의 VPC 리소스가 사설 IP 주소를 사용하여 통신할 수 있습니다. 대안으로 [VPC 피어링](?tab=vpcpeering#connect-from-other-regions)을 사용할 수도 있습니다.

## 동일 리전에서 연결 {#connect-from-the-same-region}

1. AWS Management Console을 원하는 리전에 연결합니다.
1. VPC Dashboard에서 {{< ui >}}PrivateLink and Lattice{{< /ui >}} 아래의 {{< ui >}}Endpoints{{< /ui >}}를 선택합니다.
1. {{< ui >}}Create Endpoint{{< /ui >}}를 클릭합니다.
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC 대시보드의 Endpoints 페이지" style="width:90%;" >}}
1. {{< ui >}}Find service by name{{< /ui >}}을 선택합니다.
1. AWS PrivateLink를 설정하려는 서비스에 따라 _Service Name_ 텍스트 상자를 입력합니다.

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC 서비스 이름" style="width:70%;" >}}

{{% site-region region="ap1" %}}
| Datadog                   | PrivateLink 서비스 이름                                                               | Private DNS 이름                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| 로그(Agent HTTP 수집) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| 로그(사용자 HTTP 수집)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| 메트릭                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| 컨테이너                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| 트레이스                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
US1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}
{{% site-region region="ap2" %}}
AP2 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

{{% site-region region="uk1" %}}
UK1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

4. {{< ui >}}Verify{{< /ui >}}를 클릭합니다. _Service name found_가 표시되지 않으면 [Datadog 지원팀][14]에 문의합니다.
5. Datadog VPC 서비스 엔드포인트와 피어링할 VPC 및 서브넷을 선택합니다.
6. {{< ui >}}Enable DNS name{{< /ui >}}에서 _Enable for this endpoint_가 선택되어 있는지 확인합니다.

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="프라이빗 DNS 활성화" style="width:80%;" >}}

7. 이 VPC 엔드포인트로 트래픽을 전송할 수 있는 대상을 제어할 보안 그룹을 선택합니다.

    **참고**: **보안 그룹은 TCP 포트 `443`**에 대한 인바운드 트래픽을 허용해야 합니다.

8. 화면 하단의 {{< ui >}}Create endpoint{{< /ui >}}를 클릭합니다. 성공하면 다음과 같이 표시됩니다.

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC 엔드포인트 생성 완료" style="width:60%;" >}}

9. 상태를 확인하려면 VPC 엔드포인트 ID를 클릭합니다.
10. 상태가 _Pending_에서 _Available_로 변경될 때까지 기다립니다. 최대 10분이 소요될 수 있습니다. _Available_ 상태가 되면 AWS PrivateLink를 사용할 수 있습니다.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC 상태" style="width:60%;" >}}

11. Datadog Agent v6.19 또는 v7.19보다 이전 버전을 사용 중인 경우 로그 데이터를 수집하려면 Agent가 HTTPS를 통해 로그를 전송하도록 구성되어 있는지 확인합니다. 데이터가 아직 없는 경우 [Agent `datadog.yaml` 구성 파일][15]에 다음 내용을 추가하세요.

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. Lambda Extension이 환경 변수 `DD_API_KEY_SECRET_ARN`에 지정된 ARN을 사용하여 AWS Secrets Manager에서 Datadog API 키를 로드하는 경우 [Secrets Manager용 VPC 엔드포인트를 생성][17]해야 합니다.

13. AWS PrivateLink를 통해 Datadog으로 데이터를 전송하려면 [Agent를 다시 시작][13]합니다.

## 다른 리전에서 연결 {#connect-from-other-regions}

{{< tabs >}}
{{% tab "교차 리전 PrivateLink 엔드포인트" %}}
1. AWS Management Console을 원하는 리전에 연결합니다.
1. VPC Dashboard에서 {{< ui >}}PrivateLink and Lattice{{< /ui >}} 아래의 {{< ui >}}Endpoints{{< /ui >}}를 선택합니다.
1. {{< ui >}}Create Endpoint{{< /ui >}}를 클릭합니다.
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC 대시보드의 Endpoints 페이지" style="width:90%;" >}}
1. VPC 인터페이스 엔드포인트 설정을 구성합니다.
   1. 필요에 따라 {{< ui >}}Name tag{{< /ui >}}를 입력합니다.
   1. {{< ui >}}Type{{< /ui >}} 아래에서 {{< ui >}}PrivateLink Ready partner services{{< /ui >}}를 선택합니다.
1. 교차 리전 지원을 사용하여 인터페이스 엔드포인트를 검색하고 구성합니다.
   1. {{< ui >}}Service name{{< /ui >}} 아래에서 아래 [표](#privatelink-service-names)에 있는 유효한 PrivateLink 서비스 이름을 입력합니다.
   1. {{< ui >}}Service region{{< /ui >}} 아래에서 {{< ui >}}Enable Cross Region endpoint{{< /ui >}}를 클릭하고 **{{< region-param key="aws_private_link_cross_region" >}}**에서 AWS PrivateLink 엔드포인트를 제공합니다.
   1. {{< ui >}}Verify service{{< /ui >}}를 클릭한 후 _Service name verified_ 알림이 표시될 때까지 기다립니다.
      **참고:** 위 단계를 완료한 후에도 서비스를 확인할 수 없는 경우 [Datadog 지원팀][1]에 문의하세요.
1. {{< ui >}}Network Settings{{< /ui >}} 아래에서 VPC 인터페이스 엔드포인트를 배포할 VPC를 선택합니다.
1. {{< ui >}}Enable DNS name{{< /ui >}} 옵션이 선택되어 있는지 확인합니다.
1. {{< ui >}}Subnets{{< /ui >}} 아래에서 인터페이스 엔드포인트에 사용할 하나 이상의 서브넷을 선택합니다.
1. {{< ui >}}Security Groups{{< /ui >}} 아래에서 VPC 엔드포인트로 트래픽을 전송할 수 있는 대상을 제어할 보안 그룹을 선택합니다.

   **참고**: 보안 그룹은 TCP 포트 443에 대한 인바운드 트래픽을 허용해야 합니다.
1. 필요에 따라 {{< ui >}}Name tag{{< /ui >}}을 입력한 후 {{< ui >}}Create endpoint{{< /ui >}}를 클릭합니다.
1. 엔드포인트 상태가 {{< ui >}}Pending{{< /ui >}}에서 {{< ui >}}Available{{< /ui >}}로 변경될 때까지 몇 분 정도 기다립니다. 최대 10분이 소요될 수 있습니다. 예상보다 오래 걸리는 경우 [Datadog 지원팀][1]에 문의하세요.

엔드포인트 상태가 {{< ui >}}Available{{< /ui >}}로 변경되면 이 엔드포인트를 사용하여 교차 리전 AWS PrivateLink 엔드포인트를 통해 Datadog으로 텔레메트리 데이터를 전송할 수 있습니다.

## PrivateLink 서비스 이름 {#privatelink-service-names}

{{% site-region region="ap1" %}}
| Datadog                   | PrivateLink 서비스 이름                                                               | Private DNS 이름                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| 로그(Agent HTTP 수집) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| 로그(사용자 HTTP 수집)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| 메트릭                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| 컨테이너                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| 트레이스                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="ap2" %}}
AP2 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

{{% site-region region="us" %}}
US1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}
{{% site-region region="uk1" %}}
UK1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

**참고**: 교차 리전 PrivateLink는 CloudWatch 메트릭을 생성하지 않습니다. 자세한 내용은 [AWS PrivateLink용 CloudWatch 메트릭][2]을 참조하세요.

[1]: /ko/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "VPC 피어링" %}}
1. AWS 콘솔을 리전 **{{< region-param key="aws_region" >}}**에 연결한 후 VPC 엔드포인트를 생성합니다.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC 엔드포인트 생성" style="width:80%;" >}}

2. {{< ui >}}Find service by name{{< /ui >}}을 선택합니다.
3. AWS PrivateLink를 구성하려는 서비스에 따라 _Service Name_ 텍스트 상자를 입력합니다.

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC 서비스 이름" style="width:90%;" >}}

{{% site-region region="ap1" %}}
| Datadog                   | PrivateLink 서비스 이름                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| 로그(Agent HTTP 수집) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| 로그(사용자 HTTP 수집)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| 메트릭                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| 컨테이너                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| 트레이스                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
US1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}
{{% site-region region="ap2" %}}
AP2 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

{{% site-region region="uk1" %}}
UK1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

4. {{< ui >}}Verify{{< /ui >}}를 클릭합니다. _Service name found_가 표시되지 않으면 [Datadog 지원팀][1]에 문의하세요.

5. 다음으로 Datadog VPC 서비스 엔드포인트와 피어링할 VPC 및 서브넷을 선택합니다. VPC 피어링에서는 DNS를 수동으로 구성해야 하므로 {{< ui >}}Enable DNS name{{< /ui >}}은 선택하지 마세요.

6. 이 VPC 엔드포인트로 트래픽을 전송할 수 있는 대상을 제어할 보안 그룹을 선택합니다.

    **참고**: **보안 그룹은 TCP 포트 `443`**에 대한 인바운드 트래픽을 허용해야 합니다.

7. 화면 하단의 {{< ui >}}Create endpoint{{< /ui >}}를 클릭합니다. 성공하면 다음과 같이 표시됩니다.

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC 엔드포인트 생성 완료" style="width:80%;" >}}

8. 상태를 확인하려면 VPC 엔드포인트 ID를 클릭합니다.
9. 상태가 _Pending_에서 _Available_로 변경될 때까지 기다립니다. 최대 10분이 소요될 수 있습니다.
10. 엔드포인트를 생성한 후 VPC 피어링을 사용하여 다른 리전에서도 PrivateLink 엔드포인트를 사용할 수 있도록 구성하면 Datadog으로 PrivateLink를 통해 텔레메트리 데이터를 전송할 수 있습니다. 자세한 내용은 AWS의 [Work With VPC Peering Connections][2] 페이지를 참조하세요.

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC 상태" style="width:80%;" >}}

### Amazon Route53 {#amazon-route53}

1. AWS PrivateLink 엔드포인트를 생성한 각 서비스에 대해 [Route53 프라이빗 호스팅 영역][3]을 생성합니다. 프라이빗 호스팅 영역을 {{< region-param key="aws_region" code="true" >}}VPC에 연결합니다.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 프라이빗 호스팅 영역 생성" style="width:80%;" >}}

아래 목록을 사용하여 서비스와 DNS 이름을 Datadog의 각 부분에 매핑하세요.

{{% site-region region="ap1" %}}
  | Datadog                   | PrivateLink 서비스 이름                                                               | Private DNS 이름                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | 로그(Agent HTTP 수집) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | 로그(사용자 HTTP 수집)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | 메트릭                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | 컨테이너                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | 트레이스                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
US1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}
{{% site-region region="ap2" %}}
AP2 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

{{% site-region region="uk1" %}}
UK1 DNS 레코드 및 VPC 서비스 엔드포인트의 전체 목록은 [VPC 엔드포인트 서비스 ID](#vpc-endpoint-service-ids)를 참조하세요.
{{% /site-region %}}

  이 정보는 AWS API의 `DescribeVpcEndpointServices`를 조회하거나 다음 명령을 사용하여 확인할 수도 있습니다.

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  예를 들어 {{< region-param key="aws_region" code="true" >}}Datadog 메트릭 엔드포인트의 경우:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

이 명령은 Agent 트래픽이 발생하는 VPC에 연결하기 위해 필요한 프라이빗 호스팅 영역 이름인 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>을 반환합니다. 이 레코드를 재정의하면 메트릭 관련 수집 호스트 이름 전체를 처리할 수 있습니다.

2. 새 Route53 프라이빗 호스팅 영역마다 동일한 이름의 A 레코드를 생성합니다. {{< ui >}}Alias{{< /ui >}} 옵션을 활성화한 후 {{< ui >}}Route traffic to{{< /ui >}}에서 {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **{{< region-param key="aws_region" >}}**를 선택하고 DNS 이름에 연결된 VPC 엔드포인트의 DNS 이름을 입력합니다.**참고**:
      - DNS 이름을 검색하려면 [엔드포인트 서비스 프라이빗 DNS 이름 구성 보기 설명서][4]를 참조하세요.
      - Agent는 예를 들어 <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> 과 같은 버전 지정 엔드포인트로 텔레메트리를 전송하며, 이는 CNAME 별칭을 통해 <code>metrics.agent.{{< region-param key="dd_site" >}}</code> 으로 확인됩니다. 따라서 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>VPC에 연결합니다.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="A 레코드 생성" style="width:90%;" >}}

3. Datadog PrivateLink 엔드포인트가 포함된 {{< region-param key="aws_region" code="true" >}} 의 VPC와 Datadog Agent가 실행되는 리전의 VPC 간에 VPC 피어링 및 라우팅을 구성합니다.

4. VPC가 서로 다른 AWS 계정에 있는 경우 계속 진행하기 전에 Datadog Agent가 포함된 VPC가 Route53 프라이빗 호스팅 영역과 연결될 수 있도록 권한을 부여해야 합니다. Datadog Agent가 실행되는 VPC의 리전 및 VPC ID를 사용하여 각 Route53 프라이빗 호스팅 영역에 대해 [VPC 연결 권한][5]을 생성합니다. 이 옵션은 AWS 콘솔에서는 사용할 수 없습니다. AWS CLI, SDK 또는 API를 사용하여 구성해야 합니다.

5. 다른 리전의 VPC를 추가하도록 Route53 호스팅 영역을 편집합니다.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Route53 프라이빗 호스팅 영역 편집" style="width:80%;" >}}

6. 프라이빗 호스팅 영역(PHZ)이 연결된 VPC에서는 특정 설정을 활성화해야 합니다. 특히 PHZ와 연결된 VPC에서 `enableDnsHostnames` 및 `enableDnsSupport` 설정을 활성화해야 합니다. 자세한 내용은 [프라이빗 호스팅 영역 작업 시 고려 사항][6]을 참조하세요.

7. AWS PrivateLink를 통해 Datadog으로 데이터를 전송하려면 [Agent를 재시작][7]합니다.

#### DNS 확인 및 연결 문제 해결 {#troubleshooting-dns-resolution-and-connectivity}

DNS 이름은 {{< region-param key="aws_region" code="true" >}}의 VPC CIDR 블록에 포함된 IP 주소로 확인되어야 하며, `port 443`에 대한 연결이 성공해야 합니다.

{{< img src="agent/guide/private_link/successful-setup.png" alt="포트 443 연결이 성공해야 함" style="width:80%;" >}}

DNS가 공용 IP 주소로 확인되는 경우 Route53 영역이 다른 리전의 VPC와 **연결되지 않았거나** A 레코드가 존재하지 않는 것입니다.

DNS는 올바르게 확인되지만 `port 443` 연결이 실패하는 경우 VPC 피어링 또는 라우팅이 잘못 구성되었거나 포트 443이 {{< region-param key="aws_region" code="true" >}}에서 VPC의 CIDR 블록으로 아웃바운드되도록 허용되지 않았을 수 있습니다.

프라이빗 호스팅 영역(PHZ)이 연결된 VPC에서는 몇 가지 설정을 활성화해야 합니다. 특히 PHZ와 연결된 VPC에서 `enableDnsHostnames` 및 `enableDnsSupport`를 활성화해야 합니다. 자세한 내용은 [Amazon VPC 설정][6]을 참조하세요.

### Datadog Agent {#datadog-agent}

1. 로그 데이터를 수집하는 경우 Agent가 HTTPS를 사용하여 로그를 전송하도록 구성되어 있는지 확인합니다. 데이터가 아직 없는 경우 [Agent `datadog.yaml` 구성 파일][8]에 다음 내용을 추가하세요.

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. Lambda Extension이 환경 변수 `DD_API_KEY_SECRET_ARN`에 지정된 ARN을 사용하여 AWS Secrets Manager에서 Datadog API 키를 로드하는 경우 [Secrets Manager용 VPC 엔드포인트를 생성][10]해야 합니다.

3. [Agent를 다시 시작][7]합니다.

[1]: /ko/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ko/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}

[11]: https://aws.amazon.com/privatelink/
[12]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[13]: /ko/agent/configuration/agent-commands/#restart-the-agent
[14]: /ko/help/
[15]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[16]: /ko/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[17]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html

{{% site-region region="us" %}}
## VPC 엔드포인트 서비스 ID {#vpc-endpoint-service-ids}

US1은 PrivateLink에 2단계 DNS 아키텍처를 사용합니다. 모든 고객 대면 DNS 레코드는 전용 `color.intake.datadoghq.com` VPC 엔드포인트 주소에 매핑됩니다. 특정 앵커 주소에 대해 VPC 엔드포인트를 설정하면 해당 주소에 매핑되는 모든 고객 대면 레코드를 포괄합니다.

다음 표에서 사용 중인 Datadog 기능에 대해 설정할 VPC 엔드포인트를 확인하세요. Wildcard 항목은 나열되지 않은 모든 하위 도메인과 일치합니다.

**참고**: 아래 표의 `---`은 중간 앵커 주소가 없는 직접 VPC 서비스 엔드포인트를 나타냅니다.
| 이름 | 앵커 | VPC 엔드포인트 서비스 ID |
|---|---|---|
| `webhook-intake.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `webhooks-http-intake.logs.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `*.integrations.otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `opamp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `mcp.datadoghq.com` | `cornsilk.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-058a75ceea85a9175` |
| `agenthealth-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ci-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cicodescan-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcov-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cloudplatform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contimage-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contlcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cws-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `debugger-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `error-tracking-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-management-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-platform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `feed-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `instrumentation-telemetry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `kubeops-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `llmobs-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndm-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndmflow-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `netpath-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ocimetrics-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `resources-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sbom-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sds-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sentry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `snmp-traps-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `softinv-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `iam-rum-intake.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum-http-intake.logs.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum.browser-intake-datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `data-obs-intake.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `trace.agent.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `network-devices.datadoghq.com` | `olive.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-05e3bfec4501e714d` |
| `*.datadoghq.com` | `orange.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b67fd56f90bd3c41` |
| `*.api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `*.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `intake.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `agent-http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| `http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| `metrics.agent.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| `orchestrator.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |
| `process.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| `intake.profile.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| `dbm-metrics-intake.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ce70d55ec4af8501` |
| `config.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-01f21309e507e3b1d` |

{{% /site-region %}}

{{% site-region region="ap2" %}}
## VPC 엔드포인트 서비스 ID {#vpc-endpoint-service-ids-1}

AP2은 PrivateLink에 2단계 DNS 아키텍처를 사용합니다. 모든 고객 대면 DNS 레코드는 전용 `color.intake.ap2.datadoghq.com` VPC 엔드포인트 주소에 매핑됩니다. 특정 앵커 주소에 대해 VPC 엔드포인트를 설정하면 해당 주소에 매핑되는 모든 고객 대면 레코드를 포괄합니다.

다음 표에서 사용 중인 Datadog 기능에 대해 설정할 VPC 엔드포인트를 확인하세요. 보다 구체적인 DNS 레코드는 와일드카드보다 우선적으로 적용됩니다. 예를 들어, `trace.agent.ap2.datadoghq.com`는 `lime.intake.ap2.datadoghq.com`로 해석되지만, `*.agent.ap2.datadoghq.com`은 `beige.intake.ap2.datadoghq.com`을 가리킵니다.

| 이름 | 앵커 | VPC 엔드포인트 서비스 ID |
|---|---|---|
| `gcp-intake.logs.ap2.datadoghq.com` | `aqua.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01b61a61d21fc7273` |
| `*.agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `process.ap2.datadoghq.com` | `bisque.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5` |
| `*.integrations.otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `opamp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `agenthealth-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `awsmetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ci-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cicodescan-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cireport-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcov-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cloudplatform-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contimage-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contlcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cspm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cws-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `debugger-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `error-tracking-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `event-management-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `instrumentation-telemetry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `intake.profile.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `kubeops-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `llmobs-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndmflow-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `netpath-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ocimetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `resources-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sbom-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sds-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sentry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `snmp-traps-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `softinv-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `webhook-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `agent-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `aws-kinesis-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `eventbridge-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `lambda-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `obpipeline-intake.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `runtime-security-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `live.logs.ap2.datadoghq.com` | `indigo.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0545109555aa68e7e` |
| `data-obs-intake.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `trace.agent.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `orchestrator.ap2.datadoghq.com` | `linen.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-031da3ffac78ef902` |
| `*.ap2.datadoghq.com` | `orange.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01911394f8bac8056` |
| `*.synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `api.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `quota.browser-intake-ap2-datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `sourcemap-intake.ap2.datadoghq.com` | `plum.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-028e4348e80fa73f5` |
| `config.ap2.datadoghq.com` | `violet.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01f8f80f4cb97bd10` |
| `dbm-metrics-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
| `dbquery-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
{{% /site-region %}}

{{% /site-region %}}

{{% site-region region="uk1" %}}
## VPC 엔드포인트 서비스 ID {#vpc-endpoint-service-ids-2}

UK1은 PrivateLink에 2단계 DNS 아키텍처를 사용합니다. 모든 고객 대면 DNS 레코드는 전용 `color.intake.uk1.datadoghq.com` VPC 엔드포인트 주소에 매핑됩니다. 특정 앵커 주소에 대해 VPC 엔드포인트를 설정하면 해당 주소에 매핑되는 모든 고객 대면 레코드를 포괄합니다.

다음 표에서 사용 중인 Datadog 기능에 대해 설정할 VPC 엔드포인트를 확인하세요. 보다 구체적인 DNS 레코드는 와일드카드보다 우선적으로 적용됩니다. 예를 들어, `trace.agent.uk1.datadoghq.com`는 `lime.intake.uk1.datadoghq.com`로 해석되지만, `*.agent.uk1.datadoghq.com`은 `beige.intake.uk1.datadoghq.com`을 가리킵니다.

| 이름 | 앵커 | VPC 엔드포인트 서비스 ID |
|---|---|---|
| `gcp-intake.logs.uk1.datadoghq.com` | `aqua.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-099b74a86151e7f91` |
| `*.agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `process.uk1.datadoghq.com` | `bisque.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0fe52c96bfb6c5d0e` |
| `*.integrations.otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `opamp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `mcp.uk1.datadoghq.com` | `cornsilk.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d345b92b8a5e8743` |
| `agenthealth-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `awsmetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ci-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cicodescan-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cireport-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcov-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cloudplatform-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contimage-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contlcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cspm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cws-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `debugger-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `error-tracking-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `event-management-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `instrumentation-telemetry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `intake.profile.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `kubeops-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `llmobs-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndmflow-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `netpath-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ocimetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `resources-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sbom-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sds-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sentry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `snmp-traps-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `softinv-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `webhook-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `agent-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `aws-kinesis-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `eventbridge-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `lambda-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `obpipeline-intake.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `runtime-security-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `data-obs-intake.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `trace.agent.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `orchestrator.uk1.datadoghq.com` | `linen.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-07f22a32140efaae5` |
| `*.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `custom-domains.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `*.synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `api.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `quota.browser-intake-uk1-datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `sourcemap-intake.uk1.datadoghq.com` | `plum.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-04fbf10021b0308cd` |
| `config.uk1.datadoghq.com` | `violet.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0755097b02a34f9e7` |
| `dbm-metrics-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
| `dbquery-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
{{% /site-region %}}

## PrivateLink를 통해 데이터가 전송되는지 확인 {#verify-that-data-is-being-sent-using-privatelink}

PrivateLink 설정 후 데이터가 실제로 PrivateLink를 통해 전송되는지 확인하려면 해당 VPC에 있는 시스템에서 `dig` 명령을 실행합니다. 예를 들어 엔드포인트 `http-intake.logs.datadoghq.com`에 대해 PrivateLink를 구성한 경우 다음 명령을 실행합니다.

```
dig http-intake.logs.datadoghq.com
```

로그가 PrivateLink를 통해 전송되고 있다면 출력의 `ANSWER Section` 섹션에 아래 예와 같이 `http-intake.logs.datadoghq.com`가 표시됩니다. **참고**: 반환되는 IP 주소는 [프라이빗 IP 주소 공간][1]에 속해야 합니다.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

로그가 PrivateLink를 통해 전송되지 않는 경우 출력의 `ANSWER SECTION`에는 로그가 전송되는 로드 밸런서(`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`)가 표시됩니다.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses