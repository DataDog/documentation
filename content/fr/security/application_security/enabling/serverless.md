---
aliases:
- /fr/security/application_security/getting_started/serverless
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Fonctionnement d'Application Security
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles Application Security Management prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage d'Application Security Management
- link: /security/application_security/threats/
  tag: Documentation
  text: Application Threat Management
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: La plateforme de sécurité Datadog propose davantage de fonctionnalités de
    conformité et de protection contre les menaces pour Google Cloud
title: Activer ASM pour la surveillance sans serveur
---

{{< partial name="security-platform/appsec-serverless.html" >}}</br>

Consultez les [exigences de compatibilité][4] afin d'en savoir plus sur les fonctionnalités ASM disponibles pour les fonctions sans serveur.

## AWS Lambda

La configuration d'ASM pour AWS Lambda s'effectue en plusieurs étapes :

1. Vous devez identifier les fonctions qui sont vulnérables ou ciblées par des attaques, et qui bénéficieraient le plus de la solution ASM. Pour trouver ces fonctions, consultez l'[onglet Security du catalogue des services][1].
2. Vous devez configurer l'instrumentation ASM à l'aide de l'[interface de ligne de commande Datadog](https://docs.datadoghq.com/serverless/serverless_integrations/cli), d'[AWS CDK](https://github.com/DataDog/datadog-cdk-constructs), du [plug-in Serverless Framework Datadog][6] ou d'une configuration manuelle (utilisation des couches de tracing Datadog).
3. Vous devez déclencher des signaux de sécurité dans votre application et vérifier comment Datadog affiche les informations générées.

### Prérequis

- Le [tracing APM sans serveur][apm-lambda-tracing-setup] est configuré sur la fonction Lambda, afin d'envoyer directement des traces à Datadog.
  Le tracing via X-Ray n'est pas suffisant pour ASM : le tracing APM doit également être activé.

### Prise en main

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Le [plug-in Serverless Framework Datadog][1] vous permet de configurer et de déployer automatiquement votre fonction Lambda avec ASM.

Pour installer et configurer le plug-in Serverless Framework Datadog, procédez comme suit :

1. Installez le plug-in Serverless Framework Datadog :
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Ajouter le paramètre de configuration `enableASM` dans votre fichier `serverless.yml` pour activer ASM :
   ```yaml
   custom:
     datadog:
       enableASM: true
   ```

   Votre nouveau fichier `serverless.yml` doit au moins contenir ce qui suit :
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       enableDDTracing: true
       enableASM: true
   ```
   Consultez également la liste complète des [paramètres de plug-in][4] pour finaliser la configuration des paramètres de votre fonction Lambda.

4. Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans les [vues ASM][3].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[4]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/plugin/#configuration-parameters

{{% /tab %}}
{{% tab "Interface de ligne de commande Datadog" %}}

L'interface de ligne de commande Datadog permet de modifier les configurations de fonctions Lambda existantes pour instrumenter vos applications sans les redéployer. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog.

**Si vous configurez le tracing initial de vos fonctions**, suivez les étapes ci-dessous :

1. Installez le client de l'interface de ligne de commande Datadog :

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, lancez l'interface de ligne de commande Datadog en mode interactif pour procéder rapidement à la première installation. Vous pouvez ignorer les autres étapes. Pour installer définitivement Datadog pour vos applications de production, ignorez cette étape et suivez les autres étapes afin d'exécuter la commande de l'interface de ligne de commande Datadog dans vos pipelines de CI/CD après un déploiement normal.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configurez les identifiants AWS :

    L'interface de ligne de commande Datadog nécessite un accès au service AWS Lambda et dépend du SDK JavaScript AWS pour [résoudre les identifiants][1]. Assurez-vous de configurer vos identifiants AWS à l'aide de la même méthode que celle utilisée lors de l'appel de l'interface de ligne de commande AWS.

4. Configurez le site Datadog :

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Remplacez `<DATADOG_SITE>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le **site Datadog** sélectionné sur la droite de cette page est correct).

5. Configurez la clé d'API Datadog :

    Datadog vous recommande d'enregistrer la clé d'API Datadog dans AWS Secrets Manager pour garantir sa sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). Assurez-vous que vos fonctions Lambda disposent de l'autorisation IAM `secretsmanager:GetSecretValue` requise.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Pour pouvoir effectuer des tests rapides, il est également possible de définir la clé d'API Datadog sous forme de texte brut :

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumentez vos fonctions Lambda :

    Pour instrumenter vos fonctions Lambda, exécutez la commande suivante.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<nomfonction>` et `<autre_nomfonction>` par les noms de vos fonctions Lambda.
    - Sinon, vous pouvez utiliser `--functions-regex` pour instrumenter automatiquement plusieurs fonctions dont le nom correspond à l'expression régulière fournie.
    - Remplacez `<aws_region>` par le nom de la région AWS.

   **Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de développement ou intermédiaire. Si les résultats de l'instrumentation ne vous conviennent pas, exécutez `uninstrument` avec les mêmes arguments pour annuler les modifications.

    Pour obtenir des paramètres supplémentaires, consultez la [documentation relative à l'interface de ligne de commande][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "AWS CDK" %}}

La [bibliothèque CDK Construct Datadog][1] installe automatiquement Datadog sur vos fonctions à l'aide des couches Lambda. De plus, elle configure vos fonctions afin qu'elles envoient des métriques, traces et logs à Datadog via l'extension Lambda Datadog.

1. Installez la bibliothèque CDK Construct Datadog :

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Instrumenter vos fonctions Lambda

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog
    # NOT SUPPORTED IN V1

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        enable_asm=True,
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

    Renseignez les paramètres fictifs comme suit :
    - Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
    - Remplacez `<DATADOG_API_KEY_SECRET_ARN>` par l'ARN du secret AWS où votre [clé d'API Datadog][2] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non en tant que blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

    Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation relative à la bibliothèque CDK Datadog][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Configuration personnalisée" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Installez le traceur Datadog :
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Les options disponibles pour `RUNTIME` sont `Python37`, `Python38` et `Python39`.

   - **Nœud**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Voici la liste des options disponibles pour RUNTIME : {{< latest-lambda-layer-version layer="node-versions" >}}.

   - **Java** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go** : le traceur Go ne fait appel à aucune couche et fonctionne comme un module Go standard. Vous pouvez installer la dernière version avec la commande suivante :
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. Installez l'extension Lambda Datadog en configurant les couches pour votre fonction Lambda à l'aide de l'ARN, en respectant l'un des formats suivants. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```
   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Installez le traceur Datadog :
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}
          ```
          Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Voici la liste des options disponibles pour `RUNTIME` : {{< latest-lambda-layer-version layer="python-versions" >}}.
.

   - **Nœud**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Voici la liste des options disponibles pour RUNTIME : {{< latest-lambda-layer-version layer="node-versions" >}}.


   - **Java** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go** : le traceur Go ne fait appel à aucune couche et fonctionne comme un module Go standard. Vous pouvez installer la dernière version avec la commande suivante :
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. Installez l'extension Lambda Datadog en configurant les couches pour votre fonction Lambda à l'aide de l'ARN, en respectant l'un des formats suivants. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. Activez ASM en ajoutant les variables d'environnement suivantes sur le déploiement de votre fonction :
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. Pour les fonctions **Node** et **Python** uniquement, vérifiez bien que le gestionnaire de la fonction est correctement défini :
    - **Node** : définissez le gestionnaire de votre fonction sur `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`.
       - Définissez également la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.
    - **Python** : définissez le gestionnaire de votre fonction sur `datadog_lambda.handler.handler`.
       - Définissez également la variable d'environnement `DD_LAMBDA_HANDLER` sur votre gestionnaire d'origine, comme `myfunc.handler`.

5. Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans les [vues ASM][3].

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Google Cloud Run

<div class="alert alert-info">La prise en charge de Google Cloud par ASM est disponible en version bêta.</a></div>

### Comment fonctionne `serverless-init`

L'application `serverless-init` utilise un wrapper pour incorporer votre processus et l'exécute en tant que sous-processus. Elle initie un écouteur DogStatsD pour les métriques ainsi qu'un écouteur d'Agent de trace pour les traces. Elle recueille les logs en utilisant un wrapper pour incorporer les flux stdout/stderr de votre application. Une fois le bootstrap terminé, `serverless-init` exécute votre commande en tant que sous-processus.

Pour bénéficier d'une instrumentation complète, assurez-vous d'appeler `datadog-init` dans la première commande exécutée au sein de votre conteneur Docker. Pour ce faire, définissez-la comme point d'entrée ou comme premier argument dans CMD.

### Prise en main

{{< tabs >}}
{{% tab "NodeJS" %}}
Ajoutez les instructions et arguments suivants à votre Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/chemin/vers/votre/application.js"]
```

#### Explication

