import com.datadog.api.v2.client.api.OrgsApi;

public class OrgsApiExample {

    public static void main(String[] args) {
        OrgsApi apiInstance = new OrgsApi();
        try {
            OrgListResponse result = apiInstance.getOrg();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrgsApi#getOrg");
            e.printStackTrace();
        }
    }
}