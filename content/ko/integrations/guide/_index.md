---
cascade:
  algolia:
    category: 지침
    rank: 20
    subcategory: 통합 지침
disable_toc: true
kind: 지침
private: true
title: 통합 지침
---

{{< whatsnext desc="일반 지침:" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Datadog 통합 요청{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}참조 테이블을 활용하여 사용자 정의 메타데이터 추가{{< /nextlink >}}   
    {{< nextlink href="integrations/guide/source-code-integration" tag=" Documentation" >}}Datadog 소스 코드 통합{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}클라우드 메트릭 지연{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}`Win32_NTLogEvent` WMI 클래스에 이벤트 로그 파일 추가{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}WMI 메트릭 검색{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}MongoDB 사용자 지정 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Datadog 메트릭에 Prometheus 메트릭 맵핑{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}호스트에서 Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}웹훅(Webhooks)을 사용한 프레시서비스(Freshservice) 티켓{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}Hadoop 분산 파일 시스템(HDFS) 통합 오류{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Datadog으로 HCP Consul 모니터링{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}에이전트가 RMIServer stub 검색에 실패하였습니다.{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Datadog API에 TCP/UDP 호스트 메트릭 전송{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}일반적으로 사용되는 호환 SNMP OID{{< /nextlink >}}    
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}OpenMetrics 기반 통합용 버전 관리{{< /nextlink >}}     
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Pivotal Cloud Foundry 수동 설정{{< /nextlink >}}     
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}VMware Tanzu용 Datadog 애플리케이션 모니터링{{< /nextlink >}} 
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}VMware Tanzu용 Datadog 클러스터 모니터링{{< /nextlink >}} 
{{< /whatsnext >}}

{{< whatsnext desc="AWS 지침:" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}CloudFormation으로 AWS 통합 자동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Terraform으로 AWS 통합 자동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}기관용 AWS 통합 멀티 어카운트 자동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}AWS 통합 수동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}AWS 통합 트러블슈팅{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}AWS 요금 세부 사항 모니터링{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}오류: Datadog은 sts:AssumeRole 수행 권한이 없습니다.{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}Kinesis Data Firehose를 사용한 AWS CloudWatch 메트릭 스트림{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Amazon CloudFormation 사용{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Amazon SNS 이메일로 Datadog 이벤트 생성{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}AWS 통합 및 CloudWatch FAQ{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Azure 지침:" >}}
    {{< nextlink href="integrations/guide/azure-manual-setup" tag=" Azure" >}}Azure 수동 설정 지침{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-manual-setup" tag=" Azure" >}}Azure Native 수동 설정 지침{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-programmatic-management" tag=" Azure" >}}Azure 통합 프로그래밍 관리 지침{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-programmatic-management" tag=" Azure" >}}Azure Native 통합 프로그래밍 관리 지침{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-portal" tag=" Azure" >}}Azure Native 통합 관리{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Datadog을 사용한 Azure Cloud Adoption Framework{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-troubleshooting" tag=" Azure" >}}Azure 트러블슈팅{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-architecture-and-configuration" tag=" Azure" >}}Azure 아키텍처 및 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-status-metric" tag=" Azure" >}}Azure 상태 및 카운트 메트릭{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-vms-appear-in-app-without-metrics" tag=" Azure" >}}Azure VM이 앱에 메트릭 없이 표시됩니다.{{< /nextlink >}}
    {{< nextlink href="integrations/guide/powered-down-azure-vm-on-infrastructure-list" tag=" Azure" >}}인프라스트럭처 목록의 Azure VM 중지{{< /nextlink >}}
    {{< nextlink href="integrations/guide/powershell-command-to-install-azure-datadog-extension" tag=" Azure" >}}Azure Datadog 확장 설치 명령{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Azure 모니터링용 Microsoft Graph API 권한{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="JMX 지침:" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}윈도우에서 JMX 명령 실행{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}복합형 JMX 속성 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Bean 정규식으로 JMX 메트릭을 필터링하고 추가 태그 적용{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}Jmxfetch은 어떤 통합을 사용합니까?{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="SQL 지침:" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}SQL 서버 통합에서 메트릭 추가 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}SQL 서버 사용자 지정 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}WMI를 사용하여 SQL 서버 성능 메트릭 추가 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}SQL 서버 통합 연결 문제{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}MySQL 사용자 지정 쿼리{{< /nextlink >}}
{{< /whatsnext >}}