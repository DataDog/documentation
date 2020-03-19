import com.datadog.api.v1.client.api.TagsApi;

public class TagsApiExample {

    public static void main(String[] args) {
        TagsApi apiInstance = new TagsApi();
        String source = source_example; // String | When specified, filters host list to those tags with the specified source
        try {
            TagToHosts result = apiInstance.getAllHostTags(source);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TagsApi#getAllHostTags");
            e.printStackTrace();
        }
    }
}