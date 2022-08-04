---
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Récupérez en quelques secondes des signaux clés avec Universal Service Monitoring
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Tagging de service unifié
- link: /tracing/visualization/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /tracing/visualization/service/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/visualization/services_map/
  tag: Documentation
  text: En savoir plus sur la Service Map
kind: documentation
title: Universal Service Monitoring
---

{{< beta-callout url="http://d-sh.io/universal" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  La solution Universal Service Monitoring (USM) est disponible en bêta privée. Son activation et son utilisation n'entraînent actuellement aucun coût supplémentaire. Veuillez nous contacter si vous souhaitez en bénéficier.
{{< /beta-callout >}}

La solution Universal Service Monitoring (USM) vous permet de bénéficier d'une visibilité universelle sur les métriques de santé de vos services dans toute votre pile, _sans avoir à instrumenter votre code_. Elle repose exclusivement sur la présence d'un Agent Datadog configuré et sur le [tagging de service unifié][1]. USM fournit des données de performance sur vos services non instrumentés et les incorpore dans des vues APM, telles que la liste des services, les détails sur les services et la Service Map. USM s'intègre également au [suivi des déploiements][2], aux monitors, aux dashboards et aux SLO.

{{< img src="tracing/universal_service_monitoring/service_overview.mp4" alt="Vidéo présentant Universal Service Monitoring. La vue d'ensemble d'un service peut être consultée en cliquant sur un service dans la Service Map et en sélectionnant l'option View service overview." video="true" >}}

### Versions prises en charge et compatibilité

Version de l'Agent requise
: Universal Service Monitoring nécessite d'installer au minimum la version 7.37 de l'Agent Datadog sur votre service.<br />
: **Remarque :** la version bêta d'USM est disponible depuis la version 7.32 de l'Agent, mais Datadog vous recommande fortement d'exécuter une version plus récente afin de bénéficier des dernières améliorations.

Plateformes prises en charge
: Noyau Linux 4.4 et versions ultérieures<br/>
CentOS ou RHEL 8.0 et versions ultérieures<br/>

Protocoles de couche d'application pris en charge
: HTTP<br/>
HTTPS (OpenSSL)

<div class="alert alert-info">
USM ne prend pas encore en charge votre plateforme ou protocole préféré ? N'hésitez pas à <a href="/help/">contacter l'assistance</a> pour nous en informer.
</div>

### Prérequis

- L'Agent Datadog 7.37 ou ultérieur est installé sur votre service. Il n'est _pas_ nécessaire d'installer une bibliothèque de tracing.
- Les tags `env` et `service` du [tagging de service unifié][1] ont été appliqués à votre déploiement. Le tag `version` n'est pas requis.

**Remarque** : pour les configurations avec un seul locataire et sans conteneur pour lesquelles un service s'exécute sur un host, vous devez appliquer les tags de service unifié au host. USM ne prend pas en charge la surveillance de plusieurs services sur un seul host sans conteneur, ni sur un seul host auquel les tags de service unifié ont été appliqués via des variables d'environnement.

## Activer Universal Service Monitoring

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

{{% /tab %}}
{{% tab "Kubernetes sans Helm" %}}

1. Ajoutez l'annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` au modèle `datadog-agent` :

   ```
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
2. Activez Universal Service Monitoring avec les variables d'environnement suivantes dans le daemonset de l'Agent. Si vous exécutez un conteneur par processus d'Agent, ajoutez les variables d'environnement suivantes au conteneur `process-agent`. Si ce n'est pas le cas, ajoutez-les au conteneur `agent`.

   ```
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

3. Montez les volumes supplémentaires suivants dans votre conteneur `datadog-agent` :
   ```
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Ajoutez un nouveau conteneur `system-probe` en tant que sidecar de l'Agent :

   ```
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
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
   ```
   Ajoutez ensuite les volumes suivants à votre manifeste :
   ```
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
   ```
5. Si vous souhaitez prendre en charge le protocole HTTPS (facultatif), ajoutez ce qui suit au conteneur `system-probe` :

   ```
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   Ajoutez ensuite les volumes suivants à votre manifeste :
   ```
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Ajoutez ce qui suit à votre commande `docker run` :

```
-v /sys/kernel/debug:/sys/kernel/debug \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN
```

SI vous souhaitez prendre en charge le protocole HTTPS (facultatif), ajoutez également ce qui suit :
```
-e HOST_ROOT=/host/root \
-v /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Ajoutez ce qui suit à votre fichier `docker-compose.yml` :

```
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED: 'true'
    volumes:
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

SI vous souhaitez prendre en charge le protocole HTTPS (facultatif), ajoutez également ce qui suit :

```
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
{{% tab "Fichiers de configuration" %}}

Si vous n'utilisez pas de chart Helm ni de variables d'environnement, définissez ce qui suit dans votre fichier `system-probe.yaml` :

```
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Variables d'environnement" %}}

Si vous configurez le `system-probe` avec des variables d'environnement, ce qui est généralement le cas avec les installations Docker et ECS, passez la variable d'environnement suivante à `process-agent` **et** à `system-probe` :

```
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{< /tabs >}}

## Explorer vos services

Une fois l'Agent configuré, patientez environ cinq minutes le temps que votre service s'affiche dans la liste des services APM. Cliquez sur votre service pour afficher la page des détails du service APM. L'opération `universal.http.server` ou `universal.http.client` en haut à gauche indique que la télémétrie du service est fournie par Universal Service Monitoring.

L'opération `universal.http.server` enregistre des métriques de santé pour le trafic reçu par votre service. À l'inverse, l'opération `universal.http.client` représente le trafic sortant vers d'autres destinations.

{{< img src="tracing/universal_service_monitoring/select_service_operation.png" alt="Le menu déroulant des opérations dans l'onglet Services indiquant les noms des opérations disponibles" style="width:100%;" >}}

Une fois la solution Universal Service Monitoring activée, vous pouvez :


- accéder à **APM > Service Map** pour [visualiser vos services et leurs dépendances][3] depuis une interface unique ;

- cliquer sur des pages de services spécifiques pour visualiser les métriques des signaux clés (requêtes, erreurs et durée) et les mettre en corrélation avec des changements de code récents grâce au [suivi des déploiements][4] ;

- créer des [monitors][5], [dashboards][6] et [SLOs][7] à partir des métriques `trace.universal.http.*`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: https://docs.datadoghq.com/fr/tracing/deployment_tracking/
[3]: /fr/tracing/visualization/services_map/
[4]: /fr/tracing/deployment_tracking/
[5]: /fr/monitors/create/types/apm/?tab=apmmetrics
[6]: /fr/dashboards/
[7]: /fr/monitors/service_level_objectives/metric/