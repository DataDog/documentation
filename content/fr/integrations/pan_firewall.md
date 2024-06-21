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
- log collection
- security
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pan_firewall/README.md
display_name: Pare-feu Palo Alto Networks
draft: false
git_integration_title: pan_firewall
guid: f7f2aa4b-cb93-4406-975d-3a282fef6d0e
integration_id: pan-firewall
integration_title: Pare-feu Palo Alto Networks
integration_version: 1.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pan.firewall
metric_to_check: ''
name: pan_firewall
process_signatures: []
public_title: Intégration Datadog/Pare-feu Palo Alto Networks
short_description: 'Événements de log du pare-feu Palo Alto Networks '
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

La collecte de logs de l'intégration Datadog/Pare-feu Palo Alto Networks permet aux utilisateurs d'ingérer, de parser et d'analyser les logs des pare-feu Palo Alto Networks. Cette intégration de log repose sur les fonctionnalités de création de modèles et de transmission de logs HTTPS proposées par PAN-OS, le système d'exploitation exécuté par les pare-feu Palo Alto. PAN-OS permet aux utilisateurs de transmettre des événements de menace, de trafic et d'authentification ou tout autre événement de log important.

### Principaux cas d'utilisation
#### Répondre aux événements de menace graves
Les logs de menace des pare-feu fournissent des éléments de contexte sur les menaces détectées par les pare-feu. Ils peuvent être filtrés et analysés en fonction de leur sévérité, de leur type, de leur pays/IP d'origine, et plus encore.

#### Prendre des décisions éclairées concernant le déploiement de pare-feu
Les logs de trafic des pare-feu peuvent servir à mesurer le trafic et les sessions qui transitent par le pare-feu. Ils vous permettent de détecter tout débit anormal sur l'ensemble du déploiement des pare-feu.

#### Surveiller les anomalies d'authentification
Les logs d'authentification des pare-feu fournissent des informations détaillées concernant les utilisateurs qui s'authentifient auprès d'un pare-feu Palo Alto Networks. Ces logs peuvent être utilisés pour surveiller les pics anormaux de trafic d'authentification provenant de protocoles, d'utilisateurs ou encore d'emplacements spécifiques.

## Configuration

