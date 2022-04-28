---
further_reading:
- link: /continuous_integration/explore_tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Tests Java
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Compatibilité

Frameworks de test pris en charge :
* JUnit 4.10+ et 5.3+
  * Comprend également tous les frameworks de test basés sur JUnit, tels que Spock Framework et Cucumber-Junit
* TestNG 6.4+

## Prérequis

[Installez l'Agent Datadog pour recueillir des données de test][1].

## Installer le traceur Java

Installez et activez le traceur Java v0.91.0 ou une version ultérieure.

{{< tabs >}}
{{% tab "Maven" %}}

Ajoutez un nouveau profil Maven dans votre `pom.xml` racine en configurant la dépendance du traceur Java Datadog et la propriété de l'argument `javaagent`. Remplacez également `$VERSION` par la dernière version du traceur accessible dans le [référentiel Maven][1] (sans le `v` au début du numéro de version) : ![Maven Central][2]

{{< code-block lang="xml" filename="pom.xml" >}}
<profile>
  <id>dd-civisibility</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>
  <properties>
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar -Ddd.service=my-java-app -Ddd.civisibility.enabled=true</dd.java.agent.arg>
  </properties>
  <dependencies>
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-java-agent</artifactId>
        <version>$VERSION</version>
        <scope>provided</scope>
    </dependency>
  </dependencies>
</profile>
{{< /code-block >}}


[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
{{% /tab %}}
{{% tab "Gradle" %}}

Ajoutez l'entrée `ddTracerAgent` au bloc de tâche `configurations`. Ajoutez ensuite la dépendance du traceur Java Datadog en remplaçant `$VERSION` par la dernière version du traceur disponible dans le [référentiel Maven][1] (sans le `v` au début du numéro de version) : ![Maven Central][2]

{{< code-block lang="groovy" filename="build.gradle" >}}
configurations {
    ddTracerAgent
}
dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
{{< /code-block >}}


[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
{{% /tab %}}
{{< /tabs >}}

## Instrumenter vos tests

{{< tabs >}}
{{% tab "Maven" %}}

Configurez le [plug-in Maven Surefire][1] ou le [plug-in Maven Failsafe][2] (ou les deux) pour utiliser l'Agent Java Datadog. Prenez soin de spécifier le nom du service ou de la bibliothèque testé(e) avec la propriété `-Ddd.service` :

* Si vous utilisez le [plug-in Maven Surefire][1] :

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
</plugin>
{{< /code-block >}}

* Si vous utilisez le [plug-in Maven Failsafe][2] :

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-failsafe-plugin</artifactId>
  <configuration>
     <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
  <executions>
      <execution>
        <goals>
           <goal>integration-test</goal>
           <goal>verify</goal>
        </goals>
      </execution>
  </executions>
</plugin>
{{< /code-block >}}

Exécutez normalement vos tests, en spécifiant l'environnement dans lequel sont exécutés les tests (par exemple, `local` lorsque les tests sont exécutés sur la machine d'un développeur ou `ci` lorsqu'ils sont exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

{{< code-block lang="bash" >}}
DD_ENV=ci mvn clean verify -Pdd-civisibility
{{< /code-block >}}


[1]: https://maven.apache.org/surefire/maven-surefire-plugin/
[2]: https://maven.apache.org/surefire/maven-failsafe-plugin/
{{% /tab %}}
{{% tab "Gradle" %}}

Configurez la tâche Gradle `test` en ajoutant à l'attribut `jvmArgs` l'argument `-javaagent` ciblant le traceur Java Datadog en fonction de la propriété `configurations.ddTracerAgent`. Spécifiez également le nom du service ou de la bibliothèque testé(e) avec la propriété `-Ddd.service` :

{{< code-block lang="groovy" filename="build.gradle" >}}
test {
  if(project.hasProperty("dd-civisibility")) {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.service=my-java-app", "-Ddd.civisibility.enabled=true"]
  }
}
{{< /code-block >}}

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

{{< code-block lang="bash" >}}
DD_ENV=ci ./gradlew cleanTest test -Pdd-civisibility --rerun-tasks
{{< /code-block >}}

**Remarque** : les builds Gradle peuvent être automatiquement personnalisés. Selon votre configuration de build spécifique, vous devrez donc peut-être adapter ces étapes.

{{% /tab %}}
{{< /tabs >}}

## Paramètres de configuration

Les propriétés système suivantes définissent des options de configuration. Il existe une variable d'environnement pour chacune de ces propriétés système. Si le même type de clé est défini pour une propriété système et la variable d'environnement correspondante, la configuration de la propriété système est prioritaire. Les propriétés système peuvent être définies en tant que flags JVM.

`dd.service`
: Nom du service ou de la bibliothèque testé(e).<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Valeur par défaut** : `unnamed-java-app`<br/>
**Exemple** : `my-java-app`

`dd.env`
: Nom de l'environnement dans lequel sont exécutés les tests.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Valeur par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

`dd.trace.agent.url`
: URL de l'Agent Datadog pour la collecte de traces, au format `http://hostname:port`.<br/>
**Variable d'environnement** : `DD_TRACE_AGENT_URL`<br/>
**Valeur par défaut** : `http://localhost:8126`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][2].

**Important** : vous pouvez activer davantage d'intégrations si vous utilisez des tests d'intégration. Pour activer une intégration spécifique, utilisez le tableau de [compatibilité du traceur Datadog][3] afin de créer votre configuration personnalisée pour vos tests d'intégration.

Par exemple, pour activer l'intégration de requête pour le client `OkHttp3`, ajoutez `-Ddd.integration.okhttp-3.enabled=true` à votre configuration.

### Recueillir les métadonnées Git

Datadog tire profit des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel, branche et commit. Les métadonnées Git sont automatiquement recueillies par l'instrumentation de test, à partir des variables d'environnement du fournisseur de CI et du dossier local `.git` dans le chemin du projet, le cas échéant.

Si vous exécutez des tests dans des fournisseurs de CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git :

`DD_GIT_REPOSITORY_URL`
: URL du référentiel dans lequel le code est stocké. Les URL HTTP et SSH sont prises en charge.<br/>
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

## Dépannage

### Les tests n'apparaissent pas dans Datadog après l'activation de CI  Visibility dans le traceur

Si les tests n'apparaissent pas dans Datadog, vérifiez que vous utilisez la version 0.91.0 ou une version ultérieure du traceur Java. La propriété de configuration `-Ddd.civisibility.enabled=true` n'est disponible qu'à partir de cette version.

Si vous devez utiliser une version antérieure du traceur, vous pouvez configurer CI Visibility à l'aide des propriétés système suivantes :
{{< code-block lang="bash" >}}
-Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/setup_tests/agent/
[2]: /fr/tracing/setup_overview/setup/java/?tab=containers#configuration
[3]: /fr/tracing/setup_overview/compatibility_requirements/java