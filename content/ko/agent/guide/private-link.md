---
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: 아키텍처 센터
  text: 크로스 리전 AWS PrivateLink를 사용하여 Datadog에 원격 측정 데이터 전송
- link: /agent/logs
  tag: 설명서
  text: Agent로 로그 수집 활성화
- link: /integrations/amazon_web_services/#log-collection
  tag: 설명서
  text: AWS 서비스에서 로그 수집
- link: https://www.datadoghq.com/architecture/connect-to-Datadog-over-AWS-privatelink/
  tag: 아키텍처 센터
  text: AWS PrivateLink를 통한 Datadog 연결
- link: https://www.datadoghq.com/architecture/connect-to-Datadog-over-AWS-privatelink-using-AWS-transit-gateway/
  tag: 아키텍처 센터
  text: AWS Transit Gateway를 사용하여 AWS PrivateLink를 통해 Datadog 연결
- link: https://www.datadoghq.com/architecture/connect-to-Datadog-over-AWS-privatelink-using-AWS-vpc-peering/
  tag: 아키텍처 센터
  text: AWS VPC 피어링을 사용하여 AWS PrivateLink를 통해 Datadog 연결
title: AWS PrivateLink를 통해 Datadog에 연결
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-danger">Datadog PrivateLink는 선택한 Datadog site에서 지원되지 않습니다.</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

## 개요

이 가이드는 Datadog과 함께 사용할 수 있도록 [AWS PrivateLink][11]를 구성하는 방법을 안내합니다. 전체 프로세스는 로컬 Datadog Agent가 데이터를 전송할 수 있는 VPC의 내부 엔드포인트를 구성하는 것으로 진행됩니다. 그런 다음 VPC 엔드포인트를 Datadog의 VPC 내 엔드포인트와 피어링합니다.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC 다이어그램 스키마" >}}

