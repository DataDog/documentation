---
title: Configurer l'authentification à deux facteurs
---

L'authentification à deux facteurs (2FA) offre un niveau de sécurité supplémentaire pour votre compte. Lorsque vous activez l'authentification à deux facteurs, votre compte Cloudcraft n'est accessible que sur les appareils auxquels vous faites confiance.

Après avoir configuré la 2FA, vous vous connecterez à votre compte en deux étapes :

1. Saisissez votre mot de passe.
2. Saisissez le code de votre application d'authentification multi-facteurs virtuelle.

<div class="alert alert-info">Si vous utilisez votre compte Google pour vous connecter à Cloudcraft, la 2FA n'est pas disponible car Google vous la fournit. Assurez-vous de <a href="https://support.google.com/accounts/answer/185839" title="Protégez votre compte avec la validation en deux étapes" referrerpolicy="no-referrer" rel="noopener noreferrer" target="_new">passer par le processus de 2FA du côté de Google</a> avant de vous connecter à votre compte Cloudcraft.
</div>

## Activer la 2FA

1. Téléchargez une application d'authentification telle que Google Authenticator ou [Authy][1] pour votre téléphone.
2. Connectez-vous à votre compte Cloudcraft.
3. Cliquez sur l'icône **Account** et sélectionnez **User settings**.
4. Cliquez sur **Manage MFA**. Le code-barres 2FA s'affiche.
5. Ouvrez l'application d'authentification sur votre téléphone et scannez le code-barres.
6. Saisissez le code de vérification à six chiffres généré par votre application d'authentification, puis cliquez sur **Verify**.

La fenêtre suivante affiche une clé de récupération. La clé de récupération est une chaîne de 18 caractères composée de chiffres et de lettres affichée une seule fois qui peut vous aider à accéder à nouveau à votre compte si vous perdez l'accès à l'appareil que vous utilisez pour gérer la 2FA. Elle agit comme un mot de passe à usage unique. Cloudcraft recommande d'imprimer la clé et de la conserver dans un endroit sûr.

## Désactiver la 2FA

La désactivation de la 2FA n'est pas recommandée et peut entraîner une moins bonne sécurité globale du compte. Heimdal Security a un excellent article sur [pourquoi vous devriez toujours utiliser l'authentification à deux facteurs][2].

1. Connectez-vous à votre compte Cloudcraft.
2. Cliquez sur l'icône **Account** et sélectionnez **User settings**.
3. Cliquez sur **Manage MFA**, puis sélectionnez **Disable MFA**.

[1]: https://authy.com/
[2]: https://heimdalsecurity.com/blog/start-using-two-factor-authentication/