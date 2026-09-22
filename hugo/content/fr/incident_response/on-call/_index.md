---
aliases:
- /fr/service_management/on-call/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Comment nous avons conçu des sons d'alerte empathiques pour les ingénieurs
    d'astreinte
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: Blog
  text: Enrichissez votre expérience d'astreinte en utilisant Datadog On-Call
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: Blog
  text: Comment créer une stratégie de paging efficace
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unifiez la remédiation et la communication avec Datadog Incident Response
title: On-Call
---
Datadog On-Call intègre la surveillance, l'appel et la réponse aux incidents au sein d'une seule plateforme.

{{< img src="incident_response/on-call/oncall_overview.png" alt="Aperçu de la manière dont les Pages sont routées. À partir d'un monitor, d'un incident, d'un signal de sécurité ou d'un appel API, la Page est envoyée à une équipe (par exemple, 'payments-team'), puis aux règles de routage (par exemple, en fonction de la priorité), puis à une politique d'escalade. À partir de là, elle peut être envoyée à un planning ou directement à un utilisateur." style="width:100%;" >}}

## Concepts {#concepts}

- **Pages** représentent un événement pour lequel être alerté, tel qu'un monitor, un incident ou un signal de sécurité. Une Page peut avoir un statut de `Triggered`, `Acknowledged`, ou `Resolved`.
- **Teams** sont des groupes configurés dans Datadog pour gérer des types spécifiques de pages, en fonction de l'expertise et des rôles opérationnels.
- **Les règles de routage** permettent aux Teams d'ajuster finement leurs réactions à des types spécifiques d'événements entrants. Ces règles peuvent définir le niveau d'urgence d'une page, router les pages vers différentes politiques d'escalade en fonction des métadonnées de l'événement, et configurer [des heures de support][7] pour retarder les notifications d'escalade à des fenêtres temporelles définies.
- **Escalation policies** déterminent comment les Pages sont escaladées au sein ou entre les Teams.
- **Schedules** définissent les horaires auxquels des membres spécifiques de l'équipe sont d'astreinte pour répondre aux Pages.

## Fonctionnement {#how-it-works}

**Teams** sont l'unité organisationnelle centrale de Datadog On-Call. Lorsqu'une notification est déclenchée dans Datadog, une **page** est envoyée à l'équipe On-Call désignée.

{{< img src="incident_response/on-call/notification_page.png" alt="Notification mentionnant une équipe On-Call." style="width:80%;" >}}

Chaque équipe possède **des politiques d'escalade** et **des plannings**. Les politiques d'escalade définissent comment une Page est envoyée à divers plannings, tels que _Checkout Operations - Interrupt Handler_, _Primary_ et _Secondary_ dans la capture d'écran suivante. Chaque équipe peut également configurer des **règles de routage** pour acheminer les Pages vers différentes politiques d'escalade.

{{< img src="incident_response/on-call/escalation_policy.png" alt="Un exemple de politique d'escalade." style="width:80%;" >}}

Un planning définit des heures spécifiques auxquelles les membres de l'équipe sont affectés pour répondre aux Pages. Les plannings organisent et gèrent la disponibilité des membres de l'équipe à travers différents fuseaux horaires et quarts de travail.

{{< img src="incident_response/on-call/schedule.png" alt="Un exemple de planning, avec plusieurs niveaux pour les heures de bureau au Japon, dans l'UE et aux États-Unis." style="width:80%;" >}}

## Contrôle d'accès granulaire {#granular-access-control}

