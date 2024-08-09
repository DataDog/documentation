---
aliases:
- /ja/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: GitHub
  text: ユニバーサルサービスモニタリングで数秒のうちにゴールデンシグナル
- link: /getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: 統合サービスタグ付け
- link: /tracing/services/services_list/
  tag: ドキュメント
  text: Datadog に報告するサービスの一覧
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/services_map/
  tag: ドキュメント
  text: サービスマップについて読む
title: ユニバーサル サービス モニタリング
---

## 概要

ユニバーサルサービスモニタリング (USM) は、_コードをインスツルメントすることなく_、スタック全体にわたって普遍的にサービスのヘルスメトリクスを視覚化することができます。Datadog Agent の構成と[統合サービスタグ付け][1]に依存し、インスツルメントされていないサービスのパフォーマンスデータを、サービスカタログ、サービスマップなどのビューに取り込みます。USM は、[デプロイ追跡][2]、モニター、ダッシュボード、SLO とも連動しています。

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="ユニバーサルサービスモニタリングのデモ映像です。サービスマップ上のサービスをクリックし、View service overview を選択すると、サービスの概要が表示されます。" video="true" >}}

## セットアップ

### 対応バージョンと互換性

必要な Agent のバージョン
: ユニバーサルサービスモニタリングでは、コンテナ化されたサービスと共にインストールされる Datadog Agent のバージョンが 6.40 または 7.40 以上であることが必要です。

サービスは、以下のサポートされたプラットフォームのいずれかで実行されている必要があります。
: Linux Kernel 4.14 以上<br/>
CentOS または RHEL 8.0 以上

対応 Windows プラットフォーム
: Windows 2012 R2 以降の IIS

対応アプリケーション層プロトコル
: HTTP<br/>
HTTPS (OpenSSL)


<div class="alert alert-info">
どのようなプラットフォームやプロトコルに対応してほしいかなどのフィードバックがありましたら、サポートまでご連絡ください。
</div>

### 前提条件

- Linux の場合:
    - サービスがコンテナで動作していること。
    - コンテナ化されていないサービスについては、[こちらの説明](#support-for-non-containerized-services)を参照してください。
- Windows で IIS を使用する場合:
    - サービスが仮想マシンで動作していること。
- Datadog Agent がサービスと共にインストールされていること。トレースライブラリのインストールは必要_ありません_。
- [統合サービスタグ付け][1]の `env` タグがデプロイメントに適用されていること。`service` と `version` タグはオプションです。

## ユニバーサルサービスモニタリングを有効にする

サービスのデプロイ方法と Agent の構成に応じて、以下のいずれかの方法を使用して、Agent でユニバーサルサービスモニタリングを有効にします。

{{< tabs >}}
{{% tab "Helm" %}}

Datadog チャートバージョン >= 2.26.2 を使用して、以下を values ファイルに追加します。

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

クラスターで Google Container-Optimized OS (COS) が動作している場合は、values ファイルに以下も追加してください。

```
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{% tab "Operator" %}}

[Datadog Agent][1] でユニバーサルサービスモニタリングを有効にするには、`datadog-agent.yaml` マニフェストを更新します。`DatadogAgent` リソースで `spec.features.usm.enabled` を `true` に設定します。

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
        apiSecret:
           secretName: datadog-secret
           keyName: api-key
        appSecret:
         secretName: datadog-secret
         keyName: app-key
     features:
       usm:
         enabled: true
   ```

**注:** Datadog Operator v1.0.0 以降が必要です。

[1]: https://github.com/DataDog/datadog-operator

{{% /tab %}}
{{% tab "Helm を使用しない Kubernetes" %}}

1. `datadog-agent` テンプレートにアノテーション `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` を追加します。

   ```
   spec:
     selector:
       matchLabels:
         app: datadog-agent
     template:
       metadata:
         labels:
           app: datadog-agent
         name: datadog-agent
         annotations:
           container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
    ```
2. Agent デーモンセットで以下の環境変数を設定し、ユニバーサルサービスモニタリングを有効にします。Agent プロセスごとにコンテナを実行する場合は、`process-agent` コンテナに以下の環境変数を追加します。そうでない場合は、`agent` コンテナに追加します。

   ```
   ...
     env:
       ...
       - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
         value: 'true'
       - name: DD_SYSTEM_PROBE_EXTERNAL
         value: 'true'
       - name: DD_SYSPROBE_SOCKET
         value: /var/run/sysprobe/sysprobe.sock
   ```

3. 以下の追加ボリュームを `datadog-agent` コンテナにマウントします。
   ```
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Agent のサイドカーとして、新しい `system-probe` コンテナを追加します。

   ```
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
       - name: system-probe
         image: 'gcr.io/datadoghq/agent:latest'
         imagePullPolicy: Always
         securityContext:
           capabilities:
             add:
               - SYS_ADMIN
               - SYS_RESOURCE
               - SYS_PTRACE
               - NET_ADMIN
               - NET_BROADCAST
               - NET_RAW
               - IPC_LOCK
               - CHOWN
         command:
           - /opt/datadog-agent/embedded/bin/system-probe
         env:
           - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
             value: 'true'
           - name: DD_SYSPROBE_SOCKET
             value: /var/run/sysprobe/sysprobe.sock
         resources: {}
         volumeMounts:
           - name: procdir
             mountPath: /host/proc
             readOnly: true
           - name: cgroups
             mountPath: /host/sys/fs/cgroup
             readOnly: true
           - name: debugfs
             mountPath: /sys/kernel/debug
           - name: sysprobe-socket-dir
             mountPath: /var/run/sysprobe
           - name: modules
             mountPath: /lib/modules
             readOnly: true
           - name: src
             mountPath: /usr/src
             readOnly: true
           - name: runtime-compiler-output-dir
             mountPath: /var/tmp/datadog-agent/system-probe/build
           - name: kernel-headers-download-dir
             mountPath: /var/tmp/datadog-agent/system-probe/kernel-headers
             readOnly: false
           - name: apt-config-dir
             mountPath: /host/etc/apt
             readOnly: true
           - name: yum-repos-dir
             mountPath: /host/etc/yum.repos.d
             readOnly: true
           - name: opensuse-repos-dir
             mountPath: /host/etc/zypp
             readOnly: true
           - name: public-key-dir
             mountPath: /host/etc/pki
             readOnly: true
           - name: yum-vars-dir
             mountPath: /host/etc/yum/vars
             readOnly: true
           - name: dnf-vars-dir
             mountPath: /host/etc/dnf/vars
             readOnly: true
           - name: rhel-subscription-dir
             mountPath: /host/etc/rhsm
             readOnly: true
   ```

   そして、以下のボリュームをマニフェストに追加します。
   ```
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: procdir
       hostPath:
         path: /proc
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
     - hostPath:
         path: /lib/modules
       name: modules
     - hostPath:
         path: /usr/src
       name: src
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/build
       name: runtime-compiler-output-dir
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/kernel-headers
       name: kernel-headers-download-dir
     - hostPath:
         path: /etc/apt
       name: apt-config-dir
     - hostPath:
         path: /etc/yum.repos.d
       name: yum-repos-dir
     - hostPath:
         path: /etc/zypp
       name: opensuse-repos-dir
     - hostPath:
         path: /etc/pki
       name: public-key-dir
     - hostPath:
         path: /etc/yum/vars
       name: yum-vars-dir
     - hostPath:
         path: /etc/dnf/vars
       name: dnf-vars-dir
     - hostPath:
         path: /etc/rhsm
       name: rhel-subscription-dir

   ```

   &nbsp;**注**: クラスターが Google Container-Optimized OS (COS) 上で動作している場合、`src` マウントを削除する必要があります。これを行うには、コンテナ定義から以下を削除します。
   ```
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
   また、マニフェストから以下を削除します。
   ```
    - hostPath:
        path: /usr/src
      name: src
   ```

5. オプションで HTTPS をサポートする場合は、`system-probe` コンテナに以下を追加します。

   ```
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   そして、以下のボリュームをマニフェストに追加します。
   ```
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

`docker run` コマンドに以下を追加します。

```
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /lib/modules:/lib/modules:ro \
-v /usr/src:/usr/src:ro \
-v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
-v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
-v /etc/apt:/host/etc/apt:ro \
-v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
-v /etc/zypp:/host/etc/zypp:ro \
-v /etc/pki:/host/etc/pki:ro \
-v /etc/yum/vars:/host/etc/yum/vars:ro \
-v /etc/dnf/vars:/host/etc/dnf/vars:ro \
-v /etc/rhsm:/host/etc/rhsm:ro \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-e HOST_ROOT=/host/root \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN \
gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

以下を `docker-compose.yml` ファイルに追加します。

```
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED='true'
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
     - /sys/kernel/debug:/sys/kernel/debug
     - /lib/modules:/lib/modules
     - /usr/src:/usr/src
     - /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build
     - /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers
     - /etc/apt:/host/etc/apt
     - /etc/yum.repos.d:/host/etc/yum.repos.d
     - /etc/zypp:/host/etc/zypp
     - /etc/pki:/host/etc/pki
     - /etc/yum/vars:/host/etc/yum/vars
     - /etc/dnf/vars:/host/etc/dnf/vars
     - /etc/rhsm:/host/etc/rhsm
    cap_add:
     - SYS_ADMIN
     - SYS_RESOURCE
     - SYS_PTRACE
     - NET_ADMIN
     - NET_BROADCAST
     - NET_RAW
     - IPC_LOCK
     - CHOWN
    security_opt:
     - apparmor:unconfined
```

オプションで HTTPS をサポートする場合は、以下も追加します。

```
services:
  ...
  datadog:
    ...
    environment:
     - HOST_ROOT: '/host/root'
    volumes:
     - /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Swarm" %}}

`Docker Swarm` はまだ `security_opt` の変更をサポートしていないので、オペレーティングシステムに `apparmor` インスタンスが動作していない必要があります。

オペレーティングシステムに `apparmor` インスタンスがない場合は、`Docker-Compose` [セクション][1]にある `docker-compose.yml` ファイルを `security_opt` フィールドの横で使用することになります。

[1]: /ja/universal_service_monitoring/?tab=dockercompose#enabling-universal-service-monitoring

{{% /tab %}}
{{% tab "コンフィギュレーションファイル (Linux)" %}}

Helm Charts や環境変数を使用しない場合は、`system-probe.yaml` ファイルに以下を設定します。

```
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "環境変数 (Linux)" %}}

Docker や ECS のインストールでよくあるように、`system-probe` を環境変数で構成する場合、以下の環境変数を `process-agent` と `system-probe` の**両方**に渡します。

```
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Chef" %}}

ノードに以下の属性を設定します。

```rb
node["datadog"]["system_probe"]["service_monitoring_enabled"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

`service_monitoring_enabled` を設定します。

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

プレイブックに以下の属性を追加します。

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

ECS の場合、以下の JSON タスク定義で USM とシステムプローブを有効にします。タスク定義を[デーモンサービス][1]としてデプロイします。

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:7",
      "cpu": 500,
      "memory": 1024,
      "essential": true,
      "mountPoints": [
        ...
        {
          "containerPath": "/sys/kernel/debug",
          "sourceVolume": "sys_kernel_debug"
        },
        {
          "containerPath": "/host/proc",
          "sourceVolume": "proc"
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "var_run_docker_sock"
        },
        {
          "containerPath": "/host/sys/fs/cgroup",
          "sourceVolume": "sys_fs_cgroup"
        },
        {
          "readOnly": true,
          "containerPath": "/var/lib/docker/containers",
          "sourceVolume": "var_lib_docker_containers"
        },
        {
          "containerPath": "/lib/modules",
          "sourceVolume": "lib_modules"
        },
        {
          "containerPath": "/usr/src",
          "sourceVolume": "usr_src"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/build",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_build"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/kernel-headers",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_kernel_headers"
        },
        {
          "containerPath": "/host/etc/apt",
          "sourceVolume": "etc_apt"
        },
        {
          "containerPath": "/host/etc/yum.repos.d",
          "sourceVolume": "etc_yum_repos_d"
        },
        {
          "containerPath": "/host/etc/zypp",
          "sourceVolume": "etc_zypp"
        },
        {
          "containerPath": "/host/etc/pki",
          "sourceVolume": "etc_pki"
        },
        {
          "containerPath": "/host/etc/yum/vars",
          "sourceVolume": "etc_yum_vars"
        },
        {
          "containerPath": "/host/etc/dnf/vars",
          "sourceVolume": "etc_dnf_vars"
        },
        {
          "containerPath": "/host/etc/rhsm",
          "sourceVolume": "etc_rhsm"
        }
      ],
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        ...
        {
          "name": "DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED",
          "value": "true"
        }
      ],
      "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      }
    }
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "volumes": [
    ...
    {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "sys_kernel_debug"
    },
    {
      "host": {
        "sourcePath": "/proc/"
      },
      "name": "proc"
    },
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "var_run_docker_sock"
    },
    {
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      },
      "name": "sys_fs_cgroup"
    },
    {
      "host": {
        "sourcePath": "/var/lib/docker/containers/"
      },
      "name": "var_lib_docker_containers"
    },
    {
      "host": {
        "sourcePath": "/lib/modules"
      },
      "name": "lib_modules"
    },
    {
      "host": {
        "sourcePath": "/usr/src"
      },
      "name": "usr_src"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/build"
      },
      "name": "var_tmp_datadog_agent_system_probe_build"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/kernel-headers"
      },
      "name": "var_tmp_datadog_agent_system_probe_kernel_headers"
    },
    {
      "host": {
        "sourcePath": "/etc/apt"
      },
      "name": "etc_apt"
    },
    {
      "host": {
        "sourcePath": "/etc/yum.repos.d"
      },
      "name": "etc_yum_repos_d"
    },
    {
      "host": {
        "sourcePath": "/etc/zypp"
      },
      "name": "etc_zypp"
    },
    {
      "host": {
        "sourcePath": "/etc/pki"
      },
      "name": "etc_pki"
    },
    {
      "host": {
        "sourcePath": "/etc/yum/vars"
      },
      "name": "etc_yum_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/dnf/vars"
      },
      "name": "etc_dnf_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/rhsm"
      },
      "name": "etc_rhsm"
    }
  ],
  "family": "datadog-agent-task"
}
```

OS のイメージが Ubuntu や Debian の場合は、`environment` の後に以下を追加してください。

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

オプションで HTTPS をサポートする場合は、以下も追加します。

```yaml
"mountPoints": [
  ...
  {
    "containerPath": "/host/root",
    "sourceVolume": "host_root"
  },
  ...
]
...
"volumes": [
  ...
  {
    "host": {
      "sourcePath": "/"
    },
    "name": "host_root"
  },
  ...
]
```

サービスでロードバランサーを使用している場合、ユニバーサルサービスモニタリングがクラウド管理されたエンティティを検出できるように、追加のクラウドインテグレーションを有効にします。
* AWS ロードバランサーを可視化するには、[AWS インテグレーション][2]をインストールします。また、ENI および EC2 のメトリクス収集を有効にする必要があります。

次に、各ロードバランサーに以下のタグを追加します。
```conf
ENV=<env>
SERVICE=<service>
```

[1]: /ja/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /ja/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**IIS 上で動作するサービスの場合:**

1. [Datadog Agent][1] (バージョン 6.41 または 7.41 以降) をネットワークカーネルデバイスドライバーコンポーネントを有効にしてインストールします。
   [非推奨] _(バージョン 7.44 以前)_ インストール時に `ADDLOCAL="MainApplication,NPM"` を `msiexec` コマンドに渡すか、Agent のインストールを GUI で実行する際に "Network Performance Monitoring" を選択します。

2. `C:\ProgramData\Datadog\system-probe.yaml` を編集し、有効フラグを `true` に設定します。

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
[1]: /ja/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## 自動サービスタグ付け

ユニバーサルサービスモニタリングは、インフラストラクチャーで稼働しているサービスを自動的に検出します。[統合サービスタグ付け][1]が見つからない場合、タグの 1 つ (`app`、`short_image`、`kube_container_name`、`container_name`、`kube_deployment`、`kube_service`) に基づいて名前を付けます。

サービス名を更新するには、[統合サービスタグ付け][1]を設定します。

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Datadog がサービスを自動検出すると、その際に使用されるタグがサービスページの上部に表示されます" style="width:80%;" >}}

## サービスの確認

Agent を構成した後、サービスカタログにサービスが表示されるまで約 5 分間待ちます。サービスをクリックすると、サービスの詳細ページが表示されます。左上の操作名 `universal.http.server` または `universal.http.client` は、サービスのテレメトリーがユニバーサルサービスモニタリングから来ることを示します。

`universal.http.server` という操作名で、サービスへのインバウンドトラフィックのヘルスメトリクスを取得します。対応する `universal.http.client` 操作名は、他の宛先へのアウトバウンドトラフィックを表します。

{{< img src="universal_service_monitoring/select_service_operation.png" alt="Services タブの operation ドロップダウンメニューには、利用可能な操作名が表示されます" style="width:100%;" >}}

ユニバーサルサービスモニタリングを有効にすると、次のことが可能になります。


- **APM** > **Service Catalog** または **APM** > **Service Map** に移動して、[サービスとその依存関係を視覚化します][3]。

- 特定の Service ページをクリックして、ゴールデンシグナルメトリクス (リクエスト、エラー、期間) を確認し、[デプロイ追跡][2]で最近のコード変更と相関させることができます。

- `universal.http.*` メトリクスを使用して、[モニター][4]、[ダッシュボード][5]、[SLO][6] を作成します。

### コンテナ化されていないサービスのサポート

<div class="alert alert-info">
ユニバーサルサービスモニタリングは、Linux 仮想マシン上でベアメタルで動作するサービスをモニタリングするための*ベータ版*で利用可能です。
</div>

バージョン 7.42 以上の Agent が必要です。

{{< tabs >}}
{{% tab "コンフィギュレーションファイル" %}}

`system-probe.yaml` に以下の構成を追加します。

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

{{% /tab %}}
{{% tab "環境変数" %}}

```conf
DD_SYSTEM_PROBE_PROCESS_SERVICE_INFERENCE_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}

### パスの除外と置換

`http_replace_rules` または `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` を使用して、正規表現にマッチする HTTP エンドポイントを削除したり、マッチするエンドポイントを異なる形式に変換するように Agent を構成します。

{{< tabs >}}
{{% tab "コンフィギュレーションファイル" %}}

`system-probe` に以下の構成を追加します。

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

例えば、以下の構成では `/api/v1/users` のような `/api/` で始まるエンドポイントを削除します。しかし、`/api` や `/users/api` は無視されません。

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

以下の構成は、エンドポイント `/api/users` を新しいフォーマット `/api/v1/users` に合わせて置き換えたものです。

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "環境変数" %}}
次のエントリーを追加します。

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}

{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/services/deployment_tracking/
[3]: /ja/tracing/service_catalog/
[4]: /ja/monitors/types/apm/?tab=apmmetrics
[5]: /ja/dashboards/
[6]: /ja/service_management/service_level_objectives/metric/