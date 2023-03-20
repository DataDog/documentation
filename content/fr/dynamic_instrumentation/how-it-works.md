---
kind: documentation
private: true
title: Fonctionnement de l'instrumentation dynamique
---


## Présentation

L'instrumentation dynamique vous permet d'analyser vos systèmes de production en plaçant des sondes n'importe où dans votre code, y compris dans des bibliothèques tierces. Ce type d'instrumentation a très peu d'impact sur les performances et n'aura aucun effet secondaire sur votre système.

## Types de sondes

Vous pouvez créer des *sondes snapshot* et des *sondes métrique*.

### Sondes snapshot

Les sondes snapshot capturent le contexte d'une méthode ou d'une ligne de code, y compris :

  - Les **arguments de la méthode**, les **variables locales** et les **champs**. Les éléments capturés sont soumis aux limites suivantes :
    - Jusqu'à trois niveaux de profondeur pour les objets de classe.
    - 100 premiers éléments au sein des collections.
    - 255 caractères pour les valeurs de type chaîne.
    - 20 champs recueillis dans un objet. Les champs statiques ne sont pas recueillis.
  - **Stack trace** de l'appel.
  - **Exceptions** interceptées et non interceptées.

Les sondes snapshot sont limitées à un snapshot par seconde.

**Remarque** : les limites de capture peuvent être configurées et sont susceptibles d'évoluer pendant la version bêta de l'instrumentation dynamique.

### Sondes métrique

Les sondes métrique génèrent une métrique dynamique. Elles utilisent n'importe quel argument, variable locale ou champ comme valeur de métrique. Les sondes métrique ne sont soumises à aucune limite de taux et sont invoquées chaque fois que la méthode ou la ligne est invoquée.

Les sondes métrique dynamiques prennent en charge les types de métriques suivants :

- [**Count**][1] : compte le nombre d'exécutions d'une méthode ou une ligne donnée. Cette métrique peut être combinée à des [expressions de métriques](#expressions-de-metriques) pour compter les valeurs d'une variable.
- [**Gauge**][2] : génère une métrique gauge en fonction de la dernière valeur d'une variable. Cette métrique nécessite une [expression de métrique](#expressions-de-metriques).
- [**Histogram**][3] : génère une distribution statistique d'une variable. Cette métrique nécessite une [expression de métrique](#expressions-de-metriques).


#### Expressions de métrique

Les expressions de métriques peuvent être utilisées pour générer des métriques dynamiques. Par exemple, vous pouvez créer une métrique histogram correspondant à la taille d'un fichier en utilisant une expression de référence comme `#file.content.size`.

La première partie de l'expression de référence est un préfixe qui indique la source de la variable :

- `.` (point) - Pour accéder aux champs de la classe locale
- `#` (croisillon) - Pour accéder aux variables locales
- `^` (caret) - Pour accéder aux arguments de la méthode

Vous pouvez utiliser plusieurs segments de référence pour accéder à des champs internes. Les expressions de métriques peuvent uniquement accéder aux champs d'un objet (qu'ils soient publics ou privés). Si le champ dans une expression de référence n'existe pas ou renvoie une valeur null, le chemin de référence se termine.

[1]: /fr/metrics/types/?tab=count#metric-types
[2]: /fr/metrics/types/?tab=gauge#metric-types
[3]: /fr/metrics/types/?tab=histogram#metric-types