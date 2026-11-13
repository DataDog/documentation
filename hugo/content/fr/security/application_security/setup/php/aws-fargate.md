---
code_lang: aws-fargate
code_lang_weight: 60
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
title: Configurez la protection des applications et des API pour PHP sur AWS Fargate
type: multi-code-lang
---
{{% app_and_api_protection_php_overview %}}

## Prérequis {#prerequisites}

- Environnement AWS Fargate
- Application PHP conteneurisée avec Docker
- AWS CLI configuré avec les autorisations appropriées
- Votre clé d'API Datadog
- SDK PHP Datadog (voir [exigences de version][1])

## 1. Installation du Datadog Agent {#1-installing-the-datadog-agent}

Installez le Datadog Agent dans votre définition de tâche Fargate :

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_API_KEY>"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_NON_LOCAL_TRAFFIC",
          "value": "true"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

## 2. Activation de la surveillance de la protection des applications et des API {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activation manuelle de la surveillance de la protection des applications et des API {#manually-enabling-app-and-api-protection-monitoring}

Assurez-vous que votre Dockerfile inclut la bibliothèque PHP Datadog :

Ajoutez ce qui suit à votre Dockerfile :

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% collapse-content title="Traçage APM activé" level="h4" %}}

Mettez à jour votre définition de tâche pour inclure le conteneur d'application PHP avec la configuration de la protection des applications et des API :

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="Traçage APM désactivé" level="h4" %}}
Pour désactiver le traçage APM tout en conservant la protection des applications et des API activée, vous devez définir la variable de traçage APM sur false.

Mettez à jour votre définition de tâche pour inclure le conteneur d'application PHP avec la configuration de la protection des applications et des API :

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_TRACING_ENABLED",
          "value": "false"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. Exécution de votre application {#3-running-your-application}

Déployez votre tâche Fargate avec la configuration mise à jour :

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de la configuration de la protection des applications et des API pour votre application PHP, consultez le [guide de dépannage de la protection des applications et des API PHP][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup/compatibility/php
[2]: /fr/security/application_security/setup/php/troubleshooting