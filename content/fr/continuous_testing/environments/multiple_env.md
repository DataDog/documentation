---
description: Découvrez comment utiliser Continuous Testing pour réutiliser les mêmes
  scénarios de test Synthetic dans plusieurs environnements.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Intégrer vos tests continus Datadog dans votre pipeline de CI/CD
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: Blog
  text: Tester des applications internes avec le tunnel de test et les emplacements
    privés de Datadog
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: Documentation
  text: Découvrir les tests lors de l'utilisation de proxies, de pare-feu ou de VPN
title: Tester plusieurs environnements
---

## Présentation

Continuous Testing vous permet d'appliquer le même scénario des tests programmés contre l'environnement de production aux environnements de développement et de staging. Continuous Testing utilise des tests Synthetic tout au long du cycle de développement pour garantir que les régressions sont détectées dès que possible.

Lors du déclenchement d'un test CI, vous pouvez remplacer l'URL de départ d'un [test Browser][1] ou d'un [test API][2] pour réacheminer le Worker Synthetic vers l'environnement approprié. Cela vous permet d'utiliser le même test sur vos environnements de production et de staging.

Pour les [tests Browser][1], vous pouvez également rediriger un sous-ensemble des URL de ressources pendant l'exécution du test avec `resourceUrlSubstitutionRegexes`. Cela vous permet de tester les ressources frontend de votre branche actuelle contre le backend de production. Cela vous permet également de réacheminer un sous-ensemble d'appels d'API (correspondant à un domaine ou un chemin) vers un environnement de staging contenant les modifications à tester, tandis que le reste des requêtes est servi par l'environnement de production.

## Utiliser un test de production sur un environnement de staging

### Remplacer l'URL de départ

Un test Browser Synthetic commence le scénario de test en accédant à une URL de départ. De même, un test API HTTP envoie une requête à une URL spécifique. Lors du déclenchement d'un test CI, vous pouvez remplacer cette URL de départ pour pointer vers un autre environnement où votre application est déployée.

{{< img src="continuous_testing/starting_url_substitution.png" alt="Le tunnel Continuous Testing permet au Worker Synthetics d'atteindre vos applications privées" width="100%" >}}

Lors du déclenchement d'un test CI, le champ `startUrl` vous permet de remplacer la première URL vers laquelle un test Browser navigue ou l'URL utilisée par une requête de test HTTP. Vous pouvez spécifier cette option via le fichier de configuration globale, les fichiers de configuration Synthetic Monitoring (`*.synthetics.json`) ou le flag de ligne de commande `--override startUrl=<STARTURL>`.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrl="https://staging.my-app.com"
```

Cette option vous permet de réutiliser le même scénario de test sur l'environnement de production et d'autres environnements de développement (tels que le staging) tant qu'ils sont accessibles publiquement. Pour découvrir comment tester contre des [environnements privés][4], consultez la section [Tester lors de l'utilisation de proxies, de pare-feu ou de VPN][3].

### Modifier partiellement l'URL de départ

Si certains de vos tests commencent sur la page d'accueil ou une URL similaire simple, la solution précédente fonctionne bien, mais elle ne couvre pas tous les cas d'utilisation. Remplacer aveuglément l'URL de départ peut involontairement supprimer le chemin ou certains paramètres de requête de recherche de l'URL que le scénario est censé tester.

Le champ `startUrlSubstitutionRegex` vous permet de modifier l'URL de départ sans la remplacer entièrement. Cette option vous permet de substituer des parties de l'URL de départ par défaut en fonction de l'expression régulière fournie.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrlSubstitutionRegex="<regex>|<rewriting-rule>"
```

Ce champ attend une chaîne contenant deux parties, séparées par un caractère pipe `|` :

`<regex>|<rewriting-rule>`
- `<regex>` : expression régulière (regex) à appliquer à l'URL de départ par défaut
- `<rewriting-rule>` : expression pour réécrire l'URL

#### Exemple 1

Considérez la chaîne `<regex>|<rewriting-rule>` suivante :

```shell
https://prod.my-app.com/(.*)|https://staging.my-app.com/$1
```

L'expression régulière utilise un groupe de capture pour capturer le chemin de l'URL. La règle de réécriture produit une URL d'aspect similaire pointant vers `staging.my-app.com`, et ajoute le groupe capturé en utilisant `$1`. Étant donné l'URL `https://prod.my-app.com/product-page?productId=id`, elle serait réécrite en `https://staging.my-app.com/product-page?productId=id`.

#### Exemple 2

Considérez la chaîne `<regex>|<rewriting-rule>` suivante :

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

Avec ce remplacement, l'URL `https://my-app.com/some/path` est réécrite en `https://<deployment-prefix>.my-app.com/some/path`.
Notez que le chemin de l'URL n'est pas affecté par la réécriture car il ne fait pas partie du regex de substitution.

<div class="alert alert-info">
En plus de la syntaxe pipe <code>|</code> présentée ci-dessus, <code>startUrlSubstitutionRegex</code> prend également en charge la syntaxe sed : <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifiers&gt;</code>.</br></br>
Étant donné que la syntaxe sed utilise un séparateur slash <code>/</code>, elle peut nécessiter d'échapper les slashes de l'URL, ce qui est sujet aux erreurs. Sauf si vous avez besoin de modificateurs regex, Datadog recommande d'utiliser la syntaxe pipe <code>|</code> pour une meilleure lisibilité.
</div>

Avec cet outil, tout test programmé utilisé sur votre environnement de production peut être réutilisé pour pointer vers un environnement de développement.

## Introduire un changement dans un environnement existant

### Modifier les URL de ressources

En plus de modifier l'URL de départ, vous pouvez également modifier les URL de toutes les requêtes de ressources suivantes à l'aide du remplacement `resourceUrlSubstitutionRegexes`. Cette option substitue des parties des URL de ressources en fonction des expressions régulières fournies.

Cela vous permet de tester certaines parties de votre application indépendamment de l'environnement principal. La page principale est toujours servie par l'environnement de `startUrl`, mais chaque requête correspondant au premier regex de `resourceUrlSubstitutionRegexes` peut être redirigée vers un autre environnement hébergeant uniquement les modifications de la branche déclenchant le pipeline CI.

Par exemple : si les actifs JavaScript de votre frontend sont situés sous le chemin `https://prod.my-app.com/resources/chunks/*`, vous pouvez utiliser `resourceUrlSubstitutionRegexes` pour rediriger toutes les demandes d'actifs JavaScript vers `https://staging.my-app.com/resources/chunks`- tandis que Page (page) et tous les appels API continuent d'être servis par `prod.my-app.com`. De même, si vous souhaitez test le service derrière les points d'extrémité `https://prod.my-app.com/api/my-service`, vous pouvez rediriger ces appels API vers `https://staging.my-app.com/api/my-service` pour test ce service en isolation avec le frontend de production.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override resourceUrlSubstitutionRegexes="<regex1>|<rewriting-rule1>" \
  --override resourceUrlSubstitutionRegexes="<regex2>|<rewriting-rule2>"
```

Le champ `resourceUrlSubstitutionRegexes` attend des chaînes, chacune contenant deux parties, séparées par un caractère pipe `|` :

`<regex>|<rewriting-rule>`
- `<regex>` : expression régulière (regex) à appliquer à l'URL de ressource
- `<rewriting-rule>` : expression pour réécrire l'URL

#### Exemple 1

Considérez la chaîne `<regex>|<rewriting-rule>` suivante :

```
https://prod.my-app.com/assets/(.*)|https://staging.my-app.com/assets/$1
```

Le regex, `https://prod.my-app.com/assets/(.*)`, utilise un groupe de capture pour capturer le chemin de l'URL de ressource.

La règle de réécriture, `https://staging.my-app.com/assets/$1`, produit une URL d'aspect similaire qui pointe vers `staging.my-app.com` et ajoute le groupe capturé en utilisant `$1`.

Par conséquent, l'URL `https://prod.my-app.com/assets/js/chunk-123.js` est réécrite en `https://staging.my-app.com/assets/js/chunk-123.js`.

#### Exemple 2

Considérez la chaîne `<regex>|<rewriting-rule>` suivante :

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

Avec ce remplacement, l'URL `https://my-app.com/some/path` est réécrite en `https://<deployment-prefix>.my-app.com/some/path`. Notez que le chemin de l'URL n'est pas affecté par la réécriture car il ne fait pas partie du regex de substitution.

<div class="alert alert-info">
Le <code>resourceUrlSubstitutionRegexes</code> est également appliqué à la première requête, de manière similaire à <code>startUrl</code> et <code>startUrlSubstitutionRegex</code>.
</div>

<div class="alert alert-info">
En plus de la syntaxe pipe <code>|</code> présentée ci-dessus, <code>resourceUrlSubstitutionRegexes</code> prend également en charge la syntaxe sed : <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifiers&gt;</code>.</br></br>
Étant donné que cette syntaxe utilise un séparateur slash <code>/</code>, elle peut nécessiter d'échapper les slashes de l'URL, ce qui est sujet aux erreurs. Sauf si vous avez besoin de modificateurs regex, Datadog recommande d'utiliser la syntaxe pipe <code>|</code> pour une meilleure lisibilité.
</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/
[2]: /fr/synthetics/api_tests/
[3]: /fr/continuous_testing/environments/proxy_firewall_vpn
[4]: /fr/synthetics/private_locations