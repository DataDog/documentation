---
description: Comprenez les modèles de tarification et les calculs de facturation de
  Datadog pour divers produits, notamment Infrastructure Monitoring, APM, Logs et
  les tests Synthetic.
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Tarification
  text: Tarification Datadog
title: Tarification
---
Datadog propose de nombreux plans tarifaires pour répondre à vos besoins. Pour plus d'informations, consultez la page [Tarification][1]. Sauf indication contraire dans votre commande, Datadog calcule les frais en fonction de l'utilisation du produit au cours de chaque mois civil.

## Plans de facturation {#billing-plans}

Datadog propose deux plans de facturation pour les produits basés sur le host, tels que Infrastructure Monitoring, APM et Database Monitoring :

- **Plan de haut niveau (HWMP)** : Datadog mesure le nombre de hosts chaque heure. À la fin du mois, Datadog vous facture sur la base du nombre maximal (haut niveau) des 99 % inférieurs de ces relevés horaires, en excluant le 1 % supérieur afin de réduire l'impact des pics d'utilisation de courte durée sur votre facture. Ce plan est bien adapté aux environnements ayant une utilisation stable tout au long du mois.
- **Plan hybride mensuel/horaire (MHP)** : Vous vous engagez sur un minimum mensuel, et toute heure de host au-delà de cet engagement est facturée à un tarif horaire. Comme l'utilisation au-delà de l'engagement est facturée à l'heure, ce plan est bien adapté aux environnements éphémères, tels que les flottes à autoscaling ou les charges de travail de courte durée.

Les sections suivantes décrivent les unités de tarification les plus courantes pour chaque produit.

## Surveillance de l'infrastructure {#infrastructure-monitoring}

* Un **host** est une instance de système d'exploitation physique ou virtuelle. Chaque heure, Datadog enregistre le nombre de hosts uniques que vous surveillez dans le service Infrastructure.
  * Sur un plan de haut niveau (HWMP), le nombre de hosts facturables est calculé à la fin du mois en utilisant le nombre maximum (haut niveau) des 99 % inférieurs de l'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
  * Sur un plan hybride mensuel/horaire (MHP), Datadog facture votre engagement mensuel minimum, et pour toute heure de host au-delà de cet engagement, Datadog facture un tarif horaire.
* Un **conteneur** est un environnement d'exploitation autonome qui inclut des logiciels d'application ainsi que des bibliothèques et des paramètres de système d'exploitation limités. Toutes les cinq minutes, Datadog enregistre le nombre de conteneurs uniques que vous surveillez dans le service Datadog Infrastructure. Datadog facture mensuellement en fonction des heures fractionnaires des conteneurs surveillés.
* Une [**métrique personnalisée**][2] est une combinaison unique d'un nom de métrique, d'un host ID et de ses tags. Dans le cadre de la tarification par cardinalité, Datadog facture en fonction de la moyenne mensuelle, par heure, des métriques personnalisées uniques soumises au service Datadog Infrastructure. Datadog propose également une [tarification par nom de métrique][12], qui facture plutôt en fonction des noms de métriques et du volume de points de données.
* Un **appareil** est un capteur physique comprenant un ou plusieurs ordinateurs à carte unique dans un châssis. Datadog enregistre et facture le nombre d'appareils et de hosts que vous surveillez simultanément dans le service Datadog Infrastructure.
* Une **tâche AWS Fargate** est une collection de conteneurs configurés via la plateforme d'orchestration de conteneurs ECS d'AWS. Datadog enregistre le nombre d'instances de tâches que vous surveillez dans le service Datadog Infrastructure (ou APM) à des intervalles de cinq minutes. Datadog agrège les mesures basées sur les intervalles à la fin du mois et vous facture en fonction du nombre total d'heures pendant lesquelles vos applications ont été exécutées et surveillées.

## APM {#apm}

* Si une application exécutée sur un host (défini dans [Surveillance de l'infrastructure](#infrastructure-monitoring)) génère des traces et les soumet à l'application SaaS Datadog, Datadog compte cet host comme un **host APM**.
  * Sur un plan de haut niveau (HWMP), Datadog mesure le nombre de hosts toutes les heures. Le nombre facturable de hosts est calculé à la fin du mois en utilisant le nombre maximal (haut niveau) des 99 % inférieurs de l'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
  * Sur un plan hybride mensuel/horaire (MHP), Datadog facture votre engagement mensuel minimum, et pour toute heure de host au-delà de cet engagement, Datadog facture un tarif horaire.
* Un **Span indexé** est une requête individuelle adressée à un service individuel de votre pile. Datadog facture en fonction du nombre total de spans indexés par des [filtres de rétention][3] au sein de Datadog APM.
* Un **Span ingéré** est une requête individuelle adressée à un service individuel de votre pile. Datadog facture en fonction du nombre total de gigaoctets de spans ingérés dans Datadog APM.

Vous pouvez mettre en place des contrôles pour les volumes de spans indexés et ingérés. Pour plus d'informations, lisez la documentation sur [l'ingestion de traces][4] et la [rétention][5].

## Database Monitoring {#database-monitoring}

* Datadog enregistre le nombre de hosts de base de données uniques que vous surveillez avec Datadog Database Monitoring chaque heure.
  * Sur un plan de haut niveau (HWMP), le nombre de hosts facturables est calculé à la fin du mois en utilisant le nombre maximum (haut niveau) des 99 % inférieurs de l'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
  * Sur un plan hybride mensuel/horaire (MHP), Datadog facture votre engagement mensuel minimum, et pour toute heure de host au-delà de cet engagement, Datadog facture un tarif horaire.
* Datadog facture sur la base du nombre total de [requêtes normalisées][6] configurées et suivies à tout moment.

## Gestion des logs {#log-management}

* Un **log** est un enregistrement textuel d'activité généré par un système d'exploitation, une application ou d'autres sources. Datadog facture les logs ingérés sur la base du nombre total de gigaoctets soumis au service Datadog Logs.
* Un **événement de log** est un log indexé par le service Datadog Logs. Datadog facture par million d'événements de log soumis pour indexation au tarif désigné pour la politique de rétention que vous avez sélectionnée.

## Cloud SIEM {#cloud-siem}

* Un **log analysé** est un enregistrement textuel d'activité généré par un système d'exploitation, une application ou d'autres sources analysées pour détecter des menaces de sécurité potentielles. Datadog facture les logs analysés sur la base des millions d'événements par mois analysés par le service Datadog Cloud SIEM.

## Surveillance synthétique {#synthetic-monitoring}

* Un **test d'API** est une requête HTTP ou HTTPS vers une URL unique. Datadog facture par tranche de dix mille exécutions de tests d'API vers le service Datadog Synthetic Monitoring.
* Un **test de navigateur** est une simulation d'une séquence scriptée d'actions utilisateur sur une application Web utilisant un navigateur Web virtualisé. Datadog facture par millier de tests de navigateur exécutés vers le service Datadog Synthetic Monitoring
 service.

## Cloud Network Monitoring {#cloud-network-monitoring}

* Datadog enregistre le nombre de hosts **Cloud Network Monitoring** (CNM) que vous surveillez simultanément avec le service Datadog CNM une fois par heure.
  * Le nombre de hosts facturables est calculé à la fin du mois en utilisant le nombre maximal (haut niveau) des 99 % inférieurs de l'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
* De plus, Datadog mesure le nombre total de flux utilisés par tous les hosts CNM par mois. Un **flux** est un enregistrement du trafic envoyé et reçu entre une source (IP:Port) et une destination (IP:Port), mesuré sur une période de cinq minutes.

## Real User Monitoring {#real-user-monitoring}

* Une **session** est un parcours utilisateur sur votre application web. Elle expire après 15 minutes d'inactivité ou 4 heures d'activité continue.

* Datadog collecte toutes les pages visitées par vos utilisateurs finaux ainsi que la télémétrie pertinente : chargement des ressources (XHR, images, fichiers CSS, scripts JS, etc.), erreurs frontend et tâches longues. Tout cela est inclus dans la session utilisateur. Datadog facture par millier (1 000) de sessions ingérées dans le service Datadog Real User Monitoring (RUM) avec la distinction suivante :

- [RUM Measure][10] : vous êtes facturé pour les sessions suivies par le SDK et envoyées à Datadog.
- [RUM without Limits][11] : vous êtes facturé séparément en fonction du volume de sessions qui transitent du SDK vers Datadog, et du volume de sessions que vous conservez après les filtres de rétention.

## Continuous Profiler {#continuous-profiler}

* Datadog enregistre le nombre de hosts Continuous Profiler uniques que vous surveillez simultanément avec le service Datadog Continuous Profiler une fois par heure.
  * Le nombre de hosts facturables est calculé à la fin du mois en utilisant le nombre maximal (haut niveau) des 99 % inférieurs de l'utilisation pour ces heures. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture.
  * Chaque host peut profiler gratuitement jusqu'à quatre conteneurs. Les conteneurs au-delà de ce nombre sont facturés 2 $ par conteneur.
    **Remarque** : ce quota est agrégé sur l'ensemble des hosts. Ainsi, si vous avez quatre conteneurs en moyenne sur l'ensemble de vos hosts, vous n'êtes pas facturé comme si, pour chaque host, vous en aviez davantage.
* Datadog mesure le nombre total de conteneurs en cours de profilage. Un conteneur est un environnement d'exploitation autonome qui inclut des logiciels d'application ainsi que des bibliothèques et des paramètres de système d'exploitation limités. Toutes les cinq minutes, Datadog enregistre le nombre de conteneurs uniques que vous surveillez dans le service Datadog Continuous Profiler. Datadog facture mensuellement en fonction des heures fractionnaires des conteneurs surveillés. Pour Continuous Profiler, Datadog ne comptabilise dans le nombre total de conteneurs surveillés que les conteneurs exécutant le service Continuous Profiler.

## Incident Management {#incident-management}

* Pour les organisations disposant d'un forfait basé sur le nombre de sièges, Datadog facture en fonction de l'engagement de sièges de votre organisation. 
* Pour les organisations disposant de l'ancien forfait basé sur l'utilisation, Datadog suit le nombre d'utilisateurs actifs mensuels d'Incident Management.
  * Datadog considère un utilisateur comme un **utilisateur actif** s'il a utilisé les fonctionnalités de Datadog pour contribuer de manière substantielle à la réponse aux incidents. Par exemple, vous devenez un utilisateur actif pour le mois lorsque vous :
    * Mettez à jour l'état, la gravité ou d'autres champs d'un incident
    * Commentez la chronologie de l'incident
    * Envoyez des notifications d'incident
    * Ajoutez des intervenants ou attribuez des rôles d'intervenant
    * Créez, modifiez ou attribuez des suivis d'incident
    * Générez un post-mortem
  * Vous _ne_ devenez pas un utilisateur actif lorsque vous :
    * Déclarez, consultez ou recherchez des incidents
    * Rejoignez des canaux, des réunions ou des appels tiers connectés à l'incident
    * Publiez des messages dans le canal Slack ou Microsoft Teams de l'incident (même si le message est automatiquement synchronisé avec la chronologie de l'incident)

## CI Visibility {#ci-visibility}

* Datadog suit le nombre de contributeurs git uniques qui envoient des données de test et de pipeline au service CI Visibility.
* Un **contributeur git** désigne un contributeur git actif, identifié par son adresse e-mail d'auteur git. Un contributeur est comptabilisé dans la facturation s'il effectue au moins trois commits au cours d'un mois donné.
  * Dans le cas où un pipeline n'est pas associé à un dépôt git, ou si les métadonnées git ne sont pas disponibles, le nom d'utilisateur de la personne déclenchant l'exécution du pipeline est utilisé comme contributeur facturable.
* Pour Pipeline Visibility, chaque pipeline, phase de pipeline et job de pipeline compte comme un **span de pipeline**. Pour Testing Visibility, chaque exécution de test individuelle compte comme un **span de test**.

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