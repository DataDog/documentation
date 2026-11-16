---
disable_toc: false
title: Détection des menaces pour Linux sans prise en charge d'eBPF
---
Ce guide décrit comment configurer la solution sans eBPF de Workload Protection pour les environnements où eBPF est désactivé, comme AWS Fargate. La solution sans eBPF utilise un Datadog Agent basé sur ptrace.

Ce guide décrit également certains avantages de la solution ptrace.

## Résumé des options de l'Agent {#summary-of-agent-options}

Workload Protection inclut deux options d'Agent pour la détection et la réponse aux menaces :

- Solution eBPF
- Solution sans eBPF avec ptrace : cette version n'est disponible que là où eBPF ne l'est pas (versions du noyau Linux 3.4 à 4.14).

{{% collapse-content title="Solution eBPF" level="h3" %}}

Datadog a conçu tous ses produits de sécurité autour d'[eBPF (extended Berkeley Packet Filter)][1]. Voici quelques-uns des avantages d'eBPF :

- eBPF améliore la sécurité en validant chaque programme via le vérificateur du noyau Linux. Cela garantit qu'un programme ne peut pas planter, tomber dans des boucles infinies ou endommager le système.
- eBPF est compilé JIT (Just In Time) et le bytecode résultant est exécuté dans un bac à sable de VM eBPF. Cela empêche tout plantage du noyau et offre des performances compétitives.
- Facile à déboguer et à maintenir, peut charger dynamiquement des programmes et a accès à toutes les informations nécessaires pour tracer l'espace utilisateur.

Le code de l'Agent eBPF de Datadog est [entièrement open source][2].

{{% /collapse-content %}}

{{% collapse-content title="Solution sans eBPF avec ptrace" level="h3" %}}
Certains environnements utilisent des instances avec d'anciens noyaux qui ne disposent pas du tout d'eBPF. La solution ptrace est fournie pour ces environnements.

Les fonctionnalités suivantes ne sont pas disponibles dans l'Agent sans eBPF :

- Profils de sécurité, fournissant :
  - Détection d'anomalies
  - Auto-suppression du comportement normal pour le tri des signaux
  - Détection de logiciels malveillants
- Détections réseau

<div class="alert alert-info">L'implémentation actuelle prend en charge les architectures amd64 et arm64 ainsi que leurs ABI, mais peut être étendue aux ABI 32 bits.</div>

### Avantages de la solution ptrace {#advantages-of-ptrace-solution}

Une solution basée sur ptrace permet d'atteindre un équilibre entre une détection robuste des menaces et une disponibilité de service inébranlable. Certains des avantages de la solution basée sur ptrace sont :

- Contrôle précis des processus : ptrace permet une inspection détaillée de la mémoire et des registres, protégeant ainsi les charges de travail critiques des applications. Cette visibilité granulaire est essentielle pour identifier les menaces sophistiquées. Le scanner procfs (système de fichiers de processus) de Datadog surveille toutes les exécutions à l'échelle du système, permettant l'arrêt chirurgical des processus malveillants. Ensemble, ces outils protègent contre les activités malveillantes.
- Stabilité opérationnelle : Fonctionnant dans l'espace utilisateur, ptrace évite les complexités et les risques de l'espace noyau, offrant une approche plus sûre et plus facile à gérer. En cas de défaillance, un Agent basé sur ptrace adopte par défaut un état « fail-open » au niveau du système d'exploitation, laissant le système intact, même si l'application se bloque.
- Efficacité des performances : Des benchmarks récents menés par l'équipe d'ingénierie de Datadog démontrent que l'implémentation basée sur ptrace de Datadog affiche des performances comparables à celles des solutions basées sur le noyau. Plus précisément, elle n'introduit qu'une surcharge minimale d'environ 3 % pour les charges de travail PostgreSQL et des impacts négligeables pour les opérations Redis, ce qui la rend très efficace pour la plupart des cas d'utilisation.
- Vérification open source : Datadog a rendu open source l'Agent basé sur ptrace et eBPF, permettant aux clients et à la communauté de sécurité de vérifier eux-mêmes sa sécurité et son efficacité, favorisant ainsi la transparence et la confiance dans la solution.
{{% /collapse-content %}}


## Configuration de l'Agent sans eBPF {#ebpf-less-agent-setup}

Vous pouvez configurer l'Agent sans eBPF sur diverses plateformes, notamment Docker et les hosts Linux.

Cette section couvre Docker et les hosts Linux. Pour connaître les étapes de configuration d'un environnement Amazon Fargate où eBPF est désactivé, consultez le [Guide de configuration AWS Fargate pour Datadog Security][3].

### Exigences de l'Agent sans eBPF {#ebpf-less-agent-requirements}

- L'Agent sans eBPF est conçu pour les environnements où eBPF est désactivé, utilisant ptrace pour la sécurité à l'exécution, et prend en charge les architectures arm64/amd64.
- Des commandes d'installation et des configurations personnalisées sont requises pour déployer l'Agent sans eBPF. Des instructions spécifiques sont fournies dans cette section pour les installations sur Docker et les hosts Linux.

La solution sans eBPF inclut deux modes de traçage pour les applications :

- Mode Wrap : trace les applications dès le démarrage.
- Mode Attach : s'attache aux applications déjà en cours d'exécution, mais entraîne une surcharge de performance et des limitations plus importantes.

### Étapes de configuration de l'Agent sans eBPF {#ebpf-less-setup-steps}

{{< tabs >}}
{{% tab "Docker" %}}
Une variable d'environnement supplémentaire est requise sur Docker. Ajoutez la ligne suivante à votre commande d'installation Docker :

```shell
-e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true
```

La commande correspondante doit être :

```shell
docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}

{{% tab "Host Linux" %}}
Pour installer l'Agent sur un host Linux, utilisez le script d'installation suivant pour installer la build personnalisée :

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Ensuite, modifiez le fichier `/etc/datadog-agent/system-probe.yaml` pour activer CWS et le mode sans eBPF comme suit :

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}

Alternativement, pour installer manuellement les paquets de build personnalisés fournis `.deb/.rmp`, modifiez le fichier `/etc/datadog-agent/system-probe.yaml` pour activer CWS et le mode sans eBPF comme suit :

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## Déployer l'Agent sans eBPF {#deploy-ebpf-less-agent}

Assurez-vous de respecter les exigences de configuration suivantes avant de déployer l'Agent :

1. Personnalisez les [Instructions d'installation de l'Agent][5] avant de procéder à l'installation.
2. Installez/mettez à jour l'Agent avec Cloud Security activé. Pour connaître les étapes, consultez [Configuration de Cloud Security sur l'Agent][4].
3. Spécifiez des configurations supplémentaires à partir des sections précédentes **de la configuration de l'Agent sans eBPF** pour installer la version personnalisée et activer le mode sans eBPF.


## Vérifiez la configuration {#verify-setup}

Pour valider l'installation et la configuration de votre Agent, connectez-vous à votre host Linux ou à votre conteneur Docker et exécutez :

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

Vous devriez voir la sortie suivante :

```
  ebpfless:
    enabled: true
```

## Configurer le traçage d'application avec l'Agent sans eBPF {#set-up-application-tracing-with-ebpf-less-agent}

Une fois l'Agent sans eBPF installé et configuré pour utiliser le mode sans eBPF, vous pouvez configurer la manière dont votre application est tracée. Cette section vous propose deux méthodes différentes :

- **Mode Wrap :** (Recommandé) Dans ce mode, votre application est lancée par le wrapper Datadog qui la trace dès le début en utilisant ptrace.
  - Tous les processus enfants générés sont également tracés.
  - Un profil seccomp est appliqué pour réduire considérablement la surcharge liée à ptrace.
- **Mode Attach :** Dans ce mode, vous pouvez spécifier une liste de PID pour vous attacher aux processus de votre application. Cela doit être fait rapidement car votre application n'est pas tracée par ptrace tant que cette opération n'est pas effectuée.
  - Dans ce mode, un profil seccomp ne peut pas être appliqué. Par conséquent, il existe une légère surcharge liée à ptrace.

Les deux modes utilisent le binaire **cws-instrumentation** fourni avec le Datadog Agent et situé à `/opt/datadog-agent/embedded/bin/cws-instrumentation`.

<div class="alert alert-info">
Ce traceur communique avec system-probe (qui fait partie du Datadog Agent) sur localhost via le port 5678. L'adresse de system-probe peut être configurée avec l'option cws-instrumentation. <code>--probe-addr=host:port</code> option cws-instrumentation. L'adresse côté serveur peut être mise à jour via l'option runtime_security_config.ebpfless.socket du fichier de configuration de l'Agent. <code>/etc/datadog-agent/system-probe.yaml</code> fichier de configuration de l'Agent.
</div>

{{< tabs >}}
{{% tab "Mode Wrap" %}}
En mode Wrap, le wrapper Datadog lance l'application. Voici un exemple :

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

Si votre application s'exécute en tant qu'utilisateur non root, spécifiez l'uid/gid sous forme de valeurs numériques :

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">Une application ne démarrera pas tant que cws-instrumentation n'aura pas initialisé sa connexion avec le Datadog Agent.</div>

Les exemples suivants montrent comment le traceur peut être intégré aux applications pour différents types de déploiement.

<div class="alert alert-info">Sur les anciens noyaux 3.4, le profil seccomp n'est pas disponible et doit être désactivé avec l'option cws-instrumentation. <code>–disable-seccomp</code> option cws-instrumentation.</div>

#### Service systemd Linux {#linux-systemd-service}

Si vous disposez déjà d'un script init, voici un exemple simple des modifications requises :

```shell
   [Unit]
   Description=My application
   After=datadog-agent-sysprobe.service

   [Service]
   ExecStart=/opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
