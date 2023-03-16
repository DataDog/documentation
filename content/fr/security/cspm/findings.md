---
aliases:
- /fr/security_platform/findings
- /fr/security_platform/cspm/findings
further_reading:
- link: security/default_rules
  tag: Documentation
  text: Découvrir les règles de détection Cloud Security Posture Management par défaut
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentation
  text: En savoir plus sur les frameworks et les benchmarks de l'industrie
kind: documentation
title: Security Findings Explorer
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management n'est pas disponible pour ce site.
</div>
{{< /site-region >}}

## Présentation

Le [Findings Explorer][1] vous permet de :

- Passer en revue la configuration détaillée d'une ressource
- Consulter les règles de détection appliquées à vos ressources par CSPM
- Visualiser les tags appliqués à vos ressources pour connaître leur propriétaire et leur emplacement dans votre environnement
- Lire des descriptions et des recommandations établies à partir d'autres ressources de l'industrie pour corriger une ressource mal configurée
- Tirer parti du sélecteur d'intervalle pour consulter les problèmes de sécurité identifiés à tout moment dans le passé

Vous pouvez non seulement consulter des findings et prendre des mesures en conséquence, mais également configurer des notifications en cas d'échec. Vous avez également la possibilité de configurer des signaux afin de corréler et de trier les problèmes de configuration depuis la même interface que celle des menaces en temps réel générées par [Cloud SIEM][2] et  [Cloud Workload Security][3]. Grâce à ces fonctionnalités, vos enquêtes sont plus rapides : en effet, la plupart des vulnérabilités des clouds modernes reposent sur l'exploitation d'un problème de configuration de service.

{{< img src="security/cspm/findings/findings-time-window.png" alt="Choisir un intervalle de findings à l'aide du menu déroulant" style="width:65%;">}}

## Findings

Un résultat, ou finding, est ce l'on obtient lorsqu'une ressource est évaluée en fonction d'une règle. À chaque fois qu'une ressource est évaluée, un finding est généré avec un statut **Pass** ou **Fail**. Les ressources sont évaluées selon un intervalle allant de 15 minutes à 4 heures (en fonction de leur type). Datadog génère de nouveaux findings à chaque fois qu'une analyse est effectué, puis affiche un historique complet des findings générés sur les 15 derniers mois pour vous permettre de les consulter en cas d'enquête ou d'audit.

{{< img src="security/cspm/findings/posture-management-overview.png" alt="Aperçu de la page des findings Posture Management" style="width:100%;">}}

## Explorer les problèmes de configuration de cloud avec les findings

Cliquez sur un résultat affichant le statut **Failed** pour visualiser la ressource concernée par le problème de configuration, la description de la règle, la cartographie de ses frameworks ou benchmarks de l'industrie, ainsi que les mesures correctives suggérées.

{{< img src="security/cspm/findings/signal-overview.png" alt="Volet latéral affichant les détails d'un échec" style="width:65%;">}}

Utilisez la barre de requête pour regrouper les findings par règle. Cette vue affiche la liste de toutes les règles de détection exécutées par Datadog, avec la possibilité de les cocher ou les décocher. Filtrez les findings en fonction du statut `evaluation:fail` pour afficher uniquement les règles de détection ayant généré un problème qui doit être corrigé. Le volet latéral comporte des informations détaillées sur chaque ressource évaluée par la règle.

{{< img src="security/cspm/findings/evaluation-fail.png" alt="Afficher uniquement les évaluations ayant échoué" style="width:100%;">}}

Le volet latéral affiche les détails de chacune des ressources évaluées par la règle.

{{< img src="security/cspm/findings/no-security-group-ingress.png" alt="Ressources classées par nombre d'échecs dans le volet latéral" style="width:65%;">}}

Les findings peuvent également être regroupés par ressource pour afficher les ressources qui ont généré le plus d'échec en premier et ainsi mettre en lumière les éléments à examiner en priorité.

{{< img src="security/cspm/findings/eval-fail-group-by-resource.png" alt="Regrouper par ressource dans la recherche" style="width:100%;">}}

Le volet latéral affiche la liste des règles de détection qui ont été exécutées sur la ressource. Prenez les mesures correctives nécessaires pour améliorer la sécurité de vos configurations.

{{< img src="security/cspm/findings/passed-rules.png" alt="Regrouper par ressource dans la recherche" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /fr/security/cloud_siem/
[3]: /fr/security/cloud_workload_security/