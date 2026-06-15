---
title: Solucionar el problema "unable to verify AWS account" (No se puede verificar
  la cuenta de AWS)
---

Si recibes un error "unable to verify AWS account" (No se puede verificar la cuenta de AWS) al intentar añadir tu cuenta de AWS a Cloudcraft, puede deberse a que tu organización ha adjuntado una política de control de servicio a la cuenta. Esto impide que los servidores de Cloudcraft validen el rol de IAM creado.

Para resolver este error, tienes las siguientes opciones:

## Habilitar el acceso a la región `us-east-1` 

Puedes pedir a tu equipo de TI que habilite temporalmente el acceso a la región `us-east-1` en tus políticas. Esta es la región que Cloudcraft utiliza para verificar el rol de IAM. Después de añadir la cuenta, puedes volver a desactivar la región y Cloudcraft se limitará a escanear únicamente los componentes de las regiones que no estén bloqueadas.

Para ayudar a hacer un caso más sólido sobre la apertura de una excepción en la política, puedes ofrecer a los administradores de tu organización la opción de adjuntar una política de IAM mínima al rol, limitando lo que Cloudcraft puede y no puede leer de la cuenta de AWS añadida a la aplicación. Para más información, consulta [Crear una política de IAM mínima para usar con Cloudcraft][1].

## Utilizar la API para añadir tu cuenta

Como alternativa al uso de la interfaz web, puedes utilizar la API de Cloudcraft para añadir tu cuenta y especificar desde qué región debe comprobarse la cuenta. Para obtener más información, consulta [Añadir cuentas de AWS a través de la API de Cloudcraft][2].

[1]: /es/cloudcraft/advanced/minimal-iam-policy/
[2]: /es/cloudcraft/advanced/add-aws-account-via-api/