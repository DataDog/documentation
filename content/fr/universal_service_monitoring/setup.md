---
description: Configurez la surveillance des services universels avec l'agent Datadog
  sur différentes plateformes, y compris Kubernetes, Docker, ECS et les environnements
  Windows.
further_reading:
- link: /universal_service_monitoring/
  tag: Documentation
  text: Découvrez la surveillance des services universels
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Signaux d'or en quelques secondes avec la surveillance des services universels
title: Configuration de la surveillance des services universels
---
## Versions prises en charge et compatibilité

Version de l'agent requise
: La surveillance des services universels nécessite que l'agent Datadog installé avec votre service conteneurisé soit au moins en version 6.40 ou 7.40. Comme indiqué ci-dessous, certaines fonctionnalités en aperçu nécessitent des versions supérieures.

Plateformes Linux prises en charge
: Noyau Linux 4.14 et supérieur<br/>
CentOS ou RHEL 8.0 et supérieur

Plateformes Windows prises en charge
: Windows 2012 R2 et supérieur

Protocoles de couche application pris en charge
: HTTP<br/>
HTTPS (OpenSSL)

Limitations connues
: La surveillance des services universels nécessite l'utilisation de `system-probe`Datadog's, qui n'est pas pris en charge sur Google Kubernetes Engine (GKE) Autopilot.

<div class="alert alert-info">
Des protocoles supplémentaires et des méthodes de cryptage du trafic sont en <a href="/universal_service_monitoring/additional_protocols/">aperçu</a>. Si vous avez des commentaires sur les plateformes et protocoles que vous aimeriez voir pris en charge, <a href="/help/">contactez le support</a>.
</div>

## Prérequis

