---
title: Dépannage des logs
---

Si les logs Datadog se comportent de manière inattendue, consultez ce guide pour passer en revue les problèmes courants et suivre les solutions proposées. Si vous ne parvenez pas à résoudre votre problème, contactez l'[assistance Datadog][1] pour obtenir de l'aide.

## Logs manquants : quota journalier de logs atteint

Si vous n'avez pas modifié votre configuration de log, mais que le [Log Explorer][2] indique que certains logs du jour sont manquants, il est possible vous ayez atteint votre quota journalier.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="Un graphique à barres montrant que des logs sont manquants, avec un message indiquant que le quota journalier a été atteint" style="width:90%" >}}

Consultez la rubrique [Définir un quota journalier][3] pour découvrir comment créer, modifier ou supprimer un tel quota.

## Logs manquants : timestamp en dehors de la période d'ingestion

Les logs dont le timestamp date de plus de 18 heures sont ignorés lors de l'admission. Pour corriger ce problème à la source, vérifiez le `service` et la `source` concernés grâce à la métrique `datadog.estimated_usage.logs.drop_count`.

## Impossible de parser la clé de timestamp depuis les logs JSON

Si vous ne parvenez pas à convertir le timestamp de logs JSON en un [format de date reconnu][4] avant leur ingestion par Datadog, suivez les étapes suivantes pour convertir et mapper les timestamps à l'aide du [processeur arithmétique][5] de Datadog et du [remappeur de dates de log][6] :

1. Accédez à la page [Pipelines][1].

2. Depuis la section **Pipelines**, passez le curseur sur **Preprocessing for JSON logs**, puis cliquez sur l'icône en forme de crayon.

3. Supprimez `timestamp` de la liste des mappages d'attributs réservés. Cet attribut ne sera plus parsé en tant que timestamp officiel du log lors du prétraitement.

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="La section de configuration du prétraitement des logs JSON avec les attributs de date, dont l'attribut timestamp par défaut" style="width:90%" >}}

2. Configurez le [processeur arithmétique][5] avec une formule multipliant votre timestamp par 1 000, afin de le convertir en millisecondes. Le résultat de la formule constitue un nouvel attribut.

3. Configurez le [remappeur de dates de log][6] afin d'utiliser le nouvel attribut comme timestamp officiel.

Accédez au [Log Explorer][2] pour consulter les nouveaux logs JSON, avec leur timestamp mappé.

## Logs tronqués

Les logs dont la taille dépasse 1 Mo sont tronqués. Pour corriger ce problème à la source, vérifiez le `service` et la `source` concernés grâce aux métriques `datadog.estimated_usage.logs.truncated_count` et `datadog.estimated_usage.logs.truncated_bytes`.

[1]: /fr/help/
[2]: https://app.datadoghq.com/logs
[3]: /fr/logs/log_configuration/indexes/#set-daily-quota
[4]: /fr/logs/log_configuration/pipelines/?tab=date#date-attribute
[5]: /fr/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[6]: /fr/logs/log_configuration/processors/?tab=ui#log-date-remapper
[7]: https://app.datadoghq.com/logs/pipelines