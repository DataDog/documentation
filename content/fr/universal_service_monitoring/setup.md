---
description: Configurez la surveillance du service universel avec Datadog Agent sur
  différentes plates-formes, y compris les environnements Kubernetes, Docker, ECS
  et Windows.
further_reading:
- link: /universal_service_monitoring/
  tag: Documentation
  text: En savoir plus sur Universal Service Monitoring
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Récupérez en quelques secondes des signaux clés avec Universal Service Monitoring
title: Mise en place de la surveillance du service universel
---
## Versions prises en charge et compatibilité

Version requise de l'agent
: Universal Service Monitoring exige que l'agent Datadog installé à côté de votre service conteneurisé soit au moins en version 6.40 ou 7.40. Comme indiqué ci-dessous, certaines fonctionnalités de Preview nécessitent des versions supérieures.

Plateformes Linux supportées
: noyau Linux 4.14 et supérieur<br/>
CentOS ou RHEL 8.0 et supérieur

Plateformes Windows prises en charge
: Windows 2012 R2 et supérieur

Protocoles de la couche application pris en charge
: HTTP<br/>
HTTPS (OpenSSL)

Limites connues
: La surveillance du service universel nécessite l'utilisation de la « sonde système » de Datadog, qui n'est pas prise en charge sur le pilote automatique du moteur Google Kubernetes (GKE).

<div class="alert alert-info">
Additional protocols and traffic encryption methods are in <a href="/universal_service_monitoring/additional_protocols/">Preview</a>. If you have feedback about what platforms and protocols you'd like to see supported, <a href="/help/">contact Support</a>.
</div>

## Prérequis

 Si sous Linux :
     Votre service fonctionne dans un conteneur.
     **Dans Aperçu:** Pour les services non conteneurisés, voir les [instructions ici](#configurationadditionnelle).
 Si sous Windows:
     Votre service fonctionne sur une machine virtuelle.
 Datadog Agent est installé parallèlement à votre service. L'installation d'une bibliothèque de traçage n'est _pas_ nécessaire.
 La balise `env` pour [Unified Service Tagging][1] a été appliquée à votre déploiement. Les balises `service` et `version` sont facultatives.

## Comment USM détecte les noms de service

<div class="alert alert-warning">
Universal Service Monitoring detects service names from environment variables that exist when a process starts. USM reads these values from the operating system: from <code>/proc/PID/environ</code> on Linux, or through system APIs on Windows.
</div>

USM reconnaît les variables d'environnement suivantes :
 `DD_SERVICE`: Définit explicitement le nom du service
 `DD_ENV`: Définit la balise environnement
 `DD_VERSION`: Définit la balise version
 `DD_TAGS`: Balises supplémentaires; peut inclure la balise `service:name`

### Limite de clé: USM et variables d'environnement programmatiquement définies pour APM

Si vous définissez des variables d'environnement par programmation **à l'intérieur du code de votre application** (comme `System.setProperty("dd.service", "myservice")` en Java, ou `Environment.SetEnvironmentVariable("DD_SERVICE", "myservice")` en .NET), ces variables d'environnement ne sont **pas** détectées par USM, même si ces valeurs fonctionnent pour l'instrumentation de traçage APM.

Cela se produit parce qu'USM s'exécute dans l'Agent Datadog en tant que processus distinct et ne voit que les variables d'environnement qui ont été définies au démarrage de votre processus. Inversement, les bibliothèques d'instrumentation APM s'exécutent à l'intérieur de votre processus d'application et peuvent lire les modifications de l'environnement d'exécution.

**Pour assurer la détection USM, définissez des variables d'environnement avant le démarrage de l'application**:

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
{{% tab "Shell" %}}
```bash
export DD_SERVICE=my-service
export DD_ENV=production
java -jar myapp.jar
```
{{% /tab %}}
{{< /tabs >}}

## Permettre la surveillance du service universel

Activez Universal Service Monitoring dans votre Agent à l'aide de l'une des méthodes suivantes, selon le type de déploiement de votre service et la configuration de votre Agent :

{{< tabs >}}
{{% tab "Helm" %}}

À l'aide de la version 2.26.2 ou d'une version ultérieure du chart Datadog, ajoutez ce qui suit à votre fichier values :

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

Si votre cluster exécute Google ContainerOptimized OS (COS), ajoutez également les éléments suivants à votre fichier de valeurs :

```
providers:
  gke:
    cos: true
```

Si votre cluster utilise la distribution Bottlerocket Linux pour ses nœuds, ajoutez les éléments suivants à votre fichier de valeurs :

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

Remarque : l'Operator Datadog v1.0.0 ou ultérieur est requis.

Pour activer la surveillance du service universel avec [Datadog Operator][1], mettez à jour votre manifeste `datadogagent.yaml`. Dans la ressource `DatadogAgent`, définissez `spec.features.usm.enabled` à `true`:

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
{{% tab "Kubernetes sans Helm" %}}

1. Ajoutez l ' annotation `container.apparmor.security.beta.kubernetes.io/systemprobe: unconfined` au modèle `datadogagent` :

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
2. Activer la surveillance du service universel avec les variables d'environnement suivantes dans le démonset Agent. Si vous exécutez un conteneur par processus Agent, ajoutez les variables d'environnement suivantes au conteneur `processagent`. Sinon, ajoutez-les au conteneur `agent`.

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

3. Montez les volumes supplémentaires suivants dans votre conteneur `datadog-agent` :
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

4. Ajoutez un nouveau conteneur `systemprobe` en tant que sidecar de l ' Agent :

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

5. Ajoutez ensuite les volumes suivants à votre manifeste :
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

    **Remarque** : Si votre cluster fonctionne sous Google ContainerOptimized OS (COS), supprimez le montage `src` en supprimant les éléments suivants de la définition de votre conteneur :
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    Et en supprimant ce qui suit de votre manifeste:
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. Si vous souhaitez prendre en charge le protocole HTTPS (facultatif), ajoutez ce qui suit au conteneur `systemprobe` :

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   Ajoutez ensuite les volumes suivants à votre manifeste :
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Ajoutez ce qui suit à votre commande `docker run` :

```coquille
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
{{% tab "Docker-compose" %}}

Ajoutez ce qui suit à votre fichier `dockercompose.yml` :

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

SI vous souhaitez prendre en charge le protocole HTTPS (facultatif), ajoutez également ce qui suit :

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

Comme `Docker Swarm` ne supporte pas encore le changement de `security_opt`, le système d'exploitation
doit pas avoir d'instance `apparmor` en cours d'exécution.

Si le système d'exploitation n'a pas d'instance `apparmor` en cours d'exécution, utilisez le même fichier `dockercompose.yml` de la [section] `DockerCompose`[1] à côté du champ `security_opt`.

[1] : /universal_service_monitoring/setup/?tab=dockercompose#enablinguniversalservicemonitoring

{{% /tab %}}
{{% tab "Fichiers de configuration (Linux)" %}}

Si vous n'utilisez pas de chart Helm ni de variables d'environnement, définissez ce qui suit dans votre fichier `systemprobe.yaml` :

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Variables d'environnement (Linux)" %}}

Si vous configurez le `systemprobe` avec des variables d'environnement, ce qui est généralement le cas avec les installations Docker et ECS, passez la variable d'environnement suivante à `processagent` **et** à `systemprobe` :

```yaml
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Chef" %}}

Définissez les attributs suivants sur vos nœuds :

```rb
node["datadog"]["system_probe"]["service_monitoring_enabled"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Définir `service_monitoring_enabled`:

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Ajoutez les attributs suivants dans votre playbook :

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

Pour ECS, activez USM et la sonde système avec la définition de tâche JSON suivante. Déployez la définition de tâche en tant que [service démoniaque][1].

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

SI vous souhaitez prendre en charge le protocole HTTPS (facultatif), ajoutez également ce qui suit :

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

Si vous utilisez des répartiteurs de charge avec vos services, activez des intégrations cloud supplémentaires pour permettre à Universal Service Monitoring de découvrir les entités gérées dans le cloud :

1. Installez le [AWS Integration][2] pour plus de visibilité dans AWS Load Balancer.
2. Activer la collecte de mesures ENI et EC2.
3. Ajouter les étiquettes suivantes à chaque répartiteur de charge:
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /fr/containers/amazon_ecs/?tab=awscli#runtheagentasadaemonservice
[2]: /fr/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**Pour les services fonctionnant sous IIS:**

1. Installez le [Datadog Agent][1] (version 6.41 ou 7.41 et versions ultérieures) avec le composant pilote de périphérique du noyau réseau activé.
   Lors de l'installation, transmettez `ADDLOCAL="MainApplication,NPM"` à la commande `msiexec`, ou sélectionnez **Cloud Network Monitoring** pour une installation de l'Agent via l'interface graphique.

2. Modifiez `C:\ProgramData\Datadog\systemprobe.yaml` en définissant le flag enabled sur `true` :

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
**Pour les services hors IIS:**

La découverte des services non IIS est activée par défaut à partir de la version 7.57 de l'Agent. Les versions précédentes de l'Agent peuvent nécessiter la modification de configuration suivante pour `systemprobe.yaml` :

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

<div class="alert alert-warning">
<strong>Important limitation for non-IIS Windows services:</strong> Universal Service Monitoring on Windows uses Event Tracing for Windows (ETW) through the <code>Microsoft-Windows-HttpService</code> provider for HTTPS traffic monitoring. This ETW provider is only available for IIS-based services. Non-IIS services (such as custom .NET applications, Node.js servers, Java servers, or other HTTP servers running on Windows) <strong>do not support HTTPS monitoring</strong> through USM. Only plain HTTP traffic can be monitored for non-IIS Windows services.
</div>

### Soutien des services IIS et non IIS

| Type de service | Surveillance du trafic HTTP | Surveillance du trafic HTTPS |
|   |  |  |
| Services IIS | Pris en charge | Pris en charge |
| Services non IIS | Pris en charge | **Non pris en charge** |

   
[1]: /fr/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## Configuration supplémentaire

Les systèmes ou services suivants nécessitent une configuration supplémentaire:

{{< collapse-content title="Services non conteneurisés sous Linux" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring is available to monitor services running bare-metal on Linux virtual machines.
</div>

Agent Datadog version 7.42 ou supérieure

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `systemprobe.yaml`:

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

{{< collapse-content title="Go TLS Monitoring" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring is in Preview to monitor TLS encrypted traffic from services implemented in Golang.
</div>

<strong>Note</strong>:
<br>
<ul role="list">
  <li>Go HTTPS servers can upgrade HTTP1.1 protocol to HTTP/2 which is supported in Preview. Reach out to your account manager for details.</li>
  <li>Requires Agent version 7.51 or greater.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `systemprobe.yaml`:

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

{{< collapse-content title="Node.js TLS Monitoring" level="h4" >}}

<div class="alert alert-info">
Universal Service Monitoring is in Preview to monitor HTTP, HTTP/2, and gRPC requests from services implemented in Node.js.
</div>

Requiert Agent version 7.54 ou supérieure.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `systemprobe.yaml`:

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

{{< collapse-content title="Istio Monitoring" level="h4" >}}

Universal Service Monitoring est disponible pour surveiller les services derrière <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> et pour capturer le trafic HTTP, HTTP/2 et gRPC chiffré.

Requiert Agent version 7.50 ou supérieure.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `systemprobe.yaml`:

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

{{< collapse-content title="Surveillance HTTP/2" level="h4" >}}
Universal Service Monitoring peut capturer le trafic HTTP/2 et gRPC.

<strong>Note</strong>:
<br>
<ul role="list">
  <li>Requires Linux Kernel version 5.2 or later.</li>
  <li>Requires Agent version 7.53 or greater.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `systemprobe.yaml`:

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

{{< collapse-content title="Kafka Monitoring (Aperçu)" level="h4" >}}

<div class="alert alert-info">
Kafka Monitoring is available in <strong>Preview</strong>.
</div>

<strong>Note</strong>:
<br>
<ul role="list">
  <li>Producers and consumers require Linux Kernel version 5.2 or later.</li>
  <li>Producers and consumers must be interfacing with Kafka <strong>without</strong> TLS.</li>
  <li>Requires Agent version 7.53 or greater.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au fichier `systemprobe.yaml`:

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


## Exclusion et remplacement des chemins

Utilisez `http_replace_rules` ou `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` pour configurer l'Agent afin de supprimer les points de terminaison HTTP correspondant à une regex, ou pour convertir les points de terminaison correspondants dans un format différent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `systemprobe`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

Par exemple, la configuration suivante supprime les points de terminaison qui commencent par `/api/`, tels que `/api/v1/users`. Cependant, il ne laisse pas tomber `/api` ou `/users/api`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

La configuration suivante remplace un point final `/api/users` pour correspondre à un nouveau format de `/api/v1/users`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}
Ajouter la rubrique suivante:

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Helm" %}}

L'exemple suivant supprime le point final `/myapi` et remplace `/myapi2` par `/newversion`.

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


<div class="alert alert-info"><strong>Support for additional protocols and encryption methods</strong><p>USM is in Preview for discovering cloud services and decoding additional protocols and traffic encryption methods. For more information and to request access to the Preview, read <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/