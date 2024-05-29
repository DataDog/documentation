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

{{< whatsnext desc="General guides:" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Datadog 통합 요청{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}참조 표를 포함하는 커스텀 메타데이터 추가{{< /nextlink >}}
    {{< nextlink href="integrations/guide/source-code-integration" tag=" Documentation" >}}Datadog 소스 코드 통합{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}Cloud metric delay{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}`Win32_NTLogEvent` WMI 클래스에 이벤트 로그 파일 추가{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}WMI 메트릭 검색{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}MongoDB 커스텀 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Datadog 메트릭에 프로메테우스(Prometheus) 메트릭 매핑{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}호스트에서 프로메테우스 및 개방형 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}웹훅을 사용한 Freshservice 티켓{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}HDFS(Hadoop Distributed File System) 통합 오류{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Datadog를 사용한 HCP Consul 모니터링{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}RMIServer stub 검색에 실패한 에이전트{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Datadog API에서 TCP/UDP 호스트 메트릭 전송{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}일반적으로 사용되는 SNMP 및 호환 가능한 OID{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}개방형 메트릭 기반 통합 버전 관리{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Pivotal Cloud Foundry 수동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}VMware Tanzu에 대한 Datadog 애플리케이션 모니터링{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}VMware Tanzu를 위한 Datadog 클러스터 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="AWS guides:" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}CloudFormation을 사용한 AWS 통합 자동 설정 {{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Terraform을 사용한 AWS 통합 자동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}조직을 위한 AWS 통합 멀티 계정 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}AWS 통합 수동 설정{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}AWS 통합 트러블슈팅{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}AWS 빌링 상세 정보 모니터링{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}오류: Datadog에서 sts:AssumeRole을 실행할 권한이 없습니다.{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}Amazon Data Firehose을 사용한 AWS CloudWatch 메트릭 스트림{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Amazon CloudFormation 사용하기{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Amazon SNS 이메일에서 Datadog 이벤트 생성{{< /nextlink >}}
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

{{< whatsnext desc="Database guides:" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}SQL 서버 통합에서 더 많은 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}SQL 서버 커스텀 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}WMI를 사용해 더 많은  SQL 서버 성능 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}SQL Server 통합과의 연결 문제{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}MySQL 커스텀 쿼리{{< /nextlink >}}
    {{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" Oracle" >}}에이전트 7.50.1+에서 Oracle 통합 설정하기{{< /nextlink >}}
    {{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}7.50.1 미만 에이전트 버전에서 Oracle 통합 설정하기{{< /nextlink >}}
{{< /whatsnext >}}