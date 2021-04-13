---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Palo Alto Networks Firewall Overview: assets/dashboards/palo_alto_networks_firewall_overview.json
  logs:
    source: pan.firewall
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    Authentication Protocol: assets/saved_views/top_ips_flagged_in_high_severity_threats.json
    High Severity Issues: assets/saved_views/all_high_severity_issues.json
  service_checks: assets/service_checks.json
categories:
  - ログの収集
  - security
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/pan_firewall/README.md'
display_name: Palo Alto Networks Firewall
draft: false
git_integration_title: pan_firewall
guid: f7f2aa4b-cb93-4406-975d-3a282fef6d0e
integration_id: pan-firewall
integration_title: Palo Alto Networks Firewall
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pan.firewall
metric_to_check: ''
name: pan_firewall
process_signatures: []
public_title: Datadog-Palo Alto Networks Firewall インテグレーション
short_description: Palo Alto Networks Firewall ログイベント
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog の Alto Networks Firewall ログインテグレーションにより、お客様は Palo Alto Networks ファイアウォールログを取り込み、解析し、分析することができます。このログインテグレーションは、Palo Alto ファイアウォールで実行されるオペレーティングシステムである PAN OS によって提供される HTTPS ログテンプレートおよび転送機能に依存しています。PAN-OS を使用すると、お客様は脅威、トラフィック、認証、およびその他の重要なログイベントを転送できます。

### 主な使用例
#### 重大度の高い脅威イベントに対応する
ファイアウォールの脅威ログは、ファイアウォールによって検出された脅威に関する豊富なコンテキストを提供します。これは、重大度、タイプ、発信元の IP/国などによってフィルタリングおよび分析できます。

#### ファイアウォールのデプロイについて十分な情報に基づいた決定を行う
ファイアウォールトラフィックログは、ファイアウォールを通過するトラフィックとセッションを測定するために使用でき、ファイアウォールデプロイ全体の異常なスループットを監視する機能も提供します。

#### 認証の異常を監視する
ファイアウォール認証ログは、ユーザーが Palo Alto Networks ファイアウォールで認証する際の詳細情報を提供します。これらのログを使用して、特定のプロトコル、ユーザー、場所などからの認証トラフィックの異常なスパイクを監視できます。

## セットアップ

