---
further_reading:
- link: /continuous_integration/explore_tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Tests Python
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">L'instrumentation des tests Python est disponible en version bêta. Pendant cette période, elle n'engendre aucun coût supplémentaire.
</div>

## Compatibilité

Interpréteurs Python pris en charge :
* Python 2.7+ et 3.5+

Frameworks de test pris en charge :
* pytest 3.0.0+
  * pytest < 5 avec Python 2

## Prérequis

[Installez l'Agent Datadog pour recueillir des données de test][1].

## Installer le traceur Python

Installez le traceur Python en exécutant ce qui suit 

{{< code-block lang="bash" >}}
pip install -U ddtrace
{{< /code-block >}}

Pour en savoir plus, consultez la [documentation relative à l'installation du traceur Python][2].

## Instrumenter vos tests

Pour activer l'instrumentation de tests `pytest`, ajoutez l'option `--ddtrace` lors de l'exécution de `pytest`. Indiquez le nom du service ou de la bibliothèque testé(e) avec la variable d'environnement `DD_SERVICE`. Précisez l'environnement dans lequel sont exécutés les tests (par exemple, `local` lorsque les tests sont exécutés sur la machine d'un développeur ou `ci` lorsqu'ils sont exécutés sur un fournisseur de CI) avec la variable d'environnement `DD_ENV` :

{{< code-block lang="bash" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

Si vous souhaitez également activer les autres intégrations APM, afin d'obtenir davantage d'informations dans votre flamegraph, ajoutez l'option `--ddtrace-patch-all` :

{{< code-block lang="bash" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

## Paramètres de configuration

La liste suivante répertorie les principaux paramètres de configuration pouvant être utilisés avec le traceur, que ce soit sous forme de code ou de variables d'environnement :

`ddtrace.config.service`
: Nom du service ou de la bibliothèque testé(e).<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Valeur par défaut** : `pytest`<br/>
**Exemple** : `my-python-app`

`ddtrace.config.env`
: Nom de l'environnement dans lequel sont exécutés les tests.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Valeur par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

La variable d'environnement suivante peut être utilisée pour configurer l'emplacement de l'Agent Datadog :

`DD_TRACE_AGENT_URL`
: URL de l'Agent Datadog pour la collecte de traces, au format `http://hostname:port`.<br/>
**Valeur par défaut** : `http://localhost:8126`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][3].

### Recueillir les métadonnées Git

Datadog tire profit des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel, branche et commit. Les métadonnées Git sont automatiquement recueillies par l'instrumentation de test, à partir des variables d'environnement du fournisseur de CI et du dossier local `.git` dans le chemin du projet, le cas échéant.

Si vous exécutez des tests pour des fournisseurs de CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git :

`DD_GIT_REPOSITORY_URL`
: URL du référentiel dans lequel le code est stocké. Les URL HTTP et SSH sont prises en charge.<br/>
**Exemple** : `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branche Git concernée par les tests. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
**Exemple** : `develop`

`DD_GIT_TAG`
: Tag Git concerné par les tests (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
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
: E-mail de l'auteur du commit.<br/>
**Exemple** : `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Date de l'auteur du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Nom du responsable du commit.<br/>
**Exemple** : `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: E-mail du responsable du commit.<br/>
**Exemple** : `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Date du responsable du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/setup_tests/agent/
[2]: /fr/tracing/setup_overview/setup/python/
[3]: /fr/tracing/setup_overview/setup/python/?tab=containers#configuration