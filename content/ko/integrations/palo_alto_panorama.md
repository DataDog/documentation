---
app_id: palo-alto-panorama
app_uuid: 08e3eb08-944f-4f58-94db-b8235b7ebb5e
assets:
  dashboards:
    'Palo Alto Panorama: Authentication': assets/dashboards/palo_alto_panorama_authentication.json
    'Palo Alto Panorama: Config': assets/dashboards/palo_alto_panorama_config.json
    'Palo Alto Panorama: Correlated Events': assets/dashboards/palo_alto_panorama_correlated_events.json
    'Palo Alto Panorama: Decryption': assets/dashboards/palo_alto_panorama_decryption.json
    'Palo Alto Panorama: Global Protect': assets/dashboards/palo_alto_panorama_globalprotect.json
    'Palo Alto Panorama: HIP Match': assets/dashboards/palo_alto_panorama_hip_match.json
    'Palo Alto Panorama: System': assets/dashboards/palo_alto_panorama_system.json
    'Palo Alto Panorama: Threat': assets/dashboards/palo_alto_panorama_threat.json
    'Palo Alto Panorama: Traffic': assets/dashboards/palo_alto_panorama_traffic.json
    'Palo Alto Panorama: Tunnel Inspection': assets/dashboards/palo_alto_panorama_tunnel_inspection.json
    'Palo Alto Panorama: User ID': assets/dashboards/palo_alto_panorama_user_id.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6661801
    source_type_name: palo-alto-panorama
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/palo_alto_panorama/README.md
display_on_public_website: true
draft: false
git_integration_title: palo_alto_panorama
integration_id: palo-alto-panorama
integration_title: Palo Alto Panorama
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: palo_alto_panorama
public_title: Palo Alto Panorama
short_description: Panorama 방화벽 로그에 관한 인사이트를 얻으세요. Cloud SIEM 연결
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Panorama 방화벽 로그에 대한 인사이트를 얻으세요. Cloud SIEM 연결
  media:
  - caption: 'Palo Alto Panorama: Traffic'
    image_url: images/palo_alto_panorama_traffic.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: Threat'
    image_url: images/palo_alto_panorama_threat.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: Config'
    image_url: images/palo_alto_panorama_config.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: System'
    image_url: images/palo_alto_panorama_system.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: Decryption'
    image_url: images/palo_alto_panorama_decryption.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: Global Protect'
    image_url: images/palo_alto_panorama_global_protect.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: Tunnel Inspection'
    image_url: images/palo_alto_panorama_tunnel_inspection.png
    media_type: 이미지
  - caption: 'Palo Alto Panorama: Authentication'
    image_url: images/palo_alto_panorama_authentication.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Palo Alto Panorama
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Palo Alto Panorama][1]는 Palo Alto Networks가 개발한 보안 관리 소프트웨어 애플리케이션입니다. Palo Alto Network 방화벽에 중앙 집중식 관리, 로깅 및 보고 기능을 제공하도록 설계되었습니다.

이 통합은 Traffic, Threat, Authentication, HIP Match, User ID, Tunnel Inspection, Config, System, Correleated Events, URL Filtering, Data Filtering, GlobalProtect, Decryption 로그 유형을 통합 로그 파이프라인으로 수집하여 로그를 보강하고 데이터를 Datadog 표준 속성으로 정규화합니다.

이 통합은 인바운드 및 아웃바운드 트래픽 흐름, 위협 세부 정보, 사용자 인증에 관한 인사이트, GlobalProtect가 생성한 이벤트, 사용자와 IP 주소 간의 매핑 등 상세 인사이트가 포함된 대시보드를 시각화해 제공합니다.

## 설정

### 설치

Palo Alto Panorama 통합을 설치하려면 다음 Agent 설치 명령을 실행하고 아래 단계를 따릅니다. 자세한 내용은 [통합 관리 문서][2]를 참조하세요.

**참고**: Agent 버전 7.52.0. 이상에서는 해당 단계를 수행할 필요가 없습니다.

Linux 명령:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-palo_alto_panorama==1.0.0
  ```

### 설정

#### 로그 수집

**Palo Alto Panorama:**

1. Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `palo_alto_panorama.d/conf.yaml` 파일에 추가하여 Palo Alto Panorama 로그 수집을 시작하세요.

   사용 가능한 설정 옵션은 [palo_alto_panorama.d/conf.yaml 샘플][3]을 참조하세요.

   ```yaml
   logs:
     - type: tcp  # Choose either 'tcp' or 'udp' based on your requirements
       port: <PORT>
       service: palo-alto-panorama
       source: palo-alto-panorama
   ```

3. [에이전트][4]를 다시 시작합니다.

4. Datadog으로 데이터를 전송하도록 Panorama를 설정합니다.
   1. Panorama 시스템에 로그인합니다.
   2. [Syslog 로그 포워딩][5] 구성 단계를 따릅니다.
      1. 단계 1.4의 경우, `Transport` 형식은 `TCP/UDP`을, `syslog messages`의 경우 `BSD` 형식을 사용합니다.
      2. 단계 1.5의 경우 아래의 사용자 지정 로그 형식을 사용합니다.
         - **Traffic**
            ```sh
            serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|src=$src|dst=$dst|natsrc=$natsrc|natdst=$natdst|rule=$rule|suser=$srcuser|duser=$dstuser|app=$app|vsys=$vsys|from=$from|to=$to|inboundif=$inbound_if|outboundif=$outbound_if|logset=$logset|sessionid=$sessionid|repeatcnt=$repeatcnt|sport=$sport|dport=$dport|natsport=$natsport|natdport=$natdport|flags=$flags|proto=$proto|act=$action|bytes=$bytes|bytes_sent=$bytes_sent|bytes_received=$bytes_received|pkt=$packets|start=$start|elapsed=$elapsed|cat=$category|seq=$seqno|actflag=$actionflags|sloc=$srcloc|dloc=$dstloc|pktsent=$pkts_sent|pktrcvd=$pkts_received|sessionendreason=$session_end_reason|vsysname=$vsys_name|dvc=$device_name|actsrc=$action_source|suuid=$src_uuid|duuid=$dst_uuid|tunnelid=$tunnelid|monitortag=$monitortag|parentid=$parent_session_id|parentst=$parent_start_time|tunnel=$tunnel|associd=$assoc_id|chunk=$chunks|chunksent=$chunks_sent|chunkrcvd=$chunks_received|ruleuuid=$rule_uuid|http2conn=$http2_connection|appflap=$link_change_count|policyid=$policy_id|dynusrgrp=$dynusergroup_name|xffip=$xff_ip|scat=$src_category|sprofile=$src_profile|smodel=$src_model|sven=$src_vendor|sosfam=$src_osfamily|sosver=$src_osversion|shost=$src_host|smac=$src_mac|dcat=$dst_category|dprofile=$dst_profile|dmodel=$dst_model|dven=$dst_vendor|dosfam=$dst_osfamily|dosver=$dst_osversion|dhost=$dst_host|dmac=$dst_mac|contid=$container_id|podnamespace=$pod_namespace|podname=$pod_name|sedl=$src_edl|dedl=$dst_edl|hostid=$hostid|srnum=$serialnumber|sessionown=$session_owner|subcatapp=$subcategory_of_app|appcat=$category_of_app|apptech=$technology_of_app|apprisk=$risk_of_app|appchar=$characteristic_of_app|appcont=$container_of_app|tunneledapp=$tunneled_app|appsaas=$is_saas_of_app|appstate=$sanctioned_state_of_app|offloaded=$offloaded|flowtype=$flow_type|cluster=$cluster_name|link=$link_switches|sdag=$src_dag|ddag=$dst_dag
            ```
         - **Threat**
            ```sh
            serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|src=$src|dst=$dst|natsrc=$natsrc|natdst=$natdst|rule=$rule|suser=$srcuser|duser=$dstuser|app=$app|vsys=$vsys|from=$from|to=$to|inboundif=$inbound_if|outboundif=$outbound_if|logset=$logset|sessionid=$sessionid|repeatcnt=$repeatcnt|sport=$sport|dport=$dport|natsport=$natsport|natdport=$natdport|flags=$flags|proto=$proto|act=$action|misc=$misc|threatid=$threatid|cat=$category|severity=$severity|dir=$direction|seqno=$seqno|actflags=$actionflags|sloc=$srcloc|dloc=$dstloc|contenttype=$contenttype|pcapip=$pcap_id|filedigest=$filedigest|cloud=$cloud|urlidx=$url_idx|useragent=$user_agent|filetype=$filetype|xff=$xff|ref=$referer|sender=$sender|sub=$subject|recipient=$recipient|reportid=$reportid|vsysname=$vsys_name|dvc=$device_name|suuid=$src_uuid|duuid=$dst_uuid|http_method=$http_method|tunnelid=$tunnel_id|monitortag=$monitortag|tunnel=$tunnel|thrcategory=$thr_category|contentver=$contentver|ppid=$ppid|httpheaders=$http_headers|urlcategory=$url_category_list|ruleuuid=$rule_uuid|http2conn=$http2_connection|dynusrgrp=$dynusergroup_name|xffip=$xff_ip|scat=$src_category|sprofile=$src_profile|smodel=$src_model|sven=$src_vendor|sosfam=$src_osfamily|sosver=$src_osversion|shost=$src_host|smac=$src_mac|dcat=$dst_category|dprofile=$dst_profile|dmodel=$dst_model|dven=$dst_vendor|dosfam=$dst_osfamily|dosver=$dst_osversion|dhost=$dst_host|dmac=$dst_mac|contid=$container_id|podnamespace=$pod_namespace|podname=$pod_name|hostid=$hostid|srnum=$serialnumber|reason=$reason|justification=$justification|subcatApp=$subcategory_of_app|appcat=$category_of_app|apptech=$technology_of_app|apprisk=$risk_of_app|appchar=$characteristic_of_app|appcont=$container_of_app|tunneledapp=$tunneled_app|appsaas=$is_saas_of_app|appstate=$sanctioned_state_of_app|cloudreportid=$cloud_reportid|cluster=$cluster_name|flowtype=$flow_type
            ```
         - **Authentication**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|vsys=$vsys|ip=$ip|user=$user|normalize_user=$normalize_user|object=$object|authpolicy=$authpolicy|repeatcnt=$repeatcnt|authid=$authid|vendor=$vendor|logset=$logset|serverprofile=$serverprofile|desc=$desc|clienttype=$clienttype|event=$event|factorno=$factorno|seqno=$seqno|actionflags=$actionflags|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|vsys_id=$vsys_id|authproto=$authproto|rule_uuid=$rule_uuid|high_res_timestamp=$high_res_timestamp|src_category=$src_category|src_profile=$src_profile|src_model=$src_model|src_vendor=$src_vendor|src_osfamily=$src_osfamily|src_osversion=$src_osversion|src_host=$src_host|src_mac=$src_mac|region=$region|user_agent=$user_agent|sessionid=$sessionid|cluster_name=$cluster_name
            ```
         - **HIP Match**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|srcuser=$srcuser|vsys=$vsys|machinename=$machinename|os=$os|src=$src|matchname=$matchname|repeatcnt=$repeatcnt|matchtype=$matchtype|seqno=$seqno|actionflags=$actionflags|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|vsys_id=$vsys_id|srcipv6=$srcipv6|hostid=$hostid|serialnumber=$serialnumber|mac=$mac|high_res_timestamp=$high_res_timestamp|cluster_name=$cluster_name
            ```
         - **User ID**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|vsys=$vsys|ip=$ip|user=$user|datasourcename=$datasourcename|eventid=$eventid|repeatcnt=$repeatcnt|timeout=$timeout|beginport=$beginport|endport=$endport|datasource=$datasource|datasourcetype=$datasourcetype|seqno=$seqno|actionflags=$actionflags|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|vsys_id=$vsys_id|factortype=$factortype|factorcompletiontime=$factorcompletiontime|factorno=$factorno|ugflags=$ugflags|userbysource=$userbysource|tag_name=$tag_name|high_res_timestamp=$high_res_timestamp|origindatasource=$origindatasource|cluster_name=$cluster_name
            ```
         - **Tunnel Inspection**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|src=$src|dst=$dst|natsrc=$natsrc|natdst=$natdst|rule=$rule|srcuser=$srcuser|dstuser=$dstuser|app=$app|vsys=$vsys|from=$from|to=$to|inbound_if=$inbound_if|outbound_if=$outbound_if|logset=$logset|sessionid=$sessionid|repeatcnt=$repeatcnt|sport=$sport|dport=$dport|natsport=$natsport|natdport=$natdport|flags=$flags|proto=$proto|act=$action|severity=$severity|seqno=$seqno|actionflags=$actionflags|srcloc=$srcloc|dstloc=$dstloc|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|tunnelid=$tunnelid|monitortag=$monitortag|parent_session_id=$parent_session_id|parent_start_time=$parent_start_time|tunnel=$tunnel|bytes=$bytes|bytes_sent=$bytes_sent|bytes_received=$bytes_received|pkt=$packets|pkts_sent=$pkts_sent|pkts_received=$pkts_received|max_encap=$max_encap|unknown_proto=$unknown_proto|strict_check=$strict_check|tunnel_fragment=$tunnel_fragment|sessions_created=$sessions_created|sessions_closed=$sessions_closed|session_end_reason=$session_end_reason|action_source=$action_source|start=$start|elapsed=$elapsed|tunnel_insp_rule=$tunnel_insp_rule|remote_user_ip=$remote_user_ip|remote_user_id=$remote_user_id|rule_uuid=$rule_uuid|pcap_id=$pcap_id|dynusergroup_name=$dynusergroup_name|src_edl=$src_edl|dst_edl=$dst_edl|high_res_timestamp=$high_res_timestamp|nssai_sd=$nssai_sd|nssai_sst=$nssai_sst|pdu_session_id=$pdu_session_id|subcategory_of_app=$subcategory_of_app|category_of_app=$category_of_app|technology_of_app=$technology_of_app|risk_of_app=$risk_of_app|characteristic_of_app=$characteristic_of_app|container_of_app=$container_of_app|is_saas_of_app=$is_saas_of_app|sanctioned_state_of_app=$sanctioned_state_of_app|cluster_name=$cluster_name
            ```
         - **Config**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|host=$host|vsys=$vsys|cmd=$cmd|admin=$admin|client=$client|result=$result|path=$path|seqno=$seqno|actionflags=$actionflags|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|dg_id=$dg_id|comment=$comment|high_res_timestamp=$high_res_timestamp|before-change-detail=$before-change-detail|after-change-detail=$after-change-detail
            ```
         - **System**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|vsys=$vsys|eventid=$eventid|object=$object|module=$module|severity=$severity|opaque=$opaque|seqno=$seqno|actionflags=$actionflags|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|high_res_timestamp=$high_res_timestamp
            ```
         - **Correleated Events**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|src=$src|srcuser=$srcuser|vsys=$vsys|category=$category|severity=$severity|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|vsys_id=$vsys_id|objectname=$objectname|object_id=$object_id|evidence=$evidence
            ```
         - **GlobalProtect**
            ```sh
            receive_time=$receive_time|serial=$serial|type=$type|subtype=$subtype|time_generated=$cef-formatted-time_generated|vsys=$vsys|eventid=$eventid|stage=$stage|auth_method=$auth_method|tunnel_type=$tunnel_type|srcuser=$srcuser|srcregion=$srcregion|machinename=$machinename|public_ip=$public_ip|public_ipv6=$public_ipv6|private_ip=$private_ip|private_ipv6=$private_ipv6|hostid=$hostid|serialnumber=$serialnumber|client_ver=$client_ver|client_os=$client_os|client_os_ver=$client_os_ver|repeatcnt=$repeatcnt|reason=$reason|error=$error|opaque=$opaque|status=$status|location=$location|login_duration=$login_duration|connect_method=$connect_method|error_code=$error_code|portal=$portal|seqno=$seqno|actionflags=$actionflags|selection_type=$selection_type|response_time=$response_time|priority=$priority|attempted_gateways=$attempted_gateways|gateway=$gateway|dg_hier_level_1=$dg_hier_level_1|dg_hier_level_2=$dg_hier_level_2|dg_hier_level_3=$dg_hier_level_3|dg_hier_level_4=$dg_hier_level_4|vsys_name=$vsys_name|device_name=$device_name|vsys_id=$vsys_id|cluster_name=$cluster_name
            ```
         - **Decryption**
            ```sh
            serial=$serial|type=$type|subtype=$subtype|configver=$config_ver|time_generated=$cef-formatted-time_generated|src=$src|dst=$dst|natsrc=$natsrc|natdst=$natdst|rule=$rule|suser=$srcuser|duser=$dstuser|app=$app|vsys=$vsys|from=$from|to=$to|inboundif=$inbound_if|outboundif=$outbound_if|logset=$logset|time_received=$time_received|sessionid=$sessionid|repeatcnt=$repeatcnt|sport=$sport|dport=$dport|natsport=$natsport|natdport=$natdport|flags=$flags|proto=$proto|act=$action|tunnel=$tunnel|suuid=$src_uuid|duuid=$dst_uuid|ruleuuid=$rule_uuid|hsstagec2f=$hs_stage_c2f|hsstagef2s=$hs_stage_f2s|tlsver=$tls_version|tlskeyxchg=$tls_keyxchg|tlsenc=$tls_enc|tlsauth=$tls_auth|policyname=$policy_name|eccurve=$ec_curve|errindex=$err_index|rootstatus=$root_status|chainstatus=$chain_status|proxytype=$proxy_type|certserial=$cert_serial|fingerprint=$fingerprint|notbefore=$notbefore|notafter=$notafter|certver=$cert_ver|certsize=$cert_size|cnlen=$cn_len|issuerlen=$issuer_len|rootcnlen=$rootcn_len|snilen=$sni_len|certflags=$cert_flags|cn=$cn|issuercn=$issuer_cn|rootcn=$root_cn|sni=$sni|err=$error|contid=$container_id|podnamespace=$pod_namespace|podname=$pod_name|sedl=$src_edl|dedl=$dst_edl|scat=$src_category|sprofile=$src_profile|smodel=$src_model|sven=$src_vendor|src_osfamily=$src_osfamily|sosver=$src_osversion|shost=$src_host|smac=$src_mac|dcat=$dst_category|dprofile=$dst_profile|dmodel=$dst_model|dven=$dst_vendor|dosfam=$dst_osfamily|dosver=$dst_osversion|dhost=$dst_host|dmac=$dst_mac|seqno=$seqno|actflag=$actionflags|vsysname=$vsys_name|dvc=$device_name|vsysid=$vsys_id|appsubcat=$subcategory_of_app|appcat=$category_of_app|apptech=$technology_of_app|apprisk=$risk_of_app|appchar=$characteristic_of_app|appcont=$container_of_app|appsaas=$is_saas_of_app|appstate=$sanctioned_state_of_app|cluster=$cluster_name|sdag=$src_dag|ddag=$dst_dag
            ```