```

#### Service sysvinit Linux {#linux-sysvinit-service}

Si vous disposez déjà d'un script init, voici un exemple simple des modifications requises :

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  My application
# Description: My application
### END INIT INFO

# Start the service
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /usr/bin/myapp
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker {#docker}

Pour les déploiements d'applications Docker, vous devez modifier votre Dockerfile pour encapsuler votre application comme suit :

```shell
FROM registry.datadoghq.com/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Lors de l'exécution de votre application docker, il est important de lui accorder une capacité supplémentaire en ajoutant `--cap-add=SYS_PTRACE` à votre commande `docker run`.

Vous devez également connecter le conteneur à Datadog sur le port 5678 en effectuant l'une des opérations suivantes :

- Lancez les deux conteneurs avec l'option de host `--network`.
- Utilisez la fonctionnalité [Docker network][6] pour exécuter les deux conteneurs sur le même bridge network.

{{% /tab %}}

{{% tab "Mode attach" %}}
Le mode wrap est recommandé car le mode attach présente les limitations suivantes :

- Il manque toutes les initialisations effectuées par l'application jusqu'à ce que Datadog s'y attache.
- - Lors de l'attachement, Datadog ne peut pas configurer de profil seccomp.
- Une surcharge de performance supplémentaire.
- Si l'application tracée redémarre, Datadog doit s'assurer que le traceur redémarre également.

Le mode attach diffère du mode wrap en attachant directement le traceur sur une application déjà en cours d'exécution, comme ceci :

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

Plusieurs PID peuvent être attachés à la fois :

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

Les exemples suivants montrent comment le traceur peut être intégré aux applications pour différents types de déploiement.

#### Service systemd Linux {#linux-systemd-service-1}

Si vous disposez déjà d'un script init, voici un exemple de la façon d'intégrer le wrapper en utilisant un nouveau service systemd :

```shell
[Unit]
Description=Datadog CWS instrumentation attach to my application
After=datadog-agent-sysprobe.service my-app.service

[Service]
ExecStart=/bin/bash -c "/opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done)"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Service sysvinit Linux {#linux-sysvinit-service-1}

Si vous disposez déjà d'un script init, voici un exemple de la façon d'intégrer le traceur en utilisant un nouveau service sysvinit :

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           dd_tracing_my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  Datadog tracing of my application
# Description: Datadog tracing of my application
### END INIT INFO

# Start the service
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker {#docker-1}

Pour attacher le wrapper à une image Docker exécutant une application, utilisez le Dockerfile suivant :

```shell
FROM registry.datadoghq.com/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

Ensuite, fournissez le PID du host pour la connexion à Docker en tant que variable d'environnement.

Pour vous attacher à une application, vous aurez besoin des éléments suivants :

- Lors de l'exécution de l'application Docker, ajoutez la capacité requise en incluant `--cap-add=SYS_PTRACE` à votre commande `docker run`.
- Assurez-vous que le conteneur de l'application peut atteindre le conteneur Datadog sur le port 5678 en utilisant l'une des méthodes suivantes :
  - Lancez les deux conteneurs avec l'option de host `--network`.
  - Utilisez la fonctionnalité [Docker network][6] pour exécuter les deux conteneurs sur le même bridge network.
- Pour vous assurer que le conteneur de l'application s'exécute sur le PID du host (tout comme le fait le Datadog Agent), ajoutez ces options : `--cgroupns host --pid host`.
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /fr/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /fr/security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/