---
dependencies: []
disable_edit: true
---
# aws_cloudfront_distribution

## `account_id`
**Type**: `STRING`<br>
## `active_trusted_key_groups`
**Type**: `STRUCT`<br>
**Provider name**: `ActiveTrustedKeyGroups`<br>
**Description**: CloudFront automatically adds this field to the response if you’ve configured a cache behavior in this distribution to serve private content using key groups. This field contains a list of key groups and the public keys in each key group that CloudFront can use to verify the signatures of signed URLs or signed cookies.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: This field is <code>true</code> if any of the key groups have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is <code>false</code>.<br>
   - `items`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Items`<br>
    **Description**: A list of key groups, including the identifiers of the public keys in each key group that CloudFront can use to verify the signatures of signed URLs and signed cookies.<br>
       - `key_group_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `KeyGroupId`<br>
        **Description**: The identifier of the key group that contains the public keys.<br>
       - `key_pair_ids`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `KeyPairIds`<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `Items`<br>
            **Description**: A list of CloudFront key pair identifiers.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of key pair identifiers in the list.<br>
   - `quantity`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Quantity`<br>
    **Description**: The number of key groups in the list.<br>
## `active_trusted_signers`
**Type**: `STRUCT`<br>
**Provider name**: `ActiveTrustedSigners`<br>
**Description**: <important> We recommend using <code>TrustedKeyGroups</code> instead of <code>TrustedSigners</code>. </important> CloudFront automatically adds this field to the response if you’ve configured a cache behavior in this distribution to serve private content using trusted signers. This field contains a list of Amazon Web Services account IDs and the active CloudFront key pairs in each account that CloudFront can use to verify the signatures of signed URLs or signed cookies.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: This field is <code>true</code> if any of the Amazon Web Services accounts in the list have active CloudFront key pairs that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is <code>false</code>.<br>
   - `items`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Items`<br>
    **Description**: A list of Amazon Web Services accounts and the identifiers of active CloudFront key pairs in each account that CloudFront can use to verify the signatures of signed URLs and signed cookies.<br>
       - `aws_account_number`<br>
        **Type**: `STRING`<br>
        **Provider name**: `AwsAccountNumber`<br>
        **Description**: An Amazon Web Services account number that contains active CloudFront key pairs that CloudFront can use to verify the signatures of signed URLs and signed cookies. If the Amazon Web Services account that owns the key pairs is the same account that owns the CloudFront distribution, the value of this field is <code>self</code>.<br>
       - `key_pair_ids`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `KeyPairIds`<br>
        **Description**: A list of CloudFront key pair identifiers.<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `Items`<br>
            **Description**: A list of CloudFront key pair identifiers.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of key pair identifiers in the list.<br>
   - `quantity`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Quantity`<br>
    **Description**: The number of Amazon Web Services accounts in the list.<br>
## `alias_icp_recordals`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `AliasICPRecordals`<br>
**Description**: Amazon Web Services services in China customers must file for an Internet Content Provider (ICP) recordal if they want to serve content publicly on an alternate domain name, also known as a CNAME, that they've added to CloudFront. AliasICPRecordal provides the ICP recordal status for CNAMEs associated with distributions. For more information about ICP recordals, see <a href="https://docs.amazonaws.cn/en_us/aws/latest/userguide/accounts-and-credentials.html"> Signup, Accounts, and Credentials</a> in <i>Getting Started with Amazon Web Services services in China</i>.<br>
   - `cname`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CNAME`<br>
    **Description**: A domain name associated with a distribution.<br>
   - `icp_recordal_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ICPRecordalStatus`<br>
    **Description**: The Internet Content Provider (ICP) recordal status for a CNAME. The ICPRecordalStatus is set to APPROVED for all CNAMEs (aliases) in regions outside of China.  The status values returned are the following: <ul> <li>  <b>APPROVED</b> indicates that the associated CNAME has a valid ICP recordal number. Multiple CNAMEs can be associated with a distribution, and CNAMEs can correspond to different ICP recordals. To be marked as APPROVED, that is, valid to use with China region, a CNAME must have one ICP recordal number associated with it. </li> <li>  <b>SUSPENDED</b> indicates that the associated CNAME does not have a valid ICP recordal number. </li> <li>  <b>PENDING</b> indicates that CloudFront can't determine the ICP recordal status of the CNAME associated with the distribution because there was an error in trying to determine the status. You can try again to see if the error is resolved in which case CloudFront returns an APPROVED or SUSPENDED status. </li> </ul>
## `arn`
**Type**: `STRING`<br>
**Provider name**: `ARN`<br>
**Description**: The ARN (Amazon Resource Name) for the distribution. For example: <code>arn:aws:cloudfront::123456789012:distribution/EDFDVBD632BHDS5</code>, where <code>123456789012</code> is your Amazon Web Services account ID.<br>
## `distribution_config`
**Type**: `STRUCT`<br>
**Provider name**: `DistributionConfig`<br>
**Description**: The current configuration information for the distribution. Send a <code>GET</code> request to the <code>/<i>CloudFront API version</i>/distribution ID/config</code> resource.<br>
   - `aliases`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Aliases`<br>
    **Description**: A complex type that contains information about CNAMEs (alternate domain names), if any, for this distribution.<br>
       - `items`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `Items`<br>
        **Description**: A complex type that contains the CNAME aliases, if any, that you want to associate with this distribution.<br>
       - `quantity`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Quantity`<br>
        **Description**: The number of CNAME aliases, if any, that you want to associate with this distribution.<br>
   - `cache_behaviors`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `CacheBehaviors`<br>
    **Description**: A complex type that contains zero or more <code>CacheBehavior</code> elements.<br>
       - `items`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `Items`<br>
        **Description**: Optional: A complex type that contains cache behaviors for this distribution. If <code>Quantity</code> is <code>0</code>, you can omit <code>Items</code>.<br>
           - `allowed_methods`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `AllowedMethods`<br>
               - `cached_methods`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `CachedMethods`<br>
                   - `items`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `Items`<br>
                    **Description**: A complex type that contains the HTTP methods that you want CloudFront to cache responses to.<br>
                   - `quantity`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `Quantity`<br>
                    **Description**: The number of HTTP methods for which you want CloudFront to cache responses. Valid values are <code>2</code> (for caching responses to <code>GET</code> and <code>HEAD</code> requests) and <code>3</code> (for caching responses to <code>GET</code>, <code>HEAD</code>, and <code>OPTIONS</code> requests).<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `Items`<br>
                **Description**: A complex type that contains the HTTP methods that you want CloudFront to process and forward to your origin.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of HTTP methods that you want CloudFront to forward to your origin. Valid values are 2 (for <code>GET</code> and <code>HEAD</code> requests), 3 (for <code>GET</code>, <code>HEAD</code>, and <code>OPTIONS</code> requests) and 7 (for <code>GET, HEAD, OPTIONS, PUT, PATCH, POST</code>, and <code>DELETE</code> requests).<br>
           - `cache_policy_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `CachePolicyId`<br>
            **Description**: The unique identifier of the cache policy that is attached to this cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A <code>CacheBehavior</code> must include either a <code>CachePolicyId</code> or <code>ForwardedValues</code>. We recommend that you use a <code>CachePolicyId</code>.<br>
           - `compress`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `Compress`<br>
            **Description**: Whether you want CloudFront to automatically compress certain files for this cache behavior. If so, specify true; if not, specify false. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html">Serving Compressed Files</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `default_ttl`<br>
            **Type**: `INT64`<br>
            **Provider name**: `DefaultTTL`<br>
            **Description**: This field is deprecated. We recommend that you use the <code>DefaultTTL</code> field in a cache policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. The default amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin does not add HTTP headers such as <code>Cache-Control max-age</code>, <code>Cache-Control s-maxage</code>, and <code>Expires</code> to objects. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing How Long Content Stays in an Edge Cache (Expiration)</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `field_level_encryption_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `FieldLevelEncryptionId`<br>
            **Description**: The value of <code>ID</code> for the field-level encryption configuration that you want CloudFront to use for encrypting specific fields of data for this cache behavior.<br>
           - `forwarded_values`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `ForwardedValues`<br>
            **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/working-with-policies.html">Working with policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to include values in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send values to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">Using the managed origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A <code>CacheBehavior</code> must include either a <code>CachePolicyId</code> or <code>ForwardedValues</code>. We recommend that you use a <code>CachePolicyId</code>. A complex type that specifies how CloudFront handles query strings, cookies, and HTTP headers.<br>
               - `cookies`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `Cookies`<br>
                **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A complex type that specifies whether you want CloudFront to forward cookies to the origin and, if so, which ones. For more information about forwarding cookies to the origin, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html">How CloudFront Forwards, Caches, and Logs Cookies</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
                   - `forward`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `Forward`<br>
                    **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send cookies to the origin but not include them in the cache key, use origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. Specifies which cookies to forward to the origin for this cache behavior: all, none, or the list of cookies specified in the <code>WhitelistedNames</code> complex type. Amazon S3 doesn't process cookies. When the cache behavior is forwarding requests to an Amazon S3 origin, specify none for the <code>Forward</code> element.<br>
                   - `whitelisted_names`<br>
                    **Type**: `STRUCT`<br>
                    **Provider name**: `WhitelistedNames`<br>
                    **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. Required if you specify <code>whitelist</code> for the value of <code>Forward</code>. A complex type that specifies how many different cookies you want CloudFront to forward to the origin for this cache behavior and, if you want to forward selected cookies, the names of those cookies. If you specify <code>all</code> or <code>none</code> for the value of <code>Forward</code>, omit <code>WhitelistedNames</code>. If you change the value of <code>Forward</code> from <code>whitelist</code> to <code>all</code> or <code>none</code> and you don't delete the <code>WhitelistedNames</code> element and its child elements, CloudFront deletes them automatically. For the current limit on the number of cookie names that you can whitelist for each cache behavior, see <a href="https://docs.aws.amazon.com/general/latest/gr/xrefaws_service_limits.html#limits_cloudfront"> CloudFront Limits</a> in the <i>Amazon Web Services General Reference</i>.<br>
                       - `items`<br>
                        **Type**: `UNORDERED_LIST_STRING`<br>
                        **Provider name**: `Items`<br>
                        **Description**: A list of cookie names.<br>
                       - `quantity`<br>
                        **Type**: `INT32`<br>
                        **Provider name**: `Quantity`<br>
                        **Description**: The number of cookie names in the <code>Items</code> list.<br>
               - `headers`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `Headers`<br>
                **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include headers in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send headers to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A complex type that specifies the <code>Headers</code>, if any, that you want CloudFront to forward to the origin for this cache behavior (whitelisted headers). For the headers that you specify, CloudFront also caches separate versions of a specified object that is based on the header values in viewer requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html"> Caching Content Based on Request Headers</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
                   - `items`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `Items`<br>
                    **Description**: A list of HTTP header names.<br>
                   - `quantity`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `Quantity`<br>
                    **Description**: The number of header names in the <code>Items</code> list.<br>
               - `query_string`<br>
                **Type**: `BOOLEAN`<br>
                **Provider name**: `QueryString`<br>
                **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. Indicates whether you want CloudFront to forward query strings to the origin that is associated with this cache behavior and cache based on the query string parameters. CloudFront behavior depends on the value of <code>QueryString</code> and on the values that you specify for <code>QueryStringCacheKeys</code>, if any: If you specify true for <code>QueryString</code> and you don't specify any values for <code>QueryStringCacheKeys</code>, CloudFront forwards all query string parameters to the origin and caches based on all query string parameters. Depending on how many query string parameters and values you have, this can adversely affect performance because CloudFront must forward more requests to the origin. If you specify true for <code>QueryString</code> and you specify one or more values for <code>QueryStringCacheKeys</code>, CloudFront forwards all query string parameters to the origin, but it only caches based on the query string parameters that you specify. If you specify false for <code>QueryString</code>, CloudFront doesn't forward any query string parameters to the origin, and doesn't cache based on query string parameters. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html">Configuring CloudFront to Cache Based on Query String Parameters</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `query_string_cache_keys`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `QueryStringCacheKeys`<br>
                **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A complex type that contains information about the query string parameters that you want CloudFront to use for caching for this cache behavior.<br>
                   - `items`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `Items`<br>
                    **Description**: A list that contains the query string parameters that you want CloudFront to use as a basis for caching for a cache behavior. If <code>Quantity</code> is 0, you can omit <code>Items</code>.<br>
                   - `quantity`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `Quantity`<br>
                    **Description**: The number of <code>whitelisted</code> query string parameters for a cache behavior.<br>
           - `function_associations`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `FunctionAssociations`<br>
            **Description**: A list of CloudFront functions that are associated with this cache behavior. CloudFront functions must be published to the <code>LIVE</code> stage to associate them with a cache behavior.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRUCT`<br>
                **Provider name**: `Items`<br>
                **Description**: The CloudFront functions that are associated with a cache behavior in a CloudFront distribution. CloudFront functions must be published to the <code>LIVE</code> stage to associate them with a cache behavior.<br>
                   - `event_type`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `EventType`<br>
                    **Description**: The event type of the function, either <code>viewer-request</code> or <code>viewer-response</code>. You cannot use origin-facing event types (<code>origin-request</code> and <code>origin-response</code>) with a CloudFront function.<br>
                   - `function_arn`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `FunctionARN`<br>
                    **Description**: The Amazon Resource Name (ARN) of the function.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of CloudFront functions in the list.<br>
           - `lambda_function_associations`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `LambdaFunctionAssociations`<br>
            **Description**: A complex type that contains zero or more Lambda@Edge function associations for a cache behavior.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRUCT`<br>
                **Provider name**: `Items`<br>
                **Description**: <b>Optional</b>: A complex type that contains <code>LambdaFunctionAssociation</code> items for this cache behavior. If <code>Quantity</code> is <code>0</code>, you can omit <code>Items</code>.<br>
                   - `event_type`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `EventType`<br>
                    **Description**: Specifies the event type that triggers a Lambda@Edge function invocation. You can specify the following values: <ul> <li>  <code>viewer-request</code>: The function executes when CloudFront receives a request from a viewer and before it checks to see whether the requested object is in the edge cache.  </li> <li>  <code>origin-request</code>: The function executes only when CloudFront sends a request to your origin. When the requested object is in the edge cache, the function doesn't execute. </li> <li>  <code>origin-response</code>: The function executes after CloudFront receives a response from the origin and before it caches the object in the response. When the requested object is in the edge cache, the function doesn't execute. </li> <li>  <code>viewer-response</code>: The function executes before CloudFront returns the requested object to the viewer. The function executes regardless of whether the object was already in the edge cache. If the origin returns an HTTP status code other than HTTP 200 (OK), the function doesn't execute. </li> </ul>
                   - `include_body`<br>
                    **Type**: `BOOLEAN`<br>
                    **Provider name**: `IncludeBody`<br>
                    **Description**: A flag that allows a Lambda@Edge function to have read access to the body content. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-include-body-access.html">Accessing the Request Body by Choosing the Include Body Option</a> in the Amazon CloudFront Developer Guide.<br>
                   - `lambda_function_arn`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `LambdaFunctionARN`<br>
                    **Description**: The ARN of the Lambda@Edge function. You must specify the ARN of a function version; you can't specify an alias or $LATEST.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of Lambda@Edge function associations for this cache behavior.<br>
           - `max_ttl`<br>
            **Type**: `INT64`<br>
            **Provider name**: `MaxTTL`<br>
            **Description**: This field is deprecated. We recommend that you use the <code>MaxTTL</code> field in a cache policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. The maximum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin adds HTTP headers such as <code>Cache-Control max-age</code>, <code>Cache-Control s-maxage</code>, and <code>Expires</code> to objects. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing How Long Content Stays in an Edge Cache (Expiration)</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `min_ttl`<br>
            **Type**: `INT64`<br>
            **Provider name**: `MinTTL`<br>
            **Description**: This field is deprecated. We recommend that you use the <code>MinTTL</code> field in a cache policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html"> Managing How Long Content Stays in an Edge Cache (Expiration)</a> in the <i> Amazon CloudFront Developer Guide</i>. You must specify <code>0</code> for <code>MinTTL</code> if you configure CloudFront to forward all headers to your origin (under <code>Headers</code>, if you specify <code>1</code> for <code>Quantity</code> and <code>*</code> for <code>Name</code>).<br>
           - `origin_request_policy_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `OriginRequestPolicyId`<br>
            **Description**: The unique identifier of the origin request policy that is attached to this cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">Using the managed origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `path_pattern`<br>
            **Type**: `STRING`<br>
            **Provider name**: `PathPattern`<br>
            **Description**: The pattern (for example, <code>images/*.jpg</code>) that specifies which requests to apply the behavior to. When CloudFront receives a viewer request, the requested path is compared with path patterns in the order in which cache behaviors are listed in the distribution. <note> You can optionally include a slash (<code>/</code>) at the beginning of the path pattern. For example, <code>/images/*.jpg</code>. CloudFront behavior is the same with or without the leading <code>/</code>. </note> The path pattern for the default cache behavior is <code>*</code> and cannot be changed. If the request for an object does not match the path pattern for any cache behaviors, CloudFront applies the behavior in the default cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesPathPattern">Path Pattern</a> in the <i> Amazon CloudFront Developer Guide</i>.<br>
           - `realtime_log_config_arn`<br>
            **Type**: `STRING`<br>
            **Provider name**: `RealtimeLogConfigArn`<br>
            **Description**: The Amazon Resource Name (ARN) of the real-time log configuration that is attached to this cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html">Real-time logs</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `response_headers_policy_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ResponseHeadersPolicyId`<br>
            **Description**: The identifier for a response headers policy.<br>
           - `smooth_streaming`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `SmoothStreaming`<br>
            **Description**: Indicates whether you want to distribute media files in the Microsoft Smooth Streaming format using the origin that is associated with this cache behavior. If so, specify <code>true</code>; if not, specify <code>false</code>. If you specify <code>true</code> for <code>SmoothStreaming</code>, you can still distribute other content using this cache behavior if the content matches the value of <code>PathPattern</code>.<br>
           - `target_origin_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `TargetOriginId`<br>
            **Description**: The value of <code>ID</code> for the origin that you want CloudFront to route requests to when they match this cache behavior.<br>
           - `trusted_key_groups`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `TrustedKeyGroups`<br>
            **Description**: A list of key groups that CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted key groups, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">Serving private content</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `enabled`<br>
                **Type**: `BOOLEAN`<br>
                **Provider name**: `Enabled`<br>
                **Description**: This field is <code>true</code> if any of the key groups in the list have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is <code>false</code>.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `Items`<br>
                **Description**: A list of key groups identifiers.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of key groups in the list.<br>
           - `trusted_signers`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `TrustedSigners`<br>
            **Description**: <important> We recommend using <code>TrustedKeyGroups</code> instead of <code>TrustedSigners</code>. </important> A list of Amazon Web Services account IDs whose public keys CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted signers, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with the private key of a CloudFront key pair in the trusted signer’s Amazon Web Services account. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">Serving private content</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `enabled`<br>
                **Type**: `BOOLEAN`<br>
                **Provider name**: `Enabled`<br>
                **Description**: This field is <code>true</code> if any of the Amazon Web Services accounts have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is <code>false</code>.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `Items`<br>
                **Description**: A list of Amazon Web Services account identifiers.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of Amazon Web Services accounts in the list.<br>
           - `viewer_protocol_policy`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ViewerProtocolPolicy`<br>
            **Description**: The protocol that viewers can use to access the files in the origin specified by <code>TargetOriginId</code> when a request matches the path pattern in <code>PathPattern</code>. You can specify the following options: <ul> <li>  <code>allow-all</code>: Viewers can use HTTP or HTTPS. </li> <li>  <code>redirect-to-https</code>: If a viewer submits an HTTP request, CloudFront returns an HTTP status code of 301 (Moved Permanently) to the viewer along with the HTTPS URL. The viewer then resubmits the request using the new URL.  </li> <li>  <code>https-only</code>: If a viewer sends an HTTP request, CloudFront returns an HTTP status code of 403 (Forbidden).  </li> </ul> For more information about requiring the HTTPS protocol, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html">Requiring HTTPS Between Viewers and CloudFront</a> in the <i>Amazon CloudFront Developer Guide</i>. <note> The only way to guarantee that viewers retrieve an object that was fetched from the origin using HTTPS is never to use any other protocol to fetch the object. If you have recently changed from HTTP to HTTPS, we recommend that you clear your objects’ cache because cached objects are protocol agnostic. That means that an edge location will return an object from the cache regardless of whether the current request protocol matches the protocol used previously. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing Cache Expiration</a> in the <i>Amazon CloudFront Developer Guide</i>. </note><br>
       - `quantity`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Quantity`<br>
        **Description**: The number of cache behaviors for this distribution.<br>
   - `caller_reference`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CallerReference`<br>
    **Description**: A unique value (for example, a date-time stamp) that ensures that the request can't be replayed. If the value of <code>CallerReference</code> is new (regardless of the content of the <code>DistributionConfig</code> object), CloudFront creates a new distribution. If <code>CallerReference</code> is a value that you already sent in a previous request to create a distribution, CloudFront returns a <code>DistributionAlreadyExists</code> error.<br>
   - `comment`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Comment`<br>
    **Description**: An optional comment to describe the distribution. The comment cannot be longer than 128 characters.<br>
   - `custom_error_responses`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `CustomErrorResponses`<br>
    **Description**: A complex type that controls the following: <ul> <li> Whether CloudFront replaces HTTP status codes in the 4xx and 5xx range with custom error messages before returning the response to the viewer. </li> <li> How long CloudFront caches HTTP status codes in the 4xx and 5xx range. </li> </ul> For more information about custom error pages, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html">Customizing Error Responses</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `items`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `Items`<br>
        **Description**: A complex type that contains a <code>CustomErrorResponse</code> element for each HTTP status code for which you want to specify a custom error page and/or a caching duration.<br>
           - `error_caching_min_ttl`<br>
            **Type**: `INT64`<br>
            **Provider name**: `ErrorCachingMinTTL`<br>
            **Description**: The minimum amount of time, in seconds, that you want CloudFront to cache the HTTP status code specified in <code>ErrorCode</code>. When this time period has elapsed, CloudFront queries your origin to see whether the problem that caused the error has been resolved and the requested object is now available. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html">Customizing Error Responses</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `error_code`<br>
            **Type**: `INT32`<br>
            **Provider name**: `ErrorCode`<br>
            **Description**: The HTTP status code for which you want to specify a custom error page and/or a caching duration.<br>
           - `response_code`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ResponseCode`<br>
            **Description**: The HTTP status code that you want CloudFront to return to the viewer along with the custom error page. There are a variety of reasons that you might want CloudFront to return a status code different from the status code that your origin returned to CloudFront, for example: <ul> <li> Some Internet devices (some firewalls and corporate proxies, for example) intercept HTTP 4xx and 5xx and prevent the response from being returned to the viewer. If you substitute <code>200</code>, the response typically won't be intercepted. </li> <li> If you don't care about distinguishing among different client errors or server errors, you can specify <code>400</code> or <code>500</code> as the <code>ResponseCode</code> for all 4xx or 5xx errors. </li> <li> You might want to return a <code>200</code> status code (OK) and static website so your customers don't know that your website is down. </li> </ul> If you specify a value for <code>ResponseCode</code>, you must also specify a value for <code>ResponsePagePath</code>.<br>
           - `response_page_path`<br>
            **Type**: `STRING`<br>
            **Provider name**: `ResponsePagePath`<br>
            **Description**: The path to the custom error page that you want CloudFront to return to a viewer when your origin returns the HTTP status code specified by <code>ErrorCode</code>, for example, <code>/4xx-errors/403-forbidden.html</code>. If you want to store your objects and your custom error pages in different locations, your distribution must include a cache behavior for which the following is true: <ul> <li> The value of <code>PathPattern</code> matches the path to your custom error messages. For example, suppose you saved custom error pages for 4xx errors in an Amazon S3 bucket in a directory named <code>/4xx-errors</code>. Your distribution must include a cache behavior for which the path pattern routes requests for your custom error pages to that location, for example, <code>/4xx-errors/*</code>.  </li> <li> The value of <code>TargetOriginId</code> specifies the value of the <code>ID</code> element for the origin that contains your custom error pages. </li> </ul> If you specify a value for <code>ResponsePagePath</code>, you must also specify a value for <code>ResponseCode</code>. We recommend that you store custom error pages in an Amazon S3 bucket. If you store custom error pages on an HTTP server and the server starts to return 5xx errors, CloudFront can't get the files that you want to return to viewers because the origin server is unavailable.<br>
       - `quantity`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Quantity`<br>
        **Description**: The number of HTTP status codes for which you want to specify a custom error page and/or a caching duration. If <code>Quantity</code> is <code>0</code>, you can omit <code>Items</code>.<br>
   - `default_cache_behavior`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `DefaultCacheBehavior`<br>
    **Description**: A complex type that describes the default cache behavior if you don't specify a <code>CacheBehavior</code> element or if files don't match any of the values of <code>PathPattern</code> in <code>CacheBehavior</code> elements. You must create exactly one default cache behavior.<br>
       - `allowed_methods`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `AllowedMethods`<br>
           - `cached_methods`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `CachedMethods`<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `Items`<br>
                **Description**: A complex type that contains the HTTP methods that you want CloudFront to cache responses to.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of HTTP methods for which you want CloudFront to cache responses. Valid values are <code>2</code> (for caching responses to <code>GET</code> and <code>HEAD</code> requests) and <code>3</code> (for caching responses to <code>GET</code>, <code>HEAD</code>, and <code>OPTIONS</code> requests).<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `Items`<br>
            **Description**: A complex type that contains the HTTP methods that you want CloudFront to process and forward to your origin.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of HTTP methods that you want CloudFront to forward to your origin. Valid values are 2 (for <code>GET</code> and <code>HEAD</code> requests), 3 (for <code>GET</code>, <code>HEAD</code>, and <code>OPTIONS</code> requests) and 7 (for <code>GET, HEAD, OPTIONS, PUT, PATCH, POST</code>, and <code>DELETE</code> requests).<br>
       - `cache_policy_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CachePolicyId`<br>
        **Description**: The unique identifier of the cache policy that is attached to the default cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A <code>DefaultCacheBehavior</code> must include either a <code>CachePolicyId</code> or <code>ForwardedValues</code>. We recommend that you use a <code>CachePolicyId</code>.<br>
       - `compress`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `Compress`<br>
        **Description**: Whether you want CloudFront to automatically compress certain files for this cache behavior. If so, specify <code>true</code>; if not, specify <code>false</code>. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html">Serving Compressed Files</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `default_ttl`<br>
        **Type**: `INT64`<br>
        **Provider name**: `DefaultTTL`<br>
        **Description**: This field is deprecated. We recommend that you use the <code>DefaultTTL</code> field in a cache policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. The default amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin does not add HTTP headers such as <code>Cache-Control max-age</code>, <code>Cache-Control s-maxage</code>, and <code>Expires</code> to objects. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing How Long Content Stays in an Edge Cache (Expiration)</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `field_level_encryption_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `FieldLevelEncryptionId`<br>
        **Description**: The value of <code>ID</code> for the field-level encryption configuration that you want CloudFront to use for encrypting specific fields of data for the default cache behavior.<br>
       - `forwarded_values`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `ForwardedValues`<br>
        **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/working-with-policies.html">Working with policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to include values in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send values to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">Using the managed origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A <code>DefaultCacheBehavior</code> must include either a <code>CachePolicyId</code> or <code>ForwardedValues</code>. We recommend that you use a <code>CachePolicyId</code>. A complex type that specifies how CloudFront handles query strings, cookies, and HTTP headers.<br>
           - `cookies`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `Cookies`<br>
            **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A complex type that specifies whether you want CloudFront to forward cookies to the origin and, if so, which ones. For more information about forwarding cookies to the origin, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html">How CloudFront Forwards, Caches, and Logs Cookies</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `forward`<br>
                **Type**: `STRING`<br>
                **Provider name**: `Forward`<br>
                **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send cookies to the origin but not include them in the cache key, use origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. Specifies which cookies to forward to the origin for this cache behavior: all, none, or the list of cookies specified in the <code>WhitelistedNames</code> complex type. Amazon S3 doesn't process cookies. When the cache behavior is forwarding requests to an Amazon S3 origin, specify none for the <code>Forward</code> element.<br>
               - `whitelisted_names`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `WhitelistedNames`<br>
                **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. Required if you specify <code>whitelist</code> for the value of <code>Forward</code>. A complex type that specifies how many different cookies you want CloudFront to forward to the origin for this cache behavior and, if you want to forward selected cookies, the names of those cookies. If you specify <code>all</code> or <code>none</code> for the value of <code>Forward</code>, omit <code>WhitelistedNames</code>. If you change the value of <code>Forward</code> from <code>whitelist</code> to <code>all</code> or <code>none</code> and you don't delete the <code>WhitelistedNames</code> element and its child elements, CloudFront deletes them automatically. For the current limit on the number of cookie names that you can whitelist for each cache behavior, see <a href="https://docs.aws.amazon.com/general/latest/gr/xrefaws_service_limits.html#limits_cloudfront"> CloudFront Limits</a> in the <i>Amazon Web Services General Reference</i>.<br>
                   - `items`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `Items`<br>
                    **Description**: A list of cookie names.<br>
                   - `quantity`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `Quantity`<br>
                    **Description**: The number of cookie names in the <code>Items</code> list.<br>
           - `headers`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `Headers`<br>
            **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include headers in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send headers to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A complex type that specifies the <code>Headers</code>, if any, that you want CloudFront to forward to the origin for this cache behavior (whitelisted headers). For the headers that you specify, CloudFront also caches separate versions of a specified object that is based on the header values in viewer requests. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html"> Caching Content Based on Request Headers</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `Items`<br>
                **Description**: A list of HTTP header names.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of header names in the <code>Items</code> list.<br>
           - `query_string`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `QueryString`<br>
            **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. Indicates whether you want CloudFront to forward query strings to the origin that is associated with this cache behavior and cache based on the query string parameters. CloudFront behavior depends on the value of <code>QueryString</code> and on the values that you specify for <code>QueryStringCacheKeys</code>, if any: If you specify true for <code>QueryString</code> and you don't specify any values for <code>QueryStringCacheKeys</code>, CloudFront forwards all query string parameters to the origin and caches based on all query string parameters. Depending on how many query string parameters and values you have, this can adversely affect performance because CloudFront must forward more requests to the origin. If you specify true for <code>QueryString</code> and you specify one or more values for <code>QueryStringCacheKeys</code>, CloudFront forwards all query string parameters to the origin, but it only caches based on the query string parameters that you specify. If you specify false for <code>QueryString</code>, CloudFront doesn't forward any query string parameters to the origin, and doesn't cache based on query string parameters. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html">Configuring CloudFront to Cache Based on Query String Parameters</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `query_string_cache_keys`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `QueryStringCacheKeys`<br>
            **Description**: This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>. A complex type that contains information about the query string parameters that you want CloudFront to use for caching for this cache behavior.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRING`<br>
                **Provider name**: `Items`<br>
                **Description**: A list that contains the query string parameters that you want CloudFront to use as a basis for caching for a cache behavior. If <code>Quantity</code> is 0, you can omit <code>Items</code>.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of <code>whitelisted</code> query string parameters for a cache behavior.<br>
       - `function_associations`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `FunctionAssociations`<br>
        **Description**: A list of CloudFront functions that are associated with this cache behavior. CloudFront functions must be published to the <code>LIVE</code> stage to associate them with a cache behavior.<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRUCT`<br>
            **Provider name**: `Items`<br>
            **Description**: The CloudFront functions that are associated with a cache behavior in a CloudFront distribution. CloudFront functions must be published to the <code>LIVE</code> stage to associate them with a cache behavior.<br>
               - `event_type`<br>
                **Type**: `STRING`<br>
                **Provider name**: `EventType`<br>
                **Description**: The event type of the function, either <code>viewer-request</code> or <code>viewer-response</code>. You cannot use origin-facing event types (<code>origin-request</code> and <code>origin-response</code>) with a CloudFront function.<br>
               - `function_arn`<br>
                **Type**: `STRING`<br>
                **Provider name**: `FunctionARN`<br>
                **Description**: The Amazon Resource Name (ARN) of the function.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of CloudFront functions in the list.<br>
       - `lambda_function_associations`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `LambdaFunctionAssociations`<br>
        **Description**: A complex type that contains zero or more Lambda@Edge function associations for a cache behavior.<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRUCT`<br>
            **Provider name**: `Items`<br>
            **Description**: <b>Optional</b>: A complex type that contains <code>LambdaFunctionAssociation</code> items for this cache behavior. If <code>Quantity</code> is <code>0</code>, you can omit <code>Items</code>.<br>
               - `event_type`<br>
                **Type**: `STRING`<br>
                **Provider name**: `EventType`<br>
                **Description**: Specifies the event type that triggers a Lambda@Edge function invocation. You can specify the following values: <ul> <li>  <code>viewer-request</code>: The function executes when CloudFront receives a request from a viewer and before it checks to see whether the requested object is in the edge cache.  </li> <li>  <code>origin-request</code>: The function executes only when CloudFront sends a request to your origin. When the requested object is in the edge cache, the function doesn't execute. </li> <li>  <code>origin-response</code>: The function executes after CloudFront receives a response from the origin and before it caches the object in the response. When the requested object is in the edge cache, the function doesn't execute. </li> <li>  <code>viewer-response</code>: The function executes before CloudFront returns the requested object to the viewer. The function executes regardless of whether the object was already in the edge cache. If the origin returns an HTTP status code other than HTTP 200 (OK), the function doesn't execute. </li> </ul>
               - `include_body`<br>
                **Type**: `BOOLEAN`<br>
                **Provider name**: `IncludeBody`<br>
                **Description**: A flag that allows a Lambda@Edge function to have read access to the body content. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-include-body-access.html">Accessing the Request Body by Choosing the Include Body Option</a> in the Amazon CloudFront Developer Guide.<br>
               - `lambda_function_arn`<br>
                **Type**: `STRING`<br>
                **Provider name**: `LambdaFunctionARN`<br>
                **Description**: The ARN of the Lambda@Edge function. You must specify the ARN of a function version; you can't specify an alias or $LATEST.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of Lambda@Edge function associations for this cache behavior.<br>
       - `max_ttl`<br>
        **Type**: `INT64`<br>
        **Provider name**: `MaxTTL`<br>
        **Description**: This field is deprecated. We recommend that you use the <code>MaxTTL</code> field in a cache policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. The maximum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin adds HTTP headers such as <code>Cache-Control max-age</code>, <code>Cache-Control s-maxage</code>, and <code>Expires</code> to objects. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing How Long Content Stays in an Edge Cache (Expiration)</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `min_ttl`<br>
        **Type**: `INT64`<br>
        **Provider name**: `MinTTL`<br>
        **Description**: This field is deprecated. We recommend that you use the <code>MinTTL</code> field in a cache policy instead of this field. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy">Creating cache policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html">Using the managed cache policies</a> in the <i>Amazon CloudFront Developer Guide</i>. The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing How Long Content Stays in an Edge Cache (Expiration)</a> in the <i>Amazon CloudFront Developer Guide</i>. You must specify <code>0</code> for <code>MinTTL</code> if you configure CloudFront to forward all headers to your origin (under <code>Headers</code>, if you specify <code>1</code> for <code>Quantity</code> and <code>*</code> for <code>Name</code>).<br>
       - `origin_request_policy_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `OriginRequestPolicyId`<br>
        **Description**: The unique identifier of the origin request policy that is attached to the default cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy">Creating origin request policies</a> or <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html">Using the managed origin request policies</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `realtime_log_config_arn`<br>
        **Type**: `STRING`<br>
        **Provider name**: `RealtimeLogConfigArn`<br>
        **Description**: The Amazon Resource Name (ARN) of the real-time log configuration that is attached to this cache behavior. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html">Real-time logs</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `response_headers_policy_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ResponseHeadersPolicyId`<br>
        **Description**: The identifier for a response headers policy.<br>
       - `smooth_streaming`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `SmoothStreaming`<br>
        **Description**: Indicates whether you want to distribute media files in the Microsoft Smooth Streaming format using the origin that is associated with this cache behavior. If so, specify <code>true</code>; if not, specify <code>false</code>. If you specify <code>true</code> for <code>SmoothStreaming</code>, you can still distribute other content using this cache behavior if the content matches the value of <code>PathPattern</code>.<br>
       - `target_origin_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `TargetOriginId`<br>
        **Description**: The value of <code>ID</code> for the origin that you want CloudFront to route requests to when they use the default cache behavior.<br>
       - `trusted_key_groups`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `TrustedKeyGroups`<br>
        **Description**: A list of key groups that CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted key groups, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">Serving private content</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `Enabled`<br>
            **Description**: This field is <code>true</code> if any of the key groups in the list have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is <code>false</code>.<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `Items`<br>
            **Description**: A list of key groups identifiers.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of key groups in the list.<br>
       - `trusted_signers`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `TrustedSigners`<br>
        **Description**: <important> We recommend using <code>TrustedKeyGroups</code> instead of <code>TrustedSigners</code>. </important> A list of Amazon Web Services account IDs whose public keys CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted signers, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with the private key of a CloudFront key pair in a trusted signer’s Amazon Web Services account. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">Serving private content</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `enabled`<br>
            **Type**: `BOOLEAN`<br>
            **Provider name**: `Enabled`<br>
            **Description**: This field is <code>true</code> if any of the Amazon Web Services accounts have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is <code>false</code>.<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `Items`<br>
            **Description**: A list of Amazon Web Services account identifiers.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: The number of Amazon Web Services accounts in the list.<br>
       - `viewer_protocol_policy`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ViewerProtocolPolicy`<br>
        **Description**: The protocol that viewers can use to access the files in the origin specified by <code>TargetOriginId</code> when a request matches the path pattern in <code>PathPattern</code>. You can specify the following options: <ul> <li>  <code>allow-all</code>: Viewers can use HTTP or HTTPS. </li> <li>  <code>redirect-to-https</code>: If a viewer submits an HTTP request, CloudFront returns an HTTP status code of 301 (Moved Permanently) to the viewer along with the HTTPS URL. The viewer then resubmits the request using the new URL. </li> <li>  <code>https-only</code>: If a viewer sends an HTTP request, CloudFront returns an HTTP status code of 403 (Forbidden). </li> </ul> For more information about requiring the HTTPS protocol, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html">Requiring HTTPS Between Viewers and CloudFront</a> in the <i>Amazon CloudFront Developer Guide</i>. <note> The only way to guarantee that viewers retrieve an object that was fetched from the origin using HTTPS is never to use any other protocol to fetch the object. If you have recently changed from HTTP to HTTPS, we recommend that you clear your objects’ cache because cached objects are protocol agnostic. That means that an edge location will return an object from the cache regardless of whether the current request protocol matches the protocol used previously. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">Managing Cache Expiration</a> in the <i>Amazon CloudFront Developer Guide</i>. </note><br>
   - `default_root_object`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DefaultRootObject`<br>
    **Description**: The object that you want CloudFront to request from your origin (for example, <code>index.html</code>) when a viewer requests the root URL for your distribution (<code>http://www.example.com</code>) instead of an object in your distribution (<code>http://www.example.com/product-description.html</code>). Specifying a default root object avoids exposing the contents of your distribution. Specify only the object name, for example, <code>index.html</code>. Don't add a <code>/</code> before the object name. If you don't want to specify a default root object when you create a distribution, include an empty <code>DefaultRootObject</code> element. To delete the default root object from an existing distribution, update the distribution configuration and include an empty <code>DefaultRootObject</code> element. To replace the default root object, update the distribution configuration and specify the new object. For more information about the default root object, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html">Creating a Default Root Object</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: From this field, you can enable or disable the selected distribution.<br>
   - `http_version`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HttpVersion`<br>
    **Description**: (Optional) Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront. The default value for new web distributions is http2. Viewers that don't support HTTP/2 automatically use an earlier HTTP version. For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support Server Name Identification (SNI). In general, configuring CloudFront to communicate with viewers using HTTP/2 reduces latency. You can improve performance by optimizing for HTTP/2. For more information, do an Internet search for "http/2 optimization."<br>
   - `is_ipv6_enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IsIPV6Enabled`<br>
    **Description**: If you want CloudFront to respond to IPv6 DNS requests with an IPv6 address for your distribution, specify <code>true</code>. If you specify <code>false</code>, CloudFront responds to IPv6 DNS requests with the DNS response code <code>NOERROR</code> and with no IP addresses. This allows viewers to submit a second request, for an IPv4 address for your distribution.  In general, you should enable IPv6 if you have users on IPv6 networks who want to access your content. However, if you're using signed URLs or signed cookies to restrict access to your content, and if you're using a custom policy that includes the <code>IpAddress</code> parameter to restrict the IP addresses that can access your content, don't enable IPv6. If you want to restrict access to some content by IP address and not restrict access to other content (or restrict access but not by IP address), you can create two distributions. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html">Creating a Signed URL Using a Custom Policy</a> in the <i>Amazon CloudFront Developer Guide</i>. If you're using an Route 53 Amazon Web Services Integration alias resource record set to route traffic to your CloudFront distribution, you need to create a second alias resource record set when both of the following are true: <ul> <li> You enable IPv6 for the distribution </li> <li> You're using alternate domain names in the URLs for your objects </li> </ul> For more information, see <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html">Routing Traffic to an Amazon CloudFront Web Distribution by Using Your Domain Name</a> in the <i>Route 53 Amazon Web Services Integration Developer Guide</i>. If you created a CNAME resource record set, either with Route 53 Amazon Web Services Integration or with another DNS service, you don't need to make any changes. A CNAME record will route traffic to your distribution regardless of the IP address format of the viewer request.<br>
   - `logging`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Logging`<br>
    **Description**: A complex type that controls whether access logs are written for the distribution. For more information about logging, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html">Access Logs</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `bucket`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Bucket`<br>
        **Description**: The Amazon S3 bucket to store the access logs in, for example, <code>myawslogbucket.s3.amazonaws.com</code>.<br>
       - `enabled`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `Enabled`<br>
        **Description**: Specifies whether you want CloudFront to save access logs to an Amazon S3 bucket. If you don't want to enable logging when you create a distribution or if you want to disable logging for an existing distribution, specify <code>false</code> for <code>Enabled</code>, and specify empty <code>Bucket</code> and <code>Prefix</code> elements. If you specify <code>false</code> for <code>Enabled</code> but you specify values for <code>Bucket</code>, <code>prefix</code>, and <code>IncludeCookies</code>, the values are automatically deleted.<br>
       - `include_cookies`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `IncludeCookies`<br>
        **Description**: Specifies whether you want CloudFront to include cookies in access logs, specify <code>true</code> for <code>IncludeCookies</code>. If you choose to include cookies in logs, CloudFront logs all cookies regardless of how you configure the cache behaviors for this distribution. If you don't want to include cookies when you create a distribution or if you want to disable include cookies for an existing distribution, specify <code>false</code> for <code>IncludeCookies</code>.<br>
       - `prefix`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Prefix`<br>
        **Description**: An optional string that you want CloudFront to prefix to the access log <code>filenames</code> for this distribution, for example, <code>myprefix/</code>. If you want to enable logging, but you don't want to specify a prefix, you still must include an empty <code>Prefix</code> element in the <code>Logging</code> element.<br>
   - `origin_groups`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `OriginGroups`<br>
    **Description**: A complex type that contains information about origin groups for this distribution.<br>
       - `items`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `Items`<br>
        **Description**: The items (origin groups) in a distribution.<br>
           - `failover_criteria`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `FailoverCriteria`<br>
            **Description**: A complex type that contains information about the failover criteria for an origin group.<br>
               - `status_codes`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `StatusCodes`<br>
                **Description**: The status codes that, when returned from the primary origin, will trigger CloudFront to failover to the second origin.<br>
                   - `items`<br>
                    **Type**: `UNORDERED_LIST_INT32`<br>
                    **Provider name**: `Items`<br>
                    **Description**: The items (status codes) for an origin group.<br>
                   - `quantity`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `Quantity`<br>
                    **Description**: The number of status codes.<br>
           - `id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Id`<br>
            **Description**: The origin group's ID.<br>
           - `members`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `Members`<br>
            **Description**: A complex type that contains information about the origins in an origin group.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRUCT`<br>
                **Provider name**: `Items`<br>
                **Description**: Items (origins) in an origin group.<br>
                   - `origin_id`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `OriginId`<br>
                    **Description**: The ID for an origin in an origin group.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of origins in an origin group.<br>
       - `quantity`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Quantity`<br>
        **Description**: The number of origin groups.<br>
   - `origins`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Origins`<br>
    **Description**: A complex type that contains information about origins for this distribution.<br>
       - `items`<br>
        **Type**: `UNORDERED_LIST_STRUCT`<br>
        **Provider name**: `Items`<br>
        **Description**: A list of origins.<br>
           - `connection_attempts`<br>
            **Type**: `INT32`<br>
            **Provider name**: `ConnectionAttempts`<br>
            **Description**: The number of times that CloudFront attempts to connect to the origin. The minimum number is 1, the maximum is 3, and the default (if you don’t specify otherwise) is 3. For a custom origin (including an Amazon S3 bucket that’s configured with static website hosting), this value also specifies the number of times that CloudFront attempts to get a response from the origin, in the case of an <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout">Origin Response Timeout</a>. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-attempts">Origin Connection Attempts</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `connection_timeout`<br>
            **Type**: `INT32`<br>
            **Provider name**: `ConnectionTimeout`<br>
            **Description**: The number of seconds that CloudFront waits when trying to establish a connection to the origin. The minimum timeout is 1 second, the maximum is 10 seconds, and the default (if you don’t specify otherwise) is 10 seconds. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-timeout">Origin Connection Timeout</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `custom_headers`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `CustomHeaders`<br>
            **Description**: A list of HTTP header names and values that CloudFront adds to the requests that it sends to the origin. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html">Adding Custom Headers to Origin Requests</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `items`<br>
                **Type**: `UNORDERED_LIST_STRUCT`<br>
                **Provider name**: `Items`<br>
                **Description**: <b>Optional</b>: A list that contains one <code>OriginCustomHeader</code> element for each custom header that you want CloudFront to forward to the origin. If Quantity is <code>0</code>, omit <code>Items</code>.<br>
                   - `header_name`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `HeaderName`<br>
                    **Description**: The name of a header that you want CloudFront to send to your origin. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/forward-custom-headers.html">Adding Custom Headers to Origin Requests</a> in the <i> Amazon CloudFront Developer Guide</i>.<br>
                   - `header_value`<br>
                    **Type**: `STRING`<br>
                    **Provider name**: `HeaderValue`<br>
                    **Description**: The value for the header that you specified in the <code>HeaderName</code> field.<br>
               - `quantity`<br>
                **Type**: `INT32`<br>
                **Provider name**: `Quantity`<br>
                **Description**: The number of custom headers, if any, for this distribution.<br>
           - `custom_origin_config`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `CustomOriginConfig`<br>
            **Description**: Use this type to specify an origin that is not an Amazon S3 bucket, with one exception. If the Amazon S3 bucket is configured with static website hosting, use this type. If the Amazon S3 bucket is not configured with static website hosting, use the <code>S3OriginConfig</code> type instead.<br>
               - `http_port`<br>
                **Type**: `INT32`<br>
                **Provider name**: `HTTPPort`<br>
                **Description**: The HTTP port that CloudFront uses to connect to the origin. Specify the HTTP port that the origin listens on.<br>
               - `https_port`<br>
                **Type**: `INT32`<br>
                **Provider name**: `HTTPSPort`<br>
                **Description**: The HTTPS port that CloudFront uses to connect to the origin. Specify the HTTPS port that the origin listens on.<br>
               - `origin_keepalive_timeout`<br>
                **Type**: `INT32`<br>
                **Provider name**: `OriginKeepaliveTimeout`<br>
                **Description**: Specifies how long, in seconds, CloudFront persists its connection to the origin. The minimum timeout is 1 second, the maximum is 60 seconds, and the default (if you don’t specify otherwise) is 5 seconds. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginKeepaliveTimeout">Origin Keep-alive Timeout</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `origin_protocol_policy`<br>
                **Type**: `STRING`<br>
                **Provider name**: `OriginProtocolPolicy`<br>
                **Description**: Specifies the protocol (HTTP or HTTPS) that CloudFront uses to connect to the origin. Valid values are: <ul> <li>  <code>http-only</code> – CloudFront always uses HTTP to connect to the origin. </li> <li>  <code>match-viewer</code> – CloudFront connects to the origin using the same protocol that the viewer used to connect to CloudFront. </li> <li>  <code>https-only</code> – CloudFront always uses HTTPS to connect to the origin. </li> </ul>
               - `origin_read_timeout`<br>
                **Type**: `INT32`<br>
                **Provider name**: `OriginReadTimeout`<br>
                **Description**: Specifies how long, in seconds, CloudFront waits for a response from the origin. This is also known as the <i>origin response timeout</i>. The minimum timeout is 1 second, the maximum is 60 seconds, and the default (if you don’t specify otherwise) is 30 seconds. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout">Origin Response Timeout</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `origin_ssl_protocols`<br>
                **Type**: `STRUCT`<br>
                **Provider name**: `OriginSslProtocols`<br>
                **Description**: Specifies the minimum SSL/TLS protocol that CloudFront uses when connecting to your origin over HTTPS. Valid values include <code>SSLv3</code>, <code>TLSv1</code>, <code>TLSv1.1</code>, and <code>TLSv1.2</code>. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginSSLProtocols">Minimum Origin SSL Protocol</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
                   - `items`<br>
                    **Type**: `UNORDERED_LIST_STRING`<br>
                    **Provider name**: `Items`<br>
                    **Description**: A list that contains allowed SSL/TLS protocols for this distribution.<br>
                   - `quantity`<br>
                    **Type**: `INT32`<br>
                    **Provider name**: `Quantity`<br>
                    **Description**: The number of SSL/TLS protocols that you want to allow CloudFront to use when establishing an HTTPS connection with this origin.<br>
           - `domain_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `DomainName`<br>
            **Description**: The domain name for the origin. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesDomainName">Origin Domain Name</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `Id`<br>
            **Description**: A unique identifier for the origin. This value must be unique within the distribution. Use this value to specify the <code>TargetOriginId</code> in a <code>CacheBehavior</code> or <code>DefaultCacheBehavior</code>.<br>
           - `origin_path`<br>
            **Type**: `STRING`<br>
            **Provider name**: `OriginPath`<br>
            **Description**: An optional path that CloudFront appends to the origin domain name when CloudFront requests content from the origin. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginPath">Origin Path</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `origin_shield`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `OriginShield`<br>
            **Description**: CloudFront Origin Shield. Using Origin Shield can help reduce the load on your origin. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html">Using Origin Shield</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
               - `enabled`<br>
                **Type**: `BOOLEAN`<br>
                **Provider name**: `Enabled`<br>
                **Description**: A flag that specifies whether Origin Shield is enabled. When it’s enabled, CloudFront routes all requests through Origin Shield, which can help protect your origin. When it’s disabled, CloudFront might send requests directly to your origin from multiple edge locations or regional edge caches.<br>
               - `origin_shield_region`<br>
                **Type**: `STRING`<br>
                **Provider name**: `OriginShieldRegion`<br>
                **Description**: The Amazon Web Services Region for Origin Shield. Specify the Amazon Web Services Region that has the lowest latency to your origin. To specify a region, use the region code, not the region name. For example, specify the US East (Ohio) region as <code>us-east-2</code>. When you enable CloudFront Origin Shield, you must specify the Amazon Web Services Region for Origin Shield. For the list of Amazon Web Services Regions that you can specify, and for help choosing the best Region for your origin, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#choose-origin-shield-region">Choosing the Amazon Web Services Region for Origin Shield</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
           - `s3_origin_config`<br>
            **Type**: `STRUCT`<br>
            **Provider name**: `S3OriginConfig`<br>
            **Description**: Use this type to specify an origin that is an Amazon S3 bucket that is not configured with static website hosting. To specify any other type of origin, including an Amazon S3 bucket that is configured with static website hosting, use the <code>CustomOriginConfig</code> type instead.<br>
               - `origin_access_identity`<br>
                **Type**: `STRING`<br>
                **Provider name**: `OriginAccessIdentity`<br>
                **Description**: The CloudFront origin access identity to associate with the origin. Use an origin access identity to configure the origin so that viewers can <i>only</i> access objects in an Amazon S3 bucket through CloudFront. The format of the value is: origin-access-identity/cloudfront/<i>ID-of-origin-access-identity</i>  where <code> <i>ID-of-origin-access-identity</i> </code> is the value that CloudFront returned in the <code>ID</code> element when you created the origin access identity. If you want viewers to be able to access objects using either the CloudFront URL or the Amazon S3 URL, specify an empty <code>OriginAccessIdentity</code> element. To delete the origin access identity from an existing distribution, update the distribution configuration and include an empty <code>OriginAccessIdentity</code> element. To replace the origin access identity, update the distribution configuration and specify the new origin access identity. For more information about the origin access identity, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html">Serving Private Content through CloudFront</a> in the <i>Amazon CloudFront Developer Guide</i>.<br>
       - `quantity`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Quantity`<br>
        **Description**: The number of origins for this distribution.<br>
   - `price_class`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PriceClass`<br>
    **Description**: The price class that corresponds with the maximum price that you want to pay for CloudFront service. If you specify <code>PriceClass_All</code>, CloudFront responds to requests for your objects from all CloudFront edge locations. If you specify a price class other than <code>PriceClass_All</code>, CloudFront serves your objects from the CloudFront edge location that has the lowest latency among the edge locations in your price class. Viewers who are in or near regions that are excluded from your specified price class may encounter slower performance. For more information about price classes, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html">Choosing the Price Class for a CloudFront Distribution</a> in the <i>Amazon CloudFront Developer Guide</i>. For information about CloudFront pricing, including how price classes (such as Price Class 100) map to CloudFront regions, see <a href="http://aws.amazon.com/cloudfront/pricing/">Amazon CloudFront Pricing</a>.<br>
   - `restrictions`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Restrictions`<br>
    **Description**: A complex type that identifies ways in which you want to restrict distribution of your content.<br>
       - `geo_restriction`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `GeoRestriction`<br>
        **Description**: A complex type that controls the countries in which your content is distributed. CloudFront determines the location of your users using <code>MaxMind</code> GeoIP databases.<br>
           - `items`<br>
            **Type**: `UNORDERED_LIST_STRING`<br>
            **Provider name**: `Items`<br>
            **Description**: A complex type that contains a <code>Location</code> element for each country in which you want CloudFront either to distribute your content (<code>whitelist</code>) or not distribute your content (<code>blacklist</code>). The <code>Location</code> element is a two-letter, uppercase country code for a country that you want to include in your <code>blacklist</code> or <code>whitelist</code>. Include one <code>Location</code> element for each country. CloudFront and <code>MaxMind</code> both use <code>ISO 3166</code> country codes. For the current list of countries and the corresponding codes, see <code>ISO 3166-1-alpha-2</code> code on the <i>International Organization for Standardization</i> website. You can also refer to the country list on the CloudFront console, which includes both country names and codes.<br>
           - `quantity`<br>
            **Type**: `INT32`<br>
            **Provider name**: `Quantity`<br>
            **Description**: When geo restriction is <code>enabled</code>, this is the number of countries in your <code>whitelist</code> or <code>blacklist</code>. Otherwise, when it is not enabled, <code>Quantity</code> is <code>0</code>, and you can omit <code>Items</code>.<br>
           - `restriction_type`<br>
            **Type**: `STRING`<br>
            **Provider name**: `RestrictionType`<br>
            **Description**: The method that you want to use to restrict distribution of your content by country: <ul> <li>  <code>none</code>: No geo restriction is enabled, meaning access to content is not restricted by client geo location. </li> <li>  <code>blacklist</code>: The <code>Location</code> elements specify the countries in which you don't want CloudFront to distribute your content. </li> <li>  <code>whitelist</code>: The <code>Location</code> elements specify the countries in which you want CloudFront to distribute your content. </li> </ul>
   - `viewer_certificate`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ViewerCertificate`<br>
    **Description**: A complex type that determines the distribution’s SSL/TLS configuration for communicating with viewers.<br>
       - `acm_certificate_arn`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ACMCertificateArn`<br>
        **Description**: If the distribution uses <code>Aliases</code> (alternate domain names or CNAMEs) and the SSL/TLS certificate is stored in <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">Certificate Manager (ACM)</a>, provide the Amazon Resource Name (ARN) of the ACM certificate. CloudFront only supports ACM certificates in the US East (N. Virginia) Region (<code>us-east-1</code>). If you specify an ACM certificate ARN, you must also specify values for <code>MinimumProtocolVersion</code> and <code>SSLSupportMethod</code>.<br>
       - `certificate`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Certificate`<br>
        **Description**: This field is deprecated. Use one of the following fields instead: <ul> <li>  <code>ACMCertificateArn</code>  </li> <li>  <code>IAMCertificateId</code>  </li> <li>  <code>CloudFrontDefaultCertificate</code>  </li> </ul>
       - `certificate_source`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CertificateSource`<br>
        **Description**: This field is deprecated. Use one of the following fields instead: <ul> <li>  <code>ACMCertificateArn</code>  </li> <li>  <code>IAMCertificateId</code>  </li> <li>  <code>CloudFrontDefaultCertificate</code>  </li> </ul>
       - `cloud_front_default_certificate`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `CloudFrontDefaultCertificate`<br>
        **Description**: If the distribution uses the CloudFront domain name such as <code>d111111abcdef8.cloudfront.net</code>, set this field to <code>true</code>. If the distribution uses <code>Aliases</code> (alternate domain names or CNAMEs), set this field to <code>false</code> and specify values for the following fields: <ul> <li>  <code>ACMCertificateArn</code> or <code>IAMCertificateId</code> (specify a value for one, not both) </li> <li>  <code>MinimumProtocolVersion</code>  </li> <li>  <code>SSLSupportMethod</code>  </li> </ul>
       - `iam_certificate_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `IAMCertificateId`<br>
        **Description**: If the distribution uses <code>Aliases</code> (alternate domain names or CNAMEs) and the SSL/TLS certificate is stored in <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html">Identity and Access Management (IAM)</a>, provide the ID of the IAM certificate. If you specify an IAM certificate ID, you must also specify values for <code>MinimumProtocolVersion</code> and <code>SSLSupportMethod</code>.<br>
       - `minimum_protocol_version`<br>
        **Type**: `STRING`<br>
        **Provider name**: `MinimumProtocolVersion`<br>
        **Description**: If the distribution uses <code>Aliases</code> (alternate domain names or CNAMEs), specify the security policy that you want CloudFront to use for HTTPS connections with viewers. The security policy determines two settings: <ul> <li> The minimum SSL/TLS protocol that CloudFront can use to communicate with viewers. </li> <li> The ciphers that CloudFront can use to encrypt the content that it returns to viewers. </li> </ul> For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValues-security-policy">Security Policy</a> and <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html#secure-connections-supported-ciphers">Supported Protocols and Ciphers Between Viewers and CloudFront</a> in the <i>Amazon CloudFront Developer Guide</i>. <note> On the CloudFront console, this setting is called <b>Security Policy</b>. </note> When you’re using SNI only (you set <code>SSLSupportMethod</code> to <code>sni-only</code>), you must specify <code>TLSv1</code> or higher. If the distribution uses the CloudFront domain name such as <code>d111111abcdef8.cloudfront.net</code> (you set <code>CloudFrontDefaultCertificate</code> to <code>true</code>), CloudFront automatically sets the security policy to <code>TLSv1</code> regardless of the value that you set here.<br>
       - `ssl_support_method`<br>
        **Type**: `STRING`<br>
        **Provider name**: `SSLSupportMethod`<br>
        **Description**: If the distribution uses <code>Aliases</code> (alternate domain names or CNAMEs), specify which viewers the distribution accepts HTTPS connections from. <ul> <li>  <code>sni-only</code> – The distribution accepts HTTPS connections from only viewers that support <a href="https://en.wikipedia.org/wiki/Server_Name_Indication">server name indication (SNI)</a>. This is recommended. Most browsers and clients support SNI. </li> <li>  <code>vip</code> – The distribution accepts HTTPS connections from all viewers including those that don’t support SNI. This is not recommended, and results in additional monthly charges from CloudFront. </li> <li>  <code>static-ip</code> - Do not specify this value unless your distribution has been enabled for this feature by the CloudFront team. If you have a use case that requires static IP addresses for a distribution, contact CloudFront through the <a href="https://console.aws.amazon.com/support/home">Amazon Web Services Support Center</a>. </li> </ul> If the distribution uses the CloudFront domain name such as <code>d111111abcdef8.cloudfront.net</code>, don’t set a value for this field.<br>
   - `web_acl_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `WebACLId`<br>
    **Description**: A unique identifier that specifies the WAF web ACL, if any, to associate with this distribution. To specify a web ACL created using the latest version of WAF, use the ACL ARN, for example <code>arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a</code>. To specify a web ACL created using WAF Classic, use the ACL ID, for example <code>473e64fd-f30b-4765-81a0-62ad96dd167a</code>. WAF is a web application firewall that lets you monitor the HTTP and HTTPS requests that are forwarded to CloudFront, and lets you control access to your content. Based on conditions that you specify, such as the IP addresses that requests originate from or the values of query strings, CloudFront responds to requests either with the requested content or with an HTTP 403 status code (Forbidden). You can also configure CloudFront to return a custom error page when a request is blocked. For more information about WAF, see the <a href="https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html">WAF Developer Guide</a>.<br>
## `domain_name`
**Type**: `STRING`<br>
**Provider name**: `DomainName`<br>
**Description**: The domain name corresponding to the distribution, for example, <code>d111111abcdef8.cloudfront.net</code>.<br>
## `id`
**Type**: `STRING`<br>
**Provider name**: `Id`<br>
**Description**: The identifier for the distribution. For example: <code>EDFDVBD632BHDS5</code>.<br>
## `in_progress_invalidation_batches`
**Type**: `INT32`<br>
**Provider name**: `InProgressInvalidationBatches`<br>
**Description**: The number of invalidation batches currently in progress.<br>
## `last_modified_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `LastModifiedTime`<br>
**Description**: The date and time the distribution was last modified.<br>
## `status`
**Type**: `STRING`<br>
**Provider name**: `Status`<br>
**Description**: This response element indicates the current status of the distribution. When the status is <code>Deployed</code>, the distribution's information is fully propagated to all CloudFront edge locations.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
