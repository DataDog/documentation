---
title: ネットワークパフォーマンスのモニタリングのインストール
kind: documentation
description: Agent を使用したネットワークデータの収集
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: ブログ
    text: ネットワークパフォーマンスのモニタリング
  - link: /integrations/snmp
    tag: ドキュメント
    text: SNMP インテグレーション
  - link: /dashboards/widgets/network
    tag: ドキュメント
    text: ネットワークウィジェット
---
ネットワークパフォーマンスのモニタリングには [Datadog Agent v6.14 以降][1]が必要です。この製品は eBPF に構築されているため、Datadog では最小要件として基盤プラットフォームに Linux kernel バージョン4.4.0 以降が必要です。

サポート対象のプラットフォーム

- Ubuntu 16.04 以降
- Debian 9 以降
- Fedora 26 以上
- SUSE 15 以降
- Amazon AMI 2016.03 以降
- Amazon Linux 2

[CentOS/RHEL 7.6 以降][2]の要件は、kernel 4.4.0 以降では適用外です。

**注**: 現在 Datadog では、Windows プラットフォームおよび macOS プラットフォームのネットワークパフォーマンスのモニタリングをサポートしていません。

次のプロビジョニングシステムはサポート対象です。

- Daemonset / Helm 1.38.11 以降: [Datadog Helm チャート][3] を参照してください
- Chef 12.7 以降: [Datadog Chef レシピ][4] を参照してください
- Ansible 2.6 以降: [Datadog Ansible ロール][5]を参照してください

## セットアップ

ご使用のシステムのセットアップに基づいて、[Agent の主要コンフィギュレーションファイル][6]でネットワークパフォーマンスのモニタリングを構成して有効化します。

{{< tabs >}}
{{% tab "Agent" %}}

Datadog Agent を使用してネットワークパフォーマンスのモニタリングを有効化するには、次のコンフィギュレーションを使用します。

1. v6.14 より前のバージョンの Agent を使用されている場合は、先に[ライブプロセスの収集][1]を有効化し、このステップは飛ばします。

2. 下記のシステムプローブのコンフィギュレーションの例をコピーします。

    ```shell
    sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml` を編集し、有効フラグを `true` に設定します。

    ```yaml
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

4. システムプローブを起動します。

    ```shell
    sudo service datadog-agent-sysprobe start
    ```

    **注**: システムで `service` コマンドを利用できない場合は、代わりに次のコマンドを実行します。`sudo systemctl start datadog-agent-sysprobe`

5. [Agent を再起動します][2]

    ```shell
    sudo service datadog-agent restart
    ```

    **注**: システムで `service` コマンドを利用できない場合は、代わりに次のコマンドを実行します。`sudo systemctl restart datadog-agent`

6. システムプローブを有効化し、ブート時に起動します。

    ```shell
    sudo service enable datadog-agent-sysprobe
    ```

    **注**: システムで `service` コマンドを利用できない場合は、代わりに次のコマンドを実行します。`sudo systemctl enable datadog-agent-sysprobe`


[1]: /ja/infrastructure/process/?tab=linuxwindows#installation
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes を使用してネットワークパフォーマンスのモニタリングを有効化するには、次のコンフィギュレーションを使用します。

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
    name: datadog-agent
    namespace: default
spec:
    template:
        metadata:
            labels:
                app: datadog-agent
            name: datadog-agent
            annotations:
                container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
        spec:
            serviceAccountName: datadog-agent
            containers:
                - image: 'datadog/agent:latest'
                  imagePullPolicy: Always
                  name: datadog-agent
                  ports:
                      - containerPort: 8125
                        name: dogstatsdport
                        protocol: UDP
                      - containerPort: 8126
                        name: traceport
                        protocol: TCP
                  env:
                      - name: DD_API_KEY
                        value: '<DATADOG_API_KEY>'
                      - name: KUBERNETES
                        value: 'true'
                      - name: DD_HEALTH_PORT
                        value: '5555'
                      - name: DD_PROCESS_AGENT_ENABLED
                        value: 'true'
                      - name: DD_SYSTEM_PROBE_ENABLED
                        value: 'true'
                      - name: DD_SYSTEM_PROBE_EXTERNAL
                        value: 'true'
                      - name: DD_SYSPROBE_SOCKET
                        value: /var/run/s6/sysprobe.sock
                      - name: DD_KUBERNETES_KUBELET_HOST
                        valueFrom:
                            fieldRef:
                                fieldPath: status.hostIP
                  resources:
                      requests:
                          memory: 256Mi
                          cpu: 200m
                      limits:
                          memory: 256Mi
                          cpu: 200m
                  volumeMounts:
                      - name: dockersocket
                        mountPath: /var/run/docker.sock
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: s6-run
                        mountPath: /var/run/s6
                  livenessProbe:
                      httpGet:
                          path: /health
                          port: 5555
                      initialDelaySeconds: 15
                      periodSeconds: 15
                      timeoutSeconds: 5
                      successThreshold: 1
                      failureThreshold: 3
                - name: system-probe
                  image: 'datadog/agent:latest'
                  imagePullPolicy: Always
                  securityContext:
                      capabilities:
                          add:
                              - SYS_ADMIN
                              - SYS_RESOURCE
                              - SYS_PTRACE
                              - NET_ADMIN
                  command:
                      - /opt/datadog-agent/embedded/bin/system-probe
                  env:
                      - name: DD_SYSTEM_PROBE_ENABLED
                        value: 'true'
                      - name: DD_SYSPROBE_SOCKET
                        value: /var/run/s6/sysprobe.sock
                  resources:
                      requests:
                          memory: 150Mi
                          cpu: 200m
                      limits:
                          memory: 150Mi
                          cpu: 200m
                  volumeMounts:
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: s6-run
                        mountPath: /var/run/s6
            volumes:
                - name: dockersocket
                  hostPath:
                      path: /var/run/docker.sock
                - name: procdir
                  hostPath:
                      path: /proc
                - name: cgroups
                  hostPath:
                      path: /sys/fs/cgroup
                - name: s6-run
                  emptyDir: {}
                - name: debugfs
                  hostPath:
                      path: /sys/kernel/debug
```

`<DATADOG_API_KEY>` を [Datadog API キー][1]に置き換えます。


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Docker" %}}

Docker でネットワークパフォーマンスのモニタリングを有効化するには、コンテナ Agent を起動する際に、次のコンフィギュレーションを使用します。

```shell
$ docker run -e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_ENABLED=true \
-e DD_PROCESS_AGENT_ENABLED=true \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
datadog/agent:latest
```

`<DATADOG_API_KEY>` を [Datadog API キー][1]に置き換えます。


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[3]: https://github.com/helm/charts/blob/master/stable/datadog/README.md#enabling-system-probe-collection
[4]: https://github.com/DataDog/chef-datadog
[5]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[6]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file