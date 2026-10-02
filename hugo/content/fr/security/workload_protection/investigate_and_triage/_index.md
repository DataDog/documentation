---
description: Étudiez les événements de l'agent Workload Protection de travail, les
  signaux de sécurité et les constatations dans Datadog.
disable_toc: false
title: Étudiez et triez
---
À mesure que Workload Protection évalue l'activité à l'exécution, elle produit des événements d'agent, des signaux et des constatations. Utilisez Agent Events Explorer pour étudier l'activité à l'exécution, l'explorateur de signaux pour étudier les menaces et l'explorateur de constatations pour examiner les problèmes de posture de sécurité à l'exécution.

Pour savoir comment chacun est produit, consultez [Comment fonctionne Workload Protection][4].

## Événements d'agent {#agent-events}

Les [événements d'agent][1] sont la télémétrie brute générée par Datadog Agent lorsque l'activité à l'exécution correspond à une règle d'agent. Utilisez Agent Events Explorer pour étudier cette activité.

## Signaux {#signals}

Les [signaux][2] sont générés lorsque les événements de l'agent correspondent à une règle de détection backend. Utilisez l'explorateur de signaux pour étudier les menaces, trier les signaux et prendre des mesures de réponse.

{{< whatsnext desc="Explorez les signaux de Workload Protection :" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}Étudiez les signaux{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}Triez et agissez sur les signaux{{< /nextlink >}}
{{< /whatsnext >}}

## Constatations {#findings}

Les [constatations][3] sont générées lorsque les événements de l'agent correspondent à une règle de constatation. Utilisez l'explorateur de constatations pour examiner les problèmes de posture de sécurité à l'exécution.

[1]: /fr/security/workload_protection/investigate_and_triage/agent_events
[2]: /fr/security/workload_protection/investigate_and_triage/security_signals
[3]: /fr/security/workload_protection/investigate_and_triage/security_findings
[4]: /fr/security/workload_protection/#evaluating-activity