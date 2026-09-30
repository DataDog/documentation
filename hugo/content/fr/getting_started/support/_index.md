---
description: Découvrez les meilleures pratiques pour contacter le support Datadog
  par chat ou par ticket pour vos questions techniques et vos problèmes urgents.
further_reading:
- link: https://docs.datadoghq.com/agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
- link: /account_management/guide/manage-your-support-tickets
  tag: Documentation
  text: Gérez vos tickets de support
title: Premiers pas avec le support Datadog
---
## Présentation {#overview}

Datadog propose deux canaux principaux aux clients en quête d'assistance :
   - [Ouvrir un ticket de support][1].
   - Discuter en direct avec les ingénieurs du support technique de Datadog via un chat textuel.

Bien que les deux options visent à fournir des solutions rapides et efficaces, une plateforme peut être mieux adaptée selon le moment, la nature et l'urgence de la demande.

Ce guide fournit les meilleures pratiques pour contacter l'équipe de support, ainsi que des directives pour déterminer le canal de support qui vous convient.

## Prérequis {#prerequisites}

Pour une résolution la plus efficace possible d'un problème, soyez prêt à fournir toutes les informations et ressources pertinentes listées ci-dessous :

   - Nom de l'organisation (si vous avez accès à [plus d'une][2])
   - [Site Datadog][3]
   - Liens vers toute page illustrant le problème dans votre compte Datadog
   - Captures d'écran ou enregistrements vidéo du comportement en question
   - Étapes à suivre pour reproduire le problème
   - Si le problème est lié au fonctionnement de l'Agent Datadog, un [Agent flare][4]
   - Liens vers toute page de documentation utilisée

Pour nous aider à résoudre votre demande aussi rapidement que possible, veuillez limiter chaque ticket de support à un seul problème ou une seule question. Les ingénieurs du support traitent un ticket de support à la fois, et combiner plusieurs questions sans rapport dans un seul ticket peut ralentir la résolution. Si vous avez plusieurs problèmes, veuillez ouvrir un ticket de support distinct pour chacun d'eux.
Exemple : Si vous avez besoin d'aide pour résoudre une erreur d'intégration AWS et que vous souhaitez également comprendre comment configurer un seuil de surveillance, veuillez ouvrir deux tickets distincts.

## Chat ou ticket de support ? {#chat-or-support-ticket}

Utilisez le tableau ci-dessous pour déterminer s'il convient d'ouvrir un [ticket de support][1] ou de [contacter le chat](#reaching-out-on-chat).

| Ticket de support                  | Chat        |
| ------------------------------- | ----------- |
| Problèmes urgents                   | Support de configuration produit
| Demandes d'appel/partage d'écran       | Questions de configuration
| Incidents et pannes           | Clarification de la documentation
| Dépannage complexe nécessitant de nombreux fichiers de configuration, journaux ou requêtes | Problèmes mineurs impliquant un fichier de configuration, un journal ou une requête spécifique

<div class="alert alert-info">Vous pouvez également utiliser l'assistant IA pour trouver des réponses à vos questions. Pour accéder à l'assistant IA, cliquez sur le bouton {{< ui >}}Support{{< /ui >}} dans le coin inférieur gauche du menu de navigation.</div>

Si vous n'êtes pas sûr de l'option la plus adaptée, n'hésitez pas à utiliser l'un ou l'autre canal pour contacter le support Datadog. Un ticket de support est automatiquement créé chaque fois qu'un chat est fermé, afin que le problème puisse continuer à être étudié même s'il n'est pas résolu dans le chat.

## Contacter via le chat {#reaching-out-on-chat}

<div class="alert alert-danger">Le chat est disponible tous les jours ouvrables entre 10h00 et 19h00, heure de l'Est (ET). Le chat n'est pas disponible pour les comptes compatibles HIPAA.</a></div>

Pour commencer, cliquez sur {{< ui >}}Support{{< /ui >}} dans le coin inférieur gauche du menu de navigation.

{{< img src="getting_started/support/support_chat_nav.png" alt="Le bouton Support en bas du menu de navigation gauche de l'application" style="width:40%" >}}

L'assistant IA apparaît sur votre écran. Vous pouvez poser des questions à l'assistant IA ou sélectionner {{< ui >}}Live Chat With Support{{< /ui >}}.

Lorsqu'un nouveau chat est ouvert, il vous est demandé si vous avez une question **technique** ou **commerciale**.
   - Pour les questions techniques, vous êtes dirigé vers le premier ingénieur de support technique disponible. C'est idéal pour toutes les questions que vous pourriez avoir sur l'utilisation ou la configuration de Datadog.
   - Pour les questions commerciales, vous êtes dirigé vers le premier membre disponible de l'équipe commerciale de Datadog, qui peut répondre aux questions concernant la facturation et la gestion des comptes.

**Remarque** : Pour les problèmes urgents, il est préférable de nous contacter via un ticket de support et d'indiquer pourquoi votre demande est urgente. Cela permet de garantir que la direction du support puisse transmettre votre dossier à un expert approprié immédiatement.

### Bonnes pratiques pour les questions techniques {#best-practices-for-technical-questions}

Assurez-vous de disposer d'autant de [prérequis](#prerequisites) pertinents que possible. Le membre de l'équipe Datadog avec lequel vous communiquez par chat fait de son mieux pour recueillir des informations sur le problème et le résoudre. Tous les problèmes ne peuvent pas être résolus lors d'une session de chat. Si une enquête plus détaillée est requise, le support Datadog se concentre sur la collecte des informations nécessaires pour mener l'enquête une fois le chat terminé.

### Suivi {#following-up}

Lorsque le chat se termine, un ticket de support est automatiquement créé. Si le problème a été résolu par chat, le ticket peut être fermé.

Si une enquête plus approfondie est nécessaire, le ticket est transmis aux experts des domaines appropriés, avec un transfert complet des détails et du contexte fournis pendant le chat. Utilisez le ticket pour toute communication ultérieure avec l'équipe de support Datadog.

## Support linguistique {#language-support}

Le support en japonais est disponible du lundi au vendredi de 09h00 à 17h00 heure normale du Japon (JST), à l'exclusion des jours fériés locaux et du 29 décembre au 3 janvier. Le support par chat en japonais est disponible de 10h00 à 16h00 JST les jours ouvrables.

Le support en coréen est disponible du lundi au vendredi de 09h00 à 17h00 Korea Standard Time (KST), à l'exclusion des jours fériés locaux. Le support par chat en coréen est disponible de 10h00 à 11h30 et de 13h00 à 16h00 Korea Standard Time (KST), les jours ouvrés.

Lorsque le support dans votre langue préférée n'est pas disponible, vous pouvez continuer à bénéficier du support Datadog en anglais.

## Politique de conservation des tickets {#ticket-retention-policy}

Notre politique de conservation a changé le 12 juin 2026 : les tickets fermés, y compris leurs pièces jointes, sont désormais supprimés 15 mois après leur dernière mise à jour. Contactez-nous pour toute question.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/hc/
[2]: /fr/account_management/org_switching/
[3]: /fr/getting_started/site/
[4]: /fr/agent/troubleshooting/send_a_flare/