---
aliases:
- /fr/logs/faq/why-do-my-logs-not-have-the-expected-timestamp
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: Comment étudier un problème de parsing de log ?

title: Timestamp incorrect dans les logs
---

Par défaut, lorsqu'un log est envoyé à l'API d'admission Datadog, un timestamp est généré et ajouté en tant qu'attribut de date. Cependant, ce timestamp par défaut ne correspond pas toujours au timestamp réel indiqué dans le log. Ce guide vous explique comment utiliser le timestamp réel au lieu de celui par défaut.

{{< img src="logs/guide/log_timestamp_1.png" alt="Volet des logs affichant un timestamp de log différent du timestamp du message" style="width:70%;">}}

## Timestamp affiché

Le timestamp d'un log se trouve en haut du volet des logs. Les timestamps sont stockés au format UTC et affichés dans le fuseau horaire local de l'utilisateur. Dans la capture d'écran ci-dessus, le profil local est défini sur `UTC+1`. Par conséquent, l'heure de réception du log est `11:06:16.807 UTC`.

Il se peut que le timestamp n'affiche pas la valeur attendue, en raison d'un problème de configuration du fuseau horaire. Pour vérifier si c'est le cas, accédez à [Personal Settings > Preferences][1] et consultez la section **Time zone**.

Si le fuseau horaire est correct, extrayez le timestamp du message pour remplacer le timestamp de log affiché.

## Logs bruts

Si vos logs bruts n'affichent pas le timestamp attendu dans Datadog, [extrayez](#extraire-la-valeur-du-timestamp-avec-un-parser) le timestamp correct à partir des logs bruts, puis [remappez](#definir-un-remappeur-de-dates-de-log)-le.

#### Extraire la valeur du timestamp avec un parser

1. Accédez à [Logs Pipelines][2] et cliquez sur le pipeline traitant les logs.
2. Cliquez sur **Add Processor**.
3. Sélectionnez le type de processeur **Grok Parser**.
4. Utilisez le [matcher date()][3] pour extraire la date et la transmettre dans un attribut de date personnalisé. Pour en savoir plus, consultez l'exemple ci-dessous ainsi que [ces exemples de parsing de dates][4].

Pour cet exemple de log :

```
2017-12-13 11:01:03 EST | INFO | (tagger.go:80 in Init) | starting the tagging system
```

Ajoutez une règle de parsing comme suit :

```
MyParsingRule %{date("yyyy-MM-dd HH:mm:ss z"):date} \| %{word:severity} \| \(%{notSpace:logger.name}:%{integer:logger.line}[^)]*\) \|.*
``` 

Vous obtenez la sortie suivante pour l'extraction de `MyParsingRule` :

```
{
  "date": 1513180863000,
  "logger": {
    "line": 80,
    "name": "tagger.go"
  },
  "severity": "INFO"
}
```

L'attribut `date` stocke la valeur `mytimestamp`.

#### Définir un remappeur de dates de log

Ajoutez un [remappeur de dates de log][5] pour vous assurer que la valeur de l'attribut `date` remplace le timestamp actuel du log.

1. Accédez à [Logs Pipelines][2] et cliquez sur le pipeline traitant les logs.
2. Cliquez sur **Add Processor**.
3. Sélectionnez le type de processeur **Date remapper**.
4. Nommez le processeur.
5. Ajoutez **date** à la section Set date attribute(s).
6. Cliquez sur **Create**.

Le log suivant a été généré à `06:01:03 EST`, soit à `11:01:03 UTC`. Son timestamp a pour valeur 12:01:03, ce qui est correct (le fuseau horaire est UTC+1 pour ce log).

{{< img src="logs/guide/log_timestamp_5.png" alt="Volet des logs affichant le bon timestamp" style="width:70%;" >}}

**Remarque** : les modifications apportées à un pipeline ont uniquement une incidence sur les nouveaux logs, car tout le traitement s'effectue lors de l'ingestion.

## Logs JSON

Les logs JSON sont automatiquement parsés dans Datadog. L'attribut `date` du log est un [attribut réservé][6]. De ce fait, il est soumis aux opérations de prétraitement pour les logs JSON.

Dans l'exemple ci-dessous, le timestamp réel du log correspond à la valeur de l'attribut `mytimestamp`, et non au timestamp du log `Dec 13, 2017 at 14:16:45.158`.

{{< img src="logs/guide/log_timestamp_6.png" alt="Volet des logs affichant un timestamp différent de la valeur de l'attribut mytimestamp dans le message" style="width:50%;">}}

### Formats de date pris en charge

Pour vous assurer que la valeur de l'attribut `mytimestamp` remplace le timestamp actuel du log affiché, ajoutez un attribut de date.

1. Accédez à votre [Logs Pipeline][2].
2. Passez le curseur sur Preprocessing for JSON Logs, puis cliquez sur l'icône en forme de crayon.
3. Ajoutez `mytimestamp` à la liste des attributs de date. Le remappeur de dates se charge de rechercher chaque attribut réservé en suivant l'ordre défini. Pour vous assurer que la date provient de l'attribut `mytimestamp`, placez-le en premier dans la liste.
4. Cliquez sur **Save**.

Pour que le remappage fonctionne, vous devez utiliser des formats de date spécifiques. Les formats de date reconnus sont [ISO8601][7], [UNIX (format EPOCH en millisecondes)][8] et [RFC3164][9].

Si vous utilisez un autre format de date différent, consultez la rubrique [Format de date personnalisé](#format-de-date-personnalise).

**Remarque** : les modifications apportées à un pipeline ont uniquement une incidence sur les nouveaux logs, car tout le traitement s'effectue lors de l'ingestion.

### Format de date personnalisé

Si, par défaut, le remappeur ne prend pas en charge le format de date, vous pouvez parser la date via un [parser Grok][5], puis la convertir en un format compatible.

1. Accédez au [pipeline][2] qui traite les logs. Si vous n'avez pas encore configuré de pipeline pour ces logs, créez-en un.
2. Cliquez sur **Add Processor**.
3. Sélectionnez le type de processeur **Grok Parser**.
4. Définissez la règle de parsing en fonction de votre format de date. Pour en savoir plus, consultez ces [exemples de parsing de dates][4].
5. Sous Advanced Settings, ajoutez `mytimestamp` à la section `Extract from`, afin que ce parser soit appliqué uniquement à l'attribut personnalisé `mytimestamp`.
6. Cliquez sur **Create**.
7. Ajoutez un [remappeur de dates de log][5] pour mapper le bon timestamp aux nouveaux logs.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/preferences
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /fr/logs/log_configuration/parsing
[4]: /fr/logs/log_configuration/parsing/#parsing-dates
[5]: /fr/logs/log_configuration/processors/?tabs=ui#log-date-remapper
[6]: /fr/logs/log_configuration/pipelines/?tab=date#preprocessing
[7]: https://www.iso.org/iso-8601-date-and-time-format.html
[8]: https://en.wikipedia.org/wiki/Unix_time
[9]: https://www.ietf.org/rfc/rfc3164.txt