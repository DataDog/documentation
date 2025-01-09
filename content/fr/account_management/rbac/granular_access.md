---
title: Contrôle d'accès granulaire
---
## Gérer l'accès à des ressources spécifiques

Certaines ressources vous permettent de restreindre l'accès à des ressources spécifiques en fonction des rôles, des [équipes][1] ou des utilisateurs.

Utilisez les différents principaux pour contrôler l'accès aux ressources au sein de votre organisation et encourager le partage des connaissances et la collaboration :
- Utilisez des équipes pour accorder des accès à des groupes fonctionnels au sein de votre organisation. Vous pouvez, par exemple, rendre la modification d'un dashboard possible uniquement par l'équipe d'application qui en est propriétaire.
- Utilisez des rôles pour accorder des accès à des types d'utilisateurs. Vous pouvez, par exemple, rendre la modification des moyens de paiement possible uniquement par les responsables de la facturation.
- Accordez des accès à des utilisateurs individuels uniquement lorsque cela est nécessaire.


| Ressources prenant en charge le contrôle d'accès granulaire | Accès par équipe | Accès par rôle | Accès par utilisateur / compte de service |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    |                   | {{< X >}}         |                                     |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Règles de sécurité][5]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][6]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Tests Synthetic][7]                             |                   | {{< X >}}         |                                     |

### Obtenir l'accès à des ressources spécifiques

Un utilisateur disposant de l'autorisation `user_access_manage` peut obtenir l'accès en modification à toute ressource prenant en charge les restrictions basées sur une équipe, un rôle et un utilisateur/compte de service. Les ressources pour lesquelles il n'est possible de définir que des restrictions d'accès par rôle ne sont pas prises en charge. Pour obtenir l'accès à une ressource, cliquez sur le bouton **Gain Edit Access** dans la fenêtre de contrôle d'accès granulaire.

[1]: /fr/account_management/teams/
[2]: /fr/dashboards/#permissions
[3]: /fr/monitors/notify/#permissions
[4]: /fr/notebooks/#limit-edit-access
[5]: /fr/security/detection_rules/#limit-edit-access
[6]: /fr/service_management/service_level_objectives/#permissions
[7]: /fr/synthetics/browser_tests/#permissions