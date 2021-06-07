---
title: Findings Explorer
kind: documentation
aliases:
  - /fr/security_platform/findings
further_reading:
  - link: security_platform/default_rules
    tag: Documentation
    text: Explorer les règles de configuration cloud par défaut
  - link: security_platform/cspm/frameworks_and_benchmarks
    tag: Documentation
    text: En savoir plus sur les frameworks et les benchmarks de l'industrie
---
{{< site-region region="us" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management est actuellement en <a href="https://app.datadoghq.com/security/configuration">version bêta publique</a>.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management n'est pas actuellement disponible dans les régions US1-FED, US3 et EU.
</div>
{{< /site-region >}}

## Présentation

Le [Findings Explorer][1] vous permet de :

- Passer en revue la configuration détaillée d'une ressource
- Consulter les règles appliqués à vos ressources par CSPM
- Visualiser les tags appliqués à vos ressources pour connaître leur propriétaire et leur emplacement dans votre environnement
- Lire des descriptions et des recommandations établies à partir d'autres ressources de l'industrie pour corriger une ressource mal configurée
- Tirer parti du sélecteur d'intervalle pour consulter les problèmes de sécurité identifiés à tout moment dans le passé

{{< img src="security_platform/cspm/findings/findings-time-window.png" alt="Choisir un intervalle à l'aide du menu déroulant" style="width:65%;">}}

## Résultats

Un résultat, ou finding, est ce l'on obtient lorsqu'une ressource est évaluée en fonction d'une règle. À chaque fois qu'une ressource est évaluée, un résultat est généré avec un statut **Pass** ou **Fail**. Les ressources sont évaluées selon un intervalle allant de 15 minutes à 4 heures (en fonction de leur type). Datadog génère de nouveaux résultats à chaque fois qu'une analyse est effectué, puis affiche un historique complet des résultats générés sur les 15 derniers mois pour vous permettre de les consulter en cas d'enquête ou d'audit.

{{< img src="security_platform/cspm/findings/posture-management-overview.png" alt="Aperçu de la page des résultats Posture Management" style="width:100%;">}}

Cliquez sur un résultat affichant le statut **Failed** pour visualiser la ressource concernée par le problème de configuration, la description de la règle, la cartographie de ses frameworks ou benchmarks de l'industrie, ainsi que les mesures correctives suggérées.

{{< img src="security_platform/cspm/findings/signal-overview.png" alt="Volet latéral affichant les détails d'un échec" style="width:65%;">}}

Utilisez la barre de requête pour regrouper les résultats par règle. Cette vue affiche la liste de toutes les règles exécutées par Datadog, avec la possibilité de les cocher ou les décocher. Filtrez les résultats en fonction du statut `evaluation:fail` pour afficher uniquement les règles ayant généré un problème qui doit être corrigé.

{{< img src="security_platform/cspm/findings/evaluation-fail.png" alt="Afficher uniquement les évaluations ayant échoué" style="width:100%;">}}

Le volet latéral affiche les détails de chacune des ressources évaluées par la règle.

{{< img src="security_platform/cspm/findings/no-security-group-ingress.png" alt="Ressources classées par nombre d'échecs dans le volet latéral" style="width:65%;">}}

Les résultats peuvent également être regroupés par ressource pour afficher les ressources qui ont généré le plus d'échec en premier et ainsi mettre en lumière les éléments à examiner en priorité.

{{< img src="security_platform/cspm/findings/eval-fail-group-by-resource.png" alt="Regrouper par ressource dans la recherche" style="width:100%;">}}

Le volet latéral affiche la liste des règles qui ont été exécutées sur la ressource. Prenez les mesures correctives nécessaires pour améliorer la sécurité de vos configurations.

{{< img src="security_platform/cspm/findings/passed-rules.png" alt="Regrouper par ressource dans la recherche" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now