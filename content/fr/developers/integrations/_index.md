---
title: Présentation des intégrations basées sur l'Agent
kind: documentation
aliases:
  - /fr/guides/agent_checks/
  - /fr/agent/agent_checks
  - /fr/developers/agent_checks/
---
## Pourquoi créer une intégration ?

Les [checks custom][1] conviennent pour des transmissions occasionnelles, ou si la source de données est unique ou très limitée. Pour des cas d'utilisation plus généraux, comme des frameworks d'application, des projets open source ou un logiciel couramment utilisé, il est conseillé d'écrire une intégration.

Les métriques transmises à partir d'intégrations acceptées ne sont pas considérées comme des métriques custom et n'ont par conséquent aucune incidence sur votre quota autorisé. (Les intégrations qui transmettent des métriques potentiellement illimitées sont toutefois susceptibles d'être considérées comme custom.) En proposant une prise en charge native de Datadog aux utilisateurs, ceux-ci seront plus enclins à adopter votre produit, service ou projet. En outre, le fait de figurer dans l'écosystème Datadog vous garantira également une plus grande visibilité.

### Comment procéder ?

L'objectif initial est de générer du code permettant de recueillir les métriques souhaitées de façon fiable et de s'assurer que le framework d'intégration général est en place. Commencez par développer la fonction de base en tant que check custom, puis ajoutez les détails du framework en suivant la [documentation relative à la création d'une intégration][2].

Ensuite, ouvrez une pull request sur le [référentiel integrations-extras][3]. Cela indique à Datadog que vous êtes prêt à commencer à réviser le code ensemble. Ne vous inquiétez pas si vous avez des questions à propos des tests, des procédures internes de Datadog ou d'autres sujets : l'équipe chargée des intégrations est là pour vous aider, et les pull requests constituent le moyen idéal d'aborder ces questions. Assurez-vous également de tirer parti des [Heures de permanence][4] !

Une fois votre intégration validée (fonctionnalités, conformité du framework et qualité générale du code), elle sera ajoutée au référentiel GitHub. Elle fera alors officiellement partie de l'écosystème Datadog. Félicitations !

### Quelles sont vos responsabilités ?

En tant qu'auteur du code, vous êtes alors responsable de son maintien. Vous êtes chargé de mettre à jour le code et d'assurer le bon fonctionnement de l'intégration. Aucun engagement de temps spécifique n'est imposé ; nous vous demandons simplement d'accepter de vous occuper du code pendant quelque temps. Vous ne serez pas seul, car Datadog fait tout son possible pour allouer des ressources au maintien des intégrations supplémentaires !

## Lancez-vous !

Tous les détails, y compris les prérequis, les exemples de code et plus encore, se trouvent dans la documentation relative à la [création d'une intégration][2].

[1]: https://docs.datadoghq.com/fr/developers/custom_checks/write_agent_check/
[2]: /fr/developers/integrations/new_check_howto
[3]: https://github.com/DataDog/integrations-extras
[4]: https://docs.datadoghq.com/fr/developers/community/office_hours/