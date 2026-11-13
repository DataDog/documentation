---
algolia:
  tags:
  - data transfer
  - data egress
  - private link
  - PrivateLink
  - Private Service Connect
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: 아키텍처 센터
  text: 교차 리전 AWS PrivateLink를 사용하여 Datadog에 텔레메트리 데이터 전송
- link: https://aws.amazon.com/solutions/case-studies/textnow-privatelink-case-study/
  tag: AWS 케이스 분석
  text: TextNow는 AWS PrivateLink를 통해 데이터 전송 수수료를 93% 절감합니다
- link: /logs/log_configuration/flex_logs/#potential-sources-for-sending-directly-to-flex-logs
  tag: 설명서
  text: Flex Logs로 직접 전송 가능한 잠재적 소스
title: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
---
## 개요 {#overview}

조직이 성장함에 따라 클라우드 공급자 간에 Datadog으로 전송되는 데이터 양이 증가할 수 있습니다. 클라우드 공급자는 공용 IP 주소를 통해 클라우드 스토리지에서 데이터를 전송할 때 *데이터 전송* 수수료 또는 *데이터 송신* 수수료를 부과합니다. 이는 조직의 클라우드 비용 청구서에서 가장 큰 비중을 차지하는 항목 중 하나가 될 수 있습니다. 

프라이빗 네트워크를 통해 데이터를 전송하면 공용 인터넷을 사용하지 않고 데이터 전송 수수료를 절감할 수 있습니다. 프라이빗 링크를 통한 비용 절감을 예로 들자면, 미국 동부 AWS 리전에서는 1GB 전송 시 $0.09의 비용이 발생하지만, AWS PrivateLink 사용 시 데이터 전송 비용이 GB당 $0.01로 감소합니다.

## 지원되는 클라우드 공급자 {#supported-cloud-providers}

<div class="alert alert-danger">올바른 Datadog 사이트를 {{< region-param key="dd_site_name" code="true" >}} 선택했는지 확인하세요. 클라우드별 프라이빗 링크는 모든 Datadog 사이트에서 사용할 수 있는 것은 아닙니다.</div>

{{< whatsnext desc="다음 링크를 통해 Datadog에 연결합니다." >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us" >}}US1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap1" >}}AP1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap2" >}}AP2 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=uk1" >}}UK1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}US3 - Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}US5 - Google Cloud Private Service Connect{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/?site=eu" >}}EU1 - Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 도구 {#additional-tools}

프라이빗 링크로 전환한 후에는 다음 기능을 사용하여 사용량을 모니터링하고 데이터 비용을 보다 효과적으로 제어할 수 있습니다.
- Datadog의 [Cloud Network Monitoring][1]을 사용하여 조직에서 처리량이 가장 많은 애플리케이션을 파악하세요.
- [Cloud Cost Management][2] 도구로 클라우드 비용 절감 효과를 확인하고 모니터링할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/cloud_network_monitoring/
[2]: /ko/cloud_cost_management/
[3]: /ko/agent/guide/private-link/
[4]: /ko/agent/guide/azure-private-link/
[5]: /ko/agent/guide/gcp-private-service-connect/