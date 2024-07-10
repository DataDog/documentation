---
further_reading:
- link: /agent/logs
  tag: 설명서
  text: Agent로 로그 수집 활성화
- link: /integrations/amazon_web_services/#log-collection
  tag: 설명서
  text: AWS 서비스에서 로그 수집
title: AWS PrivateLink를 통해 Datadog에 연결
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-warning">Datadog PrivateLink는 선택한 Datadog 사이트를 지원하지 않습니다.</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

이 가이드는 Datadog와 함께 사용할 수 있도록 [AWS PrivateLink][1]를 설정하는 방법을 안내합니다.

## 개요

전체 프로세스는 로컬 Datadog 에이전트가 데이터를 보낼 수 있는 VPC의 내부 엔드포인트를 설정하는 것으로 구성됩니다. 그러면 VPC 엔드포인트가 Datadog의 VPC 내의 엔드포인트와 피어링됩니다.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC 다이어그램 스키마" >}}

## 설정

Datadog는 **{{< region-param key="aws_region" >}}**에서 AWS PrivateLink 엔드포인트를 노출합니다.

그러나 다른 지역에서 {{< region-param key="aws_region" code="true" >}}에 있는 Datadog의 PrivateLink 제품으로 트래픽을 라우팅하려면 지역 간 [Amazon VPC 피어링][2]을 사용하세요. 지역 간 VPC 피어링을 사용하면 서로 다른 AWS 리전에 걸쳐 VPC 간에 연결을 설정할 수 있습니다. 이를 통해 서로 다른 지역의 VPC 리소스가 프라이빗 IP 주소를 사용하여 서로 통신할 수 있습니다. 자세한 내용은 [Amazon VPC 피어링][2]을 참조하세요.

{{< tabs >}}
{{% tab "Connect from same region" %}}

1. AWS Console을 **{{< region-param key="aws_region" >}}** 지역에 연결하고 VPC 엔드포인트를 생성합니다.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC 엔드포인트 생성" style="width:60%;" >}}

2. **이름별 서비스 찾기**를 선택합니다.
3. AWS PrivateLink를 설정하려는 서비스에 따라 _서비스 이름_ 텍스트 상자를 채웁니다.

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC 서비스 이름" style="width:70%;" >}}

| Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint" code="true">}}              |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint" code="true">}}                    |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

4. **확인**을 클릭합니다. _찾은 서비스 이름_이 반환되지 않으면 [Datadog 지원][1]에 문의하세요.
5. Datadog VPC 서비스 엔드포인트와 피어링해야 하는 VPC 및 서브넷을 선택합니다.
6. **DNS 이름 활성화**에 대해 _이 엔드포인트에 대해 활성화_가 선택되어 있는지 확인하세요.

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="DNS 비공개 활성화" style="width:80%;" >}}

7. 원하는 보안 그룹을 선택하여 이 VPC 엔드포인트로 트래픽을 보낼 수 있는 항목을 제어합니다.

    **참고**: **보안 그룹은 TCP 포트 `443`에서 인바운드 트래픽을 허용해야 합니다**.

8. 화면 하단에서 **엔드포인트 생성**을 클릭합니다. 성공하면 다음이 표시됩니다.

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC 엔드포인트 생성됨" style="width:60%;" >}}

9. VPC 엔드포인트 ID를 클릭하여 상태를 확인합니다.
10. 상태가 _대기 중_에서 _사용 가능_으로 바뀔 때까지 기다립니다. 이 작업에는 최대 10분이 소요될 수 있습니다. _사용 가능_이 표시되면 AWS PrivateLink를 사용할 수 있습니다.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC 상태" style="width:60%;" >}}

11. 로그 데이터를 수집하는 경우 에이전트가 HTTPS를 통해 로그를 전송하도록 설정되어 있는지 확인하세요. 데이터가 아직 없으면 [에이전트  `datadog.yaml` 설정 파일][2]에 다음을 추가하세요.


    ```yaml
    logs_config:
        use_http: true
    ```

    컨테이너 에이전트를 사용하는 경우 대신 다음 환경 변수를 설정하세요.

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    이 설정은 AWS PrivateLink 및 Datadog 에이전트를 사용하여 Datadog에 로그를 보낼 때 필요하며 람다 확장에는 필요하지 않습니다. 자세한 내용은 [에이전트 로그 수집][3]을 참고하세요.

12. 람다 확장이  `DD_API_KEY_SECRET_ARN` 환경 변수로 지정된 ARN을 사용하여 AWS Secrets Manager에서 Datadog API 키를 로드하는 경우 [Secrets Manager에 대해 VPC 엔드포인트 생성][4]이 필요합니다.

13. [에이전트를 다시 시작][5]하여 AWS PrivateLink를 통해 Datadog에 데이터를 보냅니다.



[1]: /ko/help/
[2]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ko/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Connect from another region using VPC Peering" %}}

### Amazon VPC 피어링

1. AWS 콘솔을 **{{< region-param key="aws_region" >}}** 지역에 연결하고 VPC 엔드포인트를 생성합니다

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC 엔드포인트 생성" style="width:80%;" >}}

2. **이름으로 서비스 찾기**를 선택합니다.
3. AWS PrivateLink를 설정하려는 서비스에 따라 _서비스 이름_ 텍스트 상자를 채웁니다.

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC 서비스 이름" style="width:90%;" >}}

| Datadog                   | PrivateLink service name                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. **확인**을 클릭합니다. _찾은 서비스 이름_이 반환되지 않으면 [Datadog 지원][1]에 문의하세요.

5. 그런 다음 Datadog VPC 서비스 엔드포인트와 피어링해야 하는 VPC 및 서브넷을 선택합니다. VPC 피어링에는 DNS를 수동으로 설정해야 하므로 **DNS 이름 활성화**를 선택하지 마십시오.

6. 이 VPC 엔드포인트로 트래픽을 보낼 수 있는 항목을 제어하려면 원하는 보안 그룹을 선택합니다.

    **참고**: **보안 그룹은 TCP 포트  `443`에서 인바운드 트래픽을 허용해야 합니다**.

7. 화면 하단에서 **엔드포인트 생성**을 클릭합니다. 성공하면 다음이 표시됩니다.

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC 엔드포인트 생성됨" style="width:80%;" >}}

8. VPC 엔드포인트 ID를 클릭하여 상태를 확인합니다.
9. 상태가 _대기 중_에서 _사용 가능_으로 바뀔 때까지 기다립니다. 이 작업에는 최대 10분이 소요될 수 있습니다.
10. 엔드포인트를 생성한 후 VPC 피어링을 사용하여 PrivateLink 엔드포인트를 다른 지역에서 사용할 수 있도록 하고 PrivateLink를 통해 Datadog에 원격 분석을 보낼 수 있습니다. 자세한 내용은 AWS의 [VPC 피어링 연결 작업][2] 페이지를 참조하세요.

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC 상태" style="width:80%;" >}}

### Amazon Route53

1. AWS PrivateLink 엔드포인트를 생성한 각 서비스에 대해 [Route53 프라이빗 호스팅 영역][3]을 생성합니다. {{< region-param key="aws_region" code="true" >}} 에서 프라이빗 호스팅 영역을 VPC에 연결합니다.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 프라이빗 호스팅 영역 생성" style="width:80%;" >}}

아래 목록을 사용하여 서비스 및 DNS 이름을 Datadog의 다른 부분에 매핑하세요

  | Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
  | Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

  AWS API 또는  `DescribeVpcEndpointServices`를 조사하거나 다음 명령을 사용하여 이 정보를 찾을 수도 있습니다 

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  예: {{< region-param key="aws_region" code="true" >}}에 대한 Datadog 지표 엔드포인트의 경우:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

그러면 에이전트 트래픽이 발생하는 VPC에 연결하는 데 필요한 전용 호스트 영역 이름인 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>을 반환합니다. 이 레코드를 재정의하면 모든 메트릭과 관련된 데이터 수집 호스트 이름이 표시됩니다.

2. 각 새 Route53 전용 호스트 영역 내에서 동일한 이름의 A 레코드를 만듭니다. **Alias** 옵션을 전환한 다음 **Route traffic to**에서 **Alias to VPC endpoint**, **{{< region-param key="aws_region" >}}**를 선택하고 DNS 이름과 연결된 VPC 엔드포인트의 DNS 이름을 입력합니다.

   **참고**:
      - DNS 이름을 검색하려면 [엔드포인트 서비스 프라이빗 DNS 이름 설정 문서를 참고하세요.][4]
      - 에이전트는 버전화된 엔드포인트로 텔레메트리를 전송합니다. 예를 들어 <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code>로 전송해  CNAME 별칭을 통해 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>을 확인합니다. 따라서 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>의 프라이빗 호스트 영역만 설정하면 됩니다.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="레코드 생성" style="width:90%;" >}}

