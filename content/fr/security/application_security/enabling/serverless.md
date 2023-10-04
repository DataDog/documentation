---
aliases:
- /fr/security/application_security/getting_started/serverless
code_lang: serverless
code_lang_weight: 90
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Fonctionnement d'Application Security
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: Règles Application Security Management prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage d'Application Security Management
- link: /security/application_security/threats/
  tag: Documentation
  text: Surveillance et protection contre les menaces sur les applications
is_beta: true
kind: documentation
title: Activer ASM pour AWS Lambda
type: multi-code-lang
---

<div class="alert alert-info">La prise en charge d'AWS Lambda par ASM est en version bêta. La détection des menaces s'effectue via l'extension lambda.</div>

La solution Application Security Management (ASM) de Datadog peut être utilisée pour surveiller vos fonctions AWS Lambda. Consultez la section [Compatibilité][4] pour connaître les fonctionnalités ASM compatibles avec les fonctions sans serveur.

Afin de configurer ASM pour AWS Lambda, vous devrez généralement :

1. Identifier les fonctions vulnérables ou visées par des attaques qui profiteront le plus d'ASM. Pour ce faire, consultez l'[onglet Security de votre Service Catalog][1].
2. Configurer l'instrumentation ASM en utilisant le [plug-in Serverless Framework de Datadog][6] ou en définissant manuellement les différentes couches.
3. Déclencher des signaux de sécurité dans votre application afin de vérifier comment Datadog affiche les informations générées.

## Prérequis

- La solution [APM pour les applications sans serveur][2] doit être configurée sur la fonction Lambda de façon à ce que les traces soient directement envoyées à Datadog. L'intégration X-Ray, utilisée pour envoyer les données de trace à APM, ne prend pas en charge les données dont ASM a besoin pour surveiller les fonctions.

## Prise en main

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Le [plug-in Serverless Framework Datadog][1] configure automatiquement vos fonctions de façon à ce que les métriques, traces et logs soient envoyées à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Framework Datadog :

1. Installez le plug-in Serverless Framework Datadog :
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```
2. Activez ASM en mettant à jour votre fichier `serverless.yml` (ou en utilisant toute autre méthode privilégiée pour définir les variables d'environnement de votre fonction) :
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
3. Redéployez la fonction et invoquez-la. Après quelques minutes, elle apparaît dans les [vues ASM][3].

[1]: /fr/serverless/serverless_integrations/plugin
[2]: /fr/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}

{{% tab "Méthode personnalisée" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Installez le traceur Datadog :
   - **Python** 
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:72

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Les options disponibles pour `RUNTIME` sont `Python37`, `Python38` et `Python39`.

   - **Node**   
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:91

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:91
         ```  
         Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Les options disponibles pour RUNTIME sont `Node12-x`, `Node14-x`, `Node16-x` et `Node18-x`.

   - **Java** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:8
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:8
     ```
   - **Go** : le traceur Go ne fait appel à aucune couche et fonctionne comme un module Go standard. Vous pouvez installer la dernière version avec la commande suivante :
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:6
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:6
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:6
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:6
     ```
2. Installez l'extension Lambda Datadog en configurant les couches pour votre fonction Lambda à l'aide de l'ARN, en respectant l'un des formats suivants. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:36
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:36
   ```
   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Installez le traceur Datadog :
   - **Python** 
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:72

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Les options disponibles pour `RUNTIME` sont `Python37`, `Python38`, `Python39`, `Python310` et `Python311`.

   - **Node**   
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:91

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:91
         ```  
         Remplacez `<AWS_REGION>` par une région AWS valide, comme `us-east-1`. Les options disponibles pour RUNTIME sont `Node12-x`, `Node14-x`, `Node16-x` et `Node18-x`.


   - **Java** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:8
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:8
     ```
   - **Go** : le traceur Go ne fait appel à aucune couche et fonctionne comme un module Go standard. Vous pouvez installer la dernière version avec la commande suivante :
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET** : [Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN en respectant l'un des formats suivants, en fonction de l'endroit où votre fonction Lambda est déployée. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet:6
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet-ARM:6
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:6
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:6
     ```
2. Installez l'extension Lambda Datadog en configurant les couches pour votre fonction Lambda à l'aide de l'ARN, en respectant l'un des formats suivants. Remplacez `<AWS_REGION>` par une région AWS valide telle que `us-east-1` :
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:36
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:36
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. Activez ASM en ajoutant les variables d'environnement suivantes sur le déploiement de votre fonction :
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   Pour les **fonctions NodeJS ou Python**, ajoutez également ce qui suit :
   ```yaml
   environment:
     DD_TRACE_ENABLED: true
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

Pour voir la détection des menaces Application Security Management en action, envoyez des patterns d'attaque connus sur votre application. Par exemple, envoyez un en-tête HTTP avec la valeur `acunetix-product` pour déclencher une tentative d'[attaque par analyse des vulnérabilités][5] :
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://url-de-votre-fonction/route-existante
   ```
Quelques minutes après avoir activé votre application et envoyé les patterns d'attaque, **des informations sur les menaces s'affichent dans l'[Application Signals Explorer][3]**.

{{< img src="/security/application_security/application-security-signal.png" alt="Page des détails d'un signal de sécurité avec des tags, des métriques, des recommandations de mesures et les adresses IP de la personne malveillante associée à la menace" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?env=prod&hostGroup=%2A&lens=Security
[2]: /fr/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /fr/security/application_security/enabling/compatibility/serverless
[5]: /fr/security/default_rules/security-scan-detected/
[6]: /fr/serverless/libraries_integrations/plugin/