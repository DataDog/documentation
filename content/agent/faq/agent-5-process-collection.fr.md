---
title: Collecte de processus avec l'Agent v5
kind: faq
---


## Configuration standard de l'Agent

**Les live processes ont été introduits dans Datadog Agent version 5.16.0.**
Reportez-vous aux instructions [d'installation de l'Agent][1] pour avoir les détails spécifiques liés à votre plate-forme.

Une fois l'Agent Datadog installé, activez la collecte de processus (live processes) en modifiant le [fichier de configuration][4] localisé:

```
/etc/dd-agent/datadog.conf
```

et en ajoutant la ligne suivante à la section `[Main]`:
```
    process_agent_enabled: true
```

Une fois la configuration terminée, [redémarrez l'agent][5].
**Note**: Pour collecter des informations sur le conteneur avec l'installation standard, l'utilisateur dd-agent doit disposer des permissions pour accéder à docker.sock.

## Conteneur Docker 

Mettez à jour l'image de l'Agent Datadog pour la version 5.16.0 ou supérieure:

    $ docker pull datadog/docker-dd-agent

Suivez les instructions pour [docker-dd-agent][2], en passant les attributs suivants en plus de tous vos autres paramètres:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

## Daemonset Kubernetes

Dans le manifeste [dd-agent.yaml][3] utilisé pour créer le daemonset, ajoutez les variables d'environnement, volume mount et volume suivantes:

```
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd    
```

Reportez-vous à l'installation standard du [daemonset][6] et à  la page d'information et de documentation de [docker-dd-agent][7].


[4]: /agent/faq/where-is-the-configuration-file-for-the-agent
[5]: /agent/faq/start-stop-restart-the-datadog-agent
[6]: /integrations/kubernetes/#installation-via-daemonsets-kubernetes-110
[7]: https://github.com/DataDog/docker-dd-agent
