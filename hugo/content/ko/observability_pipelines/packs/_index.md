---
description: 소스 및 대상별로 Observability Pipelines 팩을 탐색합니다.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 모든 SIEM 또는 로깅 공급업체에서 아카이브된 로그를 리하이드레이션하기
multifiltersearch:
  data:
  - description: 이 팩은 신고된 메시지 전반에서 악성 abuse-mailbox 캠페인과 실패한 조치 시도를 표시합니다.
    destination: Any destination
    pack: '[Abnormal.ai - Abuse Campaigns](/observability_pipelines/packs/abnormal_ai_abuse_campaigns/)'
    source: Abnormal.ai
  - description: 이 팩은 Abnormal.ai가 분석하지 않은 사용자 신고 악용 신고 메일함 메시지의 백로그를 추적합니다.
    destination: Any destination
    pack: '[Abnormal.ai - Abuse Mailbox Messages Not Analyzed](/observability_pipelines/packs/abnormal_ai_abuse_mailbox_messages/)'
    source: Abnormal.ai
  - description: 이 팩은 Abnormal.ai 포털 감사 추적에서 실패한 관리자 액션 및 대규모 수정 이벤트에 플래그를 지정합니다.
    destination: Any destination
    pack: '[Abnormal.ai - Audit Logs](/observability_pipelines/packs/abnormal_ai_audit_logs/)'
    source: Abnormal.ai
  - description: 이 팩은 BEC(비즈니스 이메일 침해), 갈취, VIP를 대상으로 하는 자격 증명 피싱과 같이 미해결 고위험 이메일
      위협을 플래그합니다.
    destination: Any destination
    pack: '[Abnormal.ai - Threats](/observability_pipelines/packs/abnormal_ai_threats/)'
    source: Abnormal.ai
  - description: 이 팩은 Kerberos 인증, 디렉터리 서비스 변경 및 DCSync 복제 악용과 같은 Active Directory
      Domain Services 이벤트를 처리합니다.
    destination: Any destination
    pack: '[Active Directory](/observability_pipelines/packs/active_directory/)'
    source: Active Directory
  - description: Akamai 로그는 엣지에서의 클라이언트 요청 및 응답을 보여줍니다.
    destination: Any destination
    pack: '[Akamai CDN](/observability_pipelines/packs/akamai_cdn/)'
    source: Akamai
  - description: AlphaSOC 발견 결과는 네트워크 전반에서 탐지된 DNS 및 IP 위협을 표시합니다.
    destination: Any destination
    pack: '[AlphaSOC Findings](/observability_pipelines/packs/alphasoc_findings/)'
    source: AlphaSOC
  - description: AWS CloudFront 로그는 요청, 캐시 사용 및 엣지 활동을 보여줍니다.
    destination: Any destination
    pack: '[Amazon CloudFront](/observability_pipelines/packs/amazon_cloudfront/)'
    source: AWS
  - description: 이 팩은 Amazon Connect 로그에서 연락 및 에이전트 관련 신호를 추출하여 응답 포기된 통화와 사기 위험을
      표시합니다.
    destination: Any destination
    pack: '[Amazon Connect](/observability_pipelines/packs/amazon_connect/)'
    source: AWS
  - description: Amazon VPC Flow Logs는 VPC 리소스 간의 네트워크 트래픽을 캡처합니다.
    destination: Any destination
    pack: '[Amazon VPC Flow Logs](/observability_pipelines/packs/amazon_vpc_flow_logs/)'
    source: AWS
  - description: 이 팩은 애플리케이션 컨트롤러 및 API 서버에서 Argo CD 동기화, 상태 및 RBAC 이벤트를 처리합니다.
    destination: Any destination
    pack: '[Argo CD](/observability_pipelines/packs/argo_cd/)'
    source: Argo CD
  - description: Auth0 로그에는 로그인, 가입, MFA 및 API 활동이 포함됩니다.
    destination: Any destination
    pack: '[Auth0](/observability_pipelines/packs/auth0/)'
    source: Auth0
  - description: Aviatrix Controller 감사 로그는 API 명령, 사용자 속성 및 결과를 캡처합니다.
    destination: Any destination
    pack: '[Aviatrix Controller API Audit](/observability_pipelines/packs/aviatrix_controller_api_audit/)'
    source: Aviatrix
  - description: Aviatrix FQDN 방화벽 로그는 송신 도메인 요청과 정책 집행 기록을 저장합니다.
    destination: Any destination
    pack: '[Aviatrix FQDN Firewall](/observability_pipelines/packs/aviatrix_fqdn_firewall/)'
    source: Aviatrix
  - description: Aviatrix 게이트웨이 네트워크 통계 로그는 인터페이스별 수신/송신 바이트 수, 패킷 수 및 네트워크 패킷 드롭
      이벤트를 보여줍니다.
    destination: Any destination
    pack: '[Aviatrix Gateway Network Stats](/observability_pipelines/packs/aviatrix_gateway_network_stats/)'
    source: Aviatrix
  - description: Aviatrix Gateway System Stats는 클라우드 게이트웨이별 CPU, 메모리 및 디스크 사용률을 제공합니다.
    destination: Any destination
    pack: '[Aviatrix Gateway System Stats](/observability_pipelines/packs/aviatrix_gateway_system_stats/)'
    source: Aviatrix
  - description: Aviatrix DCF Microsegmentation 로그는 클라우드 게이트웨이 전반의 동서 정책 적용을 캡처합니다.
    destination: Any destination
    pack: '[Aviatrix L4 Microsegmentation](/observability_pipelines/packs/aviatrix_l4_microsegmentation/)'
    source: Aviatrix
  - description: Aviatrix L7/TLS Inspection 로그는 TLS 세션 컨텍스트 및 정책 적용을 캡처합니다.
    destination: Any destination
    pack: '[Aviatrix L7/TLS Inspection](/observability_pipelines/packs/aviatrix_l7_tls_inspection/)'
    source: Aviatrix
  - description: Aviatrix Suricata IDS/IPS 경보는 게이트웨이 네트워크 트래픽의 서명 일치를 캡처합니다.
    destination: Any destination
    pack: '[Aviatrix Suricata IDS/IPS](/observability_pipelines/packs/aviatrix_suricata_ids_ips/)'
    source: Aviatrix
  - description: Aviatrix 터널 상태 로그는 Site2Cloud 및 트랜짓 링크의 상태 변경, 이벤트, 실패 원인을 기록합니다.
    destination: Any destination
    pack: '[Aviatrix Tunnel Status](/observability_pipelines/packs/aviatrix_tunnel_status/)'
    source: Aviatrix
  - description: Aviatrix VPN 게이트웨이 로그는 사용자별 세션 수명 주기, 인증 이벤트 및 게이트웨이 트래픽 양을 캡처합니다.
    destination: Any destination
    pack: '[Aviatrix VPN Session](/observability_pipelines/packs/aviatrix_vpn_session/)'
    source: Aviatrix
  - description: AWS ALB는 이를 통해 라우팅되는 HTTP 요청 활동을 기록합니다.
    destination: Any destination
    pack: '[AWS Application Load Balancer Logs](/observability_pipelines/packs/aws_alb/)'
    source: AWS
  - description: AWS CloudTrail은 AWS 서비스 전반의 API 호출 및 계정 활동을 기록합니다.
    destination: Any destination
    pack: '[AWS CloudTrail](/observability_pipelines/packs/aws_cloudtrail/)'
    source: AWS
  - description: AWS CloudWatch Logs는 Lambda, ECS 등에서 로그 스트림을 캡처합니다.
    destination: Any destination
    pack: '[AWS CloudWatch Logs](/observability_pipelines/packs/aws_cloudwatch_logs/)'
    source: AWS
  - description: AWS Config는 리소스 구성 변경 사항을 모니터링하고 기록합니다.
    destination: Any destination
    pack: '[AWS Config](/observability_pipelines/packs/aws_config/)'
    source: AWS
  - description: AWS ELBs는 Classic Load Balancers에서 HTTP 및 HTTPS 요청을 캡처합니다.
    destination: Any destination
    pack: '[AWS Elastic Load Balancer Logs](/observability_pipelines/packs/aws_elb/)'
    source: AWS
  - description: AWS GuardDuty는 AWS 계정의 위협을 탐지합니다.
    destination: Any destination
    pack: '[AWS GuardDuty](/observability_pipelines/packs/aws_guardduty/)'
    source: AWS
  - description: AWS Lambda 로그는 호출, 오류 및 콜드 스타트를 캡처합니다.
    destination: Any destination
    pack: '[AWS Lambda](/observability_pipelines/packs/aws_lambda/)'
    source: AWS
  - description: AWS NLBs는 연결 활동 및 성능 데이터를 캡처합니다.
    destination: Any destination
    pack: '[AWS Network Load Balancer Logs](/observability_pipelines/packs/aws_nlb/)'
    source: AWS
  - description: AWS Route 53은 AWS 인프라 전반의 DNS 쿼리를 캡처합니다.
    destination: Any destination
    pack: '[AWS Route 53](/observability_pipelines/packs/aws_route_53/)'
    source: AWS
  - description: AWS Security Hub는 AWS 전반의 보안 발견 결과를 집계합니다.
    destination: Any destination
    pack: '[AWS Security Hub](/observability_pipelines/packs/aws_security_hub/)'
    source: AWS
  - description: AWS WAF는 CloudWatch, S3 또는 Firehose에서 AWS WAF 로그를 캡처합니다.
    destination: Any destination
    pack: '[AWS WAF](/observability_pipelines/packs/aws_waf/)'
    source: AWS
  - description: Azure Network Security Group v2 흐름 로그는 연결별 허용/거부 결정 및 바이트 수를 기록합니다.
    destination: Any destination
    pack: '[Azure NSG](/observability_pipelines/packs/azure_nsg/)'
    source: Azure
  - description: BlueCat BDDS syslog는 DNS 쿼리 및 DHCP 리스를 캡처합니다.
    destination: Any destination
    pack: '[BlueCat DNS](/observability_pipelines/packs/bluecat_dns/)'
    source: BlueCat
  - description: 이 팩은 syslog 접두사 유무에 관계없이 CEF 형식의 Check Point 로그를 처리합니다.
    destination: Any destination
    pack: '[Check Point](/observability_pipelines/packs/checkpoint/)'
    source: Check Point
  - description: Cisco ACI syslog 이벤트는 패브릭 상태, 엔드포인트 이동 및 관리자 활동을 기록합니다.
    destination: Any destination
    pack: '[Cisco ACI](/observability_pipelines/packs/cisco_aci/)'
    source: Cisco
  - description: Cisco ASA 방화벽 로그는 트래픽, VPN 및 보안 경보에 대한 syslog 이벤트를 캡처합니다.
    destination: Any destination
    pack: '[Cisco ASA](/observability_pipelines/packs/cisco_asa/)'
    source: Cisco
  - description: 이 팩은 Cisco ASA syslog 이벤트를 Google Security Operations의 UDM 스키마에 매핑합니다.
    destination: Google SecOps
    pack: '[Cisco ASA - Google SecOps](/observability_pipelines/packs/cisco_asa_google_secops/)'
    source: Cisco
  - description: 이 팩은 구문 분석된 Cisco ASA syslog 이벤트를 Microsoft Sentinel의 CommonSecurityLog
      스키마에 매핑합니다.
    destination: Microsoft Sentinel
    pack: '[Cisco ASA - Microsoft Sentinel](/observability_pipelines/packs/cisco_asa_microsoft_sentinel/)'
    source: Cisco
  - description: Cisco FTD syslog 이벤트는 액세스 제어, 침입 방지, 파일 탐지 및 VPN을 다룹니다.
    destination: Any destination
    pack: '[Cisco FTD](/observability_pipelines/packs/cisco_ftd/)'
    source: Cisco
  - description: Cisco IOS syslog는 보안, 인증 및 라우팅 이벤트를 캡처합니다.
    destination: Any destination
    pack: '[Cisco IOS](/observability_pipelines/packs/cisco_ios/)'
    source: Cisco
  - description: Cisco IOS Traceback 이벤트는 소프트웨어 결함, 메모리 오류 및 CPU 문제를 나타냅니다.
    destination: Any destination
    pack: '[Cisco IOS Traceback](/observability_pipelines/packs/cisco_ios_traceback/)'
    source: Cisco
  - description: Cisco Meraki는 어플라이언스 이벤트, 흐름, VPN 방화벽, NAT 흐름 및 URL 활동을 캡처합니다.
    destination: Any destination
    pack: '[Cisco Meraki](/observability_pipelines/packs/cisco_meraki/)'
    source: Cisco
  - description: 이 팩은 구문 분석된 Cisco Meraki syslog 이벤트를 Microsoft Sentinel의 Syslog 표
      스키마에 매핑합니다.
    destination: Microsoft Sentinel
    pack: '[Cisco Meraki - Microsoft Sentinel](/observability_pipelines/packs/cisco_meraki_microsoft_sentinel/)'
    source: Cisco
  - description: Cloudflare 로그는 엣지 트래픽, 성능 및 보안 정보를 보여줍니다.
    destination: Any destination
    pack: '[Cloudflare](/observability_pipelines/packs/cloudflare/)'
    source: Cloudflare
  - description: Falcon Data Replicator(FDR)는 엔드포인트 탐지 및 대응 기능을 제공합니다.
    destination: Any destination
    pack: '[CrowdStrike FDR](/observability_pipelines/packs/crowdstrike/)'
    source: CrowdStrike
  - description: 이 벤더 중립적인 DNS 쿼리/응답 스트림에는 터널링 및 DGA 비코닝 지표가 포함됩니다.
    destination: Any destination
    pack: '[DNS Stream](/observability_pipelines/packs/dns_stream/)'
    source: DNS Stream
  - description: 이 팩은 Exabeam으로 전송된 Cisco ASA 방화벽 로그를 처리하고 ASA 코드를 기준으로 필터링하여 조치할
      필요가 없는 syslog 노이즈를 제거합니다.
    destination: Exabeam
    pack: '[Exabeam - Cisco ASA](/observability_pipelines/packs/exabeam_cisco_asa/)'
    source: Cisco
  - description: 이 팩은 Exabeam으로 전송된 CrowdStrike Falcon Data Replicator 이벤트를 처리하고 센서
      및 텔레메트리 노이즈를 드롭합니다.
    destination: Exabeam
    pack: '[Exabeam - CrowdStrike FDR](/observability_pipelines/packs/exabeam_crowdstrike_fdr/)'
    source: CrowdStrike
  - description: 이 팩은 Exabeam으로 전송된 FortiGate 방화벽 로그를 처리하고 일반적인 트래픽과 상태 확인 관련 노이즈를
      필터링합니다.
    destination: Exabeam
    pack: '[Exabeam - Fortinet FortiGate](/observability_pipelines/packs/exabeam_fortinet_fortigate/)'
    source: Fortinet
  - description: 이 팩은 Exabeam으로 전송된 PAN-OS syslog를 처리하고 빈 트래픽 로그와 시작 이벤트가 중복된 트래픽
      로그를 필터링하며 원시 CSV는 그대로 유지합니다.
    destination: Exabeam
    pack: '[Exabeam - Palo Alto](/observability_pipelines/packs/exabeam_palo_alto/)'
    source: Palo Alto
  - description: 이 팩은 Exabeam으로 전송된 SentinelOne EDR 이벤트를 처리하고 대용량 이벤트 유형을 샘플링하여 수집
      비용을 절감합니다.
    destination: Exabeam
    pack: '[Exabeam - SentinelOne Cloud Funnel](/observability_pipelines/packs/exabeam_sentinelone_cloud_funnel/)'
    source: SentinelOne
  - description: 이 팩은 Exabeam으로 전송된 Windows 이벤트 로그를 처리하고 Exabeam 파서에서 사용하는 코드에 해당하는
      로그만 남기도록 필터링하며, 구문 분석을 위해 원시 XML은 그대로 유지합니다.
    destination: Exabeam
    pack: '[Exabeam - Windows](/observability_pipelines/packs/exabeam_windows/)'
    source: Windows
  - description: 이 팩은 Exabeam으로 전송된 Zscaler ZIA 웹, ZIA DNS 및 ZPA 로그를 처리하고 일상적인 트래픽을
      필터링 및 샘플링합니다.
    destination: Exabeam
    pack: '[Exabeam - Zscaler](/observability_pipelines/packs/exabeam_zscaler/)'
    source: Zscaler
  - description: ExtraHop Reveal(x) 탐지 결과는 네트워크 위협과 비정상적인 행동을 보여줍니다.
    destination: Any destination
    pack: '[ExtraHop](/observability_pipelines/packs/extrahop/)'
    source: ExtraHop
  - description: 이 팩은 Microsoft Sentinel 수집을 위해 ExtraHop Reveal(x) 네트워크 탐지에 심각도와 IP를
      태그합니다.
    destination: Microsoft Sentinel
    pack: '[ExtraHop - Microsoft Sentinel](/observability_pipelines/packs/extrahop_microsoft_sentinel/)'
    source: ExtraHop
  - description: F5 로그는 트래픽, 보안 정책 및 침입 이벤트를 캡처합니다.
    destination: Any destination
    pack: '[F5](/observability_pipelines/packs/f5/)'
    source: F5
  - description: Fastly CDN 로그는 클라이언트 요청, 캐시 상태 및 전송 성능을 기록합니다.
    destination: Any destination
    pack: '[Fastly](/observability_pipelines/packs/fastly/)'
    source: Fastly
  - description: 이 팩은 FortiGate 로그를 Microsoft Sentinel의 CommonSecurityLog 스키마에 매핑합니다.
    destination: Microsoft Sentinel
    pack: '[Fortinet - Microsoft Sentinel](/observability_pipelines/packs/fortinet_microsoft_sentinel/)'
    source: Fortinet
  - description: Fortinet 방화벽 로그는 허용된 트래픽, 거부된 트래픽 및 기타 네트워크 트래픽을 기록합니다.
    destination: Any destination
    pack: '[Fortinet Firewall](/observability_pipelines/packs/fortinet_firewall/)'
    source: Fortinet
  - description: GCP VPC 방화벽 로그는 허용 및 거부된 트래픽을 기록합니다.
    destination: Any destination
    pack: '[GCP Firewall](/observability_pipelines/packs/gcp_firewall/)'
    source: Google Cloud
  - description: Google Cloud Audit logs는 관리자 활동 및 정책 위반을 캡처합니다.
    destination: Any destination
    pack: '[Google Cloud Audit](/observability_pipelines/packs/google_cloud_audit/)'
    source: Google Cloud
  - description: 이 팩은 AWS VPC 흐름 레코드를 Google Security Operations의 UDM 스키마에 매핑합니다.
    destination: Google SecOps
    pack: '[Google SecOps - AWS VPC](/observability_pipelines/packs/google_secops_aws_vpc/)'
    source: AWS
  - description: 이 팩은 Fortinet 방화벽 로그를 Google Security Operations의 UDM 스키마에 매핑합니다.
    destination: Google SecOps
    pack: '[Google SecOps - Fortinet Firewall](/observability_pipelines/packs/google_secops_fortinet_firewall/)'
    source: Fortinet
  - description: 이 팩은 Google Security Operations에서 PAN-OS 로그를 UDM 스키마로 재매핑합니다.
    destination: Google SecOps
    pack: '[Google SecOps - Palo Alto Firewall](/observability_pipelines/packs/google_secops_palo_alto_firewall/)'
    source: Palo Alto
  - description: 이 팩은 Windows 보안 이벤트를 Google Security Operations의 UDM 스키마에 매핑합니다.
    destination: Google SecOps
    pack: '[Google SecOps - Windows Event Log](/observability_pipelines/packs/google_secops_windows_event_log/)'
    source: Windows
  - description: HAProxy Ingress 로그는 Kubernetes 인그레스 트래픽이 라우팅되고 처리되는 방식을 기록합니다.
    destination: Any destination
    pack: '[HAProxy Ingress](/observability_pipelines/packs/haproxy_ingress/)'
    source: HAProxy
  - description: Infoblox NIOS syslog는 어플라이언스의 DNS, DHCP, 감사 및 CEF 활동을 캡처합니다.
    destination: Any destination
    pack: '[Infoblox](/observability_pipelines/packs/infoblox/)'
    source: Infoblox
  - description: Istio Proxy 로그는 Envoy가 처리하는 인바운드 및 아웃바운드 트래픽을 캡처합니다.
    destination: Any destination
    pack: '[Istio Proxy](/observability_pipelines/packs/istio_proxy/)'
    source: Istio
  - description: Juniper SRX 방화벽은 네트워크 세션 데이터를 기록합니다.
    destination: Any destination
    pack: '[Juniper SRX Firewall Traffic Logs](/observability_pipelines/packs/juniper_srx_traffic/)'
    source: Juniper
  - description: 이 팩은 kube-proxy 오류 및 경고만 유지하고 매 주기마다 발생하는 일상적인 iptables 동기화 노이즈를
      삭제합니다.
    destination: Any destination
    pack: '[Kube Proxy](/observability_pipelines/packs/kube_proxy/)'
    source: Kubernetes
  - description: 이 팩은 클래식 Windows DNS 서버 디버그 텍스트 로그(dns.log)를 구문 분석하고 쿼리 이름과 응답 코드를
      디코딩합니다.
    destination: Any destination
    pack: '[Microsoft DNS](/observability_pipelines/packs/microsoft_dns/)'
    source: Microsoft
  - description: 이 팩은 AWS WAF 로그에 MITRE ATT&CK 전술 및 기법 태그를 지정합니다.
    destination: Any destination
    pack: '[MITRE ATT&CK AWS WAF Enrichment](/observability_pipelines/packs/mitre_attack_aws_waf_enrichment/)'
    source: AWS
  - description: 이 팩은 CloudTrail 로그에 MITRE ATT&CK 전술 및 기법 태그를 지정합니다.
    destination: Any destination
    pack: '[MITRE ATT&CK CloudTrail Enrichment](/observability_pipelines/packs/mitre_attack_cloudtrail_enrichment/)'
    source: AWS
  - description: 이 팩은 FortiGate 로그에 MITRE ATT&CK 전술 및 기법 태그를 지정합니다.
    destination: Any destination
    pack: '[MITRE ATT&CK FortiGate Enrichment](/observability_pipelines/packs/mitre_attack_fortigate_enrichment/)'
    source: Fortinet
  - description: 이 팩은 Okta 로그에 MITRE ATT&CK 전술 및 기법을 태그합니다.
    destination: Any destination
    pack: '[MITRE ATT&CK Okta Enrichment](/observability_pipelines/packs/mitre_attack_okta_enrichment/)'
    source: Okta
  - description: 이 팩은 Palo Alto 로그에 MITRE ATT&CK 전술과 기법을 태그로 지정합니다.
    destination: Any destination
    pack: '[MITRE ATT&CK Palo Alto Enrichment](/observability_pipelines/packs/mitre_attack_palo_alto_enrichment/)'
    source: Palo Alto
  - description: 이 팩은 Windows 이벤트 로그에 MITRE ATT&CK 전술 및 기법 태그를 지정합니다.
    destination: Any destination
    pack: '[MITRE ATT&CK Windows Enrichment](/observability_pipelines/packs/mitre_attack_windows_enrichment/)'
    source: Windows
  - description: Netskope 로그는 클라우드 앱 사용, 정책 및 보안 이벤트를 캡처합니다.
    destination: Any destination
    pack: '[Netskope](/observability_pipelines/packs/netskope/)'
    source: Netskope
  - description: NGINX 로그는 웹 서버의 클라이언트 요청, 응답 및 오류를 기록합니다.
    destination: Any destination
    pack: '[NGINX](/observability_pipelines/packs/nginx/)'
    source: NGINX
  - description: Okta 로그는 인증, 사용자 활동 및 정책 이벤트를 보여줍니다.
    destination: Any destination
    pack: '[Okta](/observability_pipelines/packs/okta/)'
    source: Okta
  - description: 이 팩은 OpenAI 조직 감사 로그에서 로그인 실패, 새 API 키, 권한 변경 사항을 표시합니다.
    destination: Any destination
    pack: '[OpenAI - Audit Logs](/observability_pipelines/packs/openai_audit_logs/)'
    source: OpenAI
  - description: OTLP/JSON 로그는 각 페이로드에서 이벤트를 resourceLogs, scopeLogs, logRecords 배열
      아래에 3단계로 중첩하여 저장합니다.
    destination: Any destination
    pack: '[OpenTelemetry Logs](/observability_pipelines/packs/opentelemetry_logs/)'
    source: OpenTelemetry
  - description: 이 팩은 SIEM 및 데이터 레이크 라우팅을 위해 Orca Security 클라우드 발견 결과를 정규화합니다.
    destination: Any destination
    pack: '[Orca Security](/observability_pipelines/packs/orca_security/)'
    source: Orca Security
  - description: Cortex XDR 경보에는 심각도, MITRE ATT&CK 매핑, 소스/목적지 컨텍스트가 포함됩니다.
    destination: Any destination
    pack: '[Palo Alto Cortex](/observability_pipelines/packs/palo_alto_cortex/)'
    source: Palo Alto
  - description: Palo Alto 방화벽 로그는 트래픽, 위협 및 시스템 이벤트를 캡처합니다.
    destination: Any destination
    pack: '[Palo Alto Firewall](/observability_pipelines/packs/palo_alto_firewall/)'
    source: Palo Alto
  - description: 이 팩은 PAN-OS 로그를 Microsoft Sentinel의 CommonSecurityLog 스키마에 매핑합니다.
    destination: Microsoft Sentinel
    pack: '[Palo Alto Networks - Microsoft Sentinel](/observability_pipelines/packs/palo_alto_microsoft_sentinel/)'
    source: Palo Alto
  - description: 이 팩은 PAN-OS 로그를 Cortex XSIAM 플랫 JSON 스키마로 다시 매핑합니다.
    destination: Cortex XSIAM
    pack: '[Palo Alto Networks - XSIAM](/observability_pipelines/packs/palo_alto_xsiam/)'
    source: Palo Alto
  - description: Proofpoint Email Security 로그는 이메일 위협, 피싱 및 멀웨어 탐지 내용을 캡처합니다.
    destination: Any destination
    pack: '[Proofpoint Email Security](/observability_pipelines/packs/proofpoint_email_security/)'
    source: Proofpoint
  - description: 이 팩은 중증도가 낮은 노이즈를 제거하고 신규, 확인됨 및 재개됨 상태의 Qualys 취약점 탐지 결과를 표시합니다.
    destination: Any destination
    pack: '[Qualys Detections](/observability_pipelines/packs/qualys_detections/)'
    source: Qualys
  - description: SentinelOne Cloud Funnel은 EDR 및 Deep Visibility 이벤트를 JSON으로 클라우드
      스토리지에 스트리밍합니다.
    destination: Any destination
    pack: '[SentinelOne Cloud Funnel EDR](/observability_pipelines/packs/sentinel_one/)'
    source: SentinelOne
  - description: 이 팩은 중증도 매핑과 로그 볼륨 메트릭을 사용하여 일반적인 RFC 3164/5424 syslog를 구문 분석합니다.
    destination: Any destination
    pack: '[Syslog](/observability_pipelines/packs/syslog/)'
    source: Syslog
  - description: Windows DNS Server 분석 로그는 쿼리, 영역 전송 및 동적 업데이트를 다룹니다.
    destination: Any destination
    pack: '[Windows DNS Log](/observability_pipelines/packs/windows_dns_log/)'
    source: Windows
  - description: 이 팩은 메일 전달 규칙, 위임, 역할 변경과 같은 고위험 Microsoft 365 (M365) 통합 감사 로그 이벤트를
      플래그 지정합니다.
    destination: Any destination
    pack: '[Windows Office 365](/observability_pipelines/packs/windows_office_365/)'
    source: Microsoft
  - description: Windows 이벤트 로그는 Windows 호스트의 시스템, 애플리케이션 및 보안 활동을 캡처합니다.
    destination: Any destination
    pack: '[Windows XML](/observability_pipelines/packs/windows_xml/)'
    source: Windows
  - description: Windows 이벤트 로그는 인증, 프로세스 생성 및 계정 관리 이벤트를 캡처합니다.
    destination: Any destination
    pack: '[WinEventLog](/observability_pipelines/packs/wineventlog/)'
    source: Windows
  - description: ZScaler Internet Access(ZIA) DNS 로그는 조직 전체의 DNS 활동 및 정책 작업을 캡처합니다.
    destination: Any destination
    pack: '[ZScaler ZIA DNS](/observability_pipelines/packs/zscaler_zia_dns/)'
    source: Zscaler
  - description: Zscaler Internet Access(ZIA) 방화벽 로그는 네트워크 트래픽 및 보안 이벤트를 보여줍니다.
    destination: Any destination
    pack: '[Zscaler ZIA Firewall](/observability_pipelines/packs/zscaler_zia_firewall/)'
    source: Zscaler
  - description: Zscaler Internet Access(ZIA) 터널 로그는 터널 상태, 트래픽 및 주요 이벤트를 보여줍니다.
    destination: Any destination
    pack: '[Zscaler ZIA Tunnel](/observability_pipelines/packs/zscaler_zia_tunnel/)'
    source: Zscaler
  - description: Zscaler Internet Access(ZIA) 웹 로그는 사용자 웹 활동 및 보안 조치를 캡처합니다.
    destination: Any destination
    pack: '[Zscaler ZIA Web Logs](/observability_pipelines/packs/zscaler_zia_web_logs/)'
    source: Zscaler
  - description: Zscaler Private Access는 프라이빗 앱 액세스, 세션 및 연결을 캡처합니다.
    destination: Any destination
    pack: '[Zscaler ZPA](/observability_pipelines/packs/zscaler_zpa/)'
    source: Zscaler
  headers:
  - id: pack
    name: 팩
  - filter_by: true
    id: source
    name: 소스
  - filter_by: true
    id: destination
    name: 목적지
  - id: description
    name: 설명
title: Packs
---
## 개요 {#overview}

{{< img src="observability_pipelines/packs/packs.png" alt="Observability Pipelines의 팩 섹션" style="width:100%;" >}}

특정 소스에서 Observability Pipelines로 로그를 전송하기 위한 파이프라인을 설정할 때, 해당 로그를 처리하고 관리하는 방법을 결정해야 하는 경우가 많습니다.

다음과 같은 질문이 제기될 수 있습니다.

- 이 소스에서 어떤 로그가 중요한가요?
- 어떤 로그를 안전하게 삭제할 수 있나요?
- 반복적인 로그를 샘플링해야 하나요?
- 목적지에 맞게 구문 분석하거나 형식을 지정해야 하는 필드는 무엇인가요?

이러한 결정을 내리려면 일반적으로 여러 팀 간의 조정과 각 로그 소스에 대한 자세한 지식이 필요합니다.

Observability Pipelines 팩은 이러한 결정을 빠르고 일관되게 내릴 수 있도록 사전 정의된 구성을 제공합니다. 팩은 Akamai, AWS CloudTrail, Cloudflare, Fastly, Palo Alto Firewall 및 Zscaler와 같은 특정 로그 소스에 대해 Datadog에서 권장하는 모범 사례를 적용합니다.

### 팩의 기능 {#what-packs-do}

