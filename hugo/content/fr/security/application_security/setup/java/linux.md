---
code_lang: linux
code_lang_weight: 30
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Configurez App and API Protection pour Java sur Linux
type: multi-code-lang
---
{{% app_and_api_protection_java_setup_options platform="linux" %}}

{{% app_and_api_protection_java_overview %}}

## Prérequis {#prerequisites}

- Système d'exploitation Linux
- Application Java
- Privilèges root ou sudo
- Systemd (pour la gestion des services)
- Votre clé d'API Datadog
- SDK Java Datadog (voir les exigences de version [ici][1])

## 1. Installation du Datadog Agent {#1-installing-the-datadog-agent}

Installez le Datadog Agent en suivant les [instructions d'installation pour les hosts Linux][3].

## 2. Activation de la surveillance de la protection des applications et des API {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activation manuelle de la surveillance de la protection des applications et des API {#manually-enabling-app-and-api-protection-monitoring}

Téléchargez la dernière version de la bibliothèque Java Datadog :

```bash
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

{{% collapse-content title="Traçage APM activé" level="h4" %}}
{{< tabs >}}
{{% tab "Utilisation des propriétés système" %}}

Démarrez votre application Java avec le Datadog Agent et App and API Protection activé en utilisant les propriétés système :

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "Utilisation des variables d'environnement" %}}

Définissez les variables d'environnement requises et démarrez votre application Java :

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Traçage APM désactivé" level="h4" %}}
Pour désactiver le traçage APM tout en conservant la protection des applications et des API activée, vous devez définir la variable de traçage APM sur false.
{{< tabs >}}
{{% tab "Utilisation des propriétés système" %}}

Démarrez votre application Java avec le Datadog Agent et App and API Protection activé en utilisant les propriétés système :

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "Utilisation des variables d'environnement" %}}

Définissez les variables d'environnement requises et démarrez votre application Java :

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Exécutez votre application {#3-run-your-application}

Démarrez votre application Java avec les paramètres ci-dessus.

{{% aap/aap_and_api_protection_verify_setup %}}

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de la configuration d'App and API Protection pour votre application Java, consultez le [Java App and API Protection troubleshooting guide][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup/compatibility/java
[2]: /fr/security/application_security/setup/java/troubleshooting
[3]: /fr/agent/?tab=Linux