3. Datadog PrivateLink 엔드포인트과 Datadog 에이전트가 실행되는 영역의 VPC를 포함하는 {{< region-param key="aws_region" code="true" >}}에서 VPC 간의 VPC 피어링 및 라우팅을 설정합니다.

4. 다른 AWS 계정에 VPC가 있는 경우, 계속하기 전에 Datadog 에이전트를 포함하는 VPC에 Route53 프라이빗 호스트 영역을 연결할 수 있는 권한이 있어야 합니다. Datadog  에이전트가 실행되는 VPC의 영역 및 VPC ID를 사용하여 각 Route53 프라이빗 호스트 영역에 [VPC 연결 권한][5]을 생성합니다. 이 옵션은 AWS 콘솔에서 사용할 수 없습니다. AWS CLI, SDK, 또는 API를 사용해 설정해야 합니다.

5. Route53 호스트 영역을 편집해 다른 리전의 VPC를 추가합니다.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Route53 프라이빗 호스트 영역 편집" style="width:80%;" >}}

6. 프라이빗 호스트 영역(PHZ)이 연결된 VPC는 특정 설정, PHZ가 연결된 VPC에서 특히 `enableDnsHostnames` 및 `enableDnsSupport`으로 전환되어야 합니다. [전용 호스트 영역 작업 시 고려 사항][6]을 참고하세요.

7. [에이전트를 재시작][7]하여 AWS PrivateLink를 통해 데이터를 Datadog로 전송합니다.

#### DNS 확인 및 연결 트러블슈팅

DNS 이름은 {{< region-param key="aws_region" code="true" >}}의 VPC의 CIDR 블록에 포함된 IP 주소로 확인되어야 하며 `port 443`로 연결이 성공해야 합니다.

{{< img src="agent/guide/private_link/successful-setup.png" alt="포트 43 연결이 성공해야 함" style="width:80%;" >}}

공용 IP 주소로 DNS를 확인하는 경우 Route53 영역이 대체 리전의 VPC와 연결되어 있지 **않거나** A 레코드가 존재하지 않는다는 뜻입니다.

DNS가 올바르게 확인되나 `port 443` 연결에 실패하는 경우 VPC 피어링 또는 라우팅이 잘못 설정되거나 포트 443이 {{< region-param key="aws_region" code="true" >}}에서 VPC의 CIDR 블록으로 아웃바운드하는 것이 허용되지 않을 수 있습니다.

프라이빗 호스트 영역(PHZ)이 연결된 VPC는 몇 가지 설정을 변경해야 합니다. 구체적으로 PHZ가 연결된 VPC에서 `enableDnsHostnames` 및 `enableDnsSupport`를 설정해야 합니다. [Amazon VPC 설정][6]을 참고하세요.

### Datadog Agent

1. 로그 데이터를 수집하는 경우  Agent가 HTTPS를 통해 로그를 전송하도록 설정되어 있는지 확인합니다. 데이터가 아직 없으면 [Agent `datadog.yaml`설정 파일][8]에 다음을 추가합니다.

    ```yaml
    logs_config:
        force_use_http: true
    ```

    컨테이너 에이전트를 사용하는 경우 대신 다음 환경 변수를 설정합니다.

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    이 설정은 AWS PrivateLink 및 Datadog 에이전트를 사용해 Datadog에 로그를 보낼 때 필요하며, Lambda 확장에는 필요하지 않습니다. 자세한 내용은 [Agent 로그 수집][9]을 참고하세요.

2. Lambda 확장이 환경 변수 `DD_API_KEY_SECRET_ARN`로 지정된 ARN을 사용하여 AWS Secrets Manager에서 Datadog API 키를 로드하는 경우, [Secrets Manager용 VPC 엔드포인트 생성][10]을 해야합니다. 

3. [ Agent를 다시 시작][7]합니다.


[1]: /ko/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/ko/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
{{% /site-region %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}