각 팩에는 다음을 정의하는 소스별 구성이 포함되어 있습니다.

- **페이로드 크기를 줄이기 위해 안전하게 제거할 수 있는 필드**
- **중복 이벤트나 상태 확인과 같이 삭제해도 되는 로그**
- **오류나 보안 탐지 결과와 같이 보존하거나 구문 분석해야 하는 로그**
- **형식 지정 및 정규화 규칙**을 통해 서로 다른 목적지와 환경에서 로그 형식을 일관되게 유지

팩을 사용하면 구성을 수동으로 생성하지 않고도 각 로그 소스에 대해 일관된 구문 분석, 필터링 및 라우팅 로직을 적용할 수 있습니다.

### 팩을 사용해야 하는 이유 {#why-use-packs}

팩을 사용하면 팀에서 다음 작업을 수행할 수 있습니다.

- **수집 볼륨 및 비용 절감**: 반복적이고 가치가 낮은 이벤트를 필터링하거나 샘플링
- **일관성 유지**: 환경과 목적지 전반에서 구문 분석 및 필드 매핑의 일관성 유지
- **설정 속도 향상**: 일반적인 소스에 바로 사용할 수 있는 구성을 적용

## 설정 {#setup}

팩을 설정하려면 다음 단계를 따르세요.

