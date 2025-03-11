---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /logs/faq/log-parsing-best-practice
  tag: Documentation
  text: 'Parsing de log : bonnes pratiques à adopter'

title: Surveiller et interroger les logs non parsés
---

## Présentation
Le parsing des logs est essentiel pour pouvoir utiliser la pleine capacité de Datadog Log Management, pour les requêtes, les monitors, les agrégations ou les enrichissements automatiques comme le scanner de données sensibles.
Lorsque vous redimensionnez le volume de logs, il peut s'avérer difficile d'identifier et de corriger les modèles de logs qui ne sont pas soumis au parsing par vos pipelines.

Pour identifier et contrôler le volume des logs non parsés de votre organisation, suivez les étapes suivantes :

1. [Détecter les logs non parsés](#detecter-les-logs-non-parses)
2. [Interroger les logs non parsés](#interroger-les-logs-non-parses)
3. [Créer une métrique pour suivre les logs non parsés](#creer-une-metrique-pour-suivre-les-logs-non-parses)
4. [Surveiller le volume des logs non parsés](#surveiller-le-volume-des-logs-non-parses)


## Détecter les logs non parsés
Pour déterminer si un log spécifique a été parsé par vos pipelines, ouvrez le log et consultez le volet Event Attributes. Si le log n'est pas parsé, au lieu d'afficher les attributs extraits de votre log, ce volet affiche un message indiquant qu'aucun attribut n'a été extrait :

{{< img src="logs/guide/unparsed-logs/unparsed-log.jpg" alt="Détails d'un log non parsé" style="width:90%;">}}


Vous pouvez commencer le parsing d'un log non parsé en créant des [pipelines personnalisés][1] ou en utilisant une [intégration de log][2] en tant que source du log, afin de tirer parti de la configuration automatique des pipelines.

## Interroger les logs non parsés
Si vous disposez d'un grand nombre de logs, une vérification manuelle n'est malheureusement pas envisageable. Pour y remédier, vous pouvez interroger les logs non parsés en utilisant le filtre `datadog.pipelines:false` dans le [Log Explorer][3] :

{{< img src="logs/guide/unparsed-logs/datadog-pipeline-false-log-explorer.jpg" alt="Interroger les logs non parsés" style="width:90%;">}}

Ce filtre renvoie tous les logs indexés sans attribut personnalisé après le traitement du pipeline.
[L'agrégation en fonction du pattern][4] affiche une vue agrégée des patterns communs dans les logs non parsés, ce qui simplifie la création de pipelines personnalisés.

## Créer une métrique pour suivre les logs non parsés
Après avoir interrogé les logs non parsés, vous pouvez sélectionner les logs _indexés_ non parsés. Cette bonne pratique vous permet également de vous assurer que les logs que vous n'indexez pas sont bien parsés. Ainsi, vous êtes certain que le contenu de vos [archives][5] est structuré.

Pour créer une métrique pour les logs non parsés, créez une [métrique custom][6] à l'aide de la requête `datadog.pipelines:false` :

{{< img src="logs/guide/unparsed-logs/logs-unparsed-metric.jpg" alt="Générer la métrique logs.unparsed" style="width:90%;">}}

Comme pour toute métrique basée sur des logs, vous pouvez ajouter des dimensions dans le champ `group by`. Dans l'exemple ci-dessus, les éléments sont regroupés par `service` et `team`. Définissez un regroupement en fonction des dimensions utilisées pour définir à qui appartient le log.
## Surveiller le volume des logs non parsés
Pour vous assurer que le parsing des logs reste sous contrôle dans votre organisation, appliquez un quota au volume de logs non parsés. Cette approche suit la même logique que les [quotas quotidiens][7] pour les index.

Pour surveiller le volume de logs non parsés, procédez comme suit :
1. Créez un [monitor de métrique][8].
2. Utilisez la métrique `logs.unparsed` créée précédemment.
3. Définissez le quota par `team`.
4. Vérifiez que les [conditions d'alerte][9] vous conviennent.

{{< img src="logs/guide/unparsed-logs/monitor-unparsed-logs-team.jpg" alt="Interroger des logs non parsés" style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs/log_configuration/pipelines
[2]: /fr/integrations/#cat-log-collection
[3]: /fr/logs/explorer/
[4]: /fr/logs/explorer/#patterns
[5]: /fr/logs/archives/?tab=awss3
[6]: /fr/logs/logs_to_metrics/
[7]: /fr/logs/indexes#set-daily-quota
[8]: /fr/monitors/types/metric/?tab=threshold#overview
[9]: /fr/monitors/types/metric/?tab=threshold#set-alert-conditions