---
"app_id": "pan-firewall"
"app_uuid": "1e4b89ef-f66e-4c78-8cb3-70a222a1fcb4"
"assets":
  "dashboards":
    "Palo Alto Networks Firewall Overview": assets/dashboards/palo_alto_networks_firewall_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10155"
    "source_type_name": Palo Alto Networks Firewall
  "saved_views":
    "Authentication Protocol": assets/saved_views/top_ips_flagged_in_high_severity_threats.json
    "High Severity Issues": assets/saved_views/all_high_severity_issues.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- network
- os & system
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pan_firewall/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pan_firewall"
"integration_id": "pan-firewall"
"integration_title": "Palo Alto Networks Firewall"
"integration_version": "1.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "pan_firewall"
"public_title": "Palo Alto Networks Firewall"
"short_description": "Palo Alto Networks Firewall log events"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Network"
  - "Category::OS & System"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Palo Alto Networks Firewall log events
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Palo Alto Networks Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog の Alto Networks Firewall ログインテグレーションにより、お客様は Palo Alto Networks ファイアウォールログを取り込み、解析し、分析することができます。このログインテグレーションは、Palo Alto ファイアウォールで実行されるオペレーティングシステムである PAN OS によって提供される HTTPS ログテンプレートおよび転送機能に依存しています。PAN-OS を使用すると、お客様は脅威、トラフィック、認証、およびその他の重要なログイベントを転送できます。

### 主なユースケース
#### 重大度の高い脅威イベントに対応する
ファイアウォールの脅威ログは、ファイアウォールによって検出された脅威に関するコンテキストを提供します。これは、重大度、タイプ、発信元の IP/国などによってフィルタリングおよび分析できます。

#### ファイアウォールのデプロイについて十分な情報に基づいた決定を行う
ファイアウォールトラフィックログは、ファイアウォールを通過するトラフィックとセッションを測定するために使用でき、ファイアウォールデプロイ全体の異常なスループットを監視する機能も提供します。

#### 認証の異常を監視する
ファイアウォール認証ログは、ユーザーが Palo Alto Networks ファイアウォールで認証する際の詳細情報を提供します。これらのログを使用して、特定のプロトコル、ユーザー、場所などからの認証トラフィックの異常なスパイクを監視できます。

## セットアップ

### ログ収集

 1. ファイアウォールが到達可能でインターネットに接続できるマシンに [Datadog Agent をインストール][1]します。
 2. PanOS で、Device >> Server Profiles >> Syslog を選択し、サーバープロファイルの名前を追加します。Syslog ログ転送[コンフィギュレーション手順][2]に従います。以下と同じ手順です。
 3. Add をクリックして、サーバーの次の詳細を入力します。
    * サーバーの名前
    * Datadog Agent を備えたマシンの IP アドレス
    * トランスポート: TCP
    * ポート: 10518、形式: BSD
 4. 必要なログタイプのカスタムログ形式をコピーして構成します。以下の形式は、[Palo Alto Networks Syslog Field Descriptions ドキュメント][3]に記載されている形式からのマッピングです。

    | 名前                         | 形式                                                |
    | -------------------------------| ---------------------------------------------------------- |
    | トラフィックログ | <details> <summary><i> ペイロードを表示 </i> </summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport, natsport=$natsport natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received, start=$start, elapsed=$elapsed, category=$category,  seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, pkts_sent=$pkts_sent, pkts_received=$pkts_received, session_end_reason=$session_end_reason, device_name=$device_name,   action_source=$action_source,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, tunnelid=$tunnelid, imsi= $imsi, monitortag=$monitortag, imei=$imei,    parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, assoc_id=$assoc_id, chunks=$chunks  chunks_sent=$chunks_sent    chunks_received=$chunks_received</code></p> </details> |
    | 脅威ログ (および WildFire 提出ログ) | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,    app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction,   seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, contenttype=$contenttype,   pcap_id=$pcap_id,   filedigest=$filedigest, cloud=$cloud,   url_idx=$url_idx,   http.useragent=$user_agent, filetype=$filetype, xff=$xff    referer=$referer,   sender=$sender, subject=$subject,   recipient=$recipient,   reportid=$reportid, vsys_name=$vsys_name,   device_name=$device_name,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method,   tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei,   parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers</code></p> </details> |
    | 認証ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$time_generated, serial=$serial,   type=$type, subtype=$subtype,   vsys=$vsys, network.client.ip=$ip,  usr.id=$user,   normalize_user=$normalize_user, object=$object, authpolicy=$authpolicy, repeatcnt=$repeatcnt,   authid=$authid, vendor=$vendor  , logset=$logset, serverprofile=$serverprofile, message=$message    ,clienttype=$clienttype,    evt.outcome=$event, factorno=$factorno, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   evt.name=$authproto</code></p> </details> |
    | HIP マッチログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated,  usr.id=$srcuser, vsys=$vsys, machinename=$machinename, os=$os, network.client.ip=$src, matchname=$matchname, repeatcnt=$repeatcnt,  matchtype=$matchtype,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   srcipv6=$srcipv6,   hostid=$hostid</code></p> </details> |
    | ユーザー ID ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys,    network.client.ip=$ip,  usr.id=$user, datasourcename=$datasourcename,   evt.name=$eventid,  repeatcnt=$repeatcnt, timeout=$timeout, network.client.port=$beginport, network.destination.port=$endport,  datasource=$datasource, datasourcetype=$datasourcetype, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   factortype=$factortype, factorcompletiontime=$factorcompletiontime,,    factorno=$factorno, ugflags=$ugflags,   userbysource=$userbysource</code></p> </details> |
    | トンネル検査ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$time_generated,    serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src,    network.destination.ip=$dst,    natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser,    dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,   evt.outcome=$action,    severity=$severity, seqno=$seqno,   actionflags=$actionflags,   srcloc=$srcloc, dstloc=$dstloc, vsys_name=$vsys_name,   device_name=$device_name,   tunnelid=$tunnelid, monitortag=$monitortag, parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received,  packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received,   max_encap=$max_encap,   unknown_proto=$unknown_proto,   strict_check=$strict_check, tunnel_fragment=$tunnel_fragment,   sessions_created=$sessions_created, sessions_closed=$sessions_closed,   session_end_reason=$session_end_reason, evt.name=$action_source,    start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | SCTP ログ | <details> <summary><i> ペイロードを表示  </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, network.client.ip=$src,    network.destination.ip=$dst, rule=$rule, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid,    repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    proto=$proto,   action=$action, vsys_name=$vsys_name,   device_name=$device_name,   seqno=$seqno,   assoc_id=$assoc_id, ppid=$ppid, severity=$severity, sctp_chunk_type=$sctp_chunk_type,   sctp_event_type=$sctp_event_type,   verif_tag_1=$verif_tag_1,   verif_tag_2=$verif_tag_2,   sctp_cause_code=$sctp_cause_code,   diam_app_id=$diam_app_id,   diam_cmd_code=$diam_cmd_code,   diam_avp_code=$diam_avp_code,   stream_id=$stream_id,   assoc_end_reason=$assoc_end_reason, op_code=$op_code,   sccp_calling_ssn=$sccp_calling_ssn, sccp_calling_gt=$sccp_calling_gt,   sctp_filter=$sctp_filter,   chunks=$chunks, chunks_sent=$chunks_sent,   chunks_received=$chunks_received,   packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received</code></p> </details> |
    | コンフィギュレーションログ | <details> <summary><i> ペイロードを表示  </i></summary> <p><code>timestamp=$time_generated,  serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$host,   vsys=$vsys, evt.name=$cmd,  usr.id=$admin,  client=$client, evt.outcome=$result,    path=$path, before_change_detail=$before_change_detail, after_change_detail=$after_change_detail,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | システムログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | 相関イベントログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype,  vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name,   device_name=$device_name</code></p> </details> |
    | GTP ログ  | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$start, serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src, network.destination.ip=$dst, rule=$rule, app=$app, vsys=$vsys,  from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset,   sessionid=$sessionid,   network.client.port=$sport, network.destination.port=$dport, proto=$proto,  evt.name=$action,   event_type=$event_type, msisdn=$msisdn, apn=$apn,   rat=$rat,   msg_type=$msg_type, end_ip_adr=$end_ip_adr, teid1=$teid1,   teid2=$teid2,   gtp_interface=$gtp_interface,   cause_code=$cause_code, severity=$severity, mcc=$mcc,   mnc=$mnc,   area_code=$area_code,   cell_id=$cell_id,   event_code=$event_code, srcloc=$srcloc, dstloc=$dstloc, imsi=$imsi, imei=$imei, start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | データフィルタリングログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser, app=$app, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid, repeatcnt=$repeatcnt, network.client.port=$sport, network.destination.port=$dport, natsport=$natsport, natdport=$natdport, flags=$flags, proto=$proto, evt.name=$action, misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction, seqno=$seqno, actionflags=$actionflags, network.client.geoip.country.name=$srcloc, dstloc=$dstloc, contenttype=$contenttype, pcap_id=$pcap_id, filedigest=$filedigest, cloud=$cloud, url_idx=$url_idx, http.useragent=$user_agent, filetype=$filetype, xff=$xff, referer=$referer, sender=$sender, subject=$subject, recipient=$recipient, reportid=$reportid, vsys_name=$vsys_name, device_name=$device_name, src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method, tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei, parent_session_id=$parent_session_id, parent_start_time=$parent_start_time, tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers, url_category_list=$url_category_list, rule_uuid=$rule_uuid, http2_connection=$http2_connection, dynusergroup_name=$dynusergroup_name, xff_ip=$xff_ip, src_osfamily=$src_osfamily, src_osversion=$src_osversion, src_host=$src_host, src_mac=$src_mac, dst_osfamily=$dst_osfamily, dst_osversion=$dst_osversion, dst_host=$dst_host, dst_mac=$dst_mac, container_id=$container_id, pod_namespace=$pod_namespace, pod_name=$pod_name, src_edl=$src_edl, dst_edl=$dst_edl, hostid=$hostid, serialnumber=$serialnumber, domain_edl=$domain_edl, src_dag=$src_dag, dst_dag=$dst_dag, partial_hash=$partial_hash, high_res_timestamp=$high_res_timestamp, reason=$reason, justification=$justification</code></p> </details> |
    | URL フィルタリングログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser, app=$app, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid, repeatcnt=$repeatcnt, network.client.port=$sport, network.destination.port=$dport, natsport=$natsport, natdport=$natdport, flags=$flags, proto=$proto, evt.name=$action, misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction, seqno=$seqno, actionflags=$actionflags, network.client.geoip.country.name=$srcloc, dstloc=$dstloc, contenttype=$contenttype, pcap_id=$pcap_id, filedigest=$filedigest, cloud=$cloud, url_idx=$url_idx, http.useragent=$user_agent, filetype=$filetype, xff=$xff, referer=$referer, sender=$sender, subject=$subject, recipient=$recipient, reportid=$reportid, vsys_name=$vsys_name, device_name=$device_name, src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method, tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei, parent_session_id=$parent_session_id, parent_start_time=$parent_start_time, tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers, url_category_list=$url_category_list, rule_uuid=$rule_uuid, http2_connection=$http2_connection, dynusergroup_name=$dynusergroup_name, xff_ip=$xff_ip, src_osfamily=$src_osfamily, src_osversion=$src_osversion, src_host=$src_host, src_mac=$src_mac, dst_osfamily=$dst_osfamily, dst_osversion=$dst_osversion, dst_host=$dst_host, dst_mac=$dst_mac, container_id=$container_id, pod_namespace=$pod_namespace, pod_name=$pod_name, src_edl=$src_edl, dst_edl=$dst_edl, hostid=$hostid, serialnumber=$serialnumber, domain_edl=$domain_edl, src_dag=$src_dag, dst_dag=$dst_dag, partial_hash=$partial_hash, high_res_timestamp=$high_res_timestamp, reason=$reason, justification=$justification</code></p> </details> |
    | GlobalProtect ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, vsys=$vsys, evt.name=$eventid, stage=$stage, auth_method=$auth_method, tunnel_type=$tunnel_type, usr.id=$srcuser, srcregion=$srcregion, machinename=$machinename, public_ip=$public_ip, public_ipv6=$public_ipv6, private_ip=$private_ip, private_ipv6=$private_ipv6, hostid=$hostid, serialnumber=$serialnumber, client_ver=$client_ver, client_os=$client_os, client_os_ver=$client_os_ver, repeatcnt=$repeatcnt, reason=$reason, error=$error, opaque=$opaque, status=$status, location=$location, login_duration=$login_duration, connect_method=$connect_method, error_code=$error_code, portal=$portal, seqno=$seqno, actionflags=$actionflags, selection_type=$selection_type, response_time=$response_time, priority=$priority, attempted_gateways=$attempted_gateways, gateway=$gateway, dg_hier_level_1=$dg_hier_level_1, dg_hier_level_2=$dg_hier_level_2, dg_hier_level_3=$dg_hier_level_3, dg_hier_level_4=$dg_hier_level_4, vsys_name=$vsys_name, device_name=$device_name, vsys_id=$vsys_id</code></p> </details> |

 5. OK をクリックすると、syslog サーバープロファイルが作成されます。
 6. Objects タブをクリックすると、ログ転送プロファイル画面が開きます。
 7. 名前、ログタイプ、syslog プロファイルを指定して、ログ転送プロファイルを作成します
 8. [Agent のコンフィギュレーションディレクトリ][4]のルートに、以下の内容の pan.firewall.d/conf.yaml ファイルを作成します。

     ```yaml
     logs:
     - type: tcp
       port: 10518
       service: "firewall"
       source: "pan.firewall"
     ```
 9. [Agent を再起動します][5]。

## 収集データ

### メトリクス

このインテグレーションで収集されるメトリクスは、[ネットワークベンダー][6]ページで構成された関連プロファイルにより決定されます。

### ログ

PANOS インテグレーションは、Palo Alto Networks ファイアウォールインテグレーションからログを収集し、それを Datadog に転送します。

### イベント

PANOS インテグレーションは、イベントを送信しません。

### サービスチェック

PANOS インテグレーションには、サービスのチェック機能は含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ログの種類とフィールド][7]
- [ログ収集のドキュメント][8]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://www.youtube.com/watch?v=LOPXg0oCMPs
[3]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[7]: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[8]: https://docs.datadoghq.com/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent
[9]: https://docs.datadoghq.com/help/

