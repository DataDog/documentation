---
further_reading:
- link: /security/cloud_security_management
  tag: Documentation
  text: Cloud Security Management
- link: /service_management/workflows/
  tag: Documentation
  text: Workflow Automation
kind: documentation
title: Automatiser les workflows de sécurité grâce à Workflow Automation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Cloud Security Management Misconfigurations n'est pas disponible pour le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}) que vous avez sélectionné.</div>
{{< /site-region >}}

La solution [Workflow Automation][1] Datadog vous permet d'orchestrer et d'automatiser vos processus de bout en bout en créant des workflows composés d'actions connectées à votre infrastructure et à vos outils.

Combinez Workflow Automation à la solution [Cloud Security Management (CSM)][2] pour automatiser vos workflows liés à la sécurité. Vous pouvez par exemple créer des workflows qui [bloquent l'accès à un compartiment public Amazon S3 par le biais d'un message Slack interactif](#bloquer-l-acces-a-un-compartiment--aws-s3-via-slack) ou [créent automatiquement un ticket Jira et l'attribuent à une équipe](#creer-automatiquement-un-ticket-jira-et-l-attribuer).

## Comprendre le fonctionnement des déclencheurs et des sources

Workflow Automation vous permet de déclencher manuellement ou automatiquement un workflow à partir d'un monitor, d'un signal de sécurité ou d'un calendrier personnalisé. Dans tous les exemples de ce guide, les workflows sont déclenchés manuellement en cliquant sur le bouton **Actions** > **Run Workflow** dans les volets latéraux.

Lorsque vous déclenchez un workflow, l'ID source de l'événement de déclenchement doit être transmis à l'étape suivante du workflow. Dans les exemples de cet article, les événements de déclenchement correspondent à un nouveau finding de sécurité. Dans les deux cas, les ID source sont spécifiées à l'étape initiale du workflow par le biais de [variables d'objet source][7].

## Créer un workflow

Vous pouvez utiliser un flux préconfiguré à partir d'un blueprint prêt à l'emploi ou créer un workflow personnalisé. Pour en savoir plus sur la création d'un workflow, consultez la [documentation relative à Workflow Automation][3].
### Bloquer l'accès à un compartiment Amazon S3 via Slack

Cet exemple décrit comment créer un workflow de remédiation qui envoie un message Slack interactif lorsqu'un compartiment public Amazon S3 est détecté. En cliquant sur **Approve** ou **Reject**, vous pouvez automatiquement bloquer l'accès au compartiment S3 ou refuser d'agir.

**Remarque** : pour créer ce workflow, vous devez configurer l'[intégration Slack][5].

1. Sur la [page Workflow Automation][4], cliquez sur **New Workflow**.
2. Attribuez un nom au workflow.
3. Sélectionnez **Manual** pour le déclencheur, puis cliquez sur **Create**.
4. Cliquez sur **Add a step to get started** pour commencer à ajouter des étapes à votre workflow à l'aide du créateur de workflow. Sinon, cliquez sur **Edit JSON Spec** pour créer le workflow via l'éditeur JSON.

#### Obtenir le problème de configuration lié à la sécurité

Pour récupérer le problème de configuration lié à la sécurité et le transmettre au workflow, utilisez l'action **Get security finding**. Celle-ci se sert de la variable d'objet source `{{ Source.securityFinding.id }}` pour récupérer les détails du problème de configuration à partir de l'endpoint d'API [**Récupérer un finding**][8].

1. Cliquez sur **Add a step to get started** pour ajouter la première étape de votre workflow.
2. Recherchez l'action **Get security finding**, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition de workflow pour la configurer.
4. Pour le champ **Finding ID**, saisissez `{{ Source.securityFinding.id }}`.

#### Ajouter la fonction JavaScript

Ajoutez ensuite à la fenêtre d'édition l'action JavaScript Data Transformation Function et configurez-la pour qu'elle renvoie le nom de la région issu des tags du problème de configuration.

1. Cliquez sur l'icône plus (`+`) dans la fenêtre d'édition du workflow pour ajouter une autre étape.
2. Recherchez l'action **JS Function**, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow, puis collez ce qui suit dans l'éditeur de script :
   {{< code-block lang="javascript" >}}
    // Récupère les informations sur la région à partir des tags du problème de configuration
    // Utiliser `$` pour accéder aux données liées au déclencheur ou aux étapes.
    // Utiliser `_` pour accéder à Lodash.
    // Consulter le site https://lodash.com/ pour en savoir plus.

    let tags = $.Steps.Get_security_finding.tags

    let region = tags.filter(t => t.includes('region:'))
    if(region.length == 1){
        return region[0].split(':')[1]
    } else {
        return '';
    }
    {{< /code-block >}}

#### Ajouter une action Slack

1. Cliquez sur l'icône plus (`+`) dans la fenêtre d'édition du workflow pour ajouter une autre étape.
2. Recherchez l'action **Make a decision** pour Slack, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow, puis saisissez les informations suivantes :
    - **Workspace** : le nom de votre espace de travail Slack.
    - **Channel** : le canal au sein duquel publier le message Slack.
    - **Prompt text** : le texte qui s'affichera immédiatement au-dessus des boutons de choix dans le message Slack, par exemple : « Souhaitez-vous bloquer l'accès public à `{{ Steps.Get_security_finding.resource }}` dans la région `{{ Steps.GetRegion.data }}` ?  »

##### Approuver un workflow

1. Dans la fenêtre d'édition du workflow, sous **Approve**, cliquez sur l'icône plus (`+`) pour ajouter une autre étape.
2. Recherchez l'action **Block Public Access** pour Amazon S3, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow, puis saisissez les informations suivantes :
    - **Connection** : le nom de la connexion du workflow pour l'intégration AWS.
    - **Region** : `{{ Steps.GetRegion.data }}`.
    - **Bucket name** : `{{ Steps.Get_security_finding.resource }}`.
4. Sous l'étape **Block public access** de la fenêtre d'édition du workflow, cliquez sur l'icône plus (`+`) pour ajouter une autre étape.
5. Recherchez l'action **Send message** pour Slack, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow, puis saisissez les informations suivantes :
    - **Workspace** : le nom de votre espace de travail Slack.
    - **Channel** : le canal au sein duquel publier le message Slack.
    - **Message text** : le texte qui s'affiche dans le message Slack, par exemple :
    {{< code-block lang="text" >}}
    Compartiment S3 `{{ Steps.Get_security_finding.resource }}` bloqué. Réponse de l'API AWS : 
    ```{{ Steps.Block_public_access }}```

    Le problème sera marqué comme résolu la prochaine fois que la ressource sera analysée ; le processus peut prendre jusqu'à une heure.
    {{< /code-block >}}

##### Rejeter un workflow

1. Sous **Reject** dans la fenêtre d'édition du workflow, cliquez sur l'icône plus (`+`) pour ajouter une autre étape.
2. Recherchez l'action **Send message** pour Slack, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow, puis saisissez les informations suivantes :
    - **Workspace** : le nom de votre espace de travail Slack.
    - **Channel** : le canal au sein duquel publier le message Slack.
    - **Message text** : le texte qui s'affiche dans le message Slack, par exemple : « L'utilisateur a décliné l'action ».
4. Cliquez sur **Save**.

### Créer automatiquement un ticket Jira et attribuer

Cet exemple permet de créer un workflow automatisé d'acheminement de tickets qui crée un ticket Jira et l'attribue à l'équipe adéquate en cas de détection d'un finding de sécurité.

**Remarque** : pour créer ce workflow, vous devez configurer l'[intégration Jira][6].

1. Sur la [page Workflow Automation][4], cliquez sur **New Workflow**.
2. Nommez le workflow.
3. Sélectionnez **Manual** pour le déclencheur, puis cliquez sur **Create**.
4. Cliquez sur **Add a step to get started** pour commencer à ajouter des étapes à votre workflow à l'aide du créateur de workflow. Sinon, cliquez sur **Edit JSON Spec** pour créer le workflow via l'éditeur JSON.

#### Récupérer le problème de sécurité

Pour récupérer le finding et le transmettre au workflow, utilisez l'action **Get security finding**. Celle-ci se sert de la variable d'objet source `{{ Source.securityFinding.id }}` pour récupérer les détails du finding à partir de l'endpoint d'API [**Récupérer un finding**][8].

1. Cliquez sur **Add a step to get started** pour ajouter la première étape de votre workflow.
2. Recherchez l'action **Get security finding**, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition de workflow pour la configurer.
4. Pour le champ **Security ID**, saisissez `{{ Source.securityFinding.id }}`.

#### Ajouter la fonction JavaScript

Ajoutez ensuite à la fenêtre d'édition l'action JavaScript Data Transformation Function et configurez-la pour qu'elle renvoie le nom de l'équipe issu des tags du finding.

1. Cliquez sur l'icône plus (`+`) dans la fenêtre d'édition du workflow pour ajouter une autre étape.
2. Recherchez l'action **JS Function**, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow et collez ce qui suit dans l'éditeur de script :
   {{< code-block lang="javascript" >}}
    // Récupère les informations sur l'équipe à partir des tags du finding
    // Utiliser `$` pour accéder aux données liées au déclencheur ou aux étapes.
    // Utiliser `_` pour accéder à Lodash.
    // Consulter le lien https://lodash.com/ four en savoir plus.

    let tags = $.Steps.Get_security_finding.tags

    let team = tags.filter(t => t.includes('team:'))
    if(region.length == 1){
        return team[0].split(':')[1]
    } else {
        return '';
    }
    {{< /code-block >}}

#### Ajouter une action Jira

1. Cliquez sur l'icône plus (`+`) dans la fenêtre d'édition du workflow pour ajouter une autre étape.
2. Recherchez l'action **Create issue Jira**, puis sélectionnez-la pour l'ajouter à la fenêtre d'édition de votre workflow en tant qu'étape.
3. Cliquez sur l'étape dans la fenêtre d'édition du workflow, puis saisissez les informations suivantes :
    - **Jira account** : l'URL de votre compte Jira.
    - **Project** : `{{ Steps.GetTeamInfo.data }}`.
    - **Summary** : `{{ Steps.Get_security_finding.rule.name }}`.
4. Cliquez sur **Save**.

## Déclencher un workflow

Vous pouvez déclencher un workflow existant depuis les volets latéraux relatifs aux findings, problèmes de configuration et ressources.

Dans le volet latéral, cliquez sur **Actions** > **Run Workflow**, puis sélectionnez un workflow à exécuter. Selon le workflow, il se peut que vous deviez saisir des paramètres d'entrée supplémentaires, comme les détails d'un incident ainsi que le niveau de gravité associé, le nom du compartiment S3 affecté ou le canal Slack auquel vous souhaitez envoyer une alerte.

{{< img src="/security/csm/run_workflow_side_panel.png" alt="Le menu Actions dans le volet latéral relatif aux problèmes de configuration, avec une liste d'actions à exécuter" width="100%">}}

Une fois le workflow exécuté, le volet latéral présente des informations supplémentaires. Cliquez sur le lien pour afficher le workflow.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_management/workflows
[2]: /fr/security/cloud_security_management/
[3]: /fr/service_management/workflows/build/
[4]: https://app.datadoghq.com/workflow
[5]: /fr/integrations/slack/
[6]: /fr/integrations/jira/
[7]: /fr/service_management/workflows/build/#source-object-variables
[8]: /fr/api/latest/security-monitoring/#get-a-finding