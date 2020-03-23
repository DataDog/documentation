import com.datadog.api.v1.client.api.TagsApi;

public class TagsApiExample {

    public static void main(String[] args) {
        TagsApi apiInstance = new TagsApi();
        String hostName = hostName_example; // String | This endpoint allows you to remove all user-assigned tags for a single host.
        String source = source_example; // String | The source of the tags (e.g. chef, puppet).
[Complete list of source attribute values](https://docs.datadoghq.com/integrations/faq/list-of-api-source-attribute-value).
        try {
            apiInstance.removeHostTags(hostName, source);
        } catch (ApiException e) {
            System.err.println("Exception when calling TagsApi#removeHostTags");
            e.printStackTrace();
        }
    }
}