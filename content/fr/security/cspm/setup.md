---
aliases:
- /fr/security_platform/cspm/getting_started
- /fr/security/cspm/getting_started
further_reading:
- link: security/default_rules
  tag: Documentation
  text: Explorer les règles de détection de configuration cloud par défaut
- link: security/cspm/findings
  tag: Documentation
  text: Rechercher et explorer les findings CSPM
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentation
  text: En savoir plus sur les frameworks et les benchmarks de l'industrie
- link: /getting_started/cloud_security_management
  tag: Documentation
  text: Débuter avec Cloud Security Management
kind: documentation
title: Configuration de CSPM
---

{{< site-region region="gov" >}}

<div class="alert alert-warning">À l'heure actuelle, la solution Cloud Security Posture Management n'est pas disponible pour ce site.</div>

{{< /site-region >}}

Grâce à la solution Cloud Security Posture Management (CSPM), vous pouvez évaluer et visualiser facilement la posture de sécurité actuelle et historique de vos ressources cloud, automatiser la collecte de preuves pour l'audit et détecter les problèmes de configuration susceptibles de rendre votre organisation vulnérable face à d'éventuelles attaques.

## Activer CSPM pour vos ressources cloud

CSPM s'appuie sur les intégrations Datadog existantes pour offrir une implémentation sans Agent avec les fournisseurs de cloud tels que AWS, Azure, GCP, Docker et Kubernetes. Pour en savoir plus sur la configuration de CSPM, sélectionnez votre fournisseur de cloud et suivez les instructions :

{{< tabs >}}
{{% tab "AWS" %}}

### Configurer l'intégration Datadog/AWS

Si vous ne l'avez pas déjà fait, configurez l'[intégration Amazon Web Services][1]. CSPM nécessite également que vous ajoutiez les [autorisations requises][2] pour la collecte de ressources.

### Activer CSPM pour AWS

Utilisez l'une des méthodes suivantes pour activer CSPM pour vos comptes AWS :

#### Configuration des paramètres de sécurité