1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copiez le fichier traceur Node.JS de Datadog dans votre image Docker.

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   Si vous installez la bibliothèque de traceurs de Datadog directement dans votre application, comme indiqué dans les [instructions relatives à l'instrumentation manuelle du traceur][1], ignorez cette étape.

3. (Facultatif) Ajoutez des tags Datadog.

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Modifiez le point d'entrée pour envelopper votre application dans le processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-node).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application binaire incorporée au point d'entrée. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```
#### Configuration alternative {#alt-node}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/chemin/vers/votre/application.js"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/chemin/vers/votre/application.js"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Python" %}}

Ajoutez les instructions et arguments suivants à votre fichier Docker.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### Explication

1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Installez le traceur Python de Datadog.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   Si vous installez la bibliothèque de traceurs de Datadog directement dans votre application, comme indiqué dans les [instructions relatives à l'instrumentation manuelle du traceur][1], ignorez cette étape.

3. (Facultatif) Ajoutez des tags Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Modifiez le point d'entrée pour envelopper votre application dans le processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-python).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application binaire incorporée au point d'entrée, lancée par la bibliothèque de traces de Datadog. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```
#### Configuration alternative {#alt-python}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Java" %}}

Ajoutez les instructions et arguments suivants à votre fichier Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```
#### Explication

1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Ajoutez le fichier traceur Java de Datadog dans votre image Docker.
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   Si vous installez la bibliothèque de traceurs de Datadog directement dans votre application, comme indiqué dans les [instructions relatives à l'instrumentation manuelle du traceur][1], ignorez cette étape.

3. (Facultatif) Ajoutez des tags Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Modifiez le point d'entrée pour incorporer votre application au processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-java).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application binaire incorporée au point d'entrée. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### Configuration alternative {#alt-java}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Go" %}}

[Effectuez une installation manuelle][1] du traceur Go avant de déployer votre application. Compilez votre binaire Go en prenant soin d'activer le tag appsec (`go build --tags "appsec" ...`). Ajoutez les instructions et arguments suivants à votre Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
```

#### Explication

1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Modifiez le point d'entrée pour incorporer votre application au processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-go).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (Facultatif) Ajoutez des tags Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Exécutez votre application binaire incorporée au point d'entrée. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### Configuration alternative {#alt-go}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/chemin/vers/votre-binaire-go"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/chemin/vers/votre-binaire-go"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/go

{{% /tab %}}
{{% tab ".NET" %}}

Ajoutez les instructions et arguments suivants à votre fichier Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### Explication

1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copiez le fichier traceur .NET de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   Si vous installez la bibliothèque de traceurs de Datadog directement dans votre application, comme indiqué dans les [instructions relatives à l'instrumentation manuelle du traceur][1], ignorez cette étape.

3. (Facultatif) Ajoutez des tags Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Modifiez le point d'entrée pour incorporer votre application au processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-dotnet).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application binaire incorporée au point d'entrée. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
#### Configuration alternative {#alt-dotnet}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

{{% /tab %}}
{{% tab "Ruby" %}}

[Installez manuellement][1] le traceur Ruby avant de déployer votre application. Référez-vous à l'[exemple d'application][2].

Ajoutez les instructions et arguments suivants à votre fichier Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### Explication

1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Facultatif) Ajoutez des tags Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. Cette variable dʼenvironnement est nécessaire pour que la propagation des traces fonctionne correctement dans Cloud Run. Veillez à définir cette variable pour tous les services en aval instrumentés par Datadog.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Modifiez le point d'entrée pour incorporer votre application au processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-ruby).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application binaire incorporée au point d'entrée. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### Configuration alternative {#alt-ruby}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{% /tab %}}
{{% tab "PHP" %}}

Ajoutez les instructions et arguments suivants à votre fichier Docker.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# use the following for an Apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# use the following for an Nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**Remarque** : le point d'entrée `datadog-init` incorpore votre processus et collecte des logs à partir de celui-ci. Pour que les logs fonctionnent correctement, assurez-vous que vos processus Apache, Nginx ou PHP écrivent leurs sorties dans `stdout`.

#### Explication


1. Copiez le fichier `serverless-init` de Datadog dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copiez et installez le traceur PHP de Datadog.
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   Si vous installez la bibliothèque de traceurs de Datadog directement dans votre application, comme indiqué dans les [instructions relatives à l'instrumentation manuelle du traceur][1], ignorez cette étape.

3. (Facultatif) Ajoutez des tags Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Modifiez le point d'entrée pour incorporer votre application au processus `serverless-init` de Datadog.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre fichier Docker, consultez la section relative à la [configuration alternative](#alt-php).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application.

   Utilisez ce qui suit pour une image basée sur Apache et mod_php :
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Utilisez ce qui suit pour une image basée sur Nginx et php-fpm :
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### Configuration alternative {#alt-php}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, et si vous utilisez une image basée sur Apache et mod_php, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=9" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
{{< /highlight >}}

Si vous souhaitez que votre point d'entrée soit également instrumenté, vous pouvez préférer lʼéchanger avec les arguments CMD. Pour en savoir plus, consultez la section [Comment `serverless-init` fonctionne](#comment-serverless-init-fonctionne).

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Utilisez ce qui suit pour une image basée sur Apache et mod_php :
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# Utilisez ce qui suit pour une image basée sur Nginx et php-fpm :
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension

{{% /tab %}}
{{< /tabs >}}

## Azure App Service

### Configuration
#### Définir les paramètres de votre application
Pour activer ASM sur votre application, commencez par ajouter les paires key/value suivantes sous la section **Applications Settings** des paramètres de votre configuration Azure.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Configuration d'Azure App Service : la zone Application Settings est affichée, sous la section Configuration des paramètres de l'interface Azure. Trois paramètres sont indiqués : DD_API_KEY, DD_SERVICE et DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` correspond à votre clé d'API Datadog.
- `DD_CUSTOM_METRICS_ENABLED` permet d'activer les [métriques custom](#metriques-custom) (facultatif).
- `DD_SITE` correspond au [paramètre][2] du site Datadog. Votre site est {{< region-param key="dd_site" code="true" >}}. Par défaut, ce paramètre a pour valeur `datadoghq.com`.
- `DD_SERVICE` correspond au nom du service utilisé pour ce programme. Par défaut, sa valeur correspond à celle du champ name dans `package.json`.
- `DD_START_APP` correspond à la commande utilisée pour lancer votre application. Exemple : `node ./bin/www` (inutile pour les applications exécutées dans Tomcat).
- La valeur de `DD_APPSEC_ENABLED` doit être définie sur 1, afin d'activer ASM.

### Identifier votre commande de lancement

Pour les applications Azure App Service Web Linux qui ont été développées à l'aide de l'option de déploiement de code sur des runtimes intégrés, la commande permettant de lancer l'application dépend du langage. Les valeurs par défaut sont fournies dans la [documentation Azure][7]. Vous trouverez ci-dessous plusieurs exemples.

Définissez les valeurs ci-dessous dans la variable d'environnement `DD_START_APP`. Les exemples ci-dessous s'appliquent à l'application `datadog-demo`, le cas échéant.

| Runtime   | Exemple de valeur `DD_START_APP`                                                               | Rôle                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Exécute le [fichier de configuration Node PM2][12] ou votre fichier de script.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Exécute un fichier `.dll` qui reprend le nom de votre application Web par défaut. <br /><br /> **Remarque** : le nom du fichier `.dll` indiqué dans la commande doit correspondre au nom de votre fichier `.dll`. Dans certaines situations, ce nom est différent de celui de votre application Web;         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copie le secret à l'emplacement pertinent et lance l'application.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | [Script de lancement][13] personnalisé. Cet exemple repose sur une commande Gunicorn permettant de lancer une application Django.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | La commande permettant de lancer votre application. Elle n'est pas requise pour les applications exécutées dans Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Remarque** : lorsque de nouveaux paramètres sont enregistrés, l'application redémarre.

#### Définir des paramètres généraux

{{< tabs >}}
{{% tab "Node, .NET, PHP et Python" %}}
Accédez à **General settings**, puis ajoutez ce qui suit dans le champ **Startup Command** :

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.4.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Configuration Azure App Service : les paramètres relatifs à la pile, sous la section Configuration des paramètres dans l'interface Azure. En dessous des paramètres liés à la pile, à la version majeure et à la version mineure se trouve un champ Startup Command qui a pour valeur la commande curl indiquée ci-dessus." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Téléchargez le fichier [`datadog_wrapper`][8] depuis la page des versions, puis importez-le dans votre application à l'aide de la commande suivante dans l'interface de ligne de commande Azure :

```
  az webapp deploy --resource-group <nom_groupe> --name <nom_application> --src-path <chemin-vers-wrapper-datadog> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## Tester la détection des menaces

Pour voir la détection des menaces Application Security Management en action, envoyez des patterns d'attaque connus sur votre application. Par exemple, envoyez une requête avec lʼen-tête de lʼAgent de lʼutilisateur avec la valeur `dd-test-scanner-log` pour déclencher une tentative d'[attaque par analyse des vulnérabilités][5] :
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
Quelques minutes après avoir activé votre application et envoyé les patterns d'attaque, **des informations sur les menaces s'affichent dans l'[Application Signals Explorer][3]**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /fr/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /fr/security/application_security/enabling/compatibility/serverless
[5]: /fr/security/default_rules/security-scan-detected/
[6]: /fr/serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/