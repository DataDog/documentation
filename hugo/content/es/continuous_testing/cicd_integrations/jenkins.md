---
aliases:
- /es/synthetics/cicd_integrations/jenkins
description: Configura tu instancia Jenkins para ejecutar tests de Continuous Testing
  en tus pipelines CI/CD.
further_reading:
- link: https://www.datadoghq.com/blog/jenkins-testing/
  tag: Blog
  text: Ejecutar tests Synthetic de Datadog en tus pipelines Jenkins
- link: /continuous_integration/setup_pipelines/jenkins/
  tag: Documentación
  text: Configurar el rastreo en un pipeline Jenkins
title: Jenkins
---

## Información general

Añade tests de Continuous Testing a tu entorno Jenkins.

Datadog te recomienda conversar con tus equipos de ingeniería de confiabilidad del sitio (SRE) y de infraestructura para definir una solución que modele tu arquitectura Jenkins existente y personalice una instalación que se adapte a tus requisitos empresariales.

## Ajustes

Para utilizar Docker en tu entorno Jenkins, consulta [Uso de Docker con pipelines][1].

### Requisitos previos

* Node.js v10.24.1 o posterior
* Archivo de configuración global JSON cargado en tu instancia Jenkins a través del [proveedor de archivos de configuración][2]. Necesitas este archivo para definir las propiedades globales de configuración de tus tests Synthetic.

Puedes almacenar variables de entorno directamente dentro del archivo de configuración global o puedes [utilizar credenciales][3]. Para obtener más información sobre la configuración de tests, consulta [Configurar tests][4].

### Ejecuta el paquete `@datadog/datadog-ci`.

Instala y ejecuta los paquetes Node.js y npm en tu entorno Jenkins con el complemento Node.js de Jenkins.

Para obtener más información sobre la integración Datadog-Jenkins existente, consulta [Configurar el rastreo en un pipeline Jenkins][5].

### Añadir una instalación de Node.js

Ve al panel de configuración global de Jenkins y añade una instalación Node.js.

{{< img src="synthetics/cicd_integrations/jenkins/nodejs-installation.png" alt="Instalaciones Node.js en Jenkins" style="width:80%;">}}

Instala `@datadog/datadog-ci` globalmente para todas las instalaciones Node.js relevantes.

#### Etiquetas (tags)

Para ejecutar tests de Continuous Testing con etiquetas en un pipeline Jenkins declarativo:

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

#### Archivo de test personalizado

Para ejecutar tests de Continuous Testing con un archivo de test personalizado en un pipeline Jenkins declarativo:

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

Puedes esperar el resultado siguiente:

{{< img src="synthetics/cicd_integrations/jenkins/example-test-run.png" alt="Ejemplo de ejecución de test en Jenkins" style="width:80%;">}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/pipeline/docker/#using-docker-with-pipeline
[2]: https://plugins.jenkins.io/config-file-provider/
[3]: https://www.jenkins.io/doc/book/using/using-credentials/#adding-new-global-credentials
[4]: /es/continuous_testing/cicd_integrations/configuration#configure-tests
[5]: /es/continuous_integration/pipelines/jenkins/