### Palo Alto Networks Firewall のログ収集を設定する

 1. ファイアウォールが到達可能でインターネットに接続できるマシンに [Datadog Agent をインストール][1]します。
 2. PanOS で、Device >> Server Profiles >> Syslog を選択し、サーバープロファイルの名前を追加します。Syslog ログ転送[コンフィギュレーション手順][2]に従います。以下と同じ手順です。
 3. Add をクリックして、サーバーの次の詳細を入力します。
    * サーバーの名前
    * Datadog Agent を備えたマシンの IP アドレス
    * トランスポート: TCP
    * ポート: 10518、形式: BSD
 4. 必要なログタイプのカスタムログ形式をコピーして構成します。

    | 名前                         | 形式                                                |
    | -------------------------------| ---------------------------------------------------------- |
    | トラフィックログ | <details> <summary><i> ペイロードを表示 </i> </summary> <p>  timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport, natsport=$natsport natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received, start=$start, elapsed=$elapsed, category=$category,  seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, pkts_sent=$pkts_sent, pkts_received=$pkts_received, session_end_reason=$session_end_reason, device_name=$device_name,   action_source=$action_source,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, tunnelid=$tunnelid,  imsi= $imsi, monitortag=$monitortag, imei=$imei,   parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, assoc_id=$assoc_id, chunks=$chunks  chunks_sent=$chunks_sent    chunks_received=$chunks_received </p> </details> |
    | 脅威ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,    app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction,   seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, contenttype=$contenttype,   pcap_id=$pcap_id,   filedigest=$filedigest, cloud=$cloud,   url_idx=$url_idx,   http.useragent=$user_agent, filetype=$filetype, xff=$xff    referer=$referer,   sender=$sender, subject=$subject,   recipient=$recipient,   reportid=$reportid, vsys_name=$vsys_name,   device_name=$device_name,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method,   tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei,   parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers  </p> </details> |
    | 認証ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p>  timestamp=$time_generated, serial=$serial,   type=$type, subtype=$subtype,   vsys=$vsys, network.client.ip=$ip,  usr.id=$user,   normalize_user=$normalize_user, object=$object, authpolicy=$authpolicy, repeatcnt=$repeatcnt,   authid=$authid, vendor=$vendor  , logset=$logset, serverprofile=$serverprofile, message=$message    ,clienttype=$clienttype,    evt.outcome=$event, factorno=$factorno, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   evt.name=$authproto  </p> </details> |
    | HIP マッチログ | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated,   usr.id=$srcuser, vsys=$vsys, machinename=$machinename, os=$os, network.client.ip=$src, matchname=$matchname, repeatcnt=$repeatcnt,  matchtype=$matchtype,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   srcipv6=$srcipv6,   hostid=$hostid  </p> </details> |
    | ユーザー ID ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys, network.client.ip=$ip,  usr.id=$user, datasourcename=$datasourcename,   evt.name=$eventid,  repeatcnt=$repeatcnt, timeout=$timeout, network.client.port=$beginport, network.destination.port=$endport,  datasource=$datasource, datasourcetype=$datasourcetype, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   factortype=$factortype, factorcompletiontime=$factorcompletiontime,,    factorno=$factorno, ugflags=$ugflags,   userbysource=$userbysource  </p> </details> |
    | トンネル検査ログ | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src,    network.destination.ip=$dst,    natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser,    dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,   evt.outcome=$action,    severity=$severity, seqno=$seqno,   actionflags=$actionflags,   srcloc=$srcloc, dstloc=$dstloc, vsys_name=$vsys_name,   device_name=$device_name,   tunnelid=$tunnelid, monitortag=$monitortag, parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received,  packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received,   max_encap=$max_encap,   unknown_proto=$unknown_proto,   strict_check=$strict_check, tunnel_fragment=$tunnel_fragment,   sessions_created=$sessions_created, sessions_closed=$sessions_closed,   session_end_reason=$session_end_reason, evt.name=$action_source,    start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule  </p> </details> |
    | SCTP ログ | <details> <summary><i> ペイロードを表示  </i></summary> <p> timestamp=$time_generated, serial=$serial, type=$type, network.client.ip=$src, network.destination.ip=$dst, rule=$rule, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid,    repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    proto=$proto,   action=$action, vsys_name=$vsys_name,   device_name=$device_name,   seqno=$seqno,   assoc_id=$assoc_id, ppid=$ppid, severity=$severity, sctp_chunk_type=$sctp_chunk_type,   sctp_event_type=$sctp_event_type,   verif_tag_1=$verif_tag_1,   verif_tag_2=$verif_tag_2,   sctp_cause_code=$sctp_cause_code,   diam_app_id=$diam_app_id,   diam_cmd_code=$diam_cmd_code,   diam_avp_code=$diam_avp_code,   stream_id=$stream_id,   assoc_end_reason=$assoc_end_reason, op_code=$op_code,   sccp_calling_ssn=$sccp_calling_ssn, sccp_calling_gt=$sccp_calling_gt,   sctp_filter=$sctp_filter,   chunks=$chunks, chunks_sent=$chunks_sent,   chunks_received=$chunks_received,   packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received  </p> </details> |
    | コンフィギュレーションログ | <details> <summary><i> ペイロードを表示  </i></summary> <p> timestamp=$time_generated,   serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$host,   vsys=$vsys, evt.name=$cmd,  usr.id=$admin,  client=$client, evt.outcome=$result,    path=$path, before_change_detail=$before_change_detail, after_change_detail=$after_change_detail,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name  </p> </details> |
    | システムログ | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype,  vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name  </p> </details> |
    | 相関イベントログ | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype,   vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name,   device_name=$device_name  </p> </details> |
    | GTP ログ  | <details> <summary><i> ペイロードを表示 </i></summary> <p> timestamp=$start, serial=$serial, type=$type, subtype=$subtype, network.client.ip=$src, network.destination.ip=$dst, rule=$rule, app=$app, vsys=$vsys,  from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset,   sessionid=$sessionid,   network.client.port=$sport, network.destination.port=$dport, proto=$proto,  evt.name=$action,   event_type=$event_type, msisdn=$msisdn, apn=$apn,   rat=$rat,   msg_type=$msg_type, end_ip_adr=$end_ip_adr, teid1=$teid1,   teid2=$teid2,   gtp_interface=$gtp_interface,   cause_code=$cause_code, severity=$severity, mcc=$mcc,   mnc=$mnc,   area_code=$area_code,   cell_id=$cell_id,   event_code=$event_code, srcloc=$srcloc, dstloc=$dstloc, imsi=$imsi, imei=$imei, start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule  </p> </details> |

 5. OK をクリックすると、syslog サーバープロファイルが作成されます。
 6. Objects タブをクリックすると、ログ転送プロファイル画面が開きます。
 7. 名前、ログタイプ、syslog プロファイルを指定して、ログ転送プロファイルを作成します
 8. [Agent のコンフィギュレーションディレクトリ][3]のルートに、以下の内容の pan.firewall.d/conf.yaml ファイルを作成します。

     ```yaml
     logs:
     - type: tcp
       port: 10518
       service: "firewall"
       source: "pan.firewall"
     ```
 9. [Agent を再起動します][4]。

## 収集データ

### ログ

PANOS インテグレーションは、Palo Alto Networks ファイアウォールからログを収集し、それを Datadog に転送します。

### メトリクス

PANOS インテグレーションには、メトリクスは含まれません。

### イベント

PANOS インテグレーションは、イベントを送信しません。

### サービスのチェック

PANOS インテグレーションには、サービスのチェック機能は含まれません。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ログの種類とフィールド][5]
- [ログ収集のドキュメント][6]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.youtube.com/watch?v=LOPXg0oCMPs
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[6]: https://docs.datadoghq.com/ja/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent