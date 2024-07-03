---
algolia:
  subcategory: Marketplace Integrations
app_id: mainstorconcept-ziris
app_uuid: dc8b4d40-72a3-46c2-9f9a-ffaadaeacb83
assets:
  dashboards:
    JDBC and z/OS: assets/dashboards/JDBC_Dashboard.json
    MQ Buffer Pool Manager: assets/dashboards/MQ_Buffer_Pool_Manager.json
    MQ Channel Initiator: assets/dashboards/MQ_Channel_Initiator.json
    MQ Data Manager: assets/dashboards/MQ_Data_Manager.json
    MQ Log Manager: assets/dashboards/MQ_Log_Manager.json
    MQ Message Manager: assets/dashboards/MQ_Message_Manager.json
    MQ Storage Manager: assets/dashboards/MQ_Storage_Manager.json
    z/OS Connect Metrics: assets/dashboards/z_OS_Connect_Metrics.json
    z/OS Infrastructure: assets/dashboards/z_OS_Infrastructure.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mainstorconcept.zos.connect.elapsed_time
      metadata_path: metadata.csv
      prefix: mainstorconcept.zos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: mainstorconcept-ziris
  monitors:
    MQ Active Dataset Reads: assets/monitors/mq_active_dataset_reads_monitor.json
    MQ Archive Dataset Reads: assets/monitors/mq_archive_dataset_reads_monitor.json
    MQ Checkpoints: assets/monitors/mq_checkpoints_monitor.json
    MQ Insufficient Storage Events: assets/monitors/mq_insufficient_storage_events_monitor.json
    MQ Storage Contractions: assets/monitors/mq_storage_contractions_monitor.json
    MQ Suspensions: assets/monitors/mq_suspensions_monitor.json
author:
  homepage: https://mainstorconcept.com
  name: mainstorconcept GmbH
  sales_email: sales@mainstorconcept.com
  support_email: support@mainstorconcept.com
  vendor_id: mainstorconcept
categories:
- mainframe
- marketplace
- network
- os & system
- tracing
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mainstorconcept_ziris
integration_id: mainstorconcept-ziris
integration_title: z/IRIS
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: EULA.pdf
manifest_version: 2.0.0
name: mainstorconcept_ziris
oauth: {}
pricing:
- billing_type: flat_fee
  includes_assets: false
  product_id: ziris
  short_description: Price covers 50 MSUs on mainframe.
  unit_price: 4000.0
public_title: z/IRIS
short_description: Collects IBM z/OS performance data from mainframes
supported_os:
- ibm z/os
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframe
  - Category::Marketplace
  - Category::Network
  - Category::OS & System
  - Category::Tracing
  - Offering::Integration
  - Supported OS::IBM z/OS
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Collects IBM z/OS performance data from mainframes
  media:
  - caption: z/IRIS - Mainframe-inclusive observability
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: video
    vimeo_id: 630489680
  - caption: Service Map with Spans created by z/IRIS
    image_url: images/datadog-service-map-with-spans-created-by-ziris.png
    media_type: image
  - caption: z/IRIS Dashboards
    image_url: images/datadog-ziris-dashboards.png
    media_type: image
  - caption: Analyze z/OS application performance in Trace Explorer
    image_url: images/datadog-trace-explorer-filtering-zos-application-performance-measurements.png
    media_type: image
  - caption: z/IRIS extends flame graphs and span lists
    image_url: images/datadog-annotated-zosconnect-cics-db2-trace-page.png
    media_type: image
  - caption: z/IRIS integrates with Datadog
    image_url: images/ziris-otel-integration-with-datadog.png
    media_type: image
  - caption: CICS service page
    image_url: images/datadog-annotated-cics-service-page.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
  uninstallation: README.md#Uninstallation
---



## Overview

Boost your enterprise observability practices with additional traces and metrics from your backend mainframe applications, and use the following benefits with [z/IRIS][1]:

* Visualize relationships between services and applications hosted on cloud or servers, and mainframe.
* Discover how mainframe applications contribute to the end user experience.
* Reduce mean-time-to-restore (MTTR) by leveraging [Datadog Watchdog][23] to automatically detect anomalies in z/OS applications that impact digital business services.
* Drastically improve communication between application teams and mainframe platform administrators by using shareable dashboards and interfaces to assist with cross-platform incident analysis.


 z/IRIS sends telemetry (traces and metrics) from transactions and applications running on IBM System Z mainframes to Datadog. 

 Once activated:

 * The Datadog [Service Map][24] displays the integration with z/OS services such as CICS, MQ, and Db2.
 * Call rate, error rate, and latency are performance indicators enabled for mainframe services.
 * Flame graphs and span lists visualize the request's flow into mainframe applications.
 * Trace pages contain error messages z/OS systems where relevant.


z/IRIS telemetry improves developer and operations experience by extending their visibility into the mainframe's internal operations. Datadog users will be able to:

* Activate z/IRIS dashboards to monitor z/OS systems and application health.
* Create monitors to alert teams on SLO breaches in mainframe applications.
* Analyze how mainframe applications contribute to total response time and overall availability.
* Examine how changes inside and outside the mainframe change application behavior and stability.
* Access error messages reported from mainframe applications that impact the end user experience.

### Integration Methods

z/IRIS integrates with Datadog in two ways:

* **OpenTelemetry (OTEL):** This observability framework standardizes APM integrations and is fully supported by Datadog. z/IRIS will stream traces and metrics to an OpenTelemetry Collector that is configured to export telemetry to your Datadog environment.
* **Datadog APIs (Beta):** z/IRIS is able to stream traces using the Datadog Agent API as well as events using Datadog's HTTP REST API. This integration is only available for trials and proof of concept (POC) projects to reduce administrative effort while evaluating z/IRIS and is not ideal for production use cases. 

For more detailed information about the integration possibilities of z/IRIS, see the [z/IRIS documentation][3].

### Distributed Tracing

A span represents a unit of work or process. Spans are the building blocks for distributed traces which depict when a request was triggered and how the requests flowed through applications and services.

z/IRIS extends traces in Datadog with spans that represent processes and transactions from IBM Z mainframe applications. Extending traces provides users with new insights into how services on mainframe are consumed by cloud and server applications. Performance indicators, such as error rate, call rate, and request latency, for mainframe-based applications are enabled so you can identify the health of the mainframe integration.

#### Spans

z/IRIS creates spans for transactions and operations processed on the following mainframe systems:

* [Db2 for z/OS][4]
* [z/OS Connect][5]
* [IBM MQ for z/OS][7]
* [CICS Transaction Server (i.e. CICS TS)][8]
* [Batch jobs][6]
* [TSO user activity][6]

This list is always growing. Contact [ziris@mainstorconcept.com][2] to request information about support for z/OS applications or subsystems not listed above.

#### Workflow Tracing

z/IRIS is able to identify when operations on mainframe were triggered by an external application request and will ensure that the generated spans are added to the trace for the application request. For example, a cloud application sends a request to a mainframe application for processing, z/IRIS will detect that the mainframe application processing is related to an external request and will ensure that the span from the mainframe application is added to the trace for the cloud application request.

The following request workflows are tracked by z/IRIS Workflow tracing:

* REST API request -> z/OS Connect EE -> SOR (CICS TS, Db2 for z/OS, IMS or IBM MQ) -> Db2 for z/OS 
* JDBC -> Db2 for z/OS
* IBM MQ (Linux, Windows, AIX) -> IBM MQ for z/OS -> CICS TS -> Db2 for z/OS 
* CICS TS -> Db2 for z/OS


#### Tags

Metadata about the request, its resource utilization, and the relevant z/OS system are provided through tags that you can use to make queries in the [Trace Explorer][9], and this information is processed by [Watchdog Insights][10] to alert users to anomalies detected in mainframe services. 

Below is a complete list of all tags created with z/IRIS.

