---
aliases:
- /fr/security/vulnerability_pipeline/mute
further_reading:
- link: /security/automation_pipelines
  tag: Documentation
  text: Pipelines d'automatisation
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Empêchez les erreurs de configuration cloud d'atteindre la production avec
    Datadog IaC Security.
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
title: Règles de mise en sourdine
---
{{< product-availability >}}

Configurez des règles de mise en sourdine pour optimiser les alertes de sécurité en filtrant automatiquement les résultats non urgents. Cette approche permet de réduire le bruit provenant de faux positifs connus et de risques acceptés, vous permettant ainsi de vous concentrer sur la prise en charge des menaces les plus critiques.

## Créer une règle de mise en sourdine {#create-a-mute-rule}

1. Dans Datadog, accédez à **Security** > **Settings** > [Findings Automation][2]. Cliquez sur **Ajouter une nouvelle règle**, puis sélectionnez **Mettre en sourdine**. La page Create a New Rule s'ouvre.
1. Sous **Nom de la règle**, saisissez un nom descriptif pour la règle ; par exemple, « Contrôle compensatoire en place pour account payment-prod ».
1. Ajoutez vos critères de règle dans les champs suivants :
    - **L'un de ces types** : Les types de résultats que la règle doit vérifier. Les types disponibles incluent :
      - Vulnérabilité du code d'exécution
      - Vulnérabilité du code statique
      - Vulnérabilité de bibliothèque
      - Secret
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
1. Spécifiez le motif et la durée de la mise en sourdine :
    - **Motif de la mise en sourdine** : Le motif de la mise en sourdine du résultat. Les motifs disponibles incluent :
      - Faux positif
      - Risque accepté
      - Correction en attente
      - No Fix
      - Doublon
      - Autre
    - **Expiration de la règle** : La date à laquelle la règle expire.
    - **Description supplémentaire pour le motif de mise en sourdine** : Champ facultatif pour des détails supplémentaires.
1. Cliquez sur **Enregistrer**. La règle s'applique immédiatement aux nouveaux résultats et commence à vérifier les résultats existants dans l'heure qui suit.

Vous pouvez également créer des règles de mise en sourdine avec l'[API][3] ou la ressource Terraform [`datadog_security_findings_mute_rule`][4].

## Ordre de correspondance des règles {#rule-matching-order}

Lorsque Datadog identifie un résultat, il évalue ce résultat par rapport à votre séquence de règles de mise en sourdine. En commençant par la première règle, s'il y a une correspondance, Datadog met le résultat en sourdine pour la durée spécifiée et arrête toute évaluation ultérieure. Si aucune correspondance n'est trouvée, Datadog passe à la règle suivante. Ce processus se poursuit jusqu'à ce qu'une correspondance soit trouvée ou que toutes les règles aient été vérifiées sans succès.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=mute
[3]: /fr/api/latest/security-monitoring/create-a-mute-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_mute_rule