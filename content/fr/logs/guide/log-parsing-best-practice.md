---
title: "Parsing de log\_: bonnes pratiques à adopter"
kind: guide
aliases:
  - /fr/logs/faq/log-parsing-best-practice
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: /logs/processing/parsing/
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: /logs/faq/how-to-investigate-a-log-parsing-issue/
    tag: FAQ
    text: "Comment étudier un problème de parsing de log\_?"
---
Datadog vous permet de définir des parsers afin d'extraire toutes les informations pertinentes figurant dans vos logs. Consultez [notre documentation][1] pour en savoir plus sur le langage de parsing et sur ses applications.

Cet article décrit comment procéder au parsing d'un log à partir du log du Collector de l'Agent Datadog :

```text
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

1. **Ajoutez toujours en commentaire à votre règle l'exemple de log sur lequel vous travaillez** :  
    {{< img src="logs/faq/parsing_best_practice_1.png" alt="bonne_pratique_parsing_1"  >}}
    Il est possible de tester votre règle de parsing dans un exemple de log. Cet exemple simplifie la rédaction initiale de la règle et peut s'avérer utile si jamais vous cherchez à résoudre un problème ou à prendre en charge un nouveau format de log.

2. **Pour que le parsing ne cible qu'un seul attribut, utilisez l'astérisque (*) ** :  
    vous n'avez pas besoin de rédiger une règle de parsing du premier coup. Vérifiez un par un les attributs de votre règle en ajoutant un astérisque `.*` à la fin de la règle. Cela vous permet d'obtenir un résultat pour tout contenu suivant la fin de votre règle.
    Ici, vous voulez par exemple parser la date du log, peu importe ce qui suit. Créez la règle ci-dessous :
    {{< img src="logs/faq/parsing_best_practice_2.png" alt="bonne_pratique_parsing_2" >}}
    Vous savez alors que la date est parsée correctement. Vous pouvez maintenant passer à l'attribut suivant : la gravité.
    Vous devez commencer par échapper la barre verticale (il est obligatoire d'échapper les caractères spéciaux), puis faire correspondre le mot :
    {{< img src="logs/faq/parsing_best_practice_3.png" alt="bonne_pratique_parsing_3" >}}
    Vous pouvez ensuite continuer jusqu'à l'extraction de tous les attributs souhaités de ce log.

3. **Utilisez les bons matchers** :
    pourquoi faire compliqué quand on peut faire simple. Souvent, il n'y a pas besoin d'essayer de définir une expression régulière complexe pour faire correspondre une expression spécifique, alors qu'un simple `notSpace` peut s'en charger.
    Tenez compte des matchers suivants lors de la création d'une règle de parsing :

    * notSpace : renvoie tous les caractères jusqu'à la prochaine espace.
    * data : renvoie tous les caractères (similaire à « .* »).
    * word : renvoie tous les prochains caractères alphanumériques.
    * integer : renvoie un nombre entier décimal et l'analyse en tant que nombre entier.

    La plupart des règles peuvent être rédigées avec ces quatre matchers. Vous pouvez consulter la liste complète des matchers disponibles dans la [documentation relative au parsing][2].

4. **KeyValue** :
    sachez qu'il existe un filtre keyvalue vous permettant d'extraire automatiquement tous vos attributs.
    Consultez [les exemples][3] pour en savoir plus

5. **Ignorer une partie de votre message de log qui ne devrait pas être extraite en tant qu'attributs** :
    reprenons l'exemple :
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
    Supposez que l'information dd.collector ne vous intéresse pas. Vous ne souhaitez donc pas l'extraire en tant qu'attribut.
    Vous devez alors supprimer la section d'extraction de la règle :
    {{< img src="logs/faq/parsing_best_practice_4.png" alt="bonne_pratique_parsing_4" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/parsing/
[2]: /fr/logs/processing/parsing/?tab=matcher#matcher-and-filter
[3]: /fr/logs/processing/parsing/#key-value