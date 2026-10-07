---
aliases:
- /fr/service_management/case_management/troubleshooting/
- /fr/incident_response/case_management/troubleshooting/
title: Dépannage
---
## Vue d'ensemble {#overview}

Ce guide est conçu pour vous aider à résoudre les problèmes liés aux intégrations tierces dans Work Management. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][1] pour obtenir de l'aide.

## Jira {#jira}

Les types de tickets Jira avec des champs personnalisés, les projets Jira privés et les instances Jira sur site ne sont pas pris en charge. Si vous rencontrez des problèmes avec la création automatique de tickets Jira lors de la synchronisation, consultez les sections suivantes :

### Configuration {#configuration}

1. Si les projets Jira ne s'affichent pas dans la liste déroulante sur l'écran de configuration de l'intégration Jira, vérifiez que vous disposez de l'autorisation `manage_integrations`. 

1. Assurez-vous d'avoir configuré un webhook pour recevoir les événements de Jira.

### Synchronisation et mises à jour {#syncing-and-updates}

1. Si vous déplacez un élément de travail synchronisé avec un ticket Jira vers un autre projet Work Management, la synchronisation s'arrête. Une fois déplacé, l'élément de travail dans le nouveau projet n'a plus de ticket Jira associé.
1. Si vous mettez à jour le statut d'un élément de travail d'une manière non autorisée par un workflow Jira, l'élément de travail n'est plus synchronisé avec le mappage de statut.
1. Les mises à jour des commentaires, y compris les suppressions, dans Work Management ou Jira ne sont pas répercutées de l'autre côté.
1. Seuls les éléments de travail créés après l'activation de l'intégration bidirectionnelle sont synchronisés. Datadog ne synchronise pas rétroactivement les éléments de travail qui existaient avant l'activation de l'intégration.

### Rapporteur de ticket Jira {#jira-issue-reporter}

1. Il existe quelques scénarios où le rapporteur du ticket Jira est indiqué comme étant l'utilisateur Datadog qui a configuré l'intégration Jira. Certains de ces scénarios incluent :
    - Lorsqu'un utilisateur Datadog qui crée un élément de travail ne possède pas de compte Jira
    - Un utilisateur Jira a masqué la visibilité de son adresse e-mail
1. Si le rapporteur du ticket Jira mis en miroir est mis à jour, cela n'est pas répercuté dans Work Management, car le champ « créé par » n'est pas modifiable.



[1]: https://docs.datadoghq.com/fr/help/