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
---
<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta : pour y accéder, remplissez le <a href="https://app.datadoghq.com/network/2019signup">formulaire de demande d'accès à l'outil de surveillance des performances réseau de Datadog</a>.
</div>

La surveillance des performances réseau nécessite la version 6.13+ de l'Agent Datadog. Ce produit étant basé sur eBPF, une version 4.4.0+ du kernel Linux est également requise. Les plates-formes suivantes sont prises en charge :

* Ubuntu 16.04+
* Debian 9+
* Fedora 26 et versions ultérieures
* SUSE 15+
* CentOS/RHEL 7.6+

**Remarque** : Windows et macOS n'étant pas compatibles avec eBPF, ces deux plates-formes ne sont pas prises en charge.

Les systèmes de provisionnement suivants sont pris en charge :

* Daemonset/Helm : voir le [chart Helm Datadog][1]
* Chef : voir la [recette Chef pour Datadog][2]
* Ansible

## Implémentation

Pour activer la surveillance des performances réseau, configurez-la dans le [fichier de configuration principal de votre Agent][3] en fonction de la configuration de votre système :

{{< tabs >}}
{{% tab "Agent" %}}

Pour activer la surveillance des performances réseau avec l'Agent Datadog, utilisez les configurations suivantes :

1. Activez la collecte Live Processes en modifiant le [fichier de configuration principal de l'Agent][1]. Définissez le paramètre suivant sur `true` :

    ```
    process_config:
      enabled: "true"
    ```
    En savoir plus sur la [collecte de données Live Processes avec Datadog][2].

2. Copiez l'exemple de configuration system-probe :<br>
`sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml`
3. Modifiez le fichier de configuration system-probe pour définir le flag d'activation sur `true`.<br>

4. Si vous le souhaitez, supprimez la mise en commentaire du paramètre `system_probe_config` pour ajouter un objet custom :
    ```
    ## @param system_probe_config - custom object - optional
    ## (...)
    #
    system_probe_config:
    ```

5. Entrez vos paramètres de configuration spécifiques pour la collecte de vos données System Probe :
    ```
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

6. Démarrez le system-probe : `sudo service datadog-agent-sysprobe start`
7. [[Redémarrez l'Agent][3].]: `sudo service datadog-agent restart`

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6
[2]: /fr/graphing/infrastructure/process
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour activer la surveillance des performances réseau avec Kubernetes, utilisez la configuration suivante :

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
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
        container.apparmor.security.beta.kubernetes.io/datadog-agent: unconfined
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        securityContext:
          capabilities:
            add: ["SYS_ADMIN", "SYS_RESOURCE", "SYS_PTRACE", "NET_ADMIN"]
        ports:
          - {containerPort: 8125, name: dogstatsdport, protocol: UDP}
          - {containerPort: 8126, name: traceport, protocol: TCP}
        env:
          - {name: DD_API_KEY, value: <CLÉ_API_DATADOG>}
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_PROCESS_AGENT_ENABLED, value: "true"}
          - {name: DD_SYSTEM_PROBE_ENABLED, value: "true"}
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

[1]: https://github.com/helm/charts/blob/master/stable/datadog/README.md#enabling-system-probe-collection
[2]: https://github.com/DataDog/chef-datadog
[3]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file