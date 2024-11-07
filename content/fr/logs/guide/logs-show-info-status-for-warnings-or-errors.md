---
aliases:
- /fr/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: /logs/guide/remap-custom-severity-to-official-log-status/
  tag: Documentation
  text: Apprendre à remapper des valeurs de gravité personnalisées pour le statut
    officiel des logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: Documentation
  text: Apprendre à étudier un problème de parsing de log

title: Logs avec un statut Info en cas d'avertissement ou d'erreur
---

## Présentation

Par défaut, lorsque l'API d'admission Datadog reçoit un log, un statut `INFO` est généré et défini comme valeur de l'attribut `status`.

{{< img src="logs/guide/original_log.png" alt="Volet des logs affichant un log avec un statut Info, mais le message affiché correspond à un avertissement." style="width:50%;">}}

Ce `status` par défaut ne correspond pas toujours au statut réel du log en question. Ce guide vous explique comment remplacer la valeur par défaut des logs par leur statut réel.

## Logs bruts

Si vos logs bruts n'affichent pas le bon statut dans Datadog, [extrayez](#extraire-la-valeur-du-statut-avec-un-parser) le statut correct à partir des logs bruts et [remappez](#definir-un-remappeur-de-statuts-de-log)-le afin d'afficher le bon statut.

### Extraire la valeur du statut avec un parser

Utilisez un parser Grok pour définir une règle avec le [matcher `word()`][1] et extraire le statut réel du log.

1. Accédez à [Logs Pipelines][2] et cliquez sur le pipeline traitant les logs.
2. Cliquez sur **Add Processor**.
3. Sélectionnez le type de processeur **Grok Parser**.
4. Utilisez le [matcher `word()`][1] pour extraire le statut et le transmettre dans un attribut `log_status` personnalisé.

Voici un exemple de log :

```
WARNING: John disconnected on 09/26/2017
```

Ajoutez une règle comme celle-ci :

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

Vous obtenez la sortie suivante pour l'extraction de `MyParsingRule` :

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

### Définir un remappeur de statuts de log

L'attribut `log_status` contient le bon statut. Ajoutez un [remappeur de statuts de log] [3] pour vérifier que la valeur de statut de l'attribut `log_status` a bien remplacé le statut par défaut du log.

1. Accédez à [Logs Pipelines][2] et cliquez sur le pipeline traitant les logs.
2. Cliquez sur **Add Processor**.
3. Sélectionnez le type de processeur Status remapper.
4. Nommez le processeur.
5. Ajoutez **log_status** à la section Set status attribute(s).
6. Cliquez sur **Create**.

{{< img src="logs/guide/log_post_processing.png" alt="Volet des logs affichant un log avec un statut Warning qui correspond à la valeur d'avertissement de l'attribut de gravité." style="width:50%;">}}

Les modifications apportées à un pipeline ont uniquement une incidence sur les nouveaux logs, car toutes les étapes de traitement sont réalisées durant le processus d'admission.

## Logs JSON

Les logs JSON sont automatiquement parsés dans Datadog. Puisque l'attribut `status` des logs est un [attribut réservé][4], il est soumis aux opérations de prétraitement pour les logs JSON.

Dans cet exemple, le statut réel du log correspond à la valeur de l'attribut `logger_severity`, et non au statut par défaut du log `INFO`.

{{< img src="logs/guide/new_log.png" alt="Volet des logs affichant un log avec un statut Info, mais la valeur de l'attribut logger_severity est Error" style="width:50%;">}}

Pour vérifier si la valeur de l'attribut `logger_severity` remplace le statut par défaut du log, ajoutez `logger_severity` à la liste des attributs de statut.

1. Accédez à [Logs Pipelines][2] et cliquez sur le pipeline traitant les logs.
2. Passez le curseur sur Preprocessing for JSON Logs, puis cliquez sur l'icône en forme de crayon.
3. Ajoutez `logger_severity` à la liste des attributs de statut. Le remappeur de statuts se charge de rechercher chaque attribut réservé en suivant l'ordre défini. Pour vous assurer que le statut provient de l'attribut `logger_severity`, placez-le en premier dans la liste.
4. Cliquez sur **Save**.

{{< img src="logs/guide/new_log_remapped.png" alt="Volet des logs affichant un log avec un statut Error qui correspond à la valeur d'erreur de l'attribut logger_severity" style="width:50%;">}}

Les modifications apportées à un pipeline ont uniquement une incidence sur les nouveaux logs, car toutes les étapes de traitement sont réalisées durant le processus d'ingestion. Les nouveaux logs sont correctement configurés avec la valeur de l'attribut `logger_severity`.

Pour que le remappage fonctionne, vous devez utiliser les formats de statut indiqués dans la [documentation relative aux processeurs][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /fr/logs/log_configuration/processors/#log-status-remapper
[4]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes