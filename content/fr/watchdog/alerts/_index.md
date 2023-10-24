---
kind: documentation
title: Alertes Watchdog
---

## Présentation

La fonctionnalité d'alertes Watchdog détecte de manière proactive les anomalies liées à vos services, votre infrastructure et vos logs. Watchdog analyse toutes vos technologies surveillées en vue de détecter tout comportement inhabituel. Si le comportement inhabituel correspond à un pattern d'anomalie Watchdog, une alerte est alors créée.

## Alertes

### Emplacement des alertes Watchdog

Vous pouvez retrouver les alertes Watchdog à trois endroits différents sur le site Datadog :
- Dans le [flux d'alertes Watchdog][1]
- Sur la [page d'accueil d'APM][2]
- Sur la [page d'un service APM][3]

### Aperçu de l'alerte

Chaque carte d'aperçu d'une alerte affiche des informations sur une anomalie.

{{< img src="watchdog/alerts/alerts_overview.png" alt="Capture d'écran d'une carte d'alerte Watchdog, avec un taux d'erreur élevé sur l'endpoint send-sms dans sms-service" style="width:100%;">}}

Chaque carte d'aperçu d'une alerte contient les sections ci-dessous :

1. Statut : l'anomalie peut être **ongoing** (en cours) ou **resolved** (résolue).
2. Timeline : indique la période pendant laquelle l'anomalie survient.
3. Message : description de l'anomalie.
4. Graphique : représentation visuelle de l'anomalie.
5. Tags : indique le contexte de l'anomalie.
6. [Impact][4] (si disponible) : présente les utilisateurs, les vues ou les services touchés par l'anomalie.

Pour masquer une alerte non pertinente, passez votre curseur sur cette alerte, puis cliquez sur l'icône du dossier en haut à droite.

### Détails de l'alerte

Cliquez n'importe où sur la carte d'aperçu d'une alerte pour ouvrir le volet des détails de l'alerte.

En plus de reprendre les informations de la carte d'aperçu, l'onglet **Overview** peut afficher un ou plusieurs des champs suivants :
- Expected Bounds : cochez la case **Show expected bounds**. Le graphique change de couleur pour différencier les comportements attendus des comportements anormaux.
- Suggested Next Steps : décrit les étapes à effectuer pour analyser et trier les comportements anormaux.
- Related dashboards : affiche des suggestions de dashboards liés à l'alerte. Datadog met en évidence les métriques du dashboard qui sont liées aux informations utiles sur l'alerte.

L'onglet **Monitors** répertorie les monitors associés à votre alerte. Pour chaque monitor affiché, la métrique de l'alerte actuelle et ses tags associés sont appliqués en tant que contexte.

Watchdog vous suggère également des monitors que vous pouvez créer afin d'être prévenu en cas d'anomalie. Comme ces monitors n'existent pas encore, ils ont le statut **suggested** dans le tableau. Cliquez sur **Enable Monitor** pour activer le monitor suggéré pour votre organisation. Utilisez les icônes qui s'affichent pour ouvrir, modifier, cloner, désactiver ou supprimer le nouveau monitor.

## Filtrer les alertes

Vous pouvez utiliser le sélecteur d'intervalle, la barre de recherche ou les facettes pour filtrer vos alertes Watchdog.

### Intervalle

Utilisez le sélecteur d'intervalle en haut à droite pour afficher les alertes détectées dans un intervalle spécifique. Vous pouvez afficher toutes les alertes qui se sont produites au cours des 13 derniers mois.

### Barre de recherche

Saisissez du texte dans la barre de recherche **Filter alerts** pour effectuer une recherche parmi les titres de vos alertes.

### Facettes

Les facettes de recherche affichées ci-dessous sont disponibles sur la gauche du flux d'alertes Watchdog. Cochez les cases correspondantes pour filtrer vos alertes par facette.

| Groupe d'alertes    | Description                                                           |
|---------------------|-----------------------------------------------------------------------|
| Catégorie d'alerte      | Afficher toutes les alertes `apm`, `infrastructure` ou `logs`.                |
| Type d'alerte          | Permet de sélectionner des alertes en utilisant les métriques des intégrations APM ou Infrastructure.  |
| Tag primaire APM     | Le [tag primaire APM][6] dont les alertes doivent être affichées.              |
| Environnement         | L'environnement dont les alertes doivent être affichées. Consultez la section [Tagging de service unifié][5] pour en savoir plus sur le tag `env`.                                                                                          |
| Service             | Le service dont les alertes doivent être affichées. Consultez la section [Tagging de service unifié][5] pour en savoir plus sur le tag `service`.                                                                                          |

| Groupe de logs      | Description                                                           |
|-----------------|-----------------------------------------------------------------------|
| Type d'anomalie dans les logs| Afficher uniquement les anomalies de ce type. Les types pris en charge comprennent les nouveaux patterns de log et les patterns de logs existants qui ont augmenté.                                                                                 |
| Source des logs      | Afficher uniquement les alertes contenant des logs de cette source.                 |
| Statut des logs      | Afficher uniquement les alertes contenant des logs avec ce statut.               |



## Gérer les alertes archivées

Dans le panneau latéral d'une alerte Watchdog, cliquez sur l'icône du dossier en haut à droite pour l'archiver. L'alerte sera alors masquée du flux ainsi que d'autres sections du site Datadog, comme la page d'accueil. Lorsque vous archivez une alerte, l'icône rose Watchdog en forme de jumelles n'apparaît plus à proximité du service ou de la ressource concerné(e).

Pour afficher les alertes archivées, cochez la case « Show N archived alerts » en haut à gauche du [flux d'alertes Watchdog][1]. L'option est disponible uniquement si au moins une alerte est archivée. Vous pouvez également voir les personnes qui ont archivé les alertes et à quelle date, ainsi que restaurer les alertes archivées dans votre flux.

**Remarque** : l'archivage d'une story n'empêche pas Watchdog de signaler d'autres éventuels problèmes affectant le service ou la ressource.

[1]: https://app.datadoghq.com/watchdog
[2]: https://app.datadoghq.com/apm/home
[3]: /fr/tracing/services/service_page/
[4]: /fr/watchdog/impact_analysis/
[5]: /fr/getting_started/tagging/unified_service_tagging/
[6]: /fr/tracing/guide/setting_primary_tags_to_scope/