---
"categories":
- "orchestration"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Datadog イベントストリームで Fabric タスクを参照および検索。"
"doc_link": "https://docs.datadoghq.com/integrations/fabric/"
"draft": false
"git_integration_title": "fabric"
"has_logo": true
"integration_id": "fabric"
"integration_title": "Fabric"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "fabric"
"public_title": "Datadog-Fabric Integration"
"short_description": "See and search on Fabric tasks in your Datadog event stream."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

**Warning**: This integration has been deprecated and is not being actively developed anymore.

Connect Fabric to Datadog in order to:

- Capture and search for deploy events in the event stream.
- Correlate deploy events with metric changes on dashboards.

## セットアップ

### 構成

1. Install the dogapi package:

    ```shell
    sudo easy_install --upgrade dogapi
    ```

    or:

    ```shell
    sudo pip install dogapi
    ```

2. Import dogapi and configure your API key:

    ```python
    from dogapi.fab import setup, notify
    setup("<YOUR_DATADOG_API_KEY")
    ```

3. Add the notify decorator to each task you want to connect to Datadog. Make sure @notify occurs just above @task

    ```python
    @notify
    @task
    def a_fabric_task(...):
        # do things
    ```

## 収集データ

### メトリクス

The Fabric integration does not include any metric.

### イベント

The Fabric integration does not include any events.

### サービスチェック

The Fabric integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][1].

[1]: https://docs.datadoghq.com/help/

