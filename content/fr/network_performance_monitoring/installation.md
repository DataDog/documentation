---
title: Mise en place de la solution Network Performance Monitoring
kind: documentation
description: Recueillez vos données réseau avec l'Agent.
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Network Performance Monitoring
  - link: /network_performance_monitoring/devices
    tag: Documentation
    text: Network Device Monitoring
  - link: /dashboards/widgets/network
    tag: Documentation
    text: Widget Réseau
---
La solution Network Performance Monitoring nécessite l'[Agent Datadog v6.14+][1].

Les **plateformes suivantes** sont prises en charge :

- Ubuntu 16.04+
- Debian 9+
- Fedora 26 et versions ultérieures
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- [Windows Server 2016 et versions ultérieures][2] (en bêta publique)

**Pour les systèmes d'exploitation Linux :** la collecte de données étant basée sur eBPF, la plateforme doit également utiliser une version 4.4.0+ du kernel Linux.

**Pour les systèmes d'exploitation Windows** : la collecte de données est disponible en version bêta publique pour Windows Server 2016 et les versions ultérieures.

L'exigence de version pour le kernel Linux (4.4.0+) ne s'applique pas à [CentOS/RHEL 7.6+][3]. La fonction de [résolution DNS][4] n'est pas prise en charge par CentOS/RHEL 7.6.

La fonctionnalité Network Performance Monitoring est compatible avec les installations **Cilium**, pour autant que vous disposiez :
1) d'une version 1.6+ de Cilium, et
2) d'une version 5.1.16+ du kernel, ou 4.19.57+ pour les kernels 4.19.x.

**Remarque** : la fonctionnalité Nerwork Performance Monitoring n'est pas disponible sur macOS.

Les **systèmes de provisionnement suivants** sont pris en charge :

- Daemonset/Helm 1.38.11+ : voir le [chart Helm Datadog][5]
- Chef 12.7+ : voir la [recette Chef pour Datadog][6]
- Ansible 2.6+ : voir le [rôle Ansible pour Datadog][7]

## Configuration

Pour activer la solution Network Performance Monitoring, configurez-la dans le [fichier de configuration principal de votre Agent][8] en fonction de la configuration de votre système.

Cet outil a été conçu dans l'optique d'analyser le trafic _entre_ des endpoints réseau et de mapper des dépendances réseau. Il est donc conseillé de l'installer sur un sous-ensemble pertinent de votre infrastructure ainsi que sur **_deux hosts au minimum_** pour en tirer pleinement profit.

{{< tabs >}}
{{% tab "Agent" %}}

Pour activer la solution Network Performance Monitoring avec l'Agent Datadog, utilisez les configurations suivantes :

1. Si vous utilisez une version de l'Agent antérieure à la version 6.14, activez d'abord la [collecte de live processes][1]. Si ce n'est pas le cas, passez à l'étape suivante.

2. Copiez l'exemple de configuration system-probe :

    ```shell
    sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Modifiez `/etc/datadog-agent/system-probe.yaml` en définissant le flag enable sur `true` :

    ```yaml
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

4. **Si vous exécutez un Agent antérieur à la version 6.18 ou 7.18**, démarrez manuellement le system-probe et configurez-le de façon à ce qu'il se lance au démarrage. Pour les versions 6.18 et 7.18, le system-probe se lance automatiquement en même temps que l'Agent :

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Remarque** : si vous ne pouvez pas utiliser la commande `systemctl` sur votre système, effectuez le démarrage à l'aide de la commande suivante : `sudo service datadog-agent-sysprobe start`. Configurez ensuite le system-probe de façon à ce qu'il se lance au démarrage, avant le démarrage de `datadog-agent`.

