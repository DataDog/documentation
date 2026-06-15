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
    de garde
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: Blog
  text: Enrichissez votre expérience de garde en utilisant Datadog On-Call
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: Blog
  text: Comment créer une stratégie de paging efficace
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unifiez la remédiation et la communication avec Datadog Incident Response
title: On-Call
---
Datadog On-Call intègre la surveillance, le paging et la réponse aux incidents en une seule plateforme.

{{< img src="service_management/oncall/oncall_overview.png" alt="Aperçu de la façon dont les Pages sont routées. À partir d'un moniteur, d'un incident, d'un signal de sécurité ou d'un appel API, la Page est envoyée à une Équipe (par exemple, 'équipe-paiements'), puis aux règles de routage (par exemple, en fonction de la priorité) puis à une politique d'escalade. Là, elle peut être envoyée à un planning ou directement à un utilisateur." style="width:100%;" >}}

## Concepts {#concepts}

- **Les Pages** représentent quelque chose pour lequel il faut être alerté, comme un moniteur, un incident ou un signal de sécurité. Une Page peut avoir un statut de `Triggered`, `Acknowledged` ou `Resolved`.
- **Les Équipes** sont des groupes configurés au sein de Datadog pour gérer des types spécifiques de Pages, en fonction de l'expertise et des rôles opérationnels.
- **Les règles de routage** permettent aux Équipes d'ajuster finement leurs réactions à des types spécifiques d'événements entrants. Ces règles peuvent définir le niveau d'urgence d'une Page, router les Pages vers différentes politiques d'escalade en fonction des métadonnées de l'événement, et configurer [heures de support][7] pour retarder les notifications d'escalade à des fenêtres horaires définies.
- **Les politiques d'escalade** déterminent comment les Pages sont escaladées au sein ou entre les Équipes.
- **Les plannings** définissent les plages horaires pendant lesquelles des membres spécifiques de l'équipe sont d'astreinte pour répondre aux Pages.

## Comment cela fonctionne {#how-it-works}

**Les Équipes** sont l'unité organisationnelle centrale de Datadog On-Call. Lorsqu'une notification est déclenchée dans Datadog, une **Page** est envoyée à l'équipe On-Call désignée.

{{< img src="service_management/oncall/notification_page.png" alt="Notification mentionnant une équipe On-Call." style="width:80%;" >}}

Chaque équipe possède **des politiques d'escalade** et **des plannings**. Les politiques d'escalade définissent comment une Page est envoyée à divers plannings, tels que _Opérations de caisse - Gestionnaire d'interruption_, _Principal_, et _Secondaire_ dans la capture d'écran suivante. Chaque équipe peut également configurer **des règles de routage** pour acheminer les Pages vers différentes politiques d'escalade.

{{< img src="service_management/oncall/escalation_policy.png" alt="Un exemple de politique d'escalade." style="width:80%;" >}}

Un planning définit des moments spécifiques où les membres de l'équipe sont assignés pour répondre aux Pages. Les plannings organisent et gèrent la disponibilité des membres de l'équipe à travers différents fuseaux horaires et quarts de travail.

{{< img src="service_management/oncall/schedule.png" alt="Un exemple de planning, avec plusieurs couches pour les heures de bureau JP, EU et US." style="width:80%;" >}}

## Contrôle d'accès granulaire {#granular-access-control}

Utilisez [des contrôles d'accès granulaires][3] pour limiter les [rôles][4], les équipes ou les utilisateurs qui peuvent accéder aux ressources On-Call. Par défaut, l'accès aux plannings On-Call, aux politiques d'escalade et aux règles de routage d'équipe est non restreint.

Des contrôles d'accès granulaires sont disponibles pour les ressources On-Call suivantes :
- **Plannings** : Contrôlez qui peut voir, modifier et remplacer les plannings
- **Politiques d'escalade** : Contrôlez qui peut voir et modifier les politiques d'escalade
- **Règles de routage d'équipe** : Contrôlez qui peut voir et modifier les règles de routage d'équipe

### Ressources et permissions prises en charge {#supported-resources-and-permissions}

| Ressource On-Call | Visionneur | Remplaçant | Éditeur |
|------------------|--------|-----------|--------|
| **Plannings** | Peut voir les plannings | Peut voir les plannings et remplacer les quarts | Peut voir, modifier les plannings et remplacer les quarts |
| **Politiques d'escalade** | Peut voir les politiques d'escalade | - | Peut voir et modifier les politiques d'escalade |
| **Règles de routage d'équipe** | Peut voir les règles d'équipe | - | Peut voir et modifier les règles d'équipe |

### Restreindre l'accès aux ressources d'astreinte {#restrict-access-to-on-call-resources}

Pour restreindre l'accès à une ressource d'astreinte :

1. Naviguez vers la ressource d'astreinte spécifique (planning, politique d'escalade ou règles de routage d'équipe).
1. Cliquez sur **Gérer**.
1. Sélectionnez **Autorisations** dans le menu déroulant.
1. Cliquez sur **Restreindre l'accès**.
1. Sélectionnez un ou plusieurs rôles, équipes ou utilisateurs dans le menu déroulant.
1. Cliquez sur **Ajouter**.
1. Sélectionnez le niveau d'accès que vous souhaitez associer à chacun d'eux dans le menu déroulant à côté de leur nom :
   - **Visionneur** : Accès en lecture seule pour voir la ressource
   - **Overrider** (uniquement pour les plannings) : Peut consulter et créer des substitutions de planning
   - **Éditeur** : Accès complet pour voir et modifier la ressource
1. Cliquez sur **Enregistrer**.

**Remarque** : Pour maintenir votre accès d'édition à la ressource, Datadog exige que vous incluiez au moins un rôle dont vous êtes membre avant de sauvegarder.

## Commencez à utiliser Datadog On-Call {#start-using-datadog-on-call}

<div class="alert alert-danger">Pour préserver l'historique des incidents, Datadog On-Call ne prend pas en charge la suppression de ressources telles que les Pages, les politiques d'escalade ou les plannings. Pour tester On-Call sans affecter votre environnement de production, créez une organisation d'essai comme bac à sable.</div>

Pour commencer avec On-Call, [intégrez une équipe On-Call][1] et assurez-vous que tous les membres de l'équipe configurent leurs [paramètres de profil On-Call][2] pour recevoir des notifications.

{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>Intégrez une équipe On-Call</u> : Créez une nouvelle équipe On-Call, ajoutez une équipe Datadog existante à On-Call, ou importez une équipe depuis PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/pages">}}<u>Pages</u> : Déclencher des Pages à partir de moniteurs, d'incidents, de signaux de sécurité et d'autres sources. Accuser réception, réaffecter ou résoudre des Pages, ou les promouvoir en incidents.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>Politiques d'escalade</u> : Définir les étapes de l'envoi d'une Page à différents plannings. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>Plannings</u> : Définir des plannings pour les rotations d'astreinte des membres de l'équipe.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/profile_settings">}}<u>Paramètres de Profil</u> : Configurer vos méthodes de contact et vos préférences de notification pour vous assurer de recevoir des Pages de manière opportune et efficace.{{< /nextlink >}}
{{< /whatsnext >}}

## Facturation{#billing}

On-Call est un SKU basé sur des sièges. Pour en savoir plus sur la facturation d'On-Call et sur la gestion des sièges au sein de Datadog, visitez notre [page de tarification][5] et la [documentation de facturation des incidents][6].

## Lectures complémentaires{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/on-call/teams
[2]: /fr/incident_response/on-call/profile_settings
[3]: /fr/account_management/rbac/granular_access/
[4]: /fr/account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /fr/account_management/billing/incident_response/
[7]: /fr/incident_response/on-call/routing_rules#support-hours