1. [Pipelines][1] 페이지로 이동합니다.
1. {{< ui >}}Packs{{< /ui >}}를 클릭합니다.
1. 설정하려는 팩을 클릭합니다.
1. 팩으로 새 파이프라인을 생성하거나 기존 파이프라인에 팩을 추가할 수 있습니다.
    - {{< ui >}}Add to New Pipeline{{< /ui >}}을 클릭한 경우 생성된 새 파이프라인에서 다음 단계를 따르세요.
        - 추가된 프로세서 그룹을 클릭하여 팩이 추가한 개별 프로세서를 확인하고 필요에 따라 편집합니다. 자세한 내용은 [프로세서][2]를 참조하세요.
        - 파이프라인의 나머지 부분을 설정하는 방법은 [파이프라인 설정][3]을 참조하세요.
    - {{< ui >}}Add to Existing Pipeline{{< /ui >}}을 클릭한 경우:
        1. 팩을 추가할 파이프라인을 선택합니다.
        1. {{< ui >}}Add to Existing Pipeline{{< /ui >}}을 클릭합니다.
            1. 팩이 파이프라인의 마지막 프로세서 그룹에 추가됩니다.
            1. 그룹을 클릭하여 개별 프로세서를 검토하고 필요에 따라 편집합니다. 자세한 내용은 [프로세서][2]를 참조하세요.

## 사용 가능한 팩 {#available-packs}

소스 또는 대상으로 표를 검색하거나 필터링합니다. 세부 정보를 보려면 팩 이름을 선택합니다.

{{< multifilter-search >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/processors/
[3]: /ko/observability_pipelines/configuration/set_up_pipelines/