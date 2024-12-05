---
aliases:
- /fr/account_management/billing/advanced_usage_reporting/
- /fr/account_management/billing/custom_usage_reporitng/
title: Attribution de l'utilisation
---

## Présentation

<div class="alert alert-warning">
L'attribution de l'utilisation est une fonctionnalité avancée incluse dans la formule Enterprise. Pour toutes les autres formules, contactez votre chargé de compte ou envoyez un e-mail à <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> pour demander l'activation de cette fonctionnalité.
</div>

Les administrateurs peuvent accéder à l'onglet Usage Attribution à partir de la section Plan & Usage de Datadog. Depuis la page Usage Attribution, vous pouvez effectuer ce qui suit :

- Consulter la répartition de l'utilisation en fonction des différentes clés de tag et ajouter ou modifier de nouvelles clés (jusqu'à trois clés de tag)
- Créer des fichiers `.tsv` (valeurs séparées par des tabulations) quotidiens pour la plupart des types d'utilisation
- Consulter un résumé de l'utilisation à la fin de chaque mois
- Visualiser des données dans l'IU et les télécharger au format `.tsv`. 

**Remarque** : les types de ressources suivants ne sont pas pris en charge par cet outil.

- Analyzed Logs (Security)
- Gestion des incidents
- Événements de log indexés
- Ingested Logs
- Indexed Spans
- Spans ingérées
- Network Flows
- Real User Monitoring

### Prise en main

Pour commencer à recevoir des données quotidiennes, un administrateur doit créer un rapport depuis l'interface utilisateur. 

{{< img src="account_management/billing/advanced-usage-reporting-01.png" alt="Prise en main" >}}

La section **Applied Tags** vous permet d'effectuer plusieurs opérations :

- Sélectionnez dans une liste déroulante jusqu'à 3 clés de tag. Les valeurs de la liste déroulante correspondent aux tags existants dans le compte racine et dans les organisations enfant sous le compte.
- Supprimez et modifiez des tags existants.

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Tags appliqués" >}}

- Une fois les tags configurés, vous devez attendre 24 heures pour que le premier rapport soit généré.
- Les rapports sont régulièrement générés.
- Si vous modifiez des tags, le nouveau rapport tient compte de vos changements. Cependant, les rapports précédents conservent les anciens tags.
- Les rapports mensuels englobent l'ensemble de tags le plus récent. Si vous modifiez les tags au milieu du mois, les pourcentages d'utilisation risquent de ne pas correspondre. 

### Attribution de l'utilisation mensuelle

Dès que la création de rapports est lancée, ces derniers sont mis à jour quotidiennement et agrégés tous les mois dans ce tableau.

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="Tableau de résumé de l'utilisation" >}}

- Cliquez sur une clé de tag pour afficher ses données dans le tableau.
- Si vous avez activé les comptes multi-org, l'utilisation est résumée pour toutes les organisations Datadog du compte parent.
- Utilisez le sélecteur d'intervalle pour accéder aux rapports des mois précédents.
- Les rapports mensuels ne sont générés qu'à la fin du mois. Chaque rapport mensuel est disponible le deuxième jour du mois suivant. 
- Utilisez l'option Export Current View pour télécharger des rapports. Les rapports `.tsv` incluent les valeurs et pourcentages d'utilisation, afin de simplifier l'attribution des ressources et la rétrofacturation.

Les données mensuelles peuvent également être récupérées à l'aide de l'API publique de l'outil. Consultez la [documentation sur l'endpoint d'API][1] pour en savoir plus.

### Attribution de l'utilisation quotidienne

Cette section fournit des rapports quotidiens avec une granularité horaire pour analyser en détail certains intervalles. Tous les rapports d'un mois précis y sont également concaténés.

- Cliquez sur une certaine période pour agrandir la vue sur la droite et télécharger des rapports au format `.tsv`.
- Vous pouvez télécharger les données tous les jours, ou à la fin du mois.

{{< img src="account_management/billing/advanced-usage-reporting-04.png" alt="Télécharger les données" >}}

Les données quotidiennes peuvent également être récupérées à l'aide de l'API publique de l'outil. Consultez la [documentation sur l'endpoint d'API][2] pour en savoir plus.

### Interprétation des données

Le tableau ci-dessous présente un exemple de rapport quotidien pour deux tags d'utilisation de métriques custom : `team` et `service`.

| public_id | hour                | team          | service                  | num_custom_timeseries |
| --------- | ------------------- | ------------- | ------------------------ | --------------------- |
| publicid1 | 2020-02-01 00:00:00 | &lt;empty&gt; | service1 &#124; service2 | 50                    |
| publicid1 | 2020-02-01 09:00:00 | team1         |                          | 28                    |
| publicid1 | 2020-02-01 18:00:00 | team2         | service3                 | 1023                  |

- Une valeur `<empty>` indique que la ressource a été taguée avec le tag concerné, mais qu'elle ne présente aucune valeur.
- Si aucune valeur n'est indiquée, cela indique que la ressource ne comporte pas le tag concerné.
- Des valeurs séparées par le symbole `|` (barre verticale) (par exemple, `service1 | service2`) indiquent qu'un tag spécifique a été appliqué plusieurs fois à la ressource.
- Une valeur de tag valide (voir la [documentation sur la définition de tags][3]) indique la valeur réelle du tag concerné.

#### Analyse approfondie des données

Lorsque vous utilisez plusieurs tags, les rapports Daily Usage Attribution et Monthly Usage Attribution contiennent des données pour toutes les combinaisons possibles de ces tags. Ils constituent ainsi d'excellents ensembles de données de base pour vos tâches d'analyse plus approfondie. Par exemple, vous pouvez utiliser des opérations de regroupement ou de pivotement pour générer des vues afin d'étudier plus précisément un certain sous-ensemble de tags, ou encore d'effectuer des agrégations temporelles personnalisées.

[1]: https://docs.datadoghq.com/fr/api/v1/usage-metering/#get-the-list-of-available-monthly-custom-reports
[2]: https://docs.datadoghq.com/fr/api/v1/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: https://docs.datadoghq.com/fr/getting_started/tagging/#defining-tags