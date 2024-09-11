---
categories:
- cloud
- google cloud
- log collection
- security
dependencies: []
description: Consultez le dashboard des logs d'audit.
doc_link: ''
draft: false
git_integration_title: google_cloud_audit_logs
has_logo: true
integration_id: google-cloud-audit-logs
integration_title: Dashboard des logs d'audit Datadog/Google
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_audit_logs
public_title: Intégration du dashboard des logs d'audit Datadog/Google
short_description: Consultez le dashboard des logs d'audit.
version: '1.0'
---

## Présentation

La surveillance des logs d'audit GCP vous permet de déterminer l'identité des utilisateurs qui accèdent à une ressource donnée, la méthode utilisée et le statut d'autorisation d'un tel accès. 

Il existe trois types de logs d'audit.
* **Journaux d'audit d'événements système** : ces logs sont enregistrés par défaut par GCP. Ils contiennent des entrées associées aux actions Google Cloud qui modifient la configuration des ressources. Les journaux d'audit d'événements système sont générés par les systèmes Google : ils ne sont pas créés à la suite d'une action utilisateur directe.
* **Journaux d'audit pour les activités d'administration** : ces logs sont enregistrés par défaut par GCP. Ils contiennent des entrées relatives aux appels d'API et aux autres actions qui modifient la configuration ou les métadonnées des ressources. Par exemple, ces logs enregistrent lorsque les utilisateurs créent des instances de VM ou modifient les autorisations Identity and Access Management.
* **Journaux d'audit pour l'accès aux données** : ces logs sont [activés séparément][1] pour chaque ressource. Ils contiennent les appels d'API qui lisent la configuration ou les métadonnées des ressources, ainsi que les appels d'API pilotés par l'utilisateur qui créent, modifient ou lisent des données de ressources fournies par l'utilisateur. Ils n'enregistrent pas d'opération d'accès aux données pour les ressources publiques.
* **Journaux d'audit des refus de règles** : ces logs sont générés par défaut. Des entrées sont enregistrées dans ces logs lorsqu'un service Google Cloud refuse l'accès à un utilisateur ou à un [compte de service][2] en raison d'une violation des règles de sécurité.

Ces logs peuvent être envoyés via le processus standard de transmission des logs GCP, à l'aide d'un Pub/Sub et des étapes décrites [sur cette page][3].

Pour en savoir plus, consultez la section [Comprendre les journaux d'audit][4] de la documentation Google et l'article [Meilleures pratiques de surveillance des logs d'audit GCP][5] (en anglais).

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://cloud.google.com/logging/docs/audit/configure-data-access
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[4]: https://cloud.google.com/logging/docs/audit/understanding-audit-logs
[5]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/
[6]: https://docs.datadoghq.com/fr/help/