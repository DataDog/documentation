---
title: Contrôle d'accès granulaire
---
## Gérer l'accès à des ressources spécifiques

Certaines ressources vous permettent de restreindre l’accès à des ressources spécifiques en fonction des rôles, des [équipes][1] ou des utilisateurs.

Utilisez ces différents types de principals pour contrôler les modèles d'accès dans votre organisation et encourager le partage des connaissances et la collaboration :
- Utilisez des équipes pour accorder des accès à des groupes fonctionnels au sein de votre organisation. Vous pouvez, par exemple, rendre la modification d'un dashboard possible uniquement par l'équipe d'application qui en est propriétaire.
- Utilisez les rôles pour faire correspondre les accès aux profils. Par exemple, restreignez la modification des moyens de paiement aux responsables de la facturation.
- Accordez des accès à des utilisateurs individuels uniquement lorsque cela est nécessaire.


| Ressources compatibles avec le contrôle d'accès granulaire | Accès par équipe | Accès basé sur les rôles | Accès basé sur les utilisateurs ou comptes de service |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Apps][13]                                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Projets Case Management][10]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connexions][14]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Groupes de connexion][15]                          | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connexions inter-organisations][20]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Datastores][16]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Comptes d'intégration][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Services d'intégration][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Webhooks d'intégration][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Astreintes][22]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Exécuteur d'action privée][18]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Tables de référence][12]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Apps RUM][19]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Règles de sécurité][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Suppressions de sécurité][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Feuilles][21]                                     | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Tests Synthetic][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Workflows][17]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |


### Élever son accès à des ressources individuelles

Un utilisateur disposant de l'autorisation `user_access_manage` peut élever son accès à toute ressource individuelle prenant en charge les restrictions basées sur une équipe, un rôle ou un utilisateur ou compte de service. Les ressources ne prenant en charge que les restrictions basées sur les rôles ne sont pas compatibles. Pour obtenir l'accès, cliquez sur le bouton **Elevate Access** dans la fenêtre de contrôle d'accès granulaire.

[1]: /fr/account_management/teams/
[2]: /fr/dashboards/configure/#permissions
[3]: /fr/monitors/configuration/#permissions
[4]: /fr/notebooks/#limit-edit-access
[5]: /fr/dashboards/widgets/powerpack/#powerpack-permissions
[6]: /fr/security/detection_rules/#restrict-edit-permissions
[7]: /fr/security/suppressions/#restrict-edit-permissions
[8]: /fr/service_management/service_level_objectives/#permissions
[9]: /fr/synthetics/browser_tests/#permissions
[10]: /fr/service_management/case_management/settings#granular-access-control
[11]: /fr/getting_started/integrations/#granular-access-control
[12]: /fr/reference_tables/#permissions
[13]: /fr/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-app
[14]: /fr/actions/connections/?tab=workflowautomation#connection-credentials
[15]: /fr/actions/connections/?tab=workflowautomation#connection-groups
[16]: /fr/actions/datastore/
[17]: /fr/actions/workflows/access_and_auth/#restrict-access-on-a-specific-workflow
[18]: /fr/actions/private_actions
[19]: /fr/real_user_monitoring
[20]: /fr/account_management/org_settings/cross_org_visibility/#permissions
[21]: /fr/sheets/#permissions
[22]: /fr/service_management/on-call/#granular-access-control