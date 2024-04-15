---
further_reading:
- link: /integrations/ecs_fargate/
  tag: Documentation
  text: ECS Fargate
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: Blog
  text: Surveiller les applications AWS Fargate avec Datadog
- link: /agent/docker/integrations/
  tag: Documentation
  text: Autodiscovery

title: Configuration d'intégration pour ECS Fargate
---

Configurez des intégrations pour [ECS Fargate][1] avec les [annotations d'étiquette Docker][2].

## Ajouter une intégration

Si vous avez déjà [configuré lʼAgent de conteneur][3] dans ECS Fargate, suivez ces étapes pour ajouter une intégration à votre cluster existant.

### Mettre à jour la définition de la tâche

1. Connectez-vous à votre [console Web AWS][4] et accédez à la section ECS.
2. Choisissez le cluster sur lequel l'Agent Datadog est exécuté.
3. Cliquez sur lʼonglet **Tasks**, puis cliquez sur le nom **Task definition** qui contient le conteneur de lʼAgent Datadog.
4. Cliquez sur le bouton **Create new revision**, puis sur le bouton **Add container**.
5. Saisissez le **nom du conteneur**, lʼ**image** et toutes les préférences supplémentaires de votre choix.
6. Sous **Docker labels**, ajoutez ce qui suit :

| Clé                           | Valeur                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

7. Cliquez sur le bouton **Add**, puis sur le bouton **Create**.

### Mettre à jour le service

1. Dans le cluster, cliquez sur lʼonglet **Services**, puis cliquez sur le **nom du service**.
2. Cliquez sur le bouton **Update**.
3. Pour **Task Definition**, choisissez la dernière **révision** dans le menu déroulant.
4. Cliquez 3 fois sur le bouton **Next step**, puis cliquez sur le bouton **Update Service**.

### Vérification

Lorsque la **tâche** mise à jour affiche lʼétat **RUNNING**, référez-vous à ces pages pour vérifier que lʼinformation est donnée à Datadog :

- [Live Containers][5] pour afficher le conteneur.
- Le [Metrics Explorer][6] pour afficher les métriques dʼintégration.

## Exemples

{{< tabs >}}
{{% tab "Redis - Web UI" %}}
Référez-vous au tableau suivant pour saisir les étiquettes Docker via la [console web AWS][1] pour un conteneur Redis :

| Clé                           | Valeur                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "Redis - AWS CLI" %}}
Utilisez le JSON suivant sous `containerDefinitions` pour créer un conteneur Redis via les [outils CLI AWS][1].

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/ecs_fargate/
[2]: /fr/agent/docker/integrations/?tab=dockerlabel#configuration
[3]: /fr/integrations/ecs_fargate/#container-agent-setup
[4]: https://aws.amazon.com/console
[5]: https://app.datadoghq.com/containers
[6]: https://app.datadoghq.com/metric/explorer
