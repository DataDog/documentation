---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Nagios Integration
integration_title: Nagios
kind: integration
doclevel:
---

<!-- ### Overview
{:#int-overview}

Capture Nagios activity in Datadog to:

- Identify trends in service failures at a glance.
- Recall issue resolutions with a single click.
- Discuss service failures with your team. -->


### 概要
{:#int-overview}

次の目的で、LighttpdのメトリクスをDatadogへ送信します:

* プロダクション環境の障害パターンを一目で識別する為
* ワンクリックで過去に実施した問題解決方法を検索する為
* 障害に関し、チームメンバーとイベントストリーム上で検討する為

<!-- ### Configuration
{:#setting}

1. If you are using the Datadog Agent < 5.0.0, please look at the old documentation for more detailed instructions.

2. The following instructions are for the Datadog Agent >= 5.0.0
Find the Nagios configuration file on your server (usually /etc/nagios3/nagios.cfg)

        sudo find /etc -type f -name nagios.cfg

3. Configure the Datadog Agent to access Nagios.  Edit conf.d/nagios.yaml

        init_config:

        instances:
            - nagios_conf: /etc/nagios3/nagios.cfg
              collect_events: True

4. Restart the Agent

        sudo /etc/init.d/datadog-agent restart -->

### 設定
{:#configuration}

ここに紹介する設定方法は、Datadog Agent 5.0.0以降を対象にしています。それ以前のバージョンを使用してる場合は、[「Deprecated instructions to install python dependencies for the Datadog Agent」](https://github.com/DataDog/dd-agent/wiki/Deprecated-instructions-to-install-python-dependencies-for-the-Datadog-Agent)のページを参照してください。

1. 次のコマンドを使いNagiosの設定ファイルの置かれている場所を確認します。(例: /etc/nagios3/nagios.cfg)

        sudo find /etc -type f -name nagios.cfg

2. Datadog Agentが、Nagiosからメトリクス情報を取得できるように、nagios.yamlを編集します。

        init_config:

        instances:
            - nagios_conf: /etc/nagios3/nagios.cfg
              collect_events: True

3. Datadog Agent を再起動します。

        sudo /etc/init.d/datadog-agent restart
