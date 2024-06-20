---
aliases:
- /fr/logs/faq/how-to-tail-logs-from-host-using-a-container-agent
further_reading:
- link: /agent/docker/log
  tag: Documentation
  text: Journalisation avec Docker
- link: /agent/docker/log/?tab=containerinstallation
  tag: Documentation
  text: Journalisation avec Kubernetes
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: Blog
  text: Bonnes pratiques à adopter pour la journalisation Docker
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
kind: guide
title: Utiliser l'Agent de conteneur pour suivre les logs provenant d'un host
---

<div class="alert alert-info">Datadog vous conseille d'utiliser <b>STDOUT/STDERR</b> pour recueillir des logs de conteneur.</div>

## Présentation

Par défaut, les pods et conteneurs n'ont pas accès aux fichiers des hosts. Il en va de même pour l'Agent. Si vous cherchez à configurer votre Agent de conteneur de façon à recueillir des logs à partir des fichiers d'un host, un message d'erreur similaire au suivant s'affiche :

```
  syslog
  ------
    Type: file
    Path: /var/log/messages
    Status: Error: file /var/log/messages does not exist

```

Pour autoriser l'Agent de conteneur à accéder aux fichiers d'un host, montez le fichier ou son répertoire sur l'Agent de conteneur. Consultez la liste des [fichiers et répertoires de configuration de l'Agent][1] pour découvrir le fichier ou répertoire de host à monter, selon votre système d'exploitation.

Les exemples suivants s'appliquent à Kubernetes et Docker :

{{< tabs >}}
{{% tab "Kubernetes" %}}

Pour monter les fichiers de log de votre host sur le conteneur de l'Agent, définissez le répertoire des logs du host dans la section `volumes` du manifeste de votre Agent, ainsi que le répertoire des logs du conteneur à la section `volumeMounts` :

```
        volumeMounts:
          - name: customlogs
            ## Le répertoire de log de votre choix au sein du conteneur de l'Agent :
            mountPath: /container/var/test-dir/logs/

      volumes:
        - name: customlogs
          hostPath:
            ## Le répertoire de votre host contenant les fichiers de log.
            path: /var/test-dir/logs/
```

Configurez ensuite l'Agent de façon à suivre les fichiers pour la collecte de logs. Pour ce faire, vous pouvez monter une configuration de logs personnalisée sur `/conf.d/`. Le nom du fichier peut être défini sur n'importe quelle valeur, tant que vous conservez l'extension `.yaml`.

Au lieu de monter directement un fichier de host, il est préférable d'utiliser une ConfigMap pour stocker des configurations. L'extrait de manifeste de ConfigMap suivant inclut un fichier `logs.yaml` :

```
kind: ConfigMap
apiVersion: v1
metadata:
     name: ddagent-logs-configmap
     namespace: default
data:
     logs.yaml: |-
           logs:
             - type: file
               service: syslog
               source: os
               ## Utiliser le répertoire de logs du conteneur défini dans le manifeste de l'Agent
               path: /container/var/test-dir/logs/*.log
```

Créez l'objet ConfigMap à l'aide de la commande suivante :

```bash
kubectl create -f <manifeste_configmap>
```

Montez-le ensuite sous `/conf.d/` :

```
        volumeMounts:
          - name: cm-logs
            mountPath: /conf.d/

      volumes:
        - name: cm-logs
          configMap:
            name: ddagent-logs-configmap
```

{{% /tab %}}
{{% tab "Docker" %}}

Pour monter le fichier de log du host, ajoutez un paramètre volume dans la commande `docker run` de votre Agent :

```
-v /<répertoire_log_host>/:<répertoire_log_conteneur>/
```

Créez ensuite localement une configuration de logs personnalisée :

```
logs:
  - type: file
    service: syslog
    source: os
    path: <chemin_log_conteneur>/*.log
```

Montez-la ensuite sur `/conf.d/`. Vous pouvez attribuer n'importe quel nom au fichier :

```
-v <chemin_absolu>/logs.yaml:/conf.d/logs.yaml
```

La commande d'installation Docker de l'Agent devrait ressembler à ce qui suit :

```
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<CLÉ_API_DATADOG> \
           -e DD_LOGS_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /<répertoire_log_host>/:<répertoire_log_conteneur>/ \
           -v /<emplacement_configuration>/logs.yaml:/conf.d/logs.yaml \
           gcr.io/datadoghq/agent:latest
```
{{% /tab %}}
{{< /tabs >}}

## Vérification

Une fois cette configuration terminée, vous pouvez déployer l'Agent. Vous devriez alors obtenir une sortie similaire à ce qui suit après l'exécution de la commande `docker exec -it datadog-agent agent status` :

```
==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 10605
    EncodedBytesSent: 2144
    LogsProcessed: 32
    LogsSent: 31

  logs
  ----
    Type: file
    Path: /container/var/test-dir/logs/*.log
    Status: OK
      1 files tailed out of 1 files matching
    Inputs: /container/var/test-dir/logs/722bfb2cb35cc627-json.log

```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7