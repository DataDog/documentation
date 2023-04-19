---
disable_toc: false
further_reading:
- link: /workflows/actions_catalog
  tag: Documentation
  text: Explorer les actions disponibles dans l'Actions Catalog
is_beta: true
kind: documentation
title: Créer des workflows
---

{{< callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  La solution Workflows est en bêta publique. Si vous souhaitez nous faire part de vos remarques ou de vos questions, contactez l'<a href="/help">assistance Datadog</a>.
{{< /callout >}}

Vous pouvez créer des workflows ou modifier des workflows existants depuis la [page **Workflows**][1] de Datadog. Cette page affiche la liste des workflows existants ainsi que leur auteur, leur dernière date de modification et leur dernière date d'exécution.
- Passez votre curseur sur un workflow pour afficher les options de suppression ou de duplication du workflow.
- Activez l'option **My workflows** si vous souhaitez uniquement voir les workflows que vous avez créés.

## Créer un workflow à partir d'un blueprint

1. Cliquez sur l'onglet **Blueprints**.
1. Si vous le souhaitez, utilisez la barre de recherche pour filtrer la liste des blueprints par nom, catégorie ou intégration.
1. Repérez le blueprint que vous souhaitez utiliser, puis cliquez dessus. La fenêtre d'édition de workflow apparaît.
1. Cliquez sur l'icône en forme de crayon (**Edit**) pour mettre à jour le nom du workflow. Si vous le souhaitez, saisissez un nouveau nom dans le champ de texte et cliquez sur **Save**.
1. Les étapes du workflow qui nécessitent des modifications sont signalées par un point d'exclamation jaune.
1. Cliquez sur chaque étape de workflow que vous souhaitez modifier, et renseignez les champs vides depuis l'onglet **Configure**.
1. Lorsque vous avez terminé de modifier le workflow, cliquez sur **Create From Blueprint**. La fenêtre d'édition se met à jour et affiche votre nouveau workflow.

## Créer un workflow personnalisé

Pour créer un workflow :
1. Cliquez sur **New workflow**.
1. Donnez un nom au workflow et cliquez sur **Create**.
1. Cliquez sur **Add a step to get started** pour commencer à ajouter des étapes à votre workflow. Vous pouvez également sélectionner **Edit JSON Spec** pour créer un workflow via l'éditeur JSON.

### Créer un workflow avec le créateur de workflow

1. Cliquez sur **Add a step to get started** pour ajouter la première étape de votre workflow.
1. Recherchez une action à l'aide de la barre de recherche ou parcourez les différentes intégrations et leurs actions associées pour trouver l'action qui vous intéresse. Cliquez sur une action pour l'ajouter en tant qu'étape dans la fenêtre d'édition.
{{< img src="workflows/workflow-builder.mp4" alt="Faire glisser une étape sur la fenêtre d'édition de workflow" video="true"  >}}
1. Cliquez sur l'étape dans la fenêtre d'édition pour la configurer ou visualiser ses sorties et ses variables de contexte. Pour en savoir plus sur les sorties et les variables de contexte, consultez la section [Variables de contexte](#variables-de-contexte).
1. Une fois l'étape configurée, cliquez sur l'icône Plus (`+`) pour ajouter une autre étape, ou enregistrez le workflow si vous avez terminé.

Chaque étape du workflow peut être modifiée à tout moment en cliquant dessus. Cliquez sur les étapes et faites-les glisser pour les réorganiser.

### Créer un workflow via l'éditeur JSON

Vous pouvez créer ou modifier un workflow en JSON en cliquant sur l'option **Edit JSON Spec** sur la page de votre workflow. L'éditeur JSON offre également les options suivantes :
- **Format JSON** : améliorez l'apparence de votre JSON.
- **Export JSON** : permet de télécharger le workflow.

Un workflow contient généralement trois clés de premier niveau :
- `"steps"` : Un tableau d'objets "step". Chaque step définit une étape du workflow et comprend un nom, l'ID d'action ainsi que les paramètres de l'étape. L'objet `steps` comprend également une clé correspondant aux données de connexion sortantes.
- `"startStepName"` : le nom de la première étape du workflow.
- `"connectionEnvs"` : les données de connexion et les variables d'environnement.

Voici un exemple de workflow constitué d'une seule étape qui envoie un message à un canal Slack intitulé `#workflows-test` :

{{< code-block lang="json" collapsible="true" filename="Example workflow" >}}
{
    "steps": [
        {
            "outboundConnections": [],
            "name": "Send_message",
            "actionId": "com.datadoghq.slack.send_simple_message",
            "parameters": [
                {
                    "name": "teamId",
                    "value": "ABC1234"
                },
                {
                    "name": "channel",
                    "value": "#workflows-test"
                },
                {
                    "name": "mentionTargets",
                    "value": [
                        "@Bits"
                    ]
                },
                {
                    "name": "text",
                    "value": "Hello world!"
                }
            ]
        }
    ],
    "startStepName": "Send_message",
    "connectionEnvs": [
        {
            "env": "default",
            "connections": []
        }
    ]
}
{{< /code-block >}}

## Variables de contexte

Pour créer des workflows utiles, il est parfois nécessaire de transmettre des données d'une étape à une autre ou de configurer des étapes qui agissent en fonction de la source de déclenchement du workflow. Vous pouvez utiliser des variables de contexte pour mettre en place ce type d'interpolations de données.

Il existe plusieurs types de variables de contexte :
- Tous les workflows comprennent un petit nombre de **variables de workflow** standard.
- Certaines étapes intègrent des **variables de sortie d'étape**, qui vous permettent de transmettre les données d'une étape à une autre étape ultérieure.
- Les **variables de déclenchement** sont transmises dans le workflow par l'événement de déclenchement.
- Les **variables d'objet source** sont transmises dans le workflow par l'événement de déclenchement.

Pour chaque étape, l'onglet **Context Variables** affiche une carte des différentes variables de contexte qui peuvent être utilisées.

{{< img src="workflows/context-variables.png" alt="Onglet Context Variables" >}}

Pour accéder à une variable de contexte dans une étape, placez-la entre des doubles accolades (`{{`). Lorsqu'un champ affiche le symbole `{{`, cela signifie que des variables de contexte sont disponibles.
{{< img src="workflows/use-context-variable.mp4" alt="Utiliser des doubles accolades dans un champ de texte pris en charge pour insérer une variable de contexte" video="true" >}}

### Variables de workflow

Tous les workflows intègrent trois variables standard :
- `WorkflowName` : le nom du workflow. Utilisez `{{ WorkflowName }}` pour y accéder.
- `WorkflowId` : l'ID du workflow. Utilisez `{{ WorkflowId }}` pour y accéder.
- `InstanceId` : chaque exécution d'un workflow reçoit un ID d'instance unique. Utilisez `{{ InstanceId }}` pour y accéder.

### Variables de sortie d'étape

Certaines étapes génèrent des sorties que les étapes ultérieures peuvent ensuite utiliser. Pour accéder à une variable d'étape, utilisez la syntaxe `Steps.<nom_étape>.<variable>`. Par exemple, pour récupérer la variable de statut d'une pull request (`state`) depuis l'étape de statut d'une pull request GitHub (`Get_pull_request_status`), utilisez la variable de contexte suivante :

```
{{ Steps.Get_pull_request_status.state }}
```

Si vous ne savez pas quelle variable utiliser, Datadog vous suggère des étapes existantes à mesure que vous saisissez du texte. Vous pouvez également consulter l'onglet [Context Variables](#variables-de-contexte) pour visualiser la liste des variables disponibles.

### Variables de déclenchement

Vous pouvez transmettre des variables de déclenchement dans un workflow sous forme d'entrées. Les workflows acceptent un objet JSON constitué de paires key/value séparées par des virgules. Pour accéder à une variable de déclenchement dans des étapes de workflow, utilisez la syntaxe `{{ Trigger.key }}`. Par exemple, pour accéder à la variable de déclenchement `{ "user": "Bits" }`, utilisez ` {{ Trigger.user }}` dans l'étape.

- Si vous ajoutez une variable de déclenchement qui n'existe pas, la variable est automatiquement ajoutée en tant qu'entrée de workflow.
- Si vous ne savez pas quelle variable utiliser, Datadog vous suggère des étapes existantes à mesure que vous saisissez du texte. Vous pouvez également consulter l'onglet [Context Variables](#variables-de-contexte) pour visualiser la liste des variables disponibles.

{{< img src="workflows/add-trigger-variable.mp4" alt="Lorsqu'une variable de déclenchement est ajoutée à une étape, elle est automatiquement ajoutée au workflow" video="true" >}}

Pour en savoir plus sur le déclenchement de workflows, consultez la section [Déclencher un workflow][2].

### Variables d'objet source

Les variables d'objet source sont des propriétés de l'événement déclencheur qui sont résolues lors de l'exécution. Les variables disponibles dans le workflow dépendent du type de déclencheur qui a initié l'instance de workflow. Par exemple, si l'instance de workflow est déclenchée par un monitor, la variable d'ID du monitor est disponible via `{{Source.monitor.id}}`. Si le workflow est déclenché par une règle de détection ou de notification de signal de sécurité, l'ID du signal est disponible via `{{Source.securitySignal.id}}`.

Toutes les variables de l'objet source sont visibles depuis l'onglet Context Variables.

{{< img src="workflows/context-variables-tab-source-object-variables.png" alt="Variables de l'objet source dans l'onglet Context Variables" >}}

## Gestion des erreurs et solutions de secours

Si une étape échoue, vous pouvez spécifier le nombre de tentatives que votre workflow doit effectuer avant de passer à une étape de secours facultative. Si aucune étape de secours n'a été ajoutée, le workflow s'arrête une fois le nombre maximum de tentatives atteint.

Pour configurer la gestion des erreurs pour une étape :
1. Cliquez sur l'étape concernée dans la fenêtre d'édition du workflow.
1. Cliquez sur l'icône **+** à proximité de la section **Error Handling & Retries**.
1. Modifiez l'intervalle et le nombre maximum de tentatives à l'aide des champs **Interval** et **Max retries**.
1. Si vous le souhaitez, [ajoutez une étape de secours](#ajouter-une-etape-de-secours).
1. Enregistrez votre workflow pour appliquer les modifications.

{{< img src="workflows/error-handling.png" alt="Section Error Handling and Retries" style="width:100%;" >}}

### Ajouter une solution de secours

Dans le cas où une étape viendrait à échouer, vous pouvez ajouter une étape de secours en aval du workflow en la sélectionnant depuis le menu déroulant **Fallback**.

Vous pouvez également ajouter une étape de secours qui se détache de l'arborescence principale du workflow :
1. Depuis le menu déroulant **Fallback**, sélectionnez **Add a new fallback**. La fenêtre d'édition du workflow est remplacée par une arborescence de secours.
1. Cliquez sur l'icône **+** dans l'arborescence de secours pour ajouter une étape.
1. [Ajoutez des étapes à l'aide du créateur de workflow](#creer-un-workflow-avec-le-createur-de-workflow). Vous pouvez ajouter autant d'étapes que vous le souhaitez à l'arborescence de secours.
1. Une fois vos étapes de secours configurées, cliquez sur **Save** pour appliquer vos modifications.

Pour revenir à la fenêtre d'édition du workflow principal, cliquez sur **Main** au-dessus de l'arborescence de secours. Sur la fenêtre d'édition, une icône spéciale apparaît à côté des étapes qui disposent d'une solution de secours. Cliquez sur l'icône et sélectionnez l'étape de secours pour ouvrir l'arborescence de secours. Vous pouvez également accéder à l'arborescence de secours en cliquant sur **Edit Fallback Tree** dans la section **Error Handling & Retries** d'une étape. Le bouton **Edit Fallback Tree** apparaît uniquement si l'étape de secours n'est pas une étape en aval existante dans le workflow principal.

{{< img src="workflows/fallback-icon.png" alt="Étape disposant d'une solution de secours" style="width:60%;" >}}

### Supprimer une solution de secours

1. Depuis la fenêtre d'édition du workflow principal, cliquez sur l'étape pour laquelle vous souhaitez supprimer la solution de secours.
1. Dans la section **Error Handling & Retries**, cliquez sur **Clear**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow
[2]: /fr/workflows/trigger