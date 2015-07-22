---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Gunicorn Integration
integration_title: gunicorn
kind: integration
doclevel:
---

<!-- To capture Gunicorn metrics you need to install the Datadog Agent.

1. If you are using the Datadog Agent < 5.0.0, please look at the old documentation for more detailed instructions. The following instructions are for the Datadog Agent >= 5.0.0
2. Configure the Agent to connect to Gunicorn

    Edit conf.d/gunicorn.yaml

        init_config:

        instances:
            -   proc_name: my_web_app


3. Restart the Agent
4. Execute the info command and verify that the integration check has passed.The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          gunicorn
          --------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events

Not sure how to execute the last two steps? Visit the Agent Usage Guide for more detailed instructions. -->

Gumicornメトリクスを取得するためには、Datadog Agentのインストールが必要です。

1. 以下に示す方法は、Datadog Agent >= 5.0.0で対応しています。それ以前のDatadog Agentを使用している場合は、Datadog Agentをアップデートするか、旧 Datadog Agentの設定方法に従って設定してください。

2. Gunicornから情報が取得できるようにDatadog Agentの設定ファイルを変更します。

    Edit conf.d/gunicorn.yaml

        init_config:

        instances:
            -   proc_name: my_web_app

3. Datadog Agentを再起動します。

        /etc/init.d/datadog-agent restart

4. infoコマンドを実行し、インテグレーションが正しくインストールされているか確認します:

        /etc/init.d/datadog-agent info

    コマンドの出力に、次のようなセクションが含まれていれば正常にインストールされています。

        Checks
        ======

          [...]

          gunicorn
          --------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events
