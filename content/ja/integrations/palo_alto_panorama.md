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
custom_kind: integration
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
short_description: Panorama ファイアウォール ログのインサイトを取得します。Cloud SIEM に接続 します。
supported_os:
- linux
- windows
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
  description: Panorama ファイアウォール ログのインサイトを取得します。Cloud SIEM に接続 します。
  media:
  - caption: 'Palo Alto Panorama: Traffic'
    image_url: images/palo_alto_panorama_traffic.png
    media_type: image
  - caption: 'Palo Alto Panorama: Threat'
    image_url: images/palo_alto_panorama_threat.png
    media_type: image
  - caption: 'Palo Alto Panorama: Config'
    image_url: images/palo_alto_panorama_config.png
    media_type: image
  - caption: 'Palo Alto Panorama: System'
    image_url: images/palo_alto_panorama_system.png
    media_type: image
  - caption: 'Palo Alto Panorama: Decryption'
    image_url: images/palo_alto_panorama_decryption.png
    media_type: image
  - caption: 'Palo Alto Panorama: Global Protect'
    image_url: images/palo_alto_panorama_global_protect.png
    media_type: image
  - caption: 'Palo Alto Panorama: Tunnel Inspection'
    image_url: images/palo_alto_panorama_tunnel_inspection.png
    media_type: image
  - caption: 'Palo Alto Panorama: Authentication'
    image_url: images/palo_alto_panorama_authentication.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Palo Alto Panorama
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Palo Alto Panorama][1] は Palo Alto Networks が開発したセキュリティ管理ソフトウェア アプリケーションです。Palo Alto Network ファイアウォールを一元的に管理・ログ収集・レポートするために設計されています。

このインテグレーションは、Traffic、Threat、Authentication、HIP Match、User ID、Tunnel Inspection、Config、System、Correlated Events、URL Filtering、Data Filtering、GlobalProtect、Decryption の各種ログタイプを取り込み、ログ パイプラインで付加情報を付与し、データを Datadog 標準属性に正規化します。

このインテグレーションは、受信・送信トラフィックフロー、脅威詳細、ユーザー認証情報、GlobalProtect が生成するイベント、ユーザーと IP アドレスのマッピングなどについて詳細なインサイトを提供するダッシュボード ビジュアライゼーションを提供します。

## セットアップ

### インストール

Palo Alto Panorama インテグレーションをインストールするには、次の Agent インストール コマンドと以下の手順を実行します。詳細は [Integration Management ドキュメント][2]を参照してください。

**注**: Agent バージョン >= 7.52.0 ではこの手順は不要です。

Linux コマンド:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-palo_alto_panorama==1.0.0
  ```

### 構成

#### ログ収集

**Palo Alto Panorama:**

1. Datadog Agent ではデフォルトでログ収集は無効になっています。`datadog.yaml` ファイルで有効化してください。

   ```yaml
   logs_enabled: true
   ```

2. Palo Alto Panorama のログ収集を開始するには、この設定ブロックを `palo_alto_panorama.d/conf.yaml` ファイルに追加します。

   利用可能な設定オプションは[サンプル palo_alto_panorama.d/conf.yaml][3] を参照してください。

   ```yaml
   logs:
     - type: tcp  # Choose either 'tcp' or 'udp' based on your requirements
       port: <PORT>
       service: palo-alto-panorama
       source: palo-alto-panorama
   ```

3. [Agent を再起動][4]します。

4. Panorama を設定して Datadog にデータを送信します:
   1. Panorama システムにログイン
   2. [Syslog ログ転送][5]の設定手順に従います。
      1. 手順 1.4 では `Transport` タイプとして `TCP/UDP`、`syslog messages` のフォーマットとして `BSD` を使用します。
      2. 手順 1.5 では以下のカスタムログフォーマットを使用します:
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


### 検証

[Agent の status サブ コマンド][6]を実行し、Checks セクションに `palo_alto_panorama` が表示されていることを確認します。

## 収集データ

### ログ

Palo Alto Panorama インテグレーションは Traffic、Threat、Authentication、HIP Match、User ID、Tunnel Inspection、Config、System、Correlated Events、URL Filtering、Data Filtering、GlobalProtect、Decryption の各ログを収集します。

### メトリクス

Palo Alto Panorama インテグレーションにはメトリクスは含まれません。

### イベント

Palo Alto Panorama インテグレーションにはイベントは含まれません。

### サービス チェック

Palo Alto Panorama インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

**ポート バインド時の Permission denied:**

Agent ログに **Permission denied** エラーが表示された場合は、次の手順を参照してください。

   1. 1024 未満のポート番号にバインドするには昇格権限が必要です。`setcap` コマンドでそのポートへのアクセスを許可してください:

      - `setcap` コマンドでポートへのアクセスを付与:

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - `getcap` コマンドで設定を確認:

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         期待される出力:

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **注**: Agent をアップグレードするたびに、この `setcap` コマンドを再実行してください。

   2. [Agent を再起動します][4]。

**データが収集されない:**

ファイアウォールが有効な場合、設定したポートのトラフィックがバイパスされているか確認してください。

**Port already in use:**

**Port <PORT-NO\> Already in Use** エラーが表示された場合の対処例 (PORT‑NO = 514):

Syslog を使用しているシステムで、Agent が Zeek ログをポート 514 で受信しようとすると、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

これは Syslog がデフォルトでポート 514 を使用しているためです。解決策として以下のいずれかを実施してください:
- Syslog を無効化する
- Agent を別の空いているポートでリッスンさせる

追加サポートが必要な場合は [Datadog サポート][7]までお問い合わせください。

[1]: https://www.paloaltonetworks.com/network-security/panorama
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/palo_alto_panorama/datadog_checks/palo_alto_panorama/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-syslog-for-monitoring/configure-syslog-monitoring
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/