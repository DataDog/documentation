---
aliases:
- /fr/overview
- /fr/getting_started/faq/
cascade:
  algolia:
    category: Getting Started
    rank: 50
description: Introduction à la plateforme d'observabilité de Datadog avec des guides
  pour l'installation, la configuration et le démarrage avec les fonctionnalités clés.
disable_sidebar: true
further_reading:
- link: https://learn.datadoghq.com/
  tag: Centre d'apprentissage
  text: Suivez un cours pour commencer avec Datadog
- link: https://datadoghq.com/blog/
  tag: Blog
  text: Découvrez les nouveaux produits et fonctionnalités de Datadog, les intégrations,
    et plus encore
- link: https://app.datadoghq.com/help/quick_start
  tag: App
  text: Explorez le Guide de démarrage rapide
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centre d'apprentissage
  text: Introduction à l'observabilité
title: Débuter
---
## Qu'est-ce que Datadog&nbsp;? {#what-is-datadog}

Datadog est une plateforme d'observabilité qui prend en charge chaque phase du développement logiciel sur n'importe quelle pile technologique. La plateforme se compose de nombreux produits qui vous aident à construire, tester, surveiller, déboguer, optimiser et sécuriser votre logiciel. Ces produits peuvent être utilisés individuellement ou combinés en une solution personnalisée.

Le tableau qui suit présente quelques-uns des produits Datadog :

<table>
    <thead>
        <th>Catégorie</th>
        <th>Exemples de produits</th>
    </thead>
    <tr>
        <td><p><strong>Développement</strong></p></td>
        <td>
        <ul>
        <li>Mettez en évidence les vulnérabilités de code dans votre éditeur de texte ou sur GitHub avec <a href="/security/code_security/">Sécurité du code</a>.</li>
        <li>Facilitez une session de pair-programming à distance avec <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Tests</strong></p></td>
        <td>
            <ul>
                <li>Bloquez le code défectueux avant son déploiement en production avec <a href="/pr_gates/">PR Gates</a>.</li>
                <li>Simulez des utilisateurs à travers le monde pour tester votre application web, API ou application mobile avec <a href="/synthetics/">Surveillance synthétique</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Surveillance</strong></p></td>
        <td>
            <ul>
                <li>Ingestion de <a href="/logs/">logs</a>, <a href="/metrics/">métriques</a>, <a href="/events/">événements</a>, et <a href="/tracing/glossary/#trace">traces réseau</a> avec un contrôle granulaire sur le traitement, l'agrégation et <a href="/monitors/">l'alerte.</a></li>
                <li>Évaluez la performance de l'hôte avec <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Évaluez la performance de l'application avec <a href="/tracing/">Application Performance Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Dépannage</strong></p></td>
        <td>
            <ul>
                <li>Gérez <a href="/error_tracking/">les erreurs</a> et <a href="/incident_response/incident_management/">les incidents</a>, en résumant les problèmes et en suggérant des solutions.</li>
                <li>Mesurez le taux d'attrition des utilisateurs et détectez la frustration des utilisateurs avec <a href="/real_user_monitoring/">Real User Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Sécurité</strong></p></td>
        <td>
            <ul>
                <li>Détectez les menaces et les attaques avec <a href="/security/">Datadog Security</a>.</li>
            </ul>
        </td>
    </tr>
</table>

De plus, des centaines d'[intégrations][1] vous permettent de superposer les fonctionnalités de Datadog sur les technologies que vous utilisez déjà. Par exemple, l'[intégration AWS][2] collecte des journaux, des événements et des métriques de plus de 90 services AWS.

## En savoir plus {#learn-more}

{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  Cette session de formation de base aide à répondre à la question clé&nbsp;: "Qu'est-ce que Datadog et que peut-il faire pour moi&nbsp;?" Vous apprendrez comment envoyer des données à Datadog et quelles pages visiter pour mieux comprendre l'état de vos différents environnements, applications et infrastructures.
{{< /learning-center-callout >}}

### Suivez un cours {#take-a-course}
Le Datadog Learning Center offre une expérience pratique avec la plateforme Datadog. Les [cours de démarrage][3] couvrent les pratiques d'observabilité, les concepts clés de Datadog et plus encore.

Pour vous familiariser rapidement avec Datadog, essayez notre [formation de démarrage rapide][4].

### Approfondissez un domaine produit{#dive-deeper-into-a-product-area}
{{< whatsnext desc="Commencez avec l'un des guides ci-dessous :">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u> : Découvrez comment utiliser l'interface utilisateur de Datadog : tableaux de bord, liste d'infrastructure, cartes, et plus.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Site Datadog</u> : Sélectionnez le site Datadog approprié pour votre région et vos exigences de sécurité.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>Bundles DevSecOps</u> : Commencez avec les bundles Infrastructure DevSecOps.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u> : Envoyez des métriques et des événements de vos hôtes vers Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u> : Commencez avec l'API HTTP de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>Intégrations</u> : Apprenez à collecter des métriques, des traces et des journaux avec les intégrations Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/search" >}}<u>Recherche</u> : Apprenez les fondamentaux de la recherche et du filtrage à travers les produits Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>Tags</u> : Commencez à taguer vos métriques, journaux et traces.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u> : Apprenez à envoyer des métriques, des traces et des journaux OpenTelemetry vers Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>Centre d'apprentissage</u> : Suivez un parcours d'apprentissage, participez à un cours ou à un laboratoire autoguidé, et explorez le programme de certification Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Services de plateforme:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>Tableaux de bord</u> : Créez, partagez et maintenez des tableaux de bord qui répondent aux questions clés pour votre activité.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Gestion des incidents</u> : Communiquez et suivez les problèmes dans vos systèmes.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>Moniteurs</u> : Configurez des alertes et des notifications afin que votre équipe sache quand des changements critiques se produisent.{{< /nextlink >}}
{{< nextlink href="/getting_started/notebooks" >}}<u>Carnets</u> : Combinez des graphiques en direct, des métriques, des journaux et des moniteurs pour isoler les problèmes et créer des guides interactifs.{{< /nextlink >}}
{{< nextlink href="/getting_started/organization_topology" >}}<u>Topologie de l'organisation</u> : Choisissez entre des déploiements Datadog en organisation unique ou multi-organisations et gérez l'isolement avec des contrôles d'accès.{{< /nextlink >}}
{{< nextlink href="/getting_started/teams" >}}<u>Équipes</u> : Construisez un modèle de propriété fiable en synchronisant les données des équipes provenant de fournisseurs d'identité, de GitHub et d'autres sources dans Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Automatisation des flux de travail</u> : Automatisez les processus de bout en bout en réponse aux alertes et aux signaux de sécurité.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Produit:">}}
{{< nextlink href="/getting_started/containers" >}}<u>Conteneurs</u> : Apprenez à utiliser l'autodécouverte de l'Agent et l'opérateur Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless pour AWS Lambda</u> : Apprenez à collecter des métriques, des journaux et des traces de votre infrastructure sans serveur.{{< /nextlink >}}
{{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Portail développeur interne</u> : Unifiez la télémétrie, les métadonnées et les flux de travail pour accélérer la livraison. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>Traçage</u> : Configurez l'Agent pour tracer une petite application.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u> : Utilisez Continuous Profiler pour identifier et résoudre les problèmes de performance dans votre code.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Surveillance de la Base de Données</u>: Consultez la santé et la performance des bases de données, et dépannez rapidement tout problème qui survient.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Surveillance Synthétique</u>: Commencez à tester et à surveiller vos points de terminaison API et vos parcours commerciaux clés avec des tests synthétiques.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Tests Continus</u>: Exécutez des tests synthétiques de bout en bout dans vos pipelines CI et vos IDE.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u> : Obtenez un aperçu approfondi de la manière dont les utilisateurs interagissent avec votre produit grâce aux Session Replays.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>Protection des Applications et des API</u>: Découvrez les meilleures pratiques pour permettre à votre équipe de démarrer avec AAP.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Sécurité Cloud</u>: Découvrez les meilleures pratiques pour permettre à votre équipe de démarrer avec la Sécurité Cloud.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Découvrez les meilleures pratiques pour permettre à votre équipe de démarrer avec Cloud SIEM.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>Logs</u> : Envoyez vos premiers logs et utilisez le traitement des logs pour les enrichir.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>Visibilité CI</u>: Collectez les données de pipeline CI en configurant des intégrations avec vos fournisseurs CI.{{< /nextlink >}}
{{< nextlink href="/getting_started/feature_flags" >}}<u>Feature Flags</u> : Gérez la livraison des fonctionnalités et personnalisez l'expérience utilisateur grâce à une observabilité intégrée.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>Optimisation des Tests</u>: Collectez les données de test CI en configurant des services de test dans Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Analyse d'Impact des Tests</u>: Optimisez votre suite de tests et réduisez les coûts CI en n'exécutant que les tests pertinents pour vos modifications de code.{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>Sécurité du Code</u> : Analysez votre code propriétaire et les bibliothèques open source dans vos applications, du développement à l'exécution.{{< /nextlink >}}
{{< /whatsnext >}}

## Essayez un produit ou une fonctionnalité en avant-première{#try-a-preview-product-or-feature}

Les équipes produit de Datadog ajoutent fréquemment de nouvelles fonctionnalités qui pourraient vous aider. Vous pouvez essayer certaines d'entre elles avant qu'elles ne soient généralement disponibles pour voir si elles vous aident et pour nous donner des retours afin de les améliorer. Pour voir une liste complète des avant-premières actives, obtenir plus d'informations et vous inscrire pour participer, rendez-vous sur [Programme d'Aperçu des Produits Datadog][5].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/integrations/
[2]: /fr/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/