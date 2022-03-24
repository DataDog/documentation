---
title: Jenkins
kind: documentation
description: Configurez votre instance Jenkins afin d'exécuter des tests Synthetic dans vos pipelines de CI/CD.
further_reading:
  - link: /continuous_integration/setup_pipelines/jenkins/
    tag: Documentation
    text: Configurer le tracing sur un pipeline Jenkins
  - link: https://www.datadoghq.com/blog/jenkins-testing/
    tag: Blog
    text: Exécuter des tests Synthetic Datadog dans vos pipelines Jenkins
---
## Présentation

Ajoutez des tests Synthetic à votre environnement Jenkins.

Datadog vous conseille d'échanger avec vos équipes SRE et Infrastructure afin d'identifier une solution qui s'adapte à votre architecture Jenkins existante et personnalise une installation de façon à répondre à vos besoins métier. 

## Configuration

Pour utiliser Docker dans votre environnement Jenkins, consultez la section [Utiliser Docker avec un pipeline][1] (en anglais).

### Prérequis

* Node.js v10.24.1+
* Un fichier de configuration globale JSON ajouté à votre instance Jenkins par l'intermédiaire de l'outil [Config File Provider][2]. Ce fichier est requis pour définir des propriétés globales pour votre configuration de test Synthetic.

Vous pouvez stocker des variables d'environnement directement dans votre fichier de configuration globale ou [utiliser des identifiants][3]. Pour en savoir plus sur les configurations de test, consultez la rubrique [Configurer des tests][4].

### Exécuter le package `@datadog/datadog-ci`

Installez et exécutez les packages NPM et Node.js dans votre environnement Jenkins avec le plug-in Jenkins Node.js.

Pour en savoir plus sur l'intégration Datadog/Jenkins existante, consultez la section [Configurer le tracing sur un pipeline Jenkins][5].

### Ajouter une installation Node.js

Accédez au volet de configuration globale de Jenkins, puis ajoutez une installation Node.js.

{{< img src="synthetics/cicd_integrations/jenkins/nodejs-installation.png" alt="Installations Node.js dans Jenkins" style="width:80%;">}}

Installez `@datadog/datadog-ci` de façon globale pour toutes les installations Node.js pertinentes.

#### Tags

Pour exécuter des tests Synthetic avec des tags dans un pipeline déclaratif Jenkins, utilisez ce qui suit :

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG')]) {
                           sh 'datadog-ci synthetics run-tests -s "tag:e2e" --config $DATADOG_CI_CONFIG'
                       }
                   }
               }  
           }
       }
   }
{{< /code-block >}}

#### Fichier de test personnalisé

Pour exécuter des tests Synthetic avec un fichier de test personnalisé dans un pipeline déclaratif Jenkins, utilisez ce qui suit :

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG'), configFile(fileId: 'test-file-id', variable: 'DATADOG_CI_TEST_FILE')]) {
                           sh 'datadog-ci synthetics run-tests -f $DATADOG_CI_TEST_FILE --config $DATADOG_CI_CONFIG'
                       }
                   }
               }  
           }
       }
   }
}
{{< /code-block >}}

Vous devriez obtenir une sortie similaire à ce qui suit :

{{< img src="synthetics/cicd_integrations/jenkins/example-test-run.png" alt="Exemple d'exécution de test dans Jenkins" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/pipeline/docker/#using-docker-with-pipeline
[2]: https://plugins.jenkins.io/config-file-provider/
[3]: https://www.jenkins.io/doc/book/using/using-credentials/#adding-new-global-credentials
[4]: /fr/synthetics/cicd_integrations/configuration#configure-tests
[5]: /fr/continuous_integration/setup_pipelines/jenkins/