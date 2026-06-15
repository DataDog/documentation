---
aliases:
- /fr/monitors/incident_management/analytics
description: Surveiller et analyser des statistiques agrégées de gestion des incidents
  dans des dashboards et notebooks
title: Incident Management Analytics
---

## Présentation

{{< img src="service_management/incidents/incident_analytics.mp4" alt="Analyse de la gestion des incidents" video=true style="width:80%;">}}

Incident Management Analytics est une source de données interrogeable vous permettant d'obtenir des statistiques agrégées sur les incidents. Vous pouvez interroger ces données d'analyse dans divers widgets de graphique, que ce soit dans des [dashboards][1] et des [notebooks][2], afin d'analyser l'historique de résolution des incidents au fil du temps. En guise de point de départ, Datadog fournit un [modèle de dashboard][3] et un [modèle de notebook][4] offrant une vue d'ensemble de la gestion des incidents. Vous pouvez cloner et dupliquer ces modèles comme bon vous semble.

Les widgets suivants prennent en charge Incident Management Analytics :

* Série temporelle
* Top List 
* Valeur de requête

### Mesures

Datadog fournit par défaut les mesures agrégées suivantes pour créer vos requêtes d'analyse :

1. Count (*)
2. Customer Impact Duration 
3. Status Active Duration (durée pendant laquelle l'incident a conservé le statut `Active`) 
4. Status Stable Duration (durée pendant laquelle l'incident a conservé le statut `Stable`)
5. Time to Repair (timestamp de fin de l'impact client - timestamp de création de l'incident)
6. Time to Resolve (timestamp de résolution - timestamp de création)

En plus de ces mesures par défaut, vous pouvez créer d'autres mesures en ajoutant des champs de propriété *Number* personnalisés dans les [paramètres de votre incident][7].

### Configuration d'un graphique

Pour configurer votre graphique à l'aide de la solution Incident Management Analytics, suivez ces étapes :

1. [Sélectionnez votre visualisation][5].
2. Sélectionnez `Incidents` dans le menu déroulant des sources de données.
3. Sélectionnez une mesure dans le menu déroulant jaune.
     - **Statistique par défaut :** nombre d'incidents.
4. Sélectionnez une agrégation pour la mesure.
5. (Facultatif) Sélectionnez un cumul pour la mesure.
6. (Facultatif) Utilisez la barre de recherche pour limiter la statistique à un sous-ensemble d'incidents.
7. (Facultatif) Sélectionnez une facette dans le menu déroulant rose pour répartir la mesure par groupe et sélectionner un nombre limité de groupes à afficher.
8. [Donnez un titre au graphique][6].
9. Enregistrez votre widget.

**Exemple :** Durée hebdomadaire de l'impact client des pannes par service

1. Widget : graphique linéaire de série temporelle
2. Source de données : `Incidents`
3. Mesure : `Customer Impact Duration`
4. Agrégation : `avg`
5. Cumul : `1w`
6. Filtre : `severity:("SEV-1" OR "SEV-2")`
7. Groupe : `Services`, limités aux 5 premiers

{{< img src="service_management/incidents/incident_analytics_query_example.jpeg" alt="Exemple de requête dʼanalyse dʼincident" style="width:80%;">}}

[1]: /fr/dashboards/
[2]: /fr/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /fr/dashboards/querying/#select-your-visualization
[6]: /fr/dashboards/querying/#create-a-title
[7]: /fr/service_management/incident_management/incident_settings#property-fields