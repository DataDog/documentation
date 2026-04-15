---
description: Datadog Agent を使用して、Kubernetes、Docker、ECS、Windows 環境を含むさまざまなプラットフォームで
  Universal Service Monitoring を構成します。
further_reading:
- link: /universal_service_monitoring/
  tag: Documentation
  text: Universal Service Monitoring について
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Universal Service Monitoring で数秒のうちにゴールデンシグナル
title: Universal Service Monitoring の設定
---
##対応バージョンと互換性

必要な Agent バージョン
: Universal Service Monitoring には、コンテナ化されたサービスとともにインストールされた Datadog Agent が少なくともバージョン 6.40 または 7.40 である必要があります。以下に記載されているように、プレビューの一部機能にはそれ以降のバージョンが必要です。

対応 Linux プラットフォーム
: Linux カーネル 4.14 以上<br/>
CentOS または RHEL 8.0 以上

対応 Windows プラットフォーム
: Windows 2012 R2 以上

対応アプリケーション層プロトコル
: HTTP<br/>
HTTPS (OpenSSL)

既知の制限
: Universal Service Monitoring には、Datadog の`systemprobe` の使用が必要ですが、これは Google Kubernetes Engine (GKE) Autopilot ではサポートされていません。

<div class="alert alert-info">
追加のプロトコルとトラフィック暗号化方法は <a href="/universal_service_monitoring/additional_protocols/">プレビュー</a>中です。対応してほしいプラットフォームやプロトコルについてのフィードバックがある場合は、<a href="/help/">サポートに連絡</a>してください。
</div>

## 前提条件

Linux の場合:
    サービスがコンテナで動作していること。
     **プレビュー中:** コンテナ化されていないサービスについては、[こちらの手順](#additionalconfiguration) を参照してください。
Windows の場合:
    サービスが仮想マシンで動作していること。
Datadog Agent がサービスと一緒にインストールされていること。トレーシングライブラリのインストールは _不要_ です。
[Unified Service Tagging][1] のための `env` タグがデプロイメントに適用されていること。`service` と `version` タグはオプションです。

##USM がサービス名を検出する方法

<div class="alert alert-warning">
Universal Service Monitoring は、プロセスが開始されるときに存在する環境変数からサービス名を検出します。USM はこれらの値をオペレーティングシステムから読み取ります: Linux の場合は <code>/proc/PID/environ</code> から、Windows の場合はシステム API を通じて読み取ります。
</div>

USM は以下の環境変数を認識します。
 `DD_SERVICE`: サービス名を明示的に設定
 `DD_ENV`: 環境タグを設定
 `DD_VERSION`: バージョンタグを設定
 `DD_TAGS`: 追加のタグ。`service:name` タグを含むことが可能

###主な制約事項: USM と、APM 用にプログラムで設定された環境変数について

環境変数をプログラムによって**アプリケーションコード内で**設定する際 (たとえば、Java の場合は `System.setProperty("dd.service", "myservice")`、.NET の場合は `Environment.SetEnvironmentVariable("DD_SERVICE", "myservice")` など)、これらの環境変数は USM では **検出されません**が、これらの値は APM のトレーシングインスツルメンテーションには機能します。

これは、USM が Datadog Agent 内で別のプロセスとして実行され、プロセスが開始されたときに設定された環境変数のみを認識するためです。逆に、APM インスツルメンテーションライブラリはアプリケーションプロセス内で実行され、ランタイム環境の変更を読み取ることができます。

**USM が確実に検出できるよう、アプリケーションが開始される前に環境変数を設定してください。**

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
environment:
  - DD_SERVICE=my-service
  - DD_ENV=production
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

```yaml
env:
  - name: DD_SERVICE
    value: "my-service"
  - name: DD_ENV
    value: "production"
```
{{% /tab %}}
{{% tab "シェル" %}}

```bash
export DD_SERVICE=my-service
export DD_ENV=production
java -jar myapp.jar
```
{{% /tab %}}
{{< /tabs >}}

##Universal Service Monitoring を有効にする

サービスのデプロイ方法と Agent の構成に応じて、以下のいずれかの方法を使用して、Agent で Universal Service Monitoring を有効にします。

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

クラスターがノードに Bottlerocket Linux ディストリビューションを使用している場合は、values ファイルに以下を追加してください。

```
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: "system_u"
          role: "system_r"
          type: "spc_t"
          level: "s0"
```

{{% /tab %}}
{{% tab "演算子" %}}

Datadog Operator v1.0.0 以降が必要です。

[Datadog Operator][1] を使用して Universal Service Monitoring を有効にするには、`datadogagent.yaml` マニフェストを更新してください。`DatadogAgent` リソースで、`spec.features.usm.enabled` を `true` に設定します。

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


[1]: https://github.com/DataDog/datadogoperator

{{% /tab %}}
{{% tab "Helm を使用しない Kubernetes" %}}

1. アノテーション `container.apparmor.security.beta.kubernetes.io/systemprobe: unconfined` を `datadogagent` テンプレートに追加します。

   ```yaml
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
2. Agent の DaemonSet に以下の環境変数を設定して Universal Service Monitoring を有効にします。Agent プロセスごとにコンテナを実行している場合は、`processagent` コンテナに以下の環境変数を追加してください。そうでない場合は、`agent` コンテナに追加してください。

   ```yaml
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

3. 以下の追加ボリュームを `datadogagent` コンテナにマウントします。
   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'registry.datadoghq.com/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Agent のサイドカーとして、新しい `systemprobe` コンテナを追加します。

   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'registry.datadoghq.com/agent:latest'
         ...
       - name: system-probe
         image: 'registry.datadoghq.com/agent:latest'
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

5. 以下のボリュームをマニフェストに追加します。
   ```yaml
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

    **注意**: クラスターが Google Container-Optimized OS (COS) で動作している場合は、コンテナ定義から以下を削除して `src` マウントを削除してください。
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    さらに、マニフェストから以下を削除します。
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. オプションで HTTPS をサポートする場合は、`systemprobe` コンテナに以下を追加します。

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   そして、以下のボリュームをマニフェストに追加します。
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

`docker run` コマンドに以下を追加します。

```shell
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
registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

`dockercompose.yml` ファイルに以下を追加します。

```yaml
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

```yaml
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

`Docker Swarm` はまだ `security_opt` の変更をサポートしていないため、オペレーティングシステム
には実行中の `apparmor` インスタンスがあってはなりません。

オペレーティングシステムに実行中の `apparmor` インスタンスがない場合は、`dockercompose.yml` ファイルを `DockerCompose` [セクション][1] の `security_opt` フィールドの横で使用してください。

[1]: /ja/universal_service_monitoring/setup/?tab=dockercompose#enablinguniversalservicemonitoring

{{% /tab %}}
{{% tab "構成ファイル (Linux)" %}}

Helm Charts や環境変数を使用しない場合は、`systemprobe.yaml` ファイルに以下を設定してください:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "環境変数 (Linux)" %}}

