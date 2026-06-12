---
aliases:
- /ko/logs/security/
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
- link: /data_security/pci_compliance/
  tag: 설명서
  text: PCI 준수 Datadog 조직 설정하기
- link: https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/
  tag: 블로그
  text: Datadog의 PCI 준수 로그 관리 및 애플리케이션 성능 모니터링(APM) 공지
title: 로그 관리 데이터 보안
---

<div class="alert alert-info">이 페이지는 Datadog으로 전송되는 데이터의 보안에 관한 것입니다. 클라우드 및 애플리케이션 보안 제품 및 기능을 찾으려면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

로그 관리 프로덕트는 여러 [환경 및 형식][1]을 지원하므로 원하는 거의 모든 데이터를 Datadog에 제출할 수 있습니다. 본 문서에서는 로그를 Datadog에 제출할 때 사용할 수 있는 주요 보안 보장 및 필터링 제어에 대해 설명합니다.

**참고**: 로그는 다양한 Datadog 프로덕트에서 확인할 수 있습니다. 애플리케이션 성능 모니터링(APM) 트레이스 페이지에 표시되는 로그를 포함하여 Datadog UI에서 표시되는 모든 로그는 로그 관리 프로덕트의 일부입니다.

## 정보 보안

Datadog 에이전트는 HTTPS 또는 포트 10516의 TLS 암호화 TCP 연결을 통해 로그를 Datadog으로 제출하며, 이 떄 아웃바운드 통신이 필요합니다([에이전트 로그 전송][2] 참조).

Datadog은 유휴 상태인 인덱싱된 로그에 대칭형 암호화(AES-256)를 사용합니다. 인덱싱된 로그는 사용자가 정의한 보존 기간이 만료되면 Datadog 플랫폼에서 삭제됩니다.

## 로그 필터링

버전 6 이상에서는 에이전트가 Datadog 애플리케이션으로 전송하는 로그를 필터링하도록 에이전트를 설정할 수 있습니다. 특정 로그의 제출을 방지하려면 `log_processing_rules` [설정][3]을 **exclude_at_match** 또는 **include_at_match** `type`과 함께 사용합니다. 이 설정을 사용하면 하나 이상의 정규식이 포함된 목록을 생성할 수 있으며, 에이전트가 제공된 포함 또는 제외 규칙에 따라 로그를 필터링하도록 지시합니다.

## 로그 난독화

버전 6 이상에서는 에이전트가 Datadog 애플리케이션으로 전송하는 로그 내의 특정 패턴을 난독화하도록 에이전트를 설정할 수 있습니다. 특정 로그의 민감한 시퀀스를 마스킹하려면 `log_processing_rules` [설정][4]을 **mask_sequences** `type`과 함께 사용합니다. 이 설정을 사용하면 하나 이상의 정규식이 포함된 목록을 생성할 수 있으며, 에이전트가 로그 내의 민감한 데이터를 수정하도록 지시합니다.

또는 클라우드나 에이전트에서 [민감한 데이터 스캐너][7]를 사용하여 민감한 데이터를 식별, 태깅 및 수정합니다. 민감한 데이터 스캐너에서 스캔 그룹을 설정하여 스캔할 데이터를 정의한 다음, 스캔 규칙을 설정하여 데이터 내에서 일치하는 민감한 정보를 결정합니다. Datadog은 신용카드 번호, 이메일 주소, IP 주소, API 키 등과 같은 민감한 정보를 감지하기 위해 미리 정의된 규칙 라이브러리를 제공합니다. 또한 정규식 기반 스캔 규칙을 정의하여 민감한 정보를 식별할 수도 있습니다.

민감한 데이터 스캐너는 [통합 관측성 파이프라인][9]의 [프로세서][8]로도 사용할 수 있습니다. 관측성 파이프라인을 사용하면 자체 인프라스트럭처 내에서 로그를 수집 및 처리한 다음 다운스트림 통합으로 라우팅할 수 있습니다.

## HIPAA 사용 고객

{{% hipaa-customers %}}

## 로그 관리에 대한 PCI DSS 규정 준수

{{< site-region region="us" >}}

<div class="alert alert-danger">
로그 관리에 대한 PCI DSS 규정 준수는 <a href="/getting_started/site/">US1 사이트의 Datadog 조직에서만 사용 가능합니다</a>.
</div>

Datadog을 사용하면 고객은 요청 시에 로그를 PCI DSS를 준수하는 Datadog 조직으로 전송할 수 있습니다. PCI를 준수하는 Datadog 조직을 설정하려면 다음 단계를 따르세요.

{{% pci-logs %}}

자세한 내용은 [PCI DSS 규정 준수][1]를 참조하세요. 애플리케이션 성능 모니터링(APM)에 대한 PCI 규정 준수를 활성화하려면 [애플리케이션 성능 모니터링(APM)의 PCI DSS 규정 준수][1]를 참조하세요.

[1]: /ko/data_security/pci_compliance/
[2]: /ko/data_security/pci_compliance/?tab=apm

{{< /site-region >}}

{{< site-region region="us3,us5,eu,gov,ap1" >}}

{{< region-param key="dd_site_name" >}} 사이트에서는 로그 관리에 대한 PCI DSS 규정 준수를 사용할 수 없습니다.

{{< /site-region >}}

## 엔드포인트 암호화

모든 로그 제출 엔드포인트는 암호화됩니다. 이러한 레거시 엔드포인트는 계속 지원됩니다.

* `tcp-encrypted-intake.logs.datadoghq.com`
* `lambda-tcp-encrypted-intake.logs.datadoghq.com`
* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_collection/
[2]: /ko/agent/logs/log_transport
[3]: /ko/agent/logs/advanced_log_collection/#filter-logs
[4]: /ko/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /ko/logs/explorer/#share-views
[6]: https://www.datadoghq.com/legal/hipaa-eligible-services/
[7]: /ko/sensitive_data_scanner/
[8]: /ko/observability_pipelines/processors/sensitive_data_scanner
[9]: /ko/observability_pipelines/