| Trace Tag Name                                    | Description                                   |
|---------------------------------------------------|-----------------------------------------------|
| db.db2.collection.id                              | Db2 collection ID                             |
| db.db2.instance_name                              | Db2 instance name                             |
| db.system                                         | DB system                                     |
| db.user                                           | DB user                                       |
| enduser.id                                        | End user ID                                   |
| host.arch                                         | Host architecture                             |
| host.name                                         | Host name                                     |
| http.client_ip                                    | HTTP client ip                                |
| http.method                                       | HTTP method                                   |
| http.request_content_length                       | HTTP request content length                   |
| http.response_content_length                      | HTTP response content length                  |
| http.status_code                                  | HTTP status code                              |
| ibm-mq.manager                                    | IBM MQ manager                                |
| ibm.machine.logical_partition                     | IBM machine logical partition                 |
| ibm.machine.model                                 | IBM machine model                             |
| ibm.machine.type                                  | IBM machine type                              |
| messaging.conversation_id                         | Messaging conversation ID                     |
| messaging.destination                             | Messaging destination                         |
| messaging.destination_kind                        | Messaging destination kind                    |
| messaging.system                                  | Messaging system                              |
| net.peer.ip                                       | Net peer IP                                   |
| net.peer.port                                     | Net peer port                                 |
| net.sock.peer.addr                                | Net sock peer addr                            |
| net.sock.peer.cipher                              | Net sock peer cipher                          |
| net.sock.peer.port                                | Net sock peer port                            |
| os.type                                           | OS type                                       |
| ziris.job.identifier                              | z/OS job identifier                           |
| zos.cf.calls                                      | CF calls                                      |
| zos.cf.elapsed.time_ms                            | CF elapsed time                               |
| zos.cics.application.name                         | CICS application name                         |
| zos.cics.application.operation                    | CICS application operation                    |
| zos.cics.application.platform_name                | CICS application platform name                |
| zos.cics.application.version                      | CICS application version                      |
| zos.cics.atom_service_name                        | CICS ATOM service name                        |
| zos.cics.bts.activity.id                          | CICS BTS activity ID                          |
| zos.cics.bts.activity.name                        | CICS BTS activity name                        |
| zos.cics.bts.process.id                           | CICS BTS process ID                           |
| zos.cics.bts.process.name                         | CICS BTS process name                         |
| zos.cics.bts.process.type                         | CICS BTS process type                         |
| zos.cics.connection.access_type                   | CICS connection access type                   |
| zos.cics.connection.name                          | CICS connection name                          |
| zos.cics.connection.type                          | CICS connection type                          |
| zos.cics.ipconn_name                              | CICS ipconn name                              |
| zos.cics.net.peer.name                            | CICS net peer name                            |
| zos.cics.nodejs_application_name                  | CICS nodejs application name                  |
| zos.cics.pipeline_name                            | CICS pipeline name                            |
| zos.cics.region_name                              | CICS region name                              |
| zos.cics.session.id                               | CICS session ID                               |
| zos.cics.session.type                             | CICS session type                             |
| zos.cics.tcpipservice.name                        | CICS TCP/IP service name                      |
| zos.cics.tcpipservice.origin.client.ip            | CICS TCP/IP service origin client ip          |
| zos.cics.tcpipservice.origin.client.port          | CICS TCP/IP service origin client port        |
| zos.cics.tcpipservice.origin.name                 | CICS TCP/IP service origin name               |
| zos.cics.tcpipservice.origin.port                 | CICS TCP/IP service origin port               |
| zos.cics.tcpipservice.port                        | CICS TCP/IP service port                      |
| zos.cics.transaction.api.requests                 | CICS transaction API requests                 |
| zos.cics.transaction.auth.time_ms                 | CICS transaction auth time                    |
| zos.cics.transaction.class                        | CICS transaction class                        |
| zos.cics.transaction.cpu.time_ms                  | CICS transaction CPU time                     |
| zos.cics.transaction.exception.wait.time_ms       | CICS transaction exception wait time          |
| zos.cics.transaction.gpu.time_ms                  | CICS transaction GPU time                     |
| zos.cics.transaction.group_id                     | CICS transaction group ID                     |
| zos.cics.transaction.id                           | CICS transaction ID                           |
| zos.cics.transaction.jvm.elapsed.time_ms          | CICS transaction JVM elapsed time             |
| zos.cics.transaction.jvm.init.time_ms             | CICS transaction JVM init time                |
| zos.cics.transaction.jvm.wait.time_ms             | CICS transaction JVM wait time                |
| zos.cics.transaction.number                       | CICS transaction number                       |
| zos.cics.transaction.origin.adapter.data1         | CICS transaction origin adapter data1         |
| zos.cics.transaction.origin.adapter.data2         | CICS transaction origin adapter data2         |
| zos.cics.transaction.origin.adapter.data3         | CICS transaction origin adapter data3         |
| zos.cics.transaction.origin.adapter.product       | CICS transaction origin adapter product       |
| zos.cics.transaction.origin.application.id        | CICS transaction origin application id        |
| zos.cics.transaction.origin.id                    | CICS transaction origin id                    |
| zos.cics.transaction.origin.network.id            | CICS transaction origin network id            |
| zos.cics.transaction.origin.number                | CICS transaction origin number                |
| zos.cics.transaction.origin.user_id               | CICS transaction origin user ID               |
| zos.cics.transaction.priority                     | CICS transaction priority                     |
| zos.cics.transaction.program.name                 | CICS transaction program name                 |
| zos.cics.transaction.program.return_code_current  | CICS transaction program current return code  |
| zos.cics.transaction.program.return_code_original | CICS transaction program original return code |
| zos.cics.transaction.remote.task.requests         | CICS transaction remote task requests         |
| zos.cics.transaction.rmi.elapsed.time_ms          | CICS transaction RMI elapsed time             |
| zos.cics.transaction.rmi.wait.time_ms             | CICS transaction RMI wait time                |
| zos.cics.transaction.routed.host.name             | CICS transaction routed host name             |
| zos.cics.transaction.start_type                   | CICS transaction start type                   |
| zos.cics.transaction.tcb.attachments              | CICS transaction TCB attachments              |
| zos.cics.transaction.tcb.cpu.time_ms              | CICS transaction TCB CPU time                 |
| zos.cics.transaction.tcb.elapsed.time_ms          | CICS transaction TCB elapsed time             |
| zos.cics.transaction.tcb.wait.time_ms             | CICS transaction TCB wait time                |
| zos.cics.transaction.user_id                      | CICS transaction user ID                      |
| zos.cics.transaction.wait.time_ms                 | CICS transaction wait time                    |
| zos.cics.transaction.ziip.time_ms                 | CICS transaction ZIIP time                    |
| zos.cics.urimap.name                              | CICS urimap name                              |
| zos.cics.urimap.program_name                      | CICS urimap program name                      |
| zos.cics.webservice.name                          | CICS web service name                         |
| zos.cics.webservice.operation_name                | CICS web service operation name               |
| zos.connect.api.name                              | API name of z/OS Connect                      |
| zos.connect.api.version                           | API Version of z/OS Connect                   |
| zos.connect.request.id                            | Request ID                                    |
| zos.connect.request.timed_out                     | Request time out                              |
| zos.connect.request.user_name                     | Request user name                             |
| zos.connect.service.name                          | Service name                                  |
| zos.connect.service.version                       | Service version                               |
| zos.connect.service_provider.name                 | Service provider name                         |
| zos.connect.sor.identifier                        | SOR identifier                                |
| zos.connect.sor.reference                         | SOR reference                                 |
| zos.connect.sor.request.received_time             | SOR request received                          |
| zos.connect.sor.request.sent_time                 | SOR request sent time                         |
| zos.connect.sor.resource                          | SOR resource                                  |
| zos.correlation.id                                | z/OS correlation ID                           |
| zos.cpu.time_ms                                   | z/OS CPU time                                 |
| zos.db2.abort.requests                            | Db2 abort request                             |
| zos.db2.ace                                       | Db2 ACE                                       |
| zos.db2.client.application.name                   | Db2 client application name                   |
| zos.db2.client.auth.id                            | Db2 client auth ID                            |
| zos.db2.client.platform                           | Db2 client platform                           |
| zos.db2.connection.id                             | Db2 connection ID                             |
| zos.db2.consistency.token                         | Db2 consistency token                         |
| zos.db2.cpu.time_ms                               | Db2 CPU time                                  |
| zos.db2.deadlock.resources                        | Db2 deadlock resources                        |
| zos.db2.elapsed.time_ms                           | Db2 elapsed time                              |
| zos.db2.end.timestamp                             | Db2 end timestamp                             |
| zos.db2.location.name                             | Db2 location name                             |
| zos.db2.lock.duration                             | Db2 lock duration                             |
| zos.db2.lock.request                              | Db2 lock request                              |
| zos.db2.lock.state                                | Db2 lock state                                |
| zos.db2.luw.id                                    | Db2 LUW ID                                    |
| zos.db2.plan.name                                 | Db2 plan name                                 |
| zos.db2.product.id                                | Db2 product ID                                |
| zos.db2.program.name                              | Db2 program name                              |
| zos.db2.received.bytes                            | Db2 received bytes                            |
| zos.db2.remote.location.name                      | Db2 remote location name                      |
| zos.db2.response.time_ms                          | Db2 response time                             |
| zos.db2.sent.bytes                                | Db2 sent bytes                                |
| zos.db2.sql.lock.statements                       | Db2 SQL lock statement                        |
| zos.db2.sql.open.statements                       | Db2 SQL open statement                        |
| zos.db2.sql.prepare.statements                    | Db2 SQL prepare statement                     |
| zos.db2.sql.storedprocedure.statements            | Db2 SQL stored procedure                      |
| zos.db2.start.timestamp                           | Db2 start timestamp                           |
| zos.db2.statement.id                              | Db2 statement ID                              |
| zos.db2.statement.type                            | Db2 statement type                            |
| zos.db2.su.factor                                 | Db2 su factor                                 |
| zos.db2.thread.token                              | Db2 thread token                              |
| zos.db2.uniqueness.value                          | Db2 uniqueness value                          |
| zos.db2.unlock.requests                           | Db2 unlock request                            |
| zos.db2.version                                   | Db2 version                                   |
| zos.db2.wait.time_ms                              | Db2 wait time                                 |
| zos.db2.workload.service.class.name               | Db2 workload service class name               |
| zos.db2.ziip.time_ms                              | Db2 ZIIP time                                 |
| zos.jes.job.correlator                            | JES job correlator                            |
| zos.job.class                                     | z/OS job class                                |
| zos.job.step.cpu.time_ms                          | z/OS job step CPU time                        |
| zos.job.step.cpu.units                            | z/OS step CPU units                           |
| zos.job.step.ended                                | z/OS job step ended                           |
| zos.job.step.name                                 | z/OS job step name                            |
| zos.job.step.number                               | z/OS job step number                          |
| zos.job.step.program_name                         | z/OS job step program name                    |
| zos.job.step.return_code                          | z/OS job step return code                     |
| zos.job.step.ziip.time_ms                         | z/OS job step ZIIP time                       |
| zos.lu.name                                       | z/OS LU name                                  |
| zos.mq.accounting_token                           | MQ accounting token                           |
| zos.mq.buffer_pool                                | MQ buffer pool                                |
| zos.mq.calls                                      | MQ calls                                      |
| zos.mq.cf_structure                               | MQ CF structure                               |
| zos.mq.channel.connection_name                    | MQ channel connection name                    |
| zos.mq.channel.name                               | MQ channel name                               |
| zos.mq.connection.auth_id                         | MQ connection auth ID                         |
| zos.mq.connection.name                            | MQ connection name                            |
| zos.mq.connection.type                            | MQ connection type                            |
| zos.mq.connection.user_id                         | MQ connection user ID                         |
| zos.mq.context_token                              | MQ context token                              |
| zos.mq.correlation_id                             | MQ correlation ID                             |
| zos.mq.luw_id                                     | MQ LUW ID                                     |
| zos.mq.messages                                   | MQ messages                                   |
| zos.mq.mqcb.calls                                 | MQ MQCb calls                                 |
| zos.mq.mqcb.cpu.time_ms                           | MQ MQCb CPU time                              |
| zos.mq.mqcb.elapsed.time_ms                       | MQ MQCb elapsed time                          |
| zos.mq.mqclose.calls                              | MQ MQClose calls                              |
| zos.mq.mqclose.cpu.time_ms                        | MQ MQClose CPU time                           |
| zos.mq.mqclose.elapsed.time_ms                    | MQ MQClose elapsed time                       |
| zos.mq.mqclose.suspended.calls                    | MQ MQClose suspended calls                    |
| zos.mq.mqclose.wait.time_ms                       | MQ MQClose wait time                          |
| zos.mq.mqget.browse.specific.calls                | MQ MQGet browse specific calls                |
| zos.mq.mqget.browse.unspecific.calls              | MQ MQGet browse unspecific calls              |
| zos.mq.mqget.calls                                | MQ MQGet calls                                |
| zos.mq.mqget.cpu.time_ms                          | MQ MQGet CPU time                             |
| zos.mq.mqget.destructive.specific.calls           | MQ MQGet destructive specific calls           |
| zos.mq.mqget.destructive.unspecific.calls         | MQ MQGet destructive unspecific calls         |
| zos.mq.mqget.elapsed.time_ms                      | MQ MQGet elapsed time                         |
| zos.mq.mqget.errors                               | MQ MQGet errors                               |
| zos.mq.mqget.expired.messages                     | MQ MQGet expired messages                     |
| zos.mq.mqget.log.forced.wait.time_ms              | MQ MQGet log forced wait time                 |
| zos.mq.mqget.log.forced.writes                    | MQ MQGet log forced writes                    |
| zos.mq.mqget.log.wait.time_ms                     | MQ MQGet log wait time                        |
| zos.mq.mqget.log.writes                           | MQ MQGet log writes                           |
| zos.mq.mqget.message.max.size_bytes               | MQ MQGet message max size                     |
| zos.mq.mqget.messages.min.size_bytes              | MQ MQGet message min size                     |
| zos.mq.mqget.pageset.reads                        | MQ MQGet pageset reads                        |
| zos.mq.mqget.pageset.wait.time_ms                 | MQ MQGet pageset wait time                    |
| zos.mq.mqget.persistent.messages                  | MQ MQGet persistent messages                  |
| zos.mq.mqget.skipped.messages                     | MQ MQGet skipped messages                     |
| zos.mq.mqget.skipped.pages                        | MQ MQGet skipped pages                        |
| zos.mq.mqget.successful_calls                     | MQ MQGet successful calls                     |
| zos.mq.mqget.suspended.calls                      | MQ MQGet suspended calls                      |
| zos.mq.mqget.wait.time_ms                         | MQ MQGet wait time                            |
| zos.mq.mqinq.calls                                | MQ MQInq calls                                |
| zos.mq.mqinq.cpu.time_ms                          | MQ MQInq CPU time                             |
| zos.mq.mqinq.elapsed.time_ms                      | MQ MQInq elapsed time                         |
| zos.mq.mqopen.calls                               | MQ MQOpen calls                               |
| zos.mq.mqopen.cpu.time_ms                         | MQ MQOpen CPU time                            |
| zos.mq.mqopen.elapsed.time_ms                     | MQ MQOpen elapsed time                        |
| zos.mq.mqopen.suspended.calls                     | MQ MQOpen suspended calls                     |
| zos.mq.mqopen.wait.time_ms                        | MQ MQOpen wait time                           |
| zos.mq.mqput.calls                                | MQ MQPut calls                                |
| zos.mq.mqput.cpu.time_ms                          | MQ MQPut CPU time                             |
| zos.mq.mqput.elapsed.time_ms                      | MQ MQPut elapsed time                         |
| zos.mq.mqput.log.forced.wait.time_ms              | MQ MQPut log forced wait time                 |
| zos.mq.mqput.log.forced.writes                    | MQ MQPut log forced writes                    |
| zos.mq.mqput.log.wait.time_ms                     | MQ MQPut log wait time                        |
| zos.mq.mqput.log.writes                           | MQ MQPut log writes                           |
| zos.mq.mqput.message.max.size_bytes               | MQ MQPut message max size                     |
| zos.mq.mqput.message.min.size_bytes               | MQ MQPut message min size                     |
| zos.mq.mqput.pageset.elapsed.time_ms              | MQ MQPut pageset elapsed time                 |
| zos.mq.mqput.pageset.writes                       | MQ MQPut pageset writes                       |
| zos.mq.mqput.suspended.calls                      | MQ MQPut suspended calls                      |
| zos.mq.mqput.wait.time_ms                         | MQ MQPut wait time                            |
| zos.mq.mqput1.calls                               | MQ MQPut1 calls                               |
| zos.mq.mqput1.cpu.time_ms                         | MQ MQPut1 CPU time                            |
| zos.mq.mqput1.elapsed.time_ms                     | MQ MQPut1 elapsed time                        |
| zos.mq.mqput1.log.forced.wait.time_ms             | MQ MQPut1 log forced wait time                |
| zos.mq.mqput1.log.forced.writes                   | MQ MQPut1 log forced writes                   |
| zos.mq.mqput1.log.wait.time_ms                    | MQ MQPut1 log wait time                       |
| zos.mq.mqput1.log.writes                          | MQ MQPut1 log writes                          |
| zos.mq.mqput1.pageset.wait.time_ms                | MQ MQPut1 pageset wait time                   |
| zos.mq.mqput1.pageset.writes                      | MQ MQPut1 pageset writes                      |
| zos.mq.mqput1.suspended.calls                     | MQ MQPut1 suspended calls                     |
| zos.mq.mqput1.wait.time_ms                        | MQ MQPut1 wait time                           |
| zos.mq.mqset.calls                                | MQ MQSet calls                                |
| zos.mq.mqset.cpu.time_ms                          | MQ MQSet CPU time                             |
| zos.mq.mqset.elapsed.time_ms                      | MQ MQSet elapsed time                         |
| zos.mq.mqset.log.forced.wait.time_ms              | MQ MQSet log forced wait time                 |
| zos.mq.mqset.log.forced.writes                    | MQ MQSet log forced writes                    |
| zos.mq.mqset.log.wait.time_ms                     | MQ MQSet log wait time                        |
| zos.mq.mqset.log.writes                           | MQ MQSet log writes                           |
| zos.mq.mqsub.selection.calls                      | MQ MQSub selection calls                      |
| zos.mq.pageset                                    | MQ pageset                                    |
| zos.mq.put.delayed_messages                       | MQ Put delayed messages                       |
| zos.mq.put.errors                                 | MQ Put errors                                 |
| zos.mq.put.successful_calls                       | MQ Put successful calls                       |
| zos.mq.qsg_type                                   | MQ QSG type                                   |
| zos.mq.queue.index_type                           | MQ queue index type                           |
| zos.mq.queue.max_depth                            | MQ queue max depth                            |
| zos.mq.topic.mqclose.srb.cpu.time_ms              | MQ Topic MQClose SRB CPU time                 |
| zos.mq.topic.mqopen.srb.cpu.time_ms               | MQ Topic MQOpen SRB CPU time                  |
| zos.mq.topic.mqput.srb.cpu.time_ms                | MQ Topic MQPut SRB CPU time                   |
| zos.mq.topic.mqput1.srb.cpu.time_ms               | MQ Topic MQPut1 SRB CPU time                  |
| zos.mq.topic.published_messages                   | MQ Topic published messages                   |
| zos.network.id                                    | z/OS network ID                               |
| zos.racf.group.id                                 | z/OS RACF group ID                            |
| zos.subsystem.name                                | z/OS subsystem name                           |
| zos.tape.mounts                                   | z/OS tape mounts                              |
| zos.uow                                           | z/OS UOW                                      |
| zos.user.id                                       | z/OS user id                                  |
| zos.user.name                                     | z/OS user name                                |
| zos.vtam.application.id                           | VTAM application id                           |
| zos.wlm.report.class.name                         | WLM report class name                         |
| zos.wlm.service.class.name                        | WLM service class name                        |
| zos.ziip.time_ms                                  | z/OS ZIIP time                                |


