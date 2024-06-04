---
aliases:
- /fr/network_performance_monitoring/installation/
description: Recueillez vos données réseau avec l'Agent.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Utiliser la solution NPM Datadog à l'aide de conteneurs et de réseaux avec
    maillage de services
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Nouvelle prise en charge de Consul par la solution NPM Datadog
kind: documentation
title: Configuration du Network Performance Monitoring
---

La solution Network Performance Monitoring (NPM) de Datadog vous permet de visualiser votre trafic réseau entre différents services, conteneurs, zones de disponibilité ou autres tags dans Datadog. Vous pouvez ainsi :

- Identifier les dépendances de service inattendues ou latentes
- Réduire les coûts liés aux communications inter-région ou multi-cloud
- Identifier les pannes affectant une région d'un fournisseur de solutions cloud ou des outils tiers
- Dépanner les problèmes liés à la découverte de services avec les métriques de serveur DNS

La solution NPM nécessite la [version 6.14+ de l'Agent Datadog][1]. Puisque les métriques sont automatiquement recueillies avec les versions récentes de l'Agent, consultez la [section relative à la configuration des métriques][2] pour configurer la surveillance DNS.

## Plateformes prises en charge

### Systèmes d'exploitation

#### Linux

La collecte de données étant basée sur eBPF, votre plateforme doit utiliser la version 4.4.0 du kernel Linux au minimum, ou les fonctionnalités eBPF doivent avoir été backportées. NPM prend en charge les distributions Linux suivantes :

- Ubuntu 16.04+
- Debian 9+
- Fedora 26 et versions ultérieures
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- CentOS/RHEL 7.6+

**Remarque** : l'exigence de version pour le kernel Linux (4.4.0+) ne s'applique pas à [CentOS/RHEL 7.6+][3]. La fonction de [résolution DNS][4] n'est pas prise en charge par CentOS/RHEL 7.6.

#### Windows

La collecte de données se fait via un pilote de kernel réseau. Elle est disponible à partir de la version 7.27.1 de l'Agent Datadog pour Windows 2012 R2 et ses versions ultérieures (ainsi que pour les systèmes d'exploitation équivalents, tels que Windows 10).

#### macOS

La solution NPM Datadog ne prend pas en charge les plateformes macOS.

### Containers

NPM vous aide à visualiser l'architecture et les performances de vos environnements orchestrés et conteneurisés, avec la prise en charge de [Docker][5], [Kubernetes][6], [ECS][7], et d'autres technologies de conteneur. Les intégrations pour conteneurs de Datadog vous permettent d'agréger le trafic en fonction d'entités pertinentes (conteneurs, tâches, pods, clusters, déploiements, etc.) grâce à des tags prêts à l'emploi (tels que `container_name`, `task_name` et `kube_service`). 

La solution NPM n'est pas prise en charge pour Google Kubernetes Engine (GKE) Autopilot.

### Outils de routage réseau

#### Istio

Grâce à NPM, vous pouvez mapper les communications réseau entre des conteneurs, pods et services via le maillage de services Istio.

Datadog surveille chaque aspect de votre environnement Istio. Vous pouvez également :

- Évaluer la santé d'Envoy et du plan de contrôle Istio grâce aux [logs][8]
- Consulter en détail les performances de votre maillage de services avec des [métriques][8] sur les requêtes, la bande passante et la consommation de ressources
- Étudier des traces distribuées pour les applications qui effectuent des transactions sur le maillage avec [APM][9]

NPM prend en charge Istio v1.6.4+ avec l'[Agent Datadog v7.24.1+][1].

Pour en savoir plus sur la surveillance de votre environnement Istio avec Datadog, [consultez l'article du blog à ce sujet][10] (en anglais).

#### Cilium

La fonctionnalité Network Performance Monitoring est compatible avec les installations **Cilium**, pour autant que vous disposiez :
1) d'une version 1.6+ de Cilium, et
2) d'une version 5.1.16+ du kernel, ou 4.19.57+ pour les kernels 4.19.x.

### Systèmes de provisionnement

NPM prend en charge les systèmes de provisionnement suivants :

- Daemonset/Helm 1.38.11+ : voir le [chart Helm Datadog][11]
- Chef 12.7+ : voir la [recette Chef pour Datadog][12]
- Ansible 2.6+ : voir le [rôle Ansible pour Datadog][13]

## Socket de domaine Unix

Cet outil a été conçu dans l'optique d'analyser le trafic _entre_ des endpoints réseau et de mapper des dépendances réseau. Il est donc conseillé de l'installer sur un sous-ensemble pertinent de votre infrastructure ainsi que sur **_deux hosts au minimum_** pour en tirer pleinement profit.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Pour activer la solution Network Performance Monitoring avec l'Agent Datadog, utilisez les configurations suivantes :

1. **Si vous utilisez une version de l'Agent antérieure à la version 6.14**, activez d'abord la [collecte de live processes][1]. Si ce n'est pas le cas, passez à l'étape suivante.

2. Copiez l'exemple de configuration system-probe :

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Modifiez `/etc/datadog-agent/system-probe.yaml` en définissant le flag enable sur `true` :

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Network Performance Monitoring.
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

Le package RPM de l'Agent Datadog pour les systèmes basés sur CentOS comprend une [stratégie SELinux][3] permettant d'accorder ces autorisations au binaire system-probe.

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


[1]: /fr/infrastructure/process/?tab=linuxwindows#installation
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

La collecte de logs réseau pour Windows repose sur un pilote de filtre.

Pour activer NPM pour des hosts Windows, procédez comme suit 

1. Installez l'[Agent Datadog][1] (version 7.27.1+) en prenant soin d'activer le composant du pilote de filtre.

   [OBSOLÈTE] _(version 7.44 ou antérieure)_ Lors de l'installation, transmettez `ADDLOCAL="MainApplication,NPM"` à la commande `msiexec`, ou sélectionnez « Network Performance Monitoring » pour une installation de lʼAgent via l'interface graphique.

1. Modifiez `C:\ProgramData\Datadog\system-probe.yaml` en définissant le flag enabled sur `true` :

    ```yaml
    network_config:
        enabled: true
    ```
3. [Redémarrez l'Agent][2].

    Pour PowerShell (`powershell.exe`) :
    ```shell
    restart-service -f datadogagent
    ```
    Pour l'invite de commandes (`cmd.exe`) :
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**Remarque** : NPM surveille uniquement des hosts Windows, et non des conteneurs Windows.


[1]: /fr/agent/basic_agent_usage/windows/?tab=commandline
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour activer Network Performance Monitoring avec Kubernetes via Helm, ajoutez ce qui suit à votre fichier values.yaml !

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
  ```
**Un chart Helm v.2.4.39+ est requis**. Pour en savoir plus, consultez la [documentation relative au chart Helm Datadog][1] (en anglais).

Si vous n'utilisez pas Helm, vous pouvez activer Network Performance Monitoring avec Kubernetes de toute pièce :

1. Téléchargez le modèle du [manifeste datadog-agent.yaml][2].
2. Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][3].
3. **Définissez votre site Datadog** (facultatif). Si vous utilisez le site européen de Datadog, définissez la variable d'environnement `DD_SITE` sur `datadoghq.eu` dans le manifeste `datadog-agent.yaml`.
4. **Déployez le DaemonSet** avec cette commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si l'[Agent est déjà exécuté avec un manifeste][4] :

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
                      image: 'gcr.io/datadoghq/agent:latest'
                    # (...)
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


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: /resources/yaml/datadog-agent-npm.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/agent/kubernetes/
{{% /tab %}}
{{% tab "Operator" %}}
<div class="alert alert-warning">L'opérateur Datadog est généralement disponible avec la version `1.0.0`, et il concilie la version `v2alpha1` de la ressource personnalisée de l'Agent Datadog. </div>

[L'Operator Datadog][1] est une fonctionnalité permettant de déployer l'Agent Datadog sur Kubernetes et OpenShift. L'Operator transmet des données sur le statut, la santé et les erreurs du déploiement dans le statut de sa ressource personnalisée. Ses paramètres de niveau supérieur permettent également de réduire les erreurs de configuration.

Pour activer NPM dans l'Operator, appliquez la configuration suivante :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  features:
    npm:
      enabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer la fonctionnalité Network Performance Monitoring dans Docker, utilisez la configuration suivante lorsque vous lancez l'Agent de conteneur :

```shell
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_NETWORK_ENABLED=true \
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
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN \
gcr.io/datadoghq/agent:latest
```

Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

Si vous utilisez `docker-compose`, ajoutez ce qui suit au service de l'Agent Datadog.

```
version: '3'
services:
  datadog:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_SYSTEM_PROBE_NETWORK_ENABLED=true
      - DD_PROCESS_AGENT_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
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
      - NET_BROADCAST
      - NET_RAW
      - IPC_LOCK
      - CHOWN
    security_opt:
      - apparmor:unconfined
```

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "ECS" %}}
Pour une configuration sur Amazon ECS, consultez la section relative à [Amazon ECS][1].


[1]: /fr/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### Résolution améliorée

Vous avez la possibilité dʼactiver la collecte de ressources pour les intégrations dans le cloud et ainsi permettre à la surveillance des performances réseau de détecter des entités gérées par le cloud.
- Installez lʼ[intégration Azure][1] pour consulter les répartiteurs de charge et les passerelles dʼapplications.
- installez lʼ[intégration AWS][2] afin de pouvoir consulter le répartiteur de charge AWS. **Vous devez activer la collecte de métrique ENI et EC2**

Pour en savoir plus sur ces fonctionnalités, référez-vous à la section [Résolution améliorée sur les services cloud][3].

  [1]: /integrations/azure
  [2]: /integrations/amazon_web_services/#resource-collection
  [3]: /network_monitoring/performance/network_analytics/#resolution-amelioree-sur-les-services-cloud

{{< /site-region >}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/network_monitoring/dns/#setup
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /fr/network_monitoring/dns/
[5]: https://docs.datadoghq.com/fr/agent/docker/
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/
[7]: https://docs.datadoghq.com/fr/agent/amazon_ecs
[8]: https://docs.datadoghq.com/fr/integrations/istio/
[9]: https://docs.datadoghq.com/fr/tracing/setup_overview/proxy_setup/?tab=istio
[10]: https://www.datadoghq.com/blog/istio-datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[12]: https://github.com/DataDog/chef-datadog
[13]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe