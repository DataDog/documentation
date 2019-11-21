---
title: Mise en place de la surveillance des performances réseau
kind: documentation
disable_toc: true
description: Recueillez vos données réseau avec l'Agent.
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Surveillance des performances réseau
  - link: /integrations/snmp
    tag: Documentation
    text: Intégration SNMP
  - link: /graphing/widgets/network
    tag: Documentation
    text: Widget Réseau
---
La surveillance des performances réseau nécessite la [version 6.14+ de l'Agent Datadog][1]. Cette fonctionnalité étant basée sur eBPF, la plateforme doit également utiliser une version 4.4.0+ du kernel Linux.

Les plates-formes suivantes sont prises en charge :

* Ubuntu 16.04+
* Debian 9+
* Fedora 26 et versions ultérieures
* SUSE 15+
* Amazon AMI 2016.03+
* Amazon Linux 2

L'exigence de version pour le kernel Linux (4.4.0+) ne s'applique pas à [CentOS/RHEL 7.6+][2].

**Remarque** : Windows et macOS ne sont pas compatibles avec la surveillance des performances réseau pour le moment.

Les systèmes de provisionnement suivants sont pris en charge :

* Daemonset/Helm : voir le [chart Helm Datadog][3]
* Chef : voir la [recette Chef pour Datadog][4]
* Ansible : voir le [rôle Ansible pour Datadog][5]

## Implémentation

Pour activer la surveillance des performances réseau, configurez-la dans le [fichier de configuration principal de votre Agent][6] en fonction de la configuration de votre système :

{{< tabs >}}
{{% tab "Agent" %}}

Pour activer la surveillance des performances réseau avec l'Agent Datadog, utilisez les configurations suivantes :

1. Copiez l'exemple de configuration system-probe :
    ```
    sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

2. Modifiez le fichier de configuration system-probe pour définir le flag d'activation sur `true`.<br>

3. Si vous le souhaitez, supprimez la mise en commentaire du paramètre `system_probe_config` pour ajouter un objet custom :
    ```
    ## @param system_probe_config - custom object - optional
    ## (...)
    #
    system_probe_config:
    ```

4. Entrez vos paramètres de configuration spécifiques pour la collecte de vos données System Probe :
    ```
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

5. Démarrez le system-probe : `sudo service datadog-agent-sysprobe start`
6. [[Redémarrez l'Agent][1].]: `sudo service datadog-agent restart`

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour activer la surveillance des performances réseau avec Kubernetes, utilisez la configuration suivante :

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
      - image: datadog/agent:6.12.0
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - {containerPort: 8125, name: dogstatsdport, protocol: UDP}
          - {containerPort: 8126, name: traceport, protocol: TCP}
        env:
          - {name: DD_API_KEY, value: <VOTRE_CLÉ_API>}
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_PROCESS_AGENT_ENABLED, value: "true"}
          - {name: DD_SYSTEM_PROBE_ENABLED, value: "true"}
          - {name: DD_SYSTEM_PROBE_EXTERNAL, value: "true"}
          - {name: DD_SYSPROBE_SOCKET, value: "/var/run/s6/sysprobe.sock"}
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - {name: dockersocket, mountPath: /var/run/docker.sock}
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: debugfs, mountPath: /sys/kernel/debug}
          - {name: s6-run, mountPath: /var/run/s6}
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
        image: datadog/agent:6.12.0
        imagePullPolicy: Always
        securityContext:
          capabilities:
            add: ["SYS_ADMIN", "SYS_RESOURCE", "SYS_PTRACE", "NET_ADMIN"]
        command:
          - /opt/datadog-agent/embedded/bin/system-probe
        env:
          - {name: DD_SYSTEM_PROBE_ENABLED, value: "true"}
          - {name: DD_SYSPROBE_SOCKET, value: "/var/run/s6/sysprobe.sock"}
        resources:
          requests:
            memory: "150Mi"
            cpu: "200m"
          limits:
            memory: "150Mi"
            cpu: "200m"
        volumeMounts:
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: debugfs, mountPath: /sys/kernel/debug}
          - {name: s6-run, mountPath: /var/run/s6}
      volumes:
        - {name: dockersocket, hostPath: {path: /var/run/docker.sock}}
        - {name: procdir, hostPath: {path: /proc}}
        - {name: cgroups, hostPath: {path: /sys/fs/cgroup}}
        - {name: s6-run, emptyDir: {}}
        - {name: debugfs, hostPath: {path: /sys/kernel/debug}}
```

Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Docker" %}}

Pour activer la surveillance des performances réseau dans Docker, utilisez la configuration suivante au lancement de l'Agent de conteneur :

```
$ docker run -e DD_API_KEY="<CLÉ_API_DATADOG>" \
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

Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[3]: https://github.com/helm/charts/blob/master/stable/datadog/README.md#enabling-system-probe-collection
[4]: https://github.com/DataDog/chef-datadog
[5]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[6]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file