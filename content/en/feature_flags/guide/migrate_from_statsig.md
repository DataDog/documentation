---
title: Migrate Your Feature Flags from Statsig
description: Learn how to migrate feature flags from Statsig to Eppo by Datadog.
---

This guide outlines the process for migrating your feature flagging logic from Statsig to Datadog. It covers conceptual mappings, SDK installation, initialization, and flag evaluation.

## **Summary Checklist**

* Replace statsig-js with @datadog/openfeature-browser.  
* Swap statsig.initialize with OpenFeature.setProvider.  
* Convert checkGate to client.getBooleanValue.  
* Convert getConfig to client.getObjectValue or client.getStringValue.  
* Ensure targetingKey is used in the context to identify users.

## **1\. Conceptual Mapping**

The core concepts between Statsig and Datadog are similar, but the terminology differs slightly.

| Statsig Concept | Datadog Concept | Notes |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag** (Boolean) | Simple on/off toggles. |
| **Dynamic Config** | **Feature Flag** (JSON/String variants) | Flags in Datadog can return Strings, JSON, or Numbers, covering Statsig's Dynamic Config use cases. |
| **Experiment** | **Feature Flag** (w/ Targeting) | A Datadog Flag can be configured with percentage-based rollouts and specific targeting rules to run experiments. |
| **User/StatsigUser** | **Evaluation Context** | The context (attributes) passed to the SDK to evaluate flags. |

## **2\. SDK Installation**

Datadog recommends using the **OpenFeature** standard for their Feature Flagging SDKs. This provides a vendor-neutral API while using Datadog as the underlying provider.

**Remove Statsig:**
```
npm uninstall statsig-js  
\# or  
yarn remove statsig-js
```
**Install Datadog & OpenFeature:**
```
npm install @datadog/openfeature-browser @openfeature/web-sdk  
\# or  
yarn add @datadog/openfeature-browser @openfeature/web-sdk
```
**Note:** For server-side implementations (Node.js, Go, etc.), refer to the specific Datadog Server SDK documentation, but the OpenFeature pattern remains similar.

## **3\. Initialization**

You must replace the statsig.initialize() call with the OpenFeature provider setup.

### **Statsig (Old)**
```
import statsig from 'statsig-js';

await statsig.initialize(  
  'client-sdk-key',  
  { userID: 'user-123' }  
);
```
### **Datadog (New)**
```
import { DatadogProvider } from '@datadog/openfeature-browser';  
import { OpenFeature } from '@openfeature/web-sdk';

// 1\. Configure the Datadog Provider  
const provider \= new DatadogProvider({  
  clientToken: '\<YOUR\_DATADOG\_CLIENT\_TOKEN\>',  
  applicationId: '\<YOUR\_DATADOG\_APPLICATION\_ID\>',  
  site: 'datadoghq.com', // or datadoghq.eu, etc.  
  service: 'my-web-app',  
  env: 'production',  
  version: '1.0.0',  
  enableExposureLogging: true, // Replaces Statsig's automatic exposure logging  
});

// 2\. Register the provider  
await OpenFeature.setProviderAndWait(provider);
```
## **4\. Evaluating Flags (Checking Gates)**

Replace checkGate calls with OpenFeature's getBooleanValue.

### **Statsig (Old)**
```
const isEnabled \= statsig.checkGate('new\_homepage\_design');

if (isEnabled) {  
  // Show new design  
} else {  
  // Show old design  
}
```
### **Datadog (New)**
```
const client \= OpenFeature.getClient();

// The second argument is the fallback value (default) if the flag fails to fetch  
const isEnabled \= client.getBooleanValue('new\_homepage\_design', false);

if (isEnabled) {  
  // Show new design  
} else {  
  // Show old design  
}
```
## **5\. Getting Configuration (Dynamic Configs)**

If you were using getConfig or getExperiment to retrieve non-boolean values (strings, JSON, numbers), use the appropriate typed method in OpenFeature.

### **Statsig (Old)**
```
const config \= statsig.getConfig('banner\_config');  
const title \= config.get('title', 'Welcome');
```
### **Datadog (New)**
```
const client \= OpenFeature.getClient();

// Assuming your Datadog flag 'banner\_config' returns a JSON object variant  
const bannerConfig \= client.getObjectValue('banner\_config', { title: 'Welcome' });  
const title \= bannerConfig.title;
```
## **6\. Updating User Context**

Statsig updates user context via updateUser. In OpenFeature \+ Datadog, you set the **Context**.

### **Statsig (Old)**
```
await statsig.updateUser({  
  userID: 'user-456',  
  email: 'employee@company.com',  
  custom: { plan: 'premium' }  
});
```
### **Datadog (New)**
```
// Set the context for all future flag evaluations  
await OpenFeature.setContext({  
  targetingKey: 'user-456', // Crucial: Maps to the User ID in Datadog  
  email: 'employee@company.com',  
  plan: 'premium'  
});
```
## **7\. Tracking & Exposure**

In Statsig, checking a gate automatically logs an exposure.

In Datadog:

1. Ensure enableExposureLogging: true is set in the DatadogProvider config.  
2. Events are sent to Datadog RUM. You can view these in the **Feature Flags** list or the **RUM** explorer.