1. Accédez à **Security** > **Setup & Configuration**.
2. Suivez les [instructions dans l'application][3] pour activer CSPM pour votre compte.
3. Depuis l'onglet **Setup & Configuration** > **Cloud Providers**, cliquez sur le carré **[AWS][4]**.
4. Pour activer CSPM pour un compte AWS, activez l'option **Collect Resources**.

#### Carré d'intégration AWS

1. Depuis le carré de l'intégration AWS, sélectionnez un compte AWS et cliquez sur **Resource Collection**.
2. Sélectionnez **Cloud Security Posture Management Collection** pour activer la collecte de ressources pour CSPM.
3. Cliquez sur **Save**.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: /fr/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=amazon-web-services

{{% /tab %}}

{{% tab "Azure" %}}

### Configurer l'intégration Datadog/Azure

Si vous ne l'avez pas déjà fait, configurez l'[intégration Microsoft Azure][1].

### Activer CSPM pour Azure

Utilisez l'une des méthodes suivantes pour activer CSPM pour vos abonnements Azure :

#### Configuration des paramètres de sécurité

1. Accédez à **Security** > **Setup & Configuration**.
2. Suivez les [instructions dans l'application][2] pour activer CSPM pour votre compte.
3. Depuis l'onglet **Setup & Configuration** > **Cloud Providers**, cliquez sur le carré **[Azure][3]**.
4. Activez CSPM pour vos abonnements Azure en activant l'option **CSPM Enabled**.

#### Carré d'intégration Azure

1. Depuis le carré de l'intégration Azure, sélectionnez une application Azure.
2. Sous **Resource Collection**, sélectionnez la case **Enable resource collection for Cloud Security Posture Management**.
3. Cliquez sur **Update Configuration**.

[1]: https://docs.datadoghq.com/fr/integrations/azure
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=azure

{{% /tab %}}

{{% tab "GCP" %}}

### Configurer l'intégration Datadog/GCP

Si vous ne l'avez pas déjà fait, configurez l'[intégration Google Cloud Platform][1] et assurez-vous que vous avez bien activé la [collecte de métriques][2].

### Activer CSPM pour GCP

Utilisez l'une des méthodes suivantes pour activer CSPM pour vos projets GCP :

### Configuration des paramètres de sécurité

1. Accédez à **Security** > **Setup & Configuration**.
2. Suivez les [instructions dans l'application][3] pour activer CSPM pour votre compte.
3. Depuis l'onglet **Setup & Configuration** > **Cloud Providers**, cliquez sur le carré **[GCP][4]**.
4. Activez CSPM pour vos projets GCP en activant l'option **CSPM Enabled**.

**Remarque** : si la page d'aperçu de CSPM n'affiche aucune donnée, vous n'avez peut-être pas configuré votre intégration GCP correctement. Consultez la section [Collecte de métriques GCP][2] pour en savoir plus.

### Carré d'intégration GCP

1. Depuis le carré de l'intégration GCP, sélectionnez un projet GCP.
2. Sous **Enable resource collection for Cloud Security Posture Management**, sélectionnez la case **Resource collection**.
3. Cliquez sur **Update Configuration**.

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#metric-collection
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=google-cloud-platform

{{% /tab %}}

{{% tab "Docker" %}}

### Activer CSPM pour Docker

1. Accédez à **Security** > **Setup & Configuration**.
2. Suivez les [instructions dans l'application][1] pour activer CSPM pour votre compte.
3. Depuis l'onglet **Setup & Configuration** > **Host and containers**, cliquez sur le carré **[Docker][2]**.
4. Cliquez sur **Select API key** pour choisir la clé d'API que vous souhaitez utiliser avec CSPM.
5. Copiez la commande générée automatiquement et exécutez-la dans votre environnement Docker pour activer CSPM.

[1]: https://app.datadoghq.com/security/configuration
[2]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=docker

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Activer CSPM pour Kubernetes

1. Si vous ne l'avez pas déjà fait, installez l'[Agent Datadog][1] (version 7.27+).
2. Accédez à **Security** > **Setup & Configuration**.
3. Suivez les [instructions dans l'application][2] pour activer CSPM pour votre compte.
4. Ajoutez ce qui suit à la section `datadog` de votre fichier `values.yaml` :
    ```yaml
    # values.yaml file
    datadog:
    [...]
      # Add this to enable Cloud Security Posture Management and Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
    ```

5. Redémarrez l'Agent.

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=kubernetes

{{% /tab %}}
{{< /tabs >}}

## Afficher les premiers résultats

CSPM évalue les ressources par intervalles allant de 15 minutes à 4 heures (en fonction de leur type). Dès qu'une analyse se termine, les nouveaux findings associés sont générés.

Pour afficher les findings associés à vos ressources cloud, accédez à la [page d'accueil de CSPM][1].

{{< img src="security/cspm/summary_page.png" alt="Page d'aperçu de Cloud Security Posture Management" width="100%">}}

## Explorer les règles de détection par défaut

CSPM intègre un ensemble de [règles de détection par défaut][2] qui évaluent la configuration de vos ressources cloud et identifient les problèmes de configuration potentiels pour vous permettre d'appliquer des mesures de remédiation sans attendre. Lorsque de nouvelles règles de détection sont ajoutées, elles sont automatiquement importées dans votre compte.

Pour filtrer les règles de détection par défaut en fonction du fournisseur de cloud :

1. Accédez à **Security** > **Detection Rules**.
2. Choisissez l'une des valeurs suivantes à l'aide de la facette **Tag**.
    - **AWS** : cloud_provider:aws
    - **Azure** : cloud_provider:azure
    - **GCP** : cloud_provider:gcp
    - **Docker** : framework:cis-docker
    - **Kubernetes** : framework:cis-kubernetes

Après voir exploré les règles de détection par défaut, vous pouvez passer en revue les résultats et corriger vos problèmes de configuration depuis le [Security Findings Explorer][3], [personnaliser la façon dont chaque règle analyse votre environnement][4], et [configurer des cibles de notification][5].

## Désactiver CSPM

Si vous désactivez la solution CSPM, vos précédents findings et la page d'accueil resteront disponibles dans l'application, et aucun coût supplémentaire ne vous sera facturé.

Pour désactiver CSPM en fonction de votre fournisseur de cloud :

- **AWS** : depuis l'onglet **Setup & Configuration** > **Cloud Providers**, cliquez sur le carré **AWS** et désactivez l'option **Collect Resources** pour vos comptes AWS. 
- **Azure** : depuis l'onglet **Setup & Configuration** > **Cloud Providers**, cliquez sur le carré **Azure** et désactivez l'option **CSPM Enabled** pour vos abonnements Azure.
- **GCP** : depuis l'onglet **Setup & Configuration** > **Cloud Providers**, cliquez sur le carré **GCP** et désactivez l'option **CSPM Enabled** pour vos projets GCP.
- **Docker** : définissez `DD_COMPLIANCE_CONFIG_ENABLED` sur `false` dans votre configuration Docker.
- **Kubernetes** : dans la section `datadog` du fichier `values.yaml`, définissez `compliance` > `enabled` sur `false`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: /fr/security/default_rules/#cat-posture-management-cloud
[3]: https://app.datadoghq.com/security/compliance?time=now
[4]: /fr/security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /fr/security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules