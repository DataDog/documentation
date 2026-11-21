---
description: Diagnostiquez et résolvez le problème lorsqu'un destinataire ne reçoit
  pas un e-mail de Datadog.
further_reading:
- link: /help/
  tag: Documentation
  text: Contactez Datadog Support
- link: /account_management/email_delivery/how_email_delivery_works/#delivery-status
  tag: Documentation
  text: Définitions des statuts et des suppressions
- link: /account_management/email_delivery/setting_up_reliable_delivery/
  tag: Documentation
  text: Prévenez les échecs grâce aux expéditeurs approuvés et à l'authentification
- link: /account_management/audit_trail/guides/track_email_delivery/#check-whether-an-email-was-delivered
  tag: Guide
  text: Interrogez les événements de distribution et configurez des alertes
private: true
site_support_id: email_delivery
title: Dépannage de la distribution des e-mails
---
## Présentation {#overview}

Lorsqu'un utilisateur signale qu'il n'a pas reçu un e-mail Datadog, utilisez cette page pour diagnostiquer et résoudre le problème. Pour auditer les événements de distribution dans votre organisation ou configurer des alertes, consultez [Suivre la distribution des e-mails dans votre organisation][1].

## Étapes de dépannage {#troubleshooting-steps}

1. Vérifiez le résultat de la distribution dans [Email Delivery][2], en filtrant par l'adresse du destinataire :
   - **Delivered** : Demandez au destinataire de vérifier son dossier de courrier indésirable ou spam, ainsi que toute règle de boîte aux lettres ou liste de blocage filtrant les e-mails de Datadog.
   - **Bounced** : Le serveur de messagerie destinataire a refusé le message et a renvoyé un motif. Corrigez l'adresse ou la boîte aux lettres si elle est invalide ou pleine. Si le serveur filtre ou bloque les e-mails de Datadog, [ajoutez Datadog à vos expéditeurs approuvés][3] et communiquez le motif ainsi que l'horodatage de l'événement à votre administrateur de messagerie.
   - **Dropped** : L'adresse figure sur la liste de suppression. Consultez [Email suppressions][4] pour savoir comment retirer l'adresse de la liste de suppression.
2. Si l'e-mail n'est toujours pas arrivé, contactez [Datadog Support][5] pour faire examiner le problème.

## Enquêtez sur l'échec d'un e-mail {#investigate-a-failed-email}

Recherchez l'origine d'un échec depuis le dashboard Email Delivery jusqu'à l'événement d'audit sous-jacent :

1. Dans le tableau **Email Delivery Failures**, cliquez sur la ligne correspondant au destinataire ou au type d'e-mail concerné.
2. Sélectionnez **View audit events** pour ouvrir l'Audit Trail complet de cette tentative de distribution.
3. Cliquez sur un événement d'audit pour examiner les détails de la distribution, notamment le code SMTP, la réponse du serveur de messagerie et les informations sur le destinataire.

## Causes courantes d'échec de distribution des e-mails {#common-reasons-email-fails}

| Raison                                        | Signification                                                                                                                                                          | Que faire                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boîte aux lettres introuvable                             | L'adresse du destinataire n'existe pas.                                                                                                                                  | Vérifiez si l'adresse contient des fautes de frappe ou si la boîte aux lettres a été supprimée, puis corrigez l'adresse et renvoyez le message.                                                                                                                       |
| Boîte aux lettres pleine                                  | La boîte de réception du destinataire a dépassé son quota.                                                                                                                                     | Demandez au destinataire de libérer de l'espace dans sa boîte de réception, puis renvoyez.                                                                                                                                           |
| Expéditeur non authentifié ou bloqué par une politique | Le serveur de messagerie du destinataire ou une politique de groupe a rejeté l'expéditeur Datadog, souvent en raison d'un problème d'authentification (SPF, DKIM, DMARC) ou d'une règle exigeant des expéditeurs authentifiés.        | Demandez à l'administrateur de messagerie du destinataire d'[ajouter Datadog à ses expéditeurs approuvés][3]. Si la réponse mentionne un échec de l'[authentification de l'expéditeur][6] ou de DMARC, contactez [Datadog Support][5], car la résolution peut impliquer les deux parties. |
| En liste de suppression (abandonné)                          | Une règle de suppression, un paramètre de compte ou une protection système a bloqué le message, généralement après un rejet précédent.                                                        | Consultez [Suppressions d'e-mails][4].                                                                                                                                                                        |
| Signalé comme spam                               | Le serveur de messagerie du destinataire ou la passerelle de sécurité a classé le message comme spam en fonction de son contenu.                                                                     | Consultez [Passerelles de sécurité e-mail][7].                                                                                                                                                                   |

**Remarque** : Le serveur de messagerie du destinataire génère des réponses SMTP, qui ne sont pas toujours précises. Utilisez-les comme un signal fort, et non comme une garantie de la cause exacte.

## Suppressions d'e-mails {#email-suppressions}

Après le rejet d'un e-mail, Datadog ajoute l'adresse à une liste de suppression et cesse d'envoyer des messages à cette adresse jusqu'à ce que la suppression soit levée.

Contactez [Datadog Support][5] et fournissez ces éléments pour faire lever la suppression :

- L'adresse e-mail du destinataire bloqué
- Un lien vers l'événement de rejet dans le dashboard Email Delivery ou dans Audit Trail

**Remarque** : La levée d'une suppression ne corrige pas la cause sous-jacente. Si l'échec persiste après la levée de la suppression, communiquez l'horodatage de l'événement et la réponse SMTP à votre administrateur de messagerie ou à votre fournisseur de messagerie pour qu'il puisse approfondir l'enquête.

## Lorsqu'aucun événement de distribution n'apparaît {#when-no-delivery-event-appears}

Certains échecs ne produisent jamais d'événement de distribution, car Datadog ne tente pas l'envoi. Si vous ne trouvez aucun événement pour un destinataire, vérifiez si le compte est dans l'un de ces états :

- **Utilisateurs non vérifiés** : invités, mais n'ont pas encore accepté l'invitation.
- **Utilisateurs désactivés** : les utilisateurs désactivés ne reçoivent pas de notifications, y compris les [résumés par e-mail][8].

## Passerelles de sécurité e-mail {#email-security-gateways}

Si votre organisation achemine le courrier entrant via une passerelle de sécurité e-mail ou via la protection intégrée de votre plateforme de messagerie, ces dispositifs peuvent mettre en quarantaine ou bloquer les e-mails de Datadog, même lorsque vos entrées d'expéditeur approuvé et l'authentification de l'expéditeur sont correctement configurées. Les passerelles appliquent leur propre filtrage, de sorte qu'un message peut réussir les tests SPF, DKIM et DMARC et être tout de même retenu.

Si les e-mails de Datadog n'arrivent toujours pas, contactez votre fournisseur de passerelle de sécurité e-mail. Une passerelle est souvent en cause lorsque « Email Delivery » indique qu'un message a le statut « Delivered », mais que le destinataire ne peut pas le trouver, y compris dans son dossier de courrier indésirable ou spam, ou lorsque des messages destinés à des adresses valides sont bloqués. Partagez les horodatages de l'événement dans Email Delivery afin que le fournisseur puisse localiser les messages concernés et confirmer pourquoi ils ont été mis en quarantaine ou bloqués.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/audit_trail/guides/track_email_delivery/
[2]: https://app.datadoghq.com/dash/integration/email_delivery_tracking
[3]: /fr/account_management/email_delivery/setting_up_reliable_delivery/#add-datadog-to-your-trusted-senders
[4]: #email-suppressions
[5]: /fr/help/
[6]: /fr/account_management/email_delivery/setting_up_reliable_delivery/#check-your-sender-authentication
[7]: #email-security-gateways
[8]: /fr/account_management/#email-subscriptions