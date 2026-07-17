---
aliases:
- /fr/network_performance_monitoring/installation/
- /fr/network_monitoring/performance/setup
description: Recueillez vos données réseau avec l'Agent.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Surveillance du réseau cloud
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Datadog CNM avec des conteneurs et des réseaux maillés de services
- link: /network_monitoring/devices
  tag: Documentation
  text: Surveillance d'appareils en réseau
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM prend désormais en charge la mise en réseau Consul
- link: https://www.datadoghq.com/blog/cnm-kubernetes-egress/
  tag: Blog
  text: Comment Datadog Cloud Network Monitoring vous aide à passer à une politique
    de sortie réseau en refus par défaut à grande échelle
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: Doc
  text: Termes et concepts de CNM
title: Configuration de la surveillance du réseau cloud
---
Datadog Cloud Network Monitoring (CNM) vous offre une visibilité sur votre trafic réseau entre les services, les conteneurs, les zones de disponibilité et tout autre tag dans Datadog afin que vous puissiez :

- Identifier les dépendances de service inattendues ou latentes.
- Optimiser la communication coûteuse entre régions ou multi-cloud.
- Identifier les pannes des régions des fournisseurs de cloud et des outils tiers.
- Déboguer la découverte de services défectueuse avec les métriques du serveur DNS.

La surveillance du réseau cloud nécessite [Datadog Agent v6.14+][1]. Étant donné que les métriques sont automatiquement collectées dans les versions supérieures de l'Agent, consultez la [section de configuration des métriques][2] pour configurer la surveillance DNS.

## Plateformes prises en charge {#supported-platforms}

### Systèmes d'exploitation {#operating-systems}

#### Système d'exploitation Linux {#linux-os}

La collecte de données se fait à l'aide d'eBPF, donc Datadog nécessite au minimum des plateformes ayant des versions de noyau Linux sous-jacentes de 4.4.0+ ou ayant des fonctionnalités eBPF rétroportées. CNM prend en charge les distributions Linux suivantes :

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- CentOS/RHEL 7.6+

**Remarque :** Il existe une exception à l'exigence du noyau 4.4.0+ pour [CentOS/RHEL 7.6+][3]. La fonctionnalité [Résolution DNS][4] n'est pas prise en charge sur CentOS/RHEL 7.6.

#### Windows OS {#windows-os}

La collecte de données se fait à l'aide d'un pilote de périphérique de noyau réseau. Le support est disponible à partir de la version 7.27.1 de l'Agent Datadog, pour les versions Windows 2012 R2 (et les systèmes d'exploitation de bureau équivalents, y compris Windows 10) et ultérieures.

#### macOS {#macos}

La surveillance du réseau cloud Datadog ne prend pas en charge les plateformes macOS.

### Conteneurs {#containers}

CNM vous aide à visualiser l'architecture et les performances de vos environnements conteneurisés et orchestrés, avec la prise en charge de [Docker][5], [Kubernetes][6], [ECS][7] et d'autres technologies de conteneurs. Les intégrations de conteneurs de Datadog vous permettent d'agréger le trafic par entités significatives, telles que conteneurs, tâches, pods, clusters et déploiements, avec des balises prêtes à l'emploi telles que `container_name`, `task_name` et `kube_service`.

### Outils de routage réseau {#network-routing-tools}

#### Istio {#istio}

Avec CNM, vous pouvez cartographier la communication réseau entre conteneurs, pods et services sur le maillage de services Istio.

Datadog surveille chaque aspect de votre environnement Istio. Vous pouvez également :

- Évaluez la santé d'Envoy et du plan de contrôle Istio avec [logs][8].
- Décomposez les performances de votre maillage de services avec des [métriques][8] de requêtes, de bande passante et de consommation de ressources.
- Examinez les traces distribuées des applications opérant sur le maillage avec [APM][9].

CNM prend en charge Istio v1.6.4+ avec [Datadog Agent v7.24.1+][1].

Pour en savoir plus sur la surveillance de votre environnement Istio avec Datadog, [consultez le blog Istio][10].

#### Cilium {#cilium}

La surveillance du réseau cloud est compatible avec les installations **Cilium**, à condition que les exigences suivantes soient respectées :
1) Version de Cilium 1.6 et supérieure, et
2) Version du noyau 5.1.16 et supérieure, ou 4.19.57 et supérieure pour les noyaux 4.19.x

### Systèmes de provisionnement {#provisioning-systems}

La surveillance du réseau cloud prend en charge l'utilisation des systèmes de provisionnement suivants :

- Daemonset / Helm 1.38.11+ : Consultez le [Datadog Helm chart][11]
- Chef 12.7+ : Consultez la [recette Datadog Chef][12]
- Ansible 2.6+ : Consultez le [rôle Datadog Ansible][13]

## Configuration {#setup}

La surveillance du réseau cloud est conçue pour analyser le trafic _entre_ les points de terminaison du réseau et cartographier les dépendances réseau. Datadog recommande d'installer CNM sur un sous-ensemble significatif de votre infrastructure et un **_minimum de 2 hôtes_** pour maximiser la valeur.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Pour activer la surveillance du réseau cloud avec l'Agent Datadog, utilisez les configurations suivantes :

1. **Si vous utilisez un Agent plus ancien que v6.14**, activez d'abord [la collecte de processus en direct][1], sinon passez cette étape.

2. Copiez l'exemple de configuration du système-probe :

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Modifiez `/etc/datadog-agent/system-probe.yaml` pour définir le drapeau d'activation sur `true` :

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Cloud Network Monitoring.
      #
      enabled: true
    ```

    **Optional**: To monitor DNS traffic on non-standard ports (Agent v7.76.0+), add the `dns_monitoring_ports` option:

    ```yaml
    network_config:
      enabled: true
      dns_monitoring_ports:
        - 53
        - 5353
    ```

4. **Si vous exécutez un Agent plus ancien que v6.18 ou 7.18**, démarrez manuellement le système-probe et activez-le pour qu'il démarre au démarrage (depuis v6.18 et v7.18, le système-probe démarre automatiquement lorsque l'Agent est démarré) :

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Note**: If the `systemctl` command is not available on your system, start it with following command instead: `sudo service datadog-agent-sysprobe start` and then set it up to start on boot before `datadog-agent` starts.

5. [Redémarrer l'Agent][2].

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`

### Systèmes avec SELinux activé {#selinux-enabled-systems}

Sur les systèmes disposant de SELinux, le binaire system-probe requiert des autorisations spéciales pour utiliser les fonctionnalités eBPF.

Le package RPM de l'Agent Datadog pour les systèmes basés sur CentOS comprend une [stratégie SELinux][3] permettant d'accorder ces autorisations au binaire system-probe.

Si vous devez utiliser la surveillance du réseau cloud sur d'autres systèmes avec SELinux activé, procédez comme suit :

1. Modifiez la [politique SELinux][3] de base pour correspondre à votre configuration SELinux.
    Selon votre système, il est possible que certains types ou attributs n'existent pas ou qu'ils possèdent d'autres noms.

2. Compilez la politique en un module ; en supposant que votre fichier de politique s'appelle `system_probe_policy.te` :

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. Appliquez le module à votre système SELinux :

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Changez le type binaire system-probe pour utiliser celui défini dans la politique ; en supposant que votre répertoire d'installation de l'Agent est `/opt/datadog-agent` :

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Redémarrer l'Agent][2].

**Remarque** : ces instructions nécessitent d'avoir certains utilitaires SELinux installés sur le système (`checkmodule`, `semodule`, `semodule_package`, `semanage` et `restorecon`) qui sont disponibles sur la plupart des distributions standard (Ubuntu, Debian, RHEL, CentOS, SUSE). Vérifiez votre distribution pour des détails sur la façon de les installer.

Si ces utilitaires ne sont pas disponibles pour votre distribution, suivez les mêmes instructions, mais utilisez à la place les utilitaires dont vous disposez.


[1]: /fr/infrastructure/process/?tab=linuxwindows#installation
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

La collecte de logs réseau pour Windows repose sur un pilote de filtre.

Pour activer la surveillance du réseau Cloud pour les hôtes Windows :

1. Installez le [Datadog Agent][1] (version 7.27.1 ou supérieure) avec le composant du pilote réseau activé.

   [DÉPRÉCIÉ] _(version 7.44 ou inférieure)_ Pendant l'installation, passez `ADDLOCAL="MainApplication,NPM"` à la commande `msiexec`, ou sélectionnez "Surveillance du réseau Cloud" lors de l'exécution de l'installation de l'Agent via l'interface graphique.

2. Modifiez `C:\ProgramData\Datadog\system-probe.yaml` pour définir le drapeau activé sur `true` :

    ```yaml
    network_config:
        enabled: true
    ```

    **Optional**: To monitor DNS traffic on non-standard ports (Agent v7.76.0+), add the `dns_monitoring_ports` option:

    ```yaml
    network_config:
        enabled: true
        dns_monitoring_ports:
            - 53
            - 5353
    ```

3. [Redémarrer l'Agent][2].

    Pour PowerShell (`powershell.exe`) :
    ```shell
    restart-service -f datadogagent
    ```
    For Command Prompt (`cmd.exe`):
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**Remarque** : La surveillance du réseau Cloud surveille uniquement les hôtes Windows, et non les conteneurs Windows.


[1]: /fr/agent/basic_agent_usage/windows/?tab=commandline
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Helm" %}}

Pour activer la surveillance du réseau Cloud avec Kubernetes en utilisant Helm, ajoutez ce qui suit à votre fichier `values.yaml`.</br>
**Remarque :** La version du graphique Helm v3.135.3+ est requise. Pour plus d'informations, consultez la [documentation du graphique Helm Datadog][1].

  ```yaml
  datadog:
    ...
    networkMonitoring:
      enabled: true
  ```

**Optionnel** : Pour surveiller le trafic DNS sur des ports non standards (Agent v7.76.0+), ajoutez l'option `dnsMonitoringPorts` :

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
      dnsMonitoringPorts:
        - 53
        - 5353
  ```

Vous pourriez avoir besoin de l'une des étapes supplémentaires suivantes en fonction de votre environnement :

{{< collapse-content title="Google GKE Autopilot" level="h4" >}}

Si votre cluster utilise Google GKE Autopilot, ajoutez ce qui suit à votre fichier de valeurs :

```
providers:
  gke:
    autopilot: true
```

{{< /collapse-content >}}

{{< collapse-content title="Google Container-Optimized OS (COS)" level="h4" >}}

Si votre cluster utilise Google Container-Optimized OS (COS), ajoutez ce qui suit à votre fichier de valeurs :

```
providers:
  gke:
    cos: true
```


{{< /collapse-content >}}

{{< collapse-content title="Bottlerocket Linux" level="h4" >}}

Si votre cluster utilise la distribution Bottlerocket Linux pour ses nœuds, ajoutez ce qui suit à votre fichier de valeurs :

```
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: "system_u"
          role: "system_r"
          type: "super_t"
          level: "s0"
```

{{< /collapse-content >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#enabling-npm-collection

{{% /tab %}}
{{% tab "Kubernetes sans Helm" %}}

Si vous n'utilisez pas Helm, vous pouvez activer la surveillance du réseau Cloud avec Kubernetes à partir de zéro :

1. Téléchargez le modèle de manifeste [datadog-agent.yaml manifest][1].
2. Remplacez `<DATADOG_API_KEY>` par votre [clé API Datadog][2].
3. Optionnel - **Définissez votre site Datadog**. Si vous utilisez le site Datadog EU, définissez la variable d'environnement `DD_SITE` sur `datadoghq.eu` dans le manifeste `datadog-agent.yaml`.
4. **Déployez le DaemonSet** avec la commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si l'[Agent est déjà exécute avec un manifeste][3] :

1. Pour les versions de Kubernetes inférieures à `1.30`, ajoutez l'annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` sur le modèle `datadog-agent` :

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
    For Kubernetes versions `1.30+`, add the following `securityContext` on the `datadog-agent` template:

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
            spec:
                serviceAccountName: datadog-agent
                securityContext:
                  appArmorProfile:
                    type: Unconfined
                containers:
                # (...)
    ```

2. Activez la collecte des processus et le système probe avec les variables d'environnement suivantes dans le DaemonSet de l'Agent. Si vous exécutez un conteneur par processus Agent, ajoutez les variables d'environnement suivantes au conteneur du Process Agent ; sinon, ajoutez-les au conteneur de l'Agent.

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
                          - name: DD_AUTH_TOKEN_FILE_PATH
                            value: /etc/datadog-agent/auth/token
    ```

3. Montez les volumes supplémentaires suivants dans le conteneur `datadog-agent` :

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'registry.datadoghq.com/agent:latest'
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
                      - name: auth-token
                        mountPath: /etc/datadog-agent/auth
                        readOnly: false # needs RW to write auth token
    ```

4. Ajoutez un nouveau system-probe en tant que side-car à l'Agent :

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'registry.datadoghq.com/agent:latest'
                    # (...)
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
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
                          - name: DD_AUTH_TOKEN_FILE_PATH
                            value: /etc/datadog-agent/auth/token
                      resources:
                          requests:
                              memory: 150Mi
                              cpu: 200m
                          limits:
                              memory: 300Mi
                              cpu: 400m
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
                          - name: auth-token
                            mountPath: /etc/datadog-agent/auth
                            readOnly: true
    ```

5. Enfin, ajoutez les volumes suivants à votre manifeste :

    ```yaml
                volumes:
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
                    - name: sysprobe-socket-dir
                      emptyDir: { }
                    - name: auth-token
                      emptyDir: { }
    ```

[1]: /fr/resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/agent/kubernetes/

{{% /tab %}}
{{% tab "Opérateur" %}}

[Datadog Operator][1] simplifie le déploiement du Datadog Agent sur Kubernetes et OpenShift. Il fournit l'état de déploiement, la santé et le reporting des erreurs via son Custom Resource status, tout en réduisant le risque de mauvaise configuration grâce à des options de configuration de niveau supérieur.

Pour activer la Surveillance du Réseau Cloud sur le Datadog Operator, utilisez la configuration suivante :

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  features:
    npm:
      enabled: true
```

[1]: /fr/containers/datadog_operator 
{{% /tab %}}
{{% tab "Docker" %}}

Pour activer la Surveillance du Réseau Cloud dans Docker, utilisez la configuration suivante lors du démarrage du conteneur Agent :

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
registry.datadoghq.com/agent:latest
```

Remplacez `<DATADOG_API_KEY>` par votre [Datadog API key][1].

Si vous utilisez `docker-compose`, faites les ajouts suivants au service du Datadog Agent :

```shell
version: '3'
services:
  datadog:
    image: "registry.datadoghq.com/agent:latest"
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
Pour configurer CNM sur Amazon ECS, consultez la page de documentation [Amazon ECS][1].


[1]: /fr/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}

{{% tab "ECS Fargate" %}}

<div class="alert alert-info">ECS Fargate pour CNM est en Prévisualisation. Contactez votre représentant Datadog pour vous inscrire.</div>

Pour activer la Surveillance du Réseau Cloud sur ECS Fargate, utilisez les instructions suivantes :

**Nécessite la version du Datadog Agent `7.58` ou supérieure**.

- Pour un nouveau déploiement Fargate, configurez le Datadog Agent pour surveiller Fargate sur ECS en activant [process collection][1] sur vos hôtes Fargate.

- Pour les déploiements existants, mettez à jour votre fichier `task.json` pour inclure les paramètres de configuration suivants :

```json
{
 "containerDefinitions": [
   (...)
     "environment": [
       (...)
       {
         "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
         "value": "true"
       },
       {
          "name": "DD_NETWORK_CONFIG_ENABLE_EBPFLESS",
          "value": "true"
       },
       {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
       }      
     ],
     "linuxParameters": {
      "capabilities": {
        "add": [
          "SYS_PTRACE"
        ]
      }
    },
 ],
}
```
[1]: /fr/integrations/ecs_fargate/?tab=webui#process-collection 

{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### Résolution améliorée {#enhanced-resolution}

En option, activez la collecte de ressources pour les intégrations cloud afin de permettre à la Surveillance du Réseau Cloud de découvrir les entités gérées par le cloud.
- Installez l'[intégration Azure][101] pour avoir une visibilité sur les équilibreurs de charge Azure et les passerelles d'application.
- Installez l'[Intégration AWS][102] pour avoir une visibilité sur l'Équilibreur de Charge AWS. **Vous devez activer la collecte des métriques ENI et EC2**

Pour en savoir plus sur ces fonctionnalités, référez-vous à la rubrique [Résolution améliorée sur les services cloud][103].

[101]: /fr/integrations/azure
[102]: /fr/integrations/amazon_web_services/#resource-collection
[103]: /fr/network_monitoring/cloud_network_monitoring/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

### Connexions échouées {#failed-connections}

Les connexions échouées permettent la collecte et le reporting des échecs TCP, y compris [resets, refusals, and timeouts][14]. Cette fonctionnalité est activée par défaut dans la version `7.59+` du Datadog Agent, et elle est accessible sur la page [CNM Analytics][15] dans le menu **Customize** en activant le commutateur **Failures**.

**Remarque** : Si certains Datadog Agents de votre infrastructure exécutent une version antérieure à `7.59`, vous pourriez rencontrer des échecs sous-rapportés. CNM conseille de maintenir la même version du Datadog Agent sur _tous_ les hôtes.

{{< img src="network_performance_monitoring/setup/cnm_tcp_failures_toggle.png" alt="Capture d'écran du menu Customize de CNM, mettant en évidence le toggle Failures" style="width:50%;">}}

## Lectures complémentaires {#further-reading}
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
[14]: /fr/network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#tcp
[15]: https://app.datadoghq.com/network