### Collecte de logs

 1. [Installez l'Agent Datadog][1] sur une machine ayant accès à Internet et à laquelle le pare-feu peut accéder.
 2. Dans PAN-OS, sélectionnez Device > Server Profiles > Syslog, puis attribuez un nom au profil de serveur. Suivez ensuite les [étapes de configuration][2] pour la transmission des logs Syslog. Cette procédure indiquée ci-dessous.
 3. Cliquez sur Add et définissez les paramètres suivants pour le serveur :
    * Le nom du serveur
    * L'adresse IP de la machine exécutant l'Agent Datadog
    * Le transport (TCP)
    * Le port (10518) et le format (BSD)
 4. Copiez et configurez le format de log personnalisé pour le type de log requis.

    | Nom                         | Format                                                |
    | -------------------------------| ---------------------------------------------------------- |
    | Traffic Log | <details> <summary><i> Afficher la charge utile </i> </summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport, natsport=$natsport natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received, start=$start, elapsed=$elapsed, category=$category,  seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, pkts_sent=$pkts_sent, pkts_received=$pkts_received, session_end_reason=$session_end_reason, device_name=$device_name,   action_source=$action_source,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, tunnelid=$tunnelid, imsi= $imsi, monitortag=$monitortag, imei=$imei,    parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, assoc_id=$assoc_id, chunks=$chunks  chunks_sent=$chunks_sent    chunks_received=$chunks_received</code></p> </details> |
    | Threat Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction,   seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, contenttype=$contenttype,   pcap_id=$pcap_id,   filedigest=$filedigest, cloud=$cloud,   url_idx=$url_idx,   http.useragent=$user_agent, filetype=$filetype, xff=$xff    referer=$referer,   sender=$sender, subject=$subject,   recipient=$recipient,   reportid=$reportid, vsys_name=$vsys_name,   device_name=$device_name,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method,   tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei,   parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers</code></p> </details> |
    | Authentication Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$time_generated, serial=$serial,   type=$type, subtype=$subtype,   vsys=$vsys, network.client.ip=$ip,  usr.id=$user,   normalize_user=$normalize_user, object=$object, authpolicy=$authpolicy, repeatcnt=$repeatcnt,   authid=$authid, vendor=$vendor  , logset=$logset, serverprofile=$serverprofile, message=$message    ,clienttype=$clienttype,    evt.outcome=$event, factorno=$factorno, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   evt.name=$authproto</code></p> </details> |
    | HIP Match Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated,  usr.id=$srcuser, vsys=$vsys, machinename=$machinename, os=$os, network.client.ip=$src, matchname=$matchname, repeatcnt=$repeatcnt,  matchtype=$matchtype,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   srcipv6=$srcipv6,   hostid=$hostid</code></p> </details> |
    | User-ID Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys,    network.client.ip=$ip,  usr.id=$user, datasourcename=$datasourcename,   evt.name=$eventid,  repeatcnt=$repeatcnt, timeout=$timeout, network.client.port=$beginport, network.destination.port=$endport,  datasource=$datasource, datasourcetype=$datasourcetype, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   factortype=$factortype, factorcompletiontime=$factorcompletiontime,,    factorno=$factorno, ugflags=$ugflags,   userbysource=$userbysource</code></p> </details> |
    | Tunnel Inspection Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$time_generated,    serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src,    network.destination.ip=$dst,    natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser,    dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,   evt.outcome=$action,    severity=$severity, seqno=$seqno,   actionflags=$actionflags,   srcloc=$srcloc, dstloc=$dstloc, vsys_name=$vsys_name,   device_name=$device_name,   tunnelid=$tunnelid, monitortag=$monitortag, parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received,  packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received,   max_encap=$max_encap,   unknown_proto=$unknown_proto,   strict_check=$strict_check, tunnel_fragment=$tunnel_fragment,   sessions_created=$sessions_created, sessions_closed=$sessions_closed,   session_end_reason=$session_end_reason, evt.name=$action_source,    start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | SCTP Log | <details> <summary><i> Afficher la charge utile  </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, network.client.ip=$src,    network.destination.ip=$dst, rule=$rule, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid,    repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    proto=$proto,   action=$action, vsys_name=$vsys_name,   device_name=$device_name,   seqno=$seqno,   assoc_id=$assoc_id, ppid=$ppid, severity=$severity, sctp_chunk_type=$sctp_chunk_type,   sctp_event_type=$sctp_event_type,   verif_tag_1=$verif_tag_1,   verif_tag_2=$verif_tag_2,   sctp_cause_code=$sctp_cause_code,   diam_app_id=$diam_app_id,   diam_cmd_code=$diam_cmd_code,   diam_avp_code=$diam_avp_code,   stream_id=$stream_id,   assoc_end_reason=$assoc_end_reason, op_code=$op_code,   sccp_calling_ssn=$sccp_calling_ssn, sccp_calling_gt=$sccp_calling_gt,   sctp_filter=$sctp_filter,   chunks=$chunks, chunks_sent=$chunks_sent,   chunks_received=$chunks_received,   packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received</code></p> </details> |
    | Config Log | <details> <summary><i> Afficher la charge utile  </i></summary> <p><code>timestamp=$time_generated,  serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$host,   vsys=$vsys, evt.name=$cmd,  usr.id=$admin,  client=$client, evt.outcome=$result,    path=$path, before_change_detail=$before_change_detail, after_change_detail=$after_change_detail,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | System Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | Correlated Events Log | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype,  vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name,   device_name=$device_name</code></p> </details> |
    | GTP Log  | <details> <summary><i> Afficher la charge utile </i></summary> <p><code>timestamp=$start, serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src, network.destination.ip=$dst, rule=$rule, app=$app, vsys=$vsys,  from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset,   sessionid=$sessionid,   network.client.port=$sport, network.destination.port=$dport, proto=$proto,  evt.name=$action,   event_type=$event_type, msisdn=$msisdn, apn=$apn,   rat=$rat,   msg_type=$msg_type, end_ip_adr=$end_ip_adr, teid1=$teid1,   teid2=$teid2,   gtp_interface=$gtp_interface,   cause_code=$cause_code, severity=$severity, mcc=$mcc,   mnc=$mnc,   area_code=$area_code,   cell_id=$cell_id,   event_code=$event_code, srcloc=$srcloc, dstloc=$dstloc, imsi=$imsi, imei=$imei, start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |

 5. Cliquez sur OK pour créer un profil de serveur syslog.
 6. Cliquez sur l'onglet Objects pour ouvrir l'écran du profil de transmission des logs.
 7. Créez un profil de transmission des logs en indiquant un nom, un type de log et un profil syslog.
 8. Créez un fichier pan.firewall.d/conf.yaml à la racine du [répertoire de configuration de l'Agent][3] avec le contenu ci-dessous.

     ```yaml
     logs:
     - type: tcp
       port: 10518
       service: "firewall"
       source: "pan.firewall"
     ```
 9. [Redémarrez l'Agent][4].

## Données collectées

### Logs

L'intégration PANOS recueille des logs à partir de l'intégration Pare-feu Palo Alto Networks et les transmet à Datadog.

### Métriques

L'intégration PANOS n'inclut aucune métrique.

### Événements

L'intégration PANOS n'envoie aucun événement.

### Checks de service

L'intégration PANOS n'inclut aucun check de service.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Types et champs de logs][5]
- [Documentation dédiée à la collecte de logs][6]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.youtube.com/watch?v=LOPXg0oCMPs
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6v7
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[6]: https://docs.datadoghq.com/fr/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent