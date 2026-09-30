---
aliases:
- /fr/service_management/on-call/triggering_pages/live_call_routing/
- /fr/incident_response/on-call/triggering_pages/live_call_routing/
further_reading:
- link: /incident_response/on-call/
  tag: Documentation
  text: Datadog On-Call
title: Routage d'appel en direct
---
<div class="alert alert-info">
Le routage d'appel en direct est provisionné par Datadog. Pour l'activer pour votre organisation, contactez <a href="mailto:support@datadoghq.com">Datadog Support</a>. Incluez votre cas d'utilisation et le code pays souhaité (par exemple, <code>+33</code> pour la France).
</div>


## Présentation {#overview}

Le routage d'appel en direct connecte les appels téléphoniques à votre équipe On-Call. Lorsqu'une personne appelle votre numéro dédié, le système traite l'appel selon votre configuration.

Datadog On-Call prend en charge deux types de routage :

- **Routage d'appel direct** : connecte l'appelant à un intervenant actif, en suivant la politique d'escalade de l'équipe On-Call. Permet une coordination en temps réel lors d'incidents critiques.
- **Routage de messagerie vocale** : invite l'appelant à laisser un message vocal, puis convertit le message vocal en une Page pour l'équipe On-Call. Utile pour les appelants non techniques ou les fournisseurs tiers qui doivent signaler des problèmes sans conversation en direct.

## Configuration {#configuration}

### Paramètres de routage de base {#basic-route-settings}

Chaque itinéraire d'appel en direct comprend :

- **Nom** : une étiquette descriptive, telle que “Production Incidents” ou “Security Escalations”.
- **Numéro de téléphone** : le numéro dédié provisionné par Datadog pour cet itinéraire.
- **Code de région** : la région géographique du numéro de téléphone (par exemple, `US` pour les États-Unis).
- **Statut actif** : indique si l'itinéraire accepte les appels.
- **Type de routage** : comment les appels sont traités (voir [Types de routage](#routing-types)).

### Options du clavier {#keypad-options}

Les options du clavier proposent aux appelants un menu lorsqu'ils composent votre numéro de routage.

Vous pouvez configurer jusqu'à neuf options par itinéraire. Chaque option associe une touche (1-9) à une équipe On-Call et déclenche le processus de paging de cette équipe. Pour améliorer l'ergonomie :
- Utilisez l'option 1 pour l'équipe d'astreinte ou le chemin d'escalade le plus critique.
- Regroupez les équipes associées sous des touches adjacentes.
- Soyez concis et clair dans les invites du menu.

## Types de routage {#routing-types}

Datadog On-Call prend en charge deux types de routage : le routage d'appel direct et le routage de messagerie vocale.

### Routage d'appel direct {#direct-call-routing}

Dans le routage d'appel direct, le système suit la politique d'escalade de l'équipe On-Call pour connecter l'appelant au premier intervenant disponible.

Les intervenants doivent avoir des numéros de téléphone valides prenant en charge les notifications vocales dans leur profil ; On-Call ignore les intervenants qui n'en ont pas.

Les intervenants disposent alors des options suivantes :
- Appuyez sur `1` pour accuser réception de l'appel.
- Appuyez sur `2` pour l'escalader.
- Appuyez sur `3` pour le résoudre.

#### Logique d'escalade {#escalation-logic}

Pour le routage direct des appels, l'escalade se déroule comme suit :

- **Plusieurs intervenants au même niveau** : Tous les intervenants sont appelés simultanément. Le premier à répondre est mis en relation.
- **L'intervenant rejette un appel** : Le système escalade immédiatement vers l'intervenant suivant.
- **L'intervenant n'a pas de numéro de téléphone** : Le système ignore cet intervenant.
- **Un seul niveau d'escalade est défini** : Si l'intervenant est injoignable, l'appelant est informé que personne n'est disponible et l'appel se termine.
- **Aucun intervenant n'a de numéro de téléphone valide** : L'appelant est informé que personne n'est disponible et l'appel se termine.

#### Bonnes pratiques {#best-practices}

- Utilisez des politiques d'escalade à plusieurs niveaux pour éviter les appels perdus.
- Ajoutez plusieurs intervenants aux niveaux critiques pour assurer la redondance.
- Testez régulièrement votre configuration de routage :
  - Testez chaque option du clavier pour vérifier qu'elle dirige vers la bonne équipe d'astreinte.
  - Simulez le comportement d'escalade en rejetant ou en ne répondant pas à un appel.
  - Vérifiez que les numéros de téléphone des intervenants sont valides, joignables et configurés avec les paramètres de messagerie vocale appropriés.
  - Vérifiez que les appels sont correctement connectés aux intervenants disponibles.

### Routage de messagerie vocale {#voicemail-routing}

Dans le routage de messagerie vocale, les appelants sont invités à laisser un message vocal.

#### Bonnes pratiques {#best-practices-1}

- Confirmez que les membres de l'équipe ont configuré leurs préférences de notification pour recevoir des Pages.
- Testez régulièrement votre configuration de routage :
  - Testez chaque option du clavier pour vérifier qu'elle dirige vers la bonne équipe d'astreinte.
  - Confirmez que les enregistrements de la messagerie vocale sont correctement capturés.
  - Vérifiez que les Pages sont créées et envoyées aux bons membres de l'équipe.

## Dépannage {#troubleshooting}

### Problèmes d'itinéraire {#route-issues}

Si votre itinéraire n'accepte pas les appels :
- Confirmez que l'itinéraire est défini sur actif.
- Confirmez que le provisionnement est terminé. Si le provisionnement est toujours en cours, contactez [Datadog Support][1].
- Vérifiez que le numéro de téléphone est correctement configuré pour cet itinéraire.

### Problèmes de clavier {#keypad-problems}

Si une option du clavier ne dirige pas correctement les appels :
- Confirmez que chaque option du clavier est liée à une équipe On-Call valide.
- Testez chaque option individuellement en composant l'itinéraire et en appuyant sur la touche correspondante.
- Vérifiez que votre système téléphonique prend en charge la saisie DTMF (tonalité), car certains systèmes VoIP la désactivent par défaut.

### Routage direct des appels : les appels ne se connectent pas ou aucune Page n'est créée {#direct-call-routing-calls-not-connecting-or-no-page-created}

Si les appels n'atteignent pas un intervenant ou si aucune Page n'est créée :
- Confirmez que l'équipe On-Call dispose d'une politique d'escalade active avec au moins un niveau d'escalade défini.
- Vérifiez que tous les intervenants de la politique d'escalade ont un numéro de téléphone valide dans leur profil. On-Call ignore les intervenants sans numéro de téléphone.
- Vérifiez que le numéro de téléphone de chaque intervenant prend en charge les notifications vocales, qu'il est joignable et qu'il n'est ni bloqué ni transféré vers une destination indisponible.

### Routage de messagerie vocale : la messagerie vocale ne se convertit pas en Page {#voicemail-routing-voicemail-not-converting-to-a-page}

Si un message vocal est laissé mais qu'aucune Page n'est créée :
- Confirmez que le type de routage de l'itinéraire est défini sur **Routage de messagerie vocale**, et non sur **Routage d'appel direct**.
- Vérifiez que l'équipe On-Call affectée à l'itinéraire dispose d'une politique d'escalade active.
- Confirmez que les membres de l'équipe ont configuré leurs préférences de notification pour recevoir des Pages.
- Vérifiez que l'enregistrement du message vocal s'est terminé avec succès. Les appelants qui raccrochent avant le bip peuvent ne pas laisser d'enregistrement que le système est en mesure de traiter.

[1]: /fr/help/