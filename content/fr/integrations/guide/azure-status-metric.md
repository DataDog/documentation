---
aliases:
- /fr/integrations/faq/azure-vm-status-is-not-reporting
- /fr/integrations/faq/azure-status-metric

title: Métrique count et status Azure
---

## Présentation

Datadog génère deux métriques supplémentaires pour chaque ressource surveillée à l'aide de [l'intégration Azure][1] : `azure.*.status` et `azure.*.count`. Par exemple, les machines virtuelles Azure surveillées par Datadog génèrent les métriques `azure.vm.status` et `azure.vm.count`. Ces deux métriques transmettent des informations similaires.

La métrique `azure.*.count` est une version améliorée de la métrique `azure.*.status`, qui est désormais obsolète.

## Métrique count

La métrique `azure.*.count` transmet deux informations essentielles :

- Le nombre de ressources du type en question
- Le statut de chaque ressource transmis par Azure

La métrique `azure.*.count` est créée dans le même espace de nommage que les autres métriques de ce type de ressource, par exemple `azure.network_loadbalancers.count`. Elle inclut les mêmes les tags de métadonnées que les autres métriques de cet espace de nommage, ainsi qu'un tag `status` supplémentaire.

### Cas d'utilisation

Grâce à la métrique `azure.*.count`, vous pouvez accomplir ce qui suit :

- Créez une vue qui affiche le nombre de machines virtuelles réparties selon l'évolution de leur statut, en représentant `azure.vm.count` sur l'ensemble des données et en ajoutant le tag `status`.
- Créez des widgets de requête dans des dashboards pour afficher le nombre de ressources d'un type donné. Utilisez tous les tags disponibles, notamment la région, le groupe de ressources, le type ou le statut, pour visualiser uniquement une agrégation pertinente.
- Créez des monitors pour recevoir des alertes à propos du statut de différentes ressources Azure.

**Remarque** : dans certains cas, les paramètres de visualisation par défaut peuvent ponctuellement sembler comptabiliser deux fois les ressources dans les graphiques ou les widgets de requête. Cela n'affecte pas les monitors ou les widgets filtrés sur un statut spécifique. Vous pouvez limiter ce comportement en désactivant l'[interpolation][2] dans les graphiques ou les widgets de requête. Pour ce faire, définissez l'interpolation sur « none » avec `.fill(null)`.

La plupart des types de ressources peuvent posséder l'un des statuts suivants :

- Running
- Unavailable
- Unknown
- Degraded
- Failed

Les machines virtuelles possèdent des statuts plus détaillés. En voici quelques exemples :

- Running
- Stopped_deallocated
- Stopped
- Unknown
- Unavailable
- Degraded
- Failed

Si le statut `query_failed` s'affiche, vous devez activer le [fournisseur de ressources Health](#depannage) dans Azure.

## Métrique status

La métrique `azure.*.status` était auparavant utilisée pour transmettre les mêmes informations. Elle indique le nombre de ressources disponibles pour chaque type de ressource Azure.

### Différences

Voici les principales différences entre les métriques `.status` et `.count` :

- La métrique `azure.*.count` inclut toutes les ressources du compte Azure, tandis que la métrique `azure.*.status` porte uniquement sur le nombre de ressources disponibles.
- La métrique `azure.*.count` inclut un tag `status` qui indique le statut de disponibilité spécifique de la ressource, tandis que la métrique `azure.*.status` inclut uniquement les tags standard pour le type de ressource.
- La métrique `azure.*.count` fournit de façon plus précise et fiable la valeur de la métrique.

## Dépannage

Si votre intégration Azure transmet des métriques, mais n'inclut pas la métrique `azure.*.status`, ou si le statut de la métrique `azure.*.count` est `status:query_failed`, cela signifie que vous devez enregistrer le fournisseur de ressources Azure Health dans votre abonnement Azure.

Si vous utilisez l'interface de ligne de commande Azure :
```bash
azure login # Se connecter avec l'utilisateur Azure associé au compte Datadog
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

La métrique `azure.*.status` devrait s'afficher dans Datadog après 5 à 10 minutes d'attente.

[1]: /fr/integrations/azure/
[2]: /fr/metrics/guide/interpolation-the-fill-modifier-explained/