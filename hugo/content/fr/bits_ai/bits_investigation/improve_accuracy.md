---
description: Apprenez les meilleures pratiques pour configurer Bits Investigation
  afin d'obtenir des enquêtes plus précises.
further_reading:
- link: /bits_ai/bits_investigation/knowledge_sources/
  tag: Documentation
  text: Sources de connaissances
- link: /bits_ai/bits_investigation/configure/
  tag: Documentation
  text: Intégrations et paramètres
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: Documentation
  text: Discussion avec Bits Investigation
title: Améliorez la précision de Bits Investigation
---
## Présentation {#overview}

Bits Investigation raisonne à travers votre télémétrie, vos intégrations, votre code source et vos mémoires, en enquêtant sur toutes les informations disponibles à ce moment-là.

Cependant, aucune organisation ne partage la même architecture technique, le même étiquetage, les mêmes chemins d'escalade ou le même savoir tacite ; obtenir les meilleurs résultats signifie donc adapter Bits Investigation à votre organisation.

Ce guide couvre les pratiques ayant le plus grand impact sur la précision :
- [Renforcez vos sources de connaissances](#strengthen-your-knowledge-sources)
- [Activez l'enquête automatique sur vos monitors critiques](#enable-auto-investigate-on-your-critical-monitors)
- [Connectez des outils et une documentation externes](#connect-external-tools-and-documentation)
- [Testez vos modifications avec Bits Chat](#test-your-changes-with-bits-chat)

## Renforcez vos sources de connaissances {#strengthen-your-knowledge-sources}

Bits Investigation lit à partir de quatre sources lors d'une enquête : `bits.md`, les messages du monitor et les runbooks, ainsi que les retours d'expérience passés. Plus chacune d'entre elles est précise, plus les futures enquêtes seront exactes. Commencez par utiliser Bits Investigation et observez ses résultats. Cela vous donne une orientation sur les points à optimiser.

### Rédigez des règles spécifiques {#write-specific-rules}

Bits Investigation lit [`bits.md`][1] lors de chaque enquête. Rédigez des règles spécifiques, pas des descriptions générales — une description répète ce que Bits peut déjà déduire de la télémétrie, tandis qu'une règle résout ce qu'il ne peut pas déduire seul, comme une incohérence de nommage entre les outils.

| Bon | À améliorer |
|------|--------------------|
| « Les alertes de l'équipe de facturation taguent le service comme `billing-svc`, mais APM et les logs utilisent `billing_service`. » « Traitez-les comme le même service. » | « Checkout est notre service de paiement. » |

Donnez la priorité à ces entrées :
- **Mappage de noms inter-systèmes** : Le même service, environnement ou équipe a souvent des noms différents dans les monitors, APM, les logs et tout système de billetterie connecté. Notez le mappage une fois.
- **Bruit connu** : Modèles qui ressemblent à des incidents mais qui sont routiniers, comme un job de réindexation hebdomadaire ou un test de charge. Documentez-les, en précisant dans quels cas ils constitueraient véritablement un problème.
- **Règles de périmètre permanentes** : Les alertes qui ne spécifient pas d'environnement ou de région sont ambiguës. Définissez la valeur par défaut que Bits doit supposer.

Pour un exemple de fichier complet, consultez [Sources de connaissances][1].

### Rendez vos monitors autonomes {#make-your-monitors-self-sufficient}

Bits lit le message du monitor au moment de l'investigation. Configurez les monitors afin que Bits puisse les investiguer à partir du message seul, sans que vous ayez à ajouter du contexte manuellement par la suite.

Ajoutez au message du monitor :
- Le dashboard, la requête de logs ou le notebook que vous vérifieriez en premier (les URL simples fonctionnent, aucun formatage n'est nécessaire).
- Un notebook plutôt qu'un simple lien si vous avez besoin de plus d'un ou deux liens — les notebooks prennent en charge le markdown ainsi que les requêtes Datadog en direct.
- Les services en aval ou les dépendances généralement affectés.

Délimitez ou regroupez également la requête du monitor par `service`. C'est ce qui permet à Bits de basculer vers APM, les logs, RUM et le [Catalog][2] pour le service approprié. Sans le tag `service`, Bits se rabat sur des signaux plus faibles comme le nom du monitor.

Examinez périodiquement les messages des monitors. Un lien de runbook obsolète est pire qu'aucun lien, car il dirige Bits vers le mauvais dashboard ou un service mis hors service.

### Donnez votre avis sur les enquêtes {#give-feedback-on-investigations}

À la fin d'une enquête, indiquez à Bits si la conclusion était correcte. Confirmez ce qui est correct, pas seulement ce qui est faux ; les retours positifs deviennent tout de même des souvenirs que Bits réutilise. Lorsque Bits se trompe, nommez la cause première réelle, les services ou les métriques impliqués, et liez la télémétrie qui le prouve. « C'est faux » ne donne rien à changer à Bits.

Les retours positifs comme les corrections deviennent des **souvenirs**, que Bits réutilise sélectivement lors d'enquêtes futures similaires. Examinez-les ou supprimez-les depuis la colonne {{< ui >}}Memories{{< /ui >}} sur la page [Gestion des monitors][8], et vérifiez périodiquement que les anciennes corrections sont toujours valides (les services sont renommés, les causes sont corrigées).

## Activez l'enquête automatique sur vos monitors critiques {#enable-auto-investigate-on-your-critical-monitors}

Sur la page [Monitors pris en charge][8], limitez {{< ui >}}Auto-Investigate{{< /ui >}} aux monitors pour lesquels une enquête vaut la peine d'être menée, et pour lesquels vous avez la capacité de maintenir leur contexte à jour :

- Filtrez par [`priority:p1`][9] (ou `p2`) pour les monitors les plus susceptibles de représenter un incident réel.
- Filtrez par [`notification:*`][10] pour les monitors qui envoient déjà une notification à une personne ou à un canal.

[Activez {{< ui >}}Auto-Investigate{{< /ui >}}][13] sur cette liste filtrée. L'activer pour chaque monitor répartit les enquêtes sur des alertes bruyantes et de faible priorité, et dilue le signal qui vous intéresse réellement. Cela signifie également que vous ne pouvez pas gérer de manière réaliste les règles `bits.md`, les procédures opérationnelles et les retours pour l'ensemble d'entre eux.

## Connectez des outils et une documentation externes {#connect-external-tools-and-documentation}

Bits Investigation ne peut raisonner qu'à partir de la télémétrie et de la documentation auxquelles elle a accès. La connexion de ces sources lui donne plus d'éléments avec lesquels travailler :

- **Confluence** : [Connectez votre compte Confluence][3] et liez les pages pertinentes dans les messages du monitor. Bits extrait les liens de télémétrie et les étapes de dépannage de la page. Activez l'exploration de compte pour permettre à [Bits Chat][4] de rechercher directement dans votre espace Confluence, et pas seulement dans les pages liées.
- **Code source** : Connectez [GitHub][5] et [taguez votre télémétrie APM avec des informations Git][6] afin que Bits puisse lier une régression au commit ou au déploiement qui l'a provoquée. Cela permet également à Bits Code de reprendre l'investigation et de proposer une correction.
- **Autres outils d'observabilité** : Connectez Grafana, Dynatrace, Splunk, Sentry ou ServiceNow si la télémétrie y réside. Consultez [Intégration aux plateformes d'observabilité tierces et de SCM][7].

Pour configurer Slack, Microsoft Teams ou d'autres destinations pour les résultats d'investigation, consultez [Envoyer les résultats d'investigation vers des plateformes ITSM et de collaboration][12].

## Testez vos changements avec Bits Chat {#test-your-changes-with-bits-chat}

Après avoir effectué un changement sur `bits.md`, un message de monitor ou une compétence, utilisez [Bits Chat][4] pour confirmer qu'il est pris en compte avant de le découvrir lors d'une véritable investigation. Le Chat s'appuie sur les mêmes sources de connaissances. Vous pouvez donc vérifier votre changement sans attendre qu'une investigation complète soit exécutée. Vous pouvez également demander directement à Bits Chat des suggestions sur la façon d'améliorer `bits.md`, un runbook ou une compétence.

| Objectif | Exemple de prompt |
|------|-----------------|
| Vérifiez une `bits.md` règle de nommage | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| Vérifiez un modèle de bruit | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| Vérifiez un runbook ou une page Confluence | `What does our documentation say about diagnosing <service> issues?` |
| Vérifiez une compétence | Posez une question qui devrait la déclencher et voyez si la réponse suit la procédure |
| Vérifiez une correction passée | Posez une question connexe (par ex. `What's your read on memory pressure on <service>?`) et voyez si elle fait référence à votre correction |

Si la réponse ne reflète pas ce que vous avez écrit, vérifiez si l'entrée `bits.md` est une règle ou simplement une description, si l'intégration est connectée avec les bonnes autorisations, ou si un lien est obsolète. Corrigez l'écart spécifique et testez à nouveau avec le même prompt.

Pour faire apparaître des lacunes auxquelles vous n'avez pas encore pensé, posez la question après une enquête réelle : `What information would have made this investigation faster or more accurate?`

Une fois que le chat reflète le changement, relancez une enquête connue pour confirmer que la conclusion elle-même s'améliore. Le chat et les enquêtes ne font pas toujours appel aux connaissances de la même manière.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_investigation/knowledge_sources/
[2]: /fr/internal_developer_portal/catalog/
[3]: https://app.datadoghq.com/integrations/confluence
[4]: /fr/bits_ai/bits_investigation/chat_bits_investigation/
[5]: /fr/integrations/github/
[6]: /fr/source_code/service-mapping
[7]: /fr/bits_ai/bits_investigation/configure/#integrate-with-third-party-observability-and-scm-platforms
[8]: https://app.datadoghq.com/bits-ai/monitors/supported
[9]: https://app.datadoghq.com/bits-ai/monitors/supported?q=priority%3Ap1&auto_only=false
[10]: https://app.datadoghq.com/bits-ai/monitors/supported?q=notification%3A%2A&auto_only=false
[12]: /fr/bits_ai/bits_investigation/configure/#send-investigation-findings-to-itsm-and-collaboration-platforms
[13]: /fr/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations