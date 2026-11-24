---
aliases:
- /fr/monitors/incident_management/analytics
- /fr/service_management/incident_management/analytics/
- /fr/incident_response/incident_management/analytics
description: Surveiller et analyser des statistiques agrégées de gestion des incidents
  dans des Dashboards et Notebooks
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: Documentation
  text: Paramètres d'incident
- link: https://app.datadoghq.com/dash/integration/30523/incident-management-overview
  tag: Dans l'application
  text: OOTB Incident Management Overview Dashboard
- link: https://app.datadoghq.com/notebook/template/11/incident-management-overview
  tag: Dans l'application
  text: OOTB Incident Report Template
title: Analyses et rapports
---
## Présentation {#overview}

{{< img src="incident_response/incident_management/analytics_and_reporting/incident_analytics.mp4" alt="Faites défiler le dashboard Incident Management Overview." video=true style="width:100%;">}}

Utilisez Incident Analytics pour tirer des enseignements des incidents passés et comprendre l'efficacité et la performance de votre processus de réponse aux incidents. Incident Analytics vous permet d'extraire des statistiques agrégées sur vos incidents au fil du temps. Vous pouvez utiliser ces statistiques pour créer des rapports qui vous aident à :
- Analyser si votre processus de réponse aux incidents s'améliore au fil du temps
- Évaluer votre temps moyen de résolution
- Identifier les domaines d'amélioration dans lesquels vous devriez investir

## Données collectées {#data-collected}

Incident Management Analytics est une source de données interrogeable pour les statistiques d'incidents agrégées. Vous pouvez interroger ces données analytiques dans différents widgets graphiques de Dashboards et de Notebooks pour analyser l'évolution de votre réponse aux incidents. Pour vous donner un point de départ, Datadog fournit les ressources prêtes à l'emploi suivantes que vous pouvez cloner et personnaliser :
- [Modèle Incident Management Overview Dashboard][3]
- [Modèle Notebook Incident Report][4]

### Horodatages d'incident {#incident-timestamps}

Les incidents comportent trois attributs d'horodatage qui influencent les analyses :

* Heure de déclaration (`declared`) : moment où l'incident a été déclaré.
* Heure de détection (`detected`) : moment où la ressource sous-jacente à partir de laquelle l'incident a été déclaré a été créée. Par exemple, si une alerte de monitor se déclenche à 14 h et que l'incident est déclaré à 14 h 30, l'heure de détection est 14 h. Si l'incident n'a pas été déclaré à partir d'une autre ressource Datadog, `detected` est identique à `declared`.
* Heure de résolution (`resolved`) : moment où l'incident a été résolu le plus récemment.

### Mesures {#measures}

Incident Management fournit les mesures analytiques suivantes, que vous pouvez utiliser dans les requêtes analytiques des widgets de Dashboards et de Notebooks :

{{< collapse-content title="Durée de l'impact sur les clients" level="h4" >}}
La durée pendant laquelle les clients ont été impactés, basée sur les impacts définis sur l'incident.
{{< img src="incident_response/incident_management/analytics_and_reporting/Customer Impact Duration.png" alt="durée de l'impact client" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Durée sur le statut Active" level="h4" >}}
La durée pendant laquelle l'incident était dans un état « actif », basée sur la chronologie de l'incident.
{{< img src="incident_response/incident_management/analytics_and_reporting/Status Active Duration.png" alt="durée de l'état actif" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Durée sur le statut Stable" level="h4" >}}
La durée pendant laquelle l'incident était dans un état « stable », basée sur la chronologie de l'incident.
{{< img src="incident_response/incident_management/analytics_and_reporting/StatusStableDuration.png" alt="durée de l'état stable" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Detect" level="h4" >}}
La durée entre le premier impact client et l'heure de détection de l'incident.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToDetect.png" alt="graphique du temps de détection" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Repair" level="h4" >}}
La durée entre l'heure de détection de l'incident et le dernier impact client.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToRepair.png" alt="graphique du temps de réparation" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Resolve" level="h4" >}}
La durée entre l'heure de déclaration de l'incident et l'heure à laquelle il a été résolu.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToResolve.png" alt="graphique du temps de résolution" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Internal Response" level="h4" >}}
La durée entre l'heure de détection de l'incident et l'heure de déclaration de l'incident.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToInternalResponse.png" alt="graphique du temps de réponse interne" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time from Detect to Resolve" level="h4" >}}
La durée entre l'heure de détection de l'incident et l'heure à laquelle il a été résolu. Contrairement à Time to Resolve, qui commence à la déclaration, cette mesure inclut également le temps écoulé entre la détection et la déclaration.
{{< /collapse-content >}}

