---
code_lang: docker
code_lang_weight: 10
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
title: Configurez la protection des applications et des API pour Python dans Docker
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="docker" %}}

{{% app_and_api_protection_python_overview %}}

## Prérequis {#prerequisites}

- Docker installé sur votre host
- Application Python conteneurisée avec Docker
- Votre clé d'API Datadog
- SDK Datadog pour Python (voir [exigences de version][1])

## 1. Installation du Datadog Agent {#1-installing-the-datadog-agent}

Installez le Datadog Agent en suivant les [instructions d'installation pour Docker](/agent/?tab=cloud_and_container).

## 2. Activation de la surveillance de la protection des applications et des API {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activation manuelle de la surveillance de la protection des applications et des API {#manually-enabling-app-and-api-protection-monitoring}

{{% collapse-content title="Traçage APM activé" level="h4" %}}

Ajoutez les variables d'environnement suivantes à votre Dockerfile :

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="Traçage APM désactivé" level="h4" %}}
Pour désactiver le traçage APM tout en conservant la protection des applications et des API activée, vous devez définir la variable de traçage APM sur false.

Ajoutez les variables d'environnement suivantes à votre Dockerfile :

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. Exécutez votre application {#3-run-your-application}
Construisez votre image, puis exécutez votre conteneur.

Lors de l'exécution de votre conteneur, assurez-vous de suivre les étapes suivantes :
1. Connectez le conteneur au même réseau Docker que le Datadog Agent.
2. Définissez les variables d'environnement requises.

```bash
docker run -d \
  --name your-python-app \
  your-python-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de la configuration de la protection des applications et des API pour votre application Python, consultez le [guide de dépannage de la protection des applications et des API Python][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup/compatibility/python
[2]: /fr/security/application_security/setup/python/troubleshooting