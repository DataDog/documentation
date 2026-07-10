---
aliases:
- /fr/tracing/troubleshooting/apm_rate_limits
title: Limites de débit de l'Agent
---

## Limite de connexions par seconde

Si le message d'erreur suivant figure dans vos logs de l'Agent, cela signifie que la limite par défaut de 2 000 connexions de l'APM a été dépassée :

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

Pour augmenter la limite de connexion de l'APM pour l'Agent, configurez l'attribut `connection_limit` dans le fichier de configuration de l'Agent (dans la section `apm_config:`). Pour les déploiements conteneurisés (tels que Docker ou Kubernetes), utilisez la variable d'environnement `DD_APM_CONNECTION_LIMIT`.

## Limite de mémoire

Si le message d'erreur suivant figure dans les logs de votre Agent, cela signifie que l'Agent a atteint 150 % de la limite de mémoire :

```
CRITICAL | (pkg/trace/api/api.go:703 in watchdog) | Killing process. Memory threshold exceeded: 8238.08M / 715.26M
CRITICAL | (pkg/trace/osutil/file.go:39 in Exitf) | OOM
```

Pour augmenter la limite de mémoire pour l'Agent, configurez l'attribut `max_memory` à la section `apm_config` du fichier de configuration de l'Agent. Pour les déploiements conteneurisés (tels que Docker ou Kubernetes), utilisez la variable d'environnement `DD_APM_MAX_MEMORY`.

Si vous souhaitez que votre service d'orchestration (par exemple, Kubernetes) gère vos limites de mémoire, vous pouvez désactiver cette limite en la définissant sur `0` (fonctionnalité disponible depuis la version 7.23.0 de l'Agent Datadog).

## Pourcentage maximal du CPU

Ce paramètre définit le pourcentage maximal du CPU utilisable par l'Agent APM. Dans des environnements autres que Kubernetes, cette valeur est définie par défaut sur 50, soit 0,5 cœur (100 = 1 cœur). Lorsque cette limite est atteinte, les charges utiles sont rejetées jusqu'à ce que la charge CPU repasse sous la limite. Le paramètre `datadog.trace_agent.receiver.ratelimit` représente le pourcentage de charges utiles qui sont actuellement ignorées (la valeur 1 signifie que toutes les traces sont transmises). Ce comportement peut également être indiqué dans le [tableau des services][1], sous la forme d'un avertissement `Limited Resource`.

Pour que votre service d'orchestration ou qu'un service externe gère les limites des ressources pour l'Agent Datadog, il est recommandé de désactiver cette limite en définissant la variable d'environnement `DD_APM_MAX_CPU_PERCENT` sur `0` (fonctionnalité disponible depuis la version 7.23.0 de l'Agent Datadog).

[1]: /fr/tracing/trace_pipeline/ingestion_controls/#service-table-view