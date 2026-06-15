---
aliases:
- /fr/graphing/dashboards/widgets
- /fr/graphing/faq/widgets
- /fr/graphing/widgets
description: Blocs de construction de tableau de bord pour visualiser et corréler
  des données à travers l'infrastructure avec divers types de graphiques et d'affichages.
further_reading:
- link: /dashboards/
  tag: Documentation
  text: En savoir plus sur les tableaux de bord
- link: /dashboards/widgets/configuration
  tag: Documentation
  text: Découvrez les options de configuration des widgets et les meilleures pratiques
- link: /dashboards/widgets/types/
  tag: Documentation
  text: Explorez tous les types de widgets disponibles
title: Taux
---
## Aperçu {#overview}

Les widgets de tableau de bord sont des représentations visuelles des données. Ils servent de blocs de construction pour vos [tableaux de bord][2] afin de visualiser et de corréler vos données à travers votre infrastructure. Ils peuvent contenir différents types d'informations, telles que des graphiques, des images, des journaux et des statuts, pour vous donner un aperçu de vos systèmes et environnements.

## Commencer {#get-started}

Le moyen le plus rapide d'intégrer des widgets pertinents à vos données est de cloner un tableau de bord à partir de la [liste prédéfinie][1] qui inclut des tableaux de bord créés par d'autres membres de votre organisation et des modèles prêts à l'emploi pour vos intégrations installées. Après avoir cloné un tableau de bord, vous pouvez personnaliser les widgets selon votre cas d'utilisation.


{{< whatsnext desc="Guides et cours supplémentaires pour en savoir plus sur les widgets :" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}<u>Commencer avec les tableaux de bord</u> : Guide pour construire un tableau de bord avec des widgets{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}<u>Widgets de graphique de tableau de bord</u> : Cours du centre d'apprentissage expliquant comment créer, configurer et utiliser des widgets de graphique de tableau de bord{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}<u>Introduction aux tableaux de bord</u> : Cours du centre d'apprentissage expliquant comment construire un tableau de bord dans un environnement de test{{< /nextlink >}}
{{< /whatsnext >}}

### Ajouter un widget à votre tableau de bord {#add-a-widget-to-your-dashboard}

Pour commencer à utiliser des widgets dans vos tableaux de bord :

1. Accédez à la [Liste des tableaux de bord][1] dans Datadog.
2. Cliquez sur {{< ui >}}New Dashboard{{< /ui >}} ou sélectionnez un tableau de bord existant à modifier.
3. Cliquez sur {{< ui >}}Add Widget{{< /ui >}}. Choisissez parmi une variété de types de widgets tels que les séries temporelles, les graphiques à barres, les tableaux ou les flux d'événements.
4. Configurez votre widget :
    - Sélectionnez la source de données : Choisissez des métriques, des journaux, des traces ou d'autres sources de données.
    - Personnalisez la visualisation : Ajustez les paramètres d'affichage, les unités et les périodes pour répondre à vos besoins.
    - Ajoutez du contexte : Utilisez des liens personnalisés, un formatage conditionnel et un regroupement pour des informations améliorées.
5. Enregistrez votre tableau de bord et partagez-le avec votre équipe ou à l'extérieur si nécessaire.

Pour plus d'informations, consultez [Configuration des widgets][3] et explorez les [Types de widgets][4] disponibles.

### Organisez les widgets avec des onglets {#organize-widgets-with-tabs}

À mesure que les tableaux de bord se développent, utilisez des onglets pour regrouper les widgets en sections nommées. En mode édition, ouvrez le menu de partage d'un widget et sélectionnez **Déplacer vers l'onglet** pour l'assigner à un onglet existant ou en créer un nouveau. Les onglets apparaissent sous forme de barre de navigation en haut du tableau de bord, permettant aux utilisateurs de naviguer directement vers la section dont ils ont besoin. Pour plus d'informations, consultez [Onglets][5].

## Sources de données {#data-sources}

Les widgets peuvent visualiser des données provenant de plusieurs sources Datadog, y compris :

- **APM Traces** : Données de surveillance des performances des applications
- **Événements** : Événements personnalisés, déploiements et annotations
- **Journaux** : Événements de journal, analyses de journaux et métriques basées sur les journaux
- **Métriques** : Infrastructure, application et métriques personnalisées
- **RUM** : Surveillance des utilisateurs réels et données de tests synthétiques
- **SLOs** : Objectifs de niveau de service et budgets d'erreur
- **Sécurité** : Signaux de sécurité et données de conformité

## Cas d'utilisation courants {#common-use-cases}

{{% collapse-content title="Surveillance d'infrastructure" level="h4" expanded=false %}}
- Utilisez **des widgets Timeseries** pour les métriques CPU, mémoire et réseau dans le temps
- Utilisez **des widgets Hostmap** pour visualiser l'utilisation des ressources dans votre infrastructure
- Utilisez **des widgets Top List** pour identifier les hôtes ou services les plus gourmands en ressources
{{% /collapse-content %}}

{{% collapse-content title="Performances de l'application" level="h4" expanded=false %}}
- Utilisez **des widgets Timeseries** pour suivre les temps de réponse, les taux d'erreur et le débit
- Utilisez **des widgets Service Summary** pour des aperçus de la santé des services à un niveau élevé
- Utilisez **des widgets Topology Map** pour visualiser les dépendances des services et le flux de données
{{% /collapse-content %}}

{{% collapse-content title="Business Intelligence" level="h4" expanded=false %}}
- Utilisez **des widgets Query Value** pour les indicateurs de performance clés et les métriques commerciales
- Utilisez **des widgets Funnel** pour suivre la conversion des utilisateurs à travers votre application
- Utilisez **des widgets Retention** pour analyser l'engagement des utilisateurs et le taux de désabonnement
{{% /collapse-content %}}

{{% collapse-content title="Réponse aux incidents" level="h4" expanded=false %}}
- Utilisez **des widgets Alert Graph** pour montrer l'historique et les tendances des alertes
- Utilisez **des widgets Monitor Summary** pour l'état actuel des alertes dans votre infrastructure
- Utilisez **des widgets Event Stream** pour la surveillance des événements en temps réel
{{% /collapse-content %}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/1
[2]: /fr/dashboards/
[3]: /fr/dashboards/widgets/configuration/
[4]: /fr/dashboards/widgets/types/
[5]: /fr/dashboards/configure/#tabs