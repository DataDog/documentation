---
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Tarification
  text: Tarification Datadog
title: Tarification
---

Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page [Tarifs][1]. Sauf mention contraire dans votre commande, Datadog calcule le prix facturé en fonction de votre utilisation du produit durant chaque mois calendaire. Voici les unités de tarification les plus courantes :

## Surveillance d'infrastructure

* Un **host** est une instance de système d'exploitation physique ou virtuel. Le nombre de hosts uniques que vous surveillez dans le service Infrastructure de Datadog est mesuré toutes les heures.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le mois de février fait office d'exception : le prix est alors calculé selon la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Un **conteneur** est un environnement d'exploitation autonome qui comprend une application ainsi que des paramètres et des bibliothèques de système d'exploitation limités. Le nombre de conteneurs uniques que vous surveillez dans le service Infrastructure de Datadog est mesuré toutes les cinq minutes. Chaque mois, Datadog facture le nombre d'heures de surveillance de vos conteneurs, calculé proportionnellement.
* Une [**métrique custom**][2] est une combinaison unique composée d'un nom de métrique, d'un ID de host et de tags. Le prix facturé par Datadog est calculé en fonction du nombre mensuel moyen de métriques custom uniques envoyées au service Infrastructure Datadog par heure.
* Un **appareil** est un capteur physique comprenant un ou plusieurs ordinateurs à carte unique dans un boîtier. Datadog mesure et facture le nombre d'appareils et de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog.
* Une **tâche Fargate** AWS est une collection de conteneurs configurée via la plateforme d'orchestration de conteneurs ECS d'AWS. Le nombre d'instances de tâches que vous surveillez dans le service Infrastructure de Datadog (ou APM) est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre total d'heures d'exécution et de surveillance de vos applications.

## APM

* Si une application exécutée sur un host (tel que défini dans [Surveillance d'infrastructure](#surveillance-d-infrastructure)) génère des traces et les transmet à l'application SaaS Datadog, Datadog considère ce host comme un **host APM**.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le mois de février fait office d'exception : le prix est alors calculé selon la neuvième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Une **span indexée** est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de spans indexées par des [filtres de rétention][3] dans l'APM Datadog.
* Une **span ingérée** est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de gigaoctets de spans ingérées par l'APM Datadog.

Vous pouvez mettre en place des contrôles afin de limiter les volumes de spans ingérées et indexées. Pour en savoir plus, consultez la documentation relative à l'[ingestion][4] et la [rétention][5] de traces.

## Database Monitoring

* Datadog enregistre le nombre de hosts de base de données uniques que vous surveillez toutes les heures grâce à la solution Database Monitoring.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le mois de février fait office d'exception : le prix est alors calculé selon la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Le prix facturé par Datadog est calculé en fonction du nombre total de [requêtes normalisées][6] configurées qui sont surveillées à un moment donné.

## Log Management

* Un **log** est un enregistrement au format texte de l'activité générée par un système d'exploitation, une application ou d'autres sources. Datadog facture les logs ingérés en fonction du nombre total de gigaoctets envoyés au service Logs de Datadog.
* Un **événement de log** est un log indexé par le service Logs de Datadog. Le prix facturé par Datadog est calculé par tranche de million d'événements de log envoyés pour indexation en appliquant le tarif désigné dans la stratégie de rétention pour laquelle vous avez optée.

## Cloud SIEM

* Un **log analysé** est un enregistrement au format texte de l'activité générée par un système d'exploitation, une application ou d'autres sources qui a été analysé pour détecter les menaces de sécurité potentielles. Datadog facture les logs analysés en fonction du nombre total de gigaoctets ingérés et analysés par le service Cloud SIEM de Datadog.

## Surveillance Synthetic

* Un **test API** est une requête HTTP ou HTTPS effectuée via une URL unique. Le prix facturé par Datadog est calculé par tranche de dix mille exécutions de tests API auprès du service de surveillance Datadog Synthetic.
* Un **test Browser** permet de simuler une séquence d'actions utilisateur scriptée sur une application Web à l'aide d'un navigateur Web virtualisé. Le prix facturé par Datadog est calculé par tranche de mille tests Browser exécutés auprès du service de surveillance Datadog
 Synthetic.

## Network Performance Monitoring

* Le nombre de hosts que vous surveillez en même temps via le service **Network Performance Monitoring** (NPM) de Datadog est mesuré toutes les heures.
  * Ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le mois de février fait office d'exception : le prix est alors calculé selon la huitième mesure la plus élevée.
* En outre, le nombre total de flux utilisés par tous les hosts NPM est mesuré chaque mois par Datadog. Un **flux** correspond à un enregistrement du trafic envoyé et reçu entre une source (IP:Port) et une destination (IP:Port), mesuré sur une période de cinq minutes.

## Real User Monitoring

* Une **session** correspond à une visite de votre application Web par un utilisateur. Elle expire au bout de 15 minutes d'inactivité ou de 4 heures d'activité continue.

* Datadog recueille toutes les pages consultées par vos utilisateurs finaux avec les données de télémétrie pertinentes : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend et tâches longues. Tous ces éléments sont inclus dans la session utilisateur. Le prix facturé par Datadog est calculé par tranche de mille (1 000) sessions ingérées dans le service Real User Monitoring (RUM) de Datadog.

## Profileur en continu

* Le nombre de hosts uniques que vous surveillez en même temps via le service Profileur en continu de Datadog est mesuré toutes les heures.
  * Ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le mois de février fait office d'exception : le prix est alors calculé selon la huitième mesure la plus élevée.
  * Chaque host bénéficie gratuitement de quatre conteneurs profilés. Chaque conteneur supplémentaire coûte 2 $.
    **Remarque** : ce quota est agrégé pour tous les hosts. Si vous avez une moyenne de quatre conteneurs sur l'ensemble de vos hosts, les conteneurs supplémentaires ne vous sont pas facturés pour chaque host séparément.
* Datadog mesure le nombre total de conteneurs qui sont profilés. Un conteneur est un environnement d'exploitation autonome qui comprend une application ainsi que des paramètres et des bibliothèques de système d'exploitation limités. Le nombre de conteneurs uniques que vous surveillez avec le service Profileur en continu de Datadog est mesuré toutes les cinq minutes. Chaque mois, Datadog facture le nombre d'heures de surveillance de vos conteneurs, calculé proportionnellement. Pour le service Profileur en continu, Datadog comptabilise uniquement les conteneurs qui exécutent le service Profileur en continu dans le nombre total de conteneurs surveillés.

## Incident Management

* Datadog surveille le nombre d'utilisateurs actifs mensuels qui prennent part à la gestion des incidents et aux interventions connexes.
 * Un utilisateur est uniquement considéré comme **actif** lorsqu'il publie des commentaires ou des signaux (graphiques, liens, etc.) sur un incident. Toutes les personnes qui se contentent d'ouvrir ou de fermer un incident, ou simplement de le consulter, ne sont pas prises en compte. De plus, le calcul ne se base pas sur un système d'attribution de postes. Vous n'avez donc pas besoin d'identifier les utilisateurs qui accèdent aux incidents.

## CI Visibility

* Datadog suit le nombre unique d'auteurs de commit qui envoient des données de test et de pipeline vers le service CI Visibility.
* Un **auteur de commit** désigne un auteur de commit actif sur Git, identifié par son adresse e-mail Git. Un auteur de commit est pris en compte dans la facturation s'il effectue au moins trois commit au cours d'un mois donné.
  * Si un pipeline n'est associé à aucun dépôt Git ou que les métadonnées Git ne sont pas disponibles, le nom d'utilisateur de la personne qui a déclenché l'exécution du pipeline est utilisé pour la facturation.
* En ce qui concerne la visibilité sur les pipelines, chaque pipeline, étape de pipeline et tâche de pipeline est comptabilisée comme une **span de pipeline**. En ce qui concerne la visibilité sur les tests, chaque exécution de test est comptabilisée comme une **span de test**.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][7].

Contactez le [service commercial][8] ou votre [chargé de compte][9] pour toute question concernant la tarification horaire ou la facturation pour votre compte.

[1]: https://www.datadoghq.com/pricing
[2]: /fr/metrics/custom_metrics/
[3]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /fr/tracing/trace_pipeline/ingestion_controls/
[5]: /fr/tracing/trace_pipeline/trace_retention/
[6]: /fr/database_monitoring/data_collected/#normalized-queries
[7]: /fr/help/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com