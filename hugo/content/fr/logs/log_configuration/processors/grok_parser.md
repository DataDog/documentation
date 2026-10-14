---
description: Analyser vos logs à l'aide du processeur Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Découvrir Datadog Pipelines
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: Blog
  text: 'Comment détecter les abus HTTP/2 dans les logs du serveur web Apache :'
processor_type: grok-parser
title: Parser Grok
---
## Présentation {#overview}

Créez des règles grok personnalisées pour analyser le message complet ou un attribut spécifique de votre événement brut. Limitez votre parseur grok à 10 règles de parsing. Pour plus d'informations sur la syntaxe Grok et les règles d'analyse, consultez [Parsing][1].

{{< img src="/logs/processing/processors/ai-grok-rules.png" alt="Configuration du parseur Grok" style="width:90%;" >}}

## Cas d'utilisation {#use-cases}

Le parseur grok est principalement utilisé pour analyser les attributs à partir du message de votre log. Par exemple, les logs NGINX ont un message contenant plusieurs informations que vous pourriez vouloir extraire.

Après avoir créé une règle grok, le parseur peut écrire l'adresse IP, l'utilisateur, l'horodatage de la requête, la méthode de requête, l'URL, la version, le code de statut et les octets.


## Configuration {#setup}

Définissez le processeur Grok sur la [{{< ui >}}Pipelines{{< /ui >}} page][2]. Pour configurer les règles de parsing Grok :

1. Cliquez sur {{< ui >}}Add Grok Parser{{< /ui >}} pour ouvrir une nouvelle configuration de parseur.
1. {{< ui >}}Log Samples{{< /ui >}} : Des exemples de logs sont automatiquement extraits dans la section Log Samples. Vous pouvez également ajouter d'autres exemples de logs (jusqu'à 10 au total, 5000 caractères chacun).
   **Remarque** : Les exemples de logs sont extraits des cinq modèles de logs ayant le volume le plus élevé correspondant à votre filtre de pipeline.
1. {{< ui >}}Log Samples{{< /ui >}} : Ajoutez jusqu'à cinq exemples de logs (jusqu'à 5000 caractères chacun) pour tester vos règles de parsing.
1. {{< ui >}}Define parsing rules{{< /ui >}} : Cliquez sur {{< ui >}}Auto parsing{{< /ui >}} pour générer des règles correspondant à vos exemples.
   {{< site-region region="gov,gov2" >}}
   <div class="alert alert-info">Le parsing automatique n'est pas disponible pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
   {{< /site-region >}}
1. {{< ui >}}Test your rules{{< /ui >}} : Cliquez sur un exemple pour déclencher son évaluation par rapport à la règle de parsing et afficher le résultat sur la droite de l'écran. Tous les exemples affichent un statut (`match` ou `no match`), qui indique si l'une des règles de parsing du parseur grok correspond à l'exemple.


## État des logs avant et après {#before-and-after-state-of-logs}

{{% collapse-content title="Exemple : Analyse des journaux d'accès nginx" level="h3" %}}

**Avant (log brut) :**

```text
192.168.1.1 - john [10/Oct/2023:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 1234
```

**Règle de parsing Grok :**

```text
access.common %{ipOrHost:network.client.ip} %{notSpace:http.ident} %{notSpace:http.auth} \[%{httpdate:date}\] "(?>%{word:http.method} |)%{notSpace:http.url}(?: HTTP/%{number:http.version}|)" %{number:http.status_code} (?>%{number:network.bytes_written}|-)
```

**Après traitement :**

```json
{
 "network": {
   "client": {
     "ip": "192.168.1.1"
   },
   "bytes_written": 1234
 },
 "http": {
   "ident": "-",
   "auth": "john",
   "method": "GET",
   "url": "/api/users",
   "version": "1.1",
   "status_code": 200
 },
 "date": 1696945536000
}
```

Le parseur Grok transforme les messages de logs non structurés en attributs JSON structurés qui peuvent être interrogés, filtrés et analysés dans le Log Explorer.

{{% /collapse-content %}}

## API {#api}

Utilisez le [Datadog Log Pipeline API endpoint][3] avec la charge utile JSON du parseur Grok suivante :

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| Paramètre            | Type             | Requis | Description                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | Chaîne           | Oui      | Type du processeur.                                  |
| `name`               | Chaîne           | Non       | Nom du processeur.                                  |
| `is_enabled`         | Booléen          | Non       | Indique si le processeur est activé ou non. Par défaut: `false`.  |
| `source`             | Chaîne           | Oui      | Nom de l'attribut de log à analyser. Par défaut: `message`. |
| `samples`            | Tableau de chaînes | Non       | Liste de (jusqu'à 5) exemples de logs pour ce parseur grok.     |
| `grok.support_rules` | Chaîne           | Oui      | Liste des règles de support pour votre parseur grok.             |
| `grok.match_rules`   | Chaîne           | Oui      | Liste des règles de correspondance pour votre parseur grok.               |



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing/?tab=matchers
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /fr/api/v1/logs-pipelines/