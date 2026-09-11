---
app_id: pan-firewall
app_uuid: 1e4b89ef-f66e-4c78-8cb3-70a222a1fcb4
assets:
  dashboards:
    Palo Alto Networks Firewall Overview: assets/dashboards/palo_alto_networks_firewall_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10155
    source_type_name: Palo Alto Networks Firewall
  saved_views:
    Authentication Protocol: assets/saved_views/top_ips_flagged_in_high_severity_threats.json
    High Severity Issues: assets/saved_views/all_high_severity_issues.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 네트워크
- os & system
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pan_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: pan_firewall
integration_id: pan-firewall
integration_title: Palo Alto Networks Firewall
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: pan_firewall
public_title: Palo Alto Networks Firewall
short_description: Palo Alto Networks Firewall 로그 이벤트
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Category::OS & System
  - 카테고리::보안
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Palo Alto Networks Firewall 로그 이벤트
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
  - resource_type: 설명서
    url: https://docs.datadoghq.com/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent
  support: README.md#Support
  title: Palo Alto Networks Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog의 Palo Alto Networks Firewall 로그 통합을 통해 고객은 Palo Alto Networks Firewall 로그를 수집, 파싱, 분석할 수 있습니다. 이 로그 통합은 Palo Alto 방화벽에서 실행되는 운영 체제인 PAN OS에서 제공하는 HTTPS 로그 템플릿 및 포워딩 기능을 사용합니다. PAN-OS를 통해 고객은 위협, 트래픽, 인증 및 기타 중요한 로그 이벤트를 전달할 수 있습니다.

### 주요 사용 사례
#### 높은 심각도 위협 이벤트 대응
방화벽 위협 로그은 방화벽에서 탐지된 위협에 대한 컨텍스트를 제공하며, 심각도, 유형, 발원 IP/국가 등을 기준으로 필터링 및 분석할 수 있도록 해줍니다.

#### 방화벽 배포에 대한 정보에 기반한 의사 결정
방화벽 트래픽 로그를 사용하여 방화벽을 통과하는 트래픽과 세션을 측정할 수 있으며, 방화벽 배포 전반의 비정상적인 처리량에 대한 모니터링 기능도 제공합니다.

#### 인증 이상(징후) 모니터링
방화벽 인증 로그는 Palo Alto Networks 방화벽으로 인증할 때 사용자에 대한 자세한 정보를 제공합니다. 이러한 로그는 특정 프로토콜, 사용자, 위치 등의 비정상적인 인증 트래픽 급증을 모니터링하는 데 사용할 수 있습니다.

## 설정

### 로그 수집

 1. 방화벽이 도달할 수 있고 인터넷에 연결할 수 있는 컴퓨터에 [Datadog 에이전트][1]를 설치합니다.
 2. PanOS에서 장치 >> 서버 프로필 >> Syslog를 선택하고 서버 프로필의 이름을 추가합니다. Syslog 로그 포워딩 [설정 단계][2]를 따릅니다. 아래 나열된 단계도 동일합니다.
 3. 추가를 클릭하고 서버에 대한 다음 세부 정보를 입력합니다.
    * 서버 이름
    * Datadog 에이전트를 사용하는 기기의 IP 주소
    * TCP로 전송
    * 포트는 10518, 형식은 BSD
 4. 필수 로그 유형에 대한 커스텀 로그 형식 복사하고 설정하세요. 아래 형식은 [Palo Alto Networks Syslog 필드 설명 문서][3]에 나열된 형식에서 매핑한 것입니다.

    | 이름 | 형식
    | -------------------------------| ---------------------------------------------------------- |
    | 트래픽 로그 | <details> <summary><i> 페이로드 보기 </i> </summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport, natsport=$natsport natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received, start=$start, elapsed=$elapsed, category=$category,  seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, pkts_sent=$pkts_sent, pkts_received=$pkts_received, session_end_reason=$session_end_reason, device_name=$device_name,   action_source=$action_source,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, tunnelid=$tunnelid, imsi= $imsi, monitortag=$monitortag, imei=$imei,    parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, assoc_id=$assoc_id, chunks=$chunks  chunks_sent=$chunks_sent    chunks_received=$chunks_received</code></p> </details> |
    | 위협 로그 (및 WildFire 제출 로그) | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,    app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction,   seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, contenttype=$contenttype,   pcap_id=$pcap_id,   filedigest=$filedigest, cloud=$cloud,   url_idx=$url_idx,   http.useragent=$user_agent, filetype=$filetype, xff=$xff    referer=$referer,   sender=$sender, subject=$subject,   recipient=$recipient,   reportid=$reportid, vsys_name=$vsys_name,   device_name=$device_name,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method,   tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei,   parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers</code></p> </details> |
    | 인증 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$time_generated, serial=$serial,   type=$type, subtype=$subtype,   vsys=$vsys, network.client.ip=$ip,  usr.id=$user,   normalize_user=$normalize_user, object=$object, authpolicy=$authpolicy, repeatcnt=$repeatcnt,   authid=$authid, vendor=$vendor  , logset=$logset, serverprofile=$serverprofile, message=$message    ,clienttype=$clienttype,    evt.outcome=$event, factorno=$factorno, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   evt.name=$authproto</code></p> </details> |
    | HIP 일치 항목 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated,  usr.id=$srcuser, vsys=$vsys, machinename=$machinename, os=$os, network.client.ip=$src, matchname=$matchname, repeatcnt=$repeatcnt,  matchtype=$matchtype,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   srcipv6=$srcipv6,   hostid=$hostid</code></p> </details> |
    | 사용자-ID 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys,    network.client.ip=$ip,  usr.id=$user, datasourcename=$datasourcename,   evt.name=$eventid,  repeatcnt=$repeatcnt, timeout=$timeout, network.client.port=$beginport, network.destination.port=$endport,  datasource=$datasource, datasourcetype=$datasourcetype, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   factortype=$factortype, factorcompletiontime=$factorcompletiontime,,    factorno=$factorno, ugflags=$ugflags,   userbysource=$userbysource</code></p> </details> |
    | 터널 검사 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$time_generated,    serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src,    network.destination.ip=$dst,    natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser,    dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,   evt.outcome=$action,    severity=$severity, seqno=$seqno,   actionflags=$actionflags,   srcloc=$srcloc, dstloc=$dstloc, vsys_name=$vsys_name,   device_name=$device_name,   tunnelid=$tunnelid, monitortag=$monitortag, parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received,  packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received,   max_encap=$max_encap,   unknown_proto=$unknown_proto,   strict_check=$strict_check, tunnel_fragment=$tunnel_fragment,   sessions_created=$sessions_created, sessions_closed=$sessions_closed,   session_end_reason=$session_end_reason, evt.name=$action_source,    start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | SCTP 로그 | <details> <summary><i> 페이로드 보기  </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, network.client.ip=$src,    network.destination.ip=$dst, rule=$rule, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid,    repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    proto=$proto,   action=$action, vsys_name=$vsys_name,   device_name=$device_name,   seqno=$seqno,   assoc_id=$assoc_id, ppid=$ppid, severity=$severity, sctp_chunk_type=$sctp_chunk_type,   sctp_event_type=$sctp_event_type,   verif_tag_1=$verif_tag_1,   verif_tag_2=$verif_tag_2,   sctp_cause_code=$sctp_cause_code,   diam_app_id=$diam_app_id,   diam_cmd_code=$diam_cmd_code,   diam_avp_code=$diam_avp_code,   stream_id=$stream_id,   assoc_end_reason=$assoc_end_reason, op_code=$op_code,   sccp_calling_ssn=$sccp_calling_ssn, sccp_calling_gt=$sccp_calling_gt,   sctp_filter=$sctp_filter,   chunks=$chunks, chunks_sent=$chunks_sent,   chunks_received=$chunks_received,   packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received</code></p> </details> |
    | 설정 로그 | <details> <summary><i> 페이로드 보기  </i></summary> <p><code>timestamp=$time_generated,  serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$host,   vsys=$vsys, evt.name=$cmd,  usr.id=$admin,  client=$client, evt.outcome=$result,    path=$path, before_change_detail=$before_change_detail, after_change_detail=$after_change_detail,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | 시스템 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | 관련 이벤트 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys, evt.name=$eventid, object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | GTP 로그  | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$start, serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src, network.destination.ip=$dst, rule=$rule, app=$app, vsys=$vsys,  from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset,   sessionid=$sessionid,   network.client.port=$sport, network.destination.port=$dport, proto=$proto,  evt.name=$action,   event_type=$event_type, msisdn=$msisdn, apn=$apn,   rat=$rat,   msg_type=$msg_type, end_ip_adr=$end_ip_adr, teid1=$teid1,   teid2=$teid2,   gtp_interface=$gtp_interface,   cause_code=$cause_code, severity=$severity, mcc=$mcc,   mnc=$mnc,   area_code=$area_code,   cell_id=$cell_id,   event_code=$event_code, srcloc=$srcloc, dstloc=$dstloc, imsi=$imsi, imei=$imei, start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | 데이터 필터링 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser, app=$app, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid, repeatcnt=$repeatcnt, network.client.port=$sport, network.destination.port=$dport, natsport=$natsport, natdport=$natdport, flags=$flags, proto=$proto, evt.name=$action, misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction, seqno=$seqno, actionflags=$actionflags, network.client.geoip.country.name=$srcloc, dstloc=$dstloc, contenttype=$contenttype, pcap_id=$pcap_id, filedigest=$filedigest, cloud=$cloud, url_idx=$url_idx, http.useragent=$user_agent, filetype=$filetype, xff=$xff, referer=$referer, sender=$sender, subject=$subject, recipient=$recipient, reportid=$reportid, vsys_name=$vsys_name, device_name=$device_name, src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method, tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei, parent_session_id=$parent_session_id, parent_start_time=$parent_start_time, tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers, url_category_list=$url_category_list, rule_uuid=$rule_uuid, http2_connection=$http2_connection, dynusergroup_name=$dynusergroup_name, xff_ip=$xff_ip, src_osfamily=$src_osfamily, src_osversion=$src_osversion, src_host=$src_host, src_mac=$src_mac, dst_osfamily=$dst_osfamily, dst_osversion=$dst_osversion, dst_host=$dst_host, dst_mac=$dst_mac, container_id=$container_id, pod_namespace=$pod_namespace, pod_name=$pod_name, src_edl=$src_edl, dst_edl=$dst_edl, hostid=$hostid, serialnumber=$serialnumber, domain_edl=$domain_edl, src_dag=$src_dag, dst_dag=$dst_dag, partial_hash=$partial_hash, high_res_timestamp=$high_res_timestamp, reason=$reason, justification=$justification</code></p> </details> |
    | URL 필터링 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser, app=$app, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid, repeatcnt=$repeatcnt, network.client.port=$sport, network.destination.port=$dport, natsport=$natsport, natdport=$natdport, flags=$flags, proto=$proto, evt.name=$action, misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction, seqno=$seqno, actionflags=$actionflags, network.client.geoip.country.name=$srcloc, dstloc=$dstloc, contenttype=$contenttype, pcap_id=$pcap_id, filedigest=$filedigest, cloud=$cloud, url_idx=$url_idx, http.useragent=$user_agent, filetype=$filetype, xff=$xff, referer=$referer, sender=$sender, subject=$subject, recipient=$recipient, reportid=$reportid, vsys_name=$vsys_name, device_name=$device_name, src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method, tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei, parent_session_id=$parent_session_id, parent_start_time=$parent_start_time, tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers, url_category_list=$url_category_list, rule_uuid=$rule_uuid, http2_connection=$http2_connection, dynusergroup_name=$dynusergroup_name, xff_ip=$xff_ip, src_osfamily=$src_osfamily, src_osversion=$src_osversion, src_host=$src_host, src_mac=$src_mac, dst_osfamily=$dst_osfamily, dst_osversion=$dst_osversion, dst_host=$dst_host, dst_mac=$dst_mac, container_id=$container_id, pod_namespace=$pod_namespace, pod_name=$pod_name, src_edl=$src_edl, dst_edl=$dst_edl, hostid=$hostid, serialnumber=$serialnumber, domain_edl=$domain_edl, src_dag=$src_dag, dst_dag=$dst_dag, partial_hash=$partial_hash, high_res_timestamp=$high_res_timestamp, reason=$reason, justification=$justification</code></p> </details> |
    | GlobalProtect 로그 | <details> <summary><i> 페이로드 보기 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, vsys=$vsys, evt.name=$eventid, stage=$stage, auth_method=$auth_method, tunnel_type=$tunnel_type, usr.id=$srcuser, srcregion=$srcregion, machinename=$machinename, public_ip=$public_ip, public_ipv6=$public_ipv6, private_ip=$private_ip, private_ipv6=$private_ipv6, hostid=$hostid, serialnumber=$serialnumber, client_ver=$client_ver, client_os=$client_os, client_os_ver=$client_os_ver, repeatcnt=$repeatcnt, reason=$reason, error=$error, opaque=$opaque, status=$status, location=$location, login_duration=$login_duration, connect_method=$connect_method, error_code=$error_code, portal=$portal, seqno=$seqno, actionflags=$actionflags, selection_type=$selection_type, response_time=$response_time, priority=$priority, attempted_gateways=$attempted_gateways, gateway=$gateway, dg_hier_level_1=$dg_hier_level_1, dg_hier_level_2=$dg_hier_level_2, dg_hier_level_3=$dg_hier_level_3, dg_hier_level_4=$dg_hier_level_4, vsys_name=$vsys_name, device_name=$device_name, vsys_id=$vsys_id</code></p> </details> |

 5. 확인을 클릭하면 syslog 서버 프로필이 만들어집니다.
 6. 객체 탭을 클릭하면 로그 전달 프로필 화면이 열립니다.
 7. 이름, 로그 유형 및 syslog 프로필을 제공하여 로그 포워딩 프로필을 만듭니다.
 8. [에이전트의 설정 디렉터리][4]의 루트에 아래 내용으로 pan.firewall.d/conf.yaml 파일을 만듭니다.

     ```yaml
     logs:
     - type: tcp
       port: 10518
       service: "firewall"
       source: "pan.firewall"
     ```
 9. [에이전트 재시작][5].

## 수집한 데이터

### 메트릭

이 통합을 위해 수집된 메트릭은 [네트워크 공급업체][6] 페이지에서 설정된 관련 프로필로 결정됩니다. 

### 로그

통합 Palo Alto Networks 방화벽 통합에서 로그를 수집하여 Datadog로 전달합니다.

### 이벤트

PANOS 통합은 이벤트를 전송하지 않습니다.

### 서비스 점검

PANOS 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [로그 유형 및 필드][7]
- [로그 수집 설명서][8]

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://www.youtube.com/watch?v=LOPXg0oCMPs
[3]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices/
[7]: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[8]: https://docs.datadoghq.com/ko/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent
[9]: https://docs.datadoghq.com/ko/help/