---
aliases:
- /fr/continuous_integration/intelligent_test_runner/
- /fr/intelligent_test_runner
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centre d'apprentissage
  text: Démarrage avec Test Optimization
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Simplifiez vos tests CI à l'aide de Datadog Intelligent Test Runner
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Surveiller tous vos pipelines CI avec Datadog
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
title: Test Impact Analysis
---
<div class="alert alert-danger"> Cette fonctionnalité était autrefois appelée Intelligent Test Runner, et certains tags contiennent encore « itr ».</div>

## Présentation {#overview}

Test Impact Analysis sélectionne et exécute automatiquement uniquement les tests pertinents pour un commit donné en fonction du code modifié. Réduisez considérablement le temps consacré aux tests et les coûts globaux de CI, tout en maintenant la couverture des tests.

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis activé dans une session de test montrant les gains de temps obtenus.">}}

Test Impact Analysis analyse votre collection de tests pour identifier le code couvert par chaque test. Elle croise ensuite cette couverture avec les fichiers impactés par une nouvelle modification de code. Datadog utilise ces informations pour exécuter une sélection de tests pertinents et impactés, en omettant ceux qui ne sont pas affectés par la modification de code et en réduisant la durée globale des tests. Pour en savoir plus, consultez [Fonctionnement][1].

En minimisant le nombre de tests exécutés par commit, Test Impact Analysis réduit la fréquence à laquelle les [tests instables][2] perturbent vos pipelines. Cela peut être particulièrement frustrant lorsque l'instabilité du test n'est pas liée à la modification de code testée. Après avoir activé Test Impact Analysis pour vos services de test, vous pouvez limiter chaque commit aux tests pertinents afin d'éviter que des tests instables sans rapport avec votre modification de code ne bloquent arbitrairement votre build.

### Limitations de la configuration prête à l'emploi {#out-of-the-box-configuration-limitations}

Avec la configuration par défaut, il existe des situations connues dans lesquelles Test Impact Analysis peut ignorer des tests qui auraient dû être exécutés. Plus précisément, Test Impact Analysis ne peut pas détecter automatiquement les modifications apportées aux éléments suivants :

- Dépendances de bibliothèque
- Options du compilateur
- Services externes
- Modifications des fichiers de données dans les tests pilotés par les données

Dans ces scénarios, Test Impact Analysis peut ignorer des tests impactés avec la configuration prête à l'emploi.

Il existe plusieurs mécanismes de configuration que vous pouvez utiliser dans ces scénarios pour garantir qu'aucun test n'est ignoré :

- Vous pouvez marquer certains fichiers de votre dépôt comme [fichiers suivis](#tracked-files), ce qui entraîne l'exécution de tous les tests chaque fois que ces fichiers sont modifiés. Les Dockerfiles, Makefiles, fichiers de dépendances et autres fichiers de configuration de build sont de bons candidats pour les fichiers suivis.
- Vous pouvez marquer certains tests dans votre code source comme ne pouvant pas être ignorés afin de garantir qu'ils sont toujours exécutés. Ceci est particulièrement adapté aux tests pilotés par les données ou aux tests qui interagissent avec des systèmes externes. Plus d'informations sur la [page de configuration][3].
- Si vous créez un commit risqué et que vous souhaitez exécuter tous les tests, ajoutez `ITR:NoSkip` (sans distinction de casse) n'importe où dans votre message de commit Git.
- Si GitHub est votre fournisseur de gestion de code source, utilisez l'étiquette `ITR:NoSkip` (sans distinction de casse) pour empêcher Test Impact Analysis d'ignorer des tests dans les pull requests. Pour utiliser cette fonctionnalité, configurez GitHub App à l'aide de la [tuile d'intégration GitHub][9] avec la fonctionnalité `Software Delivery: Collect Pull Request Information` activée. Ce mécanisme ne fonctionne pas avec les tests exécutés dans GitHub Actions et déclenchés par des événements `pull_request`.
- Vous pouvez ajouter une liste de [branches exclues](#excluded-branches), ce qui désactive Test Impact Analysis sur ces branches.

## Limites d'échelle et de précision {#scale-and-accuracy-limits}

Test Impact Analysis détermine quels tests ignorer en comparant les fichiers couverts par chaque test aux fichiers modifiés par un commit. Les comportements suivants sont les cas connus où cette correspondance est intentionnellement prudente, afin que vous sachiez à quoi vous attendre.

<div class="alert alert-info">Tous les comportements de cette section sont sûrs par conception : ils peuvent seulement entraîner l'exécution de <strong>plus</strong> de tests, et jamais l'omission d'un test qui aurait dû être exécuté. Pour les modifications de code que Datadog ne peut pas détecter automatiquement, consultez <a href="#out-of-the-box-configuration-limitations">Limitations de la configuration prête à l'emploi</a>.</div>

### Limites d'échelle {#scale-limits}

Test Impact Analysis applique les limites de taille suivantes :

- Datadog analyse jusqu'aux 100 commits les plus récents pour une modification. Sur les grands ensembles de modifications, certains commits plus anciens peuvent ne pas être analysés, ce qui entraîne une légère diminution du nombre de tests ignorés.
- Si un seul commit modifie plus de 5 000 fichiers, ce commit n'est pas analysé pour son impact, et ses tests sont exécutés plutôt qu'ignorés.
- Si un test ou une collection couvre plus de 16 000 fichiers, ce test ou cette collection n'est pas ignoré.

### Faux positifs dans la correspondance de couverture {#false-positives-in-coverage-matching}

Pour vérifier si un test couvre un fichier modifié, Datadog utilise une structure de données probabiliste peu gourmande en espace (un filtre de Bloom). Ces structures ont un faible taux inhérent de faux positifs (environ 0.04%), de sorte qu'une petite fraction des tests qui auraient pu être ignorés peuvent tout de même s'exécuter.

Si Test Impact Analysis se comporte de manière inattendue, consultez la page [Dépannage][12].

## Configurer une bibliothèque Datadog {#set-up-a-datadog-library}

Avant de configurer Test Impact Analysis, vous devez configurer [Test Optimization][4] pour votre langage spécifique. Si vous transmettez des données via l'Agent, utilisez v6.40 ou 7.40, ou une version ultérieure.

{{< whatsnext desc="Choisissez un langage pour configurer Test Impact Analysis dans Datadog :" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## Configuration {#configuration}

Une fois votre bibliothèque Datadog configurée pour Test Impact Analysis, configurez-la depuis [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][5]. L'activation de Test Impact Analysis nécessite l'autorisation `Test Optimization Settings Write`.

Test Impact Analysis peut être configuré à trois niveaux, et les niveaux inférieurs peuvent remplacer les valeurs du niveau supérieur :

- **Valeurs par défaut de l'organisation** : s'appliquent à chaque dépôt, sauf si elles sont remplacées. Ouvrez {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}, puis sélectionnez l'onglet {{< ui >}}Organization{{< /ui >}}.
- **Dépôt** : remplace les valeurs par défaut de l'organisation pour un dépôt spécifique. Ouvrez {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}, sélectionnez l'onglet {{< ui >}}Repository-specific{{< /ui >}} et choisissez un dépôt.
- **Service de test** : remplace le paramètre du dépôt pour un service de test spécifique. Ouvrez le dépôt, puis modifiez les paramètres dérogatoires du service de test cible.

Aux niveaux du dépôt et du service de test, chaque paramètre peut soit {{< ui >}}Inherit{{< /ui >}} la valeur du niveau supérieur, soit être défini sur une valeur {{< ui >}}Custom{{< /ui >}} au niveau actuel.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration-1.png" alt="Activez Test Impact Analysis pour un dépôt sur la page CI/CD Settings." style="width:80%" >}}

### Exécutable Git {#git-executable}

Pour que Test Impact Analysis fonctionne, [Git][6] doit être disponible sur le host qui exécute les tests.

### Branches exclues {#excluded-branches}

En raison des [limitations](#out-of-the-box-configuration-limitations) décrites ci-dessus, la branche par défaut de votre dépôt est automatiquement exclue de l'activation de Test Impact Analysis. Datadog recommande cette configuration pour garantir que tous vos tests s'exécutent avant la mise en production.

S'il y a d'autres branches que vous souhaitez exclure, ajoutez-les sur la page CI/CD Settings. La barre de requête permet d'utiliser le caractère générique `*` pour exclure toutes les branches correspondantes, comme `release_*`.

Les branches exclues collectent des données de couverture du code pour chaque test, ce qui a un impact sur la durée totale des tests. Cependant, cet impact sur les performances est atténué, car la couverture du code n'est collectée que lorsque Datadog détecte que cette collecte apporte suffisamment de nouvelles informations pour en compenser le coût. Vous pouvez vérifier si la couverture du code est activée pour une session de test en consultant le champ `@test.code_coverage.enabled`.

### Fichiers suivis {#tracked-files}

Les fichiers suivis sont des fichiers autres que des fichiers de code qui peuvent avoir une incidence sur vos tests. Des modifications dans les fichiers suivis pourraient faire échouer vos tests ou modifier la couverture de code de vos tests. Voici des exemples de fichiers qui sont de bons candidats à ajouter en tant que fichiers suivis :

- Dockerfiles utilisés pour l'environnement CI
- Fichiers qui définissent vos dépendances (par exemple, `pom.xml` dans Maven, `requirements.txt` dans Python, ou `package.json` dans Javascript)
- Makefiles

Lorsque vous spécifiez un ensemble de fichiers suivis, Test Impact Analysis exécute tous les tests si l'un de ces fichiers est modifié.

Tous les chemins de fichiers sont considérés comme relatifs à la racine du dépôt. Vous pouvez utiliser les caractères génériques `*` et `**` pour faire correspondre plusieurs fichiers ou répertoires. Par exemple, `**/*.mdx` correspond à n'importe quel fichier `.mdx` dans le dépôt.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config-1.png" alt="Sélectionnez les branches à exclure et les fichiers suivis." style="width:80%" >}}

## Reconstitution de la couverture de code {#code-coverage-backfilling}

Si vous utilisez [Code Coverage][10] et Test Impact Analysis ensemble, la couverture globale indiquée peut être faussée, car Test Impact Analysis n'exécute pas les tests qui ne sont pas nécessaires pour la modification du code.

La reconstitution de la couverture de code ajuste la couverture totale indiquée pour inclure les tests ou les collections de tests qui n'ont pas été exécutés, afin que les gains liés à Test Impact Analysis ne faussent pas la couverture totale.

La reconstitution de la couverture de code est prise en charge pour Java, .NET, Go et JavaScript. Elle n'est pas prise en charge pour Ruby, Python ou Swift.

La reconstitution de la couverture est effectuée dans la mesure du possible. Pour les grandes collections de tests, la couverture de certains tests non exécutés par Test Impact Analysis peut ne pas être reconstituée. Par conséquent, la couverture totale indiquée peut être légèrement inférieure à la couverture réelle. La reconstitution de la couverture n'a aucune incidence sur le choix des tests à ne pas exécuter.

### Java, .NET et Go {#java-net-and-go}

Avec `dd-trace-java`, `dd-trace-dotnet` et `dd-trace-go`, aucune configuration supplémentaire n'est nécessaire pour reconstituer la couverture. Ces bibliothèques détectent automatiquement quand les tests s'exécutent avec un moteur de couverture de code et reconstituent les données de couverture de code des tests non exécutés par Test Impact Analysis.

### JavaScript {#javascript}

Avec `dd-trace-js`, la reconstitution de la couverture nécessite le téléversement du rapport de couverture de code. Activez le téléversement des données de couverture de code dans les [paramètres CI/CD Optimization au niveau de l'organisation][11] afin que la bibliothèque Datadog ajuste la couverture totale indiquée pour inclure les tests ou les collections de tests non exécutés.

## Explorez les sessions de test {#explore-test-sessions}

Vous pouvez explorer les gains de temps obtenus grâce à Test Impact Analysis en consultant la page des tests d'un commit et le panneau des sessions de test.

{{< img src="continuous_integration/itr_commit.png" alt="Page des tests d'un commit avec Test Impact Analysis" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis activé dans une session de test montrant les gains de temps obtenus." style="width:80%;">}}

Lorsque Test Impact Analysis est active et évite l'exécution de certains tests, un texte violet affiche le temps gagné pour chaque session de test ou chaque commit. La barre de durée devient également violette afin que vous puissiez repérer les sessions de test qui utilisent Test Impact Analysis sur la page [Test Runs][7].

## Explorez l'adoption et les gains de temps globaux {#explore-adoption-and-global-savings}

Suivez les gains de temps de votre organisation et son adoption de Test Impact Analysis grâce au [dashboard Test Impact Analysis][8] prêt à l'emploi. Le dashboard comprend des widgets permettant de suivre vos gains de temps globaux, ainsi que des vues des données par dépôt, par auteur de commit et par service. Consultez le dashboard pour comprendre quelles parties de votre organisation utilisent Test Impact Analysis et en tirent le meilleur parti.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Dashboard Test Impact Analysis" style="width:80%;">}}

Le dashboard suit également l'adoption de Test Impact Analysis dans toute votre organisation.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Dashboard Test Impact Analysis" style="width:80%;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/test_impact_analysis/how_it_works/
[2]: /fr/glossary/#flaky-test
[3]: /fr/tests/test_impact_analysis/setup
[4]: /fr/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /fr/integrations/github/
[10]: /fr/code_coverage/
[11]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[12]: /fr/tests/test_impact_analysis/troubleshooting/