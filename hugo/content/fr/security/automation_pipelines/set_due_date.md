---
further_reading:
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
title: Fixer des règles pour les dates d'échéance
---
{{< product-availability >}}

Configurez des règles de date d'échéance pour garantir que les résultats sont traités dans les délais SLO que vous avez spécifiés. En définissant ces dates d'échéance, vous pouvez automatiser le suivi, satisfaire aux exigences de conformité et prioriser la correction rapide des problèmes de sécurité, évitant ainsi toute exploitation potentielle.

## Créer une règle de date d'échéance {#create-a-due-date-rule}

1. Dans Datadog, accédez à **Security** > **Settings** > [Findings Automation][2]. Cliquez sur **Ajouter une nouvelle règle**, puis sélectionnez **Définir la date d'échéance**. La page Create a New Rule s'ouvre.
1. Sous **Rule name**, saisissez un nom descriptif pour la règle, par exemple, « Cloud Infrastructure Anomaly Warnings ».
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
1. Définissez une date d'échéance pour chaque niveau de gravité qui en nécessite une.
1. Si la règle inclut un type de résultat basé sur une CVE (vulnérabilité de bibliothèque, d'image de conteneur ou de host), sous **Calculer les dates d'échéance à partir de**, sélectionnez la date de base pour le chronomètre SLA :
   - **Date de première détection** : Démarre le chronomètre SLA lorsque Datadog détecte le résultat pour la première fois.
   - **Date de disponibilité du correctif** : Démarre le chronomètre SLA lorsqu'un correctif est publié pour la vulnérabilité. Utile lorsque vous ne voulez pas que les équipes dépassent le SLA sur des avis qu'elles ne peuvent pas encore corriger.

   Pour tous les autres types de résultats, la date de première détection est toujours utilisée.
1. Cliquez sur **Enregistrer**. La règle s'applique immédiatement aux nouveaux résultats et commence à vérifier les résultats existants dans l'heure qui suit.

Vous pouvez également créer des règles de date d'échéance avec l'[API][3] ou la ressource Terraform [`datadog_security_findings_due_date_rule`][4].

## Où les dates d'échéance apparaissent {#where-due-dates-appear}

Lorsqu'un résultat a une date d'échéance, vous pouvez la voir à ces emplacements :

- Facettes de l'Explorer
- Panneau latéral des résultats
- Notifications
- Descriptions des tickets Jira
- Métriques de rapport (en tant que booléen « en retard ») pour identifier les équipes ou les référentiels ayant le plus de vulnérabilités en retard

## Ordre de correspondance des règles {#rule-matching-order}

Lorsque Datadog identifie un résultat, il évalue ce résultat par rapport à votre séquence de règles de date d'échéance. En commençant par la première règle, s'il y a une correspondance, Datadog définit une date d'échéance sur le résultat pour la durée spécifiée et arrête toute évaluation ultérieure. Si aucune correspondance n'est trouvée, Datadog passe à la règle suivante. Ce processus se poursuit jusqu'à ce qu'une correspondance soit trouvée ou que toutes les règles aient été vérifiées sans succès.

## Suppression des dates d'échéance {#removing-due-dates}

Lors de la gestion des résultats, les dates d'échéance peuvent être supprimées dans diverses conditions, telles que :

- La règle de détection qui a déclenché le résultat est validée avec succès.
- Le résultat est mis en sourdine, manuellement ou automatiquement via une règle de mise en sourdine.
- La règle de date d'échéance associée au résultat est désactivée ou supprimée.
- La règle de date d'échéance associée est modifiée de sorte que ses critères ne correspondent plus au résultat.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=set_due_date
[3]: /fr/api/latest/security-monitoring/create-a-due-date-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_due_date_rule