---
aliases:
- /fr/security_platform/application_security/setup_and_configure
- /fr/security/application_security/setup_and_configure
- /fr/security/application_security/threats/setup_and_configure
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Se protéger contre les menaces avec la solution Application Security Management
    Datadog
- link: /security/application_security/enabling/
  tag: Documentation
  text: Activer ASM pour vos services
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: Règles Application Security Management prêtes à l'emploi
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Ajouter des informations utilisateur à des traces
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage d'ASM
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Fonctionnement d'Application Security Management dans Datadog
title: Configuration de bibliothèque
---


## Configurer un en-tête IP client

ASM cherche automatiquement à résoudre l'adresse `http.client_ip` de plusieurs en-têtes connus, tels que `X-Forwarded-For`. Si vous utilisez un en-tête personnalisé pour ce champ, ou si vous souhaitez contourner l'algorithme de résolution, définissez la variable d'environnement `DD_TRACE_CLIENT_IP_HEADER`. Lorsque cette variable est définie, la bibliothèque ne vérifie que l'en-tête fourni pour l'IP client concerné.

## Suivre les personnes malveillantes authentifiées

De nombreuses attaques critiques proviennent d'utilisateurs authentifiés ayant accès à vos endpoints les plus sensibles. Pour identifier toute personne malveillante effectuant des activités suspectes d'un point de vue sécurité, ajoutez des informations utilisateur aux traces en instrumentant vos services avec les tags d'utilisateur standardisés. Vous pouvez ajouter des tags personnalisés à votre span racine ou utiliser des fonctions d'instrumentation.

Si vous utilisez des frameworks d'authentification compatibles, et que la solution ASM est activée, la bibliothèque de tracing Datadog tente de détecter les événements de connexion et d'inscription des utilisateurs.

Référez-vous à la section [Surveillance et protection des utilisateurs][1] pour consulter la marche à suivre afin de surveiller manuellement l'activité utilisateur, ou [découvrez comment désactiver le suivi automatique][7].

## Exclure certains paramètres des détections déclenchant un signal

Il arrive qu'un signal ASM, ou qu'une trace de sécurité, soit en réalité un faux positif. Cela peut se produire lorsque la solution détecte plusieurs fois une même trace de sécurité et génère un signal, mais qu'après vérification, il s'avère que la menace n'est pas réelle.

Vous pouvez ajouter une entrée à la Passlist, qui ignore les événements générés par une règle, afin de limiter les patterns de signaux inutiles et de concentrer vos efforts sur les traces de sécurité légitimes.

Pour ajouter une entrée à la PassList, effectuez l'une des actions suivantes :

- Cliquez sur un signal sur la page [ASM Signals][4], puis sur le lien **Add Entry** en regard de l'action suggérée **Add to passlist**. Cette méthode permet d'ajouter automatiquement une entrée pour le service ciblé.
- Accédez à la page [Passlist Configuration][5] et configurez manuellement une nouvelle entrée dans la PassList en fonction de vos propres critères

**Remarque** : les requêtes (traces) qui correspondent à une entrée de la PassList ne sont pas facturées.

## Considérations relatives à la sécurité des données

Les données que vous recueillez avec Datadog peuvent contenir des informations sensibles que vous souhaitez filtrer, obfusquer, nettoyer, masquer, modifier ou ne pas recueillir du tout. De plus, elles peuvent contenir du trafic Synthetic susceptible de fausser les menaces détectées ou d'empêcher Datadog d'indiquer correctement le niveau de sécurité de vos services.

Par défaut, ASM recueille des informations sur les traces de sécurité afin de vous aider à comprendre la raison pour laquelle la requête est considérée comme suspecte. Avant de transmettre les données, ASM les analyse afin de rechercher des patterns et des mots-clés permettant de conclure que les données sont sensibles. Si les données sont considérées comme sensibles, le flag `<redacted>` est appliqué. Ainsi, en cas de requête suspecte, aucune donnée liée à la requête n'est recueillie, afin d'éviter de compromettre la sécurité des données.

Pour protéger les données des utilisateurs, la fonctionnalité d'analyse des données sensibles est activée par défaut dans ASM. Vous pouvez personnaliser la configuration à l'aide des variables d'environnement suivantes. L'analyse est basée sur la [syntaxe RE2][2]. Pour personnaliser l'analyse, définissez la valeur de ces variables d'environnement selon un pattern RE2 valide :

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` : pattern permettant d'analyser des clés dont les valeurs contiennent généralement des données sensibles. Les valeurs renvoyées et tous leurs nœuds enfant associés à la clé sont censurés.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` : pattern permettant d'analyser des valeurs pouvant indiquer la présence de données sensibles. Les valeurs renvoyées et tous leurs nœuds enfant sont censurés.

<div class="alert alert-info"><strong>Pour Ruby uniquement, à partir de la version 1.1.0 de <code>ddtrace</code></strong>

<p>Vous pouvez également configurer des patterns d'analyse dans le code :</p>

```ruby
Datadog.configure do |c|
  # ...

  # Définir des expressions régulières RE2 personnalisées
  c.appsec.obfuscator_key_regex = '...'
  c.appsec.obfuscator_value_regex = '...'
end
```

</div>


Les données suivantes sont pas défaut considérées comme sensibles :

* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Consultez la documentation relative à la [sécurité des données APM][3] pour obtenir des informations sur les autres mécanismes de l'Agent Datadog, ainsi que les bibliothèques permettant de supprimer des données sensibles.

## Configurer une page de blocage ou une charge utile personnalisée

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="La page ASM bloque les requêtes provenant des adresses IP bloquées" width="75%" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /fr/tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/configuration/asm/passlist
[6]: /fr/help/
[7]: /fr/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking
[8]: https://app.datadoghq.com/security/configuration/asm/services-config