5. [Redémarrez l'Agent][2].

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Remarque** : si vous ne pouvez pas utiliser la commande `systemctl` sur votre système, exécutez la commande suivante : `sudo service datadog-agent restart`.

### Systèmes avec SELinux

Sur les systèmes disposant de SELinux, le binaire system-probe requiert des autorisations spéciales pour utiliser les fonctionnalités eBPF.

Le package RPM de l'Agent Datadog pour les systèmes basés sur CentOS comprend [une stratégie SELinux][3] permettant d'accorder ces autorisations au binaire system-probe.

Si vous devez utiliser la solution Network Performance Monitoring sur d'autres systèmes disposant de SELinux, effectuez ce qui suit :

1. Modifiez la [stratégie SELinux][3] de base afin de l'adapter à votre configuration SELinux.
    Selon votre système, il est possible que certains types ou attributs n'existent pas ou qu'ils possèdent d'autres noms.

2. Compilez la stratégie au sein d'un module. Si vous avez nommé votre fichier de stratégie `system_probe_policy.te`, utilisez la commande suivante :

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. Appliquez le module à votre système SELinux :

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Modifiez le type de binaire system-probe afin d'utiliser celui défini dans la stratégie. Si votre répertoire d'installation de l'Agent est `/opt/datadog-agent`, utilisez la commande suivante :

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Redémarrez l'Agent][2].

**Remarque** : pour suivre ces instructions, vous devez avoir installé certains utilitaires SELinux (`checkmodule`, `semodule`, `semodule_package`, `semanage` et `restorecon`), disponibles sur la plupart des distributions standard comme Ubuntu, Debian, RHEL, CentOS et SUSE. Consultez la documentation de votre distribution pour découvrir comment les installer.

Si ces utilitaires ne sont pas disponibles pour votre distribution, suivez les mêmes instructions, mais utilisez à la place les utilitaires dont vous disposez.

### Systèmes Windows

La collecte de données pour les systèmes Windows est disponible en bêta publique pour Windows Server 2016 et les versions ultérieures.
**Remarque** : NPM surveille actuellement les hosts Windows uniquement, et non les conteneurs Windows. La collecte de métriques DNS n'est pas prise en charge par les systèmes Windows.

Pour configurer la solution Network Performance Monitoring pour les hosts Windows :

1. Installez [cette version personnalisée][4] de l'Agent Datadog.
2. Modifiez `C:\ProgramData\Datadog\system-probe.yaml` en définissant le flag enable sur `true` :

    ```yaml
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```
3. Modifiez `C:\ProgramData\Datadog\datadog.yaml` en définissant le flag enable sur `true` :

    ```yaml
    process_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```
4. [Redémarrez l'Agent][2].

    Pour PowerShell (`powershell.exe`) :
    ```shell
    restart-service -f datadogagent
    ```
    Pour l'invite de commandes (`cmd.exe`) :
    ```shell
    net /y stop datadogagent && net start datadoagagent
    ```

[1]: /fr/infrastructure/process/?tab=linuxwindows#installation
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
[4]: https://s3.amazonaws.com/ddagent-windows-unstable/datadog-agent-7.23.2-beta1-1-x86_64.msi
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour activer la solution Network Performance Monitoring avec Kubernetes de toute pièce :

1. Téléchargez le modèle de [manifeste datadog-agent.yaml][1].
2. Remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][2].
3. **Définissez votre site Datadog** (facultatif). Si vous utilisez le site européen de Datadog, définissez la variable d'environnement `DD_SITE` sur `datadoghq.eu` dans le manifeste `datadog-agent.yaml`.
4. **Déployez le DaemonSet** avec cette commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si l'[Agent est déjà exécuté avec un manifeste][3] :

1. Ajoutez l'annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` au modèle `datadog-agent` :

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

2. Activez la collecte de processus et le system-probe avec les variables d'environnement suivantes dans le Daemonset de l'Agent. Si vous exécutez un conteneur par processus d'Agent, ajoutez les variables d'environnement suivantes au conteneur de l''Agent de processus. Si ce n'est pas le cas, ajoutez-les au conteneur de l'Agent.

    ```yaml
      # (...)
                      env:
                      # (...)
                          - name: DD_PROCESS_AGENT_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_EXTERNAL
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
    ```

3. Montez les volumes supplémentaires suivants dans votre conteneur `datadog-agent` :

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'gcr.io/datadoghq/agent:latest'
                      # (...)
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
    ```

4. Ajoutez un nouveau system-probe en tant que sidecar de l'Agent :

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'datadog/agent:latest'
                    # (...)
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
                                  - IPC_LOCK
                      command:
                          - /opt/datadog-agent/embedded/bin/system-probe
                      env:
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
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
                          - name: sysprobe-socket-dir
                            mountPath: /var/run/sysprobe
    ```

5. Enfin, ajoutez les volumes suivants à votre manifeste :

    ```yaml
                volumes:
                    - name: sysprobe-socket-dir
                      emptyDir: {}
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
    ```


[1]: /resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/account/settings#api
[3]: /fr/agent/kubernetes/
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer la fonctionnalité Network Performance Monitoring dans Docker, utilisez la configuration suivante lorsque vous lancez l'Agent de conteneur :

```shell
$ DOCKER_CONTENT_TRUST=1 docker run -e DD_API_KEY="<CLÉ_API_DATADOG>" \
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
--cap-add=IPC_LOCK \
datadog/agent
```

Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

Si vous utilisez `docker-compose`, ajoutez ce qui suit au service de l'Agent Datadog.

```
version: '3'
services:
  ..
  datadog:
    image: "datadog/agent:latest"
    environment:
       DD_SYSTEM_PROBE_ENABLED: 'true'
       DD_PROCESS_AGENT_ENABLED: 'true'
       DD_API_KEY: '<CLÉ_API_DATADOG>'
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - /proc/:/host/proc/:ro
    - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
    - SYS_ADMIN
    - SYS_RESOURCE
    - SYS_PTRACE
    - NET_ADMIN
    - IPC_LOCK
    security_opt:
    - apparmor:unconfined
```

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "ECS" %}}
Pour une configuration sur AWS ECS, consultez la section relative à [AWS ECS][1].


[1]: /fr/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/network_performance_monitoring/installation/?tab=agent#windows-systems
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /fr/network_performance_monitoring/network_page#dns-resolution
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[8]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file