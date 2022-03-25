---
kind: documentation
title: Dépannage de CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Votre instance Jenkins est instrumentée, mais Datadog n'affiche aucune donnée

1. Vérifiez que l'exécution d'au moins un pipeline est terminée. Les informations sur l'exécution des pipelines sont uniquement envoyées une fois le processus terminé.
2. Vérifiez que le host de l'Agent Datadog est correctement configuré et que le plug-in Datadog parvient à communiquer avec lui. Pour tester sa connectivité, cliquez sur le bouton **Check connectivity with the Datadog Agent** dans l'interface de la configuration du plug-in Jenkins.
3. Si vous ne voyez toujours pas de données, [contactez l'assistance][1] pour résoudre le problème.

### Vos tests sont instrumentés, mais Datadog n'affiche aucune donnée

1. Accédez à la page [Configurer le tracing sur les tests CI][2], sélectionnez le langage que vous instrumentez, puis consultez la section _Compatibilité_. Vérifiez que le framework de test que vous utilisez est pris en charge.
2. Vérifiez si la section [Test Runs][3] contient des résultats de test. Si des résultats sont affichés dans cette section, mais pas dans la section [Tests][4], cela signifie que des informations Git sont manquantes. Consultez la rubrique [Données affichées pour les exécutions de test mais pas pour les tests](donnes-affichees-pour-les-executions-de-test-mais-pas-pour-les-tests) pour résoudre ce problème.
3. Pour les langages autres que Swift, assurez-vous que l'Agent Datadog s'exécute sur le host sur lequel les tests sont exécutés (accessible sur `localhost:8126`). Sinon, si l'Agent est accessible sur un autre hostname ou port, vérifiez que vous exécutez vos tests avec le bon hostname et le bon port, tels que définis dans les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Vous pouvez activer le [mode debugging][5] dans le traceur pour vérifier si ce dernier parvient à se connecter à l'Agent.
4. Si vous ne voyez toujours pas de données, [contactez l'assistance][1] pour résoudre le problème.

### Message « Pipeline not found »

Le message « Pipeline not found » s'affiche lorsque vous cliquez sur des données incomplètes provenant d'un pipeline en cours d'exécution. Les données sont transmises au fur et à mesure pour les étapes, tâches ou commandes personnalisées. Patientez jusqu'à la fin de l'exécution du pipeline, puis réessayez.

### Données affichées pour les exécutions de test mais pas pour les tests

Si l'onglet **Test Runs** affiche des résultats, mais que l'onglet **Tests** est vide, il est probable que des métadonnées Git (référentiel, commit et/ou branche) soient manquantes. Pour vérifier si c'est le cas, ouvrez une exécution de test dans la section [Test Runs][3], puis vérifiez si les tags `git.repository_url`, `git.commit.sha` ou `git.branch` sont présents. S'ils ne sont pas fournis, la section [Tests][4] ne peut pas afficher de données.

1. Pour recueillir des informations Git, les traceurs utilisent en priorité les variables d'environnement, le cas échéant, définies par le fournisseur CI. Consultez la section [Tests au sein de conteneurs][6] pour obtenir la liste des variables d'environnement que les traceurs essaient de lire pour chaque fournisseur CI pris en charge. Les traceurs récupèrent au minimum le référentiel, le hash de commit et la branche.
2. Les traceurs exécutent ensuite des commandes `git` pour récupérer des métadonnées Git à l'aide du dossier `.git` local (si celui-ci existe). Cette opération permet de remplir tous les champs de métadonnées Git, y compris le message de commit, l'auteur et le responsable du commit. Vérifiez que le dossier `.git` existe bien et que le binaire `git` est installé dans `$PATH`. Ces informations permettent de récupérer les attributs qui n'ont pas été détectés lors des étapes précédentes.
3. Vous pouvez également fournir manuellement des données Git à l'aide de variables d'environnement. Celles-ci remplacent toutes les données détectées auparavant. Vous pouvez utiliser les variables d'environnement suivantes pour fournir des données Git :

   `DD_GIT_REPOSITORY_URL`
   : URL du référentiel où se trouve le code. Les URL HTTP et SSH sont prises en charge.<br/>
   **Exemple** : `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

   `DD_GIT_BRANCH`
   : Branche Git testée. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
   **Exemple** : `develop`

   `DD_GIT_TAG`
   : Tag Git testé (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
   **Exemple** : `1.0.1`

   `DD_GIT_COMMIT_SHA`
   : Hash entier du commit.<br/>
   **Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

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

### Wall time des tests vide

Si aucun wall time n'est indiqué pour vos tests, il est probable que des métadonnées du fournisseur CI soient manquantes. Pour vérifier si c'est le cas, ouvrez une exécution de test dans la section [Test Runs][3], puis vérifiez si les tags `ci.pipeline.id`, `ci.pipeline.name`, `ci.pipeline.number` ou `ci.job.url` sont manquants. S'ils ne sont pas fournis, aucune valeur n'est affichée dans la colonne du wall time.

1. Pour recueillir ces informations, les traceurs utilisent les variables d'environnement définies par le fournisseur CI. Consultez la section [Tests au sein de conteneurs][6] pour obtenir la liste des variables d'environnement que les traceurs essaient de lire pour chaque fournisseur CI pris en charge. Vérifiez que les variables d'environnement sont définies sur les valeurs attendues.
2. Vérifiez que vous exécutez vos tests dans l'environnement d'un fournisseur CI pris en charge. Pour obtenir la liste des fournisseurs CI pris en charge, consultez la section [Tests au sein de conteneurs][6]. Seuls les fournisseurs CI répertoriés peuvent extraire les données pour ajouter aux métadonnées des informations CI.
3. Si, après ces vérifications, le wall time n'est toujours pas indiqué, contactez l'[assistance Datadog][1] pour obtenir de l'aide.

### Valeur inattendue du wall time des tests

#### Méthode de calcul du wall time
Le wall time correspond à la durée entre le début du premier test et la fin du dernier test pour une pipeline donnée.

Il est calculé de la façon suivante :

1. Le hash est calculé à partir des informations CI afin de regrouper les tests.
  a) Si les tests comprennent le tag `ci.job.url`, il est utilisé pour calculer le hash.
  b) Si les tests ne comprennent pas le tag `ci.job.url`, la formule `ci.pipeline.id` + `ci.pipeline.name` + `ci.pipeline.number` est utilisée pour calculer le hash.
2. Le wall time calculé est associé au hash pertinent. **Remarque** : si plusieurs tâches exécutent des tests, le wall time correspond à la différence entre le début du premier test de la première tâche et la fin du dernier test de la dernière tâche.

#### Problèmes potentiels de calcul du wall time
Si vous utilisez une bibliothèque pour tester du code basé sur des heures, comme [timecop][7] pour Ruby ou [FreezeGun][8] pour Python, il est possible que les timestamps des tests soient erronés, ce qui entraîne alors des erreurs de calcul pour le wall time. Si c'est le cas, veillez à ce que les modifications des heures soient annulées avant la fin de vos tests. 

### Besoin d'aide supplémentaire ?

Si vous n'avez pas résolu votre problème, contactez l'[assistance Datadog][1].


[1]: /fr/help/
[2]: /fr/continuous_integration/setup_tests/
[3]: https://app.datadoghq.com/ci/test-runs
[4]: https://app.datadoghq.com/ci/test-services
[5]: /fr/tracing/troubleshooting/tracer_debug_logs
[6]: /fr/continuous_integration/setup_tests/containers/
[7]: https://github.com/travisjeffery/timecop
[8]: https://github.com/spulec/freezegun