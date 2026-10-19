---
aliases:
- /fr/security/threats/security_signals
- /fr/security/workload_protection/security_signals
- /fr/security_platform/cspm/signals_explorer
- /fr/security/cspm/signals_explorer
- /fr/security/misconfigurations/signals_explorer
- /fr/security/cloud_security_management/misconfigurations/signals_explorer/
description: Recherchez, filtrez et triez les signaux de sécurité que génèrent les
  règles de détection de Workload Protection.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentation
  text: Explorez les règles de détection de Workload Protection
- link: /security/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de sécurité
title: Signaux
---
Les signaux de sécurité [Workload Protection][1] sont créés lorsque Datadog détecte une menace basée sur une règle de sécurité. Affichez, recherchez, filtrez et enquêtez sur les signaux de sécurité dans l'[Explorateur de signaux][2], ou configurez des [Règles de notification][3] pour envoyer des signaux à des outils tiers.

## Explorateur de signaux {#signals-explorer}

L'[Explorateur de signaux][2] répertorie les signaux de sécurité Workload Protection générés par les [règles de détection][5]. Utilisez la barre de recherche ou le panneau des facettes pour filtrer les signaux par gravité, état de tri, règle de détection, hôte, conteneur et autres attributs. Par exemple, pour filtrer par état de tri, utilisez `@workflow.triage.state:<status>`, où `<status>` est l'état souhaité (`open`, `under_review` ou `archived`). Vous pouvez également utiliser la facette {{< ui >}}Signal State{{< /ui >}} dans le panneau des facettes.

Sélectionnez un signal pour ouvrir le panneau latéral. À partir de là, vous pouvez [enquêter sur la menace][6] à l'aide du graphique d'investigation, de la chronologie, du contexte et du JSON du signal, ou [prendre des mesures][7] pour trier, escalader, automatiser ou répondre au signal.

## Étapes suivantes {#next-steps}

{{< whatsnext desc="Découvrez comment enquêter sur les signaux de Workload Protection et y répondre :" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}Enquêtez sur les signaux avec le graphique d'investigation, la chronologie et le JSON du signal{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}Triez et agissez sur les signaux : affectez, escaladez, automatisez et appliquez{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/security/workload_protection/
[2]: https://app.datadoghq.com/security/workload-protection/signals
[3]: /fr/security/notifications/rules/
[5]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[6]: /fr/security/workload_protection/investigate_and_triage/security_signals/investigate
[7]: /fr/security/workload_protection/investigate_and_triage/security_signals/actions