---
title: Events API Intergation_id Attribute

disable_toc: true
private: true
---

## Overview

Post events for specific integrations using the [Events API][1] and the `integration_id` attribute.

Search for events in the event explorer using `source:<SEARCH_TERM>`.

**Note**: More integration_id values will be supported. For integration info, check [Integrations][2] and [Marketplace][3].


## Parameters

| Integration Name                                | Integration ID                                | Search Term                                |
|:------------------------------------------------|:----------------------------------------------|:-------------------------------------------|
| Adaptive Shield                                 | adaptive-shield                               | adaptive_shield                            |
| Agentil Software SAP BusinessObjects            | agentil-software-sap-businessobjects          | agentil_software_sap_businessobjects       |
| Agentil Software SAP HANA                       | agentil-software-sap-hana                     | agentil_software_sap_hana                  |
| Agentil Software SAP NetWeaver                  | agentil-software-sap-netweaver                | agentil_software_sap_netweaver             |
| Anecdote                                        | anecdote                                      | anecdote                                   |
| Automonx PRTG Datadog Alerts                    | automonx-prtg-datadog-alerts                  | automonx_prtg_datadog_alerts_integration   |
| Blink                                           | blink                                         | blink                                      |
| Blue Matador                                    | blue-matador                                  | blue_matador                               |
| Buoyant Cloud                                   | buoyant-cloud                                 | buoyant_cloud                              |
| Causely                                         | causely                                       | causely                                    |
| Census                                          | census                                        | census                                     |
| Cisco ACI                                       | cisco-aci                                     | cisco_aci                                  |
| Cloudaeye                                       | cloudaeye                                     | cloudaeye                                  |
| ConfigCat                                       | configcat                                     | configcat                                  |
| Consul                                          | consul                                        | consul                                     |
| Container                                       | container                                     | container                                  |
| Containerd                                      | containerd                                    | containerd                                 |
| Crest Data Systems Anomali Threatstream         | crest-data-systems-anomali-threatstream       | crest_data_systems_anomali_threatstream    |
| Crest Data Systems Armis                        | crest-data-systems-armis                      | crest_data_systems_armis                   |
| Crest Data Systems Barracuda WAF                | crest-data-systems-barracuda-waf              | crest_data_systems_barracuda_waf           |
| Crest Data Systems Cisco Secure Workload        | crest-data-systems-cisco-secure-workload      | crest_data_systems_cisco_secure_workload   |
| Crest Data Systems Cloudflare AI Gateway        | crest-data-systems-cloudflare-ai-gateway      | crest_data_systems_cloudflare_ai_gateway   |
| Crest Data Systems Commvault                    | crest-data-systems-commvault                  | crest_data_systems_commvault               |
| Crest Data Systems CyberArk Identity            | crest-data-systems-cyberark-identity          | crest_data_systems_cyberark_identity       |
| Crest Data Systems Dell EMC Isilon              | crest-data-systems-dell-emc-isilon            | crest_data_systems_dell_emc_isilon         |
| Crest Data Systems Intel One API                | crest-data-systems-intel-one-api              | crest_data_systems_intel_one_api           |
| Crest Data Systems Ivanti UEM                   | crest-data-systems-ivanti-uem                 | crest_data_systems_ivanti_uem              |
| Crest Data Systems Lansweeper                   | crest-data-systems-lansweeper                 | crest_data_systems_lansweeper              |
| Crest Data Systems Netskope                     | crest-data-systems-netskope                   | crest_data_systems_netskope                |
| Crest Data Systems Proofpoint Email Security    | crest-data-systems-proofpoint-email-security  | crest_data_systems_proofpoint_email_security|
| Crest Data Systems Sentinel One                 | crest-data-systems-sentinel-one               | crest_data_systems_sentinel_one            |
| Crest Data Systems Sybase                       | crest-data-systems-sybase                     | crest_data_systems_sybase                  |
| Crest Data Systems Sysdig                       | crest-data-systems-sysdig                     | crest_data_systems_sysdig                  |
| Crest Data Systems TogetherAI                   | crest-data-systems-togetherai                 | crest_data_systems_togetherai              |
| Crest Data Systems Vectra                       | crest-data-systems-vectra                     | crest_data_systems_vectra                  |
| Custom Events                                   | custom-events                                 | my_apps                                    |
| Cybersixgill Actionable Alerts                  | cybersixgill-actionable-alerts                | cybersixgill_actionable_alerts             |
| Docker                                          | docker                                        | docker                                     |
| DoctorDroid                                     | doctordroid                                   | doctor_droid                               |
| Elasticsearch                                   | elasticsearch                                 | elasticsearch                              |
| Event Viewer                                    | event-viewer                                  | event_viewer                               |
| Fairwinds Insights                              | fairwinds-insights                            | fairwinds_insights                         |
| Flagsmith                                       | flagsmith                                     | flagsmith                                  |
| GNAT Streaming                                  | gnatsd-streaming                              | gnatsd_streaming                           |
| Gremlin                                         | gremlin                                       | gremlin                                    |
| HAProxy                                         | haproxy                                       | haproxy                                    |
| Helm                                            | helm                                          | helm                                       |
| IBM DB2                                         | ibm-db2                                       | ibm_db2                                    |
| iLert                                           | ilert                                         | ilert                                      |
| IsDown                                          | isdown                                        | isdown                                     |
| Kafka Consumer                                  | kafka-consumer                                | kafka_consumer                             |
| Kitepipe AtomWatch                              | kitepipe-atomwatch                            | atomwatch                                  |
| Kitepipe BoomiWatch                             | kitepipe-boomiwatch                           | boomiwatch                                 |
| Kubernetes Admission                            | kubernetes-admission                          | kubernetes_admission                       |
| Kubernetes                                      | kubernetes                                    | kubernetes                                 |
| LaunchDarkly                                    | launchdarkly                                  | launchdarkly                               |
| Logstash                                        | logstash                                      | logstash                                   |
| MongoDB Atlas                                   | mongodb-atlas                                 | mongodb_atlas                              |
| MongoDB                                         | mongodb                                       | mongodb                                    |
| MySQL                                           | mysql                                         | mysql                                      |
| Nagios                                          | nagios                                        | nagios                                     |
| NeoLoad                                         | neoload                                       | neoload                                    |
| NerdVision                                      | nerdvision                                    | nerdvision                                 |
| Nomad                                           | nomad                                         | nomad                                      |
| OnePane                                         | onepane                                       | onepane                                    |
| OOM Kill                                        | oom-kill                                      | oom_kill                                   |
| PerimeterX                                      | perimeterx                                    | perimeterx                                 |
| Podman                                          | podman                                        | podman                                     |
| Postman                                         | postman                                       | postman                                    |
| RabbitMQ                                        | rabbitmq                                      | rabbitmq                                   |
| RapDev Commvault Cloud                          | rapdev-commvault-cloud                        | rapdev_commvault_cloud                     |
| RapDev Commvault                                | rapdev-commvault                              | rapdev_commvault                           |
| RapDev GMeet                                    | rapdev-gmeet                                  | rapdev_gmeet                               |
| RapDev O365                                     | rapdev-o365                                   | office_365                                 |
| RapDev Rapid7                                   | rapdev-rapid7                                 | rapdev_rapid7                              |
| RapDev ServiceNow                               | rapdev-servicenow                             | rapdev_servicenow                          |
| RapDev Veeam                                    | rapdev-veeam                                  | rapdev_veeam                               |
| RBLTracker                                      | rbltracker                                    | rbltracker                                 |
| Redis Enterprise                                | redisenterprise                               | redis_enterprise                           |
| RedPeaks SAP BusinessObjects                    | redpeaks-sap-businessobjects                  | redpeaks_sap_businessobjects               |
| RedPeaks SAP HANA                               | redpeaks-sap-hana                             | redpeaks_sap_hana                          |
| RedPeaks SAP NetWeaver                          | redpeaks-sap-netweaver                        | redpeaks_sap_netweaver                     |
| Rigor                                           | rigor                                         | rigor                                      |
| Scalr                                           | scalr                                         | scalr_(community_version)                  |
| Seagence                                        | seagence                                      | seagence                                   |
| Signal Sciences                                 | sigsci                                        | signal_sciences                            |
| Silk                                            | silk                                          | silk                                       |
| SortDB                                          | sortdb                                        | sortdb                                     |
| SOSivio                                         | sosivio                                       | sosivio                                    |
| Speedscale                                      | speedscale                                    | speedscale                                 |
| Split                                           | split                                         | split                                      |
| StackPulse                                      | stackpulse                                    | stackpulse                                 |
| Statsig                                         | statsig                                       | statsig                                    |
| Statsig                                         | statsig-statsig                               | statsig_license                            |
| Steadybit                                       | steadybit                                     | steadybit                                  |
| TeamCity                                        | teamcity                                      | teamcity                                   |
| TiDB Cloud                                      | tidb-cloud                                    | tidb_cloud                                 |
| TokuMX                                          | tokumx                                        | tokumx                                     |
| TorchServe                                      | torchserve                                    | torchserve                                 |
| Torq                                            | torq                                          | torq                                       |
| Trek10 Coverage Advisor                         | trek10-coverage-advisor                       | trek10_aws_coverage_advisor                |
| Twingate                                        | twingate                                      | twingate                                   |
| Twistlock                                       | twistlock                                     | twistlock                                  |
| TypingDNA ActiveLock                            | typingdna-activelock                          | typingdna_activelock                       |
| Uptime                                          | uptime                                        | uptime                                     |
| Uptycs                                          | uptycs                                        | uptycs                                     |
| Vault                                           | vault                                         | vault                                      |
| vSphere                                         | vsphere                                       | vsphere                                    |
| WinCrashDetect                                  | wincrashdetect                                | windows_crash_detection                    |


[1]: /api/latest/events/
[2]: https://docs.datadoghq.com/integrations/
[3]: https://app.datadoghq.com/marketplace/
