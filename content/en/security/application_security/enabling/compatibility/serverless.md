---
title: Serverless Compatibility Requirements 
kind: documentation
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
---


## Language and ASM compatibility
- AWS Lambda
- Google Cloud Run
- Azure App Service

### AWS Lambda
Notes
- Threat Protection via Remote Config is not supported. However you can use Workflows to block IPs in your WAF instead.
  
|Type           	| Threat Detection	|  Vulnerability Management for OSS	| Vulnerability Management for Code-Level 	|
| ---  		|   ---             		|           ----           			|           ----            				|
| Java  		| {{< X >}}         	| 	                			|						|
| .NET    	| {{< X >}}         	|  	                          		|						|
| Node 		| {{< X >}}     		| beta	              			|						|
| Python   	| {{< X >}}         	| beta                 			|						|
| Ruby   	| {{< X >}}         	|  	                 			|						|
| PHP   	| 		        	|	            			|						|
| Go   		| {{< X >}}         	| 	               			|						|

#### Supported trigger types
ASM Threat Detection supports HTTP requests as function input only, as it is the highest likelihood of attackers exploiting a serverless application. HTTP requests typically come from AWS services such as:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

Get started with ASM monitored on your services →

#### Additional language specific compatibility information

Node.js
: If you are bundling using webpack or esbuild, [follow the specific bundler instructions][4].

Python
: 

Java
: To fully instrument your serverless application with distributed tracing, your Java Lambda functions must use the Java 8 Corretto (`java8.al2`), Java 11 (`java11`) or Java 17 (`java17`) runtimes with at least 1024MB of memory.
: If you use the Datadog Lambda layers `dd-trace-java:4` (or older) and `Datadog-Extension:24` (or older), follow the instructions in [Upgrade Instrumentation for Java Lambda Functions][3].

Go
: 

.NET
: 


### Google Cloud Run
Notes
- Google Cloud Run support is in public beta for ASM 
- Threat Protection via Remote Config is not supported. However you can use Workflows to block IPs in your WAF instead
   
|Type           	| Threat Detection	|  Vulnerability Management for OSS	| Vulnerability Management for Code-Level 	|
| ---  		|   ---             		|           ----           			|           ----            				|
| Java  		| beta         	| 	                			|						|
| .NET    	| beta         	|  	                          		|						|
| Node 		| beta     		| beta	              			|						|
| Python   	| beta         	| beta                 			|						|
| Ruby   	| beta         	|  	                 			|						|
| PHP   	| 		        	|	            			|						|
| Go   		| beta         	| 	               			|						|

Get started with ASM monitored on your services →


### Azure App Service
Notes
- Only *web applications* are supported, Azure Functions are not supported with ASM
- Threat Protection via Remote Config is not supported. However you can use Workflows to block IPs in your WAF instead
   
|Type       | OS			        |Threat Detection	|  Vulnerability Management for OSS	 | Vulnerability Management for Code-Level 	|
| ---  		  |   —			        | ---             |           ----                     |           ----         	                |
| Java  		| Windows, Linux	| {{< X >}}    	 	| {{< X >}}	                         | beta			                                |
| .NET    	| Windows, Linux	| {{< X >}}       | {{< X >}}      	                   |			                                    |
| Node 		  | Linux			      | {{< X >}}     	| {{< X >}}        	                 | beta			                                |
| Python   	| Linux			      | {{< X >}}       | {{< X >}}                          |			                                    |
| Ruby   	  | Linux			      | {{< X >}}       | {{< X >}}      	                   |			                                    |
| PHP   	  | Linux			      |		        	    | {{< X >}} 	                       |			                                    |
| Go   		  | 			          |	      		      | {{< X >}} 	                       |			                                    |

Get started with ASM monitored on your services →





[1]: /serverless/distributed_tracing/
[2]: /serverless/guide/datadog_forwarder_python
[3]: /serverless/guide/upgrade_java_instrumentation
[4]: /serverless/guide/serverless_tracing_and_bundlers/