Datadog은 **{{< region-param key="aws_region" >}}**에서 AWS PrivateLink 엔드포인트를 노출합니다.
- 동일한 리전에서 Datadog 트래픽을 라우팅해야 하는 경우 [동일한 리전에서 연결](#connect-from-the-same-region)의 단계에 따라 엔드포인트를 설정합니다.
-  {{< region-param key="aws_region" >}}에서 다른 리전으로부터 Datadog의 PrivateLink 제품으로 트래픽을 라우팅하려면 Datadog는 [크로스 리전 PrivateLink 엔드포인트](?tab=crossregionprivatelinkendpoints#connect-from-other-regions)를 권장합니다. [크로스 리전 PrivateLink][11]를 사용하면 서로 다른 AWS 리전의 VPC 간에 연결을 설정할 수 있습니다. 이를 통해 서로 다른 리전의 VPC 리소스가 프라이빗 IP 주소를 사용하여 서로 통신할 수 있습니다. 또는 [VPC 피어링](?tab=vpcpeering#connect-from-other-regions)을 사용합니다.

## 동일한 리전에서 연결

1. AWS Management Console을 원하는 리전에 연결합니다.
1. VPC 대시보드의 **PrivateLink and Lattice**에서 **Endpoints**를 선택합니다.
1. **Create Endpoint**를 클릭합니다.
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC 대시보드의 엔드포인트 페이지" style="width:90%;" >}}
1. **Find service by name**을 선택합니다.
1. AWS PrivateLink를 설정하려는 서비스에 따라 _Service Name_ 텍스트 상자에 입력합니다.

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC 서비스 이름" style="width:70%;" >}}

| Datadog                   | PrivateLink 서비스 이름                                                               | 프라이빗 DNS 이름                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| 로그 (Agent HTTP 인테이크)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint" code="true">}}              |
| 로그 (User HTTP 인테이크)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint" code="true">}}                    |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| 메트릭                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| 컨테이너                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
| 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| 트레이스                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
| 데이터베이스 모니터링       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
| 원격 구성      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code> |

4. **Verify**를 클릭합니다. _Service name found_가 표시되지 않으면  [Datadog 지원팀][14]에 문의하세요.
5. Datadog VPC 서비스 엔드포인트와 피어링할 VPC 및 서브넷을 선택합니다.
6. **Enable DNS name**에 대해 _Enable for this endpoint_가 선택되어 있는지 확인합니다.

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:80%;" >}}

7. 원하는 보안 그룹을 선택하여 이 VPC 엔드포인트로 트래픽을 전송할 수 있는 항목을 제어합니다.

    **참고**: **보안 그룹은 TCP 포트 `443`에서 인바운드 트래픽을 허용해야 합니다**.

8. 화면 하단의 **Create endpoint**를 클릭합니다. 성공하면 다음 화면이 표시됩니다.

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC 엔드포인트 생성됨" style="width:60%;" >}}

9. VPC 엔드포인트 ID를 클릭하여 상태를 확인하세요.
10. 상태가 _Pending_에서 _Available_로 변경될 때까지 기다립니다. 최대 10분이 걸릴 수 있습니다. _Available_로 표시되면 AWS PrivateLink를 사용할 수 있습니다.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

11. v6.19 또는 v7.19보다 이전 버전의 Datadog Agent를 실행 중이고 로그 데이터를 수집하려면 Agent가 HTTPS를 통해 로그를 보내도록 구성되어 있는지 확인하세요. 데이터가 아직 없으면 [Agent `datadog.yaml` 구성 파일][15]에 다음을 추가하세요.

    ```yaml
    logs_config:
        force_use_http: true
    ```

    컨테이너 Agent를 사용하는 경우 대신 다음 환경 변수를 설정하세요.

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    이 구성은 AWS PrivateLink 및 Datadog Agent를 사용하여 Datadog에 로그를 보낼 때 필요하며 Lambda Extension에는 필요하지 않습니다. 자세한 내용은 [Agent 로그 수집][16]을 참조하세요.

12. Lambda Extension이 환경 변수 `DD_API_KEY_SECRET_ARN`으로 지정된 ARN을 사용하여 AWS Secrets Manager에서 Datadog API 키를 로드하는 경우 [Secrets Manager에 대한 VPC 엔드포인트를 생성][17]해야 합니다.

13. AWS PrivateLink를 통해 Datadog로 데이터를 보내려면 [Agent를 다시 시작][13]하세요.

## 다른 리전에서 연결

{{< tabs >}}
{{% tab "크로스 리전 PrivateLink 엔드포인트" %}}
1. AWS Management Console을 원하는 리전에 연결합니다.
1. VPC 대시보드의 **PrivateLink and Lattice**에서 **Endpoints**를 선택합니다.
1. **Create Endpoint**를 클릭합니다.
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC 대시보드의 엔드포인트 페이지" style="width:90%;" >}}
1. VPC 인터페이스 엔드포인트 설정을 구성합니다.
   1. (선택 사항) **Name tag**를 입력합니다.
   1. **Type**에서 **PrivateLink Ready partner services**를 선택합니다.
1. 크로스 리전 서포트를 통해 인터페이스 엔드포인트를 검색하고 구성합니다.
   1. **Service name**에 아래 [표](#privatelink-service-names)에서 유효한 PrivateLink 서비스 이름으로 서비스 이름을 입력합니다.
   1. **Service region**에서 **Enable Cross Region endpoint**를 클릭하고 **{{< region-param key="aws_private_link_cross_region" >}}**을 선택합니다.
   1. **Verify service**를 선택하고 _Service name verified_ 알림을 기다립니다.
      **참고:** 위의 단계를 완료한 후에도 서비스를 확인할 수 없는 경우 [Datadog 지원팀][1]에 문의하세요.
1. **Network Settings**에서 VPC 인터페이스 엔드포인트를 배포할 VPC를 선택합니다.
1. **Enable DNS name**이 선택되어 있는지 확인합니다.
1. **Subnets**에서 인터페이스 엔드포인트에 대해 VPC에서 하나 이상의 서브넷을 선택합니다.
1. **Security Groups**에서 VPC 엔드포인트로 트래픽을 전송할 수 있는 항목을 제어하려면 보안 그룹을 선택합니다.

   **참고**: 보안 그룹은 TCP 포트 443에서 인바운드 트래픽을 허용해야 합니다.
1. (선택 사항) **Name tag**를 제공하고 **Create endpoint**를 클릭합니다.
1. 엔드포인트 상태가 **Pending***에서 **Available**로 업데이트될 때까지 몇 분 정도 기다립니다. 최대 10분이 걸릴 수 있습니다. 예상보다 오래 걸리는 경우 [Datadog 지원팀][1]에 문의하세요.

엔드포인트 상태가 **Available**로 업데이트되면 이 엔드포인트를 사용하여 크로스 리전 AWS PrivateLink 엔드포인트를 통해 Datadog에 원격 측정 데이터를 전송할 수 있습니다.

## PrivateLink 서비스 이름

  | Datadog                   | PrivateLink 서비스 이름                                                               | 프라이빗 DNS 이름                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | 로그 (Agent HTTP 인테이크)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | 로그 (User HTTP 인테이크)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
  | 메트릭                | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | 컨테이너               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | 트레이스                | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | 데이터베이스 모니터링       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | 원격 구성      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

[1]: /ko/help/
{{% /tab %}}

{{% tab "VPC 피어링" %}}
1. AWS 콘솔을 리전 **{{< region-param key="aws_region" >}}**에 연결하고 VPC 엔드포인트를 생성합니다.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC 엔드포인트 생성" style="width:80%;" >}}

2. **Find service by name**을 선택합니다.
3. AWS PrivateLink를 설정하려는 서비스에 따라 _Service Name_ 텍스트 상자에 입력합니다.

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC 서비스 이름" style="width:90%;" >}}

| Datadog                   | PrivateLink 서비스 이름                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| 로그 (Agent HTTP 인테이크)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| 로그 (User HTTP 인테이크)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| 메트릭                  | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| 컨테이너               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| 프로파일링                | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| 트레이스                   | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| 데이터베이스 모니터링       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| 원격 구성      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. **Verify**를 클릭합니다. _Service name found_가 표시되지 않으면 [Datadog 지원팀][1]에 문의하세요.

5. Datadog VPC 서비스 엔드포인트와 피어링해야 하는 VPC와 서브넷을 선택합니다. VPC 피어링에는 DNS를 수동으로 구성해야 하기 때문에 **Enable DNS name**을 선택하지 마세요. 

6. 원하는 보안 그룹을 선택하여 이 VPC 엔드포인트로 트래픽을 전송할 수 있는 항목을 제어합니다.

    **참고**: **보안 그룹은 TCP 포트 `443`에서 인바운드 트래픽을 허용해야 합니다**.

7. 화면 하단에서 **Create endpoint**를 클릭합니다. 성공하면 다음 화면이 표시됩니다.

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC 엔드포인트 생성됨" style="width:80%;" >}}

8. VPC 엔드포인트 ID를 클릭하여 상태를 확인합니다.
9. 상태가 _Pending_에서 _Available_로 바뀔 때까지 기다립니다. 최대 10분이 걸릴 수 있습니다.
10. 엔드포인트를 만든 후 VPC 피어링을 사용하여 PrivateLink 엔드포인트를 다른 지역에서 사용할 수 있게 하여 PrivateLink를 통해 Datadog에 원격 측정을 보냅니다. 자세한 내용은 AWS의 [VPC 피어링 연결 작업][2] 페이지를 참조하세요.

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:80%;" >}}

### Amazon Route53

1. AWS PrivateLink 엔드포인트를 생성한 각 서비스에 대해 [Route53 프라이빗 호스팅 영역][3]을 생성합니다. {{< region-param key="aws_region" code="true" >}}에서 Attach 프라이빗 호스팅 영역을 VPC에 연결합니다.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 프라이빗 호스팅 영역 생성" style="width:80%;" >}}

아래 목록을 사용하여 서비스와 DNS 이름을 Datadog의 다른 부분에 매핑하세요.

  | Datadog                   | PrivateLink 서비스 이름                                                              | 프라이빗 이름                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | 로그 (Agent HTTP 인테이크)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | 로그 (User HTTP 인테이크)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
  | 메트릭                  | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | 컨테이너               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | 프로세스                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | 프로파일링                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | 트레이스                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | 데이터베이스 모니터링       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | 원격 구성      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

  AWS API인 `DescribeVpcEndpointServices`를 조사하거나 다음 명령을 사용하여 이 정보를 찾을 수도 있습니다.

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  예를 들어, {{< region-param key="aws_region" code="true" >}}에 대한 Datadog 메트릭 엔드포인트의 경우 

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

그러면 Agent 트래픽이 시작된 VPC와 연결하는 데 필요한 프라이빗 호스팅 영역 이름인<code>metrics.agent.{{< region-param key="dd_site" >}}</code>가 반환됩니다.  이 레코드를 재정의하면 모든 메트릭 관련 수집 호스트 이름을 가져옵니다.

2. 각각의 새로운 Route53 프라이빗 호스팅 영역 내에서 동일한 이름을 가진 A 레코드를 생성합니다. **Alias** 옵션을 토글한 다음 **Route traffic to**에서 **Alias to VPC endpoint**, **{{< region-param key="aws_region" >}}**을 선택하고 DNS 이름과 연결된 VPC 엔드포인트의 DNS 이름을 입력합니다.

   **참고**:
      - DNS 이름을 검색하려면 [엔드포인트 서비스 프라이빗 DNS 이름 설정 설명서 보기][4]를 참조하세요.
      - Agent는 버전이 지정된 엔드포인트(예:<code>[version]-app.agent.{{< region-param key="dd_site" >}}</code>)에 원격 분석을 전송하며 이는 CNAME 별칭을 통해 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>로 확인됩니다. 따라서 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>에 대한 프라이빗 호스팅 영역만 설정하면 됩니다.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="A 레코드 생성" style="width:90%;" >}}

3. Datadog PrivateLink 엔드포인트가 포함된 {{< region-param key="aws_region" code="true" >}} 의 VPC와 Datadog Agent가 실행되는 지역의 VPC 간에 VPC 피어링 및 라우팅을 구성합니다.

4. VPC가 다른 AWS 계정에 있는 경우 계속하기 전에 Datadog Agent가 포함된 VPC에 Route53 프라이빗 호스팅 영역과 연결할 수 있는 권한이 있어야 합니다. Datadog Agent가 실행되는 VPC의 지역 및 VPC ID를 사용하여 각 Route53 프라이빗 호스팅 영역에 대해 [VPC 연결 권한][5]을 생성합니다. AWS 콘솔에서는 이 옵션을 사용할 수 없습니다. AWS CLI, SDK 또는 API를 사용하여 구성해야 합니다.

5. Route53 호스팅 영역을 편집하여 다른 지역에 대한 VPC를 추가하세요.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Route53 프라이빗 호스팅 영역 편집" style="width:80%;" >}}

6. 프라이빗 호스팅 영역(PHZ)이 연결된 VPC는 ​​특히 PHZ가 연결된 VPC에서 `enableDnsHostnames` 및 `enableDnsSupport`과 같은 특정 설정이 활성화되어 있어야 합니다. [프라이빗 호스팅 영역 작업 시 고려 사항][6]을 참조하세요.

7. [Agent를 다시 시작][7]하여 AWS PrivateLink를 통해 Datadog에 데이터를 보냅니다.

#### DNS 확인 및 연결 문제 해결

DNS 이름은 {{< region-param key="aws_region" code="true" >}}에 있는 VPC의 CIDR 블록 내에 포함된 IP 주소로 확인되어야 하며 `port 443`에 대한 연결이 성공해야 합니다.

{{< img src="agent/guide/private_link/successful-setup.png" alt="포트 443에 대한 연결이 성공해야 합니다." style="width:80%;" >}}

DNS가 퍼블릭 IP 주소로 확인되는 경우 Route53 영역이 대체 지역의 VPC와 연결되지 **않았거나** A 레코드가 존재하지 않는 것입니다.

DNS가 올바르게 확인되었지만 `port 443`에 대한 연결이 실패하는 경우 VPC 피어링 또는 라우팅이 잘못 구성되었거나 포트 443이 {{< region-param key="aws_region" code="true" >}}에서 VPC의 CIDR 블록으로 아웃바운드되도록 허용되지 않았을 수 있습니다.

PHZ(프라이빗 호스팅 영역)가 연결된 VPC에는 몇 가지 설정이 켜져 있어야 합니다. 특히 PHZ가 연결된 VPC에서 `enableDnsHostnames` 및 `enableDnsSupport`를 활성화해야 합니다. [Amazon VPC 설정][6]을 참조하세요.

### Datadog 에이전트

1. 로그 데이터를 수집하는 경우  Agent가 HTTPS를 통해 로그를 전송하도록 설정되어 있는지 확인합니다. 데이터가 아직 없으면 [Agent `datadog.yaml`설정 파일][8]에 다음을 추가합니다.

    ```yaml
    logs_config:
        force_use_http: true
    ```

   컨테이너 Agent를 사용하는 경우 대신 다음 환경 변수를 설정합니다.

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    이 설정은 AWS PrivateLink 및 Datadog 에이전트를 사용해 Datadog에 로그를 보낼 때 필요하며, Lambda 확장에는 필요하지 않습니다. 자세한 내용은 [Agent 로그 수집][9]을 참고하세요.

2. Lambda 확장이 환경 변수 `DD_API_KEY_SECRET_ARN`가 지정한 ARN을 사용하여 AWS Secrets Manager에서 Datadog API 키를 로드하는 경우 [Secrets Manager용 VPC 엔드포인트 생성][10]이 필요합니다.

3. [에이전트를 다시 시작][7]합니다.


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

{{% /site-region %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}