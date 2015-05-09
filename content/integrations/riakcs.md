---
title: Datadog-RiakCS Integration
integration_title: RiakCS

kind: integration
---

### Overview
{: #int-overview}

Capture Riak CS (Cloud Storage) metrics in Datadog to:

* Visualize key RiakCS metrics.
* Correlate RiakCS performance with the rest of your applications.

### Configuration

To configure the RiakCS integration, copy riakcs.yaml.example if the conf.d directory to riakcs.yaml and make the appropriate changes.

    init_config:

    instances:
      - access_id: access-key
        access_secret: access-secret
        #is_secure: True # Uncomment and change to false if you are not using ssl
        #host: localhost # Hostname/IP of your riakcs node
        #port: 8080 # port used by your riakcs node
        #s3_root: s3.amazonaws.com # 


### Available Metrics

    riakcs.block_delete.latency_95
    riakcs.block_delete.latency_99
    riakcs.block_delete.latency_mean
    riakcs.block_delete.latency_median
    riakcs.block_delete.meter_count
    riakcs.block_delete.meter_rate
    riakcs.block_get.latency_95
    riakcs.block_get.latency_99
    riakcs.block_get.latency_mean
    riakcs.block_get.latency_median
    riakcs.block_get.meter_count
    riakcs.block_get.meter_rate
    riakcs.block_get_retry.latency_95
    riakcs.block_get_retry.latency_99
    riakcs.block_get_retry.latency_mean
    riakcs.block_get_retry.latency_median
    riakcs.block_get_retry.meter_count
    riakcs.block_get_retry.meter_rate
    riakcs.block_put.latency_95
    riakcs.block_put.latency_99
    riakcs.block_put.latency_mean
    riakcs.block_put.latency_median
    riakcs.block_put.meter_count
    riakcs.block_put.meter_rate
    riakcs.bucket_create.latency_95
    riakcs.bucket_create.latency_99
    riakcs.bucket_create.latency_mean
    riakcs.bucket_create.latency_median
    riakcs.bucket_create.meter_count
    riakcs.bucket_create.meter_rate
    riakcs.bucket_delete.latency_95
    riakcs.bucket_delete.latency_99
    riakcs.bucket_delete.latency_mean
    riakcs.bucket_delete.latency_median
    riakcs.bucket_delete.meter_count
    riakcs.bucket_delete.meter_rate
    riakcs.bucket_get_acl.latency_95
    riakcs.bucket_get_acl.latency_99
    riakcs.bucket_get_acl.latency_mean
    riakcs.bucket_get_acl.latency_median
    riakcs.bucket_get_acl.meter_count
    riakcs.bucket_get_acl.meter_rate
    riakcs.bucket_list_keys.latency_95
    riakcs.bucket_list_keys.latency_99
    riakcs.bucket_list_keys.latency_mean
    riakcs.bucket_list_keys.latency_median
    riakcs.bucket_list_keys.meter_count
    riakcs.bucket_list_keys.meter_rate
    riakcs.bucket_list_pool.overflow
    riakcs.bucket_list_pool.size
    riakcs.bucket_list_pool.workers
    riakcs.bucket_put_acl.latency_95
    riakcs.bucket_put_acl.latency_99
    riakcs.bucket_put_acl.latency_mean
    riakcs.bucket_put_acl.latency_median
    riakcs.bucket_put_acl.meter_count
    riakcs.bucket_put_acl.meter_rate
    riakcs.manifest_siblings_bp_sleep.latency_95
    riakcs.manifest_siblings_bp_sleep.latency_99
    riakcs.manifest_siblings_bp_sleep.latency_mean
    riakcs.manifest_siblings_bp_sleep.latency_median
    riakcs.manifest_siblings_bp_sleep.meter_count
    riakcs.manifest_siblings_bp_sleep.meter_rate
    riakcs.object_delete.latency_95
    riakcs.object_delete.latency_99
    riakcs.object_delete.latency_mean
    riakcs.object_delete.latency_median
    riakcs.object_delete.meter_count
    riakcs.object_delete.meter_rate
    riakcs.object_get.latency_95
    riakcs.object_get.latency_99
    riakcs.object_get.latency_mean
    riakcs.object_get.latency_median
    riakcs.object_get.meter_count
    riakcs.object_get.meter_rate
    riakcs.object_get_acl.latency_95
    riakcs.object_get_acl.latency_99
    riakcs.object_get_acl.latency_mean
    riakcs.object_get_acl.latency_median
    riakcs.object_get_acl.meter_count
    riakcs.object_get_acl.meter_rate
    riakcs.object_head.latency_95
    riakcs.object_head.latency_99
    riakcs.object_head.latency_mean
    riakcs.object_head.latency_median
    riakcs.object_head.meter_count
    riakcs.object_head.meter_rate
    riakcs.object_put.latency_95
    riakcs.object_put.latency_99
    riakcs.object_put.latency_mean
    riakcs.object_put.latency_median
    riakcs.object_put.meter_count
    riakcs.object_put.meter_rate
    riakcs.object_put_acl.latency_95
    riakcs.object_put_acl.latency_99
    riakcs.object_put_acl.latency_mean
    riakcs.object_put_acl.latency_median
    riakcs.object_put_acl.meter_count
    riakcs.object_put_acl.meter_rate
    riakcs.request_pool.overflow
    riakcs.request_pool.size
    riakcs.request_pool.workers
    riakcs.service_get_buckets.latency_95
    riakcs.service_get_buckets.latency_99
    riakcs.service_get_buckets.latency_mean
    riakcs.service_get_buckets.latency_median
    riakcs.service_get_buckets.meter_count
    riakcs.service_get_buckets.meter_rate