`systemprobe` を環境変数で構成する場合、Docker や ECS のインストールでよくあるように、以下の環境変数を`processagent` と `systemprobe` の**両方**に渡します。

```yaml
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

`service_monitoring_enabled` を設定します:

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

ECS の場合、以下の JSON タスク定義で USM とシステムプローブを有効にします。タスク定義を [デーモンサービス][1] としてデプロイします。

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

オペレーティングシステムのイメージが Ubuntu または Debian の場合は、`environment` の後に以下を追加してください。

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

サービスでロードバランサーを使用している場合、Universal Service Monitoring がクラウド管理されたエンティティを検出できるように、追加のクラウドインテグレーションを有効にします:

1. [AWS インテグレーション][2] をインストールして AWS ロードバランサーの可視性を確保します。
2. ENI と EC2 メトリクス収集を有効にします。
3. 各ロードバランサーに以下のタグを追加します。
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /ja/containers/amazon_ecs/?tab=awscli#runtheagentasadaemonservice
[2]: /ja/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**IIS 上で動作するサービスの場合:**

1. ネットワークカーネルデバイスドライバーコンポーネントを有効にして [Datadog Agent][1] (バージョン 6.41 または 7.41 以降) をインストールします。
   Agent バージョン 7.44 以下の場合、インストール時に `ADDLOCAL="MainApplication,NPM"` を `msiexec` コマンドに渡すか、GUI で Agent のインストールを実行する際に **Cloud Network Monitoring** を選択する必要があります。

2. `C:\ProgramData\Datadog\systemprobe.yaml` を編集して有効フラグを `true` に設定します。

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
**IIS 以外のサービスについて:**

Agent バージョン 7.57 以降の場合、IIS 以外のサービスの検出はデフォルトで有効になっています。以前の Agent バージョンでは、`systemprobe.yaml` に以下の構成変更が必要な場合があります。

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

<div class="alert alert-warning">
<strong>IIS 以外の Windows サービスに関する重要な制限:</strong> Windows 上では Universal Service Monitoring は、HTTPS トラフィック監視のために <code>MicrosoftWindowsHttpService</code> プロバイダーを介して Windows のイベントトレース (ETW) を使用します。この ETW プロバイダーは、IIS ベースのサービスにのみ利用可能です。IIS 以外のサービス (カスタム .NET アプリケーション、Node.js サーバー、Java サーバー、または Windows 上で実行されているその他の HTTP サーバー) は、<strong>USM を介した HTTPS 監視</strong>をサポートしていません。IIS 以外の Windows サービスでは、プレーン HTTP トラフィックのみを監視できます。
</div>

### IIS および IIS 以外のサービスのサポート

|サービスの種類     | HTTP トラフィック監視 | HTTPS トラフィック監視 |
|   |  |  |
|IIS サービス     | サポート対象 | サポート対象               |
| IIS 以外のサービス | サポート対象 | **サポート対象外** |

   
[1]: /ja/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

##追加の構成

以下のシステムまたはサービスには追加の構成が必要です。

{{< collapse-content title="Linux 上の非コンテナ化サービス" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring は、Linux の仮想マシン上でベアメタルで動作するサービスをモニタリングするために利用可能です。
</div>

Agent バージョン 7.42 以上が必要です。

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe.yaml` に以下の構成を追加します。

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
{{< /collapse-content >}}

{{< collapse-content title="Go TLS モニタリング" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring は現在プレビュー中であり、Golang で実装されたサービスからの TLS 暗号化トラフィックをモニタリングします。
</div>

<strong>注</strong>:
<br>
<ul role="list">
  <li>Go HTTPS サーバーは、HTTP1.1 プロトコルを HTTP/2 にアップグレードできます。これはプレビューでサポートされています。詳細については、アカウントマネージャーにお問い合わせください。</li>
  <li>Agent バージョン 7.51 以上が必要です。</li>
</ul>

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe.yaml` に以下の構成を追加します。

```yaml
service_monitoring_config:
  enabled: true
  tls:
    go:
      enabled: true
```

{{% /tab %}}
{{% tab "環境変数" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Node.js TLS 監視" level="h4" >}}

<div class="alert alert-info">
Universal Service Monitoring は現在プレビュー中です。Node.js で実装されたサービスからの HTTP、HTTP/2、および gRPC リクエストをモニタリングします。
</div>

Agent バージョン 7.54 以上が必要です。

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe.yaml` に以下の構成を追加します。

```yaml
service_monitoring_config:
  enabled: true
  tls:
    nodejs:
      enabled: true
```

{{% /tab %}}
{{% tab "環境変数" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Istio モニタリング" level="h4" >}}

Universal Service Monitoring は、<a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> の背後にあるサービスを監視し、暗号化された HTTPs、HTTP/2、および gRPC トラフィックをキャプチャできます。

Agent バージョン 7.50 以上が必要です。

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe.yaml` に以下の構成を追加します。

```yaml
service_monitoring_config:
  enabled: true
  tls:
    istio:
      enabled: true
```

{{% /tab %}}
{{% tab "環境変数" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED
          value: "true"
```

{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="HTTP/2 モニタリング" level="h4" >}}
Universal Service Monitoring は、HTTP/2 および gRPC トラフィックをキャプチャできます。

<strong>注</strong>:
<br>
<ul role="list">
  <li>Linux カーネルバージョン 5.2 以降が必要です。</li>
  <li>Agent バージョン 7.53 以上が必要です。</li>
</ul>

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe.yaml` に以下の構成を追加します。

```yaml
service_monitoring_config:
  enable_http2_monitoring: true
```

{{% /tab %}}
{{% tab "環境変数" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING=true
```
{{% /tab %}}
{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Kafka モニタリング (プレビュー)" level="h4" >}}

<div class="alert alert-info">
Kafka モニタリングは、現在<strong>プレビュー</strong>中です。
</div>

<strong>注</strong>:
<br>
<ul role="list">
  <li>プロデューサーとコンシューマーは、Linux カーネルバージョン 5.2 以降が必要です。</li>
  <li>プロデューサーとコンシューマーは、Kafka あり、<strong></strong> TLS なしでインターフェイスする必要があります。</li>
  <li>Agent バージョン 7.53 以上が必要です。</li>
</ul>

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe.yaml` に以下の構成を追加します。

```yaml
service_monitoring_config:
  enabled: true
  enable_kafka_monitoring: true
```

{{% /tab %}}
{{% tab "環境変数" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
datadog:
  ...
  serviceMonitoring:
    enabled: true

agents:
  ...
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}


##パスの除外と置換

`http_replace_rules` または `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` を使用して、正規表現に一致する HTTP エンドポイントを削除したり、一致するエンドポイントを異なる形式に変換したりするように Agent を構成します。

{{< tabs >}}
{{% tab "構成ファイル" %}}

`systemprobe` に以下の構成を追加します。

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

たとえば、次の構成では、`/api/` で始まるエンドポイント (例：`/api/v1/users`) を削除します。ただし、`/api` や `/users/api` は削除されません。

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
以下のエントリを追加します。

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Helm" %}}

次の例では、エンドポイント `/myapi` を削除し、`/myapi2` を `/newversion` に置き換えています。

```yaml
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES
          value: '[{"pattern":"/my-api","repl":""},{"pattern":"/my-api-2","repl":"/new-version"}]'
```

{{% /tab %}}
{{< /tabs >}}


<div class="alert alert-info"><strong>追加のプロトコルと暗号化方式のサポート</strong><p>USM は、クラウドサービスの発見と追加のプロトコルおよびトラフィック暗号化方式のデコードに向けてプレビュー中です。詳細情報やプレビューへのアクセスをリクエストするには、「<a href="/universal_service_monitoring/additional_protocols/">クラウドサービスの発見と追加のプロトコル</a>」をお読みください。</p></div>


##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging