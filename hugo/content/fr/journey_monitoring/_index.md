---
description: Surveillez et analysez les flux utilisateur critiques pour résoudre les
  problèmes d'expérience utilisateur et les problèmes techniques.
title: Journey Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="Rejoignez la Preview !">}}
Journey Monitoring est en Preview.
{{< /callout >}}

## Présentation {#overview}

**Journey Monitoring** vous permet de suivre la santé des flux utilisateur critiques tels que la connexion, le paiement ou le streaming multimédia, le tout depuis un seul endroit. Pour tout flux donné, vous pouvez répondre à :
- Les utilisateurs rencontrent-ils des difficultés ?
- Quelle est la rapidité et la fiabilité des performances ?
- Les problèmes proviennent-ils du frontend, du réseau ou du backend ?

Un *parcours* est un flux utilisateur défini par un événement de début et un événement de fin. Par exemple, un parcours de paiement capture l'expérience depuis l'arrivée de l'utilisateur sur la page de paiement jusqu'à la finalisation du processus de paiement. Journey Monitoring rassemble des données provenant de [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3] et [Session Replay][4] pour afficher le trafic, les taux de conversion, la disponibilité et les erreurs pour chaque parcours dans un seul rapport.

Cela offre aux équipes d'ingénierie, de produit et d'opérations de développement une vue partagée de la santé des parcours sans avoir à basculer entre les outils.

{{< img src="journey_monitoring/journey-monitoring-map-2.png" alt="La carte Journey Monitoring affiche un catalogue de parcours sur la gauche avec des métriques de trafic et de conversion, et une carte de flux visuelle sur la droite affichant les chemins utilisateur entre les vues et les actions de l'application." style="width:100%;" >}}

## Fonctionnalités {#capabilities}

Pour chaque parcours, vous pouvez :
- Mesurer le trafic entrant, le taux de conversion et le temps de réalisation du parcours
- Suivre la disponibilité du parcours à l'aide d'un SLO de disponibilité basé sur sa [collection de tests Synthetic][10]
- Identifier où les utilisateurs abandonnent et enquêter sur des sessions individuelles avec [Session Replay][4]
- Mesurer les performances des étapes critiques du parcours avec des [opérations RUM][13]
- Partager une vue unifiée de la santé des parcours avec les équipes d'ingénierie, de produit et d'opérations de développement

## Prérequis {#prerequisites}

Journey Monitoring nécessite **au moins un** des produits suivants activés dans les applications frontend, chacun contribuant à fournir des données différentes pour vos parcours :

- **[RUM without Limits][5]** : suivi des erreurs frontend et des performances via les opérations RUM.
- **[Product Analytics][8]** : métriques de trafic, de taux de conversion et de temps de conversion.
- **[Synthetic Browser Tests][6] ou [Synthetic Mobile Tests][7]** : suivi de la disponibilité via la collection de tests créée automatiquement pour le parcours.

## Structure du parcours {#journey-structure}

Le début et la fin d'un parcours peuvent être des événements d'action ou de vue provenant de [Real User Monitoring][1].

Chaque parcours peut comporter une ou plusieurs variantes. Une variante est une séquence spécifique d'étapes intermédiaires qu'un utilisateur suit entre le début et la fin du parcours. Les différents utilisateurs empruntent naturellement des chemins différents. Par exemple, certains peuvent ignorer des étapes facultatives tandis que d'autres font des détours avant de terminer le parcours.

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="Diagramme d'un parcours avec un événement de début, un événement de fin et trois variantes, surveillé par RUM et Product Analytics dans l'environnement réel et par des tests Synthetic dans l'environnement synthétique." style="width:100%;" >}}

## Configuration {#setup}

Définissez un parcours en sélectionnant ses événements de début et de fin, puis étendez la couverture avec les données de vos autres produits Digital Experience.

### Étape 1 - Créer un parcours {#step-1-create-a-journey}

1. Accédez à **Digital Experience > Journey Monitoring**.
2. Cliquez sur **New Journey** ou sélectionnez un [parcours suggéré][11].

### Étape 2 - Spécifier les détails du parcours {#step-2-specify-journey-details}

1. Sélectionnez une application Frontend.
2. Ajoutez un nom de parcours.
3. Sélectionnez un ou plusieurs événements de début.
4. Sélectionnez un ou plusieurs événements de fin.
5. Click **Save Journey**.

Le graphique en entonnoir de droite se met à jour automatiquement en fonction des événements de début et de fin sélectionnés. L'entonnoir affiche le volume, le taux de conversion et le temps moyen de réalisation pour chaque étape.

**Remarque** : Les champs obligatoires sont pré-remplis si vous partez d'un parcours suggéré.

Vous pouvez également ajouter une description, des filtres d'attributs, une équipe responsable, des tags et des [variantes][9]. Cliquer sur **Save Journey** crée le parcours et vous redirige vers le [rapport de détails][12] du parcours. Le rapport de détails inclut des métriques sur le volume, le taux de conversion et le temps moyen de réalisation du parcours.

### Étape 3 - Ajouter une couverture à partir d'autres produits {#step-3-add-coverage-from-other-products}

Dans le rapport de détails du parcours, vous pouvez étendre la couverture de surveillance en fonction des produits dont vous disposez :

- Créez des [opérations RUM][13] pour surveiller les performances des étapes critiques du parcours dans votre environnement utilisateur réel
- Ajoutez des tests Synthetic à la [collection de tests][14] du parcours pour commencer à suivre la disponibilité

Si vous avez déjà des opérations RUM ou des tests Synthetic pré-créés qui couvrent le parcours, Datadog affiche l'opération ou le test dans le rapport de détails du parcours.

## Métriques {#metrics}

Chaque parcours et ses variantes disposent des métriques de performance suivantes :
- **Trafic** : Nombre total de tentatives de parcours au cours des sessions utilisateur. Basé sur la métrique `rum.measure.journey`.
- **Conversion** : Pourcentage de tentatives de parcours ayant abouti. Basé sur la métrique `rum.measure.journey`.
- **Temps de conversion** : Temps moyen nécessaire pour terminer le parcours sur l'ensemble des sessions utilisateur. Basé sur la métrique `rum.measure.journey.duration`.
- **Uptime** : Disponibilité du parcours basée sur l'uptime de sa [collection de tests Synthetic][14].

## Prochaines étapes {#whats-next}

{{< whatsnext desc="Explorez Journey Monitoring:" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>Map</strong>: Visualisez tous vos parcours ainsi que leurs métriques de trafic et de conversion.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>Suggested Journeys</strong> : Obtenez des suggestions de parcours générées automatiquement en fonction du comportement réel des utilisateurs dans votre application.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>Details Report</strong> : Analysez le trafic, la conversion, les erreurs et la disponibilité d'un parcours dans un rapport unifié.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>Variants</strong> : Suivez et comparez les différents chemins empruntés par les utilisateurs au cours d'un parcours.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>Uptime</strong> : Mesurez la disponibilité d’un parcours grâce à une collection de tests Synthetic créée automatiquement.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/real_user_monitoring/
[2]: /fr/synthetics/
[3]: /fr/product_analytics/
[4]: /fr/session_replay/
[5]: /fr/real_user_monitoring/rum_without_limits/
[6]: /fr/synthetics/browser_tests/
[7]: /fr/synthetics/mobile_app_testing/
[8]: /fr/product_analytics/
[9]: /fr/journey_monitoring/details_report/variants/
[10]: /fr/journey_monitoring/uptime/
[11]: /fr/journey_monitoring/map/suggested_journeys/
[12]: /fr/journey_monitoring/details_report/
[13]: /fr/real_user_monitoring/operations_monitoring/
[14]: /fr/synthetics/test_suites/#service-level-objectives