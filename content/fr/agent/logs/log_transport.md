---
description: Utiliser l'Agent Datadog pour recueillir vos logs et les envoyer à Datadog
further_reading:
- link: agent/logs/advanced_log_collection/#filtrer-les-logs
  tag: Documentation
  text: Filtrer les logs envoyés à Datadog
- link: agent/logs/advanced_log_collection/#nettoyer-les-donnees-sensibles-de-vos-logs
  tag: Documentation
  text: Nettoyer les données sensibles de vos logs
- link: agent/logs/advanced_log_collection/#agregation-multiligne
  tag: Documentation
  text: Agrégation de logs multiligne
- link: agent/logs/advanced_log_collection/#suivre-des-repertoires-a-l-aide-de-wildcards
  tag: Documentation
  text: Suivre des répertoires à l'aide de wildcards
- link: agent/logs/advanced_log_collection/#regles-globales-de-traitement
  tag: Documentation
  text: Règles globales de traitement
title: Transport de l'Agent pour les logs
---


## Comportement de l'Agent par défaut

Avec les versions 6.19/7.19 ou ultérieures de l'Agent, le transport HTTPS avec compression est par défaut utilisé pour vos logs, au lieu de TCP pour les versions précédentes.
Lorsque l'Agent démarre, si la collecte de logs est activée, il exécute un test de connectivité HTTPS. En l'absence d'erreur, l'Agent utilise le transport HTTPS avec compression ; dans le cas contraire, l'Agent revient au transport TCP.

Ce mécanisme de test de la connectivité est uniquement exécuté au démarrage de l'Agent. Il évalue uniquement la connectivité HTTPS. Si l'Agent ne détecte de connectivité ni pour HTTPS ni pour TCP au démarrage, il utilise le transport TCP une fois la connectivité rétablie, et ce jusqu'au prochain redémarrage.

Pour vérifier le transport que l'Agent utilise, exécutez la [commande status de l'Agent][1].

{{< img src="agent/logs/agent-status.png" alt="Commande status de l'Agent" style="width:70%;">}}

**Remarques** :

* Pour les versions antérieures de l'Agent, le transport TCP est utilisé par défaut. Datadog vous recommande vivement d'imposer l'utilisation du transport HTTPS si vous utilisez les versions 6.14/7.14 ou ultérieures, et le transport HTTPS avec compression si vous utilisez les versions 6.16/7.16 ou ultérieures.
* Imposez toujours un transport spécifique (TCP ou HTTPS) lorsque vous utilisez un proxy pour transmettre des logs à Datadog.

## Imposer un transport spécifique

Utilisez les configurations suivantes pour imposer l'utilisation du transport TCP ou HTTPS.

{{< tabs >}}
{{% tab "HTTPS" %}}

Pour imposer le transport HTTPS avec les versions 6.14/7.14 ou ultérieures de l'Agent, mettez à jour le [fichier de configuration principal][1] (`datadog.yaml`) de l'Agent en indiquant :

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

Pour envoyer des logs avec des variables d'environnement, configurez ce qui suit :

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_USE_HTTP=true`

Par défaut, l'Agent Datadog utilise le port `443` pour envoyer ses logs à Datadog via HTTPS.

## Transport HTTPS

**Nous vous conseillons de transmettre les logs via HTTPS** pour effectuer la collecte de logs la plus fiable possible, car le code de statut `200` est renvoyé par le système de stockage de Datadog :

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="Schéma du processus d'admission HTTPS"  style="width:80%;">}}

Avec HTTPS, l'Agent envoie les lots de logs en appliquant les limites suivantes :

* Taille maximale d'un lot : 1 Mo
* Taille maximale d'un log : 256 Ko
* Nombre maximum de logs dans un lot : 200

### Compression des logs

Le paramètre `compression_level` (ou `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) accepte les valeurs comprises entre `0` (aucune compression) et `9` (compression maximale, impliquant une plus forte utilisation des ressources). La valeur par défaut est `6`.

Consultez la [section sur la charge système de l'Agent Datadog][2] pour en savoir plus sur les ressources utilisées par l'Agent lorsque la compression est activée.

Pour les versions de l'Agent antérieures à 6.19/7.19, vous devez imposer la compression en mettant à jour le [fichier de configuration principal][1] (`datadog.yaml`) de l'Agent de façon à indiquer :

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

### Configurer le temps d'attente d'un lot

L'Agent patiente jusqu'à 5 secondes afin de satisfaire l'une des limites (la taille du contenu ou le nombre de logs). Par conséquent, dans le pire des cas (lorsque le nombre de logs générés est faible), le passage au HTTPS entraîne une latence accrue de 5 secondes par rapport au transport par TCP, qui envoie l'ensemble des logs en temps réel.

Pour modifier le délai maximal que l'Agent Datadog applique avant le remplissage de chaque lot, ajoutez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent (`datadog.yaml`) :

```yaml
logs_config:
  batch_wait: 2
```

Vous pouvez également utiliser la variable d'environnement `DD_LOGS_CONFIG_BATCH_WAIT=2`. La valeur doit être un nombre entier compris entre `1` et `10` correspondant au nombre de secondes.

### Configuration d'un proxy HTTPS

Lorsque les logs sont envoyés via HTTPS et doivent transiter par un proxy web, utilisez les mêmes [paramètres de proxy][3] que ceux utilisés pour l'envoi d'autres types de données.

[1]: /fr/agent/guide/agent-configuration-files/
[2]: /fr/agent/basic_agent_usage/#agent-overhead
[3]: /fr/agent/proxy/
{{% /tab %}}
{{% tab "TCP" %}}

Pour imposer le transport TCP, mettez à jour le [fichier de configuration principal][1] (`datadog.yaml`) de l'Agent en indiquant :

```yaml
logs_enabled: true
logs_config:
  force_use_tcp: true
```
Pour envoyer des logs avec des variables d'environnement, configurez ce qui suit :

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_FORCE_USE_TCP=true`

Par défaut, l'Agent Datadog envoie ses logs à Datadog via le protocole TCP chiffré par TLS. Cela nécessite une communication sortante (sur le port `10516` pour le site américain de Datadog ou `443` pour le site européen).

[1]: /fr/agent/guide/agent-configuration-files/
{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous configurez un serveur [proxy SOCKS5][2], le transport TCP est imposé, car les proxies socks5 ne sont pas encore pris en charge par le transport HTTPS avec compression.


[1]: /fr/agent/guide/agent-commands/?tab=agentv6v7#service-status
[2]: /fr/agent/logs/proxy/?tab=socks5
