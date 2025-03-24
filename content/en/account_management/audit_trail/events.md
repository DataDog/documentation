---
title: Audit Trail Events
aliases:
    - /account_management/audit_trail_events/
further_reading:
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn more about Audit Trail"

---

## Overview

[Datadog Audit Trail][1] records more than 100 types of audit events from across the Datadog platform. These audit events are categorized into different product categories as event names.


{{< account_management/audit_events description="See the [Audit Trail documentation](/account_management/audit_trail/) for more information on setting up and configuring Audit Trail." >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/
[3]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Apassword%20%40action%3Amodified
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arestriction_policy
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Amodified%20
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Acreated%20
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Acreated%20
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40asset.type%3Aagent_flare%20%40action%3Acreated
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Amodified%20
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[18]: /tracing/trace_pipeline/trace_retention/#retention-filters
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[20]: /tracing/trace_pipeline/generate_metrics/
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[22]: /tracing/trace_explorer/facets/
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[24]: /tracing/guide/configuring-primary-operation/
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[26]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40asset.type%3Asamplerconfig
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Audit%20Trail%22%20%40asset.type%3Aaudit_events_csv
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_repository%20%40action%3Amodified
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_test_service_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%29
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Agithub_opt_ins%20%28%40action%3Amodified%20OR%20%40action%3Adeleted%29
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_exclusion_filters%20%40action%3Amodified
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Quality%20Gates%22%20%40asset.type%3Aci_app_quality_gates%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[41]: https://roadie.io/docs/integrations/datadog/
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Alog_probe
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Ametric_probe
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Aspan_probe
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_logs%20%40action%3A%28created%20OR%20deleted%29
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_inclusion_filter
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_query
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_csv
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[75]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[76]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[77]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization%20Management%22%20%40asset.type%3Aorganization%20%40action%3Acreated
[78]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[79]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[80]: https://app.datadoghq.com/audit-trail?query=%40asset.type%3Asession_replay%20%40evt.name%3A%22Real%20User%20Monitoring%22%20%40action%3Aaccessed%20
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40asset.type%3A%28api_key%20OR%20application_key%29
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Aunusual_login
[84]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[85]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[86]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[87]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[88]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[89]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[90]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[91]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[92]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[93]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[94]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28uploaded%20OR%20imported%29
[95]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Teams%20Management%22%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[96]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow%20%40action%3A%28modified%20OR%20created%20OR%20deleted%20OR%20executed%29
[97]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_schedule%20%40action%3A%28modified%20OR%20created%20OR%20deleted%29
[98]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_action%20%40action%3Aresponded
[99]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Custom%20Connections%22%20%40asset.type%3Acustom_connection
[100]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[101]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[102]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser_invite
[103]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Alog_forwarding%20
[104]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Amodified%20%40asset.type%3Aindex_list%20
[105]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Amodified%20%40asset.type%3Aarchive_list%20
[106]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Asaved_view%20
[107]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22App%20Builder%22%20%40asset.type%3Aquery%20%40action%3Astarted%20
[108]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22App%20Builder%22%20%40asset.type%3Aquery%20%40action%3Aexecuted%20
[109]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22App%20Builder%22%20%40asset.type%3Aapp%20%40action%3A%28accessed%20OR%20created%20OR%20modified%20OR%20published%20OR%20deleted%20OR%20reverted%20OR%20unpublished%29%20
[110]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40action%3Acompleted%20%40asset.type%3Astep%20
[111]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Aworkflow_notifications%20
[112]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Asaved_view%20
[113]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Acustom_metrics%20
[114]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40action%3Amodified%20%40asset.type%3Asensitive_data_scanner_scanning_group_list%20
[115]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Aip_allowlist%20%40action%3Amodified
[116]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Apps%20Datastore%22%20%40asset.type%3A%28datastore%20OR%20datastore_list%29%20%40action%3A%28queried%20OR%20created%20OR%20deleted%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name&agg_q_source=base&agg_t=count&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=stream&x_missing=true&from_ts=1740047181634&to_ts=1740048081634&live=true
[117]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Apps%20Datastore%22%20%40asset.type%3A%28item%20OR%20item_query%29%20%40action%3A%28created%20OR%20deleted%20OR%20modified%20OR%20queried%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name&agg_q_source=base&agg_t=count&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=stream&x_missing=true&from_ts=1740047539454&to_ts=1740048439454&live=true
[118]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Event%20Management%22%20%40asset.type%3Aevent_correlation&agg_m=count&agg_m_source=base&agg_q=%40evt.name&agg_q_source=base&agg_t=count&cols=log_usr.id%2Clog_action%2Clog_evt.name
[119]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Event%20Management%22%20%40asset.type%3Acustom_metrics&agg_m=count&agg_m_source=base&agg_q=%40evt.name
[120]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Private%20Action%20Runners%22%20%40asset.type%3Aprivate_action_runner%20%40action%3A%28accessed%20OR%20created%20OR%20deleted%20OR%20modified%20OR%20attached%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name
[121]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Private%20Action%20Runners%22%20%40asset.type%3Aquery_intent%20%40action%3A%28validated%20OR%20created%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name
[122]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Private%20Action%20Runners%22%20%40asset.type%3Arunner_enrollment%20%40action%3A%28completed%20OR%20created%29
[123]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_draft%20%40action%3Acreated
[124]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_draft%20%40action%3Amodified
[125]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Aaccessed
[126]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Amodified
[127]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Acreated
[128]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Adeleted
[129]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration_list%20%40action%3Aaccessed
[130]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Aobs_pipelines%20%40action%3Aaccessed
[131]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22worker%20versions%20list%22
[132]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22configuration%20count%22
[133]:https://app.datadoghq.com/audit-trail?query=evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22pipeline%20list%22
[134]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22pipeline%22
[135]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22worker%20configuration%20component%22
[136]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22version%20hash%20list%22
[137]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22worker%20component%20list%22
[138]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Adeployment&agg_m=count
[139]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Adraft&agg_m=count&agg_m_source=base
