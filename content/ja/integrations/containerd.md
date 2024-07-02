---
"app_id": "containerd"
"app_uuid": "206cf95f-1d2a-4ad5-b027-0de15431833b"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": containerd.cpu.user
      "metadata_path": metadata.csv
      "prefix": containerd.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10082"
    "source_type_name": Containerd
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/containerd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "containerd"
"integration_id": "containerd"
"integration_title": "Containerd"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "containerd"
"public_title": "Containerd"
"short_description": "Track all your Containerd metrics with Datadog"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": Track all your Containerd metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Containerd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the Containerd container runtime.

## セットアップ

### インストール

Containerd is a core [Datadog Agent][1] check. You must configure Containerd in both `datadog.yaml` and `containerd.d/conf.yaml`.

In `datadog.yaml`, configure your `cri_socket_path` for the Agent to query Containerd. In `containerd.d/conf.yaml`, configure the check instance settings (such as `filters`) for the events.

#### Installation on containers

If you are using the Agent in a container, setting the `DD_CRI_SOCKET_PATH` environment variable to the Containerd socket automatically enables the Containerd integration with the default configuration.

For example, to install the integration on Kubernetes, edit your DaemonSet to mount the Containerd socket from the host node to the Agent container and set the `DD_CRI_SOCKET_PATH` environment variable to the DaemonSet mount path:

{{< tabs >}}
{{% tab "Linux container" %}}

##### Linux container

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: /var/run/containerd/containerd.sock
          volumeMounts:
            - name: containerdsocket
              mountPath: /var/run/containerd/containerd.sock
            - mountPath: /host/var/run
              name: var-run
              readOnly: true
          volumes:
            - hostPath:
                path: /var/run/containerd/containerd.sock
              name: containerdsocket
            - hostPath:
                path: /var/run
              name: var-run
```

**Note:** The `/var/run` directory must be mounted from the host to run the integration without issues.

{{% /tab %}}
{{% tab "Windows Container" %}}

##### Windows container

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
        - name: datadog-agent
          # ...
          env:
            - name: DD_CRI_SOCKET_PATH
              value: \\\\.\\pipe\\containerd-containerd
          volumes:
            - hostPath:
                path: \\\\.\\pipe\\containerd-containerd
              name: containerdsocket
          volumeMounts:
            - name: containerdsocket
              mountPath: \\\\.\\pipe\\containerd-containerd
```

{{% /tab %}}
{{< /tabs >}}

### 構成

1. Edit the `containerd.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Containerd performance data. See the [sample containerd.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3]

### Validation

[Run the Agent's `status` subcommand][4] and look for `containerd` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "containerd" >}}


This integration works on Linux and Windows, but some metrics are OS dependent. Look at `metadata.csv` for the list of OS dependent metrics. 

### イベント

The Containerd check can collect events. Use `filters` to select the relevant events. See the [sample containerd.d/conf.yaml][2] to have more details.

### サービスチェック
{{< get-service-checks-from-git "containerd" >}}


## トラブルシューティング

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
[3]: https://docs.datadoghq.com/help/
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
