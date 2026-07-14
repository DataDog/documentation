---
title: Dépannage d'Autodiscovery
aliases:
  - /fr/agent/autodiscovery/troubleshooting
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: /agent/troubleshooting/debug_mode/
    tag: Documentation
    text: Mode debugging de l'Agent
  - link: /agent/troubleshooting/send_a_flare/
    tag: Documentation
    text: Envoyer un flare avec l'Agent
---
Exécutez la commande de script init `configcheck` pour commencer le dépannage d'Autodiscovery avec l'Agent Docker :

```shell
docker exec -it <NOM_CONTENEUR_AGENT> agent configcheck -v
```

**Remarque** : l'option `-v` vous permet d'afficher tous les modèles, y compris ceux qui ne sont pas résolus.

L'exemple suivant est une configuration Autodiscovery valide pour un modèle Redis chargé à partir d'une annotation d'étiquette Docker (et non à partir du fichier `redisdb.d/auto_conf.yaml` par défaut) :

```text
# docker exec -it <NOM_CONTENEUR_AGENT> agent configcheck -v
.
..
...
=== Fournisseur : étiquettes de conteneur Docker ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```

Les exemples illustrent les problèmes pouvant survenir en cas de chargement d'une configuration Autodiscovery non valide pour un modèle Redis :

```text
# docker exec -it <NOM_CONTENEUR_AGENT> agent configcheck -v
.
..
...
=== Résoudre les avertissements ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Configuration non résolues ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```

Si vous n'avez toujours pas résolu votre problème, vous pouvez contacter l'[équipe d'assistance Datadog][8] en envoyant [un flare][9] de votre Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/agent/troubleshooting/send_a_flare/