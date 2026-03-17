---
description: Configurez la surveillance des services universels à l'aide de l'agent
  Datadog sur différentes plateformes, notamment les environnements Kubernetes, Docker,
  ECS et Windows.
further_reading:
- link: /universal_service_monitoring/
  tag: Documentation
  text: En savoir plus sur la surveillance du service universel
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Des signaux dorés en quelques secondes grâce à Universal Service Monitoring
title: Configuration de la surveillance du service universel
---
## Versions prises en charge et compatibilité

Version requise d'Agent
: La surveillance Universal Service nécessite que l'agent Datadog installé avec votre service conteneurisé soit au moins de la version 6.40 ou 7.40. Comme indiqué ci-dessous, certaines fonctionnalités en préversion nécessitent des versions plus récentes.

Plates-formes Linux prises en charge
: Noyau Linux 4.14 et versions ultérieures<br/>
CentOS ou RHEL 8.0 et versions ultérieures

Plates-formes Windows prises en charge
: Windows Server 2012 R2 et versions ultérieures

Protocoles de la couche application pris en charge
: HTTP<br/>
HTTPS (OpenSSL)

Limites connues
: La surveillance Universal Service nécessite l'utilisation de Datadog`system-probe`, qui n'est pas prise en charge sur Google Kubernetes Engine (GKE) Autopilot.

<div class="alert alert-info">
D'autres protocoles et méthodes de chiffrement du trafic sont actuellement en phase <a href="/universal_service_monitoring/additional_protocols/">de préversion</a>. Si vous souhaitez nous faire part de vos suggestions concernant les plateformes et les protocoles que vous aimeriez voir pris en charge, <a href="/help/">veuillez contacter le service d'assistance</a>.
</div>

## Conditions 

