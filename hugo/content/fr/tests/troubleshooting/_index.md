---
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Découvrir comment surveiller vos tests CI
title: Dépannage de Test Visibility
---

## Présentation

Le contenu de cette page vous aide à résoudre les problèmes que vous pouvez rencontrer avec Test Visibility. Contactez [l'assistance Datadog][2] si vous avez besoin d'aide supplémentaire.

## Vos tests sont instrumentés, mais Datadog n'affiche aucune donnée

1. Accédez à la page [**Tests**][3], sélectionnez le langage que vous instrumentez, puis vérifiez que le framework de test que vous utilisez est pris en charge dans la section **Compatibilité**.
2. Vérifiez si la section [**Test Runs**][4] contient des résultats de test. Si des résultats sont affichés dans cette section, mais pas dans la section [**Tests**][5], cela signifie que des informations Git sont manquantes. Consultez la rubrique [Données affichées pour les exécutions de test mais pas pour les tests](#donnees-affichees-pour-les-executions-de-test-mais-pas-pour-les-tests) pour résoudre ce problème.
3. Si vous transmettez les données via l'Agent Datadog, assurez-vous qu'il s'exécute sur le host sur lequel les tests sont exécutés (accessible sur `localhost:8126`). Sinon, si l'Agent est accessible sur un autre hostname ou port, vérifiez que vous exécutez vos tests avec le bon hostname et le bon port, tels que définis dans les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Vous pouvez activer le [mode debugging][6] dans le traceur pour vérifier si ce dernier parvient à se connecter à l'Agent.
4. Si vous ne voyez toujours pas de données, [contactez l'assistance][2] pour résoudre le problème.

## Vous importez des rapports de test JUnit avec `datadog-ci`, mais une partie ou l'ensemble des tests sont manquants
Si vous importez des fichiers de rapport de test JUnit avec l'interface de ligne de commande `datadog-ci` et que vous ne voyez aucun test, il est probable que les tests sont ignorés car les rapports sont considérés comme incorrects.

Un rapport de test JUnit est considéré comme incorrect s'il répond à l'un des critères suivants :
* Le timestamp des tests transmis est antérieur de plus de **17 heures** à l'heure d'importation du rapport.
* La collection de tests ne porte pas de nom.

## Données affichées pour les exécutions de test mais pas pour les tests

Si l'onglet **Test Runs** affiche des résultats, mais que l'onglet **Tests** est vide, il est probable que des métadonnées Git (référentiel, commit ou branche) soient manquantes. Pour vérifier si c'est le cas, ouvrez une exécution de test dans la section [**Test Runs**][4], puis vérifiez si les tags `git.repository_url`, `git.commit.sha` ou `git.branch` sont présents. S'ils ne sont pas fournis, la section [**Tests**][5] ne peut pas afficher de données.

1. Pour recueillir des informations Git, les traceurs utilisent en priorité les variables d'environnement, le cas échéant, définies par le fournisseur CI. Consultez la section [Tests au sein de conteneurs][7] pour obtenir la liste des variables d'environnement que les traceurs essaient de lire pour chaque fournisseur CI pris en charge. Les traceurs récupèrent au minimum le référentiel, le hash de commit et la branche.
2. Les traceurs exécutent ensuite des commandes `git` pour récupérer des métadonnées Git à l'aide du dossier `.git` local (si celui-ci existe). Cette opération permet de remplir tous les champs de métadonnées Git, y compris le message de commit, l'auteur et le responsable du commit. Vérifiez que le dossier `.git` existe bien et que le binaire `git` est installé dans `$PATH`. Ces informations permettent de récupérer les attributs qui n'ont pas été détectés lors des étapes précédentes.
3. Vous pouvez également fournir manuellement des données Git à l'aide de variables d'environnement. Celles-ci remplacent toutes les données détectées auparavant.

   Vous pouvez utiliser les variables d'environnement suivantes pour fournir des données Git :

   `DD_GIT_REPOSITORY_URL` **(obligatoire)**
   : URL du référentiel où se trouve le code. Les URL HTTP et SSH sont prises en charge.<br/>
   **Exemple** : `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

   `DD_GIT_COMMIT_SHA` **(obligatoire)**
   : Hash entier du commit (SHA1 de 40 caractères).<br/>
   **Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

   `DD_GIT_BRANCH`
   : Branche Git testée. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
   **Exemple** : `develop`

   `DD_GIT_TAG`
   : Tag Git testé (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
   **Exemple** : `1.0.1`

   `DD_GIT_COMMIT_MESSAGE`
   : Message du commit.<br/>
   **Exemple** : `Set release number`

   `DD_GIT_COMMIT_AUTHOR_NAME`
   : Nom de l'auteur du commit.<br/>
   **Exemple** : `John Smith`

   `DD_GIT_COMMIT_AUTHOR_EMAIL`
   : Adresse e-mail de l'auteur du commit.<br/>
   **Exemple** : `john@example.com`

   `DD_GIT_COMMIT_AUTHOR_DATE`
   : Date de l'auteur du commit, au format ISO 8601.<br/>
   **Exemple** : `2021-03-12T16:00:28Z`

   `DD_GIT_COMMIT_COMMITTER_NAME`
   : Nom du responsable du commit.<br/>
   **Exemple** : `Jane Smith`

   `DD_GIT_COMMIT_COMMITTER_EMAIL`
   : Adresse e-mail du responsable du commit.<br/>
   **Exemple** : `jane@example.com`

   `DD_GIT_COMMIT_COMMITTER_DATE`
   : Date du responsable du commit, au format ISO 8601.<br/>
   **Exemple** : `2021-03-12T16:00:28Z`

4. Si aucune variable d'environnement du fournisseur CI n'est détectée, les résultats de test sont envoyés sans métadonnées Git.

### La durée totale du test est vide
Si vous ne pouvez pas voir la durée totale du test, il est probable que la visibilité sur les collections de test n'est pas activée. Pour confirmer, vérifiez si votre langue prend en charge la visibilité sur les collections de test dans [Fonctionnalités prises en charge][14]. Si cette fonctionnalité est prise en charge, mettez à jour votre traceur avec la dernière version.

Si, après avoir mis à jour la version du traceur, la durée totale n'est toujours pas indiquée, contactez l'[assistance Datadog][2] pour obtenir de l'aide.

### La durée totale du test est différente de celle prévue

#### Méthode de calcul de la durée totale
La durée totale est définie comme étant la somme des durées maximales des sessions de test.

1. La durée maximale d'une session de test regroupée par l'empreinte de la session de test est calculée.
2. Les durées maximales des sessions de test sont additionnées.

## Valeur inattendue du nombre de statuts des tests

Le nombre de statuts des tests est calculé en fonction des tests uniques recueillis. Le caractère unique d'un test est défini non seulement par sa collection et son nom, mais également par les paramètres et les configurations du test.

### Le nombre est plus faible que prévu

Si le nombre est plus faible que prévu, cela peut vouloir dire que la bibliothèque ou l'outil que vous utilisez pour recueillir les données des tests ne peut pas recueillir les paramètres des tests et/ou certaines configurations des tests.

1. Si vous importez des fichiers de rapport de test JUnit :
    1. Si vous exécutez les mêmes tests dans d'autres configurations de l'environnement, [assurez-vous de définir ces tags de configuration lors de l'importation][10].
    2. Si vous exécutez des tests paramétrés, il est fort probable que le rapport JUnit ne contienne pas ces informations. [Essayez d'utiliser une bibliothèque native pour transmettre les données des tests][3].
2. Si les résultats que vous voyez ne sont toujours pas ceux attendus, [contactez l'assistance Datadog][2] pour résoudre le problème.

### Les nombres avec le statut Passed/Failed/Skipped sont différents de ceux attendus

Si le même test est recueilli plusieurs fois pour le même commit, mais que les statuts sont différents, le résultat agrégé suit l'algorithme du tableau ci-dessous :

| **Statut des tests - Premier essai** | **Statut des tests – Nouvelle tentative 1** | **Résultat** |
|-----------------------------|----------------------------|------------|
| `Passed`                    | `Passed`                   | `Passed`   |
| `Passed`                    | `Failed`                   | `Passed`   |
| `Passed`                    | `Skipped`                  | `Passed`   |
| `Failed`                    | `Passed`                   | `Passed`   |
| `Failed`                    | `Failed`                   | `Failed`   |
| `Failed`                    | `Skipped`                  | `Failed`   |
| `Skipped`                   | `Passed`                   | `Passed`   |
| `Skipped`                   | `Failed`                   | `Failed`   |
| `Skipped`                   | `Skipped`                  | `Skipped`  |

## La branche par défaut n'est pas correcte

### Son impact sur le produit

La branche par défaut est utilisée pour alimenter certaines fonctionnalités des produits, comme :

- Liste des branches par défaut sur la page Tests : cette liste affiche uniquement les branches par défaut. Si vous définissez la mauvaise branche par défaut, des données peuvent manquer ou être incorrectes dans la liste des branches par défaut.

- Nouveaux tests irréguliers : tests non encore classés comme irréguliers dans la branche par défaut. Si la branche par défaut n'est pas correctement définie, le nombre de nouveaux tests irréguliers détectés peut être erroné.

- Liste des pipelines : cette liste des pipelines affiche uniquement les branches par défaut. Si vous définissez la mauvaise branche par défaut, des données peuvent manquer ou être incorrectes dans la liste des pipelines.

### Comment corriger la branche par défaut

Si vous disposez d'un accès administrateur, vous pouvez la mettre à jour à partir de la [page des paramètres du référentiel][11].

## L'historique de l'exécution n'est pas disponible pour un scénario de test spécifique

Les autres symptômes du même problème sont les suivants :
- Un scénario de test n'est pas classé comme étant irrégulier même s'il présente des irrégularités.
- Un scénario de test ne peut pas être ignoré par [Intelligent Test Runner][12].

Il est probable que la [configuration du scénario de test][13] soit instable parce qu'un ou plusieurs des paramètres de test ne sont pas déterministes (par exemple, ils incluent la date du jour ou un nombre aléatoire).

La meilleure façon d'y remédier est de s'assurer que les paramètres du test sont les mêmes d'un cycle à l'autre.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /fr/help/
[3]: /fr/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /fr/tracing/troubleshooting/tracer_debug_logs
[7]: /fr/continuous_integration/tests/containers/
[8]: https://github.com/travisjeffery/timecop
[9]: https://github.com/spulec/freezegun
[10]: /fr/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[11]: https://app.datadoghq.com/source-code/repositories
[12]: /fr/continuous_integration/intelligent_test_runner/
[13]: /fr/tests/#parameterized-test-configurations
[14]: /fr/tests/#supported-features