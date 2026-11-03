---
aliases:
- /fr/mobile_testing/settings
- /fr/mobile_app_testing/settings
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: Documentation
  text: Apprenez à créer un test mobile
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: Exécutez vos tests synthétiques dans un pipeline d'intégration continue (CI)
is_beta: true
title: Paramètres des tests d'applications mobiles
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

Gérez vos applications mobiles téléchargées et vos paramètres de parallélisation sur la [page Synthetic Monitoring & Continuous Testing Settings][1].

{{< img src="mobile_app_testing/applications_list_2.png" alt="Paramètres des applications mobiles" style="width:100%;">}}

## Créez une application {#create-an-application}

Pour ajouter une application mobile, accédez à l'[{{< ui >}}Mobile Applications List{{< /ui >}} onglet][5] et cliquez sur {{< ui >}}\+ Create Application{{< /ui >}}.

{{< tabs >}}
{{% tab "Android" %}}

1. Sélectionnez {{< ui >}}Android{{< /ui >}} comme système d'exploitation pour votre application mobile.
2. Sélectionnez le framework avec lequel votre application est construite. Les frameworks pris en charge sont les frameworks Android natifs et React Native.
3. Nommez votre application mobile.
4. Ajoutez des `env` tags ainsi que des tags supplémentaires à votre application mobile. Vous pouvez utiliser ces tags pour filtrer vos tests d'applications mobiles sur la [page Synthetic Monitoring & Continuous Testing][101]. 
5. Optionnellement, saisissez une description pour votre application mobile.
6. Téléchargez un [`.apk` fichier][102].
7. Saisissez un nom pour la version de votre application mobile. Optionnellement, sélectionnez {{< ui >}}Mark this version as latest{{< /ui >}}.
8. Cliquez sur {{< ui >}}Create Application{{< /ui >}}.

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{< img src="mobile_app_testing/settings/mobile_app_settings_android.png" alt="Créez un test d'application mobile avec Android et Native (par défaut) sélectionnés" height="400px" >}}

{{% /tab %}}
{{% tab "iOS" %}}

1. Sélectionnez {{< ui >}}iOS{{< /ui >}} comme système d'exploitation pour votre application mobile.
2. Sélectionnez le framework avec lequel votre application est construite. Les frameworks pris en charge sont les frameworks iOS natifs et React Native.
3. Nommez votre application mobile.
4. Ajoutez des `env` tags ainsi que des tags supplémentaires à votre application mobile. Vous pouvez utiliser ces tags pour filtrer vos tests d'applications mobiles sur la [page Synthetic Monitoring & Continuous Testing][101]. 
5. Optionnellement, saisissez une description pour votre application mobile.
6. Téléchargez un `.ipa` fichier.
7. Saisissez un nom pour la version de votre application mobile. Optionnellement, sélectionnez {{< ui >}}Mark this version as latest{{< /ui >}}.
8. Cliquez sur {{< ui >}}Create Application{{< /ui >}}.

[101]: https://app.datadoghq.com/synthetics/tests

{{< img src="mobile_app_testing/settings/mobile_app_settings_ios.png" alt="Créez un test d'application mobile avec iOS et Native (par défaut) sélectionnés" height="400px" >}}

{{% /tab %}}
{{< /tabs >}}

Pour modifier ou supprimer une application mobile, survolez une application mobile dans le {{< ui >}}Mobile Applications List{{< /ui >}} et cliquez sur l'icône correspondante.

<div class="alert alert-info">
  <strong>Remarque</strong> : À partir de juillet 2025, les applications React Native sont officiellement prises en charge pour les tests d'applications mobiles. Aucune action n'est requise pour les applications React Native qui ont été téléchargées avant la prise en charge officielle : les tests continuent de s'exécuter comme prévu. Les tests d'applications mobiles ne fournissent pas une prise en charge complète pour les applications Flutter.
</div>

## Gérer les versions de l'application {#manage-application-versions}

Cliquer sur une application mobile dans le {{< ui >}}Mobile Applications List{{< /ui >}} affiche les versions existantes de l'application. Survolez une version et cliquez sur l'icône {{< ui >}}\+{{< /ui >}} pour [créer un test d'application mobile][6] avec la version de l'application mobile sélectionnée.

Pour modifier ou supprimer une version d'une application mobile, survolez une version dans l'application mobile et cliquez sur l'icône correspondante.

### Ajouter une version {#add-a-version}

Pour ajouter une version d'une application mobile existante :

1. Survolez l'icône {{< ui >}}\+{{< /ui >}} dans une application mobile dans le {{< ui >}}Mobile Applications List{{< /ui >}} et cliquez sur {{< ui >}}Add new version{{< /ui >}}. 
2. Téléchargez un [`.apk`][4] fichier ou un fichier `.ipa`
3. Saisissez un nom de version. 
4. Optionnellement, sélectionnez {{< ui >}}Mark this version as latest{{< /ui >}}.
5. Cliquez sur {{< ui >}}Add Version{{< /ui >}}.

{{< img src="mobile_app_testing/add_new_version.png" alt="Ajouter une nouvelle version d'une application mobile" style="width:50%;">}}

## Personnalisez votre parallélisation {#customize-your-parallelization}

Pour plus d'informations sur la parallélisation de vos tests synthétiques, consultez [Continuous Testing Settings][7].



## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des rôles Datadog Admin et Datadog Standard peuvent accéder à la page {{< ui >}}Applications List{{< /ui >}} de Synthetic Monitoring. Pour accéder à la {{< ui >}}Applications List{{< /ui >}} page, mettez à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][2]. 

Si vous utilisez la [fonctionnalité de rôle personnalisé][3], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_read` et `synthetics_write`. 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/settings/
[2]: /fr/account_management/rbac/#datadog-default-roles
[3]: /fr/account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /fr/mobile_app_testing/mobile_app_tests/
[7]: /fr/continuous_testing/settings/