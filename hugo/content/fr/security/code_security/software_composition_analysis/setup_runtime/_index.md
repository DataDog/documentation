---
aliases:
- /fr/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
title: Configurez SCA dans vos services en cours d'exécution
---
## Prérequis {#prerequisites}
SCA peut détecter les vulnérabilités affectant les bibliothèques open source s'exécutant dans vos services, en se basant sur la télémétrie d'application de Datadog.

Avant de configurer la détection au moment de l'exécution, assurez-vous que les prérequis suivants sont remplis :

1. **Installation du Datadog Agent :** Le Datadog Agent est installé et configuré pour le système d'exploitation, le conteneur, le cloud ou l'environnement virtuel de votre application.
2. **Traces envoyées à Datadog** : Le SDK Datadog est configuré pour votre application ou service et envoie des traces web (`type:web`) à Datadog.
3. **SDK pris en charge :** Le SDK Datadog utilisé par votre application ou service prend en charge les fonctionnalités de Software Composition Analysis pour le langage de votre application ou service. Pour plus de détails, consultez la page [Library Compatibility][2].

<div class="alert alert-info">L'analyse SCA au moment de l'exécution ne nécessite pas d'abonnement APM. Une collecte APM reste en place pour prendre en charge l'analyse SCA au moment de l'exécution (par exemple, les traces de sécurité) et devrait figurer sur votre facture.</div>

## Types d'activation de Software Composition Analysis {#software-composition-analysis-enablement-types}

### Activation du service dans l'application {#in-app-service-enablement}

Vous pouvez activer Software Composition Analysis (SCA) au moment de l'exécution dans l'application via [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}}][3].

1. Accédez à la page [Security Settings][3].
2. Dans {{< ui >}}Activate runtime detection of library vulnerabilities{{< /ui >}}, cliquez sur {{< ui >}}Manage Services{{< /ui >}}.
3. Cochez les services pour lesquels vous souhaitez identifier les vulnérabilités des bibliothèques, puis sélectionnez {{< ui >}}Bulk Actions{{< /ui >}}.
4. Cliquez sur {{< ui >}}Activate Runtime Software Composition Analysis (SCA){{< /ui >}}.

### Configuration du SDK Datadog {#datadog-sdk-configuration}

Ajoutez une variable d'environnement ou un nouvel argument à la configuration de votre SDK Datadog.

En suivant ces étapes, vous configurerez avec succès Software Composition Analysis pour votre application, garantissant une surveillance complète et l'identification des vulnérabilités dans les bibliothèques open source utilisées par vos applications ou services.

Vous pouvez utiliser Datadog Software Composition Analysis (SCA) pour surveiller les bibliothèques open source de vos applications.

SCA est configuré en définissant l'indicateur `-Ddd.appsec.sca.enabled` ou la variable d'environnement `DD_APPSEC_SCA_ENABLED` sur `true` dans les langages pris en charge :

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

Cette rubrique explique comment configurer SCA à l'aide d'un exemple Java.

**Exemple : activer Software Composition Analysis (SCA) en Java**

1. **Mettez à jour votre [bibliothèque Java Datadog][1]** vers au moins la version 0.94.0 (au moins la version 1.1.4 pour les fonctionnalités de détection de Software Composition Analysis) :

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}
   Pour vérifier que les versions du langage et du framework de votre service sont prises en charge, consultez [Compatibilité][2].

1. **Exécutez votre application Java avec SCA activé.** Depuis la ligne de commande :
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Il est également possible d'utiliser l'une des méthodes suivantes, selon l'environnement dans lequel votre application s'exécute, pour activer le traceur APM :

   **Remarque :** Les systèmes de fichiers en lecture seule ne sont pas pris en charge pour le moment. L'application doit avoir accès à un répertoire `/tmp` accessible en écriture.

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Mettez à jour votre conteneur de configuration pour APM en ajoutant l'argument suivant dans votre commande `docker run` :


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Ajoutez la valeur de variable d'environnement suivante le Dockerfile de votre conteneur :

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Mettez à jour votre fichier de configuration de déploiement pour APM et ajoutez la variable d'environnement SCA :

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Mettez à jour le fichier JSON de votre définition de tâche ECS en ajoutant la section environnement suivante :

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Définissez l'indicateur `-Ddd.appsec.sca.enabled` ou la variable d'environnement `DD_APPSEC_SCA_ENABLED` sur `true` lors de l'appel de votre service :

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

## Conservation des données {#data-retention}

Datadog conserve les résultats conformément à nos [Périodes de conservation des données](https://docs.datadoghq.com/fr/data_security/data_retention_periods/) . Datadog ne stocke ni ne conserve le code source des clients .

[1]: /fr/security/code_security/software_composition_analysis/setup_runtime/compatibility/java
[2]: /fr/security/code_security/software_composition_analysis/setup_runtime/compatibility/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup