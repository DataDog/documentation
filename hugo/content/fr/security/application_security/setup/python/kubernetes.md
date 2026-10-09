---
code_lang: kubernetes
code_lang_weight: 20
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
title: Configurer la protection des applications et des API pour Python dans Kubernetes
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_python_overview %}}

## Prérequis {#prerequisites}

- Cluster Kubernetes
- Application Python conteneurisée avec Docker
- kubectl configuré pour accéder à votre cluster
- Helm (recommandé pour l'installation de l'Agent)
- Votre clé d'API Datadog
- SDK Datadog pour Python (voir [exigences de version][1])

## 1. Installation du Datadog Agent {#1-installing-the-datadog-agent}

Installez le Datadog Agent en suivant les [instructions de configuration pour Kubernetes](/agent/?tab=cloud_and_container).

## 2. Activation de la surveillance de la protection des applications et des API {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activation manuelle de la surveillance de la protection des applications et des API {#manually-enabling-app-and-api-protection-monitoring}

Installez le SDK Datadog pour Python à l'aide d'un conteneur d'initialisation ou dans le Dockerfile de votre application :

```dockerfile
RUN pip install ddtrace
```

Configurez et exécutez votre service avec Datadog :

{{% collapse-content title="Traçage APM activé" level="h4" %}}

Démarrez votre application Python avec la protection des applications et des API activée à l'aide de variables d'environnement :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="Traçage APM désactivé" level="h4" %}}
Pour désactiver le traçage APM tout en conservant la protection des applications et des API activée, vous devez définir la variable de traçage APM sur false.

Démarrez votre application Python avec la protection des applications et des API activée à l'aide de variables d'environnement :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. Exécutez votre application {#3-run-your-application}

Appliquez votre déploiement mis à jour :

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de la configuration de la protection des applications et des API pour votre application Python, consultez le [guide de dépannage de la protection des applications et des API Python][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup/compatibility/python
[2]: /fr/security/application_security/setup/python/troubleshooting