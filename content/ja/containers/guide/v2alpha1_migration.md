---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/v2alpha1_migration.md
title: DatadogAgent の CRD を v2alpha1 に移行する
---
このページでは、DatadogAgent の Custom Resource Definition (CRD) を `v1alpha1` から Datadog Operator v1.0.0+ で使用されるバージョン `v2alpha1` に変換する方法について説明します。

## 前提条件

* Datadog Operator v1.0.0+ の Helm チャートの移行が完了していること。詳細は、[移行ガイド][1]を参照してください。
* `installCRDs` を `true` に設定して `cert-manager` を実行していること。
   ```shell
   helm install \
     cert-manager jetstack/cert-manager \
     --version v1.11.0 \
     --set installCRDs=true
   ```
* Conversion Webhook サーバーを有効にした状態で Datadog Operator v1.0.0+ を実行していること。
   ```shell
   helm install \
     datadog-operator datadog/datadog-operator \
     --set image.tag=1.0.0 \
     --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
     --set datadogCRDs.migration.datadogAgents.useCertManager=true \
     --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
   ```

## DatadogAgent/v1alpha1 を DatadogAgent/v2alpha1 に変換する

Datadog Operator は v2alpha1 オブジェクトのリコンサイラーを実行するとともに、ポート 9443 で公開される Conversion Webhook サーバーを起動します。API サーバーはこのサーバーを使用して v1alpha1 の DatadogAgent CRD を v2alpha1 に変換します。

1. ローカル ポートを、ポート 9443 で公開されている Conversion Webhook サーバーに転送します。

   ```shell
   kubectl port-forward <DATADOG_OPERATOR_POD_NAME> 2345:9443
   ```

2. `v1alpha1` の DatadogAgent 定義を JSON として保存します。`yq` のようなツールを使用できます。

3. DatadogAgent.v1alpha1 の JSON を使用して、`/convert` エンドポイントに対して `curl` コマンドを実行します。

   ``` shell
   curl -k https://localhost:2345/convert -X POST -d '{"request":{"uid":"123", "desiredAPIVersion":"datadoghq.com/v2alpha1", "objects":[{
     "apiVersion": "datadoghq.com/v1alpha1",
     "kind": "DatadogAgent",
     "metadata": {
       "name": "datadog"
     },
     "spec": {
       "credentials": {
         "apiKey": "DATADOG_API_KEY",
         "appKey": "DATADOG_APP_KEY"
       }
     }
   }]}}'
   ```

   これにより、`v2alpha1` に変換された DatadogAgent 定義がレスポンスとして返されます。

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
     creationTimestamp: null
   spec:
     features: {}
     global:
       credentials:
         apiKey: <DATADOG_API_KEY>
         appKey: <DATADOG_APP_KEY>
   status:
     conditions: null
   ```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md#migrating-to-the-version-10-of-the-datadog-operator