Utilisez des [contrôles d'accès granulaires][3] pour limiter les [rôles][4], équipes ou utilisateurs pouvant accéder aux ressources On-Call. Par défaut, l'accès aux plannings On-Call, aux politiques d'escalade et aux règles de routage d'équipe n'est pas restreint.

Des contrôles d'accès granulaires sont disponibles pour les ressources On-Call suivantes :
- **Plannings** : contrôlez qui peut consulter, modifier et remplacer des plannings
- **Politiques d'escalade** : contrôlez qui peut consulter et modifier les politiques d'escalade
- **Règles de routage d'équipe** : contrôlez qui peut consulter et modifier les règles de routage d'équipe

### Ressources et autorisations prises en charge {#supported-resources-and-permissions}

| Ressource On-Call | Lecteur | Remplaçant | Éditeur |
|------------------|--------|-----------|--------|
| **Plannings** | Peut consulter les plannings | Peut consulter les plannings et remplacer les tours de garde | Peut consulter, modifier les plannings et remplacer les tours de garde |
| **Politiques d'escalade** | Peut consulter les politiques d'escalade | - | Peut consulter et modifier les politiques d'escalade |
| **Règles de routage d'équipe** | Peut consulter les règles de routage d'équipe | - | Peut consulter et modifier les règles de routage d'équipe |

### Restreindre l'accès aux ressources On-Call {#restrict-access-to-on-call-resources}

Pour restreindre l'accès à une ressource On-Call :

1. Accédez à la ressource On-Call spécifique (planning, politique d'escalade ou règles de routage d'équipe).
1. Cliquez sur **Gérer**.
1. Sélectionnez **Permissions** dans le menu déroulant.
1. Cliquez sur **Restreindre l'accès**.
1. Sélectionnez un ou plusieurs rôles, équipes ou utilisateurs dans le menu déroulant.
1. Cliquez sur **Add**.
1. Sélectionnez le niveau d'accès que vous souhaitez associer à chacun d'eux dans le menu déroulant à côté de leur nom :
   - **Lecteur** : Accès en lecture seule pour visualiser la ressource
   - **Remplaçant** (plannings uniquement) : Peut visualiser et créer des remplacements de planning
   - **Éditeur** : Accès complet pour visualiser et modifier la ressource
1. Cliquez sur **Enregistrer**.

**Remarque** : Pour conserver votre accès en modification à la ressource, Datadog exige que vous incluiez au moins un rôle dont vous êtes membre avant d'enregistrer.

## Commencez à utiliser Datadog On-Call {#start-using-datadog-on-call}

<div class="alert alert-danger">Pour préserver l'historique des incidents, Datadog On-Call ne prend pas en charge la suppression de ressources telles que les Pages, les politiques d'escalade ou les plannings. Pour tester On-Call sans affecter votre environnement de production, créez une organisation d'essai en tant qu'environnement de test.</div>

Pour commencer avec On-Call, [intégrez une équipe On-Call][1] et assurez-vous que tous les membres de l'équipe configurent leurs [préférences de notification On-Call][2] pour recevoir des notifications.

{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>Intégrer une équipe</u> : Créez une nouvelle équipe On-Call, ajoutez une équipe Datadog existante à On-Call ou importez une équipe depuis PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/pages">}}<u>Pages</u> : Déclenchez des Pages à partir de monitors, d'incidents, de signaux de sécurité et d'autres sources. Accusez réception, réassignez ou résolvez des Pages, ou promouvez-les en incidents.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>Politiques d'escalade</u> : Définissez les étapes de la manière dont une Page est envoyée aux différents plannings. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>Plannings</u> : Définissez les emplois du temps pour les rotations d'astreinte des membres de l'équipe.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/notification_preferences">}}<u>Préférences de notification</u> : Configurez vos méthodes de contact et vos préférences de notification pour vous assurer de recevoir des Pages opportunes et efficaces.{{< /nextlink >}}
{{< /whatsnext >}}

## Facturation {#billing}

On-Call est une offre basée sur le nombre de sièges (SKU). Pour en savoir plus sur la facturation d'On-Call et sur la gestion des sièges dans Datadog, consultez notre [page de tarification][5] et la [documentation sur la facturation d'Incident Response][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/on-call/teams
[2]: /fr/incident_response/on-call/notification_preferences
[3]: /fr/account_management/rbac/granular_access/
[4]: /fr/account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /fr/account_management/billing/incident_response/
[7]: /fr/incident_response/on-call/routing_rules#support-hours