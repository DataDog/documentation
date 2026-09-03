---
further_reading:
- link: /security/automation_pipelines
  tag: Documentation
  text: Pipelines d'automatisation
- link: /security/ticketing_integrations
  tag: Documentation
  text: Intégrations de tickets
- link: /incident_response/work_management
  tag: Documentation
  text: Case Management
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
site_support_id: case_management
title: Règles de création de tickets
---
{{< product-availability >}}

Configurez les règles de création de tickets pour créer automatiquement des tickets dans Jira ou Case Management lorsque de nouveaux résultats sont découverts. Cette approche permet de suivre les problèmes de sécurité dans vos workflows d'ingénierie existants sans triage manuel, aidant ainsi les équipes à réagir rapidement aux nouvelles menaces à grande échelle. Pour plus d'informations sur les intégrations de tickets avec les résultats de sécurité, consultez [Ticketing Integrations][3].

## Créer une règle de création de ticket {#create-a-ticket-creation-rule}

1. Dans Datadog, accédez à **Security** > **Settings** > [Findings Automation][2]. Cliquez sur **Add a New Rule**, puis sélectionnez **Create Ticket**. La page Create a New Rule s'ouvre.
1. Sous **Nom de la règle**, saisissez un nom descriptif pour la règle, par exemple, « Vulnérabilités critiques pour l'équipe d'ingénierie ».
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
1. Sélectionnez le système de tickets et configurez la destination du ticket :
   - **Jira**
     - **Jira Account** : Sélectionnez l'instance Atlassian à utiliser.
     - **Space** : Sélectionnez le projet Jira. Vérifiez que ce Space est ajouté au [Jira Webhook][5].
     - **Ticket Type** : Sélectionnez le type de Jira issue à créer, par exemple, **Task**.
     - **Assignee** (facultatif) : Spécifiez un utilisateur auquel attribuer les tickets créés automatiquement.
     - Pour ajouter d'autres champs au ticket Jira créé par Datadog, utilisez **Add Optional Field**.
     - Développez **Data Sync Settings** pour examiner ou mettre à jour le projet Case Management lié et la configuration de la synchronisation bidirectionnelle.
   - **Case Management**
     - **Case Management Project** : Sélectionnez un projet Case Management existant ou créez-en un.
     - **Assignee** (facultatif) : Spécifiez un utilisateur auquel attribuer les cases créés automatiquement.
1. Sous **Rate limit**, saisissez le [nombre maximal de tickets](#daily-ticket-limit) que cette règle peut créer par jour UTC.
1. Pour tester la règle avant de l'enregistrer, cliquez sur **Test Rule**, sélectionnez un résultat correspondant, puis cliquez sur **Run Test**. Une fois le test terminé, vous pouvez afficher le ticket créé ou détacher le ticket de test du résultat.
1. Cliquez sur **Enregistrer**. La règle s'applique uniquement aux nouveaux résultats. Il peut s'écouler jusqu'à quelques minutes après la détection d'un résultat pour créer le ticket correspondant.

**Note** : Les règles de création de tickets ne créent des tickets que pour les nouveaux résultats. Datadog ne crée pas de tickets rétroactifs pour les résultats existants lorsque vous créez une règle.

## Identifier les tickets créés automatiquement {#identify-automatically-created-tickets}

{{< img src="security/automation_pipelines/ticket_creation_lightning_indicator.png" alt="Fenêtre contextuelle de ticket Case Management montrant un cas créé par une règle d'automatisation, indiqué par une icône en forme d'éclair, et un lien pour afficher tous les résultats avec des tickets créés à partir de la même règle" style="width:60%;" >}}

Les tickets créés par une règle sont marqués d'un indicateur en forme d'éclair dans le panneau latéral des résultats et dans les vues de l'Explorer. Le survol de l'indicateur affiche l'Automation Rule responsable du ticket et fournit un lien vers celle-ci.

## Rule matching order{#rule-matching-order}

Lorsqu'il identifie un résultat, Datadog évalue ce résultat par rapport à votre séquence de règles de création de tickets. En commençant par la première règle, s'il y a une correspondance, Datadog crée un ticket en utilisant la configuration de cette règle et cesse toute évaluation ultérieure. Si aucune correspondance n'est trouvée, Datadog passe à la règle suivante. Ce processus se poursuit jusqu'à ce qu'une correspondance soit trouvée ou que toutes les règles aient été vérifiées sans succès.

## Daily ticket limit{#daily-ticket-limit}

Chaque règle dispose d'une limite quotidienne de tickets configurable qui est réinitialisée à minuit UTC. Lorsque la limite est atteinte, Datadog crée un dernier ticket dans le même projet expliquant que la règle a atteint sa limite quotidienne, puis cesse de créer des tickets pour le reste de la journée. Les résultats qui dépassent la limite ne font pas l'objet d'une création de ticket rétroactive lorsque la limite est réinitialisée, mais vous pouvez créer des tickets pour eux manuellement.

## Broken rules{#broken-rules}

Si une erreur de configuration de projet empêche la création de ticket (par exemple, si le projet Jira connecté n'est plus valide), Datadog désactive automatiquement la règle et la marque comme rompue.

{{< img src="security/automation_pipelines/ticket_creation_broken_rule.png" alt="Liste des Automation Pipelines affichant une ticket creation rule avec une info-bulle d'avertissement indiquant « Rule auto-disabled due to a ticketing integration error »" style="width:100%;" >}}

Pour reprendre la création automatique de tickets, corrigez la configuration du projet et réactivez la règle.

## Disabled or deleted rules{#disabled-or-deleted-rules}

Lorsque vous désactivez ou supprimez une règle de création de ticket, les tickets précédemment créés restent attachés à leurs résultats. Ils ne sont ni détachés ni supprimés.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=create_ticket
[3]: /fr/security/ticketing_integrations/
[5]: /fr/integrations/jira/#configure-a-jira-webhook