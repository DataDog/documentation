---
aliases:
- /fr/bits_ai/bits_ai_sre/help_bits_learn/
- /fr/bits_ai/bits_investigation/help_bits_learn/
- /fr/bits_ai/bits_ai_sre/knowledge_sources/
title: Sources de connaissances
---
Bits Investigation s'améliore avec le temps en combinant trois sources de connaissances distinctes :
- [**Runbooks :**](#runbooks) Conseils de dépannage étape par étape
- [**bits.md :**](#bitsmd) Contexte sur votre environnement
- [**Retours et souvenirs :**](#feedback-and-memories) Apprentissages issus des investigations

## Runbooks {#runbooks}
Considérez l'intégration de Bits comme vous le feriez pour un nouveau coéquipier : plus vous fournissez de contexte, mieux il peut enquêter.

Vous pouvez soit ajouter des instructions de dépannage étape par étape directement dans le message du monitor, soit créer un lien vers une page Confluence qui contient ces instructions.

- **Inclure des liens de télémétrie Datadog** : Lors de l'ajout d'instructions dans le message du monitor, incluez des liens vers la télémétrie la plus pertinente. Commencez par le premier endroit où vous regarderiez normalement dans Datadog lorsque le monitor se déclenche, comme un dashboard, des logs, des traces ou un notebook avec des widgets clés. Les liens n'ont pas besoin d'un formatage spécial ; les URL simples fonctionnent.

Comme ces liens sont définis par l'utilisateur, vous avez le contrôle sur ce que Bits examine, ce qui garantit qu'il se concentre sur les mêmes données que vous, et vous donne la flexibilité d'adapter les investigations aux workflows de votre équipe.

- **Notebooks** : Les monitors peuvent renvoyer vers des notebooks contenant des instructions sur la façon de dépanner le monitor ou le service associé. Les notebooks prennent en charge le markdown ainsi que les requêtes Datadog, donnant à l'agent des instructions sur la meilleure façon d'effectuer une analyse des causes profondes.

- **Confluence integration** : Si vos runbooks se trouvent dans Confluence, liez les pages pertinentes dans le message du monitor. Lors d'une investigation, Bits lit la page, extrait les liens de télémétrie, suit les étapes de dépannage documentées lorsque cela est possible et intègre les conseils de remédiation dans ses recommandations.

Pour maximiser la valeur de cette intégration, documentez en détail les services, les dépendances et les systèmes impliqués, et fournissez des instructions claires et étape par étape pour résoudre le problème. Des runbooks bien structurés et spécifiques permettent à Bits de mener des investigations plus précises et efficaces.

{{< img src="bits_ai/optimization_example.png" alt="Exemple de monitor avec des étapes d'optimisation appliquées" style="width:100%;" >}}

## Bits.md {#bitsmd}

Vous pouvez guider de manière proactive la façon dont Bits examine votre environnement en créant un fichier `bits.md` dans [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits.md{{< /ui >}}][2].

`bits.md` est un fichier Markdown qui fournit un contexte structuré sur votre environnement à Bits. Il sert de guide léger pour améliorer la précision de l'investigation, la construction des requêtes et l'alignement de la terminologie. Ajoutez des connaissances spécifiques à l'équipe telles que les conventions de marquage, les modèles architecturaux, les termes du glossaire et les meilleures pratiques d'investigation.

### Exemple bits.md {#sample-bitsmd}

{{< code-block lang="markdown" filename="bits.md" collapsible="true" >}}

## Scope rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---

## Tag and naming conventions

### Environment normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

### Service name normalization
Service/application names may appear in different formats across systems (alerts, logs, tickets, asset systems).

Example:
- Alert tag: `checkout_prd`
- Ticketing system: `CHECKOUT`
- Logs: `checkout-service`

Rule:
- Derive a canonical service name.
- Use case-insensitive or wildcard matching when correlating across systems.
- Do not assume naming is identical across tools.

---

## Kubernetes quick checks
For pod issues, check Kubernetes events first:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Common causes:
- `FailedMount` → missing Secret/ConfigMap
- `ImagePullBackOff` → image/registry issue
- `OOMKilled` → memory pressure

---

## Known noise and false positives
Document recurring patterns that look like incidents but are expected behavior.

Examples:
- Nightly batch jobs trigger CPU spikes between 02:00–02:30 UTC.
- Synthetic monitoring tests intentionally generate short-lived 5xx errors.
- Canary deployments temporarily increase error rates during rollout.
- Autoscaling events may cause brief latency spikes.

Rule:
- Check whether the signal matches a documented noise pattern.
- If behavior matches a known pattern, classify as expected unless additional impact is observed.

{{< /code-block >}}

## Retours et souvenirs {#feedback-and-memories}

À la fin d'une investigation, indiquez à Bits si la conclusion qu'il a tirée était correcte.

{{< img src="bits_ai/help_bits_ai_learn_2.png" alt="Flux de retours sur la cause profonde après investigation" style="width:100%;" >}}

Si la conclusion était inexacte, fournissez à Bits la cause profonde correcte, en soulignant ce qu'il a manqué et en expliquant ce qu'il devrait faire différemment la prochaine fois. Vos retours doivent :
- Identifier la cause profonde réelle (pas seulement les effets ou symptômes observés)
- Spécifier les services, composants ou métriques pertinents
- Inclure des liens de télémétrie pointant vers la cause profonde

**Exemple de commentaire de cause profonde de haute qualité** : « Utilisation élevée de la mémoire dans le pod auth-service due à une fuite de mémoire dans le cache de session, provoquant des arrêts OOM toutes les 2 heures à partir du 2025-11-15 14:30 UTC. » Cela est démontré par `https://app.datadoghq.com/logs?<rest_of_link>`.

Tous les retours positifs, ainsi que tout retour négatif incluant des détails fournis dans le chat de Bits, créent une **mémoire**. Bits sélectionne dynamiquement les mémoires à utiliser lors des futures investigations pour améliorer ses performances. Il applique les corrections passées dans des contextes similaires, réutilise les requêtes efficaces et affine la façon dont il hiérarchise les étapes d'investigation. Au fil du temps, cela permet à Bits de s'adapter à votre environnement, devenant plus précis et efficace à chaque investigation.

Pour gérer les mémoires, notamment pour les consulter et les supprimer, accédez à la colonne {{< ui >}}Memories{{< /ui >}} de la page [Monitor Management][1].

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md