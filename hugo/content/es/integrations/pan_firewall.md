---
app_id: cortafuegos panorámico
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
    source_type_name: Cortafuegos de Palo Alto Networks
  saved_views:
    Authentication Protocol: assets/saved_views/top_ips_flagged_in_high_severity_threats.json
    High Severity Issues: assets/saved_views/all_high_severity_issues.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- la red
- sistema operativo y sistema
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pan_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: cortafuegos_panorámico
integration_id: cortafuegos panorámico
integration_title: Cortafuegos de Palo Alto Networks
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: cortafuegos_panorámico
public_title: Cortafuegos de Palo Alto Networks
short_description: Eventos de logs de cortafuegos de Palo Alto Networks
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Categoría::Sistema operativo
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Eventos de logs de cortafuegos de Palo Alto Networks
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: documentación
    url: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
  - resource_type: documentación
    url: https://docs.datadoghq.com/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent
  support: README.md#Soporte
  title: Cortafuegos de Palo Alto Networks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

La integración de logs de cortafuegos de Palo Alto Networks en Datadog permite a los clientes ingerir, examinar y analizar logs de cortafuegos de Palo Alto Networks. Esta integración de logs se basa en las plantillas de logs HTTPS y en la capacidad de reenvío proporcionada por PAN-OS, el sistema operativo que se ejecuta en los cortafuegos de Palo Alto Networks. PAN-OS permite a los clientes reenviar eventos de logs de amenazas, tráfico, autenticación y otros eventos de logs importantes.

### Casos clave de uso
#### Responder a eventos de amenazas de alta gravedad
Los logs de amenazas de cortafuegos proporcionan contexto sobre las amenazas detectadas por un cortafuegos, que se pueden filtrar y analizar por gravedad, tipo, direcciones IP de origen/países, etc.

#### Tomar decisiones fundamentadas sobre el despliegue de cortafuegos
Los logs de tráfico de cortafuegos se pueden utilizar para medir el tráfico y las sesiones que pasan a través de un cortafuegos y también ofrecen la posibilidad de monitorizar rendimientos anómalos a través del despliegue del cortafuegos.

#### Monitorizar anomalías de autenticación
Los logs de autenticación de cortafuegos proporcionan información detallada sobre los usuarios cuando se autentican con el cortafuegos de Palo Alto Networks. Estos logs se pueden utilizar para monitorizar picos anómalos en el tráfico de autenticación de protocolos específicos, usuarios, localizaciones y más.

## Configuración

### Recopilación de logs

 1. [Instala el Datadog Agent][1] en una máquina a la que pueda acceder el cortafuegos y que pueda conectarse a Internet. Confirma que la recopilación de logs está activada. Para activar la recopilación de logs, cambie `logs_enabled: false` por `logs_enabled: true` en el archivo de configuración principal del Agent (datadog.yaml). Para obtener más información y ejemplos, consulta la [documentación sobre la recopilación de logs en el Agent host][2].
 2. En PanOS, selecciona Dispositivo >> Perfiles de servidor >> Syslog, y añade un nombre para el perfil del servidor. Sigue los [pasos de configuración][3] del reenvío de logs. Los mismos pasos que se indican a continuación.
 3. Haz clic en Add (Añadir) y proporciona los siguientes datos del servidor:
    * Nombre del servidor
    * Dirección IP de la máquina con Datadog Agent
    * Transporte como TCP
    * Puerto como 10518 y formato como BSD
 4. Copia y configura el el formato de log personalizado para el tipo de log requerido. Los siguientes formatos son correspondencias de los formatos indicados en [los documentos de descripciones de campos de Syslog de Palo Alto Networks][4].

    | Nombre                       | Formato                                               |
    | -------------------------------| ---------------------------------------------------------- |
    | Log de tráfico | <details> <summary><i> Ver carga útil </i> </summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport, natsport=$natsport natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received, start=$start, elapsed=$elapsed, category=$category,  seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, pkts_sent=$pkts_sent, pkts_received=$pkts_received, session_end_reason=$session_end_reason, device_name=$device_name,   action_source=$action_source,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, tunnelid=$tunnelid, imsi= $imsi, monitortag=$monitortag, imei=$imei,    parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, assoc_id=$assoc_id, chunks=$chunks  chunks_sent=$chunks_sent    chunks_received=$chunks_received</code></p> </details> |
    | Log de amenazas (y logs de envíos WildFire) | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser,    app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,    evt.name=$action,  misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction,   seqno=$seqno,   actionflags=$actionflags,   network.client.geoip.country.name=$srcloc,  dstloc=$dstloc, contenttype=$contenttype,   pcap_id=$pcap_id,   filedigest=$filedigest, cloud=$cloud,   url_idx=$url_idx,   http.useragent=$user_agent, filetype=$filetype, xff=$xff    referer=$referer,   sender=$sender, subject=$subject,   recipient=$recipient,   reportid=$reportid, vsys_name=$vsys_name,   device_name=$device_name,   src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method,   tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei,   parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers</code></p> </details> |
    | Log de autenticación | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated, serial=$serial,   type=$type, subtype=$subtype,   vsys=$vsys, network.client.ip=$ip,  usr.id=$user,   normalize_user=$normalize_user, object=$object, authpolicy=$authpolicy, repeatcnt=$repeatcnt,   authid=$authid, vendor=$vendor  , logset=$logset, serverprofile=$serverprofile, message=$message    ,clienttype=$clienttype,    evt.outcome=$event, factorno=$factorno, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   evt.name=$authproto</code></p> </details> |
    | Log de HIP Match | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated,  usr.id=$srcuser, vsys=$vsys, machinename=$machinename, os=$os, network.client.ip=$src, matchname=$matchname, repeatcnt=$repeatcnt,  matchtype=$matchtype,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   srcipv6=$srcipv6,   hostid=$hostid</code></p> </details> |
    | Log de ID de usuario | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys,    network.client.ip=$ip,  usr.id=$user, datasourcename=$datasourcename,   evt.name=$eventid,  repeatcnt=$repeatcnt, timeout=$timeout, network.client.port=$beginport, network.destination.port=$endport,  datasource=$datasource, datasourcetype=$datasourcetype, seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name,   vsys_id=$vsys_id,   factortype=$factortype, factorcompletiontime=$factorcompletiontime,,    factorno=$factorno, ugflags=$ugflags,   userbysource=$userbysource</code></p> </details> |
    | Log de inspección de túneles | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated,    serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src,    network.destination.ip=$dst,    natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser,    dstuser=$dstuser,   app=$app,   vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if,   logset=$logset, sessionid=$sessionid,   repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    natsport=$natsport, natdport=$natdport, flags=$flags,   proto=$proto,   evt.outcome=$action,    severity=$severity, seqno=$seqno,   actionflags=$actionflags,   srcloc=$srcloc, dstloc=$dstloc, vsys_name=$vsys_name,   device_name=$device_name,   tunnelid=$tunnelid, monitortag=$monitortag, parent_session_id=$parent_session_id,   parent_start_time=$parent_start_time,   tunnel=$tunnel, bytes=$bytes,   network.bytes_read=$bytes_sent, network.bytes_written=$bytes_received,  packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received,   max_encap=$max_encap,   unknown_proto=$unknown_proto,   strict_check=$strict_check, tunnel_fragment=$tunnel_fragment,   sessions_created=$sessions_created, sessions_closed=$sessions_closed,   session_end_reason=$session_end_reason, evt.name=$action_source,    start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | Log SCTP | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, network.client.ip=$src,    network.destination.ip=$dst, rule=$rule, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid,    repeatcnt=$repeatcnt,   network.client.port=$sport, network.destination.port=$dport,    proto=$proto,   action=$action, vsys_name=$vsys_name,   device_name=$device_name,   seqno=$seqno,   assoc_id=$assoc_id, ppid=$ppid, severity=$severity, sctp_chunk_type=$sctp_chunk_type,   sctp_event_type=$sctp_event_type,   verif_tag_1=$verif_tag_1,   verif_tag_2=$verif_tag_2,   sctp_cause_code=$sctp_cause_code,   diam_app_id=$diam_app_id,   diam_cmd_code=$diam_cmd_code,   diam_avp_code=$diam_avp_code,   stream_id=$stream_id,   assoc_end_reason=$assoc_end_reason, op_code=$op_code,   sccp_calling_ssn=$sccp_calling_ssn, sccp_calling_gt=$sccp_calling_gt,   sctp_filter=$sctp_filter,   chunks=$chunks, chunks_sent=$chunks_sent,   chunks_received=$chunks_received,   packets=$packets,   pkts_sent=$pkts_sent,   pkts_received=$pkts_received</code></p> </details> |
    | Log de configuración | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated,  serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$host,   vsys=$vsys, evt.name=$cmd,  usr.id=$admin,  client=$client, evt.outcome=$result,    path=$path, before_change_detail=$before_change_detail, after_change_detail=$after_change_detail,   seqno=$seqno,   actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | Log de sistema | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype, vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name, device_name=$device_name</code></p> </details> |
    | Log de eventos correlacionados | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$time_generated, serial=$serial, type=$type, subtype=$subtype,  vsys=$vsys, evt.name=$eventid,  object=$object, module=$module, severity=$severity, opaque=$opaque, seqno=$seqno, actionflags=$actionflags, vsys_name=$vsys_name,   device_name=$device_name</code></p> </details> |
    | Log GTP | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$start, serial=$serial, type=$type, subtype=$subtype,    network.client.ip=$src, network.destination.ip=$dst, rule=$rule, app=$app, vsys=$vsys,  from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset,   sessionid=$sessionid,   network.client.port=$sport, network.destination.port=$dport, proto=$proto,  evt.name=$action,   event_type=$event_type, msisdn=$msisdn, apn=$apn,   rat=$rat,   msg_type=$msg_type, end_ip_adr=$end_ip_adr, teid1=$teid1,   teid2=$teid2,   gtp_interface=$gtp_interface,   cause_code=$cause_code, severity=$severity, mcc=$mcc,   mnc=$mnc,   area_code=$area_code,   cell_id=$cell_id,   event_code=$event_code, srcloc=$srcloc, dstloc=$dstloc, imsi=$imsi, imei=$imei, start=$start,   elapsed=$elapsed,   tunnel_insp_rule=$tunnel_insp_rule</code></p> </details> |
    | Log de filtrado de datos | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser, app=$app, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid, repeatcnt=$repeatcnt, network.client.port=$sport, network.destination.port=$dport, natsport=$natsport, natdport=$natdport, flags=$flags, proto=$proto, evt.name=$action, misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction, seqno=$seqno, actionflags=$actionflags, network.client.geoip.country.name=$srcloc, dstloc=$dstloc, contenttype=$contenttype, pcap_id=$pcap_id, filedigest=$filedigest, cloud=$cloud, url_idx=$url_idx, http.useragent=$user_agent, filetype=$filetype, xff=$xff, referer=$referer, sender=$sender, subject=$subject, recipient=$recipient, reportid=$reportid, vsys_name=$vsys_name, device_name=$device_name, src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method, tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei, parent_session_id=$parent_session_id, parent_start_time=$parent_start_time, tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers, url_category_list=$url_category_list, rule_uuid=$rule_uuid, http2_connection=$http2_connection, dynusergroup_name=$dynusergroup_name, xff_ip=$xff_ip, src_osfamily=$src_osfamily, src_osversion=$src_osversion, src_host=$src_host, src_mac=$src_mac, dst_osfamily=$dst_osfamily, dst_osversion=$dst_osversion, dst_host=$dst_host, dst_mac=$dst_mac, container_id=$container_id, pod_namespace=$pod_namespace, pod_name=$pod_name, src_edl=$src_edl, dst_edl=$dst_edl, hostid=$hostid, serialnumber=$serialnumber, domain_edl=$domain_edl, src_dag=$src_dag, dst_dag=$dst_dag, partial_hash=$partial_hash, high_res_timestamp=$high_res_timestamp, reason=$reason, justification=$justification</code></p> </details> |
    | Log de filtrado de URL | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, network.client.ip=$src, network.destination.ip=$dst, natsrc=$natsrc, natdst=$natdst, rule=$rule, usr.id=$srcuser, dstuser=$dstuser, app=$app, vsys=$vsys, from=$from, to=$to, inbound_if=$inbound_if, outbound_if=$outbound_if, logset=$logset, sessionid=$sessionid, repeatcnt=$repeatcnt, network.client.port=$sport, network.destination.port=$dport, natsport=$natsport, natdport=$natdport, flags=$flags, proto=$proto, evt.name=$action, misc=$misc, threatid=$threatid, category=$category, severity=$severity, direction=$direction, seqno=$seqno, actionflags=$actionflags, network.client.geoip.country.name=$srcloc, dstloc=$dstloc, contenttype=$contenttype, pcap_id=$pcap_id, filedigest=$filedigest, cloud=$cloud, url_idx=$url_idx, http.useragent=$user_agent, filetype=$filetype, xff=$xff, referer=$referer, sender=$sender, subject=$subject, recipient=$recipient, reportid=$reportid, vsys_name=$vsys_name, device_name=$device_name, src_uuid=$src_uuid, dst_uuid=$dst_uuid, http_method=$http_method, tunnel_id=$tunnel_id, imsi=$imsi, monitortag=$monitortag, imei=$imei, parent_session_id=$parent_session_id, parent_start_time=$parent_start_time, tunnel=$tunnel, thr_category=$thr_category, contentver=$contentver, assoc_id=$assoc_id, ppid=$ppid, http_headers=$http_headers, url_category_list=$url_category_list, rule_uuid=$rule_uuid, http2_connection=$http2_connection, dynusergroup_name=$dynusergroup_name, xff_ip=$xff_ip, src_osfamily=$src_osfamily, src_osversion=$src_osversion, src_host=$src_host, src_mac=$src_mac, dst_osfamily=$dst_osfamily, dst_osversion=$dst_osversion, dst_host=$dst_host, dst_mac=$dst_mac, container_id=$container_id, pod_namespace=$pod_namespace, pod_name=$pod_name, src_edl=$src_edl, dst_edl=$dst_edl, hostid=$hostid, serialnumber=$serialnumber, domain_edl=$domain_edl, src_dag=$src_dag, dst_dag=$dst_dag, partial_hash=$partial_hash, high_res_timestamp=$high_res_timestamp, reason=$reason, justification=$justification</code></p> </details> |
    | Log GlobalProtect | <details> <summary><i> Ver carga útil </i></summary> <p><code>timestamp=$receive_time, serial=$serial, type=$type, subtype=$subtype, time_generated=$time_generated, vsys=$vsys, evt.name=$eventid, stage=$stage, auth_method=$auth_method, tunnel_type=$tunnel_type, usr.id=$srcuser, srcregion=$srcregion, machinename=$machinename, public_ip=$public_ip, public_ipv6=$public_ipv6, private_ip=$private_ip, private_ipv6=$private_ipv6, hostid=$hostid, serialnumber=$serialnumber, client_ver=$client_ver, client_os=$client_os, client_os_ver=$client_os_ver, repeatcnt=$repeatcnt, reason=$reason, error=$error, opaque=$opaque, status=$status, location=$location, login_duration=$login_duration, connect_method=$connect_method, error_code=$error_code, portal=$portal, seqno=$seqno, actionflags=$actionflags, selection_type=$selection_type, response_time=$response_time, priority=$priority, attempted_gateways=$attempted_gateways, gateway=$gateway, dg_hier_level_1=$dg_hier_level_1, dg_hier_level_2=$dg_hier_level_2, dg_hier_level_3=$dg_hier_level_3, dg_hier_level_4=$dg_hier_level_4, vsys_name=$vsys_name, device_name=$device_name, vsys_id=$vsys_id</code></p> </details> |

 5. Haz clic en OK para crear un perfil de servidor syslog.
 6. Haz clic en la pestaña Objects (Objetos) para abrir la pantalla del perfil de reenvío de logs.
 7. Crear el perfil de reenvío de logs proporcionando el nombre, el tipo de log y el perfil syslog
 8. Crea un archivo pan.firewall.d/conf.yaml en la raíz del [directorio de configuración del Agent][5] con el siguiente contenido.

     ```yaml
     logs:
     - type: tcp
       port: 10518
       service: "firewall"
       source: "pan.firewall"
     ```
 9. [Reinicia el Agent][6].

## Datos recopilados

### Métricas

Las métricas recopiladas de esta integración están determinadas por los perfiles configurados pertinentes en la página de [proveedores de red][7].

### Logs

La integración PAN-OS recopila logs de la integración del cortafuegos de Palo Alto Networks y los reenvía a Datadog.

### Eventos

La integración PAN-OS no envía eventos.

### Checks de servicio

La integración PAN-OS no incluye checks de servicio.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Tipos y campos de logs][8]
- [Documentación sobre la recopilación de logs][9]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/logs/
[3]: https://www.youtube.com/watch?v=LOPXg0oCMPs
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[8]: https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions
[9]: https://docs.datadoghq.com/es/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent
[10]: https://docs.datadoghq.com/es/help/