---
description: Comprendre les modèles de tarification et les calculs de facturation
  de Datadog pour divers produits, y compris Infrastructure Monitoring, APM, les journaux
  et les tests synthétiques.
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Tarification
  text: Tarification Datadog
title: Tarification
---
Datadog propose de nombreux plans tarifaires pour répondre à vos besoins. Pour plus d'informations, consultez la page [Tarification][1]. Sauf indication contraire dans votre commande, Datadog calcule les frais en fonction de l'utilisation des produits pendant chaque mois calendaire. Voici les unités de tarification les plus courantes :

## Surveillance de l'infrastructure {#infrastructure-monitoring}

* Un **hôte** est une instance de système d'exploitation physique ou virtuel. Chaque heure, Datadog enregistre le nombre d'hôtes uniques que vous surveillez dans le service Infrastructure.
  * Dans un plan de point de facturation maximal (HWMP), le nombre d'hôtes facturables est calculé à la fin du mois en utilisant le nombre maximum (point de facturation maximal) des 99 % inférieurs d'utilisation pour ces heures. Datadog exclut le top 1 % pour réduire l'impact des pics d'utilisation sur votre facture.
  * Dans un plan hybride mensuel/horaires (MHP), Datadog facture votre engagement mensuel minimum, et pour toute heure d'hôte au-dessus de cet engagement, Datadog facture un tarif horaire.
* Un **conteneur** est un environnement d'exploitation autonome qui inclut des logiciels d'application et des bibliothèques et paramètres de système d'exploitation limités. Toutes les cinq minutes, Datadog enregistre le nombre de conteneurs uniques que vous surveillez dans le service Infrastructure de Datadog. Datadog facture mensuellement en fonction des heures fractionnaires de conteneurs surveillés.
* Une [**métrique personnalisée**][2] est une combinaison unique d'un nom de métrique, d'un ID d'hôte et de tout tag. Sous la tarification par cardinalité, Datadog facture en fonction de la moyenne mensuelle des métriques personnalisées uniques soumises au service Infrastructure de Datadog par heure. Datadog propose également une tarification [par nom de métrique][12], qui facture en fonction des noms de métriques et du volume de points de données.
* Un **dispositif** est un capteur physique comprenant un ou plusieurs ordinateurs à carte unique dans un cadre. Datadog enregistre et facture le nombre de dispositifs et d'hôtes que vous surveillez simultanément dans le service Infrastructure de Datadog.
* Une tâche AWS **Fargate** est un ensemble de conteneurs configurés via la plateforme d'orchestration de conteneurs ECS d'AWS. Datadog enregistre le nombre d'instances de tâches que vous surveillez dans le service Datadog Infrastructure (ou APM) à des intervalles de cinq minutes. Datadog agrège les mesures basées sur les intervalles à la fin du mois et vous facture en fonction du nombre total d'heures pendant lesquelles vos applications ont été exécutées et surveillées.

## APM {#apm}

* Si une application s'exécutant sur un hôte (défini dans [la surveillance de l'infrastructure](#infrastructure-monitoring)) génère des traces et les soumet à l'application SaaS Datadog, Datadog compte cet hôte comme un **hôte APM**.
  * Dans un plan à point de référence élevé (HWMP), Datadog mesure le nombre d'hôtes par heure. Le nombre facturable d'hôtes est calculé à la fin du mois en utilisant le nombre maximum (point de référence élevé) des 99 % inférieurs d'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
  * Dans un plan hybride mensuel/horaires (MHP), Datadog facture votre engagement mensuel minimum, et pour toute heure d'hôte au-dessus de cet engagement, Datadog facture un tarif horaire.
* Un **Span indexé** est une demande individuelle contre un service individuel dans votre pile. Datadog facture en fonction du nombre total de spans indexés par [filtres de rétention][3] dans Datadog APM.
* Un **Span ingéré** est une demande individuelle contre un service individuel dans votre pile. Datadog facture en fonction du nombre total de gigaoctets de spans ingérés dans Datadog APM.

Vous pouvez mettre en place des contrôles pour les volumes de spans indexés et ingérés. Pour plus d'informations, consultez la documentation sur [l'ingestion de traces][4] et [la rétention][5].

## Surveillance des bases de données {#database-monitoring}

* Datadog enregistre le nombre d'hôtes de bases de données uniques que vous surveillez avec Datadog Database Monitoring chaque heure.
  * Dans un plan à point de référence élevé (HWMP), le nombre facturable d'hôtes est calculé à la fin du mois en utilisant le nombre maximum (point de référence élevé) des 99 % inférieurs d'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
  * Dans un plan hybride mensuel/horaires (MHP), Datadog facture votre engagement mensuel minimum, et pour toute heure d'hôte au-dessus de cet engagement, Datadog facture un tarif horaire.
* Datadog facture en fonction du nombre total de [requêtes normalisées][6] configurées suivies à tout moment.

## Gestion des journaux {#log-management}

* Un **journal** est un enregistrement textuel d'activité généré par un système d'exploitation, une application ou d'autres sources. Datadog facture les journaux ingérés en fonction du nombre total de gigaoctets soumis au service Datadog Logs.
* Un **événement de journal** est un journal qui est indexé par le service Datadog Logs. Datadog facture par million d'événements de journal soumis pour indexation au tarif désigné pour la politique de conservation que vous avez sélectionnée.

## Cloud SIEM {#cloud-siem}

* Un **journal analysé** est un enregistrement textuel d'activité généré par un système d'exploitation, une application ou d'autres sources analysées pour détecter des menaces potentielles à la sécurité. Datadog facture pour les journaux analysés en fonction des millions d'événements par mois analysés par le service Datadog Cloud SIEM.

## Surveillance synthétique {#synthetic-monitoring}

* Un **test API** est une requête HTTP ou HTTPS contre une seule URL. Datadog facture par dix mille exécutions de tests API effectuées pour le service de surveillance synthétique Datadog.
* Un **test de navigateur** est une simulation d'une séquence scriptée d'actions utilisateur sur une application web à l'aide d'un navigateur web virtualisé. Datadog facture par mille tests de navigateur exécutés pour la surveillance synthétique Datadog.
 service.

## Surveillance du réseau Cloud {#cloud-network-monitoring}

* Datadog enregistre le nombre d'hôtes de **Surveillance du réseau Cloud** (CNM) que vous surveillez simultanément avec le service Datadog CNM une fois par heure.
  * Le nombre d'hôtes facturables est calculé à la fin du mois en utilisant le nombre maximum (point de référence) des 99 % inférieurs d'utilisation pour ces heures. Datadog exclut le top 1 % pour réduire l'impact des pics d'utilisation sur votre facture.
* De plus, Datadog mesure le nombre total de flux utilisés par tous les hôtes CNM par mois. Un **flux** est un enregistrement du trafic envoyé et reçu entre une source (IP:Port) et une destination (IP:Port), mesuré sur une période de cinq minutes.

## Surveillance des utilisateurs réels {#real-user-monitoring}

* Une **session** est un parcours utilisateur sur votre application web. Elle expire après 15 minutes d'inactivité ou 4 heures d'activité continue.

* Datadog collecte toutes les pages visitées par vos utilisateurs finaux ainsi que la télémétrie qui compte : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend et tâches longues. Tout cela est inclus dans la session utilisateur. Datadog facture par mille (1 000) sessions ingérées dans le service de surveillance des utilisateurs réels (RUM) de Datadog avec la distinction suivante :

- [Mesure RUM][10] : Vous êtes facturé pour les sessions qui sont suivies par le SDK et envoyées à Datadog.
- [RUM sans limites][11] : Vous êtes facturé séparément en fonction du volume de sessions qui passent du SDK à Datadog, et du volume de sessions que vous conservez après les filtres de rétention.

## Profil continu {#continuous-profiler}

* Datadog enregistre le nombre d'hôtes uniques du Profil continu que vous surveillez simultanément avec le service de Profil continu de Datadog une fois par heure.
  * Le nombre facturable d'hôtes est calculé à la fin du mois en utilisant le nombre maximum (point de référence) des 99 % les plus bas d'utilisation pour ces heures. Datadog exclut le top 1 % pour réduire l'impact des pics d'utilisation sur votre facture.
  * Chaque hôte est autorisé à avoir jusqu'à quatre conteneurs profilés gratuitement. Les conteneurs supplémentaires sont facturés 2 $ par conteneur.
    **Remarque** : Ce quota est agrégé sur tous les hôtes, donc si vous avez en moyenne quatre conteneurs sur l'ensemble de vos hôtes, vous n'êtes pas facturé comme si vous en aviez plus sur une base par hôte.
* Datadog mesure le nombre total de conteneurs qui sont profilés. Un conteneur est un environnement d'exploitation autonome qui inclut des logiciels d'application et des bibliothèques et paramètres limités du système d'exploitation. Une fois toutes les cinq minutes, Datadog enregistre le nombre de conteneurs uniques que vous surveillez dans le service Continuous Profiler de Datadog. Datadog facture mensuellement en fonction des heures fractionnaires de conteneurs surveillés. Pour Continuous Profiler, Datadog ne compte que les conteneurs qui exécutent le service Continuous Profiler dans le total des conteneurs surveillés.

## Gestion des incidents {#incident-management}

* Pour les organisations sur un plan basé sur les sièges, Datadog facture en fonction de l'engagement en sièges de votre organisation. 
* Pour les organisations sur le plan d'utilisation hérité, Datadog suit le nombre d'utilisateurs actifs mensuels de Gestion des incidents.
  * Datadog compte un utilisateur comme un **utilisateur actif** s'il a utilisé les capacités de Datadog pour contribuer de manière substantielle à la réponse à l'incident. Par exemple, vous devenez un utilisateur actif pour le mois lorsque vous :
    * Mettez à jour l'état, la gravité ou d'autres champs d'un incident.
    * Commenter la chronologie de l'incident
    * Envoyer des notifications d'incidents
    * Ajouter des intervenants ou attribuer des types d'intervenants
    * Créer, modifier ou attribuer des suivis d'incidents
    * Générer un post-mortem
  * Vous ne devenez _pas_ un utilisateur actif lorsque vous :
    * Déclarez, visualisez ou recherchez des incidents
    * Rejoindre des canaux, réunions ou appels tiers liés à l'incident
    * Publier des messages dans le canal Slack de l'incident ou le canal Microsoft Teams (même si le message est automatiquement synchronisé avec la chronologie de l'incident)

## CI Visibility {#ci-visibility}

* Datadog suit le nombre de committers uniques qui envoient des données de test et de pipeline au service CI Visibility.
* Un **committer** désigne un committer git actif, identifié par son adresse e-mail d'auteur git. Un committer est comptabilisé pour la facturation s'il réalise au moins trois commits dans un mois donné.
  * Dans le cas où un pipeline n'est pas associé à un dépôt git, ou si les métadonnées git ne sont pas disponibles, le nom d'utilisateur de la personne déclenchant l'exécution du pipeline est utilisé comme committer facturable.
* Pour Pipeline Visibility, chaque pipeline, étape de pipeline et tâche de pipeline compte comme un **pipeline span**. Pour Testing Visibility, chaque exécution de test individuelle compte comme un **test span**.

## Dépannage {#troubleshooting}

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
[10]: /fr/real_user_monitoring/rum_without_limits/
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring#products
[12]: /fr/account_management/billing/metric_name_pricing/