### 검증

[Agent의 상태 하위 명령을 실행하고][6] Checks 섹션에서 `palo_alto_panorama`를 찾으세요.

## 수집한 데이터

### 로그

Palo Alto Panorama 통합은 Traffic, Threat, Authentication, HIP Match, User ID, Tunnel Inspection, Config, System, Correlated Events, URL Filtering, Data Filtering, GlobalProtect, Decryption 로그를 수집합니다.

### 메트릭

Palo Alto Panorama 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Palo Alto Panorama 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Palo Alto Panorama 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

**포트 바인딩 중 권한 거부됨:**

포트 바인딩 중 Agent 로그에 **권한 거부** 오류가 표시되면 다음 지침을 참조하세요.

   1. 1024 아래 포트 넘버에 바인딩하려면 상위 권한이 필요합니다. `setcap` 명령을 사용하여 포트에 대한 액세스 권한을 부여합니다.

      - `setcap` 명령을 사용하여 포트에 대한 액세스 권한을 부여합니다.

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - `getcap` 명령을 실행하여 설정이 올바른지 확인합니다.

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         예상 결과:

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **참고:** Agent를 업그레이드할 때마다 이 `setcap` 명령을 다시 실행합니다.

   2. [에이전트][4]를 다시 시작합니다.

**데이터가 수집되지 않음:**

방화벽이 활성화된 경우 구성된 포트에서 트래픽이 우회되는지 확인하세요.

**이미 사용 중인 포트:**

**Port <PORT-NO\> Already in Use** 오류가 나타나면 다음 안내를 참조합니다. 하단은 PORT-NO = 514인 경우 예시입니다.

Syslog를 사용하는 시스템의 Agent가 포트 514에서 Zeek 로그를 수신 대기 중인 경우, Agent 로그에 다음 오류가 나타날 수 있습니다. `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

이 오류는 기본적으로 Syslog가 포트 514에서 수신 대기하기 때문에 발생합니다. 이 오류를 해결하려면 다음 단계 중 **하나**를 수행하세요.
- Disable Syslog
- 사용 가능한 다른 포트에서 수신하도록 Agent 구성

추가로 도움이 필요하면 [Datadog 지원 팀][7]에 문의하세요.

[1]: https://www.paloaltonetworks.com/network-security/panorama
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/palo_alto_panorama/datadog_checks/palo_alto_panorama/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-syslog-for-monitoring/configure-syslog-monitoring
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/help/