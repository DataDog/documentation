---
title: Ressources de l'Agent consommées par APM
---


L'Agent utilise le CPU, et sa charge processeur est corrélée au nombre de spans reçues par seconde.

Les charges utiles non traitées étant mises en attente dans la mémoire par l'Agent, toute limitation du processus de l'Agent en raison d'une limite CPU insuffisante risquerait d'engendrer un manque de mémoire.

## Détecter les problèmes de ressources CPU insuffisantes

Pour surveiller la charge CPU et anticiper les problèmes de ressources CPU insuffisantes, comparez le [pourcentage maximum du CPU][1] configuré pour l'Agent à la métrique `datadog.trace_agent.cpu_percent`. La métrique `datadog.trace_agent.cpu_percent` correspond à la charge processeur exprimée en pourcentage d'un cœur. Par exemple, `50` correspond à la moitié d'un cœur, et `200` correspond à deux cœurs.

Consultez la liste complète des [métriques APM de l'Agent][2].



## Ressources nécessaires

Pour déterminer les limites de ressources adéquates pour l'Agent, il est conseillé de se baser sur le nombre de spans reçues par seconde, c'est-à-dire la métrique `datadog.trace_agent.receiver.spans_received`. En fonction de la valeur de cette métrique, suivez le tableau ci-dessous pour choisir les limites CPU et mémoire adaptées :

| Spans par seconde  | CPU (cœur)   | Mémoire (Mo)  |
|----------|--------------|--------------|
| 2000       | 0.05         | 35           |
| 11 000      | 0.2          | 40           |
| 32 000      | 0.6          | 60           |
| 58 000      | 1            | 70           |
| 130 000     | 2            | 130          |

**Remarques :**
- Les valeurs sont basées sur les benchmarks de l'Agent `7.39.0`.
- Les benchmarks ont été mesurées sur une instance AWS `c5.2xlarge` (8 vCPU/ 16 Go de RAM)

[1]: /fr/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[2]: /fr/tracing/send_traces/agent-apm-metrics/