### Mainframe metrics

* [Infrastructure Metrics][11] 
    * Monitors resource utilization in the z/OS system. Infrastructure metrics support CPU (such as general processors and zIIP engines) utilization and contention.

* [z/OS Connect Metrics][12]
    * Monitors the activity and performance of z/OS Connect servers including incoming requests, return codes, request methods, server latency, and service provider (such as SOR) latency. 

* [MQ Metrics][13]
    * Monitors the activity of MQ Queue Managers on z/OS and the health of their resources (such as storage, buffer pools, logs, and channels).

This isn't the metric you're looking for? Missing a critical feature for your organization? Send us a feature request at [ziris@mainstorconcept.com][2].

### Private enterprise offers

* E-mail: [mainstorconcept GmbH][2]
* Phone: +49 721 7907610

### Licensing

After starting your trial period, we will provide your z/IRIS trial license through email within 24 hours.

### Validation

Verify that the relevant components are available and meet the [minimum requirements][14].

## Support

For support or feature requests, contact z/IRIS through the following channels:

- Email: [support@mainstorconcept.com][20] or [ziris@mainstorconcept.com](mailto:ziris@mainstorconcept.com) for a demonstration or for questions about z/IRIS capabilities with Datadog
- Support: [Mainstorconcept Portal][21]

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor mainframe performance with mainstorconcept’s offering in the Datadog Marketplace][22]

[1]: https://www.mainstorconcept.com/z-iris-mainframe-observability/z-iris-datadog/?lang=en
[2]: mailto:ziris@mainstorconcept.com
[3]: https://public.mainstorconcept.com/home/observability-with-datadog
[4]: https://public.mainstorconcept.com/home/distributed-db2-for-z-os-observability
[5]: https://public.mainstorconcept.com/home/z-os-connect-observability
[6]: https://public.mainstorconcept.com/home/z-os-work-observability
[7]: https://public.mainstorconcept.com/home/ibm-mq-for-z-os-observability
[8]: https://public.mainstorconcept.com/home/cics-transaction-observability
[9]: https://docs.datadoghq.com/ja/tracing/trace_explorer/
[10]: https://docs.datadoghq.com/ja/watchdog/
[11]: https://public.mainstorconcept.com/home/rmf-metrics-streaming
[12]: https://public.mainstorconcept.com/home/z-os-connect-metrics-streaming
[13]: https://public.mainstorconcept.com/home/mq-metrics-streaming
[14]: https://public.mainstorconcept.com/home/troubleshooting-opentelemetry-integration
[15]: https://public.mainstorconcept.com/home/irontap-image
[16]: https://public.mainstorconcept.com/home/configure-irontap-container 
[17]: https://public.mainstorconcept.com/home/install-z-iris-clients
[18]: https://public.mainstorconcept.com/home/configure-z-iris-clients
[19]: https://public.mainstorconcept.com/home/z-iris-client-started-task
[20]: mailto:support@mainstorconcept.com
[21]: https://service.mainstorconcept.com/mscportal/login
[22]: https://www.datadoghq.com/blog/mainframe-monitoring-mainstorconcept-datadog-marketplace/
[23]: https://docs.datadoghq.com/ja/watchdog/
[24]: https://docs.datadoghq.com/ja/tracing/services/services_map/

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/mainstorconcept-ziris" target="_blank">Click Here</a> to purchase this application.