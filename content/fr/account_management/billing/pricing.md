---
title: Tarification
kind: documentation
disable_toc: false
further_reading:
  - link: 'https://www.datadoghq.com/pricing'
    tag: Tarification
    text: Tarification Datadog
---
Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page des [Tarifs][1].

## Calcul du prix

Sauf mention contraire dans votre commande, Datadog calcule le prix facturé en fonction de votre utilisation du produit durant chaque mois calendaire. Voici les unités de tarification les plus courantes :

### Surveillance d'infrastructure

* Un **host** est une instance de système d'exploitation physique ou virtuel. Le nombre de hosts que vous surveillez en même temps dans le service Infrastructure de Datadog est mesuré toutes les heures.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Un **conteneur** est un environnement d'exploitation autonome qui comprend une application ainsi que des paramètres et des bibliothèques de système d'exploitation limités. Le nombre de conteneurs que vous surveillez actuellement dans le service Infrastructure de Datadog est mesuré toutes les cinq minutes. Chaque mois, Datadog facture le nombre d'heures de surveillance de vos conteneurs, calculé proportionnellement.
* Une [**métrique custom**][2] est une combinaison unique composée d'un nom de métrique, d'un ID de host et de tags. Le prix facturé par Datadog est calculé en fonction du nombre mensuel moyen de métriques custom uniques envoyées au service Infrastructure Datadog par heure.
* Un **appareil** est un capteur physique comprenant un ou plusieurs ordinateurs à carte unique dans un boîtier. Datadog mesure et facture le nombre d'appareils et de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog.
* Une **fonction cloud** correspond à du code d'application conçu pour s'exécuter sur le service de calcul sans serveur d'une plateforme cloud (par exemple, AWS Lambda, Google Cloud Function ou Azure Function) en réponse à des actions ou événements définis. Le service Infrastructure de Datadog mesure le nombre de fonctions exécutées ou invoquées au moins une fois par heure. Le prix facturé par Datadog est calculé en fonction du nombre moyen de fonctions sur toutes les heures du mois.
* Une **tâche Fargate** AWS est une collection de conteneurs configurée via la plateforme d'orchestration de conteneurs ECS d'AWS. Le nombre d'instances de tâches que vous surveillez dans le service Infrastructure de Datadog (ou l'APM) est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre total d'heures pendant lesquelles vos applications s'exécutaient et étaient surveillées.

### APM

* Le nombre de **hosts d'APM** que vous surveillez en même temps dans le service APM de Datadog est mesuré toutes les heures.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Une **span analysée** est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de spans analysées envoyées au service APM de Datadog.

### Log Management

* Un **log** est un enregistrement au format texte de l'activité générée par un système d'exploitation, une application ou d'autres sources. Datadog facture les logs ingérés en fonction du nombre total de gigaoctets envoyés au service Logs de Datadog.
* Un **événement de log** est un log indexé par le service Logs de Datadog. Le prix facturé par Datadog est calculé par tranche de million d'événements de log envoyés pour indexation en appliquant le tarif désigné dans la stratégie de rétention pour laquelle vous avez optée.

### Synthetics

* Un **test API** est une requête HTTP ou HTTPS effectuée via une URL unique. Le prix facturé par Datadog est calculé par tranche de dix mille exécutions de tests API auprès du service Datadog Synthetics.
* Un **test Browser** permet de simuler une séquence d'actions utilisateur scriptée sur une application Web à l'aide d'un navigateur Web virtualisé. Le prix facturé par Datadog est calculé par tranche de mille tests Browser exécutés auprès du service Datadog Synthetics.

### Surveillance des performances réseau

* Le nombre de hosts que vous surveillez en même temps via le service **surveillance des performances réseau** (NPM) de Datadog est mesuré toutes les heures.
  * Ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
* En outre, le nombre total de flux utilisés par tous les hosts NPM est mesuré chaque mois par Datadog. Un **flux** correspond à un enregistrement du trafic envoyé et reçu entre une source (IP:Port) et une destination (IP:Port), mesuré sur une période de cinq minutes.

### Real User Monitoring

* Une **session** correspond à une visite de votre application Web par un utilisateur. Elle expire au bout de 15 minutes d'inactivité.

* Datadog collecte toutes les pages consultées par vos utilisateurs finaux avec les données de télémétrie pertinentes : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend et tâches longues. Tous ces éléments sont inclus dans la session utilisateur. Le prix facturé par Datadog est calculé par tranche de dix mille (10 000) sessions ingérées dans le service Real User Monitoring (RUM) de Datadog.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][3].

Contactez le [service commercial][4] ou votre [chargé de compte][5] pour toute question concernant la tarification horaire ou la facturation pour votre compte.

[1]: https://www.datadoghq.com/pricing
[2]: /fr/developers/metrics/custom_metrics
[3]: /fr/help
[4]: mailto:sales@datadoghq.com
[5]: mailto:success@datadoghq.com