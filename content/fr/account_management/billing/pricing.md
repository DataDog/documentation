---
title: Tarification
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/pricing
    tag: Tarification
    text: Tarification Datadog
---
Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page [Tarifs][1]. Sauf mention contraire dans votre commande, Datadog calcule le prix facturé en fonction de votre utilisation du produit durant chaque mois calendaire. Voici les unités de tarification les plus courantes :

## Surveillance d'infrastructure

* Un **host** est une instance de système d'exploitation physique ou virtuel. Le nombre de hosts uniques que vous surveillez dans le service Infrastructure de Datadog est mesuré toutes les heures.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Un **conteneur** est un environnement d'exploitation autonome qui comprend une application ainsi que des paramètres et des bibliothèques de système d'exploitation limités. Le nombre de conteneurs uniques que vous surveillez dans le service Infrastructure de Datadog est mesuré toutes les cinq minutes. Chaque mois, Datadog facture le nombre d'heures de surveillance de vos conteneurs, calculé proportionnellement.
* Une [**métrique custom**][2] est une combinaison unique composée d'un nom de métrique, d'un ID de host et de tags. Le prix facturé par Datadog est calculé en fonction du nombre mensuel moyen de métriques custom uniques envoyées au service Infrastructure Datadog par heure.
* Un **appareil** est un capteur physique comprenant un ou plusieurs ordinateurs à carte unique dans un boîtier. Datadog mesure et facture le nombre d'appareils et de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog.
* Une **fonction sans serveur** correspond à du code d'application conçu pour s'exécuter sur le service de calcul sans serveur d'une plateforme cloud (par exemple, AWS Lambda, Google Cloud Function ou Azure Function). Le prix facturé par Datadog est calculé en fonction du nombre total d'appels de fonction Lambda effectués en un mois.
* Une **tâche Fargate** AWS est une collection de conteneurs configurée via la plateforme d'orchestration de conteneurs ECS d'AWS. Le nombre d'instances de tâches que vous surveillez dans le service Infrastructure de Datadog (ou l'APM) est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre total d'heures pendant lesquelles vos applications s'exécutaient et étaient surveillées.

## APM

* Si un host (défini dans la [surveillance d'infrastructure](#surveillance-d-infrastructure)) reçoit des traces à partir d'une application instrumentée, Datadog le considère comme un **host d'APM**.
  * Avec une formule basée sur la limite supérieure, les mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Une **span indexée** est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de spans indexées par des [filtres de rétention][3] dans l'APM Datadog.
* Une **span ingérée** est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de gigaoctets de spans ingérées par l'APM Datadog.

Vous pouvez mettre en place des contrôles afin de limiter les volumes de spans ingérées et indexées. Pour en savoir plus, consultez la documentation relative aux [contrôles de rétention et d'ingestion des traces][4].

**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

## Surveillance de base de données

* Datadog enregistre le nombre de hosts de base de données uniques que vous surveillez toutes les heures grâce à la solution de surveillance des bases de données.
  * Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
  * Avec une formule mensuelle/horaire hybride (MHP), Datadog facture votre engagement mensuel minimum et applique un taux horaire par host/heure une fois cet engagement dépassé.
* Une **requête normalisée**, ou synthèse de requête, représente un agrégat de requêtes possédant une structure similaire et dont les seules différences résident dans les paramètres de requête. Le prix facturé par Datadog est calculé en fonction du nombre total de requêtes normalisées configurées qui sont surveillées à tout moment.

## Log Management

* Un **log** est un enregistrement au format texte de l'activité générée par un système d'exploitation, une application ou d'autres sources. Datadog facture les logs ingérés en fonction du nombre total de gigaoctets envoyés au service Logs de Datadog.
* Un **événement de log** est un log indexé par le service Logs de Datadog. Le prix facturé par Datadog est calculé par tranche de million d'événements de log envoyés pour indexation en appliquant le tarif désigné dans la stratégie de rétention pour laquelle vous avez optée.

## Security Monitoring

* Un **log analysé** est un enregistrement au format texte de l'activité générée par un système d'exploitation, une application ou d'autres sources qui a été analysé pour détecter les menaces de sécurité potentielles. Datadog facture les logs analysés en fonction du nombre total de gigaoctets ingérés et analysés par le service Security Monitoring de Datadog.

## Surveillance Synthetic

* Un **test API** est une requête HTTP ou HTTPS effectuée via une URL unique. Le prix facturé par Datadog est calculé par tranche de dix mille exécutions de tests API auprès du service de surveillance Datadog Synthetic.
* Un **test Browser** permet de simuler une séquence d'actions utilisateur scriptée sur une application Web à l'aide d'un navigateur Web virtualisé. Le prix facturé par Datadog est calculé par tranche de mille tests Browser exécutés auprès du service de surveillance Datadog
 Synthetic.

## Network Performance Monitoring

* Le nombre de hosts que vous surveillez en même temps via le service **surveillance des performances réseau** (NPM) de Datadog est mesuré toutes les heures.
  * Ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée.
* En outre, le nombre total de flux utilisés par tous les hosts NPM est mesuré chaque mois par Datadog. Un **flux** correspond à un enregistrement du trafic envoyé et reçu entre une source (IP:Port) et une destination (IP:Port), mesuré sur une période de cinq minutes.

## Real User Monitoring

* Une **session** correspond à une visite de votre application Web par un utilisateur. Elle expire au bout de 15 minutes d'inactivité ou de 4 heures d'activité continue.

* Datadog collecte toutes les pages consultées par vos utilisateurs finaux avec les données de télémétrie pertinentes : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend et tâches longues. Tous ces éléments sont inclus dans la session utilisateur. Le prix facturé par Datadog est calculé par tranche de dix mille (10 000) sessions ingérées dans le service Real User Monitoring (RUM) de Datadog.

## Profileur en continu

* Le nombre de hosts uniques que vous surveillez en même temps via le service Profileur en continu de Datadog est mesuré toutes les heures.
  * Ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée (la huitième la plus élevée en février).
  * Chaque host bénéficie gratuitement de quatre conteneurs profilés. Chaque conteneur supplémentaire coûte 2 $.
    **Remarque** : ce quota est agrégé pour tous les hosts. Si vous avez une moyenne de quatre conteneurs sur l'ensemble de vos hosts, les conteneurs supplémentaires ne vous sont pas facturés pour chaque host séparément.
* Datadog mesure le nombre total de conteneurs qui sont profilés. Un conteneur est un environnement d'exploitation autonome qui comprend une application ainsi que des paramètres et des bibliothèques de système d'exploitation limités. Le nombre de conteneurs uniques que vous surveillez avec le service Profileur en continu de Datadog est mesuré toutes les cinq minutes. Chaque mois, Datadog facture le nombre d'heures de surveillance de vos conteneurs, calculé proportionnellement. Pour le service Profileur en continu, Datadog comptabilise uniquement les conteneurs qui exécutent le service Profileur en continu dans le nombre total de conteneurs surveillés.

## Gestion des incidents

* Datadog surveille le nombre d'utilisateurs actifs mensuels qui prennent part à la gestion des incidents et aux interventions connexes.
 * Un utilisateur est uniquement considéré comme **actif** lorsqu'il publie des commentaires ou des signaux (graphiques, liens, etc.) sur un incident. Toutes les personnes qui se contentent d'ouvrir ou de fermer un incident, ou simplement de le consulter, ne sont pas prises en compte. De plus, le calcul ne se base pas sur un système d'attribution de postes. Vous n'avez donc pas besoin d'identifier les utilisateurs qui accèdent aux incidents.


## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][5].

Contactez le [service commercial][6] ou votre [chargé de compte][7] pour toute question concernant la tarification horaire ou la facturation pour votre compte.

[1]: https://www.datadoghq.com/pricing
[2]: /fr/metrics/custom_metrics/
[3]: /fr/tracing/trace_retention_and_ingestion/#retention-filters
[4]: /fr/tracing/trace_retention_and_ingestion/
[5]: /fr/help/
[6]: mailto:sales@datadoghq.com
[7]: mailto:success@datadoghq.com