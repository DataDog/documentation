---
kind: documentation
title: Alertes Watchdog
---

## Présentation

Watchdog détecte de façon proactive les anomalies au sein de vos systèmes et applications. Chaque anomalie est présentée dans le [Watchdog Alert Explorer][1]. Elle comprend des informations sur l'événement en question, l'impact potentiel sur les autres systèmes, ainsi que la cause à l'origine de l'anomalie.

{{< img src="watchdog/watchdog.png" alt="La page d'alertes de Watchdog, avec une alerte d'anomalie en cours dans des logs d'erreur, une alerte d'anomalie résolue dans des logs d'erreur et une alerte de taux d'erreur résolue via une analyse des causes d'origine" >}}

## Détails des alertes Watchdog

Chaque fiche d'aperçu d'une alerte contient les sections ci-dessous :

{{< img src="watchdog/alerts/alerts_overview.png" alt="Capture d'écran d'une fiche d'alerte Watchdog, avec un taux d'erreur élevé sur l'endpoint send-sms dans sms-service" style="width:100%;">}}

1. **Status** : une anomalie peut posséder le statut `ongoing`, `resolved` ou `expired`. Le statut `expired` indique que l'anomalie a été détectée il y a plus de 48 heures.
3. **Timeline** : description de la période de l'anomalie.
4. **Message** : description de l'anomalie.
5. **Graph** : représentation visuelle de l'anomalie.
6. **Tags** : contexte de l'anomalie.
7. [**Impact*][4] (si disponible) : description des utilisateurs, vues ou services concernés par l'anomalie.

Cliquez n'importe où sur la fiche d'aperçu d'une alerte pour ouvrir le volet des détails de l'alerte.

En plus de reprendre les informations de la fiche d'aperçu, l'onglet **Overview** peut afficher un ou plusieurs des champs suivants :

* **Expected Bounds** : cochez la case **Show expected bounds**. Le graphique change alors de couleur pour différencier les comportements attendus des comportements anormaux.
* **Suggested Next Steps** : description des étapes à effectuer pour analyser et trier les comportements anormaux.
* **Monitors** : liste des monitors associés à votre alerte. Pour chaque monitor affiché, le contexte est défini sur la métrique de l'alerte actuelle et sur ses tags associés.

Watchdog vous suggère également des monitors que vous pouvez créer afin d'être prévenu en cas d'anomalie. Puisque ces monitors n'existent pas encore, ils possèdent le statut `suggested` dans le tableau. Cliquez sur **Enable Monitor** pour activer un monitor suggéré pour votre organisation. Utilisez les icônes qui s'affichent pour ouvrir, modifier, dupliquer, désactiver ou supprimer le nouveau monitor.

## Watchdog Alert Explorer

Vous pouvez utiliser le sélecteur d'intervalle, la barre de recherche ou des facettes pour filtrer votre flux d'alertes Watchdog.

* **Sélecteur d'intervalle** : utilisez le sélecteur d'intervalle en haut à droite pour afficher les alertes détectées lors d'un intervalle spécifique. Vous pouvez afficher toutes les alertes qui ont été générées au cours des six derniers mois.
* **Barre de recherche** : saisissez du texte dans la barre de recherche **Filter alerts** pour effectuer une recherche parmi les titres de vos alertes.
* **Facettes** : les facettes de recherche affichées ci-dessous sont disponibles dans la partie gauche du flux d'alertes Watchdog. Cochez les cases correspondantes pour filtrer vos alertes par facette.

Facettes disponibles :

| Groupe d'alertes    | Description                                                                     |
|---------------------|---------------------------------------------------------------------------------|
| Catégorie d'alerte      | Afficher toutes les alertes `apm`, `infrastructure` ou `logs`.                          |
| Type d'alerte          | Permet de sélectionner des alertes en utilisant les métriques des intégrations APM ou Infrastructure.            |
| Statut d'alerte        | Permet de sélectionner des alertes en fonction de leur statut (`ongoing`, `resolved` ou `expired`).     |
| Tag primaire APM     | Le [tag primaire APM][6] dont les alertes doivent être affichées.                        |
| Environnement         | L'environnement dont les alertes doivent être affichées. Consultez la section [Tagging de service unifié][5] pour en savoir plus sur le tag `env`.|
| Service             | Le service dont les alertes doivent être affichées. Consultez la section [Tagging de service unifié][5] pour en savoir plus sur le tag `service`.|
| Utilisateur final concerné   | (RUM requis) Facette disponible si Watchdog détermine que des utilisateurs finaux sont concernés par l'anomalie. Consultez la section [Analyse de l'impact Watchdog][4] pour en savoir plus. |
| Cause fondamentale          | (APM requis) Facette disponible si Watchdog a identifié la cause à l'origine d'une anomalie ou d'un échec critique. Consultez la section [Watchdog RCA][9] pour en savoir plus. |
| Équipe                | L'équipe responsable des services impactés. Ces informations sont enrichies à partir du [catalogue des services][7].  |
| Type d'anomalie dans les logs    | Afficher uniquement les anomalies de ce type. Les types pris en charge comprennent les nouveaux patterns de log et les patterns de logs existants qui ont augmenté.|
| Source des logs          | Afficher uniquement les alertes contenant des logs de cette source.                           |
| Statut des logs          | Afficher uniquement les alertes contenant des logs avec ce statut.                         |

## Couverture des alertes Watchdog

Les alertes Watchdog s'appliquent à un grand nombre de métriques relatives à vos applications et à votre infrastructure :

{{< tabs >}}
{{% tab "Log Management" %}}

Les logs ingérés sont analysés au niveau de l'admission. Watchdog agrège les logs en fonction de certains patterns détectés ainsi que des tags `environment`, `service`, `source` et `status`. Ces logs agrégés sont ensuite analysés afin d'identifier différents comportements anormaux, notamment :

* Une augmentation du nombre de logs possédant un statut d'avertissement ou d'erreur
* Une hausse soudaine du nombre de logs possédant un statut d'avertissement ou d'erreur

Toutes les anomalies de log sont présentées sous la forme d'[insights][3] dans le Log Explorer. Elles tiennent compte du contexte de recherche ainsi que des restrictions appliquées à votre rôle. Les anomalies de log qui sont considérées par Watchdog comme `severe` sont affichées dans le [Watchdog Alert Explorer][1]. Vous pouvez créer des alertes à propos de ces anomalies en configurant un [monitor de log Watchdog][2]. Une anomalie de type `severe` répond aux critères suivants :

* Elle contient des logs d'erreur.
* Elle dure au moins 10 minutes (pour éviter les erreurs passagères).
* Elle est caractérisée par une forte augmentation (pour ignorer les hausses négligeables).
* Elle possède un score `noise` peu élevé (pour ne pas générer de nombreuses alertes liées à un même service). Le score `noise` est calculé au niveau du service. Il tient compte des éléments suivants :
    * Le nombre de patterns d'erreur (plus ce nombre est élevé, plus le score est élevé)
    * La similarité des patterns (plus les patterns sont proches, plus le score est élevé)

#### Historique de données requis

Pour déterminer le comportement attendu, Watchdog nécessite certaines données. Pour les anomalies de log, vous devez disposer au minimum d'un historique de 24 heures. Dès lors que cet historique est disponible, Watchdog commence à identifier les anomalies. L'historique s'améliore au fur et à mesure. Pour des performances optimales, un historique de six semaines est nécessaire.

#### Désactiver la détection des anomalies de log

Pour désactiver la détection des anomalies de log, accédez à la [page Log Management pipeline][4], puis cliquez sur le bouton Log Anomalies.

[1]: https://app.datadoghq.com/watchdog
[2]: /fr/monitors/types/watchdog/
[3]: /fr/watchdog/insights?tab=logmanagement#explore-insights
[4]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "APM" %}}

Watchdog analyse tous les services et toutes les ressources afin de détecter des anomalies basées sur les métriques suivantes :

  * Taux d'erreur
  * Latence
  * Hits (taux de requête)

Watchdog ne tient pas compte des endpoints et services peu utilisés, afin de réduire les alertes superflues et d'éviter de générer des anomalies pour de faibles volumes de trafic. En outre, si une anomalie concernant le taux de requête est détectée, mais qu'elle n'a aucune incidence sur la latence ni sur le taux d'erreur, elle est ignorée.

#### Historique de données requis

Pour déterminer le comportement attendu, Watchdog nécessite certaines données. Pour les anomalies de métrique, vous devez disposer au minimum d'un historique de deux semaines. Dès lors que cet historique est disponible, Watchdog commence à identifier les anomalies. L'historique s'améliore au fur et à mesure. Pour des performances optimales, un historique de six semaines est nécessaire.

{{% /tab %}}
{{% tab "USM" %}}

Watchdog analyse tous les services et toutes les ressources afin de détecter des anomalies basées sur les métriques suivantes :

  * Taux d'erreur
  * Latence
  * Hits (taux de requête)

Watchdog ne tient pas compte des endpoints et services peu utilisés, afin de réduire les alertes superflues et d'éviter de générer des anomalies pour de faibles volumes de trafic. En outre, si une anomalie concernant le taux de requête est détectée, mais qu'elle n'a aucune incidence sur la latence ni sur le taux d'erreur, elle est ignorée.

#### Historique de données requis

Pour déterminer le comportement attendu, Watchdog nécessite certaines données. Pour les anomalies de métrique, vous devez disposer au minimum d'un historique de deux semaines. Dès lors que cet historique est disponible, Watchdog commence à identifier les anomalies. L'historique s'améliore au fur et à mesure. Pour des performances optimales, un historique de six semaines est nécessaire.

{{% /tab %}}
{{% tab "Infrastructure" %}}

Watchdog analyse les métriques d'infrastructure provenant des intégrations suivantes :

  * [System][1], pour l'utilisation de la mémoire (fuites de mémoire) et le taux de retransmissions TCP au niveau des hosts.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Docker][13]
  * [Kubernetes][14]
  * [Amazon Web Services][5] :
    * [S3][6]
    * [ELB/ALB/NLB][7]
    * [CloudFront][8]
    * [DynamoDB][9]
    * [RDS][10]
    * [ECS][11]
    * [Lambda][12]

#### Historique de données requis

Pour déterminer le comportement attendu, Watchdog nécessite certaines données. Pour les anomalies de métrique, vous devez disposer au minimum d'un historique de deux semaines. Dès lors que cet historique est disponible, Watchdog commence à identifier les anomalies. L'historique s'améliore au fur et à mesure. Pour des performances optimales, un historique de six semaines est nécessaire.

[1]: /fr/integrations/system/
[2]: /fr/integrations/redisdb/
[3]: /fr/integrations/postgres/
[4]: /fr/integrations/nginx/
[5]: /fr/integrations/amazon_web_services/
[6]: /fr/integrations/amazon_s3/
[7]: /fr/integrations/amazon_elb/
[8]: /fr/integrations/amazon_cloudfront/
[9]: /fr/integrations/amazon_dynamodb/
[10]: /fr/integrations/amazon_rds/
[11]: /fr/containers/amazon_ecs/?tab=awscli
[12]: /fr/serverless/
[13]: /fr/containers/docker/?tab=standard
[14]: /fr/containers/kubernetes/installation/?tab=operator
{{% /tab %}}
{{< /tabs >}}

### Détection personnalisée des anomalies

Watchdog se base sur les mêmes algorithmes saisonniers que ceux des monitors et dashboards. Pour détecter des anomalies en fonction d'autres métriques, ou pour personnaliser le degré de sensibilité, choisissez l'un des algorithmes suivants :

* [Monitors d'anomalie][10]
* [Monitors de prévision][11]
* [Monitors de singularité][12]

## Emplacement des alertes Watchdog

Vous pouvez retrouver les alertes Watchdog à différents endroits de la plateforme Datadog :

* Dans le [Watchdog Alert Explorer][1]
* Sur n'importe quelle [page d'un service APM][3]
* Dans le [catalogue des services][7]
* Dans le [volet Watchdog Insights][8], qui est disponible dans toutes les vues Explorer

### Symbole de jumelles Watchdog sur les pages APM

Lorsque Watchdog détecte une irrégularité au niveau d'une métrique APM, l'icône rose en forme de jumelles Watchdog s'affiche en regard du service concerné dans le [catalogue des services APM][7].

{{< img src="watchdog/service_list.png" alt="Capture d'écran du catalogue des services, avec cinq services. Une icône rose en forme de jumelles est visible à côté du nom du service web-store." style="width:75%;" >}}

Pour afficher plus de détails sur l'anomalie de métrique, accédez à la partie supérieure d'une [page Service][3] depuis le carrousel [Watchdog Insights][8].

L'icône Watchdog apparaît également sur les graphiques de métriques.

{{< img src="watchdog/latency_graph.png" alt="Un graphique illustrant la latence d'un service, en secondes, sur l'axe des ordonnées et l'heure de la journée sur l'axe des abscisses. Le graphique est représenté sur un fond rose et le texte May 2: 13:31 Ongoing apparaît en haut." style="width:75%;" >}}

Cliquez sur l'icône en forme de jumelles pour afficher une fiche d'alerte Watchdog comportant plus de détails sur l'anomalie.

## Gérer les alertes archivées

Pour archiver une alerte Watchdog, ouvrez le volet latéral, puis cliquez sur l'icône de dossier en haut à droite. L'alerte n'apparaît alors plus dans l'Explorer, ni dans les autres sections de Datadog, comme votre page d'accueil. Lorsque vous archivez une alerte, l'icône rose en forme de jumelles Datadog ne s'affiche plus en regard du service ou de la ressource concerné.

Pour afficher les alertes archivées, cochez la case **Show _N_ archived alert** en haut à gauche du [Watchdog Alert Explorer][1]. Cette option est uniquement disponible si au moins une alerte est archivée. Vous pouvez aussi consulter les personnes qui ont archivé les alertes et la date d'archivage. Il est également possible de restaurer les alertes archivées afin qu'elles s'affichent à nouveau dans votre flux.

**Remarque** : l'archivage d'une anomalie n'empêche pas Watchdog de signaler d'autres éventuels problèmes affectant le service ou la ressource.

[1]: /fr/watchdog
[3]: /fr/tracing/services/service_page/
[4]: /fr/watchdog/impact_analysis/
[5]: /fr/getting_started/tagging/unified_service_tagging/
[6]: /fr/tracing/guide/setting_primary_tags_to_scope/
[7]: /fr/tracing/service_catalog/
[8]: /fr/watchdog/insights?tab=logmanagement#explore-insights
[9]: /fr/watchdog/rca/
[10]: /fr/monitors/types/anomaly/
[11]: /fr/monitors/types/forecasts/?tab=linear
[12]: /fr/monitors/types/outlier/?tab=dbscan