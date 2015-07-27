---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Process check
integration_title: Process
doclevel: basic
kind: integration
---

<!-- ### Overview
{:#int-overview}

- Capture metrics from specific running processes on a system such as CPU %, memory, and I/O.
- Monitor the status of running processes with [Process Monitors](/guides/monitoring#process) (**Requires Datadog Agent >= 5.1.0**). -->

### 概要
{:#int-overview}

- システム上の特定のプロセスのCPU%、メモリー、I/Oのメトリクスを取得します。
- [Process Monitors](/guides/monitoring#process)の設定に基づいて動作しているプロセスのステータスを監視し、アラートを出力します。(**このインテグレーションには、Datadog Agent >= 5.1.0が必要です。**).


<!-- From the Agent:

* [Process check script](https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py)
* [Process check configuration example](https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Process check インテグレーションのscript](https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py)
* [Process check インテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example)


<!-- ### Configuration
{:#int-configuration}

 *To capture Process metrics you need to install the Datadog Agent.*

1. Configure the Agent to connect to your processes. Our example configuration will monitor the `sshd` and `postgres` processes.  
   Edit `/etc/dd-agent/conf.d/process.yaml`

        init_config:

        instances:
         - name: ssh
           search_string: ['ssh', 'sshd']

         - name: postgres
           search_string: ['postgres']

         - name: All
           search_string: ['All']

2. Restart the Agent
        sudo /etc/init.d/datadog-agent restart

3. Execute the info command

        sudo /etc/init.d/datadog-agent info

    and verify that the check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        process
        ---------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events -->

### 設定
{:#int-configuration}

 *プロセスメトリクスを取得するには、Datadog Agentのインストールが必要です。*

1. Datadog Agentを監視したいプロセスに接続するように設定をします。以下の例では、 `sshd`と`postgres`のプロセスを監視するように設定をしています。

   `/etc/dd-agent/conf.d/process.yaml`を編集します。

        init_config:

        instances:
         - name: ssh
           search_string: ['ssh', 'sshd']

         - name: postgres
           search_string: ['postgres']

         - name: All
           search_string: ['All']

2. Datadog Agentを再起動します。

        sudo /etc/init.d/datadog-agent restart

3. infoコマンドを実行し、設定を確認します。

        sudo /etc/init.d/datadog-agent info

    コマンド出力に次のようなセクションが含まれていれば、設定は完了しています:

        Checks
        ======

        [...]

        process
        ---------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events
