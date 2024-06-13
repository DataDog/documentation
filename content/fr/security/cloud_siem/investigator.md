---
aliases:
- /fr/security_platform/cloud_siem/cloud_security_investigator/
- /fr/security_platform/cloud_siem/cloud_siem_investigator/
further_reading:
- link: /cloud_siem/explorer/
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
title: Investigator
---

## Présentation

<div class="alert alert-warning">L'outil Investigator de Cloud SIEM prend uniquement en charge les logs AWS CloudTrail pour le moment.</div>

Lorsqu'un signal de sécurité détecte une activité suspecte liée à un utilisateur ou une ressource, l'enquête nécessite souvent de se poser les questions suivantes :

- L'utilisateur accède-t-il à d'autres comptes ?
- Quelles autres actions l'utilisateur a-t-il effectuées au cours de cet intervalle de temps spécifique ?
- Quel est l'ensemble des actions effectuées par l'utilisateur sur une ressource ?
- Quels utilisateurs ont interagi avec cette ressource ?

Par exemple, imaginez que vous recevez un signal de sécurité indiquant qu'une personne a modifié la configuration d'un compartiment AWS S3 afin de le rendre accessible à tous, mais que l'action a été réalisée par un rôle assumé. Pour enquêter, renseignez-vous sur la personne qui a réalisé l'action et sur ses autres activités récentes, car cela pourrait indiquer que ses identifiants ont été compromis.

L'outil Investigator de Cloud SIEM offre une interface graphique qui vous permet de basculer d'une entité affectée à une autre, de sorte que vous pouvez voir le comportement des utilisateurs et leur impact sur votre environnement.


## Visualiser et enquêter sur l'activité

1. Accédez à **Security** > **Cloud SIEM** et cliquez sur l'[onglet **Investigator**][1]. 

2. Sélectionnez un type d'entité dans le menu déroulant du champ **In**.

3. Sélectionnez une entité ou saisissez un nom d'entité spécifique dans le champ **Investigate** pour afficher un graphique des activités associées à l'entité. Pour l'entité **Assumed Role**, sélectionnez un `AccessKeyID` ou saisissez un `AccessKeyID` dans le champ **for**. 

4. Cliquez sur un nœud et sélectionnez **Show list of logs** ou **View in Log Explorer** pour afficher les logs associés. Si vous cliquez sur le nœud d'un service, cliquez sur **Investigate service** afin de basculer vers la vue Investigator de ce service. Utilisez le menu déroulant **and filter by** afin de filtrer en fonction des actions.

Vous pouvez également accéder à l'outil Investigator de Cloud SIEM directement depuis un signal de sécurité. Dans le volet du signal de sécurité, cliquez sur **Investigate user activity** (`user` correspond à l'identité de l'utilisateur en question) pour afficher la vue Investigator filtrée selon l'identité de l'utilisateur spécifique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/csi/aws