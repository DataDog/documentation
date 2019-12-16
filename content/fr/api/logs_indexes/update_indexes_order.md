---
title: Mettre à jour la séquence des index
type: apicontent
order: 23.5
external_redirect: "/api/#mettre-ajour-la-sequence-des-index"
---

## Mettre à jour la séquence des index

<div class="alert alert-warning">
Cet endpoint est en bêta public. Si vous souhaitez nous faire part de vos remarques, <a href="/help">contactez l'assistance Datadog</a>.
</div>

Ce endpoint met à jour le `IndexOrder` de votre organisation. Il renvoie l'objet `IndexOrder` passé dans le corps de la requête lorsque celle-ci est réussie.

**ARGUMENTS**:

* **`index_names`**  [*required*] : Tableau de `Strings` identifiant par leur nom les index de votre organisation. Les logs sont testés un par un par rapport au filtre de requête de chaque index, en suivant l'ordre du tableau. Les logs sont finalement stockés dans le premier index correspondant.
