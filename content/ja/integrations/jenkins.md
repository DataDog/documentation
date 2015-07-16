---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Jenkins Integration
integration_title: Jenkins
kind: integration
doclevel:
---

<!-- ### Overview
{:#int-overview}

Connect Jenkins to Datadog in order to:

- Add build & deployment markers on all your dashboards.
- Identify trends in your builds.
- Discuss build failures with your team. -->

### 概要
{:#int-overview}

Connect Jenkins to Datadog in order to:
次の目的で、JenkinsとDatadogを連携します:

* ダッシュボード上で、Jenkinsのビルドとデプロイタイミングを表示する
* JenkinsでのビルドのトレンドをDatadog上で把握する
* Jenkinsでのビルドの状況についてイベントストリームでチームメンバーと検討する


<!-- From the open-source Agent:

* [Jenkins YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/jenkins.yaml.example)
* [Jenkins checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/jenkins.py)

Successful Jenkins builds will show up as 'low' priority.
In the left column of the event stream, swith the priority to 'all'
to see both successful and failed builds. -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Jenkinsインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/jenkins.yaml.example)
* [Jenkinsインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/jenkins.py)

Jenkinsで成功したビルドは、プライオリティー'Low'で表示されます。
成功したビルドと失敗したビルドの両方を表示するためには、イベントストリームの左側コラム内の`PRIORITY`の部分で`All`を選択してください。
