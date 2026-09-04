---
description: Apprenez à utiliser le processeur Throttle pour définir une limite sur
  le nombre de logs envoyés dans une fenêtre temporelle donnée.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Throttle
---
{{< jqmath-vanilla >}}

{{< product-availability >}}

## Présentation {#overview}

Utilisez ce processeur pour définir une limite sur le nombre de logs envoyés dans une fenêtre temporelle donnée. Par exemple, vous pouvez définir une limite afin que seuls 100 logs soient envoyés par seconde. La définition d'une limite de taux peut vous aider à détecter les pics d'ingestion de logs et à éviter des coûts de facturation imprévus.

## Configuration {#setup}

Pour configurer le processeur :

1. Définissez une requête de filtre. Seuls les logs qui correspondent à la requête de filtrage spécifiée sont traités. Tous les logs correspondants sont limités. Les logs envoyés dans la limite de taux et ceux qui ne correspondent pas au filtre sont envoyés à l'étape suivante. Les logs envoyés après que la limite de taux a été atteinte sont abandonnés. Consultez la [Syntaxe de recherche][4] pour plus d'informations.
1. Définissez la limite de taux. Il s'agit du nombre d'événements autorisés pour un bucket donné pendant la fenêtre temporelle définie. **Remarque** : cette limite de taux est appliquée au **niveau de worker**. Si vous augmentez ou diminuez le nombre de workers, vous devrez peut-être ajuster la limite de taux du processeur en conséquence. Vous pouvez mettre à jour la limite de taux par programmation à l'aide de l'[API Observability Pipelines][1].
1. Définissez la fenêtre temporelle.
1. En option, cliquez sur {{< ui >}}Add Field{{< /ui >}} si vous souhaitez effectuer un regroupement par champ.

## Fonctionnement du processeur Throttle {#how-the-throttle-processor-works}

Le processeur Throttle définit une limite de taux sur le nombre de logs envoyés dans une fenêtre temporelle spécifiée. Bien qu'il soit similaire au [processeur Quota][2], la principale différence entre les processeurs Throttle et Quota est que la fenêtre temporelle du processeur Quota est fixée à 24 heures et ne peut pas être modifiée, tandis que celle du processeur Throttle peut être configurée. Comme la fenêtre temporelle du processeur Throttle est configurable, le processeur dispose d'un taux de réapprovisionnement de capacité basé sur la limite de taux et la fenêtre temporelle que vous définissez. Consultez [Taux de réapprovisionnement de la capacité](#capacity-replenishment-rate) pour plus d'informations.

Le tableau suivant compare le processeur Throttle avec le processeur Quota :

| Fonctionnalité | Processeur Quota | Processeur Throttle |
|---------|----------------|-------------------|
| Fenêtre temporelle | Fixée à 24 heures | Configurable |
| Gestion de la rafale initiale d'événements | Traite les données jusqu'à la limite quotidienne fixe. | Traite les événements jusqu'à votre limite de taux configurée. |
| Une fois la limite de taux atteinte | arrête le traitement des données jusqu'à ce que la fenêtre temporelle de 24 heures soit réinitialisée. | Se poursuit à un rythme régulier et calculé. |
| Mécanisme de réinitialisation | Se réinitialise toutes les 24 heures. | Réapprovisionnement continu. La fenêtre temporelle se réinitialise également si vous redéployez le Worker ou le pipeline. |
| Comment les limites sont stockées ou suivies | Les limites de quota persistent même si le Worker est redémarré, car les limites sont stockées dans le backend. | La fenêtre temporelle se réinitialise si vous redéployez le Worker ou le pipeline, car les limites de taux sont suivies dans la mémoire du Worker. |

### Capacité initiale {#initial-capacity}

{{< img src="observability_pipelines/processors/throttling_rate.png" alt="Le processeur Throttle avec la limite de taux réglée sur 1000 K" style="width:40%;" >}}

Lorsque le processeur Throttle est activé, le nombre de logs que le processeur laisse passer immédiatement est basé sur le configuré {{< ui >}}Throttling Rate{{< /ui >}}. Par exemple, si le {{< ui >}}Throttling Rate{{< /ui >}} est réglé sur `1000` événements sur 60 secondes, et que 5 000 événements arrivent au moment où le processeur est activé :

- Le processeur autorise le passage d'une capacité initiale de 1 000 événements.
- Les 4 000 événements restants sont supprimés.
- Ce comportement initial est identique à celui d'un processeur Quota.

### Taux de renouvellement de la capacité {#capacity-replenishment-rate}

Le processeur Throttle utilise un [generic cell rate algorithm][3], qui permet à un rythme régulier d'événements de passer. Le taux de renouvellement est basé sur les paramètres de votre processeur Throttle et permet à un certain nombre d'événements de passer par seconde. Ce taux peut être calculé comme suit :

$$\\text\"Limite de taux\" / \\text\"Fenêtre temporelle (en secondes)\"$$

#### Exemple {#example}

Si vous utilisez les paramètres de processeur suivants :
- Limite de taux = 1000 événements
- Fenêtre temporelle = 60 minutes (3600 secondes)

Le taux de renouvellement de la capacité est :

$$\\text\"1000 événements\" / \\text\"60 minutes\" ≈ \\text\"17 événements\"/ \\text\"minute\" ≈ \\text\"0,28 événements\"/ \\text\"seconde\"$$

Si `T` est le moment où le processeur est activé et que le processeur reçoit 5000 événements à ce moment-là, le nombre d'événements que le processeur laisse passer en fonction de `T` est le suivant :
- `T + 0` minutes (lorsque le processeur est activé) :
    - 1000 événements traités.
    - 4000 événements abandonnés.
- `T + 1` minute : ~17 événements peuvent être traités
- `T + 2` minutes : ~17 événements peuvent être traités
- ...le processeur continue de traiter les événements à un rythme régulier de ~17 événements par minute et abandonnant le reste jusqu'à la minute suivante.

**Remarque** : Le taux de renouvellement détermine le débit maximal après la capacité initiale. Vous pouvez ajuster la limite de taux pour obtenir un débit plus élevé ou plus faible si nécessaire.

[1]: /fr/api/latest/observability-pipelines/#update-a-pipeline
[2]: /fr/observability_pipelines/processors/quota/
[3]: https://en.wikipedia.org/wiki/Generic_cell_rate_algorithm
[4]: /fr/observability_pipelines/search_syntax/logs/