- préalablesSi vous utilisez Linux : 
    - votre service s'exécute dans un conteneur.
    - **En préversion :** pour les services non conteneurisés, consultez les [instructions ici](#additional-configuration).
- Si vous utilisez Windows : 
    - votre service s'exécute sur une machine virtuelle.L'agent
-  Datadog est installé sur le même serveur que votre service. Il _n'est pas_ nécessaire d'installer
-  une bibliothèque de traçage. La`env`balise [Unified Service Tagging][1] a été appliquée à votre déploiement. Les balises`service``version`  et  sont facultatives.

## Comment l'USM détecte les noms de services

<div class="alert alert-warning">
La surveillance des services universels détecte les noms de services à partir des variables d'environnement présentes au démarrage d'un processus. USM récupère ces valeurs auprès du système d'exploitation : via le répertoire<code> /proc/PID/environ</code> sous Linux, ou via les API système sous Windows.
</div>

USM reconnaît les variables d'environnement
- `DD_SERVICE` suivantes : Définit explicitement le nom du service
- `DD_ENV` : Définit la balise d'environnement
- `DD_VERSION` : Définit la balise de version
- `DD_TAGS` : Balises supplémentaires ; peut inclure la restriction`service:name` tagKey

###  : USM et variables d'environnement définies par programmation pour APM

Si vous définissez des variables d'environnement par programmation **dans le code de votre application** (par exemple`System.setProperty("dd.service", "my-service")`en Java ou`Environment.SetEnvironmentVariable("DD_SERVICE", "my-service")`en .NET), celles-ci ne sont **pas** détectées par USM, même si ces valeurs fonctionnent pour l'instrumentation de traçage APM.

Cela s'explique par le fait qu'USM s'exécute dans l'agent Datadog en tant que processus distinct et ne prend en compte que les variables d'environnement définies au moment du démarrage de ce processus. À l'inverse, les bibliothèques d'instrumentation APM s'exécutent au sein du processus de votre application et peuvent détecter les modifications apportées à l'environnement d'exécution. 

**Pour garantir la détection USM, définissez les variables d'environnement avant le démarrage de l'application** :

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
{{% tab "Coquille" %}}
```bash
export DD_SERVICE=my-service
export DD_ENV=production
java -jar myapp.jar
```
{{% /tab %}}
{{< /tabs >}}

## Activation de la surveillance du service universel

Activez la surveillance universelle des services dans votre agent en utilisant l'une des méthodes suivantes, en fonction du mode de déploiement de votre service et de la configuration de votre agent :

{{< tabs >}}
{{% tab "Casque" %}}

Si vous utilisez la version >= 2.26.2 de Datadog Chart, ajoutez ce qui suit à votre fichier de valeurs :

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

Si votre cluster utilise Google ContainerOptimized OS (COS), ajoutez également les éléments suivants à votre fichier de valeurs :

```
providers:
  gke:
    cos: true
```

Si votre cluster utilise la distribution Linux Bottlerocket pour ses nœuds, ajoutez ce qui suit à votre fichier de valeurs :

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
{{% tab "Opérateur" %}}

La version 1.0.0 ou une version ultérieure de Datadog Operator est requise.

Pour activer la surveillance des services universels avec [Datadog Operator][1], mettez à jour votre`datadog-agent.yaml`manifeste. Dans la`DatadogAgent`ressource, définissez`spec.features.usm.enabled`  sur `true`:

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


[1]: https://github.com/DataDog/datadog-operator

{{% /tab %}}
{{% tab "Kubernetes sans Helm" %}}

1. Ajoutez l'annotation`container.apparmor.security.beta.kubernetes.io/system-probe: unconfined`  sur le`datadog-agent`  modèle :

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
2. Activez la surveillance des services universels à l'aide des variables d'environnement suivantes dans le daemonset de l'agent. Si vous exécutez un conteneur par processus Agent, ajoutez les variables d'environnement suivantes au`process-agent`conteneur. Sinon, ajoutez-les au `agent`conteneur.

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

3. Montez les volumes supplémentaires suivants dans le`datadog-agent`conteneur :
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

4. Ajoutez un nouveau`system-probe`conteneur en tant que sidecar à l'Agent :

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

5. Ajoutez les volumes suivants à votre manifeste :
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

    **Note**: If your cluster runs on Google Container-Optimized OS (COS), remove the `src` mount by removing the following from your container definition:
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    And removing the following from your manifest:
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. Pour activer la prise en charge HTTPS (facultative), ajoutez ce qui suit au`system-probe`conteneur :

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   Et ajoutez les volumes suivants à votre manifeste :
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Ajoutez ce qui suit à votre`docker run`commande :

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

Ajoutez ce qui suit à votre`docker-compose.yml`fichier :

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

Pour activer la prise en charge facultative du protocole HTTPS, ajoutez également :

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

Comme  ne`Docker Swarm` prend pas encore en charge la modification de `security_opt`, le système d'exploitation
Il ne doit pas y avoir d'instance`apparmor` en cours d'exécution.

Si le système d'exploitation ne dispose pas d'une instance `apparmor`en cours d'exécution, utilisez le même`docker-compose.yml`fichier que celui de la`Docker-Compose`[section][1] à côté du champ`security_opt`.

[1]: /fr/universal_service_monitoring/setup/?tab=dockercompose#enabling-universal-service-monitoring

{{% /tab %}}
{{% tab "Fichiers de configuration (Linux)" %}}

Si vous n'utilisez ni Helm Charts ni de variables d'environnement, configurez les paramètres suivants dans votre`system-probe.yaml`fichier :

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Variables d'environnement (Linux)" %}}

Si vous configurez le`system-probe`  à l'aide de variables d'environnement, comme c'est souvent le cas avec les installations Docker et ECS, transmettez la variable d'environnement suivante à **la fois** au`process-agent`  et `system-probe`au :

```yaml
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Chef" %}}

Définissez les attributs suivants sur vos nœuds :

```rb
node["datadog"]["system_probe"]["service_monitoring_enabled"] = true
```

{{% /tab %}}
{{% tab "Marionnette" %}}

Ensemble `service_monitoring_enabled`:

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Ajoutez les attributs suivants dans votre playbook :

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

Pour ECS, activez l'USM et la sonde système à l'aide de la définition de tâche JSON suivante. Déployez la définition de tâche en tant que [service démon][1].

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

Si l'image du système d'exploitation est Ubuntu ou Debian, ajoutez ce qui suit après `environment`:

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

Pour activer la prise en charge facultative du protocole HTTPS, ajoutez également :

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

Si vous utilisez des équilibreurs de charge avec vos services, activez des intégrations cloud supplémentaires pour permettre à Universal Service Monitoring de détecter les entités gérées dans le cloud : 

1. installez l'[intégration AWS][2] pour bénéficier d'une visibilité sur AWS Load Balancer. 
2. Activez la collecte des métriques ENI et EC2. 
3. Ajoutez les balises suivantes à chaque équilibreur de charge :
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /fr/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /fr/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**Pour les services exécutés sur IIS : **

1. installez l'[agent Datadog][1] (version 6.41 ou 7.41 et ultérieures) en activant le composant du pilote de périphérique réseau du noyau.
   Pour la version 7.44 ou antérieure de l'Agent, vous devez passer`ADDLOCAL="MainApplication,NPM"`  à la`msiexec`  commande lors de l'installation, ou sélectionner «** Cloud Network Monitoring »** lorsque vous lancez l'installation de l'Agent via l'interface graphique. 

2. Modifiez`C:\ProgramData\Datadog\system-probe.yaml`  pour définir le drapeau d'activation sur `true`:

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
**Pour les services non IIS : **

la détection des services non IIS est activée par défaut à partir de la version 7.57 de l'Agent. Les versions antérieures de l'Agent peuvent nécessiter la modification de `system-probe.yaml`configuration suivante :

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

<div class="alert alert-warning">
<strong>Restriction importante concernant les services Windows non IIS : la surveillance</strong> universelle des services sous Windows utilise la fonctionnalité « Event Tracing for Windows » (ETW) via le fournisseur<code> </code>MicrosoftWindowsHttpService pour la surveillance du trafic HTTPS. Ce fournisseur ETW n'est disponible que pour les services basés sur IIS. Les services non IIS (tels que les applications .NET personnalisées, les serveurs Node.js, les serveurs Java ou d'autres serveurs HTTP fonctionnant sous Windows) <strong>ne prennent pas en charge la surveillance HTTPS</strong> via USM. Seul le trafic HTTP standard peut être surveillé pour les services Windows autres que IIS.
</div>

### Prise 

| en charge des services IIS et non IISType de     |  serviceSurveillance du  | trafic HTTPSurveillance du trafic HTTPSServices  |
| ---  | ----------- | ----------- |
| IISPrise en      |  | chargePrise en               |
|  chargeServices non IISPrise en chargeNon  |  | **prise en charge** |

   
[1]: /fr/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## Configuration supplémentaire

Les systèmes ou services suivants nécessitent une configuration supplémentaire :

{{< collapse-content title="Services non conteneurisés sous Linux" level="h4" >}}
<div class="alert alert-info">
La surveillance Universal Service Monitoring permet de surveiller les services exécutés en mode bare metal sur des machines virtuelles Linux.
</div>

Nécessite la version 7.42 ou une version ultérieure d'Agent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```conf
DD_SYSTEM_PROBE_PROCESS_SERVICE_INFERENCE_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Surveillance Go TLS" level="h4" >}}
<div class="alert alert-info">
La fonctionnalité « Universal Service Monitoring » est actuellement en phase de préversion et permet de surveiller le trafic chiffré TLS provenant de services développés en Golang.
</div>

<strong>Remarque </strong>:
<br>
<ul role="list">
  <li>Les serveurs Go HTTPS peuvent faire passer le protocole HTTP/1.1 à HTTP/2, qui est pris en charge en version préliminaire. Pour plus d'informations, veuillez contacter votre chargé de compte.</li>
  <li>Nécessite la version 7.51 ou une version ultérieure d'Agent.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    go:
      enabled: true
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED=true
```
{{% /tab %}}

{{% tab "Casque" %}}

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

{{< collapse-content title="Surveillance TLS avec Node.js" level="h4" >}}

<div class="alert alert-info">
La fonctionnalité « Universal Service Monitoring » est actuellement en phase de préversion et permet de surveiller les requêtes HTTP, HTTP/2 et gRPC provenant de services implémentés en Node.js.
</div>

Nécessite la version 7.54 ou une version ultérieure d'Agent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    nodejs:
      enabled: true
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED=true
```
{{% /tab %}}

{{% tab "Casque" %}}

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

{{< collapse-content title="Surveillance d'Istio" level="h4" >}}

La surveillance des services universelle permet de surveiller les services derrière <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> et de capturer le trafic HTTPS, HTTP/2 et gRPC chiffré.

Nécessite la version 7.50 ou une version ultérieure d'Agent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    istio:
      enabled: true
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED=true
```
{{% /tab %}}

{{% tab "Casque" %}}

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

{{< collapse-content title="Surveillance HTTP/2" level="h4" >}}
Universal Service Monitoring permet de capturer le trafic HTTP/2 et gRPC. 

<strong>Remarque </strong>:
<br>
<ul role="list">
  <li>Nécessite le noyau Linux version 5.2 ou ultérieure.</li>
  <li>Nécessite la version 7.53 ou une version ultérieure d'Agent.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe.yaml`:

```yaml
service_monitoring_config:
  enable_http2_monitoring: true
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING=true
```
{{% /tab %}}
{{% tab "Casque" %}}

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

{{< collapse-content title="Surveillance Kafka (version préliminaire)" level="h4" >}}

<div class="alert alert-info">
Kafka Monitoring est disponible en <strong>version préliminaire</strong>.
</div>

<strong>Remarque </strong>:
<br>
<ul role="list">
  <li>Les producteurs et les consommateurs doivent disposer du noyau Linux version 5.2 ou ultérieure.</li>
  <li>Les producteurs et les consommateurs doivent communiquer avec Kafka <strong>sans</strong> TLS.</li>
  <li>Nécessite la version 7.53 ou une version ultérieure d'Agent.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  enable_kafka_monitoring: true
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING=true
```
{{% /tab %}}

{{% tab "Casque" %}}

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


## Exclusion et remplacement de chemins d'accès

Utilisez`http_replace_rules`  ou`DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES`  pour configurer l'Agent afin qu'il ignore les points de terminaison HTTP correspondant à une expression régulière, ou pour convertir les points de terminaison correspondants dans un autre format.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `system-probe`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

Par exemple, la configuration suivante rejette les points de terminaison commençant par `/api/`, tels que `/api/v1/users`. Cependant, il ne supprime`/api`ni  ni `/users/api`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

La configuration suivante remplace un point de terminaison`/api/users`afin de l'adapter à un `/api/v1/users`nouveau format :

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}
Ajoutez l'entrée suivante :

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Casque" %}}

Dans l'exemple suivant, le point final est `/my-api`supprimé et remplacé`/my-api-2`par `/new-version`.

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


<div class="alert alert-info"><strong>Prise en charge de protocoles et de méthodes </strong><p>de chiffrement supplémentaires : USM est actuellement en phase de préversion pour la découverte de services cloud et le décodage de protocoles et de méthodes de chiffrement du trafic supplémentaires. Pour plus d'informations et pour demander l'accès à la version préliminaire, consultez la section<a href="/universal_service_monitoring/additional_protocols/"> « Cloud Service Discovery and Additional Protocols </a>».</p></div>


## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging