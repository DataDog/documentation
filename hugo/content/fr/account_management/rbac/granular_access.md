---
description: Contrôlez l'accès aux ressources Datadog individuelles comme les dashboards,
  les monitors et les notebooks par équipes, rôles ou utilisateurs pour une gestion
  fine des autorisations.
title: Contrôle d'accès granulaire
---
## Gérez l'accès aux ressources individuelles {#manage-access-to-individual-resources}

Certaines ressources vous permettent de restreindre l'accès aux ressources individuelles par rôles, [équipes][1] ou utilisateurs.

Utilisez les différentes entités principales pour contrôler les schémas d'accès dans votre organisation et favoriser le partage des connaissances et la collaboration :
- Utilisez les équipes pour associer l'accès aux groupes fonctionnels de vos organisations. Par exemple, restreignez la modification d'un dashboard à l'équipe d'application qui le possède.
- Utilisez les rôles pour associer l'accès aux personas. Par exemple, restreignez la modification des méthodes de paiement aux administrateurs de facturation.
- Attribuez l'accès à des utilisateurs individuels uniquement lorsque cela est nécessaire.


| Ressources prises en charge avec contrôle d'accès granulaire | Accès basé sur les équipes | Accès basé sur les rôles | Accès basé sur les utilisateurs / comptes de service |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Applications][13]                                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Comptes AWS][11]                               | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Enregistrements d'applications Azure][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Projets de gestion du travail][10]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connexions][14]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Groupes de connexions][15]                          | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connexions inter-organisations][20]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Datastores][16]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Gravité dynamique][26]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Experiments][27]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Feature Flags][25]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Comptes de service Google][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Comptes d'intégration][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Services d'intégration][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Webhooks d'intégration][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Pipelines de logs][24]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Observability Pipelines][23]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [On-Call][22]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Private Action Runner][18]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Tables de référence][12]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [RUM apps][19]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Règles de sécurité][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Suppressions de sécurité][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Sheets][21]                                     | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Tests Synthetic][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Workflows][17]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |


### Élevez l'accès aux ressources individuelles {#elevate-access-to-individual-resources}

Un utilisateur disposant de l'autorisation `user_access_manage` peut élever son accès à toute ressource individuelle prenant en charge les restrictions basées sur l'équipe, le rôle et l'utilisateur ou le compte de service. Les ressources qui n'ont que des restrictions d'accès basées sur les rôles ne sont pas prises en charge. Pour obtenir l'accès, cliquez sur le bouton {{< ui >}}Elevate Access{{< /ui >}} dans la fenêtre modale de contrôle d'accès granulaire.

[1]: /fr/account_management/teams/
[2]: /fr/dashboards/configure/#permissions
[3]: /fr/monitors/configuration/#permissions
[4]: /fr/notebooks/#limit-edit-access
[5]: /fr/dashboards/widgets/powerpack/#powerpack-permissions
[6]: /fr/security/detection_rules/#restrict-edit-permissions
[7]: /fr/security/suppressions/#restrict-edit-permissions
[8]: /fr/service_level_objectives/#permissions
[9]: /fr/synthetics/browser_tests/#permissions
[10]: /fr/incident_response/work_management/settings#granular-access-control
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
[22]: /fr/incident_response/on-call/#granular-access-control
[23]: /fr/observability_pipelines/configuration/access_control/
[24]: /fr/logs/log_configuration/pipelines/#pipeline-permissions
[25]: /fr/getting_started/feature_flags/
[26]: /fr/security/cloud_siem/detect_and_monitor/dynamic_severity/#restrict-edit-permissions
[27]: /fr/experiments/