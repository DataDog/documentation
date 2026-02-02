---
title: Débuter
description: "Présentation de la plateforme d'observabilité Datadog avec des guides d'installation, de configuration et de prise en main des fonctionnalités clés."
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Learning Center'
      text: '''Suivre une formation pour apprendre à utiliser Datadog'''
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: '''En savoir plus sur les dernières solutions et fonctionnalités Datadog, les intégrations, et plus encore'''
    - link: 'https://app.datadoghq.com/help/quick_start'
      tag: 'App'
      text: 'Découvrez le guide de démarrage rapide'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## Datadog, qu'est-ce que c'est ?

Datadog est une plateforme d'observabilité qui prend en charge toutes les phases du développement logiciel sur n'importe quelle pile. La plateforme comprend de nombreux produits qui vous aident à créer, tester, surveiller, déboguer, optimiser et sécuriser vos logiciels. Ces produits peuvent être utilisés individuellement ou combinés pour former une solution personnalisée.

Le tableau qui suit présente quelques-uns des produits Datadog :

<table>
    <thead>
        <th>`category`</th>
        <th>Exemples de produits</th>
    </thead>
    <tr>
        <td><p><strong>Développement</strong></p></td>
        <td>
        <ul>
        <li>Mettez en évidence les vulnérabilités de code dans votre éditeur de texte ou sur GitHub avec <a href="/security/code_security/">Code Security</a>.</li>
        <li>Facilitez une session de programmation en binôme à distance avec <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Tests</strong></p></td>
        <td>
            <ul>
                <li>Empêchez le déploiement de code défectueux en production grâce aux <a href="/pr_gates/">PR Gates</a>.</li>
                <li>Simulez des utilisateurs partout dans le monde pour tester votre application Web, votre API ou votre application mobile grâce à <a href="/synthetics/">la surveillance synthétique</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitoring</strong></p></td>
        <td>
            <ul>
                <li>Ingérez <a href="/logs/">les journaux</a>, <a href="/metrics/">les métriques</a>, <a href="/events/">les événements</a> et <a href="/tracing/glossary/#trace">les traces réseau</a> avec un contrôle granulaire sur le traitement, l'agrégation et <a href="/monitors/">les alertes.</a></li>
                <li>Évaluez les performances de l'hôte avec <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Évaluez les performances des applications grâce à <a href="/tracing/">la surveillance des performances des applications</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Dépannage</strong></p></td>
        <td>
            <ul>
                <li>Gérer <a href="/error_tracking/">les erreurs</a> et <a href="/incident_response/incident_management/">les incidents</a>, résumer les problèmes et proposer des solutions.</li>
                <li>Mesurez le taux d'attrition des utilisateurs et détectez leur frustration grâce à <a href="/real_user_monitoring/">la surveillance des utilisateurs réels</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Security</strong></p></td>
        <td>
            <ul>
                <li>Détectez les menaces et les attaques grâce à <a href="/security/">Datadog Security</a>.</li>
            </ul>
        </td>
    </tr>
</table>

De plus, des centaines [d'intégrations][1] vous permettent d'ajouter les fonctionnalités de Datadog aux technologies que vous utilisez déjà. Par exemple, [l'intégration AWS][2] collecte les journaux, les événements et les métriques de plus de 90 services AWS.

## En savoir plus

{{< learning-center-callout header="Participez à un webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}} Cette session de formation de base aide à répondre à la question clé : « Qu'est-ce que Datadog et que peut-il m'apporter ? » Vous apprendrez comment envoyer des données à Datadog et quelles pages consulter pour mieux comprendre l'état de vos différents environnements, applications et infrastructures. {{< /learning-center-callout >}}

### Suivre une formation
Le centre de formation Datadog propose une expérience pratique avec la plateforme Datadog. [Les cours « Pour commencer][3] » couvrent les pratiques d'observabilité, les concepts clés de Datadog, et bien plus encore.

Pour vous familiariser rapidement avec Datadog, essayez notre [Quick Start course.][4]

### Examiner une suite de produits plus en détail
{{< whatsnext desc="Commencez avec l'un des guides ci-dessous :">}} {{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Découvrez comment utiliser l'interface utilisateur Datadog : Tableaux de bord, liste des infrastructures, cartes, etc.{{< /nextlink >}} {{< nextlink href="/getting_started/site" >}}<u>Site Datadog</u>: Sélectionnez le site Datadog adapté à votre région et à vos exigences en matière de sécurité.{{< /nextlink >}} {{< nextlink href="/getting_started/devsecops" >}}<u>Offres groupées DevSecOps</u>: Commencez avec les offres groupées Infrastructure DevSecOps.{{< /nextlink >}} {{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: Envoyez les métriques et les événements de vos hôtes à Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/api" >}}<u>API</u>: Commencez à utiliser l'API HTTP Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/integrations" >}}<u>Intégrations</u>: Découvrez comment collecter des métriques, des traces et des logs grâce aux intégrations Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/search" >}}<u>Rechercher</u>: Apprenez les principes fondamentaux de la recherche et du filtrage dans les produits Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/tagging" >}}<u>Tags</u>: Commencez à baliser vos métriques, journaux et traces.{{< /nextlink >}} {{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Découvrez comment envoyer des métriques, des traces et des logs OpenTelemetry à Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/learning_center" >}}<u>Centre d'apprentissage</u>: Suivez un parcours d'apprentissage, suivez un cours ou un laboratoire autoguidé et découvrez le programme de certification Datadog.{{< /nextlink >}} {{< /whatsnext >}}

{{< whatsnext desc="Services de plateforme :">}} {{< nextlink href="/getting_started/dashboards" >}}<u>Dashboards</u>: Créez, partagez et gérez des tableaux de bord qui répondent aux questions professionnelles qui vous importent.{{< /nextlink >}} {{< nextlink href="/getting_started/incident_management" >}}<u>Incident Management</u>: Communiquez et suivez les problèmes dans vos systèmes.{{< /nextlink >}} {{< nextlink href="/getting_started/monitors" >}}<u>Monitors</u>: Configurez des alertes et des notifications afin que votre équipe soit informée lorsque des changements importants surviennent.{{< /nextlink >}} {{< nextlink href="/getting_started/notebooks" >}}<u>Notebooks</u>: Combinez graphiques en temps réel, métriques, journaux et moniteurs pour isoler les problèmes et créer des guides interactifs.{{< /nextlink >}} {{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: Automatisez les processus de bout en bout en réponse aux alertes et aux signaux de sécurité.{{< /nextlink >}} {{< /whatsnext >}}

{{< whatsnext desc="Produit :">}} {{< nextlink href="/getting_started/containers" >}}<u>Conteneurs</u>: Découvrez comment utiliser Agent Autodiscovery et l'opérateur Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/serverless" >}}<u>Serverless pour AWS Lambda</u>: Apprenez à collecter des métriques, des journaux et des traces à partir de votre infrastructure sans serveur.{{< /nextlink >}} {{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Internal Developer Portal </u>: Unifiez la télémétrie, les métadonnées et les workflows pour accélérer la livraison. {{< /nextlink >}} {{< nextlink href="/getting_started/tracing" >}}<u>Tracing</u>: Configurez l'agent pour tracer une petite application.{{< /nextlink >}} {{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Utilisez Continuous Profiler pour détecter et corriger les problèmes de performances dans votre code.{{< /nextlink >}} {{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: Consultez l'état et les performances des bases de données, et résolvez rapidement tout problème éventuel.{{< /nextlink >}} {{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Commencez à tester et à surveiller vos points de terminaison API et vos principaux parcours commerciaux à l'aide de tests synthétiques.{{< /nextlink >}} {{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: Exécutez des tests synthétiques de bout en bout dans vos pipelines CI et vos IDE.{{< /nextlink >}} {{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Découvrez en détail comment les utilisateurs interagissent avec votre produit grâce aux rediffusions de session.{{< /nextlink >}} {{< nextlink href="/getting_started/application_security" >}}<u>Protection des applications et des API</u>: Découvrez les meilleures pratiques pour aider votre équipe à se familiariser avec l'AAP.{{< /nextlink >}} {{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Découvrez les meilleures pratiques pour mettre votre équipe à niveau avec Cloud Security.{{< /nextlink >}} {{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Découvrez les meilleures pratiques pour mettre votre équipe à niveau avec Cloud SIEM.{{< /nextlink >}} {{< nextlink href="/getting_started/logs" >}}<u>Logs</u>: Envoyez vos premiers journaux et utilisez le traitement des journaux pour les enrichir.{{< /nextlink >}} {{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: Collectez les données du pipeline CI en configurant des intégrations avec vos fournisseurs CI.{{< /nextlink >}} {{< nextlink href="/getting_started/feature_flags" >}}<u>Feature Flags</u>: Gérez la mise à disposition des fonctionnalités et personnalisez l'expérience utilisateur grâce à l'observabilité intégrée.{{< /nextlink >}} {{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Collectez les données de test CI en configurant des services de test dans Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Test Impact Analysis</u>: Optimisez votre suite de tests et réduisez les coûts liés à l'intégration continue en n'exécutant que les tests pertinents pour vos modifications de code.{{< /nextlink >}} {{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: Analysez votre code propriétaire et les bibliothèques open source dans vos applications, du développement à l'exécution.{{< /nextlink >}} {{< /whatsnext >}}

## Essayer un produit ou une fonctionnalité en avant-première

Les équipes produit de Datadog ajoutent régulièrement de nouvelles fonctionnalités qui pourraient vous être utiles. Vous pouvez essayer certaines de ces fonctionnalités avant leur mise à disposition générale afin de voir si elles vous sont utiles et de nous faire part de vos commentaires pour nous aider à les améliorer. Pour consulter la liste complète des préversions actives, obtenir plus d'informations et vous inscrire pour participer, rendez-vous sur [Datadog Product Preview Program][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/
