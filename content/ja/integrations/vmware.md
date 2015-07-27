---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-VMware Integration
integration_title: VMware
kind: integration
doclevel: basic
---

<!-- ### Overview
{:#int-overview}

Install the Datadog VMware vSphere integration to:

- Get your performance metrics from vSphere and see them all in Datadog.
- Get vSphere events in Datadog and overlay them on top of your metrics (vMotion, configuration changes, on/off...).
- Interact with your teams on dashboards and the event stream, showing all vSphere data at one glance. -->

### 概要
{:#int-overview}

次の目的で、DatadogのVMware vSphereインテグレーションをインストールします:

- vSphereのパフォーマンスメトリクスを取得し、Datadogのダッシュボードに表示する
- vSphere上で発生しているイベントを取得し、ダッシュボード上のグラフ内にマーカー表示する　(vMotion、設定変更、on/offなど)
- vSphereメトリクスにつてイベントストーリーやグラフ上でチームメンバーで検討し、作業を進める


<!-- We also have an awesome blog post on vSphere which can be seen [here](https://www.datadoghq.com/2014/08/unified-vsphere-app-monitoring-datadog/). -->
vSphereに関するblog記事を準備しています。[「Unified vSphere and app monitoring with Datadog」](https://www.datadoghq.com/2014/08/unified-vsphere-app-monitoring-datadog/)も一読してみてください。

<!-- The following metrics are collected by default with the VMware integration (for more info, please see [here](https://github.com/DataDog/dd-agent/blob/v5.0.2/checks/libs/vmware/basic_metrics.py)):

    cpu.extra
    cpu.ready
    cpu.usage
    cpu.usagemhz
    disk.commandsAborted
    disk.deviceLatency
    disk.deviceReadLatency
    disk.deviceWriteLatency
    disk.queueLatency
    disk.totalLatency
    mem.active
    mem.compressed
    mem.consumed
    mem.overhead
    mem.vmmemctl -->

VMwareインテグレーションが取得しているメトリクスです:

    cpu.extra
    cpu.ready
    cpu.usage
    cpu.usagemhz
    disk.commandsAborted
    disk.deviceLatency
    disk.deviceReadLatency
    disk.deviceWriteLatency
    disk.queueLatency
    disk.totalLatency
    mem.active
    mem.compressed
    mem.consumed
    mem.overhead
    mem.vmmemctl

(各メトリクスの詳細に関しては、githubの["basic_metrics.py"](https://github.com/DataDog/dd-agent/blob/v5.0.2/checks/libs/vmware/basic_metrics.py)を参照してください):


<!-- #### FAQ
{:#faq}

##### How should the Datadog Agent be set up with vCenter and ESX?
{:#setup}

<img src="/static/images/vmware_agent.png" style="width:100%; border:1px solid #777777"/>

##### How will a VMware integration impact my monthly billing?
{:#pricing}

The base pricing is $15 per virtual machine per month. For general info on Datadog pricing, please visit our [Billing FAQ](http://docs.datadoghq.com/guides/billing/) page. -->

#### FAQ
{:#faq}

##### vCenterとESXを監視するためのDatadog Agentの配置
{:#setup}

<img src="/static/images/vmware_agent.png" style="width:100%; border:1px solid #777777"/>

1. vSphereが起動しているホストに、Datadog Agentをインストールします。
2. EXSのVM内にも、Datadog Agentをインストールします。(各VMのシステムメトリクスを収取します)
3. EXSのVM内に、各アプリケーション向けのインテグレーションを追加します。(各アプリケーションのメトリクスを取得します)