En plus de ces mesures par défaut, vous pouvez créer de nouvelles mesures en ajoutant des champs de propriété personnalisés de type *Number* dans [Incident Settings][7].

### Remplacements d'horodatage{#timestamp-overrides}

Les intervenants en cas d'incident peuvent oublier de déclarer un incident Datadog avant de commencer le processus d'intervention. Ils peuvent également oublier de résoudre un incident dans Datadog même après que le processus d'intervention en cas d'incident a effectivement pris fin. Ces oublis peuvent donner une image trompeuse de vos analyses d'incidents, en gonflant de manière permanente votre délai moyen de résolution ou d'autres mesures.

Pour remédier à cela, les organisations peuvent activer les **remplacements d'horodatage**, qui permettent aux intervenants en cas d'incident de remplacer manuellement les horodatages enregistrés d'un incident. Lorsqu'ils sont présents, les remplacements affectent les mesures analytiques suivantes :

- `Time to Detect`
- `Time to Internal Response`
- `Time to Repair`
- `Time to Resolve`
- `Time from Detect to Resolve`

Les remplacements affectent la recherche, les analyses, les durées affichées dans la section **Timestamps** de l'incident, ainsi que les variables de durée lors du rendu des modèles. Ils ne modifient pas l'historique automatiquement enregistré dans la chronologie de l'incident. Ils ne s'appliquent pas aux mesures analytiques `Status Active Duration` ou `Status Stable Duration`, qui sont basées sur la durée cumulée des segments de statut sur les chronologies des incidents.

Pour activer les remplacements d'horodatage, accédez à [**Incidents** > **Settings** > **Information**][11].

Pour créer, mettre à jour ou supprimer des remplacements d'horodatage, les utilisateurs doivent disposer de la permission **Incidents Write**.

## Visualisez les données d'incident dans des dashboards {#visualize-incident-data-in-dashboards}

Pour configurer votre graphique à l'aide de la solution Incident Management Analytics, suivez ces étapes :

1. [Sélectionnez votre visualisation][5].
2. Sélectionnez `Incidents` dans le menu déroulant de la source de données.
3. Sélectionnez une mesure dans le menu déroulant jaune.
     - **Default Statistic :** compte le nombre d'incidents.
4. Sélectionnez une agrégation pour la mesure.
5. (Facultatif) Sélectionnez un rollup pour la mesure.
6. (Facultatif) Utilisez la barre de recherche pour filtrer la statistique sur un sous-ensemble spécifique d'incidents.
7. (Facultatif) Sélectionnez une facette dans le menu déroulant rose pour diviser la mesure par groupe et sélectionnez un nombre limité de groupes à afficher.
8. [Donnez un titre au graphique][6].
9. Enregistrez votre widget.

### Exemple : durée de l'impact des pannes hebdomadaires sur les clients, regroupée par service {#example-weekly-outage-customer-impact-duration-grouped-by-service}

{{< img src="/incident_response/incident_management/analytics_and_reporting/analytics_graph_configuration.png" alt="Configuration d'un graphique de série temporelle montrant la source de données Incidents filtrée par gravité et affichant la durée de l'impact sur les clients, regroupée par service" style="width:90%;" >}}

Cet exemple de configuration présente une agrégation de vos incidents SEV-1 ou SEV-2. Le graphique affiche la mesure Customer Impact Duration de ces incidents, regroupée par service.

1. Widget : [graphique linéaire de série temporelle][8]
2. Source de données : `Incidents`
3. Mesure : `Customer Impact Duration`
4. Agrégation : `avg`
5. Rollup : `1w`
6. Filtre : `severity:("SEV-1" OR "SEV-2")`
7. Groupe : `Services`, limité aux 5 premiers

## Rapport d'incident {#incident-report}

Utilisez le modèle Notebook prêt à l'emploi pour créer l'Incident Report ou créez-en un à partir de zéro pour obtenir un rapport récapitulatif des incidents de votre équipe ou de votre service.
1. Ouvrez le [modèle Incident Report][9].
1. Cliquez sur **Use Template** pour modifier et personnaliser le modèle.
1. Vous pouvez utiliser les cellules Incident existantes ou personnaliser la requête pour afficher les valeurs de chaque mesure.
1. Mettez à jour les cellules récapitulatives avec les valeurs pertinentes et [partagez le rapport][10] avec le reste de votre équipe.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/
[2]: /fr/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /fr/dashboards/querying/#select-your-visualization
[6]: /fr/dashboards/querying/#create-a-title
[7]: /fr/incident_response/incident_management/setup_and_configuration/property_fields
[8]: /fr/dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /fr/notebooks/#share-notebooks
[11]: https://app.datadoghq.com/incidents/settings#information
[12]: /fr/incident_response/incident_management/setup_and_configuration/variables/#incident-variables