- Si vous êtes sur Linux :
    - Votre service fonctionne dans un conteneur.
    - **En aperçu :** Pour les services non conteneurisés, consultez les [instructions ici](#additional-configuration).
- Si vous êtes sur Windows :
    - Votre service fonctionne sur une machine virtuelle.
- L'Agent Datadog est installé aux côtés de votre service. L'installation d'une bibliothèque de traçage n'est _pas_ requise.
- Le `env` tag pour [Tagging de Service Unifié][1] a été appliqué à votre déploiement. Les `service` et `version` tags sont optionnels.

## Comment USM détecte les noms de service

<div class="alert alert-warning">
La Surveillance de Service Universelle détecte les noms de service à partir des variables d'environnement qui existent lorsque un processus démarre. USM lit ces valeurs à partir du système d'exploitation : depuis <code>/proc/PID/environ</code> sur Linux, ou via des API système sur Windows.
</div>

USM reconnaît les variables d'environnement suivantes :
- `DD_SERVICE` : Définit explicitement le nom du service
- `DD_ENV` : Définit le tag d'environnement
- `DD_VERSION` : Définit le tag de version
- `DD_TAGS` : Tags supplémentaires ; peut inclure le `service:name` tag

### Limitation clé : USM et les variables d'environnement définies par programme pour APM

Si vous définissez des variables d'environnement par programme **dans votre code d'application** (comme `System.setProperty("dd.service", "my-service")` en Java, ou `Environment.SetEnvironmentVariable("DD_SERVICE", "my-service")` en .NET), ces variables d'environnement ne sont **pas** détectées par USM, même si ces valeurs fonctionnent pour l'instrumentation de traçage APM.

Cela se produit parce qu'USM s'exécute dans l'Agent Datadog en tant que processus séparé et ne voit que les variables d'environnement qui ont été définies lorsque votre processus a démarré. Inversement, les bibliothèques d'instrumentation APM s'exécutent à l'intérieur de votre processus d'application et peuvent lire les changements d'environnement d'exécution.

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
{{% tab "Shell" %}}
```bash
export DD_SERVICE=my-service
export DD_ENV=production
java -jar myapp.jar
```
{{% /tab %}}
{{< /tabs >}}

## Activation de la surveillance des services universels

Activez la surveillance des services universels dans votre Agent en utilisant l'une des méthodes suivantes en fonction de la manière dont votre service est déployé et de la configuration de votre Agent :

{{< tabs >}}
{{% tab "Helm" %}}

En utilisant la version du graphique Datadog >= 2.26.2, ajoutez ce qui suit à votre fichier de valeurs :

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

Si votre cluster exécute Google Container-Optimized OS (COS), ajoutez également ce qui suit à votre fichier de valeurs :

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

Datadog Operator v1.0.0 ou supérieur est requis.

Pour activer la surveillance des services universels avec le [Datadog Operator][1], mettez à jour votre `datadog-agent.yaml` manifeste. Dans la ressource `DatadogAgent`, définissez `spec.features.usm.enabled` sur `true` :

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

1. Ajoutez l'annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` sur le modèle `datadog-agent` :

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
2. Activez la surveillance des services universels avec les variables d'environnement suivantes dans le daemonset de l'Agent. Si vous exécutez un conteneur par processus d'Agent, ajoutez les variables d'environnement suivantes au conteneur `process-agent`. Sinon, ajoutez-les au conteneur `agent`.

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

3. Montez les volumes supplémentaires suivants dans le conteneur `datadog-agent` :
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

4. Ajoutez un nouveau conteneur `system-probe` en tant que sidecar à l'Agent :

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

6. Pour un support HTTPS optionnel, ajoutez ce qui suit au conteneur `system-probe` :

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

Ajoutez ce qui suit à votre commande `docker run` :

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

Ajoutez ce qui suit à votre fichier `docker-compose.yml` :

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

Pour un support HTTPS optionnel, ajoutez également :

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

Comme `Docker Swarm` ne prend pas encore en charge le changement de `security_opt`, le système d'exploitation
ne doit pas avoir d'instance `apparmor` en cours d'exécution.

Si le système d'exploitation n'a pas d'instance `apparmor` en cours d'exécution, utilisez le même fichier `docker-compose.yml` de la section `Docker-Compose` [section][1] à côté du champ `security_opt`.

[1]: /fr/universal_service_monitoring/setup/?tab=dockercompose#enabling-universal-service-monitoring

{{% /tab %}}
{{% tab "Fichiers de configuration (Linux)" %}}

Si vous n'utilisez pas de Helm Charts ou de variables d'environnement, définissez ce qui suit dans votre fichier `system-probe.yaml` :

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Variables d'environnement (Linux)" %}}

Si vous configurez le `system-probe` avec des variables d'environnement, comme c'est courant avec les installations Docker et ECS, passez la variable d'environnement suivante à **les** `process-agent` et `system-probe` :

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
{{% tab "Puppet" %}}

Ensemble `service_monitoring_enabled` :

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

Pour ECS, activez USM et le probe système avec la définition de tâche JSON suivante. Déployez la définition de tâche en tant que [service daemon][1].

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

Si l'image du système d'exploitation est Ubuntu ou Debian, ajoutez ce qui suit après `environment` :

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

Pour un support HTTPS optionnel, ajoutez également :

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

Si vous utilisez des équilibreurs de charge avec vos services, activez des intégrations cloud supplémentaires pour permettre à la surveillance de service universelle de découvrir des entités gérées par le cloud :

1. Installez l'[Intégration AWS][2] pour la visibilité dans l'équilibreur de charge AWS.
2. Activez la collecte de métriques ENI et EC2.
3. Ajoutez les balises suivantes à chaque équilibreur de charge :
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /fr/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /fr/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**Pour les services exécutés sur IIS :**

1. Installez l'[Agent Datadog][1] (version 6.41 ou 7.41 et ultérieures) avec le composant pilote de périphérique du noyau réseau activé.
   Pour la version de l'Agent 7.44 ou antérieure, vous devez passer `ADDLOCAL="MainApplication,NPM"` à la commande `msiexec` lors de l'installation, ou sélectionner **Surveillance du réseau cloud** lors de l'exécution de l'installation de l'Agent via l'interface graphique.

2. Modifiez `C:\ProgramData\Datadog\system-probe.yaml` pour définir le drapeau activé sur `true` :

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
**Pour les services non-IIS :**

La découverte des services non-IIS est activée par défaut à partir de la version 7.57 de l'Agent. Les versions précédentes de l'Agent peuvent nécessiter le changement de configuration suivant pour `system-probe.yaml` :

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

<div class="alert alert-warning">
<strong>Limitation importante pour les services Windows non-IIS :</strong> La surveillance de service universelle sur Windows utilise le traçage d'événements pour Windows (ETW) via le fournisseur <code>Microsoft-Windows-HttpService</code> pour la surveillance du trafic HTTPS. Ce fournisseur ETW n'est disponible que pour les services basés sur IIS. Les services non-IIS (tels que les applications .NET personnalisées, les serveurs Node.js, les serveurs Java ou d'autres serveurs HTTP fonctionnant sous Windows) <strong> ne prennent pas en charge la surveillance HTTPS </strong> via USM. Seul le trafic HTTP simple peut être surveillé pour les services Windows non-IIS.
</div>

### Prise en charge des services IIS et non-IIS

| Type de service     | Surveillance du trafic HTTP | Surveillance du trafic HTTPS |
| ---  | ----------- | ----------- |
| Services IIS     | Pris en charge | Pris en charge               |
| Services non-IIS | Pris en charge | **Non pris en charge** |

   
[1]: /fr/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## Configuration supplémentaire

Les systèmes ou services suivants nécessitent une configuration supplémentaire :

{{< collapse-content title="Services non conteneurisés sur Linux" level="h4" >}}
<div class="alert alert-info">
La surveillance des services universels est disponible pour surveiller les services fonctionnant sur des machines virtuelles Linux bare-metal.
</div>

Nécessite la version 7.42 ou supérieure de l'agent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe.yaml` :

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

{{< collapse-content title="Surveillance TLS Go" level="h4" >}}
<div class="alert alert-info">
La surveillance des services universels est en aperçu pour surveiller le trafic chiffré TLS des services implémentés en Golang.
</div>

<strong>Remarque</strong> :
<br>
<ul role="list">
  <li>Les serveurs HTTPS Go peuvent mettre à niveau le protocole HTTP1.1 vers HTTP/2, qui est pris en charge en aperçu. Contactez votre responsable de compte pour plus de détails.</li>
  <li>Nécessite la version 7.51 ou supérieure de l'agent.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe.yaml` :

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

{{< collapse-content title="Surveillance TLS de Node.js" level="h4" >}}

<div class="alert alert-info">
La surveillance des services universels est en aperçu pour surveiller les requêtes HTTP, HTTP/2 et gRPC des services implémentés en Node.js.
</div>

Nécessite la version 7.54 ou supérieure de l'Agent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe.yaml` :

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

{{< collapse-content title="Surveillance d'Istio" level="h4" >}}

La surveillance des services universels est disponible pour surveiller les services derrière <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> et pour capturer le trafic HTTPs, HTTP/2 et gRPC chiffré.

Nécessite la version 7.50 ou supérieure de l'Agent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe.yaml` :

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
La surveillance des services universels peut capturer le trafic HTTP/2 et gRPC.

<strong>Remarque</strong> :
<br>
<ul role="list">
  <li>Nécessite la version 5.2 ou ultérieure du noyau Linux.</li>
  <li>Nécessite la version 7.53 ou supérieure de l'Agent.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe.yaml` :

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

{{< collapse-content title="Surveillance de Kafka (Aperçu)" level="h4" >}}

<div class="alert alert-info">
La surveillance de Kafka est disponible en <strong>Aperçu</strong>.
</div>

<strong>Remarque</strong> :
<br>
<ul role="list">
  <li>Les producteurs et les consommateurs nécessitent la version 5.2 ou ultérieure du noyau Linux.</li>
  <li>Les producteurs et les consommateurs doivent interagir avec Kafka <strong>sans</strong> TLS.</li>
  <li>Nécessite la version 7.53 ou supérieure de l'Agent.</li>
</ul>

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe.yaml` :

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


## Exclusion et remplacement de chemin

Utilisez `http_replace_rules` ou `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` pour configurer l'Agent afin de supprimer les points de terminaison HTTP qui correspondent à une expression régulière, ou pour convertir les points de terminaison correspondants dans un format différent.

{{< tabs >}}
{{% tab "Fichier de configuration" %}}

Ajoutez la configuration suivante au `system-probe` :

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

Par exemple, la configuration suivante supprime les points de terminaison qui commencent par `/api/`, tels que `/api/v1/users`. Cependant, cela ne supprime pas `/api` ou `/users/api` :

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

La configuration suivante remplace un point de terminaison `/api/users` pour correspondre à un nouveau format de `/api/v1/users` :

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
{{% tab "Helm" %}}

L'exemple suivant supprime le point de terminaison `/my-api` et remplace `/my-api-2` par `/new-version`.

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


<div class="alert alert-info"><strong>Support pour des protocoles supplémentaires et des méthodes de cryptage</strong><p>USM est en aperçu pour découvrir des services cloud et décoder des protocoles supplémentaires et des méthodes de cryptage de trafic. Pour plus d'informations et pour demander l'accès à l'aperçu, lisez <a href="/universal_service_monitoring/additional_protocols/">Découverte de services cloud et protocoles supplémentaires</a>.</p></div>


## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging