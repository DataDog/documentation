---
description: Examinez et triez les découvertes de Workload Protection pour résoudre
  les problèmes de posture de sécurité à l'exécution.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
  tag: Documentation
  text: En savoir plus sur les règles de découverte
title: Findings
---
Les découvertes de [Workload Protection][1] sont générées lorsque les événements d'agent provenant d'une ressource (un host ou un conteneur) correspondent à une [règle de découverte][2]. Affichez, filtrez et triez les découvertes dans l'[Explorateur de découvertes][3] pour évaluer et améliorer votre posture de sécurité à l'exécution.

Datadog conserve un historique complet des découvertes pour l'investigation et l'audit.

## Explorateur de découvertes {#findings-explorer}

L'[Explorateur de découvertes][3] répertorie les découvertes sur l'ensemble de votre infrastructure. Chaque entrée indique la ressource affectée, la règle de découverte qui a généré la découverte, la date à laquelle le problème a été signalé pour la première fois, son état actuel et l'équipe ou le service responsable.

Cliquez sur {{< ui >}}View All{{< /ui >}} pour voir une liste complète des ressources affectées par la même règle de découverte.

### Filtrer les découvertes {#filter-findings}

Utilisez la barre de recherche et le panneau des facettes pour restreindre les découvertes par gravité, état de tri, règle, host ou conteneur.

Pour filtrer par état de tri, utilisez la requête de recherche `@workflow.triage.status:(open OR in-progress)`.

### Grouper les découvertes {#group-findings}

Utilisez {{< ui >}}Group by{{< /ui >}} pour organiser la liste :

- {{< ui >}}Rule Name{{< /ui >}} : Groupe les ressources par règle de découverte.
- {{< ui >}}Resource Name{{< /ui >}} : Groupe les découvertes par host ou conteneur.
- {{< ui >}}None{{< /ui >}} : Affiche une liste plate des découvertes.

### Enregistrer les vues {#save-views}

Pour enregistrer vos paramètres de recherche et de filtrage actuels pour une utilisation ultérieure, survolez {{< ui >}}Views{{< /ui >}} et cliquez sur {{< ui >}}Save as new view{{< /ui >}}.

## Détails de la découverte {#finding-details}

Cliquez sur n'importe quelle découverte pour ouvrir le panneau latéral contenant des informations détaillées sur la ressource et la règle de découverte qui l'a générée.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_side_panel.png" alt="Panneau latéral de découverte montrant la section Ce qui s'est passé et les contrôles de tri" width="100%">}}

La section {{< ui >}}What Happened{{< /ui >}} affiche :

- Quand la découverte a été signalée pour la première fois.
- L'emplacement de la ressource affectée.
- La règle de découverte qui a correspondu.

Sélectionnez l'onglet {{< ui >}}Trigger Event{{< /ui >}} pour examiner l'événement d'agent associé à la découverte.

### Conseils de remédiation {#remediation-guidance}

Chaque règle de découverte prête à l'emploi inclut des conseils de remédiation rédigés par l'équipe de sécurité Datadog. Sélectionnez l'onglet {{< ui >}}Remediation{{< /ui >}} pour examiner les étapes de remédiation et corriger la mauvaise configuration sous-jacente.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_remediation.png" alt="Détails de la découverte montrant les étapes de remédiation pour une ressource affectée" width="100%">}}

## Trier les découvertes {#triage-findings}

Utilisez {{< ui >}}Next Steps{{< /ui >}} dans le panneau latéral de découverte pour gérer les découvertes :

- {{< ui >}}Status{{< /ui >}} : Mettez à jour le statut de la découverte pour refléter la progression de l'enquête.
- {{< ui >}}Mute{{< /ui >}} : Supprimez une découverte pour une durée spécifiée lorsque le comportement est attendu ou acceptable.
- {{< ui >}}Add Ticket{{< /ui >}} : Ajoutez la découverte à un ticket pour un suivi.

[1]: /fr/security/workload_protection/
[2]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[3]: https://app.datadoghq.com/security/workload-protection/findings