---
aliases:
- /fr/security/vulnerability_pipeline/security_inbox
further_reading:
- link: /security/security_inbox
  tag: Documentation
  text: Security Inbox
- link: /security/automation_pipelines
  tag: Documentation
  text: Pipelines d'automatisation
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Ajouter des règles à Security Inbox
---
{{< product-availability >}}

Configurez les règles de la boîte de réception pour gérer efficacement votre boîte de réception de sécurité, en veillant à ce que seuls les problèmes de sécurité les plus pertinents soient mis en évidence. En personnalisant les conditions, vous pouvez vous concentrer sur les préoccupations critiques, hiérarchiser les risques clés, prendre en charge la conformité et attirer l'attention sur des problèmes qui pourraient autrement être négligés.

## Règles de boîte de réception par défaut {#default-inbox-rules}

Datadog fournit un ensemble de règles de boîte de réception par défaut, compilées par l'équipe de recherche en sécurité de Datadog, qui alimentent automatiquement votre [boîte de réception de sécurité][3]. Ces règles couvrent les découvertes les plus susceptibles de représenter un risque réel dans un environnement typique.

Les règles par défaut apparaissent aux côtés de vos propres règles sur la page [Findings Automation][2]. Vous pouvez désactiver une règle par défaut si elle ne correspond pas à la manière dont votre organisation effectue le tri, et vous pouvez ajouter vos propres règles pour couvrir les cas que les règles par défaut omettent.

## Créer une règle de boîte de réception {#create-an-inbox-rule}

1. Dans Datadog, accédez à **Security** > **Settings** > [Findings Automation][2]. Cliquez sur **Add a New Rule**, puis sélectionnez **Add to Security Inbox**. La page Create a New Rule s'ouvre.
1. Sous **Rule name**, saisissez un nom descriptif pour la règle, par exemple, « Cloud Infrastructure Anomaly Warnings ».
1. Ajoutez vos critères de règle dans les champs suivants :
    - **L'un de ces types** : Les types de résultats que la règle doit vérifier. Les types disponibles incluent :
      - Vulnérabilité du code d'exécution
      - Vulnérabilité du code statique
      - Vulnérabilité de bibliothèque
      - Secrets (Code)
      - Infrastructure en tant que code
      - Vulnérabilité d'image de conteneur
      - Vulnérabilité du host
      - Mauvaise configuration
      - Chemin d'attaque
      - Risque lié à l'identité
      - Sécurité des API
      - Activité de la charge de travail
    - **L'un de ces tags ou attributs** : Les tags ou attributs de ressource qui doivent correspondre pour que la règle s'applique.
1. Pour ajouter des critères de gravité à la règle, cliquez sur **Add Severity**.
1. Cliquez sur **Enregistrer**. La règle s'applique immédiatement aux nouveaux résultats et commence à vérifier les résultats existants dans l'heure qui suit.

## Rule matching order{#rule-matching-order}

Lorsque Datadog identifie une découverte, il l'évalue par rapport à votre séquence de règles de boîte de réception. En commençant par la première règle, s'il y a une correspondance, Datadog ajoute la découverte à la boîte de réception de sécurité et arrête toute évaluation ultérieure. Si aucune correspondance n'est trouvée, Datadog passe à la règle suivante. Ce processus se poursuit jusqu'à ce qu'une correspondance soit trouvée ou que toutes les règles aient été vérifiées sans succès.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox
[3]: /fr/security/security_inbox/