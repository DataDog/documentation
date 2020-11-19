---
title: Limites de débit de l'Agent
kind: Documentation
aliases:
  - /fr/tracing/troubleshooting/apm_rate_limits
---
## Limite du nombre d'événements par seconde

Si le message d'erreur suivant apparaît dans vos logs de l'Agent, cela signifie que vos applications génèrent plus de 200 événements de trace par seconde, soit la limite autorisée par défaut par l'APM.

```
Max events per second reached (current=300.00/s, max=200.00/s). Some events are now being dropped (sample rate=0.54). Consider adjusting event sampling rates.

```

Pour augmenter la limite de débit de l'APM pour l'Agent, configurez l'attribut `max_events_per_second` dans le fichier de configuration de l'Agent (sous la section `apm_config:`). Pour les déploiements conteneurisés (tels que Docker ou Kubernetes), utilisez la variable d'environnement `DD_APM_MAX_EPS`.

**Remarque** : l'augmentation de la limite de débit de l'APM pourrait entraîner une augmentation des coûts de la fonction App Analytics.

## Limite de connexion

Si le message d'erreur suivant figure dans vos logs de l'Agent, cela signifie que la limite par défaut de 2 000 connexions de l'APM a été dépassée :

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

Pour augmenter la limite de connexion de l'APM pour l'Agent, configurez l'attribut `connection_limit` dans le fichier de configuration de l'Agent (dans la section `apm_config:`). Pour les déploiements conteneurisés (tels que Docker ou Kubernetes), utilisez la variable d'environnement `DD_APM_CONNECTION_LIMIT`.